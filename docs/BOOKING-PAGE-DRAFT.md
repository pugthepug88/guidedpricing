# Booking page draft

The existing booking destination uses a different page experience from the current Zapla site. This change prepares `/booking` in the current site for the calendar embed Andrew will supply.

## Design

The headline is “See where Zapla fits your business.” A short introduction and a three-part agenda explain the call: current process, relevant workflows, and setup/costs. The calendar occupies the primary panel. Desktop places the explanation beside it; mobile places the calendar after the introduction and before the detailed agenda, in the same order as the document.

Uses existing logo artwork, local Inter Tight/Manrope fonts, warm neutral/white, sage and deep green. It has a minimal header and legal/contact footer. The shared navigation and domino footer continue to render on other routes; `/booking` supplies its own shell. No additional animation or photography is needed for selecting an appointment.

## Calendar integration

`BookingCalendar` in `src/routes/booking.tsx` is the single replacement point for the supplied embed. Until it is integrated, the page honestly offers an email fallback. There are no simulated calendar dates, duplicate enquiry forms or claimed confirmations.

Keep existing booking CTAs pointing to the working external booking destination until the new embed is connected, inspected and tested. This draft is noindex and excluded from sitemap.

When the embed arrives: inspect the supplied provider/code; add the actual supported embed and required loader; verify iframe title, width/height, mobile scrolling, timezone, available times, validation, privacy/consent, confirmation and attribution. Do not treat an embed load or CTA click as a completed booking. Update the site destination only after verification.

## Review perspectives

These are distinct reviews by the implementing agent, not independent people or customer testing.

| Lens                         | Decision                                                                                                                            |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Brand / Creative             | Existing identity and palette; focused typography; calendar is the focal area.                                                      |
| Product Marketing            | Promises a fit conversation and useful starting workflow rather than a bespoke strategy deliverable.                                |
| Conversion                   | Explains the call before asking for a time; avoids full sales navigation, speculative results and a second form.                    |
| UI/UX                        | Responsive grid, calendar before detailed agenda on mobile, skip link and visible focus. Actual rendered and embed QA remains open. |
| Motion                       | No entrance delays, looping movement or animated footer on this task-oriented page.                                                 |
| SME buyer / buyer psychology | Starts with the current setup and discusses scope/costs before a decision.                                                          |
| Copy / AI-slop critic        | Concrete agenda; no fabricated customer proof, urgency, guarantees or feature list.                                                 |

## Status

Draft implementation only. Production build, TypeScript and scoped new-route lint are checked separately. Full rendered desktop/mobile/keyboard inspection is pending: the managed environment's required control-browser skill is unavailable, so no alternative browser runtime was installed or preview server improvised. Do not call the design visually verified or merge it as a working booking replacement yet. Calendar integration awaits Andrew's supplied code.
