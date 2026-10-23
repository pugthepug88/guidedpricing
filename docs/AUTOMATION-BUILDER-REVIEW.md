# Automation Builder: implementation and review

Reviewed **23 October 2026 (Australia/Sydney)** for `/features/automation-builder`.

This record covers the marketing page, its local rendered preview and the checks completed during implementation. It does not certify a live NextGen account, message delivery or workflow execution. Product sources and claim boundaries are recorded in [AUTOMATION-BUILDER-EVIDENCE.md](AUTOMATION-BUILDER-EVIDENCE.md).

## Page decisions

The page owns how workflows are built and controlled. Follow-Up, Quote Follow-Up and Reactivation retain their business-use-case stories. Seven sections are used: hero with interactive configuration, visual construction, human involvement, Draft/Live and run history, Guided Launch, FAQs and the established final CTA.

The main illustration shows **form submitted → optional wait → send SMS or create callback task**. Changing the action changes the visible step and result; changing the timing adds or removes the wait. These controls configure documented building blocks. They do not claim a runtime branch based on an undocumented contact-field comparator, and they do not send a message or create a live task.

The response scene explicitly continues the SMS example. It shows a separate message-received workflow creating a review task, with the original customer question visible and the response left to the team. It makes no automatic assignment, summary, cancellation or universal stop-on-reply claim. The reply FAQ was tightened to the same scope.

The hero support copy names messages, customer information and tasks instead of restating the term workflow. Timing describes a wait before an action, without claiming particular duration options, office hours or timezone behaviour. Draft/Live, validation and execution history explain actual controls without fabricated dashboard metrics.

## Reference and design decisions

- **USE:** Zapla's established palette, type, petal, portrait sheet, existing editorial photograph, final CTA type and shared sky/footer transition.
- **ADAPT:** Pipeline's muted-green illustration role and the feature pages' purposeful surface depth. The configuration workbench has its own composition rather than repeating the Inbox conversation layout.
- **REJECT:** Historical automation scenes as independent capability proof, decorative nodes and controls, arbitrary metrics, repeated coloured heading fragments and unsupported reply-stop behaviour.

The page alternates an open introduction and green demonstration with white, deep green, cool neutral, white/blue setup and cool-neutral FAQ sections. Shared Platform destinations and footer source are preserved; the Features menu receives only the Automation Builder destination.

## Rendered coverage

| Preview width | Views inspected | Limits |
| --- | --- | --- |
| 1440px iframe | Hero and interactive demonstration, human section, controls, Guided Launch, FAQ and final CTA/sky transition. | A complete desktop capture of the separate visual-construction section was not obtained; that section was inspected at tablet and mobile widths. |
| 834px iframe | All seven section layouts, including the complete visual-construction section and photograph with the person's face visible. | This is a browser preview, not a physical tablet test. |
| 390px iframe | All seven sections, including the construction content, response scene, controls, setup, FAQ and final CTA. | The lower photograph was only partly observed at this width. Full mobile photograph coverage is incomplete. |
| 320px iframe | Hero. | Lower-page narrow-phone inspection was not completed. |

Measured main-content widths were 1425px, 819px and 375px for the 1440px, 834px and 390px iframes respectively. The main element's scroll width matched its client width in those checks. The main photograph loaded. This geometry is supporting evidence, not a substitute for inspecting every nested element or image crop.

The final CTA's responsive word spacing and small demonstration labels were corrected during review. The corrected labels and CTA were inspected in the later tablet and phone captures.

## Interaction checks

- All four action/timing combinations were exercised in the desktop preview before the final small typography fixes.
- After restoring the mobile preview connection, selecting a delay added the Wait step; choosing the task changed the result; ArrowLeft removed the wait by selecting immediate timing.
- The mobile menu opened. Following its Automation Builder link was not completed because the preview subsequently reset to a 404.
- The reply FAQ opened by click at 390px. Keyboard activation of that disclosure with Enter was not completed because of the same preview interruption.
- Booking links point to `/booking` in source. This entry does not claim a completed booking or a newly verified destination journey.
- Reduced-motion CSS was inspected: animation and transitions are disabled, while the full selected state remains available. Browser/OS reduced-motion emulation and assistive-technology behaviour were not verified.

## Review conclusions

| Lens | Concrete conclusion |
| --- | --- |
| UI/UX | Native labelled radio groups change an understandable action and timing result. Tablet/mobile construction content and the principal page states were inspected. Full 320px coverage and the remaining keyboard/navigation checks are still open. |
| Brand / Creative | Approved portraits identify people and the petal identifies Zapla actions. The varied colour sequence, aligned surfaces and established final CTA preserve Zapla's visual language without copying the Inbox layout. Mobile photograph coverage remains partial. |
| Product accuracy | Demonstration claims are confined to documented triggers, waits, actions and builder controls. Field-condition operands, universal channel parity and cross-workflow reply effects remain excluded. This is a configured illustration, not an account acceptance test. |
| Copy | Concrete messages, record updates and tasks establish the proposition. The later SMS response is explicitly conditional on the SMS example, resolving the callback-selection continuity issue. |
| Conversion | The primary next step is a call about one repeatable process, with Guided Launch explaining implementation. CTAs are consistent in source; this review supplies no measured conversion evidence. |
| SME buyer / Buyer psychology | Visible settings, Draft/Live control, validation and run history address the fear of automating the wrong process. Both spreadsheet/inbox and existing-system starting points are covered without a blanket integration promise. |
| Motion | A brief opacity change follows user changes to the configuration. There is no autoplay loop, forced scrolling or decorative motion. Reduced-motion fallback is source-verified only. |
| Technical | The route is scoped, carries `noindex, nofollow`, remains outside `SEARCH_PAGES` and omits `staticData.sitemap: false` so it can remain available to the Lovable selector. Build and interaction verification limits are recorded separately below. |

No numerical lens scores are assigned. These conclusions describe the inspected implementation and its limits, not customer outcomes or an exhaustive browser/device certification.

## Technical and preview status

Final production build, TypeScript (`tsc --noEmit`), targeted component/route ESLint, SEO policy checks and whitespace checks passed after the final corrections and removal of the temporary preview configuration. The build retains existing bundle-size/tooling warnings. The generated route tree contains the new leaf route. No dependency or lockfile changes are included.

Local preview service interruptions sometimes returned a stale baseline or stopped serving the page. Temporarily disabling HMR in the QA copy caused a React preamble error; that temporary change was removed. The service later reset to a 404 during navigation/keyboard checks. Those interruptions did not establish an application defect requiring a page-code fix, but they limit the completed verification.

GitHub `main` was fetched again before committing. Concurrent Websites/Funnels/Forms and AI Chatbot redesign commits arrived during synchronization, so the unpublished Automation change was integrated on top of `8c5b6e4f53c37a83d79fb7747181eae51b81804c`. Both existing and new Features links, route registrations and the latest brief/design corrections were retained. The newer Chatbot remains a draft with verification in progress, not a newly approved visual benchmark. Final commit and Lovable synchronization are reported with delivery. This record does not establish live Lovable selector visibility or production publication. No production publication is authorised for this task.

## Superseding visual redesign, 23 October 2026

The owner rejected the weak presentation of branching and asked for richer visual rhythm while maintaining harmony across Zapla feature pages. This revision supersedes the seven-section layout and its form-like hero workbench. The main headline and final CTA copy are retained.

### Reference decisions

Inspected the supplied ActiveCampaign screenshot and the rendered ActiveCampaign AI Automation Builder and Marketing Automation pages. Also inspected Birdeye's current homepage and Marketing Automation page; the AU homepage redirected to the SG version in this browser. Observed Birdeye's anchored Consolidate/Reason/Act progression and its sticky section navigation, and followed the Marketing Automation workflow anchor. Compared the existing Zapla Automation, Inbox, Pipeline and Chatbot openings with the homepage and Receptionist. The Chatbot received further concurrent changes during this work and remains a draft reference.

- **USE:** legible connected branches with clear starting events and distinct outcomes; actual Zapla fonts, portraits and petal; neutral reading space; shared header/footer and final CTA typography.
- **ADAPT:** ActiveCampaign's generous workflow scale and open/enclosed rhythm; Birdeye's restrained material texture, meaningful panel depth and bounded anchoring. The existing green illustration role is retained, rather than importing either competitor's palette.
- **REJECT:** AC's neon outline treatment and whole-page navy scheme, Birdeye's mascots, dense feature grids, decorative motion, and duplicating the Inbox or Chatbot section sequence.

### Current story and behaviour

Six substantial parts: connected introduction and branching explanation; a separate human-response case with editorial photography; Draft/Live and operational controls; an open, unboxed Guided Launch plan; FAQs; established final CTA and sky/footer transition. This consolidates the redundant construction section and removes the repeated blue setup-card pattern.

The opening diagram remains beside the short construction explanation only on wide, tall screens without a reduced-motion preference. It releases at the end of that chapter. There is no scroll listener, scroll capture, snapping, internal scroll requirement, autoplay or hidden progression. Native scrolling and the complete diagram are the baseline on every screen. Selecting a condition result traces only that path once and changes its outcome emphasis; the alternative remains readable. The optional wait alters the actual illustrated sequence. Native controls are enabled after hydration; both branch outcomes remain in the server-rendered content without JavaScript.

Claim boundaries are recorded in the evidence document. The condition result is supplied by the visitor; no undocumented field comparator is simulated. The task is review work, not a promise of automatic assignment or completion. The reply scene is explicitly after the SMS version and uses a separate workflow.

### Verification in progress

Production build, TypeScript, targeted component/route ESLint, SEO policy and whitespace checks passed for the first redesign implementation. An isolated GitHub branch produced a successful Vercel Preview deployment; rendering it requires Vercel sign-in in this browser. Local development servers could not be reached by either available browser connection, and were not accepted as rendered verification.

The implementation was therefore synced through the authorised GitHub main/Lovable preview workflow for rendered review. The newer Chatbot commits were preserved. Lovable metadata and source reads confirmed the new commit before the direct preview stopped serving the previous implementation; metadata alone is not visual evidence. Final rendered coverage and any fixes will be recorded below.

### Rendered findings and refinements

The actual Lovable preview displayed the new connected diagram and the selected True/False path. The inactive outcome stays readable. Desktop selection changed from Yes to No, and removing the wait changed the sequence and live announcement. The four condition/wait combinations were exercised across desktop and phone checks; ArrowLeft changed the phone's selected result. The phone FAQ opened by click and closed with Enter. The final desktop CTA navigated to the existing `/booking` page and its deferred-calendar message.

Inspected the wide desktop opening, its pinned continuation, natural release into the human section, complete editorial scene, Draft/Live controls, open Guided Launch, FAQ and final CTA/sky transition. Phone coverage used the 393px editor iframe (378px content width with its scrollbar in the measured check), and covered the opening, both branch cards, construction explanation, reply/task, full photograph with the face visible, controls, setup, FAQ, final CTA and the start of the shared footer. Tablet coverage used the 834px iframe and included the opening, branching graphic, construction columns, photograph/reply, controls, setup and FAQ. Browser viewport overrides did not resize the connected window; do not describe these iframe checks as physical-device testing or claim an unperformed 1440px check.

Review produced three refinements: a shorter illustrative SMS and larger phone branch text; a deliberate headline break to avoid the tablet's orphaned final word; a measured height gate for the sticky scene. The height gate uses ResizeObserver plus viewport/preference changes and retains normal flow whenever the complete canvas cannot fit. There is no scroll-position listener. Loaded font changes and viewport resizing therefore cannot force an oversized pinned scene.

| Lens | Finding |
| --- | --- |
| UI/UX | Starting event, optional wait, condition and two outcomes are connected and readable. Native result controls update the selected path. Phone text was enlarged rather than shrinking the complete diagram to fit. |
| Brand / Creative | Local green material texture, aligned white/glass nodes, real portraits and the petal retain Zapla identity. Open photo, dark controls and an unboxed launch plan vary the page's scale and rhythm. |
| Product Marketing / Accuracy | The visitor chooses the documented condition result; no unsupported field operand, channel parity or AI decision is demonstrated. The reply example remains a separate workflow. |
| Copy / SME buyer | Shorter SMS content reduces diagram reading effort. Concrete messages, tasks, Draft/Live and run history explain the builder without turning this into another Follow-Up page. |
| Conversion / Buyer psychology | Visible branching, inactive drafts and run history address control and fear of automating the wrong process. Guided Launch gives a concrete next step and identifies initial setup as separately priced. The final CTA destination was followed. |
| Motion | One selected path traces after input. No autoplay or scene reset. Native page scrolling was observed through the pinned chapter and its release; both outcomes remain available as context. |
| Technical | Route/indexing and shared navigation/footer remain unchanged. Production build, TypeScript, targeted ESLint, formatting, SEO and whitespace checks pass. Contemporary Chatbot commits were preserved. |

Remaining limits: no live NextGen execution or message-delivery test, screen-reader session, separate browser reduced-motion/JavaScript-disabled session, physical-device/cross-browser matrix or complete 320px pass. Reduced-motion and no-JavaScript normal-flow behaviour are implemented and source-reviewed. A transient blank tablet capture interrupted the final CTA capture; its final recheck is recorded separately. Mobile menu opening was observed; the final Features-link click was interrupted by preview refresh/selector failures, so no completed mobile-link journey is claimed here. The unchanged link target is source-verified. Lovable's historical build-error cards remain distinct from its current source/metadata and the rendered route; no Publish action or builder prompt was used.
