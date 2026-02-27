const stats = [
    { value: "2.4M+", label: "Scans Completed", sublabel: "Across 140+ countries" },
    { value: "99.7%", label: "Detection Accuracy", sublabel: "On benchmark datasets" },
    { value: "<0.3s", label: "Avg. Response Time", sublabel: "From upload to result" },
    { value: "6", label: "Neural Layers", sublabel: "Parallel forensic analysis" },
];

export default function StatsSection() {
    return (
        <section id="about" className="relative z-20 mx-auto max-w-6xl px-4 pb-24 sm:px-6 md:pb-32">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-white/[0.005] p-8 backdrop-blur-sm sm:p-12 md:p-16">
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-green-400/[0.06] blur-[80px]" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-cyan-400/[0.04] blur-[60px]" />
                <div className="pointer-events-none absolute right-12 top-12 hidden h-24 w-24 rounded-full border border-dashed border-white/[0.04] animate-[spin-slow_30s_linear_infinite] md:block" />

                <div className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center md:text-left">
                            <div className="stat-number mb-1 text-4xl font-black tracking-tight md:text-5xl">
                                {stat.value}
                            </div>
                            <div className="text-sm font-bold text-white/80">{stat.label}</div>
                            <div className="mt-1 text-[11px] text-gray-600">{stat.sublabel}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
