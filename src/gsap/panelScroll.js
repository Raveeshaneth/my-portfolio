import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setupPanelScroll() {
  const panels = gsap.utils.toArray("section.panel");

  if (!panels || panels.length < 2) return;

  // Clear any existing ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  // Start with all panels except first below the viewport
  gsap.set(panels.slice(1), { yPercent: 100 });
  
  // Make sure first panel is visible
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
  // We need 6 transitions between 7 projects (0->1, 1->2, 2->3, 3->4, 4->5, 5->6)
  // Plus a bit extra to ensure project 6 (last one) fully shows
  tl.to({}, { duration: 7 });

  const totalSteps = 9; // 1 + 1 + 7

  ScrollTrigger.create({
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
      
      // Projects section appears at 2/9 and ends at 9/9
      const projectsStart = 2 / 9;
      
      if (progress >= projectsStart) {
        // Normalize progress within projects section (0 to 1)
        const projectProgress = (progress - projectsStart) / (1 - projectsStart);
        
        // We have 7 projects (indices 0-6)
        // Divide the progress into 7 equal segments
        const rawIndex = projectProgress * 7;
        const projectIndex = Math.min(Math.floor(rawIndex), 6);
        
        // Debug log (remove in production)
        console.log('Progress:', progress.toFixed(3), 'Project:', projectIndex, 'Raw:', rawIndex.toFixed(3));
        
        // Dispatch custom event to update active project
        window.dispatchEvent(new CustomEvent('projectIndexChange', { 
          detail: { index: projectIndex } 
        }));
      } else {
        // Before projects section, show first project
        window.dispatchEvent(new CustomEvent('projectIndexChange', { 
          detail: { index: 0 } 
        }));
      }
    }
  });

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
}