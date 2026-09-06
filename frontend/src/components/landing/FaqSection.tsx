import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { Reveal, SectionHead, EASE } from "./Reveal";

const FAQS = [
  {
    q: "How long does SEO take to produce results?",
    a: "SEO compounds over time. Technical improvements can have an effect within weeks, but meaningful growth in traffic and leads typically takes three to six months, depending on your market, competition, and website history. We'll always give you an honest assessment for your situation — no responsible agency can promise exact dates.",
  },
  {
    q: "What services does Branding Amigos provide?",
    a: "We offer a full digital growth stack: social media marketing, AI SEO (including Google AI Overview and AI assistants like ChatGPT), Meta ads, Google Ads, web design, content marketing, AI influencer marketing, WhatsApp Business automation, and AI agents & automation — everything a growing business needs under one roof.",
  },
  {
    q: "Do you work with local businesses?",
    a: "Yes. We're based in Ahmedabad, India, and local SEO is one of our core strengths. We work with local businesses as well as brands across India and around the world.",
  },
  {
    q: "How do you measure SEO success?",
    a: "We agree on the metrics that matter to your business before work begins — typically qualified organic traffic, leads, conversions, and keyword visibility — and report on them transparently every month. Rankings matter, but only as a means to real business outcomes.",
  },
  {
    q: "Do you provide monthly SEO services?",
    a: "Yes. Most clients work with us on a monthly engagement: a prioritised roadmap, continuous implementation across technical, content, and authority work, and clear reporting on progress.",
  },
  {
    q: "Can you audit my existing website?",
    a: "Absolutely. Our SEO audit reviews technical health, content, authority, and user experience, and delivers a prioritised action plan you can implement with us or with your own team.",
  },
  {
    q: "Do you provide SEO content?",
    a: "Yes. We plan and produce search-focused content — from topic strategy and briefs to the content itself — written to match your brand voice and to attract qualified organic traffic.",
  },
  {
    q: "How can I get started?",
    a: "Request a free consultation through the contact form. We'll review your website and goals, then recommend the strategy that fits your business. There's no obligation.",
  },
];

function FaqItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: (typeof FAQS)[number];
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <div data-testid={`faq-item-${index + 1}`} className="border-b border-[#E2E8F0]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-answer-${index + 1}`}
        data-testid={`faq-question-${index + 1}`}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className={`text-base font-semibold transition-colors sm:text-lg ${open ? "text-[#3535D6]" : "text-[#0A0D2C]"}`}>
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
            open ? "border-[#FF5A36] bg-[#FF5A36] text-white" : "border-[#E2E8F0] text-[#475569]"
          }`}
        >
          <Plus className="h-4 w-4" aria-hidden />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${index + 1}`}
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-7 text-sm leading-relaxed text-[#475569] sm:text-base">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" data-testid="faq-section" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          index="06"
          label="FAQ"
          center
          title={<>Frequently Asked <em className="italic text-[#3535D6]">SEO Questions</em></>}
          sub="Straight answers, no jargon. If your question isn't covered here, ask us directly in the form below."
        />
        <Reveal delay={0.15}>
          <div className="mx-auto mt-14 max-w-4xl border-t border-[#E2E8F0]">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                index={i}
                open={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
