# Contacts campaign card: icon polish (receipt stack only)

Keep the receipt-stack card. Drop the other two variants and the preview picker. Only the icon-level details change: the SMS tile, the four row ticks, and the SENT block. Layout, copy, card size, gradient keyline and timing stay exactly as they are.

## What changes

**SMS tile (top left)**
- Blue to cyan gradient fill instead of flat blue, with a faint white inner top highlight and a soft blue-tinted shadow beneath, so it reads as a raised app tile.
- Glyph gets slightly heavier stroke so it stays crisp at hero scale.

**Contact rows**
- Each avatar keeps its face but gains a cleaner 2px white ring plus a light slate outer ring, so faces separate from the white card.
- The tick badge becomes a filled emerald circle with a white tick (instead of pale mint with green tick) and pops in per row with a short spring, keeping the existing stagger.
- Slightly more row height and a hairline divider rhythm so the 2x2 grid feels deliberate rather than cramped.

**SENT block**
- Emerald pill stays, but the tick moves into a small filled emerald circle and scales in just before the word SENT settles.
- Marginally larger, tighter letter-spacing so it stays the clear focal point.

## Cleanup

- Remove the `launch` and `counter` variants from `src/components/v5/campaign-cards.tsx`.
- Remove the `campaignVariant` state, the picker pills and the prop plumbing from `src/routes/hero-preview-v5.tsx` and `src/components/v5/scenes-a.tsx`.
- Card hold stays at 2000ms; no other phase durations change.

## Files touched

- `src/components/v5/campaign-cards.tsx`
- `src/components/v5/scenes-a.tsx` (prop removal only)
- `src/routes/hero-preview-v5.tsx` (picker removal only)

No other scenes, the homepage, v4 or pricing are touched.
