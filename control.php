<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
<meta name="theme-color" content="#04050a">
<title>SONAR · DECK</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#04050a; --ink:#eef4ff; --dim:#8092b0; --line:rgba(255,255,255,.09);
  --cyan:#22e6ff; --mag:#ff3ea5; --vio:#9b7bff; --amber:#ffb43c; --red:#ff5470; --lime:#7dff8a;
  --accent:var(--cyan);
  --glass:linear-gradient(160deg,rgba(28,34,52,.72),rgba(12,15,26,.72));
  --hud:74px; --dock:128px;
  font-synthesis:none;
}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;min-width:0}
html,body{margin:0;height:100%;max-width:100%;overflow-x:hidden}
body{
  background:var(--bg);color:var(--ink);
  font:15px/1.3 "Space Grotesk",system-ui,-apple-system,sans-serif;
  -webkit-user-select:none;user-select:none;overscroll-behavior:none;
  transition:--accent .3s;
}
/* living backdrop */
body::before{
  content:"";position:fixed;inset:-30%;z-index:-2;pointer-events:none;
  background:
    radial-gradient(40% 35% at 22% 18%, color-mix(in srgb,var(--accent) 26%, transparent), transparent 70%),
    radial-gradient(45% 40% at 82% 78%, color-mix(in srgb,var(--mag) 18%, transparent), transparent 70%);
  filter:blur(36px);opacity:.7;animation:drift 22s ease-in-out infinite alternate;
}
body::after{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;
  background:radial-gradient(120% 90% at 50% -10%, transparent 60%, rgba(0,0,0,.55));}
@keyframes drift{to{transform:translate3d(4%,-3%,0) scale(1.08)}}

/* ---------- HUD ---------- */
.hud{
  position:fixed;top:0;left:0;right:0;z-index:20;
  height:calc(var(--hud) + env(safe-area-inset-top));padding-top:env(safe-area-inset-top);
  display:flex;align-items:center;gap:12px;padding-left:16px;padding-right:16px;
  background:linear-gradient(180deg,rgba(8,10,18,.92),rgba(8,10,18,.55));
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--line);
}
.orb{width:11px;height:11px;border-radius:50%;background:var(--red);box-shadow:0 0 10px var(--red);flex:0 0 auto;transition:.3s}
.orb.on{background:var(--lime);box-shadow:0 0 10px var(--lime),0 0 22px color-mix(in srgb,var(--lime) 60%,transparent);animation:pulse 1.8s ease-in-out infinite}
@keyframes pulse{50%{transform:scale(1.35);opacity:.7}}
.hud .link{font:600 10px/1 "Orbitron",sans-serif;letter-spacing:2px;color:var(--dim);flex:0 0 auto;width:30px}
.now{flex:1;min-width:0;text-align:left;margin-left:2px}
.now .lab{font:700 9px/1 "Orbitron",sans-serif;letter-spacing:3px;color:var(--dim)}
.now .scene{font:900 22px/1.05 "Orbitron",sans-serif;letter-spacing:1px;margin-top:3px;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  color:#fff;text-shadow:0 0 18px color-mix(in srgb, hsl(var(--nh,190) 100% 60%) 75%, transparent)}
.now .sub{font-size:11px;color:var(--dim);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hud .pill{
  flex:0 0 auto;border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--dim);
  font:700 11px/1 "Orbitron",sans-serif;letter-spacing:1px;padding:9px 12px;border-radius:11px;cursor:pointer;
}
.hud .pill.on{color:#04121a;background:var(--accent);border-color:var(--accent);box-shadow:0 0 16px color-mix(in srgb,var(--accent) 55%,transparent)}

/* ---------- stage ---------- */
#stage{position:fixed;left:0;right:0;
  top:calc(var(--hud) + env(safe-area-inset-top));
  bottom:calc(var(--dock) + env(safe-area-inset-bottom));
  overflow-y:auto;-webkit-overflow-scrolling:touch;padding:14px 14px 26px}
.view{display:none}
.view.show{display:block;animation:rise .22s ease}
@keyframes rise{from{opacity:0;transform:translateY(6px)}to{opacity:1}}
.sect{font:700 10px/1 "Orbitron",sans-serif;letter-spacing:3px;color:var(--accent);margin:20px 4px 10px}
.sect:first-child{margin-top:2px}

/* ---------- pad grid (launchpad) ---------- */
.pads{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:10px}
.pad{
  position:relative;min-height:82px;border-radius:16px;cursor:pointer;overflow:hidden;
  border:1px solid var(--line);background:var(--glass);
  display:flex;flex-direction:column;justify-content:flex-end;padding:11px 12px;
  color:var(--ink);font:600 13.5px/1.15 "Space Grotesk",sans-serif;text-align:left;word-break:break-word;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.06);transition:transform .08s, box-shadow .2s, background .2s;
}
.pad::before{content:"";position:absolute;left:0;right:0;top:0;height:4px;
  background:hsl(var(--h) 95% 60%);box-shadow:0 0 14px hsl(var(--h) 95% 60%);opacity:.9}
.pad .n{position:absolute;top:9px;right:11px;font:800 11px/1 "Orbitron",sans-serif;color:hsl(var(--h) 95% 70%);opacity:.85}
.pad:active{transform:scale(.95)}
.pad.on{
  background:linear-gradient(160deg,hsl(var(--h) 90% 56%),hsl(var(--h) 85% 44%));
  color:#06090f;border-color:hsl(var(--h) 95% 70%);
  box-shadow:0 0 0 1px hsl(var(--h) 95% 70%),0 8px 30px hsl(var(--h) 90% 50% / .55);
  animation:livepad 1.7s ease-in-out infinite;
}
.pad.on .n{color:#06090f;opacity:.7}
.pad.on::before{opacity:0}
@keyframes livepad{50%{box-shadow:0 0 0 1px hsl(var(--h) 95% 75%),0 10px 40px hsl(var(--h) 90% 55% / .8)}}
.pad.play::after{content:"";position:absolute;top:10px;left:11px;width:0;height:0;
  border-left:11px solid hsl(var(--h) 95% 70%);border-top:7px solid transparent;border-bottom:7px solid transparent;opacity:.85}
.pad.on.play::after{border-left-color:#06090f;border-top:0;border-bottom:0;width:11px;height:13px;background:#06090f}

/* ---------- cards / segments / buttons ---------- */
.card{margin-top:14px;padding:14px;border-radius:18px;border:1px solid var(--line);background:var(--glass);
  backdrop-filter:blur(10px);box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}
.card .ch{font:700 10px/1 "Orbitron",sans-serif;letter-spacing:2px;color:var(--dim);margin-bottom:11px}
.seg{display:flex;gap:6px;background:rgba(0,0,0,.32);padding:6px;border-radius:13px}
.seg button{flex:1;min-height:46px;border:none;border-radius:9px;background:transparent;color:var(--dim);
  font:600 13px "Space Grotesk",sans-serif;cursor:pointer;transition:.15s}
.seg.wrap{flex-wrap:wrap}.seg.wrap button{flex:1 0 28%}
.seg button:active{transform:scale(.96)}
.seg button.on{background:var(--accent);color:#06090f;box-shadow:0 0 16px color-mix(in srgb,var(--accent) 50%,transparent)}
.row{display:flex;gap:10px;margin-bottom:12px}
.ctl{flex:1;min-height:54px;border-radius:15px;border:1px solid var(--line);background:var(--glass);
  color:var(--ink);font:700 13px "Space Grotesk",sans-serif;letter-spacing:.5px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:8px;transition:transform .08s,box-shadow .2s,background .2s}
.ctl:active{transform:scale(.97)}
.ctl .ic{font-size:18px}
.ctl.on{background:var(--accent);color:#06090f;border-color:var(--accent);box-shadow:0 0 20px color-mix(in srgb,var(--accent) 50%,transparent)}
.ctl.warn{color:var(--red);border-color:color-mix(in srgb,var(--red) 45%,transparent)}
.ctl.warn:active{background:color-mix(in srgb,var(--red) 18%,transparent)}
.ctl.hot.live{background:var(--amber);color:#06090f;border-color:var(--amber);box-shadow:0 0 26px color-mix(in srgb,var(--amber) 60%,transparent)}

/* ---------- horizontal slider (custom) ---------- */
.hsl{margin:4px 2px 2px}
.hsl .top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:9px}
.hsl .top span{font:600 12px "Space Grotesk";color:var(--dim);letter-spacing:.5px}
.hsl .top b{font:700 13px "Orbitron";color:var(--accent)}
.track{position:relative;height:40px;border-radius:12px;background:rgba(0,0,0,.35);border:1px solid var(--line);touch-action:none;cursor:pointer;overflow:hidden}
.track .fill{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:12px;
  background:linear-gradient(90deg,color-mix(in srgb,var(--accent) 70%,#fff 0%),var(--accent));opacity:.85}
.track .thumb{position:absolute;top:50%;left:0;width:24px;height:24px;margin-top:-12px;border-radius:50%;
  background:#fff;border:3px solid var(--accent);box-shadow:0 3px 10px rgba(0,0,0,.6);transition:transform .08s}
.track.drag .thumb{transform:scale(1.18)}

/* ---------- vertical faders (mixer) ---------- */
.faders{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.fader{display:flex;flex-direction:column;align-items:center;gap:9px}
.fader .v{font:700 13px "Orbitron";color:var(--accent)}
.fr{position:relative;width:100%;max-width:78px;height:230px;border-radius:18px;
  background:rgba(0,0,0,.35);border:1px solid var(--line);touch-action:none;cursor:pointer;overflow:hidden;
  box-shadow:inset 0 2px 8px rgba(0,0,0,.5)}
.fr .fill{position:absolute;left:0;right:0;bottom:0;height:0;
  background:linear-gradient(0deg,var(--accent),color-mix(in srgb,var(--accent) 40%,var(--vio)));opacity:.9}
.fr .grid{position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0 22px,rgba(255,255,255,.05) 22px 23px)}
.fr .thumb{position:absolute;left:6px;right:6px;height:26px;bottom:0;border-radius:9px;background:#fff;
  box-shadow:0 -2px 10px rgba(0,0,0,.5),0 0 14px color-mix(in srgb,var(--accent) 60%,transparent)}
.fr.drag .thumb{height:30px}
.fader .lab{font:700 10px "Orbitron";letter-spacing:1px;color:var(--dim)}

/* ---------- dock (transport + tabs) ---------- */
.dock{position:fixed;left:0;right:0;bottom:0;z-index:20;
  height:calc(var(--dock) + env(safe-area-inset-bottom));padding-bottom:env(safe-area-inset-bottom);
  background:linear-gradient(0deg,rgba(8,10,18,.96),rgba(8,10,18,.6));
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-top:1px solid var(--line);
  display:flex;flex-direction:column}
.transport{display:flex;align-items:center;justify-content:center;gap:16px;height:64px}
.transport .t{width:50px;height:50px;border-radius:14px;border:1px solid var(--line);background:rgba(255,255,255,.05);
  color:var(--ink);font-size:19px;display:grid;place-items:center;cursor:pointer}
.transport .t:active{transform:scale(.92)}
.transport .t.on{color:#06090f;background:var(--accent);border-color:var(--accent)}
.transport .pp{width:62px;height:62px;border-radius:50%;border:none;font-size:24px;color:#06090f;
  background:radial-gradient(circle at 35% 30%,#fff,var(--accent) 60%);
  box-shadow:0 0 26px color-mix(in srgb,var(--accent) 65%,transparent),0 6px 18px rgba(0,0,0,.5)}
.transport .pp:active{transform:scale(.93)}
.tabs{display:flex;height:64px;border-top:1px solid var(--line)}
.tabs button{flex:1;background:none;border:none;color:var(--dim);cursor:pointer;position:relative;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;
  font:600 10px/1 "Orbitron",sans-serif;letter-spacing:1px}
.tabs button .ic{font-size:19px;line-height:1}
.tabs button.on{color:var(--accent)}
.tabs button.on::before{content:"";position:absolute;top:0;left:24%;right:24%;height:3px;border-radius:3px;
  background:var(--accent);box-shadow:0 0 12px var(--accent)}
.empty{grid-column:1/-1;color:var(--dim);text-align:center;padding:34px 10px;font-size:13px}
@media(min-width:560px){.pads{grid-template-columns:repeat(auto-fill,minmax(130px,1fr))}.faders{max-width:520px}}
</style>
</head>
<body data-view="scenes" style="--accent:var(--cyan)">

  <header class="hud">
    <span class="orb" id="orb"></span><span class="link" id="connTxt">…</span>
    <div class="now">
      <div class="lab">NOW PLAYING</div>
      <div class="scene" id="nowScene">SONAR DECK</div>
      <div class="sub" id="nowSub">connecting…</div>
    </div>
    <button class="pill" id="shufPill">SHUF</button>
  </header>

  <main id="stage">
    <!-- SCENES -->
    <section class="view show" data-view="scenes">
      <div class="pads" id="sceneGrid"><div class="empty">Esperando a la pantalla…</div></div>
      <div class="card">
        <div class="ch">TRANSICIÓN</div>
        <div class="seg wrap" id="transSeg">
          <button data-v="none">Cut</button><button data-v="crossfade">Fade</button><button data-v="dip">Dip</button>
          <button data-v="wipe">Wipe</button><button data-v="slide">Slide</button><button data-v="zoom">Zoom</button>
        </div>
        <div class="hsl" style="margin-top:14px"><div class="top"><span>Duración</span><b id="transDurV">—</b></div>
          <div class="track" id="transDur"><div class="fill"></div><div class="thumb"></div></div></div>
      </div>
    </section>

    <!-- OVERLAYS -->
    <section class="view" data-view="overlays">
      <div class="row">
        <button class="ctl warn" data-cmd="overlayStop"><span class="ic">◼</span>STOP</button>
        <button class="ctl" id="ovAutoBtn"><span class="ic">✨</span>AUTO</button>
      </div>
      <div class="pads" id="ovGrid"><div class="empty">Esperando a la pantalla…</div></div>
      <div class="card">
        <div class="ch">BLEND</div>
        <div class="seg" id="ovBlendSeg">
          <button data-v="source-over">Normal</button><button data-v="lighter">Add</button><button data-v="screen">Screen</button>
        </div>
        <div class="hsl" style="margin-top:14px"><div class="top"><span>Opacidad</span><b id="ovOpV">—</b></div>
          <div class="track" id="ovOp"><div class="fill"></div><div class="thumb"></div></div></div>
      </div>
    </section>

    <!-- MIX -->
    <section class="view" data-view="mix">
      <div class="sect">REACTIVIDAD</div>
      <div class="faders">
        <div class="fader"><div class="v" id="vInt">—</div><div class="fr" id="fInt"><div class="grid"></div><div class="fill"></div><div class="thumb"></div></div><div class="lab">INT</div></div>
        <div class="fader"><div class="v" id="vBass">—</div><div class="fr" id="fBass"><div class="grid"></div><div class="fill"></div><div class="thumb"></div></div><div class="lab">BASS</div></div>
        <div class="fader"><div class="v" id="vMid">—</div><div class="fr" id="fMid"><div class="grid"></div><div class="fill"></div><div class="thumb"></div></div><div class="lab">MID</div></div>
        <div class="fader"><div class="v" id="vTreb">—</div><div class="fr" id="fTreb"><div class="grid"></div><div class="fill"></div><div class="thumb"></div></div><div class="lab">TREB</div></div>
      </div>
      <div class="card">
        <div class="ch">DETECCIÓN DE BEAT</div>
        <div class="hsl"><div class="top"><span>Sensibilidad</span><b id="vSens">—</b></div>
          <div class="track" id="sSens"><div class="fill"></div><div class="thumb"></div></div></div>
      </div>
    </section>

    <!-- FX -->
    <section class="view" data-view="fx">
      <div class="sect">FLASH / STROBE</div>
      <div class="row">
        <button class="ctl" data-flash="flashW"><span class="ic">⚡</span>FLASH ◻</button>
        <button class="ctl" data-flash="flashB"><span class="ic">⚡</span>FLASH ◼</button>
      </div>
      <div class="row">
        <button class="ctl hot" id="blackoutBtn"><span class="ic">⬛</span>BLACKOUT</button>
        <button class="ctl hot" id="whiteoutBtn"><span class="ic">⬜</span>WHITEOUT</button>
      </div>
      <div class="row">
        <button class="ctl" id="strobeBtn"><span class="ic">▦</span>STROBE</button>
        <button class="ctl" id="blurBtn"><span class="ic">◌</span>BLUR</button>
      </div>
      <button class="ctl" id="hueBtn" style="width:100%"><span class="ic">🌈</span>HUE-CYCLE</button>
    </section>
  </main>

  <div class="dock">
    <div class="transport">
      <button class="t" data-cmd="prev">⏮</button>
      <button class="pp" id="pp" data-cmd="playpause">▶</button>
      <button class="t" data-cmd="next">⏭</button>
      <button class="t" id="shufT">🔀</button>
    </div>
    <nav class="tabs">
      <button data-go="scenes" class="on" data-acc="cyan"><span class="ic">▦</span>SCENES</button>
      <button data-go="overlays" data-acc="mag"><span class="ic">▶</span>OVERLAYS</button>
      <button data-go="mix" data-acc="vio"><span class="ic">🎚</span>MIX</button>
      <button data-go="fx" data-acc="amber"><span class="ic">✦</span>FX</button>
    </nav>
  </div>

<script>
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const RELAY='relay.php';
const vibe=ms=>{try{navigator.vibrate&&navigator.vibrate(ms)}catch(e){}};
function send(action,value){ vibe(8);
  fetch(RELAY+'?channel=cmd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,value})}).catch(()=>{}); }

let S={};

/* ---- optimistic overrides: keep a just-tapped value for ~650ms so a stale
   poll can't bounce it back before the display echoes the new state ---- */
const ovStore={};
const pSet=(o,p,v)=>{const k=p.split('.');let c=o;for(let i=0;i<k.length-1;i++)c=c[k[i]]=c[k[i]]||{};c[k[k.length-1]]=v;};
function mark(path,value){ pSet(S,path,value); ovStore[path]={v:value,until:performance.now()+650}; }
function opt(path,value){ mark(path,value); render(); }

/* ---- tabs + per-section accent ---- */
const ACC={cyan:'var(--cyan)',mag:'var(--mag)',vio:'var(--vio)',amber:'var(--amber)'};
$$('.tabs button').forEach(b=>b.addEventListener('click',()=>{
  $$('.tabs button').forEach(x=>x.classList.toggle('on',x===b));
  const go=b.dataset.go;
  document.body.dataset.view=go;
  document.body.style.setProperty('--accent',ACC[b.dataset.acc]||'var(--cyan)');
  $$('.view').forEach(v=>v.classList.toggle('show',v.dataset.view===go));
  $('#stage').scrollTop=0; vibe(6);
}));
{const it=location.hash.replace('#','');const tb=it&&document.querySelector('.tabs button[data-go="'+it+'"]');if(tb)tb.click();}

/* ---- simple command + toggle buttons (optimistic: reflect instantly, poll reconciles) ---- */
$$('[data-cmd]').forEach(b=>b.addEventListener('click',()=>{
  const c=b.dataset.cmd; send(c);
  if(c==='playpause') opt('playing',!S.playing);
  else if(c==='next'&&S.names) opt('mode',(S.mode+1)%S.names.length);
  else if(c==='prev'&&S.names) opt('mode',(S.mode-1+S.names.length)%S.names.length);
  else if(c==='overlayStop') opt('overlays.active',-1);
}));
$$('[data-flash]').forEach(b=>b.addEventListener('click',()=>send(b.dataset.flash)));
$('#shufPill').onclick=$('#shufT').onclick=()=>{const v=!S.shuffle;send('shuffle',v);opt('shuffle',v);};
$('#ovAutoBtn').onclick=()=>{const v=!(S.overlays&&S.overlays.auto);send('overlayAuto',v);opt('overlays.auto',v);};
$('#blurBtn').onclick=()=>{send('blurToggle');opt('blur',S.blur>0?0:8);};
$('#strobeBtn').onclick=()=>{const o=['off','white','black'];send('strobeCycle');opt('strobe',o[(o.indexOf(S.strobe||'off')+1)%3]);};
$('#hueBtn').onclick=()=>{const v=!S.hue;send('hue',v);opt('hue',v);};
/* blackout / whiteout = hold */
function holdBtn(el,act){
  const on=e=>{e.preventDefault();send(act,true);el.classList.add('live')};
  const off=()=>{send(act,false);el.classList.remove('live')};
  el.addEventListener('pointerdown',on); el.addEventListener('pointerup',off);
  el.addEventListener('pointercancel',off); el.addEventListener('pointerleave',off);
}
holdBtn($('#blackoutBtn'),'blackout'); holdBtn($('#whiteoutBtn'),'whiteout');

/* ---- segmented ---- */
function segWire(id,action,path){ $$('#'+id+' button').forEach(b=>b.addEventListener('click',()=>{send(action,b.dataset.v);opt(path,b.dataset.v);})); }
segWire('transSeg','transType','trans.type');
segWire('ovBlendSeg','overlayBlend','overlays.blend');

/* ---- custom sliders / faders ---- */
function makeSlider(el,{min,max,step,vertical,fmt,onSend}){
  const fill=el.querySelector('.fill'),thumb=el.querySelector('.thumb');
  let dragging=false,last=0,val=min;
  const clamp=v=>Math.max(min,Math.min(max,v));
  const snap=v=>step?Math.round(v/step)*step:v;
  function ui(v){const p=(v-min)/(max-min);
    if(vertical){fill.style.height=(p*100)+'%';thumb.style.bottom='calc('+(p*100)+'% - 13px)';}
    else{fill.style.width=(p*100)+'%';thumb.style.left='calc('+(p*100)+'% - 12px)';}}
  function fromE(e){const r=el.getBoundingClientRect();
    let p=vertical?1-(e.clientY-r.top)/r.height:(e.clientX-r.left)/r.width;
    return snap(clamp(min+Math.max(0,Math.min(1,p))*(max-min)));}
  function move(e){if(!dragging)return;e.preventDefault();val=fromE(e);ui(val);
    const lbl=el.closest('.hsl,.fader');const b=lbl&&lbl.querySelector('b,.v');if(b&&fmt)b.textContent=fmt(val);
    const n=performance.now();if(n-last>85){last=n;onSend(val);}}
  el.addEventListener('pointerdown',e=>{dragging=true;el.classList.add('drag');el.setPointerCapture&&el.setPointerCapture(e.pointerId);move(e);vibe(6);});
  el.addEventListener('pointermove',move);
  const end=()=>{if(dragging){dragging=false;el.classList.remove('drag');onSend(val);}};
  el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
  return {set:v=>{if(!dragging){val=v;ui(v);}},dragging:()=>dragging};
}
const sliderSend=(path,action)=>v=>{mark(path,v);send(action,v);};
const pInt =makeSlider($('#fInt'), {min:0,max:2.5,step:.05,vertical:true,fmt:v=>Math.round(v*100)+'%',onSend:sliderSend('intensity','intensity')});
const pBass=makeSlider($('#fBass'),{min:0,max:2.5,step:.05,vertical:true,fmt:v=>Math.round(v*100)+'%',onSend:sliderSend('eqBass','eqBass')});
const pMid =makeSlider($('#fMid'), {min:0,max:2.5,step:.05,vertical:true,fmt:v=>Math.round(v*100)+'%',onSend:sliderSend('eqMid','eqMid')});
const pTreb=makeSlider($('#fTreb'),{min:0,max:2.5,step:.05,vertical:true,fmt:v=>Math.round(v*100)+'%',onSend:sliderSend('eqTreble','eqTreble')});
const pSens=makeSlider($('#sSens'),{min:.4,max:3,step:.1,fmt:v=>v.toFixed(1),onSend:sliderSend('beatSens','beatSens')});
const pDur =makeSlider($('#transDur'),{min:.1,max:2,step:.05,fmt:v=>v.toFixed(2)+'s',onSend:sliderSend('trans.dur','transDur')});
const pOp  =makeSlider($('#ovOp'),{min:0,max:1,step:.01,fmt:v=>Math.round(v*100)+'%',onSend:sliderSend('overlays.opacity','overlayOpacity')});

/* ---- render from display state ---- */
let sSig='',oSig='';
function segOn(id,v){$$('#'+id+' button').forEach(b=>b.classList.toggle('on',b.dataset.v===String(v)));}
function render(){
  // scene pads
  if(Array.isArray(S.names)){
    const tot=S.names.length, sig=S.names.join('|');
    if(sig!==sSig){sSig=sig;
      $('#sceneGrid').innerHTML=S.names.map((n,i)=>`<button class="pad" data-i="${i}" style="--h:${Math.round(i/tot*330)}"><span class="n">${i+1}</span><span>${n}</span></button>`).join('');
      $$('#sceneGrid .pad').forEach(p=>p.onclick=()=>{const i=+p.dataset.i;send('scene',i);opt('mode',i);});
    }
    $$('#sceneGrid .pad').forEach((p,i)=>p.classList.toggle('on',i===S.mode));
    const nm=S.names[S.mode]||'—';
    $('#nowScene').textContent=nm; document.body.style.setProperty('--nh',Math.round((S.mode||0)/tot*330));
    $('#nowSub').textContent=(S.track?S.track+'  ·  ':'')+'SCENE '+((S.mode||0)+1)+'/'+tot+(S.shuffle?'  ·  SHUFFLE':'');
  }
  // overlays pads
  const ov=S.overlays||{};
  if(Array.isArray(ov.list)){
    const sig=ov.list.join('|');
    if(sig!==oSig){oSig=sig;
      $('#ovGrid').innerHTML=ov.list.length?ov.list.map((n,i)=>`<button class="pad play" data-i="${i}" style="--h:${315+(i%3)*12}"><span class="n">${i+1}</span><span>${n}</span></button>`).join(''):'<div class="empty">Sin clips en el banco.</div>';
      $$('#ovGrid .pad').forEach(p=>p.onclick=()=>{const i=+p.dataset.i;send('overlay',i);opt('overlays.active',(S.overlays&&S.overlays.active===i)?-1:i);});
    }
    $$('#ovGrid .pad').forEach((p,i)=>p.classList.toggle('on',i===ov.active));
  }
  // header / transport
  $('#pp').textContent=S.playing?'❚❚':'▶';
  $('#shufPill').classList.toggle('on',!!S.shuffle); $('#shufT').classList.toggle('on',!!S.shuffle);
  // transition
  segOn('transSeg',S.trans&&S.trans.type);
  if(S.trans){pDur.set(S.trans.dur); if(!pDur.dragging())$('#transDurV').textContent=(+S.trans.dur).toFixed(2)+'s';}
  // overlay controls
  segOn('ovBlendSeg',ov.blend);
  if(ov.opacity!=null){pOp.set(ov.opacity); if(!pOp.dragging())$('#ovOpV').textContent=Math.round(ov.opacity*100)+'%';}
  $('#ovAutoBtn').classList.toggle('on',!!ov.auto);
  // mix
  const setF=(p,el,v,f)=>{if(v!=null){p.set(v); if(!p.dragging())$(el).textContent=f(v);}};
  setF(pInt,'#vInt',S.intensity,v=>Math.round(v*100)+'%');
  setF(pBass,'#vBass',S.eqBass,v=>Math.round(v*100)+'%');
  setF(pMid,'#vMid',S.eqMid,v=>Math.round(v*100)+'%');
  setF(pTreb,'#vTreb',S.eqTreble,v=>Math.round(v*100)+'%');
  setF(pSens,'#vSens',S.beatSens,v=>(+v).toFixed(1));
  // fx
  $('#blackoutBtn').classList.toggle('live',!!S.blackout);
  $('#whiteoutBtn').classList.toggle('live',!!S.whiteout);
  $('#blurBtn').classList.toggle('on',S.blur>0);
  $('#hueBtn').classList.toggle('on',!!S.hue);
  $('#strobeBtn').classList.toggle('on',S.strobe&&S.strobe!=='off');
  $('#strobeBtn').querySelector('.ic').nextSibling.textContent='STROBE'+(S.strobe&&S.strobe!=='off'?' · '+S.strobe.toUpperCase():'');
}

/* ---- poll state ---- */
let lastOk=0;
async function poll(){
  try{const j=await(await fetch(RELAY+'?channel=state',{cache:'no-store'})).json();
    if(j&&j.names){S=j;const now=performance.now();
      for(const p in ovStore){ if(now<ovStore[p].until) pSet(S,p,ovStore[p].v); else delete ovStore[p]; }
      lastOk=now;render();}}catch(e){}
  const live=performance.now()-lastOk<2500;
  $('#orb').classList.toggle('on',live);
  $('#connTxt').textContent=live?'LIVE':'OFF';
  if(!live)$('#nowSub').textContent='sin pantalla — abre el visualizador en el PC';
}
poll(); setInterval(poll,250);
</script>
</body>
</html>
