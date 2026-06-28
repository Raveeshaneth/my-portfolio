import { useState, useEffect, useRef } from "react";

const experiences = [
  {
    id: 1,
    role: "UI/UX Design Intern",
    company: "Super ITC",
    location: "Horana",
    period: "Oct 2025 — Mar 2026",
    type: "Internship",
    color: "#a1887f",
    description:
      "Designed business software interfaces for POS, Inventory, and Billing systems. Created wireframes and interactive prototypes in Figma, collaborating with developers to deliver user-centered designs for retail and SME clients.",
    tools: ["Figma", "UI Design", "Prototyping", "Business Software"],
  },
  {
    id: 2,
    role: "Freelance Graphic Designer",
    company: "Self-Employed",
    location: "Sri Lanka",
    period: "2023 — Present",
    type: "Freelance",
    color: "#8d6e63",
    description:
      "Created brand identities, logos, and visual assets for multiple clients. Managed social media content pipelines and delivered cohesive branding packages through iterative client collaboration.",
    tools: ["Photoshop", "Canva", "Branding", "Visual Design"],
  },
];

export default function Experience() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVis(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative w-full min-h-[100dvh] lg:min-h-0 lg:h-full overflow-hidden bg-black flex items-center justify-center"
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

      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3e2723]/15 via-transparent to-[#8d6e63]/8" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-20 lg:py-0">
        <div className="w-full max-w-[1100px] mx-auto">
          {/* Title */}
          <div
            className={`mb-8 lg:mb-10 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <div className="flex items-baseline gap-3 lg:gap-4 mb-3">
              <h2 className="font-rockSalt text-[28px] md:text-[40px] lg:text-[56px] xl:text-[64px] text-white leading-none">
                Experience
              </h2>
              <span className="text-white/50 text-sm lg:text-lg font-light">
                journey
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-white/40 via-white/15 to-transparent max-w-md" />
          </div>

          {/* Experience Cards — side by side on desktop */}
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
            {experiences.map((exp, idx) => (
              <div
                key={exp.id}
                className="group relative p-5 lg:p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.035] transition-all duration-500 cursor-default"
                style={{
                  opacity: vis ? 1 : 0,
                  transform: vis ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.3 + idx * 0.15}s`,
                }}
              >
                {/* Type badge */}
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.15em] rounded-full mb-4"
                  style={{
                    color: exp.color,
                    background: `${exp.color}12`,
                    border: `1px solid ${exp.color}25`,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                  </svg>
                  {exp.type}
                </span>

                {/* Role */}
                <h3 className="text-[18px] lg:text-[22px] font-bold text-white leading-tight mb-1 drop-shadow-md">
                  {exp.role}
                </h3>

                {/* Company & Period */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                  <span
                    className="text-[14px] lg:text-[15px] font-bold tracking-wide"
                    style={{ color: exp.color }}
                  >
                    {exp.company}, {exp.location}
                  </span>
                  <span className="text-[12px] lg:text-[13px] text-white/90 font-medium">
                    {exp.period}
                  </span>
                </div>

                {/* Divider */}
                <div
                  className="h-px mb-4"
                  style={{
                    background: `linear-gradient(to right, ${exp.color}20, transparent)`,
                  }}
                />

                {/* Description — single clean paragraph */}
                <p className="text-[14px] lg:text-[15px] text-white/95 leading-relaxed group-hover:text-white drop-shadow-sm transition-colors duration-400 mb-5">
                  {exp.description}
                </p>

                {/* Tools */}
                <div className="flex flex-wrap gap-2">
                  {exp.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 text-[11px] lg:text-[12px] rounded-full border border-white/[0.12] bg-white/[0.04] text-white/60 group-hover:text-white/75 group-hover:border-white/[0.18] transition-all duration-300 cursor-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Corner glow */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="absolute top-0 right-0 w-24 h-24"
                    style={{
                      background: `linear-gradient(to bottom left, ${exp.color}12, transparent)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
