import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Zap, Compass, Footprints, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import sound from '../utils/SoundEngine';

export default function WorldExploreScreen({ onNavigate }) {
  // Player state
  const [playerPos, setPlayerPos] = useState({ x: 480, y: 380 });
  const [playerFacing, setPlayerFacing] = useState('down');
  const [isMoving, setIsMoving] = useState(false);
  const [isSprinting, setIsSprinting] = useState(false);
  const [nearElder, setNearElder] = useState(false);
  const [dialogueHint, setDialogueHint] = useState("Walk to the City Elder near the canal.");

  // City Elder location
  const elderPos = { x: 380, y: 460, name: "City Elder", role: "Harappan Master Planner" };

  // Other NPCs in the city
  const npcs = [
    { id: 1, name: "Clay Potter", x: 220, y: 380, icon: "🏺", greeting: "Finest painted terracotta pots in the lower town!" },
    { id: 2, name: "Textile Merchant", x: 740, y: 440, icon: "🧵", greeting: "Spun cotton dyed in vibrant madder red!" },
    { id: 3, name: "Granary Worker", x: 580, y: 260, icon: "🌾", greeting: "The great granary is well stocked for the season." },
    { id: 4, name: "Boatman", x: 760, y: 160, icon: "⛵", greeting: "The river carries trade beads all the way to Mesopotamia!" }
  ];

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const keysPressed = useRef({});

  // Keyboard movement handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd', ' '].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
      if (e.key.toLowerCase() === 'e' || e.key === ' ') {
        if (nearElder) {
          handleTalkToElder();
        }
      }
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [nearElder]);

  // Main game loop for character movement and proximity detection
  useEffect(() => {
    let lastTime = performance.now();

    const updateLoop = (currentTime) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      let dx = 0;
      let dy = 0;
      const speed = isSprinting ? 220 : 140;

      if (keysPressed.current['w'] || keysPressed.current['arrowup']) dy -= 1;
      if (keysPressed.current['s'] || keysPressed.current['arrowdown']) dy += 1;
      if (keysPressed.current['a'] || keysPressed.current['arrowleft']) dx -= 1;
      if (keysPressed.current['d'] || keysPressed.current['arrowright']) dx += 1;

      if (dx !== 0 || dy !== 0) {
        setIsMoving(true);
        // Normalize diagonal speed
        const length = Math.sqrt(dx * dx + dy * dy);
        const moveX = (dx / length) * speed * dt;
        const moveY = (dy / length) * speed * dt;

        if (Math.abs(dx) > Math.abs(dy)) {
          setPlayerFacing(dx > 0 ? 'right' : 'left');
        } else {
          setPlayerFacing(dy > 0 ? 'down' : 'up');
        }

        setPlayerPos(prev => ({
          x: Math.max(80, Math.min(880, prev.x + moveX)),
          y: Math.max(140, Math.min(540, prev.y + moveY))
        }));
      } else {
        setIsMoving(false);
      }

      // Proximity check with City Elder
      const distToElder = Math.hypot(playerPos.x - elderPos.x, playerPos.y - elderPos.y);
      if (distToElder < 90) {
        setNearElder(true);
        setDialogueHint("Press [TALK] or click City Elder to converse.");
      } else {
        setNearElder(false);
      }

      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameRef.current = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [playerPos, isSprinting, elderPos]);

  // Click on canvas to move or interact
  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 960;
    const clickY = ((e.clientY - rect.top) / rect.height) * 600;

    // Check if clicked near City Elder
    const distToElder = Math.hypot(clickX - elderPos.x, clickY - elderPos.y);
    if (distToElder < 60) {
      handleTalkToElder();
      return;
    }

    // Otherwise move towards click position
    sound.playClick();
    setPlayerPos({
      x: Math.max(80, Math.min(880, clickX)),
      y: Math.max(140, Math.min(540, clickY))
    });
  };

  const handleTalkToElder = () => {
    sound.playReward();
    onNavigate('dialogue');
  };

  // Virtual D-Pad buttons for mobile / touch
  const handleDPadPress = (dir) => {
    const step = 45;
    let newX = playerPos.x;
    let newY = playerPos.y;
    if (dir === 'up') { newY -= step; setPlayerFacing('up'); }
    if (dir === 'down') { newY += step; setPlayerFacing('down'); }
    if (dir === 'left') { newX -= step; setPlayerFacing('left'); }
    if (dir === 'right') { newX += step; setPlayerFacing('right'); }

    setPlayerPos({
      x: Math.max(80, Math.min(880, newX)),
      y: Math.max(140, Math.min(540, newY))
    });
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between select-none bg-stone-950">
      {/* Background Isometric City Artwork */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-300"
        style={{
          backgroundImage: `url('/assets/world_isometric.jpg')`,
          filter: 'brightness(0.95)'
        }}
      >
        {/* Dynamic Water Animation Overlay over the canal */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background: 'linear-gradient(45deg, transparent 40%, rgba(56, 189, 248, 0.4) 50%, transparent 60%)',
            backgroundSize: '200% 200%',
            animation: 'waterFlowAnim 4s linear infinite'
          }}
        ></div>
      </div>

      {/* Interactive Entity Layer Canvas / Overlay */}
      <div 
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 z-20 cursor-crosshair"
      >
        {/* City Elder NPC with Animated [!] Quest Marker */}
        <div 
          onClick={(e) => { e.stopPropagation(); handleTalkToElder(); }}
          style={{ left: `${(elderPos.x / 960) * 100}%`, top: `${(elderPos.y / 600) * 100}%` }}
          className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group z-30"
        >
          {/* Quest Icon Exclamation Mark */}
          <div className="flex flex-col items-center quest-marker">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 border-2 border-white shadow-lg shadow-amber-500/80 flex items-center justify-center font-black text-amber-950 text-sm">
              !
            </div>
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-amber-400"></div>
          </div>

          {/* Elder Avatar Indicator */}
          <div className="mt-1 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-2 border-amber-300 bg-amber-950/80 p-0.5 shadow-xl group-hover:scale-110 transition-transform overflow-hidden">
              <div className="w-full h-full rounded-full bg-gradient-to-b from-amber-700 to-stone-900 flex items-center justify-center text-xl">
                👳‍♂️
              </div>
            </div>
            <span className="mt-1 px-2 py-0.5 rounded bg-amber-950/90 border border-amber-500 text-[10px] font-cinzel font-bold text-amber-200 tracking-wider whitespace-nowrap shadow">
              {elderPos.name}
            </span>
          </div>
        </div>

        {/* Ambient NPCs in the city */}
        {npcs.map(npc => (
          <div
            key={npc.id}
            style={{ left: `${(npc.x / 960) * 100}%`, top: `${(npc.y / 600) * 100}%` }}
            className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group opacity-90 hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              alert(`${npc.name}: "${npc.greeting}"`);
            }}
          >
            <div className="w-9 h-9 rounded-full bg-stone-900/80 border border-amber-600 flex items-center justify-center text-base shadow-md group-hover:scale-110 transition-transform">
              {npc.icon}
            </div>
            <span className="hidden group-hover:block absolute top-full mt-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-philosopher text-amber-200 whitespace-nowrap border border-amber-800">
              {npc.name}
            </span>
          </div>
        ))}

        {/* Controllable Player Character (Explorer Boy with Backpack) */}
        <div 
          style={{ left: `${(playerPos.x / 960) * 100}%`, top: `${(playerPos.y / 600) * 100}%` }}
          className="absolute -translate-x-1/2 -translate-y-full z-40 transition-all duration-75 pointer-events-none"
        >
          {/* Dynamic Shadow */}
          <div className="w-8 h-3 bg-black/40 rounded-full blur-[1px] absolute -bottom-1 left-1/2 -translate-x-1/2"></div>

          {/* Explorer Avatar */}
          <div className={`relative flex flex-col items-center ${isMoving ? 'animate-bounce' : ''}`}>
            {/* Backpack tag */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 via-sky-600 to-amber-900 border-2 border-white shadow-xl flex items-center justify-center text-lg">
              🎒
            </div>
            <div className="px-2 py-0.5 rounded-full bg-sky-950/90 border border-sky-400 text-[9px] font-cinzel font-bold text-sky-200 shadow mt-0.5">
              Player (Raj)
            </div>
          </div>
        </div>
      </div>

      {/* Top HUD: Quest Box (Left) & Radar Minimap (Right) - Matching PDF Page 2 */}
      <div className="relative z-30 flex items-start justify-between p-4 pt-16 pointer-events-none">
        {/* Quest Box (Top-Left) */}
        <div className="parchment-box p-3 sm:p-4 max-w-xs sm:max-w-sm shadow-xl pointer-events-auto">
          <div className="flex items-center gap-1.5 text-amber-900 font-cinzel text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping"></span>
            CURRENT QUEST:
          </div>
          <p className="font-philosopher text-stone-900 text-sm font-semibold mt-1 leading-snug">
            Explore the city and talk to the City Elder near the broken canal.
          </p>
          <div className="mt-2 text-[11px] font-philosopher text-amber-900/80 italic">
            Controls: WASD / Arrow keys or click ground to walk.
          </div>
        </div>

        {/* Minimap (Top-Right) */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl carved-tablet p-1.5 shadow-2xl border-2 border-amber-400 pointer-events-auto bg-stone-950/90 relative overflow-hidden">
          <div className="w-full h-full rounded-lg bg-[#3a2517] relative flex items-center justify-center">
            {/* Minimap River Path */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-sky-600/70 border-l border-sky-400"></div>
            {/* Minimap Street Grid */}
            <div className="absolute inset-x-0 h-2 top-1/2 -translate-y-1/2 bg-amber-900/60"></div>
            <div className="absolute inset-y-0 w-2 left-1/3 bg-amber-900/60"></div>

            {/* Elder Marker on Minimap */}
            <div 
              style={{ left: `${(elderPos.x / 960) * 100}%`, top: `${(elderPos.y / 600) * 100}%` }}
              className="w-3 h-3 rounded-full bg-amber-400 border border-white absolute -translate-x-1/2 -translate-y-1/2 animate-ping"
            ></div>

            {/* Player Marker on Minimap */}
            <div 
              style={{ left: `${(playerPos.x / 960) * 100}%`, top: `${(playerPos.y / 600) * 100}%` }}
              className="w-2.5 h-2.5 rounded-full bg-sky-300 border-2 border-white absolute -translate-x-1/2 -translate-y-1/2 shadow-lg"
            ></div>

            <div className="absolute bottom-1 right-1 text-[8px] font-cinzel text-amber-300 font-bold bg-black/60 px-1 rounded">
              MAP
            </div>
          </div>
        </div>
      </div>

      {/* Proximity Interaction Prompt Banner */}
      {nearElder && (
        <div className="relative z-30 mx-auto mb-2 pointer-events-auto animate-bounce">
          <button
            onClick={handleTalkToElder}
            className="btn-gold px-6 py-2.5 text-sm sm:text-base flex items-center gap-2 shadow-2xl border-2 border-amber-200"
          >
            <MessageSquare className="w-5 h-5 text-amber-950" />
            <span>TALK TO CITY ELDER (SPACE / E)</span>
          </button>
        </div>
      )}

      {/* Bottom Controls: Virtual D-Pad (Left) & Action Buttons (Right) - Matching PDF Page 2 */}
      <div className="relative z-30 flex items-end justify-between p-4 pointer-events-none">
        {/* Virtual D-Pad / Joystick (Bottom-Left) */}
        <div className="pointer-events-auto grid grid-cols-3 gap-1 bg-stone-950/80 p-2 rounded-2xl border border-amber-700/60 shadow-2xl backdrop-blur-sm">
          <div></div>
          <button 
            onClick={() => handleDPadPress('up')}
            className="w-10 h-10 rounded-lg bg-stone-800 active:bg-amber-600 border border-amber-500/40 flex items-center justify-center text-amber-200"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <div></div>
          <button 
            onClick={() => handleDPadPress('left')}
            className="w-10 h-10 rounded-lg bg-stone-800 active:bg-amber-600 border border-amber-500/40 flex items-center justify-center text-amber-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-lg bg-stone-900 border border-amber-800/40 flex items-center justify-center text-[10px] font-cinzel text-amber-400/80 font-bold">
            MOVE
          </div>
          <button 
            onClick={() => handleDPadPress('right')}
            className="w-10 h-10 rounded-lg bg-stone-800 active:bg-amber-600 border border-amber-500/40 flex items-center justify-center text-amber-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div></div>
          <button 
            onClick={() => handleDPadPress('down')}
            className="w-10 h-10 rounded-lg bg-stone-800 active:bg-amber-600 border border-amber-500/40 flex items-center justify-center text-amber-200"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
          <div></div>
        </div>

        {/* Action Buttons (Bottom-Right) - Match icons from Page 2 */}
        <div className="pointer-events-auto flex items-center gap-3">
          {/* Talk / Interact */}
          <button
            onClick={handleTalkToElder}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 border-2 border-white shadow-xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform"
            title="Interact with NPC"
          >
            <MessageSquare className="w-6 h-6 text-amber-950" />
          </button>

          {/* Sprint / Walk Mode */}
          <button
            onClick={() => { sound.playClick(); setIsSprinting(!isSprinting); }}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-amber-300 shadow-xl flex items-center justify-center transition-all ${
              isSprinting 
                ? 'bg-gradient-to-br from-sky-400 to-sky-700 text-white scale-105' 
                : 'bg-stone-900/90 text-amber-300'
            }`}
            title="Toggle Sprint"
          >
            {isSprinting ? <Zap className="w-6 h-6 text-yellow-300 animate-pulse" /> : <Footprints className="w-6 h-6 text-amber-300" />}
          </button>
        </div>
      </div>
    </div>
  );
}
