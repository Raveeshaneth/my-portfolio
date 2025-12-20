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
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setIsLoading(false);
          onLoadComplete();
        }, 500);
      }, 200);
    });
  }, [onLoadComplete]);

  if (!isLoading) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 bg-[#2b3945] flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Loading container */}
      <div className="flex flex-col items-center justify-center">
        
        {/* Square icon with bouncing ball */}
        <div className="relative mb-12">
          {/* Square container */}
          <div className="relative w-24 h-24 bg-[#4a5660] rounded-xl flex items-center justify-center border-4 border-[#5a6670]">
            <div className="w-20 h-20 bg-[#2b3945] rounded-lg" />
          </div>

          {/* Bouncing ball */}
          <div 
            className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 w-5 h-5 bg-[#7cb342] rounded-full"
            style={{
              animation: 'bounceBall 1s ease-in-out infinite'
            }}
          />
        </div>

        {/* Loading text */}
        <h2 className="text-white text-4xl font-light tracking-wide">
          Loading
        </h2>

        {/* Optional: Progress indicator (you can remove this if you want it exactly like the GIF) */}
        {/* <div className="mt-8 text-white/50 text-sm">
          {Math.round(progress)}%
        </div> */}
      </div>
    </div>
  );
};

export default ImagePreloader;