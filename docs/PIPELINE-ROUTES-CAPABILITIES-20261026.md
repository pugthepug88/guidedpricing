# Pipeline and route planning: capability evidence

Checked 26 October 2026 for the authorised full revamp of `/features/pipeline-management`.

## Scope and precedence

The owner rejected the previous Pipeline composition because it did not clearly resemble pipeline stages and supplied actual Zapla interface screenshots plus a route-planning explanation. This reopens the old Pipeline design; its presence on main is not whole-page approval. Preserve the route, shared architecture, booking destination and existing publication constraints.

Read before this record: `AGENTS.md`, the current website build protocol, design guardrails, complete feature-page brief, and the current Automation evidence, especially its **Live product audit and AI drafting, 26 October 2026** correction. Checkout observed before this evidence-only addition: `9a23a0a6015b73ee4ffac0ccc8c98e29c29165b3`. Remote main must still be refreshed before the implementation commit.

This record separates supplied screenshots, direct owner confirmation, official documentation and repository-recorded product observations. It records no live Pipeline acceptance test, route calculation test, route save test, phone handoff test or message/workflow execution.

## Source matrix

| ID | Source | Provenance and useful evidence |
| --- | --- | --- |
| S1 | `/workspace/scratch/31a21d361e63/upload/image(20261026-020752).png` | Owner-supplied screenshot, visually inspected. Actual stage columns, cards, pipeline selector, Pipeline Types/Fields navigation, view controls and Routes entry. Visible test-data values are not marketing proof and should not be copied. |
| S2 | `/workspace/scratch/31a21d361e63/upload/image(20261026-022548).png` | Owner-supplied screenshot, visually inspected. Route item filters for pipeline, stage, due date and assigned user; item selection/addition; Saved Routes; route date, driver, name and start controls; optimisation action. |
| S3 | `/workspace/scratch/31a21d361e63/upload/image(20261026-022616).png` | Owner-supplied screenshot, visually inspected. Route end control, map and distance-unit control. First/last-stop selections do not reveal every alternative start/end option. |
| S4 | `/workspace/scratch/31a21d361e63/upload/image(20261026-022701).png` | Owner-supplied screenshot, visually inspected. Populated route map and Save Route action. The map displays Mapbox/OpenStreetMap attribution. A visible save control is not an independently observed successful save. |
| U1 | Owner's current product explanation | Direct confirmation: select/add jobs from pipelines, optimise a route, and open it on a phone in Google Maps. Driver/date and save controls are separately supported by S2-S4 and H1. Google Maps is owner-confirmed; it was not independently tested or named in the reviewed Help Centre FAQ. |
| H1 | [Pipelines Board](https://app.thenextgencrm.com/help-centre.html?lang=en#/pipelines) | Current public Help Centre article inspected in the browser, including expanded Timeline and Routes FAQs. Board movement, views, filtering, records and the saved route/phone journey. |
| H2 | [Pipeline Types](https://app.thenextgencrm.com/help-centre.html?lang=en#/pipeline-types) | Current public Help Centre article inspected in the browser. Named types and default stages; system-type naming restrictions. |
| H3 | [Pipeline Fields](https://app.thenextgencrm.com/help-centre.html?lang=en#/pipeline-fields) | Current public Help Centre article inspected in the browser. Custom field types, per-type visibility and optional display on cards. |
| W1 | [NextGen homepage](https://thenextgencrm.com/) | Current official web-search retrieval corroborates Route Optimization as a platform inclusion. Its general marketing copy does not prove detailed algorithms, performance or feature parity. |
| W2 | [Workflows & Automations](https://thenextgencrm.com/features/workflows/) | Previously opened official supplier source for stage triggers, conditions, waits and messaging/field actions. Generic task wording is superseded for this page by A1. |
| A1 | [Automation Builder evidence](AUTOMATION-BUILDER-EVIDENCE.md), latest 26 October entry | Current repository record of a separate authorised live-UI audit. Opportunity/member and support-ticket actions were inspected. No dedicated Create Task action appeared in the inspected Actions palette. This research agent read the record; it did not repeat the live audit. |

The screenshot paths identify the supplied originals, not additional tracked repository assets. Help Centre findings are browser observations, not web-indexed article retrieval. No browser actions were performed while writing this evidence-only document; the observations above were collected in the preceding research task.

## Supported capabilities and copy boundaries

| Capability | Evidence | Bounded public-page use |
| --- | --- | --- |
| Recognisable stages | S1, H1 | Show real columns with opportunities inside them. Human movement between stages explains progress. |
| Separate pipelines/types | H1, H2 | Pipelines can represent different processes; types carry named default stages. Do not present illustrative sales/jobs categories as guaranteed preinstalled templates. |
| Stage names/order | H1, H2 | Name and order stages around an agreed process. Avoid unlimited-customisation claims because some system-type names are locked. |
| Board / Table / Timeline | H1; S1/S2 corroborate controls and date lanes | Board groups by stage; Table gives a sortable grid; Timeline uses date-based lanes, including items without a due date. This does not establish a Gantt dependency planner. |
| Assigned people and filters | H1, S2 | Focus on an assigned person's work and relevant item status. The route picker also supports pipeline/stage/date/user filtering. Contact owner, opportunity assignee and route driver are distinct roles. |
| Record details | H1, H3 | Notes, linked contacts and custom fields can explain the work. Text/date/address fields and optional card display support a configured next action, due date or visit address. |
| Route selection | S2, U1, H1 | Choose the pipeline jobs/stops to visit. Selecting items is a deliberate action, not an automatically scheduled run. |
| Route order and save | S2-S4, U1, H1 | Optimise the stop order and save it for a driver and day. Route name is screenshot-confirmed. Do not promise automatic dispatch or driver allocation. |
| Start/end controls | S2, S3 | Configurable start/end controls are visible. Their full option lists are unknown; do not invent depot, current-location or home choices. |
| Phone directions | U1, H1 | The saved ordered stops can be opened on a phone for directions. Google Maps naming relies specifically on U1. The in-app map shown in S4 is not Google Maps. |
| Check-in | H1 Routes FAQ | Documentation describes route job check-in updating the board item. Do not equate check-in with completion or a stage change. Optional supporting breadth, not required page content. |

Recommended bounded route copy: **Choose the jobs to visit, optimise the stop order and save the route for a driver and date. Open it on your phone for directions in Google Maps.** The final sentence's Google Maps provenance is owner confirmation, not independent acceptance testing.

## Manual work, automation and excluded claims

- Dragging a card is a human stage update. Autosaving that move is not automatic sales progression. Updating a next-action field is separate unless a specific configured workflow is supported and explicitly explained.
- Pipeline tracks opportunities/work and progress. CRM owns the wider customer record. Automation Builder owns configured execution. Route planning extends Pipeline for businesses visiting customers; it does not establish a complete field-service suite.
- **Do not retain the old generic Create a follow-up task example.** A1 supersedes earlier supplier-based task claims in the historical Pipeline review. Use a specifically supported message, record update or opportunity/member action where needed; do not relabel an opportunity or support ticket as a task.
- Stage-change triggers remain supported. Do not restore universal pause-on-reply, guaranteed cancellation of waiting messages, automatic assignment, inferred acceptance or an unverified still-open condition. A configured rule and an executed result are different evidence levels.
- No shortest/fastest guarantee, traffic-aware optimisation, capacity/time-window optimisation, live driver tracking, automatic arrival messages, multi-driver allocation, distance/time savings or stop-limit claim is established here.
- No financial totals, conversion metrics, scoring, forecasting or customer results are introduced. Screenshot test data is not evidence of commercial outcomes.

## Reference decisions and verification limits

**USE** the actual screenshots as capability and structural evidence: stage lanes, work cards, date views and route selection/order. **ADAPT** them into readable Zapla marketing scenes using established typography, portraits and purposeful surfaces. **REJECT** copying all application chrome, tiny controls, test values, blanket automation promises or treating every screenshot detail as a design instruction.

Numbered route stops can convey actual visit order; decorative numbered sections remain rejected. If S4's map image is reused, retain its Mapbox/OpenStreetMap attribution. Do not invent an optimisation result or describe an illustrative map as a computed customer route.

The new page still requires rendered desktop/tablet/mobile inspection and meaningful interaction, reduced-motion, link and build checks. This document provides claim boundaries; it is not visual approval, owner acceptance, a live product test or evidence that a route was saved successfully.

## Customisation clarification, 27 October 2026

The public, rendered supplier Help Centre was reread for the owner's visual correction. Pipeline Fields (`https://app.thenextgencrm.com/help-centre.html?lang=en#/pipeline-fields`) explicitly documents named fields, text/number/date/select/address/file and other field types, selectable-field options, per-pipeline-type scope, card visibility and required fields. The six types in the marketing visual are a representative subset, not an exhaustive limit. System type and its Heat pump/Gas/Electric options are prepared business-defined data.

The separate Pipelines Quick Actions article (`https://app.thenextgencrm.com/help-centre.html?lang=en#/pipelines/quick-actions`) explicitly supports Form, Automation, Iframe, Add Tag, Remove Tag, URL, Pipeline, Ticket and Check In action types. It also documents button names/icons/colours, type-specific configuration, role defaults, per-pipeline-type applicability and ordering. This newly checked documentation supersedes the earlier screenshot-only restriction to appearance, without establishing that a live action was executed.

Bounded marketing use: show custom shortcuts for a job form, configured follow-up automation and applying an Urgent tag. The static website does not open a real CRM form, run a workflow or modify a customer. Do not infer an automatic send, an appointment, task creation or a particular workflow outcome. The actual help articles were read in the connected browser because web retrieval/search did not expose their client-rendered contents. No sign-in or private tenant inspection was needed.
