import type { LucideIcon } from "lucide-react";
import { BarChart3, Briefcase, FileBarChart, Sprout } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FEATURES: Feature[] = [
  {
    title: "Business-Focused Strategy",
    description: "Rankings are a means, not the goal. Every recommendation ties back to leads, revenue, and the customers you actually want.",
    icon: Briefcase,
  },
  {
    title: "Data-Driven Decisions",
    description: "We prioritise by evidence — search demand, intent, competition, and impact — so effort goes where it pays back fastest.",
    icon: BarChart3,
  },
  {
    title: "Transparent Reporting",
    description: "You always know what we did, why we did it, and what it produced. Clear reporting, no vanity metrics, no jargon.",
    icon: FileBarChart,
  },
  {
    title: "Sustainable Organic Growth",
    description: "We build assets that compound — technical health, content, and authority — instead of chasing short-lived tactics.",
    icon: Sprout,
  },
];

const PRISM_IMG =
  "https://static.prod-images.emergentagent.com/jobs/e5a87417-a519-4731-9f95-319a1f87e2b8/images/54a8bd9d260c3ae3dc22ad554a188b6a2e03468dc626737fb09356718d52a5e5.jpeg";

export function WhyUsSection() {
  return (
    <section id="why-us" data-testid="why-us-section" className="noise relative overflow-hidden bg-[#05061A] py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[420px] w-[560px] rounded-full bg-[#2927A8]/20 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionHead
              index="02"
              label="WHY BRANDING AMIGOS"
              dark
              title={<>SEO Built Around Your Business, <em className="italic text-[#FF5A36]">Not Just Rankings</em></>}
              sub="Traffic that never converts is a cost, not an asset. We build search programs around the outcomes your business actually cares about."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <Reveal key={feature.title} delay={i * 0.08}>
                    <div
                      data-testid={`why-card-${i + 1}`}
                      className="group h-full rounded-2xl border border-white/10 bg-[#0C1030] p-7 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[#3535D6]/50"
                    >
                      <div className="flex items-center justify-between">
                        <Icon className="h-5 w-5 text-[#8A88FF]" aria-hidden />
                        <span className="font-mono text-xs text-[#FF5A36]">0{i + 1}</span>
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#A7AEC9]">{feature.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="relative">
                <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-[#3535D6]/15 blur-3xl" />
                <div className="relative overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={PRISM_IMG}
                    alt="Abstract glass prisms refracting electric blue and coral light, representing clarity in search data"
                    width="1264"
                    height="848"
                    loading="lazy"
                    className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#05061A]/70 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#C6CCDF]">
                    Clarity from complexity
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
