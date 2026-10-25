# Calendars & Bookings: connected visual rebuild

23 October 2026. Prepared on the existing PR #180 review branch. Current main `9ca2111` was merged locally, preserving concurrent Chatbot and Automation work. No main update, Lovable builder prompt or production Publish action is part of this saved revision.

## The problem and resulting page

The owner was still seeing the original main page: the prior five-format revision had never been merged. Giving the Lovable link without making that distinction prominent was a poor handoff. The unmerged revision also remained too segmented: a separate calendar, format selector, availability demonstration and confirmation section did not form a strong enough whole-page composition. Its earlier numerical review was not final owner approval.

The rebuilt opening shows all five named types immediately beside the retained H1: **1-on-1, Group booking, Collective, Round robin and Event**. A single large scene changes its people and connections as the visitor reads the five explanations on suitable desktop screens. Collective joins two hosts to one customer. Round robin highlights one booked host while retaining the other team members as context. Group shows several attendees. Event replaces the participant map with a fixed date and selectable times. Direct choices always take precedence over passive scroll progression. There is no timed carousel or animation loop.

The scene sits on a deeper, still, grain-textured sage surface with a smooth translucent foreground and layered borders. It remains local to the product demonstration, within a warm-white page. The actual date/time picker follows as a wide customer journey, with its selected appointment continuing directly into confirmation and reminder examples. Redundant continuation headings were removed. Availability and calendar connections make one deep-green business-control chapter. A new editorial studio photograph creates a broad human break, followed by open Guided Launch, practical FAQs and the established final CTA/sky/footer.

Seven substantial parts: connected opening/formats; customer booking/confirmation/reminder; business availability/connections; customer context and changes/photo; Guided Launch; FAQ; final CTA. Header/footer, Platform architecture, shared navigation, route indexing, H1, final CTA wording and `/booking` remain unchanged. The actual sales calendar embed remains deferred.

## References inspected and decisions

| Reference                                                                                           | Decision                                                  | What it changed                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Birdeye Singapore](https://birdeye.com/sg/)                                                        | ADAPT material contrast and continuous visual explanation | Inspected the current photographic hero, coworker chapter and textured BirdAI scene while scrolling. Adapt one stable scene changing beside its explanation. Reject the mascot, claims and surface inventory. |
| [Cal.com](https://cal.com/)                                                                         | ADAPT immediate, legible scheduling proof                 | Inspected the actual booking-led opening. Retain recognisable date/time conventions and clear service context. Reject its numerical claims, pricing, integration inventory and benefit-card template.         |
| [ActiveCampaign marketing automation](https://www.activecampaign.com/platform/marketing-automation) | ADAPT scale and clear focal hierarchy                     | Inspected the rendered opening. Reject its dark neon material and autonomous-marketing claims for this calendar feature.                                                                                      |
| Current Zapla Chatbot and Unified Inbox                                                             | USE brand, not their layouts                              | Inspected rendered openings; retain type, portraits, petal, controls and colour discipline. The calendar opens on people/appointment relationships rather than another conversation window.                   |
| Photo-led hero as the main alternative                                                              | REJECT for this opening                                   | It would obscure the precise scheduling range the owner says is missing. Use the fresh human photograph at the point where the appointment reaches the team instead.                                          |

The photo is generated editorial imagery, not a real customer or testimonial. The built-in ImageGen prompt and web asset are recorded in [the prompt file](calendars-consultation-photo-prompt.txt). The portrait sheet remains only for continuity of the named illustrative people. The reused mortgage-broker photograph is no longer used by this page.

## Product accuracy

The five type names and host/attendee relationships come from the owner's current builder screenshot and explicit confirmation. Current Help Centre controls and the provider-documented reminder capability remain bounded as recorded in [the evidence matrix](CALENDARS-BOOKINGS-EVIDENCE.md). The live builder is sign-in gated and was not changed or used to create appointments. These are marketing illustrations, not screenshots of a live calendar execution.

No distribution fairness, weighting, capacity, payment, customer self-service changes, conflict elimination, no-show guarantee or default confirmation-message delivery is added. Staff changes remain distinct from customer requests. Message usage and separately priced Guided Launch remain explicit. The format illustrations are independent examples; the interactive customer booking journey is the coherent 1-on-1 example whose selected date/time updates its confirmation, reminder and customer record.

## Rendered checks and corrections

Local Chrome preview, using the actual application and root header/footer:

- Wide desktop: opening, all five type choices, Group/Collective/Round robin participant differences, Event 2 pm selection, native scroll progression through Round robin/Event, booking, date-change pending state, confirmation/reminder, availability modes, connected calendar names, photograph, setup, FAQ, final CTA and sky.
- Native progression: the complete Event scene was measured at y=88–796px in a 936px-tall viewport. Its 708px scene fits below the header. Further scrolling released it naturally; the next chapter was visible at y=389px with the old scene above the viewport. No scrolling is captured or snapped.
- 393 × 820 iframe, 378px document: opening, format choices and long Collective title, booking/date grid, time selection, confirmation/reminder, availability, human photograph/record, native FAQ action and final CTA/sky. The caption and the FAQ focus/answer spacing were corrected.
- 320 × 820 iframe, 305px document: opening, all five names, Collective title, Event time-control width and actual booking time controls. The Collective meeting had equal client/scroll sizes (190 × 82px). Booking buttons measured 203 × 44px. This is targeted narrow-phone coverage, not a complete lower-page 320px visual matrix.
- 834 × 820 iframe, 819px document: opening, Group selection, actual two-column booking surface, human/photo crop and source-based lower-layout checks. No complete lower-tablet screenshot sign-off is claimed.
- 1100 × 650 iframe: `data-pin=false`, scene `position:relative`; ordinary page scrolling retains the complete content.
- JavaScript-disabled iframe: all five native description terms, default confirmation and native FAQ disclosure were present and usable. No JavaScript or sticky progression is needed to reach the story. Desktop avoids duplicating the five-format fallback because its static index already supplies the descriptions.
- No horizontal document overflow or nested heading/paragraph/button text overflow was found in the 378, 305 and 819px audits. Photo loaded and both faces remained visible in desktop, tablet and phone crops.
- Keyboard Enter selected a new time and opened the native FAQ. Changing the date cleared the old time; confirmation/reminder switched to pending. Selecting Wednesday 11 November at 1 pm updated both later examples. Phone selection of Tuesday at 2 pm updated its result. All three sales links target `/booking`; the final desktop link was followed and rendered the existing booking page.

The initial sticky composition released too early before the Event explanation. An additional bounded end allowance corrected that, then the complete Event hold and release were measured again. The phone caption was widened, a redundant journey heading removed, human content placed in matching DOM/visual order, type labels enlarged, and open-FAQ text spaced clear of its focus outline.

Captures: [revised hero](review-assets/calendars-bookings/rebuild-hero-20261023.jpg), [fresh editorial chapter](review-assets/calendars-bookings/rebuild-person-20261023.jpg).

## Scoped lens review

These are the implementation agent's independent role-based judgements after the rendered corrections, not separate-agent approval, owner approval, customer research or measured conversion results. A 9 means the specified criteria pass in the inspected scope. The owner's further visual judgement still determines acceptance; the earlier review cannot establish it.

| Lens                         | Score | Acceptance basis                                                                                                                                                                          |
| ---------------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI/UX                        | 9/10  | All five choices are apparent early; people/appointment relationships stay legible; direct selection wins; date/time changes are coherent; nested responsive text checked.                |
| Brand / Creative             | 9/10  | Zapla type/palette/portraits remain; local grain and smooth glass have distinct material roles; a fresh, candid human scene and varied scales improve the page rhythm.                    |
| Motion                       | 9/10  | Connection traces show real relationships; native scroll changes the format and releases after Event; no timers, resets, scroll trap or decorative floating movement.                     |
| Product Marketing / Solution | 9/10  | Scheduling breadth is sold explicitly, followed by the customer journey and business control. Adjacent Chatbot/CRM/Automation pages retain their own purpose.                             |
| Conversion                   | 9/10  | Immediate product proof, useful exploration, existing-tool fit, practical objections, transparent setup/usage and an established booking destination.                                     |
| Copywriting                  | 9/10  | Named formats, clear host/attendee distinctions, customer/staff responsibilities and concrete controls. Duplicate continuation heading removed; retained H1/final CTA.                    |
| SME owner / Frontline        | 9/10  | Understand who meets whom, what customers choose, what the business controls and who handles changes. Technical allocation rules are not invented.                                        |
| Buyer psychology             | 9/10  | Control, team fit, setup effort and familiarity are addressed without fabricated social proof, urgency or guarantees.                                                                     |
| Product accuracy             | 9/10  | Five formats follow current owner evidence; separate help/provider claims remain within their documented limits.                                                                          |
| Technical                    | 9/10  | Local responsive/state/keyboard/no-JavaScript checks pass within the matrix above; measured fit guard and static fallbacks preserve content access. Repository checks are recorded below. |
| AI-slop critic               | 9/10  | No decorative status chips, arbitrary metrics, numbered feature steps, tilted panels, pastel icon cards, fake send/booking action or unrelated stock photograph.                          |

## Verification limits and delivery state

This is a marketing-page review. No live NextGen appointment, connected-calendar execution, reminder delivery or scheduling algorithm was tested. Reduced-motion rules and media gating were reviewed in source; no OS preference emulation was available. Screen-reader, physical-device and cross-browser testing, full lower-page tablet/narrow-phone matrices and authenticated Lovable rendering are not claimed. A transient body-keyboard navigation timeout recovered through a fresh page observation and the normal visible link; targeted keyboard controls continued to work. The sampled browser error log contained extension-metadata errors rather than an identified application error.

The connected Lovable preview remains on main until this review branch is merged. PR #180 is the concrete review result. Do not present its URL as proof that the new revision is already hosted there. No separate production Publish action is authorised or performed.

Repository validation passed: final production build, TypeScript, targeted component ESLint, SEO policy, formatting for the component/stylesheet/new review documents, and whitespace checks. The shared feature brief retains current main formatting outside the appended calendar notes. The build emitted existing dependency/module-directive notices; no source or build failure remained. The temporary local preview host setting was restored before the final build.

## Integration refresh, 25 October 2026

Current main `a8f739b`, including the latest Automation nurture revision, was merged into the review branch. The only manual conflict was the shared feature brief: its current Chatbot/Automation additions and both calendar entries were retained. The calendar component, stylesheet, route metadata and photograph are byte-identical to reviewed commit `e4f4812`. Other main files retain their current-main versions. This integration refresh does not claim a new visual or live-product test; the recorded rendered-review scope above still applies.
