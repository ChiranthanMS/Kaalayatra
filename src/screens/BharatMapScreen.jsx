import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Lock, Unlock, Compass, Sparkles, ChevronRight, BookOpen, Shield } from 'lucide-react';
import sound from '../utils/SoundEngine';

const DURATION = 3000; // ms

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
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(null);
  const rafRef   = useRef(null);

  const handleSelectRegion = (region) => {
    sound.playClick();
    setSelectedRegion(region);
  };

  const handleEnterWorld = () => {
    if (selectedRegion.id !== 'indus_valley' || loading) return;
    sound.playReward();
    setLoading(true);
    setProgress(0);
    startRef.current = null;
  };

  useEffect(() => {
    if (!loading) return;
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const pct = Math.min(((ts - startRef.current) / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        onNavigate('world_explore');
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loading, onNavigate]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#28170d] text-amber-100 select-none">
      {/* Cinematic Bharat Yatra map-room background */}
      <div
        className="absolute inset-0 bharat-map-backdrop"
        style={{ backgroundImage: "url('/assets/bharat_yatra_background.png')" }}
      />
      <div className="absolute inset-0 bharat-map-overlay" />

      {/* Upper-left chapter title */}
      <div className="absolute z-20 bharat-map-title">
        <div className="flex items-center gap-2 text-amber-200 drop-shadow-lg">
          <Compass className="h-5 w-5 text-amber-300" />
          <span className="font-cinzel text-[10px] font-bold uppercase tracking-[0.22em]">Expedition Map</span>
        </div>
        <h2 className="mt-1 font-cinzel text-3xl font-black tracking-wide text-amber-100 drop-shadow-[0_3px_3px_rgba(0,0,0,0.9)] sm:text-5xl">
          BHARAT YATRA
        </h2>
        <p className="max-w-xs font-philosopher text-xs font-semibold text-amber-50/90 drop-shadow sm:text-sm">
          Explore a civilization along the timeless heritage corridor of India
        </p>
      </div>

      {/* Upper-right expedition status */}
      <div className="absolute z-20 hidden items-center justify-between rounded-lg border shadow-xl sm:flex bharat-expedition-status">
        <div className="bharat-expedition-copy">
          <span className="font-philosopher text-xs text-amber-100/80">Current Expedition:</span>
          <span className="font-cinzel text-base font-bold text-amber-300">CHAPTER 1</span>
        </div>
        <div className="border-l border-amber-200/40 text-right bharat-expedition-progress">
          <span className="font-cinzel text-xl font-bold text-amber-100">1 / 4</span>
          <span className="font-philosopher text-xs text-amber-100/80">Regions Discovered</span>
        </div>
      </div>

      {/* Map marker overlay; the golden route is already part of the background artwork. */}
      <div className="absolute inset-0 z-10 bharat-map-overlay-layer">
        <div className="absolute inset-0 bharat-map-plane">
          {REGIONS.filter((region) => region.id !== 'chola').map((region) => {
              const isSelected = selectedRegion.id === region.id;
              return (
                <button
                  key={region.id}
                  type="button"
                  style={{
                    left: `${region.id === 'indus_valley' ? 26 : region.id === 'mauryan' ? 41 : region.id === 'gupta' ? 36 : 37}%`,
                    top: `${region.id === 'indus_valley' ? 29 : region.id === 'mauryan' ? 40 : region.id === 'gupta' ? 51 : 72}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => handleSelectRegion(region)}
                  aria-label={`View details for ${region.name}`}
                  aria-pressed={isSelected}
                  className="absolute z-20 flex cursor-pointer flex-col items-center gap-1 bg-transparent border-0 appearance-none group"
                >
                  {region.unlocked && (
                    <div className="pointer-events-none absolute -inset-3 rounded-full bg-amber-400/35 animate-ping" />
                  )}

                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ${isSelected ? 'scale-125' : 'group-hover:scale-110'}`}
                    style={{
                      background: region.unlocked
                        ? 'radial-gradient(circle at 35% 30%, #fff1a8, #e5a826 48%, #5c2808 100%)'
                        : 'radial-gradient(circle at 35% 30%, #8a8172, #3c3935 52%, #171513 100%)',
                      border: `3px solid ${region.unlocked ? '#ffe68a' : '#8c877d'}`,
                      boxShadow: region.unlocked
                        ? '0 0 0 3px rgba(92, 42, 7, 0.8), 0 0 22px rgba(255, 196, 45, 0.95)'
                        : '0 4px 10px rgba(0, 0, 0, 0.65)',
                    }}
                  >
                    {region.unlocked ? (
                      <Sparkles className="h-6 w-6 text-amber-950" />
                    ) : (
                      <Lock className="h-5 w-5 text-stone-200" />
                    )}
                  </div>

                  <span className={`whitespace-nowrap rounded px-2 py-0.5 text-[10px] font-cinzel font-bold tracking-wider transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
                      : 'bg-black/85 text-amber-100 border border-amber-800/80 group-hover:text-white'
                  }`}>
                    {region.id === 'indus_valley' ? 'INDUS' : region.id === 'mauryan' ? 'MAURYA' : region.id === 'gupta' ? 'GUPTA' : 'VIJAYANAGARA'}
                  </span>
                </button>
              );
            })}
        </div>

        {/* Compact selected-region parchment card */}
        <div className="absolute bottom-4 right-4 z-20 flex max-h-[78%] flex-col justify-between overflow-auto parchment-box p-4 shadow-2xl bharat-map-card sm:right-7 sm:p-5">
          <div>
            <div className="flex items-center justify-between border-b-2 border-amber-800/30 pb-2 bharat-map-card-meta">
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
                <span className="font-philosopher text-stone-700 font-semibold bharat-map-card-challenges">
                  {selectedRegion.challenges}
                </span>
              </div>
              <span className="font-cinzel text-amber-900 font-bold bharat-map-card-period">
                {selectedRegion.period}
              </span>
            </div>

            {/* Title & Location */}
            <h3 className="font-cinzel font-black leading-tight text-amber-950 bharat-map-card-title">
              {selectedRegion.name}
            </h3>
            <p className="font-philosopher text-amber-900/80 font-bold flex items-center gap-1 bharat-map-card-location">
              <MapPin className="w-3.5 h-3.5 text-amber-800" />
              {selectedRegion.location}
            </p>

            {/* Description */}
            <p className="font-philosopher leading-relaxed text-stone-800 bharat-map-card-description">
              {selectedRegion.desc}
            </p>

            {/* Discoveries Box */}
            <div className="flex flex-col rounded-lg border border-amber-800/30 bg-amber-900/10 bharat-map-card-discoveries">
              <div className="flex items-center justify-between bharat-map-card-discovery-row">
                <span className="font-cinzel font-bold text-amber-900">Key Artifact:</span>
                <span className="font-philosopher text-stone-800 font-semibold">{selectedRegion.artifact}</span>
              </div>
              <div className="flex items-center justify-between bharat-map-card-discovery-row">
                <span className="font-cinzel font-bold text-amber-900">Achievement Badge:</span>
                <span className="font-philosopher text-stone-800 font-semibold">{selectedRegion.badge}</span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="flex items-center justify-between gap-3 border-t-2 border-amber-800/30 bharat-map-card-actions">
            <button
              onClick={() => onNavigate('passport')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'Cinzel, serif',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                padding: '6px 10px',
                borderRadius: 8,
                color: '#7a4010',
                position: 'relative',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#3a1604';
                e.currentTarget.querySelector('.vp-glow').style.opacity = '1';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#7a4010';
                e.currentTarget.querySelector('.vp-glow').style.opacity = '0';
              }}
            >
              {/* Animated background glow on hover */}
              <span className="vp-glow" style={{
                position: 'absolute', inset: 0, borderRadius: 8,
                background: 'linear-gradient(135deg, rgba(220,160,40,0.18), rgba(180,100,20,0.12))',
                border: '1px solid rgba(200,140,30,0.4)',
                opacity: 0,
                transition: 'opacity 0.2s ease',
                pointerEvents: 'none',
              }} />

              {/* Animated book icon */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(145deg, #f5d060, #c47818)',
                border: '1.5px solid rgba(230,175,40,0.8)',
                boxShadow: '0 0 6px rgba(210,150,15,0.45)',
                animation: 'vp-pulse 2.2s ease-in-out infinite',
              }}>
                <BookOpen style={{ width: 11, height: 11, color: '#3a1604' }} />
              </span>

              <span style={{ position: 'relative', zIndex: 1 }}>View Passport</span>

              <style>{`
                @keyframes vp-pulse {
                  0%, 100% { box-shadow: 0 0 5px rgba(210,150,15,0.4); transform: scale(1); }
                  50%       { box-shadow: 0 0 12px rgba(240,180,20,0.75); transform: scale(1.12); }
                }
              `}</style>
            </button>

            {selectedRegion.id === 'indus_valley' ? (
              loading ? (
                /* ── Loading bar ── */
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, minWidth: 160 }}>
                  <span style={{
                    fontFamily: 'Cinzel, serif', fontSize: '9px', fontWeight: 700,
                    color: 'rgba(120,60,5,0.85)', textTransform: 'uppercase', letterSpacing: '0.15em',
                  }}>
                    Entering World…
                  </span>
                  <div style={{
                    width: '100%', height: 10, borderRadius: 999,
                    background: 'rgba(80,40,5,0.18)',
                    border: '1.5px solid rgba(180,110,20,0.45)',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.25)',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${progress}%`,
                      borderRadius: 999,
                      background: 'linear-gradient(90deg, #d49f2b, #fce07a 50%, #d49f2b)',
                      boxShadow: '0 0 8px rgba(220,160,20,0.65)',
                      transition: 'width 0.04s linear',
                      position: 'relative', overflow: 'hidden',
                    }}>
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                        animation: 'bms-shimmer 0.9s linear infinite',
                      }} />
                    </div>
                  </div>
                  <style>{`@keyframes bms-shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}`}</style>
                </div>
              ) : (
                <button
                  onClick={handleEnterWorld}
                  className="btn-gold text-sm px-6 py-2.5 shadow-lg"
                >
                  <span>ENTER WORLD</span>
                  <ChevronRight className="w-4 h-4 text-amber-950" />
                </button>
              )
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
