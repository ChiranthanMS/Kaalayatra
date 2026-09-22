import React from 'react';
import { Lightbulb, ArrowRight, CheckCircle2, ShieldCheck, Droplets, Layers } from 'lucide-react';
import sound from '../utils/SoundEngine';

export default function LearnScreen({ onNavigate }) {
  const handleProceedToPuzzle = () => {
    sound.playReward();
    onNavigate('puzzle');
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-4 sm:p-8 pt-16 bg-[#18100a] text-amber-100 select-none">
      {/* Background Graphic */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `url('/assets/drainage_puzzle_bg.jpg')`,
          filter: 'blur(3px)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#140b07] via-[#1a0f0a]/90 to-[#140b07]"></div>
      </div>

      {/* Top Banner */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-amber-200 flex items-center justify-center shadow-lg shadow-amber-500/40">
            <Lightbulb className="w-5 h-5 text-amber-950 animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] font-cinzel tracking-widest text-amber-400 font-bold uppercase">
              Historical Engineering Knowledge
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500">
              URBAN SANITATION BLUEPRINT
            </h2>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/60 text-xs font-cinzel text-amber-200">
          <span>+50 Knowledge XP Preview</span>
        </div>
      </div>

      {/* Main Educational Feature Card */}
      <div className="relative z-10 max-w-4xl mx-auto w-full parchment-box p-6 sm:p-8 shadow-2xl my-auto">
        <div className="flex flex-col gap-5">
          {/* Header Callout */}
          <div className="p-4 rounded-xl bg-amber-900/15 border-2 border-amber-800/40 flex items-start gap-4">
            <div className="text-3xl">🏛️</div>
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-black text-amber-950">
                Indus Valley Master Urban Planning
              </h3>
              <p className="font-philosopher text-base sm:text-lg text-stone-900 font-semibold mt-1 leading-relaxed">
                Indus Valley cities like Harappa and Mohenjo-Daro were carefully planned. Many settlements used sophisticated drainage systems to move wastewater away from homes and streets.
              </p>
            </div>
          </div>

          {/* 3 Key Engineering Pillars (Visual Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-stone-900/10 border border-amber-800/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-900 font-cinzel font-bold text-sm">
                  <Droplets className="w-4 h-4 text-sky-700" />
                  <span>1. Slope Gradients</span>
                </div>
                <p className="font-philosopher text-xs sm:text-sm text-stone-800 mt-2">
                  Drains were built on precise gentle inclines so water flowed naturally toward the main river without pooling.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-stone-900/10 border border-amber-800/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-900 font-cinzel font-bold text-sm">
                  <Layers className="w-4 h-4 text-amber-800" />
                  <span>2. Covered Brick Slabs</span>
                </div>
                <p className="font-philosopher text-xs sm:text-sm text-stone-800 mt-2">
                  Channels were topped with removable limestone or baked brick slabs for regular cleaning and odor prevention.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-stone-900/10 border border-amber-800/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-900 font-cinzel font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-800" />
                  <span>3. Sump Settling Pits</span>
                </div>
                <p className="font-philosopher text-xs sm:text-sm text-stone-800 mt-2">
                  Solid waste collected in brick sumps, allowing only filtered water to discharge into the main street drains.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Action */}
          <div className="pt-3 border-t-2 border-amber-800/30 flex items-center justify-between">
            <p className="text-xs font-philosopher text-stone-700 font-bold italic">
              Use these principles to align the channel conduits.
            </p>
            <button
              onClick={handleProceedToPuzzle}
              className="btn-gold text-sm sm:text-base px-8 py-3 shadow-xl flex items-center gap-2"
            >
              <span>APPLY WHAT YOU LEARNED</span>
              <ArrowRight className="w-5 h-5 text-amber-950" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center pb-1 text-xs font-philosopher text-amber-400/70">
        Kalayatra Interactive Challenge Stage 1
      </div>
    </div>
  );
}
