import React from 'react';
import { ArrowRight, Trophy } from 'lucide-react';
import sound from '../utils/SoundEngine';

export default function ConsequenceScreen({ onNavigate, decision = 'B' }) {

  const handleProceedToInsight = () => {
    sound.playReward();
    onNavigate('insight');
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>

      {/* ── Full background image ── */}
      <img
        src="/assets/Consequences.png"
        alt="Consequences"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          pointerEvents: 'none', userSelect: 'none',
        }}
        draggable={false}
      />

      {/* Soft bottom fade for the reward strip */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '22%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.62) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

{/* ── BOTTOM REWARDS STRIP ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 8,
        padding: '8px 20px',
        background: 'rgba(6,3,1,0.82)',
        backdropFilter: 'blur(8px)',
        borderTop: '1.5px solid rgba(185,135,38,0.5)',
      }}>

        {/* Reward pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 12px', borderRadius: 8,
            background: 'rgba(120,60,5,0.25)', border: '1px solid rgba(180,110,20,0.45)',
            fontFamily: 'Cinzel, serif', fontSize: '11px', fontWeight: 900, color: '#fde97a',
          }}>
            <span style={{ fontSize: 13 }}>⭐</span>
            <span>+100 KNOWLEDGE XP</span>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 12px', borderRadius: 8,
            background: 'rgba(120,50,5,0.25)', border: '1px solid rgba(200,100,15,0.45)',
            fontFamily: 'Cinzel, serif', fontSize: '11px', fontWeight: 900, color: '#fbbf24',
          }}>
            <Trophy style={{ width: 13, height: 13, color: '#f97316' }} />
            <span>+50 HERITAGE XP</span>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 12px', borderRadius: 8,
            background: 'rgba(5,80,40,0.28)', border: '1px solid rgba(30,160,80,0.45)',
            fontFamily: 'Cinzel, serif', fontSize: '11px', fontWeight: 900, color: '#6ee7b7',
          }}>
            <span style={{ fontSize: 13 }}>🏺</span>
            <span>ARTIFACT UNLOCKED</span>
          </div>
        </div>

        {/* VIEW HISTORICAL INSIGHT button */}
        <button
          onClick={handleProceedToInsight}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '11px',
            letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer',
            borderRadius: 999, padding: '8px 18px',
            background: 'linear-gradient(180deg, #fce07a 0%, #d49f2b 50%, #9e6d0a 100%)',
            color: '#2a1604',
            border: '1.5px solid rgba(255,235,110,0.7)',
            boxShadow: '0 3px 12px rgba(0,0,0,0.55), 0 0 10px rgba(220,165,15,0.35), inset 0 1px 2px rgba(255,255,255,0.5)',
            transition: 'all 0.18s cubic-bezier(0.34,1.56,0.64,1)',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)'; e.currentTarget.style.filter = 'brightness(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.filter = 'none'; }}
          onMouseDown={e => { e.currentTarget.style.transform = 'translateY(1px) scale(0.97)'; }}
          onMouseUp={e => { e.currentTarget.style.transform = 'none'; }}
        >
          <span>VIEW HISTORICAL INSIGHT</span>
          <ArrowRight style={{ width: 14, height: 14, color: '#2a1604' }} />
        </button>
      </div>

    </div>
  );
}
