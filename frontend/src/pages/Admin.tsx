import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Inbox, Loader2, PenLine } from "lucide-react";
import type { ContactInquiry } from "@/lib/site";
import { ArticlePublisher } from "@/components/landing/ArticlePublisher";

export default function Admin() {
  const [key, setKey] = useState(() => sessionStorage.getItem("ba_admin") ?? "");
  const [items, setItems] = useState<ContactInquiry[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"enquiries" | "publish">("enquiries");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", { headers: { "X-Admin-Key": key } });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as ContactInquiry[];
      setItems(data);
      sessionStorage.setItem("ba_admin", key);
    } catch {
      setError("Could not load enquiries. Check your admin key and try again.");
      setItems(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05061A] font-sans text-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <Link to="/" data-testid="admin-back-link" className="mb-10 inline-flex items-center gap-2 text-sm text-[#8B93B8] transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>
        <h1 className="font-heading text-4xl">Branding Amigos admin</h1>
        <p className="mt-3 text-sm text-[#8B93B8]">Enter your admin key, then review enquiries or publish a new insight article.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin key"
            data-testid="admin-key-input"
            className="w-full max-w-sm rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#5B6280] focus:border-[#FF5A36]/60 focus:outline-none"
          />
        </div>

        <div className="mt-8 flex gap-2 border-b border-white/10 pb-px">
          <button
            type="button"
            onClick={() => setTab("enquiries")}
            data-testid="admin-tab-enquiries"
            className={`inline-flex items-center gap-2 rounded-t-lg px-5 py-3 text-sm font-semibold transition-colors ${
              tab === "enquiries" ? "bg-[#0C1030] text-white" : "text-[#8B93B8] hover:text-white"
            }`}
          >
            <Inbox className="h-4 w-4" /> Enquiries
          </button>
          <button
            type="button"
            onClick={() => setTab("publish")}
            data-testid="admin-tab-publish"
            className={`inline-flex items-center gap-2 rounded-t-lg px-5 py-3 text-sm font-semibold transition-colors ${
              tab === "publish" ? "bg-[#0C1030] text-white" : "text-[#8B93B8] hover:text-white"
            }`}
          >
            <PenLine className="h-4 w-4" /> Publish article
          </button>
        </div>

        {tab === "enquiries" && (
          <div>
            <button
              onClick={load}
              disabled={loading || !key}
              data-testid="admin-load-button"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF5A36] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#FF3E14] disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Inbox className="h-4 w-4" />}
              Load enquiries
            </button>
            {error && <p data-testid="admin-error" className="mt-4 text-sm text-[#FF5A36]">{error}</p>}
            {items && (
              <div data-testid="admin-results" className="mt-10 space-y-4">
                {items.length === 0 && <p className="text-sm text-[#8B93B8]">No enquiries yet.</p>}
                {items.map((item) => (
                  <article key={item.id} className="rounded-xl border border-white/10 bg-[#0C1030] p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="text-lg font-semibold">{item.name}{item.business ? ` — ${item.business}` : ""}</h2>
                      <time className="font-mono text-xs text-[#8B93B8]">{new Date(item.created_at).toLocaleString()}</time>
                    </div>
                    <p className="mt-1 text-sm text-[#8B93B8]">{item.email}{item.phone ? ` · ${item.phone}` : ""}{item.website ? ` · ${item.website}` : ""}</p>
                    {item.services.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.services.map((s) => (
                          <span key={s} className="rounded-full bg-[#10134A] px-3 py-1 text-xs text-[#C6CCDF]">{s}</span>
                        ))}
                      </div>
                    )}
                    {item.budget && <p className="mt-3 text-xs text-[#8B93B8]">Budget: {item.budget}</p>}
                    <p className="mt-3 text-sm leading-relaxed text-[#C6CCDF]">{item.goals}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "publish" && <ArticlePublisher adminKey={key} />}
      </div>
    </div>
  );
}
