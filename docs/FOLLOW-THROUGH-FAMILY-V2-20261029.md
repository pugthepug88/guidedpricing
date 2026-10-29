# Follow-through family — separate V2 review pages

29 October 2026, Australia/Sydney.

## Scope and preservation

Owner authorised a coherent Follow-Up / Quote Follow-Up family after visual inspection of Wispr Flow, then explicitly required a new Follow-Up V2 instead of overwriting the original. Both rebuilds are separate review routes: `/follow-up-v2` and `/quote-follow-up-v2`. Original route/page styles, shared header/footer, navigation and production search-page list are unchanged. V2 routes are noindex/nofollow and excluded from the sitemap; they are not added to global menus.

`QuoteFollowJourney` has one optional `endAtSceneBottom` prop, false by default. Its original usage and rendering remain unchanged. Quote V2 opts in so its guide finishes after the complete reply scene rather than at that scene's opening label.

## Product and visual decisions

The broader page owns “You lead. Zapla follows through.” Quote Follow-Up is one focused proof point, linked as a child with a return breadcrumb. The alternative of merging both pages was rejected: distinct breadth and depth jobs justify retaining both, provided the hierarchy and material are shared.

Adapt Wispr's recurring product-relevant visual thread, not its colours, typography or layout. Use Zapla warm paper, ink type and controls, exact blue mark, pearl product records, one local ink scene and warm human photography. The native logo domino course carries the broader page through two broad turns in reserved whitespace. A snake around every section was rejected because it would organise the page around ornament rather than the customer story. The unchanged footer remains a cinematic brand echo; no literal physical collision or synchronised video handoff is claimed.

The old quote hero's two large records on a blue plate are replaced by one customer conversation, containing compact quote context, the actual prepared check-in, Emma's scope question and the team's deliberate next step. No hero animation is reintroduced.

## Story and capability gate

- Broad page: enquiry → automatic configured SMS with booking link → Emma explicitly makes her booking → confirmation/reminder → quote check-in → optional later reconnect. The repeat campaign is a separate business choice, not an inevitable next step or won job.
- Quote page: Quote Sent → chosen wait/SMS or email → customer question → Alex reviews scope and replies. No automatic acceptance, revised quote or task creation is implied.
- Photography supplies the human role; configured messages supply the system role. Scope, price and sensitive decisions remain with people.
- Native event/wait/channel building blocks are configuration evidence, not proof of delivery, conversion or measured customer results. No fabricated metrics/testimonials were added. Capability references are `AUTOMATION-BUILDER-EVIDENCE.md`, `CALENDARS-BOOKING-AUTOMATIONS-20261027.md` and the earlier quote audit.
- Messaging/usage and separately priced required Guided Launch are visible. Supported-tool compatibility and reply/exit handling are agreed before setup.

## Motion implementation

`FollowThroughTrack` measures real content edges and two reserved inter-scene gaps, calculates fixed hinges, and projects tile width/fall axes along the local route tangent. Native passive scrolling advances a short tipping front through RAF, updating visible SVG tiles rather than re-rendering React on every scroll. Standing/settled geometry is cached. At the measured desktop layout the course has 246 tiles, with 91 visible around a long crossing and only 3–4 above 65% opacity. Future and settled material recede to 17%/22%; only the contact stays fully blue. The final 130px fades after the final content.

No wheel capture, scroll snapping, loop, layout translation or content gating. Small screens and reduced motion omit the long track. No-JavaScript retains the complete product content in normal flow. Quote V2 retains the smaller existing chapter course, with its extended endpoint.

## Validation and review

- Ten actual rendered viewport checks across both pages:1425, 1137, 819, 378 and 305px content widths. No document overflow, flagged text clipping or missing loaded images; both routes expose noindex/nofollow.
- Actual script-disabled iframe check: broad page retains 7 h2 headings, enquiry, explicit customer choice and setup; quote retains 8 h2 headings, complete conversation and staff note. No animated track mounts in the broad static baseline.
- Corrected native crossing measurements: progress 0.3731 → 0.6981 → 0.9746; reverse returns to 0.3731. Physical tile faces/edges/shadows have zero overlaps with the content rectangles. FAQ expansion remeasures the course with zero overlap/overflow.
- Quote SMS/email and1/2/5-day controls still update the preview and matching Inbox; email/five-day state tested on phone. Book a Call reaches the existing booking page. The quote breadcrumb returns to the V2 parent.
- Independent creative review inspected both openings, both crossings, human/setup/CTA views. It passed the coherent family and hierarchy with no remaining visual must-fix. The author and root also reviewed actual scroll states. This is qualitative design review, not evidence of improved conversion or owner acceptance.
- TypeScript noEmit, scoped ESLint, production build, SEO policy and whitespace checks passed. OS-level reduced-motion mode, physical Safari/device use, screen reader operation and field performance were not measured.

Evidence: `docs/qa/follow-through-family-v2-20261029/`. All source goes through GitHub; Lovable is read only, with no separate Publish action.
