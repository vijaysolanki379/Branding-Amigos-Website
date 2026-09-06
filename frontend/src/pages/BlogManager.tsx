import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Loader2, PenLine, Plus, RefreshCw, Send } from "lucide-react";
import { AdminTabs } from "@/components/landing/AdminTabs";
import type { InsightPost } from "@/lib/site";

const FIELD =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#5B6280] transition-colors focus:border-[#FF5A36]/60 focus:outline-none focus:ring-2 focus:ring-[#FF5A36]/25";
const LABEL = "mb-1.5 flex items-center justify-between font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#9AA2BC]";

const EMPTY = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  tags: "",
  cover: "",
  focus_keyword: "",
  meta_title: "",
  meta_description: "",
  content: "",
};

export default function BlogManager() {
  const [key, setKey] = useState(() => sessionStorage.getItem("ba_admin") ?? "");
  const [posts, setPosts] = useState<InsightPost[] | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error(String(res.status));
      setPosts((await res.json()) as InsightPost[]);
    } catch {
      setPosts(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const set = (field: keyof typeof EMPTY) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const startEdit = (post: InsightPost) => {
    setNotice("");
    setError("");
    setForm({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      tags: post.tags.join(", "),
      cover: post.cover ?? "",
      focus_keyword: post.focus_keyword ?? "",
      meta_title: post.meta_title ?? "",
      meta_description: post.meta_description ?? "",
      content: post.content,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const body = {
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        cover: form.cover || null,
        focus_keyword: form.focus_keyword || null,
        meta_title: form.meta_title || null,
        meta_description: form.meta_description || null,
      };
      const res = await fetch(form.id ? `/api/posts/${form.id}` : "/api/posts", {
        method: form.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Key": key },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(String(res.status));
      const saved = (await res.json()) as InsightPost;
      sessionStorage.setItem("ba_admin", key);
      setNotice(form.id ? `Updated: ${saved.title}` : `Published: ${saved.title}`);
      setForm(EMPTY);
      await load();
    } catch {
      setError("Could not save. Check your admin key and that title, excerpt, and content are filled in.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05061A] font-sans text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Link to="/admin" data-testid="blog-back-link" className="mb-10 inline-flex items-center gap-2 text-sm text-[#8B93B8] transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to admin
        </Link>
        <h1 className="font-heading text-4xl">Blog manager</h1>
        <p className="mt-3 text-sm text-[#8B93B8]">
          Publish and edit insight articles with full SEO parameters. Meta title and description override the defaults
          shown in search results; the focus keyword is added to the article's metadata.
        </p>

        <div className="mt-8 max-w-sm">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin key"
            data-testid="blog-admin-key-input"
            className={FIELD}
          />
        </div>

        <AdminTabs />

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl">Published articles</h2>
              <button
                type="button"
                onClick={load}
                data-testid="blog-refresh-button"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-[#C6CCDF] transition-colors hover:border-[#FF5A36]/60 hover:text-white"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
              </button>
            </div>
            <div data-testid="blog-post-list" className="mt-5 space-y-3">
              {posts === null && <p className="text-sm text-[#8B93B8]">{loading ? "Loading…" : "Couldn't load articles."}</p>}
              {posts?.length === 0 && <p className="text-sm text-[#8B93B8]">No articles yet — publish your first one.</p>}
              {posts?.map((post) => (
                <div key={post.id} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#0C1030] p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{post.title}</p>
                    <p className="mt-1 font-mono text-[11px] text-[#8B93B8]">
                      /insights/{post.slug} · {new Date(post.published_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link
                      to={`/insights/${post.slug}`}
                      data-testid={`blog-view-${post.slug}`}
                      aria-label={`View ${post.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-[#8B93B8] transition-colors hover:border-white/40 hover:text-white"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => startEdit(post)}
                      data-testid={`blog-edit-${post.slug}`}
                      aria-label={`Edit ${post.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-[#8B93B8] transition-colors hover:border-[#FF5A36]/60 hover:text-[#FF5A36]"
                    >
                      <PenLine className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl">{form.id ? "Edit article" : "New article"}</h2>
              {form.id && (
                <button
                  type="button"
                  onClick={() => setForm(EMPTY)}
                  data-testid="blog-new-button"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-[#C6CCDF] transition-colors hover:border-[#FF5A36]/60 hover:text-white"
                >
                  <Plus className="h-3.5 w-3.5" /> New article
                </button>
              )}
            </div>
            {form.id && (
              <p className="mt-2 font-mono text-[11px] text-[#8B93B8]">Editing /insights/{form.slug} — the URL stays the same.</p>
            )}
            <form onSubmit={onSubmit} data-testid="blog-form" className="mt-5 space-y-5 rounded-2xl border border-white/10 bg-[#0C1030] p-7">
              <div>
                <label htmlFor="blog-title" className={LABEL}>Title</label>
                <input id="blog-title" data-testid="blog-title-input" required minLength={4} value={form.title} onChange={set("title")} placeholder="Article title" className={FIELD} />
              </div>
              <div>
                <label htmlFor="blog-excerpt" className={LABEL}>Excerpt</label>
                <input id="blog-excerpt" data-testid="blog-excerpt-input" required minLength={10} value={form.excerpt} onChange={set("excerpt")} placeholder="One or two sentences shown in article cards" className={FIELD} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="blog-tags" className={LABEL}>Tags (comma separated)</label>
                  <input id="blog-tags" data-testid="blog-tags-input" value={form.tags} onChange={set("tags")} placeholder="SEO Strategy, Local SEO" className={FIELD} />
                </div>
                <div>
                  <label htmlFor="blog-cover" className={LABEL}>Cover image URL (optional)</label>
                  <input id="blog-cover" data-testid="blog-cover-input" value={form.cover} onChange={set("cover")} placeholder="https://…" className={FIELD} />
                </div>
              </div>

              <div className="rounded-xl border border-[#3535D6]/30 bg-[#10134A]/30 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8A88FF]">SEO parameters</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="blog-meta-title" className={LABEL}>
                      Meta title <span className={form.meta_title.length > 60 ? "text-[#FF5A36]" : "text-[#5B6280]"}>{form.meta_title.length}/60</span>
                    </label>
                    <input id="blog-meta-title" data-testid="blog-meta-title-input" value={form.meta_title} onChange={set("meta_title")} placeholder="Defaults to: Title | Branding Amigos" className={FIELD} />
                  </div>
                  <div>
                    <label htmlFor="blog-meta-description" className={LABEL}>
                      Meta description <span className={form.meta_description.length > 160 ? "text-[#FF5A36]" : "text-[#5B6280]"}>{form.meta_description.length}/160</span>
                    </label>
                    <textarea id="blog-meta-description" data-testid="blog-meta-description-input" rows={2} value={form.meta_description} onChange={set("meta_description")} placeholder="Defaults to the excerpt" className={`${FIELD} resize-y`} />
                  </div>
                  <div>
                    <label htmlFor="blog-focus-keyword" className={LABEL}>Focus keyword</label>
                    <input id="blog-focus-keyword" data-testid="blog-focus-keyword-input" value={form.focus_keyword} onChange={set("focus_keyword")} placeholder="e.g. local seo checklist" className={FIELD} />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="blog-content" className={LABEL}>Content</label>
                <textarea
                  id="blog-content"
                  data-testid="blog-content-input"
                  required
                  minLength={50}
                  rows={12}
                  value={form.content}
                  onChange={set("content")}
                  placeholder={"Write the article here. Separate paragraphs with a blank line.\nUse '## ' for a heading and '- ' for list items."}
                  className={`${FIELD} resize-y font-mono text-[13px] leading-relaxed`}
                />
              </div>
              <button
                type="submit"
                disabled={saving || !key}
                data-testid="blog-submit-button"
                className="inline-flex items-center gap-2 rounded-lg bg-[#FF5A36] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#FF3E14] disabled:opacity-50"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
                {form.id ? "Save changes" : "Publish article"}
              </button>
              {error && <p data-testid="blog-error" className="text-sm text-[#FF5A36]">{error}</p>}
              {notice && <p data-testid="blog-success" className="text-sm text-emerald-400">{notice}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
