// "Embers": each particle rises and is pushed around by a curl-noise current.
// Motion is computed procedurally in the vertex shader from the particle's home
// position + time, so there's no simulation state to store — cheap and seamless.
import { noise } from './noise.glsl.js';

export const flowVertex = /* glsl */ `
uniform float uTime;
uniform float uProgress;
uniform float uPixelRatio;
uniform float uSize;
uniform float uFlow;   // spatial frequency of the current
uniform float uAmp;    // swirl strength
uniform float uRise;   // upward drift speed
uniform float uHeight; // half-height of the volume

attribute float aScale;
attribute float aSeed;
attribute vec3 aColor;

varying vec3 vColor;
varying float vFade;

${noise}

void main(){
  float H = uHeight;
  float span = 2.0 * H;

  // Continuous upward drift that wraps within the volume. Bigger embers rise a
  // little faster; aSeed scatters them so they don't move in lockstep.
  float rise = uTime * uRise * (0.6 + aScale * 0.8);
  float y = mod(position.y + H + rise + aSeed * span, span) - H;

  vec3 home = vec3(position.x, y, position.z);

  // Swirl through the (slowly scrolling) curl-noise current.
  float turbulence = uAmp * (1.0 + uProgress * 0.6);
  vec3 current = curlNoise(home * uFlow + vec3(0.0, uTime * 0.05, aSeed * 12.0));
  vec3 pos = home + current * turbulence;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  float dist = -mvPosition.z;
  gl_PointSize = min(uSize * aScale * uPixelRatio / max(dist, 0.1), 130.0 * uPixelRatio);

  // Fade near the top/bottom of the volume (hides the wrap) and at depth extremes.
  float edge = smoothstep(0.0, H * 0.4, H - abs(y));
  float near = smoothstep(0.5, 3.0, dist);
  float far = 1.0 - smoothstep(17.0, 30.0, dist);

  vColor = aColor;
  vFade = edge * near * far;
}
`;

export const flowFragment = /* glsl */ `
varying vec3 vColor;
varying float vFade;

void main(){
  // Soft round sprite with a hot core and a gentle halo.
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = smoothstep(0.5, 0.0, d);
  a *= a;
  if (a < 0.004) discard;

  // Authored emissive colour written straight out (additive glow); the hot core
  // pushes toward white where sprites overlap.
  gl_FragColor = vec4(vColor, a * vFade);
}
`;
