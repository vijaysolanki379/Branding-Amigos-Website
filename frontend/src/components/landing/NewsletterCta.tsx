import { useState } from "react";
import type { FormEvent } from "react";
import { Loader2, MailCheck, Send } from "lucide-react";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";

export function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiPost("/newsletter", { email });
      setDone(true);
      toast.success("You're subscribed — welcome aboard.");
    } catch {
      toast.error("Couldn't subscribe you right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="newsletter-cta" className="relative mt-16 overflow-hidden rounded-3xl bg-[#05061A] p-8 sm:p-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#3535D6]/25 blur-[100px]" />
      </div>
      <div className="relative grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B93B8]">
            <span className="text-[#FF5A36]">[</span> NEWSLETTER <span className="text-[#FF5A36]">]</span>
          </p>
          <h3 className="mt-4 font-heading text-3xl tracking-tight text-white">SEO insights, straight to your inbox</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#A7AEC9]">
            One practical email when we publish something worth reading. No noise, no spam — unsubscribe anytime.
          </p>
        </div>
        {done ? (
          <p
            data-testid="newsletter-success"
            className="flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-300"
          >
            <MailCheck className="h-5 w-5 shrink-0" aria-hidden />
            You're on the list. We'll only email when there's something genuinely useful.
          </p>
        ) : (
          <form onSubmit={onSubmit} data-testid="newsletter-form" className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              data-testid="newsletter-email-input"
              className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white placeholder:text-[#5B6280] transition-colors focus:border-[#FF5A36]/60 focus:outline-none focus:ring-2 focus:ring-[#FF5A36]/25"
            />
            <button
              type="submit"
              disabled={submitting}
              data-testid="newsletter-submit-button"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#FF5A36] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#FF3E14] disabled:opacity-60"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
