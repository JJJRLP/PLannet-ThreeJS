'use client';

interface FeaturesProps {
    isActive: boolean;
    sectionProgress: number;
}

// SVG Icons as React components
const AIIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
        <circle cx="9" cy="13" r="1" fill="currentColor" />
        <circle cx="15" cy="13" r="1" fill="currentColor" />
        <path d="M9 17h6" />
    </svg>
);

const BlockchainIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="15" y="3" width="6" height="6" rx="1" />
        <rect x="9" y="15" width="6" height="6" rx="1" />
        <path d="M6 9v3a1 1 0 0 0 1 1h3M18 9v3a1 1 0 0 1-1 1h-3M9 18v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
    </svg>
);

const DesignIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="2.5" />
        <circle cx="6.5" cy="13.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
        <path d="M11 6.5H6.5a4 4 0 0 0-4 4v.5" />
        <path d="M9 13.5V18a4 4 0 0 0 4 4h.5" />
        <path d="M17.5 15V10a4 4 0 0 0-4-4h-.5" />
    </svg>
);

const PerformanceIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
);

const TechIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
);

const ResponsiveIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" />
    </svg>
);

const features = [
    {
        icon: <AIIcon />,
        title: 'AI-Powered Automation',
        description:
            'We help you streamline operations with intelligent automation. Our AI solutions analyze your workflows and implement smart systems that save time and reduce costs.',
    },
    {
        icon: <BlockchainIcon />,
        title: 'Secure Blockchain Solutions',
        description:
            'Our team guides you through implementing blockchain technology. From smart contracts to secure transactions, we build trust into your digital infrastructure.',
    },
    {
        icon: <DesignIcon />,
        title: 'Immersive Digital Experiences',
        description:
            'We craft engaging 3D interfaces and interactive elements that captivate your audience. Let us help you create memorable digital experiences that stand out.',
    },
    {
        icon: <PerformanceIcon />,
        title: 'Optimized Performance',
        description:
            'Every solution we deliver is built for speed and efficiency. We ensure smooth 60fps animations and fast load times across all devices for your users.',
    },
    {
        icon: <TechIcon />,
        title: 'Modern Technology Stack',
        description:
            'Our experts work with industry-leading tools like Next.js, Three.js, and GSAP to bring your vision to life with cutting-edge technology.',
    },
    {
        icon: <ResponsiveIcon />,
        title: 'Cross-Platform Compatibility',
        description:
            'We design and develop solutions that work seamlessly on every screen size. Your users get a premium experience whether on desktop, tablet, or mobile.',
    },
];

export default function Features({ isActive, sectionProgress }: FeaturesProps) {
    return (
        <section className="section features-section">
            <div style={{ width: '100%', maxWidth: 'var(--content-max-width)', margin: '0 auto' }}>
                <div
                    className="features-header"
                    style={{
                        margin: '0 auto 3rem',
                        opacity: isActive ? 1 : 0.3,
                        transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.8s ease',
                    }}
                >
                    <span className="section-label">How We Help</span>
                    <h2 className="section-title" style={{ marginTop: '1rem' }}>
                        Innovative Solutions for Your Business
                    </h2>
                    <p className="section-description" style={{ marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
                        At Skylos Solutions, we partner with you to implement cutting-edge technology
                        that transforms how your business operates and connects with customers.
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => {
                        const delay = index * 0.08;
                        const cardProgress = Math.max(0, Math.min(1, (sectionProgress - delay) * 2.5));

                        return (
                            <div
                                key={feature.title}
                                className="feature-card"
                                style={{
                                    opacity: isActive ? Math.max(0.3, cardProgress) : 0.2,
                                    transform: isActive
                                        ? `translateY(${(1 - cardProgress) * 20}px)`
                                        : 'translateY(30px)',
                                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${delay}s`,
                                }}
                            >
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
