
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { apiGet } from "@/lib/api";
import { useGtmClickEvents } from "@/lib/gtm";
import Home from "@/pages/Home";
import About from "@/pages/About";
import ContactUs from "@/pages/ContactUs";
import ThankYou from "@/pages/ThankYou";
import Admin from "@/pages/Admin";
import BlogManager from "@/pages/BlogManager";
import CodeManager from "@/pages/CodeManager";
import ContentManager from "@/pages/ContentManager";
import Insights from "@/pages/Insights";
import InsightPost from "@/pages/InsightPost";
import ServicePage from "@/pages/ServicePage";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";

interface SiteSettings {
  head_code: string;
  body_code: string;
}

function useSiteCodes() {
  useEffect(() => {
    let cancelled = false;
    const injected: Node[] = [];

    const inject = (html: string, target: HTMLElement, first: boolean) => {
      if (!html.trim()) return;

      const parsed = new DOMParser().parseFromString(html, "text/html");
      const nodes = [
        ...Array.from(parsed.head.childNodes),
        ...Array.from(parsed.body.childNodes),
      ];

      nodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && !node.textContent?.trim()) {
          return;
        }

        let el: Node;

        if (node.nodeName === "SCRIPT") {
          const script = document.createElement("script");

          Array.from((node as HTMLScriptElement).attributes).forEach((attr) =>
            script.setAttribute(attr.name, attr.value)
          );

          script.textContent = node.textContent;
          el = script;
        } else {
          el = node.cloneNode(true);
        }

        if (first && target.firstChild) {
          target.insertBefore(el, target.firstChild);
        } else {
          target.appendChild(el);
        }

        injected.push(el);
      });
    };

    apiGet<SiteSettings>("/settings")
      .then((settings) => {
        if (cancelled) return;

        inject(settings.head_code, document.head, false);
        inject(settings.body_code, document.body, true);
      })
      .catch(() => {
        // Settings unavailable — site works without injected codes.
      });

    return () => {
      cancelled = true;
      injected.forEach((node) => node.parentNode?.removeChild(node));
    };
  }, []);
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Dynamically generates a self-referencing canonical URL for every route.
function DynamicCanonical() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Remove trailing slashes, except for the homepage.
    const normalizedPath = pathname.replace(/\/+$/, "") || "/";

    // Always use the primary domain.
    const canonicalUrl = `https://brandingamigos.com${normalizedPath}`;

    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );

    // Create the canonical element if it does not exist.
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    // Update canonical URL whenever the route changes.
    canonical.setAttribute("href", canonicalUrl);
  }, [pathname]);

  return null;
}

export default function App() {
  useSiteCodes();
  useGtmClickEvents();

  return (
    <>
      <ScrollToTop />
      <DynamicCanonical />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/blog" element={<BlogManager />} />
        <Route path="/admin/codes" element={<CodeManager />} />
        <Route path="/admin/content" element={<ContentManager />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<InsightPost />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <WhatsAppButton />
    </>
  );
}
