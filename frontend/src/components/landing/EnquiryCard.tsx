import { useState } from "react";
import type { ContactInquiry } from "@/lib/site";

const STATUSES = [
  { value: "new", label: "New", cls: "bg-[#FF5A36]/15 text-[#FF5A36]" },
  { value: "contacted", label: "Contacted", cls: "bg-amber-400/15 text-amber-400" },
  { value: "closed", label: "Closed", cls: "bg-emerald-400/15 text-emerald-400" },
] as const;

export function EnquiryCard({
  item,
  adminKey,
  onUpdated,
}: {
  item: ContactInquiry;
  adminKey: string;
  onUpdated: (updated: ContactInquiry) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const setStatus = async (status: string) => {
    if (status === item.status || saving) return;
    setSaving(true);
    setError(false);
    try {
      const res = await fetch(`/api/contact/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "X-Admin-Key": adminKey },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(String(res.status));
      onUpdated((await res.json()) as ContactInquiry);
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  };

  const current = STATUSES.find((s) => s.value === item.status) ?? STATUSES[0];

  return (
    <article data-testid={`enquiry-${item.id}`} className="rounded-xl border border-white/10 bg-[#0C1030] p-6">
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
      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
        <span data-testid={`status-badge-${item.id}`} className={`rounded-full px-3 py-1 text-xs font-semibold ${current.cls}`}>
          {current.label}
        </span>
        <span className="text-xs text-[#5B6280]">Mark as:</span>
        {STATUSES.filter((s) => s.value !== item.status).map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => setStatus(s.value)}
            disabled={saving}
            data-testid={`status-${s.value}-${item.id}`}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#C6CCDF] transition-colors hover:border-[#FF5A36]/60 hover:text-white disabled:opacity-50"
          >
            {s.label}
          </button>
        ))}
        {error && <span className="text-xs text-[#FF5A36]">Couldn't update — try again.</span>}
      </div>
    </article>
  );
}
