const features = [
    {
        icon: (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
        ),
        title: "Noise Pattern Analysis",
        description: "Detects invisible sensor noise inconsistencies between real camera captures and AI-rendered textures.",
        color: "bg-amber-50 text-amber-600",
    },
    {
        icon: (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.744c0 5.552 3.84 10.21 9 11.656 5.16-1.446 9-6.104 9-11.656 0-1.294-.216-2.538-.614-3.699A11.96 11.96 0 0012 2.714z" />
            </svg>
        ),
        title: "Deep Scrutiny Layer",
        description: "Final-pass neural network that catches sophisticated frame-blending and generative adversarial artifacts.",
        color: "bg-emerald-50 text-emerald-600",
    },
    {
        icon: (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
            </svg>
        ),
        title: "Metadata Forensics",
        description: "Inspects EXIF data, compression artifacts, and file signatures to identify creation pipeline inconsistencies.",
        color: "bg-purple-50 text-purple-600",
    },
    {
        icon: (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        title: "Facial Geometry Check",
        description: "Analyzes facial landmark relationships, eye reflections, and skin micro-texture to flag synthetic faces.",
        color: "bg-rose-50 text-rose-600",
    },
    {
        icon: (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: "Real-Time Processing",
        description: "Sub-second analysis pipeline delivers forensic results instantly — no queuing, no waiting.",
        color: "bg-sky-50 text-sky-600",
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6 md:pb-20">
            <div className="mb-10 text-center md:mb-12">
                <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[var(--accent-hover)] uppercase">
                    Detection Capabilities
                </p>
                <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
                    Everything you need,{" "}
                    <span className="relative inline-block">
                        <span className="relative z-10">at one place!</span>
                        <span className="absolute -bottom-1 left-0 right-0 z-0 h-3 rounded-sm bg-[var(--accent)]/30 md:h-4" />
                    </span>
                </h2>
                <p className="mx-auto mt-5 max-w-lg text-base text-[var(--text-secondary)]">
                    Every link triggers a multi-pass neural pipeline that examines content at levels invisible to the human eye.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="group relative overflow-hidden rounded-2xl border border-black/6 bg-white p-7 shadow-sm transition-all duration-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/8 sm:rounded-3xl sm:p-8"
                    >
                        <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${feature.color} transition-all duration-400`}>
                            {feature.icon}
                        </div>

                        <h3 className="mb-2 text-base font-bold tracking-tight text-[var(--foreground)]">
                            {feature.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
