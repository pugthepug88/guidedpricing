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

The origin is the native flat 32px Zapla mark beside the automatic message's sender/timing row inside each hero product interface. It begins as an ordinary flat sender mark. Scrolling reveals shallow rounded depth, lifts the mark and tips it into two bridge pieces of 24px and 20px. The main course remains hidden until this first contact, then passes behind the hero surface and emerges at its opposite shoulder. The sender column reserves clear space throughout; the motion does not cross the message or headline.

`followThroughGeometry.ts` uses the native logo corner ratio `142.2 / 508` for the complete projected object: front perimeter, rear plane, continuous extrusion and shadow. Curved SVG paths replace square rear/side polygons. The face transform does not reverse the white mark through the edge-on moment. Front, rear and depth therefore share the same rounded silhouette rather than placing a rounded face on a square body.

Every regular course piece retains the same geometry on both pages: 20px width basis, upright vector `(4, −13)`, 28px fall and 24px pitch. All regular pieces expose size `1`; only the flat origin and two contact bridges differ in size. There is no enlarged side starter or separate hero loop.

## Course and runtime behavior

The shared tracker measures the actual content edges, hero surface and three marked opaque product scenes. Each scene permits a relaxed diagonal side change over 200–500px of vertical travel, concealed behind its surface. The broad page crosses behind booking, quote and reconnect; the quote page crosses behind the three journey steps. Content wrappers, explicit occluders and opening footnotes are masked. Side runs drift gently instead of using exposed horizontal crossbars.

The left departure starts during the preceding section and develops over at least 480px of vertical travel. It completes beyond the left crop before the final CTA rather than making a tight hook around that CTA. There is no detached returning SVG fragment.

Passive native scroll advances contact through `requestAnimationFrame`, updating visible SVG attributes without a React render per scroll. Standing and settled projections are cached. Future and settled pieces stay quiet; saturation follows contact. Resize and font readiness remeasure the course. No wheel capture, snapping, autoplay loop or content gating is used.

Motion mounts only at widths of at least 1100px, heights of at least 650px and `prefers-reduced-motion: no-preference`. Smaller screens, short windows and reduced-motion preferences retain the flat sender mark and omit both motion SVGs. Scripts-disabled rendering also retains the complete product content and flat mark. The DOM mark hides only after an eligible moving replacement is ready.

## Validation

Earlier family evidence remains in `docs/qa/follow-through-family-v2-20261029/` and `docs/qa/domino-continuity-v2-20261029/`. Current origin-A checks cover:

- Both pages rendered at frame widths 1440, 1152, 1100, 834, 393 and 320px, height 900px: no document overflow, flagged text clipping or missing images; fonts loaded and noindex/nofollow retained. Regular pieces use size `1` on eligible desktops; tablet/phone retain the flat mark without motion SVGs.
- Flat, lift, contact and handoff states on both pages: no overlap with sender labels or message text. Independent visual review approved both origins.
- Both pages at 1280×600 and scripts-disabled 1280×900: flat mark retained, no motion SVG mounted, complete content with seven/eight second-level headings.
- Both page routes and early left departures visually checked; neither crosses message content or the lotus CTA. Quote intro reverses through handoff, tip, lift and flat with no sender/message collision. Mobile Email / 5 days example verified.
- Rounded geometry: 172 projection cases and 504 silhouette cases passed, including finite edge-on output and continuous rounded perimeters.

An OS-level reduced-motion run, physical Safari/device use, screen-reader operation, field performance and conversion results remain unmeasured. Source media gating covers reduced motion. Production build, TypeScript, scoped ESLint, formatting and SEO policy checks passed for this source. CI and live sync are checked at delivery. Current rendered checks are saved in `docs/qa/follow-through-origin-a-20261029/checks.json`.

All source changes go through GitHub; Lovable is read only, with no separate Publish action.
