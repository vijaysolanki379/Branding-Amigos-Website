import { useEffect } from "react";
import { ArrowRight, Check } from "lucide-react";
import { PageShell } from "@/components/landing/PageShell";
import { Reveal } from "@/components/landing/Reveal";
import { CONTACT_INFO } from "@/lib/site";

const VALUES = [
  {
    title: "Strategy before tactics",
    text: "Every engagement starts with your goals, market, and customers — never a template.",
  },
  {
    title: "Evidence over ego",
    text: "We prioritise by data and impact, and we change course when the numbers say so.",
  },
  {
    title: "Clear, honest reporting",
    text: "You always know what we did, why we did it, and what it produced. No vanity metrics, no jargon.",
  },
  {
    title: "Growth that compounds",
    text: "We build assets that keep working — content, authority, and systems — not short-lived spikes.",
  },
];

const WAVES_IMG =
  "https://res.cloudinary.com/nufnhl9h/image/upload/v1789396988/branding-amigos/migrated/home-about-image.jpg";

export default function About() {
  useEffect(() => {
    const prev = document.title;
    document.title = "About Us | Branding Amigos";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? null;
    meta?.setAttribute(
      "content",
      "Branding Amigos is a digital marketing agency in Ahmedabad, India — SEO, social media, ads, content, and AI automation for sustainable business growth."
    );
    return () => {
      document.title = prev;
      if (meta && prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <PageShell>
      <div data-testid="about-page" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-[#8B93B8]">
              <span className="text-[#FF5A36]">[</span> <span className="text-[#475569]">ABOUT US</span>{" "}
              <span className="text-[#FF5A36]">]</span>
            </p>
            <h1 className="mt-5 font-heading text-4xl leading-[1.1] tracking-tight text-[#0A0D2C] sm:text-5xl lg:text-6xl">
              Growth partners, <em className="italic text-[#3535D6]">not just another agency</em>
            </h1>
            <div className="mt-7 max-w-2xl space-y-5 text-base leading-relaxed text-[#475569] sm:text-lg">
              <p>
                Branding Amigos is a digital marketing agency based in Ahmedabad, India, working with local
                businesses and brands around the world. We bring together SEO, social media, paid advertising,
                content, and AI-powered automation under one roof — so your growth doesn't depend on juggling five
                different vendors.
              </p>
              <p>
                We started with a simple observation: most businesses don't need more marketing noise. They need a
                partner who understands their goals, finds the opportunities worth pursuing, executes with care, and
                reports honestly on what's working.
              </p>
              <p>
                That's what being an "Amigo" means to us — straightforward advice, consistent work, and results you
                can measure. No inflated promises, no guaranteed-ranking gimmicks. Just compounding progress.
              </p>
            </div>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-[#94A3B8]">
              Based in Ahmedabad <span className="text-[#FF5A36]">•</span> Working worldwide
            </p>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="relative">
                <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-[#3535D6]/15 blur-3xl" />
                <div className="relative overflow-hidden rounded-2xl border border-[#E2E8F0]">
                  <img
                    src={WAVES_IMG}
                    alt="Abstract blue data waves rising like a growth curve, highlighted with coral marker strokes"
                    width="1264"
                    height="848"
                    loading="lazy"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-24">
          <Reveal>
            <h2 className="font-heading text-3xl tracking-tight text-[#0A0D2C] sm:text-4xl">How we work</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-[#E2E8F0] bg-white p-8 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#3535D6]/40 hover:shadow-[0_24px_48px_-24px_rgba(16,19,74,0.25)]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10134A]">
                    <Check className="h-4 w-4 text-[#FF5A36]" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-[#0A0D2C]">{value.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-24 rounded-2xl bg-[#05061A] p-8 sm:p-12">
            <h2 className="max-w-xl font-heading text-3xl leading-snug tracking-tight text-white">
              Sound like the partner you've been looking for?
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#A7AEC9]">
              Tell us about your business and goals. We'll review your requirements and recommend the right
              strategy — no obligation.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/contact"
                data-testid="about-cta"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#FF5A36] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#FF3E14]"
              >
                Get a Free Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </a>
              <a
                href={`tel:${CONTACT_INFO.phoneHref}`}
                data-testid="about-call-cta"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
              >
                Call {CONTACT_INFO.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
