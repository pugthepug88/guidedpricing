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
- Targeted source formatting and lint are part of the final check.
- Only this completed feature destination is added to the shared Features menu; Platform structure, header/footer implementation and other page content remain unchanged.
- Desktop rendering of the hero and enquiry proof was observed. The demo's expanded state was confirmed. Full responsive, repeated interaction and final sky-transition verification require a stable preview, as described below.

## Preview limitation during initial review

The managed local preview repeatedly disconnected and later served a root 404 for this new route after initially rendering it. Browser logs explicitly showed Vite connection loss/reconnect events. Source registration was intact and the production build passed. A stale or different preview snapshot is a plausible explanation, not a verified diagnosis. The routing code and dependencies were left alone.

The Lovable preview redirected the review browser to sign-in. A connector's ready status or matching commit is not equivalent to rendered approval. Do not describe desktop/tablet/mobile review, the Lovable page selector, or live NextGen end-to-end behaviour as fully verified until they are actually checked. No production publish is authorised or performed by this work.
