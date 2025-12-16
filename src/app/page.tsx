'use client';

import dynamic from 'next/dynamic';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import About from '@/components/sections/About';
import CTA from '@/components/sections/CTA';

// Dynamically import the Scene component to avoid SSR issues with Three.js
const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0a12',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.25rem',
      }}
    >
      Loading 3D Scene...
    </div>
  ),
});

export default function Home() {
  const { scrollProgress, currentSection, sectionProgress } = useScrollAnimation({
    sectionCount: 4,
  });

  return (
    <>
      {/* Stars Background */}
      <div className="stars-bg" />

      {/* Three.js Scene (Fixed Background) */}
      <Scene scrollProgress={scrollProgress} />

      {/* Scrollable Content */}
      <main className="main-content">
        <Hero isActive={currentSection === 0} />
        <Features
          isActive={currentSection === 1}
          sectionProgress={currentSection === 1 ? sectionProgress : 0}
        />
        <About
          isActive={currentSection === 2}
          sectionProgress={currentSection === 2 ? sectionProgress : 0}
        />
        <CTA isActive={currentSection === 3} />
      </main>
    </>
  );
}
