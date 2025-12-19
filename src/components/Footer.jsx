import logo from "../assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/raveesha-nethmina-985858290/" },
    { name: "GitHub", url: "https://github.com/Raveeshaneth" },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative px-6 md:px-12 lg:px-20 py-12 md:py-16 lg:py-20">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Top Section */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 mb-12 md:mb-16">
            
            {/* Left - CTA */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="font-rockSalt text-[36px] md:text-[48px] lg:text-[64px] leading-none tracking-tight">
                Let's work
                <br />
                together
              </h3>
              <p className="text-base md:text-lg text-white/60 max-w-md">
                I'm always interested in hearing about new projects and opportunities.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <a 
                  href="mailto:raveeshanethmina@gmail.com"
                  className="inline-block px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105 text-sm md:text-base"
                >
                  Get in touch
                </a>
                <a 
                  href="/path-to-your-cv.pdf"
                  download="Raveesha_Nethmina_CV.pdf"
                  className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-medium hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 text-sm md:text-base"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </a>
              </div>
            </div>

            {/* Right - Contact Info */}
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-4">
                <h4 className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/40 font-medium mb-4 md:mb-6">
                  Contact
                </h4>
                <div className="space-y-2 md:space-y-3 text-sm md:text-base text-white/80">
                  <p>raveeshanethmina@gmail.com</p>
                  <p>Colombo, Sri Lanka</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/40 font-medium mb-4 md:mb-6">
                  Social
                </h4>
                <div className="space-y-2 md:space-y-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm md:text-base text-white/80 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-6 md:mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img src={logo} alt="logo" className="w-8 h-8 md:w-10 md:h-10 object-contain invert" />
              <span className="text-white/60 text-xs md:text-sm">
                Raveesha Nethmina Gonaduwa
              </span>
            </button>

            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 lg:gap-8 text-xs md:text-sm text-white/40">
              <p>© {currentYear} All rights reserved</p>
              <div className="flex gap-4 md:gap-6">
                <button className="hover:text-white/60 transition-colors duration-300">
                  Privacy Policy
                </button>
                <button className="hover:text-white/60 transition-colors duration-300">
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}