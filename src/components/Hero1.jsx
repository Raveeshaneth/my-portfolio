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

      {/* content */}
      <div className="relative w-full h-full flex items-center justify-center px-6 md:px-12 lg:px-20 py-20">
        <div className="w-full max-w-[1600px]">
          
          {/* Mobile Layout: Column */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-6">
            {/* Text First on Mobile */}
            <div className="space-y-4 z-10">
              <p className="text-xs md:text-sm text-black/40 uppercase tracking-[0.3em] font-medium">
                Portfolio 2026
              </p>
              <h1 className="font-protest text-[36px] md:text-[52px] text-[#1a1a1a] leading-[0.9] tracking-tight">
                UI/UX
                <br />
                Designer
              </h1>
              <div className="h-px bg-black/10 w-48 mx-auto" />
              <p className="font-cabin text-[24px] md:text-[32px] text-black/80 leading-tight">
                Hi, I'm Raveesha
              </p>
              <p className="text-sm md:text-base text-black/50 max-w-xs mx-auto leading-relaxed font-light">
                I'm a second-year Software Engineering Undergraduate at NIBM!Creating digital experiences that blend aesthetics with functionality
              </p>
            </div>

            {/* Illustration After on Mobile */}
            <div className="relative w-full max-w-[280px] md:max-w-[350px] mt-8">
              <img
                src={illustrater}
                alt="Raveesha illustration"
                className="w-full h-auto object-contain"
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
              <div className="space-y-2">
                <p className="text-base text-black/40 uppercase tracking-[0.3em] font-medium">
                  Portfolio 2026
                </p>
                <h1 className="font-protest text-[72px] xl:text-[88px] 2xl:text-[96px] text-[#432818] leading-[0.9] tracking-tight">
                  UI/UX
                  <br />
                  Designer
                </h1>
              </div>
              
              <div className="h-px bg-black/10 max-w-md" />
              
              <div className="space-y-3">
                <p className="font-cabin text-[38px] xl:text-[42px] text-black/80 leading-tight">
                  Hi, I'm Raveesha
                </p>
                <p className="text-lg text-black/50 max-w-md leading-relaxed font-light">
                  Creating digital experiences that blend aesthetics with functionality
                </p>
              </div>
              
            </div>

            {/* Right: Illustration */}
            <div className="relative flex items-end justify-end self-end pb-0" style={{ marginBottom: '-90px' }}>
              <img
                src={illustrater}
                alt="Raveesha illustration"
                className="w-[480px] xl:w-[560px] 2xl:w-[520px] h-auto object-contain object-bottom"
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