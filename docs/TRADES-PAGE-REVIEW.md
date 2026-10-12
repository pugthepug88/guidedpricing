# Trades & Home Services: editorial rebuild

Completed 12 October 2026. Route: `/industries/trades`.

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

## Final lens review

These are author assessments of observable page execution, not an independent panel, customer interviews, formal certification or measured commercial performance. Scores for communication do not establish that the corresponding real-world business outcome scores 9.

| Lens                       | Execution / 10         | Observable evidence                                                                                                                                          | Evidence still needed                                        |
| -------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| Copywriting                | 9                      | Concrete enquiries, quote question, service date and review triggers; revised direct service heading; removed redundant summary                              | Customer language testing                                    |
| Industry customer          | 9                      | On-site work, local service request, assessment, removal question and recurring service examples; one-off work not treated as annual                         | Trade-owner interviews                                       |
| Frontline operations       | 9                      | Address and request captured; assessment, scope and visit confirmation owned by the team                                                                     | Real staff workflow test                                     |
| Automation logic           | 9                      | Trigger, automatic message, reply, stop rule and handoff are explicit; recorded dates and external status dependencies qualified                             | Actual account configuration and backend tests               |
| Art direction              | 9                      | Three fresh photographic stories with different framing; photos dominate; compact overlays keep faces clear                                                  | No claim of real customer photography                        |
| Visual hierarchy           | 9                      | Outcome-first hero, early enquiry proof, one focused quote panel, broad service image and restrained review scene                                            | Eye-tracking/user observation not performed                  |
| Brand consistency          | 9                      | Rendered comparison with Dental and Mechanics; same local fonts, palette and exact Dental glass styling                                                      | None material within this route's scope                      |
| Product Marketing Director | 9                      | Four prioritised commercial jobs and existing-software fit; optional AI separated from standard offer                                                        | Deployment capability validation                             |
| Conversion Director        | 9 for communication    | Specific call invitation, visual mechanism, objections, cost inclusions and linked plan comparison                                                           | Conversion and acquisition data remain unmeasured            |
| CFO / value                | 9 for decision clarity | Monthly price, minimum launch cost, GST/usage/add-on boundaries and contribution-based assessment in FAQ                                                     | Real implementation effort, margins and attributable returns |
| Credibility                | 9                      | Visible illustrative labels, no invented proof, data-path boundaries close to claims                                                                         | Verified trade customer case study                           |
| Accessibility              | 9 for implementation   | No scoped axe WCAG A/AA violations at desktop/mobile; native keyboard FAQs, focus styles, 44px controls, alt text, no focusable hidden content               | Formal audit and assistive-technology user testing           |
| Responsive UI/UX           | 9                      | Five widths from 320 to 1440px without overflow; mobile text precedes demos; overlay placement and tablet crops corrected                                    | Wider device/user testing                                    |
| Motion Director            | 9                      | 350ms first beat, 650ms second beat, 250ms opacity transition; prompt reveal, final hold, offscreen pause, pause/replay controls and complete reduced motion | Does not demonstrate live backend execution                  |

The missing backend, customer and conversion evidence cannot be solved by visual polish. Those remain explicitly unverified, not silently given a 9.

## Verification and corrections

Production build, TypeScript, scoped ESLint and whitespace checks passed. Browser tests at 320, 390, 768, 1024 and 1440 CSS pixels found one H1, no horizontal overflow, no missing page photos and no page-script/hydration errors. Lazy photos were scrolled into view and decoded before screenshot inspection. Reduced-motion mode exposes all four final states.

Normal-motion quote demonstration remained at step 0 offscreen, reached step 2 when visible, held while paused and completed after resuming. Replay and keyboard FAQ expansion passed. Actual visual inspection covered hero, office scene, quote panel, service photograph, reviews, pricing and full-page rhythm. The final desktop and mobile axe scans report zero violations for the scoped page under WCAG 2 A/AA and 2.1 AA tags.

Corrections made during review: reduced-motion controls initially caused a server/client mismatch; preference-dependent controls now update after hydration. Low-contrast illustration labels and launch numbers were darkened. Review stars now have an appropriate image role for their accessible description. Tablet photo crops preserve both faces. No booking or review was submitted.

The authenticated Lovable editor preview presented a sign-in page in the available browser. Local rendered verification covers the implementation; authenticated remote preview access is not claimed. Delivery uses GitHub's connected main branch so the existing Lovable project can sync. Shared navigation, footer and other industry routes are preserved. This route remains noindexed and excluded from the sitemap, as before.
