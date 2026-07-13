## Redesign the industries section: synced list + card carousel

Reference: your uploaded image (list on the left where the active item is expanded, single big card on the right with an image, arrows + dots). Applies to the industries strip on `/hero-preview` (`IndustriesStrip` in `src/routes/hero-preview.tsx`).

### Layout

Two-column section, single viewport, no big empty pad.

```text
+------------------------------------------------------------+
|  Feel the Zapla difference                                 |
|                                                            |
|  +---------------------+  +-----------------------------+  |
|  | Real Estate         |  |  [ 3D character image ]     |  |
|  |  Streamline listi.. |  |                             |  |
|  |                     |  |  Real Estate                |  |
|  | + Trades & Services |  |  Streamline listings, aut.. |  |
|  | + Medical & Health  |  |                             |  |
|  | + Legal & Accounting|  |  <  o o o o o o o o o o o > |  |
|  | + ...9 more         |  +-----------------------------+  |
|  +---------------------+                                   |
+------------------------------------------------------------+
```

- Left: vertical list of all 12 industries. Active row is a rounded white card with title + one-line description. Other rows are compact pill rows with `+` and industry name, matching your reference styling.
- Right: one large rounded card. Contains the 3D character image, the industry name overlaid as a small pill, and the one-liner below. Chevron arrows on the sides and dot indicators at the bottom.
- Both sides driven by one `activeIndex` state. Any change (auto-cycle, click a list row, click an arrow, click a dot) updates both simultaneously and crossfades.

### Motion

- Auto-advance every 4s, pauses on hover of either column.
- Left list: active row grows to show description; previous active shrinks back to a pill. ~250ms ease.
- Right card: image + text crossfade to the next industry (~300ms). No slide, no flip — a soft crossfade so it feels like the same card morphing.
- Thin progress bar under the active list row, resets on each advance.

### Imagery — 3D character illustrations (your pick)

12 stylized 3D-rendered characters, one per industry, all sharing one art style so they read as a set:

- Consistent style prompt: soft studio lighting, matte plastic/clay finish, subtle rim light, transparent or off-white background, waist-up 3/4 view, expressive but not cartoony. Same lens, same lighting, same background across all 12.
- Each character holds or is near one small prop that signals the industry (e.g. Real Estate → house key; Medical → stethoscope; Legal → folder; Home Services → wrench; Beauty → hair dryer; Fitness → dumbbell; Retail → shopping bag; Automotive → wrench + car key; Hospitality → coffee cup; Education → book; Creative → tablet; Finance → laptop).
- Generated via `imagegen--generate_image` (standard quality, transparent background PNG, ~1024x1024). Saved to `src/assets/industry-<slug>.png` then uploaded as `.asset.json` pointers so they're served from the CDN.
- Loading is lazy: only the active image and its two neighbours are preloaded to keep the section light.

If any single render doesn't match the set, I'll re-run just that one until the 12 feel like siblings, not strangers.

### What gets removed

- The current large spotlight card + tall right-hand list from the last pass.
- The old tooltip/hover-expand chip strip is already gone; nothing else in the file changes.

### Out of scope

- Hero, blob tabs, integration ring, footer, copy elsewhere — not touched.
- No new routes, no data model, no backend.
- Font sizes and heading style stay as they are now.

### Technical notes

- `IndustriesStrip` in `src/routes/hero-preview.tsx` becomes a two-column component with `activeIndex` state, `useEffect` interval for auto-cycle, hover-pause, and a `crossfade` CSS class driven by a keyed inner `<div>` per side.
- 12 image pointers imported at the top of the file the same way `zaplaIcon` is imported now.
- Verify with a Playwright screenshot at 1280 desktop and 390 mobile before finishing. On mobile the two columns stack: card on top, list below (list becomes horizontal-scroll pills, active one expanded).
