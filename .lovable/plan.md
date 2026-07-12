# Fix the funnel image — 2 issues only

## Scope (strict)
Only fix these two things on `src/assets/zapla-funnel-16-apps-final.png`. Nothing else on the page changes.

1. **Restore the 3D look on all 16 icon tiles** — chunky rounded-square tiles with real depth, soft drop shadow, subtle top highlight, slight per-tile rotation. Match the visual weight of the originally approved render.
2. **Replace the bottom Zapla logo** with the new white-L-on-blue version from `user-uploads://zapla_logo_-_linkedIn_profile_picture-2.png` (currently it's the old black-Z version).

## How (deterministic, no AI generation)

Rewrite the compositor script (`make_funnel_final.py`) to produce ONE image, in one pass:

- **Base:** clean glass funnel from `src/assets/pillar-funnel-render.png` desaturated to clear glass (proven working from v5), OR keep current base if funnel silhouette is already good — decide by visual check first, not by rebuilding.
- **Icon tiles (16, real logos):** for each brand, render a **3D tile**:
  - 148px rounded square (radius 32), brand background color
  - Real logo PNG from `/tmp/funnel-fix/googlelogos/` centered at ~65% tile size
  - Top inner highlight (white 25% alpha gradient, top third)
  - Bottom inner shade (black 15% alpha, bottom third)
  - Drop shadow: 3px offset, 12px gaussian blur, black 45%
  - Per-tile rotation: −12° to +12° randomized but seeded (reproducible)
- **Layout:** keep the exact 16 tile positions from the current approved composition (top cluster + interior). No new positions.
- **Zapla logo:** composite the attached white-L logo at the bottom drop position (same coords as current), scaled to match.
- **Output:** 1024×1126 transparent PNG → write once to `src/assets/zapla-funnel-16-apps-final.png`.

## Guardrails
- One render, one visual check, one file write. If it's not right, I fix the script and re-render — I do NOT try a different approach.
- No changes to `src/routes/index.tsx`.
- No changes to funnel silhouette, page layout, colors, or anything else.
- If after 2 render attempts the 3D quality still isn't there, I stop and ask you rather than burning more credits.

## Deliverable
Updated `src/assets/zapla-funnel-16-apps-final.png` — same 16 brands, same positions, but with proper 3D tiles and the correct white-L Zapla logo at the bottom.
