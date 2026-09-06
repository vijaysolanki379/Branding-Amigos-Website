import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";
import { CONTACT_INFO } from "@/lib/site";

export type ContentMap = Record<string, Record<string, string>>;

export const CONTENT_DEFAULTS: ContentMap = {
  site: {
    header_cta: "Get a Free Consultation",
    footer_tagline: "SEO & Digital Marketing for Sustainable Growth.",
    contact_email: CONTACT_INFO.email,
    contact_phone: CONTACT_INFO.phone,
    contact_location: CONTACT_INFO.location,
    contact_hours: CONTACT_INFO.hours,
    social_linkedin: "https://www.linkedin.com/company/branding-amigos/",
    social_instagram: "https://www.instagram.com/brandingamigos/",
    social_facebook: "https://www.facebook.com/brandingamigos",
    social_x: "https://twitter.com/brandingamigos",
  },
  home: {
    hero_line1: "Your Brand, Growing",
    hero_line2: "Everywhere Your",
    hero_line3: "Customers Are",
    hero_sub:
      "Branding Amigos combines SEO, social media, paid ads, content, and AI-powered automation to help businesses become more visible, attract qualified customers, and grow online.",
    why_image:
      "https://static.prod-images.emergentagent.com/jobs/e5a87417-a519-4731-9f95-319a1f87e2b8/images/54a8bd9d260c3ae3dc22ad554a188b6a2e03468dc626737fb09356718d52a5e5.jpeg",
    about_image:
      "https://static.prod-images.emergentagent.com/jobs/e5a87417-a519-4731-9f95-319a1f87e2b8/images/aab79c92b245398704b3f3a7079f85b90c33f2909490c42053398c2ab5f3d864.jpeg",
    meta_title: "Branding Amigos | SEO & Digital Marketing Agency",
    meta_description:
      "Branding Amigos helps businesses grow organic visibility, qualified traffic, leads, and online revenue through strategic SEO and digital marketing.",
  },
  contact: {
    page_title: "Let's talk about",
    page_title_accent: "your growth",
    page_sub:
      "Tell us about your business, goals, and current challenges. We'll review your requirements and get back to you within one business day — with honest advice, not a sales script.",
    meta_title: "Contact Us | Branding Amigos",
    meta_description:
      "Contact Branding Amigos for a free consultation. SEO, social media, ads, web design & AI automation for businesses in Ahmedabad and worldwide.",
  },
  testimonials: {
    t1_quote:
      "Branding Amigos took time to understand our business before recommending anything. Clear communication, honest reporting, and a strategy that actually fits our goals.",
    t1_name: "Priya S.",
    t1_role: "Founder, Lifestyle D2C Brand",
    t2_quote:
      "The team handles our social media and ads end to end. We always know what was done, why, and what it delivered — no jargon, no vanity metrics.",
    t2_name: "Amit R.",
    t2_role: "Director, Real Estate Group",
    t3_quote:
      "From SEO to WhatsApp automation, everything works together now. Enquiries are handled faster and our online visibility keeps improving month on month.",
    t3_name: "Neha K.",
    t3_role: "Owner, Healthcare Clinic",
  },
};

export function useContent(): ContentMap {
  const { data } = useQuery({
    queryKey: ["site-content"],
    queryFn: () => apiGet<ContentMap>("/content"),
    staleTime: 30_000,
    retry: 1,
  });
  return data ?? {};
}

export function usePageContent(page: string): Record<string, string> {
  const content = useContent();
  return useMemo(() => {
    // Empty-string overrides mean "use the default" — never let them mask it.
    const overrides = Object.fromEntries(
      Object.entries(content[page] ?? {}).filter(([, v]) => v.trim() !== "")
    );
    return { ...(CONTENT_DEFAULTS[page] ?? {}), ...overrides };
  }, [content, page]);
}

export function asList(value: string): string[] {
  return value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function useMeta(title?: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? null;
    if (title) document.title = title;
    if (meta && description) meta.setAttribute("content", description);
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, [title, description]);
}
