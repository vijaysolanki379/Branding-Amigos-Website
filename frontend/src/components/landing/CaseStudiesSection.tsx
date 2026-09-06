import { Reveal, SectionHead } from "./Reveal";

const CASES = [
  {
    number: "01",
    tag: "E-commerce SEO",
    challenge: "[Client challenge will be documented here]",
    strategy: "[The strategy we applied will be described here]",
    results: "[Verified outcomes will be published here]",
  },
  {
    number: "02",
    tag: "Local Business SEO",
    challenge: "[Client challenge will be documented here]",
    strategy: "[The strategy we applied will be described here]",
    results: "[Verified outcomes will be published here]",
  },
  {
    number: "03",
    tag: "B2B SEO",
    challenge: "[Client challenge will be documented here]",
    strategy: "[The strategy we applied will be described here]",
    results: "[Verified outcomes will be published here]",
  },
];

const FIELDS = [
  { key: "challenge", label: "Challenge" },
  { key: "strategy", label: "Strategy" },
  { key: "results", label: "Results" },
] as const;

export function CaseStudiesSection() {
  return (
    <section id="case-studies" data-testid="case-studies-section" className="bg-[#F5F5F7] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          index="05"
          label="CASE STUDIES"
          title={<>Selected SEO <em className="italic text-[#3535D6]">Success Stories</em></>}
          sub="We're documenting current engagements now. Real case studies — with client permission and verified numbers — will be published here soon."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {CASES.map((cs, i) => (
            <Reveal key={cs.number} delay={i * 0.08}>
              <article
                data-testid={`case-card-${cs.number}`}
                className="group flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-[#3535D6]/40 hover:shadow-[0_24px_48px_-24px_rgba(16,19,74,0.25)]"
              >
                <div className="flex items-center justify-between border-b border-[#E2E8F0] px-7 py-5">
                  <span className="font-heading text-3xl tracking-tight text-[#10134A]/20 transition-colors group-hover:text-[#FF5A36]">
                    {cs.number}
                  </span>
                  <span className="rounded-full bg-[#10134A] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white">
                    {cs.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-6 px-7 py-7">
                  {FIELDS.map((field) => (
                    <div key={field.key}>
                      <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-[#3535D6]">
                        {field.label}
                      </h3>
                      <p className="mt-2 border border-dashed border-[#E2E8F0] bg-[#F5F5F7] px-4 py-3 text-sm italic leading-relaxed text-[#94A3B8]">
                        {cs[field.key]}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="border-t border-[#E2E8F0] px-7 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#94A3B8]">
                  Full case study coming soon
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
