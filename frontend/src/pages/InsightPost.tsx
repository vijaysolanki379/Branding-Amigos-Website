import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { apiGet } from "@/lib/api";
import type { InsightPost as InsightPostType } from "@/lib/site";
import { PageShell } from "@/components/landing/PageShell";
import { formatPostDate } from "@/components/landing/InsightsPreview";
import { ShareButtons } from "@/components/landing/ShareButtons";

function renderContent(content: string) {
  return content.split(/\n\n+/).map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-12 font-heading text-3xl tracking-tight text-[#0A0D2C]">
          {block.slice(3)}
        </h2>
      );
    }
    if (block.startsWith("- ")) {
      return (
        <ul key={i} className="mt-6 space-y-3">
          {block.split("\n").map((line, j) => (
            <li key={j} className="flex items-start gap-3 text-base leading-relaxed text-[#475569]">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#FF5A36]" />
              {line.replace(/^- /, "")}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="mt-6 text-base leading-relaxed text-[#475569] sm:text-lg">
        {block}
      </p>
    );
  });
}

export default function InsightPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => apiGet<InsightPostType>(`/posts/${slug}`),
    retry: 1,
  });

  useEffect(() => {
    if (!post) return;
    const prevTitle = document.title;
    document.title = post.meta_title || `${post.title} | Branding Amigos`;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? null;
    meta?.setAttribute("content", post.meta_description || post.excerpt);
    const ogImage = document.querySelector('meta[property="og:image"]');
    const prevOg = ogImage?.getAttribute("content") ?? null;
    if (post.cover && ogImage) ogImage.setAttribute("content", post.cover);
    let keywords: HTMLMetaElement | null = null;
    if (post.focus_keyword) {
      keywords = document.createElement("meta");
      keywords.name = "keywords";
      keywords.content = post.focus_keyword;
      document.head.appendChild(keywords);
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.meta_description || post.excerpt,
      datePublished: post.published_at,
      ...(post.cover ? { image: post.cover } : {}),
      author: { "@type": "Organization", name: post.author },
      publisher: { "@type": "Organization", name: "Branding Amigos", url: "https://brandingamigos.com/" },
    });
    document.head.appendChild(script);
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc) meta.setAttribute("content", prevDesc);
      if (ogImage && prevOg) ogImage.setAttribute("content", prevOg);
      if (keywords) keywords.remove();
      script.remove();
    };
  }, [post]);

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link to="/insights" data-testid="post-back-link" className="inline-flex items-center gap-2 text-sm text-[#475569] transition-colors hover:text-[#3535D6]">
          <ArrowLeft className="h-4 w-4" aria-hidden /> All insights
        </Link>

        {isLoading && <p className="mt-12 text-sm text-[#475569]">Loading article…</p>}
        {isError && (
          <div data-testid="post-not-found" className="mt-12">
            <h1 className="font-heading text-4xl text-[#0A0D2C]">Article not found</h1>
            <p className="mt-4 text-base text-[#475569]">This article may have been moved or is temporarily unavailable.</p>
          </div>
        )}

        {post && (
          <>
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-[#EAEBEE] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#475569]">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-6 font-heading text-4xl leading-[1.12] tracking-tight text-[#0A0D2C] sm:text-5xl">{post.title}</h1>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">
              {post.author} <span className="text-[#FF5A36]">•</span> {formatPostDate(post.published_at)}
            </p>
            <ShareButtons title={post.title} slug={post.slug} />
            {post.cover && (
              <img
                src={post.cover}
                alt={`Abstract cover artwork for the article: ${post.title}`}
                width="1536"
                height="1024"
                loading="lazy"
                data-testid="post-cover"
                className="mt-10 w-full rounded-2xl object-cover"
              />
            )}
            <div data-testid="post-content" className="mt-4">{renderContent(post.content)}</div>

            <div className="mt-16 rounded-2xl bg-[#05061A] p-8 sm:p-10">
              <h2 className="font-heading text-2xl tracking-tight text-white">Want this applied to your website?</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#A7AEC9]">
                Tell us about your business and goals — we'll review your site and recommend the right strategy.
              </p>
              <a
                href="/#contact"
                data-testid="post-cta"
                className="group mt-6 inline-flex items-center gap-2 rounded-md bg-[#FF5A36] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#FF3E14]"
              >
                Get a Free SEO Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </div>
          </>
        )}
      </article>
    </PageShell>
  );
}
