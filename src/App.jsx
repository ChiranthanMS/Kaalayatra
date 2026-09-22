import React, { useState } from 'react';
import HeaderHUD from './components/HeaderHUD';
import IntroScreen from './screens/IntroScreen';
import BharatMapScreen from './screens/BharatMapScreen';
import WorldExploreScreen from './screens/WorldExploreScreen';
import DialogueScreen from './screens/DialogueScreen';
import LearnScreen from './screens/LearnScreen';
import DrainagePuzzleScreen from './screens/DrainagePuzzleScreen';
import DecisionScreen from './screens/DecisionScreen';
import ConsequenceScreen from './screens/ConsequenceScreen';
import InsightScreen from './screens/InsightScreen';
import PassportScreen from './screens/PassportScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [xp, setXp] = useState(100);
  const [heritageXp, setHeritageXp] = useState(50);
  const [tokens, setTokens] = useState(50);
  const [selectedDecision, setSelectedDecision] = useState('B');
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  const handleNavigate = (screenId) => {
    setCurrentScreen(screenId);
  };

  const handleCompleteChallenge = (bonusXp) => {
    setXp(prev => prev + bonusXp);
    setHeritageXp(prev => prev + 50);
  };

  const handleSelectDecision = (decisionId) => {
    setSelectedDecision(decisionId);
    if (decisionId === 'B') {
      setXp(prev => prev + 50);
      setHeritageXp(prev => prev + 25);
    }
  };

  return (
    <div className="game-viewport">
      <div className="game-stage relative flex flex-col justify-between">
        {/* Top Header HUD */}
        <HeaderHUD
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          xp={xp}
          heritageXp={heritageXp}
          tokens={tokens}
          isAudioMuted={isAudioMuted}
          setIsAudioMuted={setIsAudioMuted}
        />

        {/* Dynamic Screen Routing */}
        <main className="w-full h-full relative overflow-hidden flex-1">
          {currentScreen === 'intro' && (
            <IntroScreen onNavigate={handleNavigate} />
          )}

          {currentScreen === 'bharat_map' && (
            <BharatMapScreen onNavigate={handleNavigate} />
          )}

          {currentScreen === 'world_explore' && (
            <WorldExploreScreen onNavigate={handleNavigate} />
          )}

          {currentScreen === 'dialogue' && (
            <DialogueScreen onNavigate={handleNavigate} />
          )}

          {currentScreen === 'learn' && (
            <LearnScreen onNavigate={handleNavigate} />
          )}

          {currentScreen === 'puzzle' && (
            <DrainagePuzzleScreen 
              onNavigate={handleNavigate} 
              onCompleteChallenge={handleCompleteChallenge} 
            />
          )}

          {currentScreen === 'decision' && (
            <DecisionScreen 
              onNavigate={handleNavigate} 
              onSelectDecision={handleSelectDecision} 
            />
          )}

          {currentScreen === 'consequence' && (
            <ConsequenceScreen 
              onNavigate={handleNavigate} 
              decision={selectedDecision} 
            />
          )}

          {currentScreen === 'insight' && (
            <InsightScreen onNavigate={handleNavigate} />
          )}

          {currentScreen === 'passport' && (
            <PassportScreen 
              onNavigate={handleNavigate} 
              xp={xp} 
              heritageXp={heritageXp} 
              tokens={tokens} 
            />
          )}
        </main>
      </div>
    </div>
  );
}
