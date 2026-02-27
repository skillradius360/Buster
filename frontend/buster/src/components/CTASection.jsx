export default function CTASection() {
    return (
        <section className="relative mx-auto max-w-5xl px-4 pb-14 sm:px-6 md:pb-20">
            <div className="relative overflow-hidden rounded-3xl bg-[var(--dark-bg)] p-10 text-center sm:p-14 md:p-20">
                <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[var(--accent)]/10 blur-[100px]" />
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-[var(--accent)]/8 blur-[80px]" />

                <div className="relative z-10">
                    <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Build trust in what{" "}
                        <br className="hidden sm:block" />
                        you see online.
                    </h2>
                    <p className="mx-auto mb-8 max-w-lg text-base text-white/60">
                        Built for journalists, researchers, and trust & safety teams
                        who need to separate truth from fabrication.
                    </p>

                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <a
                            href="#upload"
                            className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3.5 text-sm font-bold text-[var(--foreground)] shadow-lg transition-all duration-300 hover:bg-[var(--accent-hover)] hover:shadow-xl active:scale-95"
                        >
                            Start Free Analysis
                            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/30 hover:bg-white/5 hover:text-white"
                        >
                            View API Docs
                        </a>
                    </div>

                    <p className="mt-6 text-xs text-white/40">
                        No account required • Free to use • Enterprise API available
                    </p>
                </div>
            </div>
        </section>
    );
}
