<?php
// scan the local VJ-loop library; prefer web-optimized copies in vjloops/web/.
// dedupe by base name (ignoring extension) and skip source formats the browser
// can't play (DXV/ProRes .mov) — those are expected to have a web/ version.
$VJLOOPS = [];
$vjDir = __DIR__ . '/vjloops';
$playable = ['mp4', 'webm', 'm4v', 'ogv'];
$baseNoExt = fn($f) => preg_replace('/\.[^.]+$/', '', $f);
if (is_dir($vjDir)) {
  $entries = [];   // base name => ['name','url']
  $web = is_dir("$vjDir/web") ? scandir("$vjDir/web") : [];
  foreach ($web as $f) {
    if (!in_array(strtolower(pathinfo($f, PATHINFO_EXTENSION)), $playable)) continue;
    $entries[$baseNoExt($f)] = ['name' => $baseNoExt($f), 'url' => 'vjloops/web/' . rawurlencode($f)];
  }
  foreach (scandir($vjDir) as $f) {
    if (!in_array(strtolower(pathinfo($f, PATHINFO_EXTENSION)), $playable)) continue;  // skip .mov (DXV) etc.
    $b = $baseNoExt($f);
    if (!isset($entries[$b])) $entries[$b] = ['name' => $b, 'url' => 'vjloops/' . rawurlencode($f)];
  }
  ksort($entries);
  $VJLOOPS = array_values($entries);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>SONAR · Audio Visualizer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@400;700;900&family=Orbitron:wght@500;700;900&family=Oswald:wght@300;400;600;700&family=Pacifico&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <canvas id="stage"></canvas>

  <!-- Drop / load overlay -->
  <div id="intro" class="intro">
    <div class="intro-card" id="dropzone">
      <div class="logo">SONAR</div>
      <p class="tagline">Audio&nbsp;Visualizer</p>
      <div class="drop-hint">
        <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
          <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
        <span>Drop a WAV / MP3 — or click to browse</span>
      </div>
      <div class="intro-actions">
        <button id="micBtn" class="ghost-btn" type="button" title="Visualize a live audio input">Use Live Input</button>
        <button id="sysBtn" class="ghost-btn" type="button" title="React to system / browser-tab audio output">Capture System Audio</button>
      </div>
      <input id="fileInput" type="file" accept=".wav,.wave,.mp3,.ogg,.oga,.opus,.flac,.m4a,.aac,audio/*" hidden />
    </div>
    <p class="hint-keys">23 scenes · keys&nbsp;<b>1</b>–<b>9</b> + click · <b>S</b> smart shuffle · <b>space</b> play/pause · <b>F</b> fullscreen · <b>H</b> hide UI</p>
    <p class="hint-keys" style="margin-top:8px">
      📱 <a id="ctrlLink" href="control.php" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;font-weight:600">Open live control panel</a>
      &nbsp;·&nbsp; on your phone (same Wi-Fi): <b id="ctrlUrl">control.php</b>
    </p>
  </div>

  <!-- Now-playing + mode badge -->
  <div id="topbar" class="topbar hidden">
    <div class="track" id="trackName">—</div>
    <div class="mode-badge" id="modeBadge">AURORA</div>
  </div>

  <!-- Transport -->
  <div id="controls" class="controls hidden">
    <button id="playBtn" class="icon-btn" type="button" aria-label="Play/Pause">
      <svg class="i-play" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      <svg class="i-pause" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="display:none"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
    </button>

    <div class="seek">
      <span id="curTime" class="time">0:00</span>
      <div class="seek-wrap">
        <input id="seek" class="seek-bar" type="range" min="0" max="1000" value="0" step="1" />
        <div id="kfMarks" class="kf-marks"></div>
      </div>
      <span id="durTime" class="time">0:00</span>
    </div>

    <div class="vol">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z"/></svg>
      <input id="vol" class="vol-bar" type="range" min="0" max="100" value="90" />
    </div>

    <button id="shuffleBtn" class="icon-btn shuffle-btn" type="button" aria-label="Smart shuffle" title="Smart shuffle — auto scene changes that react to the music (S)">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="M21 3l-7 7"/><path d="M16 21h5v-5"/><path d="M21 21L9 9"/><path d="M3 4l5 5"/><path d="M3 20l5-5"/></svg>
    </button>

    <div class="mode-switch" id="modeSwitch">
      <button data-mode="0" class="m active" type="button">Aurora</button>
      <button data-mode="1" class="m" type="button">Spectrum</button>
      <button data-mode="2" class="m" type="button">Tunnel</button>
      <button data-mode="3" class="m" type="button">Galaxy</button>
      <button data-mode="4" class="m" type="button">Synthwave</button>
      <button data-mode="5" class="m" type="button">Kaleido</button>
      <button data-mode="6" class="m" type="button">Liquid</button>
      <button data-mode="7" class="m" type="button">Scope</button>
      <button data-mode="8" class="m" type="button">Terrain</button>
      <button data-mode="9" class="m" type="button">Rings</button>
      <button data-mode="10" class="m" type="button">Rays</button>
      <button data-mode="11" class="m" type="button">Matrix</button>
      <button data-mode="12" class="m" type="button">Lissajous</button>
      <button data-mode="13" class="m" type="button">Web</button>
      <button data-mode="14" class="m" type="button">Vortex</button>
      <button data-mode="15" class="m" type="button">Plasma</button>
      <button data-mode="16" class="m" type="button">Strobe</button>
      <button data-mode="17" class="m" type="button">Lasers</button>
      <button data-mode="18" class="m" type="button">Pillars</button>
      <button data-mode="19" class="m" type="button">Hypno</button>
      <button data-mode="20" class="m" type="button">Siren</button>
      <button data-mode="21" class="m" type="button">Glitch</button>
      <button data-mode="22" class="m" type="button">Cassette</button>
    </div>

    <button id="keysBtn" class="icon-btn" type="button" aria-label="Key map" title="Key map (live control)">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h0M10 10h0M14 10h0M18 10h0M7 14h10"/></svg>
    </button>
    <button id="lyricsBtn" class="icon-btn" type="button" aria-label="Lyrics" title="Lyrics">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>
    </button>
    <button id="mixBtn" class="icon-btn" type="button" aria-label="Mix & FX" title="Mix & FX">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>
    </button>
    <button id="autoBtn" class="icon-btn" type="button" aria-label="Automation" title="Automation timeline">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-7 4 18 2-9 2 3h4"/></svg>
    </button>
    <button id="brandBtn" class="icon-btn" type="button" aria-label="Logo & text" title="Logo & text overlay">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15l5-5 4 4 3-3 6 6"/><circle cx="8.5" cy="8.5" r="1.5"/></svg>
    </button>
    <button id="overlaysBtn" class="icon-btn" type="button" aria-label="Overlays" title="Video overlays (VJ clips)">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 4v16M17 4v16M2 9h5M2 15h5M17 9h5M17 15h5"/></svg>
    </button>
    <button id="loadBtn" class="icon-btn" type="button" aria-label="Load file" title="Load another track">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7-7 7 7"/></svg>
    </button>
    <button id="recBtn" class="icon-btn" type="button" aria-label="Export video" title="Export video">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="12" cy="12" r="7"/></svg>
    </button>
    <button id="fsBtn" class="icon-btn" type="button" aria-label="Fullscreen" title="Fullscreen">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>
    </button>
  </div>

  <!-- Recording indicator (DOM only — never captured into the video) -->
  <div id="recBadge" class="rec-badge hidden">
    <span class="dot"></span><span>REC</span><span id="recTime">0:00</span>
    <span class="rec-hint">click ⬤ to stop</span>
  </div>

  <!-- Export video panel -->
  <div id="exportPanel" class="panel export hidden">
    <div class="panel-head">
      <span>Export Video</span>
      <button id="exportClose" class="x" type="button" aria-label="Close">✕</button>
    </div>
    <div class="panel-body">
      <div class="sec-label">Method</div>
      <div class="seg" id="expMode">
        <button data-m="offline" class="active" type="button">Offline · best</button>
        <button data-m="live" type="button">Real-time</button>
      </div>
      <p class="panel-note" id="expNote">Renders frame-by-frame at the chosen resolution — no dropped frames, runs as fast as your machine encodes, window size doesn't matter.</p>

      <div class="sec-label">Resolution</div>
      <div class="seg seg-wrap" id="expRes">
        <button data-w="1280" data-h="720" type="button">720p</button>
        <button data-w="1920" data-h="1080" class="active" type="button">1080p</button>
        <button data-w="2560" data-h="1440" type="button">1440p</button>
        <button data-w="3840" data-h="2160" type="button">4K</button>
      </div>

      <div class="sec-label">Frame rate</div>
      <div class="seg" id="expFps">
        <button data-fps="30" type="button">30 fps</button>
        <button data-fps="60" class="active" type="button">60 fps</button>
      </div>

      <div class="sec-label">Format <span class="note-inline">(offline)</span></div>
      <div class="seg" id="expFmt">
        <button data-f="mp4" class="active" type="button">MP4 · H.264</button>
        <button data-f="webm" type="button">WebM · VP9</button>
      </div>

      <div class="sec-label">Quality</div>
      <div class="seg" id="expQual">
        <button data-q="0.1" type="button">Standard</button>
        <button data-q="0.2" class="active" type="button">High</button>
        <button data-q="0.35" type="button">Max</button>
      </div>

      <div class="sec-label">Intro headroom <span class="note-inline">(offline)</span></div>
      <div class="seg" id="expHead">
        <button data-h="0" class="active" type="button">None</button>
        <button data-h="1" type="button">1s</button>
        <button data-h="2" type="button">2s</button>
        <button data-h="3" type="button">3s</button>
      </div>

      <button id="expStart" class="mini-btn" type="button">Start export</button>
      <div id="expProg" class="exp-prog hidden">
        <div class="exp-bar"><div id="expBar"></div></div>
        <span id="expPct">0%</span>
      </div>
    </div>
  </div>

  <!-- Key map (live VJ control) -->
  <div id="keysPanel" class="panel left hidden">
    <div class="panel-head">
      <span>Key Map</span>
      <button id="keysClose" class="x" type="button" aria-label="Close">✕</button>
    </div>
    <div class="panel-body">
      <p class="panel-note">Bind keys (numpad recommended) to scenes, FX &amp; transport. Click <b>Set</b>, then press a key. Actions marked ⤓ strobe only while held. Esc cancels.</p>
      <div class="row"><button id="keysReset" class="mini-btn ghost" type="button">Reset to defaults</button></div>
      <div id="keysList"></div>
    </div>
  </div>

  <!-- Video overlays (VJ clips) -->
  <div id="overlaysPanel" class="panel left hidden">
    <div class="panel-head">
      <span>Overlays</span>
      <button id="overlaysClose" class="x" type="button" aria-label="Close">✕</button>
    </div>
    <div class="panel-body">
      <p class="panel-note">Launch video clips over the scene. Use <b>WebM with alpha</b> for transparency, or any MP4 — pick <b>Add</b>/<b>Screen</b> blend for light-on-black loops. The first 8 clips map to keys (bind them in the Key Map). DXV/ProRes aren't browser-playable — convert to WebM/MP4 first.</p>
      <div class="row"><button id="ovAddBtn" class="mini-btn" type="button">Add clip(s)…</button></div>
      <input id="ovFile" type="file" accept="video/*,.webm,.mp4,.mov" multiple hidden />
      <div id="ovList" class="kf-list"></div>

      <div class="sec-label">Blend</div>
      <div class="seg" id="ovBlend">
        <button data-b="source-over" type="button">Normal</button>
        <button data-b="lighter" type="button">Add</button>
        <button data-b="screen" class="active" type="button">Screen</button>
      </div>
      <div class="sec-label">Fit</div>
      <div class="seg" id="ovFit">
        <button data-f="cover" class="active" type="button">Cover</button>
        <button data-f="contain" type="button">Contain</button>
      </div>
      <label class="field">
        <span>Opacity <b id="ovOpacityVal">100%</b></span>
        <input id="ovOpacity" type="range" min="0" max="100" value="100" />
      </label>
      <label class="field">
        <span>Audio react <b id="ovReactVal">0%</b></span>
        <input id="ovReact" type="range" min="0" max="100" value="0" />
      </label>
      <label class="field row between"><span>Auto-launch with smart shuffle</span><input id="ovAuto" type="checkbox" /></label>
      <p class="panel-note">When smart shuffle is on, clips fire on drops &amp; big musical changes (more on intense parts) and clear themselves after a while. Shown in live preview &amp; screen-recording — offline-export support is the next step.</p>
    </div>
  </div>

  <!-- Lyrics -->
  <div id="lyricsPanel" class="panel left hidden">
    <div class="panel-head">
      <span>Lyrics</span>
      <button id="lyricsClose" class="x" type="button" aria-label="Close">✕</button>
    </div>
    <div class="panel-body">
      <label class="field row between"><span>Show lyrics on screen</span><input id="lyrEnable" type="checkbox" checked /></label>
      <div class="row">
        <button id="lyrLoadBtn" class="mini-btn" type="button">Load .lrc</button>
        <button id="lyrExportBtn" class="mini-btn" type="button">Export .lrc</button>
      </div>
      <input id="lyrFile" type="file" accept=".lrc,text/plain" hidden />

      <div class="sec-label">Lines</div>
      <textarea id="lyrText" class="ta" placeholder="Paste lyrics — one line per row…"></textarea>
      <button id="lyrApply" class="mini-btn" type="button">Apply text</button>

      <div class="sec-label">Manual sync</div>
      <label class="field row between"><span>Snap to beat</span><input id="lyrSnap" type="checkbox" /></label>
      <div class="row">
        <button id="lyrStamp" class="mini-btn" type="button">Stamp next @ <span id="lyrTime">0:00</span></button>
        <button id="lyrUnstamp" class="mini-btn ghost" type="button">Clear times</button>
      </div>
      <div id="lyrList" class="kf-list"></div>

      <div class="sec-label">Tempo</div>
      <div class="row">
        <button id="bpmBtn" class="mini-btn" type="button">Detect BPM</button>
        <span class="time" id="bpmVal" style="width:auto">—</span>
      </div>

      <div class="sec-label">Style</div>
      <label class="field"><span>Size <b id="lyrSizeVal">4%</b></span><input id="lyrSize" type="range" min="2" max="10" step="0.2" value="4" /></label>
      <div class="field row">
        <label class="col"><span>Color</span><input id="lyrColor" type="color" value="#ffffff" /></label>
        <div class="col"><span>Position</span>
          <div class="seg" id="lyrPos">
            <button data-p="top" type="button">Top</button>
            <button data-p="center" type="button">Mid</button>
            <button data-p="lower" class="active" type="button">Low</button>
          </div>
        </div>
      </div>
      <label class="field row between"><span>Show next line</span><input id="lyrNext" type="checkbox" checked /></label>
    </div>
  </div>

  <!-- Mix & FX -->
  <div id="mixPanel" class="panel hidden">
    <div class="panel-head">
      <span>Mix &amp; FX</span>
      <button id="mixClose" class="x" type="button" aria-label="Close">✕</button>
    </div>
    <div class="panel-body">
      <div class="sec-label">Live source</div>
      <label class="field">
        <span>Input device</span>
        <select id="inputDevice"><option value="">— grant access to list inputs —</option></select>
      </label>
      <div class="row">
        <button id="mixMicBtn" class="mini-btn" type="button">Use input</button>
        <button id="mixSysBtn" class="mini-btn" type="button">System / tab audio</button>
      </div>
      <p class="panel-note">Pick a mic, line-in, or a virtual-cable device (VB-Cable / BlackHole) for loopback. "System / tab audio" shares output via the browser dialog — tick its audio box.</p>

      <div class="sec-label">Reactivity</div>
      <label class="field">
        <span>Scene intensity <b id="intVal">100%</b></span>
        <input id="intRange" type="range" min="0" max="250" value="100" />
      </label>
      <label class="field">
        <span>Bass <b id="eqBassVal">100%</b></span>
        <input id="eqBassRange" type="range" min="0" max="250" value="100" />
      </label>
      <label class="field">
        <span>Mids <b id="eqMidVal">100%</b></span>
        <input id="eqMidRange" type="range" min="0" max="250" value="100" />
      </label>
      <label class="field">
        <span>Treble <b id="eqTrebleVal">100%</b></span>
        <input id="eqTrebleRange" type="range" min="0" max="250" value="100" />
      </label>

      <div class="sec-label">Scene transition</div>
      <div class="seg seg-wrap" id="transType">
        <button data-x="none" type="button">Cut</button>
        <button data-x="crossfade" class="active" type="button">Fade</button>
        <button data-x="dip" type="button">Dip</button>
        <button data-x="wipe" type="button">Wipe</button>
        <button data-x="slide" type="button">Slide</button>
        <button data-x="zoom" type="button">Zoom</button>
      </div>
      <label class="field">
        <span>Duration <b id="transDurVal">0.50s</b></span>
        <input id="transDurRange" type="range" min="0.1" max="2" step="0.05" value="0.5" />
      </label>
      <p class="panel-note">Applied on every scene change — manual, smart shuffle, or keyframed. "Cut" = instant.</p>

      <div class="sec-label">Beat detection</div>
      <label class="field">
        <span>Sensitivity <b id="beatSensVal">1.4</b></span>
        <input id="beatSensRange" type="range" min="0.4" max="3" step="0.1" value="1.4" />
      </label>
      <p class="panel-note">Lower = more beats trigger. Watch particles/strobe to tune.</p>

      <div class="sec-label">Post FX</div>
      <label class="field">
        <span>Blur <b id="blurVal">0</b></span>
        <input id="blurRange" type="range" min="0" max="24" step="0.5" value="0" />
      </label>
      <div class="field">
        <span>Beat strobe</span>
        <div class="seg" id="strobeSeg">
          <button data-s="off" class="active" type="button">Off</button>
          <button data-s="white" type="button">White</button>
          <button data-s="black" type="button">Black</button>
        </div>
      </div>

      <div class="sec-label">Fade (black)</div>
      <label class="field">
        <span>Fade in <b id="fadeInVal">0.0s</b></span>
        <input id="fadeInRange" type="range" min="0" max="6" step="0.1" value="0" />
      </label>
      <label class="field">
        <span>Fade out <b id="fadeOutVal">0.0s</b></span>
        <input id="fadeOutRange" type="range" min="0" max="6" step="0.1" value="0" />
      </label>

      <div class="sec-label">Background</div>
      <div class="seg seg-wrap" id="bgType">
        <button data-t="default" class="active" type="button">Scene</button>
        <button data-t="solid" type="button">Solid</button>
        <button data-t="gradient" type="button">Gradient</button>
        <button data-t="image" type="button">Image</button>
      </div>
      <div class="field row">
        <label class="col"><span>Color 1</span><input id="bgC1" type="color" value="#05060c" /></label>
        <label class="col"><span>Color 2</span><input id="bgC2" type="color" value="#0a0a16" /></label>
      </div>
      <div class="row">
        <button id="bgImgBtn" class="mini-btn" type="button">Choose image…</button>
        <button id="bgImgClear" class="mini-btn ghost" type="button">Clear</button>
      </div>
      <input id="bgImg" type="file" accept="image/*" hidden />
      <p class="panel-note">Custom backgrounds replace the bg of "clear" scenes (Spectrum, Scope, Terrain, Plasma, Pillars…) and tint trail scenes.</p>

      <div class="sec-label">Scene file</div>
      <div class="row">
        <button id="sceneSave" class="mini-btn" type="button">Save scene</button>
        <button id="sceneLoadBtn" class="mini-btn" type="button">Load scene</button>
      </div>
      <p class="panel-note">Bundles everything — scene, mix/FX, background, overlay (+image), automation, lyrics — into one file.</p>
      <input id="sceneFile" type="file" accept=".json,application/json" hidden />
    </div>
  </div>

  <!-- Automation timeline -->
  <div id="autoPanel" class="panel left hidden">
    <div class="panel-head">
      <span>Automation</span>
      <button id="autoClose" class="x" type="button" aria-label="Close">✕</button>
    </div>
    <div class="panel-body">
      <p class="panel-note">Keyframe any property over the song. Numbers &amp; colors ramp; scenes, fonts &amp; toggles snap.</p>

      <div class="sec-label">New keyframe</div>
      <label class="field">
        <span>Property</span>
        <select id="autoProp"></select>
      </label>
      <div class="field">
        <span id="autoValLabel">Value</span>
        <div id="autoValWrap" class="val-wrap"></div>
      </div>
      <label class="field">
        <span>Ramp into it</span>
        <select id="autoEase">
          <option value="linear">Linear ramp</option>
          <option value="in">Ease in</option>
          <option value="out">Ease out</option>
          <option value="inout">Ease in-out</option>
          <option value="step">Step (snap)</option>
        </select>
      </label>
      <div class="row">
        <button id="autoGrab" class="mini-btn ghost" type="button">Grab current</button>
        <button id="autoAdd" class="mini-btn" type="button">+ Add @ <span id="autoTime">0:00</span></button>
      </div>

      <div class="sec-label">Keyframes <b id="kfCount">0</b></div>
      <div id="autoList" class="kf-list"></div>

      <div class="sec-label">Save / load</div>
      <div class="row">
        <button id="autoExport" class="mini-btn" type="button">Export</button>
        <button id="autoImportBtn" class="mini-btn" type="button">Import</button>
        <button id="autoClear" class="mini-btn ghost" type="button">Clear</button>
      </div>
      <input id="autoImport" type="file" accept="application/json,.json" hidden />
    </div>
  </div>

  <!-- Logo & text overlay editor -->
  <div id="brandPanel" class="panel hidden">
    <div class="panel-head">
      <span>Logo &amp; Text</span>
      <button id="brandClose" class="x" type="button" aria-label="Close">✕</button>
    </div>

    <div class="panel-body">
      <!-- CONTENT -->
      <div class="sec-label">Content</div>
      <label class="field">
        <span>Logo / image</span>
        <div class="row">
          <button id="logoBtn" class="mini-btn" type="button">Choose image…</button>
          <button id="logoClear" class="mini-btn ghost" type="button">Clear</button>
        </div>
        <input id="logoInput" type="file" accept="image/*" hidden />
      </label>
      <label class="field">
        <span>Logo size <b id="sizeVal">28%</b></span>
        <input id="sizeRange" type="range" min="6" max="70" value="28" />
      </label>
      <label class="field">
        <span>Title</span>
        <input id="titleInput" type="text" placeholder="Song title" maxlength="80" />
      </label>
      <label class="field">
        <span>Subtitle</span>
        <input id="subInput" type="text" placeholder="Artist · album · etc." maxlength="80" />
      </label>

      <!-- TYPOGRAPHY -->
      <div class="sec-label">Typography</div>
      <label class="field">
        <span>Font</span>
        <select id="fontSel">
          <option value='"Space Grotesk", sans-serif'>Space Grotesk</option>
          <option value='"Bebas Neue", sans-serif'>Bebas Neue</option>
          <option value='"Anton", sans-serif'>Anton</option>
          <option value='"Oswald", sans-serif'>Oswald</option>
          <option value='"Montserrat", sans-serif'>Montserrat</option>
          <option value='"Orbitron", sans-serif'>Orbitron</option>
          <option value='"Playfair Display", serif'>Playfair Display</option>
          <option value='"Pacifico", cursive'>Pacifico</option>
          <option value='Georgia, "Times New Roman", serif'>Serif</option>
          <option value='"Courier New", monospace'>Monospace</option>
        </select>
      </label>
      <div class="seg" id="styleSeg">
        <button data-style="bold" class="active" type="button"><b>B</b></button>
        <button data-style="italic" type="button"><i>I</i></button>
        <button data-style="upper" type="button">AA</button>
      </div>
      <label class="field">
        <span>Title size <b id="titleSizeVal">5.2%</b></span>
        <input id="titleSize" type="range" min="2" max="16" step="0.2" value="5.2" />
      </label>
      <label class="field">
        <span>Subtitle size <b id="subSizeVal">2.6%</b></span>
        <input id="subSize" type="range" min="1" max="10" step="0.2" value="2.6" />
      </label>
      <label class="field">
        <span>Letter spacing <b id="letterVal">4%</b></span>
        <input id="letterRange" type="range" min="-5" max="40" value="4" />
      </label>
      <div class="field row">
        <label class="col"><span>Title color</span><input id="titleColor" type="color" value="#ffffff" /></label>
        <label class="col"><span>Subtitle color</span><input id="subColor" type="color" value="#bfe6ff" /></label>
      </div>

      <!-- GLOW & OUTLINE -->
      <div class="sec-label">Glow &amp; Outline</div>
      <div class="field row">
        <label class="col"><span>Glow color</span><input id="glowColor" type="color" value="#6cf0ff" /></label>
        <label class="col"><span>Outline color</span><input id="outlineColor" type="color" value="#000000" /></label>
      </div>
      <label class="field">
        <span>Glow strength <b id="glowVal">100%</b></span>
        <input id="glowRange" type="range" min="0" max="250" value="100" />
      </label>
      <label class="field">
        <span>Outline width <b id="outlineVal">off</b></span>
        <input id="outlineRange" type="range" min="0" max="14" step="0.5" value="0" />
      </label>

      <!-- LAYOUT -->
      <div class="sec-label">Layout</div>
      <div class="field">
        <span>Anchor</span>
        <div class="seg" id="posSeg">
          <button data-pos="top" type="button">Top</button>
          <button data-pos="center" class="active" type="button">Center</button>
          <button data-pos="lower" type="button">Lower</button>
        </div>
      </div>
      <label class="field">
        <span>Offset X <b id="offXVal">0</b></span>
        <input id="offXRange" type="range" min="-50" max="50" value="0" />
      </label>
      <label class="field">
        <span>Offset Y <b id="offYVal">0</b></span>
        <input id="offYRange" type="range" min="-50" max="50" value="0" />
      </label>
      <label class="field">
        <span>Opacity <b id="alphaVal">100%</b></span>
        <input id="alphaRange" type="range" min="0" max="100" value="100" />
      </label>

      <!-- REACTIVITY -->
      <div class="sec-label">Reactivity</div>
      <label class="field">
        <span>Driven by</span>
        <select id="reactSrc">
          <option value="bass">Bass</option>
          <option value="mid">Mids</option>
          <option value="treble">Treble</option>
          <option value="level">Overall level</option>
          <option value="beat">Beat hits</option>
        </select>
      </label>
      <label class="field">
        <span>Amount <b id="amtVal">100%</b></span>
        <input id="amtRange" type="range" min="0" max="300" value="100" />
      </label>
      <div class="field">
        <span>Effects</span>
        <div class="chips" id="fxChips">
          <button data-fx="pulse" class="active" type="button">Pulse</button>
          <button data-fx="bounce" type="button">Bounce</button>
          <button data-fx="shake" type="button">Shake</button>
          <button data-fx="wobble" type="button">Wobble</button>
          <button data-fx="glow" class="active" type="button">Glow</button>
          <button data-fx="hue" type="button">Hue cycle</button>
          <button data-fx="flicker" type="button">Flicker</button>
        </div>
      </div>

      <!-- LIBRARY -->
      <div class="sec-label">Library <span class="note-inline">(saved on this device)</span></div>
      <button id="logoSave" class="mini-btn" type="button">Save current logo</button>
      <div id="logoGallery" class="gallery"></div>
    </div>
  </div>

  <script>window.VJLOOPS = <?php echo json_encode($VJLOOPS, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>;</script>
  <script src="vendor/webm-muxer.js"></script>
  <script src="vendor/mp4-muxer.js"></script>
  <script src="app.js"></script>
</body>
</html>
