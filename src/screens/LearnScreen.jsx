import React, { useState, useEffect, useRef } from 'react';
import { Lightbulb, ArrowRight, ShieldCheck, Droplets, Layers } from 'lucide-react';
import sound from '../utils/SoundEngine';

const DURATION = 3000;

export default function LearnScreen({ onNavigate }) {
  const [loading, setLoading]   = useState(false);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(null);
  const rafRef   = useRef(null);

  const handleProceedToPuzzle = () => {
    if (loading) return;
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
        onNavigate('puzzle');
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loading, onNavigate]);

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between bg-[#18100a] text-amber-100 select-none">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/urban_sanitation_bg.png')` }}
      >
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* ── TOP BANNER — sits flush below the 52px HUD ── */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 pt-3 pb-2"
           style={{ marginTop: 52 }}>   {/* 52px = HUD height */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-amber-200 flex items-center justify-center shadow-lg shadow-amber-500/40 shrink-0">
            <Lightbulb className="w-4 h-4 text-amber-950 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-cinzel tracking-widest text-amber-300 font-bold uppercase drop-shadow-[0_0_6px_rgba(255,215,106,0.55)]">
              Historical Engineering Knowledge
            </span>
            <h2 className="font-cinzel text-xl sm:text-2xl font-black text-amber-200 drop-shadow-[0_0_8px_rgba(255,215,106,0.5)] leading-tight">
              URBAN SANITATION BLUEPRINT
            </h2>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#24160f]/95 border border-[#D4AF37]/80 text-xs font-cinzel text-amber-200 shadow-[0_0_10px_rgba(212,175,55,0.25)] shrink-0">
          <span>+50 Knowledge XP Preview</span>
        </div>
      </div>

      {/* ── MAIN CARD ── */}
      <div className="relative z-10 max-w-4xl mx-auto w-full parchment-box p-5 sm:p-7 shadow-2xl my-auto mx-4 sm:mx-auto">
        <div className="flex flex-col gap-4">

          {/* Header callout */}
          <div className="p-4 rounded-xl bg-amber-900/15 border-2 border-amber-800/40 flex items-start gap-4">
            <div className="text-3xl">🏛️</div>
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-black text-amber-950">
                Indus Valley Master Urban Planning
              </h3>
              <p className="font-philosopher text-sm sm:text-base text-stone-900 font-semibold mt-1 leading-relaxed">
                Indus Valley cities like Harappa and Mohenjo-Daro were carefully planned. Many settlements
                used sophisticated drainage systems to move wastewater away from homes and streets.
              </p>
            </div>
          </div>

          {/* 3 key pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-stone-900/10 border border-amber-800/30">
              <div className="flex items-center gap-2 text-amber-900 font-cinzel font-bold text-sm mb-1">
                <Droplets className="w-4 h-4 text-sky-700" />
                <span>1. Slope Gradients</span>
              </div>
              <p className="font-philosopher text-xs sm:text-sm text-stone-800">
                Drains were built on precise gentle inclines so water flowed naturally toward the main river without pooling.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-stone-900/10 border border-amber-800/30">
              <div className="flex items-center gap-2 text-amber-900 font-cinzel font-bold text-sm mb-1">
                <Layers className="w-4 h-4 text-amber-800" />
                <span>2. Covered Brick Slabs</span>
              </div>
              <p className="font-philosopher text-xs sm:text-sm text-stone-800">
                Channels were topped with removable limestone or baked brick slabs for regular cleaning and odor prevention.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-stone-900/10 border border-amber-800/30">
              <div className="flex items-center gap-2 text-amber-900 font-cinzel font-bold text-sm mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-800" />
                <span>3. Sump Settling Pits</span>
              </div>
              <p className="font-philosopher text-xs sm:text-sm text-stone-800">
                Solid waste collected in brick sumps, allowing only filtered water to discharge into the main street drains.
              </p>
            </div>
          </div>

          {/* CTA / loading bar */}
          <div className="pt-3 border-t-2 border-amber-800/30 flex items-center justify-between gap-4">
            <p className="text-xs font-philosopher text-stone-700 font-bold italic shrink-0">
              Use these principles to align the channel conduits.
            </p>

            {loading ? (
              /* ── Loading bar ── */
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, minWidth: 200 }}>
                <span style={{
                  fontFamily: 'Cinzel, serif', fontSize: '9px', fontWeight: 700,
                  color: 'rgba(100,55,5,0.85)', textTransform: 'uppercase', letterSpacing: '0.16em',
                }}>
                  Loading Challenge…
                </span>

                <div style={{
                  width: '100%', height: 11, borderRadius: 999,
                  background: 'rgba(80,45,5,0.18)',
                  border: '1.5px solid rgba(180,120,25,0.45)',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.25)',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    borderRadius: 999,
                    background: 'linear-gradient(90deg, #c4562b 0%, #e07a52 50%, #c4562b 100%)',
                    boxShadow: '0 0 8px rgba(200,80,30,0.6)',
                    transition: 'width 0.04s linear',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {/* Shimmer */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                      animation: 'ls-shimmer 0.9s linear infinite',
                    }} />
                  </div>
                </div>
                <style>{`@keyframes ls-shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}`}</style>
              </div>
            ) : (
              <button
                onClick={handleProceedToPuzzle}
                className="btn-gold text-sm sm:text-base px-7 py-2.5 shadow-xl flex items-center gap-2 shrink-0"
              >
                <span>APPLY WHAT YOU LEARNED</span>
                <ArrowRight className="w-5 h-5 text-amber-950" />
              </button>
            )}
          </div>

        </div>
      </div>

      <div className="relative z-10 text-center pb-2 text-xs font-philosopher text-amber-400/70">
        Kalayatra Interactive Challenge Stage 1
      </div>
    </div>
  );
}
