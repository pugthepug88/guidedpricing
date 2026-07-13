# Tighten the difference section + rework industries

Goal: cut scroll length and repetition without losing the brand feel. Two focused changes, nothing else touched.

## 1. Tighten the 4 colored blobs (the "difference" section)

Current: 4 full-viewport colored blobs stacked, one idea per blob, feels dragged out.

Change to a single compact section with 4 tabs (pills) that swap content in place:

- One section, ~one viewport tall instead of four.
- Row of 4 color pills at the top: Green / Orange / Purple / Blue, using the existing highlight colors already in the code.
- Clicking a pill swaps the blob color, the highlighted phrase ("comes first", "fall in love", "difference", "integration"), and the blob's contents in place.
- Blue pill keeps the integration ring of logos we just finished.
- Other three pills keep only the blob shape + the colored highlight phrase (headings, subheadings and CTAs already removed per your earlier request).
- Auto-cycles every 5s with a subtle progress bar under the active pill; pauses on hover; clicking a pill takes over.
- Motion: color and content crossfade (~250ms) so the blob feels like it's morphing between moods, not slideshow-jumping.
- Mobile: pills wrap or become a horizontal scroll strip; blob scales down; same crossfade.

Result: same 4 ideas, same brand language, ~75% less scroll.

## 2. Rework the 12-card industries grid (zarc-2024)

Current: 12 flip cards, each with a heading, a category tag, and a filler line ("automate reminders, manage medical records..."). Reads as one idea 12 times.

Change to a compact, skimmable industries strip:

- Single row (desktop) / 2-row wrap (mobile) of small industry chips: icon + industry name only. No category tag, no description line.
- 12 industries, all visible at once, styled like small pill/tiles matching the site's rounded-square brand shape.
- On hover (desktop) / tap (mobile), the chip expands inline to reveal the one-liner ("Streamline listings, automate follow-ups..."). Only one expanded at a time.
- Optional: a single sentence above the strip like "Built for the industries we actually serve." (final copy from you — no double dashes, no em dashes, per project rule).
- Removes the flip-card animation entirely. Flip cards are the reason the section feels heavy; the content itself is thin.

Result: 12 industries fit in roughly the height of 2 of the current flip cards. Skimmable, still complete.

## Out of scope for this pass

- Hero, platform slider, AI section, integration blob internals, footer, CTA copy — not touched.
- Fonts, brand colors, logo assets — not touched.
- No new sections added (proof section and full IA pass can be a follow-up if you want after seeing these two land).

## Technical notes

- Difference section lives in `src/routes/hero-preview.tsx` in `BlobSections`. Refactor to a single `<DifferenceTabs />` component holding `activePill` state, with the 4 panel bodies as a lookup keyed by pill id. Reuse existing highlight color tokens and the `IntegrationLogos` component verbatim for the blue panel.
- Industries grid (`#zarc-2024`) — locate the current component, replace the flip-card markup and CSS with a chip strip. Keep the 12 industry entries and their one-liners as data; render icon + name always, description on expand. Remove the `.zarc-card` / flip-related CSS.
- Both changes stay in presentation code. No data model, no routing, no backend changes.
- Verify with a Playwright screenshot at desktop (1280) and mobile (390) before finishing.
