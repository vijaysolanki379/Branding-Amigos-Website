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
- Header/footer links work across subpages (hrefFor prefix + on-load hash scroll on Home).

## Backlog
- P0: Activate Resend notifications (add RESEND_API_KEY).
- P1: Replace case-study/testimonial placeholders with real, permissioned client data; add real social URLs.
- P1: Privacy Policy / Terms of Service pages.
- P2: Blog/insights section for SEO; per-service detail pages; sitemap.xml + robots.txt; Google Business Profile link; analytics (GA4).
- P2: Admin page polish (auth session, status updates on enquiries).
