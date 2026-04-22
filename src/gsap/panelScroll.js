import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let scrollTriggerInstance = null;

export function setupPanelScroll() {
  const panels = gsap.utils.toArray("section.panel");

  if (!panels || panels.length < 2) return;

  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  gsap.set(panels.slice(1), { yPercent: 100 });
  gsap.set(panels[0], { yPercent: 0 });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
  });

  // Slide Hero → About
  tl.to(panels[1], { yPercent: 0, duration: 1 });

  // Slide About → Projects
  tl.to(panels[2], { yPercent: 0, duration: 1 });

  const TOTAL_PROJECTS = 8; // must match PROJECTS.length in Projects.jsx

  // Steps: 1 (hero→about) + 1 (about→projects) + 8 (one step per project) = 10
  // This gives each project its own dedicated snap point
  const PANEL_STEPS = 2;
  const totalSteps = PANEL_STEPS + TOTAL_PROJECTS; // = 10

  // Hold duration matches exactly TOTAL_PROJECTS steps
  tl.to({}, { duration: TOTAL_PROJECTS });

  let lastDispatchedIndex = -1;
  const dispatchProjectChange = (index) => {
    if (lastDispatchedIndex !== index) {
      lastDispatchedIndex = index;
      window.dispatchEvent(new CustomEvent("projectIndexChange", {
        detail: { index },
      }));
    }
  };

  // Build explicit snap points: panel snaps + one per project
  // Panel snaps: 0, 1/10, 2/10
  // Project snaps: 2/10, 3/10, 4/10, 5/10, 6/10, 7/10, 8/10, 9/10, 10/10
  // But we need project[7] at progress=1.0, so we space them so that
  // project[i] lands at (PANEL_STEPS + i) / totalSteps
  const snapPoints = [];
  for (let i = 0; i <= totalSteps; i++) {
    snapPoints.push(i / totalSteps);
  }

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: "main",
    animation: tl,
    start: "top top",
    end: () => "+=" + window.innerHeight * totalSteps,
    scrub: true,
    pin: true,
    pinSpacing: true,
    snap: {
      snapTo: snapPoints,
      duration: { min: 0.2, max: 0.6 },
      ease: "power1.out",
    },
    onUpdate: (self) => {
      const progress = self.progress;
      const projectsStart = PANEL_STEPS / totalSteps; // 2/10 = 0.2

      if (progress >= projectsStart) {
        // Each project occupies exactly 1/totalSteps of progress
        // project[i] is active when progress is in [(2+i)/10, (3+i)/10)
        const projectProgress = (progress - projectsStart) / (1 - projectsStart);
        const rawIndex = projectProgress * (TOTAL_PROJECTS - 1);
        // Use round so the last project is reachable at progress=1.0
        const projectIndex = Math.min(Math.round(rawIndex), TOTAL_PROJECTS - 1);
        dispatchProjectChange(projectIndex);
      } else {
        dispatchProjectChange(0);
      }
    },
  });

  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
    }
  };
}