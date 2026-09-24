import React, { useState } from 'react';
import { Check, ShieldAlert, Sparkles, ArrowRight, Home, Wrench, AlertTriangle } from 'lucide-react';
import sound from '../utils/SoundEngine';

const DECISIONS = [
  {
    id: 'A',
    title: 'BUILD NEAR THE RIVER',
    badge: 'A',
    icon: '/assets/River_icon.png',
    summary: 'Relocate houses right next to the river banks.',
    detail: 'Avoids building complex underground sewer channels, but leaves the entire settlement exposed to seasonal Indus flash floods and river erosion.',
    tone: 'border-amber-700/60 hover:border-amber-400'
  },
  {
    id: 'B',
    title: 'IMPROVE DRAINAGE',
    badge: 'B',
    icon: '/assets/drainage_icon.png',
    summary: 'Build covered subterranean brick sewers & soak pits.',
    detail: 'Requires unified community masonry and engineering, but guarantees long-term hygiene, flood prevention, and citywide prosperity for generations.',
    tone: 'border-amber-400 shadow-[0_0_25px_rgba(250,204,21,0.5)] bg-gradient-to-b from-amber-950/90 to-amber-900/60',
    isOptimal: true
  },
  {
    id: 'C',
    title: 'IGNORE THE PROBLEM',
    badge: 'C',
    icon: '/assets/ignore_problem_icon.png',
    summary: 'Let wastewater pool into open street trenches.',
    detail: 'Conserves clay bricks and labor today, but creates stagnant cesspools, foul odors, and catastrophic waterborne disease outbreaks.',
    tone: 'border-stone-700 hover:border-red-500/60'
  }
];

function DecisionIllustration({ decisionId }) {
  if (decisionId === 'A') {
    return (
      <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="riverGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#36b9d3" />
            <stop offset="1" stopColor="#19749a" />
          </linearGradient>
          <linearGradient id="houseGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#f5d59a" />
            <stop offset="1" stopColor="#b66d32" />
          </linearGradient>
        </defs>
        <path d="M0 113 C35 90 59 121 84 104 C111 86 130 96 160 76 V160 H0Z" fill="url(#riverGradient)" />
        <path d="M0 129 C28 109 51 139 81 119 C111 99 130 109 160 89" fill="none" stroke="#9de4e1" strokeWidth="3" opacity="0.8" />
        <path d="M22 102 V57 L49 42 L76 57 V102Z" fill="url(#houseGradient)" stroke="#70401f" strokeWidth="3" />
        <path d="M22 57 L49 42 L76 57 L49 70Z" fill="#d28b48" stroke="#70401f" strokeWidth="3" />
        <path d="M84 106 V72 L109 60 L134 72 V106Z" fill="#e8bd78" stroke="#70401f" strokeWidth="3" />
        <path d="M84 72 L109 60 L134 72 L109 83Z" fill="#c77c3b" stroke="#70401f" strokeWidth="3" />
        <path d="M36 73 H46 V87 H36Z M55 73 H65 V87 H55Z M96 79 H105 V90 H96Z" fill="#70401f" />
        <path d="M11 88 C14 68 22 64 29 87" fill="#4f8a43" stroke="#3a5f30" strokeWidth="3" />
        <path d="M13 86 L4 72 M16 83 L28 69" stroke="#3a5f30" strokeWidth="3" />
        <circle cx="143" cy="42" r="11" fill="#f3ce78" opacity="0.85" />
      </svg>
    );
  }

  if (decisionId === 'B') {
    return (
      <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="pipeGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#f08a48" />
            <stop offset="0.55" stopColor="#b94d25" />
            <stop offset="1" stopColor="#71301c" />
          </linearGradient>
        </defs>
        <g fill="url(#pipeGradient)" stroke="#572517" strokeWidth="4" strokeLinejoin="round">
          <path d="M72 77 L34 39 L46 27 L84 65Z" />
          <path d="M88 77 L126 39 L114 27 L76 65Z" />
          <path d="M80 70 V128 H98 V70Z" />
          <path d="M26 21 C19 29 20 42 29 49 L40 39 C35 35 35 29 41 24Z" />
          <path d="M119 24 C125 29 125 35 120 39 L131 49 C140 42 141 29 134 21Z" />
          <path d="M79 125 C79 136 86 143 96 143 V126Z" />
        </g>
        <g fill="#3b2016" stroke="#f5ae63" strokeWidth="2">
          <ellipse cx="30" cy="31" rx="7" ry="11" transform="rotate(-45 30 31)" />
          <ellipse cx="130" cy="31" rx="7" ry="11" transform="rotate(45 130 31)" />
          <ellipse cx="88" cy="134" rx="7" ry="11" />
        </g>
        <path d="M76 70 L84 78 L92 70" fill="none" stroke="#ffbd70" strokeWidth="3" opacity="0.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="potGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#e88643" />
          <stop offset="0.55" stopColor="#a74325" />
          <stop offset="1" stopColor="#642718" />
        </linearGradient>
      </defs>
      <path d="M55 42 C52 58 47 66 44 78 C39 102 52 123 80 127 C108 131 126 115 121 88 C118 72 108 61 105 43Z" fill="url(#potGradient)" stroke="#552416" strokeWidth="4" />
      <path d="M53 43 C56 32 102 31 107 43 C103 55 58 55 53 43Z" fill="#6b2a19" stroke="#4b2116" strokeWidth="4" />
      <ellipse cx="80" cy="41" rx="22" ry="7" fill="#f2a25b" stroke="#552416" strokeWidth="3" />
      <path d="M82 47 L73 68 L84 80 L72 96 L81 108" fill="none" stroke="#3f1c16" strokeWidth="5" strokeLinecap="round" />
      <path d="M52 116 L35 127 L47 134 L60 124Z M111 122 L126 131 L115 138 L103 128Z" fill="#b85a2c" stroke="#552416" strokeWidth="3" />
      <path d="M61 61 C72 67 91 68 103 61" fill="none" stroke="#f3a15a" strokeWidth="3" opacity="0.65" />
    </svg>
  );
}

function PotteryCluster() {
  return (
    <div className="pointer-events-none absolute bottom-3 right-3 flex items-end gap-1 opacity-90" aria-hidden="true">
      <span className="h-4 w-4 rounded-b-md rounded-t-full border-2 border-[#6f321d] bg-[#b85a2c]" />
      <span className="relative h-7 w-6 rounded-b-lg rounded-t-[45%] border-2 border-[#6f321d] bg-[#c66b32]">
        <span className="absolute -top-1 left-1/2 h-1.5 w-3 -translate-x-1/2 rounded-full border border-[#6f321d] bg-[#d78943]" />
      </span>
    </div>
  );
}

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
      {/* Decision Screen Background */}
<div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/assets/decision_screen_bg.png')",
    filter: 'brightness(0.9) saturate(1)',
  }}
/>

      {/* Top Title Banner - Matching PDF Page 5 */}
      <div
        className="relative z-10 mt-36 flex flex-col items-center text-center sm:mt-40 md:mt-44"
        style={{ transform: 'translateY(100px)' }}
      >
        <div className="relative w-full max-w-4xl rounded-xl border-2 border-[#D4AF37] bg-[linear-gradient(180deg,#4a2b16_0%,#241308_100%)] px-5 py-3 shadow-[0_0_18px_rgba(212,175,55,0.45),inset_0_0_0_1px_rgba(255,215,106,0.45)] sm:px-10 sm:py-4">
          <div className="pointer-events-none absolute inset-1 rounded-lg border border-[#8f641f]/80" />
          <h2 className="relative font-cinzel text-2xl font-black tracking-widest text-[#FFD76A] drop-shadow-[0_2px_4px_rgba(20,10,4,0.95)] sm:text-3xl md:text-4xl">
            THE CITY MUST DECIDE
          </h2>
        </div>
        <p className="mt-2 flex items-center gap-3 font-philosopher text-base font-semibold text-[#F5D77A] drop-shadow-[0_2px_4px_rgba(20,10,4,0.95)] sm:text-lg">
          <span className="text-sm text-[#D4AF37]">❖</span>
          How should we solve the water problem?
          <span className="text-sm text-[#D4AF37]">❖</span>
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
              className={`decision-card relative cursor-pointer transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between h-[340px] sm:h-[380px] ${
                isSelected ? 'decision-card-selected scale-105' : 'decision-card-unselected hover:scale-[1.02]'
              }`}
            >
              {/* Card Badge Letter (A, B, C) */}
              <div className="decision-card-badge">
                {dec.badge}
              </div>
              {isSelected && (
                <span className="decision-card-selected-pill">SELECTED</span>
              )}

              {/* Card Illustration Icon */}
              <div className="my-auto flex flex-col items-center text-center decision-card-main">
                <div className={`decision-card-illustration ${isSelected ? 'decision-card-illustration-selected' : ''}`}>
                  <img src={dec.icon} alt="" className="h-full w-full object-contain" />
                </div>

                <h3
                  className="font-cinzel text-base sm:text-lg font-black mt-4 leading-tight decision-card-title"
                  style={{ color: '#2B2118' }}
                >
                  {dec.title}
                </h3>
              </div>

              {/* Card Explanation Text */}
              <p
                className="font-philosopher text-xs sm:text-sm text-center leading-relaxed decision-card-description"
                style={{ color: '#3A3026' }}
              >
                {dec.detail}
              </p>

              {/* Selection Checkmark */}
              <div className="flex justify-center decision-card-check-wrap">
                <div className={`decision-card-check ${isSelected ? 'decision-card-check-selected' : ''}`}>
                  {isSelected && <Check className="h-4 w-4 stroke-[3]" />}
                </div>
              </div>
              <div className="decision-card-ornament decision-card-ornament-left" aria-hidden="true">❖</div>
              <div className="decision-card-ornament decision-card-ornament-right" aria-hidden="true">❖</div>
              <PotteryCluster />
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
