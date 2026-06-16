import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Entrance choreography: a staggered hero intro on load, and a blur-and-rise
 * reveal for each section as it scrolls into view. Skipped entirely under
 * `prefers-reduced-motion` (everything is visible by default in the CSS).
 */
export function initReveals() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  // Hero intro — staggered rise + de-blur.
  const heroBits = gsap.utils.toArray('[data-hero]');
  if (heroBits.length) {
    gsap.set(heroBits, { y: 30, autoAlpha: 0, filter: 'blur(14px)' });
    gsap.to(heroBits, {
      y: 0,
      autoAlpha: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power3.out',
      stagger: 0.12,
      delay: 0.2,
    });
  }

  // Per-section reveals.
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 48,
      autoAlpha: 0,
      filter: 'blur(12px)',
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
      },
    });
  });

  initMorph();
}

/**
 * Expertise: a single centered square morphs into three blocks across the page,
 * scrubbed by scroll. The CSS holds the final (spread) state, so this only adds
 * the initial stacked state and animates out of it — no JS still reads fine.
 */
function initMorph() {
  const mm = gsap.matchMedia();

  // Wide screens: the full horizontal morph, driven by the tall section's scroll
  // while its inner stays stuck (CSS `position: sticky`).
  mm.add('(min-width: 761px)', () => {
    const section = document.querySelector('.morph');
    const blocks = gsap.utils.toArray('.morph__block');
    if (!section || blocks.length < 3) return;
    const [left, center, right] = blocks;

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true, // re-measure the offsets on resize
      },
    });

    // Stacked single square -> spread row, in 3D: the side blocks start hidden
    // behind the centre (offset to its position, pushed back in Z) and rise
    // forward as they fan out. Offsets are measured live so they land exactly
    // on the centre block at progress 0. Z/scale read as depth under the
    // container's `perspective`; pointer tilt owns rotationX/Y separately.
    tl.from(left, { x: () => center.offsetLeft - left.offsetLeft, z: -240, autoAlpha: 0, scale: 0.92 }, 0)
      .from(right, { x: () => center.offsetLeft - right.offsetLeft, z: -240, autoAlpha: 0, scale: 0.92 }, 0)
      .from(center, { z: -90, scale: 1.06 }, 0)
      .from('.morph__block-body', { autoAlpha: 0, y: 16, stagger: 0.08 }, 0.3);
  });

  // Pointer tilt — each card leans toward the cursor with a tracking glare.
  // Hover/fine-pointer only, and on its own transform channels (rotationX/Y)
  // so it composes with the scroll spread above without fighting it.
  mm.add('(min-width: 761px) and (hover: hover) and (pointer: fine)', () => {
    const blocks = gsap.utils.toArray('.morph__block');
    if (!blocks.length) return;
    const MAX_TILT = 9; // degrees at the card's edge
    const cleanups = [];

    blocks.forEach((card) => {
      const rotX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' });
      const rotY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' });

      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width; // 0 (left) -> 1 (right)
        const py = (e.clientY - r.top) / r.height; // 0 (top)  -> 1 (bottom)
        rotY((px - 0.5) * MAX_TILT * 2);
        rotX(-(py - 0.5) * MAX_TILT * 2);
        card.style.setProperty('--mx', `${px * 100}%`);
        card.style.setProperty('--my', `${py * 100}%`);
        card.style.setProperty('--glare', '1');
      };
      const onLeave = () => {
        rotX(0);
        rotY(0);
        card.style.setProperty('--glare', '0');
      };

      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', onLeave);
      cleanups.push(() => {
        card.removeEventListener('pointermove', onMove);
        card.removeEventListener('pointerleave', onLeave);
        gsap.set(card, { clearProps: 'rotationX,rotationY' });
      });
    });

    // gsap.matchMedia runs this when the breakpoint stops matching.
    return () => cleanups.forEach((fn) => fn());
  });

  // Narrow screens: no sticky morph — just reveal the stacked blocks.
  mm.add('(max-width: 760px)', () => {
    gsap.from('.morph__block', {
      autoAlpha: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: '.morph', start: 'top 75%' },
    });
  });
}
