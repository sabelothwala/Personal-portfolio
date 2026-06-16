import './styles/style.css';
import { Background } from './three/Background.js';
import { initSmoothScroll } from './scroll/SmoothScroll.js';
import { initReveals } from './ui/reveal.js';

document.body.classList.remove('no-js');

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.getElementById('webgl');

// WebGL background — gracefully degrade if the context can't be created.
let background = null;
try {
  background = new Background(canvas, { reduced });
} catch (err) {
  console.error('[lumen] WebGL background failed to initialise:', err);
  if (canvas) canvas.style.display = 'none';
  document.body.classList.add('no-webgl');
}

// Scroll + entrance animation.
initSmoothScroll();
initReveals();

// Footer year.
const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Expose for debugging in the console during development.
if (import.meta.env.DEV) {
  window.__lumen = { background };
}
