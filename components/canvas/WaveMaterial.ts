import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const WaveMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorBg: new THREE.Color('#09090b'),
    uColorAccent: new THREE.Color('#3b82f6'),
    uMouse: new THREE.Vector2(0, 0),
    uScrollSpeed: 0,
    uOpacity: 1.0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying float vDisplacement;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uScrollSpeed;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      float freq = 1.5;
      float amp = 0.08 + (uScrollSpeed * 0.4);
      float speed = uTime * 0.4;
      
      float wave = sin(pos.x * freq + speed) * cos(pos.x * freq * 0.5 + speed * 0.7);
      
      // Add mouse influence
      float dist = distance(uv, uMouse);
      float mouseInfluence = smoothstep(0.6, 0.0, dist) * 0.15;
      
      vDisplacement = wave * amp + mouseInfluence;
      pos.y += vDisplacement;
      pos.z += vDisplacement * 0.5;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    varying float vDisplacement;
    uniform vec3 uColorBg;
    uniform vec3 uColorAccent;
    uniform float uTime;
    uniform float uOpacity;

    void main() {
      // Create a gradient based on displacement (peaks are more colorful)
      float mixFactor = smoothstep(-0.1, 0.2, vDisplacement);
      vec3 color = mix(uColorBg, uColorAccent, mixFactor * 0.15);
      
      // Add a second, deeper layer of the background color
      color = mix(color, uColorBg, 1.0 - vUv.y);

      // Subtle high-quality grain effect
      float grain = fract(sin(dot(vUv, vec2(12.9898, 78.233) + uTime * 0.01)) * 43758.5453);
      color += grain * 0.015;

      gl_FragColor = vec4(color, uOpacity);
    }
  `
)

extend({ WaveMaterial })

export default WaveMaterial
