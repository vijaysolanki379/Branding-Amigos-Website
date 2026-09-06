import { useEffect } from "react";
import { PageShell } from "@/components/landing/PageShell";
import { CONTACT_INFO } from "@/lib/site";

const SECTIONS = [
  {
    heading: "Who we are",
    body: [
      "Branding Amigos is an SEO and digital marketing agency based in Ahmedabad, Gujarat, India. This Privacy Policy explains what information we collect through this website, how we use it, and the choices you have.",
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "When you submit our contact or consultation form, we collect the details you provide: your name, business name, email address, phone number, website URL, the services you are interested in, your budget range, and your message.",
      "Like most websites, we may also collect basic technical information (such as browser type and pages visited) to understand how the site is used and to improve it.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "We use the information you submit for one purpose: to respond to your enquiry and discuss the services you asked about. With your agreement, we may follow up with relevant information about our services.",
      "We do not sell, rent, or share your personal information with third parties for their marketing purposes.",
    ],
  },
  {
    heading: "Data storage and retention",
    body: [
      "Enquiry details are stored securely in our systems and retained only as long as needed to handle your enquiry and any resulting business relationship. You can ask us to delete your information at any time.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You may request access to the personal information we hold about you, ask us to correct it, or ask us to delete it. To make a request, contact us using the details below and we will respond promptly.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. The current version is always available on this page, with the date of the latest update shown above.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions about this policy or your information? Email us at ${CONTACT_INFO.email} or call ${CONTACT_INFO.phone}.`,
    ],
  },
];

export default function Privacy() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Privacy Policy | Branding Amigos";
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
        <h1 className="mt-5 font-heading text-4xl tracking-tight text-[#0A0D2C] sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">Last updated: July 2026</p>
        <div data-testid="privacy-content" className="mt-4">
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
