import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/landing/PageShell";
import { SERVICES_DETAIL } from "@/lib/services";

const POPULAR = ["ai-seo", "google-ads", "social-media-marketing", "web-design"];

export default function NotFound() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Page Not Found | Branding Amigos";
    return () => {
      document.title = prev;
    };
  }, []);

  const popular = SERVICES_DETAIL.filter((s) => POPULAR.includes(s.slug));

  return (
    <PageShell>
      <div data-testid="not-found-page" className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p aria-hidden className="font-heading text-[7rem] leading-none tracking-tight text-[#10134A]/15 sm:text-[10rem]">
          404
        </p>
        <h1 className="-mt-8 font-heading text-3xl tracking-tight text-[#0A0D2C] sm:-mt-14 sm:text-4xl">
          This page doesn't exist — <em className="italic text-[#FF5A36]">but your growth plan can.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[#475569]">
          The link may be broken or the page may have moved. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            data-testid="not-found-home"
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#FF5A36] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#FF3E14]"
          >
            Back to homepage
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <Link
            to="/insights"
            data-testid="not-found-insights"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[#0A0D2C]/15 px-7 py-3.5 text-sm font-semibold text-[#0A0D2C] transition-colors hover:border-[#3535D6] hover:text-[#3535D6]"
          >
            Read our insights
          </Link>
        </div>
        <div className="mt-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#94A3B8]">Popular services</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {popular.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                data-testid={`not-found-service-${service.slug}`}
                className="group flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-white px-5 py-4 text-left transition-colors hover:border-[#3535D6]/40"
              >
                <span className="text-sm font-semibold text-[#0A0D2C] group-hover:text-[#3535D6]">{service.name}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#3535D6]" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
