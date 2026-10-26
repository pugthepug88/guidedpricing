# Pipeline presentation refinement — 26 October 2026

## Scope and decision

The owner requested clearer stage names and simple columns, human portraits instead of an assignee dropdown, an automatically playing explanation with fewer clicks, and a default phone presentation for routes. The owner also questioned the map caption and attribution. This record supersedes the presentation choices in [the earlier revamp review](PIPELINE-MANAGEMENT-REVAMP-20261026.md), not its capability evidence or the rest of the page.

The earlier arrow caps copied the supplied application screenshot too literally. Moving an opportunity required a visitor to operate the demonstration, and the route disclosure made the useful phone outcome an extra step. Those choices are replaced. The five-stage overview, meaningful records, established portraits, real supplied map and broader page story remain.

The checkout was refreshed from `e837957` to current GitHub main `04bf0fb`, preserving the concurrent Calendar recording/transcript work and Chatbot substance revision. The only shared-document conflict was resolved by retaining both other chats' appended corrections before this Pipeline correction. This review describes completed local verification. The delivery handoff verifies the subsequent GitHub commit and actual Lovable preview separately; no production Publish action is authorised.

## Material changes

- **Stages:** New enquiry → Discussing needs → Preparing quote → Quote sent → Accepted. These distinguish what has happened from what remains to do. Accepted means the customer has agreed; it does not mean that the installation or service is complete. The example's next-action copy is aligned with these stages.
- **Columns:** simple rectangular headings and neutral lane boundaries replace the arrow caps and individually coloured borders. The first three headings are neutral, Quote sent is steel blue and Accepted is green. Cards keep their people, due dates and concrete next actions.
- **Responsibility:** Everyone, Ben and Alex are visible portrait/name buttons under “Show work for”. Their accessible names and pressed states explain the filter. They do not reassign work. The same filter applies to Board, Table and Timeline.
- **Progress story:** Mia's “I'd like to go ahead” is followed by Ben recording the decision. A suitable desktop view plays one move from Quote sent to Accepted, then holds the result. Ben, Tomorrow and Arrange installation time remain unchanged. There are no Move/Return controls, looping resets, automatic board scrolling or page-scroll capture.
- **Routes:** the right side is always the phone view. It retains the same selected pipeline jobs, route date, driver and Google Maps handoff. The duplicate planning surface and disclosure are removed; the complete phone is readable without JavaScript.
- **Caption:** “Illustrative route” and the separate credit row are removed. A single compact linked credit sits inside the map corner. The actual source image and its pixels are unchanged.

The animation is a marketing explanation of Ben's action, not evidence of automatic product stage movement or assignment. Route optimisation and Google Maps claims retain the boundaries in [PIPELINE-ROUTES-CAPABILITIES-20261026.md](PIPELINE-ROUTES-CAPABILITIES-20261026.md). The page does not optimise, save, dispatch or navigate a live route.

## Attribution decision

The actual supplied map is based on Mapbox and OpenStreetMap. [Mapbox's Static & Print guidance](https://docs.mapbox.com/help/dive-deeper/attribution/#static--print) requires attribution near the image and supplies linked Mapbox, OpenStreetMap and map-feedback text. The [OpenStreetMap Foundation attribution guidelines](https://osmfoundation.org/wiki/Licence/Attribution_Guidelines) require legible attribution and access to licence information. Both official sources were checked on 26 October 2026.

The original image's embedded credit becomes too small at narrow display sizes. The fixed-size HTML credit keeps the required information readable without a separate explanatory caption or another product interaction. At the tested 305px content width, it wraps within the 239px map at 11px rather than extending beyond the frame. The copyright link supplies the licence destination. There is no requirement to retain “Illustrative route”.

## Motion and fallback behaviour

Autoplay is enabled only at a viewport of at least 1211px by 700px with no reduced-motion preference. Both Mia's card and the two-person explanation must be at least 60% visible below the fixed-header allowance. After a 2.6-second reading hold, the card moves over 0.8 seconds and the final state remains. The pending hold cancels when the scene or tab is not visible. Choosing any view or person filter immediately settles the demonstration and takes precedence over playback.

Smaller/shorter screens and reduced motion receive the complete accepted state. The no-JavaScript branch renders the same final card and causal explanation, while unusable JavaScript controls are hidden. The board remains a native horizontal region on small screens. No timer is needed to understand the result and no script changes its scroll position.

## Completed verification

| Check | Observed result |
| --- | --- |
| Desktop, 1348 × 926 | Complete five-column hero, portrait filters and two-person story are legible. Autoplay completed without a move click and held the result. The map and default phone fit together in the route chapter. |
| Visibility and timing | Reloading while the board was offscreen left the demonstration ready. Bringing the card and explanation into view allowed completion. Ownership, due date and next action stayed unchanged. |
| Tablet, 834 × 1000 frame / 819px content | Hero and portrait controls fit; native stage overflow stays inside the board. Enter on Ben's filter showed the correct three records. Table retained those records and Mia's accepted state. Returning to Everyone/Board did not replay. Map and phone remained side by side and readable. |
| Phone, 390 × 844 frame / 375px content | Hero and controls remained readable without document overflow. The completed state appeared without waiting for animation or forced scrolling. |
| Narrow phone, 320 × 844 frame / 305px content | Map credit wrapped inside the map, phone details and stops remained readable, and document width equalled viewport width. |
| No JavaScript | A sandboxed iframe blocked scripts. Mia appeared in Accepted, Ben and the recorded action were visible, and the complete explanation named Ben as the actor. JavaScript controls were hidden and the default route phone remained visible. |
| Technical checks on integrated main | `npm run build`, TypeScript, targeted ESLint, scoped Prettier, SEO policy and whitespace checks passed. Existing bundler/module-directive warnings did not fail the build. Temporary preview configuration and the responsive QA harness were removed. |
| Browser diagnostics | The observed errors concerned the browser extension, including its injected HTML attribute during hydration. No Pipeline component exception was observed. |

Existing sales and related-feature destinations are unchanged. Their actual navigation was verified in the preceding revamp; this scoped pass tests the changed filters, presentation and fallbacks rather than claiming a new end-to-end product test.

## Review observations and limits

The owner/frontline view is stronger because stages distinguish enquiry, scoping, preparation, delivery of a quote and acceptance. Named people and next actions remain visible, so the stage change does not imply that work has disappeared. The copy review rejected a narrower Visit arranged / Following up sequence because it overlaps stages and unnecessarily makes the general sales example specific to visiting businesses.

The creative review keeps the pipeline topology while reducing screenshot-like decoration. Neutral early stages and two meaningful darker headings give the board a clearer hierarchy. The phone outcome is visible immediately. The contained dark route chapter, open customer-history/photo section and established final CTA retain the whole-page rhythm.

The conversion improvement is fewer explanatory clicks, not a claimed increase in conversion. Product accuracy is protected by naming Ben as the actor and retaining the difference between opportunity owner and route driver. Independent agents reviewed copy/stage logic, attribution evidence and the route implementation; the implementation owner performed the rendered checks.

Reduced-motion handling was reviewed in source. Browser tools did not expose OS motion-preference emulation, so a separate runtime preference test is not claimed; the same static-result branch was exercised at smaller widths. No physical-device Google Maps handoff, live route optimisation, screen-reader usability study or cross-browser certification was performed. No automatic numerical design score or owner acceptance is asserted.

## Rendered proof

- [Revised stage hero](review-assets/pipeline-management/hero-refined-20261026.svg)
- [Default phone route view](review-assets/pipeline-management/routes-phone-refined-20261026.svg)

These are actual rendered screenshots. The SVG files embed their original JPEG bytes unchanged for repository delivery, not regenerated visual mockups.

## Superseding phone and colour correction

The owner's next review rejected the first three neutral headers and asked for a phone that reads more clearly as a device, supplying `image(20261026-054723).png` from Birdeye and `image(20261026-054752).png` from the current Pipeline board. Earlier implementation review was not approval of those details.

**ADAPT** the Birdeye reference's tall mobile proportions and clear screen/app header. **REJECT** importing its healthcare dialogue, violet theme or message timestamps into the route example. The buyer question remains: what will the person heading out see on their phone?

The new phone has a 312px maximum-width graphite/metal shell, an inset rounded screen, speaker/camera, side keys and home indicator. A compact Zapla/Routes header distinguishes the app from the device. Native content remains selectable and grows vertically. A 600px minimum screen height gives wider layouts a recognisable phone proportion; at 380px and below, the minimum is removed so the content determines its height. There is no fixed-height clipping or nested scrolling. Decorative hardware is hidden from assistive technology. The four jobs, areas, driver/date, map, attribution and Google Maps copy are unchanged; no clock, battery, ETA or false control is introduced.

All five headers are now coloured. The white cards and neutral boundaries retain the board's overall lightness. Contrast calculations for the actual foreground/background pairs are:

| Stage | Background | Text | Contrast ratio |
| --- | --- | --- | --- |
| New enquiry | `#BF7458` coral | `#111318` ink | 5.18:1 |
| Discussing needs | `#DDA34B` gold | `#111318` ink | 8.33:1 |
| Preparing quote | `#4F8F91` teal | `#111318` ink | 5.02:1 |
| Quote sent | `#354A63` steel blue | `#FFFFFF` | 9.09:1 |
| Accepted | `#2E5947` green | `#FFFFFF` | 7.97:1 |

The colour reviewer recommended teal over lavender to avoid the owner's purple/plum concern and checked the small-text contrast. The independent phone source review found unchanged route facts, no fake live state and no fixed-height text trap. The implementation owner inspected the actual rendered desktop at 1348 × 926, tablet at 834 × 1000 (819px content), phone at 390 × 844 (375px content), and narrow phone at 320 × 844 (305px content). Map and phone stay together on tablet, and the complete phone remains legible on both phone widths. Document width matched content width at 819, 375 and 305px; the inner phone screen also showed no horizontal content overflow. Desktop rendering confirmed all five computed header colours, and the existing demonstration still completed with Mia in Accepted.

The working base was refreshed to GitHub main `7940583`, preserving the newer Automation and Calendar corrections and cross-page copy cleanup. Scoped code changes are limited to the route component and Pipeline styles. The shared header/footer, route, copy, existing controls and sales destinations are unchanged. Production build, TypeScript, targeted ESLint, formatting, SEO policy and whitespace checks passed. Temporary preview configuration and the responsive harness were removed. This is a visual refinement, not a new live-product or physical-phone Google Maps test. No additional motion is introduced, and no automatic numerical score is assigned.

Updated proof:

- [Recognisable phone and route](review-assets/pipeline-management/phone-device-20261026.svg)
- [All five coloured stage headings](review-assets/pipeline-management/coloured-stages-20261026.svg)
