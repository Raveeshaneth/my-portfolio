import { useEffect, useRef } from "react";

/**
 * Two-part custom cursor matching chkstepan.com:
 *  • Inner dot  — 6 px, instant follow
 *  • Outer ring — 36 px, lerp lag, expands on hover
 * Both use mix-blend-mode: difference so they invert over text.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const hovered = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    document.body.style.cursor = "none";

    const DOT_SIZE = 6;
    const RING_SIZE = 34;
    const RING_BIG = 64;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    // Detect hover on interactive elements
    const addHover = (el) => { el.addEventListener("mouseenter", () => { hovered.current = true; }); };
    const removeHover = (el) => { el.addEventListener("mouseleave", () => { hovered.current = false; }); };

    const interactive = document.querySelectorAll("a, button, [role='button'], input, select, textarea, label");
    interactive.forEach(el => { addHover(el); removeHover(el); });

    // rAF loop
    const loop = () => {
      const { x, y } = pos.current;
      const r = ring.current;
      const speed = hovered.current ? 0.1 : 0.14;
      r.x += (x - r.x) * speed;
      r.y += (y - r.y) * speed;

      // Inner dot — instant
      dot.style.transform = `translate(${x - DOT_SIZE / 2}px, ${y - DOT_SIZE / 2}px)`;

      // Outer ring — lagged
      const rSize = hovered.current ? RING_BIG : RING_SIZE;
      ringEl.style.width = rSize + "px";
      ringEl.style.height = rSize + "px";
      ringEl.style.transform = `translate(${r.x - rSize / 2}px, ${r.y - rSize / 2}px)`;

      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId.current = requestAnimationFrame(loop);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const shared = {
    position: "fixed",
    top: 0,
    left: 0,
    borderRadius: "50%",
    mixBlendMode: "difference",
    pointerEvents: "none",
    zIndex: 99999,
    willChange: "transform",
  };

  return (
    <>
      {/* Inner dot — instant */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          ...shared,
          width: 6,
          height: 6,
          background: "#fff",
        }}
      />
      {/* Outer ring — lagged */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          ...shared,
          width: 34,
          height: 34,
          background: "transparent",
          border: "1.5px solid #fff",
          transition: "width 0.25s ease, height 0.25s ease",
        }}
      />
    </>
  );
}
