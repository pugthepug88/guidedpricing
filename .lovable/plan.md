## Why the page feels slow

The first viewport is light (text + tiny SVGs). Below the fold the page pulls:

- **1.04 MB PNG** funnel (`zapla-funnel-16-apps-final.png`) — 10× larger than it needs to be.
- **1.40 MB** stale PNG (`zapla-funnel-16-apps.png`) sitting in `src/assets/` — not imported by index but still bundled/uploaded on some flows and clutter.
- 8 customer photos (~80 KB each) — already `loading="lazy"`, fine.
- `motion/react` scroll animations across a long page — cheap individually, but they hydrate/attach as you scroll.

Also: the Lovable preview iframe is materially slower than the published site. Some of the "slag" will disappear the moment you publish.

## Fix — preview-safe, no visual change

1. **Swap the funnel back to the approved v3 render** already in the repo: use `src/assets/pillar-option-a-funnel.jpg` (102 KB) instead of `zapla-funnel-16-apps-final.png` (1.04 MB) in `src/routes/index.tsx`. Same image direction you already approved, ~10× lighter.
2. **Delete the unused heavy PNGs** so they don't ship: `src/assets/zapla-funnel-16-apps.png` and `src/assets/zapla-funnel-16-apps-final.png`.
3. **Add `decoding="async"`** to the funnel `<img>` and the customer card `<img>`s so decode doesn't block the main thread.
4. **Preload the hero-adjacent LCP image** (funnel) via the route's `head().links` with `rel="preload" as="image"` so it starts fetching earlier.
5. **Keep `motion/react`, but gate the heaviest scroll listeners** to `once: true` where the animation only plays in on first reveal (already the pattern for `Reveal`; verify no `useScroll`/`useTransform` is left running on the pillars section — that section is static now).

## What I won't touch

- Copy, layout, section order, colors, fonts.
- The customer carousel (already lazy, fine).
- The v3 funnel image itself — no regeneration.

## Expected result

Page weight drops by ~2.3 MB. Scroll below the fold should feel roughly as snappy as the hero. Remaining slowness after this will be preview-iframe overhead only, and the published site will be noticeably faster.
