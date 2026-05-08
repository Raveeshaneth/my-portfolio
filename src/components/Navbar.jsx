import { useState, useEffect, useCallback, useRef } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [visible, setVisible]   = useState(true);
  const lastY    = useRef(0);
  const isMobile = useRef(typeof window !== "undefined" && window.innerWidth < 1024);

  const scrollToSection = useCallback((sectionId) => {
    if (isMobile.current) {
      // Mobile: scroll directly to DOM element
      const el = document.getElementById(sectionId) || document.querySelector(`#${sectionId}`);
      if (sectionId === "contact") {
        const footer = document.querySelector("footer");
        if (footer) footer.scrollIntoView({ behavior: "smooth" });
      } else if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Desktop: panel-based, scroll by viewport heights
      const vh = window.innerHeight;
      const targets = { about: vh, projects: vh * 2, contact: null };
      if (sectionId === "contact") {
        const footer = document.querySelector("footer");
        if (footer) window.scrollTo({ top: footer.offsetTop, behavior: "smooth" });
      } else {
        window.scrollTo({ top: targets[sectionId] ?? 0, behavior: "smooth" });
      }
    }

    if (sectionId === "contact") {
      setTimeout(() => {
        const btn = document.getElementById("get-in-touch-btn");
        if (btn) {
          btn.classList.add("highlight-pulse");
          setTimeout(() => btn.classList.remove("highlight-pulse"), 3000);
        }
      }, 600);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      if (isMobile.current) {
        // Mobile: hide on scroll-down, show on scroll-up (standard pattern)
        if (y < 10) {
          setVisible(true);
        } else if (y > lastY.current + 4) {
          setVisible(false);   // scrolling down
        } else if (y < lastY.current - 4) {
          setVisible(true);    // scrolling up
        }
      } else {
        // Desktop: hide after hero (original behaviour)
        setVisible(y < 50);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        ${visible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

      {/* Nav links */}
      <div className="flex gap-6 md:gap-8">
        <button onClick={() => scrollToSection("about")}    className={linkClass}>About</button>
        <button onClick={() => scrollToSection("projects")} className={linkClass}>Projects</button>
        <button onClick={() => scrollToSection("contact")}  className={linkClass}>Contact</button>
      </div>
    </nav>
  );
}