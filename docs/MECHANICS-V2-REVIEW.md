# Mechanics V2 review

Route: `/industries/mechanics-v2`. Original route `/industries/mechanics` and its CSS remain unchanged.

V2 retains the approved structure, hero headline, photography, incumbent Zapla palette and root navigation/footer. It sharpens the supporting copy and rebuilds the product scenes around customer events.

## Implemented changes

- Hero: enquiry, supplied vehicle context, reception handoff.
- Enquiry: customer's message, captured details, named team owner.
- Estimate: meaningful initial waiting state, automated prompt, customer reply, immediate cancellation of the next reminder, team handoff.
- Return visit: vehicle-specific service record, prepared reminder, sent reminder, customer reply.
- Finite scene playback with pause/replay, manual selection where appropriate, offscreen pause and reduced-motion final views. No automatic looping or decorative floating.
- Compact mobile controls and spacing. Separate page-specific CSS preserves V1.

## Review lenses

These are the author's reviews of the rendered implementation, not external approvals or measured conversion results.

| Lens | Finding |
| --- | --- |
| UI and UX | Distinct scene compositions, readable waiting state, clear handoff and controls. Desktop and mobile screenshots inspected. |
| Brand and creative | Incumbent soft autumn palette, type, petal, photography and portrait system retained. Fine borders and restrained depth rather than extra outer containers. |
| Product marketing | Workshop events explain the value. The estimate scene shows outreach stopping as well as starting. |
| Conversion | Concrete customer situations and established Book a Call/pricing links. Verified workshop proof remains a gap. |
| Motion | Causal state progression, stable scene geometry, finite playback and immediate reply suppression. Offscreen and reduced-motion behaviour checked. |
| SME buyer | Reception confirms workshop availability. Jobs, parts, vehicle history and diary remain in the workshop system. |
| Buyer psychology | Useful prompts preserve customer choice; a reply stops chasing and passes the decision to a person. No urgency manipulation or guaranteed outcomes. |
| AI-slop critic | No invented metrics, testimonials, integration logos or performance proof. Demonstrations are explicitly illustrative. |

## Verification

Production build, TypeScript, scoped ESLint and whitespace checks passed. Browser checks passed for both images, reminder cancellation on reply, handoff, pause/replay, manual enquiry selection, reduced-motion final/manual states, offscreen pause and automatic progression. No page errors in the final run. No horizontal document overflow at 320, 390, 768, 1024 and 1440 pixels. Original route also rendered successfully.

The original route and stylesheet have no diff. Only V2 files, this review note and the generated route registration are added or changed.

## Boundaries

Both pages remain review drafts with noindex and sitemap exclusion. Public publishing is separate. Workflow demonstrations are not live workshop integrations; data mapping, reply suppression, appointments, service records and customer permissions require validation in actual setup. No booking form was submitted.
