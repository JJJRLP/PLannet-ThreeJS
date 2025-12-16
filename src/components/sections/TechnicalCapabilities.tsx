import React from 'react';

interface TechnicalCapabilitiesProps {
    isActive: boolean;
    sectionProgress: number;
    className?: string;
    isStandalone?: boolean;
}

export default function TechnicalCapabilities({ isActive, sectionProgress, className = '', isStandalone = false }: TechnicalCapabilitiesProps) {
    return (
        <section className={`${isStandalone ? '' : 'section'} technical-section ${className}`}>
            <div
                style={{
                    opacity: isActive ? 1 : 0.3,
                    transform: isActive ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Header */}
                <div className="section-label">Under the Hood</div>
                <h2 className="section-title" style={{ marginTop: '1rem', marginBottom: '3rem' }}>
                    Technical Architecture
                </h2>

                <div className="technical-grid">
                    {/* Feature Cards */}
                    <div className="tech-card">
                        <h3 className="text-cyan">Particle System</h3>
                        <p>
                            Over 13,000 individual points rendered in real-time using custom GLSL shaders to create volumetric density.
                        </p>
                    </div>

                    <div className="tech-card">
                        <h3 className="text-blue">Performance First</h3>
                        <p>
                            Utilizing React Three Fiber&apos;s event loop and optimized buffer geometries to ensure 60fps performance.
                        </p>
                    </div>

                    <div className="tech-card">
                        <h3 className="text-purple">Scroll Triggers</h3>
                        <p>
                            Seamless integration between DOM scroll events and WebGL scene updates for unified interaction.
                        </p>
                    </div>
                </div>

                {/* New Code Window Section */}
                <div
                    className="code-block-container"
                    style={{
                        marginTop: '4rem',
                        width: '100%',
                        maxWidth: '900px',
                        padding: '0 1rem',
                    }}
                >
                    <p className="section-description" style={{ margin: '0 auto 2rem auto', textAlign: 'center' }}>
                        This project uses custom GLSL shaders to control particle movement.
                        Here is the core logic for the "Scatter" effect:
                    </p>

                    <div className="code-block" style={{ margin: '0 auto', width: '100%', maxWidth: '100%' }}>
                        <code>
                            <span className="code-comment">// GLSL Vertex Shader Logic</span><br />
                            <span className="code-keyword">void</span> <span className="code-function">main</span>() {'{'}<br />
                            &nbsp;&nbsp;<span className="code-keyword">vec3</span> pos = position;<br />
                            &nbsp;&nbsp;<span className="code-comment">// Add noise for organic dispersal</span><br />
                            &nbsp;&nbsp;<span className="code-keyword">float</span> noise = <span className="code-function">snoise</span>(pos * 2.0 + uTime);<br />
                            &nbsp;&nbsp;<span className="code-keyword">vec3</span> dir = <span className="code-function">normalize</span>(pos);<br /><br />
                            &nbsp;&nbsp;<span className="code-comment">// Expand based on scatter uniform</span><br />
                            &nbsp;&nbsp;<span className="code-keyword">vec3</span> offset = dir * (15.0 * uScatter) + noise * (5.0 * uScatter);<br />
                            &nbsp;&nbsp;<span className="code-keyword">vec4</span> mvPosition = modelViewMatrix * <span className="code-keyword">vec4</span>(pos + offset, 1.0);<br />
                        </code>
                    </div>
                </div>
            </div>
        </section>
    );
}
