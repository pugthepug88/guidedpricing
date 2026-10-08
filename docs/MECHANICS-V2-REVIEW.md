# Mechanics V2 review

Route `/industries/mechanics-v2`. Original mechanics route and stylesheet, shared navigation and footer are unchanged. V2 remains noindex and sitemap-excluded.

## Whole-page decisions

The page tells a customer journey: enquiry, unanswered quote, next service, Google review, existing-system reassurance, workshop launch, plan choice and call. The price calculator was removed because job revenue equivalence encouraged a cost-recovery interpretation without reflecting reviews, retention, staff time or job delivery costs. A compact price summary replaces it; no second benefit grid repeats the examples above.

The quote scene was rebuilt around the actual follow-up and customer response. A compact brake-work quote summary, short outbound message and Mia's reply replace the oversized quote card, competing headline and prominent “Cancelled” result. Reception owns the next step; reminders stopping is secondary. Three short monotonic transitions complete once, pause offscreen and retain the final state. Reduced motion shows the complete outcome. No dropdown or playback controls.

Service copy leads with recorded dates and relevant timing. Pink slip inspections are explicitly a NSW example, not an Australia-wide requirement. The November service reminder remains recognisable in the glass photo overlay. Review copy connects completed work to reputation and prospective customer confidence. The Google wordmark and five unselected stars illustrate a review request without inventing a rating or testimonial.

Repeated “Example…” footnotes were removed. Existing-system reassurance explains that data access is agreed during setup. The launch plan addresses quote timing, service dates and reception handoffs without reusing the homepage image or duplicating a Map/Build/Launch list.

## Brand and layout

Inter Tight 500 and Manrope remain locally served with page-scoped aliases. Existing palette, portraits, petal, glass specification, pill CTAs and root-owned footer remain. Hero photo leads with a compact 280px glass enquiry card. Enquiry and quote use light glass messages over sage; reviews use warm taupe. Cream quote and launch bands establish section rhythm, with white photograph and pricing sections between them.

Full-page desktop and mobile renders were visually inspected, alongside section detail. Homepage and Customer Marketing full-page comparison renders were inspected for palette, surfaces, typography hierarchy and closing CTA/footer continuity. The homepage's long scroll-driven area is not judged solely from its static full-page capture. The comparison session exposed a pre-existing Customer Marketing hydration mismatch involving its animated hero; that route was not modified. V2/V1 browser error assertions are scoped to those routes.

## Eight independent review lenses

These are the author's assessments, not stakeholder approvals or measured conversion results.

| Lens              | Final assessment                                                                                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI/UX             | One main headline per scene, clear avatar/message relationships, compact quote summary, readable pricing and consistent mobile stacking. Full-page rhythm inspected.        |
| Brand/Creative    | Existing soft autumn palette and glass treatment retained. Photographs and message surfaces have distinct roles; no copied homepage launch image.                           |
| Product Marketing | Each scene explains a recognisable workshop moment and the action Zapla takes. Quotes lead to conversation, recorded dates drive reminders, completed work prompts reviews. |
| Conversion        | Relevant customer actions lead to setup and transparent plan choice. Removed misleadingly narrow revenue equivalence. Verified workshop proof remains absent.               |
| Motion            | Short finite causal progression, stable geometry, offscreen pause and complete reduced-motion states. Customer response is the quote payoff.                                |
| SME buyer         | Existing workshop system and reception responsibilities preserved. Service dates must be recorded. No invented booking confirmation or universal integration.               |
| Buyer psychology  | Relevant timing, customer questions and review reputation replace operational status emphasis. Price is disclosed without making cost recovery the central story.           |
| AI-slop critic    | Removed decorative connectors, competing quote headline, cancelled-status emphasis, repeated footnotes and calculator complexity. No fabricated results or revenue uplift.  |

## Pricing and validation

Plan summary matches Pricing-v3: Follow-Through A$399/month and Growth A$699/month. Follow-Through summary includes enquiries, open quotes and review requests. Growth adds service reminders and customer reactivation. GST, usage and setup are additional; the full pricing page carries detailed inclusions and setup costs. Prices are not attributed to a dollar value per review or customer return.

Production build, TypeScript, scoped ESLint and whitespace checks passed. Browser checks cover removal of calculator/scene controls/footnotes, plan prices, NSW scope, reduced-motion final states, finite quote progression, V1 rendering and page errors. No horizontal document overflow at 320, 390, 768, 1024 or 1440 pixels. Complete V2 desktop/mobile captures and detailed renders were inspected for image/card sizing, message alignment, heading wrapping, section pacing and final CTA. No booking form submitted.

This design review does not validate a live workshop integration or establish measurable conversion uplift. Actual workshop case studies and operational results remain the evidence gap.
