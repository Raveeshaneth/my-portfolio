import { useEffect, useState, useMemo, useCallback } from "react";

import androidIcon from "../assets/android.png";
import figmaIcon from "../assets/figma.png";
import desktopIcon from "../assets/java.png";
import hashtagIcon from "../assets/hashtag.png";

import project1 from "../assets/project1.webp";
import project2 from "../assets/project2.webp";
import project3 from "../assets/project3.webp";
import project4 from "../assets/project4.webp";
import project5 from "../assets/project5.webp";
import project6 from "../assets/project6.webp";
import project7 from "../assets/project7.webp";
import project8 from "../assets/project8.webp";

const PROJECTS = [
  {
    id: 0,
    icon: figmaIcon,
    image: project8,
    title: "event.io",
    subtitle: "Event Dashboard",
    category: "Web Application",
    year: "2026",
    tags: ["UI/UX", "Dashboard", "SaaS", "Figma"],
    description:
      "A modern event management dashboard that helps planners track event performance, manage bookings, and analyze attendee insights through a clean, data-driven interface.",
    color: "#7C5CFF",
    figmaUrl: "https://www.figma.com/placeholder/event-io",
    isFigma: true,
  },
  {
    id: 1,
    icon: figmaIcon,
    image: project7,
    title: "AccessHive",
    subtitle: "Mixed Reality",
    category: "Accessibility System",
    year: "2024",
    tags: ["AI", "Accessibility", "XR"],
    description:
      "2050 mixed-reality accessibility system helping blind and low-vision users navigate safely with AI scene understanding, spatial audio, haptic feedback, and real-time volunteer assistance.",
    color: "#63a2a9",
    figmaUrl: "https://www.figma.com/placeholder/accesshive",
    isFigma: true,
  },
  {
    id: 2,
    icon: figmaIcon,
    image: project3,
    title: "UrbanFood",
    subtitle: "E-Commerce",
    category: "Web Application",
    year: "2023",
    tags: ["E-commerce", "UX"],
    description:
      "Fresh food delivery platform with intuitive product browsing and seamless checkout experience.",
    color: "#2bac48",
    figmaUrl: "https://www.figma.com/placeholder/urbanfood",
    isFigma: true,
  },
  {
    id: 3,
    icon: figmaIcon,
    image: project2,
    title: "Mentora AI",
    subtitle: "Web Platform",
    category: "Web Application",
    year: "2024",
    tags: ["Web", "AI/ML"],
    description:
      "AI-powered educational platform with personalized learning paths and intelligent progress tracking.",
    color: "#a855f7",
    figmaUrl: "https://www.figma.com/placeholder/mentora-ai",
    isFigma: true,
  },
  {
    id: 4,
    icon: androidIcon,
    image: project1,
    title: "Tuition Management",
    subtitle: "Mobile App",
    category: "Mobile Application",
    year: "2024",
    tags: ["Android", "UI/UX"],
    description:
      "Complete mobile solution for managing tuition classes with attendance tracking and payment processing.",
    color: "#8670f7",
    isFigma: false,
  },
  {
    id: 5,
    icon: hashtagIcon,
    image: project4,
    title: "Hospital System",
    subtitle: "Healthcare",
    category: "Desktop Application",
    year: "2023",
    tags: ["Healthcare", "Desktop"],
    description:
      "Comprehensive hospital management system for patient records, appointments, and medical workflows.",
    color: "#00BCD4",
    isFigma: false,
  },
  {
    id: 6,
    icon: desktopIcon,
    image: project5,
    title: "Medicare",
    subtitle: "Appointment",
    category: "Desktop Application",
    year: "2023",
    tags: ["Healthcare", "System"],
    description:
      "Streamlined appointment scheduling system with automated reminders and calendar management.",
    color: "#e46e00",
    isFigma: false,
  },
  {
    id: 7,
    icon: hashtagIcon,
    image: project6,
    title: "Distribution Management",
    subtitle: "Management",
    category: "Desktop Application",
    year: "2022",
    tags: ["Business", "Analytics"],
    description:
      "End-to-end distribution management with inventory tracking and sales analytics dashboard.",
    color: "#9972df",
    isFigma: false,
  },
];

const ProjectCard = ({ project, isActive, index, activeIndex, isTransitioning, onProjectChange }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    if (!isTransitioning && index !== activeIndex) onProjectChange(index);
  }, [index, activeIndex, isTransitioning, onProjectChange]);

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer transition-all duration-300 ease-out"
      style={{
        // Each card takes equal share of strip width
        flex: "1 1 0",
        minWidth: 0,
        transform: isActive ? "translateY(-10px)" : "translateY(0px)",
      }}
    >
      <div
        className="relative rounded-xl overflow-hidden transition-all duration-300"
        style={{
          aspectRatio: "3/4",
          opacity: isActive ? 1 : isHovered ? 0.85 : 0.42,
          filter: isActive
            ? "none"
            : isHovered
            ? "grayscale(0%) brightness(1.3)"
            : "grayscale(50%) brightness(0.65)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />

        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={project.icon}
            alt={project.title}
            className="w-[30%] h-[30%] object-contain invert transition-all duration-300"
            style={{ opacity: isActive ? 0.9 : isHovered ? 0.7 : 0.35 }}
            loading="eager"
            decoding="async"
          />
        </div>

        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, ${project.color}CC 0%, ${project.color}44 50%, transparent 80%)`,
            opacity: isActive ? 1 : isHovered ? 0.85 : 0.5,
          }}
        />

        {isActive && (
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ backgroundColor: project.color }}
          />
        )}

        <div className="absolute bottom-0 left-0 right-0 p-1.5">
          <p
            className="font-bold text-white leading-tight truncate"
            style={{ fontSize: "clamp(8px, 1.1vw, 11px)" }}
          >
            {project.title}
          </p>
          <p
            className="text-white/60 mt-0.5 truncate"
            style={{ fontSize: "clamp(7px, 0.9vw, 9px)" }}
          >
            {project.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeProject = useMemo(() => PROJECTS[activeIndex], [activeIndex]);

  const handleProjectChange = useCallback((e) => {
    if (isTransitioning) return;
    const newIndex = e.detail.index;
    if (newIndex !== activeIndex) {
      setIsTransitioning(true);
      setActiveIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 400);
    }
  }, [activeIndex, isTransitioning]);

  const handleCardClick = useCallback((index) => {
    if (!isTransitioning && index !== activeIndex) {
      setIsTransitioning(true);
      setActiveIndex(index);
      window.dispatchEvent(new CustomEvent("projectIndexChange", { detail: { index } }));
      setTimeout(() => setIsTransitioning(false), 400);
    }
  }, [activeIndex, isTransitioning]);

  useEffect(() => {
    window.addEventListener("projectIndexChange", handleProjectChange);
    return () => window.removeEventListener("projectIndexChange", handleProjectChange);
  }, [handleProjectChange]);

  return (
    <section
      id="projects"
      className="relative w-full h-full bg-black"
      // No overflow:hidden — background clips itself so lifted cards are never cut
    >
      {/* ── Background (self-clipped) ── */}
      <div className="absolute inset-0 overflow-hidden">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${p.image})`,
              opacity: i === activeIndex ? 1 : 0,
              transition: "opacity 0.6s ease-out",
              zIndex: i === activeIndex ? 1 : 0,
            }}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 2,
            background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.2) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            zIndex: 2,
            background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Foreground: 3-row layout that never overflows ──
          Row 1: Title          — shrinks text via clamp, fixed mb
          Row 2: Info panel     — flex:1 with overflow:hidden, text clamped
          Row 3: Card strip     — fixed height, always pinned at bottom
      ── */}
      <div
        className="relative h-full flex flex-col"
        style={{
          zIndex: 3,
          padding: "clamp(16px, 3.5vw, 56px) clamp(20px, 5vw, 80px)",
          gap: 0,
        }}
      >
        {/* ── Row 1: Title ── */}
        <h2
          className="font-rockSalt leading-none text-white tracking-tight drop-shadow-lg flex-shrink-0"
          style={{
            fontSize: "clamp(28px, 5.5vw, 68px)",
            marginBottom: "clamp(8px, 1.5vh, 24px)",
          }}
        >
          Projects
        </h2>

        {/* ── Row 2: Info panel — fills remaining space, never pushes cards ── */}
        <div
          className="flex-1 flex flex-col justify-center overflow-hidden"
          style={{ minHeight: 0 }}
        >
          {/* Category · Year */}
          <p
            className="uppercase font-medium tracking-[0.35em] transition-colors duration-400 flex-shrink-0"
            style={{
              fontSize: "clamp(8px, 0.9vw, 11px)",
              color: activeProject.color,
              marginBottom: "clamp(4px, 0.8vh, 12px)",
            }}
          >
            {activeProject.category}&nbsp;&nbsp;·&nbsp;&nbsp;{activeProject.year}
          </p>

          {/* Project Title */}
          <h3
            className="font-extralight text-white leading-tight flex-shrink-0"
            style={{
              fontSize: "clamp(22px, 3.8vw, 56px)",
              marginBottom: "clamp(2px, 0.5vh, 8px)",
            }}
          >
            {activeProject.title}
          </h3>

          {/* Subtitle */}
          <p
            className="text-white/55 tracking-wide flex-shrink-0"
            style={{
              fontSize: "clamp(11px, 1.2vw, 16px)",
              marginBottom: "clamp(4px, 0.8vh, 14px)",
            }}
          >
            {activeProject.subtitle}
          </p>

          {/* Accent divider */}
          <div
            className="rounded-full flex-shrink-0 transition-colors duration-500"
            style={{
              width: "clamp(32px, 3vw, 48px)",
              height: "2px",
              backgroundColor: activeProject.color,
              marginBottom: "clamp(4px, 0.8vh, 14px)",
            }}
          />

          {/* Description — hidden on very small screens if no room */}
          <p
            className="text-white/70 leading-relaxed flex-shrink-0"
            style={{
              fontSize: "clamp(10px, 1.05vw, 15px)",
              marginBottom: "clamp(4px, 0.8vh, 16px)",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {activeProject.description}
          </p>

          {/* Tags */}
          <div
            className="flex flex-wrap flex-shrink-0"
            style={{ gap: "clamp(4px, 0.5vw, 8px)", marginBottom: "clamp(6px, 1vh, 20px)" }}
          >
            {activeProject.tags.map((tag) => (
              <span
                key={tag}
                className="font-medium rounded-full transition-all duration-300"
                style={{
                  fontSize: "clamp(8px, 0.85vw, 11px)",
                  padding: "clamp(2px, 0.3vh, 4px) clamp(8px, 0.8vw, 12px)",
                  border: `1px solid ${activeProject.color}55`,
                  color: activeProject.color,
                  backgroundColor: `${activeProject.color}15`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Work button */}
          <div className="flex-shrink-0" style={{ minHeight: "clamp(28px, 4vh, 44px)" }}>
            {activeProject.isFigma && (
              <a
                href={activeProject.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95"
                style={{
                  fontSize: "clamp(10px, 1vw, 14px)",
                  gap: "clamp(6px, 0.6vw, 10px)",
                  padding: "clamp(6px, 0.7vh, 10px) clamp(14px, 1.5vw, 24px)",
                  backgroundColor: activeProject.color,
                  color: "#fff",
                  boxShadow: `0 4px 24px ${activeProject.color}50`,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 38 57" fill="none">
                  <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.51 9.51 0 0 1 19 28.5Z" fill="white" />
                  <path d="M9.5 57A9.5 9.5 0 0 0 19 47.5V38H9.5A9.5 9.5 0 0 0 9.5 57Z" fill="white" opacity="0.75" />
                  <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="white" opacity="0.75" />
                  <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="white" opacity="0.75" />
                  <path d="M19 0V19H28.5A9.5 9.5 0 0 0 28.5 0Z" fill="white" opacity="0.75" />
                </svg>
                View Work
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* ── Row 3: Card strip — always at the bottom, fixed height ──
            The strip wrapper has a set height via aspect-ratio on cards + padding.
            paddingTop gives lift room so active card never clips.
            overflow:visible on Y so the lift animation shows above the strip.
        ── */}
        <div
          className="flex-shrink-0"
          style={{
            overflow: "visible",
            marginTop: "clamp(8px, 1.5vh, 20px)",
          }}
        >
          {/* Separator line */}
          <div
            className="transition-all duration-500"
            style={{
              height: "1px",
              marginBottom: "clamp(6px, 1vh, 16px)",
              background: `linear-gradient(to right, ${activeProject.color}80, ${activeProject.color}15, transparent)`,
            }}
          />

          <style>{`#project-strip::-webkit-scrollbar { display: none; }`}</style>
          <div
            id="project-strip"
            style={{
              display: "flex",
              gap: "clamp(4px, 0.6vw, 12px)",
              alignItems: "flex-end",
              overflowX: "auto",
              overflowY: "visible",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              // paddingTop gives the active card lift room — won't clip
              paddingTop: "14px",
              paddingBottom: "clamp(4px, 1vh, 12px)",
            }}
          >
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={index === activeIndex}
                index={index}
                activeIndex={activeIndex}
                isTransitioning={isTransitioning}
                onProjectChange={handleCardClick}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}