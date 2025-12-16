'use client';

interface CTAProps {
    isActive: boolean;
}

export default function CTA({ isActive }: CTAProps) {
    return (
        <section className="section cta-section">
            <div
                style={{
                    opacity: isActive ? 1 : 0.3,
                    transform: isActive ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    textAlign: 'center',
                    maxWidth: '800px',
                    padding: '0 2rem',
                }}
            >
                <span className="section-label">Ready to Innovate?</span>
                <h2 className="cta-title" style={{ marginTop: '1rem' }}>
                    Let&apos;s Build Something<br />Extraordinary
                </h2>
                <p
                    className="section-description"
                    style={{
                        marginTop: '1.5rem',
                        marginBottom: '2.5rem',
                    }}
                >
                    Whether you need AI integration, blockchain solutions, or immersive web experiences —
                    we&apos;re here to transform your vision into reality.
                </p>

                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    <a
                        href="https://skylos.solutions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{
                            padding: '1.125rem 2.5rem',
                            fontSize: '1.0625rem',
                        }}
                    >
                        Get in Touch
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </a>
                    <button className="btn-secondary">
                        View Source Code
                    </button>
                </div>

                <p
                    style={{
                        marginTop: '1.5rem',
                        color: 'var(--color-text-muted)',
                        fontSize: '0.8125rem',
                    }}
                >
                    This demo is open source • Built with Next.js, Three.js & GSAP
                </p>
            </div>

            {/* Footer Watermark */}
            <footer className="footer-watermark">
                <p>
                    Designed by{' '}
                    <a
                        href="https://skylos.solutions"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="skylos-brand">SKYLOS</span>
                    </a>
                </p>
                <p style={{ marginTop: '0.375rem', fontSize: '0.75rem' }}>
                    Innovative AI & Blockchain Solutions
                </p>
            </footer>
        </section>
    );
}
