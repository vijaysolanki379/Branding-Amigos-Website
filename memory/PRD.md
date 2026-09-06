# PRD — Branding Amigos Agency Website

## Original problem statement
Build a modern, premium, high-converting single-page website for "Branding Amigos", an SEO & digital marketing agency. Premium dark navy + electric blue identity built around the official uploaded logo (white editorial serif + coral script accent). Alternating dark/light section rhythm, editorial serif display type, conversion-focused CTAs, honest content rules (no fabricated results/testimonials/stats), full SEO metadata + JSON-LD, accessible, responsive, fast. Award-level craft: masked line-by-line hero reveal, lenis smooth scroll, framer-motion (motion) reveals, editorial marquee, subtle 3D/parallax hero visual.

## User personas
- Local business owner (Ahmedabad / India) looking for more leads via Google.
- B2B/e-commerce marketing lead evaluating a serious SEO partner.
- Agency owner (the user) who needs an easy way to review enquiries and swap in real case studies/testimonials later.

## Core requirements (static)
- Sticky compacting header, official logo, nav: Home/Services/About/Process/Results/Contact + coral CTA, mobile hamburger.
- Hero: "Turn Search Visibility Into Business Growth", dual CTAs, credibility line, custom abstract SEO-growth visual.
- 8 services, 4 why-us blocks, 5-step process, results metric placeholders (no fake stats), about, 3 placeholder case studies, testimonial placeholder, 8-question FAQ accordion, contact form + real contact details, premium footer with social placeholders.
- SEO: title/meta/OG/canonical, Organization + WebSite + FAQPage JSON-LD, one H1, descriptive alt text.
- Contact form → FastAPI + MongoDB + (optional) Resend notification; admin view of enquiries.

## Architecture
- Frontend: Vite + React 19 + TS, Tailwind v4, motion (framer), lenis. Pages: `/` (Home), `/admin` (enquiries). Components in `frontend/src/components/landing/`.
- Backend: FastAPI `backend/server.py` — `POST /api/contact` (validate + store + optional Resend email), `GET /api/contact` (X-Admin-Key protected).
- DB: MongoDB `inquiries` collection (uuid string ids, UTC datetimes).
- Assets: official logo `/public/branding-amigos-logo.png` (+ cropped mark variant + favicon); generated abstract visuals for Why-Us/About.

## Implemented (2026-07)
- Full landing page with all 12 sections, alternating dark/light rhythm, Playfair Display + DM Sans + JetBrains Mono, palette #05061A/#10134A/#2927A8/#3535D6/#FF5A36.
- Masked line-by-line hero reveal, animated SVG growth chart with floating chips, mouse-tilt + scroll parallax, slow editorial marquee, scroll reveals, reduced-motion support.
- Services bento grid with Learn-More deliverables dialogs; process timeline; honest results/case-study/testimonial placeholders.
- Contact form with validation, service checkboxes, budget select, Sonner toasts; stores enquiries; admin page with key-protected list.
- Real business details pulled from brandingamigos.com (email, phone, Ahmedabad address, hours).
- SEO head: title, meta description, canonical, OG/Twitter, Organization/WebSite/FAQPage JSON-LD.

## Verified
- curl: POST /api/contact → 201 + stored; invalid body → 422; GET without key → 401; with key → 200 list.
- `yarn typecheck` clean.
- Browser pass (public URL, desktop + 390px mobile): hero, services dialog, FAQ accordion, form submit + success toast, mobile menu, 0px horizontal overflow.

## Known gaps / not active
- Resend email notifications: the code is fully wired (POST /api/contact sends an HTML notification to brandingamigos@gmail.com via `asyncio.to_thread` when RESEND_API_KEY exists) but no key is present in the pod environment yet — enquiries are stored, email is skipped (logged). Auto-activates when the managed key lands in backend/.env; no code change needed.
- Social links are `#` placeholders by design.
- Case studies/testimonials/metrics are honest placeholders awaiting real client data.

## Implemented (2026-09)
- Email alerts: Resend notification path implemented per playbook (SENDER_EMAIL=onboarding@resend.dev, NOTIFY_EMAIL in .env, reply_to = enquirer). Pending platform key.
- Legal pages: /privacy and /terms with real business details and an explicit "no guaranteed rankings" clause; footer links now real routes.
- Insights blog: posts collection, GET /api/posts + /api/posts/{slug} (public), POST /api/posts (admin-key); /insights list + /insights/:slug article pages with per-article title/meta/BlogPosting JSON-LD; homepage Insights preview section (index 09, contact renumbered 10); 2 seeded original articles; Admin page now has tabs (Enquiries + Publish article form).
- Header/footer links work across subpages (hrefFor prefix + on-load hash scroll on Home); header is solid dark on all subpages so the transparent logo stays visible.

## Implemented (2026-09, batch 5)
- Services replaced with the real 9-service lineup (Social Media Marketing, AI SEO, Meta Ads, Google Ads, Web Design, Content Marketing, AI Influencer Marketing, WhatsApp Business Automation, AI Agents & Automation) — updated in services grid, contact form checkboxes, footer list, FAQ answer 2 + FAQPage JSON-LD. Learn More dialogs carry per-service deliverables.
- Google Search Console verification token live in index.html head.
- Site codes manager: settings collection, GET /api/settings (public) + PUT /api/settings (admin key). /admin/codes page with head/body code textareas (GTM script, noscript, schema JSON-LD, pixels). App.tsx useSiteCodes injects saved codes on every page (scripts re-created so they execute; meta/link/style handled from parsed head). Admin navigation is now shared tabs (Enquiries / Blog manager / Site codes) across all three admin pages.
- Article sharing: LinkedIn + X web-intent share buttons and a copy-link button on every article page (share URL uses the canonical brandingamigos.com domain).
- Newsletter: POST /api/newsletter (idempotent, lowercases emails, 422 on invalid) + GET /api/newsletter (admin key). Dark "SEO insights, straight to your inbox" signup card under the homepage insights grid with success state + toast; subscriber list shown in /admin under enquiries.
- Google Search Console: commented verification meta-tag placeholder in index.html head — user must paste their token from search.google.com/search-console (HTML tag method) and uncomment. Verification happens against the live domain, so do it at/after launch.
- Results and Case Studies sections removed from the homepage (components kept on disk for future re-add); "Results" removed from nav; section numbering re-sequenced 01–08.
- Dedicated blog manager at /admin/blog: list/edit/publish articles with SEO parameters (meta title 60-char guide, meta description 160-char guide, focus keyword). Backend: PostUpdate model + PUT /api/posts/{id} (slug stays stable on edit). InsightPost applies meta_title/meta_description/focus_keyword (keywords meta) when set. Old ArticlePublisher component removed; /admin now links to the blog manager.
- Real social URLs live in footer (LinkedIn /company/branding-amigos, Instagram, Facebook, X/Twitter — new tab, noopener).
- Dual emails on form submit: admin notification to brandingamigos@gmail.com + branded confirmation email to the enquirer (reply_to set both ways). Still gated on RESEND_API_KEY — not present in pod env; auto-activates when the managed key lands.
- 2 more articles seeded with covers + SEO params (Local SEO Checklist, Content That Ranks) — 4 total, homepage grid shows 3.
- Logo background made transparent (background-estimation alpha matte, artwork untouched): /public/branding-amigos-logo-transparent.png + branding-amigos-logo-mark.png (used in header/footer/mobile). Script: scripts/make_logo_transparent.py.
- Article covers: `cover` field on posts, generated abstract brand covers on both seeded articles, shown on homepage cards, /insights cards, and article hero; per-article og:image + BlogPosting image set for social shares; optional cover URL field in the admin publish form.
- Enquiry status tracking: PATCH /api/contact/{id} (admin-key, status: new/contacted/closed) + status badge and "Mark as" buttons on each enquiry in /admin.
- SEO crawl: backend/lib/sitemap.py generates /frontend/public/sitemap.xml (regenerated on every publish and seed run); robots.txt in public/ (note: Cloudflare ingress prepends its own managed content signals; our rules follow).

## Backlog
- P0: Activate Resend notifications (add RESEND_API_KEY).
- P1: Replace case-study/testimonial placeholders with real, permissioned client data; add real social URLs.
- P1: Privacy Policy / Terms of Service pages.
- P2: Blog/insights section for SEO; per-service detail pages; sitemap.xml + robots.txt; Google Business Profile link; analytics (GA4).
- P2: Admin page polish (auth session, status updates on enquiries).
