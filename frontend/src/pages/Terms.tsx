import { useEffect } from "react";
import { PageShell } from "@/components/landing/PageShell";
import { CONTACT_INFO } from "@/lib/site";

const SECTIONS = [
  {
    heading: "About these terms",
    body: [
      "These Terms of Service govern your use of the Branding Amigos website and any services you engage us for. Branding Amigos is an SEO and digital marketing agency based in Ahmedabad, Gujarat, India. By using this website, you accept these terms.",
    ],
  },
  {
    heading: "Our services",
    body: [
      "Branding Amigos provides SEO, content, and digital marketing services. Specific scope, deliverables, timelines, and fees for any engagement are agreed individually in a proposal or service agreement before work begins.",
      "Submitting an enquiry through this website does not create a client relationship or obligation on either side.",
    ],
  },
  {
    heading: "No guaranteed rankings",
    body: [
      "Search engine rankings are determined by third-party algorithms outside our control. While we apply proven, ethical practices and report transparently on progress, we do not and cannot guarantee specific rankings, positions, traffic levels, or timelines. Any statements about expected outcomes are professional estimates, not promises.",
    ],
  },
  {
    heading: "Website content",
    body: [
      "The content on this website is provided for general information. Case studies, testimonials, and results are published only with client permission. Placeholder content shown on this site is clearly marked as such and does not represent actual client outcomes.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "All content, branding, and design on this website — including the Branding Amigos name and logo — are the property of Branding Amigos and may not be reproduced without written permission. Work we produce for clients is governed by the individual service agreement.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "We work carefully and professionally, but to the extent permitted by law, Branding Amigos is not liable for indirect or consequential losses arising from the use of this website or our services. Our total liability for any engagement is limited to the fees paid for the services concerned.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of India, and any disputes are subject to the jurisdiction of the courts of Ahmedabad, Gujarat.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions about these terms? Email us at ${CONTACT_INFO.email} or call ${CONTACT_INFO.phone}.`,
    ],
  },
];

export default function Terms() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Terms of Service | Branding Amigos";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-[#8B93B8]">
          <span className="text-[#FF5A36]">[</span> <span className="text-[#475569]">LEGAL</span> <span className="text-[#FF5A36]">]</span>
        </p>
        <h1 className="mt-5 font-heading text-4xl tracking-tight text-[#0A0D2C] sm:text-5xl">Terms of Service</h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">Last updated: July 2026</p>
        <div data-testid="terms-content" className="mt-4">
          {SECTIONS.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="font-heading text-2xl tracking-tight text-[#0A0D2C]">{section.heading}</h2>
              {section.body.map((p, i) => (
                <p key={i} className="mt-4 text-base leading-relaxed text-[#475569]">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
