import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { Marquee } from "@/components/landing/Marquee";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { WhyUsSection } from "@/components/landing/WhyUsSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { InsightsPreview } from "@/components/landing/InsightsPreview";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduced ? null : new Lenis({ lerp: 0.1, anchors: { offset: -84 } });
    let raf = 0;
    if (lenis) {
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }
    const hash = window.location.hash;
    const timer = hash
      ? window.setTimeout(() => {
          if (lenis) lenis.scrollTo(hash, { offset: -84, immediate: true });
          else document.querySelector(hash)?.scrollIntoView();
        }, 350)
      : null;
    return () => {
      if (timer) clearTimeout(timer);
      if (lenis) lenis.destroy();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#05061A] font-sans text-white antialiased">
      <Header />
      <main>
        <HeroSection />
        <Marquee />
        <ServicesSection />
        <WhyUsSection />
        <ProcessSection />
        <AboutSection />
        <TestimonialsSection />
        <FaqSection />
        <InsightsPreview />
        <ContactSection />
      </main>
      <Footer />
      <Toaster position="top-center" theme="dark" richColors />
    </div>
  );
}
