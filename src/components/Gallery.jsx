import { useState, useRef, useEffect } from "react";

/* ── Resolve image URLs lazily ── */
const spicesPost = new URL("../assets/Spices post.png", import.meta.url).href;
const uberOpen = new URL("../assets/Uber Open.png", import.meta.url).href;
const pickmeOpen = new URL("../assets/Pickme open.png", import.meta.url).href;
const favDish = new URL("../assets/467864637_969901351840455_5059158496114166987_n.png", import.meta.url).href;
const offerPost = new URL("../assets/Offer.png", import.meta.url).href;
const launchPost = new URL("../assets/Untitled-32.png", import.meta.url).href;
const boxDesign = new URL("../assets/462-4621020_detpak-small-lunch-box-brown-paper-box3-of.png", import.meta.url).href;

const SHOTS = [
  {
    id: 0,
    image: spicesPost,
    title: "Pure Spices, No MSG",
    client: "Kerala Kottu",
    category: "Social Media Post",
    description: "Bold promotional post highlighting the brand's MSG-free promise with warm spice imagery and strong typography.",
    color: "#8B2500",
  },
  {
    id: 1,
    image: uberOpen,
    title: "Now on Uber Eats",
    client: "Kerala Kottu",
    category: "Launch Announcement",
    description: "Vibrant green launch post announcing Uber Eats availability with delivery mockup and strong call-to-action.",
    color: "#2bac48",
  },
  {
    id: 2,
    image: pickmeOpen,
    title: "Now on PickMe Food",
    client: "Kerala Kottu",
    category: "Launch Announcement",
    description: "Warm orange platform announcement for PickMe Food integration with delivery illustration and app showcase.",
    color: "#f59e0b",
  },
  {
    id: 3,
    image: favDish,
    title: "Favourite Kottu Dish?",
    client: "Kerala Kottu",
    category: "Engagement Post",
    description: "Interactive engagement post using bold typography and food photography to drive audience interaction.",
    color: "#d97706",
  },
  {
    id: 4,
    image: offerPost,
    title: "Special Offer — Free Coca-Cola",
    client: "Kerala Kottu",
    category: "Promotional Post",
    description: "Eye-catching promotional post offering a free Coca-Cola with Kerala Special Kottu, designed to drive orders.",
    color: "#dc2626",
  },
  {
    id: 5,
    image: launchPost,
    title: "Just A Few More Days",
    client: "Kerala Kottu",
    category: "Teaser Campaign",
    description: "Pre-launch teaser post with caution tape motif, food photography, and QR code for updates.",
    color: "#eab308",
  },
  {
    id: 6,
    image: boxDesign,
    title: "Branded Packaging Design",
    client: "Kerala Kottu",
    category: "Packaging Design",
    description: "Custom food box packaging featuring the Kerala Kottu brand logo and QR code for a cohesive brand identity.",
    color: "#a1887f",
    isWide: true,
  },
];

/* ── Grid Card ── */
const GridCard = ({ shot, index, vis, onOpen }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-xl lg:rounded-2xl cursor-pointer ${shot.isWide ? "col-span-2" : ""}`}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + index * 0.06}s`,
      }}
      onClick={() => onOpen(shot)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={shot.image}
        alt={shot.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        style={{
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.08) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.08) 45%, transparent 100%)",
          transition: "background 0.4s ease",
        }}
      />

      {/* Color accent line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-10"
        style={{
          background: shot.color,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Category badge — top right */}
      <div
        className="absolute top-2.5 right-2.5 lg:top-3 lg:right-3 z-10"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(-6px)",
          transition: "all 0.35s ease",
        }}
      >
        <span
          className="px-2.5 py-1 text-[9px] lg:text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full backdrop-blur-md"
          style={{
            color: "#fff",
            background: `${shot.color}cc`,
            border: `1px solid ${shot.color}`,
          }}
        >
          {shot.category}
        </span>
      </div>

      {/* Info — bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 z-10"
        style={{
          transform: hovered ? "translateY(0)" : "translateY(4px)",
          transition: "transform 0.35s ease",
        }}
      >
        {/* Client tag */}
        <div className="flex items-center gap-1.5 mb-1"
          style={{
            opacity: hovered ? 1 : 0.7,
            transition: "opacity 0.3s ease",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: shot.color }} />
          <span className="text-[9px] lg:text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: shot.color }}>
            {shot.client}
          </span>
        </div>
        <h3
          className="text-[13px] md:text-[14px] lg:text-[16px] font-medium text-white leading-tight"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
        >
          {shot.title}
        </h3>
        <p
          className="text-[10px] lg:text-[12px] text-white/65 leading-relaxed line-clamp-2 mt-0.5"
          style={{
            opacity: hovered ? 1 : 0,
            maxHeight: hovered ? "40px" : "0",
            transition: "opacity 0.35s ease 0.05s, max-height 0.35s ease",
            overflow: "hidden",
          }}
        >
          {shot.description}
        </p>
      </div>

      {/* Expand icon on hover */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(0.7)",
          transition: "all 0.3s ease",
        }}
      >
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

/* ── Lightbox Modal ── */
const Lightbox = ({ shot, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all duration-200 cursor-pointer"
        aria-label="Close lightbox"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div
        className="relative max-w-[90vw] max-h-[85vh] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 60px ${shot.color}15` }}
      >
        <img src={shot.image} alt={shot.title} className="w-full h-full object-contain" style={{ maxHeight: "85vh" }} />

        <div
          className="absolute bottom-0 left-0 right-0 p-4 lg:p-6"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: shot.color }} />
            <span className="text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: shot.color }}>
              {shot.client} — {shot.category}
            </span>
          </div>
          <h3 className="text-[18px] lg:text-[24px] font-light text-white mb-1 leading-tight">{shot.title}</h3>
          <p className="text-[12px] lg:text-[14px] text-white/65 max-w-[60ch] leading-relaxed">{shot.description}</p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(to right, transparent, ${shot.color}, transparent)` }} />
      </div>
    </div>
  );
};

/* ── Main Gallery Component ── */
export default function Gallery() {
  const [vis, setVis] = useState(false);
  const [lightboxShot, setLightboxShot] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setVis(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <section id="gallery" ref={ref} className="relative w-full overflow-hidden bg-black" style={{ minHeight: "100vh" }}>
        {/* Grid background */}
        <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <pattern id="gal-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="gal-fade" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="70%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="gal-mask">
              <rect width="100%" height="100%" fill="url(#gal-fade)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#gal-grid)" mask="url(#gal-mask)" />
        </svg>

        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3e2723]/10 via-transparent to-[#8d6e63]/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-screen px-4 md:px-6 lg:px-10 xl:px-14 py-5 lg:py-6">
          {/* Header row */}
          <div
            className="shrink-0 w-full max-w-[1600px] mx-auto mb-3 lg:mb-4"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease",
            }}
          >
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-baseline gap-3 lg:gap-4 mb-2">
                  <h2 className="font-rockSalt text-[28px] md:text-[40px] lg:text-[48px] xl:text-[56px] text-white leading-none">
                    Shots
                  </h2>
                  <span className="text-white/50 text-sm lg:text-lg font-light">client work</span>
                </div>
                <div className="h-px bg-gradient-to-r from-white/40 via-white/15 to-transparent max-w-sm" />
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-[28px] lg:text-[36px] font-light text-white/80 tabular-nums">
                  {String(SHOTS.length).padStart(2, "0")}
                </span>
                <span className="text-white/40 text-xs lg:text-sm uppercase tracking-[0.15em]">posts</span>
              </div>
            </div>
          </div>

          {/* ── Grid ── */}
          <div className="flex-1 w-full max-w-[1600px] mx-auto min-h-0">
            {/* Desktop: 4-column grid — the wide packaging card spans 2 cols */}
            <div className="hidden lg:grid grid-cols-4 gap-3 xl:gap-4 h-full auto-rows-fr">
              {SHOTS.map((shot, i) => (
                <GridCard key={shot.id} shot={shot} index={i} vis={vis} onOpen={setLightboxShot} />
              ))}
            </div>

            {/* Mobile/Tablet: 2-column scrollable grid */}
            <div className="lg:hidden grid grid-cols-2 gap-2.5 md:gap-3 auto-rows-[minmax(140px,1fr)]">
              {SHOTS.map((shot, i) => (
                <GridCard key={shot.id} shot={shot} index={i} vis={vis} onOpen={setLightboxShot} />
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="shrink-0 w-full max-w-[1600px] mx-auto mt-3 lg:mt-4 flex items-center justify-between"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.7s ease 0.3s",
            }}
          >
            <p className="text-white/40 text-[10px] lg:text-[11px] uppercase tracking-[0.15em]">
              <span className="hidden lg:inline">Click</span>
              <span className="lg:hidden">Tap</span>
              {" "}to expand
            </p>

            <a
              href="https://dribbble.com/raveesha-nethmina"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/55 hover:text-white/80 transition-colors duration-300"
              style={{ fontSize: "clamp(10px, 0.9vw, 13px)", letterSpacing: "0.05em" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.245.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
              </svg>
              <span className="hidden md:inline">View all on Dribbble</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {lightboxShot && <Lightbox shot={lightboxShot} onClose={() => setLightboxShot(null)} />}
    </>
  );
}
