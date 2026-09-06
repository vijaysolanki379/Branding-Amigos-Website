import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { HeroVisual } from "./HeroVisual";
import { EASE } from "./Reveal";

function MaskedLine({ children, delay }: { children: ReactNode; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
      <motion.span
        className="block will-change-transform"
        initial={reduce ? false : { y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.95, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function HeroSection() {
  const reduce = useReducedMotion();
  return (
    <section id="home" data-testid="hero-section" className="noise relative overflow-hidden bg-[#05061A]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[560px] w-[920px] -translate-x-1/2 rounded-full bg-[#2927A8]/25 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[520px] rounded-full bg-[#3535D6]/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-4 pb-24 pt-36 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-8 lg:pb-32 lg:pt-44">
        <div className="lg:col-span-6">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#8B93B8]"
          >
            <span className="h-1.5 w-1.5 rotate-45 bg-[#FF5A36]" />
            SEO • Branding • Digital Growth
          </motion.p>

          <h1 className="mt-7 font-heading text-[2.75rem] leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.4rem]">
            <MaskedLine delay={0.25}>Your Brand, Growing</MaskedLine>
            <MaskedLine delay={0.37}>Everywhere Your</MaskedLine>
            <MaskedLine delay={0.49}>
              <em className="italic text-[#FF5A36]">Customers Are</em>
            </MaskedLine>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
            className="mt-7 max-w-xl text-base leading-relaxed text-[#A7AEC9] sm:text-lg"
          >
            Branding Amigos combines SEO, social media, paid ads, content, and AI-powered automation to help
            businesses become more visible, attract qualified customers, and grow online.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#FF5A36] px-7 py-3.5 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-[#FF3E14] active:scale-[0.98]"
            >
              Get a Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#services"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/5"
            >
              Explore Our Services
            </a>
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B7394]"
          >
            SEO <span className="text-[#FF5A36]">•</span> Social <span className="text-[#FF5A36]">•</span> Ads{" "}
            <span className="text-[#FF5A36]">•</span> Content <span className="text-[#FF5A36]">•</span> Automation
          </motion.p>
        </div>

        <div className="lg:col-span-6">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
