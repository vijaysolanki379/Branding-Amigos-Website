import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Loader2, Send } from "lucide-react";

const FIELD =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#5B6280] transition-colors focus:border-[#FF5A36]/60 focus:outline-none focus:ring-2 focus:ring-[#FF5A36]/25";
const LABEL = "mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#9AA2BC]";

export function ArticlePublisher({ adminKey }: { adminKey: string }) {
  const [form, setForm] = useState({ title: "", excerpt: "", tags: "", content: "" });
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState<{ slug: string; title: string } | null>(null);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPublishing(true);
    setError("");
    setPublished(null);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Key": adminKey },
        body: JSON.stringify({
          title: form.title,
          excerpt: form.excerpt,
          content: form.content,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const post = (await res.json()) as { slug: string; title: string };
      setPublished(post);
      setForm({ title: "", excerpt: "", tags: "", content: "" });
    } catch {
      setError("Could not publish. Check your admin key and that all fields are filled in.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <form onSubmit={onSubmit} data-testid="publish-form" className="mt-8 max-w-2xl space-y-5">
      <div>
        <label htmlFor="post-title" className={LABEL}>Title</label>
        <input id="post-title" data-testid="post-title-input" required minLength={4} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Article title" className={FIELD} />
      </div>
      <div>
        <label htmlFor="post-excerpt" className={LABEL}>Excerpt</label>
        <input id="post-excerpt" data-testid="post-excerpt-input" required minLength={10} value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} placeholder="One or two sentences shown in article cards" className={FIELD} />
      </div>
      <div>
        <label htmlFor="post-tags" className={LABEL}>Tags (comma separated)</label>
        <input id="post-tags" data-testid="post-tags-input" value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} placeholder="SEO Strategy, Local SEO" className={FIELD} />
      </div>
      <div>
        <label htmlFor="post-content" className={LABEL}>Content</label>
        <textarea
          id="post-content"
          data-testid="post-content-input"
          required
          minLength={50}
          rows={12}
          value={form.content}
          onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          placeholder={"Write the article here. Separate paragraphs with a blank line.\nUse '## ' for a heading and '- ' for list items."}
          className={`${FIELD} resize-y font-mono text-[13px] leading-relaxed`}
        />
      </div>
      <button
        type="submit"
        disabled={publishing || !adminKey}
        data-testid="publish-submit-button"
        className="inline-flex items-center gap-2 rounded-lg bg-[#FF5A36] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#FF3E14] disabled:opacity-50"
      >
        {publishing ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
        Publish article
      </button>
      {error && <p data-testid="publish-error" className="text-sm text-[#FF5A36]">{error}</p>}
      {published && (
        <p data-testid="publish-success" className="text-sm text-emerald-400">
          Published:{" "}
          <Link to={`/insights/${published.slug}`} className="underline underline-offset-4 hover:text-emerald-300">
            {published.title}
          </Link>
        </p>
      )}
    </form>
  );
}
