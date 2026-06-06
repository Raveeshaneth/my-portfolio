import logo from "../assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Dribbble",
      url: "https://dribbble.com/raveesha-nethmina",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.245.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/raveesha-nethmina-985858290/",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/Raveeshaneth",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
  ];

  return (
    <footer id="contact" className="relative bg-black text-white overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#6d4c41]/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-[#8d6e63]/8 to-transparent rounded-full blur-3xl" />

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
              <p className="text-base md:text-lg text-white/60 max-w-md leading-relaxed">
                I'm always excited to connect with teams and individuals who value thoughtful design. Let's create something extraordinary.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <a 
                  id="get-in-touch-btn"
                  href="mailto:raveeshanethmina@gmail.com"
                  className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105 text-sm md:text-base"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Get in touch
                </a>
                <a 
                  href="/Raveesha-Nethmina-CV.pdf"
                  download="Raveesha-Nethmina-CV.pdf"
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
                  <a href="mailto:raveeshanethmina@gmail.com" className="block text-sm md:text-base text-white/80 hover:text-white transition-colors duration-300">raveeshanethmina@gmail.com</a>
                  <p>Colombo, Sri Lanka</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/40 font-medium mb-4 md:mb-6">
                  Social
                </h4>
                <div className="space-y-3 md:space-y-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm md:text-base text-white/70 hover:text-white transition-all duration-300 group"
                    >
                      <span className="text-white/40 group-hover:text-white/80 transition-colors duration-300">
                        {link.icon}
                      </span>
                      {link.name}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-60 transition-opacity duration-300 -translate-x-1 group-hover:translate-x-0">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6 md:mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Back to top"
            >
              <img src={logo} alt="Raveesha Nethmina logo" className="w-8 h-8 md:w-10 md:h-10 object-contain invert" />
              <span className="text-white/60 text-xs md:text-sm">
                Raveesha Nethmina Gonaduwa
              </span>
            </button>

            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 lg:gap-8 text-xs md:text-sm text-white/40">
              <p>© {currentYear} All rights reserved</p>
              <p className="text-white/20">Designed & Built with ♥</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}