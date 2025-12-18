import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only show navbar when at the very top (within 50px)
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const viewportHeight = window.innerHeight;
    
    let scrollTarget = 0;
    if (sectionId === 'about') {
      scrollTarget = viewportHeight;
    } else if (sectionId === 'projects') {
      scrollTarget = viewportHeight * 2;
    }
    
    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth'
    });
  };

  const linkClass =
    "font-rockSalt text-[15px] transition-all duration-300 ease-out cursor-pointer " +
    "hover:text-[16px] hover:[-webkit-text-stroke:0.1px_black] " +
    "hover:[text-shadow:0px_6px_3px_rgba(0,0,0,0.25)] " +
    "active:scale-95 touch-none select-none";

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        h-[60px]
        bg-white/60 backdrop-blur-xl
        border-b border-black/5
        flex items-center justify-between
        px-6 md:px-12
        transition-transform duration-300 ease-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      {/* Left: Logo */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="cursor-pointer"
      >
        <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
      </button>

      {/* Right: menu links */}
      <div className="flex gap-6 md:gap-8">
        <button 
          onClick={() => scrollToSection('about')}
          className={linkClass}
        >
          About
        </button>
        <button 
          onClick={() => scrollToSection('projects')}
          className={linkClass}
        >
          Projects
        </button>
      </div>
    </nav>
  );
}