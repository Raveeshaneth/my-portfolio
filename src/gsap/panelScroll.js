import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let scrollTriggerInstance = null;

export function setupPanelScroll() {
  const panels = gsap.utils.toArray("section.panel");

  if (!panels || panels.length < 2) return;

  // Kill existing ScrollTrigger to prevent memory leaks
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  // Start with all panels except first below the viewport
  gsap.set(panels.slice(1), { yPercent: 100 });
  gsap.set(panels[0], { yPercent: 0 });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
  });

  // Slide Hero to About (1 step)
  tl.to(panels[1], {
    yPercent: 0,
    duration: 1,
  });

  // Slide About to Projects (1 step)
  tl.to(panels[2], {
    yPercent: 0,
    duration: 1,
  });

  // Hold Projects section while projects cycle through
  tl.to({}, { duration: 7 });

  const totalSteps = 9;

  // Debounce project index updates
  let lastDispatchedIndex = -1;
  const dispatchProjectChange = (index) => {
    if (lastDispatchedIndex !== index) {
      lastDispatchedIndex = index;
      window.dispatchEvent(new CustomEvent('projectIndexChange', { 
        detail: { index } 
      }));
    }
  };

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: "main",
    animation: tl,
    start: "top top",
    end: () => "+=" + window.innerHeight * totalSteps,
    scrub: true,
    pin: true,
    pinSpacing: true,
    snap: {
      snapTo: (value) => {
        const step = 1 / totalSteps;
        return Math.round(value / step) * step;
      },
      duration: { min: 0.2, max: 0.6 },
      ease: "power1.out",
    },
    onUpdate: (self) => {
      const progress = self.progress;
      const projectsStart = 2 / 9;
      
      if (progress >= projectsStart) {
        const projectProgress = (progress - projectsStart) / (1 - projectsStart);
        const rawIndex = projectProgress * 7;
        const projectIndex = Math.min(Math.floor(rawIndex), 6);
        dispatchProjectChange(projectIndex);
      } else {
        dispatchProjectChange(0);
      }
    }
  });

  // Throttle resize to prevent excessive recalculations
  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  };

  window.addEventListener("resize", handleResize);

  // Return cleanup function
  return () => {
    window.removeEventListener("resize", handleResize);
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
    }
  };
}