import type { LucideIcon } from "lucide-react";
import { ArrowRight, ArrowUpRight, Gauge, MousePointerClick, TrendingUp } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

interface Metric {
  label: string;
  description: string;
  icon: LucideIcon;
}

const METRICS: Metric[] = [
  { label: "Organic Traffic", description: "Sessions from search, tracked from day one.", icon: TrendingUp },
  { label: "Qualified Leads", description: "Enquiries and sign-ups attributed to organic search.", icon: MousePointerClick },
  { label: "Keyword Visibility", description: "Share of search across your target topics.", icon: Gauge },
  { label: "Search Rankings", description: "Position movement for priority keywords.", icon: ArrowUpRight },
];

export function ResultsSection() {
  return (
    <section id="results" data-testid="results-section" className="noise relative overflow-hidden bg-[#05061A] py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/3 h-[420px] w-[560px] rounded-full bg-[#2927A8]/20 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          index="04"
          label="RESULTS"
          dark
          title={<>Focus on Growth <em className="italic text-[#FF5A36]">You Can Measure</em></>}
          sub="Every engagement is instrumented around a small set of metrics that matter — agreed with you before work begins and reported on transparently."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <Reveal key={metric.label} delay={i * 0.08}>
                <div
                  data-testid={`metric-card-${metric.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group h-full rounded-2xl border border-white/10 bg-[#0C1030] p-8 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[#FF5A36]/40"
                >
                  <Icon className="h-5 w-5 text-[#8A88FF] transition-colors group-hover:text-[#FF5A36]" aria-hidden />
                  <p className="mt-8 font-heading text-5xl tracking-tight text-white/20">—</p>
                  <h3 className="mt-4 text-lg font-semibold text-white">{metric.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A7AEC9]">{metric.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-start justify-between gap-8 rounded-2xl border border-white/10 bg-[#0C1030] p-8 sm:flex-row sm:items-center lg:p-10">
            <p className="max-w-2xl text-sm leading-relaxed text-[#A7AEC9]">
              <span className="font-semibold text-white">A note on numbers:</span> real client metrics and case
              studies are being prepared for publication. We never inflate figures — this space is reserved for
              verified results.
            </p>
            <a
              href="#contact"
              data-testid="results-cta"
              className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-[#FF5A36] px-7 py-3.5 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-[#FF3E14] active:scale-[0.98]"
            >
              Let's Discuss Your Growth
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
