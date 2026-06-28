import { useEffect, useRef, useState } from "react";

/**
 * Enhanced custom cursor:
 * - SVG arrow with mix-blend-mode: difference
 * - Scales up on interactive elements
 * - Shows "VIEW" label when hovering over project cards
 *
 * Desktop only — App.jsx mounts this only when !isMobile.
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const labelRef  = useRef(null);
  const pos       = useRef({ x: -200, y: -200 });
  const [showLabel, setShowLabel] = useState("");
  const hoveredProject = useRef(false);
  const hoveredLink = useRef(false);
  const rafId = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };

      // Determine what the mouse is currently hovering over
      const target = e.target;
      const isProject = target.closest("[data-cursor='view']");
      const customLabelNode = target.closest("[data-cursor-label]");
      const isLinkNode = target.closest("a, button, [role='button'], input, select, textarea, label, .cursor-pointer");

      if (isProject) {
        hoveredProject.current = true;
        hoveredLink.current = false;
        setShowLabel("VIEW");
      } else if (customLabelNode) {
        hoveredProject.current = false;
        hoveredLink.current = true;
        setShowLabel(customLabelNode.getAttribute("data-cursor-label"));
      } else if (isLinkNode) {
        hoveredProject.current = false;
        hoveredLink.current = true;
        setShowLabel("");
      } else {
        hoveredProject.current = false;
        hoveredLink.current = false;
        setShowLabel("");
      }
    };

    const loop = () => {
      const { x, y } = pos.current;
      
      const isLink = hoveredLink.current && !hoveredProject.current;
      
      el.style.transform = `translate(${x - 4}px, ${y - 2}px)`;
      
      if (svgRef.current) {
        const scale = isLink ? 0 : 1;
        svgRef.current.style.transform = `scale(${scale})`;
        svgRef.current.style.opacity = isLink ? 0 : 1;
      }
      
      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId.current = requestAnimationFrame(loop);

    return () => {
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { cursor: none !important; }
        
        a, button, [role='button'], input, select, textarea, label, .cursor-pointer,
        a *, button *, [role='button'] *, input *, select *, textarea *, label *, .cursor-pointer * { 
          cursor: pointer !important; 
        }
        
        [data-cursor='view'], [data-cursor='view'] * {
          cursor: none !important;
        }
      `}</style>

      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          pointerEvents: "none",
          zIndex:        99999,
          willChange:    "transform",
          mixBlendMode:  "difference",
          transformOrigin: "4px 2px",
          transition:    "transform 0.15s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <svg
          ref={svgRef}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", transition: "opacity 0.15s ease, transform 0.15s ease" }}
        >
          <path
            d="M4,2 L4,20 L8.5,15.5 L12,23 L14.5,22 L11,14.5 L17,14.5 Z"
            fill="white"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        {/* "VIEW" label — appears near cursor on project hover */}
        <div
          ref={labelRef}
          style={{
            position: "absolute",
            top: -20,
            left: 28,
            padding: "3px 10px",
            borderRadius: 100,
            background: "white",
            color: "black",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            opacity: showLabel ? 1 : 0,
            transform: showLabel ? "translateX(0) scale(1)" : "translateX(-6px) scale(0.8)",
            transition: "opacity 0.2s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            pointerEvents: "none",
            mixBlendMode: "normal",
          }}
        >
          {showLabel}
        </div>
      </div>
    </>
  );
}
