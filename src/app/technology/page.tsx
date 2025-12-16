'use client';

import dynamic from 'next/dynamic';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import TechnicalCapabilities from '@/components/sections/TechnicalCapabilities';
import UseCases from '@/components/sections/UseCases';
import FAQ from '@/components/sections/FAQ';

// Dynamically import TechScene
const TechScene = dynamic(() => import('@/components/three/TechScene'), {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black" />,
});

export default function TechnologyPage() {
    const { scrollProgress } = useScrollAnimation({ sectionCount: 1 });

    return (
        <div style={{ backgroundColor: '#030712', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
            <div className="stars-bg" />

            {/* 3D Background */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <TechScene scrollProgress={scrollProgress} />
            </div>

            <div className="main-content" style={{ position: 'relative', zIndex: 10 }}>
                {/* HERO SECTION - Using standard hero classes but centered */}
                <section className="section" style={{ minHeight: '80vh', paddingBottom: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '800px',
                        margin: '0 auto',
                        padding: '0 2rem'
                    }}>
                        <div className="hero-badge" style={{ marginBottom: '2rem' }}>
                            SKYLOS SOLUTIONS ARCHITECTURE
                        </div>
                        <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                            Built for Performance.
                        </h1>
                        <p className="hero-subtitle" style={{ fontSize: '1.25rem' }}>
                            We don&apos;t just design websites. We engineer immersive digital experiences using cutting-edge
                            WebGL technology and optimized particle systems.
                        </p>
                    </div>
                </section>

                {/* TECHNICAL SECTION */}
                <TechnicalCapabilities
                    isActive={true}
                    sectionProgress={1}
                    isStandalone={true}
                    className="py-12"
                />

                {/* USE CASES SECTION */}
                <UseCases />

                {/* FAQ SECTION */}
                <FAQ />

                {/* FUNNEL BOTTOM - Professional CTA */}
                <section className="section cta-section" style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '4rem' }}>
                    <div className="glass-card" style={{
                        padding: '4rem',
                        maxWidth: '800px',
                        width: '100%',
                        margin: '0 auto 6rem auto',
                        textAlign: 'center',
                        position: 'relative'
                    }}>
                        <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                            Engineering Digital Excellence
                        </h2>
                        <p className="section-description" style={{ margin: '0 auto 2.5rem auto', fontSize: '1.1rem' }}>
                            Leverage high-performance 3D graphics to create memorable user experiences that drive engagement and conversion.
                        </p>
                        <a
                            href="https://skylos.solutions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem', padding: '1rem 2rem' }}
                        >
                            <span>Partner With Skylos</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </a>
                    </div>

                    {/* SKYLOS FOOTER BRANDING */}
                    <div style={{ textAlign: 'center', opacity: 0.8 }}>
                        <a href="https://skylos.solutions" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <div className="footer-watermark" style={{ position: 'relative', transform: 'none', left: 'auto', bottom: 'auto', display: 'inline-block' }}>
                                <p>Designed by <span className="skylos-brand">SKYLOS</span></p>
                            </div>
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
