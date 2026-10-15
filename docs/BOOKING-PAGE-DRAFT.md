# Booking page draft

The existing booking destination uses a different page experience from the current Zapla site. This change prepares `/booking` in the current site for the calendar embed Andrew will supply.

## Design

The headline is “Let’s talk about your business.” It uses a single warm-white headline on a deep green introduction panel, with the existing multicolour Zapla petal as a brand signature and understated duration/online details. A warm neutral surround frames the connected dark introduction and light scheduling composition. A narrower explanation column and wider scheduling panel replace the industry-style split-colour hero. The three-part agenda explains the current process, relevant workflows and setup/costs without numbered feature rows. Desktop places the explanation beside the calendar; mobile places the calendar after the introduction and before the agenda.

The root-owned SiteNav and DominoFooter render unchanged on this route. The page uses existing local Inter Tight/Manrope typography, deep green, warm white, neutral surfaces and functional blue links/buttons. There is no additional booking-page animation or photography.

## Calendar integration

`BookingCalendar` in `src/routes/booking.tsx` is the single replacement point for the supplied embed. Until it is integrated, the page honestly offers an email fallback. There are no simulated calendar dates, duplicate enquiry forms or claimed confirmations.

Keep existing booking CTAs pointing to the working external booking destination until the new embed is connected, inspected and tested. This draft is noindex and excluded from sitemap.

When the embed arrives: inspect the supplied provider/code; add the actual supported embed and required loader; verify iframe title, width/height, mobile scrolling, timezone, available times, validation, privacy/consent, confirmation and attribution. Do not treat an embed load or CTA click as a completed booking. Update the site destination only after verification.

## Review perspectives

These are distinct reviews by the implementing agent, not independent people or customer testing.

| Lens                         | Decision                                                                                                                            |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Brand / Creative             | Existing identity and typography; single-colour heading; wider calendar is the focal area.                                          |
| Product Marketing            | Promises a fit conversation and useful starting workflow rather than a bespoke strategy deliverable.                                |
| Conversion                   | Explains the call before asking for a time; retains shared navigation; avoids speculative results and a second form.                |
| UI/UX                        | Responsive grid, calendar before detailed agenda on mobile, skip link and visible focus. Actual rendered and embed QA remains open. |
| Motion                       | No page-specific entrance delays or loops; shared footer behavior is preserved.                                                     |
| SME buyer / buyer psychology | Starts with the current setup and discusses scope/costs before a decision.                                                          |
| Copy / AI-slop critic        | Concrete agenda; no fabricated customer proof, urgency, guarantees or feature list.                                                 |

## Status

Draft implementation only. Production build, TypeScript and scoped new-route lint are checked separately. Full rendered desktop/mobile/keyboard inspection is pending: the managed environment's required control-browser skill is unavailable, so no alternative browser runtime was installed or preview server improvised. Do not call the design visually verified or merge it as a working booking replacement yet. Calendar integration awaits Andrew's supplied code.
