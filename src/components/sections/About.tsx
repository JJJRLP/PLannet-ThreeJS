'use client';

interface AboutProps {
    isActive: boolean;
    sectionProgress: number;
}

export default function About({ isActive, sectionProgress }: AboutProps) {
    return (
        <section className="section about-section">
            <div
                style={{
                    opacity: isActive ? 1 : 0.3,
                    transform: isActive ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    maxWidth: '1000px',
                    padding: '0 2rem',
                }}
            >
                <span className="section-label">How It Works</span>
                <h2 className="section-title" style={{ marginTop: '1rem' }}>
                    Three.js + Scroll = Magic
                </h2>
                <p className="section-description" style={{ marginTop: '1.5rem' }}>
                    This demo combines the power of Three.js for 3D rendering with GSAP ScrollTrigger
                    to create scroll-synchronized animations. As you scroll, the planet responds —
                    moving, scaling, and transforming to create an immersive narrative.
                </p>

                {/* Code Preview */}
                <div
                    className="code-block"
                    style={{
                        opacity: isActive ? Math.min(1, sectionProgress * 2) : 0,
                        transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.6s ease 0.2s',
                        margin: '2.5rem auto',
                    }}
                >
                    <code>
                        <span className="code-comment">// Scroll-driven planet transformation</span><br />
                        <span className="code-keyword">const</span> {'{'} scrollProgress {'}'} = <span className="code-function">useScrollAnimation</span>();<br /><br />
                        <span className="code-comment">// Planet responds to scroll position</span><br />
                        planet.<span className="code-function">scale</span>.<span className="code-function">setScalar</span>(1 + scrollProgress * 0.5);<br />
                        planet.<span className="code-function">rotation</span>.y = scrollProgress * Math.PI;
                    </code>
                </div>

                {/* Stats */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '1.5rem',
                        marginTop: '3rem',
                        width: '100%',
                    }}
                >
                    {[
                        { value: '60', label: 'FPS Target' },
                        { value: '<16ms', label: 'Frame Budget' },
                        { value: 'WebGL', label: 'Renderer' },
                        { value: 'GLSL', label: 'Shaders' },
                    ].map((stat, index) => (
                        <div
                            key={stat.label}
                            className="stat-card"
                            style={{
                                opacity: isActive ? Math.min(1, sectionProgress * 3 - index * 0.2) : 0,
                                transform: isActive
                                    ? `scale(${Math.min(1, 0.9 + sectionProgress * 0.2)})`
                                    : 'scale(0.9)',
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: `${index * 0.1}s`,
                            }}
                        >
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
