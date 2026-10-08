# Mechanics V2 review

Route: `/industries/mechanics-v2`. The original `/industries/mechanics` route and stylesheet are unchanged. Navigation and footer remain root-owned.

## Current implementation

- Enquiry: customer message, outbound acknowledgement and concise reception follow-up. Removed decorative bridge, repeated initials and ownership labels.
- Estimate: one summary header and conversation, with reply cancellation immediately beneath the thread. Removed the desktop sidebar/mobile context stack. Reception confirms availability; the demo does not claim a completed booking.
- Return visit: large service due month, correct vehicle, reminder and reply. Photography supports the customer action.
- Playback: one stage selector and pause/replay row per scene. Keyboard and manual access to every stage, including reduced-motion mode. Finite progression, offscreen pause and no automatic looping.
- Typography: Inter Tight at weight 500 for headings; Manrope for body. Page-scoped font family aliases and locally served Latin WOFF2 assets remove reliance on external font loading. Font licence notices included. Essential scene text is at least 12px.
- Styling: replaced inherited V1 rules and successive overrides with a single V2 stylesheet. Consistent spacing, borders, buttons and scene surfaces. Shorter mobile estimate and enquiry panels.
- Cost check: current plan, recurring usage/extras and owner-entered job contribution. Result has a distinct visual area; assumptions and setup costs remain visible. Capacity explanation is expandable. No default job contribution or forecast.
- Closing CTA: “Find the follow-up your workshop is missing.”

## Commercial accuracy

Pricing matches current Pricing-v3: Follow-Through A$399/month with setup from A$1,997; Growth A$699/month with setup from A$2,997. All exclude GST. Recurring usage/add-ons are separate inputs. Minimum setup is paid separately and spread over twelve months only for the first-year comparison.

Growth is the default because proactive service recall and reactivation belong to that plan. Follow-Through displays that scope limitation. The calculation is a cost threshold, not a performance promise. Verified workshop results and real integration validation remain outstanding.

## Review lenses

These are the author's reviews, not external stakeholder approvals or measured conversion results.

| Lens              | Assessment                                                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI/UX             | Readable essential detail, one-row controls and compact mobile conversation. Every section inspected on desktop/mobile; no horizontal document overflow at five tested widths.                    |
| Brand/Creative    | Incumbent palette, portraits, photography, petal, medium display typography and pill CTAs retained. Compared with homepage and Customer Marketing renders. Locally served fonts confirmed loaded. |
| Product Marketing | Enquiry response, estimate decisions and next-service conversations lead the story. Technical mechanisms remain supporting detail.                                                                |
| Conversion        | Commercial copy and owner-entered economics support the buying decision. Case-study proof remains absent.                                                                                         |
| Motion            | Reply and reminder cancellation are adjacent. Stable finite scenes; manual selection, playback, offscreen pause and reduced motion supported.                                                     |
| SME buyer         | Existing job/vehicle/parts system retained. Reception owns availability and booking confirmation; no implied universal integration.                                                               |
| Buyer psychology  | Customer choice preserved, replies stop chasing, clear human next steps. Costs and scope remain explicit.                                                                                         |
| AI-slop critic    | Removed repeated initials, arrows, decorative bridge and extra scene chrome. No invented metrics, testimonials or results.                                                                        |

## Validation

Production build, TypeScript, scoped ESLint and whitespace checks passed. Browser assertions checked calculator rounding and exact boundaries, both plan scopes, empty/zero/negative inputs, local font loading, acknowledgement, reply cancellation, manual/play transitions, reduced-motion states, original page rendering and no page errors. No horizontal document overflow at 320, 390, 768, 1024 or 1440 pixels. Mobile enquiry and estimate scene heights were checked at 390px. Each V2 section was inspected on desktop/mobile; comparison renders included the homepage final CTA and Customer Marketing hero/scene.

Both pages remain review drafts with noindex and sitemap exclusion. No booking form was submitted. Workflow illustrations do not validate a real workshop integration or demonstrate measured conversion uplift.
