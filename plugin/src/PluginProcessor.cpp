#include "PluginProcessor.h"
#include "PluginEditor.h"

#include <algorithm>
#include <cstring>

//==============================================================================
SonarAudioProcessor::SonarAudioProcessor()
    : AudioProcessor (BusesProperties()
                          .withInput  ("Input",  juce::AudioChannelSet::stereo(), true)
                          .withOutput ("Output", juce::AudioChannelSet::stereo(), true)),
      fifoBuffer ((size_t) fifo.getTotalSize(), 0.0f)
{
}

void SonarAudioProcessor::prepareToPlay (double, int)
{
    fifo.reset();
    std::fill (fifoBuffer.begin(), fifoBuffer.end(), 0.0f);
    history.fill (0.0f);
}

bool SonarAudioProcessor::isBusesLayoutSupported (const BusesLayout& layouts) const
{
    const auto in  = layouts.getMainInputChannelSet();
    const auto out = layouts.getMainOutputChannelSet();

    if (out != juce::AudioChannelSet::mono() && out != juce::AudioChannelSet::stereo())
        return false;

    return in == out;   // pass-through: input and output must match
}

void SonarAudioProcessor::processBlock (juce::AudioBuffer<float>& buffer, juce::MidiBuffer&)
{
    juce::ScopedNoDenormals noDenormals;

    // Mirror host transport state so the UI's play button can reflect it.
    if (auto* ph = getPlayHead())
        if (const auto pos = ph->getPosition())
            hostPlaying.store (pos->getIsPlaying());

    const int numSamples  = buffer.getNumSamples();
    const int numChannels = buffer.getNumChannels();

    // The audio is left completely untouched — we only read a mono tap for the
    // visualiser and push it to the message thread over a lock-free FIFO.
    if (numSamples > 0 && numChannels > 0)
    {
        const float* ch0 = buffer.getReadPointer (0);
        const float* ch1 = numChannels > 1 ? buffer.getReadPointer (1) : ch0;

        int start1, size1, start2, size2;
        fifo.prepareToWrite (numSamples, start1, size1, start2, size2);
        for (int i = 0; i < size1; ++i)
            fifoBuffer[(size_t) (start1 + i)] = 0.5f * (ch0[i] + ch1[i]);
        for (int i = 0; i < size2; ++i)
            fifoBuffer[(size_t) (start2 + i)] = 0.5f * (ch0[size1 + i] + ch1[size1 + i]);
        fifo.finishedWrite (size1 + size2);
    }
}

void SonarAudioProcessor::copyLatestWindow (float* dst) noexcept
{
    int ready = fifo.getNumReady();

    if (ready > fftSize)   // more than a window queued → drop the stale excess
    {
        int s1, z1, s2, z2;
        fifo.prepareToRead (ready - fftSize, s1, z1, s2, z2);
        fifo.finishedRead (z1 + z2);
        ready = fftSize;
    }

    if (ready > 0)
    {
        int start1, size1, start2, size2;
        fifo.prepareToRead (ready, start1, size1, start2, size2);
        const int total = size1 + size2;

        if (total < fftSize)   // slide the older samples down to make room
            std::memmove (history.data(), history.data() + total,
                          sizeof (float) * (size_t) (fftSize - total));

        float* tail = history.data() + (fftSize - total);
        for (int i = 0; i < size1; ++i) tail[i]         = fifoBuffer[(size_t) (start1 + i)];
        for (int i = 0; i < size2; ++i) tail[size1 + i] = fifoBuffer[(size_t) (start2 + i)];

        fifo.finishedRead (total);
    }

    std::memcpy (dst, history.data(), sizeof (float) * (size_t) fftSize);
}

void SonarAudioProcessor::requestTransport (const juce::String& action)
{
    if (auto* ph = getPlayHead())
    {
        if (! ph->canControlTransport())   // e.g. most VST3 hosts, possibly FL
            return;

        const bool playing = hostPlaying.load();
        if      (action == "toggle") ph->transportPlay (! playing);
        else if (action == "play")   ph->transportPlay (true);
        else if (action == "stop")   ph->transportPlay (false);
    }
}

void SonarAudioProcessor::getStateInformation (juce::MemoryBlock& dest)
{
    const juce::ScopedLock sl (stateLock);
    dest.setSize (0);
    dest.append (uiState.toRawUTF8(), uiState.getNumBytesAsUTF8());
}

void SonarAudioProcessor::setStateInformation (const void* data, int size)
{
    const juce::ScopedLock sl (stateLock);
    uiState = juce::String::fromUTF8 (static_cast<const char*> (data), size);
}

void SonarAudioProcessor::setUiState (const juce::String& s)
{
    const juce::ScopedLock sl (stateLock);
    uiState = s;
}

juce::String SonarAudioProcessor::getUiState() const
{
    const juce::ScopedLock sl (stateLock);
    return uiState;
}

juce::AudioProcessorEditor* SonarAudioProcessor::createEditor()
{
    return new SonarAudioProcessorEditor (*this);
}

//==============================================================================
juce::AudioProcessor* JUCE_CALLTYPE createPluginFilter()
{
    return new SonarAudioProcessor();
}
