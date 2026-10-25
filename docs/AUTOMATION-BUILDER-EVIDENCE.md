# Automation Builder: evidence and claim boundaries

**Current implementation:** see “Simple enquiry preference workflow” at the end. It supersedes the heavy installation sequence as well as the earlier rejected examples. Historical sections record previous attempts, not current recommendations. No live execution test is claimed.

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
