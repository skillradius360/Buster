"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const leftImages = [
    { src: "/ai-face-1.png", label: "AI Generated", rotate: "-6deg" },
    { src: "/ai-face-3.png", label: "AI Portrait", rotate: "5deg" },
    { src: "/doakes-1.png", label: "Deepfake?", rotate: "-4deg" },
    { src: "/ai-face-5.png", label: "AI Generated", rotate: "7deg" },
];

const rightImages = [
    { src: "/doakes-2.png", label: "Real?", rotate: "4deg" },
    { src: "/e8b57d08cc496c853bd12fd7b86182b7.webp", label: "I see you", rotate: "-5deg" },
    { src: "/ai-face-7.png", label: "AI Artifacts", rotate: "6deg" },
    { src: "/ai-face-2.png", label: "Deepfake", rotate: "-3deg" },
];

function ImageCard({ img, style, className = "" }) {
    return (
        <div
            className={`absolute overflow-hidden rounded-lg border-2 border-white bg-white shadow-lg transition-transform duration-500 hover:z-20 hover:scale-110 sm:rounded-xl md:rounded-2xl ${className}`}
            style={{ transform: `rotate(${img.rotate})`, ...style }}
        >
            <Image src={img.src} alt={img.label} fill className="object-cover" sizes="200px" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-1 pt-3 sm:p-1.5 sm:pt-5 md:p-2 md:pt-6">
                <div className="flex items-center justify-between gap-0.5">
                    <span className="truncate text-[6px] font-semibold text-white/90 sm:text-[8px] md:text-[10px]">{img.label}</span>
                    <span className="shrink-0 rounded-full bg-red-500 px-0.5 py-px text-[5px] font-bold text-white uppercase sm:px-1 sm:text-[6px] md:px-1.5 md:py-0.5 md:text-[8px]">
                        FAKE
                    </span>
                </div>
            </div>
        </div>
    );
}

const leftPositions = [
    { top: "2%", left: "0%" },
    { top: "27%", left: "6%" },
    { top: "52%", left: "1%" },
    { top: "76%", left: "5%" },
];

const rightPositions = [
    { top: "2%", right: "0%" },
    { top: "27%", right: "5%" },
    { top: "52%", right: "0%" },
    { top: "76%", right: "4%" },
];

const typingTexts = [
    "Is this image real or AI?",
    "Detect deepfakes instantly.",
    "Verify any link, bust the fakes.",
    "Don't get fooled by AI.",
];

function TypingHeading() {
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const currentText = typingTexts[textIndex];

        if (isPaused) {
            const pauseTimer = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, 3000);
            return () => clearTimeout(pauseTimer);
        }

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (charIndex < currentText.length) {
                    setCharIndex(charIndex + 1);
                } else {
                    setIsPaused(true);
                }
            } else {
                if (charIndex > 0) {
                    setCharIndex(charIndex - 1);
                } else {
                    setIsDeleting(false);
                    setTextIndex((textIndex + 1) % typingTexts.length);
                }
            }
        }, isDeleting ? 25 : 50);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, textIndex, isPaused]);

    const displayText = typingTexts[textIndex].substring(0, charIndex);

    return (
        <div className="mb-4 sm:mb-5" style={{ height: "clamp(60px, 12vw, 170px)" }}>
            <h1 className="text-2xl font-extrabold leading-[1.15] tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                {displayText}
                <span className="ml-0.5 inline-block w-[3px] rounded-sm bg-[var(--accent)] sm:w-[4px]" style={{ height: "0.85em", animation: "blink-cursor 0.8s step-end infinite" }} />
            </h1>
        </div>
    );
}

export default function HeroSection() {
    const [urlInput, setUrlInput] = useState("");

    return (
        <section className="relative  px-4 pt-20 pb-6 sm:px-6 sm:pt-24 sm:pb-10 md:pt-28 md:pb-12">
            <div className="relative mx-auto max-w-6xl" style={{ minHeight: "clamp(380px, 55vh, 500px)" }}>

                {leftImages.map((img, idx) => (
                    <ImageCard
                        key={`l-${idx}`}
                        img={img}
                        className="hero-card"
                        style={{
                            top: leftPositions[idx].top,
                            left: leftPositions[idx].left,
                        }}
                    />
                ))}

                {rightImages.map((img, idx) => (
                    <ImageCard
                        key={`r-${idx}`}
                        img={img}
                        className="hero-card"
                        style={{
                            top: rightPositions[idx].top,
                            right: rightPositions[idx].right,
                        }}
                    />
                ))}

                <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center justify-center py-4 text-center sm:py-8 md:py-10" style={{ minHeight: "clamp(320px, 45vh, 420px)" }}>

                    <TypingHeading />

                    <p className="mx-auto mb-6 max-w-md text-xs leading-relaxed text-[var(--text-secondary)] sm:mb-8 sm:text-sm md:text-base animate-[fade-in-up_0.6s_ease-out_0.2s_both]">
                        Paste any link from Instagram, X, or any website.
                        Buster runs forensic-grade AI analysis in seconds.
                    </p>

                    <div className="w-full max-w-xl animate-[fade-in-up_0.6s_ease-out_0.3s_both]">
                        <div className="relative flex items-center rounded-xl border border-black/8 bg-white p-1.5 shadow-xl shadow-black/5 transition-all duration-300 focus-within:border-[var(--accent)] focus-within:shadow-[var(--accent)]/10 focus-within:shadow-2xl sm:rounded-2xl sm:p-2 md:rounded-full">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--text-muted)] sm:ml-1 md:h-10 md:w-10 md:ml-2 md:rounded-xl">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                </svg>
                            </div>
                            <input
                                type="url"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                placeholder="Paste the link"
                                className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-xs text-[var(--foreground)] placeholder-[var(--text-muted)] outline-none sm:px-3 sm:py-3 sm:text-sm md:text-base"
                            />
                            <button className="shrink-0 rounded-lg bg-[var(--foreground)] px-3.5 py-2.5 text-[11px] font-semibold text-white transition-all duration-300 hover:bg-[var(--foreground)]/90 active:scale-95 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm md:rounded-full md:px-7">
                                <span className="hidden sm:inline">Analyze</span>
                                <svg className="h-4 w-4 sm:hidden" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center justify-center gap-1 text-[9px] text-[var(--text-muted)] sm:mt-4 sm:gap-1.5 sm:text-[11px]">
                            {["Instagram", "X", "Facebook", "YouTube", "TikTok", "Any URL"].map((p) => (
                                <span key={p} className="rounded-full border border-black/6 bg-white px-2 py-0.5 font-medium text-[var(--text-secondary)] sm:px-2.5 sm:py-1">
                                    {p}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
