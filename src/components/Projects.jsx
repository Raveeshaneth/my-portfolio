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
import project8 from "../assets/project7.webp";

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
    if (!isTransitioning && index !== activeIndex) {
      onProjectChange(index);
    }
  }, [index, activeIndex, isTransitioning, onProjectChange]);

  return (
    // flex:1 so cards share available width equally; minWidth prevents them
    // from going too narrow on small screens; no flex-shrink-0
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer transition-all duration-300 ease-out"
      style={{
        flex: "1 1 0",
        minWidth: "70px",
        maxWidth: "160px",
        // active card lifts UP — clipping is handled by paddingTop on the strip
        transform: isActive ? "translateY(-12px)" : "translateY(0px)",
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          aspectRatio: "3/4",
          opacity: isActive ? 1 : isHovered ? 0.88 : 0.45,
          filter: isActive
            ? "none"
            : isHovered
            ? "grayscale(0%) brightness(1.3)"
            : "grayscale(50%) brightness(0.7)",
        }}
      >
        {/* Dark base */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={project.icon}
            alt={project.title}
            className="w-8 h-8 md:w-10 md:h-10 object-contain invert transition-all duration-300"
            style={{ opacity: isActive ? 0.9 : isHovered ? 0.7 : 0.4 }}
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Color wash */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, ${project.color}CC 0%, ${project.color}55 45%, transparent 75%)`,
            opacity: isActive ? 1 : isHovered ? 0.85 : 0.5,
          }}
        />

        {/* Active top accent */}
        {isActive && (
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ backgroundColor: project.color }}
          />
        )}

        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
          <p className="text-[10px] md:text-[11px] font-bold text-white leading-tight truncate">
            {project.title}
          </p>
          <p className="text-[8px] md:text-[9px] text-white/65 mt-0.5 truncate">
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

  const handleProjectChange = useCallback(
    (e) => {
      if (isTransitioning) return;
      const newIndex = e.detail.index;
      if (newIndex !== activeIndex) {
        setIsTransitioning(true);
        setActiveIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 400);
      }
    },
    [activeIndex, isTransitioning]
  );

  const handleCardClick = useCallback(
    (index) => {
      if (!isTransitioning && index !== activeIndex) {
        setIsTransitioning(true);
        setActiveIndex(index);
        window.dispatchEvent(
          new CustomEvent("projectIndexChange", { detail: { index } })
        );
        setTimeout(() => setIsTransitioning(false), 400);
      }
    },
    [activeIndex, isTransitioning]
  );

  useEffect(() => {
    window.addEventListener("projectIndexChange", handleProjectChange);
    return () => window.removeEventListener("projectIndexChange", handleProjectChange);
  }, [handleProjectChange]);

  return (
    <section
      id="projects"
      className="relative w-full h-full bg-black"
      // No overflow:hidden on the section — background clips itself,
      // so the lifted active card is never cut at the top
    >
      {/* Background — self-contained clip */}
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
            background:
              "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.52) 45%, rgba(0,0,0,0.22) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            zIndex: 2,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
          }}
        />
      </div>

      {/* Foreground */}
      <div
        className="relative h-full flex flex-col px-8 md:px-14 lg:px-20 py-10 md:py-14"
        style={{ zIndex: 3 }}
      >
        {/* Title */}
        <h2 className="font-rockSalt text-[38px] md:text-[54px] lg:text-[68px] leading-none text-white tracking-tight drop-shadow-lg mb-6">
          Projects
        </h2>

        {/* Info panel */}
        <div className="flex-1 flex flex-col justify-center max-w-lg">
          <p
            className="text-[10px] uppercase tracking-[0.4em] mb-3 font-medium transition-colors duration-400"
            style={{ color: activeProject.color }}
          >
            {activeProject.category}&nbsp;&nbsp;·&nbsp;&nbsp;{activeProject.year}
          </p>

          <h3 className="text-[2.4rem] md:text-5xl lg:text-[3.4rem] font-extralight text-white leading-[1.1] mb-2">
            {activeProject.title}
          </h3>

          <p className="text-base text-white/55 mb-4 tracking-wide">
            {activeProject.subtitle}
          </p>

          <div
            className="w-12 h-[2px] mb-4 rounded-full transition-colors duration-500"
            style={{ backgroundColor: activeProject.color }}
          />

          <p className="text-sm md:text-[15px] text-white/70 leading-relaxed mb-5">
            {activeProject.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {activeProject.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[11px] font-medium rounded-full transition-all duration-300"
                style={{
                  border: `1px solid ${activeProject.color}55`,
                  color: activeProject.color,
                  backgroundColor: `${activeProject.color}15`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Work */}
          <div style={{ minHeight: "44px" }}>
            {activeProject.isFigma && (
              <a
                href={activeProject.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95"
                style={{
                  backgroundColor: activeProject.color,
                  color: "#fff",
                  boxShadow: `0 4px 30px ${activeProject.color}50`,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 38 57" fill="none">
                  <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.51 9.51 0 0 1 19 28.5Z" fill="white" />
                  <path d="M9.5 57A9.5 9.5 0 0 0 19 47.5V38H9.5A9.5 9.5 0 0 0 9.5 57Z" fill="white" opacity="0.75" />
                  <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="white" opacity="0.75" />
                  <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="white" opacity="0.75" />
                  <path d="M19 0V19H28.5A9.5 9.5 0 0 0 28.5 0Z" fill="white" opacity="0.75" />
                </svg>
                View Work
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Card strip
            paddingTop gives room for the active card's upward lift so it
            never gets clipped. The strip itself has overflow:visible on Y.
        */}
        <div style={{ overflow: "visible" }}>
          {/* Separator */}
          <div
            className="h-px mb-4 w-full transition-all duration-500"
            style={{
              background: `linear-gradient(to right, ${activeProject.color}70, ${activeProject.color}15, transparent)`,
            }}
          />

          {/* paddingTop = lift amount (12px) + a little breathing room */}
          <style>{`#project-strip::-webkit-scrollbar { display: none; }`}</style>
          <div
            id="project-strip"
            className="flex gap-2 md:gap-3 items-end w-full"
            style={{
              overflowX: "auto",
              overflowY: "visible",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingTop: "20px",   // room above for lifted card
              paddingBottom: "4px",
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