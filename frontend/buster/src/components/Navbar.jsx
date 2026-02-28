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
            <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6">
                <nav
                    id="main-nav"
                    className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-6 py-3 transition-all duration-500 ${scrolled
                        ? "border-black/8 bg-white/90 shadow-lg shadow-black/5 backdrop-blur-xl"
                        : "border-transparent bg-white/60 backdrop-blur-sm"
                        }`}
                >
                    <a href="#" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent)]">
                            <svg width="16" height="16" fill="none" stroke="#000" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.744c0 5.552 3.84 10.21 9 11.656 5.16-1.446 9-6.104 9-11.656 0-1.294-.216-2.538-.614-3.699A11.96 11.96 0 0012 2.714z" />
                            </svg>
                        </div>
                        <span>Buster</span>
                    </a>

                    <div className="hidden items-center gap-8 text-sm font-medium text-[var(--text-secondary)] md:flex">
                        <a href="#features" className="transition-colors duration-300 hover:text-[var(--foreground)]">Features</a>
                        <a href="#how-it-works" className="transition-colors duration-300 hover:text-[var(--foreground)]">How it Works</a>
                        <a href="#testimonials" className="transition-colors duration-300 hover:text-[var(--foreground)]">Reviews</a>
                    </div>

                    <button
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--foreground)] md:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                            </svg>
                        )}
                    </button>
                </nav>
            </header>

            {mobileOpen && (
                <div className="fixed inset-0 z-40 flex flex-col bg-white pt-24">
                    <nav className="flex flex-col items-center gap-6 px-6 py-8">
                        {["Features", "How it Works", "Reviews"].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                                onClick={() => setMobileOpen(false)}
                                className="text-xl font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--accent-hover)]"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </>
    );
}
