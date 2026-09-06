import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { SERVICES_DETAIL } from "@/lib/services";
import { PageShell } from "@/components/landing/PageShell";
import { Reveal } from "@/components/landing/Reveal";

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES_DETAIL.find((s) => s.slug === slug);

  useEffect(() => {
    if (!service) return;
    const prevTitle = document.title;
    document.title = service.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? null;
    meta?.setAttribute("content", service.metaDescription);
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      description: service.metaDescription,
      url: `https://brandingamigos.com/services/${service.slug}`,
      provider: {
        "@type": "ProfessionalService",
        name: "Branding Amigos",
        url: "https://brandingamigos.com/",
      },
      areaServed: { "@type": "Country", name: "India" },
    });
    document.head.appendChild(script);
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc) meta.setAttribute("content", prevDesc);
      script.remove();
    };
  }, [service]);

  if (!service) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-heading text-4xl text-[#0A0D2C]">Service not found</h1>
          <p className="mt-4 text-base text-[#475569]">This service may have been moved.</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#3535D6] hover:text-[#FF5A36]">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to homepage
          </Link>
        </div>
      </PageShell>
    );
  }

  const related = SERVICES_DETAIL.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <PageShell>
      <div data-testid="service-page" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/#services"
          data-testid="service-back-link"
          className="inline-flex items-center gap-2 text-sm text-[#475569] transition-colors hover:text-[#3535D6]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> All services
        </Link>

        <div className="mt-10 max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-[#8B93B8]">
            <span className="text-[#FF5A36]">[</span> <span className="text-[#475569]">SERVICES</span>{" "}
            <span className="text-[#FF5A36]">]</span>
          </p>
          <h1 className="mt-5 font-heading text-4xl leading-[1.1] tracking-tight text-[#0A0D2C] sm:text-5xl lg:text-6xl">
            {service.name}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#475569] sm:text-lg">{service.intro}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="/#contact"
              data-testid="service-cta"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#FF5A36] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#FF3E14]"
            >
              Get a Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a
              href={`https://wa.me/917984568245?text=${encodeURIComponent(`Hi Branding Amigos! I'd like to discuss ${service.name} for my business.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="service-whatsapp-cta"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#0A0D2C]/15 px-7 py-3.5 text-sm font-semibold text-[#0A0D2C] transition-colors hover:border-[#25D366] hover:text-[#128C4A]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-[#E2E8F0] bg-white p-8 sm:p-10">
              <h2 className="font-heading text-2xl tracking-tight text-[#0A0D2C]">What's included</h2>
              <ul className="mt-6 space-y-4">
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-[#475569]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10134A]">
                      <Check className="h-3 w-3 text-[#FF5A36]" aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl bg-[#05061A] p-8 sm:p-10">
              <h2 className="font-heading text-2xl tracking-tight text-white">What you can expect</h2>
              <ul className="mt-6 space-y-4">
                {service.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-[#C6CCDF]">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#FF5A36]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-20">
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-[#8B93B8]">
            <span className="text-[#FF5A36]">[</span> <span className="text-[#475569]">Explore more services</span>{" "}
            <span className="text-[#FF5A36]">]</span>
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                to={`/services/${rel.slug}`}
                data-testid={`related-service-${rel.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#3535D6]/40 hover:shadow-[0_24px_48px_-24px_rgba(16,19,74,0.25)]"
              >
                <span className="font-heading text-xl tracking-tight text-[#0A0D2C] transition-colors group-hover:text-[#3535D6]">
                  {rel.name}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#3535D6] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-2xl bg-[#05061A] p-8 sm:p-12">
          <h2 className="max-w-xl font-heading text-3xl leading-snug tracking-tight text-white">
            Ready to grow with <em className="italic text-[#FF5A36]">{service.name}</em>?
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#A7AEC9]">
            Tell us about your business and goals — we'll review your requirements and recommend the right strategy.
            No obligation.
          </p>
          <a
            href="/#contact"
            data-testid="service-bottom-cta"
            className="group mt-8 inline-flex items-center gap-2 rounded-md bg-[#FF5A36] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#FF3E14]"
          >
            Request Free Consultation
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </div>
      </div>
    </PageShell>
  );
}
