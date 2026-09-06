import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT_INFO } from "@/lib/site";
import { Reveal, SectionHead } from "./Reveal";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section id="contact" data-testid="contact-section" className="noise relative overflow-hidden bg-[#05061A] py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-[#2927A8]/25 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead
              index="08"
              label="CONTACT"
              dark
              title={<>Let's Grow Your <em className="italic text-[#FF5A36]">Search Visibility</em></>}
              sub="Tell us about your business, goals, and current SEO challenges. We'll review your requirements and discuss the right strategy."
            />

            <Reveal delay={0.2}>
              <ul className="mt-10 space-y-5">
                <li className="flex items-start gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5A36]" aria-hidden />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B93B8]">Email</p>
                    <a href={`mailto:${CONTACT_INFO.email}`} data-testid="contact-email-link" className="mt-1 block text-sm text-white transition-colors hover:text-[#FF5A36]">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5A36]" aria-hidden />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B93B8]">Phone</p>
                    <a href={`tel:${CONTACT_INFO.phoneHref}`} data-testid="contact-phone-link" className="mt-1 block text-sm text-white transition-colors hover:text-[#FF5A36]">
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5A36]" aria-hidden />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B93B8]">Location</p>
                    <p className="mt-1 text-sm text-white">{CONTACT_INFO.location}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5A36]" aria-hidden />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B93B8]">Business hours</p>
                    <p className="mt-1 text-sm text-white">{CONTACT_INFO.hours}</p>
                  </div>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 rounded-2xl border border-white/10 bg-[#0C1030] p-7">
                <p className="font-heading text-xl text-white">Prefer to talk directly? Let's connect.</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    data-testid="direct-email-cta"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
                  >
                    <Mail className="h-4 w-4" aria-hidden /> Email us
                  </a>
                  <a
                    href={`tel:${CONTACT_INFO.phoneHref}`}
                    data-testid="direct-call-cta"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
                  >
                    <Phone className="h-4 w-4" aria-hidden /> Call us
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
