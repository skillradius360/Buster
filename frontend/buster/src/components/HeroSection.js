"use client";

import { useState, useEffect, useRef } from "react";
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
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const resultRef = useRef(null);

    const handleAnalyze = async () => {
        if (!urlInput) return;
        setIsLoading(true);
        setError(null);
        setResult(null);

        // Scroll immediately to loading state
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);

        try {
            const response = await fetch("http://localhost:8000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: urlInput })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || "Failed to analyze link. It might be private or blocked.");
            }
            setResult(data);
            setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
        } catch (err) {
            setError(err.message);
            setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
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
                                    onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                                    placeholder="Paste the link"
                                    className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-xs text-[var(--foreground)] placeholder-[var(--text-muted)] outline-none sm:px-3 sm:py-3 sm:text-sm md:text-base"
                                />
                                <button
                                    onClick={handleAnalyze}
                                    disabled={isLoading}
                                    className="shrink-0 rounded-lg bg-[var(--foreground)] px-3.5 py-2.5 text-[11px] font-semibold text-white transition-all duration-300 hover:bg-[var(--foreground)]/90 active:scale-95 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm md:rounded-full md:px-7 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <span className="hidden sm:inline">{isLoading ? "Analyzing..." : "Analyze"}</span>
                                    {!isLoading && (
                                        <svg className="h-4 w-4 sm:hidden" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    )}
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

            <section ref={resultRef} className="relative px-4 sm:px-6 mt-[-10px] sm:mt-[-20px] max-w-4xl mx-auto z-20 pb-12 sm:pb-20">
                {isLoading && (
                    <div className="flex justify-center py-10 animate-[fade-in-up_0.3s_ease-out_both]">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--background-secondary)] border-b-[var(--foreground)] border-l-[var(--foreground)]"></div>
                            <p className="text-sm font-semibold text-[var(--text-secondary)] tracking-widest uppercase">The Gate is analyzing...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-8 text-center shadow-lg shadow-red-500/10 animate-[fade-in-up_0.3s_ease-out_both] transition-all">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div className="text-xl font-bold tracking-tight text-red-600 mb-2">Analysis Failed</div>
                        <div className="text-sm text-red-500 max-w-md mx-auto">{error}</div>
                    </div>
                )}

                {result && result.results && result.results.map((res, idx) => (
                    <div key={idx} className="mb-8 animate-[fade-in-up_0.4s_ease-out_both] overflow-hidden rounded-3xl sm:rounded-[2.5rem] border border-[var(--background-secondary)] bg-white shadow-2xl shadow-black/5 backdrop-blur-xl transition-all duration-500 hover:shadow-black/10">
                        <div className="flex flex-col md:flex-row md:items-stretch text-left">
                            {(res.base64_image || res.scraped_image_url) && (
                                <div className="relative h-64 w-full md:h-auto md:w-2/5 md:max-w-xs shrink-0 bg-[var(--background)] border-b md:border-b-0 md:border-r border-black/5">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={res.base64_image || res.scraped_image_url} alt={`Scraped preview ${idx + 1}`} referrerPolicy="no-referrer" className="absolute inset-0 h-full w-full object-cover" />
                                </div>
                            )}
                            <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                                <div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase">Buster Final Result {result.results.length > 1 ? `(${idx + 1}/${result.results.length})` : ""}</h3>
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-white uppercase ${res.result && (res.result.includes("FAKE") || res.result.includes("ARTIFICIAL") || res.result.includes("AI")) ? "bg-red-500 shadow-xl shadow-red-500/30" : "bg-emerald-500 shadow-xl shadow-emerald-500/30"} shadow-lg flex items-center gap-2`}>
                                            {res.result && (res.result.includes("FAKE") || res.result.includes("ARTIFICIAL") || res.result.includes("AI")) ? (
                                                <>🚨 <span>FAKE</span></>
                                            ) : (
                                                <>✅ <span>REAL</span></>
                                            )}
                                        </span>
                                    </div>
                                    <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--foreground)] mt-2">
                                        {res.confidence ? Math.round(res.confidence * 100) : "--"}% <span className="text-[var(--text-muted)] font-bold text-2xl sm:text-3xl">Match</span>
                                    </div>

                                    <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                                        {res.result && (res.result.includes("FAKE") || res.result.includes("ARTIFICIAL") || res.result.includes("AI"))
                                            ? "This image contains deepfake artifacts or was generated entirely by an AI."
                                            : "We found no evidence of an AI generator. This content looks highly authentic."}
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-[var(--background-secondary)] flex flex-col gap-2 rounded-xl text-xs text-[var(--text-secondary)]">
                                    <p className="flex items-center justify-between">
                                        <span className="font-semibold text-[var(--text-muted)] uppercase tracking-wider text-[10px]">Processing Engine</span>
                                        <span className="font-mono bg-[var(--background)] border border-[var(--background-secondary)] px-2.5 py-1 rounded-md text-[10px] sm:text-xs">
                                            The Gate ⚡ {res.model_used ? res.model_used.split("/").pop() : "Unknown"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
