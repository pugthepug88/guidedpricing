# Quotes, Invoices & Signatures review

Implementation for owner review, 26 October 2026. Authoritative capability/claim boundaries and the pre-build motion/composition brief are in `QUOTES-INVOICES-SIGNATURES-EVIDENCE.md`.

## Pre-render verification

Production build, TypeScript, targeted component/route ESLint, SEO policy and whitespace checks passed after the first implementation. The generated TanStack route tree includes the leaf route; it is not manually authored. The route is noindex/nofollow, remains outside the production sitemap and is eligible for the Lovable page selector. Shared navigation receives only the completed feature destination; root/footer/Platform architecture and other pages are preserved.

The managed preview daemon initially could not find dependencies through an external worktree symlink; a local copy of the existing matching dependencies fixed that. The returned preview URL then reached Vite, but the development server rejected its terminal.local host. A standard additional-host environment setting on the CLI did not propagate to the daemon. No application/hosting configuration or network permissions were changed to compensate. Branch deployment is the rendered-review path; do not merge to main or claim visual approval until that check completes.

## Fresh image

Built-in Image Generation tool, generated specifically for this page. Original: `/workspace/scratch/25618df74191/generated_images/exec-00a90c21-f472-4f80-8617-0406623f1e2f.png`, 1536 × 1024. Project web asset: `public/concept/quotes/signage-workshop-20261026.webp`, 151,848 bytes. Original retained in scratch, optimized WebP tracked with the project. It is a fictional editorial work scene, not customers, a testimonial or evidence of adoption. The desktop crop starts high enough to keep both faces and hands together; phone uses a taller crop. Actual rendered crop review remains required.

Generation prompt:

> Use case: photorealistic-natural. Asset type: fresh panoramic editorial photograph for Zapla's Quotes, Invoices & Signatures feature page. Create a premium candid documentary-commercial photograph of two distinct small business professionals in a contemporary Australian architectural signage and joinery workshop in 2026. They are physically checking a large unlettered brushed metal reception sign panel and a material sample on a substantial workbench, doing skilled client project work together, not using phones or a laptop. One woman in her late 30s in warm ivory workwear, one man in his early 40s in muted charcoal workshop clothes. Natural normal diverse faces, believable anatomy and hands. Work and materials are the focal point, no posed handshake or looking into camera. Sophisticated tactile workshop, timber offcuts and matte metal surfaces, controlled warm stone, oak, ivory and charcoal palette with only a subtle sage accent. Directional soft daylight from the left, editorial film grain, foreground edge for depth, rich realistic material texture. Wide landscape 3:2 composition that can be cropped to a 2.4:1 panoramic image and to a central phone crop while keeping both people and their hands visible together. Put both people in the middle-right two thirds with breathing space on the left. No text, no words, no logo, no UI, no graphics, no border, no watermarks, no glossy stock-photo smile. This image represents professionals focused on their work while the commercial paperwork is managed in Zapla, not real customers or a testimonial.

## Rendered checks and director lenses

Cloudflare's successful branch build exposed `https://8003d239-guidedpricing.jinrcao.workers.dev/features/quotes-invoices-signatures`. Vercel also built successfully, but its preview required a login, so that protected preview was not used or its protection changed. The actual Cloudflare branch preview was used for visual review.

Wide desktop: inspected opening, readable document arithmetic/scope, quote register, complete signing scene and replay, all invoice arrangements, fresh photo/customer document context, setup, FAQ and final CTA/sky. The full/deposit/instalment views keep A$3,300 total; deposit requests A$990 with A$2,310 remaining; instalments show A$1,650 on both 10 and 24 November and the correct remainder. Native radio ArrowUp moves from instalments to deposit and updates the amount. Signature playback was observed entering stage 0 and holding stage 3 after submission. Native FAQ click opens and Enter closes. Console error list was empty.

Phone: initial full-page 393px pass and text geometry showed 378px content width, no document/text overflow and loaded images. Some immediate viewport screenshots after scroll/resize were partially blank despite complete DOM geometry; the later capture and full-page image showed the content. This is recorded as a capture limitation, not accepted as visual proof of an empty panel.

Corrections from that review: fix Priya's mismatched portrait using cell 19 of the existing sheet consistently; remove the three repeated signing benefit lines; show a concise live payment amount beside the mobile arrangement choices instead of requiring the visitor to find the changed figure below. The payment announcement is concise and not the entire invoice. The corrected page was then inspected at the successful `a255d840` build's version URL, `https://66e00c10-guidedpricing.jinrcao.workers.dev/features/quotes-invoices-signatures`.

Role reviews are the implementation agent applying separate review lenses, not claims of independent agents, owner acceptance or conversion results.

## Final rendered coverage

- Wide desktop at the normal browser viewport (1692 × 762 capture) and standard 1440 × 900: opening, quote, register, signing proof, payment arrangements, photography/context, setup, FAQ, final CTA and existing sky/footer. The standard desktop opening is saved in `docs/review-assets/quotes-invoices-signatures/desktop-20261026.jpg`.
- Tablet 834 × 1000: opening, complete side-by-side signature document/record, payment controls and instalment result, photo, customer context, launch and FAQ. This is key-chapter coverage, not an exhaustive tablet/device matrix.
- Phone 393 × 852 (378px layout width with scrollbar): complete walkthrough, invoice terms, signing fields/result, the corrected portrait, all payment-plan meaning and the adjacent deposit result, full invoice, provider row, unobstructed photo, linked records, setup, expanded FAQ, final CTA and shared footer.
- Narrow phone 320 × 800 (305px layout width): opening and signature fields/result inspected visually; page/text geometry checked. No visible-content overflow appeared at the tested widths. The intentionally clipped screen-reader-only payment status at desktop/tablet is excluded from visible-clipping checks.
- Native FAQ opens by click and closes with Enter; the multiple-signer answer opens correctly on phone. Native radio keyboard navigation updates the invoice. The mobile menu expands Features, exposes the new destination, navigates to it and closes. Its Platform structure is unchanged.
- All three page sales links target `/booking`; following the final CTA rendered the existing booking page. The scheduling embed remains deferred. No booking, signature, message or payment service was invoked.
- Signature playback visibly resets the local illustration to review and holds its submitted/completed state. Source includes all review/field/submission beats, no loop and no layout positioning dependency. Its observation and tab-visibility guards pause the clock; browser-level pause/preference emulation was not exercised.
- Browser error logs were empty in the checked desktop session. Build, TypeScript, targeted lint, formatting, SEO and whitespace checks passed after the visual corrections.

## Director and buyer review

| Lens | Finding and resulting decision |
| --- | --- |
| Motion Director | One explicit 4.2-second review-to-submission demonstration holds the result. No decorative movement, timed reset or scroll device. The complete state is useful before playback; preference guards retain it. |
| Brand / Creative Director | Zapla type, exact logo, portraits and final CTA retain family resemblance. Stone quote paper, one charcoal signature chapter, open invoice proof and fresh workshop imagery create varied rhythm. Portrait mismatch corrected; repeated benefit lines removed. |
| Product Marketing Director | Scope, agreed document and payable invoice answer distinct buyer questions. Meaningful arithmetic and one job supply substance. Separate invoice preparation prevents an unsupported automatic-conversion story. |
| Conversion Director | Visitors can inspect the signing and payment experience before a process-specific call. Existing tools are acknowledged; separately priced setup and payment-provider charges are clear. No invented customer outcomes or conversion evidence. |
| UI/UX Director | Native controls, visible names, meaningful field assignments, normally flowing responsive layouts and concise payment announcements. Phone feedback now stays beside the choices. No dummy financial or signature action controls. |
| SME owner / frontline | The quote shows what is included; the signed scope is retrievable; the invoice shows the amount requested and remainder. Quote and document statuses are distinct. |
| Copy / buyer psychology | Plain outcome-led opening, useful document details and a practical adoption invitation. No public prototype captions, invented addresses, generic inflated benefits or forced awareness-stage headings. |
| Technical / AI-slop review | Page-scoped styles/route, generated routing, static useful defaults and fixed local interactions. No live service calls, new dependency, copied application chrome, floating cards, arbitrary metrics, gradients or pastel feature tiles. |

## Concurrency, limits and delivery

The latest Pipeline phone/colour, Websites rebuild and new Ticketing work on main were preserved. The generated route tree was regenerated from all present route files when both new feature routes met; it was not resolved by discarding a page. GitHub write operations used the connected API because unauthenticated shell Git could fetch but could not push. Local and uploaded refinement trees were compared and matched (`e9891069`) before final documentation.

Reduced motion and unavailable-JavaScript defaults were reviewed in source, not emulated in the browser. A separate raw HTTP read of the Cloudflare-rendered HTML returned 403 in the shell, so no successful HTTP/JavaScript-disabled render test is claimed. No cross-browser/physical-device, screen-reader, real product-account, live payment, legal-signature validation or measured conversion test is claimed. Documentation supports the bounded marketed capabilities; it is not proof of end-to-end execution.

The implementation is ready for owner review in the synced draft. Confirm GitHub merge and Lovable source/route readiness at handoff. No Lovable builder prompt or separate production Publish action.
