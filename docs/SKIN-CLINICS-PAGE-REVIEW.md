# Skin & Cosmetic Clinics editorial rebuild review

Rebuild reviewed 12 October 2026. These scores are the author's design assessments, not independent expert approvals or measured business results.

## References and industry decision

Read the current Dental, Mechanics and homepage implementation, the build protocol, design guardrails and editorial photo story system. Inspected the rendered reference heroes and compared the complete rebuilt desktop composition against Dental using a responsive iframe review surface. USE Dental's glass treatment, type and photographic quality. ADAPT its variety of section compositions. REJECT copying dental recall intervals or treating cosmetic clients as a generic sales pipeline.

The owner needs enquiries answered, less manual administration and a usable conversation with eligible past clients. Reception needs callback preferences and an orderly handoff. The client needs timely information, room to decide and access to a qualified person. The alternative of a treatment-led promotion page was rejected: it weakens product clarity and risks implying clinical recommendations or unsupported treatment advertising.

## Implementation and observable evidence

The page uses a new reception hero with an asymmetric corner and compact enquiry card; open three-stage admin gaps; enquiry dialogue; an enclosed cream pre-visit photograph; a dark consultation follow-up panel; a broad consultation photograph with reactivation invitation and reply; a Google invitation with five unselected stars; open software fit; dark Guided Launch; explicit monthly and starting setup prices; native FAQs; and a concrete sales-call agenda.

Two fresh generated editorial photographs were encoded to WebP: reception 142 KB and pre-visit phone use 110 KB. The existing page-specific consultation photograph remains relevant to the return conversation. Faces are not covered by the product cards. On phones, photo overlays move below their photos. No statistics, testimonials, clinical results or native clinic integrations were invented. Examples are labelled or described as illustrative rather than customer proof. Shared navigation and footer remain root-owned.

Browser inspections used actual deployed content at iframe viewport widths 1348, 768 and 390 pixels. Inspected hero, enquiry, admin photo, consultation dialogue, client return cards, Google review screen and supporting content. Whole-page desktop and phone views inspected for rhythm. Main content scrollWidth matched its rendered width at tablet and phone sizes. The tablet/phone headline initially joined two words when hiding a line break; corrected and rechecked. The native pricing FAQ opens and exposes the correct costs. Photo asset loading was checked through image naturalWidth, all 1536 pixels.

One-way motion begins near the viewport edge. The first message is always present, subsequent states advance after 200 ms and 450 ms, with 180 ms opacity transitions. It holds the final result and pauses timers offscreen. Reduced-motion uses a hydration-safe effect to expose the final state; transitions are disabled. Normal dialogue final states were observed in the browser. Reduced-motion behavior was reviewed in implementation, not tested using an emulated browser preference.

## Lens audit

| Lens | Assessment | Observable basis and limitation |
| --- | --- | --- |
| Copywriting | 9/10 | Headings name reception work, pre-visit admin, client follow-up and costs. Removed poetic slogans and internal setup instructions from benefit copy. |
| Industry customer | 9/10 | Administrative examples, space to decide, clinical advice with clinicians, eligible return invitations. No injection or treatment outcome promotion. |
| Frontline operations | 9/10 for proposed flow | Capture callback preference; team arranges consultation in its diary; appointment messages require current booking updates. Actual staff handling needs clinic testing. |
| Automation logic | 8.5/10 confidence | Triggers, actions and handoffs are understandable. Form completion, replies, opt-outs and software updates have not been tested inside the user's current platform. |
| Art direction | 9/10 | Three human photo stories, compact translucent cards, broad photography and distinct dark/light compositions. |
| Visual hierarchy | 9/10 | Oversized outcome headings, one focal story per section, secondary detail visually quieter, no decorative metrics. |
| Brand consistency | 9/10 | Matches Dental glass opacity, light double border, 18px corner, 6px blur and soft shadow. Shared fonts, palette, portraits and real Zapla petal. |
| Conversion | 8.5/10 confidence | Clear call agenda, repeated booking access, pricing and objections visible. No visitor, booking or A/B-test evidence to substantiate a higher performance score. |
| CFO/value | 9/10 for disclosure | A$399/A$699 monthly plans, Guided Launch from A$1,997/A$2,997, GST and usage extras disclosed. No invented financial return. |
| Credibility | 9/10 for copy discipline | Illustrative examples, no native connector promises, limits alongside relevant claims. Customer evidence is still absent. |
| Accessibility | 8.5/10 verification | Semantic headings, native details, focus outlines, image alt text, hidden animated states removed from accessibility tree and reduced-motion implementation. Full screen-reader and 200% enlargement testing not completed. |
| Responsive | 9/10 at checked widths | Tablet/phone typography and card reflow inspected; cards remain readable and faces clear; no main-content horizontal overflow at 768/390px iframe widths. Not physical device testing. |

## Capability and claim grounding

Read the current Library source 'NextGen CRM everything Andrew Mark has announced.md'. It supports announced contacts, messaging, forms, flows and review management. Announcements do not establish production readiness. HighLevel's official documentation also supports form-submission triggers, SMS/email actions and customer-reply workflows, but does not prove NextGen parity. Do not use it to claim that untested flows are live in Zapla.

Current price values come from src/routes/Pricing-v3.tsx. No native integration to Timely, Fresha, Kitomba or Pabau is promised. Before enabling any clinic workflow, verify the chosen platform, booking updates, audience permission handling, stop rules, handoffs and data suitability. Review requests and campaigns need an approach appropriate to the actual services. Privacy and clinical records remain explicit boundaries.

Sources consulted:
- https://www.tga.gov.au/resources/guidance/advertising-health-services-involve-therapeutic-goods
- https://www.tga.gov.au/resources/guidance/complying-restrictions-advertising-prescription-medicines-public
- https://help.gohighlevel.com/support/solutions/articles/155000002292-a-list-of-workflow-triggers
- https://help.gohighlevel.com/support/solutions/articles/155000002294-a-list-of-workflow-actions
- https://help.gohighlevel.com/support/solutions/articles/155000003291-workflow-action-review-request

Production build, TypeScript and scoped route lint passed. No claim is made that every lens has reached a verified 9/10. Remaining lower scores require platform testing, accessibility testing or real visitor/customer evidence, not a fabricated rating.
