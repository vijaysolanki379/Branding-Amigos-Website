import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageShell } from "@/components/landing/PageShell";
import { ContactForm } from "@/components/landing/ContactForm";
import { Reveal } from "@/components/landing/Reveal";
import { useMeta, usePageContent } from "@/lib/content";

const WA_URL = `https://wa.me/917984568245?text=${encodeURIComponent(
  "Hi Branding Amigos! I'd like to discuss growing my business."
)}`;

export default function ContactUs() {
  const page = usePageContent("contact");
  const site = usePageContent("site");
  useMeta(page.meta_title, page.meta_description);

  const info = [
    { icon: Mail, label: "Email", value: site.contact_email, href: `mailto:${site.contact_email}`, testId: "contact-page-email" },
    { icon: Phone, label: "Phone", value: site.contact_phone, href: `tel:${site.contact_phone.replace(/[^+\d]/g, "")}`, testId: "contact-page-phone" },
    { icon: MapPin, label: "Location", value: site.contact_location, testId: "contact-page-location" },
    { icon: Clock, label: "Business hours", value: site.contact_hours, testId: "contact-page-hours" },
  ];

  return (
    <PageShell>
      <div data-testid="contact-page" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-[#8B93B8]">
            <span className="text-[#FF5A36]">[</span> <span className="text-[#475569]">CONTACT US</span>{" "}
            <span className="text-[#FF5A36]">]</span>
          </p>
          <h1 className="mt-5 font-heading text-4xl leading-[1.1] tracking-tight text-[#0A0D2C] sm:text-5xl lg:text-6xl">
            {page.page_title} <em className="italic text-[#3535D6]">{page.page_title_accent}</em>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#475569] sm:text-lg">{page.page_sub}</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            {info.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-colors hover:border-[#3535D6]/40">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#10134A] text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#94A3B8]">{item.label}</p>
                    <p className="mt-1.5 text-sm font-medium text-[#0A0D2C]">{item.value}</p>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href} data-testid={item.testId} className="block">
                  {content}
                </a>
              ) : (
                <div key={item.label} data-testid={item.testId}>
                  {content}
                </div>
              );
            })}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-page-whatsapp"
              className="flex items-center justify-between gap-4 rounded-2xl bg-[#25D366] p-6 text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">Fastest response</p>
                <p className="mt-1.5 text-sm font-semibold">Chat with us on WhatsApp</p>
              </div>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 shrink-0" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
