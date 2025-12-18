import Lenis from "@studio-freight/lenis";

export function setupLenis() {
  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    smoothTouch: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}
