import { Quote } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const SLOTS = ["Client name · Role", "Client name · Role", "Client name · Role"];

export function TestimonialsSection() {
  return (
    <section id="testimonials" data-testid="testimonials-section" className="bg-[#F5F5F7] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          index="05"
          label="TESTIMONIALS"
          center
          title={<>What Clients <em className="italic text-[#3535D6]">Will Say</em></>}
        />

        <Reveal delay={0.15}>
          <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-[#E2E8F0] bg-white px-8 py-12 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#10134A]">
              <Quote className="h-5 w-5 text-[#FF5A36]" aria-hidden />
            </span>
            <p className="mt-6 font-heading text-2xl leading-snug tracking-tight text-[#0A0D2C]">
              Real client testimonials will appear here.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#475569]">
              We're collecting feedback from current engagements and publish it only with client permission.
              Check back soon.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
          {SLOTS.map((slot, i) => (
            <Reveal key={i} delay={0.2 + i * 0.07}>
              <div
                data-testid={`testimonial-slot-${i + 1}`}
                className="rounded-xl border border-dashed border-[#CBD2E0] px-6 py-5 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]"
              >
                {slot}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
