# Mechanics V2 review

Route: `/industries/mechanics-v2`. Original route `/industries/mechanics` and its CSS remain unchanged.

V2 retains the approved structure, hero headline, photography, incumbent Zapla palette and root navigation/footer. It sharpens the supporting copy and rebuilds the product scenes around customer events.

## Implemented changes

- Hero: enquiry, supplied vehicle context, reception handoff.
- Enquiry: customer's message, outbound acknowledgement, captured details, named team owner.
- Estimate: meaningful initial waiting state, automated prompt, customer reply, immediate cancellation of the next reminder, team handoff.
- Return visit: prominent service due month, vehicle-specific service record, prepared reminder, sent reminder, customer reply. Photography supports the product scene.
- Finite scene playback with pause/replay, manual selection where appropriate, offscreen pause and reduced-motion final views. No automatic looping or decorative floating.
- Compact mobile controls and spacing. Separate page-specific CSS preserves V1.

## Review lenses

These are the author's reviews of the rendered implementation, not external approvals or measured conversion results.

| Lens               | Finding                                                                                                                                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI and UX          | Distinct scene compositions, readable waiting state, clear handoff and controls. Desktop and mobile screenshots inspected.                                                                                                                                                    |
| Brand and creative | Incumbent soft autumn palette, type, petal, photography and portrait system retained. Fine borders and restrained depth rather than extra outer containers.                                                                                                                   |
| Product marketing  | Workshop events explain the value. The estimate scene shows outreach stopping as well as starting.                                                                                                                                                                            |
| Conversion         | Each scene states the commercial reason to act. An owner-input cost threshold uses current plan prices, estimated recurring extras and job contribution. Setup is separately disclosed and included in a first-year average threshold. Verified workshop proof remains a gap. |
| Motion             | Causal state progression, stable scene geometry, finite playback and immediate reply suppression. Offscreen and reduced-motion behaviour checked.                                                                                                                             |
| SME buyer          | Reception confirms workshop availability. Jobs, parts, vehicle history and diary remain in the workshop system.                                                                                                                                                               |
| Buyer psychology   | Useful prompts preserve customer choice; a reply stops chasing and passes the decision to a person. No urgency manipulation or guaranteed outcomes.                                                                                                                           |
| AI-slop critic     | No invented metrics, testimonials, integration logos or performance proof. Demonstrations are explicitly illustrative.                                                                                                                                                        |

## Verification

Production build, TypeScript, scoped ESLint and whitespace checks passed. Browser checks passed for both images, reminder cancellation on reply, handoff, pause/replay, manual enquiry selection, reduced-motion final/manual states, offscreen pause and automatic progression. No page errors in the final run. No horizontal document overflow at 320, 390, 768, 1024 and 1440 pixels. Original route also rendered successfully.

The original route and stylesheet have no diff. Only V2 files, this review note and the generated route registration are added or changed.

## Boundaries

Both pages remain review drafts with noindex and sitemap exclusion. Public publishing is separate. Workflow demonstrations are not live workshop integrations; data mapping, reply suppression, appointments, service records and customer permissions require validation in actual setup. No booking form was submitted.

## Commercial revision, 8 October 2026

- Sharper hero and scene copy links enquiry response, estimate decisions and service recall to workshop value.
- Section and playback stage numbers removed. Guided Launch retains plain 1, 2, 3 because it is an ordered process.
- The final call asks whether an agreed setup is worth the cost, rather than only where the software fits.
- Removed decorative fit icons. Increased key service, cancellation and playback type sizes.
- Cost check defaults to Growth because proactive service recall belongs to that plan. Follow-Through explicitly excludes proactive recall and reactivation.
- Current Pricing-v3 prices: Follow-Through A$399/month, minimum setup A$1,997; Growth A$699/month, minimum setup A$2,997. Figures exclude GST. Usage and add-ons are separate user inputs. Setup remains payable separately; the first-year result spreads its minimum cost over twelve months solely for comparison.
- No assumed job contribution, forecast results, invented testimonials or payback guarantees. Capacity-constrained workshops are prompted to assess realistic staff time savings instead.

Revision checks: production build, TypeScript, scoped ESLint and diff whitespace passed. Browser assertions checked empty initial result, whole-job rounding, exact cost boundaries, both plans, plan scope text, zero contribution and negative usage. Also checked acknowledgement visibility, cancellation on reply, reduced-motion output, no document overflow at 320/390/768/1024/1440 pixels, original page rendering and no page errors. Desktop enquiry/return/cost and mobile cost screenshots inspected.

Remaining evidence gap: a real workshop pilot must validate the agreed integrations and collect starting conditions, responses, completed jobs and staff effort before a case study or performance claim can be published. This revision improves the buying decision; it does not demonstrate measured conversion uplift.
