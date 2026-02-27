"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#030303]">
      <div
        className="pointer-events-none fixed -top-[30%] -right-[20%] z-[1] h-[140%] w-[120%] blur-[50px] animate-[shimmer_8s_infinite_ease-in-out]"
        style={{
          background:
            "conic-gradient(from 210deg at 95% 5%, transparent 0deg, rgba(255,255,255,0.04) 15deg, rgba(255,255,255,0.18) 25deg, rgba(255,255,255,0.04) 35deg, transparent 90deg)",
        }}
      />
      <div
        className="pointer-events-none fixed -top-[10%] -right-[5%] z-[2] h-[50%] w-[40%] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 80%)",
        }}
      />
      <div className="pointer-events-none fixed -bottom-[20%] -left-[10%] z-[1] h-[60%] w-[50%] rounded-full bg-green-500/[0.03] blur-[100px]" />

      <Navbar />
      <HeroSection />
      <UploadSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
