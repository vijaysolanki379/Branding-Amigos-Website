import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { apiGet } from "@/lib/api";
import type { PostSummary } from "@/lib/site";
import { Reveal, SectionHead } from "./Reveal";

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function InsightsPreview() {
  const { data, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiGet<PostSummary[]>("/posts"),
    retry: 1,
  });

  if (isError || !data || data.length === 0) return null;
  const posts = data.slice(0, 3);

  return (
    <section id="insights" data-testid="insights-section" className="bg-[#F5F5F7] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            index="09"
            label="INSIGHTS"
            title={<>SEO Insights &amp; <em className="italic text-[#3535D6]">Growth Notes</em></>}
            sub="Practical, honest writing on search, visibility, and digital growth — the same thinking we apply to client work."
          />
          <Reveal delay={0.1}>
            <a
              href="/insights"
              data-testid="insights-view-all"
              className="group inline-flex shrink-0 items-center gap-2 rounded-md border border-[#0A0D2C]/15 px-6 py-3 text-sm font-semibold text-[#0A0D2C] transition-colors hover:border-[#3535D6] hover:text-[#3535D6]"
            >
              View all insights
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <a
                href={`/insights/${post.slug}`}
                data-testid={`insight-card-${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-8 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-[#3535D6]/40 hover:shadow-[0_24px_48px_-24px_rgba(16,19,74,0.25)]"
              >
                {post.cover && (
                  <img
                    src={post.cover}
                    alt={`Abstract cover artwork for: ${post.title}`}
                    width="1536"
                    height="1024"
                    loading="lazy"
                    className="-mx-8 -mt-8 mb-6 h-44 w-[calc(100%+4rem)] max-w-none object-cover"
                  />
                )}
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-full bg-[#EAEBEE] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#475569]">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-5 font-heading text-2xl leading-snug tracking-tight text-[#0A0D2C] transition-colors group-hover:text-[#3535D6]">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#475569]">{post.excerpt}</p>
                <p className="mt-6 flex items-center justify-between border-t border-[#E2E8F0] pt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-[#94A3B8]">
                  {formatPostDate(post.published_at)}
                  <ArrowUpRight className="h-4 w-4 text-[#3535D6] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
