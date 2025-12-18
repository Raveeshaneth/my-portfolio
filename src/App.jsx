import { useEffect } from "react";
import { setupPanelScroll } from "./gsap/panelScroll";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    setupPanelScroll();
  }, []);

  return (
    <div className="bg-white">
      <Navbar />

      {/* GSAP pins this <main> and slides .panel sections */}
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

      {/* Footer OUTSIDE main - appears after all scroll sections */}
      <Footer />
    </div>
  );
}