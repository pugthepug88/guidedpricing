# Quote Follow-Up: native Zapla domino motion

29 October 2026, Australia/Sydney. Scope: `/quote-follow-up` only.

## Decision

ADAPT the owner's footer reference. The travelling logo and thin journey rail did not communicate the footer's physical chain reaction. The hero conduit also read as plumbing. Replace those layers with a short physical Zapla domino course in the hero and a smaller course in the existing chapter gutter. Preserve the page's product narrative, palette, photo, controls, setup, FAQs and shared footer.

The stronger alternative to this motif was a quieter static quote-to-message transition with no gutter animation. It would reduce distraction, but lose the useful connection to the established footer and the promise of follow-through. A strict top-down camera was rejected because upright tiles would read as thin blue edges. Use an oblique overhead projection with visible face, thickness, hinge and grounded shadow.

## Story and limits

- Promise: a quote can start the configured follow-up, while the team focuses on its work.
- Without copy, the hero shows a source document, a physical continuation and a message. It does not prove delivery, response rate or revenue.
- The lower photograph retains the human role; the configured check-in is the system's role. Staff replies and decisions remain deliberate human work.
- Cause → configured wait/message → customer reply is explained by the ordinary-flow product chapters. The dominoes connect those chapters visually; they do not execute or change customer records.
- The sceptical misread is a decorative logo ribbon or an inevitable automated customer win. Keep one subdued progression, all source context and the distinction between the configured message and Alex's response.
- This remains a focused quote solution, not a claim that follow-through is exclusive or limited to quotes.

## Implementation

`QuoteDominoTrail` projects hinged cuboids in SVG. The exact existing logo is cropped from `/concept/zapla-logo-dark.svg`; there is no generated or redrawn logo. The hero has 14 close-spaced tiles. The chapter course uses measured endpoint distance and approximately 22px hinge spacing. Upright tiles, a two-to-three-tile contact front and settled tiles use fixed positions. Settled gutter tiles progressively recede to 38% opacity and lower saturation; the contact event remains the focal point.

Native passive scroll updates a clamped progression through requestAnimationFrame. No wheel capture, scroll lock, timer, autoplay loop or layout translation. Scrolling back reverses the visual progression. The hero's quote, timing label and SMS stay fixed; the journey's content stays in ordinary flow. Small screens omit the long gutter course and retain the compact hero course between the complete source/message cards. Reduced motion uses the static upright composition; no-JavaScript markup retains all product content and the hero course.

## Review and validation

Independent creative/buyer review first rejected the initial dense blue zipper. Reduced projected height/width introduced space ahead of the front; the settled material was then quieted. Final reviewed desktop images passed with no remaining art-direction must-fix. Actual runtime scrolling was checked by the owner agent.

- TypeScript noEmit, scoped ESLint, production build, SEO policy and whitespace checks passed.
- Actual iframe CSS viewports: 1425, 1085, 819, 378 and 305px content widths (1440, 1100, 834, 393 and 320px frames with browser scrollbars). No document overflow, flagged text clipping or missing loaded images.
- Full-fall hero course, including shadows, clears the SMS card: 3.4px desktop, 4.3px tablet, 9.8px narrow phone. Timing label remains separate from source quote.
- The course has at least 30px clearance from chapter copy in the measured desktop layout.
- Forward chapter progression measured 0.1948 → 0.6112 → 1.0000, and reverse returned to 0.6112.
- Email/five-day controls still update the prepared message and matching Inbox context; phone gutter is hidden and page overflow remains zero.
- Static/reduced-motion behavior reviewed in source; physical OS reduced-motion mode, screen reader use and field performance were not tested. A direct local-loopback SSR request could not reach the managed preview, so this pass does not claim a fresh no-JS browser run.

Screenshots and measured checks: `docs/qa/quote-domino-20261029/`.

All changes go through GitHub. Lovable is read only; no separate Publish action.
