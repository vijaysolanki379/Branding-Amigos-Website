import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const hrefFor = (href: string) => (pathname === "/" ? href : `/${href}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      data-testid="site-header"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || pathname !== "/" ? "border-b border-white/10 bg-[#05061A]/85 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-[padding] duration-300 sm:px-6 lg:px-8 ${
          scrolled || pathname !== "/" ? "py-3" : "py-5"
        }`}
      >
        <a href={hrefFor("#home")} data-testid="header-logo" aria-label="Branding Amigos — home" className="shrink-0">
          <img
            src="/branding-amigos-logo-mark.png"
            alt="Branding Amigos — SEO & Digital Marketing Agency"
            width="166"
            height="75"
            className={`w-auto transition-[height] duration-300 ${scrolled || pathname !== "/" ? "h-9" : "h-11"}`}
          />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={hrefFor(link.href)}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              className="text-sm font-medium text-[#C6CCDF] transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={hrefFor("#contact")}
            data-testid="header-cta"
            className="group inline-flex items-center gap-2 rounded-md bg-[#FF5A36] px-5 py-2.5 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-[#FF3E14] active:scale-[0.98]"
          >
            Get a Free SEO Consultation
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          data-testid="mobile-menu-button"
          aria-label="Open navigation menu"
          aria-expanded={open}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-white lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#05061A] lg:hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <img src="/branding-amigos-logo-mark.png" alt="Branding Amigos" width="166" height="75" className="h-9 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                data-testid="mobile-menu-close"
                aria-label="Close navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={hrefFor(link.href)}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                  className="border-b border-white/10 py-4 font-heading text-3xl text-white transition-colors hover:text-[#FF5A36]"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/insights"
                onClick={() => setOpen(false)}
                data-testid="mobile-nav-insights"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.4 }}
                className="border-b border-white/10 py-4 font-heading text-3xl text-white transition-colors hover:text-[#FF5A36]"
              >
                Insights
              </motion.a>
              <motion.a
                href={hrefFor("#contact")}
                onClick={() => setOpen(false)}
                data-testid="mobile-menu-cta"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44, duration: 0.4 }}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-[#FF5A36] px-6 py-4 text-base font-semibold text-white"
              >
                Get a Free SEO Consultation
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
