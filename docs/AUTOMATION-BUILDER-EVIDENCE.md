# Automation Builder: evidence and claim boundaries

**Current implementation:** see “Click-to-watch examples, 26 October 2026” at the end. The live-product audit below remains the current capability evidence; historical visual descriptions do not define the latest design. Draft generation and configuration were inspected in the live product; no workflow activation, message delivery or customer outcome test is claimed.

Checked **23 October 2026 (Australia/Sydney)** for `/features/automation-builder`.

This record separates current NextGen supplier documentation, historical Zapla marketing and the configured examples used to explain the feature. Documentation review does not constitute a live account or workflow execution test.

## Current supplier sources

- [Workflows & Automations](https://thenextgencrm.com/features/workflows/): visual builder, named triggers and actions, conditional paths, waits and webhooks.
- [CRM & Pipelines](https://thenextgencrm.com/features/crm/): custom fields, pipeline stage triggers and related actions.
- [Forms & Surveys](https://thenextgencrm.com/features/forms/): forms create or update CRM contacts.
- [Universal Inbox](https://thenextgencrm.com/features/inbox/): conversation history and team use. Inbox channel availability is not evidence of every channel's workflow actions.
- [Help Centre](https://app.thenextgencrm.com/help-centre.html?lang=en): the public page explicitly loads [the English help content](https://app.thenextgencrm.com/help-content/en.json). The retrieved payload contained 183 article keys. Relevant articles are identified below.

The marketing site's Docs, API Docs and Changelog links resolved to its homepage during this review. The separate Help Centre supplied the detailed operator documentation. `docs.getnextcrm.com` and `getnextcrm.com` describe an unrelated WordPress product and are excluded.

## Capability matrix

| Capability | Supplier evidence | Scope for this page |
| --- | --- | --- |
| Visual construction | Help keys `automations/[id]`, `automations/create` | Add and configure triggers, logic and actions; connect their inputs and outputs. |
| Starting events | Workflow feature page; `automations/create` | Contact created and form submitted are documented in both. Pipeline stage changed and message received are explicitly listed on the feature page. |
| Conditions | Workflow feature page; `automations/[id]` | If/else and multiple paths are documented; builder help describes Condition outputs including True and False. Available field operands and comparison operators are not enumerated. |
| Form and contact fields | `contact-fields`, `form-fields`, `forms/[id]/edit`; Forms feature page | Custom choice fields and mapping to contact fields are documented. This does not prove which fields a workflow condition can inspect; no runtime field condition is demonstrated. |
| Waits | Workflow feature page | Wait and delay steps are documented. Exact duration controls, office hours, weekends and timezone behaviour are not established here. |
| SMS action | `automations/create` explicitly names Send SMS and its message configuration | The illustrated outbound action is SMS. It does not imply equivalent workflow support for every inbox channel. |
| Tasks | Workflow feature page; CRM feature page | Creating tasks is documented. Detailed task-node settings were not found. No automatic assignee, deadline, phone call or completion is illustrated. |
| Updating fields | Workflow and CRM feature pages | A workflow can update fields. No unsupported field catalogue is shown. |
| Draft and Live | `automations`, `automations/[id]`, `automations/create` | Draft is inactive; Live runs on its triggers. Returning to Draft is documented, but the effect on already-running or waiting executions is not established. |
| Validation | `automations/[id]`, `automations/create` | Missing configuration or required connections can block saving. This is not proof of business-logic, deliverability or compliance validation. |
| Run history | `automations/[id]/logs` | Per-run and per-step results, errors, timing and additional details are documented. No fabricated dashboard figures are needed. |
| Editing access | `automations/[id]`, `automations/create` | Workflow update permission is required to edit and save; read-only access is described. |
| AI-assisted editing | `automations/[id]` | Natural-language changes to steps and connections are documented. This does not establish autonomous customer decisions. |

## Final configured demonstration

The main illustration shows the business owner configuring **Form submitted → optional Wait → Send SMS or Create callback task**. The visitor chooses the action and whether it happens immediately or after a delay. The selected action changes the connected step and the visible outcome; choosing a delay adds a meaningful wait to the sequence.

These are configuration controls for documented building blocks, not a customer's preference triggering a runtime branch. The timing choice does not reproduce a real duration selector or assert available duration values. Present the scene as a simplified configured example, not a replica of the live builder, an existing customer workflow or an account-tested result.

The task represents work for a person. It does not promise automatic assignment, a due date, an automated phone call or completed work. The SMS uses fixed, configured message text. Neither the selected action nor the message implies AI decisions or an AI-generated answer.

A separate response scene may show **message received → create a review task → a person opens the conversation and responds**. Message received and task creation are documented building blocks; their connection is an illustrative configuration. Do not imply that this event automatically cancels, pauses or changes the original workflow. Do not imply automatic ownership or cross-channel identity matching.

### Rejected field-condition example

An earlier concept used a mapped **Preferred next step** field to select between an SMS and a callback task. That composition was inferred from documented field mapping plus generic branching. A focused check of every string in the four automation help articles found no statement that Condition can inspect contact fields or form values. The only workflow-specific explanation describes True and False connections. Contact Lists documents field-based filters, but those cannot establish workflow operands.

The main demonstration therefore excludes this inferred condition. General conditional branching may still be described within its documented scope; it must not be presented as evidence for the rejected configuration. Using a wait and an owner-selected action satisfies the explanatory purpose without inventing a field comparator or asking the user to resolve a non-blocking product detail.

## Claims excluded or unresolved

- Runtime branching on a submitted or stored customer preference. The exact condition operands and operators remain unverified.
- Automatic stop-on-reply, queued-message cancellation or universal handover behaviour. Run-log help lists `waiting_reply`, but a paused-for-input status does not prove those behaviours.
- Universal channel support for workflow triggers or sending actions.
- Unlimited sending, executions, steps, usage or implementation work.
- Autosave. Create Automation help explicitly states that changes require saving.
- Verified live execution, delivery, performance, response-time or revenue outcomes.
- Specific wait granularity, business-hours scheduling, retries, deduplication and in-flight edit behaviour.

Existing Zapla CRM, Follow-Up, Quote Follow-Up, Reactivation and Pipeline marketing establish page ownership and previously approved messaging, not independent supplier proof. Inherited reply-stop claims do not close the gaps above. No historical GHL capability is transferred to NextGen.

## Exact help article links

- [Automations List: `automations`](https://app.thenextgencrm.com/help-centre.html?lang=en#/automations)
- [Automation Builder: `automations/[id]`](https://app.thenextgencrm.com/help-centre.html?lang=en#/automations/[id])
- [Create Automation: `automations/create`](https://app.thenextgencrm.com/help-centre.html?lang=en#/automations/create)
- [Run Logs: `automations/[id]/logs`](https://app.thenextgencrm.com/help-centre.html?lang=en#/automations/[id]/logs)
- [Contact Fields: `contact-fields`](https://app.thenextgencrm.com/help-centre.html?lang=en#/contact-fields)
- [Form Fields Manager: `form-fields`](https://app.thenextgencrm.com/help-centre.html?lang=en#/form-fields)
- [Form Builder: `forms/[id]/edit`](https://app.thenextgencrm.com/help-centre.html?lang=en#/forms/[id]/edit)
- [Messages: `inbox`](https://app.thenextgencrm.com/help-centre.html?lang=en#/inbox)

Implementation and rendered QA results are to be recorded separately after the page is built. This evidence review does not certify the website preview or the underlying product configuration.

## Superseding branching illustration, 23 October 2026

The owner requested visible branches and a stronger page composition after reviewing the initial implementation. Rechecked the official Workflows feature page and Automation Builder help on the same date. The source still explicitly documents conditional if/else paths and True/False connections, without enumerating the condition operands.

The current illustration uses **Form submitted → optional Wait → Condition → Yes: Send SMS / No: Create a review task**. The visitor supplies the **condition result**, using labelled Yes/No radios. This demonstrates the documented connection semantics. It does not evaluate a form answer, contact field, tag, consent flag, engagement event or invented AI decision. No unsupported business comparator is presented. The wait control adds or removes a documented wait, without asserting a specific duration catalogue or business-hours rule.

Both configured branches and their content remain visible. Selecting an outcome highlights and traces its connecting path; it does not transmit a message, create a task or run NextGen. A task remains work for a person, without assignment or completion claims. The separate later message-received example remains independent of this workflow and does not imply cancellation, pausing or branch changes in the original execution.

This entry supersedes the initial action/timing-only demonstration, but does not resolve the field-comparison and reply-handling limits above. The illustration is a marketing explanation of documented builder behaviour, not live-product acceptance evidence.

## Business-field example and deeper source evidence, 23 October 2026

The owner rejected the abstract condition and unnecessary controls. A deeper check now resolves the missing operand evidence. The supplier app's public HTML explicitly imports [this route manifest](https://app.thenextgencrm.com/_app/immutable/entry/app.DI17g0Sx.js), which maps `automations/create` to [node 27](https://app.thenextgencrm.com/_app/immutable/nodes/27.BNaUmQtw.js). That node imports [the public workflow implementation](https://app.thenextgencrm.com/_app/immutable/chunks/D4OdHGBS.js). No authentication, private API or account data was accessed. These hashed asset URLs may change with future releases.

Retrieved workflow-client SHA-256: `c2c7f1218c21474c6f3486bfb26b9e0567268d530a46513e6756391b39d07b33`.

The inspector selected for action/node type `condition` edits a criteria collection. Its property selector includes standard contact fields, tags and custom fields addressed as `custom.<field id>`. Its operators include `equals`, string comparisons and presence tests, with AND/OR groups. The connection logic gives Condition True and False outputs. This supports a configured customer-field equality comparison, superseding the earlier help-only uncertainty. It does not prove successful execution, form-mapping order or field/action permissions in a particular account.

The current example is **Form submitted → Urgent repair requested? → two alternative paths**. The illustrative form has two enquiry choices, Urgent repair and Planned installation; Enquiry type is mapped to a custom customer field before the condition compares it with Urgent repair. Form mapping is separately supported by the help articles above.

| Result | Connected actions | Purpose |
| --- | --- | --- |
| Yes: urgent repair | Update the custom Service priority field to Urgent; create “Call about the breakdown.” | Record urgency and create the work for a person. |
| No: planned installation | Send the configured SMS requesting a floor plan; create “Prepare the installation assessment.” | Ask for useful detail and create the preparation task. |

The task is created after the SMS action; it does **not** wait for a floor plan to arrive. A person checks available detail. No automatic callback, assignee, deadline, readiness, appointment or completed assessment is illustrated. The business defines its enquiry choices and rules; no AI diagnosis or automatic urgency detection is claimed.

The animation draws the configured topology once, rather than showing one customer executing both paths. Both alternatives remain readable. No visitor controls, execution status, loop, data collection or external action. A later, separate message-received workflow creates a review task for an installation question; it does not imply cancellation or pausing of the original workflow.

The optional Wait node, wait toggle, Yes/No controls and original “One condition. Two connected paths. Your rules decide.” caption are removed. Waits remain a documented optional builder capability in supporting copy. Earlier reply-handling, channel-parity, usage, timing and live-execution limits still apply. Competitor references provide presentation evidence only.


## Accepted-job preparation workflow, 23 October 2026

The owner rejected the urgency/floor-plan split as commercially incoherent and requested a longer automation with no blue lines. That example is withdrawn. A quote-reminder sequence was considered but rejected as the main example because it would duplicate Quote Follow-Up. The replacement demonstrates a connected preparation process after acceptance, rather than adding unrelated actions to the previous split.

**Configured pipeline stage changes to Quote accepted → send installation checklist by email → send an SMS asking for READY or HELP → wait for an SMS reply, up to two days.** The three configured outputs lead to:

| Output | Customer update | Next action |
| --- | --- | --- |
| READY keyword | Custom Site readiness field = Ready | Send an SMS containing the business's configured installation booking link. The customer still chooses and makes the booking. |
| HELP keyword | Site readiness = Needs discussion | Create “Discuss the preparation question.” A person reviews the original message and contacts the customer. |
| Timeout with no matched keyword | Site readiness = Unconfirmed | Create “Confirm readiness before scheduling.” A person checks what is still needed. |

This is a marketing illustration of a configuration, not a product screenshot or a claim that a real installation/calendar/quote was created. The named stage is an agreed pipeline stage; acceptance is already recorded before this workflow begins. The email checklist, SMS and calendar link are prepared by the business. No AI-generated checklist, quote acceptance detection, automatic booking, skill-based technician allocation, instant call, assignee, task deadline or completed human response is implied.

### Additional primary-source verification

The same officially imported public workflow implementation linked above explicitly renders the `wait_for_reply` inspector. It provides channel values `all`, `sms` and `whatsapp`, editable `reply_branches` with a `keyword`, and a timeout configured using `duration` plus `minutes`, `hours` or `days`. Connection validation creates `reply-<index>` outputs plus `timeout`. The action palette and inspectors include `send_email`, `send_sms` and `update_contact`. The public Workflows page separately confirms task creation. The custom-field editor and previous field-criteria evidence support the example's named customer field.

The downloaded public client remains SHA-256 `c2c7f1218c21474c6f3486bfb26b9e0567268d530a46513e6756391b39d07b33`; the wait-for-reply inspector is near byte 1,546,000. This is vendor UI implementation evidence, not a server execution or delivery test. The public Help Centre's `calendar` article explicitly documents copying a public booking link and the customer-facing calendar page. The example sends that configured link as message content. It does not assert that sending it books an appointment.

The branch uses **literal configured keywords**, not inferred intent or AI classification. “No matched reply after 2 days” intentionally includes an unrecognised response; the illustration does not silently turn every message into READY or HELP. The site does not promise immediate handling of all other wording, case/punctuation semantics, retries, deduplication, in-flight cancellation or account permissions. Those require account-level configuration and testing. This evidence narrows the earlier unresolved wait/reply limits; it does not establish general stop-on-reply behaviour for unrelated timed workflows.

The later human scene now follows the **same HELP branch**, with the original “HELP. Do we need an electrician before you install the unit?” question and the matching preparation task. It no longer introduces an unnecessary separate workflow or implies that a question is automatically answered.


## Simple enquiry preference workflow, 23 October 2026

The owner found the ten-node installation process too long and heavy. The hero now has only **Form submitted → Phone call requested? → Yes: Create a callback task / No: Send an acknowledgement email**. The form's two contact preferences, phone or email, are visible before the decision. The No branch therefore represents the email preference, not an unexplained absence of urgency or a need for unrelated documents.

This configuration uses the previously verified form-to-contact custom-field mapping, custom-field equality condition, True/False outputs, task creation and Send Email action. A two-choice Contact preference field is mapped before testing Phone. The evidence is the current official form/help documentation and imported public builder client described above. This does not require reply-keyword matching, a timeout, appointment creation, automatic urgency detection or a multi-day sequence. Those capabilities are not withdrawn; they are unnecessary for this introduction.

The callback task is work for a person. It does not place a call, assign a staff member, set a deadline or promise instant contact. The email is a configured acknowledgement, not an automated answer to the enquiry. Sending, field mapping and execution still require account-level setup/testing. The later editorial case shows the original callback request for the team to review; no additional workflow or generated summary is introduced.

The installation/readiness branch, checklist, READY/HELP choices, timing and customer-update nodes are removed from the hero. The secondary construction explanation is removed too. No blue tracing, controls, loop or original rejected caption is restored.


## Nurture sequence and channel choices, 25 October 2026

The owner reopened the whole page and supplied a current builder screenshot with Tag Changed (Added), Pipeline Item Created and Form Submitted. The replacement illustration is one configured nurture sequence: **an agreed pipeline/form/tag event → welcome on Day 0 → wait 2 days → useful information on Day 2 → wait 3 days → invitation on Day 5**. Each message row shows email, SMS and WhatsApp as configuration choices. A row is a concise messaging stage, not a claim that one literal application node automatically sends on every channel. The channels or combination are chosen during setup. No visitor message or account action is submitted.

The example content is: “Thanks for getting in touch. Here’s how we can help.”; “Here’s what’s included, plus answers to the questions we hear most.”; “Ready to talk it through? Choose a time, or reply with a question.” The business supplies its actual message content and links. The screenshot is an illustration of the sequence, not evidence of delivered messages or a customer's response.

### Current primary sources

The official [Workflows page](https://thenextgencrm.com/features/workflows/) still documents visual construction, triggers, messaging actions, conditions and waits. The [English Help Centre payload](https://app.thenextgencrm.com/help-content/en.json), retrieved again on 25 October, contains 183 articles including `automations/create`, `automations/[id]` and `automations/[id]/logs`.

The current public app explicitly imports [app.mXDaSoBh.js](https://app.thenextgencrm.com/_app/immutable/entry/app.mXDaSoBh.js), which imports [node 27.CVDlZdxy.js](https://app.thenextgencrm.com/_app/immutable/nodes/27.CVDlZdxy.js). That node imports [DjnVWOMi.js](https://app.thenextgencrm.com/_app/immutable/chunks/DjnVWOMi.js), the current builder implementation. Retrieved SHA-256: `29b953bd99027af42ef1f2fac55a6b84212d1d4af62a6a1d0b92aedce6db77ad`. The previously recorded D4OdHGBS asset is still retrievable but is not treated as the current import.

The current builder includes `pipeline_item_created`, `tag_changed` with added/removed configuration, form triggers, `send_email`, `send_sms`, `send_whatsapp`, and duration/unit wait settings including days. The WhatsApp inspector includes connected-channel configuration. These support the illustrated building blocks. The supplied screenshot separately supports the entry events. No private account, API, credentials or customer data was accessed.

The three entry cards show alternatives; they do not assert default deduplication, re-enrolment protection or that all three triggers should be enabled for every business. The tag in the illustration is specifically Nurture. Entry rules, connected accounts, channel choices, reply handling and any required exits are agreed before activation. No universal automatic stop-on-reply, queued-message cancellation, automatic booking, AI-generated message, performance result, usage allowance or channel parity is promised. UI/source evidence remains distinct from live account testing.

The page still owns construction and control. Nurture is one explanation of triggers, waits and actions; Follow-Up and Reactivation retain their business-use-case pages. Draft, validation and run history are consolidated with Guided Launch in one practical plan. The commercial photograph is an original generated print-studio scene, not a customer testimonial; full prompts and exact edit-target provenance are in `automation-nurture-assets-2026-10-25.md`.

## Live product audit and AI drafting, 26 October 2026

The owner authorised a read-through of the signed-in Zapla Automation feature and tests of its AI Flow Builder. The current account exposed **42 Triggers, 8 Logic entries and 69 Actions**. Every entry was selected for inspection. These are palette-entry counts, not independently executed features; Add to Flow appears in both Logic and Actions. Account-specific customer names and identifiers are excluded from this record.

The complete reusable knowledge file is **Zapla-Automation-Knowledge-2026-10-26.md**. It records the catalogue, visible settings, AI construction tests, unknowns, claims to avoid, five awareness stages, page recommendations and a suggested demonstration. It is available in the owner's supplied knowledge deliverables rather than copying account observations into this public repository.

### What the live UI resolves

| Subject | Observed configuration | Public-page use |
| --- | --- | --- |
| AI Flow Builder | Conversational construction and edits; a simple six-node nurture generated five connections, real two-day and three-day Waits and draft email content. | Plain-English request → editable connected draft → owner review. |
| Conditions | Criteria with AND/OR groups, property/operator/value and True/False outputs; contact and custom fields available. | An explicitly supplied Email/SMS contact preference can choose between configured paths. No inference of consent or intent. |
| Operational events | Quote, invoice/payment, appointment, pipeline/opportunity and support-ticket trigger settings were inspected. | Show a small selection alongside messaging, rather than treating automation as only a nurture tool. |
| Quote conversion | Convert Quote to Invoice states that it creates a new invoice, marks the quote converted and retains the original quote. | Quote accepted → convert quote to invoice is a configured example, not an executed result. |
| Appointment timing | Date-based waits and appointment-related configuration are present. | A configured reminder before an appointment; no promise of default timing or delivery. |
| Opportunity and ticket work | Opportunity update/member actions and support-ticket member actions were inspected. | Update details or add the people who should handle the work. Do not label these objects as tasks. |
| Reply branches | SMS/WhatsApp keyword branches and timeout settings remain supported by the inspected UI. | Explain explicit reply/exit rules; an ordinary Wait is not evidence of universal stop-on-reply. |

### AI test boundaries

The simple nurture draft correctly represented the requested immediate welcome, two-day wait, useful-information message, three-day wait and invitation. A more complex request involving reply interruption and human handover exposed incorrect node typing and missing or unsuitable connections. A conversational correction was not reliably sufficient. The assistant also incorrectly denied a human-handover capability even though Transfer to Human was visible in the manual palette.

These observations justify showing fast draft construction and human review together. They do not justify “builds every automation perfectly”, autonomous activation, universally correct reply handling or a working handover merely because a node has an appropriate label. No draft was saved or activated, no live customer messages were sent, and no run outcome is claimed.

Some manually selected actions did not expose a distinct configuration surface during inspection, including AI Calendar Booking and Generate PDF. Their existence in the palette is not treated as proof that those actions are ready for a particular implementation. No dedicated Create Task action appeared in the inspected 69-entry Actions palette. This supersedes earlier generic supplier-based task examples for the current page: the public illustration uses concrete opportunity and support-ticket actions instead.

### Current demonstration and commercial boundary

The H1 and final CTA remain approved copy. A written request sits beside the existing Day 0/2/5 nurture. Nodes and their connections assemble once; “See the draft take shape” replays the demonstration. The board is labelled Draft and asks the owner to review messages, timing and connections. Animation illustrates construction, not a customer executing the sequence. All content is available in the server-rendered page; reduced-motion and short/small layouts do not require animation or sticky positioning.

Three entry cards remain alternatives and the channel marks remain configuration choices. The separate Email/SMS branching example assumes the form supplies one of those two preference values. It does not infer consent or claim a universal fallback for missing/other values. The selected operational rows are illustrative configurations requiring the relevant record context, connected accounts and review.

Guided Launch is separately priced initial setup for the agreed process, accounts, messages, rules and review. AI draft generation is a distinct product capability. No unlimited implementation, guaranteed delivery, invented time saving or conversion/revenue result is claimed.

### ActiveCampaign reference verification

The supplied roughly 23-second recording was compared against the live Marketing Automation page. Its opening prompt/suggestion animation and later suggested-action animation were embedded videos observed playing on the live page. The branching graphic was a separate static PNG. This resolves the earlier description of the branching image as if it were the same animation.

Adapt the visible request-to-workflow explanation, compact nodes and deliberate pacing. Retain Zapla's own neutral material, petal, typography and page rhythm. Do not copy AC's predictive/recommendation claims, dark-neon presentation or playback controls. Zapla's demonstration is native page motion with a complete static equivalent, rather than an MP4 dependency.

## Separate AI construction section, 26 October 2026

The owner's correction separates AI construction from the original nurture hero. The dedicated illustration types: “Welcome new form enquiries by email. Send useful information after 2 days, then a booking invitation 3 days later.” It then adds Form submitted → Welcome email → Wait 2 days → Useful-information email → Wait 3 days → Booking-invitation email. This is a prepared representation of the simple draft-construction capability observed in the live audit, not a live AI request or a workflow execution. The visitor supplies no information and no external service is called.

The final draft stays visible for owner review of messages, timing and connections. The invitation sends a configured booking link; it does not itself create an appointment. The hero's email/SMS/WhatsApp marks still show configuration choices, while this separate AI example explicitly requests email. The six nodes do not establish automatic reply interruption or correct complex handover logic.

The preference-condition diagram and four operational rows are removed for commercial clarity, not because their underlying palette evidence was disproved. The hero is restored without the earlier unsupported generic task wording. The work photograph remains an editorial illustration, now with its white heading overlaid; no testimonial or performance claim is added. The existing AI test limitations, usage/configuration boundaries and separately priced Guided Launch scope remain.

## Click-to-watch examples, 26 October 2026

The owner's requested examples use the current live audit's building blocks, with the following boundaries. These are prepared website configurations and were not individually generated/saved/executed in the live product.

| Idea | Configuration shown | Boundary |
| --- | --- | --- |
| Seven-day nurture | Form submitted; emails on days 0, 2, 5 and 7 with waits of 2, 3 and 2 days. | Four touches over seven days, not seven messages or default stop-on-reply. Choose the form, audience and sender. |
| Inactive customers | List Joined on a named Inactive customers Smart List; check-in email, three-day wait, invitation email. | Business-configured list defines inactivity. No AI prediction or universal inactivity threshold. |
| Overdue invoices | Inbound Webhook from billing, email using the supplied payment link, Send Slack Message to finance. | No native Invoice Overdue trigger was present among the 42 inspected entries; the Invoice Status Changed choices did not include Overdue. Do not invent a due-date trigger or invoice-status condition. Billing must supply the event, customer and payment link, with Slack connected for the team step. No paid-state cancellation is demonstrated. |
| New customers | New customer tag added; welcome, two-day wait, getting-started email, five-day wait, check-in. | Tag is applied by the business or an agreed process; every new CRM contact is not automatically a new customer. |
| Flash sale | Manual start for selected contacts; offer email, twenty-hour wait, final reminder in a twenty-four-hour offer. | Audience, offer/link and coordinated sale timing are supplied. No ad, page, discount-code or tracking-campaign creation is claimed. |
| VIP offer | Manual start for selected VIP contacts; early-access email, one-day wait, SMS reminder. | Business chooses VIP qualification and offer. No AI value scoring, automatic purchase detection or purchase exit is implied. |
| AI callback | Callback requested tag added; ten-minute wait; Outbound Call (AI). | Requires the requested callback, configured voice agent, caller ID and destination phone field. No call result, qualification, booking, transcription or human-handover outcome is shown. |
| Appointment confirmations/reminders | Appointment Booked filtered to the configured Confirmed status; email details, Wait Before Calendar Booking at one day and one hour, SMS reminders. | Uses the selected calendar/status/time; equivalent offsets are 1,440 and 60 minutes. No automatic reschedule update, cancellation or timezone guarantee. |

The headline Build the workflow your business needs. and own-process copy communicate flexibility without a literal infinity or unlimited-usage claim. The page retains Draft and review language. No visitor data is collected and no external AI, communications, billing, Slack or calendar service is invoked by the website controls.
