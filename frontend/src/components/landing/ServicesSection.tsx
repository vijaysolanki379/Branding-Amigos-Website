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
import { Reveal, SectionHead } from "./Reveal";

interface Service {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
}

const SERVICES: Service[] = [
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    description: "Build a strong brand presence across platforms like Facebook, Instagram, and LinkedIn with data-driven social media strategies that engage your audience, increase followers, and drive real business growth.",
    icon: Share2,
    featured: true,
  },
  {
    slug: "ai-seo",
    name: "AI SEO",
    description: "Improve your website's visibility on Google Search, Google AI Overview, and AI assistants like ChatGPT with our advanced SEO strategies.",
    icon: Sparkles,
    featured: true,
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    description: "Reach your ideal customers on Facebook and Instagram with high-converting Meta advertising campaigns designed to generate quality leads, boost brand awareness, and maximize your return on ad spend.",
    icon: Target,
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    description: "Drive targeted traffic and instant leads with optimized Google Ads campaigns that connect your business with customers actively searching for your products or services.",
    icon: Search,
  },
  {
    slug: "web-design",
    name: "Web Design",
    description: "Create a modern, fast, and mobile-friendly website that reflects your brand and converts visitors into customers. Our website design services focus on user experience, performance, and SEO-ready structure to help your business grow online.",
    icon: MonitorSmartphone,
  },
  {
    slug: "content-marketing",
    name: "Content Marketing",
    description: "Attract and engage your audience with strategic content that builds trust and improves search visibility. Our content marketing services help businesses generate organic traffic, educate customers, and establish authority in their industry.",
    icon: PenLine,
  },
  {
    slug: "ai-influencer-marketing",
    name: "AI Influencer Marketing",
    description: "Leverage AI-powered influencer discovery to connect your brand with the right creators, build authentic partnerships, and amplify your reach to highly engaged audiences.",
    icon: Users,
  },
  {
    slug: "whatsapp-automation",
    name: "WhatsApp Business Automation",
    description: "Automate customer conversations, lead follow-ups, and marketing messages using smart WhatsApp automation to improve engagement, save time, and convert more prospects into customers.",
    icon: MessageCircle,
  },
  {
    slug: "ai-agents-automation",
    name: "AI Agents & Automation",
    description: "Automate your business operations and customer interactions with smart AI agents designed to save time and increase efficiency. From lead qualification to instant responses, Branding Amigos helps you implement AI-powered systems that work 24/7 to capture, engage, and convert customers.",
    icon: Bot,
  },
];

function ServiceCard({ service }: { service: Service }) {
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
      <a
        href={`/services/${service.slug}`}
        data-testid={`learn-more-${service.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[#3535D6] transition-colors hover:text-[#FF5A36]"
      >
        Learn More
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
      </a>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" data-testid="services-section" className="bg-[#F5F5F7] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          index="01"
          label="SERVICES"
          title={<>SEO &amp; Digital Marketing Services That <em className="italic text-[#3535D6]">Drive Growth</em></>}
          sub="From search and social to ads, content, and AI-powered automation — strategies designed around measurable business outcomes."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={Math.min(i * 0.06, 0.3)} className={service.featured ? "md:col-span-6" : "md:col-span-6 lg:col-span-4"}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
