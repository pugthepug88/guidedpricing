# Allied Health rebuild review

Updated 12 October 2026. This is a working review of the rebuild, not independent approval or evidence of customer results.

## Positioning and strongest use cases

Target: appointment based private allied health practices, with physiotherapy as the concrete example. The buying problem is residual enquiry and reception administration around an existing practice system. It is not a replacement for clinical records, claiming, the diary or treatment decisions.

The strongest alternative is to use the practice system's existing forms, reminders and booking tools. That remains the right choice wherever those tools already solve the problem. Zapla should earn its place through unresolved enquiries, named callback ownership or an agreed communication gap.

| Workflow              | Trigger                                             | Zapla action                                                               | Next step and boundary                                                                                                                                    |
| --------------------- | --------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New enquiry           | Patient asks about available appointments           | Configured reply and existing booking link; agreed follow up if unresolved | Reply stops the sequence and gives reception a task. The booking system confirms appointments.                                                            |
| Administrative form   | Reception needs callback details                    | Collect agreed details, associate submission with enquiry, update task     | Submission stops form reminders. An external form needs a verified completion signal. Clinical histories and consent remain in the clinical system.       |
| Return reminder       | Practice supplies approved eligibility and due date | Agreed reminder using current records and contact permissions              | Reply stops reminders and reception arranges the next step. Practitioners determine eligibility.                                                          |
| Feedback or reviews   | Agreed completed visit event                        | Neutral invitation and route direct replies to a named person              | Reception handles admin concerns; practitioners handle clinical questions. No incentives, positive screening or automatic reuse of clinical testimonials. |
| Optional call support | Reception cannot answer                             | Agreed administrative answers or callback request                          | Human fallback required. No diagnosis, treatment advice or urgency assessment.                                                                            |

Capability support was checked against current repository CRM, Follow Up and Reviews content. This is first party website support, not a live product acceptance test. Practice system connections, source freshness, submission events, patient data handling and actual workflow operation still require product verification.

## Composition and brand

Read the homepage, Dental and Mechanics implementations plus the mandatory build protocol, design guardrails and video creative system.

USE: local Inter Tight and Manrope fonts, autumn palette, editorial human photographs, shared root navigation/footer and Dental glass treatment.

ADAPT: dark enquiry demonstration followed by a portrait form scene, broad reception photography, violet review demonstration and sage software boundary. A smaller opening strip introduces the enquiry gap. Optional call support is a supporting point instead of a separate phone centred hero.

REJECT: a repetitive run of alternating dialogue panels, clinical advice automation, unverified native practice integrations and invented metrics/testimonials.

The glass matches Dental: 91% warm white, light 2px outer border, subtle inset border, 6px backdrop blur, soft shadow and 18px corners. All three photographs were generated for this draft and are illustrative, not real customer evidence. WebP assets are local. The main photo loads with high priority; supporting photos lazy load. Faces are placed above the overlay areas in the image sources. Mobile overlays move into normal document flow.

## Review by lens

Scores below assess observable copy and source implementation only. A score cannot replace rendered inspection. No claim is made that every lens has reached 9/10.

| Lens                 | Assessment              | Evidence and remaining limitation                                                                                                                                                                              |
| -------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Copywriting          | 9/10, editorial         | Direct enquiry outcome, concrete evening appointment example, trigger/action/handover shown; detailed qualifications in supporting copy and FAQ.                                                               |
| Industry customer    | 9/10, editorial         | Physiotherapy journey is concrete, existing practice tools retained, patients have an easy route to reception. Not validated in customer interviews.                                                           |
| Frontline operations | 9/10, editorial         | Named task owner, callback timing, submission events and reply stops; clinical exceptions stay with people. Live acceptance testing pending.                                                                   |
| Automation logic     | 9/10, specification     | Trigger, next action and stop conditions are explicit; a link click is not a booking; external form completion is qualified. Live connections unverified.                                                      |
| Art direction        | Pending rendered review | Three inspected generated photographs with coherent cream/oak/sage styling. Actual page crops and composition not yet visually signed off.                                                                     |
| Visual hierarchy     | Pending rendered review | Dominant hero image, one primary heading per section and varied media scale in source. Actual full scroll and zoomed out review pending.                                                                       |
| Brand consistency    | 9/10, source comparison | Dental glass values, incumbent palette and local typography retained; shared shell unchanged. Rendered comparison pending.                                                                                     |
| Conversion           | 8.5/10, editorial       | Consistent call CTA, workflow examples, pricing access and objections. No conversion data or real customer proof supplied.                                                                                     |
| CFO/value            | 8.5/10, editorial       | Platform/setup/usage costs separated; useful measures named. No verified labour savings, marginal appointments or customer ROI evidence.                                                                       |
| Credibility          | 8.5/10, editorial       | Illustrative labels, no results/statistics/testimonials invented, connection limits near claims. Live product evidence and healthcare data suitability pending.                                                |
| Accessibility        | Pending rendered checks | Native FAQ, semantic headings, visible focus, 44px controls, alt text and reduced motion in source. Keyboard, contrast and screen reader checks still needed in the actual browser.                            |
| Responsive           | Pending rendered checks | Dedicated 1100/800/480 breakpoints and mobile card flow. No claim of measured overflow or crop verification.                                                                                                   |
| Motion               | Pending rendered checks | One way state emphasis completes promptly and holds; inactive content remains readable; timer clears offscreen, manual enquiry controls, reduced motion displays the final story. Actual pacing not inspected. |

## Validation and blockers

Production build, TypeScript, page-specific ESLint and diff checks passed during restoration. The final production build passed after the copy and route edits.

The direct Lovable Allied Health preview was opened on 12 October and redirected to Lovable sign-in. The same preview access barrier prevented rendered inspection of Dental, Mechanics and the homepage. No authentication bypass, visibility change or separate production deployment was performed. Desktop, tablet, mobile, whole page and zoomed out sign-off remain outstanding. Source review and generated image inspection are not rendered page review.

The 9/10 goal is not achieved across all lenses. Remaining checks require preview access; commercial/product evidence requires actual verification, not extra decorative polish.

## Shared checklist revision, 13 October 2026

This entry supersedes the earlier editorial scores as the status of this review. No new numerical ratings are assigned. Source changes and browser observations are reported separately.

| Check                 | Changes or evidence                                                                                                                                                                                                                                                                                        | Status                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Owner priorities      | Enquiry response and reception workload lead. Return reminders remain one supporting use case, with practitioner eligibility retained.                                                                                                                                                                     | Copy reviewed                                                                           |
| Both starting points  | Hero no longer assumes practice software for enquiry admin. Fit section and FAQ explicitly address spreadsheets/inboxes and existing CRM/practice systems. Clinical system boundary stays clear.                                                                                                           | Fixed in source                                                                         |
| Five awareness stages | Opening identifies the enquiry gap; enquiry demonstration explains the solution and operation; fit, price and FAQ assess suitability; repeated call CTA offers the next step. No five-section wrapper added.                                                                                               | Copy reviewed                                                                           |
| Concrete workflows    | Enquiry, follow up, patient reply and callback remain visible; form submission updates the task; return reply gets a callback; completed visit prompts a review request. Care decisions stay human.                                                                                                        | Source reviewed; live operation unverified                                              |
| Whole page rhythm     | Retained open opening, dark enquiry panel, portrait form, broad reception photo, lavender review scene, sage fit and open close.                                                                                                                                                                           | Actual zoomed out review blocked                                                        |
| Glass                 | Hero, form and return use identical Dental glass values. Workflow opacity now applies inside the cards, not to glass surfaces. No glass card is inside an opacity-animated parent.                                                                                                                         | Technical fix passed; photo-backed visual comparison pending                            |
| Compact overlays      | Hero/form capped at 260px, desktop return 290/270px, supporting mobile return capped at 320px. Padding 20px and form heading 22px. Removed redundant labels and handoff text.                                                                                                                              | Source fix; actual bounds/crops pending                                                 |
| Identity              | One PatientIdentity component and one inspected portrait sprite cell for Mia in hero, both enquiry replies, task, form and return reply. Zapla petal used for automated business messages and actions.                                                                                                     | Source consistency and asset existence checked                                          |
| Controls              | Enquiry stage controls moved above the thread, outside message cards. No photo overlay contains selectors.                                                                                                                                                                                                 | Source fix; keyboard state tests pending                                                |
| Shared details        | Google wordmark treatment and unselected stars follow Dental; invitation wording now names Mia. Review invitation glass surface stays constant.                                                                                                                                                            | Source comparison; rendered comparison pending                                          |
| Production copy       | Removed every visible illustrative label, repetitive handoff captions and metric disclaimers. Kept sample context in accessible descriptions. External form mechanics moved to FAQ; clinical/booking/cost boundaries retained.                                                                             | Source reviewed                                                                         |
| Claims/pricing        | Checked repository CRM, Follow Up, Reviews, AI Receptionist and Pricing-v3. Follow Through A$399/month, setup from A$1,997; Growth A$699/month, setup from A$2,997; optional AI Receptionist A$199/month, setup from A$997 with 200 Voice AI minutes included. GST/additional usage/custom work qualified. | Current first-party source support; live capability not certified                       |
| States and widths     | Removed page overflow clipping, added 320px layout safeguards, minimum grid widths and compact caps. Offscreen/background timers pause; reduced motion uses final state and no transition.                                                                                                                 | Implementation checked; actual 320/390/768/1024/1440 bounds and interactions unverified |
| Conversion path       | Internal route targets, image assets and enquiry anchor exist. Browser opened https://zapla.io/booking and displayed the booking calendar, timezone and available time options.                                                                                                                            | Destination loaded; no booking submitted or confirmation claimed                        |

The Allied Health preview was opened in the browser again and redirected to Lovable sign-in. No authentication bypass or preview visibility change was attempted. This prevents actual page keyboard, FAQ, normal/reduced motion, image loading, hydration/runtime, screenshot, crop, overlap and bounds checks. Source/type/build checks cannot certify these results.

The booking destination was inspected separately. Its calendar opening is evidence of a working destination, not evidence that a booking or confirmation email completed.

Clinical product suitability, current patient data availability, software connections, real practice outcomes and conversion/ROI remain unverified. The marketing illustrations are sample workflows and contain no real patient testimonial or rating.

### Completion of interrupted revision

The restored source changes also correct two motion details: motion preference is applied after the initial server/client render agrees, and manual phase selections are honoured in reduced motion instead of being forced back to the final phase. CSS still presents all essential content without motion. These are source corrections, not a claim that hydration or interactions were inspected in a live browser.

Overlay width caps were checked for CSS precedence so the common padding rule does not override the mobile caps. Hero/form remain compact and mobile return cards retain their 320px cap. The page-level overflow clipping was removed rather than relied on to conceal an oversized element.

Final production build, TypeScript, page-specific lint and diff checks passed. Existing route/anchor and local photo/avatar asset checks passed. No new browser visual verification was obtained; the sign-in limitation documented above still applies.

## Shorter page revision, 13 October 2026

This is a synced review draft, not rendered visual sign-off. It supersedes the earlier opening-strip and manual-selector descriptions. The user rejected the excessive enquiry height and tiring repetition while approving the human imagery.

### Implemented

- Removed the opening strip that repeated the hero and enquiry benefits.
- Cut the enquiry story from five card surfaces to three. One card groups the automated reply with its conditional follow up; the patient's reply includes the reception outcome. All essential content remains readable, emphasis advances once and holds, and reduced motion presents the final state. Removed the stage selectors.
- Shortened the enquiry heading and supporting copy to one paragraph. The existing diary remains the appointment authority; the FAQ distinguishes a booking link from a confirmed appointment and specifies reply/opt-out/resolution stop rules.
- Shortened the form, return-reminder, feedback, fit and Guided Launch copy. Replaced the repeated three-part benefit list with one cost explanation.
- Reduced enquiry padding, form-photo height and several desktop section gaps. Retained broad photography, open sections, the dark enquiry panel, lavender review scene and sage fit section. Photography and hero assets are unchanged.
- Replaced this page's tall shared AI call demonstration with one local compact callback example showing the caller, AI disclosure, caller response and reception task. Other industries' shared call examples are unchanged. Clinical questions and urgent concerns need the team; AI does not assess urgency.
- Retained the shared ReviewCards component and unselected Google rating stars. Mia uses the same local portrait cell throughout. Photo glass values remain identical to Dental, and workflow emphasis never changes those surfaces.

### Lens assessment

These are provisional editorial/source assessments, not measurements of a rendered result. No whole-page score or 9/10 certification is assigned.

| Lens                           | Rating/status          | Observable evidence and limitation                                                                                                                                                   |
| ------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Copywriting                    | 8.5/10                 | Shorter direct headings, one paragraph per main use case and fewer repeated benefits. Actual wrapping and scan readability pending.                                                  |
| Owner/commercial focus         | 8.5/10                 | Enquiry response and reception workload lead; return reminders remain supporting. No quantified business impact evidence.                                                            |
| Industry customer              | 8.5/10                 | Appointment requests, callback timing and practitioner-approved returns; clinical scope stays human. Patient interviews absent.                                                      |
| Frontline operations           | 8.5/10                 | Replies, form completion and callback details feed reception tasks. Real task routing and exceptions untested.                                                                       |
| Automation logic               | 8.5/10                 | Trigger, conditional follow up, reply, stop rules and human task are explicit. Illustrations are not live acceptance tests.                                                          |
| Art direction                  | Pending render         | Existing human imagery retained and competing card surfaces reduced. Actual crops, dominance and visual comparison remain unverified.                                                |
| Visual hierarchy/rhythm        | Pending render         | Opening strip removed, enquiry heading shortened, compact demonstration and varied section treatments retained. Full-scroll and zoomed-out inspection blocked.                       |
| Brand consistency              | Pending render         | Dental glass properties, typography, palette, shared reviews and root shell retained. Matching source values do not prove photo-backed consistency.                                  |
| Conversion                     | 8/10, editorial        | Hero, workflow anchor, pricing, FAQ and consistent call CTA cover discovery through action. No funnel or conversion evidence.                                                        |
| CFO/value                      | 8/10, editorial        | Plan, Guided Launch, optional AI, usage and custom work distinguished. No verified practice ROI or labour savings.                                                                   |
| Credibility                    | 8/10, editorial        | Prices checked against current repository Pricing-v3; no invented integrations, testimonials, guarantees or results. Live capabilities and data suitability still need verification. |
| Accessibility                  | Pending browser checks | Semantic headings, native FAQs, focus styles, alt text and reduced-motion support remain. Actual keyboard, screen-reader and contrast checks outstanding.                            |
| Responsive                     | Pending browser checks | Tablet/mobile/320px rules and normal-flow mobile overlays retained; no overflow concealment introduced. Actual bounds and overlaps not measured.                                     |
| Motion                         | Pending render         | Short monotonic emphasis, offscreen/background pause and final hold. Shared reviews keep their established reveal treatment. Real timing not inspected.                              |
| Buyer psychology/AI repetition | 8/10, editorial        | Concrete examples and fewer duplicated benefits reduce reading effort. Buyer comprehension and visual fatigue require rendered/user review.                                          |
| SEO                            | Draft status           | Route metadata retained; page remains intentionally noindex for review. No ranking outcome claimed.                                                                                  |

### Validation

Production build, TypeScript, page-specific ESLint and diff checks passed. Local image/font/avatar assets and internal route/anchor targets were checked. Pricing and plan details match current Pricing-v3 source, including optional AI charges and included minutes.

The direct Allied Health preview was opened again on 13 October and redirected to Lovable login. The prior authentication refusal was respected; no access setting or visibility change was made. Desktop/tablet/mobile/320px, image loading, runtime/hydration, FAQ interaction, keyboard, reduced-motion timing, full-page rhythm and rendered comparison with Dental/Mechanics cannot be signed off. The last observed booking calendar opening remains destination evidence only; no booking or confirmation was submitted.

This revision addresses the known length and repetition problems in source. The 9/10 target remains unproven where render access, live product verification, customer evidence or conversion data are required.
