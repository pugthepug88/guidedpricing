# Calendars & Bookings: capability and visual revision

23 October 2026, Australia/Sydney. Base: GitHub main `5be3e602ae13795b9e99c6f8ced15c8fae051efd`.

## What was weak, and what changed

The first page demonstrated an individual consultation but did not sell the range of calendar formats. Its oversized centred heading pushed the product below the initial desktop viewport, and availability and calendar connections were separated despite answering the same buyer question about control of the working day. Adding five generic feature cards would have expanded the inventory while leaving the differences difficult to understand.

The revision retains the H1 and final CTA wording. A split opening shows an actual date/time convention beside the commercial promise. The supporting copy now explains booking links and website embedding as well as the range. Five named formats have meaningful participant diagrams; collective and round robin are distinguished visually. A fixed-date event example has functional local time selection. All examples remain explicitly illustrative and create no appointments.

Eight sections: customer booking opening; booking formats; availability/connections; confirmation/reminder; human/customer context and staff changes; Guided Launch; FAQs; final CTA/sky. There is one short optional native sticky region for the format scene. It does not capture scrolling, rotate automatically or conceal earlier content. The five descriptions remain server-rendered when JavaScript is unavailable.

## Evidence and reference decisions

Read current main, AGENTS.md, the complete build protocol, design guardrails and feature brief including later corrections, the attached DO-NOT-BE-A-YES-MAN text, current calendar source/evidence/review, and Chatbot visual-review record. Inspect the owner’s current builder screenshots and the rendered public help articles listed in the evidence document. The live builder redirects to login. Do not infer a live scheduling test from the screenshot or a marketing-page interaction.

| Reference                                                                       | Decision                             | Application                                                                                               |
| ------------------------------------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Current builder screenshot and owner-confirmed five types                       | USE                                  | Current names and explicit host/attendee relationships.                                                   |
| Old help’s four-format enumeration                                              | REJECT as current inventory          | Retain its corroborated controls; use current UI for names/range.                                         |
| Builder’s dense application chrome                                              | REJECT for the marketing page        | Show who meets whom and a useful customer date/time selection.                                            |
| Latest Chatbot neutral canvas, local material depth and selective strong colour | ADAPT                                | Warm white/ink, local sage calendar/format scenes, a single deep-green availability chapter and cool FAQ. |
| Chatbot’s conversation-led hero and enquiry progression                         | REJECT as a calendar layout          | Customer calendar and participant relationships explain this feature.                                     |
| Inbox/Pipeline and wider Zapla pages                                            | USE for brand; not section templates | Existing typography, portraits, petal, controls, spacing and CTA/sky.                                     |

Rendered reference inspection covered the original calendar opening, current Chatbot, Unified Inbox, Pipeline, homepage, AI Receptionist and `/booking`. The CRM route’s initial animation frame was blank in its first capture; its source and established CTA were inspected, but that particular capture is not claimed as a completed rendered CRM review. No competitor claim or colour system is copied.

## Review corrections

- Keep “for them” and “works for you” together so the desktop and phone H1 avoid isolated words.
- Add `border-collapse: separate` so the calendar’s available dates remain distinct controls.
- Increase the long collective meeting’s phone surface height and adjust type/spacing so both its title and “One appointment” fit at 320px.
- Keep connection lines below participant role labels. Normalise SVG path lengths so each selected relationship traces once at a consistent pace.
- Preserve the portrait identities used elsewhere: Alex cell 8, Ben cell 13, Priya cell 4, Mia cell 9 and Daniel cell 5.
- Introduce Priya’s full name in the supplied-details explanation before the later confirmation and record. Remove the unverified custom project-answer transfer into the customer record; market the documented custom booking form without inventing an automatic field mapping.
- Consolidate calendar destinations with availability, and state that personal availability and booking-calendar hours are separate.
- Keep the selected date/time consistent in confirmation, reminder and customer record; clear later appointment states after a new date until another time is selected.
- Explain Guided Launch as separately priced initial setup, and shorten its heading for narrow layouts. Keep existing-tool users in the setup discussion.
- Use a block label above the confirmation status so the illustrative caption does not run into its checkmark and heading.

## Scoped lens review

A **9** here means the specific marketing-page acceptance criteria were met in the reviewed views after material defects were fixed. Scores are explicit subjective implementation-review assessments requested by the owner; they do not certify live product behaviour, independent reviewers, owner approval or a measured conversion result. A 10 is not claimed.

| Lens                       | Assessment | Reason and evidence                                                                                                                                                                                                                     |
| -------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Motion Director            | 9/10       | One user-triggered connection trace; no autoplay or resets. Native sticky fit guard, static short-height/no-JavaScript paths and reduced-motion CSS. Actual preference emulation remains outside coverage.                              |
| Brand / Creative Director  | 9/10       | Existing palette/type/portraits/petal, local texture and purposeful white surfaces. One dark availability chapter and human photography vary density without a whole-page green theme.                                                  |
| UI/UX Director             | 9/10       | Native accessible selectors and disclosure; readable date/time conventions and visible focus. Long-title, calendar-cell and line/role collisions corrected; checked at wide desktop, 834, 393 and 320px.                                |
| Product Marketing Director | 9/10       | Five formats explained by who meets whom and a business use, with clear booking/control/management ownership. Formats do not inherit allocation or capacity claims.                                                                     |
| Conversion Director        | 9/10       | Immediate product proof, useful exploration, existing-system fit, transparent setup and practical objections; all sales destinations remain `/booking`. No invented statistics or urgency.                                              |
| Copywriting                | 9/10       | Specific names, actions, services, calendar connections and change responsibilities. Existing H1/final CTA preserved; vague supporting copy replaced by link/embedding and format scope.                                                |
| SME owner / frontline      | 9/10       | Customer chooses a time; the business controls hours, people and destinations; staff handle later changes. The diagrams explain unfamiliar format names without requiring product knowledge.                                            |
| Buyer psychology           | 9/10       | Addresses control of the day, suitable team format, setup burden and existing tools. No claim that every business should abandon specialist booking software.                                                                           |
| Product accuracy           | 9/10       | Current owner-supplied UI corrects stale inventory; live help confirms the separate controls. Reminder/provider evidence and all untested scheduling/delivery limits are recorded.                                                      |
| Technical / AI-slop review | 9/10       | Scoped source, no new dependencies, no booking or messaging API, meaningful state consistency, no invented metrics, badges, decorative icon cards, numbered steps or tilted objects. Build/check results below are recorded separately. |

## Rendered and interaction coverage

Local Chrome review used the supervised preview. Desktop captures are 1348 × 926 pixels. Responsive review used same-origin iframe viewports of 834 × 820, 393 × 820 and 320 × 820, with observed content widths 819, 378 and 305 pixels respectively because of the scrollbar. These are browser checks, not physical-device testing.

- Desktop: revised hero, all five format states, bounded pin and release, availability and both hour modes, calendar connections, confirmation/reminder, photo/customer context, setup, FAQs and final CTA/sky.
- Tablet: opening, calendar sizing, round-robin illustration, consultation photo and customer-context beginning, FAQ disclosure and final CTA/sky. The tablet photo loaded at 680 × 510px with all three faces visible. The complete lower-page tablet matrix was not repeated.
- Phone 393: the full sequence through calendar/time selection, format selection, availability, confirmation, reminder, customer context, setup, expanded FAQ and final CTA/sky. The final CTA was followed to the existing `/booking` page with its pending embed.
- Phone 320: opening, date/time controls, all five format selections, long collective title geometry and event-slot controls. Time buttons measured 215 × 44px and used one column. The long collective card has no internal vertical overflow. No full lower-page 320px visual pass is implied.
- No-JavaScript iframe: all five static format descriptions and the default confirmation remain in the rendered document; scene position is ordinary flow. Interactive selectors require JavaScript.
- Short desktop 1100 × 650: `data-pin=false`, scene position `relative`, full content remains in normal flow.

No horizontal document or feature-descendant overflow was found in the measured 834, 393 and 320px checks. These audits supplement screenshot inspection; they are not a screen-reader or universal text-clipping guarantee.

Date changes were tested at 393px and 320px. A new date clears time, removes the confirmation and shows two pending explanatory surfaces. Enter selection of a new time restores matching date/time in selection, confirmation, reminder and customer record. Disabled dates remain disabled. All five formats were clicked at desktop/320px, with expected headings and descriptions. An event time was changed by keyboard on desktop and by click at 320px. The hours selector updates its labelled illustration. FAQ opens by click and closes with Enter. The final phone CTA navigates to `/booking`; all three sales links have that destination in source.

Review captures: `review-assets/calendars-bookings/revision-hero-20261023.jpg` and `review-assets/calendars-bookings/revision-collective-20261023.jpg`. The second is a detail of the selected collective relationship and nearby options, not a whole-page capture. A full-page screenshot timed out; colour rhythm was inspected across sequential viewports instead. No screenshot is presented as a hosted Lovable render.

## Technical checks and delivery limits

Final `npm run build`, `npx tsc --noEmit`, targeted ESLint, Prettier checks, `npm run check:seo` and Git whitespace checks passed. The build retained existing dependency/module-directive and chunking notices; none prevented completion. The preview-only `terminal.local` host allowance was removed from Vite configuration before the final production build; no project/package/config change is part of the calendar revision. The local responsive-review fixture is untracked and excluded from the commit.

The local browser extension was unavailable, so read/QA work used the available cloud Chrome browser. NextGen’s live builder and Lovable’s hosted preview redirected to sign-in. No authentication, calendar account connection, appointment, reminder delivery, sales embed test, Lovable builder prompt or Publish action was performed. Reduced-motion CSS and fit guard were reviewed in source; no separate OS preference, screen-reader, physical-device or cross-browser acceptance test is claimed. GitHub source sync and hosted authenticated rendering are distinct checks.
