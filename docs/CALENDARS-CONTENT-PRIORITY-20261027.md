# Calendar content priority correction

27 October 2026, Australia/Sydney. Scope: `/features/calendars-bookings`.

## Decision and implementation

The owner rejected the availability feature block as basic setup detail given disproportionate sales-page space. The approved recommendation is removal, not another replacement chapter. This supersedes the preceding rounded-hours composition and its positive implementation assessment; neither previous numerical scores nor code-check success established owner acceptance.

- **USE** the customer booking demonstration, five meeting formats, native Meeting Rooms and owner-confirmed saved recording/transcript story.
- **ADAPT** the existing provider marks into one small supporting row beneath the booking demonstration. The same locally served assets and visible provider names remain, at 24px instead of 36px.
- **REMOVE** the availability heading, large neutral panel, blue/white hours diagram, two setting explanations and their unused responsive styles. Do not fill the freed space with another section.

The connections row is outside the opening's sticky grid, so it does not extend the booking scene's hold. It has no heading, box, divider, background or new interaction. The meeting chapter now leads directly to existing Guided Launch and FAQs. The existing services/duration FAQ becomes “Can I set my hours and appointment lengths?” and retains documented working days, split ranges, time zone, duration and minimum notice in its answer. No capabilities are added, removed from the product or represented as novel differentiators.

Current main `839ac484` was read, including later appended project guidance, the Calendar route/component/styles and current Chatbot/Inbox source. Their rendered openings and the existing Calendar block were inspected before the edit. The owner screenshot is used as evidence of the weak content priority, not a composition to imitate. Shared navigation/footer, Platform structure, route/indexing, `/booking`, hero/final copy, all five formats and the meeting imagery/claims remain.

## Evidence boundaries

The FAQ wording carries existing supported controls from `CALENDARS-BOOKINGS-EVIDENCE.md`: Calendar Builder, Create a Calendar and Availability document working days, multiple time ranges, time zones, duration and minimum notice. The row retains the documented Google Calendar, Microsoft 365 and Apple iCloud destinations. Native icon provenance remains in `CALENDARS-CLARITY-REVIEW-20261026.md`.

The meeting recording/transcript scope remains owner-confirmed. This presentation edit neither independently tests nor expands live meeting storage, automatic recording defaults, retention, capacity or CRM association. No live bookings, records, messages, rooms or permissions are changed.

## Rendered verification

Managed Chrome review covered the changed areas at these iframe viewports:

| Viewport           | Document width | Result                                                                                                   |
| ------------------ | -------------- | -------------------------------------------------------------------------------------------------------- |
| Desktop 1320 × 769 | 1305px         | Provider row is 24px high. The scene ends 32px above it; it does not overlap or prolong the sticky grid. |
| Tablet 834 × 820   | 819px          | Caption and all three icon/name pairs fit on one 24px row.                                               |
| Phone 393 × 820    | 378px          | Complete unboxed provider row fits in 87.4px, followed by the existing formats panel.                    |
| Phone 320 × 820    | 305px          | Caption/provider names wrap naturally in a 126.9px row; nothing clips or creates document overflow.      |

All three images loaded at 24px. No audited provider paragraph/span overflow appeared at those sizes. The availability block and its heading/hour labels are absent from the rendered main. Five format rows remain. The meeting chapter's next sibling is Guided Launch; the desktop content gap is the existing 125px spacing, with no empty replacement container.

Selecting 11 November and 1pm updates the confirmation to the same time. The complete booking desk holds at y=88–701.9px in the short desktop viewport and releases above the viewport on native scrolling into the next content. The provider row stays outside the grid. The updated FAQ opens with Enter and shows the complete retained controls. A fresh script-disabled phone document has zero enabled booking buttons, retains the provider row and opens the same FAQ natively.

The local preview initially stopped while checks ran. After restarting it, reading its failed internal error tab was blocked by the browser's protocol policy. No internal error content was accessed; a fresh ordinary HTTP page was opened successfully for the checks above. An initial FAQ click during navigation opened a different existing question; it was not counted as proof of the intended answer. A settled keyboard action and the fresh script-disabled document verified the correct disclosure.

This is targeted marketing UI review in Chrome, not exhaustive browser/device/screen-reader testing or a live product acceptance test. No new motion or backend behaviour is introduced. No low-value unit test was added for the reversible content/layout edit.

## Role assessment

These are the implementer's subjective assessments of this scoped edit after rendered review, not an independent team, owner approval, measured conversion result or a whole-page certification.

| Lens              | Score | Reason                                                                          |
| ----------------- | ----- | ------------------------------------------------------------------------------- |
| UI/UX             | 9/10  | Removes a competing chapter while preserving practical answers.                 |
| Brand / Creative  | 9/10  | Open supporting row and existing surfaces replace another framed panel.         |
| Product Marketing | 9/10  | Gives scheduling settings supporting rather than headline prominence.           |
| Conversion        | 9/10  | Shorter path from meeting value to setup and the existing sales action.         |
| Motion            | 9/10  | Existing measured hold/release remains intact; no new motion or scroll capture. |
| SME / frontline   | 9/10  | Calendar destinations are recognisable; settings remain easy to find.           |
| Copy              | 9/10  | Removes the lengthy basic-feature pitch and consolidates its useful detail.     |
| Buyer psychology  | 9/10  | Page space better reflects the relative importance of the buyer's decisions.    |
| Technical         | 9/10  | Unused CSS removed, assets reused, semantic list and native FAQ retained.       |
| Product accuracy  | 9/10  | Existing verified controls retained without new promises.                       |
| AI-slop critic    | 9/10  | No filler replacement, pastel feature cards or decorative product diagram.      |

## Integration

The work began at `839ac484` and incorporated current main `9ab7fcd`, preserving the latest Ticketing queue, Websites scenes and approved Automation palette. Both Ticketing and Calendar entries are retained in the shared brief. TypeScript, scoped Calendar ESLint, SEO, formatting and whitespace checks passed. The combined source passed TypeScript again and a fresh production build completed client/server output and Nitro successfully. Existing dependency/module-directive warnings were non-fatal. The responsive harness and temporary Vite host configuration are excluded from delivery. GitHub remains the source of truth; Lovable receives normal source sync without a builder task or separate production Publish action. Hosted verification follows that sync.
