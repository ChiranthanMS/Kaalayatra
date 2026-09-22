import React, { useState } from 'react';
import { Sparkles, ArrowRight, BookOpen, X, Info } from 'lucide-react';
import sound from '../utils/SoundEngine';

export default function InsightScreen({ onNavigate }) {
  const [rotateAngle, setRotateAngle] = useState(0);

  const handleProceedToPassport = () => {
    sound.playReward();
    onNavigate('passport');
  };

  const handleInspectArtifact = () => {
    sound.playClick();
    setRotateAngle(prev => (prev + 90) % 360);
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-4 sm:p-6 pt-16 bg-[#160f0a] text-amber-100 select-none">
      {/* Background Graphic */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/world_isometric.jpg')`,
          filter: 'brightness(0.35) blur(2px)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/80"></div>
      </div>

      {/* Main Carved Stone Tablet Frame (Matching PDF Page 7) */}
      <div className="relative z-10 max-w-5xl mx-auto w-full carved-tablet p-4 sm:p-6 shadow-2xl border-4 border-[#b88648] my-auto flex flex-col justify-between">
        {/* Top Header with Harappan Corner Seal Badges & Close Button */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-amber-600/40">
          {/* Left Seal Badge */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-950 border-2 border-amber-300 flex items-center justify-center text-lg shadow-inner">
              🐂
            </div>
            <span className="hidden sm:inline text-[11px] font-cinzel text-amber-300/80 font-bold uppercase tracking-widest">
              Harappan Seal #042
            </span>
          </div>

          {/* Center Title with Wings */}
          <div className="flex items-center gap-3 text-center">
            <span className="text-amber-400 text-lg hidden sm:inline">❖ ──</span>
            <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 drop-shadow">
              HISTORICAL INSIGHT
            </h2>
            <span className="text-amber-400 text-lg hidden sm:inline">── ❖</span>
          </div>

          {/* Right Artifact Badge & Close */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-950 border-2 border-amber-300 flex items-center justify-center text-lg shadow-inner">
              🏺
            </div>
          </div>
        </div>

        {/* Center Grid: Left Panoramic City/Bath Illustration & Right Parchment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 my-4 items-stretch">
          {/* Left Panoramic Illustration (7 cols) */}
          <div className="md:col-span-7 rounded-xl overflow-hidden border-2 border-amber-500/70 shadow-xl relative min-h-[220px] sm:min-h-[280px] bg-black">
            <div 
              className="w-full h-full bg-cover bg-center transform hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage: `url('/assets/world_isometric.jpg')`,
                filter: 'brightness(1.05)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-black/75 border border-amber-600/60 backdrop-blur-sm">
                <span className="text-xs font-cinzel text-amber-300 font-bold block">
                  Mohenjo-Daro Great Bath & Brick Sewer Network
                </span>
                <span className="text-[11px] font-philosopher text-stone-300">
                  Standardized 1:2:4 baked bricks and subterranean water conduits engineered c. 2500 BCE.
                </span>
              </div>
            </div>
          </div>

          {/* Right Parchment Insight & Artifact Box (5 cols) */}
          <div className="md:col-span-5 parchment-box p-4 sm:p-5 flex flex-col justify-between shadow-xl">
            <div>
              {/* Insight Text (Exact match for PDF Page 7) */}
              <p className="font-philosopher text-sm sm:text-base text-stone-900 leading-relaxed font-semibold">
                "Indus Valley cities like Harappa and Mohenjo-Daro used sophisticated urban planning. They built grid-based streets and advanced underground covered drainage systems, demonstrating remarkable engineering and sanitation knowledge."
              </p>
            </div>

            {/* Unlocked Artifact Card (Terracotta Painted Pottery) */}
            <div 
              onClick={handleInspectArtifact}
              className="mt-3 p-3 rounded-xl bg-amber-950/15 border-2 border-amber-800/40 flex items-center gap-4 cursor-pointer group hover:bg-amber-950/25 transition-all shadow-inner"
            >
              {/* Illustrated Pottery Urn */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center bg-gradient-to-br from-amber-200 to-amber-400 rounded-full border-2 border-amber-600 shadow-md">
                <svg
                  viewBox="0 0 100 100"
                  className="w-14 h-14 transition-transform duration-500 group-hover:scale-110"
                  style={{ transform: `rotate(${rotateAngle}deg)` }}
                >
                  {/* Terracotta Pot Body */}
                  <path
                    d="M 30 15 L 70 15 L 75 25 L 90 55 Q 90 85, 50 85 Q 10 85, 10 55 L 25 25 Z"
                    fill="#c4562b"
                    stroke="#59200b"
                    strokeWidth="3"
                  />
                  {/* Harappan Black Painted Motifs */}
                  <path d="M 25 35 Q 50 45, 75 35" fill="none" stroke="#26130b" strokeWidth="3" />
                  <path d="M 15 55 Q 50 68, 85 55" fill="none" stroke="#26130b" strokeWidth="4" />
                  <circle cx="50" cy="55" r="6" fill="#26130b" />
                  <circle cx="32" cy="53" r="4" fill="#26130b" />
                  <circle cx="68" cy="53" r="4" fill="#26130b" />
                  <path d="M 22 70 Q 50 78, 78 70" fill="none" stroke="#26130b" strokeWidth="2.5" />
                </svg>

                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 border border-white text-[10px] font-bold text-amber-950 flex items-center justify-center">
                  ✨
                </div>
              </div>

              <div>
                <span className="text-[10px] font-cinzel font-black text-amber-800 uppercase tracking-wider block">
                  Discovered Artifact
                </span>
                <h4 className="font-cinzel text-base font-black text-amber-950 leading-tight">
                  Harappan Painted Pottery
                </h4>
                <p className="text-[11px] font-philosopher text-stone-700 font-semibold mt-0.5">
                  Black-on-red burnished terracotta storage vessel (Click to rotate).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Continue Button - Matching PDF Page 7 */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleProceedToPassport}
            className="btn-gold text-base sm:text-lg px-12 py-3 shadow-2xl flex items-center gap-2 border-2 border-amber-200"
          >
            <span>CONTINUE</span>
            <ArrowRight className="w-5 h-5 text-amber-950" />
          </button>
        </div>
      </div>
    </div>
  );
}
