'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetProps {
  scrollProgress: number;
}

export default function Planet({ scrollProgress }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Points>(null);
  const planetParticlesRef = useRef<THREE.Points>(null);

  // 1. Generate Structured Planet Particles (Full Volumetric)
  const planetParticlesGeometry = useMemo(() => {
    // High count for density
    const particleCount = 13000;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#06b6d4'); // Cyan
    const color2 = new THREE.Color('#3b82f6'); // Blue
    const colorCore = new THREE.Color('#10b981'); // Emerald core

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden Angle

    for (let i = 0; i < particleCount; i++) {
      // FULL VOLUMETRIC DISTRIBUTION (Radius 0 to 1)
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

      // Size variation
      const rSize = Math.random();
      if (rSize > 0.95) {
        sizes[i] = 2.5;
      } else if (rSize > 0.7) {
        sizes[i] = 1.5;
      } else {
        sizes[i] = 0.8;
      }

      // Color gradient
      let c;
      if (radius < 0.6) {
        c = new THREE.Color().lerpColors(colorCore, color2, Math.random());
      } else {
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

  // 2. Generate Halo/Ring Particles
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

      let radius = 0;
      const r = Math.random();

      if (r < 0.25) {
        radius = 1.35 + Math.random() * 0.15;
      } else if (r < 0.35) {
        radius = 1.6 + Math.random() * 0.02;
      } else {
        radius = 1.75 + Math.random() * 0.5;
      }

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 0.05;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      sizes[i] = Math.random() * 0.8 + 0.4;
      if (Math.random() > 0.9) sizes[i] = 1.5;

      randoms[i] = Math.random();

      let c;
      if (Math.random() > 0.95) {
        c = colorWhite;
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


  // Base Planet Material
  const planetBaseMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#000000',
      opacity: 0.95,
      transparent: true,
    });
  }, []);

  // CIRCULAR Particle Material Shader with Dispersal Logic
  const pointCloudMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: typeof window !== 'undefined' ? window.devicePixelRatio : 2 },
        uBaseSize: { value: 8.0 },
        uScatter: { value: 0.0 }, // New uniform for dispersal
      },
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uBaseSize;
        uniform float uScatter;
        
        attribute float size;
        attribute vec3 color;
        
        varying vec3 vColor;
        varying float vAlpha;
        
        // Simplex noise function for organic scatter
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
          const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
          const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
          
          vec3 i  = floor(v + dot(v, C.yyy) );
          vec3 x0 = v - i + dot(i, C.xxx) ;
          
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );
          
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
          vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
          
          i = mod289(i);
          vec4 p = permute( permute( permute( 
                     i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                   
          float n_ = 0.142857142857; // 1.0/7.0
          vec3  ns = n_ * D.wyz - D.xzx;
          
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
          
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
          
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          
          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );
          
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
          
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                        dot(p2,x2), dot(p3,x3) ) );
        }

        void main() {
          vColor = color;
          vAlpha = 1.0;
          
          vec3 pos = position;
          
          // Scatter Logic
          // We move the particle OUTWARDS along its normal (approximated by position for sphere)
          // and add some noise for randomness so it looks like "building up"
          
          float noiseVal = snoise(pos * 2.0 + uTime * 0.5);
          vec3 direction = normalize(pos);
          
          // Combine radial explode with noise
          vec3 scatterOffset = direction * (10.0 * uScatter) + vec3(noiseVal) * (5.0 * uScatter);
          
          vec3 newPos = pos + scatterOffset;
          
          vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
          
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
        uniform float uScatter;
        
        attribute float size;
        attribute vec3 color;
        attribute float aRandom; 
        
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vColor = color;
          
          // Scatter rings slightly differently - simpler expansion
          vec3 pos = position + (normalize(position) * uScatter * 15.0);
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          float blink = sin(uTime * 1.5 + aRandom * 10.0) * 0.5 + 0.5;
          // Fade out as we scatter
          vAlpha = (0.4 + blink * 0.6) * (1.0 - clamp(uScatter * 2.0, 0.0, 1.0));
          
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

      // Update Uniforms
      if (haloMaterial.uniforms) haloMaterial.uniforms.uTime.value = time;
      if (pointCloudMaterial.uniforms) pointCloudMaterial.uniforms.uTime.value = time;

      // START SCROLL LOGIC
      // Section count: 4
      // 0: Hero
      // 1: Features
      // 2: About
      // 3: CTA

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

      // Ensure scatter is 0 for homepage
      if (pointCloudMaterial.uniforms) pointCloudMaterial.uniforms.uScatter.value = 0;
      if (haloMaterial.uniforms) haloMaterial.uniforms.uScatter.value = 0;
    }
  });

  return (
    <group>
      {/* Occlusion Sphere */}
      <mesh ref={meshRef} material={planetBaseMaterial}>
        <sphereGeometry args={[0.3, 32, 32]} />
      </mesh>

      {/* Planet Points */}
      <points ref={planetParticlesRef} geometry={planetParticlesGeometry} material={pointCloudMaterial} />

      {/* Ring Points */}
      <points ref={haloRef} geometry={haloGeometry} material={haloMaterial} />
    </group>
  );
}
