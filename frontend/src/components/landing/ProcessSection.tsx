import { Reveal, SectionHead } from "./Reveal";

const STEPS = [
  {
    number: "01",
    name: "Discover",
    description: "We start with your business, not keywords. Goals, audience, market, and competitors — the context every good decision needs.",
    tags: ["Stakeholder input", "Market scan", "Competitor review"],
  },
  {
    number: "02",
    name: "Audit",
    description: "A full review of your website: technical SEO, content, authority, and current search visibility.",
    tags: ["Technical crawl", "Content review", "Authority profile"],
  },
  {
    number: "03",
    name: "Strategize",
    description: "A prioritised SEO roadmap ranked by opportunity, impact, and the resources required to execute.",
    tags: ["Opportunity map", "Priorities", "KPIs"],
  },
  {
    number: "04",
    name: "Execute",
    description: "Implementation across technical improvements, content, on-page SEO, local SEO, and authority-building initiatives.",
    tags: ["Technical fixes", "Content", "Local & links"],
  },
  {
    number: "05",
    name: "Measure & Grow",
    description: "Track rankings, organic traffic, leads, and conversions — reported clearly and optimised continuously.",
    tags: ["Monthly reporting", "Iteration", "Growth reviews"],
  },
];

export function ProcessSection() {
  return (
    <section id="process" data-testid="process-section" className="bg-[#F5F5F7] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          index="03"
          label="PROCESS"
          title={<>Our SEO <em className="italic text-[#3535D6]">Growth Process</em></>}
          sub="A clear, repeatable way of working — so you always know what's happening, why it matters, and what comes next."
        />

        <ol className="mt-16 space-y-0">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.06}>
              <li
                data-testid={`process-step-${step.number}`}
                className="group relative grid gap-4 border-l border-[#E2E8F0] py-8 pl-10 transition-colors sm:grid-cols-[110px_1fr] sm:gap-8 sm:py-10 sm:pl-14"
              >
                <span
                  aria-hidden
                  className="absolute -left-[7px] top-10 h-3.5 w-3.5 rounded-full border-2 border-[#3535D6] bg-[#F5F5F7] transition-colors group-hover:border-[#FF5A36] sm:top-12"
                />
                <span className="font-heading text-4xl tracking-tight text-[#10134A]/25 transition-colors group-hover:text-[#FF5A36] sm:text-5xl">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-heading text-2xl tracking-tight text-[#0A0D2C]">{step.name}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#475569] sm:text-base">{step.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-[#EAEBEE] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[#475569]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
