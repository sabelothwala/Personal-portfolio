# Lumen — Personal Portfolio

A boundary-pushing personal site. The centerpiece is a full-screen, scroll-reactive
three.js background — **"Embers"**: thousands of luminous particles rise and swirl through
an invisible **curl-noise current** (a divergence-free flow, so the motion reads like real
fluid rather than random jitter), recycling seamlessly. Warm amber-to-gold sparks over
near-black, with the odd cool one. Glassmorphic content cards float over it.

This is a clean, modular foundation to build on.

## The visual concept

- **The Embers** (`src/three/Flow.js`) — a single `THREE.Points` cloud. Each particle's
  motion is computed procedurally in the vertex shader: a slow upward drift (wrapping within
  the volume, faded at the edges so the loop is invisible) plus displacement along a
  **curl-noise** vector field, so they swirl like sparks in a draft. There's no simulation
  state to store, so it scales to thousands of points cheaply. Colours are authored
  per-particle on the CPU (a warm ramp + ~5% cool sparks) and drawn additively.
- **Scroll drives everything** — page progress (0→1) feeds the uniforms and the camera: it
  rises up through the volume with a gentle arc while the turbulence intensifies. Pointer
  position adds subtle live parallax. It's all uniforms, so it's cheap.

## Stack

- [Vite](https://vitejs.dev/) — vanilla JS, no framework
- [three.js](https://threejs.org/) — the WebGL background
- [Lenis](https://lenis.darkroom.engineering/) — smooth scroll
- [GSAP](https://gsap.com/) + ScrollTrigger — scroll-linked animation
- Plain CSS — the glassmorphism

## Architecture

```
index.html                  fixed <canvas> behind, content scrolls on top
src/
  main.js                   entry — wires scene + scroll + reveals together
  styles/style.css          design system + glassmorphism
  three/
    Background.js           renderer / camera / loop / resize / scroll mapping
    Flow.js                 the ember particle system (positions, colours, uniforms)
    shaders/
      noise.glsl.js         shared simplex + curl noise (GLSL as a JS string)
      flow.glsl.js          ember vertex + fragment
  scroll/
    SmoothScroll.js         Lenis + GSAP ticker + ScrollTrigger wiring
    scrollState.js          shared scroll progress (read by the scene)
  ui/
    reveal.js               hero intro, per-section reveals, expertise scroll-morph
```

Scene logic, scroll logic, and DOM are kept in separate modules. The scene never reads the
DOM directly — it reads a single shared `scroll.target` value, which it damps each frame for
smoothness.

## Run it

```bash
npm install      # already run during scaffolding
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Accessibility & performance

- Pixel ratio capped at 2; render loop pauses when the tab is hidden.
- `prefers-reduced-motion` is respected — Lenis and reveal animations are skipped and the
  ember drift + turbulence are slowed.
- WebGL init is wrapped in a try/catch; if it fails the canvas is hidden and the content
  still reads.

## Next iterations (ideas)

- Post-processing: an additive bloom pass would make the embers genuinely glow.
- Per-section scene "states" (distinct palette + camera framing per panel).
- Real content, project case studies, a custom cursor, page transitions.
