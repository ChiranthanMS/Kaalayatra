import React, { useState } from 'react';
import { ChevronRight, HelpCircle, ArrowRight, MessageCircle } from 'lucide-react';
import sound from '../utils/SoundEngine';

export default function DialogueScreen({ onNavigate }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentDialogue, setCurrentDialogue] = useState(
    "Our settlement is growing, but the water is no longer flowing safely. We need a better drainage system to keep the city healthy."
  );

  const topics = [
    {
      id: 'cause',
      label: 'What caused this?',
      response: 'The old brick conduits are cracked and choked with silt. Without continuous gentle slope gradients and covered soak pits, wastewater overflows into the street market!'
    },
    {
      id: 'how',
      label: 'How does drainage work?',
      response: 'Harappan master planning uses baked terracotta channels with underground cesspits. Heavy debris settles at the bottom while water flows safely through street ducts to the river!'
    },
    {
      id: 'help',
      label: 'What can we do?',
      response: 'You have arrived at the right moment! Step into the engineering courtyard and help us connect the houses to the main brick sewer before monsoon rains arrive.'
    }
  ];

  const handleSelectTopic = (topic) => {
    sound.playClick();
    setSelectedTopic(topic.id);
    setCurrentDialogue(topic.response);
  };

  const handleProceedToLearn = () => {
    sound.playReward();
    onNavigate('learn');
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-end p-4 sm:p-8 pt-16 bg-stone-950 text-amber-100 select-none">
      {/* Cinematic Background (Matching PDF Page 3) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `url('/assets/elder_dialogue.jpg')`,
          filter: 'brightness(0.95)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
      </div>

      {/* Main Dialogue Parchment Panel (Matching Page 3 layout) */}
      <div className="relative z-20 w-full max-w-5xl mx-auto parchment-box p-4 sm:p-6 shadow-2xl animate-fade-in border-3 border-[#c49a58]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Left Column: Speaker Tag & Text (8 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between min-h-[140px]">
            <div>
              {/* Speaker Tag */}
              <div className="flex items-center gap-2 mb-2 pb-1 border-b border-amber-800/30">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-700 animate-pulse"></span>
                <h3 className="font-cinzel text-lg sm:text-xl font-black text-amber-950 tracking-wider">
                  CITY ELDER
                </h3>
                <span className="text-[11px] font-philosopher text-amber-900/80 font-bold">
                  (Mohenjo-Daro Master Planner)
                </span>
              </div>

              {/* Dialogue Text */}
              <p className="font-philosopher text-base sm:text-lg text-stone-900 leading-relaxed font-semibold">
                "{currentDialogue}"
              </p>
            </div>

            {/* Quick Action when 'What can we do?' is selected or default */}
            {selectedTopic === 'help' && (
              <div className="mt-3 pt-2 border-t border-amber-800/30 flex items-center justify-between">
                <span className="text-xs font-philosopher text-amber-900 font-bold">
                  Ready to design the drainage system?
                </span>
                <button
                  onClick={handleProceedToLearn}
                  className="btn-gold text-xs sm:text-sm px-5 py-2 shadow-lg animate-bounce"
                >
                  <span>PROCEED TO BLUEPRINT</span>
                  <ArrowRight className="w-4 h-4 text-amber-950" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Dialogue Choice Buttons (5 cols) - Exact match for Page 3 */}
          <div className="md:col-span-5 flex flex-col gap-2.5">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelectTopic(t)}
                className={`btn-dialogue-choice ${
                  selectedTopic === t.id 
                    ? 'border-amber-600 bg-gradient-to-r from-amber-200 to-amber-300 font-bold shadow-md scale-[1.02]' 
                    : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-amber-800 text-xs">◆</span>
                  <span>{t.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 text-amber-800 transition-transform ${selectedTopic === t.id ? 'rotate-90' : ''}`} />
              </button>
            ))}

            {/* Secondary Direct Help Button */}
            {selectedTopic !== 'help' && (
              <button
                onClick={handleProceedToLearn}
                className="btn-terracotta text-xs sm:text-sm mt-1 py-2.5 shadow-md flex items-center justify-center gap-2"
              >
                <span>HELP THE SETTLEMENT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
