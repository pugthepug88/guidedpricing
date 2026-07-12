
# Pricing Page V2 — Side-by-Side Comparison

Create a new route `/pricing-v2` that clones the current pricing page and applies all 5 proposed improvements. The existing `/` page stays untouched so you can flip between the two URLs and compare.

## New route

- `src/routes/pricing-v2.tsx` — duplicates the current index composition, then diverges section-by-section with the changes below.
- Reuses existing section components where unchanged; new/variant sections live in `src/components/pricing-v2/` so nothing on the live page is disturbed.

## Changes applied in V2

1. **Hero redesign**
   - Two-column hero: headline + trust bar (star rating, user count, "Backed by…" logos) on the left; a product/OS dashboard mock on the right.
   - Keep the "16 tools · one AI operating system" line but demoted to a supporting eyebrow.
   - Move the 3D funnel out of hero — it stays as the pillars section anchor.

2. **Human-centric social proof (Monday-style)**
   - Replace current testimonial strip with large portrait cards: big human photo, name, role, company logo, one-line result metric, quote.
   - Horizontal scroll on mobile, 3-up grid on desktop.
   - Placeholder portraits generated as assets (or Unsplash-style neutral portraits) — you can swap in real customer photos later.

3. **Pricing table polish**
   - Standard tiers keep current card style but tightened spacing + clearer "Most popular" ribbon.
   - **Scale+** gets a distinct dark "Enterprise" card treatment (different background, "Talk to sales" CTA, no price — "Custom").
   - Comparison table below with sticky header, zebra rows, category grouping.

4. **Visual rhythm**
   - Soften the red "messy stack" copy to a muted coral/orange.
   - Alternate section backgrounds (white → soft tint → white) so sections feel distinct instead of one long scroll.
   - Add subtle section dividers/eyebrows.

5. **Conversion**
   - Sticky bottom CTA bar on mobile ("Start free trial · Talk to sales").
   - Trust badges row under hero and above final CTA (stars, review count, security/compliance marks if applicable).

## Out of scope

- No content/copy rewrites beyond the "messy stack" color softening.
- No changes to `/` (current page).
- No new backend, no auth, no data model changes.
- Real customer photos — placeholders only; you swap them in later.

## How to compare

- Current: `/`
- New: `/pricing-v2`

After you review, tell me which sections to promote back to `/` (or keep both and A/B).
