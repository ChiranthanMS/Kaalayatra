import React, { useState } from 'react';
import { Check, ShieldAlert, Sparkles, ArrowRight, Home, Wrench, AlertTriangle } from 'lucide-react';
import sound from '../utils/SoundEngine';

const DECISIONS = [
  {
    id: 'A',
    title: 'BUILD NEAR THE RIVER',
    badge: 'A',
    icon: '🏘️',
    summary: 'Relocate houses right next to the river banks.',
    detail: 'Avoids building complex underground sewer channels, but leaves the entire settlement exposed to seasonal Indus flash floods and river erosion.',
    tone: 'border-amber-700/60 hover:border-amber-400'
  },
  {
    id: 'B',
    title: 'IMPROVE DRAINAGE',
    badge: 'B',
    icon: '🧱',
    summary: 'Build covered subterranean brick sewers & soak pits.',
    detail: 'Requires unified community masonry and engineering, but guarantees long-term hygiene, flood prevention, and citywide prosperity for generations.',
    tone: 'border-amber-400 shadow-[0_0_25px_rgba(250,204,21,0.5)] bg-gradient-to-b from-amber-950/90 to-amber-900/60',
    isOptimal: true
  },
  {
    id: 'C',
    title: 'IGNORE THE PROBLEM',
    badge: 'C',
    icon: '🏺',
    summary: 'Let wastewater pool into open street trenches.',
    detail: 'Conserves clay bricks and labor today, but creates stagnant cesspools, foul odors, and catastrophic waterborne disease outbreaks.',
    tone: 'border-stone-700 hover:border-red-500/60'
  }
];

export default function DecisionScreen({ onNavigate, onSelectDecision }) {
  const [selectedChoice, setSelectedChoice] = useState('B'); // Default to recommended B

  const handleCardClick = (choiceId) => {
    sound.playDecisionSelect();
    setSelectedChoice(choiceId);
  };

  const handleConfirmDecision = () => {
    sound.playReward();
    if (onSelectDecision) {
      onSelectDecision(selectedChoice);
    }
    onNavigate('consequence');
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-4 sm:p-8 pt-16 bg-[#180f0a] text-amber-100 select-none">
      {/* Background Graphic */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/title_vista.jpg')`,
          filter: 'brightness(0.6) saturate(0.8)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80"></div>
      </div>

      {/* Top Title Banner - Matching PDF Page 5 */}
      <div className="relative z-10 flex flex-col items-center text-center mt-2">
        <div className="flex items-center gap-3">
          <span className="text-amber-400 text-lg">❖</span>
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
            THE CITY MUST DECIDE
          </h2>
          <span className="text-amber-400 text-lg">❖</span>
        </div>
        <p className="font-philosopher text-base sm:text-lg text-amber-200 font-semibold mt-1 drop-shadow">
          How should we solve the water problem?
        </p>
      </div>

      {/* Center 3 Decision Cards - Matching PDF Page 5 */}
      <div className="relative z-10 flex-1 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-center my-auto px-2">
        {DECISIONS.map((dec) => {
          const isSelected = selectedChoice === dec.id;
          return (
            <div
              key={dec.id}
              onClick={() => handleCardClick(dec.id)}
              className={`relative rounded-2xl cursor-pointer transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between h-[340px] sm:h-[380px] shadow-2xl ${
                isSelected
                  ? 'bg-gradient-to-b from-[#4a2e1b] via-[#2c1a0e] to-[#1a0f08] border-3 border-amber-300 scale-105 shadow-[0_0_30px_rgba(250,204,21,0.6)]'
                  : 'bg-gradient-to-b from-[#2e1c12]/90 to-[#180e09]/90 border-2 border-amber-900/60 hover:border-amber-500/80 hover:scale-[1.02]'
              }`}
            >
              {/* Card Badge Letter (A, B, C) */}
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-cinzel font-black text-lg transition-all ${
                  isSelected 
                    ? 'bg-amber-400 text-amber-950 border-white shadow-lg' 
                    : 'bg-stone-900 text-amber-300 border-amber-600'
                }`}>
                  {dec.badge}
                </div>

                {isSelected && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-cinzel font-black tracking-wider uppercase shadow">
                    SELECTED
                  </span>
                )}
              </div>

              {/* Card Illustration Icon */}
              <div className="my-auto flex flex-col items-center text-center">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 p-1 flex items-center justify-center shadow-inner transition-transform ${
                  isSelected ? 'border-amber-300 scale-110 bg-amber-950/60' : 'border-amber-800/60 bg-stone-950/60'
                }`}>
                  <span className="text-4xl sm:text-5xl">{dec.icon}</span>
                </div>

                <h3 className="font-cinzel text-base sm:text-lg font-black text-amber-100 mt-4 leading-tight">
                  {dec.title}
                </h3>
              </div>

              {/* Card Explanation Text */}
              <p className="font-philosopher text-xs sm:text-sm text-stone-300/90 text-center leading-relaxed">
                {dec.detail}
              </p>

              {/* Selection Checkmark */}
              <div className="pt-2 border-t border-amber-800/40 flex justify-center">
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                  isSelected ? 'bg-amber-400 border-white text-amber-950' : 'border-amber-800 bg-black/40 text-transparent'
                }`}>
                  <Check className="w-4 h-4 font-bold stroke-[3]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Action Button */}
      <div className="relative z-10 flex flex-col items-center gap-2 pb-2">
        <button
          onClick={handleConfirmDecision}
          className="btn-gold text-base sm:text-lg px-10 py-3.5 shadow-2xl flex items-center gap-3 border-2 border-amber-200 animate-pulse"
        >
          <span>MAKE DECISION</span>
          <ArrowRight className="w-5 h-5 text-amber-950" />
        </button>
        <span className="text-[11px] font-philosopher text-amber-300/70">
          Your choice will shape the settlement's future and unlock historical insights.
        </span>
      </div>
    </div>
  );
}
