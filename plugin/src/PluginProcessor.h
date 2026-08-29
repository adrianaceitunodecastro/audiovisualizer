#pragma once

#include <juce_audio_processors/juce_audio_processors.h>
#include <array>
#include <atomic>
#include <vector>

//==============================================================================
// A pass-through audio effect that taps a mono mix of whatever passes through it
// and hands the most recent window of samples to the editor (the WebView) for
// visualisation. It never alters the audio. It also mirrors the host transport
// state and persists the web UI's preset JSON into the host project.
class SonarAudioProcessor : public juce::AudioProcessor
{
public:
    static constexpr int fftSize = 2048;   // matches the app's AnalyserNode fftSize

    SonarAudioProcessor();
    ~SonarAudioProcessor() override = default;

    void prepareToPlay (double sampleRate, int samplesPerBlock) override;
    void releaseResources() override {}
    bool isBusesLayoutSupported (const BusesLayout&) const override;
    void processBlock (juce::AudioBuffer<float>&, juce::MidiBuffer&) override;

    juce::AudioProcessorEditor* createEditor() override;
    bool hasEditor() const override { return true; }

    const juce::String getName() const override { return "SONAR Visualizer"; }
    bool acceptsMidi() const override { return false; }
    bool producesMidi() const override { return false; }
    bool isMidiEffect() const override { return false; }
    double getTailLengthSeconds() const override { return 0.0; }

    int getNumPrograms() override { return 1; }
    int getCurrentProgram() override { return 0; }
    void setCurrentProgram (int) override {}
    const juce::String getProgramName (int) override { return {}; }
    void changeProgramName (int, const juce::String&) override {}

    void getStateInformation (juce::MemoryBlock&) override;
    void setStateInformation (const void*, int) override;

    // Message-thread call from the editor: copies the newest fftSize mono samples
    // (oldest first) into dst. Lock-free with respect to the audio thread.
    void copyLatestWindow (float* dst) noexcept;

    // Transport bridge (host-dependent: many VST3 hosts don't allow plugin control).
    bool isHostPlaying() const noexcept { return hostPlaying.load(); }
    void requestTransport (const juce::String& action);

    // The web app's preset JSON, persisted into the host project state.
    void setUiState (const juce::String&);
    juce::String getUiState() const;

private:
    juce::AbstractFifo fifo { 1 << 15 };        // SPSC: audio thread -> message thread
    std::vector<float> fifoBuffer;              // ring backing store
    std::array<float, fftSize> history {};      // message-thread rolling window

    std::atomic<bool> hostPlaying { false };

    juce::CriticalSection stateLock;
    juce::String uiState;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (SonarAudioProcessor)
};
