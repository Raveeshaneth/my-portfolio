import grid from "../assets/grid.png";
import illustrater from "../assets/illustrater.png";

export default function Hero() {
  return (
    <section
      className="
        relative
        w-full
        h-full
        overflow-hidden
        bg-[#fafafa]
      "
    >
      {/* background grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <img
          src={grid}
          alt="grid background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Sparkles/Paint dots spread across screen */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top left sparkle */}
        <div className="absolute top-[15%] left-[8%] w-2 h-2 bg-[#8d6e63] rounded-full opacity-40 animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[15%] left-[8%] w-3 h-3 border border-[#8d6e63] rounded-full opacity-20" />
        
        {/* Top right sparkle */}
        <div className="absolute top-[25%] right-[12%] w-2.5 h-2.5 bg-[#a1887f] rounded-full opacity-40 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-[25%] right-[12%] w-4 h-4 border border-[#a1887f] rounded-full opacity-20" />
        
        {/* Middle left sparkle */}
        <div className="absolute top-[60%] left-[15%] w-2 h-2 bg-[#6d4c41] rounded-full opacity-40 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
        <div className="absolute top-[60%] left-[15%] w-3.5 h-3.5 border border-[#6d4c41] rounded-full opacity-20" />
        
        {/* Bottom right sparkle */}
        <div className="absolute bottom-[20%] right-[20%] w-2 h-2 bg-[#8d6e63] rounded-full opacity-40 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1.5s' }} />
        <div className="absolute bottom-[20%] right-[20%] w-3 h-3 border border-[#8d6e63] rounded-full opacity-20" />
      </div>

      {/* content */}
      <div className="relative w-full h-full flex items-center justify-center px-6 md:px-12 lg:px-20 py-20">
        <div className="w-full max-w-[1600px]">
          
          {/* Mobile Layout: Column */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-6 pt-4">
            {/* Text First on Mobile */}
            <div className="space-y-4 z-10 w-full">
              {/* Available for Work Badge - Fixed for mobile visibility */}
              <div className="inline-flex items-center gap-2.5 px-5 py-3 bg-white backdrop-blur-sm rounded-full border border-black/15 shadow-xl mb-4">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />
                </div>
                <p className="text-[12px] text-black/80 uppercase tracking-[0.25em] font-bold">
                  Available for Work
                </p>
              </div>

              <h1 className="font-protest text-[38px] md:text-[54px] leading-[0.88] tracking-tight px-4">
                <span className="text-[#3e2723]">UI/UX</span>
                <br />
                <span className="bg-gradient-to-r from-[#6d4c41] via-[#8d6e63] to-[#a1887f] bg-clip-text text-transparent">Designer</span>
              </h1>
              
              <div className="h-px bg-gradient-to-r from-transparent via-[#6d4c41]/30 to-transparent w-48 mx-auto" />
              
              <p className="font-rockSalt text-[22px] md:text-[28px] text-black/85 leading-tight px-4">
                Hi, I'm <span className="bg-gradient-to-r from-[#6d4c41] to-[#8d6e63] bg-clip-text text-transparent">Raveesha</span>
              </p>
              <p className="text-[14px] md:text-base text-black/60 max-w-sm mx-auto leading-relaxed px-6">
                A second-year <span className="font-semibold">Software Engineering</span> undergraduate at <span className="font-semibold">NIBM</span>, passionate about creating 
                digital experiences that blend aesthetics with functionality
              </p>

              {/* CV Download Button */}
              <div className="pt-2">
                <a 
                  href="/path-to-your-cv.pdf"
                  download="Raveesha_Nethmina_CV.pdf"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#3e2723] to-[#4e342e] text-white rounded-full font-semibold hover:from-[#4e342e] hover:to-[#5d4037] transition-all duration-300 hover:scale-105 shadow-xl text-[15px]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </a>
              </div>
            </div>

            {/* Illustration After on Mobile */}
            <div className="relative w-full max-w-[320px] md:max-w-[380px] mt-6">
              {/* Darker brown glow for mobile */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6d4c41]/25 via-[#8d6e63]/20 to-[#a1887f]/15 rounded-full blur-3xl" />
              
              <img
                src={illustrater}
                alt="Raveesha illustration"
                className="relative w-full h-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.1))'
                }}
              />
            </div>
          </div>

          {/* Desktop Layout: Two Columns */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_1.1fr] gap-16 xl:gap-20 items-center">
            
            {/* Left: Text */}
            <div className="space-y-8 z-10">
              <div className="space-y-3">
                {/* Available for Work Badge - Better positioned */}
                <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-full border border-black/10 shadow-lg mb-4">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-[11px] text-black/75 uppercase tracking-[0.25em] font-bold">
                    Available for Work
                  </p>
                </div>

                <h1 className="font-protest text-[72px] xl:text-[88px] 2xl:text-[96px] leading-[0.88] tracking-tight">
                  <span className="text-[#3e2723]">UI/UX</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#3e2723] via-[#6d4c41] to-[#a1887f] bg-clip-text text-transparent">Designer</span>
                </h1>
              </div>
              
              <div className="h-px bg-gradient-to-r from-[#6d4c41]/30 via-[#8d6e63]/40 to-transparent max-w-md" />
              
              <div className="space-y-3">
                <p className="font-rockSalt text-[32px] xl:text-[36px] text-black/85 leading-tight">
                  Hi, <span className="bg-gradient-to-r from-gray-800 to-[#6d4c41] bg-clip-text text-transparent">I'm Raveesha</span>
                </p>
                <p className="text-lg text-black/60 max-w-lg leading-relaxed">
                  A second-year <span className="font-semibold text-black/70">Software Engineering</span> undergraduate at <span className="font-semibold text-black/70">NIBM</span>, passionate about creating 
                  digital experiences that blend aesthetics with functionality. 
                  Specializing in <span className="font-semibold text-black/70">user-centered design</span> and modern interfaces.
                </p>
              </div>

              {/* CV Download Button */}
              <a 
                href="/path-to-your-cv.pdf"
                download="Raveesha_Nethmina_CV.pdf"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3e2723] to-[#4e342e] text-white rounded-full font-semibold hover:from-[#4e342e] hover:to-[#5d4037] transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </a>
            </div>

            {/* Right: Illustration */}
            <div className="relative flex items-end justify-end self-end pb-0" style={{ marginBottom: '-90px' }}>
              {/* Darker brown glow effect behind illustration */}
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#6d4c41]/30 via-[#8d6e63]/25 to-[#a1887f]/20 rounded-full blur-3xl" />
              
              {/* Darker brown floating elements */}
              <div className="absolute top-20 right-10 w-20 h-20 bg-[#6d4c41]/20 rounded-2xl rotate-12 animate-float" />
              <div className="absolute top-40 right-60 w-16 h-16 bg-[#8d6e63]/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
              
              <img
                src={illustrater}
                alt="Raveesha illustration"
                className="relative w-[480px] xl:w-[560px] 2xl:w-[520px] h-auto object-contain object-bottom"
                style={{
                  filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.1))',
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <span className="text-[10px] uppercase tracking-wider text-black/30 font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-black/20 to-transparent" />
      </div>
    </section>
  );
}