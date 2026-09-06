import logging
from datetime import datetime
from pathlib import Path
from xml.sax.saxutils import escape

from lib.db import db

logger = logging.getLogger("branding-amigos")

BASE_URL = "https://brandingamigos.com"
OUTPUT = Path(__file__).resolve().parents[2] / "frontend" / "public" / "sitemap.xml"

SERVICE_SLUGS = [
    "social-media-marketing",
    "ai-seo",
    "meta-ads",
    "google-ads",
    "web-design",
    "content-marketing",
    "ai-influencer-marketing",
    "whatsapp-automation",
    "ai-agents-automation",
]

STATIC_ROUTES = [
    ("/", "1.0"),
    ("/insights", "0.8"),
    ("/privacy", "0.3"),
    ("/terms", "0.3"),
    *[(f"/services/{s}", "0.8") for s in SERVICE_SLUGS],
]


async def regenerate_sitemap() -> None:
    docs = await db.posts.find({}, {"_id": 0, "slug": 1, "published_at": 1}).sort("published_at", -1).to_list(500)
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for route, priority in STATIC_ROUTES:
        lines.append(f"  <url><loc>{BASE_URL}{route}</loc><priority>{priority}</priority></url>")
    for doc in docs:
        lastmod = ""
        ts = doc.get("published_at")
        if isinstance(ts, datetime):
            lastmod = f"<lastmod>{ts.date().isoformat()}</lastmod>"
        lines.append(f"  <url><loc>{BASE_URL}/insights/{escape(doc['slug'])}</loc>{lastmod}<priority>0.7</priority></url>")
    lines.append("</urlset>")
    OUTPUT.write_text("\n".join(lines) + "\n")
    logger.info("Sitemap regenerated with %d post URLs", len(docs))
