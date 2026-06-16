/**
 * The single source of truth shared between the scroll system and the WebGL
 * scene. The scroll system writes `target` (0..1 page progress); the scene reads
 * it and damps toward it each frame. Keeping it a plain object avoids coupling
 * the scene to GSAP, Lenis, or the DOM.
 */
export const scroll = {
  target: 0, // normalised page progress, 0 → 1
  velocity: 0, // current scroll velocity (px/frame-ish), for future use
};
