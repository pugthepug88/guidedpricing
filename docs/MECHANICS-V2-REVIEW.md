# Mechanics V2 review

Route `/industries/mechanics-v2`. Original mechanics route and stylesheet, shared navigation and footer remain unchanged. V2 stays noindex and sitemap-excluded.

## Story and product accuracy

The journey is enquiry → quote → next service → review → implementation → plans → call. Routine bookings no longer default to a receptionist checking availability. Enquiries receive an inspection booking link using a configured Zapla calendar. Recorded vehicle dates trigger relevant service or NSW pink slip reminders with a service booking link. Human help is reserved for questions about the work: Mia asks whether her quote includes pads and discs, and further reminders stop when she replies.

These are illustrative customer conversations, not records of a real customer's booking or a live integration demonstration. Booking labels inside scenes are noninteractive spans, not links to the Zapla sales calendar. Screen-reader descriptions identify the enquiry and service scenes as illustrations. No universal workshop-system availability sync is claimed. Pricing-v3 includes calendars and online booking, with calendar configuration during Guided Launch. Vehicle dates must be available in Zapla; setup agrees the data path.

The hero shows an automatic next step instead of “Captured for reception”. The redundant enquiry footer and quote handoff paragraph have been removed. The service reply illustrates a customer who has used the booking link. The launch plan tests enquiry, booking link and confirmation. Its human-reply scope remains explicit.

The primary enquiry-section link now leads to Follow-Up; the optional phone answering add-on has its own inline AI Receptionist link. This avoids sending a buyer interested in routine enquiry automation to a separate add-on.

## Commercial clarity

Quote copy makes the investment already made in quoting concrete. Service copy explains who is due, why they should hear from the workshop and why timing matters. Reviews connect completed work to reputation and prospective customer confidence without guaranteeing ratings or new customers.

The revenue calculator remains removed. Plan summaries explain what the monthly price covers across enquiries, online booking, quotes and Google reviews. Growth adds service reminders and reactivation. Prices remain A$399 and A$699 per month, with GST, usage and setup extra and a link to full inclusions. No fabricated price per review, invented job uplift or revenue/profit equivalence.

The closing call has a specific agenda: map existing processes, automation, human responsibilities and plan fit. This makes the next action more concrete than a vague assessment of whether Zapla is worth the cost.

## Visual and motion review

Whole-page desktop and mobile renders were inspected, then enquiry, quote, service, reviews, launch, pricing and closing details. Existing homepage and Customer Marketing render comparisons from the preceding review establish palette, typography, glass, portraits and footer continuity.

The page retains Inter Tight and Manrope, locally served; approved portrait sprite; Zapla petal; warm white, sage and cream surfaces; and the exact white double-border glass treatment. Cards remain subordinate to photographs. Enquiry and quote message offsets were reduced, and layouts stack below 900px to prevent narrow tablet dialogue columns. Unused scene-selector, playback, calculator and former quote styles were removed. Service overlay divider lines were removed.

Scenes progress once, pause offscreen and hold the outcome. Enquiry completes in 1.4 seconds; quote in 2.8 seconds; service in 3.2 seconds; reviews in 2.8 seconds. Stable geometry avoids layout jumps. Reduced motion shows the complete story without animation. No dropdowns, playback controls, looping decorative motion or fake dashboard metrics.

## Eight-lens re-audit

Author assessments, not independent stakeholder approvals or conversion-test results. A requested score is not evidence that the score has been earned.

| Lens              | Assessment | Remaining limit                                                                                                              |
| ----------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| UI/UX             | 9          | Clear scene hierarchy, avatars, booking paths and five-width responsive checks.                                              |
| Brand/Creative    | 9          | Established palette, glass and type; original V2 compositions within the site's visual language.                             |
| Product Marketing | 9          | Routine automation and human questions have distinct roles; configured calendar and recorded-date dependencies are explicit. |
| Conversion        | 8          | Relevant value and clear plan choice are present. Verified workshop outcomes and customer evidence remain absent.            |
| Motion            | 9          | Finite causal progression, stable composition, offscreen pause and complete reduced-motion state.                            |
| SME buyer         | 9          | Recognisable brake enquiry, quote question, due service, Google review and existing-system reassurance.                      |
| Buyer psychology  | 8.5        | Relevant timing and a concrete sales-call agenda reduce uncertainty; credible social proof is still missing.                 |
| AI-slop critic    | 9          | No synthetic metrics, control chrome, repeated example footnotes or invented ROI.                                            |

All-lens 9 is not honestly supportable without credible workshop proof. The next commercial improvement should be a verified workshop example documenting its previous process, deployed automation and observed result, rather than invented claims or another benefit grid. Operational validation must also confirm the eventual workshop configuration; this page review alone cannot certify it.

## Verification

Production build, TypeScript, scoped ESLint and whitespace checks passed. Browser checks cover five widths (320, 390, 768, 1024, 1440), document overflow, booking-path copy, removal of routine manual handoffs and scene controls, pricing, NSW wording, reduced-motion outcomes, finite quote progression and final hold, V1 rendering and no V2/V1 page errors. No booking form submitted. Previous comparison review observed a Customer Marketing hydration mismatch; that route remains outside this change and was not modified.
