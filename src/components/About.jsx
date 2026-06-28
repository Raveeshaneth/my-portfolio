import { useState, useEffect, useRef } from "react";

/* ── Minimal SVG Icons ── */
const Icon = ({ type }) => {
  const icons = {
    figma: <path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5zM12 2h3.5a3.5 3.5 0 110 7H12V2zm0 12.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zm0-5.5h3.5a3.5 3.5 0 110 7H12V9zM5 12a3.5 3.5 0 003.5 3.5H12V9H8.5A3.5 3.5 0 005 12z" />,
    photoshop: <><rect x="2" y="2" width="20" height="20" rx="2" /><text x="6" y="16" fontSize="10" fontWeight="bold" fill="currentColor" stroke="none">Ps</text></>,
    xd: <><rect x="2" y="2" width="20" height="20" rx="2" /><text x="5" y="16" fontSize="10" fontWeight="bold" fill="currentColor" stroke="none">Xd</text></>,
    canva: <><circle cx="12" cy="12" r="10" /><text x="6" y="16" fontSize="9" fontWeight="bold" fill="currentColor" stroke="none">Ca</text></>,
    uiux: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    interaction: <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />,
    product: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></>,
    frontend: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="14" y1="4" x2="10" y2="20" /></>,
    react: <><circle cx="12" cy="12" r="2.5" /><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /></>,
    code: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>,
    graduation: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 3.5 3 6 3s6-1 6-3v-5" /></>,
  };
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  );
};

const skillCategories = [
  {
    label: "Design Tools",
    items: [
      { name: "Figma", icon: "figma" },
      { name: "Photoshop", icon: "photoshop" },
      { name: "Adobe XD", icon: "xd" },
      { name: "Canva", icon: "canva" },
    ],
  },
  {
    label: "UX Methods",
    items: [
      { name: "Wireframing", icon: "uiux" },
      { name: "Prototyping", icon: "interaction" },
      { name: "User Flows", icon: "interaction" },
      { name: "Design Systems", icon: "uiux" },
      { name: "Usability Testing", icon: "product" },
    ],
  },
  {
    label: "Development",
    items: [
      { name: "HTML/CSS", icon: "frontend" },
      { name: "Java", icon: "code" },
      { name: "C#", icon: "code" },
      { name: "Firebase", icon: "database" },
    ],
  },
];

const education = [
  {
    degree: "BSc (Hons) Software Engineering",
    institution: "National Institute of Business Management",
    period: "November 2023 — Present",
  },
  {
    degree: "Advanced Level — Maths Stream",
    institution: "St. Sebastian's College, Moratuwa",
    period: "2022",
  },
];

/* ── Grid background for dark sections ── */
const DarkGrid = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none"
  >
    <defs>
      <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.5"
        />
      </pattern>
      <radialGradient id="about-grid-fade" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="70%" stopColor="white" stopOpacity="0.5" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
      <mask id="about-grid-mask">
        <rect width="100%" height="100%" fill="url(#about-grid-fade)" />
      </mask>
    </defs>
    <rect
      width="100%" height="100%"
      fill="url(#about-grid)"
      mask="url(#about-grid-mask)"
    />
  </svg>
);

export default function About() {
  const [vis, setVis] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const bodyContainerRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setVis(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Listen for GSAP horizontal scroll progress (desktop only)
  useEffect(() => {
    const handler = (e) => {
      const p = e.detail.progress;
      // Slide only the body content, not the title
      if (bodyContainerRef.current) {
        bodyContainerRef.current.style.transform = `translateX(${-p * 50}%)`;
      }
      setActiveCard(p >= 0.5 ? 1 : 0);
    };
    window.addEventListener("aboutSubScroll", handler);
    return () => window.removeEventListener("aboutSubScroll", handler);
  }, []);

  /* Subtitle text that transitions */
  const subtitles = ["me", "edu background"];

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full h-full overflow-hidden bg-black"
    >
      {/* ═══════ SLEEK DARK GRID BACKGROUND ═══════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Ambient Glow (Toned down) */}
        <div className="absolute top-[-10%] left-[10%] w-[50%] h-[50%] bg-[#8d6e63]/5 blur-[120px] rounded-full" />
        
        {/* Base Grid - Subtle but visible */}
        <div className="absolute inset-0 opacity-[0.12]" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '4vw 4vw',
          maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)'
        }} />
        {/* Top Edge Glow - Toned down */}
        <div className="absolute top-0 left-[10%] w-[80%] h-[400px] bg-gradient-to-b from-[#8d6e63]/10 via-[#6d4c41]/5 to-transparent blur-3xl opacity-60" />
      </div>

      {/* ═══════ MOBILE LAYOUT — stacked vertical ═══════ */}
      <div className="lg:hidden px-6 py-16 space-y-10">
        {/* Fixed Title */}
        <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-baseline gap-3 mb-4">
            <h2 className="font-rockSalt text-[28px] md:text-[40px] text-white leading-none">About</h2>
            <span className="text-white/50 text-sm font-light">me</span>
          </div>
          <div className="h-px bg-gradient-to-r from-white/40 via-white/15 to-transparent max-w-xs mb-6" />
        </div>

        {/* Body: About Me */}
        <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-[14px] md:text-[16px] leading-relaxed text-white mb-4">
            I'm <span className="text-[#d7ccc8] font-bold">Raveesha Nethmina</span> — a
            UI/UX designer who believes great design makes complex things feel simple.
            With hands-on experience across web, mobile, and desktop platforms,
            I craft interfaces that put users first.
          </p>
          <p className="text-[13px] md:text-[14px] leading-relaxed text-white/95 mb-6">
            After a 6-month internship at <span className="text-[#d7ccc8] font-bold">Super ITC</span>,
            I've learned to translate real business needs into clean, functional designs.
            From wireframes to polished prototypes — I deliver end-to-end design solutions.
          </p>

          {/* Stats */}
          <div className="flex gap-3 mb-6">
            {[
              { v: "7+", l: "Projects" },
              { v: "3+", l: "Years" },
              { v: "6", l: "Mo. Internship" },
            ].map((s) => (
              <div key={s.l} className="flex-1 text-center py-3 rounded-xl border border-white/[0.06] bg-black/80 backdrop-blur-md">
                <p className="text-[22px] font-light text-white/90 leading-none mb-1">{s.v}</p>
                <p className="text-[8px] uppercase tracking-[0.2em] text-white/50">{s.l}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          {skillCategories.map((cat) => (
            <div key={cat.label} className="mb-4">
              <h3 className="text-[9px] uppercase tracking-[0.25em] text-white/55 mb-2">{cat.label}</h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((sk) => (
                  <span key={sk.name} className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] text-white/70 border border-white/[0.10] bg-white/[0.04] rounded-full">
                    <span className="text-white/50"><Icon type={sk.icon} /></span>
                    {sk.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Body: Education & Background */}
        <div className={`transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#a1887f]/80 font-semibold mb-4">Education & Background</h3>

          <div className="relative space-y-4 mb-8 pl-1">
            {/* Vertical timeline line */}
            <div className="absolute left-2.5 top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#8d6e63] via-white/10 to-transparent" />

            {/* Card 1 */}
            <div className="relative pl-7">
              <div className="absolute left-1.5 top-2.5 w-2 h-2 rounded-full bg-[#8d6e63] shadow-[0_0_10px_#8d6e63] ring-4 ring-[#8d6e63]/20" />
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <h4 className="text-white font-semibold text-[13px] leading-snug">BSc (Hons) Software Engineering</h4>
                </div>
                <span className="inline-block text-[#a1887f] text-[9px] font-bold tracking-widest uppercase bg-[#8d6e63]/10 px-2 py-0.5 rounded-full mb-2">Present</span>
                <p className="text-white/60 text-[12px] leading-snug">National Institute of Business Management</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative pl-7">
              <div className="absolute left-1.5 top-2.5 w-2 h-2 rounded-full bg-white/20 ring-4 ring-white/5" />
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <h4 className="text-white/80 font-medium text-[13px] leading-snug">Advanced Level — Maths Stream</h4>
                </div>
                <span className="inline-block text-white/40 text-[9px] font-bold tracking-widest uppercase border border-white/10 px-2 py-0.5 rounded-full mb-2">2022</span>
                <p className="text-white/50 text-[12px] leading-snug">St. Sebastian's College, Moratuwa</p>
              </div>
            </div>
          </div>

          {/* Soft Skills */}
          <h3 className="text-[9px] uppercase tracking-[0.25em] text-white/55 mb-2">Soft Skills</h3>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {["Attention to Detail", "Collaboration", "Problem Solving", "Visual Communication", "Fast Learner"].map((s) => (
              <span key={s} className="px-2.5 py-1 text-[11px] text-white/65 border border-white/[0.10] rounded-full">{s}</span>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.03]">
            <p className="text-[12px] text-white/60 leading-relaxed italic">
              "I design for people first, pixels second. Every decision is grounded in empathy
              and refined until the experience feels invisible."
            </p>
            <p className="text-[9px] text-[#a1887f]/65 mt-2 uppercase tracking-[0.2em]">— Design Philosophy</p>
          </div>
        </div>
      </div>

      {/* ═══════ DESKTOP LAYOUT ═══════ */}
      {/* Fixed Title — stays in place, never scrolls */}
      <div className="hidden lg:block absolute top-0 left-0 right-0 z-10 px-16 xl:px-24 pt-[12vh]">
        <div className="max-w-[1100px] mx-auto">
          <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-baseline gap-5 mb-4">
              <h2 className="font-rockSalt text-[56px] xl:text-[64px] text-white leading-none">About</h2>
              {/* Subtitle crossfade */}
              <div className="relative h-[30px] overflow-hidden min-w-[250px] self-end mb-2">
                {subtitles.map((sub, i) => (
                  <span
                    key={sub}
                    className="absolute left-0 top-0 text-white/50 text-sm lg:text-lg font-light whitespace-nowrap transition-all duration-500 ease-out"
                    style={{
                      opacity: activeCard === i ? 1 : 0,
                      transform: activeCard === i ? "translateY(0)" : activeCard > i ? "translateY(-100%)" : "translateY(100%)",
                    }}
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-white/40 via-white/15 to-transparent max-w-md" />
          </div>
        </div>
      </div>

      {/* Scrollable body content — slides horizontally via GSAP */}
      <div
        ref={bodyContainerRef}
        className="hidden lg:flex absolute inset-0 will-change-transform"
        style={{ width: "200%", paddingTop: "35vh" }}
      >
        {/* ── Body 1: About Me ── */}
        <div className="w-1/2 h-full flex items-start justify-center px-16 xl:px-24">
          <div className="w-full max-w-[1100px]">
            <div className={`grid grid-cols-[1.1fr_1fr] gap-12 xl:gap-16 transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              {/* Left: Bio + Stats */}
              <div className="space-y-6">
                <p className="text-[17px] xl:text-[20px] leading-relaxed text-white drop-shadow-md">
                  I'm <span className="text-white font-bold tracking-wide">Raveesha Nethmina</span> — a
                  UI/UX designer who believes great design makes complex things feel
                  <em className="text-[#e2d4cf] not-italic font-bold"> simple</em>.
                  With hands-on experience across web, mobile, and desktop platforms,
                  I craft interfaces that put users first.
                </p>
                <p className="text-[15px] xl:text-[17px] leading-relaxed text-white/95 drop-shadow-sm">
                  After a 6-month internship at <span className="text-white font-bold">Super ITC</span>,
                  I've learned to translate real business needs into clean, functional designs.
                  From wireframes to polished prototypes — I deliver end-to-end UX solutions.
                </p>

                {/* Stats */}
                <div className="flex gap-4">
                  {[
                    { v: "7+", l: "Projects" },
                    { v: "3+", l: "Years" },
                    { v: "6", l: "Mo. Internship" },
                  ].map((s) => (
                    <div key={s.l} className="flex-1 text-center py-4 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-md hover:bg-black/90 hover:border-white/30 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-400">
                      <p className="text-[28px] font-bold text-white leading-none mb-1">{s.v}</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d7ccc8]">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Skills */}
              <div className="space-y-5">
                {skillCategories.map((cat, catIdx) => (
                  <div key={cat.label}>
                    <h3 className="text-[9px] uppercase tracking-[0.25em] text-white/55 mb-2.5">{cat.label}</h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((sk, i) => (
                        <span
                          key={sk.name}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-white/70 border border-white/[0.10] bg-white/[0.04] rounded-full hover:border-[#8d6e63]/40 hover:text-white/85 hover:bg-[#a1887f]/[0.08] transition-all duration-300 cursor-default"
                          style={{
                            opacity: vis ? 1 : 0,
                            transform: vis ? "translateY(0)" : "translateY(6px)",
                            transition: `all 0.35s ease ${0.4 + catIdx * 0.1 + i * 0.04}s`,
                          }}
                        >
                          <span className="text-white/50"><Icon type={sk.icon} /></span>
                          {sk.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll hint */}
            <div className="mt-8 flex items-center gap-2 text-white/40 text-[11px]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <span className="tracking-wider uppercase">Scroll to see more</span>
            </div>
          </div>
        </div>

        {/* ── Body 2: Education & Background ── */}
        <div className="w-1/2 h-full flex items-start justify-center px-16 xl:px-24">
          <div className="w-full max-w-[1100px]">
            <div className="grid grid-cols-[1fr_1fr] gap-12 xl:gap-16">
              {/* Left: Education timeline */}
              <div className="relative space-y-6">
                {/* Vertical timeline line */}
                <div className="absolute left-2.5 top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#8d6e63] via-white/10 to-transparent" />

                {/* Card 1 */}
                <div className="relative pl-10 group">
                  <div className="absolute left-1.5 top-3 w-2 h-2 rounded-full bg-[#8d6e63] shadow-[0_0_10px_#8d6e63] ring-4 ring-[#8d6e63]/20 transition-all group-hover:scale-125" />
                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h4 className="text-white font-semibold text-[16px] xl:text-[18px]">BSc (Hons) Software Engineering</h4>
                      <span className="text-[#a1887f] text-[10px] font-bold tracking-widest uppercase bg-[#8d6e63]/10 px-2 py-1 rounded-full whitespace-nowrap">Present</span>
                    </div>
                    <p className="text-white/60 text-[14px]">National Institute of Business Management</p>
                    <p className="text-white/40 text-[12px] mt-2">Started Nov 2023</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="relative pl-10 group">
                  <div className="absolute left-1.5 top-3 w-2 h-2 rounded-full bg-white/20 ring-4 ring-white/5 transition-all group-hover:bg-white/40 group-hover:scale-125" />
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h4 className="text-white/80 font-medium text-[16px] xl:text-[18px]">Advanced Level — Maths Stream</h4>
                      <span className="text-white/30 text-[10px] font-bold tracking-widest uppercase border border-white/10 px-2 py-1 rounded-full whitespace-nowrap">2022</span>
                    </div>
                    <p className="text-white/50 text-[14px]">St. Sebastian's College, Moratuwa</p>
                  </div>
                </div>

                {/* Design Philosophy */}
                <div className="mt-8 relative pl-10">
                  <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.03]">
                    <p className="text-[13px] text-white/60 leading-relaxed italic">
                      "I design for people first, pixels second. Every decision is grounded in
                      empathy and refined until the experience feels invisible."
                    </p>
                    <p className="text-[9px] text-[#a1887f]/65 mt-2 uppercase tracking-[0.2em]">— Design Philosophy</p>
                  </div>
                </div>
              </div>

              {/* Right: Soft Skills + Values */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-[9px] uppercase tracking-[0.25em] text-white/55 mb-3">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Attention to Detail", "Collaboration", "Problem Solving", "Visual Communication", "Fast Learner"].map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1.5 text-[12px] text-white/65 border border-white/[0.10] bg-white/[0.04] rounded-full hover:border-[#a1887f]/40 hover:text-white/80 transition-all duration-300 cursor-default"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[9px] uppercase tracking-[0.25em] text-white/55 mb-3">UI Principles</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Responsive Design", "WCAG / Accessibility", "Component Libraries", "Design Systems"].map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1.5 text-[12px] text-white/75 border border-white/20 bg-white/[0.06] rounded-full hover:border-[#a1887f]/60 hover:text-white transition-all duration-300 cursor-default"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Progress dots (desktop only) ── */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 gap-2 z-10">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-400"
            style={{
              width: activeCard === i ? 24 : 8,
              height: 8,
              background: activeCard === i ? "#a1887f" : "rgba(255,255,255,0.1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
