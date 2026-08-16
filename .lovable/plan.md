# Contacts campaign card: brighter, more colourful (receipt stack only)

Keep the receipt-stack card. Layout, copy, card size, gradient keyline and timing stay as they are. Only the icon tile, the SENT button and the row ticks change, plus a small restrained colour accent.

## SENT button

- Becomes a solid, bright green button (vivid green fill, white bold text) instead of a pale mint pill with a tick.
- Remove the tick entirely. Text only, reading "Sent".
- Larger, confident button proportions with a soft green-tinted shadow beneath, so it reads as the payoff at hero scale.
- Motion: springs in with a slight scale and settles, no tick animation.

## Row ticks

- The four contact ticks become solid bright green circles with a white tick inside (currently pale mint with a green glyph).
- Each pops in with a short spring on the existing per-row stagger, so the receipt still fills top to bottom.

## SMS tile and avatars

- SMS tile gets a blue to cyan gradient fill with a faint inner top highlight and a soft blue-tinted shadow, so it looks like a raised app tile rather than a flat square.
- Avatars gain a crisp white ring plus a light outer ring so the faces separate cleanly from the white card.

## Small colour accent

- A few tiny multi-colour confetti dots (blue, cyan, violet, amber, green) scatter briefly around the SENT button as it lands, then fade. Restrained, roughly 6 to 8 dots, no bursts or streamers.

## Cleanup

- Remove the `launch` and `counter` variants from `src/components/v5/campaign-cards.tsx`.
- Remove the `campaignVariant` state, the picker pills and the prop plumbing from `src/routes/hero-preview-v5.tsx` and `src/components/v5/scenes-a.tsx`.
- Card hold stays at 2000ms; no other phase durations change.

## Files touched

- `src/components/v5/campaign-cards.tsx`
- `src/components/v5/scenes-a.tsx` (prop removal only)
- `src/routes/hero-preview-v5.tsx` (picker removal only)

No other scenes, the homepage, v4 or pricing are touched.
