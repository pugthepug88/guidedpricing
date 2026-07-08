
# Zapla Pricing Page — Redesign & Restructure

Goal: take your v7 draft content and turn it into a premium, compact, story-driven pricing page that keeps the "AI operating system" hero framing, adds a monday.com-style customer proof section, and flows the buyer toward "Book a Call".

## New page flow (top → bottom)

```text
1. Hero                      OS framing, redesigned (dashboard mock elevated)
2. Guided Launch strip       Mapped / Configured / Rolled out (tightened)
3. Pricing (4 plans)         Redesigned cards + inline compare drawer
4. ROI calculator            Moved up — reinforces price with value
5. Launch Pack deep-dive     Journey + scope cards + expandable details
6. Customers achieve more    NEW — monday.com-style cards, placeholder imagery
7. Platform pillars          What's inside Zapla
8. Add-ons & usage           Compact
9. Why Zapla (value grid)    Kept, tightened
10. FAQ                      Two-column
11. Final CTA                Simplified, single primary action
```

Rationale: calculator right after pricing lets buyers justify the number while it's fresh. Customer proof lands after they've seen price + value, so social proof closes doubt instead of introducing it.

## Hero (redesign, same framing)

- Keep H1 "Run your whole business from one AI operating system."
- Left column: eyebrow, H1, lead, dual CTA, proof pills — same content, refined type scale and rhythm.
- Right column: replace the flat dark card with a layered "live OS" mock — soft ambient gradient behind, a subtle glass panel with the 4 KPI tiles, a small animated pulse on "Live system", and the Capture → Manage → Get paid → Grow flow rendered as a connected pill row instead of a grid of squares.
- Background: keep the existing radial blue/green wash but push it further (softer, wider) so it reads premium instead of "template gradient".
- Sticky nav gets a slight compact treatment on scroll.

## Pricing cards

- 4 equal cards, Growth still "Recommended" with the lift and blue ring.
- Cleaner hierarchy: plan name → one-line fit → price block (price, /mo, +GST) → Launch Pack line as a distinct chip, not inline text → feature list → CTA pinned to bottom.
- "Everything in X" rendered as a visual chevron badge at the top of the list so buyers instantly see the stack.
- Inline compare drawer kept, styled to match.

## ROI calculator

Same inputs and math, restyled: inputs left, dark result panel right, with a clear "You save ~A$X/mo" and a secondary "Payback in ~X weeks" line. Adds a small "Assumes…" disclosure to keep it honest.

## Launch Pack section

- Kept as the anchor of "why Guided Launch is worth it".
- Journey row becomes a numbered horizontal timeline (Discover → Configure → Rollout → Check-ins).
- Scope cards restyled with subtle iconography.
- Expandable scope details kept.

## Customers achieve more (NEW)

Modeled on your monday.com reference, adapted to your reality:

- Section header left, "See all stories" ghost link right.
- Horizontal scroll / 3-up card row on desktop, swipe on mobile.
- Each card:
  - Industry tag pill (Trades, Beauty, Auto, Fitness, etc.)
  - Large metric ("38%", "5x", "A$12k") + short label
  - One-line quote + attributed role
  - Image area on the right side of the card — I'll use tasteful placeholder imagery (soft-toned scene shots, industry-appropriate) with a clear "swap later" pattern so you can drop real client photos/quotes in without touching layout.
- Dot pagination + arrow controls like the reference.

## Platform pillars, add-ons, value grid, FAQ, final CTA

Same content, tightened spacing, consistent card system, unified radii and shadows. Final CTA becomes a single centered block with one primary action ("Book a Call") and a soft secondary ("See pricing" scrolls back up), removing decision fatigue at the bottom.

## Visual system

- Type: keep Inter, but tighten the scale — display sizes use `-0.045em` tracking, body 16.5px, cards 14.5px. One display weight (900), one body weight (500/750).
- Color: keep your blue `#1769ff` / green `#18c5a7` / ink `#071426`. Introduce one warm accent (amber `#ffb547`) reserved for metrics and highlights in the customer cards — nothing else.
- Surfaces: two paper tones (`#ffffff`, `#f9fbff`), one line color, two shadow depths. Kill one-off shadows.
- Motion: single hero entrance (fade + 8px rise, staggered), hover lift on cards (translateY -2px, shadow deepen). No scroll-jacking.

## Technical section

- The draft is a single self-contained HTML file. I'll port it into the TanStack Start project as a new route `src/routes/pricing.tsx` (plus small components under `src/components/pricing/`), moving all styles from the inline `<style>` block to Tailwind v4 utilities + a few semantic tokens added to `src/styles.css` (brand blue/green/ink/amber, radii, shadow variables).
- Head metadata set via TanStack `head()`: real title + description + og tags (no og:image unless you provide one).
- Interactive bits (compare drawer, FAQ, scope details, calculator, customer carousel) become small React components using `useState`, not `<details>` — cleaner styling, same behavior.
- Placeholder customer imagery generated with the image tool and stored under `src/assets/` with clear filenames so they're easy to swap.
- No backend, no data model changes — pure frontend/presentation.

## Out of scope

- No real customer names, photos, quotes, or metrics — everything in the customers section is clearly placeholder until you send real assets.
- No changes to `zapla.io/getstartedtrial` link targets or tracking attributes.
- No pricing/copy changes beyond micro-edits for hierarchy.
