# Industry review card consistency
Reviewed 13 October 2026.

## Change
Skin, Dental, Mechanics, Allied Health, Trades and the Mortgage Brokers comparison page use shared ReviewInvitation and GoogleReviewCard components. Invitation glass follows Skin: rgba(252,252,250,.91), 2px light border, inner fine border, 18px corners, soft shadow and 6px backdrop blur. Shared typography, Google colours, five outlined unselected stars and prompt spacing prevent page-specific drift. Cards scale within their industry compositions.

Removed the client portrait/name from inside Skin's Google rating panel. Client identity remains on completion records and messages. Dental's completion record now uses Mia's existing portrait. Removed the exact displayed STOP caption from all industry examples where it appeared. These changes affect website illustrations, not production messaging settings.

## Route audit
| Route | Result |
|---|---|
| cosmetic-skin-clinics | Shared cards, no portrait inside Google, no STOP caption |
| dental | Shared cards; Mia on completion record, outside Google; no STOP caption |
| mechanics | Shared cards, existing customer completion identity retained |
| allied-health | Shared cards, same Google prompt as other appointment industries; no STOP caption |
| trades | Shared cards; industry wording and playback controls retained |
| mortgage-brokers-v2 | Shared cards; settlement/referral composition retained |
| mortgage-brokers | No Google rating example existed. Removed its two STOP captions; did not insert an unrelated review section |
| mechanics-v2 | Existing redirect to canonical mechanics uses the same implementation |

## Evidence
Production build, TypeScript, scoped ESLint and whitespace checks passed.
All six Google-card pages were visually inspected on desktop (1348px) and narrow mobile (320px). Card descendants were checked against both their own card edges and the viewport at 320px. No out-of-bounds card contents found.
Tablet (768px) DOM checks confirmed five stars, zero avatars inside the Google panel, consistent 24px padding, 18px corners and 6px computed backdrop blur across all six. Skin tablet screenshot also reviewed.
All six narrow layouts use 18px padding; browser-rendered page text contains no exact STOP caption.
Visual review caught inherited balanced wrapping on Allied Health and a CSS compiler issue dropping the standard blur declaration. Shared heading wrap was specified and CSS declaration order corrected. The final compiled asset retains both prefixed and standard blur; browser computed blur is 6px.
No page-origin runtime errors observed. Browser extension metadata logs excluded.
Temporary QA harness removed before merge. Shared component requirement added to project design guardrails.

## Scope
This is a review-card consistency pass, not a fresh complete conversion, accessibility or live workflow audit of all industry pages. Original workflow triggers and page compositions remain page-owned. Review links/stars remain demonstrations and do not submit reviews.
