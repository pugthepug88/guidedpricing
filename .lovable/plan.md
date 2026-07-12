## What's wrong with the current Pillars section

Scrolling through it top-to-bottom:

1. **It's a 900px-tall scroll stage** (`h-[820px] sm:h-[900px]`) with 24-32 units of vertical padding on top of that — the whole section is ~1,200px tall. On a pricing page that's absurd; it dominates like a hero.
2. **I ignored the image you already approved.** `src/assets/pillar-option-a-funnel.jpg` — the v3 Option A render you picked — is sitting in the repo, already featuring the funnel + icons + Zapla drop baked in. Instead of using it, I re-imported a separate transparent `funnel-body.png` and rebuilt the whole scene with 16 favicon chips + motion transforms + a separate Zapla logo layer. That's why it never matches the image you liked — it's a re-creation, not the render.
3. **The favicon chips look cheap.** `google/s2/favicons` returns low-res 64px favicons wrapped in white pills. The v3 render has photoreal 3D app icons. No amount of animation fixes that gap.
4. **Two competing focal points.** The scroll animation asks the eye to track 16 falling chips *and* watch the Zapla drop *and* read the heading. On a pricing page the viewer just wants: "16 tools → 1 Zapla, got it, show me the price."
5. **Redundant elements below.** Savings pills + two CTAs after the scene stretch it further, when the pricing table is literally the next section.

## The plan — use the render, cut it in half

**Replace the whole `Pillars()` scroll stage with the v3 Option A image, static.**

Concretely, in `src/routes/index.tsx` `Pillars()`:

- Delete the icon cloud layer, funnel body layer, Zapla drop layer, all `useScroll` / `useTransform` / `spawns` / `tools` arrays.
- Drop the `funnel-body.png` and `zaplaLogo3d` imports for this section. Import `pillar-option-a-funnel.jpg` instead.
- Replace with a single centered `<img>` of the v3 render, ~460–520px wide, with a subtle blue glow behind it and one gentle `Reveal` fade-in on scroll (no scroll-linked transforms).
- Shrink section padding: `py-24 sm:py-32` → `py-14 sm:py-20`.
- Keep the heading ("Pour your stack in. Get Zapla out.") and the two savings pills — those earn their place.
- Remove the two CTAs at the bottom (pricing table is right underneath).

**Expected height:** ~600px total instead of ~1,200px. Roughly half.

**Nothing else on the page changes.**
