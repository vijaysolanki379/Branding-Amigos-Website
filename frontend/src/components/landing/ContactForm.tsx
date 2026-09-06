import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";
import { trackEvent } from "@/lib/gtm";
import type { ContactInquiry } from "@/lib/site";

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

export function ContactForm() {
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
      trackEvent("contact_form_submit", {
        services: form.services.join(", ") || "none selected",
        budget: form.budget || "unspecified",
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
    <form
      onSubmit={onSubmit}
      data-testid="contact-form"
      className="rounded-2xl border border-white/10 bg-[#0C1030] p-7 sm:p-9"
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
          placeholder="What are you trying to achieve? Any current challenges?"
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
  );
}
