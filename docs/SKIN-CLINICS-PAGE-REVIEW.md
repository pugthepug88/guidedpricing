# Skin & Cosmetic Clinics checklist review
Reviewed 12 October 2026. This supersedes the earlier scored assessment. No numerical quality or conversion scores are claimed.

## Commercial focus and awareness
The owner proposition is timely enquiry handling and less routine reception work. Reactivation is one supporting use case, alongside enquiry replies, pre-visit administration, agreed consultation follow-up and feedback.
Problem recognition comes from the opening and three communication gaps; the demonstrations explain the solution and product; software-fit copy, launch, costs and FAQs help visitors assess fit; the final call agenda provides the next step.
Both spreadsheets/inboxes and existing CRMs are explicitly supported. Clinical systems remain responsible for clinical information and decisions.

## Fixed
- Unified hero, dialogue and photo-overlay glass: translucent cream background, 6px blur, double light border, 18px corners and soft shadow. Compared actual skin and Dental pre-visit cards over different photography.
- Compact pre-visit and return invitation cards; removed oversized overlay headings, repeated handoff captions and visible staging labels.
- Same Mia portrait throughout client messages and records; Zapla petal for automated business messages. Fixed mobile avatar dimensions.
- Shared Google wordmark colours and five outlined, unselected stars. These are demonstrations, not reviews or testimonials. No inflated overlay selectors.
- Clear triggers, responses and team responsibilities; form completion and appointment messages qualify their required data connections.
- Monthly and launch prices show GST, plan differences and separate usage. Standard launch is up to three agreed automations; additional clinic connections/workflows are scoped separately. Pricing verified against current Pricing-v3 implementation, including SMS charges and optional AI Receptionist.
- Prompt 200ms first reveal, 450ms next step, 180ms transition, held final state. Background-tab pause added. Reduced motion shows completed scenes.

## Verification
| Check | Evidence and result |
|---|---|
| Build, TypeScript, scoped lint | Passed. Production Nitro build completed. |
| Responsive bounds | Actual descendant rectangles checked at iframe widths 1348, 1024, 768, 390 and 320px. No main-page element extended beyond the content viewport, including hidden animated states; this is not just a scrollWidth check. Classic scrollbars reduced available content width by 15px at most sizes. |
| Visual review | Desktop opening and zoomed-out composition; desktop pre-visit and return overlays; 1024px enquiry dialogue; tablet pre-visit; mobile dark-panel typography; 320px opening, pre-visit, return and Google cards inspected. Faces stayed visible; text wrapped within cards. This does not claim every section/state was screenshot-reviewed at every size. |
| Brand comparison | Rebuild references include homepage, Dental and Mechanics. This revision compared Dental's actual rendered pre-visit glass with Skin. Skin retains its own asymmetric hero and broader return photograph. |
| Identity and images | Three photos loaded successfully. Client messages reuse one portrait sprite; automated messages use the petal. |
| FAQs and keyboard | First FAQ opened with Enter, remaining nine opened by keyboard; first also toggled closed. Expanded narrow-screen content had no out-of-bounds elements. |
| Anchor | Client-flow anchor opened the correct section below the sticky header. |
| Supporting links | Follow-up, CRM, reactivation, reviews, AI Receptionist and Pricing-v3 destinations rendered successfully in browser. |
| Booking | Real booking calendar opened; choosing a time reached the details form. No booking was submitted, so completed booking and confirmation delivery remain unverified. |
| Motion | Actual React component tested in DOM simulation: all five scenes initially at step zero, paused while hidden, resumed to final step and held; reduced-motion mode began at final step. Native browser/OS reduced-motion preference not toggled. |
| Runtime | No page-origin runtime errors observed. QA width selector had a temporary harness-only handler collision; applying width through its Full size button worked. Harness removed from final code. Browser extension and Vercel sign-in logs are not page failures. |
| Preview | Cloudflare branch build succeeded; actual page rendered publicly. Vercel branch preview requires sign-in. |

## Remaining limitations
Live clinic booking connections, form events, reply/opt-out behaviour and platform privacy/retention configuration need product and clinic verification. No native Timely, Fresha, Kitomba or Pabau integration is promised. No customer results, testimonials or financial return are invented. Real conversion performance requires visitor/booking data. Full screen-reader, 200% zoom and native reduced-motion browser checks remain incomplete. Shared footer social links currently point to generic service homepages; those global components were outside this page change.
