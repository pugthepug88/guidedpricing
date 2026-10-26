# Pipeline Management review

Review date: 23 October 2026 (Australia/Sydney).

## Scope and baseline

- Repository: `pugthepug88/guidedpricing`.
- Main baseline verified before this review: `18033fe13f82f19403e19f48c4f945d6a422f26d`.
- During the final fetch, main advanced to `5d6226ad5715426d1ef7f060179182fa744bdf79` with Websites, Funnels & Forms. All seven concurrent files, including shared navigation and route additions, were imported and preserved unchanged. The combined source was rebuilt successfully before committing Pipeline.
- Main subsequently advanced to `8c5b6e4f53c37a83d79fb7747181eae51b81804c` with the Chatbot redesign and appended shared guidance. Those four files were preserved, the new corrections were read, and the Pipeline entry was appended after the current brief rather than overwriting it. The new complete-story fallback guidance was applied to Pipeline before the final build.
- The final full-build integration baseline is `9098a5f830dfd470912c208fc8c4d5364b03d1d5`, preserving the new Automation Builder page and Chatbot hierarchy refinement. Pipeline’s workflow bridge now links directly to `/features/automation-builder`. Its new evidence ledger was checked and agrees with the bounded stage-trigger/task claim used here.
- The commit is based on current main `26f4250cc1394df94748750d7a8ab8d9fc96bd0b`. The final two concurrent commits added Websites review documentation and changed two Chatbot-only CSS declarations. Their patches were inspected and preserved; they do not affect Pipeline or invalidate its completed build and rendered checks.
- Existing route: `/features/pipeline-management`. Improve this route; do not create another version.
- The existing Pipeline page was a feature-colour experiment, not blanket design approval. Later user instructions and appended corrections supersede its rejected treatments.
- Read in full: `AGENTS.md`, `docs/ZAPLA-WEBSITE-BUILD-PROTOCOL.md`, `docs/ZAPLA-WEBSITE-DESIGN-GUARDRAILS.md`, `docs/FEATURE-PAGES-BRIEF.md`, and the supplied `DO-NOT-BE-A-YES-MAN.txt`.
- Read existing Pipeline component and stylesheet, and relevant CRM/Platform evidence. Historical website copy is incumbent context, not a fresh NextGen product acceptance test.
- GitHub is the source of truth. Lovable is read-only. Preserve the shared header, footer and Platform structure. Sales CTAs target `/booking`; calendar embedding remains deferred. No production publication is authorised.

## Original weaknesses

These findings are supported by the baseline source. Root's rendered audit and final verification belong in the sections below.

- Decorative `01/02/03` labels appear in the hero columns, journey selector and Guided Launch, despite the superseding ban on numbered garnish.
- The hero divides attention across three unrelated customers. The later journey repeats a pipeline explanation with Mia, rather than developing one clearly connected opportunity from the start.
- The stage selector changes explanatory text, stage and next-step content, but does not make the human decision or update explicit. It can make a next-action change look automatic.
- The benefits strip, journey headings and editorial text repeatedly promise visibility and clarity. The page needs stronger proof of what is waiting, who is responsible and what the team should do.
- The dark section asserts a specific delayed open-status check and reply pause. Neither follows merely from generic workflow support; current evidence does not verify those exact behaviours.
- The final CTA inherits the page's general heading styling instead of explicitly matching the approved feature-page display typography and petal treatment.
- The section treatment and repeated contained explanations require a whole-page composition and colour review, not another isolated recolour.

## Current product evidence

Evidence was checked on 23 October 2026. Public provider documentation establishes described capabilities; it does not prove account configuration, availability in every commercial package or live execution.

### Sources and provenance

| ID | Official source | Access and evidential role |
| --- | --- | --- |
| H1 | [Pipelines Board](https://app.thenextgencrm.com/help-centre.html?lang=en#/pipelines) | Browser-observed public Help Centre article, including the expanded Timeline due-date FAQ. Manual board use, assignee/status filters, linked records and views. |
| H2 | [Pipeline Types](https://app.thenextgencrm.com/help-centre.html?lang=en#/pipeline-types) | Browser-observed public Help Centre article. Named default stages and ordering. |
| H3 | [Pipeline Fields](https://app.thenextgencrm.com/help-centre.html?lang=en#/pipeline-fields) | Browser-observed public Help Centre article. Configurable record/card fields. |
| H4 | [Contact Profile](https://app.thenextgencrm.com/help-centre.html?lang=en#/contacts/[id]) | Browser-observed public Help Centre article. Owner and connected customer history. |
| H5 | [Automation Builder](https://app.thenextgencrm.com/help-centre.html?lang=en#/automations/[id]) | Browser-observed public Help Centre article. Visual configuration, validation, draft versus published execution and run visibility. |
| H6 | [Dashboard Canvas](https://app.thenextgencrm.com/help-centre.html?lang=en#/dashboard) | Browser-observed public Help Centre article. Deals data source and configurable dashboard aggregates. |
| W1 | [CRM & Pipelines](https://thenextgencrm.com/features/crm/) | Retrieved through web search and opened directly. Corroborates manual progression, contact history and stage-triggered actions. |
| W2 | [Workflows & Automations](https://thenextgencrm.com/features/workflows/) | Retrieved through web search and opened directly. Explicit stage-change trigger, actions, conditions and delays. |

The homepage's Docs/API links returned to its homepage during research. The actual public Help Centre above was accessible in the browser. Search could not retrieve its article content, so Help Centre observations must not be described as web-indexed citations. No customer account was signed into and no CRM data or workflow was changed.

### Capability decisions

| Capability | Finding | Implementation boundary |
| --- | --- | --- |
| Custom stages | Confirmed. Pipeline types allow named default stages and ordering; the board supports stage reordering. H1, H2. | Describe stages matching an agreed business process. Do not infer additional mandatory-stage rules. |
| Responsibility | Confirmed at the level of assigned opportunity team members. H1 includes filtering by assignee. H4 separately documents the contact owner. | Show a responsible person. Do not equate contact owner with opportunity assignee, invent automatic assignment or reproduce an unverified assignment control. |
| Stage movement | Confirmed manual movement between board lanes, with changes saved automatically. H1. | Human action moves the opportunity. Autosaving a manual move is not automatic progression. |
| Filtering | Confirmed title search, item-status and assigned-team-member filters; other documented value filters are unnecessary here. H1. | Useful person/status filtering is supported. Do not invent overdue, unanswered or stale-item presets. |
| Opportunity notes and next action | Confirmed editable notes/fields and linked contacts. H1. H3 supports text, date, datetime and selection fields, including card display. | Present Next action as a configured text field or note that a person maintains. Do not imply a native next-action engine. |
| Dates and views | Confirmed Kanban, Table and Timeline; Timeline includes a lane for items without due dates. H1. | Date context is supportable. Do not turn it into an unverified overdue alert or automated scheduling claim. |
| Customer history | Confirmed activity, messages, notes and pipeline records within the contact profile. H4; W1 corroborates. | Link the opportunity to an established customer question/history. Do not invent AI summaries or automatic cross-channel identity matching. |
| Tasks | W1/W2 document task creation or assignment through configured stage-triggered workflows. A dedicated opportunity task checklist was not established. | Use a manually maintained next-action field in the main scene. Keep any task-creation claim within explicitly configured automation. |
| Workflow triggers | Confirmed pipeline-stage-change trigger, message/task/field actions, conditions and delays. W1, W2. H5 supports workflow configuration and activation. | A stage change can start an agreed workflow. Detailed execution belongs to Automation Builder. |
| Reply pause and still-open check | Not specifically verified by the reviewed documentation. Generic branching/waits do not establish these exact conditions or reply handling. | Remove the old definitive pause sentence and exact delayed open-status demonstration. Do not imply the absence of the capability; omit an unsupported promise. |
| Automatic movement or assignment | Broad homepage marketing language is insufficient to establish the exact behaviour/configuration required here. | Do not claim or demonstrate either. |
| Reporting | H6 supports Deals as a dashboard data source with aggregates, charts and date ranges. Specific conversion, forecast, ageing and stage-analysis reports were not established. | Reporting is bounded evidence, not a proposed marketing section. Do not add invented totals, rates, forecasts or performance claims. |

## Story and interaction boundaries

Pipeline Management owns opportunities and progress. CRM owns the wider customer system; Automation Builder owns workflow execution.

Use one coherent enquiry/quote example to answer four questions: where does it stand, who is responsible, what needs attention next, and what customer history informs the action?

If Mia remains the example, establish her question about removal before showing the answer or agreement. After her explicit acceptance, a visitor-triggered action can demonstrate a person moving the same opportunity into Accepted. A next-action field can then be updated by that person. Make both human actions explicit; do not imply that moving a card automatically creates a task, sends a message or makes a booking.

A person/status filter should reveal a useful management difference, not merely swap names. No invented financial values, counts, conversion rates, scoring, forecast graphics or customer endorsements. Scenes are explanatory marketing illustrations, not live product controls or proof of business outcomes.

## Reference decisions

- **USE:** Zapla's established typography, blue interaction colour, ink/deep-green contrast, approved portrait sheet and brand assets; root-owned navigation/footer; final CTA typography and sky transition.
- **USE:** Current official Help Centre articles for bounded capability claims, and the public workflow page for explicitly listed stage triggers/actions.
- **ADAPT:** Existing Pipeline's stage/owner/customer-context proposition and Mia's concrete quote question. Improve the causal story and make human updates explicit.
- **ADAPT:** The approved feature colour roles as illustration defaults, not a mandatory green theme or repeated layout. Compare rendered current pages for materials and rhythm without copying their composition.
- **REJECT:** Treating the Pipeline experiment as whole-page approval; decorative numbered labels; tiny dashboard filler; tilted cards; arbitrary accent bars; pastel matching-icon benefit cards; unrelated-customer selectors; broad homepage forecasting/scoring claims; legacy GHL behaviour used as NextGen evidence.

## Implemented direction

The eight-section page develops one enquiry into an explicit team action:

1. A broad, dark pipeline overview leads with “See what’s waiting. Know who’s on it.” Mia’s white card is the focal point. Priya and Daniel supply surrounding pipeline context.
2. An open stage map explains the business meaning of custom stages, without decorative numbers or another dashboard.
3. The visitor reveals Mia’s acceptance, moves her opportunity and separately records Ben’s next action.
4. A dark customer-history composition shows the question, quote detail, linked opportunity and responsible person. The approved office photograph adds the team’s working context.
5. A short, warm workflow bridge shows an explicitly configured stage-change-to-task relationship. Workflow execution stays within Automation Builder’s scope.
6. Guided Launch describes stages, people, useful details and the daily routine in an unboxed working plan. It addresses both spreadsheet/inbox users and businesses already using a CRM.
7. Native FAQ disclosures answer practical questions about stages, responsibility, manual maintenance, history, configured workflows, users and existing systems.
8. The final CTA offers to map the buyer’s stages, responsibilities and customer information. It uses the established petal, 40/54/64px display typography and sky/footer transition.

Colour sequence: warm-white opening with a deep-green/moss overview; open white stage map; cool neutral demonstration; deep-green history; warm neutral workflow bridge; white launch; cool neutral FAQ; established warm-white final CTA and sky. There are no successive beige sections, decorative numbered labels, tilted objects, stock-icon benefit cards or invented performance metrics.

### Meaningful interactions

The owner filter changes the actual opportunity set: Ben’s two illustrated opportunities remain and Alex’s item disappears. The Accepted stage remains visible with an accurate empty-state explanation. Returning to Whole team restores the shared picture.

The main sequence has four explicit states:

| State | Stage | Recorded next action | Reason/action |
| --- | --- | --- | --- |
| Waiting | Quote sent | Confirm Mia’s decision | Ben has answered the removal question. |
| Acceptance revealed | Quote sent | Confirm Mia’s decision | Mia says she would like to go ahead. No record changes yet. |
| Stage updated | Accepted | Confirm Mia’s decision | The visitor demonstrates Ben’s manual stage update. |
| Next action saved | Accepted | Arrange an installation time | A second explicit action records the next step. |

One persistent action button changes its label and retains keyboard focus. A reset returns the example to the quote. A polite live region describes the state changes. Desktop card movement lasts 0.5 seconds and only follows a deliberate stage action. There is no autoplay, scroll-controlled state progression or forced scrolling. The reduced-motion hook disables layout animation and the CSS removes transitions. At tablet/phone widths the nearby compact record carries the same current stage, responsibility and next action; the larger moving board is hidden to avoid a duplicate explanation.

The complete customer decision and manual updates are also server-rendered as a static story. Hydration enables the filter and step controls; with JavaScript unavailable the full static example remains readable and inactive controls are hidden. Short-height and reduced-motion layouts do not require the sticky board.

The mobile action is immediately after the relevant customer evidence, with the current record below it. Keeping a full record between the newly revealed reply and its action had hidden the reply above the viewport during testing. The final order and scoped scroll-anchoring rule keep the acceptance visible without a programmatic scroll.

### Material copy decisions

- Replace the generic opening and repeated visibility promises with an owner-facing problem and a specific outstanding customer question.
- Preserve the supported custom-stage, responsibility, linked-history, Guided Launch and unlimited-user claims.
- Explain next action as a configurable field or note maintained by a person. Stage movement does not silently change that field or create a task.
- Remove the exact delayed still-open check and pause-on-reply promise. The available evidence supports configured triggers/actions but not those specific conditions.
- Keep the configured workflow bridge short and separate from opportunity tracking. No automatic assignment, automatic stage movement, scoring, forecasting, revenue or conversion claim is introduced.
- Replace the vague closing promise with the concrete purpose of a call: map the buyer’s stages, responsibilities and customer information.

## Rendered verification

The original Pipeline page was inspected in desktop, 834px tablet and 390px phone layouts. Its three equal cards, repeated numbered treatment and long mobile sequence were observed in the browser. The homepage, CRM, Unified Inbox and current AI Chatbot were also inspected as references. The comparison retained shared typography, assets, purposeful surfaces and the final-CTA convention; it did not treat every existing page composition as approved.

The revised page was reviewed in Chrome using the managed local preview and a temporary responsive iframe harness. The harness and local host allowance are QA-only and excluded from the commit.

- **Desktop:** hero, owner filter, all opportunity states, stage definitions, dark history/photo composition, workflow bridge, launch plan, FAQ and final CTA/sky transition were inspected. The white focal opportunity, readable stage labels and original-question history establish a clear hierarchy. The office photograph keeps the person’s face visible.
- **Tablet (834px iframe, 819px content):** hero, stage map and progress content were inspected. The hero retains readable three-lane context, and the story uses a two-column conversation/action layout with a nearby current-state record. The final tablet fallback was rendered with the larger board hidden, avoiding duplicate information.
- **Phone (390px iframe, 375px content):** hero, customer-history scene, workflow bridge, Guided Launch, FAQ and complete opportunity interaction were inspected. The final reveal test placed the whole acceptance message between approximately 149px and 297px within the frame, below the fixed header. The updated stage and separately saved next action were read back from the rendered record.
- **Narrow phone (320px iframe, 305px content):** hero and final CTA/sky transition were inspected. Document width equalled scroll width (305px), and checked headings, buttons and focal opportunity content had no horizontal clipping. The final CTA retained its 40px type and wrapped naturally.

The shared preview service intermittently served the older checkout during this session. Old-page captures were rejected as evidence. New-page observations were checked against the current headline, action labels and state values. This instability is not evidence of a Pipeline implementation defect, but it limits any claim of an uninterrupted end-to-end preview session.

## Interaction and technical verification

- Owner filtering changes the rendered opportunity set and restores it correctly.
- Keyboard Enter advances the persistent action through acceptance, stage update, next-action save and reset. Focus remains on that control while its label changes.
- The stage-only state preserves “Confirm Mia’s decision”; the next explicit action changes it to “Arrange an installation time”.
- The mobile acceptance is visible after reveal, with no forced scrolling. The adjacent record presents the same values as the desktop illustration.
- Native FAQ disclosure opens with Enter and exposes the configured-field explanation.
- A sandboxed iframe with scripts disabled rendered the complete static acceptance, manual stage update and next action at 390px, with no horizontal overflow. Restoring scripts enabled the normal controls, and the acceptance-reveal interaction was tested again successfully.
- All three page sales links target `/booking`; the final CTA was followed and rendered “Let’s talk about your business.” Related links are `/crm` and `/features/automation-builder`. The latter became available through the concurrent main update; its existing route is now used for the workflow bridge. The booking page remains the established email/scheduling-deferred page.
- TypeScript, targeted component ESLint, Prettier and Git whitespace checks pass. The final production build also passed after removing the temporary harness and restoring the unchanged Vite configuration. The build emits existing dependency-level module-directive/chunk warnings; no build error remains.
- No shared navigation, footer, Platform architecture, route registration, robots/indexing behaviour or calendar implementation is changed.

This is marketing-page QA, not live NextGen account acceptance testing. Reduced-motion behaviour was checked in source; the browser session did not offer a reliable preference-emulation control. The official capability evidence does not prove execution in a particular customer account. Live Lovable source sync is checked separately after the GitHub commit; a sign-in wall in this browser is not a successful rendered-preview check.

## Independent lens review

- **Owner/frontline:** the headline and focal question establish what is waiting, who handles it and why the next update is appropriate. The filter narrows actual work rather than swapping unrelated conversations.
- **Product accuracy:** the capability audit found no material unsupported claim after changing the workflow illustration to say that Ben moves an opportunity, not a quote document. Contact owner and opportunity responsibility are not conflated.
- **Copy and buyer psychology:** the example supplies the customer decision before the human action. Guided Launch makes adoption concrete and acknowledges existing systems. The final call has a specific working purpose.
- **Creative and brand:** the Pipeline board, open stages, dark history/photo scene and unboxed plan form a distinct composition. Approved portraits are reused consistently, including Alex’s existing Inbox identity. Rejected numbered and pastel-icon treatments are absent.
- **UI/UX and accessibility:** persistent keyboard focus and the mobile reveal order were material issues found and corrected during review. The simple owner filter, native disclosure, visible focus styles and live status support the meaningful interactions.
- **Motion:** one visitor-triggered card movement explains a real stage change. Tablet/phone and reduced-motion paths retain the information without needing movement.
- **Technical:** the change is scoped to the Pipeline component, its stylesheet and review documentation. Temporary review infrastructure is removed before commit. Main is fetched again before creating a non-forced update so concurrent changes are preserved.

The review does not assign an automatic quality score or imply final design approval. No material blocker was found in the revised views and interactions actually inspected. Remaining limits are the shared preview instability, live-account acceptance testing and the separately reported Lovable sync/render status.

Review URL: https://id-preview--b1bef4bc-7c76-4229-924e-e0e5b64a632b.lovable.app/features/pipeline-management


## Supporting controls, 26 October 2026

The owner supplied current product screenshots for three secondary Pipeline controls and approved a compact supporting treatment rather than another large feature chapter.

- **Custom fields:** the current Pipeline Fields UI supports a field name and type, global or selected pipeline-type association, a “Show on Board Card” setting and a required-field setting. The public card explains this as keeping business-specific details on the opportunity and optionally surfacing a value on the board.
- **Quick actions:** the current Quick Actions UI supports a custom action name, icon and background colour and presents a configurable action beneath those controls. The public card deliberately does not enumerate unverified execution types; it positions the feature as a custom shortcut that keeps repeated work closer to the record.
- **Tags:** the current Pipeline Tags UI supports named, colour-coded tags. The public treatment uses short prepared labels (VIP, Urgent, Install) to demonstrate scanning and prioritisation without making tags a primary reason to buy Pipeline Management.

These controls are intentionally subordinate to stages, responsibility, next action, customer history and route planning. The section heading is “Make the pipeline fit how you work.” It uses three compact white cards with small UI fragments rather than screenshots or another dashboard-sized demonstration. This preserves the page hierarchy and the owner’s “click less” direction while adding credible depth.
