import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { AdminTabs } from "@/components/landing/AdminTabs";
import { ContentImageField } from "@/components/landing/ContentImageField";
import { API_BASE, apiGet } from "@/lib/api";
import { CONTENT_DEFAULTS } from "@/lib/content";
import type { ContentMap } from "@/lib/content";
import { SERVICES_DETAIL } from "@/lib/services";
import { SERVICE_FAQS } from "@/lib/serviceFaqs";

const FIELD =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#5B6280] transition-colors focus:border-[#FF5A36]/60 focus:outline-none focus:ring-2 focus:ring-[#FF5A36]/25";
const LABEL = "mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#9AA2BC]";

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "textarea" | "list" | "image";
  hint?: string;
}

const SEO_FIELDS: FieldDef[] = [
  { key: "meta_title", label: "Meta title (SEO)", type: "text", hint: "Shown in search results. Aim for 60 characters or fewer." },
  { key: "meta_description", label: "Meta description (SEO)", type: "textarea", hint: "Shown under the title in search results. Aim for 160 characters or fewer." },
];

const PAGES: { key: string; label: string; fields: FieldDef[] }[] = [
  {
    key: "home",
    label: "Homepage",
    fields: [
      { key: "hero_line1", label: "Hero headline — line 1", type: "text" },
      { key: "hero_line2", label: "Hero headline — line 2", type: "text" },
      { key: "hero_line3", label: "Hero headline — line 3 (orange highlight)", type: "text" },
      { key: "hero_sub", label: "Hero supporting paragraph", type: "textarea" },
      { key: "why_image", label: "Why-us section image", type: "image" },
      { key: "about_image", label: "About section image", type: "image" },
      ...SEO_FIELDS,
    ],
  },
  {
    key: "contact",
    label: "Contact page",
    fields: [
      { key: "page_title", label: "Page title", type: "text" },
      { key: "page_title_accent", label: "Page title accent (highlighted part)", type: "text" },
      { key: "page_sub", label: "Page subheading", type: "textarea" },
      ...SEO_FIELDS,
    ],
  },
  {
    key: "testimonials",
    label: "Testimonials (homepage)",
    fields: [1, 2, 3].flatMap((n): FieldDef[] => [
      { key: `t${n}_quote`, label: `Testimonial ${n} — quote`, type: "textarea" },
      { key: `t${n}_name`, label: `Testimonial ${n} — client name`, type: "text" },
      { key: `t${n}_role`, label: `Testimonial ${n} — role / company`, type: "text" },
    ]),
  },
  {
    key: "site",
    label: "Header & footer",
    fields: [
      { key: "header_cta", label: "Header button text", type: "text" },
      { key: "footer_tagline", label: "Footer tagline", type: "text" },
      { key: "contact_email", label: "Contact email", type: "text" },
      { key: "contact_phone", label: "Contact phone", type: "text" },
      { key: "contact_location", label: "Location", type: "text" },
      { key: "contact_hours", label: "Business hours", type: "text" },
      { key: "social_linkedin", label: "LinkedIn URL", type: "text" },
      { key: "social_instagram", label: "Instagram URL", type: "text" },
      { key: "social_facebook", label: "Facebook URL", type: "text" },
      { key: "social_x", label: "X (Twitter) URL", type: "text" },
    ],
  },
  ...SERVICES_DETAIL.map((s) => ({
    key: `services/${s.slug}`,
    label: `Service: ${s.name}`,
    fields: [
      { key: "intro", label: "Intro paragraph", type: "textarea" as const },
      { key: "included", label: "What's included (one item per line)", type: "list" as const },
      { key: "outcomes", label: "What you can expect (one item per line)", type: "list" as const },
      { key: "cover", label: "Cover image (optional)", type: "image" as const },
      ...[1, 2, 3, 4].flatMap((n): FieldDef[] => [
        { key: `faq${n}_q`, label: `FAQ ${n} — question`, type: "text" },
        { key: `faq${n}_a`, label: `FAQ ${n} — answer`, type: "textarea" },
      ]),
      ...SEO_FIELDS,
    ],
  })),
];

function defaultsFor(pageKey: string): Record<string, string> {
  if (CONTENT_DEFAULTS[pageKey]) return CONTENT_DEFAULTS[pageKey];
  const slug = pageKey.replace("services/", "");
  const service = SERVICES_DETAIL.find((s) => s.slug === slug);
  if (!service) return {};
  const faqs = SERVICE_FAQS[slug] ?? [];
  return {
    intro: service.intro,
    included: service.included.join("\n"),
    outcomes: service.outcomes.join("\n"),
    cover: "",
    ...Object.fromEntries(faqs.flatMap((f, i) => [[`faq${i + 1}_q`, f.q], [`faq${i + 1}_a`, f.a]])),
    meta_title: service.metaTitle,
    meta_description: service.metaDescription,
  };
}

export default function ContentManager() {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem("ba_admin") ?? "");
  const [pageKey, setPageKey] = useState("home");
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const { data: overrides, isLoading } = useQuery({
    queryKey: ["site-content"],
    queryFn: () => apiGet<ContentMap>("/content"),
    retry: 1,
  });

  const page = PAGES.find((p) => p.key === pageKey) ?? PAGES[0];

  useEffect(() => {
    const defaults = defaultsFor(pageKey);
    const pageOverrides = overrides?.[pageKey] ?? {};
    const next: Record<string, string> = {};
    page.fields.forEach((f) => {
      next[f.key] = pageOverrides[f.key] ?? defaults[f.key] ?? "";
    });
    setValues(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageKey, overrides]);

  useEffect(() => {
    setNotice("");
    setError("");
  }, [pageKey]);

  const save = async () => {
    setSaving(true);
    setNotice("");
    setError("");
    try {
      // Send only fields that differ from defaults — empty means "use the default".
      const defaults = defaultsFor(pageKey);
      const payload: Record<string, string> = {};
      page.fields.forEach((f) => {
        const v = values[f.key] ?? "";
        if (v.trim() !== "" && v !== (defaults[f.key] ?? "")) payload[f.key] = v;
      });
      const res = await fetch(`${API_BASE}/content/${pageKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-Admin-Key": adminKey },
        body: JSON.stringify({ data: payload }),
      });
      if (!res.ok) throw new Error(String(res.status));
      sessionStorage.setItem("ba_admin", adminKey);
      await queryClient.invalidateQueries({ queryKey: ["site-content"] });
      setNotice("Saved — the page updates within seconds.");
    } catch {
      setError("Couldn't save. Check your admin key and try again.");
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    setSaving(true);
    setNotice("");
    setError("");
    try {
      const res = await fetch(`${API_BASE}/content/${pageKey}`, {
        method: "DELETE",
        headers: { "X-Admin-Key": adminKey },
      });
      if (!res.ok) throw new Error(String(res.status));
      sessionStorage.setItem("ba_admin", adminKey);
      await queryClient.invalidateQueries({ queryKey: ["site-content"] });
      setNotice("Reset — this page is back to its default content.");
    } catch {
      setError("Couldn't reset. Check your admin key and try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05061A] font-sans text-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Link to="/" data-testid="content-back-link" className="mb-10 inline-flex items-center gap-2 text-sm text-[#8B93B8] transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>
        <h1 className="font-heading text-4xl">Page content</h1>
        <p className="mt-3 text-sm text-[#8B93B8]">
          Edit the copy, images, and SEO parameters of your homepage, contact page, and every service page. Changes go
          live within seconds of saving.
        </p>
        <div className="mt-8 max-w-sm">
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Admin key"
            data-testid="content-admin-key-input"
            disabled={saving || uploading}
            className={FIELD}
          />
        </div>

        <AdminTabs />

        <div className="mt-8">
          <label htmlFor="page-select" className={LABEL}>Choose a page to edit</label>
          <select
            id="page-select"
            data-testid="content-page-select"
            value={pageKey}
            disabled={saving || uploading}
            onChange={(e) => setPageKey(e.target.value)}
            className={`${FIELD} max-w-md appearance-none`}
          >
            {PAGES.map((p) => (
              <option key={p.key} value={p.key} className="bg-[#0C1030]">
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div data-testid="content-form" className="mt-8 min-w-0 space-y-6 rounded-2xl border border-white/10 bg-[#0C1030] p-4 sm:p-7">
          {isLoading ? (
            <p className="text-sm text-[#8B93B8]">Loading current content…</p>
          ) : (
            page.fields.map((f) => (
              <div key={`${pageKey}-${f.key}`}>
                <label htmlFor={`field-${f.key}`} className={LABEL}>{f.label}</label>
                {f.type === "image" ? (
                  <ContentImageField fieldKey={f.key} label={f.label} value={values[f.key] ?? ""}
                    adminKey={adminKey} disabled={saving || uploading} inputClassName={FIELD}
                    onUploading={setUploading}
                    onChange={(value) => { setNotice(""); setValues((v) => ({ ...v, [f.key]: value })); }} />
                ) : f.type === "text" ? (
                  <input
                    id={`field-${f.key}`}
                    data-testid={`content-field-${f.key}`}
                    value={values[f.key] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                    className={FIELD}
                  />
                ) : (
                  <textarea
                    id={`field-${f.key}`}
                    data-testid={`content-field-${f.key}`}
                    rows={f.type === "list" ? 6 : 3}
                    value={values[f.key] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                    className={`${FIELD} resize-y`}
                  />
                )}
                {f.hint && <p className="mt-1.5 text-xs text-[#5B6280]">{f.hint}</p>}
              </div>
            ))
          )}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={save}
              disabled={saving || uploading || isLoading || !adminKey}
              data-testid="content-save-button"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FF5A36] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#FF3E14] disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Save className="h-4 w-4" aria-hidden />}
              Save changes
            </button>
            <button
              type="button"
              onClick={reset}
              disabled={saving || uploading || isLoading || !adminKey}
              data-testid="content-reset-button"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-[#C6CCDF] transition-colors hover:border-[#FF5A36]/60 hover:text-white disabled:opacity-50"
            >
              Reset to defaults
            </button>
          </div>
          <p className="text-xs text-[#5B6280]">Leave any field empty to use its default value.</p>
          {notice && <p data-testid="content-success" className="text-sm text-emerald-400">{notice}</p>}
          {error && <p data-testid="content-error" className="text-sm text-[#FF5A36]">{error}</p>}
        </div>
      </div>
    </div>
  );
}
