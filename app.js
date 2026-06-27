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
const loadBtn = $('loadBtn');
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

function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth;
  H = window.innerHeight;
  CX = W / 2; CY = H / 2;
  for (const c of [stage, scene]) { c.width = W * DPR; c.height = H * DPR; }
  bloom.width = Math.floor(W * DPR / 2);
  bloom.height = Math.floor(H * DPR / 2);
  for (const cc of [ctx, sctx]) cc.setTransform(DPR, 0, 0, DPR, 0, 0);
  bctx.setTransform(DPR / 2, 0, 0, DPR / 2, 0, 0);
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

function play() {
  if (isMic) return;
  if (actx.state === 'suspended') actx.resume();
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
  topbar.classList.remove('hidden');
  controls.classList.remove('hidden');
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
  analyser.getByteFrequencyData(freq);
  analyser.getByteTimeDomainData(time);
  computeBands();
}

/* =====================================================================
   SHARED VISUAL STATE
   ===================================================================== */
let hue = 200;                 // rotating base hue
let frame = 0;
const TAU = Math.PI * 2;

// post-FX + timing (Wave 1)
const post = { blur: 0, flashW: 0, flashB: 0, beatStrobe: 'off', fadeIn: 0, fadeOut: 0 };
const holdFlash = { white: false, black: false };   // momentary strobe while a key is held
let renderTime = 0, renderDur = 0, headroom = 0;

function isPlaying() { return offlineActive || isMic || (audioEl && !audioEl.paused); }

function fadeAlpha() {
  if (!renderDur) return 0;
  let a = 0;
  if (renderTime < 0) return 1;                                   // black during intro headroom
  if (post.fadeIn > 0 && renderTime < post.fadeIn) a = Math.max(a, 1 - renderTime / post.fadeIn);
  if (post.fadeOut > 0 && renderTime > renderDur - post.fadeOut) a = Math.max(a, (renderTime - (renderDur - post.fadeOut)) / post.fadeOut);
  return Math.min(1, Math.max(0, a));
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

function makeOvVideo(url, preload) {
  const v = document.createElement('video');
  v.src = url; v.muted = true; v.playsInline = true; v.loop = false;
  v.preload = preload || 'auto';                 // server clips use 'none' so big files don't prefetch
  if (v.preload !== 'none') v.load();
  return v;
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
}

function overlayStart(i) {
  const s = overlays.slots[i]; if (!s || !s.video) return;
  if (overlays.active >= 0 && overlays.active !== i) { const p = overlays.slots[overlays.active]; if (p && p.video) p.video.pause(); }
  overlays.active = i;
  overlays.autoActive = false;          // manual by default; autoOverlayOnChange re-flags it
  const v = s.video;
  v.loop = (s.mode === 'loop');
  v.onended = (s.mode === 'once') ? () => { if (overlays.active === i) { overlays.active = -1; renderOverlays(); } } : null;
  try { v.currentTime = 0; } catch (e) {}
  v.play().catch(() => {});
  renderOverlays();
}
function overlayStop(i) {
  const s = overlays.slots[i]; if (s && s.video) s.video.pause();
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
}
async function loadOverlays() {
  let items = []; try { items = await idbAll('overlays'); } catch (e) { return; }
  for (const it of items) {
    const url = URL.createObjectURL(it.blob);
    overlays.slots.push({ id: it.id, name: it.name, url, video: makeOvVideo(url), mode: it.mode || 'loop' });
  }
  renderOverlays();
}
async function deleteOverlay(id) {
  const idx = overlays.slots.findIndex(s => s.id === id); if (idx < 0) return;
  const s = overlays.slots[idx];
  if (overlays.active === idx) overlayStop(idx);
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
  ovList.innerHTML = overlays.slots.length ? overlays.slots.map((s, i) => `
    <div class="ov-row${overlays.active === i ? ' playing' : ''}" data-id="${s.id}">
      <button class="ov-trig mini-btn" type="button" title="Trigger">${overlays.active === i ? '■' : '▶'}</button>
      <span class="ov-name" title="${s.name}">${i < 8 ? `<b>${i + 1}</b>` : ''}${s.server ? '📁 ' : ''}${s.name}</span>
      <select class="ov-mode">
        <option value="loop"${s.mode === 'loop' ? ' selected' : ''}>Loop</option>
        <option value="once"${s.mode === 'once' ? ' selected' : ''}>Once</option>
        <option value="hold"${s.mode === 'hold' ? ' selected' : ''}>Hold</option>
      </select>
      ${s.server ? '<span class="ov-del" style="visibility:hidden">✕</span>' : '<button class="ov-del" type="button" title="Delete">✕</button>'}
    </div>`).join('') : '<div class="kf-empty">No clips yet — add a file, or drop videos in the <b>vjloops/</b> folder.</div>';
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
function collectScene() {
  return {
    type: 'sonar-scene', v: 1,
    mode,
    shuffle: shuffle.on,
    mix: { sceneIntensity, eqBass, eqMid, eqTreble, beatSens, transType: trans.type, transDur: trans.dur },
    post: { blur: post.blur, beatStrobe: post.beatStrobe, fadeIn: post.fadeIn, fadeOut: post.fadeOut },
    bg: { type: bg.type, c1: bg.c1, c2: bg.c2, img: imgToDataURL(bg.img, 1920) },
    overlay: { ...overlay, img: imgToDataURL(overlay.img, 1024), fx: { ...overlay.fx } },
    overlaysCfg: { blend: overlays.blend, opacity: overlays.opacity, fit: overlays.fit, react: overlays.react, auto: overlays.auto },
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
   RENDER LOOP  +  bloom composite
   ===================================================================== */
const MODES = [
  modeAurora, modeSpectrum, modeTunnel, modeGalaxy, modeSynth, modeKaleido, modeLiquid, modeScope,
  modeTerrain, modeRings, modeRays, modeMatrix, modeLissajous, modeWeb, modeVortex, modePlasma,
  modeStrobe, modeLasers, modePillars, modeHypno, modeSiren, modeGlitch, modeCassette,
];
const NAMES = [
  'AURORA', 'SPECTRUM', 'TUNNEL', 'GALAXY', 'SYNTHWAVE', 'KALEIDO', 'LIQUID', 'SCOPE',
  'TERRAIN', 'RINGS', 'RAYS', 'MATRIX', 'LISSAJOUS', 'WEB', 'VORTEX', 'PLASMA',
  'STROBE', 'LASERS', 'PILLARS', 'HYPNO', 'SIREN', 'GLITCH', 'CASSETTE',
];
let mode = 0;
let running = false;

function setMode(m) {
  if (m !== mode) startTransition();      // dissolve the outgoing scene into the new one
  mode = m;
  modeBadge.textContent = NAMES[m];
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
// the 23 scenes grouped by visual energy (indices into MODES / NAMES)
const SCENE_TIERS = {
  calm:    [0, 3, 6, 8, 12, 19],                // Aurora Galaxy Liquid Terrain Lissajous Hypno
  mid:     [1, 2, 4, 5, 7, 9, 13, 18, 20, 22],  // Spectrum Tunnel Synthwave Kaleido Scope Rings Web Pillars Siren Cassette
  intense: [10, 11, 14, 15, 16, 17, 21],        // Rays Matrix Vortex Plasma Strobe Lasers Glitch
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
  const fa = fadeAlpha();
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
  frame++;
  const now = performance.now();
  dtSec = lastFrameNow ? Math.min(0.1, (now - lastFrameNow) / 1000) : 1 / 60;
  lastFrameNow = now;
  analyze();
  hue = (hue + 0.25 + A.treble * 1.5) % 360;
  renderTime = (audioEl && !isMic) ? audioEl.currentTime : 0;
  renderDur = (audioEl && !isMic && isFinite(audioEl.duration)) ? audioEl.duration : 0;
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
window.addEventListener('drop', e => e.preventDefault());

dropzone.querySelector('.drop-hint').addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', e => { if (e.target.files[0]) loadFile(e.target.files[0]); });
loadBtn.addEventListener('click', () => fileInput.click());
micBtn.addEventListener('click', () => useMic(inputDevice.value || undefined));
sysBtn.addEventListener('click', useSystemAudio);
mixMicBtn.addEventListener('click', () => useMic(inputDevice.value || undefined));
mixSysBtn.addEventListener('click', useSystemAudio);
inputDevice.addEventListener('change', () => { if (isMic && inputDevice.value) useMic(inputDevice.value); });

playBtn.addEventListener('click', toggle);
vol.addEventListener('input', () => { if (gain) gain.gain.value = vol.value / 100; });

seek.addEventListener('input', () => { seeking = true; if (audioEl) curTime.textContent = fmt(seek.value / 1000 * audioEl.duration); });
seek.addEventListener('change', () => {
  if (audioEl && audioEl.duration) audioEl.currentTime = seek.value / 1000 * audioEl.duration;
  seeking = false;
});

modeSwitch.addEventListener('click', e => {
  const b = e.target.closest('button[data-mode]');
  if (b) userSetMode(+b.dataset.mode);
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
sceneLoadBtn.addEventListener('click', () => sceneFile.click());
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
      REMOTE.seq = j.seq || 0; return;
    }
    const j = await (await fetch('relay.php?channel=cmd&since=' + REMOTE.seq, { cache: 'no-store' })).json();
    if (j.items && j.items.length) { for (const c of j.items) { applyRemote(c); REMOTE.seq = c.seq; } remotePublish(); }  // echo fresh state at once
    if (j.seq != null && j.seq > REMOTE.seq) REMOTE.seq = j.seq;
  } catch (e) {}
}
function remotePublish() {
  fetch('relay.php?channel=state', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(remoteStateObj()) }).catch(() => {});
}
function startRemote() {
  remotePoll();
  setInterval(remotePoll, 90);        // low-latency command pickup (Apache handles the rate)
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
startRemote();          // phone control panel (control.php) over relay.php
