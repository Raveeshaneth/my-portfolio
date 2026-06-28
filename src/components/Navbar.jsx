import { useState, useEffect, useCallback, useRef } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [visible, setVisible]       = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const lastY    = useRef(0);
  const isMobile = useRef(typeof window !== "undefined" && window.innerWidth < 1024);

  const scrollToSection = useCallback((sectionId) => {
    const currentIsMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    
    if (currentIsMobile) {
      const el = document.getElementById(sectionId) || document.querySelector(`#${sectionId}`);
      if (sectionId === "contact") {
        const footer = document.querySelector("footer");
        if (footer) footer.scrollIntoView({ behavior: "smooth" });
      } else if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      const vh = window.innerHeight;
      // Offsets matching panelScroll.js: About=1vh, Experience=3vh, Projects=4vh, Gallery=10vh
      const targets = { about: vh, experience: vh * 3, projects: vh * 4, gallery: vh * 10, contact: null };
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
      const vh = window.innerHeight;

      if (isMobile.current) {
        // Mobile: hide on scroll-down, show on scroll-up
        if (y < 10) {
          setVisible(true);
        } else if (y > lastY.current + 4) {
          setVisible(false);
        } else if (y < lastY.current - 4) {
          setVisible(true);
        }

        // Detect active section on mobile
        const sections = ["gallery", "projects", "experience", "about", "hero"];
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= vh * 0.4) {
            setActiveSection(id);
            break;
          }
        }

        // Check footer
        const footer = document.querySelector("footer");
        if (footer && footer.getBoundingClientRect().top <= vh * 0.5) {
          setActiveSection("contact");
        }
      } else {
        // Desktop: hide after hero
        setVisible(y < 50);

        // Detect active section based on scroll progress
        if (y < vh * 0.5) {
          setActiveSection("hero");
        } else if (y < vh * 2.5) {
          setActiveSection("about");
        } else if (y < vh * 3.5) {
          setActiveSection("experience");
        } else if (y < vh * 9) {
          setActiveSection("projects");
        } else if (y < vh * 10) {
          setActiveSection("gallery");
        } else {
          setActiveSection("contact");
        }
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "gallery", label: "Shots" },
    { id: "contact", label: "Contact" },
  ];

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
          alt="Raveesha Nethmina logo"
          className="w-10 h-10 object-contain"
          loading="eager"
          decoding="async"
        />
      </button>

      {/* Nav links with active indicator */}
      <div className="flex gap-6 md:gap-8">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                relative font-rockSalt text-[13px] md:text-[14px] transition-all duration-300 ease-out cursor-pointer
                active:scale-95 touch-none select-none
                ${isActive
                  ? "text-[#3e2723] [-webkit-text-stroke:0.3px_#3e2723]"
                  : "text-black/70 hover:text-black hover:[-webkit-text-stroke:0.1px_black] hover:[text-shadow:0px_6px_3px_rgba(0,0,0,0.25)]"
                }
              `}
            >
              {item.label}
              {/* Active indicator dot */}
              <span
                className={`
                  absolute -bottom-1 left-1/2 -translate-x-1/2
                  w-1 h-1 rounded-full bg-[#6d4c41]
                  transition-all duration-300 ease-out
                  ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                `}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}