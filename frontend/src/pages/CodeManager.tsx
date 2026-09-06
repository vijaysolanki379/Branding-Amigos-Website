import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Code2, Loader2, Save } from "lucide-react";
import { AdminTabs } from "@/components/landing/AdminTabs";

const FIELD =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#5B6280] transition-colors focus:border-[#FF5A36]/60 focus:outline-none focus:ring-2 focus:ring-[#FF5A36]/25";
const LABEL = "mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#9AA2BC]";

export default function CodeManager() {
  const [key, setKey] = useState(() => sessionStorage.getItem("ba_admin") ?? "");
  const [headCode, setHeadCode] = useState("");
  const [bodyCode, setBodyCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((s: { head_code?: string; body_code?: string }) => {
        setHeadCode(s.head_code ?? "");
        setBodyCode(s.body_code ?? "");
      })
      .catch(() => setError("Couldn't load current settings."))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    setNotice("");
    setError("");
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-Admin-Key": key },
        body: JSON.stringify({ head_code: headCode, body_code: bodyCode }),
      });
      if (!res.ok) throw new Error(String(res.status));
      sessionStorage.setItem("ba_admin", key);
      setNotice("Saved. Your codes are live on every page — refresh the site to see them in action.");
    } catch {
      setError("Couldn't save. Check your admin key and try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05061A] font-sans text-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Link to="/" data-testid="codes-back-link" className="mb-10 inline-flex items-center gap-2 text-sm text-[#8B93B8] transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>
        <h1 className="font-heading text-4xl">Site codes</h1>
        <p className="mt-3 text-sm text-[#8B93B8]">
          Add tracking and verification codes to every page — Google Tag Manager, analytics, custom schema (JSON-LD),
          pixels, and more. Codes save instantly and load on every page of the site.
        </p>
        <div className="mt-8 max-w-sm">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin key"
            data-testid="codes-admin-key-input"
            className={FIELD}
          />
        </div>

        <AdminTabs />

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0C1030] p-7">
            <label htmlFor="head-code" className={LABEL}>
              <Code2 className="mr-2 inline h-4 w-4 text-[#FF5A36]" aria-hidden />
              Head code — injected before &lt;/head&gt;
            </label>
            <textarea
              id="head-code"
              data-testid="head-code-input"
              rows={8}
              value={headCode}
              onChange={(e) => setHeadCode(e.target.value)}
              placeholder={'<!-- Example: Google Tag Manager -->\n<script>(function(w,d,s,l,i){...})(window,document,\'script\',\'dataLayer\',\'GTM-XXXXXXX\');</script>\n\n<!-- Example: custom schema -->\n<script type="application/ld+json">{"@context":"https://schema.org", ...}</script>'}
              className={`${FIELD} resize-y font-mono text-[13px] leading-relaxed`}
              disabled={loading}
            />
            <p className="mt-2 text-xs text-[#8B93B8]">
              Use for GTM script tags, analytics snippets, verification meta tags, and structured data.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0C1030] p-7">
            <label htmlFor="body-code" className={LABEL}>
              <Code2 className="mr-2 inline h-4 w-4 text-[#FF5A36]" aria-hidden />
              Body code — injected right after &lt;body&gt;
            </label>
            <textarea
              id="body-code"
              data-testid="body-code-input"
              rows={5}
              value={bodyCode}
              onChange={(e) => setBodyCode(e.target.value)}
              placeholder={'<!-- Example: Google Tag Manager (noscript) -->\n<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" ...></iframe></noscript>'}
              className={`${FIELD} resize-y font-mono text-[13px] leading-relaxed`}
              disabled={loading}
            />
            <p className="mt-2 text-xs text-[#8B93B8]">
              Use for the GTM noscript iframe and anything that must load at the top of the page body.
            </p>
          </div>

          <p className="rounded-xl border border-[#3535D6]/30 bg-[#10134A]/30 px-5 py-4 text-xs leading-relaxed text-[#C6CCDF]">
            Google Search Console verification is already live in the site's HTML head — no action needed here.
          </p>

          <button
            type="button"
            onClick={save}
            disabled={saving || loading || !key}
            data-testid="codes-save-button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FF5A36] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#FF3E14] disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Save className="h-4 w-4" aria-hidden />}
            Save codes
          </button>
          {notice && <p data-testid="codes-success" className="text-sm text-emerald-400">{notice}</p>}
          {error && <p data-testid="codes-error" className="text-sm text-[#FF5A36]">{error}</p>}
        </div>
      </div>
    </div>
  );
}
