import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  ChevronRight,
  Menu,
  Sparkles,
  Trophy,
} from 'lucide-react';

import sound from '../utils/SoundEngine';

export const SCREENS = [
  { id: 'intro', num: 1, title: 'Introduction' },
  { id: 'bharat_map', num: 2, title: 'Bharat Yatra Map' },
  { id: 'world_explore', num: 3, title: 'Indus Valley Exploration' },
  { id: 'dialogue', num: 4, title: 'City Elder Interaction' },
  { id: 'learn', num: 5, title: 'Urban Planning Insight' },
  { id: 'puzzle', num: 6, title: 'Drainage System Puzzle' },
  { id: 'decision', num: 7, title: 'City Historical Decision' },
  { id: 'consequence', num: 8, title: 'Consequence (Before/After)' },
  { id: 'insight', num: 9, title: 'Historical Insight' },
  { id: 'passport', num: 10, title: 'Bharat Passport' },
];

export default function HeaderHUD({
  currentScreen,
  onNavigate,
  xp,
  heritageXp,
  tokens,
  isAudioMuted,
  setIsAudioMuted,
}) {
  const [showNavDropdown, setShowNavDropdown] = useState(false);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsAudioMuted(muted);
  };

  const handleSelectScreen = (screenId) => {
    sound.playClick();
    onNavigate(screenId);
    setShowNavDropdown(false);
  };

  const currentScreenObj =
    SCREENS.find((s) => s.id === currentScreen) || SCREENS[0];

  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        h-[58px]
        sm:h-[62px]
        flex
        items-center
        px-3
        sm:px-4
        lg:px-5
        pointer-events-auto
        select-none
      "
      style={{
        background:
          'linear-gradient(180deg, #5b3219 0%, #452510 48%, #32190b 100%)',
        borderBottom: '2px solid #c99a3b',
        boxShadow:
          '0 3px 12px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,215,120,0.25)',
      }}
    >

      {/* Gold inner line */}
      <div
        className="absolute inset-x-0 bottom-0 h-[1px] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, #e4bd63 20%, #f1d98b 50%, #e4bd63 80%, transparent)',
        }}
      />

      {/* =====================================================
          LEFT SECTION
      ====================================================== */}

      <div className="relative z-10 flex items-center gap-2 sm:gap-3 shrink-0">

        {/* Brand */}
        <button
          onClick={() => handleSelectScreen('intro')}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
        >
          <div
            className="
              w-9 h-9
              sm:w-10 sm:h-10
              rounded-full
              flex items-center justify-center
              shrink-0
              transition-transform
              group-hover:scale-105
            "
            style={{
              background:
                'radial-gradient(circle at 35% 30%, #f6d98b, #b67a27 55%, #5a2d0d 100%)',
              border: '1.5px solid #e5bd63',
              boxShadow:
                '0 0 8px rgba(231,181,78,0.3), inset 0 1px 2px rgba(255,255,255,0.3)',
            }}
          >
            <span className="text-[18px] sm:text-[19px] text-[#3a1c08] font-serif">
              ॐ
            </span>
          </div>

          <div className="flex flex-col justify-center leading-none">
            <span
              className="
                font-cinzel
                font-black
                text-[13px]
                sm:text-[15px]
                tracking-[0.08em]
                text-[#f4d58b]
              "
            >
              KAALAYATRA
            </span>

            <span
              className="
                hidden
                sm:block
                mt-[3px]
                font-philosopher
                text-[8px]
                sm:text-[9px]
                tracking-[0.16em]
                uppercase
                text-[#e8c982]
              "
            >
              The Living India Game
            </span>
          </div>
        </button>

        {/* Current screen */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-2
            h-9
            px-4
            rounded-full
            shrink-0
          "
          style={{
            background:
              'linear-gradient(180deg, #70431f 0%, #4b2912 100%)',
            border: '1px solid #b98231',
            boxShadow:
              'inset 0 1px 0 rgba(255,225,150,0.2), 0 2px 5px rgba(0,0,0,0.4)',
          }}
        >
          <span
            className="
              w-2 h-2 rounded-full
              bg-[#f3c64d]
              shadow-[0_0_6px_rgba(243,198,77,0.9)]
            "
          />

          <span className="font-cinzel text-[11px] lg:text-xs font-bold text-[#f2d58d]">
            {currentScreenObj.num}.
          </span>

          <span className="font-philosopher text-xs lg:text-sm text-[#fff0c5] whitespace-nowrap">
            {currentScreenObj.title}
          </span>
        </div>
      </div>

      {/* =====================================================
          RIGHT SECTION
          THIS IS FORCED TO THE FAR RIGHT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          ml-auto
          flex
          items-center
          justify-end
          gap-1.5
          sm:gap-2
          shrink-0
        "
      >

        {/* KNOWLEDGE XP */}
        <div
          className="
            flex
            items-center
            gap-1.5
            px-2
            sm:px-2.5
            h-9
            sm:h-10
            rounded-lg
            shrink-0
          "
          style={{
            background:
              'linear-gradient(180deg, #70411f 0%, #492711 100%)',
            border: '1px solid #bd8735',
            boxShadow:
              'inset 0 1px 0 rgba(255,225,160,0.2), 0 2px 5px rgba(0,0,0,0.4)',
          }}
        >
          <Sparkles className="w-4 h-4 text-[#f4ca52]" />

          <div className="flex flex-col leading-none">
            <span className="text-[8px] text-[#e8c77e] uppercase font-bold tracking-wide">
              Knowledge
            </span>

            <span className="text-[11px] font-bold text-[#fff0b5] font-cinzel">
              {xp} XP
            </span>
          </div>
        </div>

        {/* HERITAGE XP */}
        <div
          className="
            flex
            items-center
            gap-1.5
            px-2
            sm:px-2.5
            h-9
            sm:h-10
            rounded-lg
            shrink-0
          "
          style={{
            background:
              'linear-gradient(180deg, #66371c 0%, #42220f 100%)',
            border: '1px solid #ae6f32',
            boxShadow:
              'inset 0 1px 0 rgba(255,225,160,0.2), 0 2px 5px rgba(0,0,0,0.4)',
          }}
        >
          <Trophy className="w-4 h-4 text-[#e9b95a]" />

          <div className="flex flex-col leading-none">
            <span className="text-[8px] text-[#e1bd7a] uppercase font-bold tracking-wide">
              Heritage
            </span>

            <span className="text-[11px] font-bold text-[#ffe5a5] font-cinzel">
              {heritageXp} XP
            </span>
          </div>
        </div>

        {/* COINS */}
        <div
          className="
            flex
            items-center
            gap-1
            px-2
            sm:px-2.5
            h-9
            sm:h-10
            rounded-lg
            shrink-0
          "
          style={{
            background:
              'linear-gradient(180deg, #67401b 0%, #41250e 100%)',
            border: '1px solid #b47b2b',
            boxShadow:
              'inset 0 1px 0 rgba(255,225,160,0.2), 0 2px 5px rgba(0,0,0,0.4)',
          }}
        >
          <span className="text-sm">🪙</span>

          <span className="text-xs sm:text-sm font-bold text-[#f8d36d] font-cinzel">
            {tokens}
          </span>
        </div>

        {/* SOUND */}
        <button
          onClick={toggleSound}
          title={
            isAudioMuted
              ? 'Enable Sound & Ambient Music'
              : 'Mute Audio'
          }
          className="
            w-9
            h-9
            sm:w-10
            sm:h-10
            rounded-lg
            flex
            items-center
            justify-center
            transition-all
            hover:scale-105
            shrink-0
          "
          style={{
            background:
              'linear-gradient(180deg, #5d3518 0%, #391d0b 100%)',
            border: '1px solid #b98132',
            boxShadow:
              'inset 0 1px 0 rgba(255,225,160,0.2), 0 2px 5px rgba(0,0,0,0.4)',
          }}
        >
          {isAudioMuted ? (
            <VolumeX className="w-4 h-4 text-[#b9a88c]" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#f2c857]" />
          )}
        </button>

        {/* SCREEN JUMP */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowNavDropdown(!showNavDropdown)}
            className="
              flex
              items-center
              gap-1.5
              h-9
              sm:h-10
              px-2.5
              sm:px-3
              rounded-lg
              font-cinzel
              font-semibold
              text-[10px]
              sm:text-xs
              whitespace-nowrap
              transition-all
              hover:brightness-110
            "
            style={{
              background:
                'linear-gradient(180deg, #70451f 0%, #45250f 100%)',
              border: '1px solid #c3943c',
              color: '#f4d78d',
              boxShadow:
                'inset 0 1px 0 rgba(255,230,160,0.22), 0 2px 5px rgba(0,0,0,0.45)',
            }}
          >
            <Menu className="w-3.5 h-3.5" />

            <span className="hidden sm:inline">
              SCREEN JUMP
            </span>

            <span className="text-[#f0c653] text-[10px]">
              ▼
            </span>
          </button>

          {/* Dropdown */}
          {showNavDropdown && (
            <div
              className="
                absolute
                right-0
                top-full
                mt-2
                w-64
                max-h-[70vh]
                overflow-y-auto
                rounded-xl
                p-2
                z-[100]
              "
              style={{
                background:
                  'linear-gradient(180deg, #3b1f0d 0%, #241207 100%)',
                border: '1px solid #c18c36',
                boxShadow:
                  '0 12px 30px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,220,140,0.15)',
              }}
            >
              <div
                className="
                  px-2
                  py-2
                  mb-1
                  border-b
                  border-[#8a5c25]
                  flex
                  items-center
                  justify-between
                "
              >
                <span className="text-[10px] font-cinzel text-[#f0ca69] font-bold uppercase tracking-wider">
                  Select Prototype Screen
                </span>

                <span className="text-[9px] text-[#a99576]">
                  10 Steps
                </span>
              </div>

              <div className="flex flex-col gap-1">
                {SCREENS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectScreen(s.id)}
                    className={`
                      flex
                      items-center
                      justify-between
                      px-2.5
                      py-2
                      rounded-lg
                      text-xs
                      font-philosopher
                      text-left
                      transition-all
                      ${
                        currentScreen === s.id
                          ? 'bg-[#b47a29] text-[#2d1607] font-bold'
                          : 'text-[#f1dfb0] hover:bg-[#5a3014] hover:text-[#ffd96f]'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`
                          w-5
                          h-5
                          rounded-full
                          flex
                          items-center
                          justify-center
                          text-[10px]
                          font-cinzel
                          shrink-0
                          ${
                            currentScreen === s.id
                              ? 'bg-[#3a1c08] text-[#f5d477]'
                              : 'bg-[#2c180b] text-[#d7a94c] border border-[#775021]'
                          }
                        `}
                      >
                        {s.num}
                      </span>

                      <span className="truncate">
                        {s.title}
                      </span>
                    </div>

                    <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}