import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageSquare, Zap, Footprints, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import sound from '../utils/SoundEngine';

/* ─────────────────────────────────────────────
   SPRITE SHEET  —  SpriteSheet.png
   1536 × 1024  →  6 cols × 4 rows, each 256×256
   Row 0 = DOWN | Row 1 = UP | Row 2 = LEFT | Row 3 = RIGHT
───────────────────────────────────────────────── */
const FRAME_W     = 256;
const FRAME_H     = 256;
const SHEET_W     = 1536;
const SHEET_H     = 1024;
const WALK_COLS   = 6;
const ANIM_FPS    = 9;
const RENDER_SIZE = 80;
const SCALE       = RENDER_SIZE / FRAME_W;
const DIR_ROW     = { down: 0, up: 1, left: 2, right: 3 };

// Map virtual-coordinate space
const MAP_W = 960;
const MAP_H = 600;
const BOUNDS = { minX: 80, maxX: 880, minY: 140, maxY: 540 };

const ELDER_POS = { x: 380, y: 460 };

function VedSprite({ facingRef, isMovingRef }) {
  const divRef     = useRef(null);
  const frameRef   = useRef(0);
  const lastTick   = useRef(0);
  const rafRef     = useRef(null);

  useEffect(() => {
    const tick = (ts) => {
      if (!divRef.current) { rafRef.current = requestAnimationFrame(tick); return; }

      const moving = isMovingRef.current;
      const row    = DIR_ROW[facingRef.current] ?? 0;
      let   col    = frameRef.current;

      if (moving) {
        if (ts - lastTick.current >= 1000 / ANIM_FPS) {
          lastTick.current = ts;
          col = (col + 1) % WALK_COLS;
          frameRef.current = col;
        }
      } else {
        col = 0;
        frameRef.current = 0;
      }

      const bgX = -(col  * FRAME_W * SCALE);
      const bgY = -(row  * FRAME_H * SCALE);
      divRef.current.style.backgroundPosition = `${bgX}px ${bgY}px`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []); // runs once — reads live refs every frame

  return (
    <div
      ref={divRef}
      style={{
        width:           RENDER_SIZE,
        height:          RENDER_SIZE,
        backgroundImage: `url('/assets/SpriteSheet.png')`,
        backgroundSize:  `${SHEET_W * SCALE}px ${SHEET_H * SCALE}px`,
        backgroundRepeat:'no-repeat',
        imageRendering:  'pixelated',
        flexShrink:      0,
      }}
    />
  );
}

export default function WorldExploreScreen({ onNavigate }) {
  /* ── React state (only for UI that needs re-render) ── */
  const [nearElder,    setNearElder]    = useState(false);
  const [selectedNpc,  setSelectedNpc]  = useState(null);
  const [isSprinting,  setIsSprinting]  = useState(false);
  // Minimap marker uses state so it re-renders at a throttled rate
  const [minimapPos,   setMinimapPos]   = useState({ x: 480, y: 380 });

  /* ── Refs — drive the hot path without React re-renders ── */
  const playerDivRef   = useRef(null);   // the absolutely-positioned player wrapper
  const shadowRef      = useRef(null);
  const posRef         = useRef({ x: 480, y: 380 });
  const facingRef      = useRef('down');
  const isMovingRef    = useRef(false);
  const isSprintingRef = useRef(false);
  const keysRef        = useRef({});
  const nearElderRef   = useRef(false);
  const rafLoopRef     = useRef(null);
  const minimapThrottle= useRef(0);

  const canvasRef = useRef(null);

  const npcs = [
    { id: 1, name: "Clay Potter",       x: 220, y: 380, asset: '/assets/clay_potter.png',     greeting: "I shape clay from the river into pots for everyday use." },
    { id: 2, name: "Textile Merchant",  x: 740, y: 440, asset: '/assets/textile_merchant.png',greeting: "Fine textiles from our city are traded far and wide." },
    { id: 3, name: "Granary Worker",    x: 580, y: 260, asset: '/assets/granary_worker.png',   greeting: "We store grains from the farms for the whole city." },
    { id: 4, name: "Boatman",           x: 760, y: 160, asset: '/assets/boatman.png',          greeting: "I help people and goods travel across the river." }
  ];

  const handleTalkToElder = useCallback(() => {
    sound.playReward();
    onNavigate('dialogue');
  }, [onNavigate]);

  /* ── Keyboard listeners ── */
  useEffect(() => {
    const down = (e) => {
      keysRef.current[e.key.toLowerCase()] = true;
      if (['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d',' '].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
      if ((e.key.toLowerCase() === 'e' || e.key === ' ') && nearElderRef.current) {
        handleTalkToElder();
      }
    };
    const up = (e) => { keysRef.current[e.key.toLowerCase()] = false; };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup',   up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, [handleTalkToElder]);

  /* ── Keep sprint ref in sync ── */
  useEffect(() => { isSprintingRef.current = isSprinting; }, [isSprinting]);

  /* ── Main game loop — pure ref-based, zero React setState in the hot path ── */
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const k = keysRef.current;
      let dx = 0, dy = 0;
      if (k['w'] || k['arrowup'])    dy -= 1;
      if (k['s'] || k['arrowdown'])  dy += 1;
      if (k['a'] || k['arrowleft'])  dx -= 1;
      if (k['d'] || k['arrowright']) dx += 1;

      const moving = dx !== 0 || dy !== 0;
      isMovingRef.current = moving;

      if (moving) {
        const speed = isSprintingRef.current ? 220 : 140;
        const len   = Math.sqrt(dx * dx + dy * dy);
        const newX  = Math.max(BOUNDS.minX, Math.min(BOUNDS.maxX, posRef.current.x + (dx / len) * speed * dt));
        const newY  = Math.max(BOUNDS.minY, Math.min(BOUNDS.maxY, posRef.current.y + (dy / len) * speed * dt));
        posRef.current = { x: newX, y: newY };

        // Update facing
        if (Math.abs(dx) > Math.abs(dy)) facingRef.current = dx > 0 ? 'right' : 'left';
        else                              facingRef.current = dy > 0 ? 'down'  : 'up';

        // Move the DOM element directly — no setState
        if (playerDivRef.current) {
          playerDivRef.current.style.left      = `${(newX / MAP_W) * 100}%`;
          playerDivRef.current.style.top       = `${(newY / MAP_H) * 100}%`;
        }

        // Throttle minimap state update to ~10 fps
        minimapThrottle.current += dt;
        if (minimapThrottle.current >= 0.1) {
          minimapThrottle.current = 0;
          setMinimapPos({ x: newX, y: newY });
        }
      }

      // Proximity check
      const dist = Math.hypot(posRef.current.x - ELDER_POS.x, posRef.current.y - ELDER_POS.y);
      const near = dist < 90;
      if (near !== nearElderRef.current) {
        nearElderRef.current = near;
        setNearElder(near); // only re-renders when it actually changes
      }

      rafLoopRef.current = requestAnimationFrame(loop);
    };

    rafLoopRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafLoopRef.current);
  }, []); // ← runs once, everything via refs

  /* ── Click to teleport ── */
  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const cx   = ((e.clientX - rect.left)  / rect.width)  * MAP_W;
    const cy   = ((e.clientY - rect.top)   / rect.height) * MAP_H;
    if (Math.hypot(cx - ELDER_POS.x, cy - ELDER_POS.y) < 60) { handleTalkToElder(); return; }
    sound.playClick();
    const np = { x: Math.max(BOUNDS.minX, Math.min(BOUNDS.maxX, cx)), y: Math.max(BOUNDS.minY, Math.min(BOUNDS.maxY, cy)) };
    posRef.current = np;
    setMinimapPos(np);
    if (playerDivRef.current) {
      playerDivRef.current.style.left = `${(np.x / MAP_W) * 100}%`;
      playerDivRef.current.style.top  = `${(np.y / MAP_H) * 100}%`;
    }
  };

  /* ── D-Pad ── */
  const dPadDown = (dir) => { const m = {up:'arrowup',down:'arrowdown',left:'arrowleft',right:'arrowright'}; keysRef.current[m[dir]] = true; };
  const dPadUp   = (dir) => { const m = {up:'arrowup',down:'arrowdown',left:'arrowleft',right:'arrowright'}; keysRef.current[m[dir]] = false; };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between select-none bg-stone-950">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/assets/world_isometric.png')` }} />

      {/* Entity layer */}
      <div ref={canvasRef} onClick={handleCanvasClick} className="absolute inset-0 z-20 cursor-crosshair">

        {/* City Elder */}
        <div
          style={{ left: `${(ELDER_POS.x / MAP_W) * 100}%`, top: `${(ELDER_POS.y / MAP_H) * 100}%` }}
          className="absolute -translate-x-1/2 -translate-y-full group z-30"
        >
          {selectedNpc === 'elder' && (
            <div className="absolute bottom-full left-1/2 z-50 mb-2 w-48 -translate-x-1/2 pointer-events-none parchment-box npc-dialogue-popup px-3 py-2 text-center font-philosopher text-xs leading-snug text-amber-950">
              Our city thrives because of the canal and its people.
            </div>
          )}
          <div className="flex flex-col items-center quest-marker">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 border-2 border-white shadow-lg shadow-amber-500/80 flex items-center justify-center font-black text-amber-950 text-sm">!</div>
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-amber-400" />
          </div>
          <div className="mt-1 flex flex-col items-center">
            <div onClick={(e) => { e.stopPropagation(); sound.playClick(); setSelectedNpc('elder'); handleTalkToElder(); }}
              className="w-16 h-16 rounded-full border-2 border-amber-300 bg-amber-950/80 p-0.5 shadow-xl group-hover:scale-110 transition-transform overflow-hidden cursor-pointer">
              <img src="/assets/city_elder.png" alt="City Elder" className="w-full h-full object-contain" style={{ filter: 'drop-shadow(0 0 1px #D4AF37) drop-shadow(0 0 4px rgba(255,215,106,0.7))' }} />
            </div>
            <span className="mt-1 px-2 py-0.5 rounded bg-amber-950/90 border border-amber-500 text-[10px] font-cinzel font-bold text-amber-200 tracking-wider whitespace-nowrap shadow">City Elder</span>
          </div>
        </div>

        {/* Ambient NPCs */}
        {npcs.map(npc => (
          <div key={npc.id} style={{ left: `${(npc.x / MAP_W) * 100}%`, top: `${(npc.y / MAP_H) * 100}%` }}
            className="absolute -translate-x-1/2 -translate-y-full group opacity-90 hover:opacity-100 transition-opacity">
            {selectedNpc === npc.id && (
              <div className="absolute bottom-full left-1/2 z-50 mb-2 w-48 -translate-x-1/2 pointer-events-none parchment-box npc-dialogue-popup px-3 py-2 text-center font-philosopher text-xs leading-snug text-amber-950">{npc.greeting}</div>
            )}
            <div onClick={(e) => { e.stopPropagation(); sound.playClick(); setSelectedNpc(npc.id); }}
              className="w-14 h-14 rounded-full bg-stone-900/80 border border-amber-600 flex items-center justify-center text-base shadow-md group-hover:scale-110 transition-transform overflow-hidden cursor-pointer">
              <img src={npc.asset} alt={npc.name} className="w-full h-full object-contain" style={{ filter: 'drop-shadow(0 0 1px #D4AF37) drop-shadow(0 0 4px rgba(255,215,106,0.7))' }} />
            </div>
            <span className="hidden group-hover:block absolute top-full mt-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-philosopher text-amber-200 whitespace-nowrap border border-amber-800">{npc.name}</span>
          </div>
        ))}

        {/* ── VED — position driven by direct DOM style, not React state ── */}
        <div
          ref={playerDivRef}
          className="absolute z-40 pointer-events-none"
          style={{
            left:      `${(posRef.current.x / MAP_W) * 100}%`,
            top:       `${(posRef.current.y / MAP_H) * 100}%`,
            transform: `translate(-${RENDER_SIZE / 2}px, -${RENDER_SIZE}px)`,
          }}
        >
          {/* Shadow */}
          <div ref={shadowRef} style={{
            width: RENDER_SIZE * 0.55, height: RENDER_SIZE * 0.14,
            background: 'rgba(0,0,0,0.35)', borderRadius: '50%', filter: 'blur(2px)',
            position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
          }} />

          {/* Animated sprite — reads facingRef & isMovingRef every rAF tick */}
          <VedSprite facingRef={facingRef} isMovingRef={isMovingRef} />

          {/* Name tag */}
          <div style={{
            position: 'absolute', bottom: -14, left: '50%', transform: 'translateX(-50%)',
            whiteSpace: 'nowrap', padding: '1px 7px', borderRadius: 999,
            background: 'rgba(8,30,60,0.88)', border: '1px solid rgba(100,180,255,0.5)',
            fontFamily: 'Cinzel, serif', fontSize: '8px', fontWeight: 700,
            color: '#bae6fd', letterSpacing: '0.08em', boxShadow: '0 1px 4px rgba(0,0,0,0.6)',
          }}>VED</div>
        </div>
      </div>

      {/* Top HUD */}
      <div className="relative z-30 flex items-start justify-between p-4 pt-16 pointer-events-none">
        <div className="parchment-box p-3 sm:p-4 max-w-xs sm:max-w-sm shadow-xl pointer-events-auto">
          <div className="flex items-center gap-1.5 text-amber-900 font-cinzel text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
            CURRENT QUEST:
          </div>
          <p className="font-philosopher text-stone-900 text-sm font-semibold mt-1 leading-snug">
            Explore the city and talk to the City Elder near the broken canal.
          </p>
          <div className="mt-2 text-[11px] font-philosopher text-amber-900/80 italic">
            Controls: WASD / Arrow keys or D-Pad to walk.
          </div>
        </div>

        {/* Minimap */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl carved-tablet p-1.5 shadow-2xl border-2 border-amber-400 pointer-events-auto bg-stone-950/90 relative overflow-hidden">
          <div className="w-full h-full rounded-lg relative bg-cover bg-center" style={{ backgroundImage: "url('/assets/world_isometric.png')" }}>
            <div style={{ left: `${(ELDER_POS.x / MAP_W) * 100}%`, top: `${(ELDER_POS.y / MAP_H) * 100}%` }}
              className="w-3 h-3 rounded-full bg-amber-400 border border-white absolute -translate-x-1/2 -translate-y-1/2 animate-ping" />
            <div style={{ left: `${(minimapPos.x / MAP_W) * 100}%`, top: `${(minimapPos.y / MAP_H) * 100}%` }}
              className="w-2.5 h-2.5 rounded-full bg-sky-300 border-2 border-white absolute -translate-x-1/2 -translate-y-1/2 shadow-lg" />
            <div className="absolute bottom-1 right-1 text-[8px] font-cinzel text-amber-300 font-bold bg-black/60 px-1 rounded">MAP</div>
          </div>
        </div>
      </div>

      {/* Elder proximity prompt */}
      {nearElder && (
        <div className="relative z-30 mx-auto mb-2 pointer-events-auto animate-bounce">
          <button onClick={handleTalkToElder} className="btn-gold px-6 py-2.5 text-sm sm:text-base flex items-center gap-2 shadow-2xl border-2 border-amber-200">
            <MessageSquare className="w-5 h-5 text-amber-950" />
            <span>TALK TO CITY ELDER (SPACE / E)</span>
          </button>
        </div>
      )}

      {/* Bottom controls */}
      <div className="relative z-30 flex items-end justify-between p-4 pointer-events-none">
        {/* D-Pad */}
        <div className="pointer-events-auto grid grid-cols-3 gap-1 bg-[#24160f]/90 p-2 rounded-2xl border border-amber-700/70 shadow-2xl backdrop-blur-sm">
          <div /><button onPointerDown={() => dPadDown('up')}    onPointerUp={() => dPadUp('up')}    onPointerLeave={() => dPadUp('up')}    className="w-10 h-10 rounded-lg bg-[#4a2d1b] active:bg-amber-700 border border-amber-500/60 flex items-center justify-center text-amber-100"><ChevronUp    className="w-5 h-5" /></button><div />
          <button onPointerDown={() => dPadDown('left')}   onPointerUp={() => dPadUp('left')}   onPointerLeave={() => dPadUp('left')}   className="w-10 h-10 rounded-lg bg-[#4a2d1b] active:bg-amber-700 border border-amber-500/60 flex items-center justify-center text-amber-100"><ChevronLeft  className="w-5 h-5" /></button>
          <div className="w-10 h-10 rounded-lg bg-[#2f1d12] border border-amber-800/60 flex items-center justify-center text-[10px] font-cinzel text-amber-300/90 font-bold">MOVE</div>
          <button onPointerDown={() => dPadDown('right')}  onPointerUp={() => dPadUp('right')}  onPointerLeave={() => dPadUp('right')}  className="w-10 h-10 rounded-lg bg-[#4a2d1b] active:bg-amber-700 border border-amber-500/60 flex items-center justify-center text-amber-100"><ChevronRight className="w-5 h-5" /></button>
          <div /><button onPointerDown={() => dPadDown('down')}   onPointerUp={() => dPadUp('down')}   onPointerLeave={() => dPadUp('down')}   className="w-10 h-10 rounded-lg bg-[#4a2d1b] active:bg-amber-700 border border-amber-500/60 flex items-center justify-center text-amber-100"><ChevronDown  className="w-5 h-5" /></button><div />
        </div>

        {/* Action buttons */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button onClick={handleTalkToElder}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 border-2 border-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            title="Interact with NPC">
            <MessageSquare className="w-6 h-6 text-amber-950" />
          </button>
          <button onClick={() => { sound.playClick(); setIsSprinting(s => !s); }}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-amber-300 shadow-xl flex items-center justify-center transition-all ${isSprinting ? 'bg-gradient-to-br from-sky-400 to-sky-700 scale-105' : 'bg-stone-900/90'}`}
            title="Toggle Sprint">
            {isSprinting ? <Zap className="w-6 h-6 text-yellow-300 animate-pulse" /> : <Footprints className="w-6 h-6 text-amber-300" />}
          </button>
        </div>
      </div>
    </div>
  );
}
