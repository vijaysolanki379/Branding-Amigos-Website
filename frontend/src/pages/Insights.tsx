import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { apiGet } from "@/lib/api";
import type { PostSummary } from "@/lib/site";
import { PageShell } from "@/components/landing/PageShell";
import { formatPostDate } from "@/components/landing/InsightsPreview";

export default function Insights() {
  useEffect(() => {
    const prev = document.title;
    document.title = "SEO Insights | Branding Amigos";
    return () => {
      document.title = prev;
    };
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiGet<PostSummary[]>("/posts"),
    retry: 1,
  });

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-[#8B93B8]">
          <span className="text-[#FF5A36]">[</span> <span className="text-[#475569]">INSIGHTS</span> <span className="text-[#FF5A36]">]</span>
        </p>
        <h1 className="mt-5 max-w-3xl font-heading text-4xl leading-[1.1] tracking-tight text-[#0A0D2C] sm:text-5xl">
          SEO Insights &amp; <em className="italic text-[#3535D6]">Growth Notes</em>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#475569] sm:text-lg">
          Practical, honest writing on search, visibility, and digital growth — the same thinking we apply to client work.
        </p>

        {isLoading && <p className="mt-16 text-sm text-[#475569]">Loading articles…</p>}
        {isError && (
          <p data-testid="insights-error" className="mt-16 text-sm text-[#475569]">
            Articles can't be loaded right now. Please check back soon.
          </p>
        )}
        {data && data.length === 0 && <p className="mt-16 text-sm text-[#475569]">No articles published yet — check back soon.</p>}

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(data ?? []).map((post) => (
            <Link
              key={post.id}
              to={`/insights/${post.slug}`}
              data-testid={`insights-list-card-${post.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-8 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-[#3535D6]/40 hover:shadow-[0_24px_48px_-24px_rgba(16,19,74,0.25)]"
            >
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="rounded-full bg-[#EAEBEE] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#475569]">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-5 font-heading text-2xl leading-snug tracking-tight text-[#0A0D2C] transition-colors group-hover:text-[#3535D6]">
                {post.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#475569]">{post.excerpt}</p>
              <p className="mt-6 flex items-center justify-between border-t border-[#E2E8F0] pt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-[#94A3B8]">
                {formatPostDate(post.published_at)}
                <ArrowUpRight className="h-4 w-4 text-[#3535D6]" aria-hidden />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
