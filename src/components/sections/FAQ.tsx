import React from 'react';

export default function FAQ() {
    const faqs = [
        {
            q: "Does 3D affect website performance?",
            a: "When optimized correctly—like we do with instanced meshes and efficient buffer geometries—3D content can run at 60fps even on mobile devices without significantly impacting load times."
        },
        {
            q: "Is this compatible with all browsers?",
            a: "Yes. We use WebGL which is supported by all modern browsers (Chrome, Firefox, Safari, Edge) across desktop and mobile devices."
        },
        {
            q: "Can this be integrated into an existing React app?",
            a: "Absolutely. Our architecture is modular and designed to be dropped into existing Next.js or React applications with minimal configuration."
        },
        {
            q: "How does this impact SEO?",
            a: "Search engines render the DOM content first. We ensure all critical text and semantic HTML remains accessible to crawlers while the 3D scene enhances the user experience layer."
        },
        {
            q: "Do I need 3D models beforehand?",
            a: "Not necessarily. We can generate procedural geometries (like the planet you see here), use particle data, or work with your existing assets."
        },
        {
            q: "How long does implementation take?",
            a: "Depending on complexity, a custom 3D landing page section can be designed and implemented in 1-2 weeks as part of a larger web project."
        }
    ];

    return (
        <section className="section" style={{ minHeight: 'auto', padding: '6rem 0' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
                <h2 className="section-title" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    Common Questions
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {faqs.map((item, index) => (
                        <div key={index} className="glass-panel" style={{
                            padding: '2rem',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ color: '#06b6d4', opacity: 0.8 }}>//</span> {item.q}
                            </h3>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                {item.a}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
