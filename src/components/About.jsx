import aboutBg from "../assets/grid.png";

export default function About() {
  return (
    <section
      id="about"
      className="
        relative
        w-full
        h-full
        overflow-hidden
        bg-black
        flex items-center justify-center
      "
    >
      {/* background grid */}
      <div className="absolute inset-0 opacity-[0.15]">
        <img
          src={aboutBg}
          alt="about background"
          className="w-full h-full object-cover invert"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* content */}
      <div className="relative w-full max-w-[1600px] px-6 md:px-12 lg:px-20 py-12 md:py-0">
        <div className="max-w-4xl">
          
          {/* Header */}
          <div className="mb-8 md:mb-12 lg:mb-16">
            <div className="flex items-baseline gap-4 mb-4">
              <h2 className="font-rockSalt text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] leading-none text-white tracking-tight">
                About
              </h2>
              <span className="text-white/50 text-base md:text-lg lg:text-xl font-light">me</span>
            </div>
            <div className="h-px bg-white/20 max-w-2xl" />
          </div>0

          {/* Content */}
          <div className="space-y-6 md:space-y-8">
            <p className="font-sawarabi text-[16px] md:text-[20px] lg:text-[24px] xl:text-[26px] leading-relaxed text-white/90 font-light">
              I'm a software engineering student with a growing passion for
              UI/UX and frontend development.
            </p>
            
            <p className="font-sawarabi text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] leading-relaxed text-white/70 font-light max-w-3xl">
              I love creating clean, user-friendly interfaces and exploring how real products 
              are designed and built. As I continue learning, my focus is on blending good 
              design with smooth, practical interactions so I can build experiences that feel 
              simple, modern, and intuitive.
            </p>

            {/* Skills/Tags */}
            <div className="flex flex-wrap gap-2 md:gap-3 pt-4">
              {['UI/UX Design', 'Frontend Development', 'Product Design', 'Interaction Design'].map((skill) => (
                <span 
                  key={skill}
                  className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-white/60 border border-white/20 rounded-full backdrop-blur-sm hover:border-white/40 hover:text-white/80 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}