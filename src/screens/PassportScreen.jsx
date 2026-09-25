import React, { useRef } from 'react';
import { RotateCcw, Compass } from 'lucide-react';
import sound from '../utils/SoundEngine';



/* ─── Styles ─── */
const STYLES = `
  @keyframes barShimmer {
    0%, 100% { opacity: 0.8; }
    50%       { opacity: 1;   }
  }

  /* ── Replay button ── */
  .cta-replay {
    display: inline-flex; align-items: center; justify-content: center; gap: 5px;
    font-family: 'Cinzel', serif; font-weight: 800; font-size: 9.5px;
    letter-spacing: 0.9px; text-transform: uppercase; cursor: pointer;
    border-radius: 999px; padding: 7px 14px; white-space: nowrap;
    background: linear-gradient(160deg, #d9734a 0%, #bf5226 50%, #8a3112 100%);
    color: #fff8f2;
    border: 1.5px solid rgba(255,150,90,0.55);
    box-shadow:
      0 3px 12px rgba(0,0,0,0.55),
      0 0 8px rgba(195,70,25,0.3),
      inset 0 1px 2px rgba(255,255,255,0.28),
      inset 0 -1px 3px rgba(0,0,0,0.4);
    transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
  }
  .cta-replay:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 5px 16px rgba(0,0,0,0.6), 0 0 14px rgba(210,80,30,0.5),
                inset 0 2px 3px rgba(255,255,255,0.35);
    filter: brightness(1.1);
  }
  .cta-replay:active { transform: translateY(1px) scale(0.97); }

  /* ── Map button ── */
  .cta-map {
    display: inline-flex; align-items: center; justify-content: center; gap: 5px;
    font-family: 'Cinzel', serif; font-weight: 800; font-size: 9.5px;
    letter-spacing: 0.9px; text-transform: uppercase; cursor: pointer;
    border-radius: 999px; padding: 7px 14px; white-space: nowrap;
    background: linear-gradient(160deg, #f8d96e 0%, #cd9828 50%, #9a680a 100%);
    color: #2a1604;
    border: 1.5px solid rgba(255,232,110,0.65);
    box-shadow:
      0 3px 12px rgba(0,0,0,0.55),
      0 0 10px rgba(230,175,15,0.35),
      inset 0 1px 2px rgba(255,255,255,0.5),
      inset 0 -1px 3px rgba(0,0,0,0.28);
    transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
  }
  .cta-map:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 5px 16px rgba(0,0,0,0.6), 0 0 18px rgba(240,182,20,0.6),
                inset 0 2px 3px rgba(255,255,255,0.65);
    filter: brightness(1.08);
  }
  .cta-map:active { transform: translateY(1px) scale(0.97); }
`;

export default function PassportScreen({ onNavigate, xp = 200, heritageXp = 100, tokens = 50 }) {
  const containerRef = useRef(null);
  const nav = (screen) => () => { try { sound.playClick?.(); } catch (_) {} onNavigate(screen); };

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      <style>{STYLES}</style>

      {/* ── Background image ── */}
      <img
        src="/assets/Passport.png"
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          pointerEvents: 'none', userSelect: 'none',
        }}
        draggable={false}
      />

      {/* Soft edge vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.28) 100%)',
      }} />

      {/* ════════════════════════════════
           OVERLAY
         ════════════════════════════════ */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>

        {/* ── BOTTOM-LEFT CONTROLS ── */}
        <div style={{
          position: 'absolute',
          bottom: '8%',
          left: '2%',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          /* max-width keeps panels compact — never stretching wide */
          maxWidth: 220,
          width: '18%',
          minWidth: 170,
        }}>

          {/* Route strip */}
          <div style={{
            background: 'rgba(8,4,1,0.72)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(205,155,45,0.42)',
            borderRadius: 8,
            padding: '6px 10px',
            boxShadow: '0 3px 12px rgba(0,0,0,0.5)',
          }}>
            <div style={{
              fontFamily: 'Cinzel, serif', fontSize: '7.5px', fontWeight: 700,
              color: 'rgba(210,168,52,0.88)', textTransform: 'uppercase',
              letterSpacing: '0.16em', marginBottom: 4,
            }}>
              Route: Sindhu ➔ Ganga ➔ Deccan
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
              <span style={{
                background: 'linear-gradient(135deg, #064e3b, #059669)',
                color: '#a7f3d0', padding: '2px 7px', borderRadius: 4,
                fontFamily: 'Cinzel, serif', fontSize: '7.5px', fontWeight: 700,
                border: '1px solid rgba(52,211,153,0.3)',
              }}>
                ✓ Indus: Done
              </span>
              <span style={{
                background: 'rgba(40,28,12,0.88)', color: 'rgba(205,182,125,0.85)',
                padding: '2px 7px', borderRadius: 4,
                fontFamily: 'Cinzel, serif', fontSize: '7.5px', fontWeight: 600,
                border: '1px solid rgba(155,115,42,0.28)',
              }}>
                Mauryan: Next
              </span>
            </div>
          </div>

          {/* Explorer row */}
          <div style={{
            background: 'rgba(8,4,1,0.65)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(182,132,38,0.36)',
            borderRadius: 8,
            padding: '6px 10px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: '0 3px 12px rgba(0,0,0,0.45)',
            gap: 8,
          }}>
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontFamily: 'Philosopher, sans-serif', fontSize: '8px',
                color: 'rgba(200,155,48,0.8)', fontWeight: 700, marginBottom: 1,
              }}>
                Explorer
              </div>
              <div style={{
                fontFamily: 'Philosopher, sans-serif', fontSize: '10.5px',
                color: '#f0deb4', fontStyle: 'italic', fontWeight: 700,
                textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                Raj — Time Voyager
              </div>
            </div>
            {/* SEALED stamp */}
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              border: '1.5px dashed rgba(182,42,32,0.8)',
              background: 'rgba(18,5,2,0.52)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: 'rotate(14deg)',
            }}>
              <span style={{
                fontFamily: 'Cinzel, serif', fontSize: '6.5px', fontWeight: 900,
                color: 'rgba(200,52,42,0.9)', textAlign: 'center', lineHeight: 1.15,
                letterSpacing: '0.03em',
              }}>SEALED</span>
            </div>
          </div>

          {/* CTA buttons — side by side, compact */}
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="cta-replay" onClick={nav('world_explore')} style={{ flex: 1 }}>
              <RotateCcw style={{ width: 11, height: 11 }} />
              Replay
            </button>
            <button className="cta-map" onClick={nav('bharat_map')} style={{ flex: 1 }}>
              <Compass style={{ width: 11, height: 11 }} />
              Map
            </button>
          </div>

        </div>

        {/* ── BOTTOM PROGRESS BAR ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'rgba(5,2,1,0.88)',
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid rgba(182,132,36,0.48)',
          padding: '5px 22px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontFamily: 'Cinzel, serif', fontSize: '10.5px', fontWeight: 700,
              color: '#e0c168', letterSpacing: '0.09em',
            }}>
              TOTAL PROGRESS: 12%
            </span>
            <div style={{
              width: 120, height: 7, borderRadius: 999,
              background: 'rgba(28,16,3,0.92)',
              border: '1px solid rgba(182,132,36,0.48)',
              overflow: 'hidden',
            }}>
              <div style={{
                width: '12%', height: '100%',
                background: 'linear-gradient(90deg, #fbbf24, #34d399)',
                borderRadius: 999,
                boxShadow: '0 0 8px rgba(248,183,22,0.65)',
                animation: 'barShimmer 2.4s ease-in-out infinite',
              }} />
            </div>
          </div>
          <div style={{ width: 1, height: 16, background: 'rgba(182,132,36,0.42)', flexShrink: 0 }} />
          <span style={{
            fontFamily: 'Cinzel, serif', fontSize: '10.5px', fontWeight: 700,
            color: 'rgba(218,188,100,0.76)', letterSpacing: '0.07em',
          }}>
            28 CHALLENGES REMAINING ACROSS BHARAT
          </span>
        </div>

      </div>
    </div>
  );
}
