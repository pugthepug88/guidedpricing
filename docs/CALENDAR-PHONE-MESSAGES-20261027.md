# Calendar phone conversation trial, 27 October 2026

## Request and rollback

The owner approved trying a phone conversation and explicitly reserved the option to return to the two-row card. The incumbent is saved at `c9e8b2e9689138d71ecaa3f6949c9d634f8d6317`, whose Calendar section is the reviewed `06d71a8e` design with hosted captures saved in `b12f20d9`. Revert only this trial's Calendar component/styles/FAQ and related trial notes; preserve later work on other pages and shared documents. Do not reset main or rewrite published history.

## Composition and product scope

One physical phone replaces the outer feature panel. Alex is the established sender; Emma is the same customer from the booking form. Confirmation carries the selected date/time, reminder carries the same time, and the third message is labelled “If marked as missed”. Its “Choose another time” link navigates to the existing booking demonstration. All messages are visible immediately, with no timers, controls or real sends. Changing the date retains the pending-state safeguard.

The existing saved live audit, Zapla-Automation-Knowledge-2026-10-26.md, lines 150–174, confirms Appointment Status Changed with target-status filters and an account-defined No Show option. The illustration therefore shows a configured status-change follow-up, not automatic attendance detection or a guaranteed live result. A booking link invites a new time; native editing of an original appointment and queued-reminder effects remain unverified.

## Reference decisions

USE the established customer/host identity, portrait sheet, blue, ink and page typography. ADAPT Pipeline’s recognisable physical phone, with incoming messages taking the place of its route interface. REJECT a second outer card, notification stack, workflow diagram, fake composer, decorative indicators and animation-dependent reading. The open-timeline alternative remains simpler than a workflow builder, but the customer’s phone better explains what they receive.

## Rendered review and checks

TypeScript, scoped ESLint, source formatting, SEO and whitespace checks passed. The local production build passed, and Cloudflare successfully built and deployed the exact final runtime source at e6700959, including the last link-underline adjustment. Vercel separately rejected deployment because the account reached its free daily deployment limit; it was not a code-build failure. No quota, authentication or browser policy was bypassed.

The HTTPS commit preview was inspected at desktop 1707 × 769, tablet 834 × 820, phone 393 × 820 and narrow phone 320 × 820. The phone measured 356 × 549 CSS pixels on desktop. Desktop and tablet keep the copy beside the phone; phones place it above. The narrow phone grew naturally to approximately 617px high. No document overflow or audited heading, label, link or bubble clipping was observed. All three messages, the conditional heading, sender and link were inspected in the captures; the subsequent Meeting Rooms composition was also checked.

Selecting Wednesday 11 November clears the old message thread and shows the pending prompt. Choosing 1:00 pm with Enter updates the confirmation date/time and reminder together. Clicking the rebooking invitation returns to the existing booking surface, whose heading was visible at 110px below the viewport top. No real booking or message is submitted. The new practical FAQ retains configuration and separate usage charges. All existing sales links remain /booking.

Local Vite served the actual component within its own execution call, and server HTML contained all three messages. The browser could not reach that server. Static local rendering navigation was blocked by browser URL policy and was not retried or bypassed. The successful HTTPS branch preview supplied visual and interaction coverage instead. The older local review helper is not part of that deployed branch and returned 404; no fresh browser-disabled-JavaScript session is claimed. The phone itself has no script-driven visibility, timer or fixed-height clipping. Live-product execution, delivery, attendance detection and new-booking completion were not tested.

## Scoped role review

These are one implementation reviewer's separate role assessments after the above renders, not independent agents, measured conversion results or owner acceptance. The owner is explicitly reviewing this as a reversible trial.

- UI/UX and SME: the customer-facing phone, chronological labels and three short messages make the result legible without reading a miniature workflow/table. The changed device grows at 320px without clipping.
- Brand/Creative: the established host, typography, graphite hardware and one Zapla-blue message keep continuity. The outer feature panel, decorative channel icons and duplicate appointment header are removed.
- Product Marketing and Conversion: the sequence now adds a useful missed-appointment follow-up and connects it to a chosen status. No reduction-of-no-shows, automatic attendance detection or rescheduling guarantee is claimed.
- Buyer psychology and copy: a familiar conversation answers what the customer receives, when and what they can do next. The conditional label distinguishes a possible follow-up from the ordinary confirmation/reminder path.
- Motion: no additional animation is needed; the full story is immediately present. The existing opening's scroll behaviour is untouched.
- Technical/accessibility and slop review: semantic ordered messages and headings, a real internal link, readable contrast, no fake composer, delivery ticks, metrics, playback controls or invented email address. Keyboard date/time selection and the link were exercised.

All requested role gates are assessed as met for this bounded trial. Final Lovable source/render verification follows merge; earlier two-row captures and rollback identity remain preserved.
