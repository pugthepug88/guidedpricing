# Meeting Rooms: visible call, saved recording and CRM transcript

Reviewed 26 October 2026 (Australia/Sydney) for `/features/calendars-bookings`.

## Request and evidence

The owner requested a visual demonstrating Meeting Rooms and explicitly confirmed that meetings are recorded/saved and transcripts are saved against attendees in the CRM. This reopens the preceding review's omission of saved recordings and transcription. The owner confirmation is the source of those two claims; it is not described as independently tested storage behaviour.

The live official Meeting Room help article was reread. It corroborates video, microphone/camera controls, screen sharing and a recording start/stop control with a REC indicator. It does not establish storage retention, automatic recording defaults, exports, unlimited storage, AI summaries or compliance. None of those additional claims is added. Sources and boundaries are in `CALENDARS-BOOKINGS-EVIDENCE.md`.

## Composition and copy

The buyer question is: **what remains with the customer after the video meeting?** One contained illustration answers it: Alex and Emma in separate camera views, a meaningful recording state and media controls, then the saved recording and a short transcript on Emma's attendee record. “After the meeting” distinguishes the two moments. The scene is explicitly labelled as an illustration; it is a simplified product explanation, not a literal NextGen screenshot or live meeting.

“Video meetings. Saved in your CRM.” leads the existing meeting chapter. The body and a new native FAQ explicitly cover recorded/saved meetings and transcripts attached to attendees' CRM records. Established browser video, screen sharing, unique links and public/selected-person access remain. The repeated customer profile is removed from the lower booking-management block, which retains the selected appointment, staff changes, availability and named calendar connections.

- **USE** current owner-confirmed capability, Zapla type/palette and the existing calendar cast.
- **ADAPT** native video-room controls into a static, legible call-to-record composition. Icons identify actual media functions; the recording dot identifies recording and does not pulse.
- **REJECT** leaving the in-person photograph as the only proof, a generated bitmap containing interface text, a full application-chrome screenshot, extra feature tiles or another standalone section.
- **PRESERVE** the rounded green five-format panel, booking hero/state logic/pin, final CTA, noindex, shared navigation/footer, unrelated feature pages and `/booking`.

No call/join/play/download controls are fabricated as interactive buttons. The scene has zero buttons, takes no input and never invokes media devices or a meeting/CRM service. The transcript excerpts are original illustrative dialogue rather than an actual customer transcript, testimonial or generated summary. Names and the email were already established in the page's booking illustration.

## Imagery

The built-in image tool transformed the existing page-specific studio pair into remote camera views while preserving their identities. Only the people/backdrops are raster imagery. Names, recording state, controls, saved-record information and transcript remain native HTML/CSS. No generated UI text is used.

Asset: `public/concept/calendars/meeting-participants-v1.webp`, 1774 × 887, 220,432 bytes. The generated PNG was converted to WebP at quality 90 without a crop/content edit. Exact prompt, reference and method: `docs/calendars-meeting-participants-v1-prompt.txt`. The earlier consultation asset is retained in Git history/source, not deleted.

## Rendered review and corrections

The rendered AI Chatbot and Unified Inbox openings were compared for type, hierarchy, product scale and customer-record treatment. Their layouts are not copied. Calendar review used Chrome and the local managed preview.

The first desktop render left “CRM.” alone on a third headline line and the transcript was smaller than necessary. The headline scale and balancing were corrected, the transcript increased to 13px, and the participant boundary made continuous. The final desktop capture shows the whole call-to-record scene beside a two-line headline.

| View                                    | Observed result                                                                                                                                                                                          |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Desktop 1363 × 936, document 1348px     | Both faces unobstructed, recording/media functions identifiable, complete saved recording and transcript readable. The copy and visual share one scene; booking management follows in normal flow.       |
| Desktop 1100 × 800, document 1085px     | Heading is two lines (90.3px high), generated image loaded at 1774px native width, no document or audited nested-text overflow.                                                                          |
| Tablet 834 × 820, document 819px        | Explanation precedes the full-width meeting visual. Both people and the two-column saved recording/transcript fit; no audited overflow.                                                                  |
| Phone 393 × 820, document 378px         | Heading and substantive recording/CRM message appear before the figure. Media functions stay visible; the saved recording and transcript stack in natural reading order.                                 |
| Phone 320 × 820, document 305px         | The attendee record, email, saved-record labels and complete transcript fit. No audited heading, paragraph or span overflow in the changed chapter.                                                      |
| Fresh no-JavaScript document, phone 393 | Zero enabled booking-demo buttons; complete meeting payoff and transcript remain server-rendered. The new recording FAQ opens natively, with the complete answer; document and scroll widths both 378px. |

The initial temporary harness reused its already hydrated document after applying a sandbox attribute. This was a harness error, not a successful no-JavaScript check. Forced new-document navigation corrected it; the final check above observed the static caption and zero enabled example controls.

This is targeted marketing UI review, not a live video/recording/transcript/CRM acceptance test. No room was created or joined, media permissions requested, recording stored, attendee record changed, appointment submitted or message sent. Physical-device, cross-browser and screen-reader acceptance testing were not performed. No new motion is introduced; the existing reduced-motion rules and hero fallback remain intact.

Capture: [meeting and attendee record](review-assets/calendars-bookings/recording-visual-20261026.jpg).

## Role assessment

These are the implementer's role-based judgements after the corrections, not independent reviewers, owner acceptance or measured commercial performance. Scores apply to the inspected changed scene and supported claims.

| Lens                  | Score | Evidence                                                                                                         |
| --------------------- | ----- | ---------------------------------------------------------------------------------------------------------------- |
| UI/UX                 | 9/10  | Clear call/after-call distinction, visible recording/transcript, native FAQ and narrow-screen reading order.     |
| Brand / Creative      | 9/10  | Existing people, warm camera imagery, Zapla type and deliberate dark/white product surface without pastel tiles. |
| Product Marketing     | 9/10  | Makes the saved customer context visible rather than selling only a generic video call.                          |
| Conversion            | 9/10  | Concrete differentiation within the existing chapter; current sales/setup destinations preserved.                |
| Motion                | 9/10  | Stable illustration, no fake video playback or distracting pulse, complete static reading.                       |
| SME owner / frontline | 9/10  | Shows where to revisit the consultation and what was said before the next conversation.                          |
| Copy                  | 9/10  | Explicit saved-recording/attendee-transcript wording; corrected headline wrap and readable transcript.           |
| Buyer psychology      | 9/10  | Reduces uncertainty about where meeting information goes, without fabricated metrics or guarantees.              |
| Technical             | 9/10  | Scoped component/CSS, semantic figure, no external runtime, static and responsive fallbacks.                     |
| Product accuracy      | 9/10  | Owner correction separated from official controls evidence and from live acceptance testing.                     |
| AI-slop critic        | 9/10  | No pastel feature boxes, decorative controls, arbitrary overlap, fake metrics or unrelated cast.                 |

## Integration

Started from current main `e837957`, retaining the Pipeline and Automation changes. Work remains calendar-specific, with its asset, prompt, evidence/brief and this review. Temporary Vite host configuration is restored before production checks; the responsive harness is excluded from Git. GitHub owns source changes; Lovable remains read-only, with no builder task or separate Publish action. Hosted verification is recorded at handoff after the source sync.

Production build, TypeScript, targeted component/route ESLint, SEO policy, source/review formatting and whitespace checks passed. The build generated the client/server output and Nitro completion successfully. Existing module-directive and dependency warnings were non-fatal. No unit test was added for this static marketing illustration and copy change.
