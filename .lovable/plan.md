
# Hero rebuild — restore the OS story, match zapla.io exactly

## What's wrong today
- Headline was softened to "…from one system" — loses the category-owning "AI operating system" framing that pulled buyers in from the homepage.
- Manrope 900 at hero size reads blocky/condensed; zapla.io hero feels lighter, more open, with tighter tracking and more line-height air.
- The dashboard mock is abstract KPIs — doesn't prove anything and doesn't feel like a continuation of the homepage's product-forward hero.

## What changes

### 1. Headline — restored + typeset like the homepage
Copy returns to verbatim:

> **Run your whole business from one AI operating system.**

Gradient (cyan → blue → violet → magenta, existing `zapla-gradient-shimmer` utility) applies only to **"AI operating system"** — single emphasized phrase, matching the zapla.io pattern of one gradient span per headline.

Type treatment tuned to match the live site:
- Weight **700** (not 900), size clamp `clamp(2.75rem, 6vw, 5.25rem)`, `line-height: 1.05`, `letter-spacing: -0.035em`.
- Max width ~14ch so it breaks into 3 balanced lines on desktop.
- Eyebrow pill above: `SIMPLE, TRANSPARENT PRICING` in blue on a soft blue chip — mirrors zapla.io/pricing exactly.

### 2. Subhead + CTA row — homepage rhythm
- One-line subhead in `--color-zapla-muted`, ~18px, max-width ~52ch.
- Primary CTA: blue pill "Book a Call" (`bg-zapla-blue`, white text, `shadow-zapla-blue`, hover lift).
- Secondary: ghost "See pricing" that smooth-scrolls to the pricing section.
- Trust row below: 3 green-check items ("Unlimited users · One flat price · Launched with you").

### 3. Right column — replace generic dashboard with a product-feel moment
A layered "live OS" composition instead of abstract KPI tiles:
- Soft blue/violet glow orbs behind (existing `zapla-orb-drift` utility) — same visual language as zapla.io hero.
- Foreground: a single tilted white "app window" card with a realistic Zapla-flavored surface — left rail with 4 module icons (Inbox, CRM, Bookings, Payments), main area showing a mini pipeline (3 deal cards) with one card animating in every few seconds.
- A small floating "AI" chip in the corner that pulses gently, tying back to "AI operating system."
- One live-counting metric badge overlaid ("A$12,480 collected this week") using the existing `useCountUp` hook — kept to ONE animated number, not four, so it feels intentional not busy.

### 4. Type system correction (site-wide, small)
- Load Manrope weights 400/500/600/700/800 only — drop 900.
- Reduce global headline `letter-spacing` from `-0.045em` to `-0.035em`.
- Body copy set to Manrope 500 at 16px, muted color for secondary text — matches zapla.io.

### 5. Motion
- Single hero entrance: eyebrow → headline (word-by-word 40ms stagger via existing `zapla-rise`) → subhead → CTAs → dashboard card (300ms delayed fade+rise).
- Gradient span uses the existing `zapla-gradient-shimmer` (slow 8s loop) — already in styles.
- Orbs drift on the existing 16s/24s loops.
- No new animation libs, no scroll-jacking.

## Files touched
- `src/routes/index.tsx` — Hero section only (headline copy, type classes, right-column composition, trust row). Rest of page untouched.
- `src/styles.css` — small tokens: adjust display letter-spacing, register a hero-headline utility.
- `src/routes/__root.tsx` — Manrope weight list (drop 900).

## Out of scope this pass
- Pricing card hierarchy, customer proof section, ROI calculator — you flagged Hero as the biggest lift; those come next if you want.
- No copy changes anywhere except restoring the hero headline.
- No new dependencies.
