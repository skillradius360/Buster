export default function HeroSection() {
    return (
        <section className="relative z-10 px-4 pt-40 pb-8 text-center sm:px-6 md:pt-52 md:pb-12">
            <div className="mx-auto mb-8 flex w-max items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase backdrop-blur-sm animate-[fade-in-up_0.8s_ease-out_both]">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-[pulse-ring_2s_infinite]" />
                AI-Powered Forensic Detection
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl animate-[fade-in-up_0.8s_ease-out_0.1s_both]">
                DETECT WHAT&apos;s{" "}
                <br className="hidden sm:block" />
                <span
                    className="bg-clip-text text-transparent animate-[gradient-x_6s_ease_infinite]"
                    style={{
                        backgroundImage: "linear-gradient(90deg, #4ade80, #22d3ee, #4ade80)",
                        backgroundSize: "200% 100%",
                    }}
                >
                    NOT REAL.
                </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed tracking-wide text-gray-500 sm:text-base md:mt-8 md:text-lg animate-[fade-in-up_0.8s_ease-out_0.25s_both]">
                Upload an image, paste a URL, or drag-and-drop any media.
                <br className="hidden md:block" />
                Buster scans for deepfakes, AI-generated content, and manipulated media in seconds.
            </p>

            <div className="mx-auto mt-16 flex flex-col items-center gap-2 text-gray-600 animate-[fade-in-up_0.8s_ease-out_0.5s_both] md:mt-20">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase">Scroll to analyze</span>
                <div className="h-8 w-px bg-gradient-to-b from-gray-600 to-transparent animate-[float_2s_ease-in-out_infinite]" />
            </div>
        </section>
    );
}
