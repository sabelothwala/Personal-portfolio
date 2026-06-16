import * as THREE from 'three';
import { Flow } from './Flow.js';
import { scroll } from '../scroll/scrollState.js';

// Frame-rate-independent damping toward a target.
const damp = (current, target, lambda, dt) =>
  THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));

/**
 * Owns the renderer, camera, scene graph and render loop. It never touches the
 * DOM — it reads a single shared `scroll.target` value and damps it each frame,
 * then maps that progress onto camera movement and scene uniforms.
 */
export class Background {
  constructor(canvas, { reduced = false } = {}) {
    this.canvas = canvas;
    this.reduced = reduced;
    this.progress = 0;
    this.pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    // Adaptive resolution: start sharp, and drop the canvas resolution only if
    // the frame rate can't keep up (the soft embers hide it). Downscale-only, so
    // it can never oscillate.
    this.maxDpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.renderScale = 1;
    this._warmup = 90; // ignore the first ~1.5s (load / shader compile)
    this._frames = 0;
    this._accum = 0;
    this.width = 1;
    this.height = 1;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // Additive points have soft alpha edges — MSAA buys nothing, so it stays off
      // for a real fragment-shader win on retina displays.
      antialias: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x070503, 1);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
    this.camera.position.set(0, 0, 7);

    this.flow = new Flow({ reduced });
    this.scene.add(this.flow.points);

    this.timer = new THREE.Timer();

    this._onResize = this.resize.bind(this);
    this._onPointer = this._handlePointer.bind(this);
    this._render = this.render.bind(this);

    window.addEventListener('resize', this._onResize);
    if (!reduced) window.addEventListener('pointermove', this._onPointer);

    this.resize();
    this.renderer.setAnimationLoop(this._render);
  }

  _handlePointer(e) {
    this.pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    this.pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.maxDpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this._applyResolution();
  }

  _applyResolution() {
    const dpr = this.maxDpr * this.renderScale;
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(this.width, this.height);
    this.flow.resize(dpr);
  }

  render() {
    // Skip work when the tab is hidden — no point burning GPU.
    if (document.hidden) return;

    this.timer.update();
    const dt = Math.min(this.timer.getDelta(), 0.05);
    const time = this.timer.getElapsed();

    // Adaptive resolution: if we sustain < ~50fps, step the canvas resolution
    // down (never up, so it can't oscillate).
    if (this._warmup > 0) {
      this._warmup--;
    } else {
      this._frames++;
      this._accum += dt;
      if (this._frames >= 60) {
        const avg = this._accum / this._frames;
        this._frames = 0;
        this._accum = 0;
        if (avg > 1 / 50 && this.renderScale > 0.7) {
          this.renderScale = Math.max(0.7, this.renderScale - 0.15);
          this._applyResolution();
        }
      }
    }

    // Silky scroll: damp the raw target so the scene glides even if scroll jitters.
    this.progress = damp(this.progress, scroll.target, 4.0, dt);
    const p = this.progress;

    this.pointer.x = damp(this.pointer.x, this.pointer.tx, 3.0, dt);
    this.pointer.y = damp(this.pointer.y, this.pointer.ty, 3.0, dt);

    const sway = this.reduced ? 0 : 1;

    // Scroll-driven camera: rise up through the volume of embers with a gentle arc.
    this.camera.position.z = 7.0 - p * 2.4;
    this.camera.position.y = -0.5 + p * 3.0 + this.pointer.y * 0.4 * sway;
    this.camera.position.x = Math.sin(p * Math.PI) * 0.7 + this.pointer.x * 0.5 * sway;
    this.camera.lookAt(0, this.camera.position.y * 0.5 + 0.2, 0);

    this.flow.update(time, p);

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.renderer.setAnimationLoop(null);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('pointermove', this._onPointer);
    this.flow.dispose();
    this.renderer.dispose();
  }
}
