'use client';

interface HeroProps {
    isActive: boolean;
}

export default function Hero({ isActive }: HeroProps) {
    return (
        <section className="section hero-section">
            <div
                style={{
                    opacity: isActive ? 1 : 0.3,
                    transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <div className="hero-badge">
                    Three.js UX Showcase
                </div>

                <h1
                    className="hero-title"
                    style={{ marginTop: '1.5rem' }}
                >
                    Elevate Your Digital<br />Experience
                </h1>

                <p className="hero-subtitle" style={{ marginTop: '1.5rem' }}>
                    Discover how <span className="hero-highlight">immersive 3D elements</span> can
                    transform your web presence. This showcase demonstrates the power of Three.js
                    combined with scroll-driven animations to create unforgettable user experiences.
                </p>

                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        marginTop: '2.5rem',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    <button className="btn-primary">
                        <span>Explore the Code</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                    <button className="btn-secondary">View on GitHub</button>
                </div>
            </div>

            <div className="scroll-indicator">
                <span>Scroll to explore</span>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                >
                    <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
            </div>
        </section>
    );
}
