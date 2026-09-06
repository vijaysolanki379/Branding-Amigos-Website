import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";
import { CONTACT_INFO } from "@/lib/site";
import type { ContactInquiry } from "@/lib/site";
import { Reveal, SectionHead } from "./Reveal";

const SERVICE_OPTIONS = [
  "Social Media Marketing",
  "AI SEO",
  "Meta Ads",
  "Google Ads",
  "Web Design",
  "Content Marketing",
  "AI Influencer Marketing",
  "WhatsApp Business Automation",
  "AI Agents & Automation",
  "Other",
];

const BUDGET_OPTIONS = [
  "Under ₹25,000 / month",
  "₹25,000 – ₹60,000 / month",
  "₹60,000 – ₹1,20,000 / month",
  "₹1,20,000+ / month",
  "Not sure yet",
];

const FIELD =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#5B6280] transition-colors focus:border-[#FF5A36]/60 focus:outline-none focus:ring-2 focus:ring-[#FF5A36]/25";
const LABEL = "mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#9AA2BC]";

const EMPTY = {
  name: "",
  business: "",
  email: "",
  phone: "",
  website: "",
  services: [] as string[],
  budget: "",
  goals: "",
};

export function ContactSection() {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof typeof EMPTY) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleService = (service: string, checked: boolean) =>
    setForm((f) => ({
      ...f,
      services: checked ? [...f.services, service] : f.services.filter((s) => s !== service),
    }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiPost<ContactInquiry>("/contact", {
        name: form.name,
        business: form.business || null,
        email: form.email,
        phone: form.phone || null,
        website: form.website || null,
        services: form.services,
        budget: form.budget || null,
        goals: form.goals,
      });
      toast.success("Thank you — your request has been received.", {
        description: "We'll review your requirements and get back to you within one business day.",
      });
      setForm(EMPTY);
    } catch {
      toast.error("Something went wrong sending your request.", {
        description: "Please try again, or email us directly at brandingamigos@gmail.com.",
      });
    } finally {
      setSubmitting(false);
    }
  };

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
              <form
                onSubmit={onSubmit}
                data-testid="contact-form"
                className="rounded-2xl border border-white/10 bg-[#0C1030] p-7 sm:p-9"
                noValidate={false}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={LABEL}>
                      Full Name <span className="text-[#FF5A36]">*</span>
                    </label>
                    <input id="contact-name" data-testid="contact-name-input" required minLength={2} value={form.name} onChange={set("name")} placeholder="Your name" className={FIELD} autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="contact-business" className={LABEL}>Business Name</label>
                    <input id="contact-business" data-testid="contact-business-input" value={form.business} onChange={set("business")} placeholder="Your company" className={FIELD} autoComplete="organization" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={LABEL}>
                      Email Address <span className="text-[#FF5A36]">*</span>
                    </label>
                    <input id="contact-email" data-testid="contact-email-input" type="email" required value={form.email} onChange={set("email")} placeholder="you@company.com" className={FIELD} autoComplete="email" />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className={LABEL}>Phone Number</label>
                    <input id="contact-phone" data-testid="contact-phone-input" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 ..." className={FIELD} autoComplete="tel" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-website" className={LABEL}>Website URL</label>
                    <input id="contact-website" data-testid="contact-website-input" type="text" inputMode="url" value={form.website} onChange={set("website")} placeholder="https://yourwebsite.com" className={FIELD} autoComplete="url" />
                  </div>
                </div>

                <fieldset className="mt-6">
                  <legend className={LABEL}>Services Interested In</legend>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {SERVICE_OPTIONS.map((service) => (
                      <label
                        key={service}
                        className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/10 px-3.5 py-2.5 text-sm text-[#C6CCDF] transition-colors has-checked:border-[#FF5A36]/60 has-checked:bg-[#FF5A36]/10 has-checked:text-white"
                      >
                        <input
                          type="checkbox"
                          checked={form.services.includes(service)}
                          onChange={(e) => toggleService(service, e.target.checked)}
                          data-testid={`service-checkbox-${service.toLowerCase().replace(/\s+/g, "-")}`}
                          className="h-4 w-4 shrink-0 accent-[#FF5A36]"
                        />
                        {service}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-6">
                  <label htmlFor="contact-budget" className={LABEL}>Monthly Marketing Budget</label>
                  <select id="contact-budget" data-testid="contact-budget-select" value={form.budget} onChange={set("budget")} className={`${FIELD} appearance-none`}>
                    <option value="" className="bg-[#0C1030]">Select a range</option>
                    {BUDGET_OPTIONS.map((option) => (
                      <option key={option} value={option} className="bg-[#0C1030]">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-6">
                  <label htmlFor="contact-goals" className={LABEL}>
                    Tell us about your goals <span className="text-[#FF5A36]">*</span>
                  </label>
                  <textarea
                    id="contact-goals"
                    data-testid="contact-goals-input"
                    required
                    minLength={10}
                    rows={4}
                    value={form.goals}
                    onChange={set("goals")}
                    placeholder="What are you trying to achieve? Any current SEO challenges?"
                    className={`${FIELD} resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="contact-form-submit-button"
                  className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#FF5A36] px-7 py-4 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-[#FF3E14] active:scale-[0.99] disabled:opacity-60"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
                  Request Free Consultation
                  {!submitting && <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />}
                </button>
                <p className="mt-4 text-center text-xs leading-relaxed text-[#8B93B8]">
                  Your information is kept confidential and will only be used to respond to your enquiry.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
