import { NAV_LINKS } from "@/lib/site";
import { usePageContent } from "@/lib/content";

const SOCIAL_PATHS: Record<string, string> = {
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  Instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  Facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  X: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
};

const FOOTER_SERVICES = [
  "Social Media Marketing",
  "AI SEO",
  "Meta Ads",
  "Google Ads",
  "Web Design",
  "Content Marketing",
  "AI Influencer Marketing",
  "WhatsApp Automation",
  "AI Agents & Automation",
];

export function Footer() {
  const site = usePageContent("site");
  const socials = [
    { label: "LinkedIn", url: site.social_linkedin },
    { label: "Instagram", url: site.social_instagram },
    { label: "Facebook", url: site.social_facebook },
    { label: "X", url: site.social_x },
  ].filter((s) => s.url);

  return (
    <footer data-testid="site-footer" className="border-t border-white/10 bg-[#030412]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href="#home" data-testid="footer-logo" aria-label="Branding Amigos — home">
              <img
                src="/branding-amigos-logo-mark.png"
                alt="Branding Amigos — SEO & Digital Marketing Agency"
                width="166"
                height="75"
                loading="lazy"
                className="h-11 w-auto"
              />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#8B93B8]">{site.footer_tagline}</p>
            <div className="mt-7 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`social-${social.label.toLowerCase()}`}
                  aria-label={`Branding Amigos on ${social.label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-[#8B93B8] transition-colors hover:border-[#FF5A36]/60 hover:text-[#FF5A36]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path d={SOCIAL_PATHS[social.label]} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-[#6B7394]">Navigate</h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-testid={`footer-nav-${link.label.toLowerCase()}`}
                    className="text-sm text-[#C6CCDF] transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/insights" data-testid="footer-nav-insights" className="text-sm text-[#C6CCDF] transition-colors hover:text-white">
                  Insights
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-[#6B7394]">Services</h3>
            <ul className="mt-5 space-y-3">
              {FOOTER_SERVICES.map((service) => (
                <li key={service}>
                  <a
                    href={`/services/${service.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                    data-testid={`footer-service-${service.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-[#C6CCDF] transition-colors hover:text-white"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-[#6B7394]">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-[#C6CCDF]">
              <li>
                <a href={`mailto:${site.contact_email}`} data-testid="footer-email" className="transition-colors hover:text-white">
                  {site.contact_email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.contact_phone.replace(/[^+\d]/g, "")}`} data-testid="footer-phone" className="transition-colors hover:text-white">
                  {site.contact_phone}
                </a>
              </li>
              <li>{site.contact_location}</li>
              <li className="text-[#8B93B8]">{site.contact_hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-[#6B7394]">© 2026 Branding Amigos. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" data-testid="footer-privacy" className="text-xs text-[#6B7394] transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" data-testid="footer-terms" className="text-xs text-[#6B7394] transition-colors hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
