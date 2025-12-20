import { useState, useEffect, useCallback } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);

  const scrollToSection = useCallback((sectionId) => {
    const viewportHeight = window.innerHeight;
    
    let scrollTarget = 0;
    if (sectionId === 'about') {
      scrollTarget = viewportHeight;
    } else if (sectionId === 'projects') {
      scrollTarget = viewportHeight * 2;
    } else if (sectionId === 'contact') {
      const footerElement = document.querySelector('footer');
      if (footerElement) {
        scrollTarget = footerElement.offsetTop;
      }
    }
    
    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth'
    });

    // Highlight the Get in touch button if scrolling to contact
    if (sectionId === 'contact') {
      setTimeout(() => {
        const button = document.getElementById('get-in-touch-btn');
        if (button) {
          button.classList.add('highlight-pulse');
          setTimeout(() => button.classList.remove('highlight-pulse'), 3000);
        }
      }, 600);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const linkClass =
    "font-rockSalt text-[15px] transition-all duration-300 ease-out cursor-pointer " +
    "hover:text-[16px] hover:[-webkit-text-stroke:0.1px_black] " +
    "hover:[text-shadow:0px_6px_3px_rgba(0,0,0,0.25)] " +
    "active:scale-95 touch-none select-none";

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
        onClick={handleLogoClick}
        className="cursor-pointer will-change-transform"
        aria-label="Back to top"
      >
        <img 
          src={logo} 
          alt="logo" 
          className="w-10 h-10 object-contain" 
          loading="eager"
          decoding="async"
        />
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
        <button 
          onClick={() => scrollToSection('contact')}
          className={linkClass}
        >
          Contact
        </button>
      </div>
    </nav>
  );
}