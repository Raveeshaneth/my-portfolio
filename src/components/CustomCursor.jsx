import { useEffect, useRef } from "react";

/**
 * SVG arrow cursor that auto-inverts colour via mix-blend-mode: difference.
 * White arrow  →  appears BLACK on white/light backgrounds
 *              →  appears WHITE on black/dark backgrounds
 *
 * Desktop only — App.jsx mounts this only when !isMobile.
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const pos       = useRef({ x: -200, y: -200 });
  const rafId     = useRef(null);
  const hovered   = useRef(false);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    // Hide the native OS cursor everywhere
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    // Scale up slightly on interactive elements
    const onEnter = () => { hovered.current = true; };
    const onLeave = () => { hovered.current = false; };

    const attachHover = () => {
      document.querySelectorAll(
        "a, button, [role='button'], input, select, textarea, label"
      ).forEach((node) => {
        node.addEventListener("mouseenter", onEnter);
        node.addEventListener("mouseleave", onLeave);
      });
    };
    attachHover();

    // Re-attach after GSAP / dynamic content changes
    const mo = new MutationObserver(attachHover);
    mo.observe(document.body, { childList: true, subtree: true });

    // rAF loop — instant follow (no lag, it's an arrow not a ring)
    const loop = () => {
      const { x, y } = pos.current;
      const scale = hovered.current ? 1.18 : 1;
      // Hotspot is at (4,2) inside the 24×26 SVG, so offset by that amount
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
      {/* Inject cursor:none on every element so Tailwind classes can't override */}
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
          transformOrigin: "4px 2px",   // matches the SVG hotspot
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
          {/* Arrow path — tip at (4,2), hotspot origin */}
          <path
            d="M4,2 L4,20 L8.5,15.5 L12,23 L14.5,22 L11,14.5 L17,14.5 Z"
            fill="white"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
}
