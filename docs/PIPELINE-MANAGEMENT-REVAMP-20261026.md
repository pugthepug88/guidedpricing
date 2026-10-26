# Pipeline Management revamp — 26 October 2026

## Status and scope

This record covers the replacement of the earlier Pipeline draft at `/features/pipeline-management`. It is an implementation and review record, not a statement of final owner approval. The earlier page's existence and previous reviews do not establish approval of its composition.

The working checkout was refreshed from main `9a23a0a` to `76f4d6` by fast-forward, preserving concurrent changes, including the other chat's Automation Builder work. The route is preserved. The shared header, footer and Platform structure remain outside this page's redesign.

**Local implementation and verification are complete.** The checked source is ready for its guarded GitHub commit and subsequent Lovable sync. Delivery verification belongs to the final handoff; this pre-commit record does not claim that a live preview has already updated. Production publishing is outside the authorised scope.

## Why the previous composition was replaced

The earlier focal-card hero compressed the product into three stages and gave one oversized customer card most of the attention. A second two-lane demonstration then repeated that customer's progress elsewhere. This made the page look more like a customer/conversation spotlight than a complete pipeline.

The custom-stage definitions, quote-acceptance interaction and linked-history section repeated parts of the same story without supplying a clear overview of the work. The user specifically rejected the pipeline's lack of recognisable stages.

Route optimisation was absent despite being a material capability for teams visiting customers. The new page gives it a substantial, bounded chapter while keeping the general enquiry-and-quote proposition useful to businesses that do not travel.

The old Automation bridge and FAQ also promised task creation. The appended 26 October live-product audit in [AUTOMATION-BUILDER-EVIDENCE.md](AUTOMATION-BUILDER-EVIDENCE.md) supersedes the earlier generic supplier-based task examples. No dedicated Create Task action appeared in the inspected Actions palette; opportunity and support-ticket actions must not be relabelled as tasks.

## Source and reference classification

| Source/reference | Decision | What is retained or changed |
| --- | --- | --- |
| User's actual five-stage Sales Pipeline screenshot, `image(20261026-020752).png` | **ADAPT** | Retain five continuous, equal-status Kanban lanes: Lead, Contacted, Proposal, Negotiation and Closed won. Adapt the content into readable prepared opportunities with people, due dates and next actions. Exclude test data, arbitrary money values and unrelated application chrome. |
| Earlier three-card/focal-card hero and separate two-lane story | **REJECT** | Do not retain the compressed topology or rebuild the page around the same oversized customer card. The decision now happens within the complete board. |
| User's route controls, `image(20261026-022548).png` and `image(20261026-022616).png` | **ADAPT** | Use as evidence for selected pipeline items, route optimisation, driver/date saving and start/end options. They do not establish traffic handling, time savings or automatic dispatch. |
| Actual mapped Sydney route, `image(20261026-022701).png` | **USE** | The source image is retained unchanged at `public/concept/pipeline/routes-product-source.svg`. CSS exposes its map rectangle. Mapbox/OpenStreetMap attribution remains visible. No generated map or simulated optimisation result replaces it. |
| New field-team editorial photograph | **USE** | Fresh fictional coordinator/technician scene beside a modern service van. It supports shared job/customer context and is separate from product proof. It is not a customer testimonial or a software screenshot. Prompt and provenance are in [pipeline-field-team-photo-prompt.txt](pipeline-field-team-photo-prompt.txt). |
| Existing Zapla typography, portrait sprite, petal, final CTA and shared sky/footer | **USE** | Preserve established brand elements. Named interface portraits provide continuity; the new editorial photograph supplies a fresh human scene. |

Capability research distinguishes custom pipelines/stages, card fields, assignment/filtering, manual movement, linked customer history, views and route planning. The Timeline view groups work by due date, including work without a due date. It is not presented as a Gantt chart, forecast or scheduling engine. Historical task wording in the older [PIPELINE-MANAGEMENT-REVIEW.md](PIPELINE-MANAGEMENT-REVIEW.md) is superseded by the current Automation audit and this revamp.

## Eight story beats in six main sections

| Main section | Story beat | Buyer question and demonstration |
| --- | --- | --- |
| Hero and pipeline | **1. A recognisable overview** | Where does the work stand? The H1 and full five-column board make opportunity progress visible immediately. |
| Hero and pipeline | **2. Responsibility and an explicit decision** | Who is responsible, and what changes now? Mia has accepted her quote; the visitor explicitly moves her opportunity from Negotiation to Closed won. |
| Hero and pipeline | **3. The right view of the same work** | How do I review my team or today's work? Board, Table and Timeline use the same records and retain the assigned-person filter. Supporting copy explains custom stages and useful fields. |
| Route planning | **4. Selected work becomes a route for the day** | How does the person going out know the plan? A real route map sits beside selected jobs, a driver and a date; the phone disclosure retains those details. |
| Connected customer context | **5. The details behind the job** | Will the next colleague know what was agreed? A linked customer record shows the original need, the agreed removal detail, the opportunity and its responsible person. Fresh editorial photography gives this context a practical field-work setting. |
| Guided Launch | **6. A process configured with the business** | How will this fit us? Define stages, useful details, access and the daily routine. A compact Automation bridge explains where configured follow-up belongs. |
| FAQ | **7. Practical adoption questions** | Can we use our own processes, views, routes and existing tools? Native disclosures answer bounded questions without inventing integrations or automatic outcomes. |
| Final CTA | **8. Apply the example to the buyer's business** | What would our pipeline look like? The established CTA invites a discussion through `/booking`, followed by the shared sky/footer transition. |

## Material copy and behaviour changes

- **H1:** “See what's waiting. Know who's on it.” is replaced by **“See where every opportunity stands.”** The wording names the practical overview that the complete board now supplies.
- **Hero body:** the initial controls-led description was revised after independent review to: **“Keep enquiries moving without chasing the team for updates. See where each quote or job stands, who's responsible and what needs attention next.”** This gives the owner a business reason to inspect the board.
- **Task claims:** remove the standalone “Create a follow-up task” example and the FAQ task-creation promise. The compact bridge now states that a configured workflow can respond to pipeline events and links to Automation Builder.
- **Next action:** a configured field or note is maintained by the team. Mia's move changes only her stage. Ben Walker remains responsible, the due value remains Tomorrow, and the next action remains Arrange installation time. The page does not imply that the move creates a task, appointment, route or completed job.
- **FAQ wording:** “Does moving a card automatically do the next job?” became **“What happens when I move an opportunity?”** The answer explains the actual state change and the separate role of configured automation.
- **Pricing/setup:** Guided Launch is explicitly the required, separately priced initial setup for a new standard plan, with scope agreed before work begins. Approved unlimited-user/no-per-user-fee wording is retained for both standard plans.
- **Route story:** selected pipeline jobs, optimised stop order, saving for a driver/date and phone directions are now visible parts of the page. Google Maps availability is owner-confirmed. This website illustration does not run the route optimiser or open/test a real saved route in Google Maps.
- **Customer context:** the opportunity remains connected to the wider CRM. This chapter explains the history needed for a conversation or visit rather than repeating another quote-acceptance transcript.
- **Final CTA:** the established heading and typography remain. Supporting copy now includes route planning where the buyer's team visits customers. Sales links go to `/booking`; the calendar embed remains deferred.

The route example is a separate **Service visits** pipeline, rather than an unexplained transformation of the Sales pipeline records. Planning and phone contexts share one constant: Tuesday's visits, 27 October 2026, Alex Chen, and the same four jobs/areas in the same order:

1. Site assessment — Parramatta — Start.
2. Equipment setup — Rhodes — Stop.
3. Service visit — Inner West — Stop.
4. Maintenance check — Sydney — Finish.

These are prepared illustrative job names. No claim is made that the named people or jobs are the source screenshot's actual customers.

## Independent review and incorporated fixes

### Commercial story and product scope

The independent owner/frontline and Product Marketing review recommended a recognisable pipeline first, followed by a substantial route chapter for on-site businesses. The final structure follows that direction without making route dispatch the whole product proposition.

The stale task example was flagged against the newer Automation evidence and removed. Manual progress, configured follow-up, wider CRM history and route planning retain separate roles.

### Source, copy and accessibility review

The final independent source review covered `PipelineManagementPage.tsx`, `PipelineBoard.tsx`, `PipelineRoutes.tsx` and their CSS. It identified three concrete improvements, all incorporated:

- Strengthen the hero body around the owner's need to avoid chasing updates.
- Replace the artificial “automatically do the next job” FAQ question.
- Preserve mobile Table headers in the accessibility tree. The previous `thead { display: none }` rule was replaced with a visually hidden treatment. Explicit table/rowgroup/row/columnheader/cell roles and header associations retain semantics through the mobile block layout.

This is a source-level accessibility correction, not a claim of a completed screen-reader usability audit.

### Render review and responsive adjustment

The implementation owner inspected the rendered page in the viewports recorded below. The tablet route composition was adjusted to keep map and route details beside each other down to 751px, avoiding an unnecessarily long tablet chapter. Below that breakpoint, the ordinary stacked flow remains.

## Completed verification

The implementation owner performed the rendered and interaction checks below. Independent agents reviewed the sources and claim boundaries; they did not independently operate the browser for the final rendered pass.

| Surface/check | Observed result |
| --- | --- |
| Desktop cloud browser, **1348 × 926** | Every chapter inspected, including the complete board, Table, route map and phone handoff, customer/photo composition, Guided Launch, FAQ and final CTA/sky transition. |
| Tablet iframe, **834 × 1000** outer size, **819px content width** after scrollbar | Hero/board, revised side-by-side route scene, human/customer context and setup chapter inspected. No document-level horizontal overflow. |
| Mobile iframe, **390 × 844** outer size, **375px content width** after scrollbar | Hero, native horizontal board, explicit Mia move/result, map, phone handoff, image crop and customer context inspected. No document-level horizontal overflow. |
| Narrow phone iframe, **320 × 844** outer size, **305px content width** | Hero/actions, controls, horizontal board, stacked Table records, lower setup/Automation bridge, open FAQ and complete final CTA/sky inspected. No document-level horizontal overflow. |
| Board/Table/Timeline | All views contain the same prepared records. Table retains Mia's moved stage. Timeline groups the unchanged due dates with No due date first. |
| Assigned-person filter | Alex Chen shows the correct three records. The decision area and live announcement describe Alex's filtered work without announcing Mia as part of that view. |
| Manual stage movement | Mia moves from Negotiation to Closed won. Ben, Tomorrow and Arrange installation time remain unchanged. On a phone the internal board moves horizontally to the destination; the decision/result text remains readable beside the action. No forced page scrolling is added. |
| Route disclosure | Planning and phone views retain the same four jobs, areas, driver and date. Enter on the native summary opens the phone view and preserves keyboard focus on that summary. It invokes no map or route service. |
| Mobile Table accessibility | All five real column headers remain available through the accessibility query. Header associations and explicit table/rowgroup/row/cell semantics remain present while the visual layout stacks. This is not a VoiceOver/NVDA usability audit. |
| No JavaScript | A temporary sandboxed iframe blocked page scripts. The board remained readable with data-enhanced=false; unusable JavaScript view controls were hidden. Native route disclosure opened the phone details. The route FAQ opened with Enter and its answer was visible. Temporary QA files were removed before the build/commit. |
| Navigation | Explore route planning reaches the correct section. Sales CTA reaches /booking and its business-call heading. CRM and Automation Builder links reach the actual corresponding pages and headings. No sales calendar or live form was submitted. |
| Final technical checks | Production build, TypeScript, SEO policy, targeted ESLint, Prettier and git diff whitespace checks passed after integrating current main. Build emitted existing toolchain/dependency warnings without a build failure. |

### Proof screenshots

- [Desktop stage board](review-assets/pipeline-management/desktop-board-20261026.svg)
- [Desktop route planning](review-assets/pipeline-management/desktop-routes-20261026.svg)
- [Mobile board in the 390px responsive frame](review-assets/pipeline-management/mobile-board-20261026.svg)

Screenshots show the actual rendered implementation, not a design mockup. The mobile proof retains its temporary responsive-frame context. The supplied product map is a separate source asset and should not be confused with a screenshot of the marketing illustration.

### Verification limits and delivery gate

Reduced-motion behaviour was reviewed in source: the preference removes Mia's shared layout animation, sets the user-triggered horizontal reveal to instant, and disables scoped CSS transitions/animations. The browser tooling exposed viewport resizing but no motion-preference emulation, so a runtime reduced-motion preference test is not claimed. Content does not rely on motion, timing or sticky positioning.

No actual route optimisation was run. No live-product saved-route journey or opening in the Google Maps app was tested. The phone presentation is an illustration supported by documentation and the owner's Google Maps confirmation. Marketing interaction checks do not establish real-product execution or conversion results.

Before the branch update, refresh GitHub main again and use its exact SHA as the guarded parent. Preserve any concurrent documentation/source changes. Confirm that Lovable receives the commit and that the direct /features/pipeline-management preview shows this implementation. Do not run Lovable builder prompts or production Publish. The final handoff records that delivery result separately.

## Review lenses and practical limits

| Lens | Specific observation |
| --- | --- |
| SME owner | Five persistent stages, named responsibility, dates and next actions answer where the work stands and what deserves attention without fabricated values, totals or forecasts. |
| Frontline team | Different views and the person filter expose useful ways to find the same work. The linked record provides a concrete agreed detail for the next conversation or visit. |
| Product accuracy | Manual movement is explicit. Timeline means due-date grouping. The task promise is removed. Route capabilities are bounded by screenshot evidence and the owner's Google Maps confirmation. |
| Copywriting | The hero now names the problem of chasing updates. The page progresses from overview to action, routes, context and adoption rather than repeating the same reply across several sections. |
| UI/UX and accessibility | Native buttons, select controls and disclosures support the interactions. A named horizontal region preserves the board on small screens. The mobile table header issue is corrected in source. The checked viewport/fallback scope and assistive-technology limit are recorded above. |
| Brand and visual composition | The full board, contained dark route scene and open human/context chapter have different jobs. Fresh photography, existing portraits, established fonts and the final CTA/sky retain continuity. |
| Conversion and buyer psychology | The demo makes the process inspectable and the setup requirement explicit. It avoids financial figures, manufactured performance proof and promises of automatic completion. The final invitation concerns the buyer's actual process. |
| Motion | Mia's visitor-triggered layout move and deliberate horizontal reveal explain a real stage change. There are no timed route simulations or decorative loops. Reduced-motion behaviour is guarded in source; preference emulation was not available in the browser tooling. |
| Technical quality | Dedicated board and route components keep the story data coherent. The route image does not make live map requests; phone presentation is a native disclosure. The final build, types, SEO, targeted lint, formatting and whitespace checks passed. |

No automatic numerical score is assigned. The observations support the implementation's direction; the delivery gate and owner review determine final acceptance.


## Asset delivery packaging

The GitHub connector's binary-blob upload stalled without a successful response. The images and proof screenshots are therefore delivered as self-contained SVG containers using the normal text-tree API. Each container embeds the original WebP, PNG or JPEG bytes, with the same dimensions; a decode-and-compare check confirmed byte identity. There is no raster resampling, redraw, retouching or changed map attribution. The photo and map were rechecked in the browser using the packaged assets before the final commit. This is an asset packaging change, not a new visual direction.
