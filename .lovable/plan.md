
# Replicate zapla.io homepage inside this project

## Scope (locked from your answers)
- Source of truth: **HTML + assets ZIP you upload**
- Hosting: **Lovable** (zapla.lovable.app or your custom domain later)
- Blog: not now — homepage only
- Route: new page at **`/home-v2`** so your current `/` (the pricing page work) stays untouched until you're happy to swap

## What you upload
A ZIP containing:
1. The homepage `.html` file (View Source → Save, or GHL export)
2. Any linked CSS files
3. The `/images/` (or equivalent) folder with all photos, icons, logos
4. Any fonts if self-hosted (otherwise I'll load them via Google Fonts `<link>`)

Upload it to this chat when you're ready. If you can't get a clean export from GHL, I can fetch zapla.io live as a fallback — just say so.

## How I'll rebuild it

1. **Extract & inventory** — unzip, list every section, image, font, and interactive element (sliders, accordions, forms, hover states, animations).
2. **Create the route** — `src/routes/home-v2.tsx` (won't affect `/`).
3. **Port structure section-by-section** — hero → features → social proof → CTA → footer, matching your HTML's DOM order and copy verbatim.
4. **Port styling** — convert your CSS to Tailwind utilities where clean, keep raw CSS in a scoped stylesheet where it's complex (gradients, keyframes). Fonts loaded via `<link>` in `__root.tsx` head.
5. **Migrate images to CDN** — every image goes through Lovable Assets (CDN-hosted, fast, no repo bloat) using the migrate-to-assets skill.
6. **Rebuild interactions in React** — any GHL JS widgets (carousels, accordions, forms) rewritten as clean React components.
7. **Responsive check** — verify mobile/tablet/desktop match your live site.
8. **SEO metadata** — port your existing `<title>`, meta description, OG tags into the route's `head()`.
9. **Visual QA via Playwright** — screenshot my rebuild side-by-side with a screenshot of zapla.io, iterate until they match.

## What I need clarified before uploading

- **Forms**: any contact/lead form on the homepage — should submissions go to your existing GHL webhook, an email, or Lovable Cloud? (Can decide after seeing the HTML.)
- **Booking widget**: is the "Book a call" embed a GHL iframe or a Calendly-style script? I'll preserve whichever it is.

## Deliverable
A `/home-v2` route that visually and functionally matches zapla.io, using your original images/fonts/copy, hosted on Lovable's edge CDN. When you're happy, we swap `/home-v2` → `/` in one edit.

## Next step
Upload the ZIP in your next message.
