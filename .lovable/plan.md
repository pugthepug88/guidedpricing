# New isolated page: rebuilt "Where revenue leaks" beat

Nothing on `/concept/cinematic-follow-through-v5` or `/` changes. The redesign lands on a brand-new route so it can be judged side by side.

New route: `/concept/revenue-leaks-v7`
New component: `src/components/concept/ZaplaRevenueLeakageV7.tsx` (a copy-forward of V6's structure, then rebuilt). `ZaplaRevenueLeakageV6.tsx` is left byte-identical.

The page renders the section alone on the same off-white canvas, with a short dark block after it so the existing cyan-hairline handoff can still be evaluated in context. `noindex` metadata, not linked from nav.

## What's wrong with the current section

Three unrelated things fight inside one sticky frame: a 31vw beige clock numeral pinned top-right, a floating enquiry card that slides left and blurs, and four uppercase status lines flashing in the same bottom-left slot. Nothing shares space or identity, the type scale is near-identical across layers, and the payoff drops in as an unrelated full-screen slab. That combination of oversized numerals plus flashing micro-labels plus blur is what reads as generic.

## The new story: one enquiry, losing its heat

One object holds the stage the whole time: Sarah's enquiry. Time acts on it. The viewer watches the same card go from live to cold to lost, then the consequence is stated on the axis the card occupied.

Beats inside a sticky frame:

1. Still opening statement (same copy as V6). Holds, then lifts away.
2. The enquiry becomes the hero object: centered, large, warm paper, thin live indicator, timestamp 10:14. Already composed on the first frame, no fly-in.
3. Time pressure arrives as one persistent element instead of five flashing numerals: a single clock that counts through the working day, locked to the card's own header, plus a hairline heat bar under the card draining from full to empty. The card's temperature drops with it: paper desaturates, the live dot stops pulsing, the shadow flattens, a faint veil settles. Same object, changing state.
4. Waiting beats stack *inside* the card as quiet system notes, so evidence accumulates instead of blinking in a corner.
5. Loss: the heat bar reaches zero, the card tilts a few degrees and drops out of the light, and "Booked elsewhere." is set on the card's axis, replacing it rather than covering it. ~1.4s hold.
6. Consequence line, then the cyan hairline and dark gradient handoff, retimed to the new beats.

## Motion grammar

- Scroll-scrubbed so the user controls the pace; restrained easing throughout.
- One dominant transform per beat, overlaps 150-250ms.
- Continuous properties (clock digits, heat bar, card temperature) instead of opacity crossfades between many layers.
- Gone: the 31vw numerals, the blur filter, the four absolute status lines, the -180px slide.
- Reduced motion: card renders in its final cold state with the loss line and consequence visible, no scrub.

## Technical notes

- `src/routes/concept/revenue-leaks-v7.tsx` with `createFileRoute("/concept/revenue-leaks-v7")`, own `head()` (title, description, og:title, og:description, og:type, twitter:card, robots noindex).
- Section height, `#F2EEE7` to `#070A0D` canvas transition, cyan hairline and gradient handoff all carried over from V6 so the seam behaves identically.
- Clock counting via `useTransform` on `scrollYProgress` into a minute value formatted through a derived MotionValue, no timers.
- Existing `DISPLAY` font stack and palette only; no new colours, gradients or glows.
- Verified at 1440x900 and 390x844, no horizontal overflow.

Once you approve the look on this page, promoting it into V5 is a one-line swap.
