/**
 * Static SVG grid background — no mouse glow, just clean grid lines.
 * Opacity bumped up slightly for visibility.
 */
export default function GridSpotlight() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
      }}
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="0.75"
          />
        </pattern>
        <mask id="grid-mask">
          <rect width="100%" height="100%" fill="url(#fade)" />
        </mask>
        <radialGradient id="fade" cx="50%" cy="60%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="75%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect
        width="100%" height="100%"
        fill="url(#grid)"
        mask="url(#grid-mask)"
      />
    </svg>
  );
}
