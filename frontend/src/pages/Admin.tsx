import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Inbox, Loader2, MailCheck, PenLine } from "lucide-react";
import type { ContactInquiry } from "@/lib/site";
import { EnquiryCard } from "@/components/landing/EnquiryCard";

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export default function Admin() {
  const [key, setKey] = useState(() => sessionStorage.getItem("ba_admin") ?? "");
  const [items, setItems] = useState<ContactInquiry[] | null>(null);
  const [subs, setSubs] = useState<Subscriber[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [enqRes, subRes] = await Promise.all([
        fetch("/api/contact", { headers: { "X-Admin-Key": key } }),
        fetch("/api/newsletter", { headers: { "X-Admin-Key": key } }),
      ]);
      if (!enqRes.ok) throw new Error(String(enqRes.status));
      setItems((await enqRes.json()) as ContactInquiry[]);
      if (subRes.ok) setSubs((await subRes.json()) as Subscriber[]);
      sessionStorage.setItem("ba_admin", key);
    } catch {
      setError("Could not load enquiries. Check your admin key and try again.");
      setItems(null);
      setSubs(null);
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
        <p className="mt-3 text-sm text-[#8B93B8]">Enter your admin key to review enquiries, track follow-ups, and see newsletter subscribers.</p>
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
          <span
            data-testid="admin-tab-enquiries"
            className="inline-flex items-center gap-2 rounded-t-lg bg-[#0C1030] px-5 py-3 text-sm font-semibold text-white"
          >
            <Inbox className="h-4 w-4" /> Enquiries
          </span>
          <Link
            to="/admin/blog"
            data-testid="admin-tab-blog"
            className="inline-flex items-center gap-2 rounded-t-lg px-5 py-3 text-sm font-semibold text-[#8B93B8] transition-colors hover:text-white"
          >
            <PenLine className="h-4 w-4" /> Blog manager
          </Link>
        </div>

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
                <EnquiryCard
                  key={item.id}
                  item={item}
                  adminKey={key}
                  onUpdated={(updated: ContactInquiry) =>
                    setItems((cur) => (cur ? cur.map((c) => (c.id === updated.id ? updated : c)) : cur))
                  }
                />
              ))}
            </div>
          )}
          {subs && (
            <div data-testid="admin-subscribers" className="mt-14">
              <h2 className="flex items-center gap-2 font-heading text-2xl">
                <MailCheck className="h-5 w-5 text-[#FF5A36]" aria-hidden /> Newsletter subscribers ({subs.length})
              </h2>
              {subs.length === 0 ? (
                <p className="mt-4 text-sm text-[#8B93B8]">No subscribers yet.</p>
              ) : (
                <ul className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10 bg-[#0C1030]">
                  {subs.map((sub) => (
                    <li key={sub.id} className="flex items-center justify-between px-5 py-3 text-sm">
                      <span>{sub.email}</span>
                      <time className="font-mono text-xs text-[#8B93B8]">{new Date(sub.created_at).toLocaleDateString()}</time>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
