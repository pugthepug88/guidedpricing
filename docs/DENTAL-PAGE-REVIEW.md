# Dental page review after art direction rebuild

Route: `/industries/dental`. Changes go through GitHub. Lovable remains read-only.

This review supersedes the original blanket ratings. The original audit missed abstract copy, missing registration forms and reviews, conflated recall with reactivation, and consecutive left-copy layouts. Those were real defects, not evidence gaps. Ratings are one author’s assessments, not separate expert endorsements.

## Concrete page story

Hero: “You care for patients. Zapla handles the follow-up.” Supporting copy names enquiry replies, registration forms and patients due back.

Six main workflows: new patient enquiries → digital administrative registration → treatment enquiry follow-up → dentist-set recall → inactive patient reactivation → neutral Google review requests. Supporting tasks: confirmations, before-visit information and cancellation alerts. Then software fit, implementation, team pricing, FAQs and a concrete sales-call agenda.

The enquiry uses a callback because dental diary integration has not been verified. It does not imply a completed appointment. Medical histories and treatment consent are not collected in the registration mock. Recall is scheduled from a dentist-set date; reactivation is a separate eligible audience. No universal six-month interval is assumed.

## Workflow audit

| Workflow                                | Trigger/data                                             | Automated action                                            | Stop/exception                                                             | Human owner                                                                    |
| --------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| New enquiry                             | Web enquiry submitted                                    | Acknowledge, capture reply                                  | Patient asks a clinical question                                           | Reception arranges appointment; clinician gives advice                         |
| Registration                            | Agreed pre-visit event and approved form link            | Deliver link, remind, notify                                | Verified submission stops reminders; external link alone is not completion | Reception checks administrative details; clinical system holds medical history |
| Treatment enquiry                       | Practice-approved follow-up status/timing                | Send agreed check-in                                        | Reply or opt-out stops sequence                                            | Team handles questions; clinician handles advice                               |
| Recall                                  | Current dentist-set recall date and booking updates      | Due-date reminder and follow-up                             | Reply, booking or exclusion; booking suppression needs verified update     | Reception arranges visit                                                       |
| Reactivation                            | Eligible inactive list, preferences and current bookings | Invitation and agreed follow-up                             | Reply/opt-out/current booking excluded                                     | Reception continues conversation                                               |
| Reviews                                 | Verified completed visit                                 | Neutral Google review link                                  | No incentives or positive-review screening                                 | Practice approves request; no automatic clinical testimonial publication       |
| Confirmations/preparation/cancellations | Reliable current appointment data                        | Confirmation request, approved information, reception alert | Avoid duplication; team handles exceptions                                 | Reception updates dental diary                                                 |

## Copywriter acceptance checks

All main headings identify a recognisable task or outcome. Removed “Leave the door open. Leave the choice with the patient” and “A relevant invitation. A conversation your team can finish.” Each section explains action, benefit and relevant dependency. No invented ROI, conversion uplift, customer endorsement or clinical result. Recall and reactivation are visibly different. Costs and optional AI are explicit in FAQs and pricing note.

## Art direction and visual checks

The previous 9 for visual quality is withdrawn. The last revision was mechanically alternating text and messages, with one human image and setup wording beside a primary benefit. This revision was assessed against actual full-page homepage, mechanics and Customer Marketing renders and the user's Monday/Clay references.

Composition now changes medium and scale: open enquiry dialogue → large cream registration/photo panel → dark treatment follow-up panel → broad patient/dentist photograph with recall overlay → enclosed sage reactivation panel → layered Google invitation and review screen. Open support/pricing sections and a dark software-fit section retain further rhythm. A large box around every previous section was rejected because it would preserve the repetition. Sticky stacking was considered but not added: these workflows are independent and clear without extending scroll distance or constraining mobile reading.

Google review destination uses a coloured wordmark and five unselected outlined stars, not a fabricated customer score. Completion-trigger/incentive/testimonial guidance was removed from the main sales section and kept in the FAQ. Copywriter review removes setup prose from the benefit story and keeps workflow-specific dependencies in the FAQ/software-fit section.

Two new built-in imagegen assets: `public/concept/industries/dental-registration.webp` (157 KB) and `public/concept/industries/dental-patient-visit.webp` (122 KB). Original generation masters remain in generated_images outside the repository. Prompts: (1) candid woman registering on her phone at home, cream/oak/sage, daylight, right-side subject, no text/UI; (2) patient leaving consultation with a dentist, warm modern practice, natural profile interaction, right-side subjects, no treatment action/text/UI. No testimonial identity or clinical result is implied. Supporting photos lazy-load; the hero remains 128 KB.

Full-page desktop/mobile renders plus detailed form, dark follow-up, recall photograph and Google review views were inspected. Mobile puts copy before its visual and brings overlays into normal flow so faces and messages do not compete on small screens. All visual examples are illustrative, not live product screens. Shared navigation/footer remain root-owned.

All six scenes complete under reduced motion. Normal motion begins only near the viewport, reaches the final state quickly and holds it. The new form sequence was verified at state 2 after 1.2 seconds; the offscreen recall scene remained at state 0. FAQ expands. Full-page desktop/mobile renders and detailed forms/reactivation views were inspected. Widths 320, 390, 768 and 1440 have no document horizontal overflow and no page errors.

## Lens ratings

| Lens                                   | Score                      | Evidence or limitation                                                                                                      |
| -------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Copywriter                             | 9                          | Literal task headings, concrete verbs, no poetic follow-up copy                                                             |
| Dental workflow and automation         | 9 for page coverage        | Seven workflow families; triggers, stop conditions, dependencies and owners documented                                      |
| Product marketing                      | 9                          | Full patient journey; PMS stays authoritative; no replacement pitch                                                         |
| Conversion                             | 8.5                        | Clear benefits, CTA and objections; still no verified dental customer outcome                                               |
| Brand / creative                       | 9 for revised composition  | Three human scenes, varied panel scale, cream/dark/sage palette; compared with existing site renders                        |
| Art direction / whole-page composition | 9 for revised composition  | Six distinct treatments rather than six alternating message cards; review UI visibly represents the feature                 |
| UI/UX                                  | 9                          | Varied compositions, mobile copy first, in-flow mobile photo overlays, stable geometry, native FAQ and focus states         |
| Motion                                 | 9                          | Short causal reveals, offscreen hold/pause and reduced-motion completion                                                    |
| Dental practice owner                  | 9 for page usefulness      | Enquiries, forms, recall, return visits and feedback explicitly addressed                                                   |
| Practice manager                       | 9                          | Implementation cost, existing-system overlap, data ownership and exceptions addressed                                       |
| Reception manager                      | 9                          | Form chasing, patient replies, confirmations and cancellation alerts covered                                                |
| Buyer psychology                       | 9                          | Concrete benefit, clear software continuity, no pressure on treatment decisions                                             |
| CFO                                    | 8.5                        | Pricing extras and setup workload explicit; baseline measurement proposed; actual implementation cost/return still unproven |
| Sales                                  | 9                          | Call agenda asks about current process, useful automations, compatibility and costs                                         |
| Dental software competitor             | 9                          | Existing forms/recall acknowledged; no fabricated deficiency or native connector                                            |
| Healthcare risk                        | 9 for page boundaries      | Minimal administrative mock, no clinical AI claims, no safety/compliance certification                                      |
| SEO                                    | 9 for preview architecture | Descriptive metadata, registered route and navigation; intentional noindex remains                                          |
| AI-slop critic                         | 9                          | Literal dental tasks, no fake statistics, stock tooth motifs or decorative loops                                            |

The request for every lens to reach 9 is not fully met. Conversion and CFO retain 8.5 because their original criteria included actual commercial proof. Relabelling them as design-only scores would change the criteria to obtain the requested number. A real dental pilot is needed to establish staff effort, current-record maintenance, implementation cost and observed results. No testimonial or metric was fabricated.

## Verification

Production build, TypeScript and scoped ESLint pass. This is frontend illustration and marketing copy, not a configured live dental automation. Actual PMS, forms completion, appointment updates, healthcare data handling and review-request configuration need verification during implementation.

Sources previously checked: Ahpra advertising FAQ; Core Practice online forms and automated recall documentation. These establish relevant boundaries and incumbent capabilities, not Zapla outcome proof.
