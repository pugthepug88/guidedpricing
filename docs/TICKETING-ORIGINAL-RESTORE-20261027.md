# Ticketing: restore the first iteration, 27 October 2026

The owner rejected the latest visual rebuild and asked: “what was the first iteration that u did? can u go back to that again”. This is an exact page restoration, not another redesign. It supersedes the intervening Ticketing composition instructions only.

## Exact restoration

The first implementation is `89ebcd5a4cee0b03cbb4bf74bc80c3dbb89a79ec` (Build customer support Ticketing feature page), merged through PR #196 at `f8cfe940ff28496afd855d01b94e5ee1cfcf3ba1`. The component, stylesheet and route are identical across those two original commits.

Restored byte-for-byte:

- `src/components/features/TicketingPage.tsx`, blob `aa1595e6f1ec7b4165f34bc8f86c114e96bf68d4`.
- `src/styles/ticketing.css`, blob `ea64c2090a811256442e8ce62b529ffc0d342ee5`.

This brings back the light stone/glass request hero, original copy and staff sequence, four-stage six-ticket board, priority filter, table view, linked Olivia/Harbour Coffee installation record, original service-team photograph, Unified Inbox bridge, Guided Launch, FAQs and final invitation. The original screenshot is `docs/proof/ticketing-desktop-20261026.png`.

The route, page foundations, logo, portrait sheet and original photograph already match the first implementation. Shared navigation/footer and other feature pages retain their current versions. No published history is rewritten. GitHub remains authoritative; Lovable is read only, with no builder prompt or separate Publish action. `/features/ticketing` retains its existing noindex/sitemap policy, and sales links remain `/booking`.

## Current verification

- TypeScript, targeted component ESLint, component/stylesheet formatting and SEO policy checks pass.
- Current local desktop render at 1363 pixels shows the original hero and completed Alex/In progress state; the document has no horizontal overflow.
- Working board verification: six tickets across four stages; High & urgent shows two tickets and two empty lanes; Table preserves the filter and displays the same two records.
- The 393-pixel phone frame (378-pixel content area after its scrollbar) shows the original stacked heading/request card with no document overflow. Its sales destinations remain `/booking`.
- This is targeted rollback verification, not a new aesthetic approval or a repeat of every historical browser/motion scenario. Earlier numeric scores remain historical. The latest owner request authorizes restoring this version, not assuming its final acceptance.

The production build passes with the original Vite configuration restored. Existing dependency directive/chunk warnings are non-blocking. The temporary responsive fixture and preview-only configuration were removed. Hosted sync evidence is appended after verification.
