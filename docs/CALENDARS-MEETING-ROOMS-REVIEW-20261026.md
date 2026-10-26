# Calendars: contained formats and native meetings

Reviewed 26 October 2026 (Australia/Sydney) for `/features/calendars-bookings`.

## Scope and design decisions

The owner found the green formats band abruptly separated from the page and the shallow photograph/details overlap unconvincing. They also supplied current native Meeting Rooms screens and help. This correction retains the established hero, five format relationships, page-specific photograph, calendar demonstration and sales destinations.

- **USE** Zapla's existing deep green, type, portrait system and neutral canvas. The interior relationship comparison remains familiar and readable.
- **ADAPT** the owner's contained-panel suggestion: one large inset green surface, 40px corners on desktop and 24px on phones, with surrounding paper visible. “Five ways to meet” gives the scene one compact heading.
- **REMOVE** the negative-margin photograph overlap and its surrounding white card. Appointment/customer details and working hours sit in normal flow on the page grid, separated by useful spacing and one structural rule.
- **INTEGRATE** native Meeting Rooms beside the consultation photograph under “Meet in person. Or online in Zapla.” The former separate chapter introduction is removed, so the capability does not add another page section or repeated headline.
- **REJECT** a new pastel colour, more feature cards, a fake video-call demo or a separate full-width room-management chapter. Existing bounded booking motion is unchanged; this correction adds no competing animation.

The first room layout repeated the chapter heading and a new room subheading. Rendered review exposed that repetition; it was consolidated into the single photo/copy composition before final checks.

## Product evidence

All six owner screenshots were inspected. The live official Meetings and Meeting Room help articles were read; exact sources, supported capabilities and limits are appended to `CALENDARS-BOOKINGS-EVIDENCE.md`. Copy now covers browser video, room links, screen sharing and public/restricted access. A native FAQ clarifies the four-contact restricted invitation list. Route metadata includes native meetings.

No automatic calendar-to-room creation/linking, Zoom parity, simultaneous-participant count, recording retention/export, transcription, AI summary, compliance or delivery guarantee is claimed. No actual room or appointment was created, no call was joined and no media permissions were enabled.

## Rendered coverage

The following are observed browser views and DOM/layout measurements, not physical-device or cross-browser acceptance tests.

| View                             | Observed result                                                                                                                                                                                                                                                                        |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Desktop 1363 × 936               | Rounded formats panel has 24px side gutters, 40px corners and all five types. Existing hero anchor reaches its curved top below the shared navigation. Photo and room copy form one composition with both faces visible. Details begin 38px below the photo/copy row, with no overlap. |
| Phone 393 × 820, document 378px  | Curved panel and narrower gutters remain visible. Meeting photograph, heading, all three paragraphs and subsequent details read in ordinary flow. No horizontal document overflow.                                                                                                     |
| Phone 320 × 820, document 305px  | Group and Collective relationships fit the contained panel. Both people remain visible in the photograph; new room copy and expanded room FAQ fit. Audited headings, paragraphs, controls and participant labels do not overflow.                                                      |
| Tablet 834 × 820, document 819px | Two-column photograph/room copy fits and remains readable; details follow with a positive 32px gap. No document or audited text/relationship overflow.                                                                                                                                 |
| JavaScript disabled, phone 393   | Server-rendered room heading/copy remain. Native room FAQ opens and its complete answer is readable; document and scroll widths both 378px.                                                                                                                                            |

This is targeted coverage of the changed formats, meeting composition, details spacing and FAQ. The unchanged hero state machine, compact pin/release, sales CTAs and static example behaviour retain the prior revamp's recorded verification. No new backend behaviour or external connection was introduced. OS reduced-motion emulation, screen-reader review, physical devices and a live native call were not tested.

Captures: [rounded formats](review-assets/calendars-bookings/formats-rounded-20261026.jpg), [native meeting composition](review-assets/calendars-bookings/meeting-rooms-20261026.jpg).

## Role review

These are the implementer's subjective role-based assessments of this scoped correction after rendered review, not independent reviewers, owner acceptance, measured conversion lift or live product certification.

| Lens                  | Score | Evidence for this correction                                                                                          |
| --------------------- | ----- | --------------------------------------------------------------------------------------------------------------------- |
| UI/UX                 | 9/10  | Contained comparison, clear room access wording, native disclosure and readable narrow layouts.                       |
| Brand / Creative      | 9/10  | Existing deep green and portraits, purposeful large curved surface, candid page-specific photo and open details grid. |
| Product Marketing     | 9/10  | Five meeting formats lead naturally into meeting in person or through native rooms.                                   |
| Conversion            | 9/10  | Useful native capability is explained in the existing chapter; sales destination and setup context remain intact.     |
| Motion                | 9/10  | Stable new scenes introduce no competing movement; existing measured booking motion and fallbacks are preserved.      |
| SME owner / frontline | 9/10  | Concrete consultations, screen-shared plans/proposals, public links and selected-person access.                       |
| Copy                  | 9/10  | Single meeting heading replaces redundant introductions; short practical room paragraphs.                             |
| Buyer psychology      | 9/10  | Answers where a meeting happens and who can enter, without invented parity, urgency or capacity claims.               |
| Technical             | 9/10  | Scoped markup/CSS, normal-flow layout, semantic FAQ and no new runtime service.                                       |
| Product accuracy      | 9/10  | Current owner UI plus live help; invitation limit distinguished from call capacity.                                   |
| AI-slop critic        | 9/10  | No pastel cards, cheap tabs, fake call controls, arbitrary overlap or additional standalone feature chapter.          |

## Integration

Started from main `3b62966`, preserving the concurrent Chatbot outcome rebuild. Only calendar component/style/metadata, related evidence/brief/review and two review captures change. Temporary local preview configuration is restored and the responsive harness stays excluded from Git. Lovable is read-only; source syncs through GitHub. Hosted preview verification is distinct from the local checks and is recorded at handoff.

Clean production build, TypeScript, targeted component/route ESLint, SEO policy, source/review formatting and whitespace checks passed. Existing module-directive and dependency warnings did not fail the build. No unit test was added for this static layout/copy correction.
