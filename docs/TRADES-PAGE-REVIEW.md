# Trades & Home Services page

## Decision and scope

Build one service-business page at `/industries/trades`. The category is defensible when grouped by customer journey rather than by licensing or equipment: local enquiry, assessment or quote, decision, completed work and a possible future service need. The organising problem is customer opportunities slipping between those steps. It is not a replacement for field-service operations.

The strongest objection is that trade businesses vary substantially, and existing job software already automates some of this work. The page addresses that directly instead of presenting quote reminders as unique to Zapla. If the incumbent solves the customer's entire problem, another platform is unnecessary.

The strongest case for grouping is that the customer-facing gaps can be explained with a few recognisable service scenarios. The page uses roofing for the occupied operator, plumbing for enquiry capture, air conditioning for a quote question, and air conditioning, pest control and pool services for future work. Electrical appears with genuine recorded maintenance needs. The examples do not imply identical quote values, service intervals or buying behaviour.

Priority ranking is strategic judgment, not measured demand or conversion research:

1. Air conditioning: quotes and recorded service needs support the full story.
2. Plumbing: enquiries and assessment requests are recognisable; urgent dispatch stays separate.
3. Electrical: quote and office handoff fit; repeat outreach requires a real maintenance reason.
4. Pest control: agreed future inspections support relevant return contact.
5. Pool services: recurring and seasonal customer relationships support database value.
6. Roofing: higher-consideration quotes fit; generic recurring service is not assumed.

Local painting, garage doors, cleaning, landscaping, handyman and tree-service businesses can fit when their customer journey meets the same criteria. They are not given equal visual prominence. Large construction, major renovations, kitchen and bathroom projects, solar sales and emergency dispatch-only businesses need separate qualification or a separate page. Builders and renovators should eventually be considered independently because long project sales, estimating, change orders and project delivery alter the journey.

## Positioning and creative choice

Compared three directions:

| Direction | Strength | Weakness | Decision |
| --- | --- | --- | --- |
| Gaps between stages | Commercial focus across several trades | Abstract diagrams can feel generic | Use as organising idea, not as a giant pipeline diagram |
| Owner on the tools | Immediate recognition and human context | Can reduce the entire product to answering calls | Use in hero only, paired with an enquiry reply |
| One customer through every stage | Clear product causality | Forces repeat work onto trades where it is unnatural | Use separate, bounded customers and needs |

The implemented page combines a human work scene with a sequence of discrete, trade-specific customer stories. The hero is “Don’t let the next job slip through the gaps.” The original roof scene remains a still; the operator does not pause to check a phone. Product overlays explain the software role. No new generated imagery, footage or synthetic dashboard was introduced.

## Buyer understanding and page jobs

| Awareness | Likely thinking | Page response |
| --- | --- | --- |
| Unaware | We are busy; admin gets done later | Hero and enquiry scene expose an unanswered next step |
| Problem aware | Quotes go quiet and calls arrive at inconvenient times | Specific hot-water enquiry and split-system quote |
| Solution aware | My job software may already do this | Existing-system section recognises overlap and targets remaining gaps |
| Product aware | How would Zapla work with my team and data? | Data-trigger boundary, reply handoff and Guided Launch |
| Most aware | What am I paying for and what happens next? | Plan costs, extras and a concrete sales-call agenda |

Functional job: capture context and keep the next action visible. Emotional job: reduce forgotten follow-up and evening setup work. Social job: respond like an organised local business without robotic chasing. Risk-reduction job: retain job software, define ownership, limit messages and test the data path before launch.

The primary sales argument is improving handling of demand and customer relationships already entering the business. Pricing differentiation is secondary, positioned near plans when the office and owner access question becomes relevant. Unlimited stored contacts carries fair-use wording; platform pricing is not confused with unlimited communications.

Page order: hero → enquiry capture → optional call answering → quote question and handoff → relevant future service → neutral review request → existing systems → Guided Launch → plans → FAQs → specific call invitation.

## Research and competitor challenge

Primary sources checked during implementation:

- [ServiceM8 quote follow-up automation](https://support.servicem8.com/help-center/servicem8-add-ons/automation/quote-follow-up-automation)
- [ServiceM8 Australia pricing and capabilities](https://www.servicem8.com/au/pricing)
- [Tradify automatic quote reminders](https://help.tradifyhq.com/hc/en-us/articles/360049096213-Turn-on-Quote-Reminders)
- [Tradify Australia quoting software](https://www.tradifyhq.com/au/features/quoting-software)
- [Simpro job management](https://www.simprogroup.com/solutions/job-management-software)

ServiceM8 and Tradify already support automatic quote follow-up; Simpro provides specialised job-management functionality. The page does not imply those systems lack customer communication. There is no claim that Zapla is the only product that connects customer steps. Fergus is referenced as existing customer software, not as a researched feature comparison or a certified integration.

The commercial alternative is to configure and use the incumbent's capabilities properly. That can be preferable to adding Zapla. A fit call should identify a gap that remains before recommending the extra subscription. Broad claims that every tradie needs marketing automation or that one extra job pays for the system are rejected.

## Product and claims audit

The current repository's CRM, Follow-Up, Customer Marketing, AI Receptionist, Reactivation, Reviews and Pricing pages establish the public product scope used here. They are evidence of the incumbent website's positioning, not runtime certification of a customer's deployment. The named NextGen announcement document was not included in these attachments or found in the inspected repository. No claim that migration is complete or that a native integration is confirmed is made.

| Capability | Confidence | Page boundary |
| --- | --- | --- |
| Customer records, fields, inbox, stages | Confirmed in current site; deployment not exercised | Enquiry, suburb, request and next action remain together |
| SMS follow-up and response rules | Confirmed in current site; configuration required | Agreed sequence stops on reply and returns to the team |
| Quote-sent or job-complete trigger | Conditional; external data connection unknown | Recorded Zapla stage or scoped data path is explicitly required |
| AI Receptionist | Confirmed current optional offer; deployment not exercised | Capture, routing and agreed rules; no diagnosis or emergency arrival promises |
| Calendar booking | Confirmed current site; trade capacity sync unknown | No automatic dispatch, technician availability or trade-job booking is demonstrated |
| Customer groups and date-based outreach | Confirmed current site; source data required | Genuine service need, recorded date or relevant seasonal reason |
| Reactivation | Confirmed current Growth offer | Eligible selected customers, not indiscriminate database contact |
| Google review requests | Confirmed current site; configured completion stage required | Neutral invitation; no happy-customer filtering or guaranteed rating |
| ServiceM8, Simpro, Fergus, Tradify integrations | Unknown | No native connection or universal sync claim |
| Dispatch, job costing, materials, field certificates | Not established as Zapla scope | Remain in specialised operational software |

Website form capture, messaging and pipeline automation are used conservatively from the incumbent site scope. The implementation does not establish whether any backend behaviour remains legacy-GHL dependent. That must be verified before promising an actual deployment.

Demonstration customers, quotes and messages are illustrative product explanations. Their screen-reader labels make this explicit. They are not testimonials, completed live jobs or performance evidence. Static action text inside messages is not a deceptive clickable booking or review control. No invented audience counts, job values, conversion rates, savings or ROI figures appear.

The only numerical commercial claims are the current pricing-page amounts: Follow-Through A$399 per month plus GST and Guided Launch from A$1,997 plus GST; Growth A$699 and Guided Launch from A$2,997. Usage, optional AI Receptionist and custom connections are separate. These should change with the pricing source if the offer changes.

## Visual, motion and implementation review

Compared rendered Homepage, Customer Marketing and Mechanics at desktop size before final review. Read AGENTS.md, website build protocol, design guardrails, video creative system, root shell, SiteNav and DominoFooter. Other requested industries were absent from the checked initial main tree; their existence was not assumed.

Inter Tight and Manrope are locally served. Warm white, sage, peach and deep green follow the incumbent brand. The actual logo and petal are reused. Photography is selected from existing project assets. The page mixes a broad human scene, offset enquiry cards, a physical quote document, selectable customer return examples, one dark review panel and open implementation sections. Pricing is the only intentionally equal pair of cards. No construction palette, tool-icon grid, glowing badges, fabricated metrics or dancing UI.

Enquiry and quote scenes progress once, pause offscreen and hold their final state. Enquiry timing is 650ms + 850ms; quote timing is 700ms + 1,000ms, plus short visual transitions. Reduced motion exposes the complete story. Layout is reserved for later messages. The reduced-motion state was moved into an effect after a browser pass found server/client class differences. No repeating page animation requires a pause control.

Mobile review tightened the hero headline to prevent a single-word orphan and corrected the return-customer portrait. Below 900px, quote copy precedes the demonstration. Customer examples are native buttons with vertical tab semantics, arrow-key navigation and Home/End support. FAQs use native details/summary. Focus indicators are visible. All page classes are scoped to the route stylesheet; root-owned navigation and footer remain shared. The existing Solutions menu's industry links now include Trades on desktop and mobile.

## Website-level fit and SEO

Route: `/industries/trades`. Topic: Australian trade/customer CRM and follow-through. Title: “CRM for Trades & Home Services in Australia | Zapla”. Description covers enquiry capture, quote follow-up, service return and existing job software. Open Graph and Twitter titles/descriptions are route-specific.

The route follows the site's internal-review convention: noindex/nofollow and excluded from sitemap. SEO assessment below refers to topic, copy and linking readiness, not current indexability, ranking or search traffic. No search-volume claims were made.

Added an incoming contextual link from Follow-Up, without replacing its established Quote Follow-Up link. The page links to CRM, AI Receptionist, Follow-Up, Customer Marketing, Reactivation, Reviews, Pricing and Mechanics. The generated route tree includes the route so it can be recognised by the connected preview. During implementation the upstream repository added Dental and industry links under Solutions. That newer structure is preserved, and Trades is added beside those existing links.

Mechanics owns workshop-specific vehicle details, service dates and workshop booking. Trades owns on-site enquiry capture, site assessment and quoting, office handoff and variable home-service return needs. The latest header information architecture is preserved; a separate Industries mega-menu is not introduced. Future campaign pages can share the shell, CTA, accessible interaction and setup pattern, but should develop their own customer problems and scenes.

## Thirteen-lens re-audit

These are author assessments, not independent panel approvals, customer interview results or measured conversion outcomes. The requested threshold is not evidence that a score has been earned.

| Lens | Score / 10 | Challenge and response | Remaining limitation |
| --- | --- | --- | --- |
| Product Marketing Director | 9 | Specific customer gaps; optional AI separated; job-software overlap acknowledged | Requires deployment validation |
| Conversion Director | 8.5 | Concrete CTA, workflow proof and total cost boundaries | No verified trade customer result or conversion test |
| Brand / Creative Director | 9 | Real work context; restrained autumn palette; distinct page rhythm | Uses incumbent roofing still rather than a new photographic campaign |
| UI/UX Director | 9 | Stable stories, responsive stacking, native FAQs and keyboard tabs | Automated and author inspection, not user testing |
| Motion Director | 9 | Finite causal stories, short timings, offscreen pause and reduced motion | No live backend activity is shown |
| Australian Trade Business Owner | 9 | Site visit, hot water enquiry, old-unit removal and local-service language | Informed role review, not an interviewed owner |
| Office Manager / Dispatcher | 9 | Customer context and ownership visible; scheduling remains operational | Data handoff must be validated for the actual stack |
| Buyer Psychologist | 8.5 | Reduces migration, spam and setup fears without absolute promises | Trusted customer evidence is absent |
| CFO | 8.5 | Shows setup, usage and exclusions; contribution-based assessment | Implementation cost and realised benefit remain unmeasured |
| Sales Director | 9 | Qualifies the use case and gives a specific fit-call agenda | Prospect response has not been observed |
| Competitor | 8.5 | Rejects reminder uniqueness and accepts incumbent alternative | No verified comparative outcome or integration advantage |
| SEO Director | 9 for draft readiness | Clear topic, stable route, metadata and contextual internal links | Intentionally noindexed; no rankings or keyword demand validated |
| AI-Slop Critic | 9 | No synthetic performance, jargon-rich dashboard or industrial cliché | Existing demonstration imagery is not customer evidence |

An honest all-lens 9 is not achieved. More visual polishing does not resolve the evidence gap. The next material improvement is a real trade deployment: document the old process, configured data path, messages and stop rules, customer responses and attributable jobs or office time over a stated period. Get permission before presenting it as public customer proof. This is preferable to inventing numbers or using a stock testimonial.

## Verification

Production build, TypeScript, scoped ESLint and whitespace checks passed. Browser checks passed at 320, 390, 768, 1024 and 1440 pixels: no document overflow, one H1, local image loading, pricing paths, noindex metadata, complete reduced-motion scenes, keyboard tab selection and native FAQ expansion. Normal-motion checks verified finite quote progression, final hold, offscreen pause and resume. The incoming Follow-Up link was verified. No script or hydration errors or failed local assets remained. External Google font and shared footer-social requests were unavailable in the restricted test environment; the trades route uses local fonts. No sales booking or review form was submitted.

The latest upstream mechanics motion change and new Dental page were checked and preserved when preparing the GitHub commit. This work does not overwrite those routes or stylesheets. Full-page desktop and mobile renders plus mobile section renders were inspected; the changes include mobile headline wrapping and the customer portrait correction.

## Final recommendation

Keep the page as a reviewable, noindexed industry page. Use it to qualify local service businesses with genuine customer gaps. Do not sell universal integrations, dispatch or guaranteed returns. Validate one real trade workflow and gather credible outcome evidence before declaring the commercial lenses 9 or publishing the page as proven performance marketing.

## Follow-up review: financial decision and incumbent alternative

Added a visible fit check beneath the operational comparison: use the existing job system when it already covers the gap; consider Zapla when enquiries across channels, customer conversations and return campaigns need a shared process the current setup does not cover. This makes the incumbent alternative explicit before the launch and pricing sections.

Added an optional, collapsed cost check below pricing. The owner supplies monthly usage and add-ons and contribution per additional job. Plan pricing and minimum launch fees match the current Pricing-v3 route. The period defaults to 12 months and is editable, as is the scoped setup cost. No job-margin estimate or usage allowance is fabricated. The output divides plan cost over the selected period, setup and recurring extras by job contribution, rounding up to whole jobs. It is explicitly a cost check rather than a forecast, excludes GST consistently and notes that team time can add to cost. Blank, non-finite, negative and zero-contribution entries do not yield a result; monetary precision is preserved.

This improves financial clarity and qualification without pretending to provide real-world conversion evidence. The commercial scores above remain bounded by the same missing customer evidence. An all-lens 9 has not been substantiated.

Follow-up verification: TypeScript and production build passed. Browser tests verified both plan calculations, editable inputs, cents, empty/zero/negative inputs, five viewport widths from 320 to 1440px, keyboard audience switching, one H1 and no page-script errors. Desktop full-page, desktop cost-check and mobile viewport renders were inspected. No document or cost-field horizontal overflow was found. The published lovable.app address currently serves an older site and returns 404 for this route; the authenticated editor preview cannot be verified from the available signed-out browser. GitHub remains the implementation source of truth.
