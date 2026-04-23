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

/* ─── Thumbnail card ─── */
const ProjectCard = ({ project, isActive, index, activeIndex, isTransitioning, onProjectChange }) => {
  const [hovered, setHovered] = useState(false);
  const onClick = useCallback(() => {
    if (!isTransitioning && index !== activeIndex) onProjectChange(index);
  }, [index, activeIndex, isTransitioning, onProjectChange]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1 1 0",
        minWidth: 0,
        cursor: "pointer",
        transform: isActive ? "translateY(-12px)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      <div style={{
        position: "relative",
        aspectRatio: "3/4",
        borderRadius: 10,
        overflow: "hidden",
        opacity: isActive ? 1 : hovered ? 0.8 : 0.38,
        filter: isActive ? "none" : hovered ? "brightness(1.25)" : "grayscale(60%) brightness(0.6)",
        transition: "opacity 0.3s ease, filter 0.3s ease, outline-color 0.3s ease",
        outline: isActive ? `1.5px solid ${project.color}` : "1.5px solid transparent",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#1a1a1a,#000)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={project.icon} alt="" style={{ width: "32%", height: "32%", objectFit: "contain", filter: "invert(1)", opacity: isActive ? 0.9 : 0.4 }} loading="eager" decoding="async" />
        </div>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${project.color}cc 0%, ${project.color}22 55%, transparent 85%)` }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "6px 6px 5px" }}>
          <p style={{ fontSize: "clamp(7px,1vw,10px)", fontWeight: 700, color: "#fff", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {project.title}
          </p>
          <p style={{ fontSize: "clamp(6px,0.8vw,8px)", color: "rgba(255,255,255,0.55)", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {project.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─── View Work Button ───────────────────────────────────────────────────────
   The button lives inside a div with overflow:visible and uses a
   padding + negative-margin trick so the scale() pop has breathing room
   on ALL sides — including the left — without shifting the layout.
   transformOrigin is "center center" so it scales from the middle.
─────────────────────────────────────────────────────────────────────────── */
const ViewWorkButton = ({ project }) => {
  const [hovered, setHovered] = useState(false);
  if (!project.isFigma) return null;

  return (
    <div style={{ overflow: "visible", display: "inline-block", padding: 16, margin: -16 }}>
      <a
        href={project.figmaUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 9,
          padding: "11px 24px",
          borderRadius: 100,
          background: project.color,
          color: "#fff",
          fontSize: "clamp(11px,1vw,13px)",
          fontWeight: 600,
          textDecoration: "none",
          letterSpacing: "0.03em",
          whiteSpace: "nowrap",
          boxShadow: "none",
          /* scale from center — no left-side clip */
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transformOrigin: "center center",
          transition: "transform 0.22s cubic-bezier(0.34,1.56,0.64,1)",
          willChange: "transform",
        }}
      >
        <img src={figmaIcon} alt="" style={{ width: 13, height: 13, filter: "invert(1)", flexShrink: 0, objectFit: "contain" }} />
        View Work
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </a>
    </div>
  );
};

/* ─── Main ─── */
export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const activeProject = useMemo(() => PROJECTS[activeIndex], [activeIndex]);

  const switchTo = useCallback((index) => {
    if (isTransitioning || index === activeIndex) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 400);
  }, [activeIndex, isTransitioning]);

  const handleCardClick = useCallback((index) => {
    switchTo(index);
    window.dispatchEvent(new CustomEvent("projectIndexChange", { detail: { index } }));
  }, [switchTo]);

  useEffect(() => {
    const h = (e) => switchTo(e.detail.index);
    window.addEventListener("projectIndexChange", h);
    return () => window.removeEventListener("projectIndexChange", h);
  }, [switchTo]);

  const c = activeProject.color;

  return (
    <section
      id="projects"
      style={{ position: "relative", width: "100%", height: "100%", background: "#000", overflow: "hidden" }}
    >
      {/* ── Background images ── */}
      <div style={{ position: "absolute", inset: 0 }}>
        {PROJECTS.map((p, i) => (
          <div key={p.id} style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${p.image})`,
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 0.7s ease",
            zIndex: i === activeIndex ? 1 : 0,
          }} />
        ))}
        {/* Vignettes */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to right, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.72) 38%, rgba(0,0,0,0.1) 68%, transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.65) 32%, transparent 62%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 18%)" }} />
        {/* Ambient color tint */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 3,
          background: `radial-gradient(ellipse at 12% 65%, ${c}16 0%, transparent 55%)`,
          transition: "background 0.7s ease",
        }} />
      </div>

      {/* ── Foreground layout ──
          3 rows:
            1. Title          — shrinks to content
            2. Info panel     — flex:1, overflow:VISIBLE (button needs this)
            3. Card strip     — shrinks to content, overflow:visible for lift
      ── */}
      <div style={{
        position: "relative", zIndex: 4,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        /* Left padding is the safe zone for the button's scale pop */
        padding: "clamp(20px,4vw,60px) clamp(24px,5vw,80px) 0 clamp(24px,5vw,80px)",
        boxSizing: "border-box",
        /* CRITICAL: no overflow:hidden anywhere in this tree */
        overflow: "visible",
      }}>

        {/* ── Row 1: Heading ── */}
        <h2 className="font-rockSalt" style={{
          fontSize: "clamp(28px,5.5vw,72px)",
          color: "#fff", lineHeight: 1, letterSpacing: "-0.01em",
          margin: "0 0 clamp(12px,2.2vh,32px) 0",
          flexShrink: 0,
        }}>
          Projects
        </h2>

        {/* ── Row 2: Info panel ──
            overflow:visible is NON-NEGOTIABLE here.
            Text overflow is handled per-element, not on the container.
        ── */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          overflow: "visible",   // ← button must not clip
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? "translateY(15px)" : "translateY(0)",
          transition: "opacity 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        }}>

          {/* Meta pill: category · year */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "clamp(6px,1vh,14px)", flexShrink: 0 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: c, transition: "background 0.4s", flexShrink: 0 }} />
            <p style={{
              fontSize: "clamp(9px,0.85vw,11px)", fontWeight: 600,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: c, margin: 0, transition: "color 0.4s",
            }}>
              {activeProject.category}&nbsp;&nbsp;·&nbsp;&nbsp;{activeProject.year}
            </p>
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: "clamp(26px,4.2vw,64px)", fontWeight: 200,
            color: "#fff", lineHeight: 1.05,
            margin: "0 0 clamp(2px,0.4vh,8px) 0",
            flexShrink: 0,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            maxWidth: "55vw",
          }}>
            {activeProject.title}
          </h3>

          {/* Subtitle */}
          <p style={{
            fontSize: "clamp(11px,1.2vw,16px)", color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.08em", margin: "0 0 clamp(8px,1.2vh,18px) 0",
            flexShrink: 0,
          }}>
            {activeProject.subtitle}
          </p>

          {/* Accent line */}
          <div style={{
            width: "clamp(36px,3.5vw,52px)", height: 2, borderRadius: 2,
            background: c, transition: "background 0.5s",
            marginBottom: "clamp(8px,1.2vh,18px)", flexShrink: 0,
          }} />

          {/* Description */}
          <p style={{
            fontSize: "clamp(11px,1.05vw,15px)", color: "rgba(255,255,255,0.65)",
            lineHeight: 1.75, maxWidth: "86ch",
            margin: "0 0 clamp(10px,1.4vh,20px) 0",
            flexShrink: 0,
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {activeProject.description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(5px,0.5vw,8px)", flexShrink: 0 }}>
            {activeProject.tags.map((tag) => (
              <span key={tag} style={{
                fontSize: "clamp(9px,0.8vw,11px)", fontWeight: 500,
                padding: "4px clamp(10px,1vw,14px)", borderRadius: 100,
                border: `1px solid ${c}40`, color: c, background: `${c}12`,
                whiteSpace: "nowrap", letterSpacing: "0.03em",
                transition: "border-color 0.4s, color 0.4s, background 0.4s",
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/*
            ── Spacer ──
            Pushes the button down. flex:1 absorbs all remaining height
            between tags and card strip. minHeight = safety floor.
          */}
          <div style={{ flex: 1, minHeight: "clamp(16px,3vh,48px)" }} />

          {/*
            ── Button wrapper ──
            padding + negative margin = scale pop never clips on any side.
            overflow:visible is already inherited from the parent column.
          */}
          <div style={{
            flexShrink: 0,
            overflow: "visible",
            paddingBottom: "clamp(12px,2vh,28px)",
            /* 16px padding on all sides = 8% scale room before clip */
          }}>
            <ViewWorkButton project={activeProject} key={activeProject.id} />
          </div>
        </div>

        {/* ── Row 3: Card strip ── */}
        <div style={{ flexShrink: 0, overflow: "visible" }}>
          {/* Separator */}
          <div style={{
            height: 1,
            background: `linear-gradient(to right, ${c}70, ${c}18 60%, transparent)`,
            transition: "background 0.5s",
            marginBottom: "clamp(8px,1.2vh,18px)",
          }} />

          <style>{`#ps::-webkit-scrollbar{display:none}`}</style>
          <div id="ps" style={{
            display: "flex",
            gap: "clamp(5px,0.65vw,12px)",
            alignItems: "flex-end",
            overflowX: "visible", overflowY: "visible",
            scrollbarWidth: "none",
            paddingTop: 18,   // headroom for translateY(-12px) lift
            paddingBottom: "clamp(18px,3vh,36px)",
          }}>
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