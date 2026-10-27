# AI Chatbot casting update — 27 October 2026

The owner approved the current composition and requested a mix of white and Asian adults aged 25–35. This revision changes the three editorial photographs and page-local selections from the approved portrait sheet. During review the owner also requested removal of “Works on your existing website.” and similar unnecessary remarks. Three redundant captions are removed; the layout, remaining wording, product scenes, capability claims, motion, shared shell and other pages stay unchanged. The reference is the approved page at merge `166d9166a8db7f12b78f4f04eae4e7b2b1658e4a`; implementation starts from main `3193e64490d92a47f9d19371305246bde3c74a18`, preserving the subsequent Business Phone work.

## Assets and edit briefs

Mode: built-in ImageGen image editing, using each existing photograph as its edit target. Existing source images were inspected before editing. Preserve composition, wardrobe, poses, environment, lighting and clear space. No typography, product UI, watermark or extra people are generated. PNG outputs are converted to WebP at quality 86, method 6; no external crop or compositing. Original assets are retained.

### Real estate hero

Edit target: `public/concept/features/chatbot-property-viewing-v2-20261027.webp`.

Prompt requirements: Change only the fictional people and ages. The agent is a white woman about 30 with chestnut hair in a neat low bun, wearing the same taupe suit and ivory blouse, holding the same tablet and making the same gesture. The male buyer is East Asian, about 29, clean shaven, with black hair and round glasses, wearing the same pale blue shirt. The female buyer is East Asian, about 28, with the same short wavy black bob, burgundy blouse and light trousers. Keep all positions, relative scale, room, furniture, light and framing. Preserve the clear dark wall on the left for native page copy. No text or UI.

Generated PNG: `generated_images/exec-ebfecebf-7469-4bc7-b149-473d86e4b97f.png`.

Saved asset: `public/concept/features/chatbot-property-viewing-cast-20261027.webp` — 1869 × 842. Intrinsic image dimensions are updated to match the output; CSS and the displayed aspect ratio remain unchanged.

### Dental appointment

Edit target: `public/concept/features/chatbot-dental-appointment-v2-20261027.webp`.

Prompt requirements: Change only the fictional people and ages. The dentist is an East Asian woman about 31 with the same black bob, gold-rim glasses, white coat and charcoal shirt. The patient is a white woman about 27 with short softly curly light brown hair, the same ochre blouse, earrings and pose. Preserve the chair, equipment, room, light, framing and complete heads. No text or UI.

Generated PNG: `generated_images/exec-48867995-23d8-4b4c-9d79-e0cf006aeb12.png`.

Saved asset: `public/concept/features/chatbot-dental-appointment-cast-20261027.webp` — 1448 × 1086. Retain the approved `object-position: 50% 0%` crop.

### Plumbing enquiries

Edit target: `public/concept/features/chatbot-plumber-enquiries-20261027.webp`.

Prompt requirements: Change only the fictional plumber and age. Use a white man about 29, clean shaven, with short dark-brown wavy hair and a youthful oval face. Preserve the rust rolled-sleeve shirt, charcoal trousers, kneeling pose, hands, tool, hot-water unit, pipework, courtyard, lighting and framing. Avoid returning to the recurring silver-haired male archetype. No text or UI.

Generated PNG: `generated_images/exec-6ce46531-7dba-44fb-a5fa-b86b5d9dee38.png`.

Saved asset: `public/concept/features/chatbot-plumber-enquiries-cast-20261027.webp` — 1448 × 1086.

## Small portraits

Keep `/concept/revenue/soft-autumn-portraits-v1.webp`, the existing size and crop system. Noah uses cell 1 consistently in the list and selected thread; Harper uses 7; Alex uses 16; Leah uses 19. These page-local choices give distinct younger white and Asian adults without altering the shared portrait asset or casting elsewhere. Generated photographs and existing portraits remain fictional editorial illustrations, not customer testimonials. Ages are creative casting targets rather than verified ages of real people.

## Verification

Caption cleanup removes the hero’s “Works on your existing website.”, the capture scene’s “Choose your pipeline and follow-up during setup.” and the repeated knowledge instruction “Choose what it can answer and when your team should step in.” Those subjects remain covered in the relevant explanation/FAQ. Contact-supplied details, calendar consent, notification configuration and separately priced Guided Launch still explain meaningful product behaviour or a purchase condition.

Source review: changes are limited to photo paths, intrinsic hero dimensions, portrait cell indices and those three deletions. The stylesheet and remaining product structure are unchanged. Fresh image inspection confirms distinct subjects and retained scene roles. Production build, TypeScript, targeted ESLint, Prettier, all 17 SEO policy checks and `git diff --check` passed for the casting revision. Production build, targeted ESLint, Prettier and diff/style invariants passed again after caption cleanup. The three WebP assets are 113,930 / 110,842 / 165,148 bytes (hero / dental / plumbing).

### Hosted review

Both GitHub checks passed at source `92050ccacdd806e8957ec1584a4f6a7dc91119b7`, tree `e9fd8648069f4448c96185b5ad5c3bbd36e617ac`. The resulting page was opened at `https://8b715796-guidedpricing.jinrcao.workers.dev/features/ai-chatbot`. All three new images loaded with their intended intrinsic dimensions. Desktop review at 1348 × 926 inspected hero, grouped plumbing capture, the complete dentist/patient heads and booking result, and all five portrait occurrences in Inbox. Noah's repeated portrait remains consistent. Rendered DOM confirms all three removed captions are absent. Saved hero proof: `docs/qa/ai-chatbot-cast-20261027.jpg`.

UI/creative review: the same hierarchy and scene framing remain, with distinct younger casting and no new panels or overlap. Product/conversion/SME review: the existing enquiry, consent, sourced answer and human handoff remain intact; redundant captions are removed without creating new capability claims. Motion review: no motion is introduced. The broader responsive and interaction coverage remains documented in `AI-CHATBOT-PRODUCT-STORY-20261027.md`; this small update was checked freshly on desktop, not on physical devices or as new live-service acceptance. Lovable's owner preview was previously blocked by a sign-in screen in this browser; the Workers preview is the verified rendered output.

GitHub owns source updates. Lovable remains read only; no builder prompt or separate Publish action.
