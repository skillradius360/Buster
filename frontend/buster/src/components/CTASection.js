export default function CTASection() {
    return (
        <section className="relative z-20 mx-auto max-w-4xl px-4 pb-24 sm:px-6 md:pb-32">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-green-400/[0.04] to-cyan-400/[0.02] p-10 text-center backdrop-blur-sm sm:p-14 md:p-20">
                <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-green-400/10 blur-[80px]" />
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-cyan-400/8 blur-[60px]" />
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-green-400/10 animate-[border-glow_4s_ease-in-out_infinite]" />

                <div className="relative z-10">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Ready to Verify?
                    </h2>
                    <p className="mx-auto mb-8 max-w-lg text-sm text-gray-400 md:text-base">
                        Join thousands of journalists, researchers, and trust & safety teams
                        who rely on Buster to separate truth from fabrication.
                    </p>

                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <a
                            href="#upload"
                            className="group inline-flex items-center gap-2 rounded-full bg-green-400 px-8 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:bg-green-300 hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] active:scale-95"
                        >
                            Start Free Analysis
                            <svg
                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 rounded-full border border-white/12 px-8 py-3.5 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/25 hover:bg-white/5 hover:text-white"
                        >
                            View API Docs
                        </a>
                    </div>

                    <p className="mt-6 text-[11px] text-gray-600">
                        No account required • 10 free scans per day • Enterprise API available
                    </p>
                </div>
            </div>
        </section>
    );
}
