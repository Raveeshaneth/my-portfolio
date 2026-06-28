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

  gsap.set(panels.slice(1), { 
    yPercent: 100, 
    opacity: 1
  });
  gsap.set(panels[0], { yPercent: 0, opacity: 1 });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
  });

  // Slide Hero → About
  // Previous panel (panels[0]) remains perfectly still
  tl.to(panels[1], { yPercent: 0, duration: 1 }, 0);

  // Hold for About horizontal card scroll (Card 1 → Card 2)
  tl.to({}, { duration: 1 });

  // Slide About → Experience
  const timeAboutEnd = tl.duration();
  tl.to(panels[2], { yPercent: 0, duration: 1 }, timeAboutEnd);

  // Slide Experience → Projects
  const timeExpEnd = tl.duration();
  tl.to(panels[3], { yPercent: 0, duration: 1 }, timeExpEnd);

  const TOTAL_PROJECTS = 5; // must match PROJECTS.length in Projects.jsx

  // Steps: 1 (hero→about) + 1 (about hold) + 1 (about→experience) + 1 (experience→projects) + 5 projects + 1 (projects→gallery) = 10
  const PANEL_STEPS = 4;
  const GALLERY_STEP = 1;
  const totalSteps = PANEL_STEPS + TOTAL_PROJECTS + GALLERY_STEP;

  // Hold duration matches exactly TOTAL_PROJECTS steps
  tl.to({}, { duration: TOTAL_PROJECTS });

  // Slide Projects → Gallery
  const timeProjEnd = tl.duration();
  tl.to(panels[4], { yPercent: 0, duration: 1 }, timeProjEnd);

  let lastDispatchedIndex = -1;
  const dispatchProjectChange = (index) => {
    if (lastDispatchedIndex !== index) {
      lastDispatchedIndex = index;
      window.dispatchEvent(new CustomEvent("projectIndexChange", {
        detail: { index },
      }));
    }
  };

  // Build explicit snap points
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

      // ── About horizontal sub-scroll ──
      const aboutHoldStart = 1 / totalSteps;
      const aboutHoldEnd = 2 / totalSteps;

      let aboutP = 0;
      if (progress >= aboutHoldEnd) {
        aboutP = 1;
      } else if (progress >= aboutHoldStart) {
        aboutP = (progress - aboutHoldStart) / (aboutHoldEnd - aboutHoldStart);
      }
      window.dispatchEvent(new CustomEvent("aboutSubScroll", {
        detail: { progress: aboutP },
      }));

      // ── Project cycling ──
      const projectsStart = PANEL_STEPS / totalSteps;
      const projectsEnd = (PANEL_STEPS + TOTAL_PROJECTS) / totalSteps;

      if (progress >= projectsStart && progress < projectsEnd) {
        const projectProgress = (progress - projectsStart) / (projectsEnd - projectsStart);
        const rawIndex = projectProgress * (TOTAL_PROJECTS - 1);
        const projectIndex = Math.min(Math.round(rawIndex), TOTAL_PROJECTS - 1);
        dispatchProjectChange(projectIndex);
      } else if (progress >= projectsEnd) {
        dispatchProjectChange(TOTAL_PROJECTS - 1);
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