"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ================= IMAGES ================= */

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

/* ================= IMAGE CARD ================= */

function ImageCard({ img, style }) {
    return (
        <div
            className="absolute overflow-hidden rounded-xl border-2 border-white bg-white shadow-lg transition-transform duration-500 hover:z-20 hover:scale-110"
            style={{ transform: `rotate(${img.rotate})`, ...style }}
        >
            <div className="relative w-[130px] h-[170px] sm:w-[160px] sm:h-[210px]">
                <Image src={img.src} alt={img.label} fill className="object-cover" />
            </div>
        </div>
    );
}

/* ================= HERO ================= */

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

        try {
            const response = await fetch(
                "http://localhost:8000/api/fact-check",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        url: urlInput,
                        version: "v1",
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Analysis failed.");
            }

            setResult(data);
            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* ================= HERO SECTION ================= */}

            <section className="relative px-4 pt-24 pb-10 sm:px-6">
                <div className="relative mx-auto max-w-6xl min-h-[480px]">

                    {leftImages.map((img, i) => (
                        <ImageCard key={i} img={img} style={leftPositions[i]} />
                    ))}

                    {rightImages.map((img, i) => (
                        <ImageCard key={i} img={img} style={rightPositions[i]} />
                    ))}

                    <div className="relative z-10 mx-auto max-w-2xl text-center pt-20">

                        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                            Verify Any Post Instantly
                        </h1>

                        <p className="mt-6 text-sm sm:text-base text-gray-600">
                            Paste any Instagram or website link.
                            Buster verifies authenticity using AI.
                        </p>

                        <div className="mt-8 flex items-center rounded-full border bg-white p-2 shadow-xl">
                            <input
                                type="url"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                placeholder="Paste the link..."
                                className="flex-1 px-4 py-3 text-sm outline-none"
                            />
                            <button
                                onClick={handleAnalyze}
                                disabled={isLoading}
                                className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
                            >
                                {isLoading ? "Analyzing..." : "Analyze"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= RESULT SECTION ================= */}

            <section
                ref={resultRef}
                className="px-4 sm:px-6 max-w-4xl mx-auto pb-20"
            >
                {error && (
                    <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center">
                        <div className="text-red-600 font-bold">Analysis Failed</div>
                        <div className="text-sm text-red-500">{error}</div>
                    </div>
                )}

                {result && (
                    <div className="mt-10 bg-white border rounded-3xl shadow-xl p-8">
                        <div className="flex justify-between mb-4">
                            <span className="font-bold uppercase text-xs text-gray-500">
                                Verification Report
                            </span>
                            <span className="px-4 py-1 text-xs font-bold text-white bg-black rounded-full">
                                {result.verdict}
                            </span>
                        </div>

                        <div className="text-4xl font-extrabold">
                            {result.confidence}
                            <span className="text-lg text-gray-500 ml-2">
                                Confidence
                            </span>
                        </div>

                        <p className="mt-6 text-gray-600">
                            {result.explanation}
                        </p>

                        {result.key_sources?.length > 0 && (
                            <div className="mt-6">
                                <h4 className="text-sm font-semibold mb-2">
                                    Sources
                                </h4>
                                {result.key_sources.map((src, i) => (
                                    <a
                                        key={i}
                                        href={src}
                                        target="_blank"
                                        className="block text-blue-600 text-sm hover:underline"
                                    >
                                        {src}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </section>
        </>
    );
}