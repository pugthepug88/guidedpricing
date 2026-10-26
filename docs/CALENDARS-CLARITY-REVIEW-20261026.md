# Calendar clarity and public-copy cleanup

Reviewed 26 October 2026 (Australia/Sydney) for `/features/calendars-bookings`, with a targeted website copy sweep.

## Request and decisions

The owner could not understand the lower appointment/availability section, questioned its factual basis, found the page too green, and explicitly rejected repeated illustration disclaimers and fictitious email addresses. This request supersedes older instructions requiring public prototype labels. It does not authorise invented capabilities, testimonials or metrics.

- **USE** the documented booking controls and calendar destinations, established cast and meeting imagery, rounded five-format panel and existing sales destinations.
- **ADAPT** the lower section into one clear outcome: customers see available appointment times within the business's chosen booking hours. Show two blue bookable windows separated by a neutral unavailable hour. Explain appointment length and minimum notice beside it; place destinations underneath.
- **REMOVE** the repeated Emma appointment and vague “breathing room” heading, public illustration/prototype captions, placeholder addresses and duplicate mapping commentary. Staff changes remain in the FAQ rather than another appointment demonstration.
- **LIMIT GREEN** to the broad rounded formats scene. The hero outcome and meeting room become neutral charcoal; local CTAs use ink. Functional availability remains Zapla blue.
- **PRESERVE** shared navigation/footer, all five format relationships, the measured hero interaction and natural release, final CTA wording, preview indexing rules, `/booking`, source history and live-service safeguards.

No new section, decorative tile grid, arbitrary overlap or animation is introduced. The buyer-facing content explains the controls rather than annotating how the website demonstration was made.

## Facts and source boundaries

The current official Help was read directly in the browser: Calendar Builder (`#/calendar/[id]/edit`), Your Calendar (`#/user/calendars`) and Bookings (`#/bookings`) at `https://app.thenextgencrm.com/help-centre.html?lang=en`. These document days, multiple availability ranges, time zones, appointment duration, minimum notice, team booking destinations and staff booking/status edits. Your Calendar lists Google Calendar, Microsoft 365 and Apple iCloud. The old four-format help enumeration does not override the owner's current five-option product UI.

The displayed names, dialogue, dates and working hours remain prepared website values, not real customer records, business defaults or proof of a live transaction. Their provenance is recorded internally instead of repeatedly labelled on the public page. There is no new claim that every account uses 9–12 and 1–5 Sydney hours.

Recorded/saved meetings and transcripts on attendees' CRM records come from the owner's explicit confirmation in the preceding request. Help supports the room/media/recording controls. Storage, attendee association and transcription were not independently tested in a call. No retention, capacity, automatic-recording default, download, AI-summary or compliance guarantee is introduced.

The broader factual check also found an older Forms claim that a workflow could create a follow-up task. The newer live Automation action audit did not establish a Create Task action. Forms now shows a configured acknowledgement email, consistent with the documented form trigger and Send Email action. Configuration and message-usage terms remain where relevant.

## Copy sweep

Calendar, AI Chatbot and Websites/Forms lose visible example/prototype disclaimers and fictitious email values. Chatbot still visibly requests name/email before the visitor shares them and before the resulting contact says they were captured. The acknowledgement is addressed to Mia by name. Forms retains its Email field and a supplied/captured state, without inventing an address.

The sweep also removes fictitious email strings from the homepage's shared contact scene, its active journey capture, CRM profile and retained journey/v3 variants. Existing row heights are preserved where the removed secondary line affected geometry; phase timing, IDs, filters and customer context are unchanged. The actual `hello@zapla.io` contact remains. A source search of component/route email strings returns that actual business address only. Internal source comments, evidence documents and required map credits are not public prototype captions and remain.

## Rendered checks and corrections

Review used the local managed preview in Chrome. A temporary responsive iframe supplies real document widths and a fresh script-disabled document; it is excluded from Git.

| Target                                                     | Observed result                                                                                                                                                                                              |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Calendar desktop 1363 × 936, document 1348px               | One compact booking-hours explanation follows the saved meeting record. The duplicate appointment and old notes are absent; all three destinations remain.                                                   |
| Calendar tablet 834 × 820, document 819px                  | The first review found the word “bookable” slightly exceeding its inner box. Increasing the closed-window minimum from 72px to 80px removed the audited text overflow.                                       |
| Calendar phones 393 and 320 × 820, documents 378 and 305px | Rules and hours stack in normal flow; headings, labels and providers fit. No document or audited nested text overflow in the changed section.                                                                |
| Calendar desktop 1320 × 769, document 1305px               | The complete hero scene is 594px high and holds at top 88px while follow-through copy is read. Native scrolling subsequently places the whole scene above the viewport, confirming release.                  |
| Calendar interaction                                       | Selecting 11 November clears the old time; choosing 1pm updates confirmation and reminder consistently. Outcome and meeting surfaces are charcoal; formats remain deep green.                                |
| Calendar fresh no-JavaScript phone 393                     | Zero enabled booking controls, complete server-rendered recording/transcript content, and the native recording FAQ opens with its full answer. No removed public note/email reappears.                       |
| Chatbot phone 393                                          | Name/email request, “Email address shared” and the created contact's “Name and email captured” remain in causal order and fit. Named email recipient is present; no placeholder address or audited overflow. |
| Forms phone 393 and 320                                    | The configured acknowledgement section fits without document or audited text overflow. The email message and configured trigger replace the unsupported task action.                                         |
| CRM desktop                                                | Mia's profile, useful fields and activity layout remain; the removed fictitious email leaves no empty labelled field or document overflow.                                                                   |
| Homepage targeted check                                    | Rendered page contains no fictitious email text and has no document overflow. This was a targeted data cleanup, not a complete homepage motion or asset acceptance review.                                   |

No browser/media permissions, room creation, call, booking, record change, email, form submission or live automation was exercised. Physical devices, other browser engines and a screen reader were not tested. The same static/reduced-motion fallbacks remain; no new motion test suite is appropriate for these reversible presentation/copy edits.

## Role assessment

These are the implementer's subjective assessments of the changed scope after rendered corrections. They are not independent reviews, owner acceptance, live-product certification or measured conversion results.

| Lens                  | Score | Basis                                                                                                           |
| --------------------- | ----- | --------------------------------------------------------------------------------------------------------------- |
| UI/UX                 | 9/10  | One understandable booking control explanation replaces competing stories; narrow screens retain reading order. |
| Brand / Creative      | 9/10  | One purposeful green scene, neutral meeting/outcome surfaces and meaningful blue availability.                  |
| Product Marketing     | 9/10  | Working hours, duration and notice connect controls to what customers can book.                                 |
| Conversion            | 9/10  | Less duplicated content and development commentary; existing call/setup destinations stay intact.               |
| Motion                | 9/10  | Existing hold/release and state changes still work; no new decorative motion or forced scrolling.               |
| SME owner / frontline | 9/10  | Breaks, booking windows and team calendar destinations are clear at a glance.                                   |
| Copy                  | 9/10  | Concrete heading and compact explanations; no repeated illustration captions or fictitious addresses.           |
| Buyer psychology      | 9/10  | Shows practical control over availability and customer context without fake proof.                              |
| Technical             | 9/10  | Scoped components/styles, preserved shared scenes and static/native FAQ behaviour.                              |
| Product accuracy      | 9/10  | Current Help reread, old task claim corrected, owner-confirmed storage kept distinct from live testing.         |
| AI-slop critic        | 9/10  | No pastel feature boxes, arbitrary overlays, extra page sections or development-note clutter.                   |

## Integration and verification

The work began on main `ffc10f4` and incorporated main `ce84bc3`, preserving concurrent Pipeline, Chatbot and click-to-watch Automation work. Both appended guidance sections were retained when resolving shared-document conflicts. The temporary Vite host override and responsive harness are excluded from the delivered changes. GitHub owns source changes; Lovable is read-only and receives the normal source sync, with no builder task or separate Publish action.

TypeScript, scoped feature-component ESLint, feature source/style formatting, SEO policy and whitespace checks passed against the final source. A clean production build generated fresh client/server output and completed Nitro successfully. Existing dependency/module-directive warnings were non-fatal. Hosted Lovable verification follows the source sync; local inspection is not represented as a hosted acceptance result.
