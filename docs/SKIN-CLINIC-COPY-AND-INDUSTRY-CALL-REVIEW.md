# Skin clinic copy and industry call workflow review

13 October 2026. Implemented following approval to apply the recent copy and AI Receptionist proposals. This review is the implementing agent's assessment, not independent customer research or a panel of separate reviewers.

## Exact change log

### Skin Clinics

The existing hero headline, hero paragraph, photographs, prices and final booking CTA are retained. In particular, the hero paragraph remains: “Reply to new enquiries, send pre-visit information and follow up after consultations. Zapla handles the routine messages while your team looks after the people in your clinic.”

The opening problem statements now name the work and explain its consequence:

- **Enquiries left unanswered:** Someone asks about a consultation. A delayed reply can mean they book with another clinic.
- **Forms to chase:** Your team sends form links, checks what’s missing and contacts clients again before their visit.
- **Follow-up forgotten:** A client asks for time to think after a consultation. Your team has another follow-up to remember.

Replaced the below-hero benefit headings and explanations:

| Section | Final heading | What the explanation now says |
| --- | --- | --- |
| New enquiry | Reply to new enquiries automatically. | A website enquiry triggers a reply and callback preference question; the team arranges the consultation; unanswered enquiries receive the agreed follow-up. |
| Phone enquiry, new section | Answer calls and capture new enquiries. | AI answers incoming calls and approved routine questions, collects callback details and sends the request to the team. Clinical questions remain with qualified staff. |
| Pre-visit | Send appointment details and forms automatically. | A confirmed consultation triggers arrival information and a contact details form; submission notifies reception. |
| Consultation follow-up | Send the follow-up your client agreed to. | A client asking for time to think receives a message at the agreed time; a reply stops reminders and goes to the team; treatment questions stay with the clinician. |
| Past clients | Invite past clients to arrange another visit. | The clinic chooses approved contacts; Zapla sends an invitation; staff discuss the next visit when the client replies. |
| Reviews | Request Google reviews automatically. | A visit marked complete can trigger the request, removing the task of sending each message manually. |
| Fit | One place for enquiries and client follow-up. | Separate, short explanations for spreadsheets/inboxes and existing clinic software; no requirement to replace clinical records. |
| Guided Launch | We set up your clinic’s follow-up. | Choose agreed messages; build workflows; test replies, reminders and staff handoffs before launch. |

Rewrote the first nine FAQ answers in plain language. Topics remain: starting without a CRM, adding value beside existing software, connection limits, AI/clinical boundaries, appropriate campaigns, replies and opt-outs, clinical records/privacy, reviews/testimonials, and forms/pre-visit information. The pricing FAQ is unchanged.

Removed the repeated second consultation handoff paragraph. Preserved the separately approved main-branch cleanup: no generic spreadsheet/CRM hero note, “Already using clinic software?” in the fit section, the agreed short clinical-record distinction, and no repeated setup caveats beside the pre-visit, return and review benefits. Connection, form completion, permissions, testimonial and data handling limits remain in the FAQs. The main-branch changes were merged into this work rather than overwritten.

### AI Receptionist across industries

One shared demonstration component, with industry-specific language, customer identity, staff record and human boundary:

| Page | Placement | Example and human responsibility |
| --- | --- | --- |
| Skin Clinics | After website enquiry, before pre-visit administration | Mia requests a first consultation; reception calls back; clinical questions go to qualified staff. |
| Dental | After new enquiry, before registration forms | Mia asks whether the practice accepts new patients; reception arranges the appointment; clinical and urgent concerns use the human response process. |
| Mechanics | After new enquiry, before quote follow-up | Mia asks about brakes on a 2019 Toyota RAV4; workshop receives request and vehicle details; repair decisions remain with staff. |
| Trades | After new enquiry, before quote follow-up | Daniel requests a split-system installation quote; the team calls back; quoting, technical advice and urgent dispatch remain with staff. |
| Allied Health | Expanded the existing call area inside the fit section | Mia asks about a physiotherapy appointment; reception receives the request; AI does not assess clinical urgency. |
| Mortgage original | After prospective-client enquiry, before settlement follow-up | Mia asks about a first home; broker receives the request; financial advice remains with the broker. |
| Mortgage comparison | After prospective-client enquiry, before fit | Sam asks about a first home; broker receives the request; financial advice remains with the broker. |

Removed the small, duplicated AI Receptionist asides from Skin, Dental, Mechanics, Trades and the mortgage comparison. Replaced Allied Health's old static call card. Added compact call sections to both mortgage layouts. Removed three visible “Illustrative…” labels from the original mortgage page; accessible example descriptions remain.

Each example shows four states: incoming call and question; AI disclosure and callback request; customer supplying a name and preferred time; staff callback record. The same customer portrait is reused in all three customer states. Automated business responses use the Zapla petal. No live booking, diary availability, dispatch or advice is implied. The examples are demonstrations, not customer evidence.

All seven have an AI Receptionist link and a nearby optional-add-on note linking to setup/usage pricing. Dark panels are used on Skin and Mechanics, cream on Dental and Trades, and smaller warm-light panels on both mortgage pages and inside Allied Health. Shared autumn colours, fonts, double borders, soft shadows and translucent response cards are used. No new photo overlays obstruct faces.

Motion: incoming content is immediately readable; AI reply begins after 200ms, customer reply after another 450ms, staff record after another 450ms. Final content remains visible. Background tabs pause progression. Reduced motion displays the complete example immediately and disables fades.

Earlier shared review-card fixes are retained: no “Reply STOP to opt out.” example text, no customer avatar beside the Google logo, consistent Google branding and five unselected stars. Opt-out handling is still explained in FAQs. This pass does not claim to have newly implemented those earlier fixes.

## Validation and its limits

- Production build and TypeScript pass. Scoped ESLint passes after formatting corrections.
- Actual rendered new call layouts inspected at desktop, 768px tablet and 320px mobile. All seven tablet and mobile call sections have no descendants outside the viewport according to actual element bounds, not just hidden overflow. Skin also inspected at 390px, with whole-page desktop comparison to Dental.
- Skin's hero text matches the original exactly. All three Skin photographs load when their sections enter view. Faces and existing compact overlays remain unobstructed.
- All ten Skin FAQs open with the keyboard. The client-flow anchor reaches `#clinic-flow`. Keyboard activation opens `/ai-receptionist` and `/Pricing-v3` successfully. External booking page opening was verified in the preceding review; no booking was submitted and no confirmation is claimed.
- Actual shared React component tested under normal and reduced-motion DOM environments for all seven examples: background pause, resume, final-state hold, reduced-motion immediate final state. Browser-native operating-system reduced-motion preference was not changed.
- No page-origin runtime errors observed in the browser log review; browser-extension metadata errors were excluded.
- Prices checked against current project pricing implementation. The AI section identifies optional setup and usage charges. Customer-specific software connections, live call routing and real reminder/form/booking automations still need implementation verification for each customer.
- This is not a screen-reader certification, a browser/device laboratory audit, customer research, an industry legal review or evidence of conversion uplift. No statistics, testimonials or guarantees were added.

## Fourteen-lens review

Scores below are reasoned design assessments with stated limits, not manufactured pass marks. A 9 means the page meets the defined execution standard in the reviewed conditions; it does not prove commercial results.

| Lens | Score / 10 | Evidence and remaining limit |
| --- | --- | --- |
| Copywriting | 9 | Concrete clinic tasks, full cause-and-effect sentences, original hero retained; no metaphoric replacement or truncated problem fragments. |
| Owner/commercial priorities | 9 | Enquiry response, preparation and consultation follow-up precede past-client invitations; reactivation is one use case. |
| Industry customer | 8.5 | Uses consultation, reception, client, contact details and clinician appropriately; real clinic/customer feedback has not been obtained. |
| Frontline operations | 9 | Callback request, form notification and reply ownership are explicit; clinical work remains with staff. |
| Automation logic | 9 | Demonstrations identify triggers, automatic action, response and staff next step; unsupported direct booking is excluded from new examples. Real configured workflows remain unverified. |
| Problem awareness | 9 | Opening explains delayed replies, chasing forms and forgotten follow-up before introducing the workflow examples. |
| Art direction | 9 | Human photographs retained, distinct dark call panel, compact overlays and unobstructed faces; compared with Dental. |
| Visual hierarchy | 9 | Large outcome headings, shorter supporting paragraphs, discreet boundaries/cost link and clear demonstration labels. |
| Brand consistency | 9 | Shared fonts, autumn palette, translucent double-border cards, petal and consistent customer portraits; shared Google review component retained. |
| Conversion | 8 | Clear progression from problems through demonstrations and fit to pricing/booking; actual conversion data and completed booking confirmation are absent. |
| CFO/value | 8.5 | Work saved is concrete and optional costs are visible; no invented ROI and no verified customer savings data. |
| Credibility | 8.5 | Illustrative workflows are not testimonials; prices align with project source; product configuration and real customer evidence still need verification. |
| Accessibility | 8.5 | Keyboard FAQs/links, accessible example descriptions, hidden-state semantics, visible focus and reduced-motion code/test coverage; full screen-reader and zoom audit remains outstanding. |
| Responsive | 9 | Actual new component layouts and bounds reviewed at 320px and 768px plus desktop; Skin additionally checked at 390px. This is not exhaustive device coverage. |

The five awareness stages are covered without five artificial sections: problem recognition in the opening, solution understanding in the hero/benefits, product understanding through demonstrations, fit through software/pricing/FAQs, and next step through booking calls to action.
