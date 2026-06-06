import { useState, useEffect, useRef } from "react";

/* ── Minimal SVG Icons ── */
const Icon = ({ type }) => {
  const d = {
    uiux: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    frontend: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="14" y1="4" x2="10" y2="20" /></>,
    product: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></>,
    interaction: <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />,
  };
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {d[type]}
    </svg>
  );
};

export default function About() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setVis(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const skills = [
    { name: "UI/UX Design", icon: "uiux" },
    { name: "Frontend Dev", icon: "frontend" },
    { name: "Product Design", icon: "product" },
    { name: "Interaction", icon: "interaction" },
  ];

  const tools = [
    { name: "Figma", level: 92 },
    { name: "Photoshop", level: 85 },
    { name: "React", level: 80 },
    { name: "Tailwind", level: 88 },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full h-full overflow-hidden bg-black"
    >
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3e2723]/20 via-transparent to-[#8d6e63]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

      {/* Floating accents */}
      <div className="hidden lg:block absolute top-[12%] right-[8%] w-28 h-28 border border-white/[0.03] rounded-full" />
      <div className="hidden lg:block absolute bottom-[15%] right-[12%] w-16 h-16 border border-[#8d6e63]/8 rounded-xl rotate-45" />
      <div className="hidden lg:block absolute top-[55%] left-[3%] w-1.5 h-1.5 bg-[#a1887f]/25 rounded-full" style={{ animation: 'pulse 4s ease-in-out infinite' }} />

      {/* Content — absolutely centered, no scroll */}
      <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12 lg:px-16">
        <div className="w-full max-w-[1300px]">

          {/* Header */}
          <div className={`mb-5 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="font-rockSalt text-[26px] md:text-[36px] lg:text-[48px] text-white leading-none">About</h2>
              <span className="text-white/35 text-sm font-light">me</span>
            </div>
            <div className="h-px bg-gradient-to-r from-white/25 via-white/8 to-transparent max-w-sm" />
          </div>

          {/* Main grid — 2 columns */}
          <div className={`grid lg:grid-cols-2 gap-5 lg:gap-10 transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

            {/* Left */}
            <div className="space-y-4">
              <p className="font-sawarabi text-[13px] md:text-[15px] lg:text-[17px] leading-relaxed text-white/85">
                I'm a <span className="text-white font-medium">software engineering student</span> passionate about
                crafting intuitive digital experiences through UI/UX design.
              </p>

              {/* Stats — inline row */}
              <div className="flex gap-2.5">
                {[
                  { v: "5+", l: "Projects" },
                  { v: "2+", l: "Years" },
                  { v: "4", l: "Tools" },
                ].map((s) => (
                  <div key={s.l} className="flex-1 text-center py-2 rounded-lg border border-white/[0.05] bg-white/[0.02] hover:border-[#8d6e63]/15 transition-all duration-400">
                    <p className="text-[18px] lg:text-[20px] font-light text-white/80 leading-none mb-0.5">{s.v}</p>
                    <p className="text-[7px] lg:text-[8px] uppercase tracking-[0.2em] text-white/30">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-[8px] lg:text-[9px] uppercase tracking-[0.25em] text-white/35 mb-2">Focus Areas</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((sk, i) => (
                    <span
                      key={sk.name}
                      className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] lg:text-[11px] text-white/55 border border-white/[0.06] bg-white/[0.02] rounded-full hover:border-[#8d6e63]/30 hover:text-white/75 transition-all duration-300 cursor-default"
                      style={{
                        opacity: vis ? 1 : 0,
                        transform: vis ? "translateY(0)" : "translateY(6px)",
                        transition: `all 0.35s ease ${0.35 + i * 0.06}s`,
                      }}
                    >
                      <span className="text-white/35"><Icon type={sk.icon} /></span>
                      {sk.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h3 className="text-[8px] lg:text-[9px] uppercase tracking-[0.25em] text-white/35 mb-2">Tools</h3>
                <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                  {tools.map((t, i) => (
                    <div key={t.name} className="space-y-0.5">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[10px] text-white/60 font-medium">{t.name}</span>
                        <span className="text-[7px] text-white/20 font-mono">{t.level}%</span>
                      </div>
                      <div className="h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#6d4c41] to-[#a1887f]"
                          style={{
                            width: vis ? `${t.level}%` : "0%",
                            transition: `width 0.7s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.08}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Design Process as a visual card grid */}
            <div>
              <h3 className="text-[8px] lg:text-[9px] uppercase tracking-[0.25em] text-white/35 mb-3">Design Process</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { n: "01", t: "Research", d: "User interviews, competitive analysis & understanding the problem space", icon: "🔍" },
                  { n: "02", t: "Ideate", d: "Sketching concepts, exploring solutions & defining information architecture", icon: "💡" },
                  { n: "03", t: "Design", d: "High-fidelity prototypes in Figma with design system components", icon: "🎨" },
                  { n: "04", t: "Test & Iterate", d: "Usability testing, gathering feedback & refining the experience", icon: "🔄" },
                ].map((step, i) => (
                  <div
                    key={step.n}
                    className="group relative p-4 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:border-[#8d6e63]/20 hover:bg-[#8d6e63]/[0.04] transition-all duration-500 cursor-default"
                    style={{
                      opacity: vis ? 1 : 0,
                      transform: vis ? "translateY(0) scale(1)" : "translateY(12px) scale(0.97)",
                      transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.1}s`,
                    }}
                  >
                    {/* Step number */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-mono font-bold text-[#a1887f]/50 tracking-wider">{step.n}</span>
                      <span className="text-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300">{step.icon}</span>
                    </div>
                    <h4 className="text-[12px] lg:text-[13px] font-semibold text-white/80 mb-1 tracking-tight">{step.t}</h4>
                    <p className="text-[9px] lg:text-[10px] text-white/30 leading-relaxed group-hover:text-white/45 transition-colors duration-300">{step.d}</p>

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-6 h-6 overflow-hidden rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#8d6e63]/15 to-transparent" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
