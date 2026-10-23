# Automation Builder: evidence and claim boundaries

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
