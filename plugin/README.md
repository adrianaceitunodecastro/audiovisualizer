# SONAR Visualizer — FL Studio / VST3 plugin

Wraps the existing SONAR web visualizer (`../index.php` + `../app.js`) in a VST3
audio effect. Drop it on a mixer track (or the master) in FL Studio and the
visuals react to that track's audio — the ZGameEditor-Visualizer idea, but
driven by our own web renderer.

## How it works

```
FL Studio track audio
   │  (audio thread)
   ▼
processBlock()  ── taps a mono mix into a lock-free FIFO (audio is passed
   │                through untouched)
   ▼  (message thread, 60 Hz timer)
copyLatestWindow() → base64 → web.emitEventIfBrowserIsVisible("audio", …)
   │
   ▼  (JUCE WebView bridge)
app.js  window.__JUCE__.backend.addEventListener("audio", …)
   │      → fills the same freq/time buffers the AnalyserNode would
   ▼
existing 23 scenes render to canvas
```

- **UI** is a `juce::WebBrowserComponent` (WebView2) whose entire front end is the
  unchanged web app.
- **Assets** are served straight off disk from the repo root (`SONAR_WEBROOT`) by
  the editor's resource provider. `index.php` is rendered through the PHP CLI
  (`SONAR_PHP`) so `window.VJLOOPS` is populated exactly as on the web; the
  provider then injects `window.SONAR_PLUGIN = true` before `app.js` loads.
- **Plugin mode** in `app.js` (`IN_PLUGIN`): no Web Audio graph — host PCM is run
  through the same windowed FFT the offline exporter uses, so the visuals behave
  identically to a loaded file. Treated as a live source (`isMic`): wall-clock
  shuffle, infinite length, the temporizer / fade controls still apply.

## Build

Everything needed is already present on this machine (VS Build Tools 2022 with the
bundled CMake, the WebView2 SDK under `%LOCALAPPDATA%\PackageManagement`, PHP 8.3,
and JUCE 8.0.14 cloned into `./JUCE`).

```sh
CMAKE="/c/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/Common7/IDE/CommonExtensions/Microsoft/CMake/CMake/bin/cmake.exe"

# configure (once)
"$CMAKE" -S plugin -B plugin/build -G "Visual Studio 17 2022" -A x64

# build (repeat after C++ changes)
"$CMAKE" --build plugin/build --config Release --target SonarViz --parallel
```

Output: `plugin/build/SonarViz_artefacts/Release/VST3/SONAR Visualizer.vst3`.
`COPY_PLUGIN_AFTER_BUILD` also tries to copy it into
`C:\Program Files\Common Files\VST3` (needs write access to that folder; if it
fails, copy the `.vst3` there manually from an elevated shell).

### First-time prerequisites (already done here, listed for other machines)

- **Visual Studio Build Tools 2022** with the *Desktop development with C++*
  workload (ships CMake + Ninja + MSVC).
- **WebView2 SDK** NuGet package extracted to
  `%USERPROFILE%\AppData\Local\PackageManagement\NuGet\Packages\Microsoft.Web.WebView2.<ver>\`
  (JUCE searches there when `NEEDS_WEBVIEW2 TRUE`). The **WebView2 runtime** ships
  with Windows 11.
- **PHP CLI** on `PATH` (only used to render `index.php`).
- **JUCE 8.0.14**: `git clone --depth 1 --branch 8.0.14 https://github.com/juce-framework/JUCE.git plugin/JUCE`

## Load in FL Studio

1. **Options → Manage plugins → Find more plugins** (make sure
   `C:\Program Files\Common Files\VST3` is in the scan paths), then scan.
2. Find **SONAR Visualizer** (manufacturer *tunox*) under audio effects.
3. Add it to a mixer track's effect slot — the master track feeds it the full
   mix; an insert track feeds it just that track.
4. Play the project. The plugin window is the visualizer; use its on-canvas
   panels (scenes, Mix & FX, overlays) exactly as in the browser.

## Dev workflow

- **Front-end** (`app.js`, `style.css`, scenes, `index.php`): just **reload** the
  plugin window (close/reopen the editor, or re-add the plugin). Assets are read
  live from disk and `index.php` is re-rendered each load — no rebuild.
- **C++** (audio tap, bridge, resource provider): rebuild with the command above.

## Status & limitations

Working: live FL reactivity; **load a file → play / seek / offline video export**;
video-loop overlays; the temporizer (audio + visual fade-in on play); live
performance controls (FPS cap + render scale); and **presets** — saved through a
native dialog and also mirrored into the FL project via `get/setStateInformation`.

Two audio "sources" inside the plugin: by default it reacts to **FL's live audio**;
**load a file** (topbar Load button, or drag a WAV/MP3 onto the window) to switch to
file playback for polished music-video export. The Mix & FX → *Live source* → *Use
input* button switches back to FL's live audio.

- **Transport control of FL**: the play button fully controls a *loaded file*.
  Driving FL's own transport from the plugin depends on the host allowing it
  (`AudioPlayHead::canControlTransport()`), which many VST3 hosts — possibly FL — do
  not. There the button reflects FL's play state but you start/stop from FL itself.
- **Large exports**: files ≤ 32 MB save through a native dialog; larger videos fall
  back to the WebView's own download (Downloads folder). If a big export doesn't
  appear, switch it to a chunked native save.
- **User video clips in presets** ride along by IndexedDB id, so they restore on the
  same machine (the clip bank persists); server VJ-loops restore anywhere.
- **Splash screen**: shown unless you hold a JUCE licence or build under GPLv3.
- **Path-baked**: `SONAR_WEBROOT` is compiled in; embed assets as `BinaryData` for a
  portable/distributable build.
