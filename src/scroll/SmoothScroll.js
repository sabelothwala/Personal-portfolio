import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { scroll } from './scrollState.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Wires Lenis smooth scrolling into GSAP's ticker and ScrollTrigger, exposes
 * global page progress via the shared `scroll` state, and upgrades anchor links
 * to eased scrolling. Respects `prefers-reduced-motion` by skipping Lenis
 * entirely (native scroll still drives progress through ScrollTrigger).
 */
export function initSmoothScroll() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progressBar = document.querySelector('.progress-bar');

  let lenis = null;

  if (!reduced) {
    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      scroll.velocity = e.velocity || 0;
    });

    // Drive Lenis from GSAP's ticker so everything shares one clock.
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Global page progress (0 → 1) for the scene + progress bar.
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      scroll.target = self.progress;
      if (progressBar) {
        progressBar.style.transform = `scaleX(${self.progress})`;
      }
    },
  });

  // Eased anchor navigation.
  document.querySelectorAll('[data-scroll-to]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = href === '#top' ? document.body : document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: href === '#top' ? 0 : -10 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  return lenis;
}
