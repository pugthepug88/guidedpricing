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

In progress. Do not treat the code changes or successful build alone as rendered design approval. The connected browser cannot reach the local development server, so updated rendered verification will use the synced Lovable preview after the review commit.
