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

The earlier blanket numerical lens scores were replaced by this evidence-based checklist. The revision-specific scores at the end of this document record the later screenshot correction. Page polish does not establish customer demand, live platform behaviour or conversion performance. No blanket 9/10 or absolute-confidence claim is made.

| Check                 | Result and correction                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Owner priorities      | Retained enquiry capture, quote decisions, relevant service reminders and review requests. Reactivation remains a supporting use case, not the proposition. No platform feature inventory added.                                                                                                                                                                                                                                                                      |
| Both starting points  | Fixed. Hero, fit section and first FAQ now cover spreadsheets/inboxes and existing CRM/job systems. Zapla can be the customer CRM or fill an agreed gap beside existing tools.                                                                                                                                                                                                                                                                                        |
| Five awareness stages | Covered within the existing flow: on-site enquiry problem; automatic reply and quote solution; causal demonstrations; tools/launch/pricing fit; call invitation. No artificial awareness sections added.                                                                                                                                                                                                                                                              |
| Concrete workflows    | Enquiry shows the customer/request, automatic reply, returned details and assessment task. Quote shows sent status, follow-up, scope question and team reply needed. Service shows a due-date reminder and visit request, with confirmation owned by the team in adjacent copy. Reviews show job completion, invitation and an unselected Google review form.                                                                                                         |
| Whole-page rhythm     | Retained the distinct trade composition: dominant hero, office photograph, enclosed dark quote section, broad service photo, lavender review demo, open fit, warm launch panel and open pricing. Full-page desktop, tablet and mobile renders compared with Dental and current Mortgage Brokers v2.                                                                                                                                                                   |
| Glass                 | Fixed mobile opacity and quote-shadow overrides. Trades glass surfaces share warm-white 91% opacity, 6px blur, 18px radius, light 2px border, inset edge and soft outer shadow. Computed styles checked at all five widths, and cards inspected over each actual photo and the dark quote background. Dental is the exact technical benchmark; the broker reference currently uses a more transparent 84% surface.                                                    |
| Compact overlays      | Removed the large service heading, excess padding and redundant service-status/footer copy. Service invitation reduced to sender and message. People remain dominant, with faces clear. Mobile overlays remain readable in document flow.                                                                                                                                                                                                                             |
| Identities            | Fixed Daniel's missing reply portrait and review-event record. Daniel uses the same approved portrait position across messages, records and the shared AI Receptionist example. Alex uses her own consistent portrait. Automated business messages use Zapla petals.                                                                                                                                                                                                  |
| Controls              | Removed Pause/Play/Replay from all four Trades stories after the user’s screenshot review. Finite reveals run once and hold, with complete reduced-motion states. Removed visible example labels. No example selectors exist on Trades, so selector variants are not applicable.                                                                                                                                                                                      |
| Shared components     | Google wordmark, unselected outline stars and automated review invitation retained and compared with existing pages. The customer completion event now includes Daniel's avatar.                                                                                                                                                                                                                                                                                      |
| Production copy       | Removed visible illustrative/example labels and repetitive handoff captions. The redundant enquiry heading and detached assessment record were also removed; the adjacent copy retains the human assessment handoff. Short trigger qualifications stay near quote/review claims; connection, dispatch and stop-rule detail remains in FAQs. Examples are still described accessibly and documented as examples; they are not customer testimonials or actual results. |
| Claims and pricing    | Checked current CRM/Follow-Up positioning and Pricing-v3 inclusions. Follow-Through A$399/month, Growth A$699/month, plus GST; launch from A$1,997/A$2,997 plus GST; usage and optional AI/custom connections separate. No native integration, guaranteed job count, dispatch sync or invented outcome added.                                                                                                                                                         |
| States and widths     | Passed initial/action/response states 0, 1 and 2 for all four stories, with a final hold and no replay controls. Reduced motion exposes all final states. Checked 1440, 1024, 768, 390 and 320px. One H1, no document overflow, no visible child bounds outside the viewport, no missing page images and no page-script/hydration errors.                                                                                                                             |
| Conversion path       | Eight unique internal destinations return HTTP 200 locally. Both anchors land beneath the header at approximately 100px. Native FAQ keyboard expansion works. Both page booking CTAs use the same verified destination.                                                                                                                                                                                                                                               |
| Accessibility         | Scoped axe checks under WCAG 2 A/AA and 2.1 AA tags return zero violations at 1440 and 390px. Focus styles, native controls and reduced-motion states checked. This is not formal certification.                                                                                                                                                                                                                                                                      |

### Booking destination test

The live `https://zapla.io/booking` page loaded its calendar. A visible time was selected and the appointment-details form opened with name, phone, email, additional information and the Schedule meeting button. No personal details were entered and Schedule meeting was not pressed. Availability display and progression to the form are verified; an actual booking, notification and confirmation are not.

### Remaining unverified items

- Real account automation execution and customer-specific data connections. Public offer pages and NextGen announcements are evidence of stated scope, not a backend acceptance test.
- Real trade-customer outcomes, ROI, conversion rate and demand for an additional platform.
- Completed-booking confirmation and downstream calendar/email behaviour.
- Authenticated Lovable preview rendering. The implementation was rendered and tested locally; the editor preview requires sign-in in the available browser.

### Delivery verification

Production build, TypeScript, scoped ESLint and whitespace checks passed. Final page renders, close section renders and all four three-state demonstrations were inspected. GitHub remains the implementation path; Lovable is read-only. Shared navigation, footer, other industry pages and the route's existing noindex/sitemap settings remain intact.

## Full-page lens review and card correction — 13 October 2026

The user asked for an honest whole-page rating before the screenshot fix. Before changing code, inspected the supplied image and freshly rendered Trades at 1440 and 390px, plus current Dental and Mechanics desktop renders. Read the latest upstream shared AI Receptionist and Google review components and preserved them. These subjective scores assess the page; they do not measure product quality or customer results.

| Lens                    | Before | After | Observable basis / remaining limit                                                                                           |
| ----------------------- | -----: | ----: | ---------------------------------------------------------------------------------------------------------------------------- |
| Owner priorities        |    8.5 |   8.5 | Enquiries and quote decisions lead; service and reviews support them.                                                        |
| Industry / customer fit |      8 |     8 | Recognisable trade problems; examples favour air conditioning over other trades.                                             |
| Frontline operations    |    8.5 |   8.5 | Assessment, scope, pricing, appointments and urgent dispatch remain with people.                                             |
| Automation logic        |      8 |     8 | Trigger/action/reply/stop rules described; live account execution unverified.                                                |
| Copywriting             |    8.5 |   8.5 | Concrete requests and actions; no invented testimonials or metrics.                                                          |
| Product marketing       |    8.5 |   8.5 | Workflow outcomes lead, rather than a platform feature inventory.                                                            |
| Awareness journey       |    8.5 |   8.5 | Problem, solution, mechanism, fit and next step occur in the existing flow.                                                  |
| Art direction           |    7.5 |   8.5 | Two compact enquiry messages replace the crowded multi-role box; faces remain clear.                                         |
| Visual hierarchy        |      7 |   8.5 | Duplicate Daniel headings and detached record removed; sender and response read directly.                                    |
| Brand consistency       |    8.5 |   8.5 | Current Dental glass, typography and autumn palette; shared review component retained.                                       |
| Scrolling rhythm        |    8.5 |   8.5 | Human hero, office photo, cream call panel, dark quote panel, broad visit photo, lavender review and open fit/cost sections. |
| UI/UX                   |    7.5 |   8.5 | No irrelevant player controls; two separate senders with consistent identities.                                              |
| Motion direction        |    7.5 |   8.5 | Brief monotonic reveals and final hold; complete reduced-motion examples.                                                    |
| Conversion              |      8 |     8 | Clear call, workflow and pricing destinations; effectiveness lacks conversion data.                                          |
| CFO / value             |    7.5 |   7.5 | Subscription, launch and extras visible; contribution-based evaluation in FAQ, no verified payback.                          |
| Credibility             |      8 |     8 | No invented guarantees; live capabilities, connections and outcomes need verification.                                       |
| Buyer psychology        |      8 |     8 | Existing-tool objection addressed; additional-platform burden remains a fit question.                                        |
| Accessibility           |    8.5 |   8.5 | Scoped axe passes and keyboard FAQ verified; not formal certification or assistive-technology coverage.                      |
| Responsive execution    |      8 |   8.5 | Actual element bounds and photo/card layouts inspected at five widths including 320px.                                       |
| AI-slop review          |    8.5 |   8.5 | No synthetic metrics or decorative badges; unnecessary controls and repetitive record removed.                               |

Overall judgment: approximately 8/10 before, 8.3/10 after. The improvement is in composition and usability, not new commercial evidence. No blanket 9/10 claim.

### Exact correction

- Replaced one crowded enquiry card with separate compact automatic-reply and Daniel-reply glass cards, using the same petal and approved portrait as other states.
- Removed the duplicate opening customer heading and detached next-action record. Adjacent copy explains that the office/owner arranges the assessment.
- Desktop cards have deliberate vertical separation and a small horizontal offset. At mobile widths they enter document flow beneath the photo; no faces are covered.
- Removed all Pause/Play/Replay markup, icons, state and CSS from Trades. Each sequence runs once as it enters view and holds; reduced motion shows final states.
- Corrected the glass declaration order: the build retained only the prefixed blur when it followed the standard property. Chromium computed no blur. Prefix first and standard last preserves the 6px blur in rendered Trades cards, matching Dental.
- Retained latest upstream shared AI Receptionist and ReviewCards implementations.

### Verification for this revision

Production build, TypeScript, scoped ESLint and whitespace checks passed. Fresh whole-page renders inspected at desktop, tablet and mobile, including 320px; compared desktop render with current Dental and Mechanics. At 1440, 1024, 768, 390 and 320px: no visible child bounds outside the viewport, no missing page photos, no captured page-script errors and no scoped WCAG 2 A/AA or 2.1 AA axe violations. FAQ opens with Enter. Fresh normal-motion traces verified 0 → 1 → 2 for each Trades story and 0 → 1 → 2 → 3 for the shared call example; reduced-motion examples are complete. All eight internal destinations return 200 locally. Both anchors land approximately 100px below the viewport top. Enquiry cards have positive separation at all five widths (about 40px desktop/tablet, 14px mobile). Checks concern the local implementation, not authenticated remote-preview rendering.

Prices and inclusions cross-checked against the current repository’s Pricing-v3 source: A$399/A$699 monthly plus GST; launch from A$1,997/A$2,997 plus GST; usage and optional services separate. This is the current published-offer implementation, not an independent billing-contract verification.

Remaining limits from the preceding review still apply: real automation execution, customer-specific connections, verified trade outcomes/ROI, conversion data and completed-booking confirmation. Earlier booking-destination testing reached the appointment-details form; this revision does not claim a completed booking. Lovable preview requires authentication in the available browser, so remote synchronization/rendering must not be represented as independently verified.

## Commercial and full-page correction pass — 13 October 2026

### Review scope and scoring standard

This pass assesses the page's execution, not demonstrated business performance. A 9 means a strong production candidate with the stated lens criteria met and no material unresolved page issue observed within the tested scope. It does not mean perfect, independently user-tested, formally accessibility-certified or proven to convert. The earlier impressionistic scores are retained above as history, not presented as measured benchmarks.

A page can communicate a commercially useful value assessment without verified customer ROI. It can have a clear, tested call invitation without a completed booking. It can accurately show an agreed automation design without claiming a customer account has executed it. Those distinctions are essential to the scores below.

### Implemented changes

1. Hero support copy now names the actions directly: reply to enquiries, follow up unanswered quotes and remind customers when service is due. Retained the headline and human hero.
2. Enquiry copy now includes leaking taps, extra power points and replacement air conditioners. Quote copy includes hot water replacements, switchboard upgrades and air conditioners. The coherent Daniel installation story and portraits remain unchanged; breadth comes from relevant applications, not unrelated photographs or additional card grids.
3. Replaced “A quiet quote still needs a next step” with the time already spent preparing a quote. The next paragraph explicitly connects customer questions/acceptance, stopped quote reminders and the team's scope/price decision.
4. Review copy now states the recorded completion trigger, agreed workflow and customer review link directly. Retained neutral shared invitation, Google branding and unselected stars.
5. Added the existing-system objection to the visible fit section: keep a workflow your system already handles well; Zapla should fill a gap without duplicate messages. Both spreadsheet/inbox and existing CRM/job-system paths remain.
6. Shortened the launch heading from four lines to “Get your first workflow working.” Shortened the paragraph and focused the first step on the workflow worth improving first. The existing cream panel and three-step process remain.
7. Added a compact, open value explanation within pricing, rather than another section or card. Buyers compare total cost with margin after labour/materials, track office time separately, and understand that unchanged wages mean saved time creates capacity rather than cash savings.
8. The value link scrolls to and opens the relevant FAQ. Keyboard Enter activation works. Native FAQ toggling remains available; anchor has a header offset.
9. Replaced the generic no-return-guarantee sentence in the value FAQ with the useful distinction between time saved and actual cost reductions.
10. Final call copy now states what will be discussed: enquiries/quotes, existing tools, the proposed first workflow and costs before deciding. No call duration, deliverable guarantee or sales result was invented.

### Alternatives considered

- A dedicated HVAC-only page would align every photograph tightly with the audience, but would narrow the current Trades & Home Services scope. Retained a single realistic installation narrative and added a few recognisable plumbing/electrical examples.
- More trade cards or a new ROI calculator would enlarge the page and require assumptions. Used existing sections, a short value explanation and an actionable FAQ link instead.
- A full visual rebuild would discard the established human photography and rhythm. Retained the art direction, compact glass and shared components, and shortened the weaker launch copy.

### Lens assessment

| Lens                           | Score /10 | Acceptance criterion and observable evidence                                                                                                                                                                                                  |
| ------------------------------ | --------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Owner priorities               |         9 | Enquiries and quoted work lead; calls, relevant repeat service and reviews support the commercial journey. Reactivation is secondary.                                                                                                         |
| Industry/customer fit          |         9 | Specific plumbing, electrical, air conditioning, pest and pool use cases; no universal annual-service assumption or emergency-dispatch promise.                                                                                               |
| Frontline operations           |         9 | Customer details stay with the record. People assess work, answer scope/price questions, confirm visits and handle urgent dispatch.                                                                                                           |
| Automation logic / explanation |         9 | Each example has a stated trigger, automated action, response and next step; quote stop conditions and external status dependencies are addressed. This rates the explained design, not live execution.                                       |
| Copywriting                    |         9 | Concrete verbs and trade terms, shorter launch copy, removed quiet-quote metaphor, direct review trigger and explicit call expectations.                                                                                                      |
| Product marketing              |         9 | Use cases sell customer follow-up and office work, rather than a catalogue of Zapla features. Unlimited-user value and optional AI cost remain distinct.                                                                                      |
| Awareness journey              |         9 | Hero problem/outcome, workflow explanations, demonstrations, software fit, launch/cost/value, FAQ objections and call invitation form a complete buyer path.                                                                                  |
| Art direction                  |         9 | Three coherent editorial human photographs, unobstructed faces, compact enquiry messages, large service frame and a restrained autumn palette; actual desktop/tablet/mobile renders inspected.                                                |
| Visual hierarchy               |         9 | Dominant human hero, tight large headings, proportionate photo cards, concise launch headline and a subordinate open value block.                                                                                                             |
| Brand consistency              |         9 | Same typography/palette as Dental/Mechanics, computed 6px glass blur, shared review and receptionist components, consistent approved portraits and Zapla petals.                                                                              |
| Whole-page rhythm              |         9 | Open hero and office scene, cream call panel, dark quote panel, broad photograph, lavender review, open fit/pricing and shorter warm launch. Full scroll compared with current references.                                                    |
| UI/UX                          |         9 | No Pause/Replay or fake review controls; clear sender identities, compact message layouts, native FAQs and a working value-to-answer link.                                                                                                    |
| Motion direction               |         9 | Every story traces monotonically through its expected states and holds. Reduced motion reveals complete examples. Stable geometry and short timing preserve reading time.                                                                     |
| Conversion readiness           |         9 | Specific call purpose, coherent primary destination, pricing links, workflow anchors and working value FAQ. This is readiness, not measured conversion performance.                                                                           |
| CFO/value communication        |         9 | Subscription, launch, GST and extras remain visible. Value uses job margin rather than invoice totals and separates staff capacity from cash savings.                                                                                         |
| Credibility of presentation    |         9 | No invented testimonial, outcome, metric, native integration or guaranteed dispatch/booking. Capability and pricing source scope is documented; evidence-dependent outcomes remain unverified.                                                |
| Buyer psychology               |         9 | Main-page acknowledgement of working existing tools and duplicate-message concern, both starting points, guided implementation and clear cost discussion before deciding.                                                                     |
| Accessibility in tested scope  |         9 | One H1, descriptive image alternatives, decorative petals hidden, native controls, visible focus styles, reduced-motion states and zero scoped axe violations across five widths. No certification or unperformed assistive-technology claim. |
| Responsive execution           |         9 | Actual visible element bounds checked at 1440, 1024, 768, 390 and 320px; images load, no clipping outside viewport and all examples reach final states.                                                                                       |
| AI-slop / unnecessary content  |         9 | No invented dashboards, badges, statistics or new equal-weight card grids. Existing strong copy retained; weak slogans and redundant player controls removed.                                                                                 |

These are the author's qualitative page-readiness judgments supported by the listed observations, not independent panel ratings or fabricated customer scores. Real performance and platform verification have not been promoted to 9 by this review.

### Verification and source boundaries

- Read the current Library contents of `NextGen CRM everything Andrew Mark has announced.md`, especially CRM, inbox, fields, forms, flows, reviews and AI sections. This is a September 2026 compilation of announcements, not a live acceptance test. The wording makes agreed workflows and data paths explicit; no new technical integration was claimed.
- Cross-checked current repository Pricing-v3 and Follow-Up implementations. Follow-Through remains A$399/month plus GST; Growth A$699/month plus GST; launch from A$1,997/A$2,997 plus GST. Usage, optional AI Receptionist and custom connections remain separate.
- Fresh whole-page screenshots inspected at 1440, 1024, 768, 390 and 320px, with close renders of fit, launch, pricing/value, final CTA, enquiry and quote sections. Compared whole desktop layouts against current Dental and Mechanics.
- Five-width browser checks: no page-script errors, no visible child outside viewport bounds, all three photos decoded, one H1, all glass surfaces computed 6px blur and zero scoped WCAG 2 A/AA and 2.1 AA axe violations.
- Fresh normal-motion traces: each Trades example 0 → 1 → 2; shared AI call 0 → 1 → 2 → 3. Reduced-motion final states complete.
- All eight internal destinations returned HTTP 200 locally. The new value link opened its FAQ with Enter and landed around 110px below the viewport top at every width; the FAQ then closed with Enter.
- At 1440 and 320px, all seven FAQ summaries opened and closed with Enter; every page link and summary accepted focus with a visible 2px or 3px solid outline.
- Production build, TypeScript, scoped ESLint and whitespace checks passed. No changes to shared navigation, other industry pages or existing route noindex/sitemap settings.

### Still unverified, irrespective of page scores

Live account execution, real customer data connections, actual trade outcomes/ROI, measured conversion performance, completed-booking confirmation and authenticated remote preview rendering remain unverified. Earlier booking testing reached the appointment-details form only. Real trade-owner usability feedback and wider browser/assistive-technology testing would provide independent evidence beyond this implementation review. Do not present the page scores as verification of any of these items.
