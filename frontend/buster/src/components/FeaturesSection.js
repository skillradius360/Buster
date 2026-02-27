const features = [
    {
        icon: (
            <svg width="20" height="20" fill="none" stroke="#4ade80" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
        ),
        title: "Noise Pattern Analysis",
        description:
            "Detects invisible sensor noise inconsistencies between real camera captures and AI-rendered textures at the pixel level.",
        rating: "4.9",
        tag: "Image",
    },
    {
        icon: (
            <svg width="20" height="20" fill="none" stroke="#4ade80" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
        ),
        title: "Phoneme Mapping",
        description:
            "Maps vocal frequencies to muscular facial movements in real-time to detect lip-sync deepfakes in video content.",
        rating: "4.8",
        tag: "Video",
    },
    {
        icon: (
            <svg width="20" height="20" fill="none" stroke="#4ade80" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.744c0 5.552 3.84 10.21 9 11.656 5.16-1.446 9-6.104 9-11.656 0-1.294-.216-2.538-.614-3.699A11.96 11.96 0 0012 2.714z" />
            </svg>
        ),
        title: "Deep Scrutiny Layer",
        description:
            "Final-pass neural network designed to catch the most sophisticated frame-blending and generative adversarial artifacts.",
        rating: "5.0",
        tag: "AI",
    },
    {
        icon: (
            <svg width="20" height="20" fill="none" stroke="#4ade80" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
            </svg>
        ),
        title: "Metadata Forensics",
        description:
            "Inspects EXIF data, compression artifacts, and file signatures to identify inconsistencies in creation pipelines.",
        rating: "4.7",
        tag: "Meta",
    },
    {
        icon: (
            <svg width="20" height="20" fill="none" stroke="#4ade80" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        title: "Facial Geometry Check",
        description:
            "Analyzes precise facial landmark relationships, eye reflections, and skin micro-texture to flag synthetic faces.",
        rating: "4.9",
        tag: "Face",
    },
    {
        icon: (
            <svg width="20" height="20" fill="none" stroke="#4ade80" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: "Real-Time Processing",
        description:
            "Sub-second analysis pipeline delivers forensic results instantly — no queuing, no waiting. Built for production speed.",
        rating: "4.8",
        tag: "Speed",
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="relative z-20 mx-auto max-w-6xl px-4 pb-24 sm:px-6 md:pb-32">
            <div className="mb-14 text-center md:mb-20">
                <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-green-400/70 uppercase">
                    Detection Capabilities
                </p>
                <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    Six Layers of{" "}
                    <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                        Forensic Analysis
                    </span>
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-sm text-gray-500 md:text-base">
                    Every upload triggers a multi-pass neural pipeline that examines content at levels invisible to the human eye.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-green-400/25 hover:bg-white/[0.04] sm:rounded-3xl sm:p-8"
                    >
                        <div
                            className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity group-hover:animate-[scan-loop_2.5s_infinite_ease-in-out] group-hover:opacity-100"
                            style={{
                                background:
                                    "linear-gradient(to bottom, transparent 48%, rgba(74,222,128,0.2) 50%, transparent 52%)",
                            }}
                        />

                        <span className="absolute right-5 top-5 rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-0.5 text-[9px] font-bold tracking-widest text-gray-500 uppercase">
                            {feature.tag}
                        </span>

                        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-green-400/20 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.08)]">
                            {feature.icon}
                        </div>

                        <h3 className="mb-2 text-[15px] font-bold tracking-tight">
                            {feature.title}
                        </h3>
                        <p className="mb-7 text-xs leading-relaxed text-gray-500">
                            {feature.description}
                        </p>

                        <div className="flex items-center justify-between border-t border-white/5 pt-4">
                            <span className="text-[8px] font-bold tracking-widest text-gray-600 uppercase">
                                Accuracy
                            </span>
                            <span className="font-mono text-sm text-green-400">
                                {feature.rating}<span className="text-gray-600">/5</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
