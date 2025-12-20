import React, { useEffect, useState } from 'react';

// Import all images
import androidIcon from '../assets/android.png';
import figmaIcon from '../assets/figma.png';
import desktopIcon from '../assets/java.png';
import hashtagIcon from '../assets/hashtag.png';
import logo from '../assets/logo.png';
import grid from '../assets/grid.png';
import illustrater from '../assets/illustrater.webp';

import project1 from '../assets/project1.webp';
import project2 from '../assets/project2.webp';
import project3 from '../assets/project3.webp';
import project4 from '../assets/project4.webp';
import project5 from '../assets/project5.webp';
import project6 from '../assets/project6.webp';
import project7 from '../assets/project7.webp';

const ImagePreloaderMinimal = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const images = [
      androidIcon, figmaIcon, desktopIcon, hashtagIcon, logo, grid, illustrater,
      project1, project2, project3, project4, project5, project6, project7,
    ];

    let loadedCount = 0;
    const totalImages = images.length;

    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setProgress((loadedCount / totalImages) * 100);
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setProgress((loadedCount / totalImages) * 100);
          resolve();
        };
        img.src = src;
      });
    };

    Promise.all(images.map(loadImage)).then(() => {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setIsLoading(false);
          onLoadComplete();
        }, 600);
      }, 200);
    });
  }, [onLoadComplete]);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 bg-white flex flex-col items-center justify-center z-50 transition-all duration-600 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid background */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#8d6e63]/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#a1887f]/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Animated logo container */}
        <div className="relative mb-16">
          {/* Outer rotating circle */}
          <div className="absolute inset-0 -m-10">
            <svg className="w-44 h-44 animate-spin" style={{ animationDuration: '8s' }} viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="url(#gradient)" 
                strokeWidth="0.5"
                strokeDasharray="10 5"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a1887f" />
                  <stop offset="100%" stopColor="#6d4c41" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Center logo */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Logo background circle with pulse */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3e2723] to-[#6d4c41] rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#3e2723]/50 to-transparent rounded-full animate-pulse" />
            
            {/* Logo icon */}
            <div className="relative z-10">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 010 2H6v2a1 1 0 01-2 0V5zM20 5a1 1 0 00-1-1h-4a1 1 0 100 2h2v2a1 1 0 102 0V5zM4 19a1 1 0 001 1h4a1 1 0 100-2H6v-2a1 1 0 10-2 0v3zM20 19a1 1 0 01-1 1h-4a1 1 0 110-2h2v-2a1 1 0 112 0v3z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Name and title */}
        <div className="text-center mb-12">
          <h1 className="font-protest text-4xl md:text-5xl text-[#3e2723] mb-2 tracking-tight">
            Raveesha
          </h1>
          <p className="font-rockSalt text-sm text-black/40 tracking-wide">
            Crafting Experiences
          </p>
        </div>

        {/* Progress bar container */}
        <div className="w-72 md:w-96">
          {/* Progress bar */}
          <div className="relative h-1 bg-black/5 rounded-full overflow-hidden mb-3">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent animate-shimmer" />
            
            {/* Progress fill */}
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8d6e63] to-[#6d4c41] transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress text */}
          <div className="flex items-center justify-center gap-3">
            {/* Animated dots */}
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-[#8d6e63] rounded-full animate-bounce" style={{ animationDuration: '1s', animationDelay: '0s' }} />
              <div className="w-1 h-1 bg-[#8d6e63] rounded-full animate-bounce" style={{ animationDuration: '1s', animationDelay: '0.15s' }} />
              <div className="w-1 h-1 bg-[#8d6e63] rounded-full animate-bounce" style={{ animationDuration: '1s', animationDelay: '0.3s' }} />
            </div>
            
            <p className="text-black/30 text-xs tracking-wider uppercase font-medium">
              {progress < 40 ? 'Loading' : progress < 80 ? 'Processing' : 'Ready'}
            </p>
            
            <span className="text-black/50 text-xs font-semibold tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <p className="text-black/20 text-xs tracking-[0.3em] uppercase">
          Portfolio Loading
        </p>
      </div>
    </div>
  );
};

export default ImagePreloaderMinimal;