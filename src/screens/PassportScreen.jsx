import React, { useState } from 'react';
import { BookOpen, Award, Trophy, Settings, Lock, CheckCircle2, RotateCcw, MapPin, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import sound from '../utils/SoundEngine';

export default function PassportScreen({ onNavigate, xp = 200, heritageXp = 100, tokens = 50 }) {
  const [activeTab, setActiveTab] = useState('chapters'); // 'chapters', 'artifacts', 'achievements', 'settings'

  const lockedEras = [
    {
      id: 'mauryan',
      title: 'MAURYAN EMPIRE',
      challenges: '0/5 Challenges Completed',
      icon: '🏛️',
      sub: 'Ashoka Rock Edicts & Sarnath Lion Capital',
      status: 'LOCKED'
    },
    {
      id: 'gupta',
      title: 'GUPTA ERA',
      challenges: '0/4 Challenges Completed',
      icon: '🪙',
      sub: 'Golden Age of Science, Math & Classical Art',
      status: 'LOCKED'
    },
    {
      id: 'chola',
      title: 'CHOLA DYNASTY',
      challenges: '0/4 Challenges Completed',
      icon: '⛵',
      sub: 'Brihadisvara Temple & Bay of Bengal Fleet',
      status: 'LOCKED'
    },
    {
      id: 'vijayanagara',
      title: 'VIJAYANAGARA',
      challenges: '0/4 Challenges Completed',
      icon: '🐘',
      sub: 'Hampi Stone Chariot & Tungabhadra Splendor',
      status: 'LOCKED'
    },
    {
      id: 'mughal',
      title: 'MUGHAL ERA',
      challenges: '0/5 Challenges Completed',
      icon: '🕌',
      sub: 'Indo-Islamic Architecture & Red Fort',
      status: 'LOCKED'
    },
    {
      id: 'independence',
      title: 'INDEPENDENCE',
      challenges: '0/3 Challenges Completed',
      icon: '🇮🇳',
      sub: 'Freedom Struggle & Constitution of India',
      status: 'LOCKED'
    }
  ];

  const artifactsList = [
    {
      id: 'pottery',
      name: 'Harappan Painted Pottery',
      era: 'Indus Valley (2500 BCE)',
      icon: '🏺',
      desc: 'Burnished red clay jar featuring black slip geometric and fauna motifs.',
      unlocked: true
    },
    {
      id: 'seal',
      name: 'Pashupati Unicorn Seal',
      era: 'Mohenjo-Daro (2600 BCE)',
      icon: '🦏',
      desc: 'Steatite stamp seal engraved with Indus script and sacred animal.',
      unlocked: true
    },
    {
      id: 'dancing_girl',
      name: 'Bronze Dancing Girl',
      era: 'Indus Valley (2300 BCE)',
      icon: '💃',
      desc: 'Lost-wax cast bronze figurine demonstrating advanced metallurgy.',
      unlocked: false
    },
    {
      id: 'ashoka_pillar',
      name: 'Sarnath Lion Capital',
      era: 'Mauryan Empire (250 BCE)',
      icon: '🦁',
      desc: 'Polished sandstone capital featuring four lions and the Ashoka Chakra.',
      unlocked: false
    }
  ];

  const achievementsList = [
    { id: 1, title: '🏛️ INDUS VALLEY EXPLORER', desc: 'Complete all 3 foundational Harappan challenges', unlocked: true },
    { id: 2, title: '💧 MASTER HYDRAULIC ENGINEER', desc: 'Design and connect the city drainage network flawlessly', unlocked: true },
    { id: 3, title: '📜 HISTORIAN OF SINDHU', desc: 'Uncover the urban engineering insights of Mohenjo-Daro', unlocked: true },
    { id: 4, title: '🧭 BHARAT VOYAGER', desc: 'Unlock 3 distinct Indian civilization eras', unlocked: false },
    { id: 5, title: '👑 GRAND CHRONICLER', desc: 'Collect all 28 historical artifacts across India', unlocked: false }
  ];

  const handleTabChange = (tab) => {
    sound.playClick();
    setActiveTab(tab);
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-3 sm:p-6 pt-16 bg-[#120a06] text-amber-100 select-none">
      {/* Antique Wood & Room Backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/intro_chamber.jpg')`,
          filter: 'brightness(0.3) blur(4px)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/90"></div>
      </div>

      {/* Top Tabs Bar - Matching PDF Page 8 */}
      <div className="relative z-20 flex items-center justify-center gap-2 sm:gap-4">
        {[
          { id: 'chapters', label: 'CHAPTERS', icon: BookOpen },
          { id: 'artifacts', label: 'ARTIFACTS', icon: Sparkles },
          { id: 'achievements', label: 'ACHIEVEMENTS', icon: Trophy },
          { id: 'settings', label: 'SETTINGS', icon: Settings }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-2 px-3 sm:px-6 py-2 rounded-t-xl text-xs sm:text-sm font-cinzel font-black tracking-wider transition-all border-t-2 border-x-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-b from-[#e5b982] to-[#c49a58] text-amber-950 border-amber-200 shadow-[0_-4px_16px_rgba(223,177,65,0.4)] translate-y-0.5'
                : 'bg-stone-950/90 text-amber-300/80 border-amber-800/60 hover:bg-stone-900 hover:text-amber-100'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Open Antique Leather Passport Book (Matching PDF Page 8) */}
      <div className="relative z-10 flex-1 max-w-6xl mx-auto w-full rounded-2xl p-4 sm:p-6 shadow-2xl border-4 border-[#784d12] bg-[#22130b] my-auto flex flex-col justify-between overflow-hidden">
        {/* Book Spine Texture Line */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/50 via-amber-950/80 to-black/50 shadow-inner hidden md:block pointer-events-none z-30"></div>

        {/* TAB 1: CHAPTERS & EXPEDITION MAP (Default matching PDF Page 8) */}
        {activeTab === 'chapters' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full items-stretch animate-fade-in overflow-y-auto">
            {/* LEFT PAGE: MY JOURNEY THROUGH INDIA (5 cols) */}
            <div className="md:col-span-5 parchment-box p-4 sm:p-5 flex flex-col justify-between shadow-xl">
              <div>
                <div className="text-center pb-2 border-b-2 border-amber-800/30">
                  <span className="text-[10px] font-cinzel tracking-widest text-amber-900 font-bold uppercase">
                    Expedition Journal
                  </span>
                  <h3 className="font-cinzel text-lg sm:text-xl font-black text-amber-950 mt-0.5">
                    MY JOURNEY THROUGH INDIAN CIVILIZATION
                  </h3>
                </div>

                {/* Kalayatra Crest Banner */}
                <div className="my-3 p-3 rounded-xl bg-amber-900/15 border border-amber-800/40 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 border-2 border-amber-200 flex items-center justify-center font-bold text-amber-950 text-xl shadow">
                    🕉️
                  </div>
                  <div>
                    <h4 className="font-cinzel text-base font-black text-amber-950 leading-tight">
                      KALAYATRA
                    </h4>
                    <span className="text-[10px] font-philosopher text-amber-900 font-bold uppercase tracking-widest block">
                      The Kalayatra Expedition
                    </span>
                  </div>
                </div>

                {/* Stylized Passport Miniature Map */}
                <div className="rounded-xl border border-amber-800/40 bg-stone-900/10 p-2.5 text-center my-2">
                  <div className="text-[11px] font-cinzel text-amber-900 font-bold mb-1">
                    Route: Sindhu ➔ Ganga ➔ Deccan
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs font-philosopher text-stone-800 font-semibold">
                    <span className="px-2 py-0.5 rounded bg-emerald-800 text-white text-[10px]">Indus Valley: Completed</span>
                    <span className="text-amber-800">➔</span>
                    <span className="px-2 py-0.5 rounded bg-stone-700 text-stone-200 text-[10px]">Mauryan: Next</span>
                  </div>
                </div>

                {/* Explorer Seal & Signature */}
                <div className="mt-3 p-2 border-t border-amber-800/30 flex items-center justify-between text-xs font-philosopher text-stone-700">
                  <div>
                    <span className="font-bold text-amber-900 block">Explorer:</span>
                    <span className="italic font-bold">Raj — Time Voyager</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-red-700/80 flex items-center justify-center text-[10px] font-cinzel font-bold text-red-800 rotate-12">
                    SEALED
                  </div>
                </div>
              </div>

              {/* Action: Replay & Travel */}
              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigate('world_explore')}
                  className="btn-terracotta text-xs px-3 py-2 flex items-center gap-1.5 shadow"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>REPLAY INDUS</span>
                </button>
                <button
                  onClick={() => onNavigate('bharat_map')}
                  className="btn-gold text-xs px-4 py-2 flex items-center gap-1.5 shadow"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>BHARAT MAP</span>
                </button>
              </div>
            </div>

            {/* RIGHT PAGE: INDUS VALLEY SUMMARY & LOCKED ERAS GRID (7 cols) */}
            <div className="md:col-span-7 parchment-box p-4 sm:p-5 flex flex-col justify-between shadow-xl">
              <div>
                {/* Active Completed Chapter Banner */}
                <div className="p-3 rounded-xl bg-emerald-950/20 border-2 border-emerald-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-cinzel font-bold text-emerald-900 uppercase tracking-widest">
                      Active Chapter Completed
                    </span>
                    <h3 className="font-cinzel text-lg sm:text-xl font-black text-amber-950">
                      INDUS VALLEY CIVILIZATION
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white shadow-lg">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="font-cinzel font-black text-amber-950 text-base">3 / 3</span>
                      <span className="text-[9px] font-philosopher text-emerald-900 block font-bold leading-none">Completed</span>
                    </div>
                  </div>
                </div>

                {/* Discovered Artifact Banner */}
                <div className="my-2.5 p-2.5 rounded-lg bg-amber-900/10 border border-amber-800/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🏺</span>
                    <div>
                      <span className="text-[9px] font-cinzel text-amber-900 font-bold uppercase block">
                        Discovered Artifact
                      </span>
                      <span className="text-xs font-cinzel font-black text-amber-950">
                        HARAPPAN PAINTED POTTERY
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-cinzel font-bold">
                    UNLOCKED
                  </span>
                </div>

                {/* 6 Locked Civilization Cards Grid (Exact match for PDF Page 8) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                  {lockedEras.map((era) => (
                    <div
                      key={era.id}
                      className="p-2 rounded-lg bg-stone-900/10 border border-stone-400/50 flex flex-col justify-between h-[85px] relative group opacity-85 hover:opacity-100"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base">{era.icon}</span>
                        <Lock className="w-3.5 h-3.5 text-stone-600" />
                      </div>
                      <div>
                        <h5 className="font-cinzel text-[10px] font-black text-stone-900 leading-tight">
                          {era.title}
                        </h5>
                        <p className="text-[9px] font-philosopher text-stone-600 truncate">
                          {era.challenges}
                        </p>
                      </div>
                      <span className="text-[8px] font-cinzel text-stone-500 font-bold">
                        {era.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Passport Bottom Stats */}
              <div className="mt-3 pt-2 border-t border-amber-800/30 flex items-center justify-between text-xs font-philosopher font-bold text-stone-800">
                <span className="flex items-center gap-1">⭐ Total XP: {xp + heritageXp}</span>
                <span className="flex items-center gap-1">🪙 Tokens: {tokens}</span>
                <span className="text-emerald-800">Chapter 1 Mastered</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARTIFACTS VAULT */}
        {activeTab === 'artifacts' && (
          <div className="parchment-box p-6 h-full flex flex-col justify-between animate-fade-in shadow-xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-amber-800/30">
                <h3 className="font-cinzel text-2xl font-black text-amber-950">
                  🏺 EXPEDITION ARTIFACTS VAULT
                </h3>
                <span className="text-xs font-cinzel font-bold text-amber-900">
                  2 / 4 Discovered
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {artifactsList.map(item => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border-2 flex flex-col justify-between h-56 transition-all ${
                      item.unlocked
                        ? 'bg-amber-950/15 border-amber-600 shadow-md'
                        : 'bg-stone-900/10 border-stone-400 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{item.icon}</span>
                      {item.unlocked ? (
                        <span className="text-[10px] font-cinzel font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          COLLECTED
                        </span>
                      ) : (
                        <Lock className="w-4 h-4 text-stone-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-cinzel text-sm font-black text-amber-950">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-philosopher text-amber-800 font-bold block">
                        {item.era}
                      </span>
                      <p className="text-[11px] font-philosopher text-stone-700 mt-1 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-3 text-xs font-philosopher text-stone-600">
              Continue exploring subsequent Indian empires to unlock the remaining historical treasures.
            </div>
          </div>
        )}

        {/* TAB 3: ACHIEVEMENTS */}
        {activeTab === 'achievements' && (
          <div className="parchment-box p-6 h-full flex flex-col justify-between animate-fade-in shadow-xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-amber-800/30">
                <h3 className="font-cinzel text-2xl font-black text-amber-950">
                  🏆 EXPEDITION ACHIEVEMENTS
                </h3>
                <span className="text-xs font-cinzel font-bold text-amber-900">
                  3 / 5 Unlocked
                </span>
              </div>

              <div className="space-y-3 mt-4">
                {achievementsList.map(a => (
                  <div
                    key={a.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between ${
                      a.unlocked
                        ? 'bg-amber-950/15 border-amber-600 shadow'
                        : 'bg-stone-900/10 border-stone-400 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-900/20 border border-amber-700/50 flex items-center justify-center text-lg">
                        {a.unlocked ? '✨' : '🔒'}
                      </div>
                      <div>
                        <h4 className="font-cinzel text-sm font-black text-amber-950">
                          {a.title}
                        </h4>
                        <p className="text-xs font-philosopher text-stone-800 font-semibold">
                          {a.desc}
                        </p>
                      </div>
                    </div>
                    {a.unlocked ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-800 text-white text-[10px] font-cinzel font-bold">
                        COMPLETED
                      </span>
                    ) : (
                      <span className="text-xs font-cinzel text-stone-500 font-bold">
                        LOCKED
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="parchment-box p-6 h-full flex flex-col justify-between animate-fade-in shadow-xl">
            <div>
              <h3 className="font-cinzel text-2xl font-black text-amber-950 pb-3 border-b-2 border-amber-800/30">
                ⚙️ EXPEDITION PREFERENCES
              </h3>
              <div className="space-y-4 mt-4 max-w-md">
                <div className="flex items-center justify-between p-3 rounded-lg bg-amber-900/10 border border-amber-800/30">
                  <span className="font-cinzel text-sm font-bold text-amber-950">Atmospheric Sound & Drone:</span>
                  <button
                    onClick={() => sound.toggleMute()}
                    className="btn-gold text-xs px-4 py-1.5"
                  >
                    Toggle Audio
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-amber-900/10 border border-amber-800/30">
                  <span className="font-cinzel text-sm font-bold text-amber-950">Primary Target Display:</span>
                  <span className="text-xs font-philosopher font-bold text-stone-800">1366 × 768 HD</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-800/30 flex justify-end">
              <button
                onClick={() => onNavigate('intro')}
                className="btn-terracotta text-xs px-6 py-2"
              >
                Return to Title Screen
              </button>
            </div>
          </div>
        )}

        {/* Bottom Progress Bar - Matching PDF Page 8 */}
        <div className="mt-3 pt-3 border-t-2 border-amber-700/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-cinzel text-amber-300 font-bold">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span>TOTAL PROGRESS: 12%</span>
            <div className="w-32 h-2.5 rounded-full bg-stone-900 border border-amber-600 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 w-[12%]"></div>
            </div>
          </div>

          <span className="text-amber-400/80">
            28 CHALLENGES REMAINING ACROSS BHARAT
          </span>
        </div>
      </div>
    </div>
  );
}
