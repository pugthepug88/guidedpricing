# Follow-through family — separate V2 review pages

29 October 2026, Australia/Sydney.

## Scope and preservation

The approved A treatment lives on separate `/follow-up-v2` and `/quote-follow-up-v2` review routes. The original Follow-Up and Quote Follow-Up pages, shared navigation, header and footer defaults remain unchanged. V2 routes retain noindex/nofollow, sitemap exclusion and no global-menu entry.

Quote V2 opts into `QuoteFollowJourney`'s `pageTrack` prop, suppressing its older internal guide so one shared `FollowThroughTrack` owns the page. The original page retains the default guide. Desktop V2 alone uses the existing footer film's right crop to favor the foreground course at left; mobile and original pages keep the centered camera. This is an offscreen editorial handoff, not a literal collision or synchronized video seam. The film itself is unchanged.

## Page family and product story

The broader page owns “You lead. Zapla follows through.” Quote Follow-Up is a focused child proof point, linked with a return breadcrumb. Both use warm paper, ink typography and controls, the native blue mark, pearl product records, a local ink scene and warm human photography. Final CTAs retain the canonical `ZaplaPetal size={34}` inside the 52px ink circle.

- Broad page: enquiry → configured automatic SMS with booking link → Emma explicitly books → confirmation/reminder → quote check-in → optional later reconnect. Reconnect remains a separate agreed workflow, not an inevitable repeat sale.
- Quote page: Quote Sent → chosen wait and SMS/email → customer question → Alex reviews scope and replies. No automatic acceptance, revised quote or task creation is implied.
- The people supply judgment and skilled work; configured product messages supply follow-through. Native event/wait/channel building blocks demonstrate configuration, not measured delivery or conversion results. No fabricated metrics or testimonials were added.
- Messaging/usage and separately priced required Guided Launch remain visible. Supported-tool compatibility, audience, reply handling and exit behavior are agreed before setup. Capability references remain `AUTOMATION-BUILDER-EVIDENCE.md`, `CALENDARS-BOOKING-AUTOMATIONS-20261027.md` and the earlier quote audit.

## A — from the follow-up

The origin is a native flat 64px Zapla mark at the hero product edge, visible before scrolling: at the broad page's lower-right shoulder and the quote page's lower-left shoulder. The ordinary 32px sender marks remain static inside both product interfaces. Four bridge pieces taper through 48px, 34px, 24px and 20px, visible at rest alongside the pale regular course. Scrolling adds shallow rounded depth, lifts and tips the flat origin, then carries contact down the taper. The larger origin supplies a clear starting point while leaving product copy readable.

`followThroughGeometry.ts` uses the native logo corner ratio `142.2 / 508` for the complete projected object: front perimeter, rear plane, continuous extrusion and shadow. Curved SVG paths replace square rear/side polygons. The face transform does not reverse the white mark through the edge-on moment. Front, rear and depth therefore share the same rounded silhouette rather than placing a rounded face on a square body.

Every regular course piece retains the same geometry on both pages: 20px width basis, upright vector `(4, −13)`, 28px fall and 24px pitch. All regular pieces expose size `1`; only the 64px flat origin and four contact bridges differ in size. Both pages use the same taper sizes and regular geometry. There is no separate hero loop.

## Course and runtime behavior

The shared tracker measures real content edges and provides a distinct route for each page. The broad page starts at the outside right shoulder and uses three product turns behind booking, quote and reconnect. The quote page starts in the open center gutter at its left product shoulder and uses four product turns: its three journey steps and Guided Launch. The bridges feed directly into a regular course that stays pale until contact reaches it. Side runs drift gently, while product turns use sustained vertical travel instead of exposed horizontal crossbars.

Masks follow actual painted surfaces with their measured rounded corners and protect copy blocks and standalone text. Transparent grid gutters stay open; a whole two-column layout no longer erases the course. Surface and copy masks keep the track behind product records, controls and readable content without cutting it off at unrelated rectangular grid boundaries.

The left departure starts during the preceding section and develops over at least 480px of vertical travel. It completes beyond the left crop before the final CTA rather than making a tight hook around that CTA. There is no detached returning SVG fragment.

Passive native scroll advances contact through `requestAnimationFrame`, updating visible SVG attributes without a React render per scroll. Standing and settled projections are cached. Future and settled pieces stay quiet; saturation follows contact. Resize and font readiness remeasure the course. No wheel capture, snapping, autoplay loop or content gating is used.

Motion mounts only at widths of at least 1100px, heights of at least 650px and `prefers-reduced-motion: no-preference`. Smaller screens, short windows and reduced-motion preferences retain the static sender marks, hide the hero-edge origin and omit both motion SVGs. Scripts-disabled rendering retains the complete product content and static sender marks. On an eligible desktop, the flat hero-edge DOM mark remains until its moving replacement is ready.

## Validation

Earlier evidence remains in `docs/qa/follow-through-family-v2-20261029/` and `docs/qa/domino-continuity-v2-20261029/`. The prior compact sender-origin A passed 12 viewport renders across both pages (1440, 1152, 1100, 834, 393 and 320px wide, height 900px), four intro states, short-window and scripts-disabled checks. Those results describe that earlier origin treatment; they do not establish layout or continuity for this revised visible hero-edge origin and new masks.

The unchanged rounded geometry passed 172 projection cases and 504 silhouette cases, including finite edge-on output and continuous rounded perimeters. Fresh checks in `docs/qa/visible-hero-course-20261029/checks.json` cover the revised treatment: both 64px hero starts and tapering tails are visible before scrolling; lift/contact/reverse and both left departures were inspected. The booking gutter is 62px wide at 1280px and contains two visible course pieces. Both pages passed 1100/393/320px, short-window and scripts-disabled checks with no overflow or flagged text clipping. Production build, TypeScript, scoped ESLint, formatting and SEO policy checks passed. Live sync is checked at delivery.

An OS-level reduced-motion run, physical Safari/device use, screen-reader operation, field performance and conversion results remain unmeasured. Source media gating covers reduced motion.

All source changes go through GitHub; Lovable is read only, with no separate Publish action.
