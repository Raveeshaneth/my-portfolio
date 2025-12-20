import { useEffect, useState, useMemo, useCallback } from "react";

import androidIcon from "../assets/android.png";
import figmaIcon from "../assets/figma.png";
import desktopIcon from "../assets/java.png";
import hashtagIcon from "../assets/hashtag.png";

// Import project screenshots
import project1 from "../assets/project1.webp";
import project2 from "../assets/project2.webp";
import project3 from "../assets/project3.webp";
import project4 from "../assets/project4.webp";
import project5 from "../assets/project5.webp";
import project6 from "../assets/project6.webp";
import project7 from "../assets/project7.webp";

const PROJECTS = [
  {
    id: 0,
    icon: figmaIcon,
    image: project2,
    title: "Mentora AI",
    subtitle: "Web Platform",
    category: "Web Application",
    year: "2024",
    tags: ["Web", "AI/ML"],
    description: "AI-powered educational platform with personalized learning paths and intelligent progress tracking.",
    color: "#ffffff",
  },
  {
    id: 1,
    icon: figmaIcon,
    image: project3,
    title: "UrbanFood",
    subtitle: "E-Commerce",
    category: "Web Application",
    year: "2023",
    tags: ["E-commerce", "UX"],
    description: "Fresh food delivery platform with intuitive product browsing and seamless checkout experience.",
    color: "#2bac48",
  },
  {
    id: 2,
    icon: androidIcon,
    image: project1,
    title: "Tuition Management",
    subtitle: "Mobile App",
    category: "Mobile Application",
    year: "2024",
    tags: ["Android", "UI/UX"],
    description: "Complete mobile solution for managing tuition classes with attendance tracking and payment processing.",
    color: "#8670f7",
  },
  {
    id: 3,
    icon: hashtagIcon,
    image: project4,
    title: "Hospital System",
    subtitle: "Healthcare",
    category: "Desktop Application",
    year: "2023",
    tags: ["Healthcare", "Desktop"],
    description: "Comprehensive hospital management system for patient records, appointments, and medical workflows.",
    color: "#00BCD4",
  },
  {
    id: 4,
    icon: desktopIcon,
    image: project5,
    title: "Medicare",
    subtitle: "Appointment",
    category: "Desktop Application",
    year: "2023",
    tags: ["Healthcare", "System"],
    description: "Streamlined appointment scheduling system with automated reminders and calendar management.",
    color: "#e46e00",
  },
  {
    id: 5,
    icon: hashtagIcon,
    image: project6,
    title: "Distribution Management",
    subtitle: "Management",
    category: "Desktop Application",
    year: "2022",
    tags: ["Business", "Analytics"],
    description: "End-to-end distribution management with inventory tracking and sales analytics dashboard.",
    color: "#9972df",
  },
  {
    id: 6,
    icon: figmaIcon,
    image: project7,
    title: "AccessHive",
    subtitle: "Mixed Reality",
    category: "Accessibility System",
    year: "2024",
    tags: ["AI", "Accessibility", "XR"],
    description: "2050 mixed-reality accessibility system helping blind and low-vision users navigate safely with AI scene understanding, spatial audio, haptic feedback, and real-time volunteer assistance.",
    color: "#63a2a9",
  },
];

// Memoized project card component
const ProjectCard = ({ project, isActive, index, activeIndex, isTransitioning, onProjectChange }) => {
  const handleClick = useCallback(() => {
    if (!isTransitioning && index !== activeIndex) {
      onProjectChange(index);
    }
  }, [index, activeIndex, isTransitioning, onProjectChange]);

  return (
    <div
      className="group w-full cursor-pointer"
      onClick={handleClick}
    >
      <div className={`
        relative w-full rounded-lg overflow-visible
        transition-all duration-500 ease-out
        ${isActive ? "ring-3 ring-white shadow-xl scale-110" : "ring-2 ring-black/0 shadow-lg"}
        group-hover:shadow-2xl group-hover:scale-105
      `}>
        
        {/* Main Card */}
        <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
          
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            <img
              src={project.icon}
              alt={project.title}
              className="w-10 h-10 md:w-12 md:h-12 object-contain opacity-100 transition-all duration-500 group-hover:scale-125 group-hover:opacity-60 invert"
              loading="eager"
              decoding="async"
            />
          </div>

          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${project.color}DD 0%, ${project.color}40 30%, transparent 60%)`
            }}
          />

          <div className="absolute bottom-0 left-0 right-0 p-1.5 md:p-2">
            <h4 className="text-[10px] md:text-xs font-medium text-white leading-tight mb-0.5 line-clamp-2">
              {project.title}
            </h4>
            <p className="text-[8px] md:text-[10px] text-white/90">
              {project.subtitle}
            </p>
          </div>

          {isActive && (
            <div 
              className="absolute bottom-0 left-0 right-0 h-0.5 z-20"
              style={{ backgroundColor: project.color }}
            />
          )}
        </div>

        {/* Description Tooltip - Appears ABOVE on hover */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 w-48 md:w-56"
        >
          <div 
            className="relative p-3 md:p-4 rounded-xl shadow-2xl"
            style={{ 
              backgroundColor: project.color,
            }}
          >
            <div className="absolute inset-0 bg-black/80 rounded-xl backdrop-blur-sm" />
            <p className="relative z-10 text-[11px] md:text-xs text-white font-semibold leading-relaxed text-center">
              {project.description}
            </p>
            
            {/* Arrow pointing DOWN (since tooltip is above) */}
            <div 
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
              style={{ backgroundColor: project.color }}
            >
              <div className="absolute inset-0 bg-white/90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const activeProject = useMemo(() => PROJECTS[activeIndex], [activeIndex]);

  const handleProjectChange = useCallback((e) => {
    if (isTransitioning) return;
    
    const newIndex = e.detail.index;
    if (newIndex !== activeIndex) {
      setImageLoading(true);
      setImageLoaded(false);
      setIsTransitioning(true);
      setActiveIndex(newIndex);
      
      setTimeout(() => setIsTransitioning(false), 400);
    }
  }, [activeIndex, isTransitioning]);

  const handleCardClick = useCallback((index) => {
    if (!isTransitioning && index !== activeIndex) {
      setImageLoading(true);
      setImageLoaded(false);
      setActiveIndex(index);
      window.dispatchEvent(
        new CustomEvent("projectIndexChange", {
          detail: { index },
        })
      );
    }
  }, [activeIndex, isTransitioning]);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
    setTimeout(() => setImageLoaded(true), 50);
  }, []);

  useEffect(() => {
    window.addEventListener("projectIndexChange", handleProjectChange);
    return () => window.removeEventListener("projectIndexChange", handleProjectChange);
  }, [handleProjectChange]);

  return (
    <section
      id="projects"
      className="relative w-full h-full bg-white overflow-hidden"
    >
      <div className="relative h-full w-full">
        
        {/* Background with lazy loading */}
        <div className="absolute inset-0">
          {/* Loading skeleton/blur effect */}
          {imageLoading && (
            <div 
              className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse will-change-opacity"
              style={{ opacity: isTransitioning ? 0.7 : 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            </div>
          )}
          
          {/* Actual background image with fade-in */}
          <img
            src={activeProject.image}
            alt={activeProject.title}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-all duration-500 ease-out
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={handleImageLoad}
            loading="eager"
            decoding="async"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        <div className="relative h-full flex flex-col px-6 md:px-12 lg:px-20 py-12 md:py-16">
          
          <div className="mb-8 md:mb-12">
            <h2 className="font-rockSalt text-[40px] md:text-[56px] lg:text-[72px] leading-none text-white tracking-tight drop-shadow-lg">
              Projects
            </h2>
          </div>

          {/* Project details positioned higher */}
          <div className="mb-auto">
            <div className="text-white max-w-2xl transition-opacity duration-300" style={{ opacity: isTransitioning ? 0.5 : 1 }}>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                {activeProject.category} · {activeProject.year}
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-3 transition-all duration-300">
                {activeProject.title}
              </h3>
              <p className="text-lg md:text-xl text-white/80 mb-3 transition-all duration-300">
                {activeProject.subtitle}
              </p>
              <div className="flex flex-wrap gap-2">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cards positioned at the absolute bottom */}
          <div className="absolute bottom-6 md:bottom-8 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-3 items-start">
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
        </div>
     
    </section>
  );
}