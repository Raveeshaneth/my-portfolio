import { useEffect, useState, useRef } from "react";
import { setupPanelScroll } from "./gsap/panelScroll";
import ImagePreloader from "./components/ImagePreloader";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import ProjectsMobile from "./components/ProjectsMobile";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [loadingDone, setLoadingDone] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Setup GSAP only after loader is fully gone
  useEffect(() => {
    if (loadingDone && !isMobile) {
      setupPanelScroll();
    }
  }, [loadingDone, isMobile]);

  return (
    <div className="bg-white">
      {/* ── Loading overlay — always mounts on top so the app renders beneath ── */}
      {!loadingDone && (
        <ImagePreloader onLoadComplete={() => setLoadingDone(true)} />
      )}

      {/* ── App content — always in the DOM so it's ready when loader exits ── */}
      {/* Custom cursor — desktop only (SVG arrow + mix-blend-mode:difference) */}
      {!isMobile && <CustomCursor />}
      <Navbar />

      {isMobile ? (
        <>
          <Hero />
          <About />
          <Experience />
          <ProjectsMobile />
          <Gallery />
          <Footer />
        </>
      ) : (
        <>
          <main>
            <section className="panel" id="hero">
              <Hero />
            </section>

            <section className="panel" id="about">
              <About />
            </section>

            <section className="panel" id="experience">
              <Experience />
            </section>

            <section className="panel" id="projects">
              <Projects />
            </section>

            <section className="panel" id="gallery">
              <Gallery />
            </section>
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}