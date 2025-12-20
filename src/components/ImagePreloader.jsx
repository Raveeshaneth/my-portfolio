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

const ImagePreloader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const images = [
      androidIcon,
      figmaIcon,
      desktopIcon,
      hashtagIcon,
      logo,
      grid,
      illustrater,
      project1,
      project2,
      project3,
      project4,
      project5,
      project6,
      project7,
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
      setIsLoading(false);
      // Start fade out animation
      setTimeout(() => {
        setFadeOut(true);
      }, 300);
      // Complete loading after fade
      setTimeout(() => {
        onLoadComplete();
      }, 1000);
    });
  }, [onLoadComplete]);

  if (!isLoading && fadeOut) {
    return (
      <div 
        className="fixed inset-0 bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#eeeeee] flex items-center justify-center z-50 transition-opacity duration-700 opacity-0"
        style={{ pointerEvents: 'none' }}
      />
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#eeeeee] flex items-center justify-center z-50 transition-opacity duration-700"
      style={{ opacity: fadeOut ? 0 : 1 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-[#8d6e63]/10 to-[#6d4c41]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-[#a1887f]/10 to-[#8d6e63]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#6d4c41]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Sparkle effects */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#8d6e63] rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-[#6d4c41] rounded-full animate-ping" style={{ animationDelay: '0.7s' }} />
        <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-[#a1887f] rounded-full animate-ping" style={{ animationDelay: '1.4s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6">
        
        {/* Logo with animation */}
        <div className="mb-12 relative">
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8d6e63]/30 to-[#6d4c41]/20 rounded-full blur-2xl scale-150 animate-pulse" />
          
          {/* Logo container */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-[#3e2723] via-[#4e342e] to-[#5d4037] flex items-center justify-center shadow-2xl transform transition-all duration-700 hover:scale-105"
            style={{
              animation: 'float 3s ease-in-out infinite',
              boxShadow: '0 20px 60px rgba(62, 39, 35, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Inner glow */}
            <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-[#6d4c41]/20 to-transparent" />
            
            {/* Icon */}
            <div className="relative">
              <div className="text-5xl md:text-6xl animate-pulse" style={{ animationDuration: '2s' }}>
                ✨
              </div>
            </div>
          </div>

          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-gradient-to-br from-[#a1887f] to-[#8d6e63] rounded-full -translate-x-1/2" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-gradient-to-br from-[#6d4c41] to-[#4e342e] rounded-full -translate-x-1/2" />
          </div>
        </div>

        {/* Brand name */}
        <div className="mb-8 text-center">
          <h1 className="font-protest text-3xl md:text-4xl text-[#3e2723] mb-2 tracking-tight">
            Raveesha Nethmina
          </h1>
          <p className="font-rockSalt text-sm md:text-base text-[#6d4c41]/70">
            UI/UX Designer
          </p>
        </div>

        {/* Progress section */}
        <div className="w-80 md:w-96 mb-6">
          {/* Progress bar container */}
          <div className="relative h-2 bg-black/5 rounded-full overflow-hidden backdrop-blur-sm mb-4 shadow-inner">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" 
              style={{ 
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite'
              }} 
            />
            
            {/* Progress fill */}
            <div
              className="relative h-full bg-gradient-to-r from-[#6d4c41] via-[#8d6e63] to-[#a1887f] transition-all duration-300 ease-out rounded-full"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 2px 10px rgba(141, 110, 99, 0.4)'
              }}
            >
              {/* Animated glow on progress bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-slide" />
            </div>
          </div>

          {/* Progress info */}
          <div className="flex justify-between items-center px-1">
            <p className="text-black/40 text-xs font-medium tracking-wide">
              {progress < 30 ? 'Starting up...' : progress < 70 ? 'Loading assets...' : 'Almost ready...'}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#6d4c41] rounded-full animate-pulse" />
              <p className="text-[#3e2723] text-sm font-bold font-rockSalt">
                {Math.round(progress)}%
              </p>
            </div>
          </div>
        </div>

        {/* Loading animation - Three bouncing dots */}
        <div className="flex gap-2 items-center justify-center mt-8">
          <div 
            className="w-2.5 h-2.5 bg-gradient-to-b from-[#6d4c41] to-[#4e342e] rounded-full shadow-lg"
            style={{ 
              animation: 'bounce 1.4s infinite ease-in-out',
              animationDelay: '0s'
            }}
          />
          <div 
            className="w-2.5 h-2.5 bg-gradient-to-b from-[#8d6e63] to-[#6d4c41] rounded-full shadow-lg"
            style={{ 
              animation: 'bounce 1.4s infinite ease-in-out',
              animationDelay: '0.2s'
            }}
          />
          <div 
            className="w-2.5 h-2.5 bg-gradient-to-b from-[#a1887f] to-[#8d6e63] rounded-full shadow-lg"
            style={{ 
              animation: 'bounce 1.4s infinite ease-in-out',
              animationDelay: '0.4s'
            }}
          />
        </div>

        {/* Tagline */}
        <p className="text-black/30 text-xs tracking-[0.2em] uppercase font-medium mt-12 animate-pulse">
          Crafting Digital Experiences
        </p>
      </div>

      {/* Add required animations to the style tag */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default ImagePreloader;