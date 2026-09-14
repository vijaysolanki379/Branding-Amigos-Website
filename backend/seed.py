import asyncio
import re
import uuid
from datetime import datetime, timezone

from lib.db import db, ensure_indexes

POSTS = [
    {
        "title": "How Long Does SEO Take? An Honest Answer for Local Businesses",
        "excerpt": "Every business asks it. Here's a straightforward breakdown of what affects SEO timelines — and what you can realistically expect in the first six months.",
        "tags": ["SEO Strategy", "Local SEO"],
        "author": "Branding Amigos",
        "content": """Every business owner we speak to asks the same question sooner or later: how long until SEO actually works? Here is an honest answer — no hype, no hedging.

## The short answer

For most local and small business websites, early movement shows up within four to twelve weeks, and meaningful growth in traffic and enquiries typically takes three to six months. Competitive industries and brand-new websites take longer. Well-established sites in quieter niches can move faster.

Anyone who promises you page-one rankings in thirty days is selling you something you do not want to buy.

## What actually affects your timeline

- Your starting point: a technically healthy site with some existing authority moves faster than a new domain.
- Your market: ranking a dentist in Ahmedabad is a very different challenge from ranking a national software company.
- Your competition: if the businesses above you have invested in SEO for years, catching up takes sustained effort.
- Your resources: SEO compounds when content, technical fixes, and authority building happen consistently, not in bursts.

## What progress looks like in months one to six

The first month is usually foundations: audits, technical fixes, keyword and competitor research, and a prioritised roadmap. Months two and three bring on-page improvements, Google Business Profile optimisation for local businesses, and the first new content. From months three to six, rankings begin to move, impressions grow in Search Console, and the first organic enquiries arrive.

## How to speed things up legitimately

You cannot cheat the compounding curve, but you can remove friction: fix technical issues early, publish genuinely useful content consistently, earn relevant links, and make sure your website converts the traffic it already gets. A faster, clearer website makes every month of SEO work harder.

## The bottom line

SEO is not a switch — it is an asset you build. Done properly, it becomes one of the most cost-effective sources of leads a business can have. If you want an honest assessment of your website's situation, request a free consultation and we will tell you what we would expect in your market.""",
    },
    {
        "title": "Technical SEO Basics: 7 Checks Every Business Website Should Pass",
        "excerpt": "Before content and links, your website needs a solid technical foundation. These seven checks catch the issues that most often hold business websites back.",
        "tags": ["Technical SEO"],
        "author": "Branding Amigos",
        "content": """Before you spend anything on content or links, your website needs a solid technical foundation. These seven checks catch the problems that most often hold business websites back in search.

## 1. Your pages can be found and indexed

If Google cannot index a page, nothing else matters. Check that your important pages return a 200 status, are not blocked by robots.txt, and do not carry a stray noindex tag. The Pages report in Google Search Console is the fastest place to spot problems.

## 2. The site works properly on mobile

Google indexes the mobile version of your site first. Buttons should be tappable, text readable without zooming, and layouts stable on small screens. Test your key pages on an actual phone, not just a resized browser window.

## 3. Pages load quickly

Slow pages lose rankings and customers. Core Web Vitals — loading, interactivity, and visual stability — are the benchmark. Compress images, remove unused scripts, and choose hosting that responds quickly for your audience's location.

## 4. Everything runs on HTTPS

An unsecured site shows warnings that scare visitors and weaken trust. Every page, image, and script should load over HTTPS, with the non-secure versions redirecting cleanly.

## 5. Every important page has a unique title and description

Titles and meta descriptions are your shop window in search results. Each important page should have a unique, descriptive title, and a description that gives people a genuine reason to click.

## 6. Your business information is structured

Structured data helps search engines understand who you are: your business name, address, phone number, opening hours, and services. For local businesses, this supports visibility in map results and rich listings.

## 7. Links and sitemaps are healthy

Broken internal links waste crawl budget and frustrate visitors. Submit an XML sitemap in Search Console, keep it clean, and make sure your important pages are reachable within a few clicks from the homepage.

## Where to start

Run through these checks in order — the earlier items can block the later ones. If you would rather have a professional set of eyes on it, our SEO audit covers all of this and more, with a prioritised action plan you can act on immediately.""",
    },
    {
        "title": "Local SEO Checklist: How Small Businesses Get Found on Google",
        "excerpt": "Most local customers start with a search. This practical checklist covers the essentials that help small businesses show up — and get chosen — in local results.",
        "tags": ["Local SEO"],
        "author": "Branding Amigos",
        "cover": "https://static.prod-images.emergentagent.com/jobs/e5a87417-a519-4731-9f95-319a1f87e2b8/images/0dfabac0214f0efc42568aefe96590eb6835a6be80c292032229bf076be370e0.jpeg",
        "meta_title": "Local SEO Checklist for Small Businesses | Branding Amigos",
        "meta_description": "A practical local SEO checklist: Google Business Profile, citations, reviews, and local pages — the essentials that help small businesses get found on Google.",
        "focus_keyword": "local seo checklist",
        "content": """When someone nearby searches for what you sell, your business either shows up or it does not. Local SEO is the work that decides which. This checklist covers the essentials, in the order we tackle them for clients.

## 1. Claim and complete your Google Business Profile

Your Google Business Profile is often the first thing a local customer sees — before your website. Claim it, verify it, and complete every field: categories, services, opening hours, photos, and a clear description of what you do. Keep it updated; an active profile outperforms a neglected one.

## 2. Keep your name, address, and phone number consistent

Search engines cross-check your business details across directories, maps, and your own website. If your phone number or address differs from place to place, trust erodes. Pick one format and use it everywhere — website footer, contact page, and every listing.

## 3. Earn reviews and respond to them

Reviews influence both rankings and decisions. Ask happy customers for honest reviews, make it easy with a direct link, and respond to every review — including the difficult ones. Never buy reviews; the short-term gain is not worth the long-term risk.

## 4. Build pages for the areas you serve

If you serve multiple locations, a single generic contact page will not rank for all of them. Create a genuinely useful page for each area: what you offer there, local proof, directions, and frequently asked questions. Thin, copy-pasted location pages do more harm than good.

## 5. Publish content that answers local questions

People search for answers before they search for providers. Guides, pricing explainers, and how-to articles tied to your area build visibility and trust at the same time — and give other local sites a reason to link to you.

## 6. Measure what matters

Track calls, direction requests, and enquiries from your Business Profile, plus organic traffic to your local pages. Rankings are a signal, not the goal — the goal is customers walking through your door.

If you would like this checklist applied to your business, request a free consultation and we will review your local visibility together.""",
    },
    {
        "title": "Content That Ranks: How to Plan SEO Content Without Guesswork",
        "excerpt": "Publishing more content is not a strategy. Here's how to choose topics with real search demand and turn them into pages that attract qualified visitors.",
        "tags": ["Content Strategy"],
        "author": "Branding Amigos",
        "cover": "https://res.cloudinary.com/nufnhl9h/image/upload/v1789397006/branding-amigos/migrated/blog-content-strategy.jpg",
        "meta_title": "How to Plan SEO Content That Ranks | Branding Amigos",
        "meta_description": "Stop guessing what to write. Learn how to plan SEO content around real search demand, intent, and topical authority — so every page earns its place.",
        "focus_keyword": "seo content strategy",
        "content": """Most business blogs fail quietly. Not because the writing is bad, but because the topics were chosen by guesswork. Here is the process we use to plan content that actually earns search traffic.

## Start from demand, not ideas

A topic you find interesting and a topic people search for are two different things. Before anything is written, check that real people are searching for it: look at search volumes, autocomplete suggestions, and the questions customers already ask you. No demand means no traffic, no matter how good the article is.

## Map the intent behind each search

Two people typing similar phrases can want completely different things. Someone searching "what is technical SEO" wants to learn; someone searching "technical SEO audit services" wants to hire. Match your page to the intent — educational content for learners, service pages for buyers — or you will rank for neither.

## Build clusters, not isolated posts

One article on a topic is a visitor; ten connected articles are an authority. Choose a small number of core topics close to your services, then cover them thoroughly: a main guide supported by focused articles that link to each other. Search engines reward this depth, and readers stay longer.

## Write from a brief, not a blank page

Every piece should start with a short brief: the target search, the intent, the questions to answer, and the related pages to link to. Briefs keep content focused on what searchers need rather than what the writer feels like saying.

## Refresh before you publish something new

Updating an existing page that already has some visibility is often the fastest win in SEO. Review your older content every few months: update facts, strengthen weak sections, and improve titles. A refreshed page can outrank a brand-new one in weeks.

The common thread is simple: decide with evidence, publish with purpose, and improve what you already have. If you want a content plan built for your business, request a free consultation and we will map the opportunities together.""",
    },
]


def slugify(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")


COVERS = {
    "how-long-does-seo-take-an-honest-answer-for-local-businesses": "https://res.cloudinary.com/nufnhl9h/image/upload/v1789396993/branding-amigos/migrated/blog-seo-timeline.jpg",
    "technical-seo-basics-7-checks-every-business-website-should-pass": "https://res.cloudinary.com/nufnhl9h/image/upload/v1789396997/branding-amigos/migrated/blog-technical-seo.jpg",
    "local-seo-checklist-how-small-businesses-get-found-on-google": "https://res.cloudinary.com/nufnhl9h/image/upload/v1789397002/branding-amigos/migrated/blog-local-seo.jpg",
    "content-that-ranks-how-to-plan-seo-content-without-guesswork": "https://res.cloudinary.com/nufnhl9h/image/upload/v1789397006/branding-amigos/migrated/blog-content-strategy.jpg",
}


async def main() -> None:
    for post in POSTS:
        slug = slugify(post["title"])
        cover = COVERS.get(slug)
        existing = await db.posts.find_one({"slug": slug})
        if existing:
            if cover and not existing.get("cover"):
                await db.posts.update_one({"slug": slug}, {"$set": {"cover": cover}})
                print(f"cover set: {slug}")
            else:
                print(f"exists: {slug}")
            continue
        doc = {
            "id": str(uuid.uuid4()),
            "slug": slug,
            "cover": cover,
            "published_at": datetime.now(timezone.utc),
            **post,
        }
        await db.posts.insert_one(doc)
        print(f"created: {slug}")
    from lib.sitemap import regenerate_sitemap
    await regenerate_sitemap()
    await ensure_indexes()


if __name__ == "__main__":
    asyncio.run(main())
