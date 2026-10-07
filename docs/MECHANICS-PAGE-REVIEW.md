# Mechanics industry page

Route: `/industries/mechanics`
Review date: 7 October 2026
Status: implemented review draft. Noindex and excluded from the sitemap. GitHub changes sync into the connected editor; public publication is a separate action.

## Scope

The approved workshop story covers enquiry capture, estimate follow-up and the return visit, followed by workshop-system fit, Guided Launch and a Book a Call CTA. Existing navigation and footer remain root-owned. No Industries menu was added.

The hero photograph is generated editorial imagery, not a customer testimonial. The workflow surfaces are illustrative examples, not screenshots of a tested workshop integration.

## Review lenses

These are implementation reviews, not external stakeholder approvals.

| Lens | Review outcome |
| --- | --- |
| SME buyer | Workshop language, supplied vehicle details and next-step ownership make the customer journey concrete. Booking requests require team confirmation. |
| UI and UX | Different scene compositions, one page heading, descriptive links, keyboard focus states and readable next actions. Desktop and mobile renders inspected. |
| Brand and creative | Incumbent warm white, sage, deep green, Zapla blue, petal and approved portrait sprite. Skilled work photograph, generous space, homepage-style closing CTA. |
| Motion | One finite causal estimate sequence, with pause, replay and manual steps. Reserved message space avoids layout shifts. Reduced motion shows the completed story and allows manual review. |
| Product accuracy | AI Receptionist remains optional. Workshop jobs, vehicle history, parts and diary remain authoritative. Data connections, triggers and ownership require agreement in setup. |
| Conversion and commercial | Book a Call is the primary action. Contextual links connect to established product pages. Follow-Through, Growth and optional AI scope are distinguished; users, fair use and usage charges are disclosed. |
| Editorial and AI slop | No invented performance metrics, customer proof, integration logos, guaranteed bookings or repetitive feature grids. |

## Verification

- Production build passed after incorporating the latest main branch, including the comparison draft.
- TypeScript and scoped route ESLint checks passed.
- Rendered at 1440px desktop and 390px mobile. Additional overflow checks at 320px, 768px and 1024px passed.
- Both photographic assets loaded successfully.
- Manual handoff selection, pause, replay, reduced-motion final state and reduced-motion manual selection passed.
- No browser page errors in the final check. An initial reduced-motion hydration mismatch was corrected before committing.
- Generated route tree preserves the existing comparison route.
- No booking form was submitted. No end-to-end workshop integration or live customer automation was exercised.

## Launch boundary

Before indexing or treating this as an operational promise, verify the actual workshop data transfer, customer-to-vehicle matching, service dates, reply and booking suppression, message permissions and handoff rules in the agreed customer setup.
