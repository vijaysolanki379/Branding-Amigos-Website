const ITEMS = ["SEO Strategy", "Technical SEO", "Content", "Local SEO", "Link Building", "Performance"];

export function Marquee() {
  return (
    <div data-testid="trust-marquee" className="overflow-hidden border-y border-white/10 bg-[#070A26] py-5" aria-hidden>
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {ITEMS.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center">
                <span className="px-8 font-mono text-xs uppercase tracking-[0.3em] text-[#8B93B8]">{item}</span>
                <span className="h-1.5 w-1.5 rotate-45 bg-[#FF5A36]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
