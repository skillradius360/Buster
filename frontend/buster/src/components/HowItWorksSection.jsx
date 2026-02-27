const steps = [
    {
        number: "01",
        title: "Copy the Link",
        description: "Find any suspicious content on Instagram, X, Facebook, YouTube, TikTok, or any website. Copy the post or image URL.",
        icon: (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
            </svg>
        ),
        accent: "bg-amber-50 border-amber-200/60",
    },
    {
        number: "02",
        title: "Paste & Analyze",
        description: "Drop the link into Buster's analyzer. Our multi-layer AI pipeline starts scanning the content instantly — no uploads needed.",
        icon: (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
        ),
        accent: "bg-blue-50 border-blue-200/60",
    },
    {
        number: "03",
        title: "Get Your Report",
        description: "Receive a clear confidence score with a detailed breakdown — real or fake, with the evidence to back it up.",
        icon: (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
            </svg>
        ),
        accent: "bg-emerald-50 border-emerald-200/60",
    },
];

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6 md:pb-20">
            <div className="mb-10 text-center md:mb-12">
                <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[var(--accent-hover)] uppercase">
                    How to Use
                </p>
                <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
                    It&apos;s as easy as{" "}
                    <span className="relative inline-block">
                        <span className="relative z-10">1, 2, 3</span>
                        <span className="absolute -bottom-1 left-0 right-0 z-0 h-3 rounded-sm bg-[var(--accent)]/30 md:h-4" />
                    </span>
                </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        className={`group relative overflow-hidden rounded-3xl border ${step.accent} p-8 transition-all duration-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 sm:p-10`}
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-[var(--foreground)] shadow-sm">
                                {step.icon}
                            </div>
                            <span className="text-4xl font-extrabold text-black/8">
                                {step.number}
                            </span>
                        </div>

                        <h3 className="mb-3 text-xl font-bold tracking-tight text-[var(--foreground)]">
                            {step.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
