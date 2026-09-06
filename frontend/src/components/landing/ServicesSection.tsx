import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bot,
  MessageCircle,
  MonitorSmartphone,
  PenLine,
  Search,
  Share2,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Reveal, SectionHead } from "./Reveal";

interface Service {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  deliverables: string[];
  featured?: boolean;
}

const SERVICES: Service[] = [
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    description: "Build a strong brand presence across platforms like Facebook, Instagram, and LinkedIn with data-driven social media strategies that engage your audience, increase followers, and drive real business growth.",
    icon: Share2,
    featured: true,
    deliverables: ["Platform & content strategy", "Content calendars & creative direction", "Community engagement", "Growth & performance reporting"],
  },
  {
    slug: "ai-seo",
    name: "AI SEO",
    description: "Improve your website's visibility on Google Search, Google AI Overview, and AI assistants like ChatGPT with our advanced SEO strategies.",
    icon: Sparkles,
    featured: true,
    deliverables: ["Google Search & AI Overview optimisation", "Visibility in AI assistants like ChatGPT", "Entity & structured data optimisation", "Conversational query targeting"],
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    description: "Reach your ideal customers on Facebook and Instagram with high-converting Meta advertising campaigns designed to generate quality leads, boost brand awareness, and maximize your return on ad spend.",
    icon: Target,
    deliverables: ["Campaign strategy & setup", "Audience research & targeting", "Creative testing & iteration", "ROAS-focused optimisation"],
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    description: "Drive targeted traffic and instant leads with optimized Google Ads campaigns that connect your business with customers actively searching for your products or services.",
    icon: Search,
    deliverables: ["Search & Performance Max campaigns", "Keyword & bidding strategy", "Conversion tracking setup", "Landing page alignment"],
  },
  {
    slug: "web-design",
    name: "Web Design",
    description: "Create a modern, fast, and mobile-friendly website that reflects your brand and converts visitors into customers. Our website design services focus on user experience, performance, and SEO-ready structure to help your business grow online.",
    icon: MonitorSmartphone,
    deliverables: ["Custom, on-brand design", "Mobile-first responsive build", "Speed & Core Web Vitals focus", "SEO-ready site structure"],
  },
  {
    slug: "content-marketing",
    name: "Content Marketing",
    description: "Attract and engage your audience with strategic content that builds trust and improves search visibility. Our content marketing services help businesses generate organic traffic, educate customers, and establish authority in their industry.",
    icon: PenLine,
    deliverables: ["Content strategy & planning", "Blogs, articles & landing pages", "Distribution & repurposing", "Authority & topical depth building"],
  },
  {
    slug: "ai-influencer-marketing",
    name: "AI Influencer Marketing",
    description: "Leverage AI-powered influencer discovery to connect your brand with the right creators, build authentic partnerships, and amplify your reach to highly engaged audiences.",
    icon: Users,
    deliverables: ["AI-powered creator discovery", "Audience & fit analysis", "Partnership & campaign management", "Reach & engagement tracking"],
  },
  {
    slug: "whatsapp-automation",
    name: "WhatsApp Business Automation",
    description: "Automate customer conversations, lead follow-ups, and marketing messages using smart WhatsApp automation to improve engagement, save time, and convert more prospects into customers.",
    icon: MessageCircle,
    deliverables: ["Automated lead follow-ups", "Chatbot conversation flows", "Broadcast & campaign messaging", "CRM & tool integrations"],
  },
  {
    slug: "ai-agents-automation",
    name: "AI Agents & Automation",
    description: "Automate your business operations and customer interactions with smart AI agents designed to save time and increase efficiency. From lead qualification to instant responses, Branding Amigos helps you implement AI-powered systems that work 24/7 to capture, engage, and convert customers.",
    icon: Bot,
    deliverables: ["Lead qualification agents", "24/7 instant response systems", "Workflow & process automation", "Integration with your existing tools"],
  },
];

function ServiceCard({ service, onLearnMore }: { service: Service; onLearnMore: (s: Service) => void }) {
  const Icon = service.icon;
  return (
    <div
      data-testid={`service-card-${service.slug}`}
      className={`group flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-7 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-[#3535D6]/40 hover:shadow-[0_24px_48px_-24px_rgba(16,19,74,0.25)] ${
        service.featured ? "md:col-span-6 lg:p-9" : "md:col-span-6 lg:col-span-4"
      }`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#10134A] text-white transition-colors duration-300 group-hover:bg-[#3535D6]">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className={`mt-6 font-heading tracking-tight text-[#0A0D2C] ${service.featured ? "text-2xl" : "text-xl"}`}>
        {service.name}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#475569]">{service.description}</p>
      <button
        type="button"
        onClick={() => onLearnMore(service)}
        data-testid={`learn-more-${service.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[#3535D6] transition-colors hover:text-[#FF5A36]"
      >
        Learn More
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
      </button>
    </div>
  );
}

export function ServicesSection() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section id="services" data-testid="services-section" className="bg-[#F5F5F7] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          index="01"
          label="SERVICES"
          title={<>SEO &amp; Digital Marketing Services That <em className="italic text-[#3535D6]">Drive Growth</em></>}
          sub="From technical foundations to content and authority building, we create strategies designed around measurable business outcomes."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={Math.min(i * 0.06, 0.3)} className={service.featured ? "md:col-span-6" : "md:col-span-6 lg:col-span-4"}>
              <ServiceCard service={service} onLearnMore={setActive} />
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={active !== null} onOpenChange={(open: boolean) => { if (!open) setActive(null); }}>
        <DialogContent data-testid="service-dialog" className="border-white/10 bg-[#0C1030] text-white sm:max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF5A36]">Service</p>
                <DialogTitle className="font-heading text-2xl text-white">{active.name}</DialogTitle>
                <DialogDescription className="text-[#A7AEC9]">{active.description}</DialogDescription>
              </DialogHeader>
              <ul className="mt-2 space-y-3">
                {active.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-[#C6CCDF]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#FF5A36]" />
                    {d}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => setActive(null)}
                data-testid="service-dialog-cta"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-[#FF5A36] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#FF3E14]"
              >
                Get a Free SEO Consultation
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
