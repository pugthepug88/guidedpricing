# Automation Builder: implementation and review

**Latest revision:** “Click-to-watch AI ideas, 26 October 2026” at the end adds an explicit Watch AI build control and eight distinct examples to the separate AI section. The restored hero, photo overlay, rounded FAQ, silver frame and white nodes remain. Earlier assessments are historical, not owner approval.

**Current correction, 26 October 2026:** the owner rejected the coloured rim/glow, blue message fills, pastel channel highlights and strong beige triggers. The neutral correction at the end supersedes the earlier colour/rim recommendation. All message cards must stay white in every scroll state.

**Subsequent approved scope:** a thin silver frame with faint blue/coral edge reflections, following the owner's “ok go”. The neutral cards and channel treatment stay as corrected. See the final silver-frame entry.


**Historical record below:** the earlier dated sections describe superseded work. Current implementation and rendered evidence are in the final click-to-watch entry.

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


### Final post-sync check

The actual preview was rechecked at implementation commit `ce859899303d30146785a529bd53a98aeeb88700`. Its rendered component contained the measured pin attribute and the corrected two-break headline. On the wide desktop, the canvas measured 664.79px against a 962px viewport, remained pinned at y=102–767px during the construction explanation and showed no horizontal document overflow. The final screenshot was saved as an internal review capture.

The final 834px tablet recheck confirmed the deliberate three-line headline, normal-flow (`data-pin=false`) fallback and the final CTA/sky transition. The final 393px phone recheck confirmed the updated headline, shortened SMS, 14px outcome text and normal-flow fallback; the measured main width and scroll width were both 378px. The alternative branch remains fully present. Earlier lower-page phone and tablet captures still apply because those sections did not change in the finishing commit.

Lovable metadata reported the implementation commit ready, and the rendered route displayed its final source changes. GitHub's Vercel check succeeded for that commit. The historical Lovable build-error cards were still visible, so this record does not represent those as resolved. The last mobile menu-link check hit a browser-service timeout and remains uncompleted; no new navigation defect was established. The remaining preference, narrow-phone and live-product test limits above still apply. No Lovable builder prompt or Publish action was performed.

## Owner correction: animation, scenario and material, 23 October 2026

This revision removes the wait toggle, optional Wait node, Yes/No selectors and “One condition. Two connected paths. Your rules decide.” caption. The retained H1 leads into a real business-field example: urgent repairs update Service priority and create a callback task; planned installations send a floor-plan request and create an assessment task. See the deeper primary-source evidence in `AUTOMATION-BUILDER-EVIDENCE.md`. The node topology represents two alternatives, not one execution taking both paths.

### Reference decisions

- **USE:** legible branching, deliberate negative space and a wide editorial photograph as a change of scale.
- **ADAPT:** Birdeye's grainy neutral material behind smooth frosted panels, using Zapla ink/type, petal and functional blue. The green illustration role was a default and has been reopened by the owner. The supplied blue Inbox scene remains a harmony reference, not a texture to repeat.
- **REJECT:** unnecessary demo controls, an abstract condition, the rejected caption, reused human photography, decorative motion and copying the same section arrangement onto unrelated pages.

### Motion and fallback

The connections draw once when the decision node is substantially visible above the bottom of the viewport. This avoids spending the animation below the fold while a phone visitor reads the introduction. Nodes stay readable throughout. There is no timer loop, execution badge, result counter, interaction or layout movement. The animation briefly emphasizes each connected node and holds the full topology. A neutral connection is always present behind the tracing overlay, including before hydration and without JavaScript. Reduced-motion CSS shows the full diagram without animation. The measured desktop sticky enhancement remains bounded and falls back to ordinary flow whenever the complete scene cannot fit.

### Fresh photograph

`public/concept/automation/site-assessment-v1.webp` is a newly generated 2172 × 724 panoramic scene of an air-conditioning specialist assessing a property with a homeowner. It replaces `trades-office.webp`; the unnecessary reused interface portraits were also removed from this page. The image is an editorial illustration, never a customer endorsement. Generated with the built-in image tool; the exact final prompt is in [automation-site-assessment-prompt.txt](automation-site-assessment-prompt.txt). Web encoding is 208,042 bytes. The native generated scene was inspected for composition, faces, hands, profession, modernity and the human/product role distinction. Rendered desktop/tablet/phone crop checks remain separate.

The human stays focused on skilled assessment; Zapla's diagram shows the administrative follow-through. A laptop-review scene was rejected because it repeats the incumbent and makes the person look responsible for the same administrative work. The wide photo has a quiet left area for copy and the specialist on the right; phone styling moves the caption below the image rather than obscuring a face.

### Review findings so far

| Lens | Source and asset finding; rendered sign-off remains open |
| --- | --- |
| UI/UX | Named rule and two connected steps per branch replace the abstract selector. Primary action text stays at least 14px on phones; no click is needed to understand the tree. |
| Brand / Creative | Local warm stone/graphite grain and smooth glass replace the rejected green. The wide original photo changes scale; existing typography, petal, page spacing, selective deep green and final CTA provide continuity. |
| Product Marketing / Accuracy | The diagram connects customer updates, messaging and team work around a service enquiry. Supplier public inspector supports custom-field equality. No AI triage, instant callback, assignment, completed assessment or waiting-for-plans behaviour is claimed. |
| Conversion / Buyer psychology | The owner can see different service needs receiving different configured next steps. Draft, validation, run history and Guided Launch continue to address control and setup effort. No conversion lift is asserted. |
| SME buyer / Copy | The enquiry type and actions explain a familiar business process without reading a technical manual. The later property question explicitly starts a separate workflow and stays with the human team. |
| Motion | One cause-and-connection idea, no floating, loop, reset or moving layout. Static/reduced-motion content is complete in source; current browser motion states are still unverified. |

### Current technical and visual status

Production build, TypeScript, targeted ESLint, formatting, SEO policy and whitespace checks pass. No dependency, lockfile, Vite config, shared header/footer or unrelated-page change is included. The current build produced updated server output. Code goes through GitHub only; Lovable is read-only and no builder prompt or Publish action was used.

Initial access was blocked: the connected browser timed out, the cloud fallback reached Lovable's sign-in screen and the local server was not reachable by the browser. No authentication was initiated. The original connected browser subsequently recovered, allowing the actual synced draft to be reviewed as recorded below.

### Recovered rendered review

The actual draft displayed the new implementation from `4d4da0f86921a1f16f8f0e2a7a3517e9d75b5a4f`, followed by the text/caption refinements in `670b1773041a9f28bfcd43a9f7656629b5cebd62`. The later animation-trigger change preserves the same static composition. It begins when 75% of the decision node is visible above a 96px bottom margin, rather than when the top of a tall canvas appears.

| Surface | Observed coverage |
| --- | --- |
| Desktop | New hero, complete tree, construction continuation and pinned fit, natural release into the human case, full new photograph, open Guided Launch, FAQ and final CTA/sky transition. The actual main width was 2115px at a 962px viewport height in the later default-window checks. A 1692px-wide, 769px-high check used normal flow; an override produced measured 1781px × 1125px rather than the requested dimensions. Do not label that a 1440px test. |
| Tablet | 834px editor iframe, 819px main content: hero and complete branching canvas. The canvas measured approximately 640px and fitted at y=106–746px with normal flow. This is not a complete new lower-page tablet review. |
| Phone | 393px editor iframe, 378px main content: hero, named rule, both path texts, human-case introduction and full new photograph with both faces visible. Action paragraphs were 14px and their text scroll widths matched their 131px content widths. The main width equalled its scroll width. This is not a complete new lower-page phone review. |

The local grain and smooth foreground contrast were visually inspected, not accepted from source alone. There are no wait/result controls in the rendered canvas. At suitable desktop size the complete tree stayed at y=102–743px while the construction copy advanced, then released before the human chapter. The photo loaded at its native 2172px width and the desktop 3:1 composition and phone crop retained their intended subjects.

Review found and fixed three concrete details: the phone caption joined “people” and “on” when its line break disappeared; the desktop photo caption orphaned “them”; and the SMS made the phone branch unnecessarily tall. An explicit space, wider desktop caption and shorter SMS fixed these without shrinking action text. The final desktop captures show the shortened SMS and corrected two-line photo caption. The final phone reload/caption recheck was interrupted by browser timeouts, so no final whole-phone sign-off is asserted.

The browser reported the trace overlay at its completed state with one animation iteration, and the complete blue topology was visible. Intermediate motion timing and the final decision-entry trigger were source-reviewed; a separate normal-speed motion recording, reduced-motion preference session and JavaScript-disabled session were not completed. Viewport overrides sometimes produced stale or mismatched captures; those were rejected as visual evidence and reset. Editor iframe checks supplied the measured tablet/phone coverage above.

The reply FAQ opened by click and closed with Enter. The final CTA/sky transition was inspected and its Book a Call link was followed to `/booking`. No booking was submitted. GitHub's Vercel check succeeded for the caption/message refinement. Local production build, TypeScript, targeted ESLint, formatting, SEO policy and whitespace checks passed; the final motion-margin refinement was rebuilt too.

The rendered views support the UI/UX, Brand, Copy, Product Marketing, Conversion and SME conclusions above: a named business rule leads to distinct configured work; smooth glass remains readable over local material; original human imagery and varied scale break the product-panel rhythm; Draft/Live, Guided Launch and the consistent call destination retain control and a clear next step. These are design-review findings, not numerical quality scores or conversion evidence.

Remaining limits are full lower-page tablet/phone rechecks, a complete 320px pass, physical-device/cross-browser coverage, assistive-technology testing and live NextGen workflow execution/delivery. Browser interruptions are not treated as site defects or as successful checks. No Lovable builder prompt or Publish action was used. Shared header/footer, other feature work and Platform architecture remain preserved.

### Final live-preview phone extension

After the editor refreshed from its static iframe to `live-preview-panel`, the 393px phone check resumed against `9ca211184896134f55e330307b1fc3e0c2c76d48`. Both complete action columns were captured with the shortened SMS, and the tree measured 712.61px at 378px content width. The fresh photograph was rechecked with both faces visible; the live caption text contained “people on” with its explicit space. The complete Draft/Live and validation/run-history layout, upper Guided Launch, all three launch rows, setup CTA/terms and FAQ introduction were also inspected. The reply FAQ opened; its later Enter/capture check and the final phone CTA view were interrupted by another preview reset. This extends the phone coverage above without asserting an uninterrupted whole-phone sign-off. Full lower-page tablet, 320px and preference/device/live-product limits still apply.

The final source commit's Vercel check succeeded and Lovable reported that commit ready. A limited direct-preview read returned no error/warning log entries; the editor's separate issues banner was not audited or assumed resolved. The main working tree was synchronized with the remote implementation. No additional product code was changed after these checks.


## Superseding accepted-job workflow, 23 October 2026

The owner rejected the urgency/floor-plan logic and blue connection treatment. Previous positive assessments of that business scenario are withdrawn. Source and screenshot checks did not substitute for evaluating whether the decision made commercial sense.

The replacement connects acceptance, preparation, requested customer response and the appropriate next work. It contains ten visible configured steps across a common four-step trunk and three two-step alternatives. READY gives the customer a booking link after updating readiness; HELP and timeout create distinct, specific work for the team. The original HELP reply and matching task continue below. Quote Follow-Up retains ownership of quote chasing. The main headline and final CTA wording are retained.

The stage remains local warm stone/graphite grain with smooth glass. All blue path overlays and blue border flashes are removed; thin neutral connectors explain topology. A short one-shot opacity/material entry follows viewport entry, with complete server-rendered content, reduced-motion fallback and no controls or loops. The taller diagram is in normal flow, avoiding an oversized pinned scene. Phone layout presents labelled alternatives from a common side connection and keeps both actions together; narrow phones stack the two nodes within each alternative.

The newly generated panorama remains appropriate to the installation preparation story and is retained. No additional asset or reused editorial person is introduced. The human example now belongs to the same HELP path, reducing conceptual repetition.

Initial technical checks: TypeScript, targeted ESLint and whitespace checks passed. Build/SEO and actual refreshed-preview rendering are being checked. This entry does not treat the previous two-path captures as proof of the new composition.


### Initial rendered findings and finishing changes

The actual synced preview of `a51bc62dc2fbc936391c189ff580405b9640d3e5` was inspected at a measured 1692 × 769 desktop and in the editor's 834px tablet and 393px phone views (819px/378px content widths). The complete trunk and three alternatives were reviewed across native scroll positions. All ten nodes remain connected in normal flow. The scene measured about 867px on desktop, 872px on tablet and 1167px on phone. These are deliberately scrollable page content, never a pinned oversized canvas. The phone's labelled alternatives each keep their customer update and next action in the same row, without horizontal overflow.

This review produced two finishing changes: removing the redundant three-row construction explanation so the longer process does not create longer supporting copy; and increasing desktop action paragraphs from 13px to 14px. The timeout label becomes the plainer “No READY or HELP / after 2 days” to make the keyword boundary explicit. These final source refinements require a refreshed visual check. Build, TypeScript, targeted ESLint, SEO policy, formatting and whitespace checks pass. Vercel succeeded for the initial implementation commit; Lovable reported it ready and the actual page displayed its new content.


### Final refreshed-preview verification

Final product-code commit: `14490abac1372ae3ccb4f8f00ae822f284c0c9ea`. GitHub's Vercel check succeeded and Lovable reported this commit ready. The actual desktop preview shows the final larger action text, explicit timeout label and removed three-row explanation. A final 393px phone iframe (378px content width) confirmed the same labels, zero construction rows and no overflow in any workflow node, heading or paragraph. The final HELP/timeout rows and transition into the shorter construction copy were visually captured. The canvas remained approximately 1167px in normal flow; no nested or forced scrolling is introduced.

| Review lens | Current finding |
| --- | --- |
| Business logic / SME buyer | Acceptance justifies preparation. READY can lead to customer booking; HELP produces a specific question task; an unconfirmed site is checked before scheduling. These are causally related steps in one process. |
| UI/UX | Four common steps lead to three labelled alternatives. All paths stay present; the phone keeps both actions in each alternative together. The rendered workflow has no text or document overflow at the measured widths. |
| Copy / Product Marketing | The requested keywords are visible in the SMS before they appear as outputs. The timeout wording includes unrecognised replies. Sending a booking link is distinct from a completed appointment. The later HELP question and task match this workflow. |
| Brand / Creative | Zapla type, ink, paper, petal and smooth glass remain. Static local stone grain and restrained connectors provide material depth without the rejected blue path effects. The original panoramic editorial photograph is retained. |
| Conversion / Buyer psychology | The example makes the benefit concrete: preparation moves forward, ready customers can choose a time, and uncertainty becomes specific human work. Draft, validation and run history retain control. The longer diagram is balanced by removing repetitive supporting copy. |
| Motion / AI-slop | One short material entry per visible node/group, no controls, loop, floating decoration, execution badges or invented metrics. Neutral connections remain static. All content exists before JavaScript; reduced motion disables the entry animation. |

The refreshed phone HELP paragraph was checked in the live DOM. A later attempt to capture that section and reopen the revised reply FAQ was interrupted by an editor-preview reset and browser timeout; the mismatched homepage/blank captures were rejected. No completed new FAQ keyboard test or full lower-page responsive pass is claimed. The unchanged editorial photograph and lower-page sections retain prior evidence, not a claim of fresh whole-page verification.

A requested narrow viewport override did not change the measured direct-page width and was reset; it supplies no 320px visual proof. Remaining limits: complete 320px, reduced-motion/JavaScript-disabled browser sessions, normal-speed motion recording, assistive technology, physical/cross-browser devices and live NextGen execution/delivery. These limits do not turn the completed desktop/tablet/phone workflow checks into account acceptance. Shared navigation/footer, unrelated feature work, Platform structure and `/booking` are preserved. Lovable was used read-only; no builder prompt or Publish action was used.


## Superseding compact enquiry hero, 23 October 2026

The owner found the installation workflow too long and visually heavy. Its earlier positive assessment did not establish owner approval. This correction removes six of ten nodes, the installation/keyword/timeout terminology and the secondary construction explanation.

The four-node hero is **New website enquiry → Phone call requested? → Yes: Call the customer task / No: Enquiry received email**. Phone/email preference is established in the trigger before the condition. A task leads to a person making the requested call; an email preference receives a configured acknowledgement. This is understandable across service businesses and does not depend on specialised installation knowledge. A quote-reminder variant was rejected because it duplicates Quote Follow-Up and would need additional timing/context.

The same warm stone grain, smooth glass, large readable type, petal and quiet neutral topology remain. One short reveal introduces each visible step once; the alternatives stay readable and no controls or loop are added. The page uses normal flow. The next chapter is reduced to the callback request and editorial photograph, making the human role clear without another mini workflow. The original photograph belongs to this page and is retained; no existing website photograph is substituted.

Technical and refreshed desktop/tablet/phone checks are in progress. Prior ten-node screenshots do not verify this compact composition. Shared navigation/footer, other feature work, H1, final CTA and `/booking` are preserved.


### Compact hero rendered verification

Implementation commit `a9989fb998bcf15a125885749e27fa907d304943` passed production build, TypeScript, targeted component/route ESLint, formatting, SEO policy and whitespace checks. GitHub's Vercel check succeeded. Lovable reported the commit ready and the actual page displayed the new four-node scene.

The desktop opening was visually inspected at measured 1692 × 825: the complete 538px tree fits in the hero and the opening is about 770px high. Tablet review used the 834px editor iframe (819px content), with the complete approximately 512px tree visible after its native anchor link. Phone review used the 393px iframe (378px content), with the entire approximately 553px tree visible at once, compared with about 1167px for the superseded example. All four nodes, Yes/No labels and both full outcomes were inspected. Document and node/heading/paragraph measurements showed no horizontal overflow. One black/stale tablet capture during a preview reset was rejected; a later full-editor capture provided actual tablet visual proof.

UI/UX and SME review: one familiar stated preference explains both actions, with no specialised installation knowledge or multi-day sequence. Copy/product review: the form establishes phone or email before the condition; the task is a human callback, and the email is only an acknowledgement. Brand/creative review: the existing stone/glass contrast, petal and large type remain legible with more space. Conversion/buyer-psychology review: the visual explains a practical starting workflow without implying automation is complicated; the existing Guided Launch and booking CTAs retain the next step. Motion/slop review: passive one-shot node entry, quiet structural connections, no blue traces, fake controls, metrics, loop or status garnish. All content is present before JavaScript and reduced-motion disables animation.

The changed phone human introduction and start of the callback card were inspected after the workflow: the human responsibility is readable and the additional task diagram is gone. The complete request remains present in source; no fresh full-photo/lower-page check is claimed. The original editorial photograph and lower sections retain their previous checks. This is a scoped rendered review, not a fresh whole-page device matrix or live-product execution test. Separate 320px, reduced-motion/JavaScript-disabled sessions, assistive technology, physical/cross-browser and supplier sending/call execution remain untested. Shared header/footer and concurrent Chatbot work were preserved. Lovable stayed read-only; no builder prompt or Publish action was used.


## Nurture, compact proportions and connected scroll, 25 October 2026

The owner reopened the whole page after rejecting oversized boxes, overly separated sections, a domestic-looking image and weak control/setup content. The four-node design's earlier technical/render checks did not establish visual approval. The new page keeps the main H1 and final CTA while replacing the body story and compositions.

The agreed story is a new-enquiry nurture: an alternative pipeline, form or Nurture-tag event starts a welcome; a two-day wait precedes useful information; another three-day wait precedes an invitation. Email, SMS and WhatsApp are visible configuration choices or combinations. The live AC page was reviewed at its hero, capability transition and branching spotlight, alongside the supplied screenshots. USE its meaningful hierarchy and compact connected steps; ADAPT restrained frame/material depth and pacing into Zapla; REJECT the neon theme, fake metrics, copied claims and pause controls. Its branching illustration is static; no unsupported claim that this graphic itself animates is made.

The opening is one white-canvas chapter. A complete compact board can pin only when its loaded height fits the viewport; two short copy beats focus Day 2 and Day 5, then release into the editorial scene. Progress latches rather than resetting as a customer story, and all text stays visible. Native scrolling, no capture/trap, no nested scrolling or loop. Mobile, short-height, reduced-motion and unavailable-JavaScript layouts use the full board in normal reading order. A short opacity entry supports the initial composition.

Fresh assets were generated with the built-in image tool. The exact selected AC image is the edit source for a quiet background material only; the precise nodes, text, frame and connectors are code. A separate new cast actively checks a colour proof beside a commercial printer, clearly placing the work in a business rather than a home. Both native outputs were inspected for composition, people, hands and usable crop. Web assets are 42,348 bytes (1390 × 1132 material) and 211,698 bytes (2172 × 724 photograph). See `automation-nurture-assets-2026-10-25.md` for complete prompts, mode and project paths. They are not customer endorsements.

Draft/Live, validation and run history are now part of one practical Guided Launch plan rather than two large generic sections. Fewer background changes, a wide real-work scene, open explanatory copy and one deep-green planning surface create rhythm. The shared final CTA and root-owned footer remain.

Initial TypeScript, targeted ESLint, build, SEO and whitespace checks pass. Final rendering, sticky travel/release, responsive crops, typography, controls and asset loading are pending the authorised GitHub-to-Lovable preview sync. No old screenshot is accepted as evidence of the new design. The unrelated cinematic download file in the shared workspace is preserved.

### Nurture revamp: final rendered verification

Product implementation: `a8f739b3a217ab859c867f042f14731ac6f7a33d`; final measured-fit and wording refinement: `ae6b1ab0baff52a0f675fcd908ffbb813c0347c7`. Both had successful Vercel checks and ready Lovable metadata. The actual synced route, rather than metadata alone, displayed the final alternative-trigger label and “Send a welcome” action. The initial review found that an inherited 820px minimum-height media query unnecessarily prevented anchoring even when this smaller board fitted. It was removed in favour of the measured-height guard, width requirement and reduced-motion preference.

| Surface | Actual observed coverage |
| --- | --- |
| Desktop | 1692px page width and 769px viewport height. Complete board: 693.53 × 556.73px, initially y=134–690.73px. Message cards were approximately 74.63, 96.32 and 96.32px high. Native movement to the second and third copy beats held the board at y=100–656.73px and changed the focused card to Day 2 and Day 5 respectively. It then released naturally before the editorial chapter. No horizontal document overflow. Full new panorama, consolidated setup plan, all FAQ rows and final CTA/sky transition were inspected. |
| Tablet | 834px editor iframe, 819px main width. The native sequence anchor brought the complete 754.67 × 557.73px board into view. Normal flow (`data-pin=false`), all three entry events and complete message texts were inspected; main width equalled scroll width. This is an opening/board check, not a fresh full lower-page tablet pass. |
| Phone | 393px editor iframe, 378px main width. Hero, full 350 × 577.42px board, commercial photo crop, setup introduction, complete planning panel, FAQ introduction and channel question, and final CTA/sky transition were inspected. All message paragraphs were 14px; each message card was approximately 96.32px high. The complete board remained normal flow. Heading, paragraph, definition and entry-card checks found no horizontal text overflow; main width equalled scroll width. Both fresh faces and the printer remained visible in the tighter crop. |

The photograph loaded from its new local WebP at native width 2172px. Its desktop panorama and phone `78% center` crop were visually assessed. The channel FAQ opened by click and closed with Enter on desktop and phone. The desktop final Book a Call was followed to `/booking`, then returned; no form was submitted. The phone final link also retained `/booking`. The direct preview is kept open as the deliverable.

| Review lens | Finding grounded in the rendered revision |
| --- | --- |
| UI/UX Director | Three alternative entries merge into one clear timed sequence. The smaller cards fit together, the waits explain timing, and the native anchor exposes the complete board. Pinning is bounded and releases without capturing scrolling. |
| Brand / Creative Director | Warm stone-to-slate grain, smooth glass and the clearer double frame give the board definition. Existing Zapla ink, paper, petal, typography and selective deep green retain harmony. Open copy, one wide commercial photo and the single plan surface vary scale without repetitive bands. |
| Product Marketing Director | Welcome, useful information and invitation are illustrative configured messages. Channel marks are choices or combinations, not a claim that nine messages automatically send. Grouped cards explain a sequence rather than reproducing the vendor editor. No AI triage, automatic preferred-channel routing or universal reply cancellation is claimed. |
| Conversion Director | The visual shows what the owner gains from one enquiry without needing technical vocabulary. One practical setup plan addresses entry, timing and human replies. The separately priced Guided Launch disclosure and consistent booking destination remain clear. |
| Motion Director | Actual native scroll states showed Day 2 and Day 5 emphasis and natural release. One-shot material entry and quiet static connectors avoid the rejected blue traces and controls. All text stays present. No full motion recording or separate browser preference session is claimed. |
| SME buyer | The process reads as welcome now, useful information later, then a clear invitation. It applies across SMEs without air-conditioning urgency, floor-plan requirements, keyword rules or a large decision tree. |
| Buyer psychologist | Clear timing, configurable channels and an agreed reply plan make the workflow feel controllable. The new real-work scene supports the benefit of time for skilled work without fake metrics or an endorsement. |
| AI-slop critic | No invented dashboard results, floating controls, decorative accent bars, recycled people, numbered benefit cards or endless repeated panels. The exact topology and text are code; generated assets supply only material and an editorial business scene. |

Final source checks passed: production build, TypeScript, targeted component/route ESLint, formatting, SEO policy and whitespace. No dependencies, lockfile, shared header/footer, booking route, Platform architecture or unrelated feature implementation was changed. Concurrent Calendars work was preserved while synchronising main. The remaining workspace cinematic download was left untouched.

The screenshot at [nurture-desktop-20261025.jpg](review-assets/automation-builder/nurture-desktop-20261025.jpg) records the final actual opening. It is visual proof of this revision, not an older design or generated mockup. Asset prompts and generation mode are in [automation-nurture-assets-2026-10-25.md](automation-nurture-assets-2026-10-25.md).

Remaining limits: complete lower-page tablet and 320px passes, physical devices/cross-browser testing, assistive technology, separate reduced-motion and JavaScript-disabled browser sessions, and live NextGen execution/delivery. Normal-flow and reduced-motion fallbacks are implemented and source-reviewed. Browser interruptions and stale captures were rejected as proof; no site defect was inferred from them. The editor's independent historical issue cards were not audited or assumed resolved. Lovable remained read-only; no builder prompt or Publish action was used.

## Local workflow colour and luminous rim, 26 October 2026

The owner supplied the current Zapla hero and AC's dark workflow reference, requesting a splash of colour within the small containers and an opinion about a neon border. The existing rendered Zapla hero and current source were inspected. USE colour that distinguishes workflow categories and channels; ADAPT the thin luminous outer edge to the light Zapla page; REJECT the stronger all-over neon halo and separate bright outlines around every node. A monochrome glass-only alternative preserves restraint but remains too uniform for this request. Random colour by day would imply differences the workflow does not establish.

The three alternative starting events share a warm amber glass surface. Messages share cool blue glass, waits use violet, and existing email/SMS/WhatsApp marks gain their own blue/rose/green colour fields. The colours classify actual content rather than inventing a state or adding new icons. A static two-pixel coral-to-blue edge and soft local light separate the board from the page; the necessary connectors remain neutral and no line tracing, border flashing or new animation is added. All labels and accessible channel text remain. The previous scroll progression, copy, photography, card proportions and page structure are retained.

Production build, TypeScript, targeted component/route ESLint, formatting and whitespace checks passed. Refreshed rendered desktop/phone fit, material contrast, the edge/glow strength and anchored emphasis are pending sync and will be recorded below. This is a scoped illustration refinement, not a new product-capability claim or full device certification. No new generated asset is needed.

### Colour refinement: rendered verification

Implementation `20e761b7a65a79023409a743f97d664a11fb9bea` passed Vercel and was reported ready by Lovable. A stale pre-change direct tab was rejected; a fresh direct preview and the actual editor iframe displayed all three new channel classes and the new surface colours. The final screenshot is [colour-rim-20261026.jpg](review-assets/automation-builder/colour-rim-20261026.jpg).

The desktop remained 1692px wide with no document overflow. The two-pixel rim and loaded board measured 693.53 × 559.40px, compared with 556.73px high before this refinement. The message cards retained their approximately 74.63 / 96.32 / 96.32px heights. The board fitted the 769px-high viewport and pinned at y=100px during the Day 2 beat. Its focused card changed correctly to Day 2, then Day 5; all three texts and the category colours stayed present. The local edge and glow were visually judged against the warm page rather than AC's darker surround.

The 834px tablet iframe (819px main) showed the complete 754.67 × 560.40px board in normal flow. The 393px phone iframe (378px main) showed the complete 350 × 580.08px board, with all three message paragraphs still 14px. No measured message/heading/paragraph/trigger overflow or horizontal document overflow was found. The coloured channel marks fit without adding a new message row or increasing the cards. All earlier copy, photo and lower-page checks remain scoped to their dated entries; this colour-only revision did not require another full lower-page device pass.

Text/background contrast calculations for the new opaque channel pairs were Email 6.08:1, SMS 5.83:1 and WhatsApp 5.87:1; wait text 6.92:1. Trigger labels and message body text also exceeded 4.5:1 against the darker tint endpoints. The translucent whole surfaces were additionally inspected in their actual textured composition. Colour supports labels and icons rather than being the only means of distinguishing content.

UI/UX and SME review: entry, send and wait categories are easier to scan without more content. Brand/Creative review: the still coral-to-blue edge is local to the focal board and the paper canvas remains calm; stronger neon was rejected because it would compete with the glass content. Product Marketing and Conversion review: no copy, channel behaviour or business outcome changed. Motion review: no new animation, control or connector treatment; the existing native progression was observed after the size change. Buyer-psychology review: category colour aids orientation without invented urgency/status signals. AI-slop review: no arbitrary colour by day, new decorative icon, bright node outline or pulsing halo. The existing typed workflow and recognised channel symbols carry the meaning.

Remaining limits from the nurture review still apply, including separate reduced-motion/JavaScript-disabled sessions, physical/cross-browser devices, 320px and live product execution. The frame is static, so no additional motion fallback is required. Shared navigation/footer, unrelated pages and the two existing cinematic download files remain untouched. Code was committed through GitHub; Lovable was used read-only with no builder prompt or Publish action.

## Superseding neutral correction, 26 October 2026

The owner rejected the outer coloured rim/neon edge, inconsistent blue-versus-white message cards, pastel email/SMS/WhatsApp highlights and strong beige trigger surfaces. The prior positive colour review did not establish owner approval and its recommendation is withdrawn. The scroll focus had changed the message fill; this created a confusing visual difference between equivalent actions.

The board returns to a neutral slate/white double frame and ordinary shadow. All three message cards use the same solid white fill, including the focused scroll state. Focus keeps a restrained neutral border/shadow instead of changing the fill. Trigger cards use neutral white glass, waits return to neutral grey/white, and the channel labels lose their background fields, padding and chip shape. Only the existing channel symbols retain small colour accents. The texture, workflow logic, copy, motion, photography and page structure remain as before.

This is a CSS-only correction. Formatting and whitespace checks passed; the production build and refreshed rendered verification are recorded below when complete. Earlier colour-rim screenshots are superseded and do not prove this correction.

### Neutral correction: final rendered check

Implementation `855cdc71a35a205d8418c5d5b13d380e9404a353` passed the production build, formatting and whitespace checks. Vercel succeeded and Lovable reported the commit ready. The actual refreshed direct preview displayed the corrected CSS; its board background had the existing texture URL without a gradient rim, and every channel container had a transparent background. The final screenshot is [neutral-correction-20261026.jpg](review-assets/automation-builder/neutral-correction-20261026.jpg).

At 1692px desktop width and 769px viewport height, the board measured 693.53 × 556.73px and still fitted. All three message backgrounds computed to solid `rgb(255, 255, 255)` with no background image at the initial view, Day 2 focus and Day 5 focus. The board held at y=100px during both continuation beats. Message heights remained approximately 74.63 / 96.32 / 96.32px. The stronger shadow/neutral border supplied focus without changing the fill.

The 834px tablet iframe (819px main) showed the complete neutral board and all three white cards in normal flow, with no document overflow. The 393px phone iframe (378px main) showed the full 350 × 577.42px board in normal flow. All three message fills were white, every channel background was transparent, message text remained 14px, and no message/heading/paragraph/trigger or document overflow was found. The actual screenshots confirmed the neon edge, beige trigger tint and pastel label fields were absent, rather than relying only on computed styles.

Review finding: UI/UX and SME comprehension improve through consistent treatment of equivalent message actions. Brand/Creative and AI-slop review remove the rejected excess instead of defending the previous recommendation. Product Marketing, Conversion and Buyer Psychology retain the same understandable nurture logic and booking action without adding visual state meanings. Motion review retains the bounded native progression while keeping every fill white. No claim of owner approval, conversion lift or live workflow execution is made. The unchanged lower page retains its earlier scoped verification, and the previously recorded device/preference/product-test limits still apply. No Lovable builder prompt or Publish action was used.

## Silver frame with confined reflections, 26 October 2026

The owner approved the proposed thin silver frame with a faint blue reflection along one edge and warm coral on the opposite edge. This is a local frame refinement after the neutral correction, not approval to restore the rejected halo, blue cards, beige triggers or channel highlights.

The frame uses a static three-pixel masked metallic band. Two subdued colour reflections are clipped inside that band; there is no coloured outer shadow, blur or animation. The ordinary neutral shadow and inner white hairline remain. CSS feature detection retains a simple neutral border when the masking operation is unavailable. The pseudo-element ignores pointer input and inherits the board's responsive corner radius. It does not change the board's footprint, so the existing measured sticky fit and normal-flow fallbacks remain intact.

All message fills stay solid white and channel container backgrounds stay transparent. No source image, copy, product logic, motion, typography, spacing, photo or lower-page composition is changed. Formatting/build and actual desktop/phone checks are being completed before presentation. The earlier neon-rim screenshot remains superseded.

### Silver frame: rendered verification

Implementation `e15718afcd979be91b398b53d97ba3fc19f3e778` passed the production build, formatting and whitespace checks. Vercel succeeded and Lovable reported it ready. The actual direct preview displayed the masked silver band with both subdued reflections confined to the edge. The computed edge shadow was `none`, mask composite was `exclude`, and pointer events were `none`. The final actual opening is [silver-frame-20261026.jpg](review-assets/automation-builder/silver-frame-20261026.jpg).

At 1692px desktop width and 769px viewport height, the board remained 693.53 × 556.73px. It held at y=100px while Day 2 gained focus, and all message fills remained white. All channel backgrounds remained transparent. There was no document overflow. On the 393px phone iframe (378px main), the complete 350 × 577.42px board remained in normal flow. The masked frame inherited the 22px mobile corner radius. Every message fill was white, message text remained 14px and no measured nested-text or document overflow was found. Both compositions were visually inspected; the edge is metallic, without a surrounding coloured halo.

UI/UX and SME review: the edge separates the workflow surface without changing its hierarchy or equivalent white action cards. Brand/Creative review: the silver base and confined reflections follow the approved material direction, while leaving the page's colour coverage intact. Product Marketing, Conversion and Buyer Psychology: no wording, semantics or interaction changes. Motion review: no new motion or layout movement; the native sticky state remains functional. AI-slop review: no pulsing neon, colour-filled labels or extra decoration inside the workflow. These findings are a scoped design review, not final owner acceptance or a conversion claim.

The feature-detection fallback is source-reviewed; no separate browser without mask support was exercised. Earlier lower-page and tablet coverage remains scoped to the dated entries because those layouts were not changed. Existing narrow-device, preference, assistive-technology and live-product testing limits remain. The concurrent Calendars merge and both cinematic download files were preserved. Source went through GitHub; Lovable stayed read-only and no Publish action was used.

## AI drafting and operational range, 26 October 2026

The owner approved implementing the recommendations after the live-product audit and ActiveCampaign recording comparison. This revision keeps the H1, final CTA, original commercial photograph, white nodes and approved thin silver frame. It adds a written AI request, staged draft construction and an explicit review state. One review beat replaces the repeated Day 2/Day 5 copy. A small contact-preference branch and four unboxed operational event/action examples explain more of the actual feature. Guided Launch describes the agreed setup/review work separately from AI drafting, and the FAQs resolve AI, self-service, triggers, replies and integrations.

Product-code commit: `25f92c39a45599e8c75693feb229988e9e72cf35`. The branch preview was necessary because the connected browser could not reach the local development server. Initial preview commits remained in draft PR #186 while the design was checked. The complete source passed production build, TypeScript, targeted ESLint, SEO policy, formatting and whitespace checks. Cloudflare Workers and Vercel deployment checks succeeded. Current main's Calendar and Chatbot changes, including the approved silver frame, were merged into the branch without rewriting history.

### Rendered coverage and corrections

| Surface | Observed result |
| --- | --- |
| Wide desktop, 1707 × 769 viewport | Final 693.53 × 593.93px board begins at y=134px and fits. The request and all three configured messages are visible together. The silver edge uses mask-composite exclude with no pseudo-element shadow. No document overflow. |
| Standard desktop, 1366 × 768 | Complete 688.10 × 593.93px board fits. Native scrolling holds it at y=100px beside the review beat, focuses Day 2 and then releases before the branching section. All three message fills stay white and all settled opacities equal 1. No document overflow. |
| Short desktop, 1366 × 650 | Measured-fit guard disables pinning. The complete story remains in normal flow and can be reached by ordinary scrolling. No document overflow. |
| Tablet, 834 × 900 | Opening and complete 754.67 × 594.93px board inspected. Normal flow, with all entry alternatives and messages available. No document overflow. This is a targeted opening/board review, not a full lower-page tablet pass. |
| Phone, 390 × 844 | The revision walkthrough covered hero, request, board, review settings, preference branch, operational rows, original print-studio crop, setup introduction, whole review panel, FAQs and final CTA/footer transition. Final AI and reply FAQ wording was rechecked after the source refinements. No document overflow. |
| Narrow phone, 320 × 800 | Targeted hero, complete 633.81px board, review and preference-branch checks. The last refinement reduced branch padding/gap so both Send email and Send SMS labels stay on one 21px line. Final screenshot confirmed aligned action nodes and readable labels. No measured heading/paragraph/definition/strong-text overflow or document overflow. This is not a full lower-page 320px review. |

The first review found low-contrast Draft/review text and an explanatory anchor that did not replay the illustration. Draft moved beside the title on the lighter material; the lower note became white and slightly larger. Clicking “See the draft take shape” now remounts only the illustration and restarts the staged assembly. Immediate observation showed the three message opacities at 0.18, followed by fully visible settled nodes; the connecting merge and wait lines use the corresponding one-shot assembly animation. There is no repeating loop, execution status or implied delivery. The complete static content remains present.

The initial 320px condition made Send email wrap while Send SMS stayed on one line. The final narrower spacing fixed the inconsistency without shrinking the type. The supplied preference is visible before the question; both configured paths stay readable. A later merged silver-frame refinement was preserved and checked on the final preview rather than overwritten by the earlier neutral-border source.

The AI and reply FAQ disclosures opened by click and closed with Enter. All three local sales links retained `/booking`; Plan your first workflow was followed and the actual booking page rendered. No form or email was submitted. The final CTA and shared footer were visually checked on phone. Route metadata retained `noindex, nofollow`; the SEO policy confirmed draft isolation and sitemap exclusion.

### Structured review

These are the implementing author's role-based assessments, not separate independent reviewers, owner acceptance or measured conversion results.

| Review lens | Score | Finding |
| --- | --- | --- |
| UI/UX | 9/10 | The request sits beside its connected draft, one review beat shows an actual setting, and the branch states its input. Fitting desktop anchoring releases naturally; smaller/shorter layouts remain readable. Contrast, replay and narrow label alignment were corrected during review. |
| Brand / Creative | 9/10 | The existing neutral material, confined silver reflections, white cards, Zapla petal/type and original print-studio image remain. Open operational rows and one deep-green review plan provide deliberate variation without another catalogue of coloured cards. |
| Product Marketing | 9/10 | Plain-English AI construction is now visible. Timed nurture, branching and selected operational work explain useful breadth. Draft construction is distinct from a live run, and Guided Launch is distinct from the AI assistant. |
| Conversion | 9/10 | A concrete request reduces the effort needed to understand the product. The owner can see what they review and what setup includes. The separately priced setup disclosure and one-process booking invitation make the next step clear. No conversion-lift claim is made. |
| Motion | 9/10 | Nodes and connections assemble in their causal order once, then hold. The link provides a purposeful replay. The complete composition remains stable; there is no autoplay reset or scroll capture. AC's explanatory pacing informed the sequence without copying its predictive claims or visual theme. |
| SME buyer | 9/10 | Welcome now, useful information later and an invitation are familiar. Quotes, appointments, opportunities and service tickets show practical uses without requiring the buyer to understand a 119-entry palette. |
| Buyer psychology | 9/10 | The example turns a request into something reviewable while retaining owner control. Visible timing, messages and reply planning address uncertainty without invented speed, revenue or reliability figures. |
| AI-slop critique | 9/10 | No fake metrics, task capability inferred from a different object, neon halo, decorative AI sparkles, predictive next-action claim or disconnected control panel. The content and exact topology are code; generated assets remain material and editorial context. |

The five awareness levels are addressed through the page's progression: repeated routine work; a familiar follow-up problem; a visible sequence with timing and conditions; AI construction plus review and broader uses; then setup scope and a concrete sales invitation. They are not five additional sections.

The final actual opening is [ai-draft-20261026.png](review-assets/automation-builder/ai-draft-20261026.png). This is a browser capture of the final product-code preview, not a generated design mockup. The complete audit and tested AI limitations are recorded in the separate knowledge deliverable and the updated capability evidence.

Remaining limits: no independent conversion study, assistive-technology session, physical-device/cross-browser matrix, full lower-page tablet/320px review or separate reduced-motion/JavaScript-disabled browser session. The full static content and preference fallbacks were source-reviewed. Live-product draft generation/configuration was inspected, but no automation was saved/activated, no customer message was sent and no delivery/outcome was tested. Lovable remained read-only; no builder prompt or separate Publish action was used.

## Separate typed AI construction, 26 October 2026

The owner rejected the AI request/build being placed in the hero and the commercial weakness of the Email preferred? section. The previous positive ratings did not establish that the motion matched the brief, and the preference example's commercial assessment is withdrawn. This revision restores the original nurture opening, with the audited correction that it makes no generic Create Task promise. The H1, final CTA, approved silver frame and white message cards remain.

The dedicated AI Flow Builder section now has one job: show a staff member's written request becoming a connected workflow draft. The request types in first; six native steps then appear in sequence, with quiet connections, a final hold and explicit owner review. No customer execution, delivery, successful booking or autonomous activation is illustrated. The preference diagram and four event/action rows are removed. The work photograph carries its white heading over open space, and the FAQ sits inside a large rounded panel.

Final product-code commit: `353f27ad086bf335d715a7c04536c4821443d447`. Production build, TypeScript, targeted ESLint, formatting and whitespace checks passed; Cloudflare Workers and Vercel deployment checks succeeded. Source was based on current main including the approved Calendar/Meeting Rooms change. A draft branch preview was used for rendered QA because the connected browser cannot reach the container development server. Lovable remained read-only.

### Actual rendered checks

| Surface | Coverage and result |
| --- | --- |
| Wide desktop, 1707 × 769 viewport | Restored hero; separate AI scene, request typing, intermediate construction and completed draft; full photo overlay and rounded FAQ composition inspected. No document overflow. |
| Desktop, 1366 × 768 | AI container measured 1254.67 × 637.17px and fitted at y=101–738px. Completed draft had six visible nodes, each at opacity 1. The restored hero's measured pin guard was enabled. |
| Short desktop, 1366 × 650 | Hero pinning disabled; AI container remained in ordinary flow. No document overflow. There is no second sticky or nested scroll inside the AI section. |
| Tablet, 834 × 900 | Complete two-column AI scene measured 754.67 × 592.52px. Request and all six nodes fit together. Hero stayed in normal flow and document width did not overflow. |
| Phone, 390 × 844 | AI scene, complete request, all six draft nodes, photo crop/white heading and FAQ panel inspected. AI container was 330.67 × 818.56px and remained in normal flow. Both faces stayed clear of the photograph's heading. No measured text or document overflow. |
| Narrow phone, 320 × 800 | Targeted AI scene, full request, node labels, photo/heading and expanded FAQ inspected. AI container was 270.67 × 850.86px; its last steps remain reachable by native scrolling. No measured heading/paragraph/strong/blockquote/summary or document overflow. |

The first phone check found that a percentage-of-section start could begin typing while too little of the request was visible. The final start checks the request itself. On the final preview the partly visible request at y=761–926px remained in waiting with zero characters; after scrolling it to y=411–576px, typing began and still showed zero workflow nodes. This verifies the intended request-before-construction order rather than merely seeing a finished diagram.

Replay was checked with an actual pointer click in the visible button, avoiding the browser locator's automatic centring. The final code retained a typed request while offscreen: two observations 900ms apart both showed 114 characters and zero nodes. Returning to the scene resumed construction and reached six fully opaque nodes. Intermediate observations showed typing with no nodes, then building with five nodes, then the complete draft. There is no automatic loop reset. Replay remains a real local control and keeps its button mounted/focusable during the sequence.

The photo's desktop heading sits on the darkened left workspace, away from the people. Phone and 320px crops use a bottom scrim and place the white heading below both faces. The FAQ opened by click and closed with Enter at 320px without overflowing its rounded panel. Shared navigation/footer, existing booking destinations, route and noindex/sitemap policy were not changed. The unchanged Guided Launch and final CTA retain their previous evidence rather than a new full-device acceptance claim.

### Review lenses

These are the implementing author's assessments of this revision, not independent reviewers or measured conversion results. They supersede the prior assessment of the rejected preference/hero-AI composition.

| Lens | Score | Current finding |
| --- | --- | --- |
| UI/UX | 9/10 | Separate sections explain routine execution and AI construction. The request becomes readable before typing starts; native mobile flow reaches every step. |
| Brand / Creative | 9/10 | Existing silver material/white hero cards remain. Deep ink gives the dedicated AI scene contrast; the white photo heading uses existing image space, and the FAQ is deliberately contained. |
| Product Marketing | 9/10 | The scene answers whether a description can create a connected draft. It no longer asks the buyer to find value in an abstract channel-preference condition. |
| Conversion | 9/10 | A concrete request/result reduces uncertainty about building effort, while owner review and paid setup scope remain explicit. No performance lift is claimed. |
| Motion | 9/10 | Actual typing precedes construction, intermediate and completed states were observed, offscreen progress pauses, and the final draft holds until replay. |
| SME buyer | 9/10 | The same familiar enquiry nurture connects the hero's result to the AI request. The buyer can read the complete request and waits without technical branching vocabulary. |
| Buyer psychology | 9/10 | AI produces something the owner can inspect and edit. The illustration preserves agency rather than promising a perfect autonomous workflow. |
| AI-slop critique | 9/10 | No generic preference diagram, invented metrics, predictive claims, neon, fake send button or pastel feature cards. Every node corresponds to the visible request. |

Actual final scene: [separate-ai-section-20261026.png](review-assets/automation-builder/separate-ai-section-20261026.png). This is a browser capture of the product-code preview, not a generated mockup. The supplied AC recording informed the typed-request-to-draft sequence; its dark-neon theme, recommendations and other unsupported claims were not copied.

Remaining limits: no separate reduced-motion or JavaScript-disabled browser session, assistive-technology run, physical/cross-browser matrix, full lower-page tablet/320px pass or independent conversion study. Complete static content and reduced-motion behaviour were source-reviewed. The earlier live-product audit remains scoped to configuration and draft generation, with no activation or message delivery. No Lovable builder prompt or separate Publish action was used.

## Click-to-watch AI ideas, 26 October 2026

The owner accepted the overall page and requested a discoverable Watch action plus eight commercially recognisable examples. The separate AI section now has eight native choice buttons and one player. Selecting an idea changes the written request, connected draft and relevant setup context; Watch AI build replays it. There is no automatic play on scrolling or automatic reset. The full starting draft remains readable until a visitor explicitly starts the animation.

The heading **Build the workflow your business needs.** and own-process support copy communicate flexibility without a literal infinite/unlimited claim. These are prepared website illustrations of audited building blocks, not eight account templates or eight completed live AI/execution tests. Billing, calling, audience and calendar boundaries are recorded in the capability evidence and stated beside relevant examples.

| Choice | Draft steps | Commercial story |
| --- | --- | --- |
| Seven-day nurture | 8 | Four emails across days 0, 2, 5 and 7, with explicit waits. |
| Inactive customers | 4 | Joining a business-configured Smart List starts a two-message reconnection. |
| Overdue invoices | 3 | Billing webhook supplies the overdue event/payment link; email the customer and notify finance in Slack. |
| New customers | 6 | New customer tag starts welcome, getting-started information and a check-in. |
| Flash sale | 4 | Selected audience receives the offer and a reminder before the agreed offer ends. |
| VIP offer | 4 | Selected VIP audience receives early access and an SMS reminder. |
| Requested AI callback | 3 | Callback-request tag, ten-minute wait and the configured AI outbound call action. |
| Appointments | 6 | Confirmed booking, email details and SMS reminders one day/one hour before its time. |

### Rendered and interaction evidence

Product-code revision: `c5362e0a9332f9ad25e2fd481c5aab64909e2ea0`. This merge preserves current main, including the Pipeline and Calendar work. TypeScript, targeted ESLint, formatting, SEO policy, whitespace and production build checks passed. Cloudflare Workers and Vercel preview checks passed on this revision.

All eight selected requests and graphs were inspected in the initial branch preview. The final playback revision was checked again for ready, typing, building and complete states, the longest nurture graph, the appointment graph, and replacing an unfinished reactivation with the invoice graph. Enter activates choices; focus moves to the persistent Watch control; exactly one choice is pressed. The return link goes back to the ideas. No console warnings/errors were captured in the final interaction check.

| Surface | Observed result |
| --- | --- |
| 1707 × 769 | Eight choices in four columns, broad headline/support copy and a complete eight-node nurture player. No document overflow. |
| 1366 × 768 | Complete eight-node graph, full request and Watch control fit within the 620px player. |
| 1366 × 650 | Ordinary page scrolling; the 620px player is not pinned. Keyboard switch during an unfinished run finishes with only the invoice request and three invoice nodes. |
| 834 × 1112 | Choices use two columns; request/player retain two columns with readable text. No choice or document overflow. Final clock reaches eight completed nurture steps. |
| 390 × 844 | Choice grid and AI-call player inspected before the clock-only correction; no clipped labels or document overflow. Pixel layout was unchanged by that correction. |
| 320 × 800 | Appointment request, controls, context and all six connected nodes inspected. Final steps and review remain reachable through native scrolling. No measured text/card/document overflow. Photo overlay also remains readable. |

The first timer accumulated per-character delays under browser inspection. The final implementation derives typing and construction from elapsed active time instead. It cancels replaced runs, pauses when the player is outside the viewport or the document is hidden, and retains the result after completion. During the final browser check, typing had zero visible workflow nodes and the complete nurture had eight. Hidden-tab handling is source-reviewed rather than separately emulated.

Actual screenshots: [Eight ideas](review-assets/automation-builder/click-to-watch-ideas-20261026.png) and [completed click-to-watch player](review-assets/automation-builder/click-to-watch-player-20261026.png). These show rendered source, not generated mockups.

### Review lenses

These are separate assessments by the implementing author, not independent reviewers or measured conversion results.

| Lens | Assessment | Finding |
| --- | --- | --- |
| UI/UX | 9/10 | Familiar business choices lead to one explicit Watch control; selected state, focus and return path are clear. |
| Brand / Creative | 9/10 | Established ink/white treatment, typography and rounded container remain; no new ornamental colour system. |
| Product Marketing | 9/10 | Eight concrete use cases show breadth while the own-process copy explains that the ideas are starting points. |
| Conversion | 9/10 | Visitors can see a relevant request become a concrete draft before deciding to discuss their process. No conversion lift is claimed. |
| Motion | 9/10 | Explicit initiation, typing before nodes, sequential connections, cancellation and a stable hold communicate construction. |
| SME buyer | 9/10 | Names describe familiar work; each draft shows what starts it, timing and next actions. |
| Buyer psychology | 9/10 | The owner can choose, watch, replay and inspect; review before activation preserves control. |
| AI-slop critique | 9/10 | No infinity promise, decorative arrow, fabricated metric, fake live send/call, duplicate example sections or pastel feature cards. |

Remaining limits: no separate OS reduced-motion or JavaScript-disabled browser session, assistive-technology session, physical-device/cross-browser matrix, fresh full lower-page review or independent conversion study. Static and reduced-motion fallbacks were source-reviewed. The website invokes no live AI, messages, calls, billing events or Slack actions and collects no visitor input. Lovable stays read-only, with GitHub supplying the source update; no separate Publish action was used.

