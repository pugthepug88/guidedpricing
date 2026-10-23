# Websites, Funnels & Forms: build and review

Date: 2026-10-23 UTC. Route: `/features/websites-funnels-forms`.

## Direction

The commercial story is **business page → enquiry → customer record → a configured follow-up task**. A single, readable air-conditioning business page uses the existing editorial service-visit photograph. Mia's name, reserved example email, service and enquiry detail stay identical through the form and record. A separate continuation shows one configured task rather than a diagram of the whole platform.

The nine sections are the page-led hero, enquiry-to-record proof, plain-language roles for the three tools, creation/publishing, configured follow-up, specific page tracking, self-service versus paid design, FAQs and the shared-style closing CTA. Colour moves from warm white and peach illustration through a short cool-neutral explanation, white, deep green, white, stone and warm white into the unchanged root sky/footer. Headings remain ink outside the green section.

### Reference decisions

- **Use:** established type stack, palette, actual petal, portrait sheet, editorial photography, root navigation/footer and final CTA typography.
- **Adapt:** clear customer context and restrained material depth into one business page and one local interaction.
- **Reject:** Inbox layout reuse, browser-window collages, miniature sites, invented metrics, generic icon cards, decorative numbering and a whole-platform workflow demonstration.

## Product boundaries

See `WEBSITES-FUNNELS-FORMS-EVIDENCE.md` for official sources and exact help article keys. Custom answers require contact-field mapping. Follow-up is configured, not a default promise. A booking link does not confirm an appointment. Tracking describes one page and date range, visits, clicks, scroll depth and heatmaps. Custom website design is separately scoped and paid. Guided Launch wording follows current Pricing-v3.

No GHL parity, guaranteed SEO/conversion outcome, universal attribution, automatic compliance or unrestricted hosting/storage claim is made. The illustrative demo is not a pixel-accurate product UI. It has no editable inputs, form action, network request, persistence or visitor-data collection; its button changes local React state only.

## Independent reviews and changes

- Product Marketing / Conversion / SME / Buyer Psychology review accepted the core story and evidence boundaries. It identified optional-sounding Guided Launch wording, an inaccurate replay label and small tracking/CTA wording weaknesses. Those were corrected.
- Brand / Creative / UI/UX / Motion source review accepted the distinct concept and purposeful interaction. The photo's visible air-conditioning context replaced an initially mismatched kitchen-renovation example. The redundant success check was removed. Final CTA bottom padding was removed so the root footer owns the sky transition. A literal space remains around the break hidden on mobile.
- Independent routing review found the leaf route and all generated registration points correct, no component navigation/timer/network code, and no source evidence for changing the production router.

## Validation record

- Initial production build passed. It emitted existing dependency module-directive and bundle warnings; no build error.
- TypeScript `--noEmit` passed.
- SEO policy checks passed: draft route remains outside `SEARCH_PAGES`, with `noindex, nofollow` and no `staticData.sitemap: false` flag that would hide it from the Lovable selector.
- Targeted Prettier formatting and ESLint checks passed for the new component and route. `git diff --check` passed. A second production build with the original application configuration also passed.
- Build, TypeScript, targeted ESLint, SEO and whitespace checks were rerun successfully after fast-forwarding through concurrent AI Chatbot and Automation Builder commits to `9098a5f830dfd470912c208fc8c4d5364b03d1d5`. Their code, menu entry, route registration and later guidance were preserved.
- Only this completed feature destination is added to the shared Features menu; Platform structure, header/footer implementation and other page content remain unchanged.
- Desktop rendering of the hero and enquiry proof was observed. A later fresh preview supported the responsive checks below before the environment became unstable again.

### Rendered and interaction checks completed

The responsive views used a temporary local iframe review surface, not physical devices. The surface and local host allowance are excluded from the committed application.

| View / interaction | Observed result |
| --- | --- |
| Wide desktop | Hero, photographic business-page scene and enquiry proof rendered. The expanded demo state was confirmed. |
| 834px tablet frame | Hero, two-column enquiry and connected record were readable. The image crop retains the customer and installer context. |
| 600px narrow tablet frame | Both proof panels remained readable; enquiry content and mapped result fit without clipped text. |
| 390px phone frame | All nine sections were visually inspected through scrolling, including the paid design distinction, FAQ and closing CTA. The result appears directly below the enquiry. |
| 320px narrow phone frame | Hero, actions and mobile menu remained usable. The feature destination fit in the open Features menu. |
| DOM geometry at phone widths | No overflowing main-content elements; document scroll width matched client width (375px / 305px inside frames with scrollbars). This supplements the visual review rather than replacing it. |
| Local demo | Button reveals the same name, email, service and enquiry text. Enter activated reset and reveal with `aria-expanded` changing false/true. Focus remained visibly outlined. |
| FAQ | Opening the existing-website answer displayed its content without overlap. |
| Links / data safety | All three page sales CTAs point to `/booking`. No form, input or textarea exists in the demo. The page uses fixed example data and local React state only. |
| Reduced motion | Source review confirms the `prefers-reduced-motion` rule disables animation and transitions. OS-level preference emulation was not performed. |

The mobile menu's destination href was verified. A subsequent navigation coincided with another local 404/reconnect, so stable repeated navigation is not signed off. The full desktop lower-page composition, authenticated Lovable page selector and rendered sky transition remain verification limits.

## Preview limitation during initial review

The managed local preview repeatedly disconnected and later served a root 404 for this new route after initially rendering it. Browser logs explicitly showed Vite connection loss/reconnect events. Source registration was intact and the production build passed. A stale or different preview snapshot is a plausible explanation, not a verified diagnosis. The routing code and dependencies were left alone.

The Lovable connector confirmed commit `5d6226ad5715426d1ef7f060179182fa744bdf79` as its latest commit, reported the project ready, and returned the correct new route file at that commit. This verifies source sync, not a complete rendered approval.

The direct Lovable preview redirected the review browser to sign-in. Automatic approval review rejected initiating secure authentication because account sign-in was not explicitly authorised. No credentials were entered and no attempt was made to bypass the rejection. Finishing that authenticated review requires user approval for sign-in.

No live NextGen account end-to-end test was performed. No production publish is authorised or performed by this work.
