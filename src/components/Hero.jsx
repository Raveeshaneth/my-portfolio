import { useState, useRef } from "react";
import GridSpotlight from "./GridCanvas";
import illustrater from "../assets/illustrater.webp";

function MagneticButton({ children, href, download, target, rel, className }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // magnetic pull strength
    const x = (clientX - centerX) * 0.25;
    const y = (clientY - centerY) * 0.25;
    setPos({ x, y });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <a
      ref={ref}
      href={href}
      download={download}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: pos.x === 0 && pos.y === 0 ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
        willChange: "transform",
      }}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  return (
    <section
      className="
        relative
        w-full
        h-full
        overflow-hidden
        bg-white
      "
    >
      {/* Interactive grid spotlight */}
      <div className="absolute inset-0 overflow-hidden">
        <GridSpotlight />
      </div>

      {/* Sparkles/Paint dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[8%] w-2 h-2 bg-[#8d6e63] rounded-full opacity-40" style={{ animation: 'pulse 6s ease-in-out infinite' }} />
        <div className="absolute top-[15%] left-[8%] w-3 h-3 border border-[#8d6e63] rounded-full opacity-20" />
        <div className="absolute top-[25%] right-[12%] w-2.5 h-2.5 bg-[#a1887f] rounded-full opacity-40" style={{ animation: 'pulse 8s ease-in-out infinite 1s' }} />
        <div className="absolute top-[25%] right-[12%] w-4 h-4 border border-[#a1887f] rounded-full opacity-20" />
        <div className="absolute top-[60%] left-[15%] w-2 h-2 bg-[#6d4c41] rounded-full opacity-40" style={{ animation: 'pulse 7s ease-in-out infinite 0.5s' }} />
        <div className="absolute top-[60%] left-[15%] w-3.5 h-3.5 border border-[#6d4c41] rounded-full opacity-20" />
        <div className="absolute bottom-[20%] right-[20%] w-2 h-2 bg-[#8d6e63] rounded-full opacity-40" style={{ animation: 'pulse 8s ease-in-out infinite 1.5s' }} />
        <div className="absolute bottom-[20%] right-[20%] w-3 h-3 border border-[#8d6e63] rounded-full opacity-20" />
      </div>

      {/* content */}
      <div className="relative w-full h-full flex items-center justify-center px-6 md:px-12 lg:px-20 pt-24 pb-12 md:py-20">
        <div className="w-full max-w-[1600px]">

          {/* Mobile Layout: Column */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-4 pt-4 md:pt-8">
            {/* Text First on Mobile */}
            <div className="space-y-3 z-10 w-full">
              {/* Available for Work Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white backdrop-blur-sm rounded-full border border-black/15 shadow-lg mb-3 will-change-auto">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-slow-blink" />
                <p className="text-[10px] text-black/80 uppercase tracking-[0.2em] font-bold">
                  Available for Work
                </p>
              </div>

              {/* Name first, then title — better personal branding */}
              <p className="font-rockSalt text-[18px] md:text-[24px] text-black/85 leading-tight px-4">
                Hi, I'm <span className="bg-gradient-to-r from-[#6d4c41] to-[#8d6e63] bg-clip-text text-transparent">Raveesha</span>
              </p>

              <h1 className="font-extrabold text-[40px] md:text-[60px] leading-[0.95] tracking-tighter px-4">
                <span className="text-[#3e2723]">UI/UX</span>
                <br />
                <span className="bg-gradient-to-r from-[#6d4c41] via-[#8d6e63] to-[#a1887f] bg-clip-text text-transparent">Designer</span>
              </h1>

              <div className="h-px bg-gradient-to-r from-transparent via-[#6d4c41]/30 to-transparent w-48 mx-auto" />

              <p className="text-[13px] md:text-base text-black/60 max-w-sm mx-auto leading-relaxed px-6">
                Crafting intuitive digital experiences that blend
                <span className="font-semibold"> aesthetics</span> with
                <span className="font-semibold"> functionality</span>.
                Software Engineering undergraduate at NIBM.
              </p>

              {/* CTA Buttons */}
              <div className="pt-1 flex flex-wrap justify-center gap-3">
                <MagneticButton
                  href="/Raveesha%20Nethmina%20UIUX%20Intern%20CV.pdf"
                  download="Raveesha Nethmina UIUX Intern CV.pdf"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#3e2723] to-[#4e342e] text-white rounded-full font-semibold shadow-xl text-[15px]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </MagneticButton>
                <MagneticButton
                  href="https://dribbble.com/raveesha-nethmina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-[#3e2723]/20 text-[#3e2723] rounded-full font-semibold hover:bg-[#3e2723]/5 text-[15px]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.245.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
                  </svg>
                  Dribbble
                </MagneticButton>
              </div>
            </div>

            {/* Illustration After on Mobile */}
            <div className="relative w-full max-w-[280px] md:max-w-[360px] mt-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6d4c41]/25 via-[#8d6e63]/20 to-[#a1887f]/15 rounded-full blur-3xl will-change-auto" />
              <img
                src={illustrater}
                alt="Raveesha Nethmina illustration"
                className="relative w-full h-auto object-contain"
                loading="eager"
                decoding="sync"
                width="560"
                height="640"
                style={{
                  filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.1))'
                }}
              />
            </div>
          </div>

          {/* Desktop Layout: Two Columns */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_1.1fr] gap-16 xl:gap-20 items-center">

            {/* Left: Text */}
            <div className="space-y-8 z-10 pt-12 lg:pt-16">
              <div className="space-y-3">
                {/* Available for Work Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-full border border-black/10 shadow-lg mb-4 will-change-auto">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-slow-blink" />
                  <p className="text-[11px] text-black/75 uppercase tracking-[0.25em] font-bold">
                    Available for Work
                  </p>
                </div>

                {/* Name first — personal brand */}
                <p className="font-rockSalt text-[28px] xl:text-[32px] text-black/85 leading-tight">
                  Hi,<span className="bg-gradient-to-r from-gray-800 to-[#6d4c41] bg-clip-text text-transparent"> I'm Raveesha</span>
                </p>

                <h1 className="font-extrabold text-[80px] xl:text-[96px] 2xl:text-[110px] leading-[0.95] tracking-tighter">
                  <span className="text-[#3e2723]">UI/UX</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#3e2723] via-[#6d4c41] to-[#a1887f] bg-clip-text text-transparent">Designer</span>
                </h1>
              </div>

              <div className="h-px bg-gradient-to-r from-[#6d4c41]/30 via-[#8d6e63]/40 to-transparent max-w-md" />

              <div className="space-y-3">
                <p className="text-lg text-black/60 max-w-lg leading-relaxed">
                  Crafting intuitive digital experiences that blend
                  <span className="font-semibold text-black/70"> aesthetics</span> with
                  <span className="font-semibold text-black/70"> functionality</span>.
                  A <span className="font-semibold text-black/70">Software Engineering</span> undergraduate at <span className="font-semibold text-black/70">NIBM</span>,
                  with a 6-month internship at <span className="font-semibold text-black/70">Super ITC</span>,
                  specializing in <span className="font-semibold text-black/70">user-centered design</span> and modern interfaces.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <MagneticButton
                  href="/Raveesha%20Nethmina%20UIUX%20Intern%20CV.pdf"
                  download="Raveesha Nethmina UIUX Intern CV.pdf"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3e2723] to-[#4e342e] text-white rounded-full font-semibold shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </MagneticButton>
                <MagneticButton
                  href="https://dribbble.com/raveesha-nethmina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-4 border-2 border-[#3e2723]/20 text-[#3e2723] rounded-full font-semibold hover:bg-[#3e2723]/5"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.245.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
                  </svg>
                  Dribbble
                </MagneticButton>
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="relative flex items-end justify-end self-end pb-0" style={{ marginBottom: '-90px' }}>
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#6d4c41]/30 via-[#8d6e63]/25 to-[#a1887f]/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#8d6e63]/20 via-[#a1887f]/15 to-transparent rounded-full blur-3xl" style={{ marginRight: '-100px', marginBottom: '-100px' }} />
              <div className="absolute top-20 right-10 w-20 h-20 bg-[#6d4c41]/20 rounded-2xl blur-2xl" />
              <div className="absolute top-40 right-60 w-16 h-16 bg-[#8d6e63]/15 rounded-full blur-2xl" />

              <img
                src={illustrater}
                alt="Raveesha Nethmina illustration"
                className="relative w-[480px] xl:w-[560px] 2xl:w-[520px] h-auto object-contain object-bottom"
                loading="eager"
                decoding="sync"
                width="560"
                height="640"
                style={{
                  filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.1))',
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" style={{ animation: 'bounce 2s infinite' }}>
        <span className="text-[10px] uppercase tracking-wider text-black/30 font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-black/20 to-transparent" />
      </div>
    </section>
  );
}