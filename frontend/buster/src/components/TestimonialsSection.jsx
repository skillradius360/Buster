const testimonials = [
    {
        quote: "The noise-pattern analysis is genuinely impressive. This is the kind of tool every newsroom needs in the age of AI-generated content.",
        author: "Dr. Sarah Chen",
        role: "Digital Forensics Researcher",
        initials: "SC",
        stars: 5,
    },
    {
        quote: "Being able to just paste a link and get an instant forensic breakdown is a game-changer. No downloads, no setup, just results.",
        author: "Marcus Webb",
        role: "Investigative Journalist",
        initials: "MW",
        stars: 5,
    },
    {
        quote: "The speed is unreal — sub-second analysis. The confidence report gives exactly the evidence trail you need for verification.",
        author: "Priya Desai",
        role: "Trust & Safety Engineer",
        initials: "PD",
        stars: 5,
    },
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6 md:pb-20">
            <div className="mb-10 text-center md:mb-12">
                <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[var(--accent-hover)] uppercase">
                    Early Feedback
                </p>
                <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
                    What people are saying
                </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                {testimonials.map((t, idx) => (
                    <div
                        key={idx}
                        className="group relative overflow-hidden rounded-2xl border border-black/6 bg-white p-7 shadow-sm transition-all duration-400 hover:shadow-lg hover:shadow-black/8 sm:rounded-3xl sm:p-8"
                    >
                        <div className="mb-4 flex gap-1">
                            {Array.from({ length: t.stars }).map((_, i) => (
                                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FFD233">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>

                        <p className="mb-8 text-sm leading-relaxed text-[var(--text-secondary)]">
                            &ldquo;{t.quote}&rdquo;
                        </p>

                        <div className="flex items-center gap-3 border-t border-black/6 pt-5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/20 text-xs font-bold text-[var(--foreground)]">
                                {t.initials}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-[var(--foreground)]">{t.author}</div>
                                <div className="text-xs text-[var(--text-muted)]">{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
