import { useState, useEffect } from "react";
import aboutBg from "../assets/grid.png";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = [
    { name: "UI/UX Design", icon: "🎨" },
    { name: "Frontend Development", icon: "💻" },
    { name: "Product Design", icon: "📱" },
    { name: "Interaction Design", icon: "✨" },
  ];

  return (
    <section
      id="about"
      className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.15]">
        <img
          src={aboutBg}
          alt="about background"
          className="w-full h-full object-cover invert"
        />
      </div>

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Accent glows */}
      <div className="absolute top-24 right-24 w-36 h-36 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 left-32 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative w-full max-w-[1400px] px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-4xl">

          {/* Header */}
          <div
            className={`mb-14 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-baseline gap-4 mb-6">
              <h2 className="font-rockSalt text-[48px] md:text-[64px] lg:text-[80px] text-white">
                About
              </h2>
              <span className="text-white/50 text-lg font-light">me</span>
            </div>
            <div className="h-px bg-gradient-to-r from-white/40 via-white/20 to-transparent max-w-xl" />
          </div>

          {/* Main content */}
          <div
            className={`space-y-10 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <p className="font-sawarabi text-[18px] md:text-[22px] lg:text-[26px] leading-relaxed text-white/95">
              I'm a{" "}
              <span className="text-white font-normal">
                software engineering student
              </span>{" "}
              with a strong interest in UI/UX and frontend development.
            </p>

            <p className="font-sawarabi text-[15px] md:text-[17px] lg:text-[19px] leading-relaxed text-white/70 max-w-3xl">
              I enjoy designing clean, modern interfaces and learning how real
              products are crafted from idea to execution. My goal is to combine
              thoughtful design with smooth interactions to build experiences
              that feel simple, intuitive, and meaningful.
            </p>

            {/* Divider */}
            <div className="h-px w-24 bg-gradient-to-r from-white/40 to-transparent" />

            {/* Skills */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
                Focus Areas
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={skill.name}
                    className="px-5 py-2.5 text-sm text-white/70 border border-white/20 rounded-full backdrop-blur-sm hover:border-white/50 hover:text-white transition-all duration-300"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <span className="mr-2">{skill.icon}</span>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
