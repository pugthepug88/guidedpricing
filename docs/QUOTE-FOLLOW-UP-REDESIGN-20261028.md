# Quote Follow-Up — reassessment and redesign

28 October 2026 (Australia/Sydney). Route: `/quote-follow-up`. Base: `f752160012e34db4d3e7bb213eca81ba224f7971`.

## Diagnosis and decision

The previous page repeated quote visibility, next actions and customer context through nine sections. Its tilted ledger, miniature 7–10px detail, numbered process, repeated card grids and sage/cream bands conflicted with the current Zapla guardrails. Abstract next-state language took more space than a useful customer interaction. The first responsive audit established that the old layout loaded, not that it was convincing.

Rebuild around a single cabinetry-business story: quote recorded as sent → a configured check-in two days later → Emma asks about retaining the benchtop → Alex deliberately checks measurements and revises the scope. A separate CRM work list shows team-recorded next steps for current quotes. Remove the aggregate value, invented operational counters and automatic-paused state. This is a solution page for follow-through; document creation belongs to Quotes, Invoices & Signatures and the full builder belongs to Automation Builder.

Alternative considered: retain the ledger and enlarge its type. Rejected because the dashboard would still dominate the buying argument and repeat the lower quote queue. A photo-only hero was also rejected: the quote and outgoing message need to establish what the software does immediately.

Reference decisions: **USE** Zapla fonts, palette, real SVG wordmark, petal, CTA and existing root navigation/footer. **ADAPT** the approved Chatbot's human context, compact product detail and aligned surfaces; use a distinct heading-above-scene composition and one fresh workshop photograph. **REJECT** tilted cards, overlapping panels, giant quotations, generic icon tiles, multi-colour bands, decorative badges, fabricated results and a copied Chatbot section sequence. Existing Chatbot and Quotes/Invoices/Signatures implementations, the target route, AGENTS, build protocol, guardrails and owner instructions were read before implementation.

## Capability evidence and boundaries

Official English help payload was retrieved directly on 28 October: https://app.thenextgencrm.com/help-content/en.json. Web search's JSON open failed; the unauthenticated HTTP retrieval succeeded. Relevant pages: `automations/create`, `automations/[id]`, `inbox`, `contacts/[id]`, `quotes`. Cross-checked the existing Automation Builder and Quotes/Invoices/Signatures evidence documents, including their later corrections.

- Configured messages, waits and workflow steps explain the scheduled follow-up. The scene does not establish a native Quote Sent trigger; the start event or recorded pipeline stage is agreed during setup.
- Inbox documentation supports reading the original thread and sending a deliberate staff reply. Alex's answer is human-authored in the prepared story. No AI-generated answer, instant response or performed scope revision is claimed.
- CRM notes and pipeline work support the concise quoted-job list. Its Where it stands values and next actions are prepared records, not automatic reply classification or native quote-status options.
- Reply-driven cancellation, queued-message removal and universal automatic pause remain unverified. The old paused state and claims are removed. Setup copy agrees associated workflow handling rather than promising it.
- Existing-tool connectivity is assessed before agreement; no universal integration, quote-view tracking, automatic acceptance, quote-to-invoice conversion, payment, revenue gain or response rate is claimed.
- Guided Launch and applicable connected usage costs retain meaningful disclosure.

## Director review passes

These are separate review passes by the implementer, not external approvals or owner aesthetic acceptance.

| Lens                                          | Finding and resulting decision                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Motion Director                               | Keep the whole proof static and present immediately. No reveal wrappers, timers, replay, sticky capture or autoplay. Only existing link feedback and the native FAQ icon transition; transitions disabled for reduced motion. Shared footer video is unchanged.                                                                 |
| Brand / Creative Director                     | Keep warm-neutral material local to the hero message, white page canvas, blue functional accents and one candid work photograph. Remove the tilted paper, decorative glows, coloured chapter backgrounds and generic icon language.                                                                                             |
| Product Marketing / Conversion Director       | Say automated SMS/email follow-up explicitly above the fold. Show the commercially relevant scope question and distinguish the deliberate team response. Consolidate setup/fit/tool objections in useful FAQs; link the quoting and pipeline features.                                                                          |
| UI/UX Director                                | Native readable HTML, normal document flow, visible focus, native details, mobile stacked records and no horizontal board. First render exposed the iPad crop and four-line 320px H1; both were corrected and rechecked. Allow room for the expanded FAQ icon.                                                                  |
| SME buyer / buyer psychology / AI-slop critic | One customer, one business and a plausible question make the sales situation comprehensible. Avoid fake performance proof, architecture diagrams, repetitive next-action slogans and large negative fit panels. The workshop shows the team occupied doing the work; the adjacent quote and message establish the product role. |

## Rendered verification

Actual Chromium CSS viewports: 1440×900, 1194×834, 834×1112, 393×852 and 320×740. Every final scan reported zero document horizontal overflow, zero flagged clipped elements and zero missing main-page images. Message text remains 14–15px. Results: `qa/quote-follow-up-20261028/layout-checks.json`.

Inspected hero, follow-up, conversation, work list, setup and closing in rendered views. Compared the rendered approved Chatbot hero from the same source build before handoff. iPad portrait now uses the full photograph with an aligned two-column quote/message continuation; phones use ordinary stacking. The 320px opening now keeps the H1 to two lines. Product text remains real text. Native FAQ expands on click; final Book a Call opens `/booking` and its heading “Let’s talk about your business.” New Solutions links were checked in mobile navigation and the footer; desktop Solutions was opened with Enter and its Quote Follow-Up link returned to this page. All previous navigation destinations remain.

The connected extension timed out. Cloud browser verification used the supported managed local preview. A private-editor sign-in wall was not used for source checks. The temporary responsive-review harness is removed; no QA route or test controls are shipped. The exact `terminal.local` host was allowed only in the local launch environment; package.json was restored byte-for-byte. No dev-host override or dependency change is committed.

TypeScript, scoped ESLint, Prettier, whitespace checks, SEO policy checks and the production build passed. The final production rebuild includes the last hero-copy edit. Existing build warnings for Motion module directives are unrelated to this change. No physical iPad/Safari, screen-reader session, OS-level reduced-motion test or live CRM execution is claimed.

## Asset provenance

Built-in Imagegen; original generated photograph, not a customer image or testimonial. Final project asset: `public/concept/quote-follow-up/cabinetry-workshop-20261028.webp` (1536×1024, about 152 KB). Converted to WebP for delivery without retouching. Prompt: original candid editorial photo of a young East Asian Australian female cabinetmaker in a charcoal polo and stone work trousers checking an oak cabinet door, with a young white Australian male colleague in an ochre work shirt examining another sample in a bright authentic workshop. Natural daylight, realistic skin/wood texture, both heads retained for responsive crops, no posing, UI, logos, overlay, suits, navy uniforms or stock-photo handshake. Full generation brief is preserved in the originating task tool record.

GitHub owns all product-source changes; Lovable remains read-only. Preserve the existing noindex/sitemap exclusion and do not use a separate production Publish action.
