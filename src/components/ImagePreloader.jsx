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
      setTimeout(() => {
        onLoadComplete();
      }, 500);
    });
  }, [onLoadComplete]);

  if (!isLoading && progress === 100) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#2a1810] via-[#3e2723] to-[#1a0e0a] flex flex-col items-center justify-center z-50 transition-all duration-700" style={{ opacity: isLoading ? 1 : 0, pointerEvents: isLoading ? 'auto' : 'none' }}>
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#6d4c41]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#8d6e63]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8d6e63] to-[#6d4c41] flex items-center justify-center shadow-2xl">
            <span className="text-3xl">✨</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="font-protest text-4xl md:text-5xl text-white tracking-tight mb-2 text-center">
          Raveesha
        </h1>
        <p className="text-white/60 font-rockSalt text-sm md:text-base mb-12 text-center">
          UI/UX Designer & Frontend Developer
        </p>

        {/* Progress Bar Container */}
        <div className="w-72 md:w-96 mb-8">
          {/* Background bar */}
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20 mb-4">
            {/* Progress fill */}
            <div
              className="h-full bg-gradient-to-r from-[#a1887f] via-[#8d6e63] to-[#6d4c41] transition-all duration-300 ease-out rounded-full shadow-lg"
              style={{ width: `${progress}%`, boxShadow: `0 0 20px rgba(141, 110, 99, 0.5)` }}
            />
          </div>

          {/* Progress text */}
          <div className="flex justify-between items-center px-2">
            <p className="text-white/50 text-xs font-rockSalt">Loading assets</p>
            <p className="text-white/70 text-sm font-semibold font-rockSalt">
              {Math.round(progress)}%
            </p>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex gap-3 justify-center mt-12">
          <div className="w-3 h-3 bg-gradient-to-b from-[#a1887f] to-[#8d6e63] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-3 h-3 bg-gradient-to-b from-[#8d6e63] to-[#6d4c41] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 bg-gradient-to-b from-[#6d4c41] to-[#4e342e] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Status text */}
        <p className="text-white/40 text-xs font-rockSalt mt-8 tracking-wider">
          {progress < 30 ? 'Initializing...' : progress < 70 ? 'Loading media...' : 'Finalizing...'}
        </p>
      </div>
    </div>
  );
};

export default ImagePreloader;
