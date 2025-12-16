'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetProps {
  scrollProgress: number;
}

export default function Planet({ scrollProgress }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Points>(null);
  const planetParticlesRef = useRef<THREE.Points>(null);

  // 1. Generate Structured Planet Particles (Full Volumetric)
  const planetParticlesGeometry = useMemo(() => {
    // High count for density
    const particleCount = 8000;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#06b6d4'); // Cyan
    const color2 = new THREE.Color('#3b82f6'); // Blue
    const colorCore = new THREE.Color('#10b981'); // Emerald core

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden Angle

    for (let i = 0; i < particleCount; i++) {
      // FULL VOLUMETRIC DISTRIBUTION (Radius 0 to 1)
      // Uniform distribution in a sphere requires taking cube root of random
      // But we want slightly more density at core and surface
      let radius = Math.pow(Math.random(), 1 / 3);

      // Push some to surface for definition
      if (Math.random() < 0.4) {
        radius = 0.95 + Math.random() * 0.05;
      }

      const y = 1 - (i / (particleCount - 1)) * 2;
      const theta = phi * i;

      // Sphere coordinates
      const rY = Math.sqrt(1 - y * y) * radius;
      const finalY = y * radius;

      const x = Math.cos(theta) * rY;
      const z = Math.sin(theta) * rY;

      positions[i * 3] = x;
      positions[i * 3 + 1] = finalY;
      positions[i * 3 + 2] = z;

      // Size variation - Mix of heavy chunks and dust
      const rSize = Math.random();
      if (rSize > 0.95) {
        sizes[i] = 2.5; // GIANT "Chunk"
      } else if (rSize > 0.7) {
        sizes[i] = 1.5; // Medium
      } else {
        sizes[i] = 0.8; // Standard
      }

      // Color gradient: Core vs Surface
      let c;
      if (radius < 0.6) {
        // Darker/Greener core
        c = new THREE.Color().lerpColors(colorCore, color2, Math.random());
      } else {
        // Bright Surface
        c = new THREE.Color().lerpColors(color1, color2, Math.abs(y));
      }

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, []);

  // 2. Generate Halo/Ring Particles (Enhanced Bands)
  const haloGeometry = useMemo(() => {
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const randoms = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color('#22d3ee');
    const colorBlue = new THREE.Color('#60a5fa');
    const colorWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;

      // Distinct Saturn-like Bands
      let radius = 0;
      const r = Math.random();

      if (r < 0.25) {
        radius = 1.35 + Math.random() * 0.15; // Inner Dense Ring
      } else if (r < 0.35) {
        // GAP
        radius = 1.6 + Math.random() * 0.02; // Thin middle ring
      } else {
        radius = 1.75 + Math.random() * 0.5; // Outer Diffuse Ring
      }

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 0.05; // Extremely flat

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Varied sizes for sparkle
      sizes[i] = Math.random() * 0.8 + 0.4;
      if (Math.random() > 0.9) sizes[i] = 1.5; // Occasional large debris

      randoms[i] = Math.random();

      // Color variation
      let c;
      if (Math.random() > 0.95) {
        c = colorWhite; // Sparkle
      } else {
        c = new THREE.Color().lerpColors(colorCyan, colorBlue, radius / 2.5);
      }

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, []);


  // Base Planet Material - SHRUNK to solve "Black Void"
  // It only exists to block stars BEHIND the planet, not the core.
  const planetBaseMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#000000',
      opacity: 0.95,
      transparent: true,
    });
  }, []);

  // CIRCULAR Particle Material Shader
  const pointCloudMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: typeof window !== 'undefined' ? window.devicePixelRatio : 2 },
        uBaseSize: { value: 8.0 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uBaseSize;
        
        attribute float size;
        attribute vec3 color;
        
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vColor = color;
          vAlpha = 1.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          gl_PointSize = uBaseSize * size * uPixelRatio * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
          
          gl_FragColor = vec4(vColor, alpha * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  const haloMaterial = useMemo(() => {
    const mat = pointCloudMaterial.clone();
    mat.uniforms.uBaseSize.value = 5.0;
    mat.vertexShader = `
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uBaseSize;
        
        attribute float size;
        attribute vec3 color;
        attribute float aRandom; 
        
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vColor = color;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          float blink = sin(uTime * 1.5 + aRandom * 10.0) * 0.5 + 0.5;
          vAlpha = 0.4 + blink * 0.6;
          
          gl_PointSize = uBaseSize * size * uPixelRatio * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `;
    return mat;
  }, [pointCloudMaterial]);


  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.05;

      if (planetParticlesRef.current) {
        planetParticlesRef.current.rotation.y = time * 0.05;
        planetParticlesRef.current.position.copy(meshRef.current.position);
        planetParticlesRef.current.scale.copy(meshRef.current.scale);
      }

      if (haloRef.current) {
        haloRef.current.position.copy(meshRef.current.position);
        haloRef.current.scale.copy(meshRef.current.scale);
        haloRef.current.rotation.y = time * 0.03;
        haloRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;
        haloRef.current.rotation.x = Math.PI * 0.1;
      }

      if (haloMaterial.uniforms) haloMaterial.uniforms.uTime.value = time;
      if (pointCloudMaterial.uniforms) pointCloudMaterial.uniforms.uTime.value = time;

      let targetScale = 1;
      let targetX = 0;
      let targetZ = 0;

      if (scrollProgress < 0.25) {
        const t = scrollProgress / 0.25;
        targetScale = 1.1 + t * 0.1;
        targetX = 0.5;
        targetZ = 0;
      } else if (scrollProgress < 0.5) {
        const t = (scrollProgress - 0.25) / 0.25;
        targetScale = 1.2 - t * 0.35;
        targetX = 0.5 + t * 1.8;
        targetZ = -t * 0.5;
      } else if (scrollProgress < 0.75) {
        const t = (scrollProgress - 0.5) / 0.25;
        targetScale = 0.85 + t * 0.6;
        targetX = 2.3 - t * 2.8;
        targetZ = -0.5 + t * 1.2;
      } else {
        const t = (scrollProgress - 0.75) / 0.25;
        targetScale = 1.45 - t * 0.25;
        targetX = -0.5 + t * 0.5;
        targetZ = 0.7 - t * 0.7;
      }

      const lerpFactor = 0.05;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, lerpFactor));
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, lerpFactor);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, lerpFactor);
    }
  });

  return (
    <group>
      {/* Occlusion Sphere (Black) - DRASTICALLY SHRUNK to 0.3 */}
      {/* This allows seeing all the internal particles while blocking stars *behind* the very core */}
      <mesh ref={meshRef} material={planetBaseMaterial}>
        <sphereGeometry args={[0.3, 32, 32]} />
      </mesh>

      {/* Planet Points (Full Volumetric) */}
      <points ref={planetParticlesRef} geometry={planetParticlesGeometry} material={pointCloudMaterial} />

      {/* Ring Points */}
      <points ref={haloRef} geometry={haloGeometry} material={haloMaterial} />
    </group>
  );
}
