# Allied health page review

Route: `/industries/allied-health`

## Status

Implemented review draft. Production build, TypeScript and scoped ESLint pass. Rendered desktop, mobile, zoomed out composition and motion QA remain blocked by the Lovable preview login wall. The cloud browser cannot access the local development server. No claim of 9/10 visual approval or external approval is made.

## October 9 revision following the dental review critique

Applied the visible dental review requirements: plain task-specific copy, practical forms and follow-up workflows, feedback and Google review requests, stronger practice workflow coverage and deliberate section rhythm. Retrieval of the latest separate conversation failed, so this revision does not claim access to unseen subsequent discussion.

The original page was too concentrated on enquiries and callbacks. It underexplained the breadth relevant to a practice manager and overused abstract headings. The revision adds:

- Digital administrative new patient form: contact preference, callback timing, submission attached to enquiry, reception task update and form reminder stop.
- Practitioner approved return reminder: practice supplies eligibility and due date; current appointments and contact permissions checked before messaging; reply or opt out stops the sequence.
- Neutral feedback and optional Google review requests: named staff owner; no incentives, positive-only selection or automatic clinical testimonial publication.
- Clearer headings for enquiry follow-up, software fit, care decisions and FAQs.
- Alternating enquiry, form and return scene layouts with a smaller supporting feedback section.

### Explicit scoring

Scores below are subjective editorial assessments of copy and source-defined workflows, not rendered visual scores, clinical approval, product certification or measured conversion predictions.

| Lens | Original | Revised | Remaining limitation |
| --- | ---: | ---: | --- |
| Copywriting | 7 | 9 | Final rendered headline breaks and density unverified |
| Allied health practice workflow | 6 | 9 | Real configuration and connections must be scoped |
| Practice manager | 7 | 9 | Reception acceptance testing remains practice-specific |
| Product marketing | 7 | 8.5 | No verified case study or distinct integration proof |
| Conversion and sales | 7 | 8.5 | No live conversion evidence or rendered hierarchy review |
| Buyer psychology | 7.5 | 8.5 | Requires scan review with actual page |
| CFO | 8 | 8.5 | No practice-specific economics or ROI data |
| Competitor | 8 | 9 | Explicitly acknowledges existing PMS forms and messaging |
| Australian healthcare risk in copy | 8.5 | 9 | Actual privacy, providers, consent and deployment review still required |
| SEO content | 8 | 8.5 | Review draft remains noindex; no search performance evidence |
| UI/UX, Brand/Creative, whole-page art direction | Unverified | Unverified | Rendered desktop, mobile and zoomed out inspection blocked |
| Motion presentation | Unverified | Unverified | Source timing checked; actual scrolling and readability unverified |
| AI slop visual critic | Unverified | Unverified | Must see the real render before assigning a score |

A 9 across all lenses has not been achieved or verified. The missing proof cannot be replaced by raising scores to match a target.

### Source checks for the new scope

- [Cliniko automatic patient forms](https://help.cliniko.com/en/articles/4447434-automatically-send-forms-to-patients): existing PMS can already send forms. Keep a working incumbent process.
- [Cliniko patient follow-up messaging](https://www.cliniko.com/features/appointments/patient-follow-ups/): follow-up is not automatically a differentiator. Start with a documented gap.
- [Ahpra advertising FAQ](https://www.ahpra.gov.au/Resources/Advertising-hub/Frequently-asked-questions): independent reviews and clinical testimonials used in advertising differ.
- [OAIC collecting health information](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/health-service-providers/guide-to-health-privacy/chapter-2-collecting-health-information): collection purpose, consent and notice matter for online forms.

## Direction and review findings

The approved positioning is enquiry follow through around existing practice software, led by a physiotherapy example. A phone-first AI page was considered and rejected because it narrows the proposition and overlaps the AI Receptionist page. Replacing the clinical system was rejected because the software connections and clinical capabilities are unverified.

| Lens | Implemented evidence | Remaining gate |
| --- | --- | --- |
| Brand and creative | Existing Zapla palette, local Inter Tight and Manrope, real petal component, incumbent physiotherapy photograph, asymmetric hero and warm section rhythm | Compare actual desktop and mobile renders with homepage and mechanics page |
| UI and UX | One enquiry sequence, early software fit, semantic headings, focus styles, native FAQs, 44px workflow controls | Inspect line breaks, crop, overflow, touch targets and whole-page composition |
| Motion | Pre-trigger near viewport, 350ms then 600ms progression, pause when offscreen, hold final state, reduced motion final state, explicit manual controls | Observe actual scrolling and interactions at normal speed |
| Product marketing | Separates booking/reminders already in PMS from unresolved enquiry ownership; no unsupported integration strip | Buyer comprehension review on rendered page |
| Conversion | Book a Call, See how it works anchor, pricing link and final CTA | Check visible CTA hierarchy and mobile journey |
| Allied health owner | Preserve practice software; start with an agreed gap; care decisions remain human | Practice-specific implementation evidence needed before service claims are expanded |
| Practice manager | Reception task owner, reply handoff, stop conditions and launch testing | Confirm proposed workflow with real reception process |
| Buyer psychology | Reassurance early, optional AI, bounded first scope | Rendered scan and objections review |
| CFO | Platform, setup, usage and custom integration separation; scope must earn its place | No fabricated ROI or revenue proof; commercial validation remains practice-specific |
| Sales | Fit-first discovery and supported booking connections | No assumed booking sync or named integration promises |
| Competitor | Acknowledges current software may handle bookings and reminders well | Demonstrate incremental value in discovery rather than feature overlap |
| Australian healthcare risk | No treatment claims, testimonials or compliance badges; clinical questions remain human; minimum data, provider review and consent boundaries | Actual privacy/provider/booking configuration review before deployment with patient data |
| SEO | Unique title/description and H1; noindex and excluded sitemap during review | Indexability remains deliberately pending launch approval and proof |
| AI slop critic | No invented metrics, generic icon grids, floating animation or dashboard garnish | Judge actual rendered hierarchy and visual density |

## Illustrative workflow

Enquiry asks about appointment times. Configured reply provides the practice booking link and offers reception help. Agreed follow up prompts an unresolved enquiry. Reply creates the reception callback task and stops scheduled follow ups. Appointment confirmation remains with the existing booking system. Link clicks are not treated as booking proof.

All conversation data is fictional. Optional AI is administrative and does not diagnose, recommend treatment or assess urgency.

## Verification

- `npm run build`: passed.
- `npx tsc --noEmit`: passed.
- Scoped ESLint for the new component and route: passed.
- `git diff --check`: passed.
- New route generated by TanStack.
- Desktop and mobile navigation entries added without changing existing entries.
- Visual and interaction verification: pending authenticated preview access.
