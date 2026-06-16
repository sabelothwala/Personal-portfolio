import * as THREE from 'three';
import { flowVertex, flowFragment } from './shaders/flow.glsl.js';

// Warm ember ramp (deep red -> orange -> gold -> hot white), authored in the
// colour they should appear. A small fraction get a cool spark for contrast.
const EMBER_STOPS = [
  [0.55, 0.1, 0.03],
  [1.0, 0.35, 0.08],
  [1.0, 0.68, 0.28],
  [1.0, 0.92, 0.78],
];
const COOL_SPARK = [0.55, 0.78, 1.0];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function emberColor(out, i) {
  // ~5% cool sparks — the "little blue".
  if (Math.random() < 0.05) {
    out[i] = COOL_SPARK[0];
    out[i + 1] = COOL_SPARK[1];
    out[i + 2] = COOL_SPARK[2];
    return;
  }
  // Bias toward the orange/amber middle of the ramp.
  const t = Math.pow(Math.random(), 1.4) * 3; // 0..3 across 4 stops
  const seg = Math.min(Math.floor(t), 2);
  const f = t - seg;
  const a = EMBER_STOPS[seg];
  const b = EMBER_STOPS[seg + 1];
  out[i] = lerp(a[0], b[0], f);
  out[i + 1] = lerp(a[1], b[1], f);
  out[i + 2] = lerp(a[2], b[2], f);
}

/**
 * Volumetric drift of luminous particles through a curl-noise current. A single
 * THREE.Points draw with all motion done procedurally in the vertex shader, so
 * it scales to thousands of embers cheaply.
 */
export class Flow {
  constructor({ count = 9000, reduced = false } = {}) {
    this.halfHeight = 7.5;
    const W = 13;
    const D = 6;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 2 * W;
      positions[i3 + 1] = (Math.random() - 0.5) * 2 * this.halfHeight;
      positions[i3 + 2] = (Math.random() - 0.5) * 2 * D;
      emberColor(colors, i3);
      scales[i] = Math.random() * 0.85 + 0.15;
      seeds[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    this.material = new THREE.ShaderMaterial({
      vertexShader: flowVertex,
      fragmentShader: flowFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uPixelRatio: { value: 1 },
        uSize: { value: 42 },
        uFlow: { value: 0.16 },
        uAmp: { value: reduced ? 0.8 : 1.7 },
        uRise: { value: reduced ? 0.15 : 0.5 },
        uHeight: { value: this.halfHeight },
      },
    });

    this.points = new THREE.Points(geometry, this.material);
    this.points.frustumCulled = false; // positions are computed in the shader
  }

  resize(dpr) {
    this.material.uniforms.uPixelRatio.value = dpr;
  }

  update(time, progress) {
    this.material.uniforms.uTime.value = time;
    this.material.uniforms.uProgress.value = progress;
  }

  dispose() {
    this.points.geometry.dispose();
    this.material.dispose();
  }
}
