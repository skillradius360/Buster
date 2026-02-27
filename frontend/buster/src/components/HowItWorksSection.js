const steps = [
    {
        number: "01",
        title: "Upload or Paste",
        description:
            "Drag-and-drop an image, upload a file, or paste a URL. We accept all major formats including JPG, PNG, WebP, and MP4 video.",
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Neural Analysis",
        description:
            "Our six-layer forensic pipeline runs in parallel — noise patterns, phoneme mapping, metadata forensics, facial geometry, and deep scrutiny.",
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "Confidence Report",
        description:
            "Receive a detailed breakdown with an overall authenticity score, individual layer results, and highlighted regions of concern.",
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
        ),
    },
];

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="relative z-20 mx-auto max-w-5xl px-4 pb-24 sm:px-6 md:pb-32">
            <div className="mb-16 text-center md:mb-20">
                <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-green-400/70 uppercase">
                    How It Works
                </p>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    Three Steps to{" "}
                    <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                        Truth
                    </span>
                </h2>
            </div>

            <div className="relative">
                <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-green-400/30 via-green-400/10 to-transparent md:left-1/2 md:block" />

                <div className="space-y-12 md:space-y-20">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className={`relative flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-12 ${idx % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            <div className="absolute left-0 hidden h-16 w-16 items-center justify-center rounded-2xl border border-green-400/20 bg-[#0a0a0a] font-mono text-xl font-bold text-green-400 md:left-1/2 md:flex md:-translate-x-1/2">
                                {step.number}
                            </div>

                            <div className={`w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm md:w-[calc(50%-4rem)] md:p-8 ${idx % 2 === 1 ? "md:text-right" : ""}`}>
                                <div className={`mb-4 flex items-center gap-3 ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-green-400">
                                        {step.icon}
                                    </div>
                                    <span className="font-mono text-sm text-green-400/50 md:hidden">
                                        {step.number}
                                    </span>
                                </div>
                                <h3 className="mb-2 text-lg font-bold tracking-tight">{step.title}</h3>
                                <p className="text-sm leading-relaxed text-gray-500">{step.description}</p>
                            </div>

                            <div className="hidden md:block md:w-[calc(50%-4rem)]" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
