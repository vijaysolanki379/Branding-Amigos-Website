import { Quote } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { usePageContent } from "@/lib/content";

export function TestimonialsSection() {
  const content = usePageContent("testimonials");
  const testimonials = [1, 2, 3]
    .map((n) => ({
      quote: content[`t${n}_quote`] ?? "",
      name: content[`t${n}_name`] ?? "",
      role: content[`t${n}_role`] ?? "",
    }))
    .filter((t) => t.quote && t.name);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" data-testid="testimonials-section" className="bg-[#F5F5F7] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          index="05"
          label="TESTIMONIALS"
          center
          title={<>What Our <em className="italic text-[#3535D6]">Clients Say</em></>}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={0.15 + i * 0.08}>
              <figure
                data-testid={`testimonial-card-${i + 1}`}
                className="flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(16,19,74,0.25)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#10134A]">
                  <Quote className="h-4.5 w-4.5 text-[#FF5A36]" aria-hidden />
                </span>
                <blockquote className="mt-6 flex-1 text-base leading-relaxed text-[#0A0D2C]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 border-t border-[#E2E8F0] pt-5">
                  <p className="text-sm font-semibold text-[#0A0D2C]">{t.name}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#94A3B8]">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
