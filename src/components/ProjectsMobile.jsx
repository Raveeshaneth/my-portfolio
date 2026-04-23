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
import project8 from "../assets/project8.webp";

const PROJECTS = [
  {
    id: 0, icon: figmaIcon, image: project8,
    title: "event.io", subtitle: "Event Dashboard",
    category: "Web Application", year: "2026",
    tags: ["UI/UX", "Dashboard", "SaaS", "Figma"],
    description: "A modern event management dashboard that helps planners track event performance, manage bookings, and analyze attendee insights through a clean, data-driven interface.",
    color: "#a855f7",
    figmaUrl: "https://www.figma.com/design/ctTsCVgQbqGvu5Pfnme6p1/Raveesha-Nethmina-Ui-Ux-Intern-Zyner.io?node-id=5-141&t=ntL4yVRAFFlkr2GU-1",
    isFigma: true,
  },
  {
    id: 1, icon: figmaIcon, image: project7,
    title: "AccessHive", subtitle: "Mixed Reality",
    category: "Accessibility System", year: "2024",
    tags: ["AI", "Accessibility", "XR"],
    description: "2050 mixed-reality accessibility system helping blind and low-vision users navigate safely with AI scene understanding, spatial audio, haptic feedback, and real-time volunteer assistance.",
    color: "#63a2a9",
    figmaUrl: "https://www.figma.com/design/FK0NPX5KJvSb0hhA1fnD5Y/AccessHive?node-id=15-190&t=kQXKX5k8swgSsaNR-1",
    isFigma: true,
  },
  {
    id: 2, icon: figmaIcon, image: project3,
    title: "UrbanFood", subtitle: "E-Commerce",
    category: "Web Application", year: "2023",
    tags: ["E-commerce", "UX"],
    description: "Fresh food delivery platform with intuitive product browsing and seamless checkout experience.",
    color: "#2bac48",
    figmaUrl: "https://www.figma.com/design/j9d9i0F2v1jCXFXCBSNtst/Urbanfood?node-id=0-1&t=iAmMHaOCF0s68CR3-1",
    isFigma: true,
  },
  {
    id: 3, icon: figmaIcon, image: project2,
    title: "Mentora AI", subtitle: "Web Platform",
    category: "Web Application", year: "2024",
    tags: ["Web", "AI/ML"],
    description: "AI-powered educational platform with personalized learning paths and intelligent progress tracking.",
    color: "#7C5CFF",
    figmaUrl: "https://www.figma.com/design/qJvXV3kTY2R0ygHxwb99Rg/Mentora?node-id=0-1&t=ZsSpWgUcLbbwPCXO-1",
    isFigma: true,
  },
  {
    id: 4, icon: androidIcon, image: project1,
    title: "Tuition Mgmt", subtitle: "Mobile App",
    category: "Mobile Application", year: "2024",
    tags: ["Android", "UI/UX"],
    description: "Complete mobile solution for managing tuition classes with attendance tracking and payment processing.",
    color: "#8670f7", isFigma: false,
  },
  {
    id: 5, icon: hashtagIcon, image: project4,
    title: "Hospital System", subtitle: "Healthcare",
    category: "Desktop Application", year: "2023",
    tags: ["Healthcare", "Desktop"],
    description: "Comprehensive hospital management system for patient records, appointments, and medical workflows.",
    color: "#00BCD4", isFigma: false,
  },
  {
    id: 6, icon: desktopIcon, image: project5,
    title: "Medicare", subtitle: "Appointment",
    category: "Desktop Application", year: "2023",
    tags: ["Healthcare", "System"],
    description: "Streamlined appointment scheduling system with automated reminders and calendar management.",
    color: "#e46e00", isFigma: false,
  },
  {
    id: 7, icon: hashtagIcon, image: project6,
    title: "Distribution Mgmt", subtitle: "Management",
    category: "Desktop Application", year: "2022",
    tags: ["Business", "Analytics"],
    description: "End-to-end distribution management with inventory tracking and sales analytics dashboard.",
    color: "#9972df", isFigma: false,
  },
];

/* ─── Thumbnail grid card ─── */
const ProjectCard = React.memo(({ project, isActive, onClick }) => (
  <div
    onClick={onClick}
    style={{
      cursor: "pointer",
      borderRadius: 12,
      overflow: "hidden",
      position: "relative",
      aspectRatio: "3/4",
      outline: isActive ? `1.5px solid ${project.color}` : "1.5px solid transparent",
      transition: "outline-color 0.3s ease",
      flexShrink: 0,
    }}
  >
    {/* Background */}
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#1a1a1a,#000)" }} />

    {/* Project image */}
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: `url(${project.image})`,
      backgroundSize: "cover", backgroundPosition: "center",
      opacity: isActive ? 0.7 : 0.35,
      transition: "opacity 0.3s ease",
    }} />

    {/* Icon */}
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img
        src={project.icon} alt=""
        style={{ width: "30%", height: "30%", objectFit: "contain", filter: "invert(1)", opacity: isActive ? 0.9 : 0.4, transition: "opacity 0.3s" }}
        loading="lazy" decoding="async"
      />
    </div>

    {/* Color gradient */}
    <div style={{
      position: "absolute", inset: 0,
      background: `linear-gradient(to top, ${project.color}cc 0%, ${project.color}22 55%, transparent 85%)`,
      opacity: isActive ? 1 : 0.55,
      transition: "opacity 0.3s",
    }} />

    {/* Active top line */}
    {isActive && (
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: project.color }} />
    )}

    {/* Label */}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 8px 7px" }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: "#fff", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {project.title}
      </p>
      <p style={{ fontSize: 8, color: "rgba(255,255,255,0.55)", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {project.subtitle}
      </p>
    </div>
  </div>
));

ProjectCard.displayName = "ProjectCard";

/* ─── Full-screen detail modal ─── */
const ProjectModal = React.memo(({ project, onClose }) => {
  const c = project.color;
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "flex-end",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxHeight: "88vh",
          background: "#0a0a0a",
          borderRadius: "20px 20px 0 0",
          overflow: "hidden",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${project.image})`,
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: 0.3,
          }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, #0a0a0a 55%, #0a0a0a88 80%, transparent 100%)` }} />
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 20% 80%, ${c}18 0%, transparent 60%)` }} />
        </div>

        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "14px 0 0", position: "relative", zIndex: 2, flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16, zIndex: 3,
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff", fontSize: 14, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
          }}
        >
          ✕
        </button>

        {/* Scrollable content */}
        <div style={{ overflowY: "auto", flex: 1, position: "relative", zIndex: 2 }}>
          <div style={{ padding: "20px 24px 40px" }}>

            {/* Meta */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: c, flexShrink: 0 }} />
              <p style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.28em",
                textTransform: "uppercase", color: c, margin: 0,
              }}>
                {project.category}&nbsp;·&nbsp;{project.year}
              </p>
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: 32, fontWeight: 200, color: "#fff",
              margin: "0 0 4px 0", lineHeight: 1.05,
            }}>
              {project.title}
            </h3>

            {/* Subtitle */}
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", margin: "0 0 16px 0" }}>
              {project.subtitle}
            </p>

            {/* Accent line */}
            <div style={{ width: 40, height: 2, borderRadius: 2, background: c, marginBottom: 16 }} />

            {/* Description */}
            <p style={{
              fontSize: 13, color: "rgba(255,255,255,0.7)",
              lineHeight: 1.75, margin: "0 0 20px 0",
            }}>
              {project.description}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  fontSize: 10, fontWeight: 500,
                  padding: "4px 12px", borderRadius: 100,
                  border: `1px solid ${c}40`, color: c, background: `${c}12`,
                  letterSpacing: "0.03em",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* View Work button — overflow:visible wrapper, padding+neg-margin trick */}
            {project.isFigma && (
              <div style={{ overflow: "visible", display: "inline-block", padding: 14, margin: -14 }}>
                <a
                  href={project.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setBtnHovered(true)}
                  onMouseLeave={() => setBtnHovered(false)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "12px 26px",
                    borderRadius: 100,
                    background: c,
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                    letterSpacing: "0.03em",
                    whiteSpace: "nowrap",
                    boxShadow: "none",
                    transform: btnHovered ? "scale(1.07)" : "scale(1)",
                    transformOrigin: "center center",
                    transition: "transform 0.22s cubic-bezier(0.34,1.56,0.64,1)",
                    willChange: "transform",
                  }}
                >
                  <img src={figmaIcon} alt="" style={{ width: 14, height: 14, filter: "invert(1)", flexShrink: 0, objectFit: "contain" }} />
                  View Work
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectModal.displayName = "ProjectModal";

/* ─── Main mobile component ─── */
export default function ProjectsMobile() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const activeProject = useMemo(() => PROJECTS[activeIndex], [activeIndex]);
  const c = activeProject.color;

  const handleCardClick = useCallback((index) => {
    if (index === activeIndex) {
      // Tap active card → open modal
      setSelectedProject(PROJECTS[index]);
    } else {
      setActiveIndex(index);
    }
  }, [activeIndex]);

  const closeModal = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <style>{`
        #mobile-ps::-webkit-scrollbar { display: none; }
        #mobile-ps { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section
        id="projects"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100svh",
          background: "#000",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* ── Background images ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {PROJECTS.map((p, i) => (
            <div key={p.id} style={{
              position: "absolute", inset: 0,
              backgroundImage: `url(${p.image})`,
              backgroundSize: "cover", backgroundPosition: "center",
              opacity: i === activeIndex ? 1 : 0,
              transition: "opacity 0.6s ease",
              zIndex: i === activeIndex ? 1 : 0,
            }} />
          ))}
          {/* Vignettes — heavier on mobile for readability */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.99) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 70%)" }} />
          {/* Ambient color tint */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 3,
            background: `radial-gradient(ellipse at 20% 70%, ${c}20 0%, transparent 60%)`,
            transition: "background 0.6s ease",
          }} />
        </div>

        {/* ── Foreground ── */}
        <div style={{
          position: "relative", zIndex: 4,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "clamp(48px,8vh,80px) 24px 0",
          boxSizing: "border-box",
          overflow: "visible",
        }}>

          {/* ── Section heading ── */}
          <h2 className="font-rockSalt" style={{
            fontSize: "clamp(32px,9vw,52px)",
            color: "#fff", lineHeight: 1, letterSpacing: "-0.01em",
            margin: "0 0 clamp(20px,4vh,36px) 0",
            flexShrink: 0,
          }}>
            Projects
          </h2>

          {/* ── Info panel — fills remaining space ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "visible", minHeight: 0 }}>

            {/* Meta */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexShrink: 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: c, transition: "background 0.4s", flexShrink: 0 }} />
              <p style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.28em",
                textTransform: "uppercase", color: c, margin: 0, transition: "color 0.4s",
              }}>
                {activeProject.category}&nbsp;&nbsp;·&nbsp;&nbsp;{activeProject.year}
              </p>
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: "clamp(28px,7.5vw,44px)", fontWeight: 200,
              color: "#fff", lineHeight: 1.05,
              margin: "0 0 4px 0", flexShrink: 0,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {activeProject.title}
            </h3>

            {/* Subtitle */}
            <p style={{
              fontSize: 13, color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.08em", margin: "0 0 14px 0", flexShrink: 0,
            }}>
              {activeProject.subtitle}
            </p>

            {/* Accent line */}
            <div style={{
              width: 40, height: 2, borderRadius: 2,
              background: c, transition: "background 0.5s",
              marginBottom: 14, flexShrink: 0,
            }} />

            {/* Description — 2 lines on mobile */}
            <p style={{
              fontSize: 13, color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7, margin: "0 0 14px 0", flexShrink: 0,
              display: "-webkit-box", WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>
              {activeProject.description}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, flexShrink: 0 }}>
              {activeProject.tags.map((tag) => (
                <span key={tag} style={{
                  fontSize: 10, fontWeight: 500,
                  padding: "4px 11px", borderRadius: 100,
                  border: `1px solid ${c}40`, color: c, background: `${c}12`,
                  whiteSpace: "nowrap", letterSpacing: "0.03em",
                  transition: "border-color 0.4s, color 0.4s, background 0.4s",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Spacer */}
            <div style={{ flex: 1, minHeight: 16 }} />

            {/* "Tap to view" hint — shows when active project has figma link */}
            {activeProject.isFigma && (
              <div style={{ flexShrink: 0, marginBottom: 6, overflow: "visible" }}>
                <button
                  onClick={() => setSelectedProject(activeProject)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "11px 22px", borderRadius: 100,
                    background: c, color: "#fff",
                    fontSize: 13, fontWeight: 600,
                    border: "none", cursor: "pointer",
                    letterSpacing: "0.03em", whiteSpace: "nowrap",
                    // Active press feel on touch
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <img src={figmaIcon} alt="" style={{ width: 13, height: 13, filter: "invert(1)", flexShrink: 0, objectFit: "contain" }} />
                  View Work
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </button>
              </div>
            )}

            {/* Tap hint for non-figma projects */}
            <p style={{
              fontSize: 10, color: "rgba(255,255,255,0.3)",
              margin: "0 0 clamp(10px,2vh,20px) 0",
              letterSpacing: "0.05em", flexShrink: 0,
            }}>
              Tap a card to switch &nbsp;·&nbsp; Tap active card to explore
            </p>
          </div>

          {/* ── Card strip ── */}
          <div style={{ flexShrink: 0, overflow: "visible" }}>
            {/* Separator */}
            <div style={{
              height: 1,
              background: `linear-gradient(to right, ${c}70, ${c}18 60%, transparent)`,
              transition: "background 0.5s",
              marginBottom: 12,
            }} />

            {/* Horizontally scrollable strip */}
            <div id="mobile-ps" style={{
              display: "flex",
              gap: 8,
              overflowX: "auto", overflowY: "visible",
              paddingBottom: "clamp(20px,4vh,36px)",
              paddingTop: 6,
            }}>
              {PROJECTS.map((project, index) => (
                <div key={project.id} style={{ width: "clamp(64px,18vw,88px)", flexShrink: 0 }}>
                  <ProjectCard
                    project={project}
                    isActive={index === activeIndex}
                    onClick={() => handleCardClick(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </>
  );
}