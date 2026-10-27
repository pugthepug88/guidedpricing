# Ticketing visual reset, 27 October 2026

## Decision and scope

The owner found the page too detailed, visually off and boring. The previous composition and numerical assessments in `TICKETING-EVIDENCE-AND-REVIEW-20261026.md` are superseded. Passing code checks and the agent's earlier high scores did not establish visual quality or owner acceptance.

The problem was repeated presentation of the same request across several large application panels. The board/table/filter controls and field mechanics occupied more attention than the people, issue and completed work. The service-team photograph appeared too late. This revision changes that hierarchy while retaining the documented product scope.

Route `/features/ticketing`, H1 **Keep customer issues moving.**, final CTA wording, shared navigation/footer, Platform structure and `/booking` destinations remain. Noindex/nofollow, public-search/sitemap exclusion and the existing preview-selector convention remain. GitHub is authoritative; Lovable is read only. No builder prompt or separate Publish action is used.

## Composition and reference choices

| Choice                                                                         | Decision and reason                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Original page-specific workshop photograph                                     | USE in the opening at its full 3:2 proportion. It gives the issue a concrete human setting. The attached request caption sits below the photograph, keeping both faces and the work clear. Image provenance and original generation prompt remain in the original evidence document. |
| Current Zapla typography, portraits and restrained material palette            | USE. Keep the page recognisably within the established feature family.                                                                                                                                                                                                               |
| Newer Chatbot compositions                                                     | ADAPT the relationship between photography and compact product proof; do not copy its healthcare story or widget layout. Current feature corrections reinforce the need to reduce repetitive copy and minor setup controls.                                                          |
| Complete six-ticket board, table, priority filter and repeated detailed record | REJECT for this page's main story. The capabilities are still covered in practical FAQs. They no longer determine the page's visual weight.                                                                                                                                          |
| A single card moving across otherwise empty lanes                              | REJECT after rendering. Its completed state left a large empty canvas and removed the customer's original question from view.                                                                                                                                                        |

The opening pairs the promise and sales action with the team working on the espresso machine. One contained support scene then preserves three concise parts of the same request: Olivia's question, Alex taking responsibility and the completed repair. It contains names, useful context and an outcome rather than a toolbar of controls. An open two-column section links the issue to Olivia and the original installation in one small record. Guided Launch and practical FAQs form the closing chapter before the retained final CTA/sky.

## Motion and capability boundary

All three story panels are present and readable from server rendering. On a desktop at least 901px wide and 700px high, with no reduced-motion preference, the scene runs once when at least 85% visible. It first emphasises the recorded request, then the assigned person after 1.4 seconds, then the resolution after 3.1 seconds. Future panels use restrained opacity rather than moving or hiding the story. The completed view holds. Replay deliberately restarts the same short emphasis sequence; it does not create or modify a ticket.

The animation clock excludes time when the scene is outside its visibility threshold or the document is hidden. It neither scrolls automatically nor moves focus. Small/short screens, reduced motion and no JavaScript retain the complete static story without Replay. No ticket, assignment, repair, message or status update is executed against a service. Alex, not the software, performs the repair and marks the ticket resolved.

The original supplied screenshots and official Board/Fields/Tags help remain the capability evidence. No new product capability is introduced. Separate boards, customer/pipeline links, priorities, multiple assignees, fields/tags and stage/status differences remain bounded as previously documented. There is no email-to-ticket conversion, SLA, automatic routing/notification, AI repair, speed guarantee or performance metric.

## Rendered review and corrections

Reviewed the actual local render through the supported managed preview, at approximately 1363 × 936 desktop, plus 393 × 820, 834 × 820 and 320 × 820 iframe viewports. Scrollbar-adjusted content widths were 378, 819 and 305px for the three smaller views. A temporary review fixture and temporary exact-host Vite allowance were removed before commit.

- Desktop: inspected the photograph-led opening, all three request panels, the linked customer/job record, launch plan, FAQs and closing composition. Both photographed faces and the machine remain visible. The native section link, explicit Replay and final held state were exercised. Replay visibly returned to Open; after leaving the scene, Open remained current through a separate source-review interval, then resumed on returning. No repeating cycle was added.
- 393px phone: walked the opening, all three stacked panels, linked customer/job, setup, FAQs and final CTA/sky. The main document had no horizontal overflow. The section anchor worked. A FAQ opened on click and closed with Enter. The final Book a Call navigated to `/booking`.
- 834px tablet: inspected the stacked opening and three-panel support composition. Initial unequal card bottoms were corrected by making each stage a column with a flexible card; the corrected render was rechecked. No document overflow appeared.
- 320px phone: inspected the opening and request panels at 305px content width. Heading, image caption and names wrap without horizontal document overflow. This is targeted narrow-screen coverage, not a claim to an exhaustive lower-page walkthrough at 320px.
- No JavaScript: a sandboxed iframe with scripts disabled retained the whole page, all three final panels, one H1, no pending panels and no Replay. The native custom-fields FAQ opened. Robots remained `noindex, nofollow`; all three sales links targeted `/booking`.

The reduced-motion/short-height matchMedia branch and document-visibility listener were reviewed in source. No browser media emulation, hidden-tab recording, physical-device run or screen-reader pass is claimed. Motion is intentionally modest; it adds emphasis rather than a second application walkthrough.

## Review lenses

These are the implementation agent's distinct assessments, not independent reviewers, customer research or owner approval. They replace the earlier numeric scores.

| Lens               | Finding                                                                                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Brand and creative | The photograph now supplies the strongest visual subject. Warm paper, a contained ink scene, portraits and the closing sky provide variation without adding decorative tiles.                                      |
| Product marketing  | One issue retains its customer, responsible person and outcome. Operational breadth remains available in the FAQs without overwhelming the main promise.                                                           |
| Conversion         | The opening and closing invitation remain direct. Required, separately priced Guided Launch is disclosed. No measured conversion improvement is claimed.                                                           |
| UX                 | Much less application chrome, a useful complete final state, native links/disclosures, visible keyboard focus and normal-flow phone layouts. Tablet card alignment was fixed after rendering.                      |
| Motion             | Once-only sequential emphasis, no automatic camera/scroll, offscreen pause and an explicit replay. The full story remains useful when motion is absent.                                                            |
| SME buyer          | The customer problem, owner and completed work can be understood without learning ticket fields or board controls. The linked installation explains why CRM context matters.                                       |
| AI-slop critic     | No invented metrics, fake send controls, placeholder addresses, decorative icon grid, tilted cards or public prototype captions. The photograph is a prepared editorial asset, not a claimed customer testimonial. |

## Verification and limits

Production build, TypeScript, targeted Ticketing ESLint, formatting, SEO policy and whitespace checks passed on source incorporating current main at `7dafba5e857c2141b53754024b2ed21d4d1e96fe`. Existing bundler/module-directive and environment warnings remain non-blocking. No dependencies changed. Only the Ticketing component/style and its review records are part of this revision.

Hosted source sync and screenshot proof are recorded after merge. The revision is ready for owner review; that does not mean the owner has accepted the new visual direction. No live product-service acceptance test, exhaustive cross-browser matrix or Lovable historical-build-warning fix is implied.
