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
