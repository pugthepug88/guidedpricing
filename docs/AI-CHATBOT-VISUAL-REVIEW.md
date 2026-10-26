# AI Chatbot colour and visual review

23 October 2026, Australia/Sydney.

## Scope and reason

The owner rejected the blue opening after the earlier scroll redesign. The problem was several consecutive viewports of saturated blue, an oversized headline beside sparse initial conversation content, and inadequate assessment of the whole-site visual rhythm. Earlier implementation verification did not establish creative approval.

Work started from current GitHub main `6af27182e66d0420e6bb9bd4de44e277bb9d57f1`. Read AGENTS.md, the full build protocol, design guardrails, feature brief including later corrections, video/motion brief and supplied DO-NOT-BE-A-YES-MAN.txt. Preserve the established H1, hero supporting copy, final CTA, capability boundaries, architecture, root header/footer and unrelated pages.

## Live reference decisions

Inspected the rendered ActiveCampaign homepage and Marketing Automation page, Birdeye homepage and Chatbot AI page, plus Zapla's homepage, Unified Inbox, AI Receptionist and existing Chatbot opening. Birdeye redirected this browser to its Singapore routes. The observations concern the displayed pages, not an assumption that every regional/versioned page is identical.

| Reference pattern | Decision | Zapla application |
| --- | --- | --- |
| Birdeye's neutral page canvas with large, local visual surfaces | ADAPT | Warm-white Chatbot canvas; concentrate material depth and blue around the exchange, rather than filling the opening with a brand colour. |
| Birdeye's fine material texture and selected textural chapters | ADAPT | Restrained static grain around the opening exchange and in the existing dark setup section. Texture stays beneath the message hierarchy. |
| Birdeye's pinned Consolidate / Reason / Act story | ADAPT | Retain only the short, useful enquiry progression already approved for Chatbot; native scrolling, readable cumulative context and a normal-flow fallback. Reject copying the long pin duration or its architecture diagram. |
| ActiveCampaign's large product demonstrations and clearly visible causal actions | USE / ADAPT | Let customer question, automated reply, agreement and booking supply the proof. Preserve one enquiry rather than rotate unrelated examples. |
| ActiveCampaign's alternating visual emphasis across feature explanations | ADAPT | A connected opening, editorial human section, dark setup chapter, quiet FAQ and shared final CTA. Composition changes for a reason. |
| ActiveCampaign's neon gradient/chrome, multi-panel autoplay and looping promotional imagery | REJECT | Conflicts with Zapla's palette and motion rules, and makes the product harder to inspect. |
| Birdeye Chatbot's long repeated copy-and-image feature catalogue | REJECT | Would reintroduce separate restarts and page fatigue. Keep the six-part commercial story. |
| Recolouring Unified Inbox's glass workspace as the Chatbot hero | REJECT | Inbox owns people managing conversations; Chatbot owns an enquiry progressing through automated responses. Reuse tokens and assets, not the window composition. |

Reference URLs:
- https://www.activecampaign.com/
- https://www.activecampaign.com/platform/marketing-automation
- https://birdeye.com/sg/
- https://birdeye.com/sg/webchat/

## Resulting direction

Warm-white/ink opening with a local blue-and-stone conversation surface; original customer messages stay distinct from AI replies. The booking result uses deep green to mark the agreed outcome. This is one connected enquiry, without app chrome, invented controls, metrics or decorative shapes. The opening's neutral field leads into warm-white human photography; the established deep-green setup chapter and cool FAQ create contrast before the final CTA and sky.

The materially different alternative was a customer photograph dominating the hero. That would add emotion but would duplicate the photo-led Receptionist opening and compete with the precise customer decision that Chatbot must explain. The chosen conversation-led opening keeps that distinction.

Desktop enhancement remains bounded and cumulative. The complete conversation is the baseline, including when JavaScript, viewport dimensions, motion preferences, font sizing or zoom prevent enhancement. Mobile now reads the complete conversation before its explanatory notes.

## Verification

Implementation commits: `d1abe65d3b897957813f8b50668f79db05dd0288` (colour/material revision), `766db18e60ffafc9e36c4283f1b7356ab898e302` (pacing and responsive anchor), and `e75e5a488b13003097ab7303074b75324c5b05f6` (tablet alignment). Concurrent Automation Builder changes in `c80b81faf603a64395233ee403877687cefe0133` were preserved. This implementation changes only the Chatbot component, Chatbot CSS and three project documents. No shared navigation, footer, route or capability claim was changed.

### Rendered inspection

Verification used Chrome and the actual synced Lovable preview. The connected browser could not reach the local development server. Browser-level viewport overrides were unreliable, so the record uses measured actual dimensions and the editor's responsive iframe instead of claiming those overrides worked.

| View | Coverage and observation |
| --- | --- |
| Desktop, measured 2134 × 962 CSS px | Fresh stage-zero opening; native enquiry progression; full completed conversation and booking; release into human handover; photograph, dark setup, FAQ and final CTA/sky. The final opening is 2527px, about 2.63 viewports. The complete scene is 659px high, with its pinned top at 88px and bottom at 747px. On release the scene bottom was about 181px and the human section began at about 344px. |
| Tablet, 834 × 713 iframe | Hero, knowledge explanation, customer request, appointment agreement/result, channels, loaded human photograph and handover, and setup. The final normal-flow layout places each explanation beside its corresponding exchange; it does not pin the scene at this size. |
| Phone, 393 × 713 iframe, 378px content width | Hero, complete uninterrupted conversation/result, explanatory copy, channels, loaded human photo/crop, handover, Guided Launch, expanded FAQ, final CTA and sky/footer transition. The face stays clear and the caption stays below it. The final hero is 558px high. |

No horizontal overflow or clipped checked headings, paragraphs and links appeared in the inspected phone/tablet views. The final desktop also had no horizontal overflow. The supplied portrait sheet, human photograph and petal loaded. The direct preview returned no browser error logs during the checked desktop session.

### Review corrections

- Reduce the full opening from saturated blue to warm white/ink and local illustration colour. Strengthen the automated reply and the resulting booking with purposeful surface contrast.
- Tighten the first desktop beat from a full viewport to 82svh where content permits. Keep the complete scene visible beneath the fixed header and let it release naturally.
- The phone's previous destination could skip the newly continuous conversation. The visible normal-flow “See how it works” link now targets the start of the conversation; in the enhanced desktop view it advances to the knowledge beat. The phone anchor was followed and its target appeared at 105px below the top, clear of the fixed header.
- The first tablet revision placed a completed booking above its explanation. The final non-sticky two-column layout aligns the knowledge/detail and booking beats with their corresponding explanatory text. Its rendered correction was inspected after sync.
- The measured-fit guard and ResizeObserver protect the desktop scene when fonts, zoom or available height change. Fallback paths retain complete readable content; no scroll capture, nested transcript scrolling or timed reset is introduced.

### Lens review

| Lens | Finding |
| --- | --- |
| Motion Director | One native-scroll, cumulative enquiry remains purposeful. Completion stays visible and the scene releases. No new decorative movement or autoplay was added. |
| Brand / Creative Director | Warm white, ink, restrained conversation blue, deep green, existing portraits, petal and human photography form one Zapla palette. Static grain creates material depth locally. The opening no longer relies on a full-page brand-colour field or an Inbox window. |
| UI/UX Director | Mobile anchor and tablet relationship/alignment were real review defects and were corrected. Native FAQ disclosure, readable messages and visible focus styles remain. |
| Product Marketing / Conversion Director | The exact customer question, useful answer, agreed time, customer name and resulting booking supply the proof. Human involvement remains a distinct conditional example. H1, hero supporting copy and final CTA wording were preserved. |
| SME buyer / buyer psychology | The buyer can see what gets answered and what happens next. Guided Launch acknowledges existing tools and explains control. No new performance statistic, testimonial, usage allowance or unsupported channel is introduced. |
| AI-slop critic | No fake metrics, dummy send controls, floating icons, numbered garnish, tilted stacks or unrelated conversation switchers. Every message, portrait, petal and result contributes to the example. |

These are specific role-based review passes, not a claim of separate independent agents or owner approval. No automatic numerical score is assigned.

### Interaction, build and limits

The desktop FAQ opened by click and closed with Enter. The mobile booking FAQ was opened and read in its expanded state. All three sales CTAs still target `/booking`; the related feature link targets `/features/unified-inbox`. The calendar embed remains deferred. The illustration sends no messages and creates no live appointments.

Production build, TypeScript, targeted component ESLint, Prettier and Git whitespace checks passed. The final integration build included the concurrent Automation Builder revision. GitHub's Vercel status reported success for all three implementation commits. Lovable metadata reported `e75e5a4` ready, and rendered DOM/styles independently showed the updated colour, responsive anchors and tablet fallback. Historic editor “Build unsuccessful / Preview is out of date” messages are not represented as resolved. No Lovable builder prompt or separate production Publish action was used.

Limits: Chrome-based marketing-page review, not a physical-device/browser matrix or live NextGen acceptance test. A new 320px pass, separate reduced-motion preference and JavaScript-disabled sessions, screen-reader testing, and the lower FAQ/final-CTA tablet pass were not completed in this turn. Reduced-motion/no-JavaScript paths were reviewed in source; the complete conversation remains the baseline. The browser stopped one late capture request; completed earlier desktop/mobile and tablet checks above remain the actual coverage. Temporary viewport overrides were reset.

Review URL: https://id-preview--b1bef4bc-7c76-4229-924e-e0e5b64a632b.lovable.app/features/ai-chatbot

## Enquiry-story expansion: draft for rendered review, 23 October 2026

The owner approved the eight-part recommendation after reviewing the previous opening. Current base: `5be3e602ae13795b9e99c6f8ced15c8fae051efd`, preserving the newer Automation Builder work. Source and claim boundaries are in `AI-CHATBOT-CAPABILITIES.md`.

This revision changes the Chatbot component and stylesheet, the feature brief and page-specific evidence/review documents. Website context, contact capture and pipeline/task continuation replace the stretched opening transcript. The human photograph now changes scale; source/answer proof is a separate open composition. H1, hero supporting copy, final CTA, root navigation/footer, route and booking destination remain.

Build, TypeScript, targeted ESLint and SEO checks pass for the first draft. The local development server started successfully on loopback, but this browser cannot inspect that local address. A GitHub draft preview is needed for rendered review. Do not treat this entry, source review or a deployment-success status as visual approval. Desktop, tablet, phone, interaction and motion checks remain pending at this stage.


### Preview access result

The implementation is on GitHub as `fff5594ca8674726aef96b83c8203693fbac7aa8` in draft PR #179. The Vercel integration already connected to this repository automatically built the branch successfully. No Vercel hosting configuration or new Vercel connection was created.

Rendered verification remains blocked. The connected browser timed out, local browser access was unavailable, and the branch preview required Vercel sign-in. A secure sign-in request returned `declined` and was not retried. The user asked why Vercel was involved; clarified that it was an existing automatic draft-preview route, not a new hosting requirement. Do not reopen authentication without a new user request.

Read-only Lovable metadata still reports main commit `5be3e602ae13795b9e99c6f8ced15c8fae051efd`, so its existing preview does not verify this branch. No Lovable builder command, hosting change, Publish action or main merge was performed. Production build, TypeScript, targeted ESLint, SEO policy, formatting and whitespace checks pass. Desktop/tablet/phone visual quality, sticky entry/exit, image crops, native disclosures and booking navigation remain unverified for this redesign. Do not claim 9/10 or completion until those checks can be made.


## Product-stage revision after owner review, 23 October 2026

The owner rejected the website-within-website photograph in the hero, the repeated office photograph, scattered arrows and the fragmented middle. The supplied older composition is useful evidence for scale, not approval to restore its dominant blue coverage. Preserve the approved H1, hero supporting paragraph, final CTA, route/indexing, shared navigation/footer and booking destinations.

Reference decisions: ADAPT Birdeye AI Search's generous contained stages, static material texture, smooth foreground and native page rhythm; REJECT its mascot, enterprise claims, statistics and large navigation system. ADAPT the supplied older Chatbot composition's larger legible conversation and grouped business context; REJECT an excessively tall, narrow transcript and blue treatment extending across multiple viewports. ADAPT ActiveCampaign's strong product scale and varied visual density; REJECT its dark neon palette, dense product collage and unrelated autonomous claims. Live desktop reference pages and current Chatbot/Inbox were inspected in the connected browser.

Implementation: a broad headline/copy introduction leads into a single contained blue/stone textured chat stage with no editorial photo. The same visitor supplies need and timing there, then supplies name/email in a grouped contact-capture scene. A small native sticky enhancement holds only a fitting desktop scene and reveals the contact once; ordinary flow remains the baseline. All local arrows are removed, including CTA arrows; functional native disclosures use a plus. Pipeline and knowledge relationships use grouping and words. The full-width green section bands are removed, and Guided Launch is open on warm white.

Fresh photograph: built-in image generation created a new male service coordinator at a laptop in a quiet warm-stone Sydney service office, panoramic 3:1, with clear left-side space for HTML text and the person on the right for responsive cropping. This is an editorial illustration, not a customer endorsement. Exact generation prompt is recorded below. Master: `/workspace/scratch/f1a59e780d84/generated_images/exec-0b57b09a-d1f6-4db1-9333-88f8fa5b86f7.png`. Web encode: `public/concept/features/chatbot-human-handover-v2.webp`, 2172 × 724, 119,996 bytes. No old editorial photograph remains on the Chatbot page; existing interface portraits remain for continuity.

Initial validation: production build, TypeScript, targeted component ESLint, formatting and whitespace checks pass. Local development server starts, but the connected browser cannot reach it (connection refused). This branch commit is for rendered preview review; it is not a quality sign-off. Desktop, tablet, phone, disclosure, native progression/release, image crop and final CTA still require checking on the accessible branch preview before main is updated.

Generation prompt (built-in image tool):

> Use case: photorealistic-natural. Asset type: a fresh panoramic editorial photograph for the human-handover section of Zapla's AI Chatbot website feature page. Create one premium, convincingly real contemporary documentary photograph, wide 3:1 landscape composition, ideally 3072 x 1024. Scene: a small Sydney air-conditioning service business office, calm and modern, tactile pale oak desk, warm plaster walls, muted stone and olive details, soft directional late-morning window light. Subject: a new South Asian male service coordinator about 36, short black hair, subtle natural stubble, wearing an unbranded light blue cotton shirt. He occupies the rightmost third and is attentively reviewing an enquiry on an open plain silver laptop at his desk, seen three-quarter profile, candid concentration rather than smiling at camera. His face and both hands must be natural and unobstructed. The laptop and keyboard are physically plausible; screen faces away from the viewer, no visible application UI. The left 40 percent of the frame is quiet darker warm-stone office space with soft depth and a little desk foreground, deliberately clear for later HTML heading overlay. Keep the entire person, head, shoulders and laptop within the right half so a phone crop can retain them. This image accompanies the moment a human considers a customer request requiring judgement. Rich but restrained autumn colour, natural skin texture, gentle film grain, refined editorial photography, not generic glossy stock. No other people, no phones, no sci-fi motifs, no AI illustrations, no charts, no logos, no signage, no text, no watermark. Generate a completely new person and setting, do not reuse the website's existing woman at a laptop or homeowner and installer photograph.


### Rendered review and corrections completed

The public branch preview became available and was reviewed in the connected Chrome browser. Two visual problems were found and corrected: white copy on the lighter hero backdrop lacked contrast, so the hero now uses ink text on a lighter blue/stone field; and the narrow hero headline took too much vertical space, so the tablet opening stacks and the phone headline uses deliberate phrase breaks with preserved spaces. A mobile selector-specificity error that hid the outside-business-hours line was also corrected.

A native-scroll test found a functional issue that static screenshots did not reveal: bottom padding did not give the sticky panel actual travel. Replaced it with an in-flow spacer on enhanced desktop layouts. The same native test then measured the panel at 120px on approach, 94px through successive scroll movements, and below that anchor after release. Reverse scrolling retained the completed contact at full opacity. The hold adds only 120px of native travel. The record reveals once; no messages are replaced, no timer or reset loop is involved.

Rendered coverage:

- **1366 × 900 desktop:** final hero; qualification/contact capture; configured pipeline/task; expanded optional booking; knowledge source/answer; loaded panoramic photograph and separate handover; open Guided Launch; FAQ; final CTA and sky transition. The full conversation and result are legible.
- **1101 × 820:** the 352.65px contact scene fits below the fixed header, with the enhancement enabled and a real 120px spacer.
- **1366 × 720:** the enhancement turns off, the scene is static, the contact remains at opacity 1 and the page has no horizontal overflow.
- **834 × 900 tablet:** corrected broad headline/opening, grouped contact record and fresh human photograph/copy. The normal-flow layout is enabled; no clipped main text or horizontal overflow appeared in the DOM geometry check. This was a key-scene tablet review, not every lower-page tablet interaction.
- **393 × 852 phone (378px document content):** complete opening and qualification/capture reading order, contact record, pipeline/task, expanded optional booking, knowledge source/answer, fresh photograph, original-question handover, setup, FAQs, final CTA and sky/footer transition. No horizontal overflow, clipped main text or unloaded main image was found after scrolling through the page.
- **320 × 852 (305px document content):** final phrase-based hero, contact name/email/original request and photograph/copy inspected. The name wraps naturally; the face remains unobstructed. The all-main-text geometry check found no clipped headings, paragraphs, sales links or summaries and no document overflow.

The booking disclosure and qualification FAQ opened by click and closed with Enter on desktop. The phone booking disclosure opened and retained availability, explicit agreement and the booking result in order. All three rendered sales CTAs point to `/booking`. The calendar embed remains intentionally deferred. This is marketing-page UI review, not a live chatbot, contact-creation or calendar acceptance test.

Role checks were conducted as separate review passes by the same agent, not independent reviewers:

| Lens | Evidence and result |
| --- | --- |
| UI/UX | One dominant conversation stage; no competing website headline/photo; readable wide and narrow layouts; native disclosures. |
| Brand / Creative | Zapla type, palette, petal, portrait continuity and final CTA retained; broad smooth product surfaces on a local textured field; a new panorama supplies the human break. |
| Product Marketing | Website answer, need/timing, explicit contact details, customer record and configured continuation remain visible; no new capability or performance claim. |
| Conversion | Primary booking and secondary demonstration entry are clear; optional appointment detail is disclosed; setup cost qualification remains visible. |
| Motion | Fitting desktop scene reveals once, holds and releases under native scrolling; complete normal-flow phone/short-height baseline. |
| SME buyer | The same enquiry can be followed from the visitor's words to a named contact and a review task without decoding diagram arrows. |
| Buyer psychology | Business-information proof and conditional human handover address control and trust; no claim that every visitor becomes a qualified customer. |
| AI-slop critique | Removed the nested website/photo collage, scattered connector/CTA arrows and full-width middle colour bands; no extra status chips, counters or fake controls. |
| Technical | Production build, TypeScript, targeted ESLint, SEO policy, formatting and whitespace checks pass. Shared navigation/footer and unrelated sources are unchanged. |

The desktop hero capture is retained in [qa/ai-chatbot-product-stage.png](qa/ai-chatbot-product-stage.png). Remaining limits: no physical-device/cross-browser matrix or screen-reader session; reduced-motion and unavailable-JavaScript behaviour were checked in source rather than separate browser modes. No measured conversion result or final owner approval is implied. Local development preview remained unreachable from the connected browser; rendered review used the existing repository's public branch preview. Lovable stays read-only, with no builder prompt or separate production Publish action.

## Integrated hero and editorial scroll revision, 23 October 2026

The owner requested a more appealing hero and rest of the Chatbot page after seeing the product-stage revision. This supersedes that revision's detached title/stage, repeated broad boxed scenes and laptop photograph. The H1, hero supporting paragraph and final CTA remain locked. Scope stays on the Chatbot page; shared header/footer, other pages, route/indexing and `/booking` are preserved. Current base is `e00bd676b97241b7eb5ab314d69979f5500dfe4a`.

Reference assessment: ADAPT Birdeye AI Search's unified contained opening, decisive scale, material contrast and alternating open/product-heavy views. Its current hero, proof/report area and anchored product chapter were inspected in the browser. REJECT copying its mascot, enterprise navigation, claims, statistics or giving every Zapla section a blue background. USE Zapla's type, actual petal, portrait continuity, neutral foundation, selective deep green and established closing CTA. Existing Inbox and Customer Marketing source and rendered references inform family resemblance, not a shared section template.

Design: combine the approved hero wording and large chat in one light blue/stone material scene; remove the redundant second headline and business-information preamble. Qualification is open on the page beside a smooth created-contact record with local stone texture. A distinct dark chapter holds explanatory copy and one continuous opportunity/task paper rather than two competing cards. Business information and its answer form an asymmetric editorial spread. The fresh panoramic work photograph has no text overlay. Setup uses an open two-column plan, rather than three equal cards. Functional plus disclosures remain; no decorative arrows, fake inputs, metrics, floating icons or automatic animation are added. The existing measured, bounded contact enhancement is retained subject to fresh rendered testing.

New image: built-in image generation, `photorealistic-natural`; master `/workspace/scratch/f1a59e780d84/generated_images/exec-5718437b-d608-45bf-bfe4-3a01c0ce1ac7.png`; web asset `public/concept/features/chatbot-team-review-v3.webp`, 2020 × 778, 164,366 bytes. People were directed by work, setting and composition. This is an explanatory editorial illustration, not customers or a testimonial. The original master is preserved. The old photo is no longer used by this page.

Generation prompt:

> Use case: photorealistic-natural. Asset type: wide editorial photograph for the human-handover section of a premium small-business software website. Primary request: a candid service team reviewing an unusual air-conditioning installation request together, concentrating on a large technical installation drawing and an unbranded equipment specification sheet on a worktable. Scene: a contemporary Australian air-conditioning service business, bright understated studio beside a clean workshop, timber worktable, neutral plaster, softly blurred modern equipment samples. Subjects: a female service coordinator in her late forties in a charcoal overshirt and a male technical colleague in his fifties in a navy work shirt, standing side by side and naturally discussing the drawing; believable relaxed professional posture, engaged in the work, not smiling at camera. Composition: panoramic landscape around 2.6:1, medium-wide observational photograph, both people grouped near the centre-right, enough room around them for an intentional crop, faces and hands clearly visible and anatomically correct, open table across foreground, no text overlay area required. Lighting: generous natural side light, warm daylight, soft real shadows, tactile editorial quality and rich but restrained contrast. Materials: oak, linen, matte paper, charcoal and ink blue. Constraints: no logos, no readable written words, no website UI, no testimonial, no phone, no computer screen, no stock-photo posing, no artificial bokeh, no decorative floating objects. This is an explanatory work scene, not real customers.

Initial code checks: production build, TypeScript, targeted ESLint, SEO policy, formatting and whitespace pass. The connected browser cannot reach this container's local server, as established in the preceding review. This draft commit enables rendered branch-preview inspection; it is not a visual sign-off. Fresh desktop/tablet/phone, scene fit and sticky release, image crop, native disclosures and final CTA checks remain pending before main merge. Lovable remains read-only; no builder prompt or separate production Publish action.

### Rendered review completed on the branch preview

The existing repository Workers preview was inspected in Chrome. Implementation through `f172f57138713891764415788e407c6f0ceb9e08` passed its Workers deployment. This entry supersedes the pending rendered-review status above. It is an implementation review, not owner approval or a measured conversion result.

Coverage:

- **1707 × 769 normal wide viewport:** complete integrated opening, open capture, dark continuation, source/answer composition, new photograph, original-question handover and launch rhythm.
- **1366 × 900:** hero, bounded capture, expanded optional booking and its result, final CTA/sky. The contact scene measured 386.6px high. Native scrolling measured its top at 142px on approach, then 94px at successive positions, then -8px after release. Reverse travel retained the completed record at opacity 1. The scene adds only 120px of travel.
- **1101 × 820 minimum enhanced size:** complete opening and measured 384px capture scene, enhancement enabled, no horizontal overflow.
- **1366 × 720 short-window fallback:** enhancement disabled, static scene and fully visible contact at opacity 1.
- **834 × 900 tablet:** stacked hero, contact, the opportunity/task record's two-column layout, fresh photograph with both faces visible and open setup. This was key-scene coverage, not every lower-page tablet interaction.
- **393 × 852 phone (378px content):** full opening, conversation, qualification and contact; pipeline/task, expanded booking and explicit agreement, knowledge example, photograph and handover, complete launch plan, FAQ and final CTA/sky.
- **320 × 852 (305px content):** hero, name/email/original request, both people in the photo, and expanded booking with the result. Final main-text geometry check found no clipping or horizontal overflow.

A small real defect was found during the phone geometry review: the disclosure plus rotated to a cross about 4.6px outside its original SVG layout box. Six pixels of right padding now reserve its drawn extent. Rechecked the rendered 320px expanded state: no overflow or clipped checked headings, paragraphs, links or summaries. All main images loaded. The photo is unobstructed in the inspected desktop/tablet/phone crops.

The booking example opens by click and closes with Enter on desktop; phone disclosure was also opened. The qualification FAQ opens by click and closes with Enter. All three sales CTAs point to `/booking`; the final CTA was followed and the existing booking page rendered. No form submission, message, contact or live appointment was made. The calendar embed stays deferred.

Role reviews were separate passes by the same agent:

| Lens | Finding |
| --- | --- |
| UI/UX | One hero promise and one readable exchange. The repeated internal headline is gone. Contact and task relationships remain understandable without connectors. Narrow disclosure extent was corrected. |
| Brand / Creative | Zapla type, petal, portrait continuity, warm white and selective deep green hold the family together. Integrated material opening, open capture, dark record, editorial knowledge and unobstructed work photography create distinct compositions. |
| Product Marketing | Visible need/timing and supplied name/email precede the contact. Configured pipeline/task, optional booking with agreement, supplied-information answer and conditional human review retain their separate meanings. No new claims. |
| Conversion | A clear primary call destination, practical setup qualification and the established close remain. The broad Chatbot request is not narrowed to booking only. |
| Motion | One measured native hold, one contact reveal, no reset. Phone/tablet and short-height remain complete in normal flow. No decorative animation was introduced. |
| SME buyer | The page shows an answered question, who gets captured, where the enquiry goes and when a person is needed. No software architecture or internal agent terminology is introduced. |
| Buyer psychology | Business-information proof and a visible human exception address control and trust without fabricated metrics, endorsements or guarantees. |
| AI-slop critique | No fake inputs, counters, random badges, icon grid, arrows, tilted cards or website collage. Surfaces correspond to the widget, contact, opportunity/task, supplied information or team context. |

Production build, TypeScript, targeted ESLint, SEO policy, formatting and whitespace checks pass. Concurrent Automation work was preserved in the branch integration; subsequent unrelated Automation changes remain on main for the ordinary merge. Screenshot: [qa/ai-chatbot-integrated-hero.png](qa/ai-chatbot-integrated-hero.png).

Limits: Chrome review, not a physical-device/cross-browser matrix, screen-reader session or live-product acceptance test. Reduced motion and unavailable-JavaScript baselines were checked in source rather than separate browser sessions. A browser connection timeout interrupted one diagnostic call; the browser was reconnected and the responsive/disclosure checks resumed. No error-log result is claimed for that interrupted call. Lovable remains read-only; no builder prompt or separate production Publish action. Target review URL: https://id-preview--b1bef4bc-7c76-4229-924e-e0e5b64a632b.lovable.app/features/ai-chatbot

## Outcome and product-proof rebuild: initial draft, 26 October 2026

The owner approved the recommendation following the direct live Birdeye Webchat comparison: stronger commercial promise, contact outcome earlier, and specific product proof instead of another cosmetic pass. The incumbent's technical checks did not establish the desired visual standard. Current base: `a6e506674af907d61ba9e17f222ee8ffa1f898ad`.

Reference decisions: ADAPT Birdeye Webchat's outcome-first message, capability-specific demonstrations and evidence density; REJECT its long repetitive text/image alternation, tiny transcript text, unrelated global CTA and any copying of customer stories or capabilities. USE Zapla's legible conversation, explicit identity continuity, type, neutral/blue/green roles, portraits, petal and existing final CTA. The source and rendered Inbox and CRM, incumbent Chatbot, and current Birdeye hero and knowledge section were inspected before implementation. No human photograph is placed in the hero. The existing fresh work photo remains unique to this page.

Alternatives assessed: polishing the incumbent's colour/frame would leave its thin proof unchanged; copying Birdeye's long feature catalogue would add unverified scope and fatigue. Selected approach: a shorter integrated outcome story with distinct contact, knowledge and appointment compositions.

Copy decision: the approved recommendation and “ok go” reopen the H1/hero paragraph for a more commercial opening. The new H1 is “Answer the question. Capture the enquiry.” Supporting paragraph explains around-the-clock website answers, conversational capture and CRM context. The sales destination, final CTA wording, architecture and indexing remain unchanged. Metadata is aligned with enquiry capture.

Story: the three-message opening asks service/location/timing and visibly supplies name/email before the contact. The compact adjacent continuation explicitly labels chosen pipeline/task configuration. The knowledge walkthrough synchronises each question, source and prepared answer. It is product-behaviour illustration, not a live tenant screenshot or AI endpoint. The appointment scene displays availability, explicit agreement and a resulting booking; its measured desktop pin/reveal is the only scroll progression. The human card shows the original question and chatbot handover without assignment, notification, summary or instant-human claims. Setup consolidates knowledge, permitted actions, website appearance and testing, with separately priced Guided Launch and both starting points.

Initial build, TypeScript, targeted ESLint, SEO policy, formatting and whitespace checks pass. This draft enables the existing repository's public branch preview for rendered desktop/tablet/phone review. It is not a visual-quality sign-off. No Lovable builder prompt or separate Publish action is used.

### Rendered review and corrective work completed

Final source: `c02554e7ac45ecfbc972d400a9d8a2656f15e939`, with a successful Workers deployment. Rendered review used the existing repository branch preview in Chrome; this is not a live Zapla/NextGen account acceptance test or owner approval.

Concrete corrections from review:

- The calendar initially continued to say “available” after the booking appeared. It now changes the slot to Mia’s on-site assessment after agreement, alongside the resulting booking.
- The 834px layout originally put the contact below the full conversation. It now keeps both panes side by side between 701 and 950px, with readable type and explicit details; phones retain conversation-before-contact order.
- Removed qualification text from the after-capture paragraph and placed it with the enquiry proof. The continuation now explains only pipeline and configured follow-up.
- Shortened the redundant appointment subheading to “Mia agrees. Zapla books.” and retained the resource-control explanation. Preserved natural spaces around the hero and booking headline breaks.
- The prepared answer region has a meaningful accessible name. Native button focus remains on the chosen question. The no-JavaScript content includes the other source/response cases and hides the unavailable question controls/instruction.

Coverage and observed behaviour:

- **1707 × 769 normal wide view:** opening, compact continuation, knowledge, appointment, work photo/handover and setup. This height uses normal-flow booking fallback.
- **1366 × 900:** complete final hero and contact outcome; source/answer states; booking progression; role/whole-page composition checks. The initial appointment visual measured about 626px. Native scrolling observed the offered/pending state, the agreement entering view and the created record, with the calendar at 110px through successive positions and at -16px after release. Reverse scrolling retained the result at full opacity. The final shortened agreement heading changes the copy height, not the measured-fit or completion logic.
- **1101 × 820 final source:** scene height 614px, enhancement enabled, full confirmed scene fits beneath the header. It was pending with the agreement at the lower edge, then changed the slot and record when the agreement reached about 553px. Stage anchored at 110px. No horizontal overflow.
- **1366 × 720:** enhancement disabled, calendar static, result opacity 1, no horizontal overflow.
- **834 × 900:** corrected two-pane opening/contact, no horizontal overflow. Key tablet review, not a full lower-page tablet interaction matrix.
- **393 × 852, 378px content:** complete phone walkthrough through enquiry/contact, configured continuation, knowledge source/response, offer/agreement, booked calendar/result, photo/handover, launch plan, FAQ and final CTA/sky. Both people remain visible. Main text/control geometry found no clipping, all main images loaded and the page had no horizontal overflow.
- **320 × 852, 305px content:** two-line H1, primary/secondary actions, original request, caption and continuation; main-text/control geometry found no clipping or horizontal overflow. The proof link landed at about 85px, clear of the fixed header.

Question selection was tested by click, then Tab and Enter from pricing to service area to the human exception. The source type/title/text and answer changed together; keyboard focus stayed on the selected question. FAQ opened by click and closed with Enter on phone. Every sales CTA targets `/booking`; the final phone CTA was followed and rendered the existing booking route. No message was submitted and no real contact, AI call or appointment was created. Calendar embedding remains deferred.

Role review passes were performed by the implementation agent, with specific evidence rather than automatic numerical ratings:

| Lens | Finding |
| --- | --- |
| UI/UX | Two-line commercial promise, complete desktop outcome, readable messages, explicit source/response selection and logical phone reading order. Tablet outcome visibility was corrected. |
| Brand / Creative | Neutral opening, local blue material, smooth shared enquiry/contact window, open continuation, distinct source/answer composition, real calendar relationship and existing page-specific work photo. No stock icon grid, repeated editorial cast or decorative arrows. |
| Product Marketing | Contact details visibly supplied; original words quoted; pipeline/task clearly configured; source types and restrictions verified; availability/agreement/booking states distinct; handover conditional. |
| Conversion | The hero says what the business receives. Booking is visible rather than hidden. Guided Launch gives a specific plan, both starting points and separate-pricing qualification. Customer stories remain excluded without real evidence. |
| Motion | One measured, bounded native calendar hold with a meaningful slot/record change after agreement. Completed state persists on reverse. No wheel capture, scroll snapping, timers, resetting transcript or floating animation. |
| SME buyer | The question becomes someone the team can contact; the business can choose the next step, inspect answer sources and retain human judgement. No product architecture or internal tool names are required to follow it. |
| Buyer psychology | Visible source information, resource limits, explicit booking consent and a human exception address trust. No implied anonymous identification, guaranteed warm lead or fabricated review evidence. |
| AI-slop critique | Redundant capture and large dark task sections removed. Product surfaces have specific jobs; no fake add/save/send controls, counters, decorative pills, neon or pastel feature highlights. |
| Technical | Build, TypeScript, targeted ESLint, SEO policy, formatting and whitespace checks pass. Current-source Workers deployment succeeded. Shared architecture and unrelated sources remain outside this change. |

Proof: [qa/ai-chatbot-outcome-hero.png](qa/ai-chatbot-outcome-hero.png).

Limits: Chrome viewport review, not physical-device/cross-browser or screen-reader certification. Reduced-motion and unavailable-JavaScript behaviour were checked in source; separate browser preference/JavaScript-disabled sessions were not available. Some scroll gestures returned a browser timeout after applying; current DOM/geometry was checked before continuing, and keyboard page navigation completed the phone review. No conversion uplift, real-product reliability guarantee or claim of having matched Birdeye's customer evidence is made. Lovable remains read-only; merge and actual-preview sync are recorded with the PR. No builder prompt or production Publish action.

## Commercial substance correction, 26 October 2026

The owner approved the fresh all-lens Birdeye comparison and the recommendation to retain the current journey while strengthening qualification, practical answers, business benefits and evidence. The final product source is `bd57323f3d8cb079f930d92a0cd10f1683641818`. Explicit contact questions, a concrete acknowledgement email, useful source-based answers, compact phone headings and clearer launch/cost expectations supersede the earlier generic task and weak examples. Exact reference decisions, code boundaries, role assessments, responsive/keyboard/native-scroll checks, screenshot and remaining product-access limitation are in [AI-CHATBOT-SUBSTANCE-20261026.md](AI-CHATBOT-SUBSTANCE-20261026.md). These are implementation-agent reviews, not independent director approvals or a measured conversion claim. No real account screenshot, recording or customer endorsement was obtained or invented.
