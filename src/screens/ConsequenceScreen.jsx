import React, { useState } from 'react';
import { ArrowRight, Sparkles, Trophy, Award, CheckCircle2, Sliders } from 'lucide-react';
import sound from '../utils/SoundEngine';

export default function ConsequenceScreen({ onNavigate, decision = 'B' }) {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100 for interactive slider
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    setSliderPos((x / rect.width) * 100);
  };

  const handleProceedToInsight = () => {
    sound.playReward();
    onNavigate('insight');
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-4 sm:p-6 pt-16 bg-[#140b07] text-amber-100 select-none">
      {/* Top Header - Matching PDF Page 6 */}
      <div className="relative z-20 flex flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            YOUR DECISION MADE A DIFFERENCE!
          </h2>
          <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <p className="font-philosopher text-xs sm:text-sm text-amber-200/90 font-semibold mt-0.5">
          Witness how Harappan urban engineering transformed the living settlement
        </p>
      </div>

      {/* Center Interactive Split Screen Comparison Container (Matching PDF Page 6) */}
      <div className="relative z-10 flex-1 max-w-5xl mx-auto w-full my-auto flex flex-col items-center justify-center p-2">
        <div 
          onMouseMove={(e) => { if (isDragging || e.buttons === 1) handleSliderMove(e); }}
          onClick={handleSliderMove}
          className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border-3 border-amber-500 shadow-2xl cursor-ew-resize bg-black"
        >
          {/* RIGHT / AFTER Layer (Full width underneath) */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/assets/world_isometric.jpg')`,
              filter: 'brightness(1.05) saturate(1.15)'
            }}
          >
            {/* After Tag & Details (Right Bottom) */}
            <div className="absolute bottom-4 right-4 p-3.5 rounded-xl bg-black/85 border border-emerald-500/80 max-w-[220px] text-right backdrop-blur-sm shadow-xl">
              <span className="font-cinzel text-base sm:text-lg font-black text-emerald-400 flex items-center justify-end gap-1.5 uppercase">
                <span>AFTER</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </span>
              <ul className="text-xs font-philosopher text-stone-200 mt-1.5 space-y-1 font-semibold">
                <li>• Clean water flow</li>
                <li>• Healthier city</li>
                <li>• Growing settlement</li>
              </ul>
            </div>
          </div>

          {/* LEFT / BEFORE Layer (Clipped to slider position) */}
          <div 
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div 
              className="w-full h-full min-w-[600px] sm:min-w-[900px] bg-cover bg-center"
              style={{
                backgroundImage: `url('/assets/consequence_before.jpg')`,
                filter: 'saturate(0.65) brightness(0.85)'
              }}
            >
              {/* Before Tag & Details (Left Bottom) */}
              <div className="absolute bottom-4 left-4 p-3.5 rounded-xl bg-black/85 border border-amber-700/80 max-w-[220px] text-left backdrop-blur-sm shadow-xl">
                <span className="font-cinzel text-base sm:text-lg font-black text-amber-500 uppercase">
                  BEFORE
                </span>
                <ul className="text-xs font-philosopher text-stone-300 mt-1.5 space-y-1 font-semibold">
                  <li>• Stagnant water</li>
                  <li>• Health issues</li>
                  <li>• Unhappy citizens</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Golden Divider Line & Arrow Indicator */}
          <div 
            style={{ left: `${sliderPos}%` }}
            className="absolute inset-y-0 -translate-x-1/2 flex items-center justify-center pointer-events-none z-30"
          >
            <div className="w-1 h-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 shadow-[0_0_15px_#facc15]"></div>
            
            {/* Center Golden Arrow Badge (Matching PDF Page 6 arrow) */}
            <div className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 border-2 border-white shadow-2xl flex items-center justify-center font-cinzel font-black text-amber-950 text-xl shadow-amber-500/80 animate-pulse">
              ➔
            </div>
          </div>
        </div>

        {/* Drag Hint */}
        <div className="flex items-center gap-2 mt-2 text-[11px] font-philosopher text-amber-300/80">
          <Sliders className="w-3.5 h-3.5" />
          <span>Drag the golden divider left or right to compare Before and After</span>
        </div>
      </div>

      {/* Rewards Unlocked Banner & Proceed Button */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 p-3 max-w-5xl mx-auto w-full parchment-box shadow-2xl border-2 border-amber-500">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-900/20 border border-amber-800/40 text-xs font-cinzel font-black text-amber-950">
            <span className="text-sm">⭐</span>
            <span>+100 KNOWLEDGE XP</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-900/20 border border-orange-800/40 text-xs font-cinzel font-black text-orange-950">
            <Trophy className="w-3.5 h-3.5 text-orange-800" />
            <span>+50 HERITAGE XP</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-900/20 border border-emerald-800/40 text-xs font-cinzel font-black text-emerald-950">
            <span className="text-sm">🏺</span>
            <span>ARTIFACT UNLOCKED</span>
          </div>
        </div>

        <button
          onClick={handleProceedToInsight}
          className="btn-gold text-xs sm:text-sm px-6 py-2.5 shadow-xl flex items-center gap-2 whitespace-nowrap self-stretch sm:self-auto justify-center"
        >
          <span>VIEW HISTORICAL INSIGHT</span>
          <ArrowRight className="w-4 h-4 text-amber-950" />
        </button>
      </div>
    </div>
  );
}
