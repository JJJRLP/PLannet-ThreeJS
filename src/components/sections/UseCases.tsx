import React from 'react';

export default function UseCases() {
    const cases = [
        {
            title: "Immersive E-Commerce",
            description: "Transform static product pages into interactive 3D experiences. Allow customers to rotate, zoom, and explore products from every angle.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
            )
        },
        {
            title: "Data Visualization",
            description: "Turn complex datasets into intuitive 3D visualizations. Perfect for dashboards and analytics platforms where depth reveals patterns.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
            )
        },
        {
            title: "Brand Storytelling",
            description: "Create narrative-driven journeys that guide users through your brand's story. Use spatial audio and 3D transitions to evoke emotion.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
            )
        },
        {
            title: "Interactive Portfolios",
            description: "Stand out in a crowded market with a portfolio that feels like a physical space. Demonstrate technical prowess through the medium itself.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
            )
        }
    ];

    return (
        <section className="section" style={{ minHeight: 'auto', padding: '6rem 0' }}>
            <div className="w-full max-w-5xl mx-auto px-8">
                <div className="section-label">Real World Impact</div>
                <h2 className="section-title text-center mb-16">
                    Beyond the Visuals
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cases.map((item, index) => (
                        <div key={index} className="glass-panel p-10 flex flex-col items-center text-center transition-all duration-300 ease-out hover:-translate-y-2 group">
                            <div className="mb-6 p-4 bg-cyan-500/10 rounded-full border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)] group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-white">
                                {item.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
