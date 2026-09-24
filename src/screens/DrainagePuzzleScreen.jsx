import React, { useState, useEffect, useCallback } from 'react';
import { RotateCw, RefreshCw, CheckCircle2, Sparkles, Droplets, HelpCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import sound from '../utils/SoundEngine';

// Pipe types and their connection directions: [North, East, South, West] (0/1)
// Rotations: 0 = 0deg, 1 = 90deg, 2 = 180deg, 3 = 270deg
const TILE_DEFINITIONS = {
  straight: {
    // 0: Horizontal [0, 1, 0, 1], 1: Vertical [1, 0, 1, 0]
    getDirs: (rot) => (rot % 2 === 0 ? [false, true, false, true] : [true, false, true, false]),
    name: 'Straight Channel'
  },
  corner: {
    // 0: East-South [0, 1, 1, 0], 1: South-West [0, 0, 1, 1], 2: West-North [1, 0, 0, 1], 3: North-East [1, 1, 0, 0]
    getDirs: (rot) => {
      const base = [false, true, true, false];
      const r = rot % 4;
      return [base[(4 - r + 0) % 4], base[(4 - r + 1) % 4], base[(4 - r + 2) % 4], base[(4 - r + 3) % 4]];
    },
    name: 'Corner Elbow'
  },
  t_junction: {
    // 0: East-South-West [0, 1, 1, 1], 1: South-West-North [1, 0, 1, 1], 2: West-North-East [1, 1, 0, 1], 3: North-East-South [1, 1, 1, 0]
    getDirs: (rot) => {
      const base = [false, true, true, true];
      const r = rot % 4;
      return [base[(4 - r + 0) % 4], base[(4 - r + 1) % 4], base[(4 - r + 2) % 4], base[(4 - r + 3) % 4]];
    },
    name: 'T-Junction'
  },
  cross: {
    getDirs: () => [true, true, true, true],
    name: 'Crossroad Conduit'
  }
};

// Initial grid setup (3 rows x 4 cols)
// House 1 enters at (0, 0) from North
// House 2 enters at (0, 2) from North
// House 3 enters at (0, 3) from North
// Main River Drain is at (2, 1) and exits to South
const INITIAL_GRID = [
  // Row 0
  [
    { type: 'corner', targetRot: 0, rot: 3, id: '0-0' }, // Connects N to E
    { type: 'straight', targetRot: 0, rot: 1, id: '0-1' }, // Connects W to E
    { type: 't_junction', targetRot: 0, rot: 2, id: '0-2' }, // Connects N, W, S
    { type: 'corner', targetRot: 1, rot: 0, id: '0-3' }  // Connects N to W
  ],
  // Row 1
  [
    { type: 'straight', targetRot: 1, rot: 0, id: '1-0' }, // Connects N to S
    { type: 'corner', targetRot: 3, rot: 1, id: '1-1' }, // Connects N to E
    { type: 'cross', targetRot: 0, rot: 0, id: '1-2' }, // Connects all
    { type: 'straight', targetRot: 1, rot: 0, id: '1-3' }  // Connects N to S
  ],
  // Row 2
  [
    { type: 'corner', targetRot: 3, rot: 2, id: '2-0' }, // Connects N to E
    { type: 't_junction', targetRot: 2, rot: 0, id: '2-1' }, // Main Drain Sump (Connects N, W, S to River!)
    { type: 'corner', targetRot: 2, rot: 1, id: '2-2' }, // Connects W to N
    { type: 'corner', targetRot: 2, rot: 0, id: '2-3' }  // Connects N to W
  ]
];

export default function DrainagePuzzleScreen({ onNavigate, onCompleteChallenge }) {
  const [grid, setGrid] = useState(INITIAL_GRID);
  const [activeWaterTiles, setActiveWaterTiles] = useState(new Set());
  const [isSolved, setIsSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintMessage, setHintMessage] = useState("");

  // Calculate water flow pathfinding
  const checkWaterFlow = useCallback(() => {
    const active = new Set();
    const rows = grid.length;
    const cols = grid[0].length;

    // Helper to get directions for a tile
    const getDirs = (r, c) => {
      const tile = grid[r][c];
      return TILE_DEFINITIONS[tile.type].getDirs(tile.rot);
    };

    // Breadth-first search from house inlets (0,0), (0,2), (0,3)
    const sources = [
      { r: 0, c: 0, fromDir: 0 }, // North entry
      { r: 0, c: 2, fromDir: 0 },
      { r: 0, c: 3, fromDir: 0 }
    ];

    const visited = new Set();
    const queue = [];

    sources.forEach(s => {
      const dirs = getDirs(s.r, s.c);
      // North opening must be true (index 0 is North)
      if (dirs[0]) {
        queue.push({ r: s.r, c: s.c });
        active.add(`${s.r}-${s.c}`);
      }
    });

    while (queue.length > 0) {
      const { r, c } = queue.shift();
      const key = `${r}-${c}`;
      if (visited.has(key)) continue;
      visited.add(key);

      const [n, e, s, w] = getDirs(r, c);

      // Check North neighbor
      if (n && r > 0) {
        const neighborDirs = getDirs(r - 1, c);
        if (neighborDirs[2]) { // Neighbor opens South
          active.add(`${r - 1}-${c}`);
          queue.push({ r: r - 1, c: c });
        }
      }
      // Check East neighbor
      if (e && c < cols - 1) {
        const neighborDirs = getDirs(r, c + 1);
        if (neighborDirs[3]) { // Neighbor opens West
          active.add(`${r}-${c + 1}`);
          queue.push({ r: r, c: c + 1 });
        }
      }
      // Check South neighbor
      if (s && r < rows - 1) {
        const neighborDirs = getDirs(r + 1, c);
        if (neighborDirs[0]) { // Neighbor opens North
          active.add(`${r + 1}-${c}`);
          queue.push({ r: r + 1, c: c });
        }
      }
      // Check West neighbor
      if (w && c > 0) {
        const neighborDirs = getDirs(r, c - 1);
        if (neighborDirs[1]) { // Neighbor opens East
          active.add(`${r}-${c - 1}`);
          queue.push({ r: r, c: c - 1 });
        }
      }
    }

    setActiveWaterTiles(active);

    // Check if main river outlet at (2, 1) is active and opens South to river!
    const drainDirs = getDirs(2, 1);
    const drainActive = active.has('2-1') && drainDirs[2];

    // Check if all 3 houses are connected to the network
    const h1 = active.has('0-0');
    const h2 = active.has('0-2');
    const h3 = active.has('0-3');

    if (drainActive && h1 && h2 && h3 && !isSolved) {
      handlePuzzleVictory();
    }
  }, [grid, isSolved]);

  useEffect(() => {
    checkWaterFlow();
  }, [grid, checkWaterFlow]);

  const handleRotateTile = (rIndex, cIndex) => {
    if (isSolved) return;
    sound.playRotate();

    setGrid(prev => {
      const next = prev.map((row, r) =>
        row.map((tile, c) => {
          if (r === rIndex && c === cIndex) {
            return { ...tile, rot: (tile.rot + 1) % 4 };
          }
          return tile;
        })
      );
      return next;
    });
  };

  const handleReset = () => {
    sound.playClick();
    setGrid(INITIAL_GRID);
    setIsSolved(false);
    setShowHint(false);
  };

  const handleHint = () => {
    sound.playClick();
    setShowHint(true);
    // Find first incorrect tile
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c].rot !== grid[r][c].targetRot) {
          setHintMessage(`Hint: Rotate the channel tile at Row ${r + 1}, Column ${c + 1} to align with water flow.`);
          return;
        }
      }
    }
    setHintMessage("All channels appear aligned! Check connections to the river.");
  };

  const handlePuzzleVictory = () => {
    setIsSolved(true);
    sound.playVictory();
    sound.startWater();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#ffd700', '#f97316', '#22c55e']
    });
    if (onCompleteChallenge) {
      onCompleteChallenge(100);
    }
  };

  const handleProceedToDecision = () => {
    sound.stopWater();
    sound.playClick();
    onNavigate('decision');
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-4 sm:p-6 pt-16 bg-[#160f0a] text-amber-100 select-none">
      {/* Background Graphic */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('/assets/drainage_puzzle_bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
}}
      />

      {/* Top Header - Matching PDF Page 4 */}
      <div className="relative z-10 flex flex-col items-center text-center" style={{ transform: 'translateY(88px)' }}>
        <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-black text-[#D4A72C] drop-shadow-[0_2px_4px_rgba(43,26,14,0.9)]">
          DESIGN THE DRAINAGE SYSTEM
        </h2>
        <p className="font-philosopher text-xs sm:text-base text-amber-200/90 font-semibold drop-shadow">
          Place and rotate the terracotta pipes to connect the houses to the main drain.
        </p>
      </div>

      {/* Center Layout: Left Tile Inventory Rack & Center Interactive Puzzle Grid */}
      <div className="relative z-10 flex-1 flex items-center justify-center gap-4 sm:gap-8 my-auto max-w-5xl mx-auto w-full">
        {/* Left Carved Stone Rack (Matching PDF Page 4 sidebar) */}
        <div className="hidden sm:flex flex-col items-center justify-between p-3 carved-tablet w-28 h-[340px] shadow-2xl border-2 border-amber-600">
          <div className="text-[10px] font-cinzel font-bold text-amber-300 uppercase tracking-widest text-center">
            Pipes
          </div>
          <div className="flex flex-col gap-3 my-auto w-full items-center">
            {/* Straight */}
            <div className="w-14 h-12 rounded-lg bg-stone-900 border border-amber-500/50 flex items-center justify-center shadow">
              <div className="w-10 h-3 bg-amber-700 rounded-sm border border-amber-300"></div>
            </div>
            {/* T-junction */}
            <div className="w-14 h-12 rounded-lg bg-stone-900 border border-amber-500/50 flex items-center justify-center shadow relative">
              <div className="w-10 h-3 bg-amber-700 rounded-sm border border-amber-300"></div>
              <div className="w-3 h-5 bg-amber-700 rounded-sm border border-amber-300 absolute top-4"></div>
            </div>
            {/* Corner */}
            <div className="w-14 h-12 rounded-lg bg-stone-900 border border-amber-500/50 flex items-center justify-center shadow relative">
              <div className="w-3 h-7 bg-amber-700 rounded-sm border border-amber-300 absolute left-3 top-2"></div>
              <div className="w-7 h-3 bg-amber-700 rounded-sm border border-amber-300 absolute left-3 top-6"></div>
            </div>
            {/* Cross */}
            <div className="w-14 h-12 rounded-lg bg-stone-900 border border-amber-500/50 flex items-center justify-center shadow relative">
              <div className="w-10 h-3 bg-amber-700 rounded-sm border border-amber-300"></div>
              <div className="w-3 h-10 bg-amber-700 rounded-sm border border-amber-300 absolute"></div>
            </div>
          </div>
          <div className="text-[9px] font-philosopher text-amber-400/80 text-center">
            Click to rotate
          </div>
        </div>

        {/* Center Interactive Puzzle Board */}
        <div className="flex flex-col items-center relative">
          {/* House Inlets Indicators */}
          <div className="w-full max-w-[440px] flex justify-between px-6 pb-1 text-[11px] font-cinzel font-bold text-amber-300">
            <span className="flex items-center gap-1">🏠 House 1</span>
            <span className="flex items-center gap-1">🏠 House 2</span>
            <span className="flex items-center gap-1">🏠 House 3</span>
          </div>

          {/* 3x4 Grid Board */}
          <div className="carved-tablet p-3.5 sm:p-5 shadow-2xl border-3 border-amber-500 bg-stone-950/90 relative">
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
              {grid.map((row, r) =>
                row.map((tile, c) => {
                  const key = `${r}-${c}`;
                  const isWaterFlowing = activeWaterTiles.has(key);
                  const isCorrect = tile.rot === tile.targetRot;

                  return (
                    <div
                      key={tile.id}
                      onClick={() => handleRotateTile(r, c)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center ${
                        isWaterFlowing
                          ? 'bg-gradient-to-br from-amber-950 to-sky-950/80 border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.5)]'
                          : 'bg-gradient-to-br from-[#3b2416] to-[#1c110a] border-2 border-amber-800 hover:border-amber-400 hover:scale-[1.03]'
                      }`}
                    >
                      {/* Interactive Pipe SVG Graphic */}
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full transition-transform duration-200"
                        style={{ transform: `rotate(${tile.rot * 90}deg)` }}
                      >
                        {/* Terracotta Pipe Outer Channel */}
                        {tile.type === 'straight' && (
                          <rect x="0" y="32" width="100" height="36" rx="4" fill="#a8432b" stroke="#f6ad85" strokeWidth="2.5" />
                        )}
                        {tile.type === 'corner' && (
                          <path
                            d="M 50 100 L 50 50 L 100 50 L 100 32 L 32 32 L 32 100 Z"
                            fill="#a8432b"
                            stroke="#f6ad85"
                            strokeWidth="2.5"
                          />
                        )}
                        {tile.type === 't_junction' && (
                          <path
                            d="M 0 32 L 100 32 L 100 68 L 68 68 L 68 100 L 32 100 L 32 68 L 0 68 Z"
                            fill="#a8432b"
                            stroke="#f6ad85"
                            strokeWidth="2.5"
                          />
                        )}
                        {tile.type === 'cross' && (
                          <path
                            d="M 0 32 L 32 32 L 32 0 L 68 0 L 68 32 L 100 32 L 100 68 L 68 68 L 68 100 L 32 100 L 32 68 L 0 68 Z"
                            fill="#a8432b"
                            stroke="#f6ad85"
                            strokeWidth="2.5"
                          />
                        )}

                        {/* Inner Flowing Water Channel when active */}
                        {isWaterFlowing && (
                          <g className="filter drop-shadow-[0_0_6px_#38bdf8]">
                            {tile.type === 'straight' && (
                              <rect x="0" y="42" width="100" height="16" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" className="animated-water-flow" />
                            )}
                            {tile.type === 'corner' && (
                              <path
                                d="M 50 100 L 50 50 L 100 50"
                                fill="none"
                                stroke="#38bdf8"
                                strokeWidth="16"
                                strokeLinecap="round"
                              />
                            )}
                            {tile.type === 't_junction' && (
                              <path
                                d="M 0 50 L 100 50 M 50 50 L 50 100"
                                fill="none"
                                stroke="#38bdf8"
                                strokeWidth="16"
                                strokeLinecap="round"
                              />
                            )}
                            {tile.type === 'cross' && (
                              <path
                                d="M 0 50 L 100 50 M 50 0 L 50 100"
                                fill="none"
                                stroke="#38bdf8"
                                strokeWidth="16"
                                strokeLinecap="round"
                              />
                            )}
                          </g>
                        )}
                      </svg>

                      {/* Rotation Hint Indicator */}
                      <div className="absolute top-1 right-1 opacity-40 hover:opacity-100 transition-opacity">
                        <RotateCw className="w-3 h-3 text-amber-300" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Main Drain Outflow Arch (Bottom Center) */}
            <div className="w-full flex justify-center mt-2">
              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-sky-950/90 border border-sky-400 shadow-lg text-xs font-cinzel font-bold text-sky-200">
                <Droplets className="w-4 h-4 text-sky-400 animate-bounce" />
                <span>TO SINDHU / INDUS RIVER CANAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hint Banner */}
      {showHint && (
        <div className="relative z-10 max-w-lg mx-auto mb-2 parchment-box p-2.5 text-center text-xs font-philosopher text-stone-900 font-bold animate-fade-in shadow-lg">
          {hintMessage}
        </div>
      )}

      {/* Solved Victory Celebration Modal Overlay */}
      {isSolved && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="parchment-box max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl border-4 border-amber-500 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-white flex items-center justify-center shadow-xl">
              <Sparkles className="w-9 h-9 text-amber-950 animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            <div>
              <span className="text-xs font-cinzel tracking-widest text-emerald-800 font-bold uppercase">
                Challenge Solved!
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-amber-950 mt-1">
                🎉 DRAINAGE SYSTEM OPERATIONAL!
              </h3>
              <p className="font-philosopher text-stone-900 text-sm sm:text-base font-semibold mt-2">
                Wastewater from all residential quarters flows seamlessly into the main brick canal, keeping the streets clean and healthy.
              </p>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-amber-900/15 border border-amber-800/40">
              <span className="text-lg">⭐</span>
              <span className="font-cinzel font-black text-amber-900 text-base">+100 KNOWLEDGE XP</span>
            </div>

            <button
              onClick={handleProceedToDecision}
              className="btn-gold text-base sm:text-lg px-8 py-3 shadow-2xl flex items-center gap-2 mt-2"
            >
              <span>MAKE HISTORICAL DECISION</span>
              <ArrowRight className="w-5 h-5 text-amber-950" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Action Controls - Matching PDF Page 4 */}
      <div className="relative z-10 flex items-center justify-center gap-4 pb-2">
        <button
          onClick={handleReset}
          className="btn-terracotta text-sm px-6 py-2.5 shadow-lg flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>RESET</span>
        </button>

        <button
          onClick={handleHint}
          className="px-5 py-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-amber-600 text-amber-200 text-xs font-cinzel font-bold flex items-center gap-1.5 transition-all"
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>HINT</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            checkWaterFlow();
          }}
          className="btn-cyan text-sm px-8 py-2.5 shadow-xl flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>CHECK SOLUTION</span>
        </button>
      </div>
    </div>
  );
}
