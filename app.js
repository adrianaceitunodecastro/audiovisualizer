/* =====================================================================
   SONAR — MP3 Audio Visualizer
   Vanilla JS · Web Audio API · Canvas2D · cheap bloom · 4 modes
   ===================================================================== */
'use strict';

/* ---------- DOM ---------- */
const $ = (id) => document.getElementById(id);
const stage = $('stage');
const intro = $('intro');
const dropzone = $('dropzone');
const fileInput = $('fileInput');
const micBtn = $('micBtn');
const sysBtn = $('sysBtn');
const introClose = $('introClose');
const inputDevice = $('inputDevice');
const mixMicBtn = $('mixMicBtn');
const mixSysBtn = $('mixSysBtn');
const topbar = $('topbar');
const controls = $('controls');
const trackName = $('trackName');
const modeBadge = $('modeBadge');
const playBtn = $('playBtn');
const iPlay = playBtn.querySelector('.i-play');
const iPause = playBtn.querySelector('.i-pause');
const seek = $('seek');
const curTime = $('curTime');
const durTime = $('durTime');
const vol = $('vol');
const shuffleBtn = $('shuffleBtn');
const modeSwitch = $('modeSwitch');
const sceneSelect = $('sceneSelect'), sceneBtn = $('sceneBtn'), sceneBtnLabel = $('sceneBtnLabel');
const loadBtn = $('loadBtn');
const srcBtn = $('srcBtn');
const fsBtn = $('fsBtn');
const recBtn = $('recBtn');
const recBadge = $('recBadge');
const recTime = $('recTime');
// export panel
const exportPanel = $('exportPanel');
const exportClose = $('exportClose');
const expMode = $('expMode');
const expNote = $('expNote');
const expRes = $('expRes');
const expFps = $('expFps');
const expStart = $('expStart');
const expProg = $('expProg');
const expBar = $('expBar');
const expPct = $('expPct');
const expHead = $('expHead');
const expFmt = $('expFmt');
const expQual = $('expQual');
// mix & fx panel
const mixBtn = $('mixBtn');
const mixPanel = $('mixPanel');
const mixClose = $('mixClose');
const intRange = $('intRange'), intVal = $('intVal');
const eqBassRange = $('eqBassRange'), eqBassVal = $('eqBassVal');
const eqMidRange = $('eqMidRange'), eqMidVal = $('eqMidVal');
const eqTrebleRange = $('eqTrebleRange'), eqTrebleVal = $('eqTrebleVal');
const beatSensRange = $('beatSensRange'), beatSensVal = $('beatSensVal');
const blurRange = $('blurRange'), blurVal = $('blurVal');
const strobeSeg = $('strobeSeg');
const transType = $('transType'), transDurRange = $('transDurRange'), transDurVal = $('transDurVal');
const fadeInRange = $('fadeInRange'), fadeInVal = $('fadeInVal');
const fadeOutRange = $('fadeOutRange'), fadeOutVal = $('fadeOutVal');
const liveFadeRange = $('liveFadeRange'), liveFadeVal = $('liveFadeVal');
const maxFpsRange = $('maxFpsRange'), maxFpsVal = $('maxFpsVal');
const renderScaleRange = $('renderScaleRange'), renderScaleVal = $('renderScaleVal');
const bgType = $('bgType'), bgC1 = $('bgC1'), bgC2 = $('bgC2'), bgImgBtn = $('bgImgBtn'), bgImgClear = $('bgImgClear'), bgImg = $('bgImg');
const sceneSave = $('sceneSave'), sceneLoadBtn = $('sceneLoadBtn'), sceneFile = $('sceneFile');
// lyrics panel
const lyricsBtn = $('lyricsBtn'), lyricsPanel = $('lyricsPanel'), lyricsClose = $('lyricsClose');
const lyrEnable = $('lyrEnable'), lyrLoadBtn = $('lyrLoadBtn'), lyrExportBtn = $('lyrExportBtn'), lyrFile = $('lyrFile');
const lyrText = $('lyrText'), lyrApply = $('lyrApply'), lyrSnap = $('lyrSnap');
const lyrStamp = $('lyrStamp'), lyrTime = $('lyrTime'), lyrUnstamp = $('lyrUnstamp'), lyrList = $('lyrList');
const bpmBtn = $('bpmBtn'), bpmVal = $('bpmVal');
const lyrSize = $('lyrSize'), lyrSizeVal = $('lyrSizeVal'), lyrColor = $('lyrColor'), lyrPos = $('lyrPos'), lyrNext = $('lyrNext');
// library
const logoSave = $('logoSave'), logoGallery = $('logoGallery');
// keymap panel
const keysBtn = $('keysBtn'), keysPanel = $('keysPanel'), keysClose = $('keysClose'), keysReset = $('keysReset'), keysList = $('keysList');
const overlaysBtn = $('overlaysBtn'), overlaysPanel = $('overlaysPanel'), overlaysClose = $('overlaysClose');
const ovAddBtn = $('ovAddBtn'), ovFile = $('ovFile'), ovList = $('ovList');
const ovBlend = $('ovBlend'), ovFit = $('ovFit'), ovOpacity = $('ovOpacity'), ovOpacityVal = $('ovOpacityVal'), ovReact = $('ovReact'), ovReactVal = $('ovReactVal'), ovAuto = $('ovAuto');
// overlay panel
const brandBtn = $('brandBtn');
const brandPanel = $('brandPanel');
const brandClose = $('brandClose');
const logoBtn = $('logoBtn');
const logoInput = $('logoInput');
const logoClear = $('logoClear');
const titleInput = $('titleInput');
const subInput = $('subInput');
const posSeg = $('posSeg');
const sizeRange = $('sizeRange');
const sizeVal = $('sizeVal');
const fontSel = $('fontSel');
const styleSeg = $('styleSeg');
const titleSizeR = $('titleSize');
const titleSizeVal = $('titleSizeVal');
const subSizeR = $('subSize');
const subSizeVal = $('subSizeVal');
const letterRange = $('letterRange');
const letterVal = $('letterVal');
const titleColor = $('titleColor');
const subColor = $('subColor');
const glowColor = $('glowColor');
const glowRange = $('glowRange');
const glowVal = $('glowVal');
const outlineColor = $('outlineColor');
const outlineRange = $('outlineRange');
const outlineVal = $('outlineVal');
const offXRange = $('offXRange');
const offXVal = $('offXVal');
const offYRange = $('offYRange');
const offYVal = $('offYVal');
const alphaRange = $('alphaRange');
const alphaVal = $('alphaVal');
const reactSrcSel = $('reactSrc');
const amtRange = $('amtRange');
const amtVal = $('amtVal');
const fxChips = $('fxChips');
// automation panel
const autoBtn = $('autoBtn');
const autoPanel = $('autoPanel');
const autoClose = $('autoClose');
const autoProp = $('autoProp');
const autoValWrap = $('autoValWrap');
const autoEase = $('autoEase');
const autoGrab = $('autoGrab');
const autoAdd = $('autoAdd');
const autoTime = $('autoTime');
const autoList = $('autoList');
const kfCount = $('kfCount');
const autoExport = $('autoExport');
const autoImportBtn = $('autoImportBtn');
const autoClear = $('autoClear');
const autoImport = $('autoImport');
const kfMarks = $('kfMarks');

/* ---------- Canvas / bloom buffers ---------- */
const ctx = stage.getContext('2d');
let scene = document.createElement('canvas');     // full-res draw target (swapped during offline render)
let sctx = scene.getContext('2d');
let bloom = document.createElement('canvas');      // half-res blur buffer
let bctx = bloom.getContext('2d');

let W = 0, H = 0, CX = 0, CY = 0, DPR = 1;

// live performance controls: render scale <1 lowers internal resolution;
// maxFps>0 caps the render loop. Both trade fidelity for CPU/GPU headroom next to FL.
let renderScale = 1, maxFps = 0;

function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  const PR = DPR * renderScale;
  W = window.innerWidth;
  H = window.innerHeight;
  CX = W / 2; CY = H / 2;
  for (const c of [stage, scene]) { c.width = Math.max(1, Math.round(W * PR)); c.height = Math.max(1, Math.round(H * PR)); }
  bloom.width = Math.max(1, Math.floor(W * PR / 2));
  bloom.height = Math.max(1, Math.floor(H * PR / 2));
  for (const cc of [ctx, sctx]) cc.setTransform(PR, 0, 0, PR, 0, 0);
  bctx.setTransform(PR / 2, 0, 0, PR / 2, 0, 0);
  buildStars();
}
window.addEventListener('resize', resize);

/* ---------- Audio graph ----------
   source -> analyser (tap)         (everything)
   source -> gain -> destination    (files only — so live input never feeds back)
   source -> recTap -> recDest      (export audio: files + live)                    */
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let actx, analyser, gain, recTap, mediaSrc, micStream, displayStream, currentSrc;
let audioEl = null;          // HTMLAudioElement for file playback
let freq, time;              // analysis buffers
let isMic = false;           // true for any live source (mic / line / system)
let currentFile = null;      // the loaded File, kept for offline re-decode

function ensureCtx() {
  if (actx) return;
  actx = new AudioCtx();
  analyser = actx.createAnalyser();
  analyser.fftSize = 2048;
  analyser.smoothingTimeConstant = 0.82;
  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  gain = actx.createGain();                 // speaker monitor (files)
  gain.gain.value = vol.value / 100;
  gain.connect(actx.destination);
  recTap = actx.createGain();               // recording sum (no speaker output)
  freq = new Uint8Array(analyser.frequencyBinCount); // 1024
  time = new Uint8Array(analyser.fftSize);           // 2048
}

// wire a source into the graph; monitor=true routes it to the speakers
function routeSource(src, monitor) {
  if (currentSrc) { try { currentSrc.disconnect(); } catch (e) {} }
  currentSrc = src;
  src.connect(analyser);
  src.connect(recTap);
  if (monitor) src.connect(gain);
}

function loadFile(file) {
  ensureCtx();
  stopMic();
  if (audioEl) { audioEl.pause(); URL.revokeObjectURL(audioEl.src); }
  const url = URL.createObjectURL(file);
  audioEl = new Audio(url);
  audioEl.crossOrigin = 'anonymous';
  mediaSrc = actx.createMediaElementSource(audioEl);
  routeSource(mediaSrc, true);           // file plays through the speakers
  isMic = false;
  pluginActive = false;                  // plugin: a loaded file drives the visuals, not FL's live audio

  audioEl.addEventListener('loadedmetadata', () => {
    durTime.textContent = fmt(audioEl.duration);
    seek.value = 0;
    renderMarks();
  });
  audioEl.addEventListener('timeupdate', () => {
    if (!seeking && audioEl.duration) {
      seek.value = (audioEl.currentTime / audioEl.duration) * 1000;
      curTime.textContent = fmt(audioEl.currentTime);
    }
    autoTime.textContent = fmt(audioEl.currentTime);
    lyrTime.textContent = fmt(audioEl.currentTime);
  });
  audioEl.addEventListener('ended', () => setPlayIcon(false));
  audioEl.addEventListener('error', () => alert('Could not decode this audio file. Try a standard PCM WAV or MP3.'));

  currentFile = file;
  const name = file.name.replace(/\.[^.]+$/, '');
  trackName.textContent = name;
  if (!overlay.title) { overlay.title = name; titleInput.value = name; }
  reveal();
  play();
}

// mic / line-in / virtual-cable input (optional deviceId to pick the device)
async function useMic(deviceId) {
  ensureCtx();
  if (micStream) { micStream.getTracks().forEach(t => t.stop()); micStream = null; }
  stopDisplay();
  const constraints = { audio: deviceId ? { deviceId: { exact: deviceId }, echoCancellation: false, noiseSuppression: false, autoGainControl: false } : { echoCancellation: false, noiseSuppression: false, autoGainControl: false } };
  try { micStream = await navigator.mediaDevices.getUserMedia(constraints); }
  catch (e) { alert('Audio input access denied.'); return; }
  if (audioEl) audioEl.pause();
  isMic = true; currentFile = null;
  routeSource(actx.createMediaStreamSource(micStream), false);   // never to speakers
  const lbl = inputDevice.selectedOptions[0] && inputDevice.selectedOptions[0].textContent;
  trackName.textContent = '◉ ' + (deviceId && lbl ? lbl : 'Live Input');
  durTime.textContent = '∞';
  startLiveFade();
  reveal(); startLoop(); setPlayIcon(true);
  populateDevices();
}

// system / tab output via the screen-share dialog (no driver needed)
async function useSystemAudio() {
  ensureCtx();
  let stream;
  try { stream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true }); }
  catch (e) { return; }                 // user cancelled
  if (!stream.getAudioTracks().length) {
    stream.getTracks().forEach(t => t.stop());
    alert('No audio was shared. Re-try and tick "Share tab audio" (or "Share system audio" on Windows).');
    return;
  }
  stream.getVideoTracks().forEach(t => t.stop());   // we only need the audio
  if (micStream) { micStream.getTracks().forEach(t => t.stop()); micStream = null; }
  if (audioEl) audioEl.pause();
  displayStream = stream;
  isMic = true; currentFile = null;
  routeSource(actx.createMediaStreamSource(stream), false);
  stream.getAudioTracks()[0].addEventListener('ended', () => setPlayIcon(false));
  trackName.textContent = '◉ System / Tab Audio';
  durTime.textContent = '∞';
  startLiveFade();
  reveal(); startLoop(); setPlayIcon(true);
}

function stopDisplay() { if (displayStream) { displayStream.getTracks().forEach(t => t.stop()); displayStream = null; } }
function stopMic() {
  if (micStream) { micStream.getTracks().forEach(t => t.stop()); micStream = null; }
  stopDisplay();
  isMic = false;
}

async function populateDevices() {
  try {
    const devs = await navigator.mediaDevices.enumerateDevices();
    const ins = devs.filter(d => d.kind === 'audioinput');
    if (!ins.length) return;
    const cur = inputDevice.value;
    inputDevice.innerHTML = ins.map((d, i) => `<option value="${d.deviceId}">${d.label || ('Input ' + (i + 1))}</option>`).join('');
    if (cur) inputDevice.value = cur;
    inputDevice.classList.remove('hidden');
  } catch (e) {}
}

/* ---------- Transport ---------- */
let seeking = false;
let started = false;
let liveStartMs = 0;   // wall-clock start of the current live input (0 = not live)

function play() {
  if (isMic) return;
  if (actx.state === 'suspended') actx.resume();
  if (post.liveFade > 0 && audioEl && audioEl.currentTime < 0.05) startLiveFade();   // temporizer intro on start
  audioEl.play();
  setPlayIcon(true);
  startLoop();
}
function pause() { if (audioEl) audioEl.pause(); setPlayIcon(false); }
function toggle() {
  if (isMic) return;
  if (!audioEl) return;
  audioEl.paused ? play() : pause();
}
function setPlayIcon(playing) {
  // SVG elements have no .hidden IDL prop — toggle display directly
  iPlay.style.display = playing ? 'none' : 'block';
  iPause.style.display = playing ? 'block' : 'none';
}

function reveal() {
  started = true;
  intro.classList.add('hidden');
  intro.classList.remove('can-close');
  topbar.classList.remove('hidden');
  controls.classList.remove('hidden');
}

// re-open the input picker to switch source (file · live input · system audio).
// once a source is already running it becomes dismissable so it's not a trap.
function openIntro() {
  intro.classList.toggle('can-close', started);
  intro.classList.remove('hidden');
  populateDevices();   // refresh the mix-panel device list while we're at it
}
function closeIntro() {
  if (started) intro.classList.add('hidden');   // pre-start there's no source to keep — leave it up
}

function fmt(s) {
  if (!isFinite(s)) return '0:00';
  s = Math.floor(s);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/* =====================================================================
   ANALYSIS  —  bands + beat detection
   ===================================================================== */
const A = { bass: 0, mid: 0, treble: 0, level: 0, beat: 0, beatHit: false };
let beatCooldown = 0;

// user-tunable mix (Wave 1)
let sceneIntensity = 1, eqBass = 1, eqMid = 1, eqTreble = 1, beatSens = 1.4;

// spectral-flux beat detector state
let prevSpec = null;
const fluxHist = new Float32Array(43);   // ~0.7s @60fps
let fluxIdx = 0;

function avgRange(arr, a, b) {
  let s = 0; for (let i = a; i < b; i++) s += arr[i];
  return (s / (b - a)) / 255;
}

// onset detection via spectral flux + adaptive threshold (sensitivity = beatSens)
function detectBeat() {
  let flux = 0;
  if (prevSpec) { for (let i = 0; i < freq.length; i++) { const d = freq[i] - prevSpec[i]; if (d > 0) flux += d; } }
  else prevSpec = new Uint8Array(freq.length);
  prevSpec.set(freq);
  flux /= freq.length;                    // mean positive change per bin

  let mean = 0; for (let i = 0; i < fluxHist.length; i++) mean += fluxHist[i];
  mean /= fluxHist.length;
  let v = 0; for (let i = 0; i < fluxHist.length; i++) { const d = fluxHist[i] - mean; v += d * d; }
  const std = Math.sqrt(v / fluxHist.length);
  const thr = mean + beatSens * std + 0.15;

  A.beatHit = false;
  if (beatCooldown <= 0 && flux > thr) {
    A.beat = 1; A.beatHit = true; beatCooldown = 6;
    onBeat();
  }
  beatCooldown--;
  A.beat *= 0.90;
  fluxHist[fluxIdx] = flux; fluxIdx = (fluxIdx + 1) % fluxHist.length;
}

// compute bands + beat from whatever is currently in `freq` (live or offline)
function computeBands() {
  const n = freq.length;
  const rb = avgRange(freq, 0, Math.floor(n * 0.06));
  const rm = avgRange(freq, Math.floor(n * 0.06), Math.floor(n * 0.30));
  const rt = avgRange(freq, Math.floor(n * 0.30), Math.floor(n * 0.75));
  const rl = avgRange(freq, 0, n);

  detectBeat();                           // beat from raw spectrum (pre-EQ)

  // per-band gain × global scene intensity feeds the visuals
  A.bass = rb * eqBass * sceneIntensity;
  A.mid = rm * eqMid * sceneIntensity;
  A.treble = rt * eqTreble * sceneIntensity;
  A.level = rl * sceneIntensity;
}

function analyze() {
  if (pluginActive) { pluginAnalyzer(); return; }   // host-fed PCM (FL Studio / VST3 plugin)
  analyser.getByteFrequencyData(freq);
  analyser.getByteTimeDomainData(time);
  computeBands();
}

/* =====================================================================
   PLUGIN (FL STUDIO / VST3) MODE
   The host feeds us PCM over the JUCE WebView bridge — there is no Web Audio
   graph here. We mirror the offline analyzer: window → FFT → freq/time → bands,
   so the visuals react exactly as they do to a file or the AnalyserNode.
   ===================================================================== */
const IN_PLUGIN = !!window.SONAR_PLUGIN;
let pluginActive = false;
let pluginPCM = null;          // latest host audio window (Float32Array, fftSize)
let pluginAnalyzer = null;     // fills freq/time + bands from pluginPCM each frame

function makePluginAnalyzer() {
  const N = 2048;
  const hann = new Float32Array(N);
  for (let i = 0; i < N; i++) hann[i] = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / (N - 1));
  const re = new Float32Array(N), im = new Float32Array(N), smooth = new Float32Array(N / 2);
  const minDb = -90, maxDb = -10, sm = 0.82;    // match the live AnalyserNode config
  return function () {
    const src = pluginPCM;
    for (let i = 0; i < N; i++) {
      const s = src ? src[i] : 0;
      re[i] = s * hann[i]; im[i] = 0;
      time[i] = Math.max(0, Math.min(255, Math.round(128 + s * 128)));
    }
    fft(re, im);
    for (let k = 0; k < N / 2; k++) {
      let mag = Math.sqrt(re[k] * re[k] + im[k] * im[k]) / N;
      mag = sm * smooth[k] + (1 - sm) * mag; smooth[k] = mag;
      const db = 20 * Math.log10(mag || 1e-12);
      freq[k] = Math.max(0, Math.min(255, Math.round(255 * (db - minDb) / (maxDb - minDb))));
    }
    computeBands();
  };
}

function initPlugin() {
  const N = 2048;
  freq = new Uint8Array(N / 2);          // 1024 bins, as the AnalyserNode would give
  time = new Uint8Array(N);
  pluginPCM = new Float32Array(N);
  pluginAnalyzer = makePluginAnalyzer();
  pluginActive = true;
  isMic = true;                          // live source: wall-clock shuffle, ∞ length, no seeking
  currentFile = null;
  trackName.textContent = '◉ FL Studio';
  durTime.textContent = '∞';
  reveal(); setPlayIcon(true); startLoop();
  subscribeHostAudio();
}

// switch back to reacting to FL's live audio (after a file was loaded for export)
function useFLAudio() {
  if (audioEl) audioEl.pause();
  if (actx && gain) { try { gain.gain.cancelScheduledValues(actx.currentTime); gain.gain.value = vol.value / 100; } catch (e) {} }
  pluginActive = true;
  isMic = true;
  currentFile = null;
  trackName.textContent = '◉ FL Studio';
  durTime.textContent = '∞';
  seek.value = 0;
  setPlayIcon(true);
  startLoop();
}

// wire up the C++ <-> WebView bridge: audio in, transport reflect, preset load,
// and host-project state restore. Retries until window.__JUCE__ is injected.
function subscribeHostAudio() {
  const attach = () => {
    const be = window.__JUCE__ && window.__JUCE__.backend;
    if (!be) return false;
    be.addEventListener('audio', (b64) => {
      const bin = atob(b64), n = bin.length;
      const u8 = new Uint8Array(n);
      for (let i = 0; i < n; i++) u8[i] = bin.charCodeAt(i);
      const f = new Float32Array(u8.buffer);
      if (pluginPCM && f.length === pluginPCM.length) pluginPCM.set(f);
      else pluginPCM = f;
    });
    be.addEventListener('hostTransport', (d) => { if (pluginActive) setPlayIcon(!!(d && d.playing)); });
    be.addEventListener('loadPresetResult', (json) => { try { applyScene(JSON.parse(json)); } catch (e) {} });
    be.addEventListener('presetJson', (json) => { try { applyScene(JSON.parse(json)); } catch (e) {} });   // host project restore
    emitToHost('uiReady', {});                     // ask C++ to push any stored project state
    document.addEventListener('input', pluginMarkDirty, true);
    document.addEventListener('change', pluginMarkDirty, true);
    return true;
  };
  if (!attach()) window.addEventListener('load', attach);
}

function emitToHost(name, payload) {
  const be = window.__JUCE__ && window.__JUCE__.backend;
  if (be) be.emitEvent(name, payload);
}
function hostTransport(action) { emitToHost('transportControl', { action }); }
function hostLoadPreset() { emitToHost('loadPreset', {}); }
function pluginSaveBlob(blob, name) {
  const r = new FileReader();
  r.onload = () => emitToHost('saveFile', { name, mime: blob.type || '', data: (String(r.result).split(',')[1] || '') });
  r.readAsDataURL(blob);
}
// debounced push of the full scene JSON to C++ so the FL project remembers it
let _stateTimer = 0;
function pluginMarkDirty() {
  clearTimeout(_stateTimer);
  _stateTimer = setTimeout(() => { try { emitToHost('stateChanged', JSON.stringify(collectScene())); } catch (e) {} }, 1500);
}

/* =====================================================================
   SHARED VISUAL STATE
   ===================================================================== */
let hue = 200;                 // rotating base hue
let frame = 0;
const TAU = Math.PI * 2;

// post-FX + timing (Wave 1)
const post = { blur: 0, flashW: 0, flashB: 0, beatStrobe: 'off', fadeIn: 0, fadeOut: 0, liveFade: 0 };
const holdFlash = { white: false, black: false };   // momentary strobe while a key is held
let renderTime = 0, renderDur = 0, headroom = 0;

function isPlaying() { return offlineActive || pluginActive || isMic || (audioEl && !audioEl.paused); }

function fadeAlpha() {
  if (!renderDur) return 0;
  let a = 0;
  if (renderTime < 0) return 1;                                   // black during intro headroom
  if (post.fadeIn > 0 && renderTime < post.fadeIn) a = Math.max(a, 1 - renderTime / post.fadeIn);
  if (post.fadeOut > 0 && renderTime > renderDur - post.fadeOut) a = Math.max(a, (renderTime - (renderDur - post.fadeOut)) / post.fadeOut);
  return Math.min(1, Math.max(0, a));
}

// wall-clock fade-up from black for live inputs (mic / system). The song-clock
// fadeIn above needs a timeline, which live sources don't have — so this runs
// off performance.now(). Armed by the "Start temporizer" control and triggered
// the moment an input goes live.
let liveFadeStart = 0;               // performance.now() when the fade began (0 = idle)
function startLiveFade() {
  if (post.liveFade <= 0) { liveFadeStart = 0; return; }
  liveFadeStart = performance.now();                       // visual fade up from black
  // audio fade-in: ramp the monitor gain 0 → current volume over the same window
  if (!pluginActive && actx && gain) {
    const target = Math.max(0.0001, vol.value / 100), t0 = actx.currentTime;
    try {
      gain.gain.cancelScheduledValues(t0);
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(target, t0 + post.liveFade);
    } catch (e) {}
  }
}
function liveFadeAlpha() {
  if (!liveFadeStart) return 0;
  const t = (performance.now() - liveFadeStart) / 1000;
  if (t >= post.liveFade) { liveFadeStart = 0; return 0; }
  return 1 - t / post.liveFade;      // 1 (full black) → 0 (normal)
}

// transient state for the extra scenes
let terrainHist = [];
let rings = [];
let raysRot = 0;
let mtxCols = [];
let webNodes = [];
let vortexRot = 0;
let cassetteImg = null;        // CassetteRemix.svg, loaded at init
let reelSpin = 0;              // shared reel rotation (cassette scene)
let cassRayRot = 0;            // backdrop light-ray rotation (cassette scene)
let fireflies = [];            // glow-mote swarm (fireflies scene)
let jellies = [], jellyBubbles = [];   // jellyfish scene
let helixRot = 0;              // double-helix rotation
let radarRot = 0, radarBlips = [];     // radar sweep + contacts
let cityBlds = [], cityW = 0, cityBolt = 0;  // skyline buildings (rebuilt on resize) + lightning
let fwRockets = [], fwSparks = [];     // fireworks
let emberParts = [];           // inferno embers
let orbitBodies = [];          // orbits planets
let bunkerRot = 0, bunkerSmoke = [];   // bunker fan spin + smoke plumes
let bunkerFail = 0, bunkerChains = []; // bunker light-failure countdown + hanging chains
let pressRam = 0, pressDrop = false, pressImpact = 0, pressSparks = [], pressSteam = [], pressBeacon = 0;  // press scene
let boFlash = 0, boPattern = 0, boSeed = 1;            // blackout strobe energy / pattern / per-flash seed
let teslaArcs = [], teslaSparks = [];                  // tesla bolts + dripping embers
let shaftZ = 0, shaftShake = 0;                        // shaft descent distance + impact shake
let monoCracks = [], monoDust = [], monoSpall = [];    // monolith fissures / drifting dust / spall chips
let grindRot = 0, grindJolt = 0, grindSparks = [], grindShav = [];  // grinder gears + debris
let sentX = 0, sentDir = 1, sentLock = 0, sentTarget = 0.5, sentFlare = 0;  // sentinel eye sweep / lock-on
let razorSeams = [], razorDrops = [], razorShear = null;            // razor cuts / molten drips / frame shear
/* --- TUNOX block (modes 40-49) --- */
let sigilGlyph = null, sigilRot = 0, sigilFlash = 0, sigilAsh = [];  // sigil glyph / spin / rewrite flash / ash
let thornVines = [], thornFlash = 0;                                 // thorns creeping in from the edge
let cruPour = 0, cruShake = 0, cruSplash = [], cruSmoke = [];        // crucible pour / ladle shake / splash / smoke
let hookRows = [], hookW = 0, hookSwing = 0, hookFlash = 0;          // hanging chains (rebuilt on resize) + backlight
let ritRot = 0, ritPulse = 0, ritRings = [], ritMotes = [];          // ritual circle spin / kick pulse / shock rings / ash
let veinNet = null, veinW = 0, veinH = 0, veinPulses = [];           // vein network (rebuilt on resize) + blood pulses
let cathDust = [], cathFlash = 0, cathSway = 0;                      // cathedral dust / strobe / colonnade sway
let bwCoils = [], bwSparks = [], bwFlash = 0;                        // razorwire coils / break sparks / snap flash
let rustBlooms = [], rustFlakes = [], rustW = 0;                     // corrosion blooms (rebuilt on resize) + flakes
let rustHit = 0, rustHitX = 0.5, rustHitY = 0.5, rustSweep = 0;      // hammer blow + inspection lamp
let hexCols = [], hexW = 0, hexTear = 0, hexLock = 0;                // datastream columns / frame tear / name lock-in

/* --- starfield --- */
let stars = [];
function buildStars() {
  const count = Math.round((W * H) / 1600);
  stars = [];
  for (let i = 0; i < count; i++) stars.push(newStar(true));
}
function newStar(spread) {
  return {
    x: (Math.random() - 0.5) * W,
    y: (Math.random() - 0.5) * H,
    z: spread ? Math.random() * W : W,
    pz: 0,
  };
}

/* --- particles --- */
const particles = [];
function onBeat() {
  if (!isPlaying()) return;                 // particles only while music plays
  if (post.beatStrobe === 'white') post.flashW = 1;
  else if (post.beatStrobe === 'black') post.flashB = 1;
  const burst = 18 + Math.floor(A.bass * 30);
  for (let i = 0; i < burst; i++) {
    const a = Math.random() * TAU;
    const sp = 2 + Math.random() * 7 * (0.5 + A.bass);
    particles.push({
      x: CX, y: CY,
      vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
      life: 1, hue: hue + Math.random() * 80 - 40,
      r: 1 + Math.random() * 2.5,
    });
  }
  if (particles.length > 600) particles.splice(0, particles.length - 600);
}
function drawParticles(c) {
  c.globalCompositeOperation = 'lighter';
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    p.vx *= 0.96; p.vy *= 0.96;
    p.life -= 0.012;
    if (p.life <= 0) { particles.splice(i, 1); continue; }
    c.beginPath();
    c.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.life})`;
    c.arc(p.x, p.y, p.r * (0.4 + p.life), 0, TAU);
    c.fill();
  }
}

/* --- helpers --- */
// scene background config: default lets each scene paint its own
const bg = { type: 'default', c1: '#05060c', c2: '#0a0a16', img: null };
const hexToRgb = h => { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
function drawCover(c, img, w, h) {
  const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const iw = img.naturalWidth * s, ih = img.naturalHeight * s;
  c.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
}
// opaque background for "clear" scenes; returns true if it painted a custom bg
function paintBg(c) {
  c.globalCompositeOperation = 'source-over';
  if (bg.type === 'solid') { c.fillStyle = bg.c1; c.fillRect(0, 0, W, H); return true; }
  if (bg.type === 'gradient') { const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, bg.c1); g.addColorStop(1, bg.c2); c.fillStyle = g; c.fillRect(0, 0, W, H); return true; }
  if (bg.type === 'image' && bg.img && bg.img.complete) { c.fillStyle = '#000'; c.fillRect(0, 0, W, H); drawCover(c, bg.img, W, H); return true; }
  return false;
}

function fade(c, a) { // motion-blur background (trail scenes)
  c.globalCompositeOperation = 'source-over';
  if (bg.type === 'solid' || bg.type === 'gradient') {
    const [r, g, b] = hexToRgb(bg.c1);
    c.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
  } else {
    c.fillStyle = `rgba(5, 6, 12, ${a})`;
  }
  c.fillRect(0, 0, W, H);
}
function bgGradient(c, h1, h2) {
  if (paintBg(c)) return;                 // custom background overrides the scene default
  const g = c.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, h1); g.addColorStop(1, h2);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = g; c.fillRect(0, 0, W, H);
}
const polar = (cx, cy, r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];

/* =====================================================================
   BRAND OVERLAY — reactive logo + title + subtitle (drawn into scene,
   so it gets the bloom halo and is captured by screen recording)
   ===================================================================== */
const overlay = {
  img: null,
  title: '',
  sub: '',
  pos: 'center',          // top | center | lower
  offX: 0, offY: 0,       // fine offset, fraction of W/H (-0.5..0.5)
  size: 0.28,             // logo width as fraction of min(W,H)
  titleSize: 0.052,       // fraction of min(W,H)
  subSize: 0.026,
  font: '"Space Grotesk", system-ui, sans-serif',
  bold: true, italic: false, upper: false,
  titleColor: '#ffffff',
  subColor: '#bfe6ff',
  glowColor: '#6cf0ff',   // custom glow color (used when Hue-cycle is off)
  glowSize: 1,            // glow strength multiplier
  outlineColor: '#000000',
  outlineW: 0,            // outline width as fraction of font size (0 = off)
  letter: 0.04,           // letter spacing in em
  alpha: 1,
  // reactivity
  reactSrc: 'bass',       // bass | mid | treble | level | beat
  reactAmt: 1,
  fx: { pulse: true, bounce: false, shake: false, wobble: false, glow: true, hue: false, flicker: false },
};

const textCase = t => overlay.upper ? t.toUpperCase() : t;
const hexGlow = hex => (/^#[0-9a-f]{6}$/i.test(hex) ? hex + 'cc' : hex);

// draw a line of text, layered for legibility on ANY background:
//   1) soft coloured neon glow (the aesthetic)   2) tight dark contrast halo
//   (lifts bright text off bright scenes)   3) optional user outline   4) crisp fill
function drawText(c, txt, x, y, fs, fill, glow, glowCol, baseBlur) {
  const ow = overlay.outlineW * fs;
  const blur = baseBlur * overlay.glowSize;

  // 1) wide neon glow — cast from a pass we paint over later
  if (glow) {
    c.shadowColor = glowCol; c.shadowBlur = blur;
    c.fillStyle = fill; c.fillText(txt, x, y);
    c.shadowBlur = 0;
  }

  // 2) dark contrast halo so the fill stays readable over light/busy backgrounds
  c.shadowColor = 'rgba(0,0,0,0.85)';
  c.shadowBlur = Math.max(3, fs * 0.18);
  c.fillStyle = 'rgba(0,0,0,0.9)';
  c.fillText(txt, x, y);
  c.shadowBlur = 0;

  // 3) optional hard outline on top of the halo
  if (ow > 0) {
    c.lineJoin = 'round'; c.miterLimit = 2;
    c.lineWidth = ow; c.strokeStyle = overlay.outlineColor;
    c.strokeText(txt, x, y);
  }

  // 4) crisp fill
  c.fillStyle = fill;
  c.fillText(txt, x, y);
}

function drawOverlay(c) {
  if (!overlay.img && !overlay.title && !overlay.sub) return;

  const minWH = Math.min(W, H);
  const fx = overlay.fx;
  const srcVal = ({ bass: A.bass, mid: A.mid, treble: A.treble, level: A.level, beat: A.beat })[overlay.reactSrc] || 0;
  const drive = srcVal * overlay.reactAmt;

  const pulse   = fx.pulse   ? 1 + drive * 0.22 : 1;
  const bounce  = fx.bounce  ? -drive * minWH * 0.05 : 0;
  const shakeX  = fx.shake   ? (Math.random() - 0.5) * drive * 24 : 0;
  const shakeY  = fx.shake   ? (Math.random() - 0.5) * drive * 24 : 0;
  const wobble  = fx.wobble  ? Math.sin(frame * 0.16) * drive * 0.12 : 0; // radians
  const flicker = fx.flicker ? 1 - Math.random() * Math.min(drive, 1) * 0.6 : 1;
  const useHue  = fx.hue;
  const glow    = fx.glow;
  const glowHue = `hsla(${hue}, 100%, 72%, 0.9)`;
  const glowCol = useHue ? glowHue : hexGlow(overlay.glowColor);

  let anchorY = overlay.pos === 'top' ? H * 0.16
              : overlay.pos === 'lower' ? H * 0.80
              : CY;
  anchorY += overlay.offY * H + bounce + shakeY;
  const ax = CX + overlay.offX * W + shakeX;

  // measure stacked block
  const items = [];
  let totalH = 0;
  const gap = minWH * 0.022;

  if (overlay.img && overlay.img.complete && overlay.img.naturalWidth) {
    const scale = (minWH * overlay.size / overlay.img.naturalWidth) * pulse;
    items.push({ type: 'img', w: overlay.img.naturalWidth * scale, h: overlay.img.naturalHeight * scale });
    totalH += items[items.length - 1].h;
  }
  if (overlay.title) {
    const fs = minWH * overlay.titleSize * pulse;
    items.push({ type: 'title', fs }); totalH += fs * 1.1;
  }
  if (overlay.sub) {
    const fs = minWH * overlay.subSize * (1 + (pulse - 1) * 0.6);
    items.push({ type: 'sub', fs }); totalH += fs * 1.2;
  }
  totalH += gap * Math.max(0, items.length - 1);

  let y = anchorY - totalH / 2;
  const weight = overlay.bold ? '700' : '400';
  const ital = overlay.italic ? 'italic ' : '';

  c.save();
  c.globalCompositeOperation = 'source-over';
  c.globalAlpha = Math.max(0, overlay.alpha * flicker);
  c.textAlign = 'center';
  c.textBaseline = 'top';
  if (wobble) { c.translate(ax, anchorY); c.rotate(wobble); c.translate(-ax, -anchorY); }

  for (const it of items) {
    if (it.type === 'img') {
      if (glow) { c.shadowColor = glowCol; c.shadowBlur = (26 + A.level * 45) * overlay.glowSize; }
      c.drawImage(overlay.img, ax - it.w / 2, y, it.w, it.h);
      c.shadowBlur = 0;
      y += it.h + gap;
    } else if (it.type === 'title') {
      c.font = `${ital}${weight} ${it.fs}px ${overlay.font}`;
      if ('letterSpacing' in c) c.letterSpacing = `${it.fs * overlay.letter}px`;
      const fill = useHue ? `hsl(${hue}, 100%, 75%)` : overlay.titleColor;
      drawText(c, textCase(overlay.title), ax, y, it.fs, fill, glow, glowCol, 22 + A.level * 40);
      if ('letterSpacing' in c) c.letterSpacing = '0px';
      y += it.fs * 1.1 + gap;
    } else {
      c.font = `${ital}400 ${it.fs}px ${overlay.font}`;
      if ('letterSpacing' in c) c.letterSpacing = `${it.fs * (overlay.letter + 0.06)}px`;
      const fill = useHue ? `hsl(${(hue + 30) % 360}, 70%, 80%)` : overlay.subColor;
      drawText(c, textCase(overlay.sub), ax, y, it.fs, fill, glow, glowCol, 16 + A.level * 30);
      if ('letterSpacing' in c) c.letterSpacing = '0px';
      y += it.fs * 1.2 + gap;
    }
  }
  c.restore();
}

/* =====================================================================
   AUTOMATION ENGINE — keyframe any property against the song timeline.
   Numeric & color tracks interpolate; scene/enum/bool tracks step.
   ===================================================================== */
const AUTOMATABLE = [
  { key: 'mode',         label: 'Scene',          type: 'enum', opts: [] },   // filled from NAMES at init
  { key: 'alpha',        label: 'Text opacity',   type: 'num', min: 0, max: 1 },
  { key: 'size',         label: 'Logo size',      type: 'num', min: 0.06, max: 0.7 },
  { key: 'titleSize',    label: 'Title size',     type: 'num', min: 0.02, max: 0.16 },
  { key: 'subSize',      label: 'Subtitle size',  type: 'num', min: 0.01, max: 0.10 },
  { key: 'letter',       label: 'Letter spacing', type: 'num', min: -0.05, max: 0.40 },
  { key: 'offX',         label: 'Offset X',       type: 'num', min: -0.5, max: 0.5 },
  { key: 'offY',         label: 'Offset Y',       type: 'num', min: -0.5, max: 0.5 },
  { key: 'glowSize',     label: 'Glow strength',  type: 'num', min: 0, max: 2.5 },
  { key: 'outlineW',     label: 'Outline width',  type: 'num', min: 0, max: 0.14 },
  { key: 'reactAmt',     label: 'React amount',   type: 'num', min: 0, max: 3 },
  { key: 'titleColor',   label: 'Title color',    type: 'color' },
  { key: 'subColor',     label: 'Subtitle color', type: 'color' },
  { key: 'glowColor',    label: 'Glow color',     type: 'color' },
  { key: 'outlineColor', label: 'Outline color',  type: 'color' },
  { key: 'pos',          label: 'Anchor',         type: 'enum', opts: [['top', 'Top'], ['center', 'Center'], ['lower', 'Lower']] },
  { key: 'font',         label: 'Font',           type: 'enum', opts: [] },   // filled from fontSel at init
  { key: 'fx.pulse',     label: 'FX · Pulse',     type: 'bool' },
  { key: 'fx.bounce',    label: 'FX · Bounce',    type: 'bool' },
  { key: 'fx.shake',     label: 'FX · Shake',     type: 'bool' },
  { key: 'fx.wobble',    label: 'FX · Wobble',    type: 'bool' },
  { key: 'fx.glow',      label: 'FX · Glow',      type: 'bool' },
  { key: 'fx.hue',       label: 'FX · Hue cycle', type: 'bool' },
  { key: 'fx.flicker',   label: 'FX · Flicker',   type: 'bool' },
];
const META = k => AUTOMATABLE.find(a => a.key === k);

let automations = {};   // { propKey: [ {t, v, ease}, ... sorted by t ] }

const EASE = {
  linear: p => p,
  in:     p => p * p,
  out:    p => 1 - (1 - p) * (1 - p),
  inout:  p => p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2,
  step:   () => 0,        // holds the start value until the next keyframe
};

const hx = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
function lerpColor(a, b, p) {
  const ca = hx(a), cb = hx(b);
  return '#' + [0, 1, 2].map(i => Math.round(ca[i] + (cb[i] - ca[i]) * p).toString(16).padStart(2, '0')).join('');
}

function sampleTrack(ks, t, type) {
  if (t <= ks[0].t) return ks[0].v;
  const last = ks[ks.length - 1];
  if (t >= last.t) return last.v;
  let i = 0; while (i < ks.length - 1 && t >= ks[i + 1].t) i++;
  const a = ks[i], b = ks[i + 1];
  if (type === 'num' || type === 'color') {
    let p = (t - a.t) / ((b.t - a.t) || 1);
    p = (EASE[b.ease] || EASE.linear)(p);
    return type === 'num' ? a.v + (b.v - a.v) * p : lerpColor(a.v, b.v, p);
  }
  return a.v;            // enum / bool / scene — hold (step)
}

function getProp(key) {
  if (key === 'mode') return mode;
  if (key.startsWith('fx.')) return overlay.fx[key.slice(3)];
  return overlay[key];
}
function setProp(key, v) {
  if (key === 'mode') { const m = Math.round(v); if (m !== mode) setMode(m); return; }
  if (key.startsWith('fx.')) { overlay.fx[key.slice(3)] = !!v; return; }
  overlay[key] = v;
}

function applyAutomation(t) {
  for (const key in automations) {
    const ks = automations[key];
    if (ks && ks.length) setProp(key, sampleTrack(ks, t, META(key).type));
  }
}

function addKeyframe(key, t, v, ease) {
  if (!automations[key]) automations[key] = [];
  const arr = automations[key];
  const idx = arr.findIndex(k => Math.abs(k.t - t) < 0.02);   // replace if same instant
  if (idx >= 0) arr[idx] = { t, v, ease }; else arr.push({ t, v, ease });
  arr.sort((a, b) => a.t - b.t);
  renderAuto();
}
function deleteKeyframe(key, t) {
  const arr = automations[key]; if (!arr) return;
  const idx = arr.findIndex(k => Math.abs(k.t - t) < 0.005);
  if (idx >= 0) arr.splice(idx, 1);
  if (!arr.length) delete automations[key];
  renderAuto();
}

/* ----- automation UI ----- */
const fmt2 = s => { const m = Math.floor(s / 60), sec = s % 60; return `${m}:${sec < 10 ? '0' : ''}${sec.toFixed(1)}`; };
const curTimeSec = () => (audioEl && !isMic && isFinite(audioEl.currentTime)) ? audioEl.currentTime : 0;
let curProp = AUTOMATABLE[0];

function valDisplay(meta, v) {
  if (meta.type === 'num') return (+v).toFixed(3);
  if (meta.type === 'color') return `<i style="background:${v}"></i>${v}`;
  if (meta.type === 'bool') return v ? 'On' : 'Off';
  if (meta.key === 'mode') return NAMES[v] || v;
  if (meta.key === 'font') return (meta.opts.find(o => o[0] === v) || [, v])[1].split(',')[0].replace(/"/g, '');
  return (meta.opts.find(o => o[0] === v) || [, v])[1];
}

function buildValControl() {
  curProp = META(autoProp.value);
  const t = curProp.type;
  if (t === 'num') {
    const step = (curProp.max - curProp.min) / 200;
    autoValWrap.innerHTML = `<input id="autoVal" type="range" min="${curProp.min}" max="${curProp.max}" step="${step}" /><span id="autoValShow" class="time"></span>`;
  } else if (t === 'color') {
    autoValWrap.innerHTML = `<input id="autoVal" type="color" />`;
  } else { // enum or bool
    const opts = t === 'bool' ? [[true, 'On'], [false, 'Off']] : curProp.opts;
    autoValWrap.innerHTML = `<select id="autoVal">${opts.map(o => `<option value="${o[0]}">${o[1]}</option>`).join('')}</select>`;
  }
  setValControl(getProp(curProp.key));
  if (t === 'num') {
    const av = document.getElementById('autoVal');
    av.addEventListener('input', () => { document.getElementById('autoValShow').textContent = (+av.value).toFixed(3); });
  }
}
function setValControl(v) {
  const av = document.getElementById('autoVal'); if (!av) return;
  av.value = curProp.type === 'bool' ? String(!!v) : v;
  if (curProp.type === 'num') { const s = document.getElementById('autoValShow'); if (s) s.textContent = (+v).toFixed(3); }
}
function readAutoVal() {
  const av = document.getElementById('autoVal');
  const t = curProp.type;
  if (t === 'num') return +av.value;
  if (t === 'bool') return av.value === 'true';
  if (t === 'enum') return curProp.key === 'mode' ? +av.value : av.value;
  return av.value; // color
}

function renderAuto() {
  // keyframe list (all tracks, by time)
  const rows = [];
  for (const key in automations) for (const k of automations[key]) rows.push({ key, ...k });
  rows.sort((a, b) => a.t - b.t || a.key.localeCompare(b.key));
  autoList.innerHTML = rows.length ? rows.map(r => {
    const m = META(r.key);
    return `<div class="kf-row" data-key="${r.key}" data-t="${r.t}">
      <span class="kf-t">${fmt2(r.t)}</span>
      <span class="kf-p">${m.label}</span>
      <span class="kf-v">${valDisplay(m, r.v)} · ${r.ease}</span>
      <button class="kf-x" title="Delete">✕</button>
    </div>`;
  }).join('') : '<div class="kf-empty">No keyframes yet</div>';
  kfCount.textContent = rows.length;
  renderMarks();
}
function renderMarks() {
  if (!audioEl || !audioEl.duration) { kfMarks.innerHTML = ''; return; }
  const d = audioEl.duration;
  let h = '';
  for (const key in automations) for (const k of automations[key])
    h += `<i class="kf-mark" style="left:${Math.min(100, k.t / d * 100)}%"></i>`;
  kfMarks.innerHTML = h;
}

/* =====================================================================
   LYRICS — LRC load, manual tap-stamp timeline, on-canvas karaoke render
   ===================================================================== */
const lyrics = {
  lines: [],                 // [{ t, text }] sorted by t (t can be null = unstamped)
  enabled: true,
  size: 0.04, color: '#ffffff', pos: 'lower',  // top | center | lower
  showNext: true,
  bpm: 0, firstBeat: 0,
};

function parseLRC(text) {
  const out = [];
  const re = /\[(\d{1,2}):(\d{2})(?:[.:](\d{1,3}))?\]/g;
  for (const raw of text.split(/\r?\n/)) {
    const stamps = [];
    let m, body = raw;
    while ((m = re.exec(raw)) !== null) {
      const cs = m[3] ? parseInt(m[3].padEnd(3, '0').slice(0, 3), 10) / 1000 : 0;
      stamps.push(+m[1] * 60 + +m[2] + cs);
    }
    body = raw.replace(re, '').trim();
    if (stamps.length) for (const t of stamps) out.push({ t, text: body });
    else if (body) out.push({ t: null, text: body });   // plain line, to be stamped
  }
  out.sort((a, b) => (a.t ?? 1e9) - (b.t ?? 1e9));
  return out;
}

function toLRC() {
  return lyrics.lines.map(l => {
    if (l.t == null) return l.text;
    const m = Math.floor(l.t / 60), s = (l.t % 60).toFixed(2).padStart(5, '0');
    return `[${String(m).padStart(2, '0')}:${s}]${l.text}`;
  }).join('\n');
}

function activeLyricIdx(t) {
  let idx = -1, best = -1;
  for (let i = 0; i < lyrics.lines.length; i++) {
    const lt = lyrics.lines[i].t;
    if (lt != null && lt <= t && lt >= best) { best = lt; idx = i; }
  }
  return idx;
}

function drawLyrics(c) {
  if (!lyrics.enabled || !lyrics.lines.length) return;
  const idx = activeLyricIdx(renderTime);
  if (idx < 0) return;
  const minWH = Math.min(W, H);
  const fs = minWH * lyrics.size;
  const y = lyrics.pos === 'top' ? H * 0.12 : lyrics.pos === 'center' ? CY : H * 0.88;
  c.save();
  c.globalCompositeOperation = 'source-over';
  c.textAlign = 'center'; c.textBaseline = 'middle';
  c.font = `600 ${fs}px "Space Grotesk", system-ui, sans-serif`;
  c.shadowColor = 'rgba(0,0,0,0.85)'; c.shadowBlur = fs * 0.5;
  c.fillStyle = lyrics.color;
  c.fillText(lyrics.lines[idx].text, CX, y);
  if (lyrics.showNext && lyrics.lines[idx + 1]) {
    c.font = `400 ${fs * 0.62}px "Space Grotesk", system-ui, sans-serif`;
    c.globalAlpha = 0.5;
    c.fillText(lyrics.lines[idx + 1].text, CX, y + fs * 1.1);
  }
  c.restore();
}

/* tempo estimate from the decoded buffer (onset envelope autocorrelation) */
async function detectBPM() {
  if (!currentFile) { alert('Load a track first.'); return; }
  const ab = await currentFile.arrayBuffer();
  const buf = await actx.decodeAudioData(ab.slice(0));
  const sr = buf.sampleRate, d = buf.getChannelData(0), hop = 512;
  const frames = Math.floor(d.length / hop);
  const env = new Float32Array(frames);
  let prev = 0;
  for (let i = 0; i < frames; i++) {
    let e = 0; for (let j = 0; j < hop; j++) { const s = d[i * hop + j] || 0; e += s * s; }
    e = Math.sqrt(e / hop);
    env[i] = Math.max(0, e - prev); prev = e;       // positive energy flux
  }
  const fps = sr / hop;
  let best = 0, bestBpm = 120;
  for (let bpm = 70; bpm <= 180; bpm += 0.5) {
    const lag = Math.round(fps * 60 / bpm);
    let sum = 0; for (let i = lag; i < frames; i++) sum += env[i] * env[i - lag];
    if (sum > best) { best = sum; bestBpm = bpm; }
  }
  lyrics.bpm = Math.round(bestBpm * 10) / 10;
  // first strong onset as grid origin
  let peak = 0, at = 0; for (let i = 0; i < Math.min(frames, fps * 8); i++) if (env[i] > peak) { peak = env[i]; at = i; }
  lyrics.firstBeat = at / fps;
  return lyrics.bpm;
}

function snapToBeat(t) {
  if (!lyrics.bpm) return t;
  const beat = 60 / lyrics.bpm;
  return Math.max(0, lyrics.firstBeat + Math.round((t - lyrics.firstBeat) / beat) * beat);
}

/* =====================================================================
   RESOURCE GALLERY (IndexedDB) + SCENE PACKAGE (export / import bundle)
   ===================================================================== */
let _db = null;
function idb() {
  return new Promise((res, rej) => {
    if (_db) return res(_db);
    const r = indexedDB.open('sonar', 2);
    r.onupgradeneeded = () => {
      const db = r.result;
      if (!db.objectStoreNames.contains('images')) db.createObjectStore('images', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('overlays')) db.createObjectStore('overlays', { keyPath: 'id' });
    };
    r.onsuccess = () => { _db = r.result; res(_db); };
    r.onerror = () => rej(r.error);
  });
}
async function idbPut(store, val) { const db = await idb(); return new Promise((res, rej) => { const tx = db.transaction(store, 'readwrite'); tx.objectStore(store).put(val); tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); }); }
async function idbAll(store) { const db = await idb(); return new Promise((res, rej) => { const tx = db.transaction(store, 'readonly'); const q = tx.objectStore(store).getAll(); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); }); }
async function idbDel(store, id) { const db = await idb(); return new Promise((res, rej) => { const tx = db.transaction(store, 'readwrite'); tx.objectStore(store).delete(id); tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); }); }

function imgToDataURL(img, max) {
  if (!img || !img.naturalWidth) return null;
  const s = max ? Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight)) : 1;
  const cv = document.createElement('canvas');
  cv.width = Math.round(img.naturalWidth * s); cv.height = Math.round(img.naturalHeight * s);
  cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
  return cv.toDataURL('image/png');
}
const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src; });

async function renderGallery() {
  let items = [];
  try { items = await idbAll('images'); } catch (e) { return; }
  logoGallery.innerHTML = items.map(it =>
    `<div class="g-item" data-id="${it.id}" title="${it.name || ''}"><img src="${it.thumb}" alt=""><button class="g-del" title="Delete">✕</button></div>`
  ).join('');
}
async function saveCurrentLogo() {
  if (!overlay.img) { alert('No logo loaded to save.'); return; }
  const full = imgToDataURL(overlay.img, 1024);
  const thumb = imgToDataURL(overlay.img, 160);
  await idbPut('images', { id: Date.now().toString(36), name: 'logo', full, thumb });
  renderGallery();
}

/* =====================================================================
   VIDEO OVERLAYS — launchable VJ clips drawn over the scene (so they get
   bloom + are captured by screen-recording). Clips live in IndexedDB so the
   bank survives reloads. One overlay layer is active at a time.
   Trigger modes: loop (toggle), once (play & auto-hide), hold (while key held).
   ===================================================================== */
const overlays = {
  slots: [],            // { id, name, url, video, mode }
  active: -1,           // index currently playing, or -1
  blend: 'screen',      // canvas composite op: source-over | lighter | screen
  opacity: 1,
  fit: 'cover',         // cover | contain
  react: 0,             // 0..1 — audio-driven opacity
  auto: false,          // auto-launch on smart-shuffle musical events
  autoActive: false,    // the current overlay was auto-launched (vs manual)
  autoUntil: 0,         // song time to auto-clear at
};

/* ---- clip warming -------------------------------------------------------
   A cold <video> costs a fetch + demux + decode on its first play(), which
   lands as a visible stall the first time a clip is triggered — exactly the
   wrong moment. So we warm clips ahead of time: load each one until its first
   frame is decoded (readyState >= HAVE_CURRENT_DATA), then stop.
   Deliberately NOT a blanket preload='auto': the library can be gigabytes, and
   we only need the head of each file to make play() instant. Server clips get
   dropped back to 'metadata' once warm so the browser stops pulling the rest.
   Warming runs a couple at a time in the background, key-mapped clips first,
   and anything the pointer touches jumps the queue. */
const WARM_CONCURRENCY = 2;
let warmQueue = [], warmActive = 0, warmRenderT = 0;

// warming fires a lot of small state changes; coalesce them so we aren't
// rebuilding the clip list's innerHTML out from under a click
function scheduleOverlayRender() {
  if (warmRenderT) return;
  warmRenderT = setTimeout(() => { warmRenderT = 0; renderOverlays(); }, 120);
}

function warmOverlay(s) {
  if (!s || !s.video || s.ready || s.failed) return Promise.resolve();
  if (s._warm) return s._warm;
  const v = s.video;
  s.warming = true; scheduleOverlayRender();
  s._warm = (v.dataset.lazySrc ? ensureOvSrc(v) : Promise.resolve()).then(() => new Promise(res => {
    const finish = (ok) => {
      v.removeEventListener('loadeddata', onOk);
      v.removeEventListener('error', onErr);
      s.warming = false;
      if (ok) {
        s.ready = true;
        // enough to start instantly — tell the browser to stop fetching the
        // rest of a big server clip until it's actually played
        if (s.server) { try { v.preload = 'metadata'; } catch (e) {} }
      } else s.failed = true;
      scheduleOverlayRender(); res();
    };
    const onOk = () => finish(true), onErr = () => finish(false);
    if (v.readyState >= 2) return finish(true);      // already decoded a frame
    v.addEventListener('loadeddata', onOk);
    v.addEventListener('error', onErr);
    // If this clip has already been triggered, play() is driving the load —
    // calling load() here would abort it. Just watch and let it come up.
    const live = overlays.active >= 0 && overlays.slots[overlays.active] === s;
    try { v.preload = 'auto'; if (!live) v.load(); } catch (e) { finish(false); }
  }));
  return s._warm;
}

// queue by id, not index — deleting a clip shifts every index after it
function queueWarm(id, front) {
  const s = overlays.slots.find(x => x.id === id);
  if (!s || s.ready || s.failed || s.warming) return;
  const at = warmQueue.indexOf(id);
  if (at >= 0) { if (!front) return; warmQueue.splice(at, 1); }
  front ? warmQueue.unshift(id) : warmQueue.push(id);
  pumpWarm();
}
function pumpWarm() {
  while (warmActive < WARM_CONCURRENCY && warmQueue.length) {
    const id = warmQueue.shift();
    const s = overlays.slots.find(x => x.id === id);
    if (!s || s.ready || s.failed) continue;
    warmActive++;
    warmOverlay(s).then(pumpDone, pumpDone);
  }
}
function pumpDone() { warmActive--; pumpWarm(); }

// warm the whole bank in the background; the 8 key-mapped slots go first
// because those are the ones fired blind in the middle of a set
function warmAllOverlays() {
  const idx = overlays.slots.map((_, i) => i);
  idx.sort((a, b) => (a < 8 ? 0 : 1) - (b < 8 ? 0 : 1) || a - b);
  for (const i of idx) queueWarm(overlays.slots[i].id);
}
const idle = window.requestIdleCallback || (fn => setTimeout(fn, 200));

function makeOvVideo(url, preload) {
  const v = document.createElement('video');
  v.muted = true; v.playsInline = true; v.loop = false;
  v.preload = preload || 'auto';                 // server clips use 'none' so big files don't prefetch
  if (IN_PLUGIN && url && !url.startsWith('blob:')) {
    // In the plugin the page is served over a custom WebView scheme that can't
    // satisfy the HTTP range requests <video> needs — so fetch the clip and play
    // it from an in-memory blob instead. Done lazily, on first trigger.
    v.dataset.lazySrc = url;
  } else {
    v.src = url;
    if (v.preload !== 'none') v.load();
  }
  return v;
}

// plugin: resolve a lazy server clip to a playable blob URL (once)
function ensureOvSrc(v) {
  if (!v.dataset.lazySrc) return Promise.resolve();
  if (!v._srcPromise) {
    v._srcPromise = fetch(v.dataset.lazySrc).then(r => r.blob()).then(b => {
      v.src = URL.createObjectURL(b); delete v.dataset.lazySrc; v.load();
    }).catch(() => {});
  }
  return v._srcPromise;
}

// add the clips PHP found in /vjloops — streamed by URL, not stored in IndexedDB.
// entry is { name, url } (url prefers the web-optimized copy); a bare string is ok too.
function addServerClip(entry) {
  const e = typeof entry === 'string' ? { name: entry } : entry;
  const name = e.name, url = e.url || ('vjloops/' + encodeURIComponent(name));
  const id = 'srv:' + name;
  if (overlays.slots.some(s => s.id === id)) return;
  overlays.slots.push({ id, name, url, video: makeOvVideo(url, 'none'), mode: 'loop', server: true });
}
function initServerClips() {
  const list = Array.isArray(window.VJLOOPS) ? window.VJLOOPS : [];
  for (const entry of list) addServerClip(entry);
  renderOverlays();
  idle(warmAllOverlays);          // start warming once the page has settled
}

function overlayStart(i) {
  const s = overlays.slots[i]; if (!s || !s.video) return;
  if (overlays.active >= 0 && overlays.active !== i) { const p = overlays.slots[overlays.active]; if (p && p.video) p.video.pause(); }
  overlays.active = i;
  overlays.autoActive = false;          // manual by default; autoOverlayOnChange re-flags it
  const v = s.video;
  v.loop = (s.mode === 'loop');
  v.onended = (s.mode === 'once') ? () => { if (overlays.active === i) { overlays.active = -1; renderOverlays(); } } : null;
  // overlayStop already rewound it, so skip a redundant seek on the hot path
  const go = () => {
    if (overlays.active !== i) return;
    try { if (v.currentTime > 0.05) v.currentTime = 0; } catch (e) {}
    v.play().catch(() => {});
  };
  // it's playing now, so drop it from the background queue and track its
  // load state directly (warmOverlay won't touch load() on the live clip)
  const q = warmQueue.indexOf(s.id); if (q >= 0) warmQueue.splice(q, 1);
  if (!s.ready && !s.failed) warmOverlay(s);
  if (v.dataset.lazySrc) ensureOvSrc(v).then(go); else go();   // plugin server clips fetch-to-blob first
  renderOverlays();
}
function overlayStop(i) {
  const s = overlays.slots[i];
  if (s && s.video) {
    s.video.pause();
    // rewind now, while nothing is waiting on it — a seek at trigger time is
    // the other half of the first-play stall
    try { s.video.currentTime = 0; } catch (e) {}
  }
  if (i == null || overlays.active === i) { overlays.active = -1; overlays.autoActive = false; }
  renderOverlays();
}
function overlayToggle(i) { if (overlays.active === i) overlayStop(i); else overlayStart(i); }

async function addOverlayClip(file) {
  if (!file || !/^video\//.test(file.type) && !/\.(webm|mp4|mov|m4v|ogv)$/i.test(file.name)) { alert('Pick a video file (WebM / MP4).'); return; }
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const rec = { id, name: file.name, blob: file, mode: 'loop' };
  try { await idbPut('overlays', rec); } catch (e) {}
  const url = URL.createObjectURL(file);
  overlays.slots.push({ id, name: file.name, url, video: makeOvVideo(url), mode: 'loop' });
  renderOverlays();
  queueWarm(id);
}
async function loadOverlays() {
  let items = []; try { items = await idbAll('overlays'); } catch (e) { return; }
  for (const it of items) {
    const url = URL.createObjectURL(it.blob);
    overlays.slots.push({ id: it.id, name: it.name, url, video: makeOvVideo(url), mode: it.mode || 'loop' });
  }
  renderOverlays();
  idle(warmAllOverlays);
}
async function deleteOverlay(id) {
  const idx = overlays.slots.findIndex(s => s.id === id); if (idx < 0) return;
  const s = overlays.slots[idx];
  if (overlays.active === idx) overlayStop(idx);
  const q = warmQueue.indexOf(id); if (q >= 0) warmQueue.splice(q, 1);
  if (s.video) { s.video.pause(); s.video.src = ''; }
  if (s.url && !s.server) URL.revokeObjectURL(s.url);     // server clips are plain URLs, not blob URLs
  overlays.slots.splice(idx, 1);
  if (overlays.active > idx) overlays.active--;
  if (!s.server) { try { await idbDel('overlays', id); } catch (e) {} }
  renderOverlays();
}
async function setOverlayMode(id, mode) {
  const s = overlays.slots.find(x => x.id === id); if (!s) return;
  s.mode = mode;
  if (overlays.active === overlays.slots.indexOf(s)) s.video.loop = (mode === 'loop');
  try { const all = await idbAll('overlays'); const rec = all.find(x => x.id === id); if (rec) { rec.mode = mode; await idbPut('overlays', rec); } } catch (e) {}
}

function renderOverlays() {
  if (!ovList) return;
  const state = s => s.failed ? ['bad', 'Failed to load — codec may be unsupported']
                   : s.ready ? ['ok', 'Ready — triggers instantly']
                   : s.warming ? ['load', 'Preloading…']
                   : ['', 'Not preloaded yet'];
  ovList.innerHTML = overlays.slots.length ? overlays.slots.map((s, i) => `
    <div class="ov-row${overlays.active === i ? ' playing' : ''}" data-id="${s.id}">
      <button class="ov-trig mini-btn" type="button" title="Trigger">${overlays.active === i ? '■' : '▶'}</button>
      <span class="ov-state ${state(s)[0]}" title="${state(s)[1]}"></span>
      <span class="ov-name" title="${s.name}">${i < 8 ? `<b>${i + 1}</b>` : ''}${s.server ? '📁 ' : ''}${s.name}</span>
      <select class="ov-mode">
        <option value="loop"${s.mode === 'loop' ? ' selected' : ''}>Loop</option>
        <option value="once"${s.mode === 'once' ? ' selected' : ''}>Once</option>
        <option value="hold"${s.mode === 'hold' ? ' selected' : ''}>Hold</option>
      </select>
      ${s.server ? '<span class="ov-del" style="visibility:hidden">✕</span>' : '<button class="ov-del" type="button" title="Delete">✕</button>'}
    </div>`).join('') : '<div class="kf-empty">No clips yet — add a file, or drop videos in the <b>vjloops/</b> folder.</div>';

  if (overlays.slots.length) {
    const ready = overlays.slots.filter(s => s.ready).length;
    const bad = overlays.slots.filter(s => s.failed).length;
    const d = document.createElement('div');
    d.className = 'ov-warm';
    d.textContent = `${ready}/${overlays.slots.length} clips preloaded`
      + (bad ? ` · ${bad} failed` : '')
      + (ready < overlays.slots.length - bad ? ' · warming…' : '');
    ovList.appendChild(d);
  }
}

// draw the active overlay into the scene buffer (gets bloom + is captured live)
function drawActiveOverlay(c) {
  if (offlineActive) return;                       // offline export support is a later step
  const i = overlays.active; if (i < 0) return;
  const s = overlays.slots[i]; const v = s && s.video;
  if (!v || !v.videoWidth || v.paused) return;
  let op = overlays.opacity;
  if (overlays.react > 0) op *= (1 - overlays.react) + overlays.react * Math.min(1, A.level * 1.5);
  if (op <= 0.002) return;
  c.save();
  c.globalCompositeOperation = overlays.blend;
  c.globalAlpha = Math.min(1, op);
  const vw = v.videoWidth, vh = v.videoHeight;
  const sc = overlays.fit === 'contain' ? Math.min(W / vw, H / vh) : Math.max(W / vw, H / vh);
  const dw = vw * sc, dh = vh * sc;
  c.drawImage(v, (W - dw) / 2, (H - dh) / 2, dw, dh);
  c.restore();
}

/* ---- scene package ---- */
// restore the overlay clip bank + active trigger from a saved preset
function restoreClips(cfg) {
  if (!Array.isArray(cfg.clips)) return;
  for (const c of cfg.clips) {
    let s = overlays.slots.find(x => x.id === c.id || (x.name === c.name && !!x.server === !!c.server));
    if (!s && c.server && c.url) { addServerClip({ name: c.name, url: c.url }); s = overlays.slots[overlays.slots.length - 1]; }
    if (s && c.mode) s.mode = c.mode;
  }
  renderOverlays();
  if (cfg.activeId) {
    const idx = overlays.slots.findIndex(x => x.id === cfg.activeId);
    if (idx >= 0) overlayStart(idx);
  }
}

function collectScene() {
  return {
    type: 'sonar-scene', v: 1,
    mode,
    shuffle: shuffle.on,
    mix: { sceneIntensity, eqBass, eqMid, eqTreble, beatSens, transType: trans.type, transDur: trans.dur },
    post: { blur: post.blur, beatStrobe: post.beatStrobe, fadeIn: post.fadeIn, fadeOut: post.fadeOut, liveFade: post.liveFade },
    bg: { type: bg.type, c1: bg.c1, c2: bg.c2, img: imgToDataURL(bg.img, 1920) },
    overlay: { ...overlay, img: imgToDataURL(overlay.img, 1024), fx: { ...overlay.fx } },
    overlaysCfg: { blend: overlays.blend, opacity: overlays.opacity, fit: overlays.fit, react: overlays.react, auto: overlays.auto,
      clips: overlays.slots.map(s => ({ id: s.id, name: s.name, mode: s.mode, server: !!s.server, url: s.server ? s.url : undefined })),
      activeId: (overlays.active >= 0 && overlays.slots[overlays.active]) ? overlays.slots[overlays.active].id : null },
    automations,
    lyrics: { ...lyrics },
    headroom,
  };
}
async function applyScene(o) {
  if (!o || o.type !== 'sonar-scene') { alert('Not a SONAR scene file.'); return; }
  if (typeof o.mode === 'number') setMode(o.mode);
  setShuffle(!!o.shuffle);
  if (o.mix) {
    sceneIntensity = o.mix.sceneIntensity ?? sceneIntensity;
    eqBass = o.mix.eqBass ?? eqBass; eqMid = o.mix.eqMid ?? eqMid; eqTreble = o.mix.eqTreble ?? eqTreble;
    beatSens = o.mix.beatSens ?? beatSens;
    trans.type = o.mix.transType ?? trans.type; trans.dur = o.mix.transDur ?? trans.dur;
  }
  if (o.post) Object.assign(post, o.post);
  if (o.bg) { bg.type = o.bg.type; bg.c1 = o.bg.c1; bg.c2 = o.bg.c2; bg.img = o.bg.img ? await loadImg(o.bg.img) : null; }
  if (o.overlay) {
    const im = o.overlay.img ? await loadImg(o.overlay.img) : null;
    Object.assign(overlay, o.overlay, { fx: { ...overlay.fx, ...(o.overlay.fx || {}) } });
    overlay.img = im;
  }
  if (o.overlaysCfg) {
    overlays.blend = o.overlaysCfg.blend ?? overlays.blend;
    overlays.opacity = o.overlaysCfg.opacity ?? overlays.opacity;
    overlays.fit = o.overlaysCfg.fit ?? overlays.fit;
    overlays.react = o.overlaysCfg.react ?? overlays.react;
    overlays.auto = o.overlaysCfg.auto ?? overlays.auto;
    restoreClips(o.overlaysCfg);
  }
  automations = o.automations || {};
  if (o.lyrics) Object.assign(lyrics, o.lyrics);
  headroom = o.headroom || 0;
  syncAllControls();
  renderAuto();
  renderLyrics();
}

function renderLyrics() {
  lyrList.innerHTML = lyrics.lines.length ? lyrics.lines.map((l, i) =>
    `<div class="kf-row" data-i="${i}"><span class="kf-t">${l.t == null ? '—' : fmt2(l.t)}</span><span class="kf-p">${(l.text || '·').replace(/</g, '&lt;')}</span><button class="kf-x" title="Clear time">⌫</button></div>`
  ).join('') : '<div class="kf-empty">No lyrics yet</div>';
  bpmVal.textContent = lyrics.bpm ? lyrics.bpm + ' BPM' : '—';
}

const setSeg = (group, attr, val) => [...group.children].forEach(b => b.classList.toggle('active', b.dataset[attr] === String(val)));

// push current state into every panel control (after loading a scene file)
function syncAllControls() {
  intRange.value = Math.round(sceneIntensity * 100); intVal.textContent = intRange.value + '%';
  eqBassRange.value = Math.round(eqBass * 100); eqBassVal.textContent = eqBassRange.value + '%';
  eqMidRange.value = Math.round(eqMid * 100); eqMidVal.textContent = eqMidRange.value + '%';
  eqTrebleRange.value = Math.round(eqTreble * 100); eqTrebleVal.textContent = eqTrebleRange.value + '%';
  beatSensRange.value = beatSens; beatSensVal.textContent = (+beatSens).toFixed(1);
  blurRange.value = post.blur; blurVal.textContent = post.blur;
  setSeg(transType, 'x', trans.type);
  transDurRange.value = trans.dur; transDurVal.textContent = (+trans.dur).toFixed(2) + 's';
  setSeg(strobeSeg, 's', post.beatStrobe);
  fadeInRange.value = post.fadeIn; fadeInVal.textContent = (+post.fadeIn).toFixed(1) + 's';
  fadeOutRange.value = post.fadeOut; fadeOutVal.textContent = (+post.fadeOut).toFixed(1) + 's';
  liveFadeRange.value = post.liveFade || 0; liveFadeVal.textContent = post.liveFade > 0 ? (+post.liveFade).toFixed(1) + 's' : 'Off';
  setSeg(bgType, 't', bg.type); bgC1.value = bg.c1; bgC2.value = bg.c2;
  setSeg(ovBlend, 'b', overlays.blend); setSeg(ovFit, 'f', overlays.fit);
  ovOpacity.value = Math.round(overlays.opacity * 100); ovOpacityVal.textContent = ovOpacity.value + '%';
  ovReact.value = Math.round(overlays.react * 100); ovReactVal.textContent = ovReact.value + '%';
  ovAuto.checked = overlays.auto;

  titleInput.value = overlay.title || ''; subInput.value = overlay.sub || '';
  sizeRange.value = Math.round(overlay.size * 100); sizeVal.textContent = sizeRange.value + '%';
  fontSel.value = overlay.font;
  [...styleSeg.children].forEach(b => b.classList.toggle('active', !!overlay[b.dataset.style]));
  titleSizeR.value = (overlay.titleSize * 100).toFixed(1); titleSizeVal.textContent = titleSizeR.value + '%';
  subSizeR.value = (overlay.subSize * 100).toFixed(1); subSizeVal.textContent = subSizeR.value + '%';
  letterRange.value = Math.round(overlay.letter * 100); letterVal.textContent = letterRange.value + '%';
  titleColor.value = overlay.titleColor; subColor.value = overlay.subColor;
  glowColor.value = overlay.glowColor; glowRange.value = Math.round(overlay.glowSize * 100); glowVal.textContent = glowRange.value + '%';
  outlineColor.value = overlay.outlineColor; outlineRange.value = Math.round(overlay.outlineW * 100);
  outlineVal.textContent = +outlineRange.value === 0 ? 'off' : outlineRange.value + '%';
  setSeg(posSeg, 'pos', overlay.pos);
  offXRange.value = Math.round(overlay.offX * 100); offXVal.textContent = offXRange.value;
  offYRange.value = Math.round(overlay.offY * 100); offYVal.textContent = offYRange.value;
  alphaRange.value = Math.round(overlay.alpha * 100); alphaVal.textContent = alphaRange.value + '%';
  reactSrcSel.value = overlay.reactSrc; amtRange.value = Math.round(overlay.reactAmt * 100); amtVal.textContent = amtRange.value + '%';
  [...fxChips.children].forEach(b => b.classList.toggle('active', !!overlay.fx[b.dataset.fx]));

  lyrEnable.checked = lyrics.enabled; lyrNext.checked = lyrics.showNext;
  lyrSize.value = (lyrics.size * 100).toFixed(1); lyrSizeVal.textContent = Math.round(lyrics.size * 100) + '%';
  lyrColor.value = lyrics.color; setSeg(lyrPos, 'p', lyrics.pos);
  lyrText.value = lyrics.lines.map(l => l.text).join('\n');
  setSeg(expHead, 'h', headroom);
}

/* =====================================================================
   MODE 0 — AURORA  (radial spectrum + waveform ring + core + particles)
   ===================================================================== */
function modeAurora(c) {
  fade(c, 0.20);

  // faint slow starfield backdrop
  c.globalCompositeOperation = 'lighter';
  for (const s of stars) {
    s.z -= 1.2 + A.bass * 4;
    if (s.z <= 1) Object.assign(s, newStar(false));
    const k = 220 / s.z;
    const x = s.x * k + CX, y = s.y * k + CY;
    if (x < 0 || x > W || y < 0 || y > H) continue;
    const r = (1 - s.z / W) * 1.6;
    c.fillStyle = `rgba(150,180,255,${(1 - s.z / W) * 0.5})`;
    c.fillRect(x, y, r, r);
  }

  const baseR = Math.min(W, H) * 0.17;
  const pulse = baseR * (1 + A.bass * 0.45 + A.beat * 0.15);
  const bins = 128;

  // radial spectrum — mirrored for symmetry
  c.globalCompositeOperation = 'lighter';
  c.lineCap = 'round';
  for (let i = 0; i < bins; i++) {
    const f = freq[Math.floor(i / bins * freq.length * 0.7)] / 255;
    const len = f * Math.min(W, H) * 0.22;
    const h = (hue + i * 1.6) % 360;
    c.strokeStyle = `hsla(${h}, 95%, ${50 + f * 25}%, ${0.5 + f * 0.5})`;
    c.lineWidth = 2 + f * 3;
    for (const dir of [1, -1]) {
      const ang = dir * (i / bins) * Math.PI - Math.PI / 2;
      const [x1, y1] = polar(CX, CY, pulse, ang);
      const [x2, y2] = polar(CX, CY, pulse + len, ang);
      c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
    }
  }

  // waveform ring (smooth closed loop from time-domain data)
  c.globalCompositeOperation = 'lighter';
  c.lineWidth = 2.5;
  c.strokeStyle = `hsla(${(hue + 180) % 360}, 100%, 70%, 0.9)`;
  c.beginPath();
  const wr = pulse * 0.82, N = 180;
  for (let i = 0; i <= N; i++) {
    const t = time[Math.floor(i / N * time.length)] / 128 - 1;
    const ang = (i / N) * TAU - Math.PI / 2;
    const [x, y] = polar(CX, CY, wr + t * 42, ang);
    i ? c.lineTo(x, y) : c.moveTo(x, y);
  }
  c.closePath(); c.stroke();

  // pulsing core
  const cr = pulse * 0.6;
  const g = c.createRadialGradient(CX, CY, 0, CX, CY, cr);
  g.addColorStop(0, `hsla(${hue}, 100%, 90%, ${0.5 + A.bass * 0.5})`);
  g.addColorStop(0.5, `hsla(${(hue + 40) % 360}, 100%, 60%, 0.35)`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = g;
  c.beginPath(); c.arc(CX, CY, cr, 0, TAU); c.fill();

  drawParticles(c);
}

/* =====================================================================
   MODE 1 — SPECTRUM  (mirrored bars + reflection + waveform)
   ===================================================================== */
function modeSpectrum(c) {
  bgGradient(c, '#070912', '#0d0a18');

  const bars = 96;
  const bw = W / bars;
  const baseY = H * 0.62;

  c.globalCompositeOperation = 'lighter';
  for (let i = 0; i < bars; i++) {
    // log-ish sampling so lows aren't crammed
    const idx = Math.floor(Math.pow(i / bars, 1.6) * freq.length * 0.8);
    const f = freq[idx] / 255;
    const bh = f * H * 0.42 + 2;
    const h = (hue + i * 2.4) % 360;
    const x = i * bw;

    const g = c.createLinearGradient(0, baseY - bh, 0, baseY);
    g.addColorStop(0, `hsla(${h}, 100%, 70%, 0.95)`);
    g.addColorStop(1, `hsla(${(h + 50) % 360}, 100%, 45%, 0.25)`);
    c.fillStyle = g;
    roundRect(c, x + bw * 0.12, baseY - bh, bw * 0.76, bh, bw * 0.3);
    c.fill();

    // reflection
    const rg = c.createLinearGradient(0, baseY, 0, baseY + bh * 0.6);
    rg.addColorStop(0, `hsla(${h}, 100%, 60%, 0.18)`);
    rg.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = rg;
    roundRect(c, x + bw * 0.12, baseY, bw * 0.76, bh * 0.6, bw * 0.3);
    c.fill();
  }

  // floating waveform line
  c.globalCompositeOperation = 'lighter';
  c.strokeStyle = `hsla(${(hue + 160) % 360}, 100%, 75%, 0.8)`;
  c.lineWidth = 2;
  c.beginPath();
  const my = H * 0.24;
  for (let i = 0; i < time.length; i += 4) {
    const x = (i / time.length) * W;
    const y = my + (time[i] / 128 - 1) * 70 * (0.5 + A.level);
    i ? c.lineTo(x, y) : c.moveTo(x, y);
  }
  c.stroke();

  drawParticles(c);
}

/* =====================================================================
   MODE 2 — TUNNEL  (warped concentric rings zooming on beat)
   ===================================================================== */
let tunnelRot = 0;
function modeTunnel(c) {
  fade(c, 0.16);
  tunnelRot += 0.003 + A.mid * 0.02;

  const rings = 26;
  const verts = 64;
  const maxR = Math.hypot(W, H) * 0.6;
  const zoom = 1 + A.beat * 0.25 + A.bass * 0.2;

  c.globalCompositeOperation = 'lighter';
  for (let r = rings; r > 0; r--) {
    const depth = r / rings;
    const radius = depth * maxR * zoom;
    const h = (hue + r * 10 + frame) % 360;
    const alpha = (1 - depth) * 0.6 + 0.1;
    c.strokeStyle = `hsla(${h}, 95%, ${55 + (1 - depth) * 20}%, ${alpha})`;
    c.lineWidth = 1 + (1 - depth) * 3;
    c.beginPath();
    const rot = tunnelRot * (1 + depth) + r * 0.12;
    for (let i = 0; i <= verts; i++) {
      const ang = (i / verts) * TAU + rot;
      const f = freq[Math.floor((i % verts) / verts * freq.length * 0.6)] / 255;
      const rr = radius + f * 60 * (1 - depth);
      const [x, y] = polar(CX, CY, rr, ang);
      i ? c.lineTo(x, y) : c.moveTo(x, y);
    }
    c.closePath(); c.stroke();
  }

  // bright core
  const g = c.createRadialGradient(CX, CY, 0, CX, CY, 90 * zoom);
  g.addColorStop(0, `hsla(${hue}, 100%, 85%, ${0.4 + A.bass * 0.5})`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = g;
  c.beginPath(); c.arc(CX, CY, 90 * zoom, 0, TAU); c.fill();
}

/* =====================================================================
   MODE 3 — GALAXY  (warp starfield + nebula clouds + spiral)
   ===================================================================== */
function modeGalaxy(c) {
  fade(c, 0.22);

  // nebula clouds
  c.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 3; i++) {
    const a = frame * 0.002 + i * TAU / 3;
    const nx = CX + Math.cos(a) * W * 0.18;
    const ny = CY + Math.sin(a * 1.3) * H * 0.18;
    const rad = Math.min(W, H) * (0.35 + A.mid * 0.3);
    const h = (hue + i * 70) % 360;
    const g = c.createRadialGradient(nx, ny, 0, nx, ny, rad);
    g.addColorStop(0, `hsla(${h}, 90%, 55%, ${0.06 + A.mid * 0.10})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g;
    c.beginPath(); c.arc(nx, ny, rad, 0, TAU); c.fill();
  }

  // warp starfield (ref1-inspired, audio-driven speed)
  const speed = 4 + A.bass * 30 + A.beat * 16;
  c.globalCompositeOperation = 'lighter';
  for (const s of stars) {
    s.pz = s.z;
    s.z -= speed;
    if (s.z <= 1) { Object.assign(s, newStar(false)); continue; }
    const k = 220 / s.z, pk = 220 / s.pz;
    const x = s.x * k + CX, y = s.y * k + CY;
    const px = s.x * pk + CX, py = s.y * pk + CY;
    const b = (1 - s.z / W);
    c.strokeStyle = `hsla(${(hue + b * 120) % 360}, 90%, ${60 + b * 30}%, ${b})`;
    c.lineWidth = b * 2.2;
    c.beginPath(); c.moveTo(px, py); c.lineTo(x, y); c.stroke();
  }

  // reactive spiral of dots
  c.globalCompositeOperation = 'lighter';
  const arms = 220;
  for (let i = 0; i < arms; i++) {
    const f = freq[Math.floor(i / arms * freq.length * 0.7)] / 255;
    const ang = i * 0.32 + frame * 0.01;
    const rad = i * 1.4 * (1 + A.bass * 0.3);
    const [x, y] = polar(CX, CY, rad, ang);
    const h = (hue + i) % 360;
    c.fillStyle = `hsla(${h}, 100%, ${55 + f * 35}%, ${0.3 + f * 0.6})`;
    c.beginPath(); c.arc(x, y, 1 + f * 4, 0, TAU); c.fill();
  }

  // core glow
  const g = c.createRadialGradient(CX, CY, 0, CX, CY, 120);
  g.addColorStop(0, `hsla(${hue}, 100%, 92%, ${0.5 + A.bass * 0.5})`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = g;
  c.beginPath(); c.arc(CX, CY, 120, 0, TAU); c.fill();
}

/* =====================================================================
   MODE 4 — SYNTHWAVE  (retro sun + perspective grid + spectrum mountains)
   ===================================================================== */
let synthScroll = 0;
function modeSynth(c) {
  const horizon = H * 0.52;

  // sky
  const sky = c.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, '#190a36');
  sky.addColorStop(0.6, '#5a1b6e');
  sky.addColorStop(1, '#ff3d7f');
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = sky; c.fillRect(0, 0, W, horizon);
  // floor base
  c.fillStyle = '#070213'; c.fillRect(0, horizon, W, H - horizon);

  // sun with scanline gaps
  const sunR = Math.min(W, H) * 0.16 * (1 + A.bass * 0.18);
  const sunX = CX, sunY = horizon - sunR * 0.25;
  c.save();
  c.beginPath(); c.arc(sunX, sunY, sunR, 0, TAU); c.clip();
  const sg = c.createLinearGradient(0, sunY - sunR, 0, sunY + sunR);
  sg.addColorStop(0, '#ffe24a'); sg.addColorStop(0.5, '#ff9b3d'); sg.addColorStop(1, '#ff2d7e');
  c.fillStyle = sg; c.fillRect(sunX - sunR, sunY - sunR, sunR * 2, sunR * 2);
  c.globalCompositeOperation = 'destination-out';
  c.fillStyle = '#000';
  for (let i = 1; i <= 9; i++) {
    const yy = sunY + (i / 9) * sunR * 1.05;
    c.fillRect(sunX - sunR, yy, sunR * 2, (i / 9) * sunR * 0.16);
  }
  c.restore();
  // sun bloom
  c.globalCompositeOperation = 'lighter';
  const sb = c.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 2.2);
  sb.addColorStop(0, `rgba(255,130,90,${0.25 + A.level * 0.3})`);
  sb.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = sb; c.beginPath(); c.arc(sunX, sunY, sunR * 2.2, 0, TAU); c.fill();

  // spectrum mountains on the horizon
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = '#0d0322';
  c.beginPath(); c.moveTo(0, horizon);
  const cols = 72;
  for (let i = 0; i <= cols; i++) {
    const f = freq[Math.floor(i / cols * freq.length * 0.5)] / 255;
    c.lineTo(i / cols * W, horizon - f * H * 0.13 - 3);
  }
  c.lineTo(W, horizon); c.closePath(); c.fill();

  // neon horizon line
  c.globalCompositeOperation = 'lighter';
  c.strokeStyle = `hsla(${hue % 360}, 100%, 65%, 0.9)`; c.lineWidth = 2;
  c.beginPath(); c.moveTo(0, horizon); c.lineTo(W, horizon); c.stroke();

  // perspective grid floor
  synthScroll = (synthScroll + 0.004 + A.bass * 0.03) % 1;
  c.strokeStyle = `hsla(${(hue + 200) % 360}, 90%, 60%, 0.45)`; c.lineWidth = 1.5;
  c.beginPath();
  const rows = 16;
  for (let i = 0; i < rows; i++) {
    const t = ((i + synthScroll) / rows);
    const y = horizon + (H - horizon) * (t * t);
    c.moveTo(0, y); c.lineTo(W, y);
  }
  const vlines = 22;
  for (let i = -vlines; i <= vlines; i++) {
    const xb = CX + (i / vlines) * W * 1.6;
    c.moveTo(CX, horizon); c.lineTo(xb, H);
  }
  c.stroke();

  drawParticles(c);
}

/* =====================================================================
   MODE 5 — KALEIDO  (mirrored rotating segments of the spectrum)
   ===================================================================== */
let kaleoRot = 0;
function modeKaleido(c) {
  fade(c, 0.26);
  kaleoRot += 0.004 + A.mid * 0.02;
  const seg = 12, ang = TAU / seg;
  const R = Math.hypot(W, H) * 0.55;

  c.save();
  c.translate(CX, CY);
  c.globalCompositeOperation = 'lighter';
  for (let s = 0; s < seg; s++) {
    c.save();
    c.rotate(s * ang + kaleoRot);
    if (s % 2) c.scale(1, -1);          // mirror alternate wedges
    c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, R, -ang / 2, ang / 2); c.closePath(); c.clip();
    const n = 46;
    for (let i = 0; i < n; i++) {
      const f = freq[Math.floor(i / n * freq.length * 0.7)] / 255;
      const rr = (i / n) * R * (1 + A.bass * 0.25);
      const a = (i / n) * ang * 1.6 - ang / 2;
      const x = Math.cos(a) * rr, y = Math.sin(a) * rr;
      c.fillStyle = `hsla(${(hue + i * 4 + s * 8) % 360}, 100%, ${50 + f * 30}%, ${0.35 + f * 0.6})`;
      c.beginPath(); c.arc(x, y, 2 + f * 18, 0, TAU); c.fill();
    }
    c.restore();
  }
  c.restore();

  const g = c.createRadialGradient(CX, CY, 0, CX, CY, 90);
  g.addColorStop(0, `hsla(${hue}, 100%, 88%, ${0.4 + A.bass * 0.5})`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = g; c.beginPath(); c.arc(CX, CY, 90, 0, TAU); c.fill();
}

/* =====================================================================
   MODE 6 — LIQUID  (audio-morphed blob / orb)
   ===================================================================== */
function modeLiquid(c) {
  fade(c, 0.18);
  const baseR = Math.min(W, H) * 0.22 * (1 + A.bass * 0.3 + A.beat * 0.1);
  const N = 160;

  c.globalCompositeOperation = 'lighter';
  for (let layer = 0; layer < 3; layer++) {
    const lr = baseR * (1 - layer * 0.12);
    const h = (hue + layer * 40) % 360;
    c.beginPath();
    for (let i = 0; i <= N; i++) {
      const a = (i / N) * TAU;
      const f = freq[Math.floor((i % N) / N * freq.length * 0.5)] / 255;
      const wob = Math.sin(a * 4 + frame * 0.03) * 0.12 + Math.sin(a * 7 - frame * 0.02) * 0.08;
      const rr = lr * (1 + f * 0.5 + wob * (0.5 + A.mid));
      const x = CX + Math.cos(a) * rr, y = CY + Math.sin(a) * rr;
      i ? c.lineTo(x, y) : c.moveTo(x, y);
    }
    c.closePath();
    const g = c.createRadialGradient(CX, CY, lr * 0.2, CX, CY, lr * 1.3);
    g.addColorStop(0, `hsla(${h}, 100%, 70%, ${0.5 - layer * 0.12})`);
    g.addColorStop(1, `hsla(${(h + 60) % 360}, 100%, 50%, 0)`);
    c.fillStyle = g; c.fill();
    c.strokeStyle = `hsla(${h}, 100%, 80%, 0.6)`; c.lineWidth = 2; c.stroke();
  }

  // glossy highlight
  const hg = c.createRadialGradient(CX - baseR * 0.3, CY - baseR * 0.3, 0, CX, CY, baseR);
  hg.addColorStop(0, `rgba(255,255,255,${0.25 + A.treble * 0.3})`);
  hg.addColorStop(0.4, 'rgba(255,255,255,0)');
  c.fillStyle = hg; c.beginPath(); c.arc(CX, CY, baseR, 0, TAU); c.fill();

  drawParticles(c);
}

/* =====================================================================
   MODE 7 — SCOPE  (mirrored oscilloscope ribbon + freq ticks)
   ===================================================================== */
function modeScope(c) {
  bgGradient(c, '#04060e', '#0a0414');
  const N = time.length;
  const midY = CY;
  const amp = H * 0.22 * (0.6 + A.level);

  // filled ribbon between the mirrored waveforms
  c.globalCompositeOperation = 'lighter';
  c.beginPath();
  for (let i = 0; i < N; i += 2) { const x = i / N * W, v = time[i] / 128 - 1; i ? c.lineTo(x, midY - v * amp) : c.moveTo(x, midY - v * amp); }
  for (let i = N - 1; i >= 0; i -= 2) { const x = i / N * W, v = time[i] / 128 - 1; c.lineTo(x, midY + v * amp); }
  c.closePath();
  const g = c.createLinearGradient(0, midY - amp, 0, midY + amp);
  g.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.22)`);
  g.addColorStop(0.5, `hsla(${(hue + 40) % 360}, 100%, 70%, 0.06)`);
  g.addColorStop(1, `hsla(${(hue + 80) % 360}, 100%, 60%, 0.22)`);
  c.fillStyle = g; c.fill();

  // bright mirrored traces
  c.lineCap = 'round';
  for (const dir of [-1, 1]) {
    c.beginPath();
    c.strokeStyle = `hsla(${(hue + (dir > 0 ? 60 : 0)) % 360}, 100%, 72%, 0.95)`;
    c.lineWidth = 2.5;
    for (let i = 0; i < N; i += 2) { const x = i / N * W, v = time[i] / 128 - 1; i ? c.lineTo(x, midY + dir * v * amp) : c.moveTo(x, midY + dir * v * amp); }
    c.stroke();
  }

  // center line + freq ticks
  c.strokeStyle = `hsla(${hue}, 100%, 80%, ${0.3 + A.bass * 0.5})`; c.lineWidth = 1;
  c.beginPath(); c.moveTo(0, midY); c.lineTo(W, midY); c.stroke();
  const bars = 80;
  for (let i = 0; i < bars; i++) {
    const f = freq[Math.floor(Math.pow(i / bars, 1.5) * freq.length * 0.7)] / 255;
    const x = i / bars * W;
    c.strokeStyle = `hsla(${(hue + i * 3) % 360}, 100%, 60%, 0.5)`;
    c.lineWidth = W / bars * 0.5;
    c.beginPath(); c.moveTo(x, H); c.lineTo(x, H - f * H * 0.12); c.stroke();
  }

  drawParticles(c);
}

/* =====================================================================
   MODE 8 — TERRAIN  (scrolling 3D spectrum landscape)
   ===================================================================== */
function modeTerrain(c) {
  bgGradient(c, '#02030a', '#0a0618');
  const cols = 64, rows = 42;
  const cur = new Float32Array(cols);
  for (let i = 0; i < cols; i++) cur[i] = freq[Math.floor(Math.pow(i / cols, 1.3) * freq.length * 0.7)] / 255;
  terrainHist.unshift(cur);
  if (terrainHist.length > rows) terrainHist.pop();

  const horizon = H * 0.4;
  c.globalCompositeOperation = 'lighter';
  for (let r = terrainHist.length - 1; r >= 0; r--) {
    const z = r / rows;                       // 0 front … 1 back
    const persp = 1 - z * 0.82;
    const yy = horizon + (H - horizon) * Math.pow(1 - z, 1.4);
    const rowW = W * persp, x0 = CX - rowW / 2;
    const hgt = (H - horizon) * 0.55 * persp;
    const row = terrainHist[r];
    c.strokeStyle = `hsla(${(hue + z * 120) % 360}, 90%, ${62 - z * 32}%, ${1 - z * 0.7})`;
    c.lineWidth = 1.4 * persp + 0.3;
    c.beginPath();
    for (let i = 0; i < cols; i++) {
      const x = x0 + (i / (cols - 1)) * rowW;
      const yv = yy - row[i] * hgt;
      i ? c.lineTo(x, yv) : c.moveTo(x, yv);
    }
    c.stroke();
  }
}

/* =====================================================================
   MODE 9 — RINGS  (beat-triggered ripples + reactive core ring)
   ===================================================================== */
function modeRings(c) {
  fade(c, 0.2);
  if (A.beatHit) rings.push({ r: 12, life: 1, hue });
  c.globalCompositeOperation = 'lighter';
  for (let i = rings.length - 1; i >= 0; i--) {
    const rg = rings[i];
    rg.r += 4 + A.level * 7;
    rg.life -= 0.012;
    if (rg.life <= 0) { rings.splice(i, 1); continue; }
    c.strokeStyle = `hsla(${rg.hue}, 100%, 65%, ${rg.life})`;
    c.lineWidth = 2 + rg.life * 3;
    c.beginPath(); c.arc(CX, CY, rg.r, 0, TAU); c.stroke();
  }
  if (rings.length > 140) rings.splice(0, rings.length - 140);

  const base = Math.min(W, H) * 0.12 * (1 + A.bass * 0.4);
  c.strokeStyle = `hsla(${hue}, 100%, 70%, 0.85)`; c.lineWidth = 3;
  c.beginPath();
  const N = 128;
  for (let i = 0; i <= N; i++) {
    const a = i / N * TAU;
    const f = freq[Math.floor(i / N * freq.length * 0.5)] / 255;
    const [x, y] = polar(CX, CY, base + f * 60, a);
    i ? c.lineTo(x, y) : c.moveTo(x, y);
  }
  c.closePath(); c.stroke();

  const g = c.createRadialGradient(CX, CY, 0, CX, CY, base);
  g.addColorStop(0, `hsla(${hue}, 100%, 85%, ${0.4 + A.bass * 0.5})`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = g; c.beginPath(); c.arc(CX, CY, base, 0, TAU); c.fill();
}

/* =====================================================================
   MODE 10 — RAYS  (rotating sunrays, length per frequency)
   ===================================================================== */
function modeRays(c) {
  fade(c, 0.22);
  raysRot += 0.002 + A.mid * 0.01;
  const n = 180, inner = Math.min(W, H) * 0.06, span = Math.min(W, H) * 0.5;
  c.globalCompositeOperation = 'lighter'; c.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const f = freq[Math.floor(i / n * freq.length * 0.8)] / 255;
    const a = i / n * TAU + raysRot;
    const [x1, y1] = polar(CX, CY, inner, a);
    const [x2, y2] = polar(CX, CY, inner + f * span, a);
    c.strokeStyle = `hsla(${(hue + i * 2) % 360}, 100%, ${55 + f * 30}%, ${0.3 + f * 0.6})`;
    c.lineWidth = 1.5 + f * 2;
    c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
  }
  const cr = Math.min(W, H) * 0.1;
  const g = c.createRadialGradient(CX, CY, 0, CX, CY, cr);
  g.addColorStop(0, `hsla(${hue}, 100%, 90%, ${0.5 + A.bass * 0.5})`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = g; c.beginPath(); c.arc(CX, CY, cr, 0, TAU); c.fill();
}

/* =====================================================================
   MODE 11 — MATRIX  (audio-reactive digital rain)
   ===================================================================== */
const MTX_GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺABCDEF0123456789#$%&@*+=';
function modeMatrix(c) {
  const fs = Math.max(14, Math.round(Math.min(W, H) / 45));
  const n = Math.floor(W / fs);
  if (mtxCols.length !== n) mtxCols = Array.from({ length: n }, () => Math.random() * -H);

  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(2, 7, 4, 0.16)'; c.fillRect(0, 0, W, H);
  c.font = `${fs}px "Courier New", monospace`; c.textBaseline = 'top';
  const speed = fs * (0.4 + A.level * 1.7);
  for (let i = 0; i < n; i++) {
    const x = i * fs, y = mtxCols[i];
    const ch = MTX_GLYPHS[(Math.random() * MTX_GLYPHS.length) | 0];
    c.fillStyle = Math.random() < 0.25 + A.treble * 0.5
      ? 'rgba(205,255,215,0.95)'
      : `hsla(125, 100%, ${42 + A.treble * 28}%, 0.85)`;
    c.fillText(ch, x, y);
    mtxCols[i] += speed;
    if (mtxCols[i] > H && Math.random() > 0.975) mtxCols[i] = Math.random() * -240;
  }
}

/* =====================================================================
   MODE 12 — LISSAJOUS  (XY oscilloscope curves)
   ===================================================================== */
function modeLissajous(c) {
  fade(c, 0.16);
  c.globalCompositeOperation = 'lighter';
  const N = time.length, off = Math.floor(N / 4);
  const scale = Math.min(W, H) * 0.36 * (0.7 + A.level);
  for (let layer = 0; layer < 3; layer++) {
    const ph = layer * Math.floor(N / 12);
    c.strokeStyle = `hsla(${(hue + layer * 60) % 360}, 100%, 70%, ${0.6 - layer * 0.15})`;
    c.lineWidth = 2 - layer * 0.4;
    c.beginPath();
    for (let i = 0; i < N; i += 2) {
      const vx = time[(i + ph) % N] / 128 - 1;
      const vy = time[(i + off + ph) % N] / 128 - 1;
      const x = CX + vx * scale, y = CY + vy * scale;
      i ? c.lineTo(x, y) : c.moveTo(x, y);
    }
    c.stroke();
  }
}

/* =====================================================================
   MODE 13 — WEB  (constellation network of drifting nodes)
   ===================================================================== */
function modeWeb(c) {
  fade(c, 0.2);
  if (webNodes.length !== 70)
    webNodes = Array.from({ length: 70 }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: Math.random() - 0.5, vy: Math.random() - 0.5 }));
  const spd = 0.5 + A.level * 2.5 + A.beat * 2.5;
  for (const p of webNodes) {
    p.x += p.vx * spd; p.y += p.vy * spd;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    p.x = Math.max(0, Math.min(W, p.x)); p.y = Math.max(0, Math.min(H, p.y));
  }
  const maxD = Math.min(W, H) * 0.16;
  c.globalCompositeOperation = 'lighter'; c.lineWidth = 1;
  for (let i = 0; i < webNodes.length; i++) {
    const a = webNodes[i];
    for (let j = i + 1; j < webNodes.length; j++) {
      const b = webNodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < maxD) {
        c.strokeStyle = `hsla(${hue}, 90%, 65%, ${(1 - d / maxD) * 0.5})`;
        c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke();
      }
    }
    c.fillStyle = `hsla(${(hue + 40) % 360}, 100%, 75%, 0.9)`;
    c.beginPath(); c.arc(a.x, a.y, 1.5 + A.bass * 2.5, 0, TAU); c.fill();
  }
}

/* =====================================================================
   MODE 14 — VORTEX  (spiral arms of reactive particles)
   ===================================================================== */
function modeVortex(c) {
  fade(c, 0.18);
  vortexRot += 0.01 + A.mid * 0.03;
  const arms = 5, perArm = 110, R = Math.min(W, H) * 0.5;
  c.globalCompositeOperation = 'lighter';
  for (let a = 0; a < arms; a++) {
    for (let i = 0; i < perArm; i++) {
      const t = i / perArm;
      const f = freq[Math.floor(t * freq.length * 0.6)] / 255;
      const ang = t * 8 + a / arms * TAU + vortexRot;
      const rad = t * R * (1 + A.bass * 0.2);
      const [x, y] = polar(CX, CY, rad, ang);
      c.fillStyle = `hsla(${(hue + t * 180 + a * 30) % 360}, 100%, ${55 + f * 35}%, ${(1 - t) * 0.7 + f * 0.3})`;
      c.beginPath(); c.arc(x, y, 1 + f * 4 + (1 - t) * 2, 0, TAU); c.fill();
    }
  }
  const g = c.createRadialGradient(CX, CY, 0, CX, CY, 90);
  g.addColorStop(0, `hsla(${hue}, 100%, 90%, ${0.4 + A.bass * 0.5})`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = g; c.beginPath(); c.arc(CX, CY, 90, 0, TAU); c.fill();
}

/* =====================================================================
   MODE 15 — PLASMA  (audio-modulated drifting plasma blobs)
   ===================================================================== */
function modePlasma(c) {
  bgGradient(c, '#0a0316', '#03010a');
  c.globalCompositeOperation = 'lighter';
  const t = frame * 0.01, blobs = 7;
  for (let i = 0; i < blobs; i++) {
    const px = CX + Math.sin(t * 0.7 + i * 1.3) * W * 0.3 + Math.cos(t * 0.4 + i) * W * 0.12;
    const py = CY + Math.cos(t * 0.6 + i * 1.7) * H * 0.3 + Math.sin(t * 0.5 + i) * H * 0.12;
    const band = [A.bass, A.mid, A.treble][i % 3];
    const rad = Math.min(W, H) * (0.22 + band * 0.35);
    const g = c.createRadialGradient(px, py, 0, px, py, rad);
    g.addColorStop(0, `hsla(${(hue + i * 40) % 360}, 100%, 60%, ${0.18 + band * 0.25})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g; c.beginPath(); c.arc(px, py, rad, 0, TAU); c.fill();
  }
}

/* =====================================================================
   MODE 16 — STROBE  (techno neon grid, blackout pulse on beat)
   ===================================================================== */
let gridScan = 0, hypnoRot = 0, sirenRot = 0;
function modeStrobe(c) {
  if (!paintBg(c)) { c.globalCompositeOperation = 'source-over'; c.fillStyle = '#020207'; c.fillRect(0, 0, W, H); }
  gridScan = (gridScan + 1 + A.bass * 6) % 1000;
  const cell = Math.min(W, H) / 11;
  const energy = 0.12 + A.level * 0.7 + A.beat * 0.5;
  c.globalCompositeOperation = 'lighter';
  c.strokeStyle = `hsla(${hue}, 100%, 60%, ${Math.min(1, energy)})`;
  c.lineWidth = 1 + A.beat * 2;
  c.beginPath();
  for (let x = (gridScan % cell); x < W; x += cell) { c.moveTo(x, 0); c.lineTo(x, H); }
  for (let y = 0; y < H; y += cell) { c.moveTo(0, y); c.lineTo(W, y); }
  c.stroke();
  // bright horizon scan bar
  const sy = (gridScan / 1000) * H;
  const sg = c.createLinearGradient(0, sy - 40, 0, sy + 40);
  sg.addColorStop(0, 'rgba(0,0,0,0)'); sg.addColorStop(0.5, `hsla(${(hue + 60) % 360},100%,70%,${0.3 + A.mid * 0.5})`); sg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = sg; c.fillRect(0, sy - 40, W, 80);
}

/* =====================================================================
   MODE 17 — LASERS  (rotating beams + beat bursts)
   ===================================================================== */
let lasersRot = 0;
function modeLasers(c) {
  fade(c, 0.34);
  lasersRot += 0.006 + A.mid * 0.04;
  const n = 10, R = Math.hypot(W, H);
  c.globalCompositeOperation = 'lighter'; c.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const a = i / n * TAU + lasersRot;
    const f = freq[Math.floor(i / n * freq.length * 0.6)] / 255;
    const w = 1 + f * 6 + A.beat * 5;
    c.strokeStyle = `hsla(${(hue + i * 36) % 360}, 100%, ${55 + f * 30}%, ${0.25 + f * 0.5 + A.beat * 0.3})`;
    c.lineWidth = w;
    const [x2, y2] = polar(CX, CY, R, a);
    c.beginPath(); c.moveTo(CX, CY); c.lineTo(x2, y2); c.stroke();
  }
  const cr = Math.min(W, H) * (0.05 + A.bass * 0.08);
  const g = c.createRadialGradient(CX, CY, 0, CX, CY, cr * 3);
  g.addColorStop(0, `hsla(${hue}, 100%, 95%, ${0.6 + A.beat * 0.4})`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = g; c.beginPath(); c.arc(CX, CY, cr * 3, 0, TAU); c.fill();
}

/* =====================================================================
   MODE 18 — PILLARS  (full-height light columns, kick-driven)
   ===================================================================== */
function modePillars(c) {
  if (!paintBg(c)) { c.globalCompositeOperation = 'source-over'; c.fillStyle = '#04030a'; c.fillRect(0, 0, W, H); }
  const n = 28, bw = W / n;
  c.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.pow(i / n, 1.4) * freq.length * 0.7);
    const f = freq[idx] / 255;
    const h = (hue + i * 8) % 360;
    const x = i * bw + bw * 0.5;
    const intensity = 0.08 + f * 0.7 + A.beat * 0.25;
    const g = c.createLinearGradient(x, 0, x, H);
    g.addColorStop(0, `hsla(${h}, 100%, 65%, 0)`);
    g.addColorStop(0.5, `hsla(${h}, 100%, 65%, ${intensity})`);
    g.addColorStop(1, `hsla(${h}, 100%, 65%, 0)`);
    c.fillStyle = g;
    c.fillRect(x - bw * 0.32, 0, bw * 0.64, H);
    // bright cap riding the level
    const cy = H * (0.5 - (f - 0.5) * 0.9);
    c.fillStyle = `hsla(${h}, 100%, 85%, ${0.4 + f * 0.6})`;
    c.fillRect(x - bw * 0.4, cy - 3, bw * 0.8, 6);
  }
}

/* =====================================================================
   MODE 19 — HYPNO  (black/white rotating pinwheel, inverts on the kick)
   ===================================================================== */
function modeHypno(c) {
  const inv = A.beat > 0.4;
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = inv ? '#fff' : '#050505'; c.fillRect(0, 0, W, H);
  hypnoRot += 0.006 + A.bass * 0.06;
  const seg = 28, ang = TAU / seg, R = Math.hypot(W, H);
  c.save(); c.translate(CX, CY); c.rotate(hypnoRot);
  c.fillStyle = inv ? '#050505' : '#f2f2f2';
  for (let i = 0; i < seg; i += 2) {
    c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, R, i * ang, (i + 1) * ang); c.closePath(); c.fill();
  }
  c.restore();
  // concentric pulse rings for depth
  c.globalCompositeOperation = inv ? 'source-over' : 'lighter';
  c.strokeStyle = inv ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.5)';
  for (let k = 0; k < 5; k++) {
    const r = ((frame * (2 + A.bass * 6) + k * 120) % (Math.min(W, H) * 0.6));
    c.lineWidth = 2 + A.beat * 4;
    c.beginPath(); c.arc(CX, CY, r, 0, TAU); c.stroke();
  }
  // menacing red core
  const cr = Math.min(W, H) * (0.03 + A.bass * 0.05);
  const g = c.createRadialGradient(CX, CY, 0, CX, CY, cr * 4);
  g.addColorStop(0, `rgba(255,30,40,${0.5 + A.beat * 0.5})`); g.addColorStop(1, 'rgba(0,0,0,0)');
  c.globalCompositeOperation = 'lighter';
  c.fillStyle = g; c.beginPath(); c.arc(CX, CY, cr * 4, 0, TAU); c.fill();
}

/* =====================================================================
   MODE 20 — SIREN  (rotating red warehouse searchlights in haze)
   ===================================================================== */
function modeSiren(c) {
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(4,0,2,0.34)'; c.fillRect(0, 0, W, H);
  sirenRot += 0.018 + A.bass * 0.05;
  const R = Math.hypot(W, H), spread = 0.16 + A.mid * 0.1;
  c.globalCompositeOperation = 'lighter';
  for (let b = 0; b < 2; b++) {
    const a = sirenRot + b * Math.PI;
    const grad = c.createRadialGradient(CX, CY, 0, CX, CY, R);
    grad.addColorStop(0, `rgba(255,40,40,${0.45 + A.level * 0.4})`);
    grad.addColorStop(0.7, 'rgba(255,0,0,0.05)');
    grad.addColorStop(1, 'rgba(255,0,0,0)');
    c.fillStyle = grad;
    c.beginPath(); c.moveTo(CX, CY); c.arc(CX, CY, R, a - spread, a + spread); c.closePath(); c.fill();
  }
  // scanline grime
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(0,0,0,0.18)';
  for (let y = 0; y < H; y += 3) c.fillRect(0, y, W, 1);
  // pulsing siren lamp
  const cr = Math.min(W, H) * (0.04 + A.bass * 0.06 + A.beat * 0.06);
  const g = c.createRadialGradient(CX, CY, 0, CX, CY, cr * 4);
  g.addColorStop(0, `rgba(255,${50 + A.beat * 160},${50},${0.7 + A.beat * 0.3})`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  c.globalCompositeOperation = 'lighter';
  c.fillStyle = g; c.beginPath(); c.arc(CX, CY, cr * 4, 0, TAU); c.fill();
}

/* =====================================================================
   MODE 21 — GLITCH  (chromatic-split EQ slabs + datamosh tearing on beat)
   ===================================================================== */
function modeGlitch(c) {
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = '#060608'; c.fillRect(0, 0, W, H);
  c.globalCompositeOperation = 'lighter';
  const cols = 40, bw = W / cols, split = 2 + A.treble * 10 + A.beat * 16;
  for (let i = 0; i < cols; i++) {
    const f = freq[Math.floor(Math.pow(i / cols, 1.3) * freq.length * 0.7)] / 255;
    const bh = f * H, x = i * bw, y = H - bh;
    c.fillStyle = 'rgba(255,40,90,0.5)'; c.fillRect(x - split, y, bw * 0.9, bh);
    c.fillStyle = 'rgba(40,220,255,0.5)'; c.fillRect(x + split, y, bw * 0.9, bh);
    c.fillStyle = `rgba(255,255,255,${0.55 + f * 0.4})`; c.fillRect(x, y, bw * 0.9, bh);
  }
  // datamosh: shift random horizontal bands by re-drawing the canvas onto itself
  if (A.beat > 0.25) {
    const n = 4 + (Math.random() * 10 | 0);
    c.globalCompositeOperation = 'source-over';
    for (let s = 0; s < n; s++) {
      const y = Math.random() * H, hh = Math.random() * H * 0.08 + 4;
      const dx = (Math.random() - 0.5) * W * 0.25 * A.beat;
      c.drawImage(c.canvas, 0, y, W, hh, dx, y, W, hh);
    }
  }
}

/* =====================================================================
   MODE 22 — CASSETTE  (spinning reels on a neon-lit tape deck)
   The cassette body is the CassetteRemix.svg silhouette; the two reels
   are repainted in canvas so they actually spin and react to the audio.
   Reel centres are fractions of the drawn SVG rect (measured from the art):
   left ≈ 0.295w, right ≈ 0.695w, vertical ≈ 0.535h.
   ===================================================================== */
// one reel: glossy disc over the static SVG hub, wound-tape rings,
// rotating neon spokes + sweep, beat-pulsing hub. `ang` drives the spin.
function drawReel(c, cx, cy, R, ang, h) {
  // glossy dark disc — hides the static gear baked into the SVG
  c.globalCompositeOperation = 'source-over';
  const disc = c.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
  disc.addColorStop(0, '#1d1a24');
  disc.addColorStop(0.6, '#0c0a11');
  disc.addColorStop(1, '#050307');
  c.fillStyle = disc;
  c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.fill();

  // wound-tape rings
  c.lineWidth = R * 0.05;
  for (let k = 0; k < 6; k++) {
    c.strokeStyle = `hsla(${h}, 35%, ${9 + k * 2}%, 0.55)`;
    c.beginPath(); c.arc(cx, cy, R * (0.40 + k * 0.095), 0, TAU); c.stroke();
  }

  c.save();
  c.translate(cx, cy);
  c.rotate(ang);

  // rotating tape seams — makes the spin readable even at low energy
  c.globalCompositeOperation = 'lighter';
  c.strokeStyle = `hsla(${h}, 80%, 55%, 0.35)`;
  c.lineWidth = R * 0.04;
  for (let s = 0; s < 3; s++) {
    const a = s / 3 * TAU;
    c.beginPath();
    c.moveTo(Math.cos(a) * R * 0.40, Math.sin(a) * R * 0.40);
    c.lineTo(Math.cos(a) * R * 0.92, Math.sin(a) * R * 0.92);
    c.stroke();
  }

  // neon spokes
  c.shadowColor = `hsla(${h}, 100%, 60%, 0.9)`;
  c.shadowBlur = R * 0.25;
  c.strokeStyle = `hsla(${h}, 100%, 72%, 0.95)`;
  c.lineWidth = R * 0.07;
  c.lineCap = 'round';
  for (let s = 0; s < 6; s++) {
    const a = s / 6 * TAU;
    c.beginPath();
    c.moveTo(Math.cos(a) * R * 0.18, Math.sin(a) * R * 0.18);
    c.lineTo(Math.cos(a) * R * 0.60, Math.sin(a) * R * 0.60);
    c.stroke();
  }
  c.restore();

  // hub cap — pulses on beat
  c.globalCompositeOperation = 'lighter';
  const hubR = R * 0.22 * (1 + A.beat * 0.3);
  const hg = c.createRadialGradient(cx, cy, 0, cx, cy, hubR);
  hg.addColorStop(0, `hsla(${h}, 100%, 92%, 1)`);
  hg.addColorStop(0.5, `hsla(${h}, 100%, 65%, 0.9)`);
  hg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = hg;
  c.beginPath(); c.arc(cx, cy, hubR, 0, TAU); c.fill();

  // neon rim + bright sweeping highlight that tracks the rotation
  c.shadowColor = `hsla(${h}, 100%, 60%, 0.9)`;
  c.shadowBlur = R * 0.3 + A.bass * R * 0.4;
  c.lineWidth = R * 0.06 + A.bass * R * 0.05;
  c.strokeStyle = `hsla(${h}, 100%, 66%, 0.9)`;
  c.beginPath(); c.arc(cx, cy, R * 0.97, 0, TAU); c.stroke();
  c.lineWidth = R * 0.09;
  c.strokeStyle = `hsla(${(h + 40) % 360}, 100%, 82%, 0.95)`;
  c.beginPath(); c.arc(cx, cy, R * 0.97, ang, ang + 0.6); c.stroke();
  c.shadowBlur = 0;
}

function modeCassette(c) {
  // ---- reactive backdrop (a custom bg overrides it, like other clear scenes) ----
  if (!paintBg(c)) {
    c.globalCompositeOperation = 'source-over';
    const g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, `hsl(${(hue + 280) % 360}, 60%, 8%)`);
    g.addColorStop(0.5, `hsl(${(hue + 320) % 360}, 70%, 12%)`);
    g.addColorStop(1, `hsl(${hue % 360}, 65%, 7%)`);
    c.fillStyle = g; c.fillRect(0, 0, W, H);
  }

  // rotating stage-light rays
  cassRayRot += 0.002 + A.mid * 0.01;
  c.globalCompositeOperation = 'lighter';
  c.save(); c.translate(CX, CY); c.rotate(cassRayRot);
  const rayN = 16, rayLen = Math.hypot(W, H);
  for (let i = 0; i < rayN; i++) {
    const f = freq[Math.floor(i / rayN * freq.length * 0.5)] / 255;
    c.fillStyle = `hsla(${(hue + i * 12) % 360}, 90%, 60%, ${0.03 + f * 0.10})`;
    c.save(); c.rotate((i / rayN) * TAU);
    const w = rayLen * 0.05 * (0.5 + f);
    c.beginPath(); c.moveTo(0, 0); c.lineTo(rayLen, -w); c.lineTo(rayLen, w); c.closePath(); c.fill();
    c.restore();
  }
  c.restore();

  // bass bloom behind the cassette
  const bloomR = Math.min(W, H) * (0.38 + A.bass * 0.25 + A.beat * 0.15);
  const bloom = c.createRadialGradient(CX, CY, 0, CX, CY, bloomR);
  bloom.addColorStop(0, `hsla(${(hue + 200) % 360}, 100%, 65%, ${0.16 + A.bass * 0.28})`);
  bloom.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = bloom; c.fillRect(0, 0, W, H);

  // ---- cassette body (contain-fit, gentle bob + beat pulse) ----
  const aspect = (cassetteImg && cassetteImg.naturalWidth) ? cassetteImg.naturalWidth / cassetteImg.naturalHeight : 868 / 539;
  const pulse = 1 + A.beat * 0.025 + A.bass * 0.02;
  let dw = Math.min(W * 0.88, H * 0.74 * aspect) * pulse;
  let dh = dw / aspect;
  const bob = Math.sin(frame * 0.03) * H * 0.012 + A.beat * H * 0.02;
  const dx = (W - dw) / 2, dy = (H - dh) / 2 + bob;

  c.globalCompositeOperation = 'source-over';
  c.save();
  c.shadowColor = `hsla(${(hue + 200) % 360}, 100%, 60%, 0.9)`;
  c.shadowBlur = 25 + A.bass * 55 + A.beat * 30;
  if (cassetteImg && cassetteImg.naturalWidth) {
    c.drawImage(cassetteImg, dx, dy, dw, dh);
  } else {                                   // fallback body until the SVG loads
    c.fillStyle = '#0a0b09'; roundRect(c, dx, dy, dw, dh, dh * 0.08); c.fill();
  }
  c.restore();

  // ---- spinning reels ----
  const ry = dy + dh * 0.535;
  const lx = dx + dw * 0.295, rx = dx + dw * 0.695;
  const R = dw * 0.080;
  reelSpin += 0.02 + A.level * 0.16 + A.beat * 0.12;
  drawReel(c, lx, ry, R, reelSpin, hue % 360);
  drawReel(c, rx, ry, R, reelSpin, (hue + 30) % 360);

  // tape threaded like a real cassette: off the bottom of each reel, down to
  // the head line, exposed across the bottom-centre (where it reads as a
  // waveform), then back up to the other reel. Fades out when the audio is
  // quiet (and pops on the beat) so it never sits as a flat line in silence.
  const tapeAlpha = Math.min(1, A.level * 2.6 + A.beat * 0.4);
  if (tapeAlpha > 0.02) {
    c.globalCompositeOperation = 'lighter';
    c.shadowColor = `hsla(${(hue + 180) % 360}, 100%, 60%, ${0.9 * tapeAlpha})`;
    c.shadowBlur = 14;
    c.strokeStyle = `hsla(${(hue + 180) % 360}, 100%, 74%, ${0.85 * tapeAlpha})`;
    c.lineWidth = Math.max(2, dw * 0.006);
    c.lineJoin = 'round';
    const yb = ry + R * 1.15;                          // exposed-tape (head) line
    const ax = lx + R * 0.50, ay = ry + R * 0.84;      // left reel exit point (on rim)
    const ddx = rx - R * 0.50, ddy = ry + R * 0.84;    // right reel exit point (on rim)
    const bx = lx + R * 0.65, cx2 = rx - R * 0.65;     // bottom tape guides
    c.beginPath();
    c.moveTo(ax, ay);
    c.lineTo(bx, yb);
    const seg = 80;
    for (let i = 0; i <= seg; i++) {                   // exposed reactive run bx -> cx2
      const t = i / seg;
      const wv = time[Math.floor(t * time.length)] / 128 - 1;
      const env = Math.sin(t * Math.PI);               // pin the wobble to the guides
      const x = bx + (cx2 - bx) * t;
      const y = yb + wv * R * 0.42 * env * (0.5 + A.level);
      c.lineTo(x, y);
    }
    c.lineTo(ddx, ddy);
    c.stroke();
    c.lineJoin = 'miter';
    c.shadowBlur = 0;
  }

  drawParticles(c);

  // ---- retro finish: beat bloom, scanlines, vignette ----
  if (A.beat > 0.01) {
    c.globalCompositeOperation = 'lighter';
    const fl = c.createRadialGradient(CX, CY, 0, CX, CY, Math.max(W, H) * 0.6);
    fl.addColorStop(0, `hsla(${hue}, 100%, 70%, ${A.beat * 0.12})`);
    fl.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = fl; c.fillRect(0, 0, W, H);
  }
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(0,0,0,0.10)';
  for (let y = 0; y < H; y += 3) c.fillRect(0, y, W, 1);
  const vg = c.createRadialGradient(CX, CY, Math.min(W, H) * 0.3, CX, CY, Math.max(W, H) * 0.7);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(0,0,0,0.55)');
  c.fillStyle = vg; c.fillRect(0, 0, W, H);
}

/* =====================================================================
   MODE 23 — FIREFLIES  (drifting glow-mote swarm; kicks scatter it)
   ===================================================================== */
function modeFireflies(c) {
  fade(c, 0.18);

  // seed / top-up the swarm (density scales with canvas size)
  const want = Math.min(160, Math.round((W * H) / 16000));
  while (fireflies.length < want) fireflies.push({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2,
    ph: Math.random() * TAU, hu: Math.random() * 60 - 30,
  });
  if (fireflies.length > want) fireflies.length = want;

  c.globalCompositeOperation = 'lighter';
  const drift = frame * 0.004;
  for (const f of fireflies) {
    // wander + gentle pull toward a slowly orbiting attractor (bass tightens it)
    const ax = CX + Math.cos(drift + f.ph) * W * 0.22;
    const ay = CY + Math.sin(drift * 1.3 + f.ph) * H * 0.22;
    f.vx += (ax - f.x) * 0.0004 * (1 + A.bass * 2) + (Math.random() - 0.5) * 0.16;
    f.vy += (ay - f.y) * 0.0004 * (1 + A.bass * 2) + (Math.random() - 0.5) * 0.16;
    if (A.beatHit) {                        // the kick blows the swarm outward
      const a = Math.atan2(f.y - CY, f.x - CX);
      f.vx += Math.cos(a) * (1.5 + A.bass * 3);
      f.vy += Math.sin(a) * (1.5 + A.bass * 3);
    }
    const sp = Math.hypot(f.vx, f.vy), max = 1.6 + A.mid * 3;
    if (sp > max) { f.vx *= max / sp; f.vy *= max / sp; }
    f.x += f.vx; f.y += f.vy;
    if (f.x < -20) f.x = W + 20; else if (f.x > W + 20) f.x = -20;
    if (f.y < -20) f.y = H + 20; else if (f.y > H + 20) f.y = -20;

    // each firefly blinks on its own phase; treble brightens the whole field
    const bl = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(frame * 0.06 + f.ph * 7));
    const al = bl * (0.30 + A.treble * 0.8 + A.beat * 0.3);
    const r = 1.6 + bl * 2.2 + A.bass * 2;
    const h = (hue + 60 + f.hu) % 360;
    const g = c.createRadialGradient(f.x, f.y, 0, f.x, f.y, r * 4);
    g.addColorStop(0, `hsla(${h}, 100%, 75%, ${al})`);
    g.addColorStop(0.3, `hsla(${h}, 100%, 60%, ${al * 0.5})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g;
    c.beginPath(); c.arc(f.x, f.y, r * 4, 0, TAU); c.fill();
  }
  drawParticles(c);
}

/* =====================================================================
   MODE 24 — JELLYFISH  (deep-sea jellies pulsing to the bass; bubbles)
   ===================================================================== */
function modeJellyfish(c) {
  if (!paintBg(c)) {
    c.globalCompositeOperation = 'source-over';
    const g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#03101c'); g.addColorStop(1, '#010409');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
  }

  // drifting light shafts from the surface
  c.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 5; i++) {
    const sx = ((i * 0.23 + frame * 0.00025) % 1) * W * 1.4 - W * 0.2;
    const g = c.createLinearGradient(sx, 0, sx + W * 0.16, H);
    g.addColorStop(0, `hsla(${(hue + 150) % 360}, 70%, 60%, ${0.05 + A.mid * 0.05})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g;
    c.beginPath(); c.moveTo(sx, 0); c.lineTo(sx + W * 0.07, 0);
    c.lineTo(sx + W * 0.28, H); c.lineTo(sx + W * 0.10, H); c.closePath(); c.fill();
  }

  if (!jellies.length) for (let i = 0; i < 4; i++) jellies.push({
    x: (i + 0.5 + (Math.random() - 0.5) * 0.4) / 4, y: 0.25 + Math.random() * 0.45,
    s: 0.55 + Math.random() * 0.6, ph: Math.random() * TAU, hu: i * 55,
  });

  for (const j of jellies) {
    j.ph += 0.015 + A.bass * 0.03;
    const px = j.x * W + Math.sin(frame * 0.004 + j.ph * 3) * W * 0.06;
    const py = j.y * H + Math.sin(frame * 0.006 + j.ph * 5) * H * 0.05 - A.beat * H * 0.012;
    const R = Math.min(W, H) * 0.09 * j.s * (1 + A.bass * 0.3);
    const squash = 0.72 + 0.22 * Math.sin(j.ph * 2) + A.beat * 0.18;   // bell contraction
    const h = (hue + 120 + j.hu) % 360;

    // tentacles first (they hang behind the bell)
    c.globalCompositeOperation = 'lighter';
    const tn = 7;
    for (let t = 0; t < tn; t++) {
      const tx = px - R * 0.8 + (t / (tn - 1)) * R * 1.6;
      c.strokeStyle = `hsla(${(h + 20) % 360}, 95%, 70%, ${0.22 + A.treble * 0.4})`;
      c.lineWidth = 1.4;
      c.beginPath(); c.moveTo(tx, py + 2);
      const len = R * (1.8 + A.mid * 1.2), seg = 8;
      for (let s = 1; s <= seg; s++) {
        const tt = s / seg;
        const wob = Math.sin(j.ph * 4 + t * 1.7 + tt * 5) * R * 0.22 * tt
                  + (time[(t * 37 + s * 13) % time.length] / 128 - 1) * R * 0.18 * tt;
        c.lineTo(tx + wob, py + len * tt);
      }
      c.stroke();
    }

    // glowing bell
    c.shadowColor = `hsla(${h}, 100%, 65%, 0.8)`;
    c.shadowBlur = R * 0.5;
    const bell = c.createRadialGradient(px, py, 0, px, py, R);
    bell.addColorStop(0, `hsla(${h}, 95%, 72%, ${0.30 + A.mid * 0.3})`);
    bell.addColorStop(0.8, `hsla(${h}, 95%, 55%, 0.14)`);
    bell.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = bell;
    c.beginPath(); c.ellipse(px, py, R, R * squash, 0, Math.PI, TAU); c.fill();
    c.strokeStyle = `hsla(${h}, 100%, 80%, 0.7)`;
    c.lineWidth = 2.5;
    c.beginPath(); c.ellipse(px, py, R, R * squash, 0, Math.PI, TAU); c.stroke();
    c.shadowBlur = 0;
  }

  // rising bubbles — treble makes the water fizz
  if (Math.random() < 0.1 + A.treble * 0.5)
    jellyBubbles.push({ x: Math.random() * W, y: H + 8, r: 1 + Math.random() * 3, v: 0.6 + Math.random() * 1.4 });
  for (let i = jellyBubbles.length - 1; i >= 0; i--) {
    const b = jellyBubbles[i];
    b.y -= b.v * (1 + A.level * 2); b.x += Math.sin(b.y * 0.02 + b.r * 9) * 0.5;
    if (b.y < -10) { jellyBubbles.splice(i, 1); continue; }
    c.strokeStyle = `hsla(${(hue + 160) % 360}, 80%, 80%, 0.35)`;
    c.lineWidth = 1;
    c.beginPath(); c.arc(b.x, b.y, b.r, 0, TAU); c.stroke();
  }
  if (jellyBubbles.length > 200) jellyBubbles.splice(0, jellyBubbles.length - 200);
}

/* =====================================================================
   MODE 25 — HELIX  (rotating double helix; rungs light with the EQ)
   ===================================================================== */
function modeHelix(c) {
  fade(c, 0.30);
  helixRot += 0.012 + A.mid * 0.05 + A.beat * 0.05;

  const rows = 44, amp = Math.min(W, H) * (0.22 + A.bass * 0.10);
  const top = H * 0.06, bot = H * 0.94;
  const twists = Math.PI * 3;

  c.globalCompositeOperation = 'lighter';
  c.lineCap = 'round';
  // base-pair rungs (behind the strands)
  for (let i = 0; i < rows; i++) {
    const t = i / (rows - 1);
    const y = top + (bot - top) * t;
    const a = helixRot + t * twists;
    const s = Math.sin(a), depth = (Math.cos(a) + 1) / 2;   // 0 back → 1 front
    const x1 = CX + s * amp, x2 = CX - s * amp;
    const f = freq[Math.floor(Math.pow(t, 1.4) * freq.length * 0.7)] / 255;
    const h = (hue + t * 140) % 360;
    c.strokeStyle = `hsla(${h}, 95%, ${45 + f * 30}%, ${0.10 + f * 0.55})`;
    c.lineWidth = 1.5 + f * 5;
    c.beginPath(); c.moveTo(x1, y); c.lineTo(x2, y); c.stroke();
    for (const x of [x1, x2]) {
      const r = (2 + f * 6) * (0.5 + depth * 0.8);
      c.fillStyle = `hsla(${h}, 100%, ${60 + depth * 25}%, ${0.25 + depth * 0.6})`;
      c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
    }
  }
  // the two backbone strands
  c.shadowBlur = 12;
  for (const off of [0, Math.PI]) {
    const h = (hue + (off ? 40 : 0)) % 360;
    c.shadowColor = `hsla(${h}, 100%, 60%, 0.8)`;
    c.strokeStyle = `hsla(${h}, 100%, 70%, 0.8)`;
    c.lineWidth = 3;
    c.beginPath();
    const N = 90;
    for (let i = 0; i <= N; i++) {
      const t = i / N, y = top + (bot - top) * t;
      const x = CX + Math.sin(helixRot + t * twists + off) * amp;
      i ? c.lineTo(x, y) : c.moveTo(x, y);
    }
    c.stroke();
  }
  c.shadowBlur = 0;
  drawParticles(c);
}

/* =====================================================================
   MODE 26 — RADAR  (sonar sweep; beats paint contacts on the scope)
   ===================================================================== */
function modeRadar(c) {
  fade(c, 0.10);   // phosphor persistence — the sweep leaves its own wake
  radarRot += 0.022 + A.mid * 0.05 + A.beat * 0.03;
  const R = Math.min(W, H) * 0.44 * (1 + A.bass * 0.06);
  const h = (hue + 110) % 360;   // shifted toward scope-green/cyan

  // grid: range rings + crosshair
  c.globalCompositeOperation = 'lighter';
  c.strokeStyle = `hsla(${h}, 80%, 55%, 0.20)`;
  c.lineWidth = 1;
  for (let k = 1; k <= 4; k++) { c.beginPath(); c.arc(CX, CY, R * k / 4, 0, TAU); c.stroke(); }
  c.beginPath();
  c.moveTo(CX - R, CY); c.lineTo(CX + R, CY);
  c.moveTo(CX, CY - R); c.lineTo(CX, CY + R);
  c.stroke();

  // spectrum ring around the bezel — the signal meter
  const bins = 96;
  c.lineWidth = 2;
  for (let i = 0; i < bins; i++) {
    const f = freq[Math.floor(i / bins * freq.length * 0.7)] / 255;
    const a = (i / bins) * TAU - Math.PI / 2;
    const [x1, y1] = polar(CX, CY, R * 1.04, a);
    const [x2, y2] = polar(CX, CY, R * (1.04 + f * 0.18), a);
    c.strokeStyle = `hsla(${(h + f * 60) % 360}, 95%, 60%, ${0.2 + f * 0.6})`;
    c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
  }

  // rotating sweep with a fading fan behind the leading edge
  const trail = 1.1;
  c.lineWidth = Math.max(2, R * 0.012);
  for (let s = 0; s < 22; s++) {
    const a = radarRot - s / 22 * trail;
    c.strokeStyle = `hsla(${h}, 100%, ${70 - s * 1.5}%, ${(1 - s / 22) * (0.5 + A.level * 0.4)})`;
    const [x, y] = polar(CX, CY, R, a);
    c.beginPath(); c.moveTo(CX, CY); c.lineTo(x, y); c.stroke();
  }

  // contacts: beats drop blips; the sweep re-lights them as it passes
  if (A.beatHit) {
    for (let i = 0, n = 1 + (A.bass * 3 | 0); i < n; i++)
      radarBlips.push({ a: Math.random() * TAU, r: 0.25 + Math.random() * 0.7, life: 1, big: A.bass > 0.5 });
    if (radarBlips.length > 40) radarBlips.splice(0, radarBlips.length - 40);
  }
  for (let i = radarBlips.length - 1; i >= 0; i--) {
    const b = radarBlips[i];
    b.life -= 0.008;
    if (b.life <= 0) { radarBlips.splice(i, 1); continue; }
    const [x, y] = polar(CX, CY, b.r * R, b.a);
    const da = ((radarRot - b.a) % TAU + TAU) % TAU;
    const lit = Math.max(0, 1 - da * 2.2);
    const al = Math.min(1, b.life * 0.5 + lit);
    const r2 = (b.big ? 6 : 3.5) * (1 + lit);
    c.fillStyle = `hsla(${h}, 100%, ${65 + lit * 25}%, ${al})`;
    c.beginPath(); c.arc(x, y, r2, 0, TAU); c.fill();
    if (lit > 0.55) {   // fresh ping ring right behind the sweep
      c.strokeStyle = `hsla(${h}, 100%, 75%, ${(lit - 0.55) * 1.5})`;
      c.lineWidth = 1.5;
      c.beginPath(); c.arc(x, y, r2 * (3 - lit * 2), 0, TAU); c.stroke();
    }
  }

  // glowing scope centre
  const cg = c.createRadialGradient(CX, CY, 0, CX, CY, R * 0.12);
  cg.addColorStop(0, `hsla(${h}, 100%, 80%, ${0.5 + A.beat * 0.5})`);
  cg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = cg;
  c.beginPath(); c.arc(CX, CY, R * 0.12, 0, TAU); c.fill();
}

/* =====================================================================
   MODE 27 — SKYLINE  (night metropolis; towers ride the EQ, windows
   flicker with their band, heavy kicks throw sheet lightning)
   ===================================================================== */
function modeSkyline(c) {
  if (!paintBg(c)) {
    c.globalCompositeOperation = 'source-over';
    const g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#04060d');
    g.addColorStop(0.65, `hsl(${(hue + 250) % 360}, 45%, 9%)`);
    g.addColorStop(1, `hsl(${(hue + 300) % 360}, 55%, 13%)`);
    c.fillStyle = g; c.fillRect(0, 0, W, H);
  }

  // (re)build the street when the canvas size changes
  if (!cityBlds.length || cityW !== W) {
    cityW = W; cityBlds = [];
    let x = -20;
    while (x < W + 20) {
      const bw = W * (0.025 + Math.random() * 0.045);
      cityBlds.push({ x, w: bw, h: 0.18 + Math.random() * 0.55, seed: Math.random() * 1000 });
      x += bw + W * 0.004;
    }
  }

  // stars + moon
  c.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 60; i++) {
    const sx = (i * 97.3) % W, sy = (i * 57.7) % (H * 0.5);
    const tw = 0.5 + 0.5 * Math.sin(frame * 0.05 + i * 3);
    c.fillStyle = `rgba(200,220,255,${0.10 + tw * 0.25 * (0.4 + A.treble)})`;
    c.fillRect(sx, sy, 1.5, 1.5);
  }
  const mx = W * 0.82, my = H * 0.16, mr = Math.min(W, H) * 0.045;
  const mg = c.createRadialGradient(mx, my, 0, mx, my, mr * 3);
  mg.addColorStop(0, 'rgba(235,240,255,0.9)');
  mg.addColorStop(0.25, 'rgba(200,215,255,0.25)');
  mg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = mg; c.beginPath(); c.arc(mx, my, mr * 3, 0, TAU); c.fill();

  // sheet lightning on heavy kicks
  if (A.beatHit && A.bass > 0.45) cityBolt = 1;
  if (cityBolt > 0.02) {
    c.fillStyle = `hsla(${(hue + 220) % 360}, 80%, 80%, ${cityBolt * 0.18})`;
    c.fillRect(0, 0, W, H);
    cityBolt *= 0.82;
  }

  // towers + windows
  const base = H * 0.98, n = cityBlds.length;
  for (let i = 0; i < n; i++) {
    const b = cityBlds[i];
    const f = freq[Math.floor(Math.pow(i / n, 1.3) * freq.length * 0.6)] / 255;
    const bh = H * b.h * (0.75 + f * 0.5 + A.bass * 0.1);   // each tower rides its band
    const y = base - bh;
    c.globalCompositeOperation = 'source-over';
    c.fillStyle = '#04050a';
    c.fillRect(b.x, y, b.w, bh);

    c.globalCompositeOperation = 'lighter';
    const cw = b.w / 4, ch = H * 0.022;
    const cols = 3, rows = Math.min(24, Math.floor(bh / ch) - 1);
    const wh = (hue + 40 + i * 3) % 360;
    for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
      const rnd = Math.sin(b.seed + r * 12.9898 + q * 78.233) * 43758.5453;
      if (rnd - Math.floor(rnd) > 0.12 + f * 0.55) continue;   // window off
      c.fillStyle = `hsla(${wh}, 85%, ${55 + f * 25}%, ${0.30 + f * 0.5})`;
      c.fillRect(b.x + cw * (q + 0.55), y + ch * (r + 0.6), cw * 0.5, ch * 0.45);
    }
    // rooftop beacon on the tallest towers
    if (b.h > 0.55) {
      const bk = 0.4 + 0.6 * Math.sin(frame * 0.1 + b.seed);
      c.fillStyle = `rgba(255,60,70,${Math.max(0, bk) * (0.4 + A.treble * 0.5)})`;
      c.beginPath(); c.arc(b.x + b.w / 2, y - 3, 2.2, 0, TAU); c.fill();
    }
  }

  // street haze glowing with the bass
  const gz = c.createLinearGradient(0, base - H * 0.05, 0, H);
  gz.addColorStop(0, 'rgba(0,0,0,0)');
  gz.addColorStop(1, `hsla(${(hue + 20) % 360}, 90%, 55%, ${0.10 + A.bass * 0.22})`);
  c.fillStyle = gz;
  c.fillRect(0, base - H * 0.05, W, H - base + H * 0.05);
  drawParticles(c);
}

/* =====================================================================
   MODE 28 — FIREWORKS  (beats launch rockets; bursts, rings, crackle)
   ===================================================================== */
function modeFireworks(c) {
  fade(c, 0.13);

  const launch = n => {
    for (let i = 0; i < n; i++) fwRockets.push({
      x: W * (0.15 + Math.random() * 0.7), y: H + 6,
      vx: (Math.random() - 0.5) * 2.2,
      vy: -H * (0.011 + Math.random() * 0.006) * (1 + A.bass * 0.35),
      hu: (hue + Math.random() * 90) % 360,
      fuse: H * (0.32 + Math.random() * 0.33),
    });
  };
  if (A.beatHit) launch(1 + Math.round(A.bass * 3));
  else if (isPlaying() && A.level > 0.12 && Math.random() < 0.012) launch(1);   // idle lulls still get the odd shell

  c.globalCompositeOperation = 'lighter';
  // rockets climb, sparkle, then burst at the top of their fuse
  for (let i = fwRockets.length - 1; i >= 0; i--) {
    const r = fwRockets[i];
    r.x += r.vx; r.y += r.vy; r.vy += H * 0.00012;
    fwSparks.push({ x: r.x, y: r.y, vx: (Math.random() - 0.5) * 0.6, vy: Math.random() * 0.8, life: 0.35, hu: r.hu, r: 1.2, g: 0 });
    c.fillStyle = `hsla(${r.hu}, 100%, 80%, 0.9)`;
    c.beginPath(); c.arc(r.x, r.y, 2.2, 0, TAU); c.fill();
    if (r.y < H - r.fuse || r.vy > -1) {
      fwRockets.splice(i, 1);
      const n = 50 + Math.round(A.level * 70) + (Math.random() * 30 | 0);
      const ring = Math.random() < 0.3;          // some shells burst as perfect rings
      for (let k = 0; k < n; k++) {
        const a = ring ? k / n * TAU : Math.random() * TAU;
        const sp = ring ? 5.5 : 1.5 + Math.random() * 6.5;
        fwSparks.push({
          x: r.x, y: r.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          life: 1, hu: (r.hu + Math.random() * 40 - 20 + 360) % 360,
          r: 1.4 + Math.random() * 1.8, g: 1,
        });
      }
    }
  }
  // sparks: drag + gravity, crackling twinkle as they die
  for (let i = fwSparks.length - 1; i >= 0; i--) {
    const s = fwSparks[i];
    s.x += s.vx; s.y += s.vy;
    s.vx *= 0.975; s.vy = s.vy * 0.975 + (s.g ? H * 0.00016 : 0);
    s.life -= 0.011;
    if (s.life <= 0) { fwSparks.splice(i, 1); continue; }
    const tw = s.life < 0.35 ? (Math.random() < 0.5 ? 0.2 : 1) : 1;
    c.fillStyle = `hsla(${s.hu}, 100%, ${60 + s.life * 30}%, ${s.life * tw})`;
    c.beginPath(); c.arc(s.x, s.y, s.r * (0.5 + s.life * 0.7), 0, TAU); c.fill();
  }
  if (fwSparks.length > 1600) fwSparks.splice(0, fwSparks.length - 1600);

  // silhouetted horizon + crowd-glow that breathes with the level
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = '#020308';
  c.fillRect(0, H * 0.965, W, H * 0.035);
  c.globalCompositeOperation = 'lighter';
  const hg = c.createLinearGradient(0, H, 0, H * 0.86);
  hg.addColorStop(0, `hsla(${hue}, 90%, 60%, ${0.08 + A.level * 0.16})`);
  hg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = hg;
  c.fillRect(0, H * 0.86, W, H * 0.14);
}

/* =====================================================================
   MODE 29 — INFERNO  (roaring flame wall driven by the bass; embers)
   ===================================================================== */
function modeInferno(c) {
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(3,1,0,0.32)'; c.fillRect(0, 0, W, H);

  // radiant heat rising from the floor
  const hg = c.createLinearGradient(0, H, 0, H * 0.35);
  hg.addColorStop(0, `rgba(255,60,10,${0.20 + A.bass * 0.30})`);
  hg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = hg; c.fillRect(0, 0, W, H);

  // three flame layers, hottest in front; peaks ride the low spectrum
  c.globalCompositeOperation = 'lighter';
  const layers = [
    { col: a => `rgba(255,40,0,${a})`,    amp: 0.58, sp: 0.9 },
    { col: a => `rgba(255,140,0,${a})`,   amp: 0.44, sp: 1.3 },
    { col: a => `rgba(255,235,120,${a})`, amp: 0.30, sp: 1.8 },
  ];
  const segs = 64;
  for (let L = 0; L < layers.length; L++) {
    const lay = layers[L];
    c.fillStyle = lay.col(0.16 + A.bass * 0.20);
    c.beginPath(); c.moveTo(0, H);
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const f = freq[Math.floor(t * freq.length * 0.5)] / 255;
      const n = Math.sin(t * 21 + frame * 0.05 * lay.sp + L * 9)
              + Math.sin(t * 47 - frame * 0.083 * lay.sp) * 0.5;
      c.lineTo(t * W, H - (f * 1.1 + Math.max(0, n) * 0.28 + A.bass * 0.4) * H * lay.amp);
    }
    c.lineTo(W, H); c.closePath(); c.fill();
  }

  // embers spiralling up on the heat
  if (Math.random() < 0.3 + A.level * 0.6) emberParts.push({
    x: Math.random() * W, y: H + 4, vy: 1 + Math.random() * 2.5,
    ph: Math.random() * TAU, life: 1, r: 1 + Math.random() * 2,
  });
  for (let i = emberParts.length - 1; i >= 0; i--) {
    const p = emberParts[i];
    p.y -= p.vy * (1 + A.bass * 1.6);
    p.x += Math.sin(p.y * 0.02 + p.ph) * 1.4;
    p.life -= 0.006;
    if (p.life <= 0 || p.y < -10) { emberParts.splice(i, 1); continue; }
    c.fillStyle = `hsla(${20 + p.life * 35}, 100%, ${55 + p.life * 30}%, ${p.life * 0.9})`;
    c.beginPath(); c.arc(p.x, p.y, p.r * (0.4 + p.life * 0.8), 0, TAU); c.fill();
  }
  if (emberParts.length > 500) emberParts.splice(0, emberParts.length - 500);

  // white-hot flare on the kick
  if (A.beat > 0.02) {
    const fl = c.createRadialGradient(CX, H * 0.9, 0, CX, H * 0.9, Math.max(W, H) * 0.55);
    fl.addColorStop(0, `rgba(255,240,200,${A.beat * 0.30})`);
    fl.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = fl; c.fillRect(0, 0, W, H);
  }
}

/* =====================================================================
   MODE 30 — ORBITS  (planets with comet trails around a pulsing sun)
   ===================================================================== */
function modeOrbits(c) {
  fade(c, 0.16);   // trails
  const S = Math.min(W, H);

  if (!orbitBodies.length) for (let i = 0; i < 6; i++) orbitBodies.push({
    a: Math.random() * TAU,
    r: 0.16 + i * 0.115,                        // orbit radius, fraction of S
    sp: 0.02 / Math.pow(0.16 + i * 0.115, 1.1) * 0.16,  // Kepler-ish: outer = slower
    s: 0.010 + Math.random() * 0.012, hu: i * 45,
    moon: i > 1 && Math.random() < 0.5, ma: Math.random() * TAU,
  });

  // asteroid belt shimmering with the treble
  c.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 90; i++) {
    const a = i * 2.399 + frame * 0.0012;
    const rr = S * 0.46 + Math.sin(i * 7.3) * S * 0.02;
    const [x, y] = polar(CX, CY, rr, a);
    const tw = 0.5 + 0.5 * Math.sin(frame * 0.08 + i * 5);
    c.fillStyle = `hsla(${(hue + 30) % 360}, 60%, 70%, ${(0.05 + tw * 0.18) * (0.4 + A.treble * 1.4)})`;
    c.fillRect(x, y, 1.6, 1.6);
  }

  for (let i = 0; i < orbitBodies.length; i++) {
    const b = orbitBodies[i];
    const f = freq[Math.floor((i + 1) / 8 * freq.length * 0.3)] / 255;
    const OR = b.r * S;
    // orbit ring lights up with its band
    c.strokeStyle = `hsla(${(hue + b.hu) % 360}, 80%, 60%, ${0.04 + f * 0.22})`;
    c.lineWidth = 1;
    c.beginPath(); c.arc(CX, CY, OR, 0, TAU); c.stroke();

    b.a += b.sp * (1 + A.mid * 2.5 + A.beat * 1.2);
    const [x, y] = polar(CX, CY, OR, b.a);
    const pr = S * (b.s + f * 0.012);
    const h = (hue + b.hu) % 360;
    const g = c.createRadialGradient(x, y, 0, x, y, pr * 2.6);
    g.addColorStop(0, `hsla(${h}, 95%, 78%, ${0.85 + f * 0.15})`);
    g.addColorStop(0.4, `hsla(${h}, 95%, 55%, 0.5)`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g;
    c.beginPath(); c.arc(x, y, pr * 2.6, 0, TAU); c.fill();
    if (b.moon) {
      b.ma += 0.09 + A.treble * 0.15;
      const [mx2, my2] = polar(x, y, pr * 3.4, b.ma);
      c.fillStyle = `hsla(${(h + 60) % 360}, 90%, 80%, 0.8)`;
      c.beginPath(); c.arc(mx2, my2, pr * 0.35, 0, TAU); c.fill();
    }
  }

  // the sun — swells on the bass, flares on the beat
  const sr = S * (0.055 + A.bass * 0.05 + A.beat * 0.03);
  const sg = c.createRadialGradient(CX, CY, 0, CX, CY, sr * 3);
  sg.addColorStop(0, `hsla(${(hue + 40) % 360}, 100%, 88%, 1)`);
  sg.addColorStop(0.3, `hsla(${(hue + 25) % 360}, 100%, 60%, ${0.5 + A.bass * 0.4})`);
  sg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = sg;
  c.beginPath(); c.arc(CX, CY, sr * 3, 0, TAU); c.fill();
  drawParticles(c);
}

/* =====================================================================
   MODE 31 — BUNKER  (hard-techno / schranz: a dying floodlight behind a
   grinding industrial fan, chains swinging from the ceiling, smoke, hard
   red strobes. The room shakes on the kick. Grime overlays on top: heavy
   grain, film scratches, scanlines, glitch tears, projector blackouts and
   a choking vignette. Monochrome + blood red — ignores the global hue on
   purpose, like SIREN.)
   ===================================================================== */
function modeBunker(c) {
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(3,1,1,0.55)'; c.fillRect(0, 0, W, H);
  const S = Math.min(W, H);

  // the whole room jolts on the kick
  const shk = A.beat * S * 0.012;
  c.save();
  c.translate((Math.random() - 0.5) * shk * 2, (Math.random() - 0.5) * shk * 2);

  // the floodlight is broken: it buzzes, browns out, and sometimes dies
  // outright for a bunch of frames before stuttering back to life
  if (bunkerFail <= 0 && Math.random() < 0.007) bunkerFail = 8 + Math.random() * 25;
  let flick = (0.16 + A.bass * 0.45 + A.beat * 0.75) * (0.72 + Math.random() * 0.28);
  if (bunkerFail > 0) { bunkerFail--; flick *= Math.random() < 0.15 ? 0.9 : 0.04; }

  // dirty light: sickly warm core buried in blood red — never a clean white
  c.globalCompositeOperation = 'lighter';
  const bl = c.createRadialGradient(CX, CY, 0, CX, CY, S * 0.55);
  bl.addColorStop(0, `rgba(255,225,200,${Math.min(1, flick)})`);
  bl.addColorStop(0.26, `rgba(220,15,15,${0.3 + A.bass * 0.35})`);
  bl.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = bl; c.beginPath(); c.arc(CX, CY, S * 0.55, 0, TAU); c.fill();

  // smoke plumes crawling up through the light
  if (bunkerSmoke.length < 22 && Math.random() < 0.25) bunkerSmoke.push({
    x: Math.random() * W, y: H * (0.45 + Math.random() * 0.65),
    r: S * (0.09 + Math.random() * 0.15),
    vx: (Math.random() - 0.5) * 0.6, vy: -(0.25 + Math.random() * 0.5),
    ph: Math.random() * TAU, life: 1,
  });
  for (let i = bunkerSmoke.length - 1; i >= 0; i--) {
    const p = bunkerSmoke[i];
    p.x += p.vx + Math.sin(frame * 0.01 + p.ph) * 0.4;
    p.y += p.vy * (1 + A.bass * 0.8);
    p.life -= 0.0035;
    if (p.life <= 0 || p.y < -p.r) { bunkerSmoke.splice(i, 1); continue; }
    // smoke is only visible where the light hits it, tinted by the red glow
    const lit = Math.max(0, 1 - Math.hypot(p.x - CX, p.y - CY) / (S * 0.7));
    const sg = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    sg.addColorStop(0, `rgba(210,170,170,${p.life * lit * (0.04 + flick * 0.11)})`);
    sg.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = sg; c.beginPath(); c.arc(p.x, p.y, p.r, 0, TAU); c.fill();
  }

  // the fan — a grinding black hulk chopping the light. It doesn't spin
  // clean: it stutters, catches, and jerks backwards like the bearing is shot
  const spin = 0.05 + A.bass * 0.4 + A.beat * 0.25;
  bunkerRot += Math.random() < 0.04 ? -spin * 2.5 : spin * (Math.random() < 0.06 ? 0.1 : 1);
  const FR = S * 0.33;
  c.globalCompositeOperation = 'source-over';
  c.save(); c.translate(CX, CY); c.rotate(bunkerRot);
  c.fillStyle = '#000';
  for (let b = 0; b < 5; b++) {
    c.rotate(TAU / 5);
    // jagged, chipped blade — broken teeth along the trailing edge
    c.beginPath();
    c.moveTo(0, 0);
    c.quadraticCurveTo(FR * 0.55, -FR * 0.3, FR, -FR * 0.12);
    c.lineTo(FR * 0.97, FR * 0.06);
    c.lineTo(FR * 0.84, FR * 0.10);
    c.lineTo(FR * 0.90, FR * 0.22);
    c.lineTo(FR * 0.68, FR * 0.20);
    c.lineTo(FR * 0.60, FR * 0.30);
    c.quadraticCurveTo(FR * 0.4, FR * 0.16, 0, 0);
    c.closePath(); c.fill();
  }
  c.beginPath(); c.arc(0, 0, FR * 0.17, 0, TAU); c.fill();
  c.restore();
  // housing ring, rim-lit red so the machine stays readable between hits
  c.lineWidth = S * 0.028;
  c.strokeStyle = '#000';
  c.beginPath(); c.arc(CX, CY, FR * 1.08, 0, TAU); c.stroke();
  c.strokeStyle = `rgba(255,30,30,${0.10 + A.bass * 0.25 + A.beat * 0.3})`;
  c.lineWidth = 2;
  c.beginPath(); c.arc(CX, CY, FR * 1.08 + S * 0.016, 0, TAU); c.stroke();

  // chains hanging off the ceiling, swinging with the low end — black
  // silhouettes in front of everything
  if (!bunkerChains.length || bunkerChains.cw !== W) {
    bunkerChains = Object.assign([], { cw: W });
    for (let i = 0; i < 7; i++) bunkerChains.push({
      x: (0.06 + Math.random() * 0.88) * W,
      len: H * (0.2 + Math.random() * 0.45),
      ph: Math.random() * TAU, sp: 0.014 + Math.random() * 0.012,
      w: S * (0.008 + Math.random() * 0.007),
    });
  }
  c.strokeStyle = '#000'; c.lineCap = 'round';
  for (const ch of bunkerChains) {
    const sw = Math.sin(frame * ch.sp + ch.ph) * (0.06 + A.bass * 0.16);
    const links = Math.round(ch.len / (ch.w * 2.4));
    c.lineWidth = ch.w;
    c.beginPath(); c.moveTo(ch.x, -4);
    let lx = ch.x, ly = -4;
    for (let k = 1; k <= links; k++) {
      // each link hangs a little further into the swing — a lazy pendulum curve
      lx = ch.x + Math.sin(sw) * (k / links) * ch.len * 0.9 * (k / links);
      ly = -4 + (k / links) * ch.len;
      c.lineTo(lx, ly);
    }
    c.stroke();
    // faint red glint crawling down the chain when the light hits
    c.strokeStyle = `rgba(255,40,40,${flick * 0.25})`;
    c.lineWidth = 1;
    c.beginPath(); c.moveTo(ch.x + 1, 0); c.lineTo(lx + 1, ly); c.stroke();
    c.strokeStyle = '#000';
  }

  // strobe beams sweeping from the top corners — one harsh white, one blood
  // red, slicing the smoke when the beat lands
  c.globalCompositeOperation = 'lighter';
  const R = Math.hypot(W, H) * 1.1;
  for (let s = 0; s < 2; s++) {
    const ox = s ? W : 0;
    const a = Math.PI / 2 + (s ? -0.3 : 0.3) + Math.sin(frame * 0.014 + s * 2.4) * 0.5;
    const spread = 0.03 + A.mid * 0.03;
    const al = Math.min(0.75, 0.02 + A.beat * 0.45 + A.treble * 0.08);
    const g = c.createRadialGradient(ox, -20, 0, ox, -20, R);
    g.addColorStop(0, s ? `rgba(255,30,30,${al})` : `rgba(255,255,255,${al})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g;
    c.beginPath(); c.moveTo(ox, -20);
    c.arc(ox, -20, R, a - spread, a + spread); c.closePath(); c.fill();
  }

  // segmented red LED meters along the floor — half the segments are dead
  // or dying, like the rack has been kicked one time too many
  const cols = 48, bw2 = W / cols, seg = Math.max(4, S * 0.012);
  for (let i = 0; i < cols; i++) {
    const f = freq[Math.floor(Math.pow(i / cols, 1.35) * freq.length * 0.6)] / 255;
    const segs = Math.floor(f * (H * 0.22) / seg);
    for (let k = 0; k < segs; k++) {
      if ((i * 7 + k * 13) % 9 === 0) continue;                 // dead segments
      const dying = (i * 5 + k * 3) % 11 === 0 && Math.random() < 0.5;
      const top = k === segs - 1;
      c.fillStyle = top ? `rgba(255,120,120,${0.5 + f * 0.5})`
                        : `rgba(255,20,20,${(0.1 + f * 0.28) * (dying ? 0.3 : 1)})`;
      c.fillRect(i * bw2 + bw2 * 0.14, H - (k + 1) * seg + 1, bw2 * 0.72, seg - 2);
    }
  }

  c.restore();   // end of room shake — overlays below stay locked to the frame

  /* ---- grime overlays ---- */
  // glitch tear: shove horizontal bands sideways on hard kicks
  if (A.beat > 0.45 && Math.random() < 0.7) {
    c.globalCompositeOperation = 'source-over';
    const n = 4 + (Math.random() * 8 | 0);
    for (let s = 0; s < n; s++) {
      const y = Math.random() * H, hh = 4 + Math.random() * H * 0.07;
      const dx = (Math.random() - 0.5) * W * 0.3 * A.beat;
      c.drawImage(c.canvas, 0, y, W, hh, dx, y, W, hh);
    }
  }
  // smeared double-exposure on the hit — the frame can't keep up
  if (A.beat > 0.55) {
    c.globalCompositeOperation = 'source-over';
    c.globalAlpha = 0.22 * A.beat;
    c.drawImage(c.canvas, 0, 0, c.canvas.width, c.canvas.height,
                (Math.random() - 0.5) * S * 0.02, (Math.random() - 0.5) * S * 0.012, W, H);
    c.globalAlpha = 1;
  }
  // strobe pop right on the hit — usually blood red, sometimes blinding white
  if (A.beat > 0.8) {
    c.globalCompositeOperation = 'lighter';
    c.fillStyle = Math.random() < 0.25
      ? `rgba(255,255,255,${(A.beat - 0.8) * 1.1})`
      : `rgba(200,0,0,${(A.beat - 0.8) * 1.4})`;
    c.fillRect(0, 0, W, H);
  }
  c.globalCompositeOperation = 'source-over';
  // projector dropout: the odd frame just dies
  if (Math.random() < 0.012) { c.fillStyle = 'rgba(0,0,0,0.85)'; c.fillRect(0, 0, W, H); }
  // heavy grain — white dust and black dirt
  for (let i = 0; i < 110; i++) {
    c.fillStyle = `rgba(255,255,255,${Math.random() * 0.08})`;
    c.fillRect(Math.random() * W, Math.random() * H, 1.5, 1.5);
  }
  for (let i = 0; i < 60; i++) {
    c.fillStyle = `rgba(0,0,0,${Math.random() * 0.3})`;
    c.fillRect(Math.random() * W, Math.random() * H, 2, 2);
  }
  // film scratches — flickering vertical hairlines
  for (let i = 0; i < 3; i++) if (Math.random() < 0.4) {
    const x = Math.random() * W;
    c.fillStyle = `rgba(255,255,255,${0.02 + Math.random() * 0.05})`;
    c.fillRect(x, 0, 1, H);
  }
  // rolling scanlines
  c.fillStyle = 'rgba(0,0,0,0.18)';
  for (let y = frame % 4; y < H; y += 4) c.fillRect(0, y, W, 1);
  // choking vignette, dragged slightly off-centre, pumping open on the kick
  const vg = c.createRadialGradient(CX, CY + H * 0.06, S * (0.28 + A.beat * 0.12), CX, CY + H * 0.06, S * 0.88);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, `rgba(0,0,0,${0.9 - A.beat * 0.18})`);
  c.fillStyle = vg; c.fillRect(0, 0, W, H);
}

function roundRect(c, x, y, w, h, r) {
  r = Math.min(r, w / 2, Math.abs(h) / 2);
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

/* =====================================================================
   MODE 32 — PRESS  (hydraulic stamping press — the kick IS the machine)
   A monstrous black ram hangs over an anvil. Every kick releases it:
   it free-falls, hits steel, and the impact throws a shower of white-hot
   sparks that bounce and die red on the floor. Hazard stripes, rotating
   beacons and vented steam keep the factory alive between hits.
   ===================================================================== */
function modePress(c) {
  const S = Math.min(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = '#030102'; c.fillRect(0, 0, W, H);

  // geometry
  const anvilY = H * 0.78;                       // top of the anvil
  const ramW = W * 0.36, ramX = CX - ramW / 2;
  const restY = H * 0.16;                        // ram head bottom, retracted
  const headH = S * 0.11;

  // ---- ram state machine: kick → free-fall → impact → slow hydraulic retract
  if (A.beatHit && !pressDrop && pressRam < 0.65) pressDrop = true;   // re-arms fast enough for 150+ BPM kicks
  if (pressDrop) {
    pressRam = Math.min(1, pressRam + 0.30 + pressRam * 0.25);   // accelerating fall
    if (pressRam >= 1) {                                          // IMPACT
      pressDrop = false;
      pressImpact = 1;
      const n = 60 + Math.round(A.bass * 90);
      for (let i = 0; i < n; i++) {
        const a = -Math.PI * (0.08 + Math.random() * 0.84);       // spray upward+sideways
        const sp = (2 + Math.random() * 9) * (S / 500) * (0.7 + A.bass);
        pressSparks.push({
          x: CX + (Math.random() - 0.5) * ramW * 0.9, y: anvilY - 2,
          vx: Math.cos(a) * sp * (Math.random() < 0.5 ? 1 : -1) * 1.6,
          vy: Math.sin(a) * sp * 1.4,
          life: 0.55 + Math.random() * 0.45, r: 1 + Math.random() * 2,
        });
      }
    }
  } else pressRam = Math.max(0, pressRam - 0.028 - A.level * 0.012);  // hiss back up
  pressImpact *= 0.86;
  const ramY = restY + (anvilY - headH - restY) * (pressRam * pressRam);   // eased drop

  // impact shake — everything in the room jolts
  const shk = pressImpact * S * 0.02;
  c.save();
  c.translate((Math.random() - 0.5) * shk * 2, (Math.random() - 0.5) * shk * 2);

  // ---- red haze rising off the floor
  const hz = c.createLinearGradient(0, anvilY - S * 0.4, 0, H);
  hz.addColorStop(0, 'rgba(0,0,0,0)');
  hz.addColorStop(1, `rgba(120,8,8,${0.16 + A.bass * 0.25 + pressImpact * 0.4})`);
  c.fillStyle = hz; c.fillRect(0, 0, W, H);

  // ---- rotating warning beacons in the top corners
  pressBeacon += 0.05 + A.mid * 0.06;
  c.globalCompositeOperation = 'lighter';
  const BR = Math.hypot(W, H);
  for (let b = 0; b < 2; b++) {
    const ox = b ? W - S * 0.04 : S * 0.04, dir = b ? -1 : 1;
    const a = Math.PI / 2 + Math.sin(pressBeacon + b * Math.PI) * 0.9 * dir;
    const g = c.createRadialGradient(ox, 0, 0, ox, 0, BR);
    g.addColorStop(0, `rgba(255,30,20,${0.14 + A.bass * 0.2 + pressImpact * 0.3})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g;
    c.beginPath(); c.moveTo(ox, 0); c.arc(ox, 0, BR, a - 0.05, a + 0.05); c.closePath(); c.fill();
    c.fillStyle = `rgba(255,60,40,${0.5 + Math.sin(pressBeacon * 2 + b) * 0.4})`;
    c.beginPath(); c.arc(ox, S * 0.02, S * 0.012, 0, TAU); c.fill();
  }

  // ---- steam vents while retracting
  if (!pressDrop && pressRam > 0.05 && Math.random() < 0.5 && pressSteam.length < 26) pressSteam.push({
    x: ramX + (Math.random() < 0.5 ? 0 : ramW), y: ramY - headH * 0.4,
    vx: (Math.random() - 0.5) * 2.2, vy: -(0.4 + Math.random()),
    r: S * (0.02 + Math.random() * 0.04), life: 1,
  });
  c.globalCompositeOperation = 'source-over';
  for (let i = pressSteam.length - 1; i >= 0; i--) {
    const p = pressSteam[i];
    p.x += p.vx; p.y += p.vy; p.r *= 1.02; p.life -= 0.022;
    if (p.life <= 0) { pressSteam.splice(i, 1); continue; }
    const sg = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    sg.addColorStop(0, `rgba(200,160,160,${p.life * 0.10})`);
    sg.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = sg; c.beginPath(); c.arc(p.x, p.y, p.r, 0, TAU); c.fill();
  }

  // ---- side frame pillars, red rim-lit
  c.fillStyle = '#000';
  c.fillRect(ramX - S * 0.07, 0, S * 0.06, anvilY);
  c.fillRect(ramX + ramW + S * 0.01, 0, S * 0.06, anvilY);
  c.fillStyle = `rgba(255,25,25,${0.12 + A.bass * 0.2})`;
  c.fillRect(ramX - S * 0.012, 0, 2, anvilY);
  c.fillRect(ramX + ramW + S * 0.01, 0, 2, anvilY);

  // ---- the ram: hydraulic rod + massive head with hazard stripes
  c.fillStyle = '#0a0a0c';
  c.fillRect(CX - S * 0.03, 0, S * 0.06, ramY - headH);            // rod
  c.fillStyle = `rgba(255,40,30,${0.25 + pressImpact * 0.5})`;      // hot rod seam
  c.fillRect(CX - 1.5, 0, 3, ramY - headH);
  c.fillStyle = '#050507';
  c.fillRect(ramX, ramY - headH, ramW, headH);                      // head block
  // hazard stripe band (red / black diagonals)
  c.save();
  c.beginPath(); c.rect(ramX, ramY - headH * 0.42, ramW, headH * 0.42); c.clip();
  for (let x = -headH; x < ramW + headH; x += headH * 0.5) {
    c.fillStyle = ((x / (headH * 0.5)) | 0) % 2 ? '#a80f0f' : '#111';
    c.beginPath();
    c.moveTo(ramX + x, ramY); c.lineTo(ramX + x + headH * 0.25, ramY);
    c.lineTo(ramX + x + headH * 0.25 - headH * 0.42, ramY - headH * 0.42);
    c.lineTo(ramX + x - headH * 0.42, ramY - headH * 0.42);
    c.closePath(); c.fill();
  }
  c.restore();
  // grinding face edge, glows hotter with each hit
  c.fillStyle = `rgba(255,${60 + pressImpact * 180},40,${0.4 + pressImpact * 0.6})`;
  c.fillRect(ramX, ramY - 3, ramW, 3);

  // ---- anvil + floor
  c.fillStyle = '#050505';
  c.fillRect(0, anvilY, W, H - anvilY);
  c.fillStyle = '#0c0b0d';
  c.fillRect(ramX - S * 0.03, anvilY, ramW + S * 0.06, S * 0.02);
  c.fillStyle = `rgba(255,30,25,${0.2 + A.bass * 0.3 + pressImpact * 0.6})`;
  c.fillRect(ramX - S * 0.03, anvilY, ramW + S * 0.06, 2);

  // ---- impact flash: blinding sheet of light squeezed out of the die
  if (pressImpact > 0.05) {
    c.globalCompositeOperation = 'lighter';
    const fg = c.createRadialGradient(CX, anvilY, 0, CX, anvilY, S * 0.7);
    fg.addColorStop(0, `rgba(255,240,220,${pressImpact})`);
    fg.addColorStop(0.25, `rgba(255,60,30,${pressImpact * 0.6})`);
    fg.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = fg; c.beginPath(); c.arc(CX, anvilY, S * 0.7, 0, TAU); c.fill();
    c.fillStyle = `rgba(255,255,255,${pressImpact * 0.9})`;
    c.fillRect(ramX - S * 0.05, anvilY - 2, ramW + S * 0.1, 4);
  }

  // ---- sparks: white-hot, bounce off the floor, die red
  c.globalCompositeOperation = 'lighter';
  const grav = S * 0.00045;
  for (let i = pressSparks.length - 1; i >= 0; i--) {
    const p = pressSparks[i];
    p.vy += grav * 16; p.x += p.vx; p.y += p.vy;
    if (p.y > H - 2 && p.vy > 0) { p.y = H - 2; p.vy *= -0.45; p.vx *= 0.7; p.life *= 0.7; }
    p.life -= 0.014;
    if (p.life <= 0) { pressSparks.splice(i, 1); continue; }
    const heat = Math.min(1, p.life * 1.6);
    c.strokeStyle = `rgba(255,${Math.round(90 + heat * 165)},${Math.round(30 + heat * 160)},${p.life})`;
    c.lineWidth = p.r;
    c.beginPath(); c.moveTo(p.x - p.vx * 1.6, p.y - p.vy * 1.6); c.lineTo(p.x, p.y); c.stroke();
  }
  if (pressSparks.length > 400) pressSparks.splice(0, pressSparks.length - 400);

  c.restore();   // end shake

  // ---- grime: scanlines + grain + pumping vignette
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(0,0,0,0.15)';
  for (let y = frame % 4; y < H; y += 4) c.fillRect(0, y, W, 1);
  for (let i = 0; i < 70; i++) {
    c.fillStyle = `rgba(255,255,255,${Math.random() * 0.06})`;
    c.fillRect(Math.random() * W, Math.random() * H, 1.5, 1.5);
  }
  const vg = c.createRadialGradient(CX, CY, S * (0.3 + pressImpact * 0.15), CX, CY, S * 0.95);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.85)');
  c.fillStyle = vg; c.fillRect(0, 0, W, H);
}

/* =====================================================================
   MODE 33 — BLACKOUT  (weaponised strobe — darkness ruled by the kick)
   The room is void-black. Every kick detonates one hard flash in a
   random pattern — full sheet, venetian bars, columns, shock rings,
   X-beams, EQ teeth, checkerboard — white on the hit, decaying into a
   blood-red afterimage burned across the dark. Between hits: a dying
   ember pulse, a drifting scan line, and treble static.
   ===================================================================== */
function modeBlackout(c) {
  const S = Math.min(W, H);
  // heavy but not total clear — flashes leave ghosts that rot away
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(0,0,0,0.42)'; c.fillRect(0, 0, W, H);

  // ---- arm a new flash on the kick
  if (A.beatHit) {
    boFlash = 1;
    boPattern = (boPattern + 1 + (Math.random() * 3 | 0)) % 7;   // never the same twice
    boSeed = (Math.random() * 1e9) | 0;
  }
  boFlash *= 0.78;
  if (boFlash < 0.02) boFlash = 0;

  // ---- idle life between hits (kept dim so the flash stays violent)
  c.globalCompositeOperation = 'lighter';
  const ember = 0.05 + A.bass * 0.12;
  const eg = c.createRadialGradient(CX, CY, 0, CX, CY, S * 0.75);
  eg.addColorStop(0, `rgba(140,8,8,${ember})`);
  eg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = eg; c.beginPath(); c.arc(CX, CY, S * 0.75, 0, TAU); c.fill();
  // drifting scan line
  const sy = ((frame * 1.2) % (H + 80)) - 40;
  c.fillStyle = `rgba(255,20,20,${0.05 + A.mid * 0.1})`;
  c.fillRect(0, sy, W, 2);
  // treble static
  const nst = Math.round(A.treble * 60);
  for (let i = 0; i < nst; i++) {
    c.fillStyle = `rgba(255,${Math.random() < 0.3 ? 255 : 40},40,${Math.random() * 0.35})`;
    c.fillRect(Math.random() * W, Math.random() * H, 2, 2);
  }

  // ---- THE FLASH
  if (boFlash > 0) {
    const t = boFlash;
    // white right on the hit, bleeding to pure red as it dies
    const gb = Math.round(255 * Math.max(0, (t - 0.45) / 0.55));
    const col = (a) => `rgba(255,${gb},${gb},${Math.min(1, a)})`;
    const rnd = mulberry32(boSeed);                 // frozen randoms → stable afterimage
    c.globalCompositeOperation = 'lighter';
    c.fillStyle = col(t);

    switch (boPattern) {
      case 0:                                        // full sheet
        c.fillRect(0, 0, W, H);
        break;
      case 1: {                                      // venetian bars
        const bh = H / (5 + (rnd() * 6 | 0));
        for (let y = (rnd() < 0.5 ? 0 : bh); y < H; y += bh * 2) c.fillRect(0, y, W, bh);
        break;
      }
      case 2: {                                      // columns
        const bw = W / (4 + (rnd() * 8 | 0));
        for (let x = (rnd() < 0.5 ? 0 : bw); x < W; x += bw * 2) c.fillRect(x, 0, bw, H);
        break;
      }
      case 3: {                                      // shock rings, expanding as they fade
        const ox = CX + (rnd() - 0.5) * W * 0.3, oy = CY + (rnd() - 0.5) * H * 0.3;
        c.strokeStyle = col(t);
        for (let k = 0; k < 5; k++) {
          const r = (k + 1 + (1 - t) * 1.5) * S * 0.11;
          c.lineWidth = S * 0.03 * t + 2;
          c.beginPath(); c.arc(ox, oy, r, 0, TAU); c.stroke();
        }
        break;
      }
      case 4: {                                      // X-beams from the corners
        const bw = S * (0.05 + rnd() * 0.1);
        c.save(); c.translate(CX, CY); c.rotate((rnd() - 0.5) * 0.5);
        const D = Math.hypot(W, H);
        for (const a of [Math.atan2(H, W), Math.atan2(H, -W)]) {
          c.save(); c.rotate(a);
          c.fillRect(-D, -bw / 2, D * 2, bw);
          c.restore();
        }
        c.restore();
        break;
      }
      case 5: {                                      // EQ teeth — light everywhere EXCEPT the spectrum
        c.save();
        c.beginPath(); c.rect(0, 0, W, H);
        const cols = 28, bw = W / cols;
        for (let i = 0; i < cols; i++) {
          const f = freq[Math.floor(Math.pow(i / cols, 1.3) * freq.length * 0.7)] / 255;
          c.rect(i * bw + bw * 0.08, H - f * H * 0.95, bw * 0.84, f * H * 0.95);
        }
        c.clip('evenodd');
        c.fillRect(0, 0, W, H);
        c.restore();
        break;
      }
      default: {                                     // checkerboard
        const cs = S / (4 + (rnd() * 5 | 0));
        const off = rnd() < 0.5 ? 0 : 1;
        for (let gy = 0; gy * cs < H; gy++)
          for (let gx = 0; gx * cs < W; gx++)
            if ((gx + gy + off) % 2 === 0) c.fillRect(gx * cs, gy * cs, cs + 1, cs + 1);
      }
    }

    // chromatic tear right on the hit
    if (t > 0.6 && Math.random() < 0.8) {
      c.globalCompositeOperation = 'source-over';
      const n = 3 + (Math.random() * 6 | 0);
      for (let s = 0; s < n; s++) {
        const y = Math.random() * H, hh = 4 + Math.random() * H * 0.06;
        c.drawImage(c.canvas, 0, y, W, hh, (Math.random() - 0.5) * W * 0.2 * t, y, W, hh);
      }
    }
  }

  // rolling scanlines keep it looking like surveillance footage
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(0,0,0,0.16)';
  for (let y = frame % 3; y < H; y += 3) c.fillRect(0, y, W, 1);
}

/* =====================================================================
   MODE 34 — TESLA  (high-voltage arc gap between two black pylons)
   Two dead-black electrode towers. The mids and highs charge the gap;
   the kick discharges it — a fat white-core bolt with a blood-red
   corona rips across, spitting embers that rain down and die on the
   floor. Small nervous arcs crawl the insulators between strikes.
   ===================================================================== */
function makeBolt(x1, y1, x2, y2, jag, segs) {
  const pts = [{ x: x1, y: y1 }];
  for (let i = 1; i < segs; i++) {
    const t = i / segs;
    pts.push({
      x: x1 + (x2 - x1) * t + (Math.random() - 0.5) * jag * Math.sin(t * Math.PI),
      y: y1 + (y2 - y1) * t + (Math.random() - 0.5) * jag * Math.sin(t * Math.PI),
    });
  }
  pts.push({ x: x2, y: y2 });
  return pts;
}
function strokeBolt(c, pts, w, core) {
  // three passes: red corona → hot mid → white core
  const passes = core
    ? [[w * 4, `rgba(255,20,20,0.16)`], [w * 1.8, `rgba(255,90,80,0.5)`], [w * 0.7, `rgba(255,255,255,0.95)`]]
    : [[w * 2.5, `rgba(255,30,30,0.2)`], [w, `rgba(255,120,110,0.6)`]];
  for (const [lw, st] of passes) {
    c.lineWidth = lw; c.strokeStyle = st;
    c.beginPath(); c.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) c.lineTo(pts[i].x, pts[i].y);
    c.stroke();
  }
}
function modeTesla(c) {
  const S = Math.min(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(2,0,2,0.5)'; c.fillRect(0, 0, W, H);

  // pylon geometry
  const tipY = H * 0.3, baseY = H;
  const LX = W * 0.14, RX = W * 0.86;

  // ---- discharge on the kick; extra crackle when the highs saturate
  const charge = A.mid * 0.6 + A.treble * 0.5;
  if (A.beatHit) teslaArcs.push({
    life: 1, main: true,
    jag: S * (0.08 + A.bass * 0.14),
  });
  if (Math.random() < charge * 0.25) teslaArcs.push({ life: 0.5, main: false, jag: S * 0.12 });

  // ---- ambient scene light pumps with whatever is arcing
  let glow = 0;
  for (const a of teslaArcs) glow = Math.max(glow, a.life * (a.main ? 1 : 0.4));
  c.globalCompositeOperation = 'lighter';
  const lg = c.createRadialGradient(CX, tipY, 0, CX, tipY, S * 0.9);
  lg.addColorStop(0, `rgba(255,60,50,${0.05 + glow * 0.25})`);
  lg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = lg; c.beginPath(); c.arc(CX, tipY, S * 0.9, 0, TAU); c.fill();
  // ground fog lit red
  const fg = c.createLinearGradient(0, H * 0.8, 0, H);
  fg.addColorStop(0, 'rgba(0,0,0,0)');
  fg.addColorStop(1, `rgba(150,10,10,${0.1 + glow * 0.25 + A.bass * 0.12})`);
  c.fillStyle = fg; c.fillRect(0, H * 0.8, W, H * 0.2);

  // ---- the arcs (regenerated every frame while alive → they crackle)
  c.lineCap = 'round'; c.lineJoin = 'round';
  for (let i = teslaArcs.length - 1; i >= 0; i--) {
    const a = teslaArcs[i];
    a.life -= a.main ? 0.09 : 0.14;
    if (a.life <= 0) { teslaArcs.splice(i, 1); continue; }
    const pts = makeBolt(LX, tipY, RX, tipY, a.jag * (0.6 + a.life), 26);
    strokeBolt(c, pts, (a.main ? 3.2 : 1.6) * (S / 700) * (0.5 + a.life), a.main);
    // branches forking off the spine
    const nb = a.main ? 3 : 1;
    for (let b = 0; b < nb; b++) {
      const p = pts[4 + (Math.random() * (pts.length - 8) | 0)];
      const bx = p.x + (Math.random() - 0.5) * S * 0.3;
      const by = p.y + (Math.random() * 0.7 + 0.1) * S * 0.3;
      strokeBolt(c, makeBolt(p.x, p.y, bx, by, S * 0.05, 8), 1.2 * (S / 700), false);
    }
    // embers spat from the bolt
    if (a.main && Math.random() < 0.85) {
      const p = pts[2 + (Math.random() * (pts.length - 4) | 0)];
      teslaSparks.push({
        x: p.x, y: p.y,
        vx: (Math.random() - 0.5) * 3, vy: Math.random() * 1.5,
        life: 0.6 + Math.random() * 0.4,
      });
    }
  }

  // ---- falling embers
  for (let i = teslaSparks.length - 1; i >= 0; i--) {
    const p = teslaSparks[i];
    p.vy += 0.12; p.x += p.vx; p.y += p.vy; p.life -= 0.012;
    if (p.life <= 0 || p.y > H) { teslaSparks.splice(i, 1); continue; }
    const heat = Math.min(1, p.life * 1.8);
    c.fillStyle = `rgba(255,${Math.round(60 + heat * 180)},${Math.round(40 + heat * 120)},${p.life})`;
    c.fillRect(p.x, p.y, 2, 2 + p.vy);
  }
  if (teslaSparks.length > 240) teslaSparks.splice(0, teslaSparks.length - 240);

  // ---- nervous little arcs crawling the insulator stacks between strikes
  for (const x of [LX, RX]) if (Math.random() < 0.2 + charge * 0.3) {
    const y = tipY + Math.random() * S * 0.12;
    strokeBolt(c, makeBolt(x - S * 0.025, y, x + S * 0.025, y + S * 0.03, S * 0.02, 6), 0.9 * (S / 700), false);
  }

  // ---- pylons: dead-black towers with cross bracing + insulator stacks
  c.globalCompositeOperation = 'source-over';
  for (const [x, dir] of [[LX, 1], [RX, -1]]) {
    const wTop = S * 0.02, wBase = S * 0.085;
    c.fillStyle = '#000';
    c.beginPath();
    c.moveTo(x - wTop, tipY + S * 0.03);
    c.lineTo(x + wTop, tipY + S * 0.03);
    c.lineTo(x + wBase, baseY); c.lineTo(x - wBase, baseY);
    c.closePath(); c.fill();
    // cross bracing
    c.strokeStyle = '#000'; c.lineWidth = S * 0.011;
    for (let k = 0; k < 5; k++) {
      const t0 = k / 5, t1 = (k + 1) / 5;
      const y0 = tipY + S * 0.03 + (baseY - tipY - S * 0.03) * t0;
      const y1 = tipY + S * 0.03 + (baseY - tipY - S * 0.03) * t1;
      const w0 = wTop + (wBase - wTop) * t0, w1 = wTop + (wBase - wTop) * t1;
      c.beginPath(); c.moveTo(x - w0 - S * 0.02, y0); c.lineTo(x + w1 + S * 0.02, y1); c.stroke();
      c.beginPath(); c.moveTo(x + w0 + S * 0.02, y0); c.lineTo(x - w1 - S * 0.02, y1); c.stroke();
    }
    // insulator stack up to the electrode tip
    c.fillStyle = '#020202';
    for (let k = 0; k < 4; k++) {
      c.beginPath();
      c.ellipse(x, tipY + S * 0.028 - k * S * 0.014, S * (0.022 - k * 0.003), S * 0.006, 0, 0, TAU);
      c.fill();
    }
    // electrode ball — rim-lit by whatever is arcing
    c.beginPath(); c.arc(x, tipY, S * 0.012, 0, TAU); c.fill();
    c.globalCompositeOperation = 'lighter';
    c.fillStyle = `rgba(255,80,60,${0.2 + glow * 0.8})`;
    c.beginPath(); c.arc(x, tipY, S * 0.012, 0, TAU); c.fill();
    // blinking aircraft-warning lamp halfway up
    const blink = 0.3 + Math.sin(frame * 0.08 + dir) * 0.3 + A.beat * 0.4;
    c.fillStyle = `rgba(255,20,20,${Math.max(0, blink)})`;
    c.beginPath(); c.arc(x, tipY + (baseY - tipY) * 0.4, S * 0.006, 0, TAU); c.fill();
    c.globalCompositeOperation = 'source-over';
  }

  // ---- grime
  c.fillStyle = 'rgba(0,0,0,0.15)';
  for (let y = frame % 4; y < H; y += 4) c.fillRect(0, y, W, 1);
  const vg = c.createRadialGradient(CX, CY, S * 0.35, CX, CY, S);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.8)');
  c.fillStyle = vg; c.fillRect(0, 0, W, H);
}

/* =====================================================================
   MODE 35 — SHAFT  (freefall down a bottomless industrial shaft)
   One-point-perspective drop: square girder frames rush past, the bass
   is the throttle. Every few frames a ring carries red warning lamps;
   some rings are strobe rings that detonate white as the kick lands.
   Radial speed-streaks and a wandering vanishing point sell the fall.
   ===================================================================== */
function shaftHash(n) { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
function modeShaft(c) {
  const S = Math.min(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = '#010102'; c.fillRect(0, 0, W, H);

  // ---- throttle: the low end is the fall speed
  const speed = 0.14 + A.bass * 0.5 + A.beat * 0.35;
  shaftZ += speed;
  if (A.beatHit) shaftShake = 1;
  shaftShake *= 0.85;

  // wandering vanishing point + kick jolt
  const vx = CX + Math.sin(frame * 0.006) * W * 0.05 + (Math.random() - 0.5) * shaftShake * S * 0.02;
  const vy = CY + Math.cos(frame * 0.0043) * H * 0.05 + (Math.random() - 0.5) * shaftShake * S * 0.02;
  const roll = Math.sin(frame * 0.004) * 0.09 + A.mid * 0.03;

  c.save();
  c.translate(vx, vy); c.rotate(roll);

  const GAP = 1, N = 26, FL = 1.6;
  const base = Math.floor(shaftZ / GAP);
  const frac = shaftZ % GAP;

  // ---- corner rails converging on the vanishing point
  c.strokeStyle = 'rgba(70,70,80,0.5)'; c.lineWidth = Math.max(1, S * 0.004);
  const far = FL / (N * GAP), near = 2.2;
  for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    c.beginPath();
    c.moveTo(sx * S * 0.62 * far, sy * S * 0.62 * far);
    c.lineTo(sx * S * 0.62 * near, sy * S * 0.62 * near);
    c.stroke();
  }

  // ---- girder rings, far → near
  for (let k = N; k >= 0; k--) {
    const z = k * GAP - frac + 0.12;
    if (z <= 0.02) continue;
    const p = FL / z;                       // perspective scale
    const hs = S * 0.62 * p;                // ring half-size
    if (hs > S * 2.2) continue;             // already past the camera
    const fog = Math.min(1, Math.max(0, 1.15 - z / (N * GAP * 0.8)));
    const idx = base + k;                   // stable world identity
    const h1 = shaftHash(idx);

    if (h1 < 0.55) {
      // plain steel girder frame
      c.strokeStyle = `rgba(${100 + fog * 40},${102 + fog * 40},${115 + fog * 40},${fog * 0.75})`;
      c.lineWidth = Math.max(1, hs * 0.045);
      c.strokeRect(-hs, -hs, hs * 2, hs * 2);
      // rivet ticks on the near rings
      if (p > 0.5) {
        c.fillStyle = `rgba(160,160,175,${fog * 0.5})`;
        for (let r = 0; r < 4; r++) {
          const t = -hs + (r + 0.5) * hs * 0.5;
          c.fillRect(t, -hs - hs * 0.02, hs * 0.03, hs * 0.04);
          c.fillRect(t, hs - hs * 0.02, hs * 0.03, hs * 0.04);
        }
      }
    } else if (h1 < 0.85) {
      // warning ring — red lamps in the corners, glow pooling on the steel
      c.strokeStyle = `rgba(60,58,66,${fog * 0.8})`;
      c.lineWidth = Math.max(1, hs * 0.05);
      c.strokeRect(-hs, -hs, hs * 2, hs * 2);
      c.globalCompositeOperation = 'lighter';
      const lampA = (0.4 + Math.sin(frame * 0.1 + idx * 2.1) * 0.25 + A.bass * 0.3) * fog;
      for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
        const g = c.createRadialGradient(sx * hs, sy * hs, 0, sx * hs, sy * hs, hs * 0.5);
        g.addColorStop(0, `rgba(255,25,20,${lampA})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        c.fillStyle = g;
        c.beginPath(); c.arc(sx * hs, sy * hs, hs * 0.5, 0, TAU); c.fill();
        c.fillStyle = `rgba(255,90,70,${Math.min(1, lampA * 2)})`;
        c.beginPath(); c.arc(sx * hs, sy * hs, Math.max(1, hs * 0.035), 0, TAU); c.fill();
      }
      c.globalCompositeOperation = 'source-over';
    } else {
      // strobe ring — detonates white when the kick lands
      const st = Math.max(A.beat * 1.4 - 0.4, 0.06) * fog;
      c.globalCompositeOperation = 'lighter';
      c.strokeStyle = `rgba(255,255,255,${Math.min(1, st)})`;
      c.lineWidth = Math.max(1, hs * (0.05 + A.beat * 0.06));
      c.strokeRect(-hs, -hs, hs * 2, hs * 2);
      if (st > 0.4) {                       // hot bloom around the frame
        c.strokeStyle = `rgba(255,40,40,${st * 0.5})`;
        c.lineWidth = hs * 0.16;
        c.strokeRect(-hs, -hs, hs * 2, hs * 2);
      }
      c.globalCompositeOperation = 'source-over';
    }
  }

  // ---- radial speed streaks — dust ripping past the camera
  c.globalCompositeOperation = 'lighter';
  const ns = Math.round(14 + speed * 60);
  for (let i = 0; i < ns; i++) {
    const a = shaftHash(i * 7.3) * TAU;
    const d = ((shaftHash(i * 3.1) * 900 + frame * (3 + speed * 26)) % 900) / 900;   // 0 far → 1 near
    const r0 = S * (0.05 + d * d * 1.3), r1 = r0 + S * 0.02 + speed * S * 0.12 * d;
    const al = d * 0.4 * (0.4 + speed);
    c.strokeStyle = shaftHash(i * 11.7) < 0.2 ? `rgba(255,50,40,${al})` : `rgba(200,205,220,${al * 0.7})`;
    c.lineWidth = 1 + d * 1.5;
    c.beginPath();
    c.moveTo(Math.cos(a) * r0, Math.sin(a) * r0);
    c.lineTo(Math.cos(a) * r1, Math.sin(a) * r1);
    c.stroke();
  }

  // ---- the bottom of the shaft: a red glow that pumps with the bass
  const bg2 = c.createRadialGradient(0, 0, 0, 0, 0, S * 0.2);
  bg2.addColorStop(0, `rgba(255,30,20,${0.25 + A.bass * 0.5})`);
  bg2.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = bg2; c.beginPath(); c.arc(0, 0, S * 0.2, 0, TAU); c.fill();

  // kick strobe out of the depths
  if (A.beat > 0.55) {
    const kg = c.createRadialGradient(0, 0, 0, 0, 0, S * 1.1);
    kg.addColorStop(0, `rgba(255,255,255,${(A.beat - 0.55) * 1.4})`);
    kg.addColorStop(0.4, `rgba(255,30,30,${(A.beat - 0.55) * 0.7})`);
    kg.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = kg; c.beginPath(); c.arc(0, 0, S * 1.1, 0, TAU); c.fill();
  }

  c.restore();

  // ---- grime: scanlines + vignette
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(0,0,0,0.14)';
  for (let y = frame % 4; y < H; y += 4) c.fillRect(0, y, W, 1);
  const vg = c.createRadialGradient(CX, CY, S * 0.4, CX, CY, S);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.75)');
  c.fillStyle = vg; c.fillRect(0, 0, W, H);
}

/* =====================================================================
   MODE 36 — MONOLITH  (black slab in red haze — it cracks on the kick)
   A dead-black slab towers over a reflective floor. Bass makes it hum;
   every hard kick tears a new glowing fissure across its face, spits
   spall chips, and flares every existing crack white before they cool
   back to ember red. Dust drifts through the haze. Pure menace —
   built for breakdowns and the drop that follows.
   ===================================================================== */
function modeMonolith(c) {
  const S = Math.min(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = '#020102'; c.fillRect(0, 0, W, H);

  // slab geometry (slight taper for menace)
  const baseY = H * 0.84, topY = baseY - S * 0.62;
  const wB = S * 0.12, wT = wB * 0.92;
  const rumble = A.bass * S * 0.003;
  const ox = (Math.random() - 0.5) * rumble, oy = (Math.random() - 0.5) * rumble;

  // ---- red haze horizon behind the slab
  const hz = c.createRadialGradient(CX, baseY, 0, CX, baseY, S * 0.85);
  hz.addColorStop(0, `rgba(130,10,10,${0.22 + A.bass * 0.3 + A.beat * 0.25})`);
  hz.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = hz; c.beginPath(); c.arc(CX, baseY, S * 0.85, 0, TAU); c.fill();

  // ---- drifting dust, lit by the haze
  if (monoDust.length < 60 && Math.random() < 0.5) monoDust.push({
    x: Math.random() * W, y: H * (0.2 + Math.random() * 0.7),
    vx: (Math.random() - 0.5) * 0.4, vy: -(0.08 + Math.random() * 0.25),
    r: 0.6 + Math.random() * 1.6, ph: Math.random() * TAU, life: 1,
  });
  c.globalCompositeOperation = 'lighter';
  for (let i = monoDust.length - 1; i >= 0; i--) {
    const p = monoDust[i];
    p.x += p.vx + Math.sin(frame * 0.008 + p.ph) * 0.25; p.y += p.vy; p.life -= 0.003;
    if (p.life <= 0 || p.y < 0) { monoDust.splice(i, 1); continue; }
    const lit = Math.max(0, 1 - Math.abs(p.y - baseY) / (S * 0.8));
    c.fillStyle = `rgba(255,90,80,${p.life * lit * 0.28})`;
    c.fillRect(p.x, p.y, p.r, p.r);
  }

  // ---- new fissure + flare on the hard kick
  if (A.beatHit && A.bass > 0.35) {
    const pts = [];
    let px = CX + (Math.random() - 0.5) * wT * 1.5;
    let py = topY + Math.random() * S * 0.14;
    pts.push({ x: px, y: py });
    const n = 6 + (Math.random() * 8 | 0);
    for (let k = 0; k < n; k++) {
      px += (Math.random() - 0.5) * wB * 0.9;
      px = Math.max(CX - wB * 0.92, Math.min(CX + wB * 0.92, px));
      py += (S * 0.62 / n) * (0.5 + Math.random());
      if (py > baseY - 4) break;
      pts.push({ x: px, y: py });
    }
    monoCracks.push({ pts, heat: 1 });
    for (const cr of monoCracks) cr.heat = Math.max(cr.heat, 0.85);   // every scar flares
    if (monoCracks.length > 9) monoCracks.shift();
    // spall chips blown off the face
    const src = pts[(Math.random() * pts.length) | 0];
    for (let k = 0; k < 14; k++) monoSpall.push({
      x: src.x, y: src.y,
      vx: (Math.random() - 0.5) * 6, vy: -Math.random() * 4,
      r: 1 + Math.random() * 2.5, life: 1,
    });
  }

  // ---- the slab: black over everything, thin red rim on the haze side
  const slab = (alpha) => {
    c.globalAlpha = alpha;
    c.fillStyle = '#000';
    c.beginPath();
    c.moveTo(CX - wT + ox, topY + oy); c.lineTo(CX + wT + ox, topY + oy);
    c.lineTo(CX + wB + ox, baseY + oy); c.lineTo(CX - wB + ox, baseY + oy);
    c.closePath(); c.fill();
    c.strokeStyle = `rgba(255,30,25,${(0.16 + A.bass * 0.3) * alpha})`;
    c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(CX - wT + ox, topY + oy); c.lineTo(CX - wB + ox, baseY + oy); c.stroke();
    c.globalAlpha = 1;
  };
  c.globalCompositeOperation = 'source-over';
  slab(1);

  // ---- fissures: ember red at rest, white when fresh
  c.lineCap = 'round';
  for (const cr of monoCracks) {
    cr.heat = Math.max(0.12, cr.heat * 0.965);          // cools but never fully dies
    const h2 = cr.heat;
    const passes = [
      [S * 0.012 * h2 + 2, `rgba(255,20,15,${h2 * 0.3})`],
      [Math.max(1, S * 0.004 * h2), h2 > 0.7
        ? `rgba(255,${Math.round(120 + h2 * 135)},${Math.round(90 + h2 * 165)},${h2})`
        : `rgba(255,${Math.round(40 + h2 * 90)},20,${0.3 + h2 * 0.7})`],
    ];
    c.globalCompositeOperation = 'lighter';
    for (const [lw, st] of passes) {
      c.strokeStyle = st; c.lineWidth = lw;
      c.beginPath(); c.moveTo(cr.pts[0].x + ox, cr.pts[0].y + oy);
      for (let i = 1; i < cr.pts.length; i++) c.lineTo(cr.pts[i].x + ox, cr.pts[i].y + oy);
      c.stroke();
    }
  }

  // ---- spall chips
  for (let i = monoSpall.length - 1; i >= 0; i--) {
    const p = monoSpall[i];
    p.vy += 0.18; p.x += p.vx; p.y += p.vy; p.life -= 0.02;
    if (p.life <= 0 || p.y > baseY) { monoSpall.splice(i, 1); continue; }
    c.fillStyle = `rgba(255,${Math.round(60 + p.life * 140)},50,${p.life})`;
    c.fillRect(p.x, p.y, p.r, p.r);
  }

  // ---- reflective floor: flipped ghost of the slab + fissure glow
  c.save();
  c.globalCompositeOperation = 'lighter';
  c.translate(0, baseY * 2); c.scale(1, -1);
  c.globalAlpha = 0.14;
  for (const cr of monoCracks) {
    c.strokeStyle = `rgba(255,50,30,${cr.heat * 0.8})`;
    c.lineWidth = Math.max(1, S * 0.004);
    c.beginPath(); c.moveTo(cr.pts[0].x, cr.pts[0].y);
    for (let i = 1; i < cr.pts.length; i++) c.lineTo(cr.pts[i].x, cr.pts[i].y);
    c.stroke();
  }
  c.globalAlpha = 1;
  c.restore();
  // floor sheen fading down
  const fs = c.createLinearGradient(0, baseY, 0, H);
  fs.addColorStop(0, `rgba(90,6,6,${0.18 + A.bass * 0.2})`);
  fs.addColorStop(1, 'rgba(0,0,0,0)');
  c.globalCompositeOperation = 'lighter';
  c.fillStyle = fs; c.fillRect(0, baseY, W, H - baseY);

  // ---- kick flash bleeding out of the scars
  if (A.beat > 0.6) {
    const kg = c.createRadialGradient(CX, CY, 0, CX, CY, S * 0.9);
    kg.addColorStop(0, `rgba(255,60,45,${(A.beat - 0.6) * 0.8})`);
    kg.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = kg; c.beginPath(); c.arc(CX, CY, S * 0.9, 0, TAU); c.fill();
  }

  // ---- grime
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(0,0,0,0.15)';
  for (let y = frame % 4; y < H; y += 4) c.fillRect(0, y, W, 1);
  const vg = c.createRadialGradient(CX, CY, S * 0.32, CX, CY, S * 0.95);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.82)');
  c.fillStyle = vg; c.fillRect(0, 0, W, H);
}

/* =====================================================================
   MODE 37 — GRINDER  (two interlocked gears chewing sparks)
   Two monstrous black gears mesh at screen centre in front of a
   pumping red backlight. The bass is the motor; the kick makes the
   drive catch and jolt. The mesh point grinds a constant stream of
   sparks — a full shower on the hit — and metal shavings rain out.
   ===================================================================== */
function drawGear(c, x, y, R, teeth, rot, rimGlow) {
  c.save(); c.translate(x, y); c.rotate(rot);
  c.fillStyle = '#020203';
  c.beginPath();
  const inner = R * 0.86, outer = R * 1.06, half = Math.PI / teeth * 0.42;
  for (let i = 0; i < teeth; i++) {
    const a = i / teeth * TAU;
    c.lineTo(Math.cos(a - half * 1.9) * inner, Math.sin(a - half * 1.9) * inner);
    c.lineTo(Math.cos(a - half) * outer, Math.sin(a - half) * outer);
    c.lineTo(Math.cos(a + half) * outer, Math.sin(a + half) * outer);
    c.lineTo(Math.cos(a + half * 1.9) * inner, Math.sin(a + half * 1.9) * inner);
  }
  c.closePath(); c.fill();
  // hub + bolt ring
  c.beginPath(); c.arc(0, 0, R * 0.22, 0, TAU); c.fill();
  c.fillStyle = '#0a0a0c';
  for (let i = 0; i < 6; i++) {
    const a = i / 6 * TAU;
    c.beginPath(); c.arc(Math.cos(a) * R * 0.5, Math.sin(a) * R * 0.5, R * 0.05, 0, TAU); c.fill();
  }
  // red rim light off the backlight
  c.globalCompositeOperation = 'lighter';
  c.strokeStyle = `rgba(255,25,20,${rimGlow})`;
  c.lineWidth = Math.max(1.5, R * 0.02);
  c.beginPath(); c.arc(0, 0, inner * 0.995, 0, TAU); c.stroke();
  c.globalCompositeOperation = 'source-over';
  c.restore();
}
function modeGrinder(c) {
  const S = Math.min(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(2,1,1,0.6)'; c.fillRect(0, 0, W, H);

  // ---- motor: bass drives, kick catches the drive and jolts it
  if (A.beatHit) grindJolt = 1;
  grindJolt *= 0.82;
  const rpm = 0.006 + A.bass * 0.05 + grindJolt * 0.12;
  grindRot += Math.random() < 0.03 ? -rpm * 1.8 : rpm;   // the odd tooth slips backwards

  const R = S * 0.34, teeth = 12;
  const meshX = CX, meshY = CY;
  const shk = grindJolt * S * 0.012;
  c.save();
  c.translate((Math.random() - 0.5) * shk * 2, (Math.random() - 0.5) * shk * 2);

  // ---- pumping backlight behind the mesh
  c.globalCompositeOperation = 'lighter';
  const bl = c.createRadialGradient(meshX, meshY, 0, meshX, meshY, S * 0.75);
  bl.addColorStop(0, `rgba(200,15,12,${0.3 + A.bass * 0.4 + grindJolt * 0.35})`);
  bl.addColorStop(0.55, `rgba(120,8,8,${0.12 + A.bass * 0.15})`);
  bl.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = bl; c.beginPath(); c.arc(meshX, meshY, S * 0.75, 0, TAU); c.fill();
  c.globalCompositeOperation = 'source-over';

  // ---- the gears (phases offset half a tooth so they interleave)
  const rim = 0.15 + A.bass * 0.35 + grindJolt * 0.4;
  drawGear(c, meshX - R * 1.04, meshY, R, teeth, grindRot, rim);
  drawGear(c, meshX + R * 1.04, meshY, R, teeth, -grindRot + Math.PI / teeth, rim);

  // ---- sparks ground out of the mesh point
  const burst = A.beatHit ? 26 + Math.round(A.bass * 40) : (Math.random() < 0.3 + A.level * 0.5 ? 2 : 0);
  for (let k = 0; k < burst; k++) {
    const up = Math.random() < 0.5 ? -1 : 1;
    grindSparks.push({
      x: meshX + (Math.random() - 0.5) * R * 0.16,
      y: meshY + (Math.random() - 0.5) * R * 0.3,
      vx: (Math.random() - 0.5) * 7 * (S / 600),
      vy: up * (2 + Math.random() * 6) * (S / 600),
      life: 0.5 + Math.random() * 0.5, r: 1 + Math.random() * 1.8,
    });
  }
  c.globalCompositeOperation = 'lighter';
  for (let i = grindSparks.length - 1; i >= 0; i--) {
    const p = grindSparks[i];
    p.vy += 0.14; p.x += p.vx; p.y += p.vy; p.life -= 0.016;
    if (p.life <= 0 || p.y > H) { grindSparks.splice(i, 1); continue; }
    const heat = Math.min(1, p.life * 1.7);
    c.strokeStyle = `rgba(255,${Math.round(90 + heat * 165)},${Math.round(30 + heat * 150)},${p.life})`;
    c.lineWidth = p.r;
    c.beginPath(); c.moveTo(p.x - p.vx * 1.5, p.y - p.vy * 1.5); c.lineTo(p.x, p.y); c.stroke();
  }
  if (grindSparks.length > 320) grindSparks.splice(0, grindSparks.length - 320);
  // white-hot grinding core right at the mesh
  const mg = c.createRadialGradient(meshX, meshY, 0, meshX, meshY, R * 0.34);
  mg.addColorStop(0, `rgba(255,230,210,${0.25 + A.level * 0.4 + grindJolt * 0.5})`);
  mg.addColorStop(0.4, `rgba(255,70,30,${0.2 + A.bass * 0.3})`);
  mg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = mg; c.beginPath(); c.arc(meshX, meshY, R * 0.34, 0, TAU); c.fill();

  // ---- metal shavings raining out of the mesh
  if (Math.random() < 0.25 + A.level * 0.4) grindShav.push({
    x: meshX + (Math.random() - 0.5) * R * 0.3, y: meshY + R * 0.2,
    vx: (Math.random() - 0.5) * 2, vy: 1 + Math.random() * 2,
    a: Math.random() * TAU, va: (Math.random() - 0.5) * 0.4, life: 1,
  });
  c.globalCompositeOperation = 'source-over';
  for (let i = grindShav.length - 1; i >= 0; i--) {
    const p = grindShav[i];
    p.vy += 0.12; p.x += p.vx; p.y += p.vy; p.a += p.va; p.life -= 0.012;
    if (p.life <= 0 || p.y > H + 6) { grindShav.splice(i, 1); continue; }
    c.save(); c.translate(p.x, p.y); c.rotate(p.a);
    c.fillStyle = `rgba(140,140,150,${p.life * 0.7})`;
    c.fillRect(-2.5, -0.8, 5, 1.6);
    c.restore();
  }

  c.restore();   // end jolt shake

  // ---- kick strobe pop
  if (A.beat > 0.75) {
    c.globalCompositeOperation = 'lighter';
    c.fillStyle = Math.random() < 0.3
      ? `rgba(255,255,255,${(A.beat - 0.75) * 0.9})`
      : `rgba(220,10,10,${(A.beat - 0.75) * 1.2})`;
    c.fillRect(0, 0, W, H);
  }

  // ---- grime
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(0,0,0,0.16)';
  for (let y = frame % 4; y < H; y += 4) c.fillRect(0, y, W, 1);
  const vg = c.createRadialGradient(CX, CY, S * 0.3, CX, CY, S * 0.95);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.85)');
  c.fillStyle = vg; c.fillRect(0, 0, W, H);
}

/* =====================================================================
   MODE 38 — SENTINEL  (machine eye scanning the dark — lock-on strobe)
   A black visor spans the top of the room; inside it a red iris sweeps
   like a cylon. Every kick makes it LOCK: the iris flares white and a
   hard cone of light snaps onto a random spot on the floor. Treble
   feeds nervous data-glitch ticks along the visor edge.
   ===================================================================== */
function modeSentinel(c) {
  const S = Math.min(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(1,1,2,0.5)'; c.fillRect(0, 0, W, H);

  const visW = W * 0.72, visH = S * 0.075, visY = H * 0.22;
  const visX = CX - visW / 2;

  // ---- sweep / lock state
  if (A.beatHit) {
    sentLock = 10 + Math.round(A.bass * 10);
    sentTarget = 0.12 + Math.random() * 0.76;   // where the cone slams down
    sentFlare = 1;
  }
  if (sentLock > 0) sentLock--;
  else {
    sentX += sentDir * (0.012 + A.mid * 0.035);
    if (sentX > 1) { sentX = 1; sentDir = -1; }
    if (sentX < 0) { sentX = 0; sentDir = 1; }
  }
  sentFlare *= 0.86;
  const irisX = visX + visW * (0.06 + sentX * 0.88);
  const irisY = visY + visH / 2;

  // ---- lock-on cone + floor pool (behind the visor)
  if (sentLock > 0 || sentFlare > 0.1) {
    const tx = W * sentTarget, ty = H * 0.9;
    const spread = W * 0.05 + sentFlare * W * 0.03;
    const coneA = 0.25 + sentFlare * 0.55;
    c.globalCompositeOperation = 'lighter';
    const cg = c.createLinearGradient(irisX, irisY, tx, ty);
    cg.addColorStop(0, `rgba(255,${sentFlare > 0.5 ? 220 : 40},40,${coneA})`);
    cg.addColorStop(1, `rgba(255,10,10,${coneA * 0.25})`);
    c.fillStyle = cg;
    c.beginPath();
    c.moveTo(irisX, irisY);
    c.lineTo(tx - spread, ty); c.lineTo(tx + spread, ty);
    c.closePath(); c.fill();
    // hot pool on the floor
    const pg = c.createRadialGradient(tx, ty, 0, tx, ty, spread * 2.4);
    pg.addColorStop(0, `rgba(255,60,45,${coneA * 0.8})`);
    pg.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = pg;
    c.beginPath(); c.ellipse(tx, ty, spread * 2.4, spread * 0.8, 0, 0, TAU); c.fill();
  }

  // ---- idle sweep glow raking the floor as the iris patrols
  if (sentLock <= 0) {
    const fx = W * (0.1 + sentX * 0.8);
    c.globalCompositeOperation = 'lighter';
    const ig = c.createRadialGradient(fx, H * 0.92, 0, fx, H * 0.92, S * 0.3);
    ig.addColorStop(0, `rgba(180,15,15,${0.10 + A.mid * 0.12})`);
    ig.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = ig;
    c.beginPath(); c.ellipse(fx, H * 0.92, S * 0.3, S * 0.1, 0, 0, TAU); c.fill();
  }

  // ---- chassis: cables hanging off the visor housing
  c.globalCompositeOperation = 'source-over';
  c.strokeStyle = '#000'; c.lineCap = 'round';
  for (let i = 0; i < 5; i++) {
    const cx0 = visX + visW * (0.1 + i * 0.2);
    const sway = Math.sin(frame * 0.015 + i * 1.7) * (4 + A.bass * 10);
    c.lineWidth = S * 0.008 * (1 + (i % 2) * 0.5);
    c.beginPath();
    c.moveTo(cx0, 0);
    c.quadraticCurveTo(cx0 + sway, visY * 0.55, cx0 + sway * 0.4, visY);
    c.stroke();
  }

  // ---- the visor slab
  roundRect(c, visX, visY, visW, visH, visH * 0.5);
  c.fillStyle = '#050506'; c.fill();
  c.strokeStyle = `rgba(255,25,20,${0.18 + A.bass * 0.25 + sentFlare * 0.5})`;
  c.lineWidth = 1.5; c.stroke();

  // ---- iris: red on patrol, white when locked — with a motion-trail smear
  c.save();
  roundRect(c, visX + 2, visY + 2, visW - 4, visH - 4, visH * 0.5);
  c.clip();
  c.globalCompositeOperation = 'lighter';
  const trailDir = sentLock > 0 ? 0 : -sentDir;
  const tg = c.createLinearGradient(irisX + trailDir * visW * 0.22, irisY, irisX, irisY);
  tg.addColorStop(0, 'rgba(255,0,0,0)');
  tg.addColorStop(1, `rgba(255,20,15,${0.5 + A.mid * 0.3})`);
  c.fillStyle = tg;
  c.fillRect(Math.min(irisX, irisX + trailDir * visW * 0.22), visY, Math.abs(trailDir) * visW * 0.22 || 1, visH);
  const hot = sentFlare > 0.4;
  const eg = c.createRadialGradient(irisX, irisY, 0, irisX, irisY, visH * 1.4);
  eg.addColorStop(0, hot ? `rgba(255,255,255,${0.9})` : `rgba(255,60,45,${0.85})`);
  eg.addColorStop(0.35, `rgba(255,15,10,${0.5 + sentFlare * 0.4})`);
  eg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = eg;
  c.beginPath(); c.arc(irisX, irisY, visH * 1.4, 0, TAU); c.fill();
  c.restore();

  // ---- treble data-glitch ticks along the visor
  const nt = Math.round(A.treble * 26);
  c.globalCompositeOperation = 'lighter';
  for (let i = 0; i < nt; i++) {
    const x = visX + Math.random() * visW;
    c.fillStyle = `rgba(255,${Math.random() < 0.25 ? 230 : 30},30,${0.2 + Math.random() * 0.5})`;
    c.fillRect(x, visY - 4 - Math.random() * 8, 1.5 + Math.random() * 2, 2);
  }

  // ---- lock flash: one hard full-frame pop the instant it locks
  if (sentFlare > 0.7) {
    c.fillStyle = `rgba(255,255,255,${(sentFlare - 0.7) * 1.6})`;
    c.fillRect(0, 0, W, H);
  }

  // ---- grime
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(0,0,0,0.16)';
  for (let y = frame % 3; y < H; y += 3) c.fillRect(0, y, W, 1);
  const vg = c.createRadialGradient(CX, CY, S * 0.34, CX, CY, S);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.8)');
  c.fillStyle = vg; c.fillRect(0, 0, W, H);
}

/* =====================================================================
   MODE 39 — RAZOR  (laser cuts — the kick slices the frame itself)
   Darkness. Every kick draws a white-hot laser cut clean across the
   screen at a new angle and SHEARS the two halves of the picture apart
   along it for a few frames. Old cuts stay as cooling red seams that
   drip molten beads. The frame itself is the victim.
   ===================================================================== */
function modeRazor(c) {
  const S = Math.min(W, H);
  const D = Math.hypot(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(1,0,1,0.32)'; c.fillRect(0, 0, W, H);

  // ---- new cut on the kick
  if (A.beatHit) {
    const th = Math.random() * Math.PI;
    const px = W * (0.25 + Math.random() * 0.5), py = H * (0.25 + Math.random() * 0.5);
    razorSeams.push({ th, px, py, heat: 1 });
    if (razorSeams.length > 6) razorSeams.shift();
    razorShear = { th, px, py, t: 1 };
  }

  // ---- shear the frame apart along the newest cut
  if (razorShear && razorShear.t > 0.06) {
    const { th, px, py, t } = razorShear;
    const dx = Math.cos(th), dy = Math.sin(th);        // along the cut
    const nx = -dy, ny = dx;                            // normal
    const shift = S * 0.028 * t;
    const cw = c.canvas.width, ch = c.canvas.height;
    for (const side of [1, -1]) {
      c.save();
      c.beginPath();                                    // half-plane on this side of the cut
      c.moveTo(px - dx * D, py - dy * D);
      c.lineTo(px + dx * D, py + dy * D);
      c.lineTo(px + dx * D + nx * side * D, py + dy * D + ny * side * D);
      c.lineTo(px - dx * D + nx * side * D, py - dy * D + ny * side * D);
      c.closePath(); c.clip();
      c.drawImage(c.canvas, 0, 0, cw, ch,
        dx * side * shift + nx * side * shift * 0.4,
        dy * side * shift + ny * side * shift * 0.4, W, H);
      c.restore();
    }
    razorShear.t *= 0.78;
  }

  // ---- seams: white-hot core cooling to a red scar
  c.lineCap = 'round';
  c.globalCompositeOperation = 'lighter';
  for (let i = razorSeams.length - 1; i >= 0; i--) {
    const sm = razorSeams[i];
    sm.heat *= 0.975;
    if (sm.heat < 0.05) { razorSeams.splice(i, 1); continue; }
    const { th, px, py, heat } = sm;
    const dx = Math.cos(th), dy = Math.sin(th);
    const x0 = px - dx * D, y0 = py - dy * D, x1 = px + dx * D, y1 = py + dy * D;
    // wide cooling glow
    c.strokeStyle = `rgba(255,15,10,${heat * 0.30})`;
    c.lineWidth = S * 0.02 * heat + 2;
    c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke();
    // core: white when fresh, ember red as it cools
    const g2 = Math.round(240 * Math.max(0, (heat - 0.35) / 0.65));
    c.strokeStyle = `rgba(255,${g2},${g2},${0.35 + heat * 0.65})`;
    c.lineWidth = Math.max(1, S * 0.005 * heat);
    c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke();
    // molten beads dripping off a fresh cut
    if (heat > 0.55 && Math.random() < 0.7) {
      const tt = Math.random() * 2 - 1;
      razorDrops.push({
        x: px + dx * tt * D * 0.4, y: py + dy * tt * D * 0.4,
        vx: (Math.random() - 0.5) * 1.2, vy: 0.5 + Math.random() * 1.5,
        life: 0.7 + Math.random() * 0.3,
      });
    }
  }

  // ---- molten drips
  for (let i = razorDrops.length - 1; i >= 0; i--) {
    const p = razorDrops[i];
    p.vy += 0.1; p.x += p.vx; p.y += p.vy; p.life -= 0.014;
    if (p.life <= 0 || p.y > H + 4) { razorDrops.splice(i, 1); continue; }
    const heat = Math.min(1, p.life * 1.6);
    c.fillStyle = `rgba(255,${Math.round(60 + heat * 170)},${Math.round(30 + heat * 130)},${p.life})`;
    c.beginPath(); c.arc(p.x, p.y, 1 + heat * 1.6, 0, TAU); c.fill();
  }
  if (razorDrops.length > 220) razorDrops.splice(0, razorDrops.length - 220);

  // ---- idle life: rising cauterised embers + treble sparkle
  if (Math.random() < 0.3 + A.level * 0.4) razorDrops.push({
    x: Math.random() * W, y: H + 2,
    vx: (Math.random() - 0.5) * 0.6, vy: -(0.6 + Math.random() * 1.2 + A.bass),
    life: 0.5 + Math.random() * 0.4,
  });
  const nt = Math.round(A.treble * 30);
  for (let i = 0; i < nt; i++) {
    c.fillStyle = `rgba(255,${Math.random() < 0.3 ? 220 : 40},40,${Math.random() * 0.4})`;
    c.fillRect(Math.random() * W, Math.random() * H, 1.5, 1.5);
  }

  // ---- flash right on the slice
  if (razorShear && razorShear.t > 0.5) {
    c.fillStyle = `rgba(255,255,255,${(razorShear.t - 0.5) * 0.7})`;
    c.fillRect(0, 0, W, H);
  }

  // ---- grime
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(0,0,0,0.14)';
  for (let y = frame % 4; y < H; y += 4) c.fillRect(0, y, W, 1);
  const vg = c.createRadialGradient(CX, CY, S * 0.4, CX, CY, S);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.72)');
  c.fillStyle = vg; c.fillRect(0, 0, W, H);
}

/* =====================================================================
   TUNOX BLOCK — MODES 40-49
   Built for hard techno: dark, eerie, industrial cybersigilism, red on
   black only (no hue cycling — these scenes ignore `hue` on purpose).
   Every one is kick-led: A.beatHit is the event, A.bass the motor, and
   nothing here idles prettily — it waits, then hits.
   The wordmark is painted into the scene itself, so a capture or an
   offline export carries the branding without the DOM overlay.
   ===================================================================== */

// --- shared TUNOX wordmark -------------------------------------------
// Manual per-character tracking (canvas letterSpacing isn't safe to rely
// on) so the name reads as a stamped mark, not a text label. Options:
// fill / stroke / lw / glow / blur / alpha / jitter / track / scaleY.
function tunoxWidth(c, txt, track) {
  let w = 0;
  for (const ch of txt) w += c.measureText(ch).width + track;
  return w - track;
}
function drawTunox(c, x, y, size, o = {}) {
  const txt = o.text || 'TUNOX';
  const track = o.track != null ? o.track : size * 0.22;
  const sy = o.scaleY || 1;
  c.save();
  c.font = `900 ${size}px "Arial Black", Impact, "Space Grotesk", system-ui, sans-serif`;
  c.textAlign = 'left'; c.textBaseline = 'middle';
  c.globalAlpha = o.alpha != null ? o.alpha : 1;
  const lw = o.lw != null ? o.lw : Math.max(1, size * 0.05);
  let px = x - tunoxWidth(c, txt, track) / 2;
  for (const ch of txt) {
    const cw = c.measureText(ch).width;
    const jx = o.jitter ? (Math.random() - 0.5) * o.jitter : 0;
    const jy = o.jitter ? (Math.random() - 0.5) * o.jitter : 0;
    c.save();
    c.translate(px + jx, y + jy);
    if (sy !== 1) c.scale(1, sy);
    // 1) glow cast off whichever pass is the body of the mark
    if (o.glow) {
      c.shadowColor = o.glow; c.shadowBlur = o.blur != null ? o.blur : size * 0.55;
      if (o.fill) { c.fillStyle = o.fill; c.fillText(ch, 0, 0); }
      else if (o.stroke) { c.lineWidth = lw; c.strokeStyle = o.stroke; c.strokeText(ch, 0, 0); }
      c.shadowBlur = 0;
    }
    // 2) solid passes
    if (o.fill) { c.fillStyle = o.fill; c.fillText(ch, 0, 0); }
    if (o.stroke) { c.lineJoin = 'round'; c.miterLimit = 2; c.lineWidth = lw; c.strokeStyle = o.stroke; c.strokeText(ch, 0, 0); }
    c.restore();
    px += cw + track;
  }
  c.restore();
}

// scanlines + vignette — the common filth pass this block ends on
function grime(c, S, lineA, vigInner, vigA) {
  c.globalCompositeOperation = 'source-over';
  c.globalAlpha = 1;
  c.fillStyle = `rgba(0,0,0,${lineA})`;
  for (let y = frame % 4; y < H; y += 4) c.fillRect(0, y, W, 1);
  const vg = c.createRadialGradient(CX, CY, S * vigInner, CX, CY, S * 0.98);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, `rgba(0,0,0,${vigA})`);
  c.fillStyle = vg; c.fillRect(0, 0, W, H);
}

/* =====================================================================
   MODE 40 — SIGIL  (cybersigil glyph: barbed, symmetric, self-rewriting)
   A bilaterally symmetric cyber-sigil hangs in the void — curved spines
   off a hot core, each hung with thorns and ending in a hook, bound by
   broken containment arcs. It breathes on the bass and rewrites itself
   into a whole new glyph on the hardest kicks. TUNOX sits under it like
   a maker's mark burned into the plate.
   ===================================================================== */
function buildSigil() {
  const arms = [];
  const n = 3 + (Math.random() * 3 | 0);                 // arms per side
  for (let i = 0; i < n; i++) {
    const barbs = [];
    const nb = 2 + (Math.random() * 4 | 0);
    for (let k = 0; k < nb; k++) barbs.push({
      t: 0.18 + Math.random() * 0.68,
      len: 0.10 + Math.random() * 0.26,
      side: Math.random() < 0.5 ? 1 : -1,
      curl: 0.4 + Math.random() * 1.5,
    });
    arms.push({
      a: -1.25 + ((i + 0.5) / n) * 2.5 + (Math.random() - 0.5) * 0.3,
      len: 0.5 + Math.random() * 0.5,
      bend: (Math.random() - 0.5) * 0.95,
      hook: (Math.random() < 0.5 ? 1 : -1) * (0.25 + Math.random() * 0.5),
      barbs,
    });
  }
  const rings = [];                                       // broken containment arcs
  const nr = 1 + (Math.random() * 3 | 0);
  for (let i = 0; i < nr; i++) rings.push({
    r: 0.32 + Math.random() * 0.6,
    a0: Math.random() * TAU,
    span: 0.6 + Math.random() * 2.4,
    w: 0.003 + Math.random() * 0.007,
  });
  return { arms, rings };
}
function strokeSigilArm(c, arm, R) {
  const ex = Math.cos(arm.a) * arm.len * R, ey = Math.sin(arm.a) * arm.len * R;
  const nx = -Math.sin(arm.a), ny = Math.cos(arm.a);
  const bx = ex * 0.5 + nx * arm.bend * R * 0.38, by = ey * 0.5 + ny * arm.bend * R * 0.38;
  // point + tangent on the quadratic spine (P0 is the core, at 0,0)
  const at = (t) => [2 * (1 - t) * t * bx + t * t * ex, 2 * (1 - t) * t * by + t * t * ey];
  const tan = (t) => {
    const dx = 2 * (1 - t) * bx + 2 * t * (ex - bx), dy = 2 * (1 - t) * by + 2 * t * (ey - by);
    const m = Math.hypot(dx, dy) || 1; return [dx / m, dy / m];
  };
  // spine
  c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(bx, by, ex, ey); c.stroke();
  // thorns hanging off it
  for (const b of arm.barbs) {
    const [px, py] = at(b.t), [tx, ty] = tan(b.t);
    const a = Math.atan2(ty, tx) + b.side * (0.75 + b.curl * 0.22);
    const L = b.len * R;
    const tipX = px + Math.cos(a) * L, tipY = py + Math.sin(a) * L;
    const ca = a - b.side * b.curl * 0.6;                 // curl back toward the spine
    c.beginPath(); c.moveTo(px, py);
    c.quadraticCurveTo(px + Math.cos(ca) * L * 0.6, py + Math.sin(ca) * L * 0.6, tipX, tipY);
    c.stroke();
  }
  // terminal hook
  const [tx, ty] = tan(1);
  const hl = arm.len * R * 0.24;
  const ha = Math.atan2(ty, tx) + arm.hook * 1.9;
  c.beginPath(); c.moveTo(ex, ey);
  c.quadraticCurveTo(ex + tx * hl, ey + ty * hl, ex + Math.cos(ha) * hl, ey + Math.sin(ha) * hl);
  c.stroke();
}
function modeSigil(c) {
  const S = Math.min(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(2,0,1,0.30)'; c.fillRect(0, 0, W, H);

  if (!sigilGlyph) sigilGlyph = buildSigil();
  if (A.beatHit && A.bass > 0.40 && Math.random() < 0.45) { sigilGlyph = buildSigil(); sigilFlash = 1; }
  sigilFlash *= 0.87;
  sigilRot += 0.0012 + A.mid * 0.0035;

  const R = S * (0.30 + A.bass * 0.04 + A.beat * 0.022);
  const heat = 0.35 + A.level * 0.4 + sigilFlash * 0.6;

  // ---- dead red glow behind the glyph
  c.globalCompositeOperation = 'lighter';
  const bg = c.createRadialGradient(CX, CY, 0, CX, CY, S * 0.7);
  bg.addColorStop(0, `rgba(120,6,8,${0.14 + A.bass * 0.26 + sigilFlash * 0.3})`);
  bg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = bg; c.beginPath(); c.arc(CX, CY, S * 0.7, 0, TAU); c.fill();

  c.lineCap = 'round'; c.lineJoin = 'round';
  for (const mir of [1, -1]) {
    c.save();
    c.translate(CX, CY); c.rotate(sigilRot); c.scale(mir, 1);
    // two passes: wide bleed, then the hot line
    for (const [lwF, col] of [
      [0.012, `rgba(255,14,10,${heat * 0.34})`],
      [0.0032, `rgba(255,${Math.round(30 + sigilFlash * 200)},${Math.round(20 + sigilFlash * 180)},${0.55 + heat * 0.45})`],
    ]) {
      c.strokeStyle = col; c.lineWidth = Math.max(1, S * lwF);
      for (const arm of sigilGlyph.arms) strokeSigilArm(c, arm, R);
      for (const rg of sigilGlyph.rings) {
        c.lineWidth = Math.max(1, S * lwF * (0.6 + rg.w * 60));
        c.beginPath(); c.arc(0, 0, rg.r * R, rg.a0, rg.a0 + rg.span); c.stroke();
      }
    }
    c.restore();
  }

  // ---- core: a hot slit that widens with the kick
  const coreR = S * (0.018 + A.beat * 0.03);
  const cg = c.createRadialGradient(CX, CY, 0, CX, CY, coreR * 4);
  cg.addColorStop(0, `rgba(255,230,215,${0.5 + sigilFlash * 0.5})`);
  cg.addColorStop(0.35, `rgba(255,40,20,${0.4 + A.bass * 0.4})`);
  cg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = cg; c.beginPath(); c.arc(CX, CY, coreR * 4, 0, TAU); c.fill();

  // ---- ash drifting up through the glyph
  if (sigilAsh.length < 90 && Math.random() < 0.7) sigilAsh.push({
    x: Math.random() * W, y: H + 4,
    vx: (Math.random() - 0.5) * 0.5, vy: -(0.25 + Math.random() * 0.8),
    r: 0.6 + Math.random() * 1.5, ph: Math.random() * TAU, life: 1,
  });
  for (let i = sigilAsh.length - 1; i >= 0; i--) {
    const p = sigilAsh[i];
    p.x += p.vx + Math.sin(frame * 0.01 + p.ph) * 0.3; p.y += p.vy; p.life -= 0.0035;
    if (p.life <= 0 || p.y < -4) { sigilAsh.splice(i, 1); continue; }
    c.fillStyle = `rgba(255,70,50,${p.life * 0.3})`;
    c.fillRect(p.x, p.y, p.r, p.r);
  }

  // ---- the mark
  c.globalCompositeOperation = 'lighter';
  drawTunox(c, CX, CY + R * 1.28, S * 0.072, {
    fill: `rgba(255,${Math.round(24 + sigilFlash * 120)},18,${0.72 + A.level * 0.28})`,
    glow: 'rgba(255,20,15,0.9)', blur: S * 0.05,
    track: S * 0.028, scaleY: 1.12,
  });

  if (sigilFlash > 0.45) { c.fillStyle = `rgba(255,40,30,${(sigilFlash - 0.45) * 0.5})`; c.fillRect(0, 0, W, H); }
  grime(c, S, 0.15, 0.3, 0.86);
}

/* =====================================================================
   MODE 41 — THORNS  (bramble closing in from the frame edge)
   Barbed cyber-tribal vines crawl inward from all four sides, growing a
   segment at a time and throwing thorns as they go. Every kick fires a
   fresh run of growth; when the frame gets choked the oldest vines
   blacken and fall away, so it breathes in and out with the track.
   ===================================================================== */
function spawnThorn(S) {
  const edge = Math.random() * 4 | 0;
  let x, y, a;
  if (edge === 0) { x = Math.random() * W; y = -6; a = Math.PI / 2; }
  else if (edge === 1) { x = W + 6; y = Math.random() * H; a = Math.PI; }
  else if (edge === 2) { x = Math.random() * W; y = H + 6; a = -Math.PI / 2; }
  else { x = -6; y = Math.random() * H; a = 0; }
  return {
    pts: [{ x, y }], a: a + (Math.random() - 0.5) * 0.7,
    curl: (Math.random() - 0.5) * 0.16,
    step: S * (0.022 + Math.random() * 0.03),
    max: 14 + (Math.random() * 22 | 0),
    barbs: [], heat: 1, age: 0,
  };
}
function modeThorns(c) {
  const S = Math.min(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(3,0,1,0.16)'; c.fillRect(0, 0, W, H);

  // ---- red pressure behind everything, pumped by the kick
  c.globalCompositeOperation = 'lighter';
  const bg = c.createRadialGradient(CX, CY, 0, CX, CY, S * 0.8);
  bg.addColorStop(0, `rgba(90,4,6,${0.16 + A.bass * 0.3 + A.beat * 0.2})`);
  bg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = bg; c.fillRect(0, 0, W, H);

  // ---- kick = a new run of growth
  if (A.beatHit) {
    const n = 1 + Math.round(A.bass * 4);
    for (let i = 0; i < n; i++) thornVines.push(spawnThorn(S));
    thornFlash = 1;
  }
  thornFlash *= 0.86;
  if (thornVines.length > 26) thornVines.splice(0, thornVines.length - 26);

  // ---- grow: fast while loud, always creeping
  const grow = Math.random() < 0.35 + A.level * 0.6;
  c.lineCap = 'round'; c.lineJoin = 'round';
  for (let i = thornVines.length - 1; i >= 0; i--) {
    const v = thornVines[i];
    v.age++;
    if (grow && v.pts.length < v.max) {
      const p = v.pts[v.pts.length - 1];
      v.a += v.curl + (Math.random() - 0.5) * 0.22;
      const nx = p.x + Math.cos(v.a) * v.step, ny = p.y + Math.sin(v.a) * v.step;
      v.pts.push({ x: nx, y: ny });
      if (Math.random() < 0.65) {                         // throw a thorn off the new joint
        const side = Math.random() < 0.5 ? 1 : -1;
        const ba = v.a + side * (0.9 + Math.random() * 0.5);
        const bl = v.step * (0.7 + Math.random() * 1.1);
        v.barbs.push({ x: nx, y: ny, ba, bl, curl: side * (0.5 + Math.random()) });
      }
    }
    if (v.pts.length >= v.max) v.heat *= 0.988;           // finished vines cool and blacken
    if (v.heat < 0.08) { thornVines.splice(i, 1); continue; }

    const h = v.heat, hot = Math.min(1, h * 1.3 + thornFlash * 0.4);
    for (const [lwF, col] of [
      [0.010, `rgba(255,12,8,${h * 0.26})`],
      [0.0030, `rgba(255,${Math.round(18 + hot * 90)},${Math.round(12 + hot * 60)},${0.45 + h * 0.55})`],
    ]) {
      c.strokeStyle = col; c.lineWidth = Math.max(1, S * lwF);
      c.beginPath(); c.moveTo(v.pts[0].x, v.pts[0].y);
      for (let k = 1; k < v.pts.length; k++) c.lineTo(v.pts[k].x, v.pts[k].y);
      c.stroke();
      // every thorn on this vine is one colour — batch them as subpaths of a
      // single stroke rather than one stroke each (same picture, ~8x cheaper)
      c.lineWidth = Math.max(1, S * lwF * 0.65);
      c.beginPath();
      for (const b of v.barbs) {                          // curled thorns
        c.moveTo(b.x, b.y);
        c.quadraticCurveTo(
          b.x + Math.cos(b.ba - b.curl * 0.5) * b.bl * 0.6, b.y + Math.sin(b.ba - b.curl * 0.5) * b.bl * 0.6,
          b.x + Math.cos(b.ba) * b.bl, b.y + Math.sin(b.ba) * b.bl);
      }
      c.stroke();
    }
    // wet tip while it's still growing
    if (v.pts.length < v.max) {
      const t = v.pts[v.pts.length - 1];
      c.fillStyle = `rgba(255,${Math.round(120 + hot * 120)},90,${0.5 + hot * 0.5})`;
      c.beginPath(); c.arc(t.x, t.y, S * 0.004, 0, TAU); c.fill();
    }
  }

  // ---- the mark, choked by the growth
  drawTunox(c, CX, CY, S * 0.13, {
    fill: `rgba(${Math.round(140 + thornFlash * 115)},${Math.round(8 + thornFlash * 40)},10,${0.5 + A.level * 0.4})`,
    glow: 'rgba(255,15,10,0.85)', blur: S * 0.07,
    track: S * 0.034, scaleY: 1.15,
  });

  grime(c, S, 0.16, 0.28, 0.88);
}

/* =====================================================================
   MODE 42 — CRUCIBLE  (foundry pour — molten metal into the dark)
   A ladle tips out of frame and pours white-hot metal into a pool that
   lights the room from below. Bass opens the flow, the kick slams the
   ladle and throws a full splash. Smoke rolls up the frame; TUNOX is
   stencilled on the back wall, only visible when the pour lights it.
   ===================================================================== */
function modeCrucible(c) {
  const S = Math.min(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = '#020001'; c.fillRect(0, 0, W, H);

  const poolY = H * 0.86;
  if (A.beatHit) { cruPour = 1; cruShake = 1; }
  cruPour = Math.max(A.bass * 0.7, cruPour * 0.93);
  cruShake *= 0.84;

  const sx = (Math.random() - 0.5) * cruShake * S * 0.01;
  const spoutX = CX + Math.sin(frame * 0.006) * W * 0.04 + sx;

  // ---- wall wash from the pool, and the stencilled mark it reveals
  c.globalCompositeOperation = 'lighter';
  const wash = c.createRadialGradient(spoutX, poolY, 0, spoutX, poolY, S * 1.05);
  wash.addColorStop(0, `rgba(190,40,10,${0.25 + cruPour * 0.4})`);
  wash.addColorStop(0.4, `rgba(110,12,6,${0.12 + cruPour * 0.16})`);
  wash.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = wash; c.fillRect(0, 0, W, H);

  c.globalCompositeOperation = 'source-over';
  drawTunox(c, CX, H * 0.34, S * 0.15, {                  // painted on the wall, lit by the pour
    fill: `rgba(${Math.round(60 + cruPour * 120)},${Math.round(12 + cruPour * 26)},10,${0.30 + cruPour * 0.45})`,
    stroke: `rgba(${Math.round(90 + cruPour * 140)},20,14,${0.2 + cruPour * 0.4})`,
    lw: Math.max(1, S * 0.004), track: S * 0.04, scaleY: 1.1,
  });

  // ---- the stream: a wobbling ribbon of molten metal.
  // kept narrow so it reads as a pour, not a bar of light
  c.globalCompositeOperation = 'lighter';
  const wTop = S * (0.006 + cruPour * 0.012);
  for (const [wf, col] of [
    [3.2, `rgba(255,50,10,${0.16 + cruPour * 0.2})`],
    [1.0, `rgba(255,${Math.round(150 + cruPour * 90)},${Math.round(70 + cruPour * 140)},${0.8})`],
  ]) {
    c.beginPath();
    for (const side of [1, -1]) {
      const pts = [];
      for (let y = 0; y <= poolY; y += S * 0.02) {
        const t = y / poolY;
        // it necks down and snakes as it falls, the way a real pour does
        const wob = (Math.sin(y * 0.035 + frame * 0.16) + Math.sin(y * 0.011 - frame * 0.07) * 1.5) * S * 0.012 * t;
        const w = wTop * wf * (1 - t * 0.55) * (1 + Math.sin(y * 0.06 + frame * 0.2) * 0.25);
        pts.push([spoutX + wob + side * w, y]);
      }
      if (side === 1) { c.moveTo(pts[0][0], pts[0][1]); for (const p of pts) c.lineTo(p[0], p[1]); }
      else { for (let i = pts.length - 1; i >= 0; i--) c.lineTo(pts[i][0], pts[i][1]); }
    }
    c.closePath(); c.fillStyle = col; c.fill();
  }

  // ---- splash off the pool surface
  const burst = A.beatHit ? 20 + Math.round(A.bass * 40) : (Math.random() < 0.5 + A.level ? 2 : 0);
  for (let k = 0; k < burst; k++) cruSplash.push({
    x: spoutX + (Math.random() - 0.5) * S * 0.05, y: poolY,
    vx: (Math.random() - 0.5) * 9 * (S / 600), vy: -(1 + Math.random() * 7) * (S / 600),
    r: 1 + Math.random() * 2.4, life: 0.5 + Math.random() * 0.5,
  });
  for (let i = cruSplash.length - 1; i >= 0; i--) {
    const p = cruSplash[i];
    p.vy += 0.22; p.x += p.vx; p.y += p.vy; p.life -= 0.016;
    if (p.life <= 0 || p.y > H) { cruSplash.splice(i, 1); continue; }
    const heat = Math.min(1, p.life * 1.8);
    c.strokeStyle = `rgba(255,${Math.round(80 + heat * 170)},${Math.round(20 + heat * 160)},${p.life})`;
    c.lineWidth = p.r;
    c.beginPath(); c.moveTo(p.x - p.vx, p.y - p.vy); c.lineTo(p.x, p.y); c.stroke();
  }
  if (cruSplash.length > 340) cruSplash.splice(0, cruSplash.length - 340);

  // ---- the pool: a hot lens that swells on impact
  const pr = S * (0.18 + cruPour * 0.12);
  const pg = c.createRadialGradient(spoutX, poolY, 0, spoutX, poolY, pr);
  pg.addColorStop(0, `rgba(255,240,225,${0.7 + cruPour * 0.3})`);
  pg.addColorStop(0.22, `rgba(255,130,40,${0.6 + cruPour * 0.4})`);
  pg.addColorStop(0.6, `rgba(220,40,10,${0.3 + cruPour * 0.3})`);
  pg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = pg;
  c.save(); c.translate(spoutX, poolY); c.scale(1.9, 0.4);
  c.beginPath(); c.arc(0, 0, pr, 0, TAU); c.fill(); c.restore();
  // cooling skin: thin dark arcs riding the surface, not blobs sitting on it
  c.globalCompositeOperation = 'source-over';
  c.strokeStyle = 'rgba(10,2,2,0.4)';
  c.lineWidth = Math.max(1, S * 0.004);
  for (let i = 0; i < 5; i++) {
    const rr = pr * (0.35 + i * 0.16);
    c.save(); c.translate(spoutX, poolY); c.scale(1.9, 0.4);
    c.beginPath();
    c.arc(0, 0, rr, 0.4 + i * 1.3 + frame * 0.003, 2.1 + i * 1.3 + frame * 0.003);
    c.restore(); c.stroke();
  }

  // ---- smoke rolling up out of the pour
  if (Math.random() < 0.5 + A.level * 0.5) cruSmoke.push({
    x: spoutX + (Math.random() - 0.5) * S * 0.2, y: poolY - S * 0.02,
    vx: (Math.random() - 0.5) * 0.6, vy: -(0.5 + Math.random() * 1.4),
    r: S * (0.02 + Math.random() * 0.05), life: 1,
  });
  c.globalCompositeOperation = 'source-over';
  for (let i = cruSmoke.length - 1; i >= 0; i--) {
    const p = cruSmoke[i];
    p.x += p.vx; p.y += p.vy; p.r *= 1.012; p.life -= 0.006;
    if (p.life <= 0) { cruSmoke.splice(i, 1); continue; }
    const lit = Math.max(0, 1 - (poolY - p.y) / (S * 0.7));
    const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    g.addColorStop(0, `rgba(${Math.round(30 + lit * 90)},${Math.round(8 + lit * 16)},8,${p.life * 0.3})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g; c.beginPath(); c.arc(p.x, p.y, p.r, 0, TAU); c.fill();
  }
  if (cruSmoke.length > 90) cruSmoke.splice(0, cruSmoke.length - 90);

  grime(c, S, 0.14, 0.34, 0.8);
}

/* =====================================================================
   MODE 43 — HOOKS  (chains and meat-hooks in a cold room)
   Rows of chains hang from the dark, swinging on a pendulum the bass
   drives. Behind them a red lamp; every kick fires a hard backlight
   that throws the whole rig into flat silhouette for a frame or two.
   Nothing moves fast — it just sways, and that's the unpleasant part.
   ===================================================================== */
function modeHooks(c) {
  const S = Math.min(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = '#010001'; c.fillRect(0, 0, W, H);

  if (hookRows.length !== 9 || hookW !== W) {
    hookW = W; hookRows = [];
    for (let i = 0; i < 9; i++) hookRows.push({
      x: (i + 0.5) / 9, len: 0.34 + Math.random() * 0.4,
      ph: Math.random() * TAU, amp: 0.4 + Math.random() * 0.8,
      links: 10 + (Math.random() * 8 | 0),
    });
  }

  if (A.beatHit) hookFlash = 1;
  hookFlash *= 0.72;
  hookSwing += 0.008 + A.bass * 0.02;

  // ---- lamp behind the rig. It has to stay genuinely bright even between
  // kicks, because everything in front of it is a black silhouette — dim the
  // lamp and the whole scene reads as an empty frame.
  c.globalCompositeOperation = 'lighter';
  const lampY = H * 0.34;
  const lg = c.createRadialGradient(CX, lampY, 0, CX, lampY, S * 0.8);
  lg.addColorStop(0, `rgba(255,${Math.round(60 + hookFlash * 90)},40,${0.55 + A.bass * 0.3 + hookFlash * 0.45})`);
  lg.addColorStop(0.25, `rgba(210,25,14,${0.34 + A.bass * 0.26 + hookFlash * 0.4})`);
  lg.addColorStop(0.6, `rgba(90,6,6,${0.14 + hookFlash * 0.22})`);
  lg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = lg; c.fillRect(0, 0, W, H);

  // ---- the mark burned onto the far wall, thrown into relief by the lamp
  c.globalCompositeOperation = 'source-over';
  drawTunox(c, CX, lampY, S * 0.17, {
    fill: 'rgba(3,0,0,0.9)',
    stroke: `rgba(255,${Math.round(70 + hookFlash * 120)},40,${0.5 + hookFlash * 0.5})`,
    lw: Math.max(1.5, S * 0.005), track: S * 0.045, scaleY: 1.2,
  });

  // ---- chains: black silhouette, thin red rim from the lamp side
  for (const r of hookRows) {
    const bx = r.x * W;
    const sw = Math.sin(hookSwing * r.amp + r.ph) * (0.05 + A.bass * 0.06);
    const topY = -S * 0.02, botY = topY + H * r.len;
    const linkH = (botY - topY) / r.links;
    for (let k = 0; k < r.links; k++) {
      const t = k / r.links;
      const x = bx + Math.sin(sw * 3 + t * 1.2) * W * 0.05 * t;
      const y = topY + k * linkH;
      const rw = S * 0.009 * (k % 2 ? 0.55 : 1);
      c.fillStyle = '#000';
      c.beginPath(); c.ellipse(x, y + linkH / 2, rw, linkH * 0.62, 0, 0, TAU); c.fill();
      c.strokeStyle = `rgba(255,${Math.round(50 + hookFlash * 90)},30,${0.42 + hookFlash * 0.5})`;
      c.lineWidth = Math.max(1.2, S * 0.0022);
      c.beginPath(); c.ellipse(x, y + linkH / 2, rw, linkH * 0.62, 0, 0, TAU); c.stroke();
    }
    // the hook itself
    const t = 1;
    const hx = bx + Math.sin(sw * 3 + t * 1.2) * W * 0.05, hy = botY;
    const hr = S * 0.035;
    c.strokeStyle = '#000'; c.lineWidth = S * 0.012; c.lineCap = 'round';
    c.beginPath(); c.moveTo(hx, hy); c.lineTo(hx, hy + hr * 0.5);
    c.arc(hx - hr * 0.55, hy + hr * 0.5, hr * 0.55, 0, Math.PI * 1.25); c.stroke();
    c.strokeStyle = `rgba(255,${Math.round(60 + hookFlash * 110)},35,${0.5 + hookFlash * 0.5})`;
    c.lineWidth = Math.max(1.2, S * 0.0035);
    c.beginPath(); c.moveTo(hx, hy); c.lineTo(hx, hy + hr * 0.5);
    c.arc(hx - hr * 0.55, hy + hr * 0.5, hr * 0.55, 0, Math.PI * 1.25); c.stroke();
  }

  // ---- cold floor haze
  c.globalCompositeOperation = 'lighter';
  const fh = c.createLinearGradient(0, H * 0.72, 0, H);
  fh.addColorStop(0, 'rgba(0,0,0,0)');
  fh.addColorStop(1, `rgba(70,5,6,${0.14 + A.bass * 0.14 + hookFlash * 0.2})`);
  c.fillStyle = fh; c.fillRect(0, H * 0.72, W, H * 0.28);

  if (hookFlash > 0.6) { c.fillStyle = `rgba(255,30,25,${(hookFlash - 0.6) * 0.35})`; c.fillRect(0, 0, W, H); }
  grime(c, S, 0.17, 0.34, 0.78);
}

/* =====================================================================
   MODE 44 — RITUAL  (summoning circle burned into the floor)
   A sigil circle laid flat in perspective: counter-rotating rings of
   glyph ticks around a barbed star, TUNOX set into the outer band. The
   kick drives a column of red light straight up out of the centre and
   sends a ring of ash out across the floor.
   ===================================================================== */
function modeRitual(c) {
  const S = Math.min(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(1,0,1,0.30)'; c.fillRect(0, 0, W, H);

  if (A.beatHit) { ritPulse = 1; ritRings.push({ r: 0.1, life: 1 }); if (ritRings.length > 6) ritRings.shift(); }
  ritPulse *= 0.90;
  ritRot += 0.0022 + A.mid * 0.006;

  const flY = H * 0.70, R = S * 0.42, squash = 0.32;

  // ---- the light column, before the floor so the floor sits on top of it
  c.globalCompositeOperation = 'lighter';
  const colH = S * (0.5 + A.bass * 0.5 + ritPulse * 0.6);
  const cw = S * (0.05 + ritPulse * 0.06);
  const colG = c.createLinearGradient(0, flY - colH, 0, flY);
  colG.addColorStop(0, 'rgba(0,0,0,0)');
  colG.addColorStop(1, `rgba(255,25,18,${0.16 + A.bass * 0.25 + ritPulse * 0.4})`);
  c.fillStyle = colG;
  c.beginPath();
  c.moveTo(CX - cw * 0.35, flY - colH); c.lineTo(CX + cw * 0.35, flY - colH);
  c.lineTo(CX + cw, flY); c.lineTo(CX - cw, flY);
  c.closePath(); c.fill();

  c.save();
  c.translate(CX, flY); c.scale(1, squash);

  // ---- floor glow
  const fg = c.createRadialGradient(0, 0, 0, 0, 0, R * 1.5);
  fg.addColorStop(0, `rgba(150,10,8,${0.2 + A.bass * 0.28 + ritPulse * 0.3})`);
  fg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = fg; c.beginPath(); c.arc(0, 0, R * 1.5, 0, TAU); c.fill();

  const hot = 0.4 + A.level * 0.35 + ritPulse * 0.5;
  c.lineCap = 'round';

  // ---- shock rings racing outward on each kick
  for (let i = ritRings.length - 1; i >= 0; i--) {
    const rr = ritRings[i];
    rr.r += 0.03 + A.bass * 0.02; rr.life -= 0.016;
    if (rr.life <= 0 || rr.r > 1.6) { ritRings.splice(i, 1); continue; }
    c.strokeStyle = `rgba(255,40,25,${rr.life * 0.5})`;
    c.lineWidth = Math.max(1, S * 0.006 * rr.life);
    c.beginPath(); c.arc(0, 0, rr.r * R, 0, TAU); c.stroke();
  }

  // ---- three bands of glyph ticks, counter-rotating
  for (const [rf, dir, n, tick] of [[1.0, 1, 64, 0.055], [0.82, -1, 40, 0.08], [0.5, 1, 24, 0.11]]) {
    const rad = R * rf;
    c.strokeStyle = `rgba(255,18,12,${hot * 0.75})`;
    c.lineWidth = Math.max(1, S * 0.0025);
    c.beginPath(); c.arc(0, 0, rad, 0, TAU); c.stroke();
    for (let i = 0; i < n; i++) {
      const a = i / n * TAU + ritRot * dir * (1 + rf);
      const f = freq[Math.floor(i / n * freq.length * 0.55)] / 255;
      const L = rad * tick * (0.5 + f * 1.6);
      c.strokeStyle = `rgba(255,${Math.round(20 + f * 180)},${Math.round(14 + f * 120)},${0.35 + f * 0.65})`;
      c.lineWidth = Math.max(1, S * 0.003);
      c.beginPath();
      c.moveTo(Math.cos(a) * rad, Math.sin(a) * rad);
      c.lineTo(Math.cos(a) * (rad + L), Math.sin(a) * (rad + L));
      c.stroke();
    }
  }

  // ---- barbed star in the middle
  const pts = 7;
  c.strokeStyle = `rgba(255,${Math.round(30 + ritPulse * 170)},20,${0.5 + hot * 0.5})`;
  c.lineWidth = Math.max(1, S * 0.004);
  c.beginPath();
  for (let i = 0; i <= pts; i++) {
    const a = (i * 3) / pts * TAU - ritRot * 0.6;         // {7/3} star polygon
    const x = Math.cos(a) * R * 0.46, y = Math.sin(a) * R * 0.46;
    i ? c.lineTo(x, y) : c.moveTo(x, y);
  }
  c.closePath(); c.stroke();
  c.restore();

  // ---- the mark, sitting in the outer band (drawn unsquashed so it reads)
  c.globalCompositeOperation = 'lighter';
  drawTunox(c, CX, flY + R * squash * 1.55, S * 0.085, {
    fill: `rgba(255,${Math.round(26 + ritPulse * 120)},18,${0.68 + A.level * 0.32})`,
    glow: 'rgba(255,20,12,0.9)', blur: S * 0.055,
    track: S * 0.03, scaleY: 1.1,
  });

  // ---- ash lifted by the column
  if (ritMotes.length < 110 && Math.random() < 0.8) ritMotes.push({
    x: CX + (Math.random() - 0.5) * R * 1.6, y: flY + (Math.random() - 0.5) * R * squash,
    vx: (Math.random() - 0.5) * 0.5, vy: -(0.2 + Math.random() * 1.1),
    r: 0.6 + Math.random() * 1.6, life: 1,
  });
  for (let i = ritMotes.length - 1; i >= 0; i--) {
    const p = ritMotes[i];
    p.x += p.vx + Math.sin(frame * 0.012 + p.y * 0.01) * 0.3;
    p.y += p.vy - ritPulse * 1.5; p.life -= 0.005;
    if (p.life <= 0 || p.y < 0) { ritMotes.splice(i, 1); continue; }
    c.fillStyle = `rgba(255,${Math.round(60 + p.life * 60)},45,${p.life * 0.35})`;
    c.fillRect(p.x, p.y, p.r, p.r);
  }

  grime(c, S, 0.15, 0.3, 0.86);
}

/* =====================================================================
   MODE 45 — VEIN  (biomechanical vascular net under the skin)
   A branching vessel network grown out from the centre and left there,
   dark and inert, until pulses of hot blood get pushed along it on the
   kick and race out to the extremities. Grows a new body occasionally
   so it never settles into a pattern you can memorise.
   ===================================================================== */
function buildVeins() {
  const S = Math.min(W, H);
  const segs = [], routes = [];
  const grow = (x, y, a, len, depth, path) => {
    const nx = x + Math.cos(a) * len, ny = y + Math.sin(a) * len;
    segs.push({ x0: x, y0: y, x1: nx, y1: ny, w: 0.5 + depth * 0.9 });
    const p = path.concat([{ x: nx, y: ny }]);
    if (depth <= 1 || len < S * 0.015) { routes.push(p); return; }
    const n = Math.random() < 0.25 ? 3 : 2;
    for (let i = 0; i < n; i++) {
      const spread = (i - (n - 1) / 2) * (0.5 + Math.random() * 0.45);
      grow(nx, ny, a + spread + (Math.random() - 0.5) * 0.3, len * (0.66 + Math.random() * 0.22), depth - 1, p);
    }
  };
  const roots = 5 + (Math.random() * 3 | 0);
  for (let i = 0; i < roots; i++) grow(CX, CY, i / roots * TAU + Math.random() * 0.5, S * 0.14, 5, [{ x: CX, y: CY }]);
  return { segs, routes };
}
function modeVein(c) {
  const S = Math.min(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = '#030001'; c.fillRect(0, 0, W, H);

  if (!veinNet || veinW !== W || veinH !== H) { veinNet = buildVeins(); veinW = W; veinH = H; }
  if (A.beatHit && A.bass > 0.5 && Math.random() < 0.07) veinNet = buildVeins();

  // ---- dull organ glow
  c.globalCompositeOperation = 'lighter';
  const bg = c.createRadialGradient(CX, CY, 0, CX, CY, S * 0.75);
  bg.addColorStop(0, `rgba(80,4,8,${0.16 + A.bass * 0.3 + A.beat * 0.2})`);
  bg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = bg; c.beginPath(); c.arc(CX, CY, S * 0.75, 0, TAU); c.fill();

  // ---- the vessels themselves — dark, wet, barely there
  const throb = 1 + A.bass * 0.3 + A.beat * 0.2;
  c.lineCap = 'round';
  c.strokeStyle = `rgba(90,8,12,${0.35 + A.level * 0.3})`;
  for (const s of veinNet.segs) {
    c.lineWidth = s.w * throb * (S / 900);
    c.beginPath(); c.moveTo(s.x0, s.y0); c.lineTo(s.x1, s.y1); c.stroke();
  }

  // ---- kick pushes blood out from the heart
  if (A.beatHit) {
    const n = 3 + Math.round(A.bass * 9);
    for (let i = 0; i < n; i++) veinPulses.push({
      route: veinNet.routes[(Math.random() * veinNet.routes.length) | 0],
      t: 0, sp: 0.018 + Math.random() * 0.03 + A.bass * 0.02, life: 1,
    });
    if (veinPulses.length > 160) veinPulses.splice(0, veinPulses.length - 160);
  }
  for (let i = veinPulses.length - 1; i >= 0; i--) {
    const p = veinPulses[i];
    p.t += p.sp * (0.6 + A.level); p.life -= 0.006;
    if (p.t >= 1 || p.life <= 0 || !p.route) { veinPulses.splice(i, 1); continue; }
    const r = p.route, seg = Math.min(r.length - 2, Math.floor(p.t * (r.length - 1)));
    const ft = p.t * (r.length - 1) - seg;
    const a = r[seg], b = r[seg + 1];
    const x = a.x + (b.x - a.x) * ft, y = a.y + (b.y - a.y) * ft;
    const heat = p.life * (1 - p.t * 0.35);
    // trail back down the vessel it just came through
    c.strokeStyle = `rgba(255,${Math.round(30 + heat * 70)},30,${heat * 0.5})`;
    c.lineWidth = Math.max(1, S * 0.004 * heat);
    c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(x, y); c.stroke();
    // the cell itself
    const g = c.createRadialGradient(x, y, 0, x, y, S * 0.02 * heat + 2);
    g.addColorStop(0, `rgba(255,${Math.round(140 + heat * 90)},${Math.round(110 + heat * 90)},${heat})`);
    g.addColorStop(0.4, `rgba(255,30,20,${heat * 0.7})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g; c.beginPath(); c.arc(x, y, S * 0.02 * heat + 2, 0, TAU); c.fill();
  }

  // ---- heart at the origin
  const hr = S * (0.02 + A.bass * 0.03 + A.beat * 0.025);
  const hg = c.createRadialGradient(CX, CY, 0, CX, CY, hr * 3);
  hg.addColorStop(0, `rgba(255,200,190,${0.35 + A.beat * 0.5})`);
  hg.addColorStop(0.3, `rgba(255,25,18,${0.4 + A.bass * 0.4})`);
  hg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = hg; c.beginPath(); c.arc(CX, CY, hr * 3, 0, TAU); c.fill();

  // ---- the mark, read through the tissue
  drawTunox(c, CX, CY, S * 0.12, {
    fill: `rgba(255,20,16,${0.16 + A.beat * 0.3})`,
    stroke: `rgba(255,60,45,${0.25 + A.level * 0.35})`,
    glow: 'rgba(255,15,10,0.7)', blur: S * 0.06,
    lw: Math.max(1, S * 0.0035), track: S * 0.036, scaleY: 1.14,
  });

  grime(c, S, 0.13, 0.3, 0.88);
}

/* =====================================================================
   MODE 46 — CATHEDRAL  (industrial nave, backlit red)
   A row of pointed arches recedes into the dark, blasted from behind by
   a red furnace glow. The kick fires a hard strobe through the arcade
   and the whole colonnade goes flat black against white for a frame.
   Dust hangs in the light shafts. TUNOX sits in the apse like an altar.
   ===================================================================== */
function modeCathedral(c) {
  const S = Math.min(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = '#010001'; c.fillRect(0, 0, W, H);

  if (A.beatHit) cathFlash = 1;
  cathFlash *= 0.75;
  cathSway += 0.004 + A.mid * 0.008;

  const vpY = H * 0.56;
  const white = cathFlash > 0.72;

  // ---- furnace behind the apse
  c.globalCompositeOperation = 'lighter';
  const fg = c.createRadialGradient(CX, vpY, 0, CX, vpY, S * 0.9);
  const fi = 0.28 + A.bass * 0.35 + cathFlash * 0.6;
  fg.addColorStop(0, white ? `rgba(255,235,230,${fi})` : `rgba(210,25,15,${fi})`);
  fg.addColorStop(0.35, `rgba(120,8,8,${0.14 + A.bass * 0.2 + cathFlash * 0.3})`);
  fg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = fg; c.fillRect(0, 0, W, H);

  // ---- the mark in the apse, silhouetted by the furnace. Sized off the
  // narrowest (furthest) bay opening so the near piers never crop it.
  const bays = 7;
  const farSc = 0.24;
  const openW = 2 * W * farSc * (0.5 - 0.055);
  const markFs = Math.min(openW * 0.19, S * 0.08);
  c.globalCompositeOperation = 'source-over';
  drawTunox(c, CX, vpY + S * 0.01, markFs, {
    fill: 'rgba(4,0,0,0.85)',
    stroke: `rgba(255,${Math.round(40 + cathFlash * 100)},25,${0.42 + cathFlash * 0.5})`,
    lw: Math.max(1, S * 0.003), track: markFs * 0.16, scaleY: 1.16,
  });

  // ---- the arcade: bays receding toward the vanishing point.
  // far (small) bays first so the near ones paint over them.
  for (let i = 0; i < bays; i++) {
    const k = i / bays;
    const sc = farSc + Math.pow(k, 1.5) * 1.5;            // near bays are huge
    const halfW = W * 0.5 * sc, colW = W * 0.055 * sc;
    const springY = vpY - S * 0.16 * sc, baseY = vpY + S * 0.42 * sc;
    // A lancet only reads if it rises well above its half-span — tie the two
    // together rather than picking a fixed height, or it comes out a horseshoe.
    const halfSpan = halfW - colW;
    const rise = halfSpan * 1.25;
    const apexY = springY - rise;
    const sway = Math.sin(cathSway + i) * S * 0.004 * sc;
    const cap = rise * 0.14;

    c.fillStyle = '#000';
    for (const side of [1, -1]) {
      const inner = CX + side * halfSpan + sway;
      const outer = CX + side * (halfW + colW) + sway;
      const apex = CX + sway;
      // pier
      c.fillRect(Math.min(inner, outer), springY, Math.abs(outer - inner), baseY - springY);
      // gothic shoulder — cubic so both tangents are controllable: leaves the
      // pier vertically, arrives at the apex steeply so the two sides meet in
      // a point instead of rolling over into a round arch.
      c.beginPath();
      c.moveTo(inner, springY);
      c.bezierCurveTo(inner, springY - rise * 0.6, inner + (apex - inner) * 0.82, apexY + rise * 0.35, apex, apexY);
      c.lineTo(apex, apexY - cap);
      c.bezierCurveTo(outer + (apex - outer) * 0.82, apexY - cap + rise * 0.35, outer, springY - rise * 0.6, outer, springY);
      c.closePath(); c.fill();
    }
    // hot rim on the arch edge
    c.globalCompositeOperation = 'lighter';
    c.strokeStyle = `rgba(255,${Math.round(20 + cathFlash * 90)},15,${(0.08 + A.bass * 0.16 + cathFlash * 0.4) * (0.4 + k)})`;
    c.lineWidth = Math.max(1, S * 0.0025 * sc);
    for (const side of [1, -1]) {
      const inner = CX + side * halfSpan + sway, apex = CX + sway;
      c.beginPath();
      c.moveTo(inner, baseY); c.lineTo(inner, springY);
      c.bezierCurveTo(inner, springY - rise * 0.6, inner + (apex - inner) * 0.82, apexY + rise * 0.35, apex, apexY);
      c.stroke();
    }
    c.globalCompositeOperation = 'source-over';
  }

  // ---- floor, catching the glow
  c.globalCompositeOperation = 'lighter';
  const fl = c.createLinearGradient(0, vpY + S * 0.4, 0, H);
  fl.addColorStop(0, `rgba(120,10,8,${0.16 + A.bass * 0.2 + cathFlash * 0.3})`);
  fl.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = fl; c.fillRect(0, vpY + S * 0.4, W, H);

  // ---- dust hanging in the shaft
  if (cathDust.length < 120 && Math.random() < 0.7) cathDust.push({
    x: CX + (Math.random() - 0.5) * W * 0.5, y: vpY + (Math.random() - 0.5) * S * 0.5,
    vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.2,
    r: 0.5 + Math.random() * 1.4, ph: Math.random() * TAU, life: 1,
  });
  for (let i = cathDust.length - 1; i >= 0; i--) {
    const p = cathDust[i];
    p.x += p.vx + Math.sin(frame * 0.009 + p.ph) * 0.2; p.y += p.vy; p.life -= 0.0028;
    if (p.life <= 0) { cathDust.splice(i, 1); continue; }
    const lit = Math.max(0, 1 - Math.hypot(p.x - CX, p.y - vpY) / (S * 0.6));
    c.fillStyle = `rgba(255,${Math.round(90 + cathFlash * 120)},70,${p.life * lit * (0.25 + cathFlash * 0.4)})`;
    c.fillRect(p.x, p.y, p.r, p.r);
  }

  if (white) { c.fillStyle = `rgba(255,245,240,${(cathFlash - 0.72) * 0.55})`; c.fillRect(0, 0, W, H); }
  grime(c, S, 0.16, 0.3, 0.88);
}

/* =====================================================================
   MODE 47 — BARBWIRE  (razorwire lattice under tension)
   Coils of razorwire run corner to corner, spinning on their own axis so
   the blades catch the light. Bass winds them tighter; the kick snaps a
   strand — a white flash down its length, sparks off the break, and the
   coil recoils before it re-tensions.
   ===================================================================== */
function modeBarbwire(c) {
  const S = Math.min(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(2,0,1,0.34)'; c.fillRect(0, 0, W, H);

  if (bwCoils.length !== 5) {
    bwCoils = [];
    for (let i = 0; i < 5; i++) bwCoils.push({
      y: (i + 0.5) / 5, tilt: (Math.random() - 0.5) * 0.5,
      spin: Math.random() * TAU, dir: Math.random() < 0.5 ? 1 : -1,
      turns: 5 + (Math.random() * 4 | 0), snap: 0,   // few enough that each loop reads
    });
  }

  if (A.beatHit) {
    const v = bwCoils[(Math.random() * bwCoils.length) | 0];
    v.snap = 1; bwFlash = 1;
    for (let k = 0; k < 22 + Math.round(A.bass * 30); k++) bwSparks.push({
      x: W * (0.15 + Math.random() * 0.7), y: v.y * H + (Math.random() - 0.5) * S * 0.06,
      vx: (Math.random() - 0.5) * 10 * (S / 600), vy: (Math.random() - 0.5) * 8 * (S / 600),
      r: 1 + Math.random() * 2, life: 0.4 + Math.random() * 0.5,
    });
  }
  bwFlash *= 0.84;

  // ---- backlight
  c.globalCompositeOperation = 'lighter';
  const bg = c.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, 'rgba(0,0,0,0)');
  bg.addColorStop(0.5, `rgba(110,6,8,${0.18 + A.bass * 0.28 + bwFlash * 0.3})`);
  bg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = bg; c.fillRect(0, 0, W, H);

  // ---- the mark behind the wire
  drawTunox(c, CX, CY, S * 0.15, {
    fill: `rgba(${Math.round(90 + bwFlash * 120)},8,9,${0.3 + A.level * 0.3})`,
    stroke: `rgba(255,${Math.round(40 + bwFlash * 90)},30,${0.35 + A.level * 0.3})`,
    lw: Math.max(1, S * 0.003),
    track: S * 0.04, scaleY: 1.18,
  });

  // ---- coils
  c.lineCap = 'round';
  for (const v of bwCoils) {
    v.spin += v.dir * (0.006 + A.mid * 0.03);
    v.snap *= 0.88;
    const y0 = v.y * H + v.snap * (Math.random() - 0.5) * S * 0.05;
    const amp = S * (0.055 + A.bass * 0.03) * (1 - v.snap * 0.4);
    const hot = 0.3 + A.level * 0.3 + v.snap * 0.7 + bwFlash * 0.2;
    const N = 150;
    // Two strands a half-turn out of phase. A single sine reads as a waveform;
    // the crossing pair reads as twisted wire seen side-on, which is the point.
    for (const [lw, col] of [
      [S * 0.008, `rgba(255,14,10,${hot * 0.3})`],
      [Math.max(1, S * 0.0022), v.snap > 0.5
        ? `rgba(255,${Math.round(200 * v.snap)},${Math.round(190 * v.snap)},${0.7 + v.snap * 0.3})`
        : `rgba(${Math.round(180 + hot * 75)},${Math.round(30 + hot * 40)},28,${0.45 + hot * 0.5})`],
    ]) {
      c.strokeStyle = col; c.lineWidth = lw;
      c.beginPath();
      for (const off of [0, Math.PI]) {
        for (let i = 0; i <= N; i++) {
          const t = i / N, x = t * W;
          const ph = t * v.turns * TAU + v.spin + off;
          const y = y0 + Math.sin(ph) * amp + (t - 0.5) * v.tilt * H * 0.2;
          i ? c.lineTo(x, y) : c.moveTo(x, y);
        }
      }
      c.stroke();
    }
    // barbs clamped on where the strands cross. Solid metal, not additive —
    // under 'lighter' they wash out to yellow against the red backlight.
    c.globalCompositeOperation = 'source-over';
    for (let k = 0; k < v.turns * 2; k++) {
      const t = (k + 0.5) / (v.turns * 2), x = t * W;
      const ph = t * v.turns * TAU + v.spin;
      const y = y0 + Math.sin(ph) * amp + (t - 0.5) * v.tilt * H * 0.2;
      const face = Math.abs(Math.cos(ph));                // edge-on vs. flat to the light
      const bl = S * 0.024 * (0.5 + face);
      c.save(); c.translate(x, y); c.rotate(ph * 0.5);
      c.fillStyle = `rgba(${Math.round(120 + face * 120)},${Math.round(24 + face * 40 + v.snap * 180)},${Math.round(20 + face * 26)},${0.7 + face * 0.3})`;
      c.beginPath();
      c.moveTo(-bl, 0); c.lineTo(0, -bl * 0.3); c.lineTo(bl, 0); c.lineTo(0, bl * 0.3);
      c.closePath(); c.fill();
      c.restore();
    }
    c.globalCompositeOperation = 'lighter';   // sparks below glow again
  }

  // ---- sparks off the break
  for (let i = bwSparks.length - 1; i >= 0; i--) {
    const p = bwSparks[i];
    p.vy += 0.2; p.x += p.vx; p.y += p.vy; p.life -= 0.02;
    if (p.life <= 0 || p.y > H) { bwSparks.splice(i, 1); continue; }
    const heat = Math.min(1, p.life * 1.8);
    c.strokeStyle = `rgba(255,${Math.round(90 + heat * 160)},${Math.round(40 + heat * 150)},${p.life})`;
    c.lineWidth = p.r;
    c.beginPath(); c.moveTo(p.x - p.vx, p.y - p.vy); c.lineTo(p.x, p.y); c.stroke();
  }
  if (bwSparks.length > 300) bwSparks.splice(0, bwSparks.length - 300);

  grime(c, S, 0.15, 0.32, 0.85);
}

/* =====================================================================
   MODE 48 — RUST  (corroded bulkhead, stencilled and left to rot)
   A riveted steel plate with TUNOX stencilled across it, eaten by
   corrosion blooms. A red inspection lamp sweeps the surface; the kick
   lands as a hammer blow that shocks the plate and shakes flakes loose.
   The calmest scene here — it's for the long grinding stretches.
   ===================================================================== */
function modeRust(c) {
  const S = Math.min(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = '#0a0605'; c.fillRect(0, 0, W, H);

  if (rustBlooms.length !== 46 || rustW !== W) {
    rustW = W; rustBlooms = [];
    for (let i = 0; i < 46; i++) rustBlooms.push({
      x: Math.random(), y: Math.random(),
      r: 0.02 + Math.random() * 0.11, a: 0.1 + Math.random() * 0.3,
    });
  }
  if (A.beatHit) { rustHit = 1; rustHitX = Math.random(); rustHitY = Math.random(); }
  rustHit *= 0.86;
  rustSweep += 0.003 + A.mid * 0.006;

  const shk = rustHit * S * 0.006;
  c.save();
  c.translate((Math.random() - 0.5) * shk, (Math.random() - 0.5) * shk);

  // ---- plate: panel seams and rivets
  const panel = S * 0.36;
  c.strokeStyle = 'rgba(0,0,0,0.75)'; c.lineWidth = Math.max(2, S * 0.005);
  for (let x = panel; x < W; x += panel) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
  for (let y = panel; y < H; y += panel) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  for (let x = panel * 0.5; x < W; x += panel) {
    for (let y = panel * 0.28; y < H; y += panel * 0.22) {
      c.fillStyle = 'rgba(0,0,0,0.5)';
      c.beginPath(); c.arc(x, y, S * 0.005, 0, TAU); c.fill();
      c.fillStyle = 'rgba(90,60,52,0.25)';
      c.beginPath(); c.arc(x - S * 0.0012, y - S * 0.0012, S * 0.0034, 0, TAU); c.fill();
    }
  }

  // ---- corrosion blooms eating the plate
  for (const b of rustBlooms) {
    const g = c.createRadialGradient(b.x * W, b.y * H, 0, b.x * W, b.y * H, b.r * S);
    g.addColorStop(0, `rgba(96,34,12,${b.a})`);
    g.addColorStop(0.6, `rgba(58,16,8,${b.a * 0.6})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g; c.beginPath(); c.arc(b.x * W, b.y * H, b.r * S, 0, TAU); c.fill();
  }

  // ---- the stencil, worn through
  drawTunox(c, CX, CY, S * 0.2, {
    fill: 'rgba(148,18,14,0.62)',
    stroke: 'rgba(10,3,3,0.75)', lw: Math.max(2, S * 0.006),
    track: S * 0.052, scaleY: 1.22,
  });
  // corrosion chewing back into the letterforms
  c.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 26; i++) {
    const x = CX + (Math.random() - 0.5) * S * 0.95, y = CY + (Math.random() - 0.5) * S * 0.18;
    c.fillStyle = `rgba(${20 + Math.random() * 40 | 0},${8 + Math.random() * 12 | 0},6,${0.1 + Math.random() * 0.3})`;
    c.beginPath(); c.arc(x, y, S * (0.004 + Math.random() * 0.016), 0, TAU); c.fill();
  }

  // ---- inspection lamp crawling over the surface
  c.globalCompositeOperation = 'lighter';
  const lx = CX + Math.cos(rustSweep) * W * 0.42, ly = CY + Math.sin(rustSweep * 0.7) * H * 0.32;
  const lamp = c.createRadialGradient(lx, ly, 0, lx, ly, S * 0.55);
  lamp.addColorStop(0, `rgba(190,26,16,${0.2 + A.bass * 0.28})`);
  lamp.addColorStop(0.5, `rgba(90,10,8,${0.08 + A.bass * 0.1})`);
  lamp.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = lamp; c.fillRect(0, 0, W, H);

  // ---- hammer blow: a bright ring on the plate + flakes shaken loose
  if (rustHit > 0.05) {
    const hx = rustHitX * W, hy = rustHitY * H;
    const rr = S * (0.05 + (1 - rustHit) * 0.35);
    c.strokeStyle = `rgba(255,${Math.round(80 + rustHit * 140)},60,${rustHit * 0.55})`;
    c.lineWidth = Math.max(1, S * 0.008 * rustHit);
    c.beginPath(); c.arc(hx, hy, rr, 0, TAU); c.stroke();
    if (A.beatHit) for (let k = 0; k < 16 + Math.round(A.bass * 24); k++) rustFlakes.push({
      x: hx + (Math.random() - 0.5) * S * 0.12, y: hy + (Math.random() - 0.5) * S * 0.12,
      vx: (Math.random() - 0.5) * 2, vy: -Math.random() * 2,
      a: Math.random() * TAU, va: (Math.random() - 0.5) * 0.3,
      r: S * (0.002 + Math.random() * 0.005), life: 1,
    });
  }

  // ---- flakes falling off
  c.globalCompositeOperation = 'source-over';
  for (let i = rustFlakes.length - 1; i >= 0; i--) {
    const p = rustFlakes[i];
    p.vy += 0.14; p.x += p.vx; p.y += p.vy; p.a += p.va; p.life -= 0.009;
    if (p.life <= 0 || p.y > H + 8) { rustFlakes.splice(i, 1); continue; }
    c.save(); c.translate(p.x, p.y); c.rotate(p.a);
    c.fillStyle = `rgba(${110 + Math.random() * 40 | 0},42,18,${p.life * 0.8})`;
    c.fillRect(-p.r, -p.r * 0.5, p.r * 2, p.r);
    c.restore();
  }
  if (rustFlakes.length > 260) rustFlakes.splice(0, rustFlakes.length - 260);

  c.restore();
  grime(c, S, 0.13, 0.24, 0.9);
}

/* =====================================================================
   MODE 49 — HEXCODE  (corrupted datastream with the sigil underneath)
   Columns of hex and occult marks fall through the dark. Treble drives
   the fall, the kick corrupts whole columns to white and tears the
   frame sideways. Every so often the noise resolves and TUNOX locks in
   across the middle of the stream before it dissolves again.
   ===================================================================== */
const HEX_GLYPHS = '0123456789ABCDEF†‡×÷¬√∆◊';
function modeHexcode(c) {
  const S = Math.min(W, H);
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = 'rgba(1,0,1,0.20)'; c.fillRect(0, 0, W, H);

  const fs = Math.max(10, S * 0.026);
  const cols = Math.ceil(W / (fs * 0.78));
  if (hexCols.length !== cols || hexW !== W) {
    hexW = W; hexCols = [];
    for (let i = 0; i < cols; i++) hexCols.push({
      y: Math.random() * H, sp: 0.4 + Math.random() * 1.6,
      len: 6 + (Math.random() * 18 | 0), corrupt: 0,
    });
  }

  if (A.beatHit) {
    hexTear = 1;
    const n = 3 + Math.round(A.bass * 10);
    for (let i = 0; i < n; i++) hexCols[(Math.random() * cols) | 0].corrupt = 1;
    if (A.bass > 0.45 && Math.random() < 0.35) hexLock = 1;
  }
  hexTear *= 0.80;
  hexLock *= 0.965;

  // ---- horizontal tear: shove a band of the frame sideways
  // source rect is in backing-store pixels, dest in logical units — derive the
  // ratio from the canvas so this survives renderScale < 1 and offline export
  if (hexTear > 0.1) {
    const pr = c.canvas.width / W;
    const bandY = (frame * 37 % H) | 0, bandH = S * 0.08 * hexTear;
    const off = (Math.random() - 0.5) * W * 0.12 * hexTear;
    c.drawImage(c.canvas, 0, bandY * pr, c.canvas.width, bandH * pr, off, bandY, W, bandH);
  }

  // ---- the stream
  c.font = `${fs}px "Courier New", monospace`;
  c.textAlign = 'left'; c.textBaseline = 'top';
  const step = fs * 1.05;
  for (let i = 0; i < cols; i++) {
    const col = hexCols[i];
    col.y += col.sp * (1.2 + A.treble * 7 + A.level * 3);
    col.corrupt *= 0.9;
    if (col.y > H + col.len * step) { col.y = -col.len * step; col.sp = 0.4 + Math.random() * 1.6; }
    const x = i * fs * 0.78;
    // only the head of the column is painted each frame — the low-alpha bg
    // fade above smears it into the tail, same trick MATRIX uses
    const drawn = Math.min(col.len, 6);
    for (let k = 0; k < drawn; k++) {
      const y = col.y - k * step;
      if (y < -step || y > H) continue;
      const g = HEX_GLYPHS[(Math.random() * HEX_GLYPHS.length) | 0];
      const fade = 1 - k / drawn;     // falls off over the painted head; the bg fade takes it from there
      if (k === 0) {                                       // hot leading character
        c.fillStyle = `rgba(255,${Math.round(190 + col.corrupt * 65)},${Math.round(170 + col.corrupt * 85)},0.95)`;
      } else if (col.corrupt > 0.3) {
        c.fillStyle = `rgba(255,${Math.round(200 * col.corrupt)},${Math.round(190 * col.corrupt)},${fade})`;
      } else {
        c.fillStyle = `rgba(${Math.round(150 + fade * 105)},${Math.round(10 + fade * 24)},12,${fade * 0.85})`;
      }
      c.fillText(g, x, y);
    }
  }

  // ---- the sigil bar the stream is running over
  c.globalCompositeOperation = 'lighter';
  const barY = CY, barH = S * 0.14;
  const bg = c.createLinearGradient(0, barY - barH, 0, barY + barH);
  bg.addColorStop(0, 'rgba(0,0,0,0)');
  bg.addColorStop(0.5, `rgba(120,6,8,${0.12 + A.bass * 0.22 + hexLock * 0.35})`);
  bg.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = bg; c.fillRect(0, barY - barH, W, barH * 2);

  // ---- the name resolving out of the noise
  const lock = Math.max(hexLock, 0.14 + A.level * 0.2);
  drawTunox(c, CX, barY, S * 0.14, {
    fill: `rgba(255,${Math.round(20 + hexLock * 170)},${Math.round(16 + hexLock * 150)},${0.35 + lock * 0.65})`,
    glow: 'rgba(255,20,14,0.9)', blur: S * 0.06,
    jitter: (1 - hexLock) * S * 0.012 + hexTear * S * 0.02,
    track: S * 0.038, scaleY: 1.16,
  });
  // RGB-split ghosts while it's still unstable
  if (hexLock < 0.75) {
    const sp = (1 - hexLock) * S * 0.012;
    for (const [dx, col] of [[-sp, 'rgba(255,0,0,0.30)'], [sp, 'rgba(120,0,255,0.16)']]) {
      drawTunox(c, CX + dx, barY, S * 0.14, { fill: col, track: S * 0.038, scaleY: 1.16, alpha: 0.7 });
    }
  }

  if (hexTear > 0.55) { c.fillStyle = `rgba(255,255,255,${(hexTear - 0.55) * 0.4})`; c.fillRect(0, 0, W, H); }
  grime(c, S, 0.16, 0.3, 0.86);
}

/* =====================================================================
   RENDER LOOP  +  bloom composite
   ===================================================================== */
const MODES = [
  modeAurora, modeSpectrum, modeTunnel, modeGalaxy, modeSynth, modeKaleido, modeLiquid, modeScope,
  modeTerrain, modeRings, modeRays, modeMatrix, modeLissajous, modeWeb, modeVortex, modePlasma,
  modeStrobe, modeLasers, modePillars, modeHypno, modeSiren, modeGlitch, modeCassette,
  modeFireflies, modeJellyfish, modeHelix, modeRadar, modeSkyline, modeFireworks, modeInferno, modeOrbits,
  modeBunker, modePress, modeBlackout, modeTesla, modeShaft,
  modeMonolith, modeGrinder, modeSentinel, modeRazor,
  modeSigil, modeThorns, modeCrucible, modeHooks, modeRitual,
  modeVein, modeCathedral, modeBarbwire, modeRust, modeHexcode,
];
const NAMES = [
  'AURORA', 'SPECTRUM', 'TUNNEL', 'GALAXY', 'SYNTHWAVE', 'KALEIDO', 'LIQUID', 'SCOPE',
  'TERRAIN', 'RINGS', 'RAYS', 'MATRIX', 'LISSAJOUS', 'WEB', 'VORTEX', 'PLASMA',
  'STROBE', 'LASERS', 'PILLARS', 'HYPNO', 'SIREN', 'GLITCH', 'CASSETTE',
  'FIREFLIES', 'JELLYFISH', 'HELIX', 'RADAR', 'SKYLINE', 'FIREWORKS', 'INFERNO', 'ORBITS',
  'BUNKER', 'PRESS', 'BLACKOUT', 'TESLA', 'SHAFT',
  'MONOLITH', 'GRINDER', 'SENTINEL', 'RAZOR',
  'SIGIL', 'THORNS', 'CRUCIBLE', 'HOOKS', 'RITUAL',
  'VEIN', 'CATHEDRAL', 'BARBWIRE', 'RUST', 'HEXCODE',
];
let mode = 0;
let running = false;

function setMode(m) {
  if (m !== mode) startTransition();      // dissolve the outgoing scene into the new one
  mode = m;
  modeBadge.textContent = NAMES[m];
  sceneBtnLabel.textContent = NAMES[m];
  [...modeSwitch.children].forEach((b, i) => b.classList.toggle('active', i === m));
  // hard clear so trails from previous mode don't linger
  sctx.clearRect(0, 0, W, H);
  sctx.fillStyle = '#05060c'; sctx.fillRect(0, 0, W, H);
}

/* =====================================================================
   SMART SHUFFLE — auto-cycles scenes, reacting to the song's structure.
   • Sections: watches a fast vs. slow energy envelope; a sustained swing
     (drop / build / breakdown) cues a change. A min-hold kills flicker,
     a max-hold guarantees it never sits on one scene too long.
   • Picks are energy-matched (calm parts → calm scenes, drops → intense
     ones) and never repeat the last few.
   • Changes snap onto the next detected beat.
   • Seeded RNG + song-time clock: an offline export is self-consistent
     (re-rendering the same file gives the same scene sequence) and closely
     tracks the live preview's feel. It isn't frame-identical to a live pass
     — live uses the real-time AnalyserNode, export its own offline FFT.
   ===================================================================== */
// the 50 scenes grouped by visual energy (indices into MODES / NAMES)
const SCENE_TIERS = {
  calm:    [0, 3, 6, 8, 12, 19, 23, 24, 30, 36, 48],        // Aurora Galaxy Liquid Terrain Lissajous Hypno Fireflies Jellyfish Orbits Monolith Rust
  mid:     [1, 2, 4, 5, 7, 9, 13, 18, 20, 22, 25, 26, 27, 34, 38, 40, 43, 44, 45, 46],  // Spectrum Tunnel Synthwave Kaleido Scope Rings Web Pillars Siren Cassette Helix Radar Skyline Tesla Sentinel Sigil Hooks Ritual Vein Cathedral
  intense: [10, 11, 14, 15, 16, 17, 21, 28, 29, 31, 32, 33, 35, 37, 39, 41, 42, 47, 49],  // Rays Matrix Vortex Plasma Strobe Lasers Glitch Fireworks Inferno Bunker Press Blackout Shaft Grinder Razor Thorns Crucible Barbwire Hexcode
};

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const shuffle = {
  on: false,
  seed: 1,
  rng: Math.random,
  slow: 0, fast: 0, peak: 0,     // loudness envelopes (ratio-based → intensity-independent)
  sB: 0, sM: 0, sT: 0,           // slow timbral balance (bass/mid/treble fractions)
  fB: 0, fM: 0, fT: 0,           // fast timbral balance
  quiet: 0,                      // s spent near silence (for new-track / drop detection)
  armed: true,                   // re-armed once novelty settles → one trigger per event
  lastT: -1,                     // song time of previous frame (-1 = uninitialised)
  lastChangeT: 0,                // song time of last scene change
  pending: false, pendingSince: 0,
  recent: [],                    // recent scene indices, to avoid repeats
  minHold: 4.5,                  // s — floor between changes (kills flicker)
  maxHold: 20,                   // s — ceiling (always eventually moves on)
  beatSnap: 0.55,                // s — once a change is cued, wait up to this for a beat
  sens: 0.28,                    // novelty threshold (energy swing + timbral shift)
  cueReason: '',                 // why the last change fired: section | reentry | max
};

function resetShuffle() {
  shuffle.rng = mulberry32((shuffle.seed >>> 0) || 1);
  shuffle.slow = shuffle.fast = shuffle.peak = 0;
  shuffle.sB = shuffle.sM = shuffle.sT = shuffle.fB = shuffle.fM = shuffle.fT = 0;
  shuffle.quiet = 0; shuffle.armed = true;
  shuffle.lastT = -1;
  shuffle.lastChangeT = 0;
  shuffle.pending = false;
  shuffle.cueReason = '';
  shuffle.recent = [mode];
}

// current energy bucket, relative to the song's running peak
function shuffleTier() {
  const rel = shuffle.peak > 0.02 ? shuffle.slow / shuffle.peak : 0;
  if (rel < 0.40) return 'calm';
  if (rel < 0.72) return 'mid';
  return 'intense';
}

function doShuffleChange(t) {
  const tier = shuffleTier();
  let pool = SCENE_TIERS[tier].filter(m => m !== mode && !shuffle.recent.includes(m));
  if (!pool.length) pool = SCENE_TIERS[tier].filter(m => m !== mode);
  if (!pool.length) pool = MODES.map((_, i) => i).filter(i => i !== mode);
  const pick = pool[Math.floor(shuffle.rng() * pool.length)] ?? mode;
  setMode(pick);
  shuffle.recent.push(pick);
  while (shuffle.recent.length > 4) shuffle.recent.shift();
  shuffle.lastChangeT = t;
  shuffle.pending = false;
  // adopt the new section as the baseline so novelty still settling from the transition
  // we just reacted to can't immediately fire a second change once min-hold elapses
  shuffle.slow = shuffle.fast;
  shuffle.sB = shuffle.fB; shuffle.sM = shuffle.fM; shuffle.sT = shuffle.fT;
  autoOverlayOnChange(t);
}

// in shuffle, occasionally launch (or clear) a video overlay on strong musical events
function autoOverlayOnChange(t) {
  if (offlineActive || !overlays.auto || !overlays.slots.length || !isPlaying()) return;
  const tier = shuffleTier();
  const chance = shuffle.cueReason === 'reentry' ? 0.9
               : shuffle.cueReason === 'section' ? (tier === 'intense' ? 0.65 : tier === 'mid' ? 0.4 : 0.18)
               : 0.12;                                          // 'max' safety timer — rarely
  if (Math.random() < chance) {
    const pool = overlays.slots.map((_, i) => i).filter(i => i !== overlays.active);
    if (!pool.length) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    overlayStart(pick);
    const v = overlays.slots[pick].video;
    if (v && overlays.slots[pick].mode !== 'once') v.loop = true;   // loop through its hold window
    overlays.autoActive = true;
    overlays.autoUntil = t + 6 + Math.random() * 10;               // hold 6–16 s
  } else if (overlays.active >= 0 && overlays.autoActive && Math.random() < 0.45) {
    overlayStop(overlays.active);                                  // sometimes clear for contrast
  }
}

// once per frame, from both the live loop and the offline encoder
function updateShuffle(t) {
  if (!shuffle.on) return;
  if (automations.mode && automations.mode.length) return;   // a keyframed Scene track wins
  if (shuffle.lastT < 0) { shuffle.lastT = t; shuffle.lastChangeT = t; }
  const dt = Math.max(0, Math.min(t - shuffle.lastT, 0.1));   // clamp seeks / tab-away
  shuffle.lastT = t;
  if (dt === 0) return;                                       // paused

  // an auto-launched overlay that has outlived its hold window clears itself
  if (overlays.auto && overlays.autoActive && overlays.active >= 0 && t > overlays.autoUntil && !offlineActive) overlayStop(overlays.active);

  // fps-independent smoothing (time constants in seconds)
  const aSlow = 1 - Math.exp(-dt / 2.5);
  const aFast = 1 - Math.exp(-dt / 0.3);

  // loudness envelopes — drive the energy tier + build/drop detection
  shuffle.slow += (A.level - shuffle.slow) * aSlow;
  shuffle.fast += (A.level - shuffle.fast) * aFast;
  shuffle.peak = Math.max(shuffle.slow, shuffle.peak * Math.exp(-dt / 30));

  // timbral balance (loudness-independent) — catches "vibe" shifts at steady energy
  const tot = A.bass + A.mid + A.treble + 1e-3;
  const nb = A.bass / tot, nm = A.mid / tot, nt = A.treble / tot;
  shuffle.sB += (nb - shuffle.sB) * aSlow; shuffle.fB += (nb - shuffle.fB) * aFast;
  shuffle.sM += (nm - shuffle.sM) * aSlow; shuffle.fM += (nm - shuffle.fM) * aFast;
  shuffle.sT += (nt - shuffle.sT) * aSlow; shuffle.fT += (nt - shuffle.fT) * aFast;

  // novelty = relative energy swing  +  timbral change between fast/slow profiles
  const eDev = shuffle.slow > 0.02 ? Math.abs(shuffle.fast - shuffle.slow) / shuffle.slow : 0;
  const tDev = Math.abs(shuffle.fB - shuffle.sB) + Math.abs(shuffle.fM - shuffle.sM) + Math.abs(shuffle.fT - shuffle.sT);
  const novelty = eDev * 0.7 + tDev * 2.4;

  // re-entry after near-silence = new track / post-breakdown drop. One threshold so the
  // "was quiet" flag survives until the level actually jumps back up (the crossing frame).
  const wasQuiet = shuffle.quiet > 0.5;
  const loud = shuffle.fast >= 0.10;
  if (!loud) shuffle.quiet += dt; else shuffle.quiet = 0;
  const reentry = wasQuiet && loud;

  // re-arm once novelty settles, so each musical event triggers at most once
  if (novelty < shuffle.sens * 0.6) shuffle.armed = true;

  // pick a cue; only a section change consumes the arm, and only when it can actually fire
  // (so a novelty spike during the min-hold window doesn't silently waste the arm)
  const held = t - shuffle.lastChangeT;
  let cue = false, reason = '';
  if (held >= shuffle.maxHold) { cue = true; reason = 'max'; }                          // safety ceiling
  else if (reentry && held >= shuffle.minHold * 0.4) { cue = true; reason = 'reentry'; } // new track / drop after silence
  else if (shuffle.armed && novelty > shuffle.sens && held >= shuffle.minHold) {
    cue = true; reason = 'section'; shuffle.armed = false;                              // musical section change
  }

  if (!shuffle.pending && cue) { shuffle.pending = true; shuffle.pendingSince = t; shuffle.cueReason = reason; }
  if (shuffle.pending && (A.beatHit || t - shuffle.pendingSince >= shuffle.beatSnap)) {
    doShuffleChange(t);
  }
}

function setShuffle(v) {
  shuffle.on = !!v;
  if (shuffle.on) { shuffle.seed = (Date.now() >>> 0) || 1; resetShuffle(); }
  shuffleBtn.classList.toggle('active', shuffle.on);
  modeBadge.classList.toggle('shuffling', shuffle.on);
}
function toggleShuffle() { setShuffle(!shuffle.on); }

// a manual scene pick (click / number key / palette) takes back control
function userSetMode(m) { if (shuffle.on) setShuffle(false); setMode(m); }

// scene (+ bloom) -> a target context, scaled to its canvas size
function composite(outCtx, outW, outH) {
  const blur = post.blur > 0 ? `blur(${(post.blur * outW / 1920).toFixed(2)}px)` : 'none';
  outCtx.setTransform(1, 0, 0, 1, 0, 0);
  outCtx.globalCompositeOperation = 'source-over';
  outCtx.globalAlpha = 1;
  outCtx.clearRect(0, 0, outW, outH);
  outCtx.filter = blur;
  outCtx.drawImage(scene, 0, 0, outW, outH);

  // cheap bloom: blur a half-res copy, add it back
  bctx.setTransform(1, 0, 0, 1, 0, 0);
  bctx.globalCompositeOperation = 'source-over';
  bctx.globalAlpha = 1;
  bctx.clearRect(0, 0, bloom.width, bloom.height);
  bctx.filter = 'blur(6px)';
  bctx.drawImage(scene, 0, 0, bloom.width, bloom.height);
  bctx.filter = 'none';

  outCtx.globalCompositeOperation = 'lighter';
  outCtx.globalAlpha = 0.85;
  outCtx.filter = blur;
  outCtx.drawImage(bloom, 0, 0, outW, outH);
  outCtx.filter = 'none';
  outCtx.globalAlpha = 1;
  outCtx.globalCompositeOperation = 'source-over';

  drawPost(outCtx, outW, outH);
}

// strobes + fade in/out, drawn on top of everything
function drawPost(c, w, h) {
  const fa = Math.max(fadeAlpha(), liveFadeAlpha());
  if (post.flashB > 0.01) { c.fillStyle = `rgba(0,0,0,${Math.min(1, post.flashB)})`; c.fillRect(0, 0, w, h); }
  if (post.flashW > 0.01) {
    c.globalCompositeOperation = 'lighter';
    c.fillStyle = `rgba(255,255,255,${Math.min(1, post.flashW)})`; c.fillRect(0, 0, w, h);
    c.globalCompositeOperation = 'source-over';
  }
  if (fa > 0) { c.fillStyle = `rgba(0,0,0,${fa})`; c.fillRect(0, 0, w, h); }
}

/* =====================================================================
   SCENE TRANSITIONS — a snapshot of the outgoing scene is dissolved / wiped
   over the incoming one. Covers manual, shuffle and keyframed changes, both
   live and offline. Time-based (dtSec) so exports stay deterministic.
   ===================================================================== */
let dtSec = 1 / 60;            // seconds since the last rendered frame
let lastFrameNow = 0;
const trans = {
  type: 'crossfade',          // none | crossfade | dip | wipe | slide | zoom
  dur: 0.5,                   // seconds
  active: false, t: 0,
  snap: document.createElement('canvas'),
};
const tctx = trans.snap.getContext('2d');
const easeInOut = p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

// grab the outgoing frame (the scene buffer still holds the last drawn frame)
function startTransition() {
  if (!started || trans.type === 'none' || trans.dur <= 0) return;
  if (!scene.width || !scene.height) return;
  trans.snap.width = scene.width; trans.snap.height = scene.height;
  tctx.setTransform(1, 0, 0, 1, 0, 0);
  tctx.clearRect(0, 0, trans.snap.width, trans.snap.height);
  tctx.drawImage(scene, 0, 0);
  trans.active = true; trans.t = 0;
}

// blend that snapshot over the freshly composited output (snap is the same
// pixel size as the output, so source/dest coords line up 1:1)
function applyTransition(c, w, h) {
  trans.t += dtSec;
  const p = trans.dur > 0 ? Math.min(1, trans.t / trans.dur) : 1;
  if (p >= 1) trans.active = false;
  const e = easeInOut(p), snap = trans.snap;
  c.save();
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.globalCompositeOperation = 'source-over';
  if (trans.type === 'dip') {                          // old → black → new
    if (p < 0.5) { c.globalAlpha = 1; c.drawImage(snap, 0, 0, w, h); }
    c.globalAlpha = 1 - Math.abs(2 * p - 1);
    c.fillStyle = '#000'; c.fillRect(0, 0, w, h);
  } else if (trans.type === 'wipe') {                  // new revealed from the left
    const x = e * w;
    c.globalAlpha = 1;
    if (w - x > 0.5) c.drawImage(snap, x, 0, w - x, h, x, 0, w - x, h);
  } else if (trans.type === 'slide') {                 // old slides off to the left
    c.globalAlpha = 1; c.drawImage(snap, -e * w, 0, w, h);
  } else if (trans.type === 'zoom') {                  // old zooms out + fades
    const s = 1 + e * 0.35;
    c.globalAlpha = 1 - e;
    c.drawImage(snap, (w - w * s) / 2, (h - h * s) / 2, w * s, h * s);
  } else {                                             // crossfade (default)
    c.globalAlpha = 1 - e; c.drawImage(snap, 0, 0, w, h);
  }
  c.restore();
}

// render the active scene + overlay into the scene buffer, then composite out
function drawFrameInto(outCtx, outW, outH) {
  MODES[mode](sctx);
  drawActiveOverlay(sctx);
  drawOverlay(sctx);
  drawLyrics(sctx);
  composite(outCtx, outW, outH);
  if (trans.active) applyTransition(outCtx, outW, outH);
}

function loop() {
  if (!running) return;
  requestAnimationFrame(loop);
  const now = performance.now();
  if (maxFps > 0 && lastFrameNow && (now - lastFrameNow) < (1000 / maxFps) - 1) return;   // frame-rate cap
  frame++;
  dtSec = lastFrameNow ? Math.min(0.1, (now - lastFrameNow) / 1000) : 1 / 60;
  lastFrameNow = now;
  analyze();
  hue = (hue + 0.25 + A.treble * 1.5) % 360;
  renderTime = (audioEl && !isMic) ? audioEl.currentTime : 0;
  renderDur = (audioEl && !isMic && isFinite(audioEl.duration)) ? audioEl.duration : 0;
  // live input has no song timeline — the scrubber becomes an elapsed-set clock
  if (isMic) {
    if (!liveStartMs) { liveStartMs = now; controls.classList.add('live'); }
    curTime.textContent = fmt((now - liveStartMs) / 1000);
  } else if (liveStartMs) {
    liveStartMs = 0; controls.classList.remove('live');
  }
  if (audioEl && !isMic) applyAutomation(audioEl.currentTime);
  // shuffle clock: song time for files (freezes on pause, stays deterministic for
  // export); wall-clock for live mic input, which has no song timeline
  updateShuffle((audioEl && !isMic) ? renderTime : performance.now() / 1000);
  post.flashW *= 0.82; post.flashB *= 0.82;
  if (holdFlash.white) post.flashW = 1;            // sustained while key held
  if (holdFlash.black) post.flashB = 1;
  drawFrameInto(ctx, stage.width, stage.height);
}

function startLoop() { if (!running) { running = true; loop(); } }

/* =====================================================================
   OFFLINE RENDER — frame-perfect, faster-than-realtime, fixed resolution.
   WebCodecs (VideoEncoder/AudioEncoder) + webm-muxer. Frequency data is
   computed per frame from the decoded PCM via a manual FFT (the live
   AnalyserNode only exposes "now").
   ===================================================================== */
let offlineActive = false, offlineCancel = false;

function webcodecsReady() {
  return typeof VideoEncoder !== 'undefined' && typeof AudioEncoder !== 'undefined' &&
    typeof VideoFrame !== 'undefined' && typeof AudioData !== 'undefined' &&
    (typeof Mp4Muxer !== 'undefined' || typeof WebMMuxer !== 'undefined');
}

// iterative radix-2 FFT (in-place)
function fft(re, im) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) { const tr = re[i]; re[i] = re[j]; re[j] = tr; const ti = im[i]; im[i] = im[j]; im[j] = ti; }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = -2 * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0;
      for (let k = 0; k < len / 2; k++) {
        const a = i + k, b = a + len / 2;
        const tr = cr * re[b] - ci * im[b], ti = cr * im[b] + ci * re[b];
        re[b] = re[a] - tr; im[b] = im[a] - ti;
        re[a] += tr; im[a] += ti;
        const ncr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = ncr;
      }
    }
  }
}

// fills global freq/time + A for any time t, mimicking the AnalyserNode
function makeOfflineAnalyzer(buffer) {
  const ch = buffer.numberOfChannels, len = buffer.length, sr = buffer.sampleRate;
  const mono = new Float32Array(len);
  for (let c = 0; c < ch; c++) { const d = buffer.getChannelData(c); for (let i = 0; i < len; i++) mono[i] += d[i] / ch; }
  const N = analyser ? analyser.fftSize : 2048;
  const hann = new Float32Array(N);
  for (let i = 0; i < N; i++) hann[i] = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / (N - 1));
  const re = new Float32Array(N), im = new Float32Array(N), smooth = new Float32Array(N / 2);
  const minDb = -90, maxDb = -10, sm = 0.82;
  return function sampleAt(t) {
    const end = Math.floor(t * sr), start = end - N + 1;
    for (let i = 0; i < N; i++) {
      const idx = start + i;
      const s = (idx >= 0 && idx < len) ? mono[idx] : 0;
      re[i] = s * hann[i]; im[i] = 0;
      time[i] = Math.max(0, Math.min(255, Math.round(128 + s * 128)));
    }
    fft(re, im);
    for (let k = 0; k < N / 2; k++) {
      let mag = Math.sqrt(re[k] * re[k] + im[k] * im[k]) / N;
      mag = sm * smooth[k] + (1 - sm) * mag; smooth[k] = mag;
      const db = 20 * Math.log10(mag || 1e-12);
      freq[k] = Math.max(0, Math.min(255, Math.round(255 * (db - minDb) / (maxDb - minDb))));
    }
    computeBands();
  };
}

async function pickVideoCodec(container, w, h, fps, bitrate) {
  const list = container === 'mp4'
    ? ['avc1.640034', 'avc1.640033', 'avc1.640032', 'avc1.64002A', 'avc1.640028', 'avc1.4D4028', 'avc1.42E01F']
    : ['vp09.00.51.08', 'vp09.00.50.08', 'vp09.00.41.08', 'vp09.00.40.08', 'vp09.00.31.08', 'vp09.00.30.08', 'vp09.00.20.08', 'vp09.00.10.08'];
  for (const codec of list) {
    const cfg = { codec, width: w, height: h, bitrate, framerate: fps };
    if (container === 'mp4') cfg.avc = { format: 'avc' };
    try { const s = await VideoEncoder.isConfigSupported(cfg); if (s && s.supported) return codec; } catch (e) {}
  }
  return null;
}

function beginOfflineRender(tw, th) {
  const saved = { scene, sctx, bloom, bctx, W, H, CX, CY, DPR };
  const sc = document.createElement('canvas'); sc.width = tw; sc.height = th;
  const bl = document.createElement('canvas'); bl.width = Math.max(2, Math.floor(tw / 2)); bl.height = Math.max(2, Math.floor(th / 2));
  const out = document.createElement('canvas'); out.width = tw; out.height = th;
  scene = sc; sctx = sc.getContext('2d');
  bloom = bl; bctx = bl.getContext('2d');
  W = tw; H = th; CX = tw / 2; CY = th / 2; DPR = 1;
  sctx.setTransform(1, 0, 0, 1, 0, 0);
  buildStars();
  const outCtx = out.getContext('2d');
  return {
    out, outCtx,
    restore() {
      scene = saved.scene; sctx = saved.sctx; bloom = saved.bloom; bctx = saved.bctx;
      W = saved.W; H = saved.H; CX = saved.CX; CY = saved.CY; DPR = saved.DPR;
      resize();
    },
  };
}

function resetVisualState() {
  hue = 200; frame = 0;
  particles.length = 0; rings.length = 0; terrainHist.length = 0;
  mtxCols = []; webNodes = [];
  raysRot = 0; vortexRot = 0; tunnelRot = 0; kaleoRot = 0; synthScroll = 0; lasersRot = 0; gridScan = 0; hypnoRot = 0; sirenRot = 0;
  beatCooldown = 0; A.beat = 0; fluxHist.fill(0); fluxIdx = 0; prevSpec = null;
  post.flashW = 0; post.flashB = 0;
  trans.active = false;
  buildStars();
}

function encodeAudioBuffer(aenc, buffer, numCh, headSec = 0) {
  const sr = buffer.sampleRate, total = buffer.length, block = 2048;
  const headUs = Math.round(headSec * 1e6);
  const chans = [];
  for (let c = 0; c < numCh; c++) chans.push(buffer.getChannelData(c));
  // leading silence so audio lines up after the video headroom
  if (headSec > 0) {
    let done = 0, headN = Math.round(headSec * sr);
    while (done < headN) {
      const n = Math.min(block, headN - done);
      const ad = new AudioData({ format: 'f32-planar', sampleRate: sr, numberOfFrames: n, numberOfChannels: numCh, timestamp: Math.round(done / sr * 1e6), data: new Float32Array(n * numCh) });
      aenc.encode(ad); ad.close(); done += n;
    }
  }
  for (let off = 0; off < total; off += block) {
    const n = Math.min(block, total - off);
    const data = new Float32Array(n * numCh);              // planar layout
    for (let c = 0; c < numCh; c++) data.set(chans[c].subarray(off, off + n), c * n);
    const ad = new AudioData({ format: 'f32-planar', sampleRate: sr, numberOfFrames: n, numberOfChannels: numCh, timestamp: headUs + Math.round(off / sr * 1e6), data });
    aenc.encode(ad); ad.close();
  }
}

function downloadBlob(blob, name) {
  if (IN_PLUGIN && blob && blob.size <= 32 * 1024 * 1024) { pluginSaveBlob(blob, name); return; }  // small files → native save dialog
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 3000);
}

async function encodeOffline(w, h, fps, opts, onProgress) {
  const container = opts.container || 'mp4';
  const bpp = opts.bpp || 0.2;
  const ab = await currentFile.arrayBuffer();
  const buffer = await actx.decodeAudioData(ab.slice(0));
  const head = headroom;                                   // seconds of black/silence before the song
  const totalFrames = Math.max(1, Math.ceil((buffer.duration + head) * fps));
  const numCh = Math.min(buffer.numberOfChannels, 2);
  // bits-per-pixel-per-frame → bitrate dos juevos
  const bitrate = Math.max(6e6, Math.min(120e6, Math.round(w * h * fps * bpp)));

  const codec = await pickVideoCodec(container, w, h, fps, bitrate);
  if (!codec) throw new Error((container === 'mp4' ? 'H.264' : 'VP9') + ' encoding is not supported here.');

  let muxer;
  if (container === 'mp4') {
    muxer = new Mp4Muxer.Muxer({
      target: new Mp4Muxer.ArrayBufferTarget(),
      video: { codec: 'avc', width: w, height: h },
      audio: { codec: 'aac', numberOfChannels: numCh, sampleRate: buffer.sampleRate },
      fastStart: 'in-memory',
    });
  } else {
    muxer = new WebMMuxer.Muxer({
      target: new WebMMuxer.ArrayBufferTarget(),
      video: { codec: 'V_VP9', width: w, height: h, frameRate: fps },
      audio: { codec: 'A_OPUS', numberOfChannels: numCh, sampleRate: buffer.sampleRate },
      firstTimestampBehavior: 'offset',
    });
  }

  const venc = new VideoEncoder({ output: (c, m) => muxer.addVideoChunk(c, m), error: e => console.error('venc', e) });
  const vcfg = { codec, width: w, height: h, bitrate, framerate: fps, latencyMode: 'quality' };
  if (container === 'mp4') vcfg.avc = { format: 'avc' };
  venc.configure(vcfg);

  const aenc = new AudioEncoder({ output: (c, m) => muxer.addAudioChunk(c, m), error: e => console.error('aenc', e) });
  aenc.configure({ codec: container === 'mp4' ? 'mp4a.40.2' : 'opus', numberOfChannels: numCh, sampleRate: buffer.sampleRate, bitrate: 256000 });

  const sampleAt = makeOfflineAnalyzer(buffer);
  const gop = Math.max(1, Math.round(fps * 2));
  dtSec = 1 / fps;                          // fixed step → deterministic transitions in export
  const r = beginOfflineRender(w, h);
  resetVisualState();
  if (shuffle.on) resetShuffle();          // deterministic shuffle pass from t=0
  renderDur = buffer.duration;
  try {
    for (let i = 0; i < totalFrames; i++) {
      if (offlineCancel) throw new Error('cancelled');
      const songT = i / fps - head;                        // negative during headroom
      renderTime = songT;
      sampleAt(Math.max(0, songT));                        // silence-ish before song start
      if (songT < 0) { A.bass = A.mid = A.treble = A.level = A.beat = 0; A.beatHit = false; }
      hue = (hue + 0.25 + A.treble * 1.5) % 360;
      frame++;
      applyAutomation(Math.max(0, songT));
      updateShuffle(songT);
      post.flashW *= 0.82; post.flashB *= 0.82;
      drawFrameInto(r.outCtx, w, h);
      const vf = new VideoFrame(r.out, { timestamp: Math.round(i * 1e6 / fps), duration: Math.round(1e6 / fps) });
      venc.encode(vf, { keyFrame: i % gop === 0 });
      vf.close();
      while (venc.encodeQueueSize > 12) await new Promise(res => setTimeout(res, 0));
      if ((i & 3) === 0) { onProgress(i / totalFrames * 0.92); await new Promise(res => setTimeout(res, 0)); }
    }
    encodeAudioBuffer(aenc, buffer, numCh, head);          // audio starts after the headroom
    onProgress(0.96);
    await venc.flush();
    await aenc.flush();
    muxer.finalize();
    const ext = container === 'mp4' ? 'mp4' : 'webm';
    downloadBlob(new Blob([muxer.target.buffer], { type: container === 'mp4' ? 'video/mp4' : 'video/webm' }),
      `${(trackName.textContent || 'visualizer').replace(/[^\w.-]+/g, '_')}_${h}p${fps}.${ext}`);
    onProgress(1);
  } finally {
    try { venc.close(); } catch (e) {}
    try { aenc.close(); } catch (e) {}
    r.restore();
  }
}

async function startOffline(w, h, fps, opts) {
  if (!currentFile) { alert('Offline render needs a loaded audio file (mic input is not supported).'); return; }
  if (!webcodecsReady()) { alert('Offline render needs WebCodecs (Chrome / Edge 94+). Use Real-time instead.'); return; }
  if (opts.container === 'mp4' && typeof Mp4Muxer === 'undefined') { alert('MP4 muxer failed to load — pick WebM, or check vendor/mp4-muxer.js.'); return; }
  if (opts.container === 'webm' && typeof WebMMuxer === 'undefined') { alert('WebM muxer failed to load — pick MP4, or check vendor/webm-muxer.js.'); return; }
  if (offlineActive) return;
  offlineActive = true; offlineCancel = false;
  const wasPlaying = audioEl && !audioEl.paused;
  running = false;                     // stop the live loop so it doesn't fight the swapped buffers
  if (audioEl) audioEl.pause();
  setPlayIcon(false);
  expSetBusy(true);
  try {
    await encodeOffline(w, h, fps, opts, setExpProgress);
  } catch (e) {
    if (e.message !== 'cancelled') { console.error(e); alert('Offline render failed: ' + e.message); }
  } finally {
    offlineActive = false;
    expSetBusy(false);
    startLoop();
    if (wasPlaying) play();
  }
}

/* =====================================================================
   VIDEO EXPORT — canvas.captureStream + audio tap → MediaRecorder.
   Real-time: restarts the song at 0, records the full track (with all
   overlay + automation), auto-saves on end. Output = canvas only.
   ===================================================================== */
let recorder = null, recChunks = [], mediaDest = null, recVStream = null, recTimer = null, recStart = 0, recording = false;

function ensureRecDest() {
  if (mediaDest || !actx) return;
  mediaDest = actx.createMediaStreamDestination();
  recTap.connect(mediaDest);          // captures whatever source is active (file or live)
}
function pickRecMime() {
  const types = [
    'video/mp4;codecs=avc1.640029,mp4a.40.2',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
  ];
  for (const t of types) if (MediaRecorder.isTypeSupported(t)) return t;
  return '';
}

function startExport() {
  if (!actx) { alert('Load a track first.'); return; }
  if (!window.MediaRecorder || !stage.captureStream) {
    alert('Video export needs a Chromium browser (Chrome / Edge) or recent Firefox.');
    return;
  }
  ensureRecDest();

  recVStream = stage.captureStream(60);
  const stream = new MediaStream();
  recVStream.getVideoTracks().forEach(t => stream.addTrack(t));
  mediaDest.stream.getAudioTracks().forEach(t => stream.addTrack(t));

  const mime = pickRecMime();
  const opts = { videoBitsPerSecond: 16e6, audioBitsPerSecond: 192000 };
  if (mime) opts.mimeType = mime;
  recChunks = [];
  try { recorder = new MediaRecorder(stream, opts); }
  catch (e) { try { recorder = new MediaRecorder(stream); } catch (e2) { alert('Could not start recording.'); return; } }

  recorder.ondataavailable = e => { if (e.data && e.data.size) recChunks.push(e.data); };
  recorder.onstop = () => {
    const type = recorder.mimeType || mime || 'video/webm';
    const ext = type.includes('mp4') ? 'mp4' : 'webm';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(recChunks, { type }));
    a.download = (trackName.textContent || 'visualizer').replace(/[^\w.-]+/g, '_') + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    if (recVStream) { recVStream.getTracks().forEach(t => t.stop()); recVStream = null; }
    finishRecUI();
  };

  recording = true; recStart = Date.now(); startRecUI();
  recorder.start(1000);

  if (audioEl && !isMic) {
    audioEl.currentTime = 0;
    play();
    audioEl.addEventListener('ended', stopExportOnce, { once: true });
  } else {
    if (actx.state === 'suspended') actx.resume();
    startLoop();
  }
}
function stopExportOnce() { if (recording) stopExport(); }
function stopExport() {
  if (!recording) return;
  recording = false;
  if (audioEl) audioEl.removeEventListener('ended', stopExportOnce);
  try { recorder.stop(); } catch (e) {}
}
function startRecUI() {
  recBtn.classList.add('recording');
  recBtn.title = 'Stop & save video';
  recBadge.classList.remove('hidden');
  recTime.textContent = '0:00';
  recTimer = setInterval(() => { recTime.textContent = fmt((Date.now() - recStart) / 1000); }, 250);
}
function finishRecUI() {
  recBtn.classList.remove('recording');
  recBtn.title = 'Export video — records the full song in real time';
  recBadge.classList.add('hidden');
  clearInterval(recTimer);
}

/* =====================================================================
   UI WIRING
   ===================================================================== */
// drag & drop
['dragenter', 'dragover'].forEach(ev =>
  dropzone.addEventListener(ev, e => { e.preventDefault(); dropzone.classList.add('dragover'); }));
['dragleave', 'dragend'].forEach(ev =>
  dropzone.addEventListener(ev, () => dropzone.classList.remove('dragover')));
const isAudioFile = f => f && (f.type.startsWith('audio') || /\.(wav|wave|mp3|ogg|oga|opus|flac|m4a|aac|weba|webm)$/i.test(f.name));
dropzone.addEventListener('drop', e => {
  e.preventDefault(); dropzone.classList.remove('dragover');
  const f = e.dataTransfer.files[0];
  if (isAudioFile(f)) loadFile(f);
  else if (f) alert('Unsupported file. Drop an audio file (WAV, MP3, OGG, FLAC, M4A…).');
});
window.addEventListener('dragover', e => e.preventDefault());
window.addEventListener('drop', e => { e.preventDefault(); if (IN_PLUGIN) { const f = e.dataTransfer && e.dataTransfer.files[0]; if (isAudioFile(f)) loadFile(f); } });

dropzone.querySelector('.drop-hint').addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', e => { if (e.target.files[0]) loadFile(e.target.files[0]); });
loadBtn.addEventListener('click', () => fileInput.click());
srcBtn.addEventListener('click', openIntro);
introClose.addEventListener('click', closeIntro);
intro.addEventListener('click', e => { if (e.target === intro) closeIntro(); });   // click backdrop to dismiss
micBtn.addEventListener('click', () => IN_PLUGIN ? useFLAudio() : useMic(inputDevice.value || undefined));
sysBtn.addEventListener('click', useSystemAudio);
mixMicBtn.addEventListener('click', () => IN_PLUGIN ? useFLAudio() : useMic(inputDevice.value || undefined));
mixSysBtn.addEventListener('click', useSystemAudio);
inputDevice.addEventListener('change', () => { if (isMic && inputDevice.value) useMic(inputDevice.value); });

playBtn.addEventListener('click', () => (IN_PLUGIN && pluginActive) ? hostTransport('toggle') : toggle());
vol.addEventListener('input', () => { if (gain) gain.gain.value = vol.value / 100; });

seek.addEventListener('input', () => { if (isMic) return; seeking = true; if (audioEl) curTime.textContent = fmt(seek.value / 1000 * audioEl.duration); });
seek.addEventListener('change', () => {
  if (isMic) return;
  if (audioEl && audioEl.duration) audioEl.currentTime = seek.value / 1000 * audioEl.duration;
  seeking = false;
});

// scene picker — options generated from NAMES so new scenes show up automatically
modeSwitch.innerHTML = NAMES.map((n, i) =>
  `<button data-mode="${i}" class="m${i ? '' : ' active'}" type="button" role="option"><span class="k">${i + 1}</span>${n}</button>`).join('');

function openScenePop(open) {
  modeSwitch.classList.toggle('hidden', !open);
  sceneBtn.classList.toggle('open', open);
  sceneBtn.setAttribute('aria-expanded', open);
  if (open) modeSwitch.querySelector('.m.active')?.scrollIntoView({ block: 'nearest' });
}
sceneBtn.addEventListener('click', () => openScenePop(modeSwitch.classList.contains('hidden')));
document.addEventListener('click', e => {
  if (!modeSwitch.classList.contains('hidden') && !sceneSelect.contains(e.target)) openScenePop(false);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modeSwitch.classList.contains('hidden')) openScenePop(false);
  else if (e.key === 'Escape' && started && !intro.classList.contains('hidden')) closeIntro();
});
modeSwitch.addEventListener('click', e => {
  const b = e.target.closest('button[data-mode]');
  if (b) { userSetMode(+b.dataset.mode); openScenePop(false); }
});

shuffleBtn.addEventListener('click', toggleShuffle);

fsBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
});

// ----- export panel -----
recBtn.addEventListener('click', () => {
  if (recording) { stopExport(); return; }
  exportPanel.classList.toggle('hidden');
  if (!webcodecsReady()) {
    // force real-time if WebCodecs/muxer unavailable
    [...expMode.children].forEach(b => b.classList.toggle('active', b.dataset.m === 'live'));
    syncExpNote();
  }
});
exportClose.addEventListener('click', () => exportPanel.classList.add('hidden'));

function segPick(group, target) { [...group.children].forEach(b => b.classList.toggle('active', b === target)); }
const segActive = group => [...group.children].find(b => b.classList.contains('active'));

expMode.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { segPick(expMode, b); syncExpNote(); } });
expRes.addEventListener('click', e => { const b = e.target.closest('button'); if (b) segPick(expRes, b); });
expFps.addEventListener('click', e => { const b = e.target.closest('button'); if (b) segPick(expFps, b); });
expHead.addEventListener('click', e => { const b = e.target.closest('button'); if (b) segPick(expHead, b); });
expFmt.addEventListener('click', e => { const b = e.target.closest('button'); if (b) segPick(expFmt, b); });
expQual.addEventListener('click', e => { const b = e.target.closest('button'); if (b) segPick(expQual, b); });

function syncExpNote() {
  const m = segActive(expMode).dataset.m;
  expNote.textContent = m === 'offline'
    ? "Renders frame-by-frame at the chosen resolution — no dropped frames, runs as fast as your machine encodes, window size doesn't matter. Output: WebM (VP9 + Opus)."
    : 'Records live in real time (takes the full song length). Resolution follows your window/fullscreen size, not the picker. Tip: press F first.';
}
function setExpProgress(p) { const pct = Math.round(p * 100); expBar.style.width = pct + '%'; expPct.textContent = pct + '%'; }
function expSetBusy(on) {
  expProg.classList.toggle('hidden', !on);
  expStart.classList.toggle('busy', on);
  expStart.textContent = on ? 'Cancel' : 'Start export';
  if (on) setExpProgress(0);
}

expStart.addEventListener('click', () => {
  if (offlineActive) { offlineCancel = true; return; }            // Cancel
  const method = segActive(expMode).dataset.m;
  if (method === 'live') {
    exportPanel.classList.add('hidden');
    startExport();
    return;
  }
  const r = segActive(expRes), fps = +segActive(expFps).dataset.fps;
  headroom = +segActive(expHead).dataset.h;
  const opts = { container: segActive(expFmt).dataset.f, bpp: +segActive(expQual).dataset.q };
  startOffline(+r.dataset.w, +r.dataset.h, fps, opts);
});

// ----- mix & fx panel -----
// side panels are mutually exclusive so they never overlap
function togglePanel(target) {
  const willShow = target.classList.contains('hidden');
  [mixPanel, brandPanel, autoPanel, lyricsPanel, keysPanel, overlaysPanel].forEach(p => p.classList.add('hidden'));
  if (willShow) target.classList.remove('hidden');
}
mixBtn.addEventListener('click', () => togglePanel(mixPanel));
mixClose.addEventListener('click', () => mixPanel.classList.add('hidden'));
lyricsBtn.addEventListener('click', () => togglePanel(lyricsPanel));
lyricsClose.addEventListener('click', () => lyricsPanel.classList.add('hidden'));

// ----- overlays panel -----
overlaysBtn.addEventListener('click', () => togglePanel(overlaysPanel));
overlaysClose.addEventListener('click', () => overlaysPanel.classList.add('hidden'));
ovAddBtn.addEventListener('click', () => ovFile.click());
ovFile.addEventListener('change', e => { for (const f of e.target.files) addOverlayClip(f); ovFile.value = ''; });
ovList.addEventListener('click', e => {
  const row = e.target.closest('.ov-row'); if (!row) return;
  const idx = overlays.slots.findIndex(s => s.id === row.dataset.id); if (idx < 0) return;
  if (e.target.closest('.ov-del')) deleteOverlay(row.dataset.id);
  else if (e.target.closest('.ov-trig')) overlayToggle(idx);
});
ovList.addEventListener('change', e => {
  const row = e.target.closest('.ov-row');
  if (row && e.target.classList.contains('ov-mode')) setOverlayMode(row.dataset.id, e.target.value);
});
// reaching for a clip is intent — jump it to the front of the warm queue so
// it's decoded by the time the click lands
ovList.addEventListener('pointerover', e => {
  const row = e.target.closest('.ov-row');
  if (row) queueWarm(row.dataset.id, true);
});
ovBlend.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { segPick(ovBlend, b); overlays.blend = b.dataset.b; } });
ovFit.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { segPick(ovFit, b); overlays.fit = b.dataset.f; } });
ovOpacity.addEventListener('input', () => { overlays.opacity = ovOpacity.value / 100; ovOpacityVal.textContent = ovOpacity.value + '%'; });
ovReact.addEventListener('input', () => { overlays.react = ovReact.value / 100; ovReactVal.textContent = ovReact.value + '%'; });
ovAuto.addEventListener('change', () => { overlays.auto = ovAuto.checked; if (!overlays.auto && overlays.autoActive && overlays.active >= 0) overlayStop(overlays.active); });
intRange.addEventListener('input', () => { sceneIntensity = intRange.value / 100; intVal.textContent = intRange.value + '%'; });
eqBassRange.addEventListener('input', () => { eqBass = eqBassRange.value / 100; eqBassVal.textContent = eqBassRange.value + '%'; });
eqMidRange.addEventListener('input', () => { eqMid = eqMidRange.value / 100; eqMidVal.textContent = eqMidRange.value + '%'; });
eqTrebleRange.addEventListener('input', () => { eqTreble = eqTrebleRange.value / 100; eqTrebleVal.textContent = eqTrebleRange.value + '%'; });
beatSensRange.addEventListener('input', () => { beatSens = +beatSensRange.value; beatSensVal.textContent = beatSensRange.value; });
blurRange.addEventListener('input', () => { post.blur = +blurRange.value; blurVal.textContent = blurRange.value; });
strobeSeg.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { segPick(strobeSeg, b); post.beatStrobe = b.dataset.s; } });
transType.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { segPick(transType, b); trans.type = b.dataset.x; } });
transDurRange.addEventListener('input', () => { trans.dur = +transDurRange.value; transDurVal.textContent = (+transDurRange.value).toFixed(2) + 's'; });
fadeInRange.addEventListener('input', () => { post.fadeIn = +fadeInRange.value; fadeInVal.textContent = (+fadeInRange.value).toFixed(1) + 's'; });
fadeOutRange.addEventListener('input', () => { post.fadeOut = +fadeOutRange.value; fadeOutVal.textContent = (+fadeOutRange.value).toFixed(1) + 's'; });
liveFadeRange.addEventListener('input', () => { post.liveFade = +liveFadeRange.value; liveFadeVal.textContent = post.liveFade > 0 ? post.liveFade.toFixed(1) + 's' : 'Off'; });
maxFpsRange.addEventListener('input', () => { maxFps = +maxFpsRange.value; maxFpsVal.textContent = maxFps > 0 ? maxFps + ' fps' : 'Uncapped'; });
renderScaleRange.addEventListener('input', () => { renderScale = +renderScaleRange.value / 100; renderScaleVal.textContent = renderScaleRange.value + '%'; resize(); });

// background
bgType.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { segPick(bgType, b); bg.type = b.dataset.t; } });
bgC1.addEventListener('input', () => { bg.c1 = bgC1.value; });
bgC2.addEventListener('input', () => { bg.c2 = bgC2.value; });
bgImgBtn.addEventListener('click', () => bgImg.click());
bgImg.addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  const url = URL.createObjectURL(f);
  loadImg(url).then(im => { bg.img = im; bg.type = 'image'; setSeg(bgType, 't', 'image'); URL.revokeObjectURL(url); });
});
bgImgClear.addEventListener('click', () => { bg.img = null; });

// scene file (full package)
sceneSave.addEventListener('click', () => {
  downloadBlob(new Blob([JSON.stringify(collectScene())], { type: 'application/json' }),
    `${(trackName.textContent || 'scene').replace(/[^\w.-]+/g, '_')}.sonarscene.json`);
});
sceneLoadBtn.addEventListener('click', () => IN_PLUGIN ? hostLoadPreset() : sceneFile.click());
sceneFile.addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => { try { applyScene(JSON.parse(r.result)); } catch (err) { alert('Invalid scene file.'); } };
  r.readAsText(f); sceneFile.value = '';
});

// ----- lyrics panel -----
lyrEnable.addEventListener('change', () => { lyrics.enabled = lyrEnable.checked; });
lyrNext.addEventListener('change', () => { lyrics.showNext = lyrNext.checked; });
lyrApply.addEventListener('click', () => {
  lyrics.lines = lyrText.value.split(/\r?\n/).filter(s => s.trim()).map(s => ({ t: null, text: s.trim() }));
  renderLyrics();
});
lyrStamp.addEventListener('click', () => {
  const i = lyrics.lines.findIndex(l => l.t == null);
  if (i < 0) return;
  let t = curTimeSec(); if (lyrSnap.checked) t = snapToBeat(t);
  lyrics.lines[i].t = +t.toFixed(2);
  renderLyrics();
});
lyrUnstamp.addEventListener('click', () => { lyrics.lines.forEach(l => l.t = null); renderLyrics(); });
lyrList.addEventListener('click', e => {
  if (!e.target.classList.contains('kf-x')) return;
  const i = +e.target.closest('.kf-row').dataset.i;
  if (lyrics.lines[i]) lyrics.lines[i].t = null;
  renderLyrics();
});
lyrLoadBtn.addEventListener('click', () => lyrFile.click());
lyrFile.addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => { lyrics.lines = parseLRC(r.result); lyrText.value = lyrics.lines.map(l => l.text).join('\n'); renderLyrics(); };
  r.readAsText(f); lyrFile.value = '';
});
lyrExportBtn.addEventListener('click', () => {
  const sorted = [...lyrics.lines].sort((a, b) => (a.t ?? 1e9) - (b.t ?? 1e9));
  const text = sorted.map(l => l.t == null ? l.text : `[${String(Math.floor(l.t / 60)).padStart(2, '0')}:${(l.t % 60).toFixed(2).padStart(5, '0')}]${l.text}`).join('\n');
  downloadBlob(new Blob([text], { type: 'text/plain' }), `${(trackName.textContent || 'lyrics').replace(/[^\w.-]+/g, '_')}.lrc`);
});
bpmBtn.addEventListener('click', async () => {
  bpmBtn.textContent = 'Analyzing…'; bpmBtn.disabled = true;
  try { await detectBPM(); } catch (e) { console.error(e); }
  bpmBtn.textContent = 'Detect BPM'; bpmBtn.disabled = false;
  renderLyrics();
});
lyrSize.addEventListener('input', () => { lyrics.size = lyrSize.value / 100; lyrSizeVal.textContent = Math.round(lyrSize.value) + '%'; });
lyrColor.addEventListener('input', () => { lyrics.color = lyrColor.value; });
lyrPos.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { segPick(lyrPos, b); lyrics.pos = b.dataset.p; } });

// ----- library (saved logos) -----
logoSave.addEventListener('click', saveCurrentLogo);
logoGallery.addEventListener('click', async e => {
  const item = e.target.closest('.g-item'); if (!item) return;
  const id = item.dataset.id;
  if (e.target.classList.contains('g-del')) { await idbDel('images', id); renderGallery(); return; }
  const all = await idbAll('images'); const rec = all.find(x => x.id === id);
  if (rec) loadImg(rec.full).then(im => { overlay.img = im; });
});

/* =====================================================================
   KEY MAP — bind keys (numpad-friendly) to scenes / FX / transport.
   ===================================================================== */
function cycleStrobe() { const o = ['off', 'white', 'black']; post.beatStrobe = o[(o.indexOf(post.beatStrobe) + 1) % 3]; setSeg(strobeSeg, 's', post.beatStrobe); }
function setIntensity(v) { sceneIntensity = Math.max(0, Math.min(2.5, v)); intRange.value = Math.round(sceneIntensity * 100); intVal.textContent = intRange.value + '%'; }
function toggleBlur() { post.blur = post.blur > 0 ? 0 : 8; blurRange.value = post.blur; blurVal.textContent = post.blur; }

const ACTIONS = [
  ...NAMES.map((n, i) => ({ id: 'scene:' + i, label: n, cat: 'Scene', run: () => userSetMode(i) })),
  ...Array.from({ length: 8 }, (_, i) => ({
    id: 'overlay:' + i, label: 'Overlay ' + (i + 1), cat: 'Overlay', momentary: true,
    on() { const s = overlays.slots[i]; if (!s) return; if (s.mode === 'hold') overlayStart(i); else overlayToggle(i); },
    off() { const s = overlays.slots[i]; if (!s) return; if (s.mode === 'hold') overlayStop(i); },
  })),
  { id: 'play', label: 'Play / Pause', cat: 'Transport', run: () => toggle() },
  { id: 'restart', label: 'Restart song', cat: 'Transport', run: () => { if (audioEl) { audioEl.currentTime = 0; if (audioEl.paused) play(); } } },
  { id: 'shuffle', label: 'Smart shuffle', cat: 'Transport', run: toggleShuffle },
  { id: 'next', label: 'Next scene', cat: 'Transport', run: () => userSetMode((mode + 1) % MODES.length) },
  { id: 'prev', label: 'Prev scene', cat: 'Transport', run: () => userSetMode((mode - 1 + MODES.length) % MODES.length) },
  { id: 'fs', label: 'Fullscreen', cat: 'Transport', run: () => fsBtn.click() },
  { id: 'hideUI', label: 'Hide UI', cat: 'Transport', run: () => document.body.classList.toggle('ui-hidden') },
  { id: 'blackout', label: 'Blackout (hold)', cat: 'FX', momentary: true, on: () => holdFlash.black = true, off: () => holdFlash.black = false },
  { id: 'whiteout', label: 'Whiteout (hold)', cat: 'FX', momentary: true, on: () => holdFlash.white = true, off: () => holdFlash.white = false },
  { id: 'flashW', label: 'Flash white', cat: 'FX', run: () => post.flashW = 1 },
  { id: 'flashB', label: 'Flash black', cat: 'FX', run: () => post.flashB = 1 },
  { id: 'strobe', label: 'Beat strobe cycle', cat: 'FX', run: cycleStrobe },
  { id: 'blur', label: 'Blur toggle', cat: 'FX', run: toggleBlur },
  { id: 'hue', label: 'Hue-cycle toggle', cat: 'FX', run: () => { overlay.fx.hue = !overlay.fx.hue; [...fxChips.children].forEach(b => b.classList.toggle('active', !!overlay.fx[b.dataset.fx])); } },
  { id: 'intUp', label: 'Intensity +', cat: 'Mix', run: () => setIntensity(sceneIntensity + 0.1) },
  { id: 'intDown', label: 'Intensity −', cat: 'Mix', run: () => setIntensity(sceneIntensity - 0.1) },
];
const actionById = id => ACTIONS.find(a => a.id === id);

const DEFAULT_KEYMAP = {
  Numpad1: 'scene:0', Numpad2: 'scene:1', Numpad3: 'scene:2', Numpad4: 'scene:3', Numpad5: 'scene:4',
  Numpad6: 'scene:5', Numpad7: 'scene:6', Numpad8: 'scene:7', Numpad9: 'scene:8',
  Numpad0: 'blackout', NumpadDecimal: 'whiteout',
  NumpadAdd: 'next', NumpadSubtract: 'prev',
  NumpadMultiply: 'blur', NumpadDivide: 'hue', NumpadEnter: 'strobe',
  KeyZ: 'overlay:0', KeyX: 'overlay:1', KeyC: 'overlay:2', KeyV: 'overlay:3',
};
let keymap = {};
try { keymap = JSON.parse(localStorage.getItem('sonar.keymap')) || { ...DEFAULT_KEYMAP }; } catch (e) { keymap = { ...DEFAULT_KEYMAP }; }
const saveKeymap = () => { try { localStorage.setItem('sonar.keymap', JSON.stringify(keymap)); } catch (e) {} };

let capId = null;                    // action id currently waiting for a key
function keyName(code) {
  if (code.startsWith('Numpad')) {
    const r = code.slice(6);
    return 'Num ' + ({ Add: '+', Subtract: '−', Multiply: '×', Divide: '÷', Decimal: '.', Enter: '⏎' }[r] || r);
  }
  if (code.startsWith('Digit')) return code.slice(5);
  if (code.startsWith('Key')) return code.slice(3);
  if (code.startsWith('Arrow')) return code.slice(5);
  return code;
}
function renderKeys() {
  let html = '';
  for (const cat of ['Scene', 'Overlay', 'FX', 'Transport', 'Mix']) {
    html += `<div class="sec-label">${cat}</div>`;
    for (const a of ACTIONS.filter(x => x.cat === cat)) {
      const code = Object.keys(keymap).find(k => keymap[k] === a.id);
      const cap = capId === a.id;
      html += `<div class="key-row" data-act="${a.id}">
        <span class="key-lbl">${a.label}${a.momentary ? ' ⤓' : ''}</span>
        <span class="key-chip ${cap ? 'capturing' : ''}">${cap ? 'press…' : (code ? keyName(code) : '—')}</span>
        <button class="key-set mini-btn" type="button">Set</button>
        ${code ? `<button class="key-clr" data-code="${code}" type="button" title="Unbind">✕</button>` : '<span></span>'}
      </div>`;
    }
  }
  keysList.innerHTML = html;
}

document.addEventListener('keydown', e => {
  // rebind capture mode
  if (capId) {
    e.preventDefault();
    if (e.key !== 'Escape') {
      for (const k in keymap) if (keymap[k] === capId) delete keymap[k];   // one key per action
      keymap[e.code] = capId; saveKeymap();
    }
    capId = null; renderKeys(); return;
  }
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

  // bound action by physical key code (numpad-stable)
  const act = keymap[e.code] && actionById(keymap[e.code]);
  if (act) {
    e.preventDefault();
    if (act.momentary) { if (!e.repeat) act.on(); }
    else act.run();
    return;
  }

  // built-in fallbacks
  if (e.key === ' ') { e.preventDefault(); toggle(); }
  else if (/^[1-9]$/.test(e.key)) { const m = +e.key - 1; if (m < MODES.length) userSetMode(m); }
  else if (e.key.toLowerCase() === 'f') fsBtn.click();
  else if (e.key.toLowerCase() === 'h') document.body.classList.toggle('ui-hidden');
  else if (e.key.toLowerCase() === 's') toggleShuffle();
});
document.addEventListener('keyup', e => {
  const act = keymap[e.code] && actionById(keymap[e.code]);
  if (act && act.momentary) act.off();
});

// keymap panel wiring
keysBtn.addEventListener('click', () => { togglePanel(keysPanel); renderKeys(); });
keysClose.addEventListener('click', () => keysPanel.classList.add('hidden'));
keysReset.addEventListener('click', () => { keymap = { ...DEFAULT_KEYMAP }; saveKeymap(); renderKeys(); });
keysList.addEventListener('click', e => {
  const setBtn = e.target.closest('.key-set');
  const clr = e.target.closest('.key-clr');
  if (setBtn) { capId = e.target.closest('.key-row').dataset.act; renderKeys(); }
  else if (clr) { delete keymap[clr.dataset.code]; saveKeymap(); renderKeys(); }
});

// ----- overlay panel wiring -----
brandBtn.addEventListener('click', () => togglePanel(brandPanel));
brandClose.addEventListener('click', () => brandPanel.classList.add('hidden'));

logoBtn.addEventListener('click', () => logoInput.click());
logoInput.addEventListener('change', e => {
  const f = e.target.files[0];
  if (!f) return;
  const img = new Image();
  const url = URL.createObjectURL(f);
  img.onload = () => { overlay.img = img; URL.revokeObjectURL(url); };
  img.src = url;
});
logoClear.addEventListener('click', () => { overlay.img = null; logoInput.value = ''; });

titleInput.addEventListener('input', () => { overlay.title = titleInput.value; });
subInput.addEventListener('input', () => { overlay.sub = subInput.value; });

posSeg.addEventListener('click', e => {
  const b = e.target.closest('button[data-pos]');
  if (!b) return;
  overlay.pos = b.dataset.pos;
  [...posSeg.children].forEach(x => x.classList.toggle('active', x === b));
});

sizeRange.addEventListener('input', () => {
  overlay.size = sizeRange.value / 100;
  sizeVal.textContent = sizeRange.value + '%';
});

// typography
fontSel.addEventListener('change', () => { overlay.font = fontSel.value; });
styleSeg.addEventListener('click', e => {
  const b = e.target.closest('button[data-style]');
  if (!b) return;
  const k = b.dataset.style;            // bold | italic | upper
  overlay[k] = !overlay[k];
  b.classList.toggle('active', overlay[k]);
});
titleSizeR.addEventListener('input', () => {
  overlay.titleSize = titleSizeR.value / 100;
  titleSizeVal.textContent = titleSizeR.value + '%';
});
subSizeR.addEventListener('input', () => {
  overlay.subSize = subSizeR.value / 100;
  subSizeVal.textContent = subSizeR.value + '%';
});
letterRange.addEventListener('input', () => {
  overlay.letter = letterRange.value / 100;
  letterVal.textContent = letterRange.value + '%';
});
titleColor.addEventListener('input', () => { overlay.titleColor = titleColor.value; });
subColor.addEventListener('input', () => { overlay.subColor = subColor.value; });

// glow & outline
glowColor.addEventListener('input', () => { overlay.glowColor = glowColor.value; });
glowRange.addEventListener('input', () => { overlay.glowSize = glowRange.value / 100; glowVal.textContent = glowRange.value + '%'; });
outlineColor.addEventListener('input', () => { overlay.outlineColor = outlineColor.value; });
outlineRange.addEventListener('input', () => {
  overlay.outlineW = outlineRange.value / 100;
  outlineVal.textContent = +outlineRange.value === 0 ? 'off' : outlineRange.value + '%';
});

// layout
offXRange.addEventListener('input', () => { overlay.offX = offXRange.value / 100; offXVal.textContent = offXRange.value; });
offYRange.addEventListener('input', () => { overlay.offY = offYRange.value / 100; offYVal.textContent = offYRange.value; });
alphaRange.addEventListener('input', () => { overlay.alpha = alphaRange.value / 100; alphaVal.textContent = alphaRange.value + '%'; });

// reactivity
reactSrcSel.addEventListener('change', () => { overlay.reactSrc = reactSrcSel.value; });
amtRange.addEventListener('input', () => { overlay.reactAmt = amtRange.value / 100; amtVal.textContent = amtRange.value + '%'; });
fxChips.addEventListener('click', e => {
  const b = e.target.closest('button[data-fx]');
  if (!b) return;
  const k = b.dataset.fx;
  overlay.fx[k] = !overlay.fx[k];
  b.classList.toggle('active', overlay.fx[k]);
});

// ----- automation panel wiring -----
autoBtn.addEventListener('click', () => togglePanel(autoPanel));
autoClose.addEventListener('click', () => autoPanel.classList.add('hidden'));
autoProp.addEventListener('change', buildValControl);
autoGrab.addEventListener('click', () => setValControl(getProp(curProp.key)));
autoAdd.addEventListener('click', () => addKeyframe(curProp.key, curTimeSec(), readAutoVal(), autoEase.value));
autoList.addEventListener('click', e => {
  if (!e.target.classList.contains('kf-x')) return;
  const row = e.target.closest('.kf-row');
  deleteKeyframe(row.dataset.key, +row.dataset.t);
});
autoClear.addEventListener('click', () => { if (confirm('Delete all keyframes?')) { automations = {}; renderAuto(); } });

autoExport.addEventListener('click', () => {
  const data = JSON.stringify({ type: 'sonar-automation', v: 1, tracks: automations }, null, 2);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
  a.download = (trackName.textContent || 'automation').replace(/[^\w-]+/g, '_') + '.sonar.json';
  a.click(); URL.revokeObjectURL(a.href);
});
autoImportBtn.addEventListener('click', () => autoImport.click());
autoImport.addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try { const j = JSON.parse(r.result); automations = j.tracks || j; renderAuto(); }
    catch (err) { alert('Invalid automation file.'); }
  };
  r.readAsText(f); autoImport.value = '';
});

// idle-hide the cursor / UI during playback (keeps panels + recording clean)
let idleTimer;
window.addEventListener('mousemove', () => {
  document.body.classList.remove('ui-hidden');
  document.body.style.cursor = 'default';
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    if (started && !offlineActive &&
        brandPanel.classList.contains('hidden') &&
        autoPanel.classList.contains('hidden') &&
        exportPanel.classList.contains('hidden') &&
        mixPanel.classList.contains('hidden') &&
        lyricsPanel.classList.contains('hidden') &&
        keysPanel.classList.contains('hidden') &&
        overlaysPanel.classList.contains('hidden')) {
      document.body.classList.add('ui-hidden');
      document.body.style.cursor = 'none';
    }
  }, 3000);
});

/* =====================================================================
   REMOTE CONTROL — the phone panel (control.php) drives this display through
   relay.php using short polling, which works under single-threaded `php -S`.
   This display applies incoming commands and publishes its state back so the
   panel can build its UI and reflect live values.
   ===================================================================== */
const REMOTE = { seq: -1 };

function applyRemote(c) {
  const v = c.value;
  switch (c.action) {
    case 'scene': userSetMode(v | 0); break;
    case 'next': userSetMode((mode + 1) % MODES.length); break;
    case 'prev': userSetMode((mode - 1 + MODES.length) % MODES.length); break;
    case 'shuffle': setShuffle(v == null ? !shuffle.on : !!v); break;
    case 'playpause': toggle(); break;
    case 'restart': if (audioEl) { audioEl.currentTime = 0; if (audioEl.paused) play(); } break;
    case 'intensity': setIntensity(+v); break;
    case 'eqBass': eqBass = +v; eqBassRange.value = Math.round(eqBass * 100); eqBassVal.textContent = eqBassRange.value + '%'; break;
    case 'eqMid': eqMid = +v; eqMidRange.value = Math.round(eqMid * 100); eqMidVal.textContent = eqMidRange.value + '%'; break;
    case 'eqTreble': eqTreble = +v; eqTrebleRange.value = Math.round(eqTreble * 100); eqTrebleVal.textContent = eqTrebleRange.value + '%'; break;
    case 'beatSens': beatSens = +v; beatSensRange.value = beatSens; beatSensVal.textContent = (+beatSens).toFixed(1); break;
    case 'blurToggle': toggleBlur(); break;
    case 'strobeCycle': cycleStrobe(); break;
    case 'flashW': post.flashW = 1; break;
    case 'flashB': post.flashB = 1; break;
    case 'blackout': holdFlash.black = !!v; break;
    case 'whiteout': holdFlash.white = !!v; break;
    case 'hue': overlay.fx.hue = !!v; [...fxChips.children].forEach(b => b.classList.toggle('active', !!overlay.fx[b.dataset.fx])); break;
    case 'transType': trans.type = v; setSeg(transType, 'x', v); break;
    case 'transDur': trans.dur = +v; transDurRange.value = v; transDurVal.textContent = (+v).toFixed(2) + 's'; break;
    case 'overlay': overlayToggle(v | 0); break;
    case 'overlayStop': if (overlays.active >= 0) overlayStop(overlays.active); break;
    case 'overlayBlend': overlays.blend = v; setSeg(ovBlend, 'b', v); break;
    case 'overlayOpacity': overlays.opacity = +v; ovOpacity.value = Math.round(overlays.opacity * 100); ovOpacityVal.textContent = ovOpacity.value + '%'; break;
    case 'overlayAuto': overlays.auto = !!v; ovAuto.checked = overlays.auto; if (!overlays.auto && overlays.autoActive && overlays.active >= 0) overlayStop(overlays.active); break;
  }
}

function remoteStateObj() {
  return {
    t: Date.now(),
    track: (trackName && trackName.textContent) || '',
    names: NAMES, mode, shuffle: shuffle.on, playing: isPlaying(),
    intensity: sceneIntensity, eqBass, eqMid, eqTreble, beatSens,
    blur: post.blur, strobe: post.beatStrobe, hue: !!overlay.fx.hue,
    blackout: !!holdFlash.black, whiteout: !!holdFlash.white,
    trans: { type: trans.type, dur: trans.dur },
    overlays: { list: overlays.slots.map(s => s.name), active: overlays.active, blend: overlays.blend, opacity: overlays.opacity, auto: overlays.auto },
  };
}

async function remotePoll() {
  try {
    if (REMOTE.seq < 0) {                                    // first contact → skip the backlog
      const j = await (await fetch('relay.php?channel=cmd&since=2000000000', { cache: 'no-store' })).json();
      REMOTE.seq = j.seq || 0; return true;
    }
    // wait=20 → the server holds the request until a command lands (long-poll),
    // so pickup is near-instant instead of on the next polling tick
    const j = await (await fetch('relay.php?channel=cmd&since=' + REMOTE.seq + '&wait=20', { cache: 'no-store' })).json();
    if (j.items && j.items.length) { for (const c of j.items) { applyRemote(c); REMOTE.seq = c.seq; } remotePublish(); }  // echo fresh state at once
    if (j.seq != null && j.seq > REMOTE.seq) REMOTE.seq = j.seq;
    return true;
  } catch (e) { return false; }
}

// re-arm as soon as a held request resolves; if the server can't hold
// (php -S ignores `wait`) responses come back fast — pace those at 90ms
async function remoteLoop() {
  while (true) {
    const t0 = performance.now();
    const ok = await remotePoll();
    const held = performance.now() - t0 > 1000;
    await new Promise(r => setTimeout(r, ok ? (held ? 0 : 90) : 800));
  }
}
function remotePublish() {
  fetch('relay.php?channel=state', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(remoteStateObj()) }).catch(() => {});
}
function startRemote() {
  remoteLoop();                       // long-polled command pickup (near-instant)
  setInterval(remotePublish, 500);    // state mirror for the panel
  const cu = $('ctrlUrl'), cl = $('ctrlLink');
  if (cu && cl) cu.textContent = cl.href;
}

// ----- init -----
loadImg('CassetteRemix.svg').then(im => { cassetteImg = im; });   // cassette scene art
autoProp.innerHTML = AUTOMATABLE.map(a => `<option value="${a.key}">${a.label}</option>`).join('');
META('mode').opts = NAMES.map((n, i) => [i, n]);
META('font').opts = [...fontSel.options].map(o => [o.value, o.textContent]);
buildValControl();
renderAuto();
renderLyrics();
renderGallery();
initServerClips();      // /vjloops library (streamed)
loadOverlays();         // user-uploaded clips (IndexedDB)
resize();
setMode(0);
if (!IN_PLUGIN) startRemote();   // phone control panel (control.php) over relay.php — LAN only
if (IN_PLUGIN) initPlugin();     // FL Studio / VST3 host feeds audio and auto-starts the show
