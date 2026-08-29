#pragma once

#include <juce_audio_processors/juce_audio_processors.h>
#include <juce_gui_extra/juce_gui_extra.h>
#include "PluginProcessor.h"

#include <array>
#include <memory>
#include <optional>

//==============================================================================
// The whole UI is a WebView running the existing SONAR web app. Audio windows
// are pushed to JS every frame; front-end assets are served off disk via the
// resource provider (index.php is rendered through the PHP CLI). A small event
// bridge handles file saves, preset loading, transport, and project state.
class SonarAudioProcessorEditor : public juce::AudioProcessorEditor,
                                  private juce::Timer
{
public:
    explicit SonarAudioProcessorEditor (SonarAudioProcessor&);
    ~SonarAudioProcessorEditor() override;

    void resized() override;

private:
    void timerCallback() override;

    std::optional<juce::WebBrowserComponent::Resource> getResource (const juce::String& url);
    juce::String renderIndexHtml();
    static juce::String mimeFor (const juce::String& path);

    // JS -> C++ bridge handlers
    void handleSaveFile (const juce::var&);
    void handleLoadPreset();

    SonarAudioProcessor& processorRef;
    std::array<float, SonarAudioProcessor::fftSize> window {};
    bool lastPlaying = false;
    std::unique_ptr<juce::FileChooser> fileChooser;

    juce::WebBrowserComponent web;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (SonarAudioProcessorEditor)
};
