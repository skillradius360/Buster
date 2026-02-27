export default function Footer() {
    return (
        <footer className="relative z-20 border-t border-white/[0.06] px-4 py-12 sm:px-6">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div className="col-span-2 md:col-span-1">
                        <div className="mb-4 flex items-center gap-1.5 text-sm font-black tracking-tighter uppercase">
                            <div className="flex h-5 w-5 items-center justify-center rounded bg-green-400">
                                <svg width="10" height="10" fill="none" stroke="#000" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.744c0 5.552 3.84 10.21 9 11.656 5.16-1.446 9-6.104 9-11.656 0-1.294-.216-2.538-.614-3.699A11.96 11.96 0 0012 2.714z" />
                                </svg>
                            </div>
                            Bus<span className="text-green-400">ter</span>
                        </div>
                        <p className="max-w-xs text-xs leading-relaxed text-gray-600">
                            AI-powered forensic detection for a world where seeing isn&apos;t believing.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 text-xs font-bold text-white">Product</h4>
                        <ul className="space-y-2.5">
                            {["Image Analysis", "Video Scan", "API Access", "Batch Upload"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-xs text-gray-500 transition-colors hover:text-white">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-xs font-bold text-white">Resources</h4>
                        <ul className="space-y-2.5">
                            {["Documentation", "Research Papers", "Blog", "Status Page"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-xs text-gray-500 transition-colors hover:text-white">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-xs font-bold text-white">Legal</h4>
                        <ul className="space-y-2.5">
                            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-xs text-gray-500 transition-colors hover:text-white">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
                    <p className="text-[11px] text-gray-600">
                        © 2026 Buster. All rights reserved.
                    </p>
                    <p className="text-[10px] text-gray-700">
                        Built to defend truth in the age of generative AI.
                    </p>
                </div>
            </div>
        </footer>
    );
}
