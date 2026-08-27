# Rebuild "Where revenue leaks" as a single cinematic beat

Scope: only `src/components/concept/ZaplaRevenueLeakageV6.tsx` (used by the V5 continuation). No copy, footage, layout or motion changes anywhere else on the page.

## What's wrong today

The section is currently three unrelated things fighting in one sticky frame: a giant beige clock number pinned top-right, a floating enquiry card that slides left and blurs, and four uppercase status lines that flash in the same bottom-left slot. Nothing shares space or identity, the type scale is near-identical in every layer, and the payoff ("Booked elsewhere") drops in as an unrelated full-screen slab. That mix of oversized numerals plus flashing micro-labels plus blur is what reads as generic AI motion.

## The new story: one enquiry, losing its heat

One object on stage the whole time: Sarah's enquiry. Time acts on it. The viewer watches the same card go from live to cold to lost, then the consequence is stated on the same spot the card occupied.

Beat structure inside the existing sticky frame (same section height, same handoff to the dark AI section):

1. Still opening (unchanged copy). Holds, lifts away.
2. The enquiry becomes the hero object: centered, large, warm paper, a thin live indicator, timestamp 10:14. It does not fly in; it is already composed.
3. Time pressure arrives as one persistent element instead of five flashing numerals: a single monospaced clock that *counts* through the day, locked to the card's own header, plus a hairline "heat" bar under the card that drains from full to empty as the day passes. Card temperature drops with it: paper desaturates, the live dot stops pulsing, the shadow flattens, a faint layer of dust/veil settles. Same object, changing state.
4. The waiting beats appear as short lines that stack *inside* the card as quiet system notes, not as separate flashing labels in a corner, so evidence accumulates instead of blinking.
5. Loss: the card's heat bar reaches zero, the card tilts a few degrees and drops slightly out of the light, and the text "Booked elsewhere." is set on the same axis as the card, replacing it rather than covering it. One hold of ~1.4s.
6. Consequence line and the existing red-to-dark handoff into the next section stay as they are, retimed to the new beats.

## Motion grammar

- Scroll-scrubbed, as now, so the user controls the pace; all easing stays restrained.
- Single dominant transform per beat; overlaps 150-250ms.
- Continuous properties (clock digits, heat bar, card temperature) rather than opacity crossfades between many layers, which is what removes the slop feel.
- Remove: the 31vw beige clock numerals, the blur filter on the card, the four stacked absolute status lines, the -180px slide.
- Reduced motion: card renders in its final cold state with the loss line and consequence visible, no scrub.

## Technical notes

- Rewrite the component body only; keep the exported name, the section height (`310vh` / `330vh`), the `#F2EEE7` to `#070A0D` canvas transition and the cyan hairline + gradient handoff so the seam into `ZaplaAISectionV6` is byte-identical in behaviour.
- Clock counting uses `useTransform` on `scrollYProgress` into a minute value, formatted through `useMotionValueEvent` into a state string (or `motion.span` with a derived MotionValue), no timers.
- Keep the existing `DISPLAY` font stack and the current palette tokens; no new colours, gradients or glows.
- Desktop and 390px mobile compositions both verified; no horizontal overflow.
