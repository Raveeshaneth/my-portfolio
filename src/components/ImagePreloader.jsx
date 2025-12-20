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
    <div className="fixed inset-0 bg-gradient-to-br from-[#3e2723] to-[#1a0e0a] flex flex-col items-center justify-center z-50 transition-opacity duration-500" style={{ opacity: isLoading ? 1 : 0 }}>
      {/* Logo */}
      <div className="mb-12">
        <h1 className="font-protest text-4xl md:text-5xl text-white tracking-tight">
          <span className="text-[#a1887f]">Loading</span>
        </h1>
      </div>

      {/* Progress Bar */}
      <div className="w-64 md:w-80 mb-8">
        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#8d6e63] to-[#a1887f] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Progress Text */}
      <p className="text-white/70 text-sm font-rockSalt">
        {Math.round(progress)}%
      </p>

      {/* Loading dots animation */}
      <div className="mt-12 flex gap-2">
        <div className="w-2 h-2 bg-[#a1887f] rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-[#a1887f] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 bg-[#a1887f] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
};

export default ImagePreloader;
