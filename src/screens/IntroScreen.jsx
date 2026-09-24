import React, { useState, useEffect } from 'react';
import {
  Compass,
  Puzzle,
  Cog,
  Scroll,
  Play,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

import sound from '../utils/SoundEngine';

export default function IntroScreen({ onNavigate }) {
  const [stage, setStage] = useState('prologue');
  const [typedText, setTypedText] = useState('');

  const fullText =
    'A mysterious artifact... And a journey through time begins!';

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

      {/* =====================================================
          BACKGROUND GRAPHIC
      ====================================================== */}

      <div
        className="absolute inset-0 z-0 overflow-hidden bg-black"
        style={{
          backgroundImage:
            stage === 'prologue'
              ? "url('/assets/intro_chamber.png')"
              : "url('/assets/title_vista.jpg')",

          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#000000',
        }}
      >
        {/* Cinematic Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.35))',
          }}
        />
      </div>

      {/* =====================================================
          SCREEN 1: PROLOGUE ARTIFACT CHAMBER
      ====================================================== */}

      {stage === 'prologue' && (
        <div className="w-full h-full relative z-10 flex flex-col justify-between p-6 sm:p-10 pt-20">

          {/* =================================================
              KAALAYATRA LOGO

              Explicit pixel sizing so the logo can NEVER
              expand to its original 2048px width.
          ================================================= */}

          <div
            className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            style={{
              top: '10%',
              width: 'min(340px, 30vw)',
              maxWidth: '340px',
            }}
          >
            <img
              src="/assets/kaalayatra_logo.png"
              alt="Kaalayatra - The Living India Game"
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
                filter:
                  'drop-shadow(0 5px 12px rgba(0,0,0,0.9))',
              }}
            />
          </div>

          {/* =================================================
              CENTER GLOW
          ================================================= */}

          <div className="flex-1 flex items-center justify-center relative pointer-events-none">
            <div className="w-56 h-56 rounded-full bg-amber-400/25 blur-3xl animate-pulse" />
          </div>

          {/* =================================================
              BOTTOM DIALOGUE PANEL
          ================================================= */}

          <div className="w-full max-w-4xl mx-auto parchment-box p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">

            <div className="flex items-center gap-3.5 w-full sm:w-auto">

              <div className="w-10 h-10 rounded-full bg-amber-900/20 border border-amber-700/60 flex items-center justify-center text-amber-900 shrink-0">
                <Sparkles
                  className="w-5 h-5 text-amber-800 animate-spin"
                  style={{ animationDuration: '8s' }}
                />
              </div>

              <p className="font-philosopher text-base sm:text-xl md:text-2xl font-bold text-stone-900 leading-snug">
                {typedText}

                <span className="inline-block w-2 h-5 bg-amber-800 ml-1 animate-pulse" />
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

      {/* =====================================================
          SCREEN 2: TITLE VISTA WITH GAME MODES
      ====================================================== */}

      {stage === 'title_vista' && (
        <div className="w-full h-full relative z-10 flex flex-col justify-between p-6 sm:p-10 pt-20 animate-fade-in">

          {/* =================================================
              TITLE LOGO
          ================================================= */}

          <div className="flex flex-col items-center text-center mt-2">

            <div
              style={{
                width: 'min(360px, 32vw)',
                maxWidth: '360px',
              }}
            >
              <img
                src="/assets/kaalayatra_logo.png"
                alt="Kaalayatra - The Living India Game"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  filter:
                    'drop-shadow(0 6px 16px rgba(0,0,0,0.95))',
                }}
              />
            </div>

            <p className="font-philosopher italic text-amber-100/90 text-sm sm:text-base mt-3 drop-shadow">
              "Don't just learn India's history. Live it."
            </p>

          </div>

          {/* =================================================
              MAIN ACTION BUTTON
          ================================================= */}

          <div className="flex flex-col items-center gap-3 my-auto">

            <button
              onClick={handleBeginJourney}
              className="btn-gold text-xl sm:text-2xl px-12 py-4 shadow-2xl hover:scale-105 active:scale-95 transition-all border-3 border-amber-200 flex items-center gap-3"
            >
              <Play className="w-6 h-6 fill-amber-950 text-amber-950" />

              <span>BEGIN JOURNEY</span>
            </button>

            {/* Return to Prologue */}
            <button
              onClick={() => {
                sound.playClick();
                setStage('prologue');
              }}
              className="text-xs text-amber-300/90 hover:text-amber-100 font-philosopher underline tracking-wider px-3 py-1 rounded bg-black/50 border border-amber-800/60"
            >
              ◀ View Artifact Chamber Prologue
            </button>

          </div>

          {/* =================================================
              QUICK FEATURE LAUNCHERS
          ================================================= */}

          <div className="w-full max-w-2xl mx-auto flex items-center justify-around pb-3">

            {[
              {
                id: 'world_explore',
                label: 'EXPLORE',
                icon: Compass,
                color:
                  'from-amber-400 via-amber-600 to-amber-900',
              },
              {
                id: 'puzzle',
                label: 'SOLVE',
                icon: Puzzle,
                color:
                  'from-sky-400 via-sky-600 to-sky-900',
              },
              {
                id: 'decision',
                label: 'DECIDE',
                icon: Cog,
                color:
                  'from-orange-400 via-orange-600 to-orange-900',
              },
              {
                id: 'learn',
                label: 'LEARN',
                icon: Scroll,
                color:
                  'from-emerald-400 via-emerald-600 to-emerald-900',
              },
            ].map((btn) => {
              const Icon = btn.icon;

              return (
                <button
                  key={btn.id}
                  onClick={() => {
                    sound.playClick();
                    onNavigate(btn.id);
                  }}
                  className="flex flex-col items-center gap-1.5 group transition-transform hover:-translate-y-1.5 cursor-pointer"
                >

                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${btn.color} p-1 border-3 border-amber-200 shadow-xl group-hover:shadow-amber-400/70 flex items-center justify-center`}
                  >

                    <div className="w-full h-full rounded-full bg-stone-950/85 flex items-center justify-center group-hover:bg-stone-900/60 transition-colors">

                      <Icon
                        className="w-6 h-6 sm:w-7 sm:h-7 text-amber-200 group-hover:scale-110 transition-transform"
                      />

                    </div>

                  </div>

                  <span className="font-cinzel text-[11px] sm:text-xs tracking-widest text-amber-200 font-black drop-shadow">
                    {btn.label}
                  </span>

                </button>
              );
            })}

          </div>

        </div>
      )}

    </div>
  );
}