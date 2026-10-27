# AI Chatbot compact hero dialogue — 27 October 2026

The owner approved trying a small dialogue over the approved hero and then asked whether it would spoil the clean composition. Add only two compact messages: “Can I arrange an inspection?” followed by “Which property would you like to see?” The purpose is immediate recognition of an AI enquiry conversation within the real estate scene. Keep the existing photograph, headline, supporting copy, CTA, page rhythm and all lower product scenes.

## Treatment and scope

The two native HTML bubbles occupy 280 × 125.4 px at the reviewed desktop size. They sit 32 px from the lower-right image edges, well below the faces, with restrained white surfaces and the actual Zapla petal. There is no outer chat window, header, composer, playback, status, avatar, new photograph or service call. Visitor and AI speaker labels are available to assistive technology. The content is prepared explanatory dialogue, not a real enquiry or testimonial.

Below the existing 979 px breakpoint, the exchange uses ordinary flow after the main copy/CTA. It adds approximately 125 px plus its bottom margin to the hero at phone/tablet widths; the photo, faces and main copy are unobscured. Narrow-phone width shrinks to 233 px. This is a scoped exception to the earlier Chatbot ban on overlapping product surfaces: only this small approved cue may sit over the desktop photo. It does not reopen the rejected large widgets or repeated photo/chat panels.

## Rendered comparison and decision

Incumbent: merged page `b18011fe543c7a7d32acf3558b9628c6be2108c2`, with clean hero proof at `docs/qa/ai-chatbot-cast-20261027.jpg`. Trial source: `4d3a3ab8372d492249473003b2e7f6abe5f704b6`, tree `de01ed30dc51ad028d8176de3e9c041c10426794`. Both GitHub checks passed. Rendered trial: `https://cb2e7b07-guidedpricing.jinrcao.workers.dev/features/ai-chatbot`.

At 1348 × 926, the group was at x1012/y618.6, size 280 × 125.4; it did not intersect the main copy box. Visual inspection confirms all three faces stay clear. At a 1040 px iframe viewport (1025 px content), the group remained 280 px wide, separate from the main copy. At 393 px (378 px content) and 320 px (305 px content), both complete messages were inspected after a short native scroll. No dialogue text or horizontal page overflow was found. At 834 px (819 px content), the group followed the copy and photo in normal flow; page width remained 819 px. The temporary same-origin width harness is removed in the final change.

UI/creative judgement: keep the trial. It adds visible weight, but remains subordinate to the photograph and headline at the reviewed sizes. The original clean version remains the rollback reference. Product/conversion/SME judgement: the short exchange supplies a concrete qualification moment and makes the software category clearer without implying an unverified booking or availability result. Motion/AI-slop judgement: complete static content with no decorative animation, dashboard chrome or generated metrics. The small-screen cost is additional hero height, not occlusion. These are design judgements, not measured conversion results.

Production build, TypeScript, targeted ESLint, formatting and diff checks passed. Existing lower-page interaction/responsive verification remains in the product-story review; this change tests the new hero only. No physical-device, cross-browser, screen-reader or live AI acceptance is claimed. Saved current desktop proof: `docs/qa/ai-chatbot-hero-dialogue-20261027.jpg`.

GitHub owns the source. Lovable remains read only with no builder prompt or separate Publish action.
