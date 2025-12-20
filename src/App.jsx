import { useEffect, useState } from "react";
import { setupPanelScroll } from "./gsap/panelScroll";
import ImagePreloader from "./components/ImagePreloader";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import ProjectsMobile from "./components/ProjectsMobile";
import Footer from "./components/Footer";

export default function App() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (imagesLoaded && !isMobile) {
      setupPanelScroll();
    }
  }, [imagesLoaded, isMobile]);

  if (!imagesLoaded) {
    return <ImagePreloader onLoadComplete={() => setImagesLoaded(true)} />;
  }

  return (
    <div className="bg-white">
      <Navbar />

      {isMobile ? (
        // Mobile: Normal scroll layout
        <>
          <Hero />
          <About />
          <ProjectsMobile />
          <Footer />
        </>
      ) : (
        // Desktop: Panel scroll layout
        <>
          <main>
            <section className="panel" id="hero">
              <Hero />
            </section>

            <section className="panel" id="about">
              <About />
            </section>

            <section className="panel" id="projects">
              <Projects />
            </section>
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}