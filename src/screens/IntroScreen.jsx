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
              : "url('/assets/title_vista.png')",

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

<div className="w-full max-w-3xl mx-auto flex items-center justify-around pb-3">

  {[
    {
      id: 'world_explore',
      label: 'EXPLORE',
      image: '/assets/explore_icon.png',
    },
    {
      id: 'puzzle',
      label: 'SOLVE',
      image: '/assets/solve_icon.png',
    },
    {
      id: 'decision',
      label: 'DECIDE',
      image: '/assets/decide_icon.png',
    },
    {
      id: 'learn',
      label: 'LEARN',
      image: '/assets/learn_icon.png',
    },
  ].map((btn) => (
    <button
      key={btn.id}
      onClick={() => {
        sound.playClick();
        onNavigate(btn.id);
      }}
      className="
        flex flex-col items-center
        gap-2
        group
        transition-transform
        hover:-translate-y-2
        active:scale-95
        cursor-pointer
        bg-transparent
        border-0
        appearance-none
      "
    >

      {/* Generated Game Icon */}
<div
  className="
    w-20 h-20
    sm:w-24 sm:h-24
    md:w-28 md:h-28
    flex items-center justify-center
    transition-transform
    duration-200
    group-hover:scale-105
    bg-transparent
  "
>
  <img
    src={btn.image}
    alt={btn.label}
    className="
      w-full
      h-full
      object-contain
      bg-transparent
      drop-shadow-[0_8px_10px_rgba(0,0,0,0.55)]
    "
  />
</div>

      {/* Label */}
      <span
        className="
          font-cinzel
          text-sm
          sm:text-base
          md:text-lg
          tracking-widest
          text-amber-100
          font-black
          drop-shadow-[0_3px_4px_rgba(0,0,0,0.9)]
        "
      >
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