# Zapla responsive audit — 28 October 2026

The core layouts reflow across desktop, iPad and a regular phone. The narrow 320px pass exposes **13 pages with horizontal overflow**: Follow-Up, Automation Builder and all 11 competitor comparison pages. Two responsive headline bugs and missing assets in the Git-built preview also need attention. The remaining recommendations concern readability and presentation, rather than broken page geometry.

## Scope and evidence

- Source snapshot: `ebac159b85ffc697bc29872817f9235671ce180a`, confirmed current on Git main and in Lovable at audit start. Main was checked again after the review and remained unchanged.
- All **40 frontend routes**, including both pricing versions and the internal comparison review page. Server, MCP, robots and sitemap endpoints are excluded.
- **200 unique page/viewport combinations:** 1440×900 desktop; 834×1112 iPad portrait; 1194×834 iPad landscape; 393×852 phone; 320×740 narrow phone.
- Measurements use the actual page in same-origin Chromium frames, with normal loaded styles and fonts. Each route's opening was visually compared across the first four sizes. Body scenes, suspect elements, the comparison calculator, narrow menu and footer received targeted inspection.
- No page-load error was detected. All 160 checks at 1440/1194/834/393 had zero page-wide horizontal overflow. The extra 320px pass found the 13 failures below.
- The browser uses classic vertical scrollbars: a 320px frame has 305px usable content width. This is a useful narrow-layout stress test. The 5/10px overflows are particularly sensitive to scrollbar width; physical mobile Safari uses a different scrollbar model. The 63px Follow-Up overflow exceeds even the full 320px frame.
- The website's application code, content and main branch were unchanged. The audit branch contains diagnostic tooling and this report. The temporary toolbar initially interfered with frame clicks; the toolbar was corrected and the mobile menu was retested successfully. This was a test-harness issue, not a site defect.

## Fix order

| ID | Priority | Page(s) | Observed issue | Recommended change |
|---|---|---|---|---|
| R01 | Fix first | Follow-Up | At 320px, page width is 368px against 305px usable width: **63px overflow**. The problem cards grow to 348px. Long display words, particularly “FORGOTTEN.”, force the grid wider. | Allow the grid items to shrink, use a bounded single-column track, and reduce the long display words below 360px. Preserve the words and readability. Fix the sizing rather than hiding overflow on the page root. |
| R02 | Fix first | All 11 competitor comparison pages | At 320px, each page overflows by **10px**. The shared hero grid is 261px wide, while both hero children grow to about 293px. | Fix the shared `simple.css` hero once: permit tracks/children to shrink and scale the “Unlimited users” offer typography/padding to available space. Recheck the calculator and table afterwards. These pages fit at the four wider sizes. |
| R03 | Fix before Git deployment | Home; Platform | Home has 10 failed embedded images, including older portraits/logo artwork. Platform's central customer colour/sketch assets fail in the Workers preview; the central illustration is visibly absent. | Bundle the original asset bytes with the deployed site or provide their required asset resolver. The affected JSON asset descriptors point to `/__l5e/assets-v1/...`. Keep the approved imagery. This is confirmed for the Git-built Workers preview; Lovable's own asset-serving environment was not visually verified. |
| R04 | Fix first; small change | Unified Inbox; Dental | Inbox at 834px reads **“The wholeconversation.”** Dental on phones reads **“Zapla handlesthe follow-up.”** Hiding a `<br>` removes the only word boundary. | Add explicit whitespace at the boundary or use text spans whose responsive display changes preserve spaces. Check every breakpoint around the existing 600/900px Inbox and phone Dental rules. |
| R05 | Fix | Automation Builder | At 320px, the AI workflow produces **5px page overflow**. Its workflow figure is 239px wide but has 277px scrollable content; this propagates through the workspace. | Constrain the workflow figure/diagram and inspect its connectors and width constraints. Keep the complete draft in ordinary flow and retain readable nodes. Avoid a page-wide overflow clamp. |
| R06 | Improve | CRM; Quote Follow-Up | Core mobile product proof contains 7–10px text. CRM's “Opportunity created” is 9px; quote statuses are 9px, with several details at 7–8px. | Give the phone version fewer, more useful fields and a readable focal action/status. Target roughly 12–14px for the primary product story. Keep secondary visual detail quiet; enlarging every field would add clutter. |
| R07 | Optional presentation improvement | Pipeline Management | The board is intentionally scrollable. Its 1120px content sits in a 312px phone strip, 721px iPad portrait strip and 1065px landscape strip. Only part of the stage sequence is visible at once. | Keep the recognisable desktop board. Consider a compact phone stage overview or a focused current-stage view. The consent/result text already appears below the board, so this is a presentation tradeoff, not a broken flow or page-wide overflow. |
| R08 | Optional polish | Allied Health; Skin & Cosmetic Clinics | The 834px portrait layouts keep narrow two-column hero photos; people approach or cross the image edge. The full-size Allied Health review shows the patient's right side tightly cropped. | Adjust the crop/focal position or stack the hero earlier where it improves the photo. Preserve the page-specific composition. This is an art-direction judgement, not a clipping failure. |
| R09 | Optional polish | Booking | The email arrangement panel stretches to match the tall left column, leaving substantial empty space on desktop/iPad. | Size the email fallback to its actual content or rebalance the two columns. The page currently arranges calls by email; it is not a connected calendar. No email or booking was submitted. |

## Visual evidence

The images are original browser captures. Open them at full size to inspect the detail.

- [Follow-Up: 320px overflow](qa/responsive-audit-20261028/follow-up-narrow-overflow.jpg)
- [Comparison hero: 320px overflow](qa/responsive-audit-20261028/activecampaign-narrow-overflow.jpg)
- [Platform: missing central illustration](qa/responsive-audit-20261028/platform-hero.jpg)
- [Inbox: joined words on iPad](qa/responsive-audit-20261028/unified-inbox-ipad-heading.jpg)
- [Dental: joined words on phone](qa/responsive-audit-20261028/dental-phone-heading.jpg)
- [Automation Builder: narrow workflow](qa/responsive-audit-20261028/automation-builder-narrow-workflow.jpg)
- [CRM: native-size mobile detail](qa/responsive-audit-20261028/crm-phone-product-detail.jpg)
- [Pipeline: intentional horizontal board](qa/responsive-audit-20261028/pipeline-phone-board-full.jpg)

## Page-by-page results

“Fits” means no material fit defect was found in this pass. It does not mean every interaction or browser engine has been certified. Issue IDs refer to the fix table above. Optional R07–R09 recommendations do not turn a fitting page into a technical failure.

| Page | Desktop 1440 | iPad portrait 834 | iPad landscape 1194 | Phone 393 | Narrow 320 | Action |
|---|---|---|---|---|---|---|
| `/` | Missing preview assets | Missing preview assets | Missing preview assets | Missing preview assets | Missing preview assets | R03 |
| `/platform` | Missing preview assets | Missing preview assets | Missing preview assets | Missing preview assets | Missing preview assets | R03 |
| `/crm` | Fits | Fits | Fits | Fits; small proof text | Fits; small proof text | R06 |
| `/customer-marketing` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/follow-up` | Fits | Fits | Fits | Fits | Overflow +63px | R01 |
| `/ai-receptionist` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/quote-follow-up` | Fits | Fits | Fits | Fits; small proof text | Fits; small proof text | R06 |
| `/reactivation` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/reviews` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/booking` | Fits | Fits | Fits | Fits | Fits | R09 |
| `/pricing-v2` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/Pricing-v3` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/features/ai-chatbot` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/features/unified-inbox` | Fits | Headline word join | Fits | Fits | Fits | R04 |
| `/features/business-phone` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/features/pipeline-management` | Fits | Fits; board scrolls | Fits; board scrolls | Fits; board scrolls | Fits; board scrolls | R07 |
| `/features/automation-builder` | Fits | Fits | Fits | Fits | Overflow +5px | R05 |
| `/features/calendars-bookings` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/features/quotes-invoices-signatures` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/features/websites-funnels-forms` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/industries` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/industries/allied-health` | Fits | Fits | Fits | Fits | Fits | R08 |
| `/industries/cosmetic-skin-clinics` | Fits | Fits | Fits | Fits | Fits | R08 |
| `/industries/dental` | Fits | Fits | Fits | Headline word join | Headline word join | R04 |
| `/industries/mechanics` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/industries/mortgage-brokers` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/industries/trades` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/comparison` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/comparison/review` | Fits | Fits | Fits | Fits | Fits | Keep |
| `/comparison/zapla-vs-activecampaign` | Fits | Fits | Fits | Fits | Overflow +10px | R02 |
| `/comparison/zapla-vs-creatio` | Fits | Fits | Fits | Fits | Overflow +10px | R02 |
| `/comparison/zapla-vs-ghl` | Fits | Fits | Fits | Fits | Overflow +10px | R02 |
| `/comparison/zapla-vs-hubspot` | Fits | Fits | Fits | Fits | Overflow +10px | R02 |
| `/comparison/zapla-vs-keap` | Fits | Fits | Fits | Fits | Overflow +10px | R02 |
| `/comparison/zapla-vs-monday-crm` | Fits | Fits | Fits | Fits | Overflow +10px | R02 |
| `/comparison/zapla-vs-pipedrive` | Fits | Fits | Fits | Fits | Overflow +10px | R02 |
| `/comparison/zapla-vs-podium` | Fits | Fits | Fits | Fits | Overflow +10px | R02 |
| `/comparison/zapla-vs-salesforce` | Fits | Fits | Fits | Fits | Overflow +10px | R02 |
| `/comparison/zapla-vs-thryv` | Fits | Fits | Fits | Fits | Overflow +10px | R02 |
| `/comparison/zapla-vs-zoho` | Fits | Fits | Fits | Fits | Overflow +10px | R02 |

## What I would keep

Keep the approved AI Chatbot composition. Its photo/copy split, compact dialogue and lower product scenes reflow without page-wide overflow at the tested widths. Business Phone, Quotes/Invoices/Signatures, Calendars/Bookings and Websites/Funnels/Forms also pass the page-width checks; their opening compositions adapt rather than simply shrinking the desktop page.

The shared mobile feature menu opens and expands at 320px, with all eight feature links readable. It scrolls vertically within its bounded menu. The footer's eight feature links fit their columns with 44px or larger row heights; the AI Chatbot footer link was followed successfully to its correct page. The shared comparison calculator was checked at 393px with CRM + marketing selected and 100 users: its table remained within the page width. This does not remove the separate 320px hero failure.

## Review boundaries and data

These are rendered browser viewport checks, not tests on physical iPads/iPhones. Run a final Safari device pass after the listed fixes, especially for sticky scenes, video, font loading and touch interaction. Eight-idea motion cycles, live message delivery, form submissions, payments and calendar service operations were outside this layout audit.

Screen-reader-only captions and 1px hidden accessibility text were excluded from visual-clipping findings. Intentionally clipped decorative strips, ellipses and the scrollable Pipeline board were assessed separately from page-wide overflow. Long page height alone was not treated as a failure.

The report recommends changes; it does not implement them. No separate Lovable Publish action was performed.

Data files:

- [40-page audit CSV](qa/responsive-audit-20261028/page-audit.csv)
- [200-layout measurements CSV](qa/responsive-audit-20261028/layout-metrics.csv)
- [Original four-size scan, compressed JSON](qa/responsive-audit-20261028/layout-scan.json.gz)
- [Narrow-phone scan, compressed JSON](qa/responsive-audit-20261028/narrow-layout-scan.json.gz)

Rebuild the report and CSVs with `python scripts/build-responsive-audit-report-20261028.py`. The script reads either the original JSON files or their compressed archives.

Source locations for the main fixes:

- Follow-Up problem cards: `src/routes/follow-up.tsx`.
- Shared comparison hero: `src/components/compare/simple/simple.css`.
- Inbox heading and responsive break: `src/components/features/UnifiedInboxPage.tsx`, `src/styles/unified-inbox.css`.
- Dental heading and phone break: `src/routes/industries/dental.tsx`, `src/styles/dental.css`.
- Automation workspace: `src/styles/automation-builder.css` and its AI flow component.
- Deployment assets: descriptors under `src/assets/*.asset.json`, used by the homepage and `PlatformConnectedSystemScene`.
