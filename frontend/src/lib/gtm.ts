import { useEffect } from "react";

export function trackEvent(event: string, data: Record<string, unknown> = {}) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...data });
}

export function useGtmClickEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackEvent("call_click", { phone: href.replace("tel:", ""), page: window.location.pathname });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { email: href.replace("mailto:", ""), page: window.location.pathname });
      } else if (href.includes("wa.me")) {
        trackEvent("whatsapp_click", { page: window.location.pathname });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
