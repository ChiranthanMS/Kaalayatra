import React, { useState } from 'react';
import { Volume2, VolumeX, Compass, MapPin, Award, BookOpen, ChevronRight, Menu, Sparkles, Trophy } from 'lucide-react';
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
  { id: 'passport', num: 10, title: 'Bharat Passport' }
];

export default function HeaderHUD({ currentScreen, onNavigate, xp, heritageXp, tokens, isAudioMuted, setIsAudioMuted }) {
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

  const currentScreenObj = SCREENS.find(s => s.id === currentScreen) || SCREENS[0];

  return (
    <header className="w-full absolute top-0 left-0 z-50 flex items-center justify-between px-4 py-2.5 bg-gradient-to-b from-black/90 via-black/70 to-transparent pointer-events-auto">
      {/* Left: Kalayatra Emblem & Current Stage */}
      <div className="flex items-center gap-3">
        <div 
          onClick={() => handleSelectScreen('intro')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 via-amber-600 to-amber-950 border-2 border-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <span className="text-sm font-bold text-amber-950">ॐ</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-cinzel font-bold text-sm tracking-wider text-amber-200 leading-tight">
              KALAYATRA
            </h1>
            <p className="text-[10px] text-amber-400/80 font-philosopher tracking-widest uppercase">
              The Living India Game
            </p>
          </div>
        </div>

        {/* Current Screen Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/80 border border-amber-700/60 text-xs text-amber-100/90 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="font-cinzel text-amber-300 font-semibold">{currentScreenObj.num}.</span>
          <span className="font-philosopher">{currentScreenObj.title}</span>
        </div>
      </div>

      {/* Right: XP, Tokens, Quick-Jump & Sound Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Knowledge XP */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/50 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <div className="flex flex-col text-left">
            <span className="text-[9px] text-amber-300/80 font-semibold uppercase leading-none">Knowledge</span>
            <span className="text-xs font-bold text-amber-200 font-cinzel leading-tight">{xp} XP</span>
          </div>
        </div>

        {/* Heritage XP */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-950/80 border border-orange-500/50 shadow-md">
          <Trophy className="w-3.5 h-3.5 text-orange-400" />
          <div className="flex flex-col text-left">
            <span className="text-[9px] text-orange-300/80 font-semibold uppercase leading-none">Heritage</span>
            <span className="text-xs font-bold text-orange-200 font-cinzel leading-tight">{heritageXp} XP</span>
          </div>
        </div>

        {/* Tokens */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-950/80 border border-yellow-500/50 shadow-md">
          <span className="text-sm">🪙</span>
          <span className="text-xs font-bold text-yellow-300 font-cinzel">{tokens}</span>
        </div>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          title={isAudioMuted ? "Enable Sound & Ambient Music" : "Mute Audio"}
          className="p-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 border border-amber-600/50 text-amber-300 transition-all hover:scale-105"
        >
          {isAudioMuted ? <VolumeX className="w-4 h-4 text-stone-400" /> : <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />}
        </button>

        {/* Screen Jump Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNavDropdown(!showNavDropdown)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-700/80 to-amber-900/90 hover:from-amber-600 hover:to-amber-800 border border-amber-400/60 text-amber-100 text-xs font-cinzel font-semibold shadow-lg transition-all"
          >
            <Menu className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Screen Jump</span>
          </button>

          {showNavDropdown && (
            <div className="absolute right-0 mt-2 w-64 max-h-[75vh] overflow-y-auto rounded-xl bg-stone-950/95 border-2 border-amber-500/70 p-2 shadow-2xl shadow-black z-50 backdrop-blur-md">
              <div className="px-2 py-1 text-[11px] font-cinzel text-amber-400/90 font-bold border-b border-amber-800/60 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Select Prototype Screen</span>
                <span className="text-[9px] text-stone-400">10 Steps</span>
              </div>
              <div className="flex flex-col gap-1">
                {SCREENS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectScreen(s.id)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-philosopher text-left transition-all ${
                      currentScreen === s.id
                        ? 'bg-amber-600 text-amber-950 font-bold shadow-md'
                        : 'text-amber-100/90 hover:bg-amber-950/60 hover:text-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-cinzel ${
                        currentScreen === s.id ? 'bg-amber-950 text-amber-200' : 'bg-stone-800 text-amber-400'
                      }`}>
                        {s.num}
                      </span>
                      <span className="truncate">{s.title}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
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
