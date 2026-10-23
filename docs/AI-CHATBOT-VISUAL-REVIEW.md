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
