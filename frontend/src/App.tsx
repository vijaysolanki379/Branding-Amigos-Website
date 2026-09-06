import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { apiGet } from "@/lib/api";
import { useGtmClickEvents } from "@/lib/gtm";
import Home from "@/pages/Home";
import About from "@/pages/About";
import ContactUs from "@/pages/ContactUs";
import Admin from "@/pages/Admin";
import BlogManager from "@/pages/BlogManager";
import CodeManager from "@/pages/CodeManager";
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
      const nodes = [...Array.from(parsed.head.childNodes), ...Array.from(parsed.body.childNodes)];
      nodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && !node.textContent?.trim()) return;
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
        if (first && target.firstChild) target.insertBefore(el, target.firstChild);
        else target.appendChild(el);
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
        // settings unavailable — site works without injected codes
      });

    return () => {
      cancelled = true;
      injected.forEach((node) => node.parentNode?.removeChild(node));
    };
  }, []);
}

export default function App() {
  useSiteCodes();
  useGtmClickEvents();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/blog" element={<BlogManager />} />
        <Route path="/admin/codes" element={<CodeManager />} />
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
