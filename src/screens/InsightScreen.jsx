import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import sound from '../utils/SoundEngine';

const DURATION = 5000; // ms

export default function InsightScreen({ onNavigate }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  const handleContinue = () => {
    if (loading) return;
    try { sound.playReward(); } catch (_) {}
    setLoading(true);
    setProgress(0);
    startRef.current = null;
  };

  useEffect(() => {
    if (!loading) return;

    const tick = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        onNavigate('passport');
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loading, onNavigate]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>

      {/* ── Full background image ── */}
      <img
        src="/assets/Insight.png"
        alt="Historical Insight"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          pointerEvents: 'none', userSelect: 'none',
        }}
        draggable={false}
      />

      {/* Soft bottom fade */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 30%)',
      }} />

      {/* ── CONTINUE button / loading bar ── */}
      <div style={{
        position: 'absolute',
        bottom: '13%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}>

        {/* Loading bar — replaces button after click */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            {/* Label */}
            <span style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              color: 'rgba(245,210,80,0.9)',
              textTransform: 'uppercase',
              textShadow: '0 1px 6px rgba(0,0,0,0.7)',
            }}>
              Entering Bharat Passport…
            </span>

            {/* Track */}
            <div style={{
              width: 260,
              height: 12,
              borderRadius: 999,
              background: 'rgba(20,10,2,0.75)',
              border: '1.5px solid rgba(210,160,40,0.55)',
              boxShadow: '0 0 10px rgba(0,0,0,0.6), inset 0 2px 4px rgba(0,0,0,0.5)',
              overflow: 'hidden',
              position: 'relative',
            }}>
              {/* Fill */}
              <div style={{
                height: '100%',
                width: `${progress}%`,
                borderRadius: 999,
                background: 'linear-gradient(90deg, #d49f2b 0%, #fce07a 50%, #d49f2b 100%)',
                boxShadow: '0 0 10px rgba(240,185,20,0.75)',
                transition: 'width 0.05s linear',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Shimmer sweep */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
                  animation: 'shimmerSweep 1s linear infinite',
                }} />
              </div>
            </div>


          </div>
        ) : (
          /* CONTINUE button */
          <button
            onClick={handleContinue}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: 'Cinzel, serif',
              fontWeight: 800,
              fontSize: '14px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '999px',
              padding: '13px 42px',
              background: 'linear-gradient(180deg, #fce07a 0%, #d49f2b 48%, #9e6d0a 100%)',
              color: '#2a1604',
              border: '2px solid rgba(255,238,120,0.75)',
              boxShadow: '0 6px 22px rgba(0,0,0,0.65), 0 0 22px rgba(240,185,20,0.5), inset 0 2px 3px rgba(255,255,255,0.6), inset 0 -2px 5px rgba(0,0,0,0.35)',
              transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.7), 0 0 30px rgba(250,190,25,0.7), inset 0 2px 4px rgba(255,255,255,0.7)';
              e.currentTarget.style.filter = 'brightness(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 6px 22px rgba(0,0,0,0.65), 0 0 22px rgba(240,185,20,0.5), inset 0 2px 3px rgba(255,255,255,0.6), inset 0 -2px 5px rgba(0,0,0,0.35)';
              e.currentTarget.style.filter = 'none';
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'translateY(1px) scale(0.97)'; }}
            onMouseUp={e => { e.currentTarget.style.transform = 'none'; }}
          >
            <span>CONTINUE</span>
            <ArrowRight style={{ width: 18, height: 18, color: '#2a1604' }} />
          </button>
        )}
      </div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmerSweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
