# Follow-through family — separate V2 review pages

## Current update — tapered starters and message-origin preview, 30 October 2026

The first four bodies now measure 56, 44, 32 and 24px before joining the unchanged 20px course on both V2 pages. These are separate, fixed-size pieces; tipping never grows the face. Spacing and upright poses also taper, preserving rounded logo geometry and clearance between resting bodies. Standing/contact pieces remain blue and fallen pieces retain the muted grey-blue material.

Follow-Up still starts after “through.” Its opening route now bends inward behind the opaque product preview and returns to the right gutter below it, breaking up the previous long straight descent. The section-aligned clock and visibility logic are unchanged.

Quote V2 also has an isolated `?origin=message` review variant. A flat 56px sender mark sits immediately to the right of the conversation, aligned with the configured outbound message. Scrolling reveals its depth and tips it into the same tapered course. A single send cue changes from “Ready to send” to “Follow-up sent”; the reply appears after handoff and resets when scrolling back. This represents configured sending, not AI thinking. The default quote review URL retains its CTA-area origin. Smaller screens, short windows, reduced-motion preferences and no-JavaScript rendering retain the complete static conversation.

The starter check passes 4,445 assertions. Desktop browser sweeps at 1100, 1280 and 1536px widths found no overflow or missing images; all modes retained the 56/44/32/24/20 prefix and 20px regular pieces. Maximum concealed-contact intervals were 50–56px before the intentional final left exit. The message preview's intermediate tip clears the narrow desktop edge, and ready/sent/reply/reverse states were inspected directly. Evidence is in `docs/qa/tapered-origin-20261030/`. The cloud browser's limited frame rate cannot establish normal-device fluidity. Original routes, shared navigation, footer and product copy remain unchanged. Older sections below describe superseded treatments.

## Current correction — headline origin and section continuity, 30 October 2026

The follow-up starter now sits 20px beyond the actual “Zapla follows through.” headline span, near its baseline. The former gap below the CTA was chosen for clearance rather than a meaningful connection to the promise; that placement is retired. The initial bend leads into the right gutter. The first piece remains 32px and regular pieces remain 20px on both V2 pages. Headline masking measures text nodes so the positioned starter cannot enlarge its own occlusion mask.

The previous global arc-distance clock is also retired: its two endpoints could leave the contact above the current section. The current clock places anchors on exposed runs at their actual section positions, joins them monotonically with continuous velocity, and gives concealed passages 60px of scrolling. A lone exposed domino receives a finite tipping window. Concealed handoffs are shifted away from section reading landmarks. The response is 40ms with a maximum lag of one 24px pitch; idle and geometry resets remain explicit.

Measured desktop sweeps at 1100, 1280 and 1536px widths found maximum concealed-contact intervals of 50–54px before the intentional offscreen exit. The follow-up quote entrance and the subsequent gap both showed exposed active pieces in direct browser inspection. Mobile and short-window fallbacks retain complete content. These checks establish section alignment and visibility; the cloud browser's limited frame rate does not establish normal-device fluidity. Original routes, copy, shared navigation and footer are unchanged. The older notes below are historical.

## Current implementation — option 1, 30 October 2026

This update supersedes the navigation-origin treatment documented below. Both V2 pages now begin with one already-upright, page-anchored 32px Zapla domino in the hero. Regular dominos remain 20px across both pages. There is no flat-to-lift transformation, fixed navigation copy, portal or separate opening handoff.

The starter and the rest of the chain share one clock. Progress is measured uniformly in distance along the route, rather than by searching for a matching vertical position. Horizontal stretches therefore receive the same scroll budget per unit of track as vertical stretches. A 105ms elapsed-time response smooths the whole cascade and continues requesting frames until it settles. The idle clock resets after settling, so the first wheel step after a pause is smoothed too. Geometry changes and motion reactivation initialize from the current scroll position instead of an old course position. The timing also allows the final pieces to complete their contact window.

The two pages retain different routes. Crossings now use broader descending bends, with a minimum 440px span and measured crossing depth capped at 760px. Painted surfaces still conceal crossings while genuine blank gutters remain visible. The existing blue standing/contact state and muted grey-blue fallen state are preserved, along with the rounded Zapla body, early left departure and V2 footer crop.

The original pages, shared navigation and footer defaults, product dialogue and copy remain unchanged. Mobile, short-window and reduced-motion layouts retain their static content and sender icons.

The focused motion check passes 6,276 cases, covering uniform arc-distance timing, reversal, finite values and damping across different frame intervals. Browser inspection is recorded separately at delivery. The available cloud browser has previously sampled motion at approximately 1Hz; neither those observations nor the pure checks establish 60fps smoothness on a normal device.

## Historical treatment — 29 October 2026

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

## A — navigation-origin cascade

The course now begins at the actual fixed navigation mark. Both 64px hero-edge origins are removed, while ordinary 32px sender icons remain static in the product interfaces. `FollowThroughTrack` measures the navigation logo's 32px icon and renders a temporary visual copy through `createPortal`. That copy is fixed at z-index 60 and ignores pointer events; the native header and home link are neither mutated nor displaced and remain clickable.

`navOriginGeometry.ts` keeps the emitted mark a rigid 32px square with depth equal to 10% of its size. A fixed orthographic camera projects its 0–65° pitch: the face foreshortens and reveals depth instead of growing. Width remains exactly the source size; total projected height is bounded by `hypot(size, depth)`, about 1.005 times the source. A short 28px → 24px → 20px bridge joins the unchanged regular course.

`followThroughGeometry.ts` retains the native logo corner ratio `142.2 / 508` throughout the front, rear, extrusion and shadow. Curved SVG paths replace square backing/side polygons, and the face transform does not mirror the white mark through the edge-on moment. Both pages retain identical regular geometry: 20px width basis, upright vector `(4, −13)`, 28px fall and 24px pitch, with every regular piece exposing size `1`. The regular material restores its 0.135 depth factor and dark `#084ca9` side. Future pieces remain fully blue; after contact, settled regular pieces and bridges ease to 0.38 opacity and 0.35 saturation.

## Course and runtime behavior

The shared tracker supplies distinct hero routes. Follow-Up travels down the outside left shoulder, then passes behind its wide hero product surface and emerges at right. Quote Follow-Up uses the left gutter, bends below the CTA and follows a different path around its hero. Subsequent product turns retain three crossings on Follow-Up and four on Quote Follow-Up, including Guided Launch. Side runs drift gently; product turns use sustained vertical travel instead of exposed horizontal crossbars.

Masks follow actual painted surfaces with their measured rounded corners and protect copy blocks and standalone text. Transparent center gutters stay open. The course therefore passes behind records, controls and readable content without being erased by an unrelated rectangular grid wrapper. The early left departure remains: it begins during the preceding section, develops over at least 480px of vertical travel and completes beyond the left crop before the lotus CTA. There is no detached returning SVG fragment or tight final-CTA hook.

The first 90px of native scroll drives the origin, with elapsed-time easing using a 100ms time constant. `requestAnimationFrame` continues until the eased pose catches its scroll target. The emitted copy fades over 120–180px of scroll; the page course takes over and gradually follows a contact point at 54% of viewport height. Visible SVG attributes update without a React render per scroll, with cached standing/settled projections and remeasurement after resize or font readiness. No wheel capture, snapping, autoplay loop or content gating is used.

Motion mounts only at widths of at least 1100px, heights of at least 650px and `prefers-reduced-motion: no-preference`. Smaller screens, short windows, reduced-motion preferences and scripts-disabled rendering retain the complete content, native navigation and static sender marks without mounting the moving course or portal.

## Validation and limits

Earlier family and origin checks remain historical evidence in `docs/qa/`; they do not establish the revised navigation-origin layout or runtime behavior.

- Fresh rigid-pose checks cover 2,412 cases: physical axes stay rigid, projected width error is zero and maximum projected height remains within 1.005 times the source.
- Both six-second native browser runs reached the handoff with the native brand's position unchanged. This cloud browser supplied only seven animation samples per run, approximately 1Hz; these runs do not establish 60fps behavior on a normal device.
- Fresh 1280px desktop checks on both pages found no document overflow, missing images, flagged clipping or old hero-edge origin. Fresh 1100/393/320px, short-window and scripts-disabled checks passed for both pages with no overflow or flagged clipping. A 900→800px height-only resize kept the copy at 32px and updated the fixed viewBox. Production build, TypeScript, scoped ESLint, formatting and SEO policy checks passed; CI and live sync are checked at delivery. Evidence is saved in `docs/qa/rigid-nav-origin-20261029/checks.json`.

An OS-level reduced-motion run, physical Safari/device use, screen-reader operation, field performance and conversion results remain unmeasured. Source media gating covers reduced motion. Visual review is qualitative and does not imply owner acceptance or a conversion score.

All source changes go through GitHub; Lovable is read only, with no separate Publish action.
