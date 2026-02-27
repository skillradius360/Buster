"use client";

import { useState, useRef } from "react";

export default function UploadSection() {
    const [isDragging, setIsDragging] = useState(false);
    const [urlInput, setUrlInput] = useState("");
    const [activeTab, setActiveTab] = useState("upload");
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    return (
        <section id="upload" className="relative z-20 mx-auto max-w-3xl px-4 pb-24 sm:px-6 md:pb-32">
            <div className="mx-auto mb-6 flex w-max items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1">
                <button
                    onClick={() => setActiveTab("upload")}
                    className={`rounded-full px-5 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === "upload"
                        ? "bg-white/10 text-white shadow-lg"
                        : "text-gray-500 hover:text-gray-300"
                        }`}
                >
                    Upload File
                </button>
                <button
                    onClick={() => setActiveTab("url")}
                    className={`rounded-full px-5 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === "url"
                        ? "bg-white/10 text-white shadow-lg"
                        : "text-gray-500 hover:text-gray-300"
                        }`}
                >
                    Paste URL
                </button>
            </div>

            {activeTab === "upload" ? (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`upload-zone group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed p-10 text-center backdrop-blur-sm sm:p-14 md:p-16 ${isDragging
                        ? "border-green-400/60 bg-green-400/[0.04]"
                        : "border-white/10 bg-white/[0.015] hover:border-green-400/30"
                        }`}
                >
                    <div className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-green-400/20 rounded-tl-lg" />
                    <div className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-green-400/20 rounded-tr-lg" />
                    <div className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-green-400/20 rounded-bl-lg" />
                    <div className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-green-400/20 rounded-br-lg" />

                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-green-400/30 group-hover:bg-green-400/5 group-hover:shadow-[0_0_30px_rgba(74,222,128,0.1)]">
                        <svg
                            width="28"
                            height="28"
                            fill="none"
                            stroke={isDragging ? "#4ade80" : "#6b7280"}
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            className="transition-colors duration-300 group-hover:stroke-green-400"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                            />
                        </svg>
                    </div>

                    <h3 className="mb-2 text-base font-bold text-white sm:text-lg">
                        {isDragging ? "Drop your file here" : "Drag & drop your media"}
                    </h3>
                    <p className="text-xs text-gray-500 sm:text-sm">
                        or <span className="text-green-400 underline underline-offset-2">click to browse</span> — supports JPG, PNG, WEBP, MP4
                    </p>

                    <div className="mx-auto mt-6 flex items-center justify-center gap-4 text-[10px] text-gray-600">
                        <span className="flex items-center gap-1.5">
                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            256-bit encrypted
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Files auto-deleted after scan
                        </span>
                    </div>

                    <input ref={fileInputRef} type="file" className="hidden" accept="image/*,video/*" />
                </div>
            ) : (
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm sm:p-10 md:p-12">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-green-400/5 blur-[60px]" />
                    <div className="relative z-10">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                            <svg width="22" height="22" fill="none" stroke="#4ade80" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.915-3.068a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364l1.757 1.757" />
                            </svg>
                        </div>
                        <h3 className="mb-4 text-base font-bold text-white sm:text-lg">Paste a URL to analyze</h3>
                        <div className="flex items-center gap-3">
                            <input
                                type="url"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                placeholder="https://example.com/image.png"
                                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 focus:border-green-400/40 focus:ring-2 focus:ring-green-400/10"
                            />
                            <button className="shrink-0 rounded-xl bg-green-400 px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:bg-green-300 hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] active:scale-95">
                                Analyze
                            </button>
                        </div>
                        <p className="mt-3 text-[11px] text-gray-600">
                            Supports direct image links, social media posts, and article URLs
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
