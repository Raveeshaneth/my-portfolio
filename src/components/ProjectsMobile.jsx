import React, { useState, useCallback, useMemo } from "react";

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

// Optimized ProjectCard component with React.memo for performance
const ProjectCard = React.memo(({ project, onClick }) => (
  <div
    className="group cursor-pointer"
    onClick={onClick}
  >
    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 will-change-transform">
      {/* Project Card */}
      <div
        className="relative w-full aspect-[3/4] bg-gradient-to-br from-gray-900 to-black flex items-center justify-center"
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Icon */}
        <img
          src={project.icon}
          alt={project.title}
          className="relative w-12 h-12 object-contain opacity-70 invert will-change-auto"
          loading="lazy"
          decoding="async"
        />

        {/* Project Info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 pointer-events-none">
          <h4 className="text-xs md:text-sm font-medium text-white leading-tight mb-1 line-clamp-2">
            {project.title}
          </h4>
          <p className="text-[10px] md:text-xs text-white/80">
            {project.subtitle}
          </p>
        </div>
      </div>
    </div>
  </div>
));

ProjectCard.displayName = 'ProjectCard';

// Optimized ProjectModal component
const ProjectModal = React.memo(({ project, onClose }) => (
  <div
    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 will-change-auto"
    onClick={onClose}
  >
    <div
      className="relative bg-white rounded-lg overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-black/80 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center transition-all"
      >
        ✕
      </button>

      {/* Project Image */}
      <div
        className="w-full h-64 md:h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${project.image})`,
        }}
      />

      {/* Project Details */}
      <div className="p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-2">
          {project.category} · {project.year}
        </p>

        <h3 className="text-3xl md:text-4xl font-light mb-3 text-black">
          {project.title}
        </h3>

        <p className="text-lg md:text-xl text-gray-700 mb-4">
          {project.subtitle}
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-gray-100 border border-gray-300 text-gray-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
));

ProjectModal.displayName = 'ProjectModal';

export default function ProjectsMobile() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCardClick = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Memoize projects to prevent unnecessary re-renders
  const memoizedProjects = useMemo(() => PROJECTS, []);

  // Memoize card components for better performance
  const projectCards = useMemo(() => (
    memoizedProjects.map((project) => (
      <ProjectCard 
        key={project.id} 
        project={project} 
        onClick={() => handleCardClick(project)}
      />
    ))
  ), [memoizedProjects, handleCardClick]);

  return (
    <section id="projects" className="relative w-full bg-white overflow-hidden py-20">
      <div className="px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-rockSalt text-[40px] md:text-[56px] leading-none text-black tracking-tight mb-2">
            Projects
          </h2>
          <div className="h-px bg-gradient-to-r from-black/30 to-transparent max-w-xs" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {projectCards}
        </div>
      </div>

      {/* Modal - Show project details when clicked */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </section>
  );
}
