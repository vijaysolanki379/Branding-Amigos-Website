import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ClipboardCheck,
  Compass,
  Cpu,
  FileText,
  Link2,
  MapPin,
  PenLine,
  Search,
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
    slug: "seo-strategy",
    name: "SEO Strategy & Consulting",
    description: "Data-driven SEO strategies aligned with your business goals, audience, competition, and growth opportunities.",
    icon: Compass,
    featured: true,
    deliverables: ["Growth roadmap tied to business goals", "Audience, market & competitor analysis", "Prioritised opportunity map", "Quarterly strategy reviews"],
  },
  {
    slug: "technical-seo",
    name: "Technical SEO",
    description: "Improve crawlability, indexing, site architecture, Core Web Vitals, structured data, and technical performance.",
    icon: Cpu,
    featured: true,
    deliverables: ["Crawl & index optimisation", "Core Web Vitals improvements", "Site architecture & internal linking", "Structured data implementation"],
  },
  {
    slug: "on-page-seo",
    name: "On-Page SEO",
    description: "Optimize pages, headings, internal links, metadata, content structure, search intent, and conversion opportunities.",
    icon: FileText,
    deliverables: ["Metadata & heading optimisation", "Search intent mapping", "Internal link architecture", "Conversion-focused page improvements"],
  },
  {
    slug: "content-seo",
    name: "Content Strategy & SEO Content",
    description: "Build topical authority with search-focused content strategies designed to attract qualified organic traffic.",
    icon: PenLine,
    deliverables: ["Topical authority maps", "Editorial calendar & briefs", "Search-focused content production", "Content refresh & pruning"],
  },
  {
    slug: "local-seo",
    name: "Local SEO",
    description: "Improve local visibility, Google Business Profile performance, local rankings, citations, and location-based lead generation.",
    icon: MapPin,
    deliverables: ["Google Business Profile optimisation", "Local citations & NAP consistency", "Location landing pages", "Review & reputation strategy"],
  },
  {
    slug: "link-building",
    name: "Link Building & Digital PR",
    description: "Build relevant, authoritative backlinks and strengthen your website's credibility and search visibility.",
    icon: Link2,
    deliverables: ["Digital PR campaigns", "Relevant outreach & placements", "Brand mention building", "Authority monitoring"],
  },
  {
    slug: "keyword-research",
    name: "Keyword Research & Competitor Analysis",
    description: "Identify high-value opportunities by analyzing search demand, intent, competitors, and ranking gaps.",
    icon: Search,
    deliverables: ["Search demand & intent mapping", "Competitor gap analysis", "Prioritised keyword portfolio", "SERP opportunity tracking"],
  },
  {
    slug: "seo-audits",
    name: "SEO Audits",
    description: "Find technical, content, authority, and UX issues that may be limiting your organic growth.",
    icon: ClipboardCheck,
    deliverables: ["Full technical audit", "Content & authority review", "UX & conversion observations", "Prioritised action plan"],
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
