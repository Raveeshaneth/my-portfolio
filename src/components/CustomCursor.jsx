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
  const rafId     = useRef(null);
  const hovered   = useRef(false);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => { hovered.current = true; };
    const onLeave = () => { hovered.current = false; };

    // Project card hover — show "VIEW" label
    const onProjectEnter = () => { hovered.current = true; setShowLabel(true); };
    const onProjectLeave = () => { hovered.current = false; setShowLabel(false); };

    const attachHover = () => {
      document.querySelectorAll(
        "a, button, [role='button'], input, select, textarea, label"
      ).forEach((node) => {
        node.addEventListener("mouseenter", onEnter);
        node.addEventListener("mouseleave", onLeave);
      });

      // Attach to project cards specifically
      document.querySelectorAll("[data-cursor='view']").forEach((node) => {
        node.addEventListener("mouseenter", onProjectEnter);
        node.addEventListener("mouseleave", onProjectLeave);
      });
    };
    attachHover();

    const mo = new MutationObserver(attachHover);
    mo.observe(document.body, { childList: true, subtree: true });

    const loop = () => {
      const { x, y } = pos.current;
      const scale = hovered.current ? 1.18 : 1;
      el.style.transform = `translate(${x - 4}px, ${y - 2}px) scale(${scale})`;
      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId.current = requestAnimationFrame(loop);

    return () => {
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>

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
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="26"
          viewBox="0 0 24 26"
          style={{ display: "block" }}
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
            top: -8,
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
          VIEW
        </div>
      </div>
    </>
  );
}
