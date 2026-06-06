import React, { useEffect, useState, useRef } from 'react';

import androidIcon from '../assets/android.png';
import figmaIcon from '../assets/figma.png';
import desktopIcon from '../assets/java.png';
import hashtagIcon from '../assets/hashtag.png';
import logo from '../assets/logo.png';
import illustrater from '../assets/illustrater.webp';

/**
 * Only preloads the assets needed for the INITIAL PAINT:
 *  – logo, illustrater, 4 icons  (6 images total, ~1.1 MB)
 *
 * Project images (8 × ~600 KB avg = ~5 MB) are NOT preloaded here.
 * They lazy-load via IntersectionObserver in ProjectsMobile / Projects.
 *
 * This cuts mobile load time by ~75 %.
 */
const PRELOAD_ASSETS = [
  logo, illustrater,
  androidIcon, figmaIcon, desktopIcon, hashtagIcon,
];

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const ImagePreloader = ({ onLoadComplete }) => {
  const [progress, setProgress]   = useState(0);
  const [display, setDisplay]     = useState(true);
  const [exit, setExit]           = useState(false);

  const countRef   = useRef(0);
  const targetRef  = useRef(0);
  const rafRef     = useRef(null);
  const numTextRef = useRef(null);
  const numBgRef   = useRef(null);
  const displayRef = useRef(true);

  // Animated counter
  useEffect(() => {
    const tick = () => {
      if (!displayRef.current) return;

      const diff = targetRef.current - countRef.current;
      countRef.current += Math.max(diff * 0.08, diff > 0 ? 0.5 : 0);
      if (countRef.current > 100) countRef.current = 100;

      const val = Math.floor(countRef.current);
      if (numTextRef.current) numTextRef.current.textContent = val;
      if (numBgRef.current)   numBgRef.current.textContent   = val;

      if (countRef.current >= 100 && targetRef.current >= 100) {
        setTimeout(() => {
          setExit(true);
          setTimeout(() => {
            setDisplay(false);
            displayRef.current = false;
            onLoadComplete();
          }, 600);
        }, 200);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onLoadComplete]);

  // Image loader — only the 6 critical assets
  useEffect(() => {
    let loaded = 0;
    const total = PRELOAD_ASSETS.length;

    PRELOAD_ASSETS.forEach((src) => {
      const img  = new Image();
      const done = () => {
        loaded++;
        targetRef.current = (loaded / total) * 100;
        setProgress((loaded / total) * 100);
      };
      img.onload  = done;
      img.onerror = done;
      img.src     = src;
    });
  }, []);

  if (!display) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#080808',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#fff',
        transform:  exit ? 'translateY(-100vh)' : 'translateY(0)',
        transition: exit ? 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
        borderBottomLeftRadius:  exit ? '10%' : '0%',
        borderBottomRightRadius: exit ? '10%' : '0%',
      }}
    >
      {/* Huge background number watermark */}
      <div style={{
        position: 'absolute',
        bottom: '-5vh', right: '-2vw',
        fontFamily: "'Bebas Neue', Impact, sans-serif",
        fontSize: 'min(50vw, 80vh)',
        lineHeight: 0.8,
        color: 'rgba(255,255,255,0.06)',
        pointerEvents: 'none', userSelect: 'none',
        zIndex: 0,
        opacity: exit ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}>
        <span ref={numBgRef}>0</span>
      </div>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw', height: '80vw',
        maxWidth: '800px', maxHeight: '800px',
        background: 'radial-gradient(circle, rgba(141,110,99,0.12) 0%, rgba(0,0,0,0) 60%)',
        filter: 'blur(60px)',
        animation: 'pulseGlow 4s ease-in-out infinite alternate',
        opacity: exit ? 0 : 1,
        transition: 'opacity 0.5s ease',
        zIndex: 0,
      }} />

      {/* Grid — desktop only, skip on mobile to avoid visual noise */}
      {!isMobile && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: exit ? 0 : 0.6,
          transition: 'opacity 0.5s ease',
          zIndex: 0,
        }} />
      )}

      {/* Brand & Loading Info */}
      <div style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '2.5rem',
        opacity: exit ? 0 : 1,
        transform: exit ? 'translateY(-40px)' : 'translateY(0)',
        transition: 'all 0.6s cubic-bezier(0.76, 0, 0.24, 1)',
        width: '100%', zIndex: 10,
      }}>
        {/* Animated rings */}
        <div style={{ position: 'relative', width: '100px', height: '100px' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }} />
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: '#fff', borderRightColor: '#fff',
            animation: 'spin 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
          }} />
          <div style={{
            position: 'absolute', inset: 10, borderRadius: '50%',
            border: '1px solid transparent',
            borderBottomColor: 'rgba(255,255,255,0.5)',
            borderLeftColor: 'rgba(255,255,255,0.5)',
            animation: 'spin 3s linear infinite reverse',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: '2rem', letterSpacing: '2px', color: '#fff',
          }}>RN</div>
        </div>

        {/* Text */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            fontWeight: '500', letterSpacing: '0.4em',
            textTransform: 'uppercase', margin: '0 0 0.75rem 0',
            fontFamily: 'Inter, system-ui, sans-serif',
            background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.6))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Raveesha Nethmina
          </h1>
          <p style={{
            fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.3em', textTransform: 'uppercase',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>
            Creative Designer
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        bottom: '12%', left: '50%',
        transform: 'translateX(-50%)',
        width: '70%', maxWidth: '400px',
        display: 'flex', flexDirection: 'column', gap: '1rem',
        opacity: exit ? 0 : 1,
        transition: 'opacity 0.4s ease 0.1s',
        zIndex: 10,
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.15em', textTransform: 'uppercase',
        }}>
          <span>Initializing Experience</span>
          <span style={{ fontWeight: 600, color: '#fff' }}>
            <span ref={numTextRef}>0</span>%
          </span>
        </div>

        {/* Track */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'visible' }}>
          {/* Fill */}
          <div style={{
            position: 'absolute', top: -1, left: 0, bottom: -1,
            width: `${progress}%`,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, #fff 100%)',
            transition: 'width 0.4s ease-out',
            boxShadow: '0 0 15px rgba(255,255,255,0.4)',
          }}>
            <div style={{
              position: 'absolute', right: 0, top: '50%',
              transform: 'translateY(-50%)',
              width: '4px', height: '4px',
              background: '#fff', borderRadius: '50%',
              boxShadow: '0 0 10px 2px #fff',
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ImagePreloader;