# Modern Zapla demo pointer

Replace the faceted navy arrow in the Contacts scene with a softer, more modern demonstration pointer. All targeting logic stays the same: it still anchors to the real Filter, Apply filter, Send SMS campaign and Send to 4 contacts controls via element bounds, still remeasures on resize, still only appears while explaining an interaction, and still stays hidden under reduced motion.

## New pointer design

- Rounded teardrop/pointer silhouette with smoothly curved edges instead of the sharp faceted arrow, about 30px, tilted naturally.
- Fill is a soft vertical gradient from Zapla blue into a restrained violet, so it reads as branded rather than an OS cursor.
- Crisp white keyline around the whole shape so it stays legible on white table rows, coloured pills and the dark tile.
- Two-layer shadow: a tight contact shadow plus a wide soft one, giving it a lifted, dimensional feel.
- A very faint blue halo sits directly under the tip, replacing the hard offset accent edge.

## Motion

- Travel between controls keeps the current spring, with a slight lean into the direction of movement that settles when it arrives.
- On click: a short compress and tilt, plus a single thin blue ring that expands from the tip and fades once, so the click reads clearly without leaving a permanent target ring.
- Entry and exit fade with a small scale, unchanged in timing.

## Technical notes

- Changes are confined to the `ArrowCursor` component in `src/components/v5/scenes-a.tsx`: new SVG path and fills, added click ripple element, lean transform driven by the existing spring position. Ref-based measurement, phase mapping and all other scene beats are untouched.

No other scene, route, or shared file is modified.
