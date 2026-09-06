import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, PhoneCall, SearchCheck } from "lucide-react";
import { PageShell } from "@/components/landing/PageShell";
import { CONTACT_INFO } from "@/lib/site";

const STEPS = [
  {
    icon: SearchCheck,
    title: "We review your requirements",
    text: "We look at your website, market, and goals before we talk — so the conversation starts prepared.",
  },
  {
    icon: Clock,
    title: "We reply within one business day",
    text: "Expect a personal response from our team, not an automated sales pitch.",
  },
  {
    icon: PhoneCall,
    title: "We schedule your free consultation",
    text: "A focused call to discuss the right strategy for your growth. No obligation.",
  },
];

export default function ThankYou() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Thank You | Branding Amigos";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <PageShell>
      <div data-testid="thank-you-page" className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" aria-hidden />
        </span>
        <h1 className="mt-8 font-heading text-4xl tracking-tight text-[#0A0D2C] sm:text-5xl">
          Thank you — <em className="italic text-[#FF5A36]">request received.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#475569] sm:text-lg">
          Your consultation request is with our team. Here's exactly what happens next:
        </p>

        <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} data-testid={`thank-you-step-${i + 1}`} className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10134A] text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="mt-4 text-sm font-semibold text-[#0A0D2C]">{step.title}</h2>
                <p className="mt-2 text-xs leading-relaxed text-[#475569]">{step.text}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-sm text-[#475569]">
          Need us sooner? Call{" "}
          <a href={`tel:${CONTACT_INFO.phoneHref}`} data-testid="thank-you-call" className="font-semibold text-[#3535D6] hover:text-[#FF5A36]">
            {CONTACT_INFO.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${CONTACT_INFO.email}`} data-testid="thank-you-email" className="font-semibold text-[#3535D6] hover:text-[#FF5A36]">
            {CONTACT_INFO.email}
          </a>
          .
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            data-testid="thank-you-home"
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#FF5A36] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#FF3E14]"
          >
            Back to homepage
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <Link
            to="/insights"
            data-testid="thank-you-insights"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[#0A0D2C]/15 px-7 py-3.5 text-sm font-semibold text-[#0A0D2C] transition-colors hover:border-[#3535D6] hover:text-[#3535D6]"
          >
            Read our insights
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
