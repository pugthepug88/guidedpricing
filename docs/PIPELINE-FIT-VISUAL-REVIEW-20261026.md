# Pipeline supporting tools: coloured UI scenes

26 October 2026. Scope: the existing three-card customisation section on `/features/pipeline-management`.

## Owner correction and reference judgement

The owner rejected the white, text-heavy cards and requested a filled coloured background on each card, with UI that demonstrates its point. This supersedes the white-card treatment in `405876b`, not the main Pipeline composition or capabilities.

**ADAPT** the supplied ActiveCampaign examples' visual hierarchy: a substantial product scene against a coloured surface, with brief supporting copy. **USE** Zapla's own coral `#E97D62`, gold `#DDA34B`, lavender `#9B86B8`, native typography and existing Mia/Ben portrait identities. **REJECT** the reference's neon yellow, dark-neon page theme, floating pointer, decorative UI fragments and product claims. A simple recolour of the old tiny snippets would not satisfy the request.

## Result and factual limits

- Custom fields: an opportunity shows Job address and System type as readable labelled values. The address continues the earlier prepared example; Heat pump is a prepared field value, not inferred customer information or a live record. The short copy retains per-pipeline-type fields and optional board display.
- Quick actions: a compact configuration shows a button name, icon, selected colour and the resulting custom button appearance. Follow up customer is a custom label. It does not establish a particular underlying action, automatic send, workflow or execution result. The apparent controls are semantic static content, without click handlers, form submission or additional keyboard stops.
- Tags: Urgent and Install appear on an opportunity with Mia's name and Ben's responsibility. They demonstrate human-defined priority/type labels, not automatic classification. Tags stay separate from the pipeline's stage.

The first implementation's verbose headlines were replaced with direct capability titles and shorter outcome copy. UI now leads each card instead of occupying a tiny footer. The surrounding heading, location under the board, route scene, navigation, sales links, indexing and final CTA remain unchanged. No new motion, external assets, runtime dependency or live product call is introduced.

Capability scope follows the owner's supplied tags/action/custom-field screenshots and confirmations in the conversation, the existing section, and the official Pipeline Fields findings recorded in `PIPELINE-ROUTES-CAPABILITIES-20261026.md`. This is a presentation change; no additional live product acceptance test was performed.

## Rendered review

Reviewed the existing section on the actual Lovable preview, then the changed source in the managed local browser. Also compared the rendered Unified Inbox and Automation Builder openings for typography, surface depth, palette and product scale.

- Desktop: three filled panels in one row; smooth white UI leads; short copy sits below. A distinct neutral gap separates this supporting row from the contained dark route chapter.
- Tablet: 834px iframe, 819px content. All three scenes stay readable in one row. Initial independent row sizing misaligned the Tags heading; shared grid rows corrected it. Measured heading positions then matched at 546.45px across all three cards.
- Phone: 390px iframe, 375px content. Inspected the custom-field card and both lower cards. Scenes and copy stack in normal reading order, without interaction.
- Narrow phone: 320px iframe, 305px content. Section and nested card/record geometry checked; document width equals content width. No visible content is horizontally clipped; the only overflow reported belongs to the intentional screen-reader-only icon description.

The new section is rendered as complete static markup and CSS. It uses no effect, state or animation dependency. The whole page's previous reduced-motion/no-JavaScript verification is not reasserted as a new browser test in this scoped change.

## Director and buyer passes

These are distinct role-based assessments by the implementation owner, not claims of independent-agent sign-off or measured conversion results.

- **UI/UX:** one capability per scene; readable values; no interaction needed to understand the point; aligned headings on tablet. White panels retain contrast within saturated fills.
- **Brand/Creative:** exact petal-palette colours, established type/portraits, aligned panels and deliberate filled/white/dark rhythm. No copied AC theme or generic icon tiles.
- **Product Marketing/Conversion:** concrete adaptability proof supports the main stages/ownership story. Shorter copy avoids promoting settings above Pipeline and routes. The quick-action result remains appearance, not an unverified executable behaviour.
- **Motion:** static is appropriate; all three benefits are immediately visible and add no viewing clicks or timing dependency.
- **Owner/frontline and buyer psychology:** the buyer can see which job details are kept, how a shortcut is personalised and how work is labelled. Prepared data is not presented as a customer endorsement or performance result.
- **AI-slop check:** no arbitrary metrics, status badges, numbered steps, giant outline feature icons, decorative connections or floating/tilted objects.

Normal text on the three fills exceeds 4.5:1 after darkening the lavender card's paragraph text. The first review measured that paragraph at 4.45:1 and corrected it before delivery.

## Checks and delivery boundary

Production build, TypeScript, targeted component ESLint, Prettier, SEO policy and whitespace checks are required for the final source. The temporary responsive review page and preview-only host setting are removed before commit. Fetch main immediately before committing; preserve concurrent work and do not rewrite published history. Source sync is through GitHub, with Lovable read-only. No production Publish action is authorised or performed.
