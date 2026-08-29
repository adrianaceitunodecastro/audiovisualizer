#include "PluginEditor.h"

#include <cstring>
#include <memory>
#include <vector>

using Resource = juce::WebBrowserComponent::Resource;
using Options  = juce::WebBrowserComponent::Options;

namespace
{
    std::vector<std::byte> toBytes (const juce::String& text)
    {
        const auto* utf8 = text.toRawUTF8();
        const auto len = std::strlen (utf8);
        std::vector<std::byte> bytes (len);
        std::memcpy (bytes.data(), utf8, len);
        return bytes;
    }

    std::vector<std::byte> toBytes (const juce::MemoryBlock& mb)
    {
        std::vector<std::byte> bytes (mb.getSize());
        if (mb.getSize() > 0)
            std::memcpy (bytes.data(), mb.getData(), mb.getSize());
        return bytes;
    }
}

//==============================================================================
SonarAudioProcessorEditor::SonarAudioProcessorEditor (SonarAudioProcessor& p)
    : AudioProcessorEditor (&p),
      processorRef (p),
      web (Options{}
               .withBackend (Options::Backend::webview2)
               .withWinWebView2Options (Options::WinWebView2{}
                   .withUserDataFolder (juce::File::getSpecialLocation (juce::File::tempDirectory)
                                            .getChildFile ("SonarViz-WebView2")))
               .withNativeIntegrationEnabled()
               .withResourceProvider ([this] (const auto& url) { return getResource (url); })
               .withEventListener ("saveFile",         [this] (const juce::var& v) { handleSaveFile (v); })
               .withEventListener ("loadPreset",       [this] (const juce::var&)   { handleLoadPreset(); })
               .withEventListener ("transportControl", [this] (const juce::var& v) { processorRef.requestTransport (v.getProperty ("action", "toggle").toString()); })
               .withEventListener ("stateChanged",     [this] (const juce::var& v) { processorRef.setUiState (v.toString()); })
               .withEventListener ("uiReady",          [this] (const juce::var&)
               {
                   const auto s = processorRef.getUiState();
                   if (s.isNotEmpty())
                       web.emitEventIfBrowserIsVisible ("presetJson", juce::var (s));
               }))
{
    addAndMakeVisible (web);
    web.goToURL (juce::WebBrowserComponent::getResourceProviderRoot());

    setResizable (true, true);
    setResizeLimits (480, 270, 3840, 2160);
    setSize (960, 540);

    startTimerHz (60);
}

SonarAudioProcessorEditor::~SonarAudioProcessorEditor()
{
    stopTimer();
}

void SonarAudioProcessorEditor::resized()
{
    web.setBounds (getLocalBounds());
}

//==============================================================================
void SonarAudioProcessorEditor::timerCallback()
{
    processorRef.copyLatestWindow (window.data());

    const auto b64 = juce::Base64::toBase64 (window.data(), sizeof (float) * window.size());
    web.emitEventIfBrowserIsVisible ("audio", juce::var (b64));

    const bool playing = processorRef.isHostPlaying();
    if (playing != lastPlaying)
    {
        lastPlaying = playing;
        juce::DynamicObject::Ptr obj (new juce::DynamicObject());
        obj->setProperty ("playing", playing);
        web.emitEventIfBrowserIsVisible ("hostTransport", juce::var (obj.get()));
    }
}

//==============================================================================
void SonarAudioProcessorEditor::handleSaveFile (const juce::var& v)
{
    const auto name = v.getProperty ("name", "export.dat").toString();
    const auto b64  = v.getProperty ("data", juce::String()).toString();

    juce::MemoryOutputStream mos;
    juce::Base64::convertFromBase64 (mos, b64);
    auto block = std::make_shared<juce::MemoryBlock> (mos.getData(), mos.getDataSize());

    const auto initial = juce::File::getSpecialLocation (juce::File::userDesktopDirectory).getChildFile (name);
    fileChooser = std::make_unique<juce::FileChooser> ("Save file", initial, "*");
    fileChooser->launchAsync (juce::FileBrowserComponent::saveMode | juce::FileBrowserComponent::warnAboutOverwriting,
        [block] (const juce::FileChooser& fc)
        {
            const auto f = fc.getResult();
            if (f != juce::File())
                f.replaceWithData (block->getData(), block->getSize());
        });
}

void SonarAudioProcessorEditor::handleLoadPreset()
{
    fileChooser = std::make_unique<juce::FileChooser> ("Load preset", juce::File(), "*.json");
    juce::Component::SafePointer<SonarAudioProcessorEditor> safe (this);
    fileChooser->launchAsync (juce::FileBrowserComponent::openMode | juce::FileBrowserComponent::canSelectFiles,
        [safe] (const juce::FileChooser& fc)
        {
            if (safe == nullptr)
                return;
            const auto f = fc.getResult();
            if (f.existsAsFile())
                safe->web.emitEventIfBrowserIsVisible ("loadPresetResult", juce::var (f.loadFileAsString()));
        });
}

//==============================================================================
std::optional<Resource> SonarAudioProcessorEditor::getResource (const juce::String& url)
{
    // Normalise the requested URL to a webroot-relative path.
    juce::String path = url;
    const auto& root = juce::WebBrowserComponent::getResourceProviderRoot();
    if (path.startsWith (root))
        path = path.substring (root.length());
    path = path.upToFirstOccurrenceOf ("?", false, false);
    path = path.upToFirstOccurrenceOf ("#", false, false);
    while (path.startsWith ("/"))
        path = path.substring (1);
    path = juce::URL::removeEscapeChars (path);

    if (path.isEmpty() || path == "index.html")
        return Resource { toBytes (renderIndexHtml()), "text/html" };

    const juce::File webroot (SONAR_WEBROOT);
    const auto file = webroot.getChildFile (path);

    // keep the served files inside the webroot (no path traversal)
    if (! file.isAChildOf (webroot) || ! file.existsAsFile())
        return std::nullopt;

    juce::MemoryBlock mb;
    if (! file.loadFileAsData (mb))
        return std::nullopt;

    return Resource { toBytes (mb), mimeFor (path) };
}

juce::String SonarAudioProcessorEditor::renderIndexHtml()
{
    const juce::File webroot (SONAR_WEBROOT);
    const juce::File indexPhp = webroot.getChildFile ("index.php");

    juce::String html;

    // Render through the PHP CLI so window.VJLOOPS is populated exactly as on the
    // web. index.php uses __DIR__, so the working directory doesn't matter.
    juce::ChildProcess php;
    juce::StringArray cmd { juce::String (SONAR_PHP), indexPhp.getFullPathName() };
    if (php.start (cmd, juce::ChildProcess::wantStdOut))
    {
        html = php.readAllProcessOutput();
        php.waitForProcessToFinish (5000);
    }

    // Fallback if PHP is unavailable: serve the file with its PHP stripped.
    if (html.isEmpty() && indexPhp.existsAsFile())
    {
        html = indexPhp.loadFileAsString();
        const auto doctype = html.indexOf ("<!DOCTYPE");
        if (doctype > 0)
            html = html.substring (doctype);
        html = html.replace (
            "<script>window.VJLOOPS = <?php echo json_encode($VJLOOPS, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>;</script>",
            "<script>window.VJLOOPS = [];</script>");
    }

    // Flip the app into plugin mode before app.js runs.
    html = html.replace ("<script src=\"app.js\">",
                         "<script>window.SONAR_PLUGIN = true;</script>\n  <script src=\"app.js\">");
    return html;
}

juce::String SonarAudioProcessorEditor::mimeFor (const juce::String& path)
{
    const auto ext = path.fromLastOccurrenceOf (".", false, false).toLowerCase();

    if (ext == "html" || ext == "htm")  return "text/html";
    if (ext == "js"   || ext == "mjs")  return "text/javascript";
    if (ext == "css")                   return "text/css";
    if (ext == "json")                  return "application/json";
    if (ext == "svg")                   return "image/svg+xml";
    if (ext == "png")                   return "image/png";
    if (ext == "jpg"  || ext == "jpeg") return "image/jpeg";
    if (ext == "gif")                   return "image/gif";
    if (ext == "webp")                  return "image/webp";
    if (ext == "ico")                   return "image/x-icon";
    if (ext == "mp4"  || ext == "m4v")  return "video/mp4";
    if (ext == "webm")                  return "video/webm";
    if (ext == "ogv")                   return "video/ogg";
    if (ext == "woff2")                 return "font/woff2";
    if (ext == "woff")                  return "font/woff";
    if (ext == "ttf")                   return "font/ttf";
    if (ext == "wav")                   return "audio/wav";
    if (ext == "mp3")                   return "audio/mpeg";

    return "application/octet-stream";
}
