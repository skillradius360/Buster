const testimonials = [
    {
        quote:
            "Buster caught a deepfake that fooled three other detection tools. The noise-pattern analysis is genuinely next-level.",
        author: "Dr. Sarah Chen",
        role: "Digital Forensics Lead, CyberSafe Labs",
        initials: "SC",
    },
    {
        quote:
            "We integrated the API into our newsroom workflow. Every submitted photo now gets scanned before publication. Zero false negatives so far.",
        author: "Marcus Webb",
        role: "Editor-in-Chief, TruthWire Media",
        initials: "MW",
    },
    {
        quote:
            "The speed is unreal — sub-second analysis on a 4K image. And the confidence report gives us exactly the evidence trail we need.",
        author: "Priya Desai",
        role: "Trust & Safety Engineer, SocialGuard",
        initials: "PD",
    },
];

export default function TestimonialsSection() {
    return (
        <section className="relative z-20 mx-auto max-w-6xl px-4 pb-24 sm:px-6 md:pb-32">
            <div className="mb-14 text-center md:mb-16">
                <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-green-400/70 uppercase">
                    Trusted By Experts
                </p>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    What Our Users Say
                </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                {testimonials.map((t, idx) => (
                    <div
                        key={idx}
                        className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm transition-all duration-500 hover:border-white/12 sm:rounded-3xl sm:p-8"
                    >
                        <svg
                            className="mb-5 h-8 w-8 text-green-400/20"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                        </svg>

                        <p className="mb-8 text-sm leading-relaxed text-gray-400">
                            &ldquo;{t.quote}&rdquo;
                        </p>

                        <div className="flex items-center gap-3 border-t border-white/5 pt-5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-green-400/20 to-cyan-400/20 text-[11px] font-bold text-green-400">
                                {t.initials}
                            </div>
                            <div>
                                <div className="text-sm font-bold">{t.author}</div>
                                <div className="text-[11px] text-gray-600">{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
