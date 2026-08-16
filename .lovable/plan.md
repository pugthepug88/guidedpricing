# Sent card: rotating gradient border

Make the coloured keyline around the campaign "Sent" card sweep continuously around its edge, like a light travelling clockwise around the frame, instead of sitting still.

## What changes

- The card's 2px outer frame becomes an animated conic gradient (Zapla blue to cyan to violet, with a soft trailing falloff) that rotates a full turn roughly every 3 seconds, easing linearly so it never stutters.
- The base static gradient stays underneath, so at any instant the border still reads as the Zapla blue/cyan/violet keyline; the rotation just adds a brighter travelling highlight sweeping around it.
- Inner white card, layout, copy, icon tile, Sent button, confetti, row ticks and all timings stay exactly as they are.
- With prefers-reduced-motion (the existing `reduced` flag), the border stays static as today, no rotation.

## Technical notes

- In `src/components/v5/campaign-cards.tsx`, the outer `motion.div` (the `p-[2px]` frame) gets a rotating conic-gradient layer: an absolutely positioned, `overflow-hidden`, rounded child spinning via `motion` `rotate: 360` with `repeat: Infinity`, `ease: "linear"`, sized larger than the card (about 150% square, centred) so the cone always covers the corners. The white inner panel sits above it, so only the 2px rim shows the sweep.
- Keep the existing `KEYLINE` linear gradient as the frame background beneath the rotating layer.
- Animation only mounts when `reduced` is false.

Only `src/components/v5/campaign-cards.tsx` is touched.
