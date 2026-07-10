# Customer results section — rebuild with 8 cards + carousel

## What changes
Replace the current "customers achieve more" section in `src/routes/index.tsx` with a new **Businesses recover more** section built to your spec. Everything else on the page stays untouched.

## New section structure

**Header row** (grid, responsive)
- Left: eyebrow pill `CUSTOMER RESULTS`, headline *"Businesses recover more from the leads and customers they already have"*, subhead as provided.
- Right (top-right on desktop, below headline on mobile): `Get started` button — rounded pill with blue → violet gradient (`from-zapla-blue via-zapla-violet to-zapla-magenta`), soft blue shadow.

**Carousel**
- Desktop: 3 cards visible, snap-scroll horizontally.
- Mobile: 1 card visible, snap per card.
- Left/right arrow buttons (circular white, soft shadow, blue icon) positioned at the sides of the track.
- Pagination dots below (8 dots, active dot wider + gradient fill). Dots reflect the current "page" (ceil(index / perView)).
- Implementation: lightweight custom carousel using a scroll container + `scrollBy` on arrow click and an `IntersectionObserver` (or scroll listener) to update the active dot. No new dependency.

**Card design** (white, rounded-3xl, `shadow-zapla`, hover lift)
1. Image at top (rounded top corners, 16:10 ratio, `object-cover`).
2. Industry tag pill overlaid top-left on the image — small uppercase, white/blur background, blue text.
3. Business name pill overlaid top-right on the image — small, white background, ink text.
4. Body padding (p-6):
   - Large metric in `zapla-gradient-text` (text-5xl, weight 800).
   - Result label directly under (ink, weight 600, text-base).
   - Quote (muted, italic-off, text-sm, ~4 lines max).
   - Divider hairline.
   - Professional title (muted2, text-xs, uppercase tracking).

**Footer note under carousel**
- Centered, muted, text-xs: *"Illustrative examples — real case studies coming soon."*

## Content
All 8 cards use the exact copy you provided (industry tag, business pill, metric, label, quote, title).

## Images
Generate 8 photo assets matching the image direction for each card. Style guide for consistency:
- Natural lighting, shallow depth of field, real environment (no obvious stock look).
- Muted cool color grade to sit against the lavender-white canvas.
- 1200×750 JPG, saved to `src/assets/customer-*.jpg` and referenced as static imports.

## Motion
- Section reveals with existing `useReveal` hook (fade + rise).
- Cards inside the visible track fade/rise on first mount with a small stagger.
- Arrow buttons and dots have hover/active transitions only — no auto-play.

## Files touched
- `src/routes/index.tsx` — replace existing customer proof section only.
- `src/assets/` — 8 new generated images (via imagegen).
- No style token changes needed; uses existing `zapla-blue`, `zapla-violet`, `zapla-gradient-text`, `shadow-zapla`, etc.

## Out of scope
- No changes to hero, pricing, ROI, FAQ, or any other section.
- No new dependencies (no embla/swiper) — native scroll-snap carousel.
