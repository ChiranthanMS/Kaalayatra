import React, { useState } from 'react';
import { MapPin, Lock, Unlock, Compass, Sparkles, ChevronRight, BookOpen, Shield } from 'lucide-react';
import sound from '../utils/SoundEngine';

const REGIONS = [
  {
    id: 'indus_valley',
    name: 'Indus Valley Civilization',
    location: 'Northwest / Harappa & Mohenjo-Daro',
    period: 'c. 2600 BCE – 1900 BCE',
    x: 28, // Percentage on map
    y: 28,
    unlocked: true,
    challenges: '3/3 Available',
    desc: 'Explore one of humanity\'s earliest urban centers, famed for its master-planned grid streets, brick architecture, and advanced subterranean drainage networks.',
    artifact: '🏺 Harappan Painted Pottery',
    badge: '🏛️ INDUS VALLEY EXPLORER'
  },
  {
    id: 'mauryan',
    name: 'Mauryan Empire',
    location: 'Magadha / Pataliputra & Ashokan Pillars',
    period: 'c. 322 BCE – 185 BCE',
    x: 62,
    y: 40,
    unlocked: false,
    challenges: '0/5 Challenges',
    desc: 'The great unification under Chandragupta and Ashoka the Great, known for rock edicts, royal highways, and the Lion Capital.',
    artifact: '🦁 Ashokan Stone Seal',
    badge: '🔒 Locked Chapter'
  },
  {
    id: 'gupta',
    name: 'Gupta Golden Age',
    location: 'Ujjain & Nalanda Mahavihara',
    period: 'c. 319 CE – 543 CE',
    x: 48,
    y: 50,
    unlocked: false,
    challenges: '0/4 Challenges',
    desc: 'The zenith of ancient Indian classical mathematics (Aryabhata), metallurgy (Iron Pillar), astronomy, and Sanskrit literature.',
    artifact: '🪙 Golden Dinar Coin',
    badge: '🔒 Locked Chapter'
  },
  {
    id: 'chola',
    name: 'Imperial Chola Dynasty',
    location: 'Tamilakam / Thanjavur & Bay of Bengal',
    period: 'c. 848 CE – 1279 CE',
    x: 52,
    y: 78,
    unlocked: false,
    challenges: '0/4 Challenges',
    desc: 'Mighty maritime naval empire, builders of the grand Brihadisvara granite temple and bronze masterpieces of Nataraja.',
    artifact: '⚓ Chola Bronze Tiger Seal',
    badge: '🔒 Locked Chapter'
  },
  {
    id: 'vijayanagara',
    name: 'Vijayanagara Empire',
    location: 'Hampi / Tungabhadra River Basin',
    period: 'c. 1336 CE – 1646 CE',
    x: 42,
    y: 68,
    unlocked: false,
    challenges: '0/4 Challenges',
    desc: 'The city of victory! World-renowned stone chariot architecture, musical pillars, and thriving international gem markets.',
    artifact: '🐘 Royal Gilded Elephant Plate',
    badge: '🔒 Locked Chapter'
  }
];

export default function BharatMapScreen({ onNavigate }) {
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);

  const handleSelectRegion = (region) => {
    sound.playClick();
    setSelectedRegion(region);
  };

  const handleEnterWorld = () => {
    if (selectedRegion.unlocked) {
      sound.playReward();
      onNavigate('world_explore');
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-4 sm:p-8 pt-16 bg-[#160f0a] text-amber-100 select-none">
      {/* Background Vintage Parchment & Map Pattern */}
      <div 
        className="absolute inset-0 bg-[#1e130c] opacity-95"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(223, 177, 65, 0.08) 0%, transparent 70%),
            linear-gradient(to bottom, rgba(10, 6, 4, 0.8), rgba(28, 17, 10, 0.9))
          `
        }}
      >
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      {/* Top Banner */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '30s' }} />
            <span className="text-xs font-cinzel tracking-widest text-amber-400 font-bold uppercase">
              Expedition Map
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 drop-shadow">
            BHARAT YATRA
          </h2>
          <p className="font-philosopher text-xs sm:text-sm text-amber-200/80">
            Select a civilization along the timeless heritage corridor of India
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/80 border border-amber-700/60 text-xs text-amber-200">
          <span>Current Expedition:</span>
          <span className="font-cinzel font-bold text-amber-400">Chapter I</span>
        </div>
      </div>

      {/* Center Layout: Stylized India Map (Left) & Region Detail Card (Right) */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-2 overflow-hidden">
        {/* Map Visualization (7 cols) */}
        <div className="lg:col-span-7 h-full min-h-[300px] sm:min-h-[380px] carved-tablet p-4 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#2c1a10] via-[#1c100a] to-[#120a06]">
          {/* Stylized Antique India Map SVG Silhouette */}
          <div className="relative w-full max-w-[480px] aspect-[4/5] flex items-center justify-center">
            <svg
              viewBox="0 0 400 480"
              className="w-full h-full filter drop-shadow-[0_0_20px_rgba(223,177,65,0.25)]"
            >
              {/* Ancient Indian Subcontinent Boundary Contour */}
              <path
                d="M 120 40 
                   Q 150 20, 190 25 
                   Q 230 30, 260 60 
                   Q 300 100, 310 140 
                   Q 340 180, 310 210 
                   Q 280 240, 270 290 
                   Q 240 360, 210 430 
                   Q 195 460, 185 450 
                   Q 175 420, 160 360 
                   Q 130 300, 110 260 
                   Q 80 220, 90 170 
                   Q 95 120, 105 80 Z"
                fill="#3a2215"
                stroke="#c99738"
                strokeWidth="2.5"
                strokeDasharray="6 3"
                className="opacity-75"
              />

              {/* Major Sacred Rivers (Indus, Ganga, Godavari, Kaveri) */}
              <path
                d="M 100 80 Q 120 120, 130 180"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeOpacity="0.8"
                className="animated-water-flow"
              />
              <path
                d="M 160 100 Q 230 130, 280 180"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />
              <path
                d="M 140 260 Q 210 280, 250 310"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />

              {/* Geographic Region Inscription Labels */}
              <text x="100" y="70" fill="#facc15" fontSize="10" fontFamily="Cinzel" fontWeight="bold">SINDHU / INDUS</text>
              <text x="210" y="125" fill="#fde68a" fontSize="9" fontFamily="Cinzel" opacity="0.6">GANGA BASIN</text>
              <text x="160" y="270" fill="#fde68a" fontSize="9" fontFamily="Cinzel" opacity="0.6">DECCAN</text>
              <text x="170" y="410" fill="#fde68a" fontSize="9" fontFamily="Cinzel" opacity="0.6">TAMILAKAM</text>

              {/* Decorative Compass Rose */}
              <g transform="translate(330, 70)">
                <circle cx="0" cy="0" r="22" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="2 2" />
                <path d="M 0 -20 L 4 -6 L 18 0 L 4 6 L 0 20 L -4 6 L -18 0 L -4 -6 Z" fill="#d4af37" />
                <text x="-4" y="-24" fill="#facc15" fontSize="8" fontFamily="Cinzel" fontWeight="bold">N</text>
              </g>

              {/* Connecting Trade Routes Lines */}
              <path
                d="M 125 140 L 220 190 L 190 280 L 175 390"
                fill="none"
                stroke="#e5b982"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.5"
              />
            </svg>

            {/* Interactive Node Markers */}
            {REGIONS.map((region) => {
              const isSelected = selectedRegion.id === region.id;
              return (
                <div
                  key={region.id}
                  style={{ left: `${region.x}%`, top: `${region.y}%` }}
                  onClick={() => handleSelectRegion(region)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                >
                  {/* Glowing Radar Pulse for Unlocked Node */}
                  {region.unlocked && (
                    <div className="absolute -inset-3 rounded-full bg-amber-400/30 animate-ping pointer-events-none"></div>
                  )}

                  {/* Marker Pin Icon */}
                  <div className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    isSelected 
                      ? 'scale-125 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-800 border-2 border-white shadow-xl shadow-amber-500/50' 
                      : region.unlocked
                        ? 'bg-gradient-to-br from-amber-500 to-amber-900 border-2 border-amber-300 hover:scale-110 shadow-lg'
                        : 'bg-stone-900 border border-stone-600 opacity-70 hover:opacity-100'
                  }`}>
                    {region.unlocked ? (
                      <Sparkles className={`w-5 h-5 ${isSelected ? 'text-amber-950' : 'text-amber-200'}`} />
                    ) : (
                      <Lock className="w-4 h-4 text-stone-400" />
                    )}
                  </div>

                  {/* Node Title Tag */}
                  <div className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-cinzel font-bold tracking-wider transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
                      : 'bg-black/80 text-amber-200 border border-amber-800/80 group-hover:text-white'
                  }`}>
                    {region.name.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Region Details Preview Card (5 cols) */}
        <div className="lg:col-span-5 parchment-box p-5 sm:p-6 flex flex-col justify-between h-full min-h-[340px] shadow-2xl">
          <div>
            {/* Header Badge */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-amber-800/30">
              <div className="flex items-center gap-2">
                {selectedRegion.unlocked ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-800 text-emerald-100 text-[10px] font-cinzel font-bold tracking-wider uppercase flex items-center gap-1">
                    <Unlock className="w-3 h-3" /> UNLOCKED
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-700 text-stone-200 text-[10px] font-cinzel font-bold tracking-wider uppercase flex items-center gap-1">
                    <Lock className="w-3 h-3" /> LOCKED
                  </span>
                )}
                <span className="text-xs font-philosopher text-stone-700 font-semibold">
                  {selectedRegion.challenges}
                </span>
              </div>
              <span className="text-xs font-cinzel text-amber-900 font-bold">
                {selectedRegion.period}
              </span>
            </div>

            {/* Title & Location */}
            <h3 className="font-cinzel text-xl sm:text-2xl font-black text-amber-950 mt-3 leading-tight">
              {selectedRegion.name}
            </h3>
            <p className="text-xs font-philosopher text-amber-900/80 font-bold mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-800" />
              {selectedRegion.location}
            </p>

            {/* Description */}
            <p className="font-philosopher text-sm text-stone-800 mt-3 leading-relaxed">
              {selectedRegion.desc}
            </p>

            {/* Discoveries Box */}
            <div className="mt-4 p-3 rounded-lg bg-amber-900/10 border border-amber-800/30 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-cinzel font-bold text-amber-900">Key Artifact:</span>
                <span className="font-philosopher text-stone-800 font-semibold">{selectedRegion.artifact}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-cinzel font-bold text-amber-900">Achievement Badge:</span>
                <span className="font-philosopher text-stone-800 font-semibold">{selectedRegion.badge}</span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="mt-5 pt-3 border-t-2 border-amber-800/30 flex items-center justify-between gap-3">
            <button
              onClick={() => onNavigate('passport')}
              className="text-xs font-cinzel font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 underline"
            >
              <BookOpen className="w-3.5 h-3.5" /> View Passport
            </button>

            {selectedRegion.unlocked ? (
              <button
                onClick={handleEnterWorld}
                className="btn-gold text-sm px-6 py-2.5 shadow-lg"
              >
                <span>ENTER WORLD</span>
                <ChevronRight className="w-4 h-4 text-amber-950" />
              </button>
            ) : (
              <button
                disabled
                className="px-6 py-2.5 rounded-full bg-stone-400 text-stone-700 text-xs font-cinzel font-bold cursor-not-allowed opacity-70"
              >
                🔒 Complete Chapter 1 to Unlock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
