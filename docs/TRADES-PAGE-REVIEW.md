# Trades & Home Services: editorial rebuild

Rebuilt 12 October 2026; checklist reviewed 13 October 2026. Route: `/industries/trades`.

## What this page needs to sell

Local trade businesses have three distinct customer gaps: new enquiries while someone is on site, questions after a quote, and relevant future service needs. A completed job also creates a useful moment to request a review. The page demonstrates these four jobs rather than listing the entire platform. Office staff get customer context and a clear human handoff; customers get a reply and a way to ask a question.

The stronger alternative to adding Zapla can be configuring the existing job system properly. The fit section and FAQ say so. Scheduling, dispatch, costing and invoicing remain with the operational system. This is not a claim that those systems lack messaging, nor a promise of native connections.

## Reference decisions and actual inspection

Read AGENTS, build protocol, design guardrails, editorial photo style and motion creative system before changing the implementation. Read the current Homepage, Dental, Mechanics, target Trades, CRM, Follow-Up, AI Receptionist and Pricing implementations. Rendered Homepage, Dental and Mechanics locally from the current repository, then compared them with the rebuilt Trades page. Desktop and mobile full-page renders and individual section renders were inspected.

- USE: Dental's Inter Tight and Manrope typography, warm white/autumn palette, generous space and exact compact glass treatment.
- ADAPT: its broad human photography and occasional enclosed dark/cream panels to the trade customer journey.
- REJECT: cloning the Mechanics layout, copying Dental section for section, reusing a posed plumber portrait, hiding faces behind cards, an uninterrupted alternating dialogue sequence, duplicate opening summaries and poetic benefit headings.

Composition: asymmetric human hero, open office photograph with enquiry context, dark quote panel, broad service photograph, lavender Google review illustration, open software fit, warm launch panel, open value/pricing rows, native FAQs and final call invitation. The opening summary was removed after the first visual pass because it repeated the hero rather than adding a distinct point.

## Photography and glass

Three new photographs were generated with the built-in image-generation tool and encoded as WebP. They are illustrative editorial assets, not photographs of Zapla customers or evidence of results. Overlays remain HTML; no product screens were generated inside the photos.

| Project asset                                         | Dimensions  | Bytes  |
| ----------------------------------------------------- | ----------- | ------ |
| `public/concept/industries/trades-technician.webp`    | 1122 × 1402 | 283126 |
| `public/concept/industries/trades-office.webp`        | 1536 × 1024 | 112832 |
| `public/concept/industries/trades-service-visit.webp` | 1672 × 941  | 212982 |

Generation briefs: portrait Australian air conditioning technician inspecting an outdoor condenser, navy workwear, headroom and calm lower-left foreground; landscape local trade office coordinator at an oak desk, face upper right and clear foreground; broad Sydney homeowner and service technician conversation on a verandah, people on the right and calm cream wall left. Each specified natural editorial/documentary photography, cream/sage/navy/oak tones, believable anatomy, no posing, no phone checking, no text, logos or baked-in UI. Source masters were generated separately from the web assets.

Glass follows Dental: warm white at 91% opacity, 2px light border, subtle inset edge, 6px blur, soft shadow and 18px corners. Supporting photos lazy-load. Mobile overlays move into document flow; tablet photo positions were corrected so faces remain in frame.

## Capability and commercial evidence

Read the current `NextGen CRM everything Andrew Mark has announced.md` source, including CRM/messaging, forms and automation sections. The notes establish announced forms, fields, customer records, inbox channels and flows. The current website establishes the published Zapla offer and workflow positioning. Neither source is a live deployment test.

| Workflow       | Trigger and action shown                                                                | Human / data boundary                                                                                  |
| -------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Enquiry        | New enquiry, automatic request for address and service details, customer reply captured | Team arranges the assessment and confirms scope; no diagnosis or technician availability assumed       |
| Quote          | Recorded quote stage, agreed follow-up, reply stops further reminders                   | Team answers the scope question; external acceptance needs a verified update/connection                |
| Repeat service | Reliable recorded service date, relevant reminder, customer reply                       | Team confirms the visit; eligible customers and permissions are required; no universal annual interval |
| Review         | Job completion recorded in Zapla or supplied through agreed connection, neutral request | No filtering for favourable customers, guaranteed ratings or claim of a genuine submitted review       |

AI Receptionist is an optional add-on; technical safety decisions and urgent dispatch stay with people. FAQs explain external status updates, software overlap, fields, permissions and total-cost assessment. There are no invented metrics, testimonials, integration badges, quote values or outcome counts.

Plan amounts match current Pricing-v3: Follow-Through A$399/month + GST, Growth A$699/month + GST; Guided Launch from A$1,997 and A$2,997 + GST respectively. Usage, AI Receptionist and custom connections are separate. Unlimited users and stored contacts under fair use do not mean unlimited communications.

## Shared checklist review, 13 October 2026

The earlier numerical lens scores are superseded by this evidence-based checklist. Page polish does not establish customer demand, live platform behaviour or conversion performance. No blanket 9/10 or absolute-confidence claim is made.

| Check                 | Result and correction                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Owner priorities      | Retained enquiry capture, quote decisions, relevant service reminders and review requests. Reactivation remains a supporting use case, not the proposition. No platform feature inventory added.                                                                                                                                                                                                                      |
| Both starting points  | Fixed. Hero, fit section and first FAQ now cover spreadsheets/inboxes and existing CRM/job systems. Zapla can be the customer CRM or fill an agreed gap beside existing tools.                                                                                                                                                                                                                                        |
| Five awareness stages | Covered within the existing flow: on-site enquiry problem; automatic reply and quote solution; causal demonstrations; tools/launch/pricing fit; call invitation. No artificial awareness sections added.                                                                                                                                                                                                              |
| Concrete workflows    | Enquiry shows the customer/request, automatic reply, returned details and assessment task. Quote shows sent status, follow-up, scope question and team reply needed. Service shows a due-date reminder and visit request, with confirmation owned by the team in adjacent copy. Reviews show job completion, invitation and an unselected Google review form.                                                         |
| Whole-page rhythm     | Retained the distinct trade composition: dominant hero, office photograph, enclosed dark quote section, broad service photo, lavender review demo, open fit, warm launch panel and open pricing. Full-page desktop, tablet and mobile renders compared with Dental and current Mortgage Brokers v2.                                                                                                                   |
| Glass                 | Fixed mobile opacity and quote-shadow overrides. Eight glass surfaces now share warm-white 91% opacity, 6px blur, 18px radius, light 2px border, inset edge and soft outer shadow. Computed styles checked at all five widths, and cards inspected over each actual photo and the dark quote background. Dental is the exact technical benchmark; the broker reference currently uses a more transparent 84% surface. |
| Compact overlays      | Removed the large service heading, excess padding and redundant service-status/footer copy. Service invitation reduced to sender and message. People remain dominant, with faces clear. Mobile overlays remain readable in document flow.                                                                                                                                                                             |
| Identities            | Fixed Daniel's missing reply portrait and review-event record. Seven Daniel avatars use the same approved portrait position across messages and records. Alex uses her own consistent portrait. Automated business messages use Zapla petals.                                                                                                                                                                         |
| Controls              | Pause/replay stay outside message bubbles. Removed visible example labels and empty reduced-motion control rows. No example selectors exist on Trades, so selector variants are not applicable.                                                                                                                                                                                                                       |
| Shared components     | Google wordmark, unselected outline stars and automated review invitation retained and compared with existing pages. The customer completion event now includes Daniel's avatar.                                                                                                                                                                                                                                      |
| Production copy       | Removed visible illustrative/example labels and repetitive handoff captions. The useful assessment next-action record remains. Short trigger qualifications stay near quote/review claims; connection, dispatch and stop-rule detail remains in FAQs. Examples are still described accessibly and documented as examples; they are not customer testimonials or actual results.                                       |
| Claims and pricing    | Checked current CRM/Follow-Up positioning and Pricing-v3 inclusions. Follow-Through A$399/month, Growth A$699/month, plus GST; launch from A$1,997/A$2,997 plus GST; usage and optional AI/custom connections separate. No native integration, guaranteed job count, dispatch sync or invented outcome added.                                                                                                         |
| States and widths     | Passed initial/action/response states 0, 1 and 2 for all four stories, including pause hold and resume. Reduced motion exposes all final states. Checked 1440, 1024, 768, 390 and 320px. One H1, no document overflow, no visible child bounds outside the viewport, no missing page images and no page-script/hydration errors.                                                                                      |
| Conversion path       | Eight unique internal destinations return HTTP 200 locally. Both anchors land beneath the header at approximately 100px. Native FAQ keyboard expansion works. Both page booking CTAs use the same verified destination.                                                                                                                                                                                               |
| Accessibility         | Scoped axe checks under WCAG 2 A/AA and 2.1 AA tags return zero violations at 1440 and 390px. Focus styles, native controls and reduced-motion states checked. This is not formal certification.                                                                                                                                                                                                                      |

### Booking destination test

The live `https://zapla.io/booking` page loaded its calendar. A visible time was selected and the appointment-details form opened with name, phone, email, additional information and the Schedule meeting button. No personal details were entered and Schedule meeting was not pressed. Availability display and progression to the form are verified; an actual booking, notification and confirmation are not.

### Remaining unverified items

- Real account automation execution and customer-specific data connections. Public offer pages and NextGen announcements are evidence of stated scope, not a backend acceptance test.
- Real trade-customer outcomes, ROI, conversion rate and demand for an additional platform.
- Completed-booking confirmation and downstream calendar/email behaviour.
- Authenticated Lovable preview rendering. The implementation was rendered and tested locally; the editor preview requires sign-in in the available browser.

### Delivery verification

Production build, TypeScript, scoped ESLint and whitespace checks passed. Final page renders, close section renders and all four three-state demonstrations were inspected. GitHub remains the implementation path; Lovable is read-only. Shared navigation, footer, other industry pages and the route's existing noindex/sitemap settings remain intact.
