# Mechanics V2 review

Route: `/industries/mechanics-v2`. This revision changes V2 only. The original mechanics route, root navigation and footer are unchanged. Both mechanics pages remain noindex and excluded from the sitemap.

## Redesign decisions

- **Hero:** restored the established Customer Marketing glass surface: white outer border, inset dark keyline, translucent warm white, 6px backdrop blur and soft shadow. The enquiry uses the approved customer portrait. Automated workshop actions use the Zapla petal. Removed the software reassurance from the hero. The hero illustration is static, with a smaller 280px enquiry card and a taller photograph.
- **Enquiry:** two separate avatar/message rows over a muted sage surface, without a containing panel or nested inspection record. The request and acknowledgement stay concise; reception confirms availability.
- **Quote:** replaced the estimate conversation with a brake-work quote summary and decision states. A customer reply visibly cancels the next reminder. The quote status changes when the reply arrives. Reception confirms the actual booking.
- **Return visit:** a large workshop photograph leads the section. A small glass November service reminder and customer reply occupy opposite corners. Mobile places the reply across the lower image edge instead of squeezing two large panels above a tiny photograph.
- **Google reviews:** a completed-service state leads to a neutral review invitation and a recognisable Google rating screen with five unselected stars. The connector line was removed. The invitation asks for an honest experience and shows a Google review link as an illustrative, noninteractive element. No invented reviews, stars, incentives or selective positive-review requests.
- **Fit:** compact reassurance about existing jobs, vehicles and parts software, with data access agreed during setup. This is supporting information lower on the page, not the hero proposition.
- **Guided Launch:** replaced the homepage image with a custom workshop launch plan covering quote timing, service reminders and reception handoffs. Removed the duplicated Map, Build and Launch list.
- **Price comparison:** only plan and owner-entered average job value. Monthly price divided by job revenue is shown as an average-job revenue equivalent, never profit, break-even or a forecast. Small fractions display below 0.1 instead of rounding to zero. No prefilled job value.

## Commercial accuracy

Prices match Pricing-v3: Follow-Through A$399/month and setup from A$1,997; Growth A$699/month and setup from A$2,997, excluding GST. Growth is the default because proactive recall and reactivation belong to that plan. Selecting Follow-Through exposes that scope limitation. The comparison excludes job costs, GST, usage and setup; a short note identifies GST, usage and setup as extra and links to the full pricing page.

The flows are illustrative. Workshop data connections, triggers, timing and human handoffs must be agreed during setup. An invitation is not evidence of an actual customer review. Workshop case studies, measured commercial results and validated integrations remain absent; those cannot be solved with layout or invented claims.

## Eight review lenses

These are the author's assessments, not external approvals or measured conversion results.

| Lens              | Assessment                                                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI/UX             | Clearer scene hierarchy, separate dialogue rows, smaller overlays and a two-input price comparison. Every section inspected at desktop and mobile sizes.                        |
| Brand/Creative    | Customer Marketing glass specifications, approved portraits, petal, existing photographs, workshop-specific launch plan, palette, medium display headings and pill CTAs reused. |
| Product Marketing | Unanswered enquiries, open quotes, the next service and post-job reviews provide recognisable workshop moments. Human confirmation remains explicit.                            |
| Conversion        | Concrete workflow demonstrations and monthly price context clarify why to consider the service. Verified workshop proof is still needed to substantiate willingness to pay.     |
| Motion            | Brief finite scene progression, explicit reply/cancellation states, offscreen pause and complete reduced-motion states. No stage dropdowns, playback controls or loops.         |
| SME buyer         | Existing workshop system retained; setup and reception responsibilities explained. No universal integration or automatic booking claim.                                         |
| Buyer psychology  | Customer replies stop the chase. Review requests remain neutral. Price framing is simple while preserving its revenue-only meaning.                                             |
| AI-slop critic    | Removed nested containers, oversized month cards, generic dark launch columns, decorative numbering and overbuilt calculations. No fabricated performance claims.               |

## Validation

Production build, TypeScript, scoped ESLint and whitespace checks passed. Browser checks cover local font loading, revenue calculation for both plans, empty/zero and very large job values, scope text, enquiry acknowledgement, quote reminder cancellation, automatic progression and reduced motion, original page rendering and page errors. No horizontal document overflow at 320, 390, 768, 1024 or 1440 pixels. Every section was rendered and visually inspected at 390 and 1440 pixels, with additional scene-state checks. A subsequent focused check verified removal of scene controls and the revised hero proportions.

Comparison references were the Customer Marketing hero/scene and homepage launch/final CTA. Inter Tight and Manrope remain locally served under page-scoped aliases. No booking form was submitted.

## Latest visual refinement

The enquiry uses a muted sage backdrop with separate light glass message bubbles. The review scene uses warm taupe, the Google wordmark and empty rating stars to show an invitation rather than a fabricated rating. Removed the review connector and calculator decorative rule. The cost note now reads “Monthly plan only. GST, usage and setup extra. View pricing.” The result remains explicitly an average-job revenue comparison. Rendered and inspected enquiry, reviews, launch and empty/filled calculator at 390px and 1440px. Five viewport widths, finite progression, reduced-motion final states and removal of the copied homepage asset were checked.
