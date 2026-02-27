"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <header className="fixed top-6 z-50 flex w-full justify-center px-4">
                <nav
                    id="main-nav"
                    className={`flex items-center gap-6 rounded-full border px-6 py-2.5 shadow-2xl backdrop-blur-[30px] transition-all duration-500 md:gap-10 md:px-8 md:py-3 ${scrolled
                        ? "border-white/15 bg-[rgba(5,5,5,0.92)]"
                        : "border-white/8 bg-[rgba(10,10,10,0.7)]"
                        }`}
                >
                    <a href="#" className="flex items-center gap-1.5 text-sm font-black tracking-tighter uppercase">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-green-400">
                            <svg width="14" height="14" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.744c0 5.552 3.84 10.21 9 11.656 5.16-1.446 9-6.104 9-11.656 0-1.294-.216-2.538-.614-3.699A11.96 11.96 0 0012 2.714z" />
                            </svg>
                        </div>
                        Bus<span className="text-green-400">ter</span>
                    </a>

                    <div className="hidden items-center gap-6 text-[10px] font-semibold tracking-[0.25em] text-gray-400 uppercase md:flex">
                        <a href="#features" className="transition-colors duration-300 hover:text-white">Features</a>
                        <a href="#how-it-works" className="transition-colors duration-300 hover:text-white">How it Works</a>
                        <a href="#about" className="transition-colors duration-300 hover:text-white">About</a>
                    </div>

                    <button
                        id="analyze-btn"
                        className="rounded-full bg-white px-4 py-1.5 text-[10px] font-black tracking-widest text-black uppercase transition-all duration-300 hover:bg-green-400 hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] active:scale-95 md:px-5"
                    >
                        Try Now
                    </button>

                    <button
                        className="flex h-8 w-8 items-center justify-center text-white md:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                            </svg>
                        )}
                    </button>
                </nav>
            </header>

            {mobileOpen && (
                <div className="fixed inset-0 z-40 flex flex-col bg-[#030303]/98 pt-24 backdrop-blur-xl">
                    <nav className="flex flex-col items-center gap-6 px-6 py-8">
                        {["Features", "How it Works", "About"].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                                onClick={() => setMobileOpen(false)}
                                className="text-2xl font-bold text-white/80 transition-colors hover:text-green-400"
                            >
                                {item}
                            </a>
                        ))}
                        <button className="mt-4 rounded-full bg-green-400 px-8 py-3 text-sm font-black tracking-wider text-black uppercase">
                            Try Now
                        </button>
                    </nav>
                </div>
            )}
        </>
    );
}
