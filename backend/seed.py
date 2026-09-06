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
]


def slugify(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")


async def main() -> None:
    for post in POSTS:
        slug = slugify(post["title"])
        if await db.posts.find_one({"slug": slug}):
            print(f"exists: {slug}")
            continue
        doc = {"id": str(uuid.uuid4()), "slug": slug, "published_at": datetime.now(timezone.utc), **post}
        await db.posts.insert_one(doc)
        print(f"created: {slug}")
    await ensure_indexes()


if __name__ == "__main__":
    asyncio.run(main())
