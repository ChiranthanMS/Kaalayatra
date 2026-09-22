import React, { useState, useEffect } from 'react';
import { Compass, Puzzle, Cog, Scroll, Play, ChevronRight, Sparkles } from 'lucide-react';
import sound from '../utils/SoundEngine';

export default function IntroScreen({ onNavigate }) {
  const [stage, setStage] = useState('prologue'); // 'prologue' (Page 1) or 'title_vista' (Page 9)
  const [typedText, setTypedText] = useState('');
  const fullText = "A mysterious artifact... And a journey through time begins!";

  // Typewriter effect for prologue dialogue
  useEffect(() => {
    if (stage === 'prologue') {
      let index = 0;
      setTypedText('');
      const interval = setInterval(() => {
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index));
          sound.playDialogueBeep();
          index++;
        } else {
          clearInterval(interval);
        }
      }, 35);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const handleNextToTitle = () => {
    sound.playClick();
    sound.startAmbient();
    setStage('title_vista');
  };

  const handleBeginJourney = () => {
    sound.playReward();
    onNavigate('bharat_map');
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-between text-white select-none">
      {/* Background Graphic */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-100"
        style={{
          backgroundImage: stage === 'prologue' 
            ? `url('/assets/intro_chamber.jpg')` 
            : `url('/assets/title_vista.jpg')`,
          filter: 'brightness(0.95)'
        }}
      >
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80"></div>
      </div>

      {/* Screen 1A: Prologue Artifact Chamber (Page 1 Reference) */}
      {stage === 'prologue' && (
        <div className="w-full h-full relative z-10 flex flex-col justify-between p-6 sm:p-10 pt-20">
          {/* Top Logo */}
          <div className="flex flex-col items-center text-center animate-fade-in">
            <h1 className="font-cinzel font-black text-4xl sm:text-5xl md:text-6xl tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#fff2b2] via-[#ffd700] to-[#b8860b] drop-shadow-[0_6px_20px_rgba(0,0,0,0.95)]">
              KALAYATRA
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="h-[2px] w-12 bg-amber-400"></span>
              <p className="font-philosopher text-sm sm:text-base tracking-[0.25em] text-amber-200 uppercase font-bold drop-shadow">
                The Living India Game
              </p>
              <span className="h-[2px] w-12 bg-amber-400"></span>
            </div>
          </div>

          {/* Center glowing particles over artifact */}
          <div className="flex-1 flex items-center justify-center relative pointer-events-none">
            <div className="w-56 h-56 rounded-full bg-amber-400/25 blur-3xl animate-pulse"></div>
          </div>

          {/* Bottom Parchment Dialogue Panel (Page 1 Reference) */}
          <div className="w-full max-w-4xl mx-auto parchment-box p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
            <div className="flex items-center gap-3.5 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-full bg-amber-900/20 border border-amber-700/60 flex items-center justify-center text-amber-900 shrink-0">
                <Sparkles className="w-5 h-5 text-amber-800 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <p className="font-philosopher text-base sm:text-xl md:text-2xl font-bold text-stone-900 leading-snug">
                {typedText}
                <span className="inline-block w-2 h-5 bg-amber-800 ml-1 animate-pulse"></span>
              </p>
            </div>

            <button
              onClick={handleNextToTitle}
              className="btn-gold whitespace-nowrap px-8 py-3 text-sm sm:text-base self-end sm:self-center shadow-lg flex items-center gap-2"
            >
              <span>NEXT</span>
              <ChevronRight className="w-5 h-5 text-amber-950" />
            </button>
          </div>
        </div>
      )}

      {/* Screen 1B: Title Vista with Modes (Page 9 Reference) */}
      {stage === 'title_vista' && (
        <div className="w-full h-full relative z-10 flex flex-col justify-between p-6 sm:p-10 pt-20 animate-fade-in">
          {/* Top Title Banner */}
          <div className="flex flex-col items-center text-center mt-2">
            <h1 className="font-cinzel font-black text-5xl sm:text-6xl md:text-7xl tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#fff6c4] via-[#ffdf00] to-[#c88a0a] drop-shadow-[0_8px_25px_rgba(0,0,0,0.98)]">
              KALAYATRA
            </h1>
            <div className="flex items-center gap-4 mt-1">
              <span className="h-[2px] w-16 bg-gradient-to-r from-transparent to-amber-400"></span>
              <p className="font-philosopher text-base sm:text-lg tracking-[0.3em] text-amber-200 uppercase font-black drop-shadow-lg">
                The Living India Game
              </p>
              <span className="h-[2px] w-16 bg-gradient-to-l from-transparent to-amber-400"></span>
            </div>
            <p className="font-philosopher italic text-amber-100/90 text-sm sm:text-base mt-1.5 drop-shadow">
              "Don't just learn India's history. Live it."
            </p>
          </div>

          {/* Center Main Action Button */}
          <div className="flex flex-col items-center gap-3 my-auto">
            <button
              onClick={handleBeginJourney}
              className="btn-gold text-xl sm:text-2xl px-12 py-4 shadow-2xl hover:scale-105 active:scale-95 transition-all border-3 border-amber-200 flex items-center gap-3"
            >
              <Play className="w-6 h-6 fill-amber-950 text-amber-950" />
              <span>BEGIN JOURNEY</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setStage('prologue'); }}
              className="text-xs text-amber-300/90 hover:text-amber-100 font-philosopher underline tracking-wider px-3 py-1 rounded bg-black/50 border border-amber-800/60"
            >
              ◀ View Artifact Chamber Prologue
            </button>
          </div>

          {/* Bottom Quick Feature Launchers (Exact match for Page 9 circular icons) */}
          <div className="w-full max-w-2xl mx-auto flex items-center justify-around pb-3">
            {[
              { id: 'world_explore', label: 'EXPLORE', icon: Compass, color: 'from-amber-400 via-amber-600 to-amber-900' },
              { id: 'puzzle', label: 'SOLVE', icon: Puzzle, color: 'from-sky-400 via-sky-600 to-sky-900' },
              { id: 'decision', label: 'DECIDE', icon: Cog, color: 'from-orange-400 via-orange-600 to-orange-900' },
              { id: 'learn', label: 'LEARN', icon: Scroll, color: 'from-emerald-400 via-emerald-600 to-emerald-900' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => { sound.playClick(); onNavigate(btn.id); }}
                className="flex flex-col items-center gap-1.5 group transition-transform hover:-translate-y-1.5 cursor-pointer"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${btn.color} p-1 border-3 border-amber-200 shadow-xl group-hover:shadow-amber-400/70 flex items-center justify-center`}>
                  <div className="w-full h-full rounded-full bg-stone-950/85 flex items-center justify-center group-hover:bg-stone-900/60 transition-colors">
                    <btn.icon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-200 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <span className="font-cinzel text-[11px] sm:text-xs tracking-widest text-amber-200 font-black drop-shadow">
                  {btn.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
