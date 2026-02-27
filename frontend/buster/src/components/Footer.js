export default function Footer() {
    return (
        <footer className="relative bg-[var(--dark-bg)] px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div className="col-span-2 md:col-span-1">
                        <div className="mb-4 flex items-center gap-2 text-lg font-extrabold text-white">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)]">
                                <svg width="12" height="12" fill="none" stroke="#000" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.744c0 5.552 3.84 10.21 9 11.656 5.16-1.446 9-6.104 9-11.656 0-1.294-.216-2.538-.614-3.699A11.96 11.96 0 0012 2.714z" />
                                </svg>
                            </div>
                            Buster
                        </div>
                        <p className="max-w-xs text-sm leading-relaxed text-white/40">
                            AI-powered forensic detection for a world where seeing isn&apos;t believing.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-white">Product</h4>
                        <ul className="space-y-3">
                            {["Link Analysis", "Video Scan", "API Access", "Platform Support"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-white/40 transition-colors hover:text-white/70">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-white">Resources</h4>
                        <ul className="space-y-3">
                            {["Documentation", "Research Papers", "Blog", "Status Page"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-white/40 transition-colors hover:text-white/70">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-white">Legal</h4>
                        <ul className="space-y-3">
                            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-white/40 transition-colors hover:text-white/70">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
                    <p className="text-xs text-white/30">
                        © 2026 Buster. All rights reserved.
                    </p>
                    <p className="text-xs text-white/20">
                        Built to defend truth in the age of generative AI.
                    </p>
                </div>
            </div>
        </footer>
    );
}
