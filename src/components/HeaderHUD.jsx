import React, { useState } from 'react';
import { Volume2, VolumeX, ChevronRight, ChevronDown } from 'lucide-react';
import sound from '../utils/SoundEngine';

export const SCREENS = [
  { id: 'intro',       num: 1,  title: 'Introduction' },
  { id: 'bharat_map',  num: 2,  title: 'Bharat Yatra Map' },
  { id: 'world_explore', num: 3, title: 'Indus Valley Exploration' },
  { id: 'dialogue',   num: 4,  title: 'City Elder Interaction' },
  { id: 'learn',      num: 5,  title: 'Urban Planning Insight' },
  { id: 'puzzle',     num: 6,  title: 'Drainage System Puzzle' },
  { id: 'decision',   num: 7,  title: 'City Historical Decision' },
  { id: 'consequence',num: 8,  title: 'Consequence (Before/After)' },
  { id: 'insight',    num: 9,  title: 'Historical Insight' },
  { id: 'passport',   num: 10, title: 'Bharat Passport' },
];

/* ─── Inline styles / keyframes ─── */
const HUD_CSS = `
  .hud-root {
    position: fixed; top: 0; left: 0; right: 0; z-index: 50;
    height: 52px;
    display: flex; align-items: stretch;
    user-select: none; pointer-events: auto;
    background: linear-gradient(180deg, #6b3b1a 0%, #4a240d 42%, #2e1408 100%);
    border-bottom: 2px solid #c9912e;
    box-shadow: 0 3px 18px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,215,100,0.22), inset 0 -1px 0 rgba(255,180,50,0.12);
  }
  /* Top decorative shimmer line */
  .hud-root::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255,220,100,0.5) 20%, rgba(255,240,160,0.9) 50%, rgba(255,220,100,0.5) 80%, transparent 100%);
    pointer-events: none;
  }
  /* Bottom decorative shimmer line */
  .hud-root::after {
    content: '';
    position: absolute; bottom: -1px; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(210,155,40,0.6) 25%, rgba(240,195,80,0.8) 50%, rgba(210,155,40,0.6) 75%, transparent 100%);
    pointer-events: none;
  }

  /* Logo button */
  .hud-logo {
    display: flex; align-items: center; gap: 0; padding: 0 14px 0 10px;
    cursor: pointer; border: none; outline: none; background: none;
    border-right: 1px solid rgba(180,120,35,0.45);
    transition: filter 0.18s ease;
    position: relative;
  }
  .hud-logo:hover { filter: brightness(1.12); }
  .hud-logo:hover .hud-logo-emblem { box-shadow: 0 0 14px rgba(240,185,30,0.7), inset 0 1px 2px rgba(255,255,255,0.4); }

  .hud-logo-emblem {
    width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
    background: radial-gradient(circle at 38% 32%, #f8dc85, #c48220 52%, #5e2a08 100%);
    border: 2px solid rgba(235,190,70,0.85);
    box-shadow: 0 0 8px rgba(220,165,25,0.45), inset 0 1px 2px rgba(255,255,255,0.35);
    display: flex; align-items: center; justify-content: center;
    transition: box-shadow 0.18s ease;
    margin-right: 9px;
  }
  .hud-logo-emblem span { font-size: 17px; line-height: 1; color: #3a1a05; }

  .hud-logo-text { display: flex; flex-direction: column; justify-content: center; line-height: 1; }
  .hud-logo-title {
    font-family: 'Cinzel', serif; font-weight: 900; font-size: 14px;
    letter-spacing: 0.1em; color: #f4d070;
    text-shadow: 0 1px 4px rgba(0,0,0,0.6), 0 0 12px rgba(240,185,30,0.3);
  }
  .hud-logo-sub {
    font-family: 'Philosopher', sans-serif; font-size: 7.5px;
    letter-spacing: 0.2em; text-transform: uppercase; color: #d4a84e;
    margin-top: 2px;
  }

  /* Chapter pill */
  .hud-chapter {
    display: flex; align-items: center; gap: 8px;
    padding: 0 14px; border-right: 1px solid rgba(180,120,35,0.4);
    flex-shrink: 0;
  }
  .hud-chapter-icon {
    width: 28px; height: 28px; border-radius: 6px; flex-shrink: 0;
    background: linear-gradient(145deg, #7a4520, #4a2510);
    border: 1px solid rgba(200,145,40,0.6);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
  }
  .hud-chapter-text { display: flex; flex-direction: column; line-height: 1; }
  .hud-chapter-label {
    font-family: 'Cinzel', serif; font-size: 7px; font-weight: 700;
    color: rgba(210,165,55,0.75); text-transform: uppercase; letter-spacing: 0.14em; margin-bottom: 2px;
  }
  .hud-chapter-name {
    font-family: 'Philosopher', sans-serif; font-size: 11.5px; font-weight: 700;
    color: #f8e8b8; white-space: nowrap;
  }
  .hud-chapter-num {
    font-family: 'Cinzel', serif; font-size: 11px; font-weight: 900;
    color: #f4c84a; margin-right: 1px;
  }

  /* Stat pill shared */
  .hud-stat {
    display: flex; align-items: center; gap: 7px;
    padding: 0 11px; height: 100%; flex-shrink: 0;
    border-right: 1px solid rgba(155,100,28,0.35);
  }
  .hud-stat-icon {
    width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px;
    background: radial-gradient(circle at 40% 35%, #f5d060, #b07018 60%, #5a2e05 100%);
    border: 1.5px solid rgba(220,170,50,0.7);
    box-shadow: 0 0 6px rgba(210,160,20,0.35), inset 0 1px 1px rgba(255,255,255,0.3);
  }
  .hud-stat-body { display: flex; flex-direction: column; line-height: 1; }
  .hud-stat-label {
    font-family: 'Cinzel', serif; font-size: 7px; font-weight: 700;
    color: rgba(210,165,55,0.8); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 1px;
  }
  .hud-stat-value {
    font-family: 'Cinzel', serif; font-size: 11.5px; font-weight: 900;
    color: #fde97a;
    text-shadow: 0 0 8px rgba(240,185,30,0.5);
  }

  /* Token pill */
  .hud-token {
    display: flex; align-items: center; gap: 6px;
    padding: 0 11px; height: 100%; flex-shrink: 0;
    border-right: 1px solid rgba(155,100,28,0.35);
  }
  .hud-token-coin {
    width: 26px; height: 26px; border-radius: 50%;
    background: radial-gradient(circle at 38% 32%, #fde97a, #c48220 55%, #5e2a08 100%);
    border: 1.5px solid rgba(230,175,40,0.8);
    box-shadow: 0 0 8px rgba(215,160,20,0.45), inset 0 1px 1px rgba(255,255,255,0.35);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; flex-shrink: 0;
  }
  .hud-token-value {
    font-family: 'Cinzel', serif; font-size: 13px; font-weight: 900;
    color: #fde97a; text-shadow: 0 0 8px rgba(240,185,30,0.5);
  }

  /* Sound button */
  .hud-sound {
    width: 40px; height: 100%;
    display: flex; align-items: center; justify-content: center;
    border: none; outline: none; cursor: pointer;
    background: none;
    border-right: 1px solid rgba(155,100,28,0.35);
    transition: background 0.15s ease;
    flex-shrink: 0;
  }
  .hud-sound:hover { background: rgba(180,120,30,0.25); }
  .hud-sound svg { color: #f0c045; }

  /* Screen jump button */
  .hud-jump {
    display: flex; align-items: center; gap: 6px;
    padding: 0 14px; height: 100%;
    border: none; outline: none; cursor: pointer; background: none;
    transition: background 0.15s ease; flex-shrink: 0;
  }
  .hud-jump:hover { background: rgba(180,120,30,0.22); }
  .hud-jump-icon {
    width: 22px; height: 22px; border-radius: 4px;
    background: linear-gradient(145deg, #7a4520, #4a2510);
    border: 1px solid rgba(200,145,40,0.55);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
  }
  .hud-jump-label {
    font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700;
    color: #f4d070; letter-spacing: 0.08em; white-space: nowrap;
  }

  /* Dropdown */
  .hud-dropdown {
    position: absolute; top: calc(100% + 6px); right: 0;
    width: 260px; max-height: 70vh; overflow-y: auto;
    border-radius: 10px; padding: 8px;
    background: linear-gradient(180deg, #3e2010 0%, #221005 100%);
    border: 1px solid #c18c36;
    box-shadow: 0 14px 36px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,220,130,0.15);
    z-index: 100;
  }
  .hud-dropdown-header {
    padding: 6px 8px 8px; border-bottom: 1px solid rgba(160,100,30,0.5);
    display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;
  }
  .hud-dropdown-title {
    font-family: 'Cinzel', serif; font-size: 9px; font-weight: 700;
    color: #f0c855; text-transform: uppercase; letter-spacing: 0.14em;
  }
  .hud-dropdown-count {
    font-family: 'Philosopher', sans-serif; font-size: 9px; color: #a08060;
  }
  .hud-dropdown-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 7px 10px; border-radius: 7px; cursor: pointer; border: none; outline: none;
    background: none; width: 100%; text-align: left; transition: background 0.15s ease;
    gap: 8px;
  }
  .hud-dropdown-item:hover { background: rgba(100,55,15,0.7); }
  .hud-dropdown-item.active { background: rgba(180,110,25,0.6); }
  .hud-dropdown-num {
    width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cinzel', serif; font-size: 9px; font-weight: 700;
  }
  .hud-dropdown-num.active { background: #3a1c08; color: #f5d477; }
  .hud-dropdown-num.inactive { background: #2c180b; color: #d7a94c; border: 1px solid rgba(120,75,30,0.6); }
  .hud-dropdown-name {
    flex: 1; font-family: 'Philosopher', sans-serif; font-size: 11.5px;
    font-weight: 600; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .hud-dropdown-name.active { color: #2d1607; font-weight: 700; }
  .hud-dropdown-name.inactive { color: #f1dfb0; }
  .hud-dropdown-arrow { color: rgba(200,155,60,0.55); flex-shrink: 0; }
`;

export default function HeaderHUD({
  currentScreen,
  onNavigate,
  xp,
  heritageXp,
  tokens,
  isAudioMuted,
  setIsAudioMuted,
}) {
  const [showNav, setShowNav] = useState(false);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsAudioMuted(muted);
  };

  const goTo = (id) => {
    sound.playClick();
    onNavigate(id);
    setShowNav(false);
  };

  const cur = SCREENS.find((s) => s.id === currentScreen) || SCREENS[0];

  return (
    <>
      <style>{HUD_CSS}</style>

      <header className="hud-root">

        {/* ── LOGO / HOME ── */}
        <button className="hud-logo" onClick={() => goTo('intro')} title="Go to Home">
          <div className="hud-logo-emblem">
            <span>ॐ</span>
          </div>
          <div className="hud-logo-text">
            <span className="hud-logo-title">KAALAYATRA</span>
            <span className="hud-logo-sub">The Living India Game</span>
          </div>
        </button>

        {/* ── CURRENT CHAPTER ── */}
        <div className="hud-chapter">
          <div className="hud-chapter-icon">📜</div>
          <div className="hud-chapter-text">
            <span className="hud-chapter-label">Chapter / Level</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span className="hud-chapter-num">{cur.num}.</span>
              <span className="hud-chapter-name">{cur.title}</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT CLUSTER ── */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'stretch', height: '100%' }}>

          {/* KNOWLEDGE XP */}
          <div className="hud-stat">
            <div className="hud-stat-icon">✦</div>
            <div className="hud-stat-body">
              <span className="hud-stat-label">Knowledge</span>
              <span className="hud-stat-value">{xp} XP</span>
            </div>
          </div>

          {/* HERITAGE XP */}
          <div className="hud-stat">
            <div className="hud-stat-icon">🏛️</div>
            <div className="hud-stat-body">
              <span className="hud-stat-label">Heritage</span>
              <span className="hud-stat-value">{heritageXp} XP</span>
            </div>
          </div>

          {/* TOKENS */}
          <div className="hud-token">
            <div className="hud-token-coin">🪙</div>
            <span className="hud-token-value">{tokens}</span>
          </div>

          {/* SOUND */}
          <button className="hud-sound" onClick={toggleSound} title={isAudioMuted ? 'Unmute' : 'Mute'}>
            {isAudioMuted
              ? <VolumeX style={{ width: 16, height: 16 }} />
              : <Volume2 style={{ width: 16, height: 16 }} />}
          </button>

          {/* SCREEN JUMP */}
          <div style={{ position: 'relative' }}>
            <button
              className="hud-jump"
              onClick={() => setShowNav(!showNav)}
              title="Jump to screen"
            >
              <div className="hud-jump-icon">≡</div>
              <span className="hud-jump-label">SCREEN JUMP</span>
              <ChevronDown style={{ width: 12, height: 12, color: '#f4c84a', flexShrink: 0 }} />
            </button>

            {showNav && (
              <div className="hud-dropdown">
                <div className="hud-dropdown-header">
                  <span className="hud-dropdown-title">Select Screen</span>
                  <span className="hud-dropdown-count">10 Screens</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {SCREENS.map((s) => {
                    const active = currentScreen === s.id;
                    return (
                      <button
                        key={s.id}
                        className={`hud-dropdown-item${active ? ' active' : ''}`}
                        onClick={() => goTo(s.id)}
                      >
                        <span className={`hud-dropdown-num ${active ? 'active' : 'inactive'}`}>
                          {s.num}
                        </span>
                        <span className={`hud-dropdown-name ${active ? 'active' : 'inactive'}`}>
                          {s.title}
                        </span>
                        <ChevronRight className="hud-dropdown-arrow" style={{ width: 13, height: 13 }} />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>
      </header>
    </>
  );
}
