import { useState } from "react";
import { Check, Link2 } from "lucide-react";

const PATHS = {
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
};

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://brandingamigos.com/insights/${slug}`;
  const links = [
    {
      label: "LinkedIn",
      path: PATHS.linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "X",
      path: PATHS.x,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  return (
    <div data-testid="share-buttons" className="mt-8 flex items-center gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#94A3B8]">Share</span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share this article on ${link.label}`}
          data-testid={`share-${link.label.toLowerCase()}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E2E8F0] text-[#475569] transition-colors hover:border-[#3535D6] hover:text-[#3535D6]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
            <path d={link.path} />
          </svg>
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy article link"
        data-testid="share-copy"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E2E8F0] text-[#475569] transition-colors hover:border-[#FF5A36] hover:text-[#FF5A36]"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-500" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
      </button>
    </div>
  );
}
