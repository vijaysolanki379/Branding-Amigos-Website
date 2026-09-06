import { Check } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const PRINCIPLES = [
  "Strategy before tactics",
  "Evidence over ego",
  "Clear, honest reporting",
  "Growth that compounds",
];

const WAVES_IMG =
  "https://static.prod-images.emergentagent.com/jobs/e5a87417-a519-4731-9f95-319a1f87e2b8/images/aab79c92b245398704b3f3a7079f85b90c33f2909490c42053398c2ab5f3d864.jpeg";

export function AboutSection() {
  return (
    <section id="about" data-testid="about-section" className="noise relative overflow-hidden bg-[#05061A] py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 bottom-0 h-[420px] w-[560px] rounded-full bg-[#2927A8]/20 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="relative">
                <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-[#3535D6]/15 blur-3xl" />
                <div className="relative overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={WAVES_IMG}
                    alt="Abstract blue data waves rising like an organic traffic growth curve, highlighted with coral marker strokes"
                    width="1264"
                    height="848"
                    loading="lazy"
                    className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#05061A]/70 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#C6CCDF]">
                    Growth, visualised
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <SectionHead
              index="04"
              label="ABOUT"
              dark
              title={<>Meet <em className="italic text-[#FF5A36]">Branding Amigos</em></>}
            />
            <Reveal delay={0.2}>
              <div className="mt-6 max-w-2xl space-y-5 text-base leading-relaxed text-[#A7AEC9] sm:text-lg">
                <p>
                  Branding Amigos is an SEO and digital marketing agency based in Ahmedabad, India, working with
                  local businesses and brands around the world.
                </p>
                <p>
                  We combine strategy, creativity, and data-driven marketing to help businesses improve organic
                  visibility, attract qualified prospects, and build sustainable online growth.
                </p>
                <p>
                  Our approach is straightforward: understand your business, find the opportunities worth pursuing,
                  execute with care, and report honestly on what's working. No inflated promises — just consistent,
                  compounding progress.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-[#6B7394]">
                Based in Ahmedabad <span className="text-[#FF5A36]">•</span> Working worldwide
              </p>
              <ul className="mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
                {PRINCIPLES.map((principle) => (
                  <li key={principle} className="flex items-center gap-3 text-sm text-[#C6CCDF]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10134A]">
                      <Check className="h-3 w-3 text-[#FF5A36]" aria-hidden />
                    </span>
                    {principle}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
