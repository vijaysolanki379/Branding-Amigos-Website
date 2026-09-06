import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";
import { SERVICES_DETAIL } from "@/lib/services";
import { EASE } from "./Reveal";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { pathname } = useLocation();
  const hrefFor = (href: string) => (pathname === "/" ? href : `/${href}`);
  const solid = scrolled || pathname !== "/";

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
        solid ? "border-b border-white/10 bg-[#05061A]/85 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-[padding] duration-300 sm:px-6 lg:px-8 ${
          solid ? "py-3" : "py-5"
        }`}
      >
        <a href={hrefFor("#home")} data-testid="header-logo" aria-label="Branding Amigos — home" className="shrink-0">
          <img
            src="/branding-amigos-logo-mark.png"
            alt="Branding Amigos — SEO & Digital Marketing Agency"
            width="166"
            height="75"
            className={`w-auto transition-[height] duration-300 ${solid ? "h-9" : "h-11"}`}
          />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) =>
            link.label === "Services" ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                onFocus={() => setServicesOpen(true)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setServicesOpen(false);
                }}
              >
                <a
                  href={hrefFor("#services")}
                  data-testid="nav-link-services"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1.5 text-sm font-medium text-[#C6CCDF] transition-colors hover:text-white"
                >
                  Services
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </a>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      data-testid="services-dropdown"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-4"
                    >
                      <div className="rounded-2xl border border-white/10 bg-[#0C1030] p-4 shadow-[0_32px_64px_-24px_rgba(3,4,18,0.9)]">
                        <div className="grid grid-cols-2 gap-1">
                          {SERVICES_DETAIL.map((service) => (
                            <a
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              data-testid={`dropdown-service-${service.slug}`}
                              className="group flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 transition-colors hover:bg-white/5"
                            >
                              <span className="text-sm font-medium text-[#C6CCDF] transition-colors group-hover:text-white">
                                {service.name}
                              </span>
                              <ArrowRight className="h-3.5 w-3.5 text-[#FF5A36] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                            </a>
                          ))}
                        </div>
                        <a
                          href={hrefFor("#services")}
                          data-testid="dropdown-all-services"
                          className="mt-2 flex items-center justify-between rounded-lg border-t border-white/10 px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#FF5A36] transition-colors hover:text-[#FF3E14]"
                        >
                          View all services
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={link.href}
                href={hrefFor(link.href)}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                className="text-sm font-medium text-[#C6CCDF] transition-colors hover:text-white"
              >
                {link.label}
              </a>
            )
          )}
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
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 overflow-y-auto px-8 py-6">
              {NAV_LINKS.map((link, i) =>
                link.label === "Services" ? (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.4 }}
                  >
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      data-testid="mobile-nav-services"
                      aria-expanded={mobileServicesOpen}
                      className="flex w-full items-center justify-between border-b border-white/10 py-4 text-left font-heading text-3xl text-white transition-colors hover:text-[#FF5A36]"
                    >
                      Services
                      <ChevronDown
                        className={`h-6 w-6 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <a
                            href={hrefFor("#services")}
                            onClick={() => setOpen(false)}
                            data-testid="mobile-nav-all-services"
                            className="block py-3 pl-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#FF5A36]"
                          >
                            All services
                          </a>
                          {SERVICES_DETAIL.map((service) => (
                            <a
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={() => setOpen(false)}
                              data-testid={`mobile-nav-service-${service.slug}`}
                              className="block py-2.5 pl-4 text-base text-[#A7AEC9] transition-colors hover:text-white"
                            >
                              {service.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
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
                )
              )}
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
