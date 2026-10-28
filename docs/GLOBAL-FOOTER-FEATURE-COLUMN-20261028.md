# Global footer — Features column correction

28 October 2026. Owner correction: Features should be another navigation column alongside Platform, Solutions, Industries and Company. The full-width Features row from the preceding navigation audit is superseded.

## Scope and decisions

Move Features immediately after Platform in `FOOTER_GROUPS`, using the existing `FEATURE_LINKS` catalog. All eight completed names and destinations remain shared with the header. Remove the separate Features strip and its additional divider. Keep the actual wordmark, review links, background poster/video, video behaviour, copyright and all other destinations.

At 1280px and above, use the brand and five navigation columns together. Give Features more width for its longer names and the brand 220px so the review badge stays on one line. Below that point, the brand occupies its own compact row, with the review links beside the logo/tagline from 640px; navigation groups use five columns at 1024px, three at 640px, then two. Use native links, visible focus rings, ordinary wrapping and no fixed group heights. This is a global footer change, not a Business Phone page redesign. Platform retains Overview, CRM, Customer Marketing, AI Receptionist and its existing Compare Zapla link. Ticketing stays withdrawn.

Reference decision: **USE** the owner's screenshot to identify the disconnected Features band and retained brand treatment; **ADAPT** the existing footer grid so Features becomes a peer group; **REJECT** adding a second section or shrinking all link text to force six columns on narrow screens. The current footer, SiteNav, shared feature catalog, root ownership and two existing feature components were read alongside the build protocol, guardrails, latest brief and supplied DO-NOT-BE-A-YES-MAN instruction.

## Review and verification

Independent Brand/Creative, UI/UX, SME/conversion and Motion source review found no source blocker. It checked link/category preservation, consistent heading/link treatment, the wider Features column, responsive row transitions and unchanged video/reduced-motion behaviour. It specifically requested rendered checks near 1280px, at 1024px and at 320px. That is source judgement, not rendered acceptance or owner approval.

TypeScript, scoped ESLint, production build, formatting, whitespace and all 17 SEO policy checks pass. The final spacing revision was rebuilt and passed TypeScript, scoped ESLint, formatting and whitespace checks again. No dependency or lockfile change is part of this correction. Browser extension access is unavailable, but the public GitHub Workers build is reachable in the cloud browser. A temporary noindex iframe harness was used for actual 1440/1280/1024/834/390/320 CSS-viewport checks and is removed from the final tree. It was never linked in navigation or added to the route tree.

## Actual rendered findings

The implementer inspected the hosted footer on Business Phone using the final component at `91dc2de64453b97a3b64795469614bcdd8e6de2d`, Workers version `6cb1b1c2-cc4d-4ff6-a4c0-f1205eff1a02`. The independent review above was a source review; these rendered observations are the implementer's own Brand/Creative, UI/UX, SME/conversion and motion-preservation assessment.

- 1440px and 1280px: brand plus five peer navigation groups, with Features after Platform. All feature labels remain readable. The first 1280px render exposed a wrapped Trustpilot badge; widening the brand column fixed it in the final render.
- 1024px: five aligned navigation groups below a compact brand/review row. The first brand row used excessive vertical space; the final row places reviews beside the logo/tagline and was re-inspected. The absolute footer container retains room for its complete content.
- 834px: three navigation columns followed by two in normal flow. The brand/review row, long feature names, remaining groups and copyright were inspected.
- 390px and 320px: two-column wrapping and lower navigation remain readable. The complete eight-link Features column was inspected at 320px. All six checked CSS widths reported no document horizontal overflow and no measured link-width clipping; native text is free to grow vertically.
- Keyboard: Tab moves from Business Phone to AI Chatbot in the footer. Enter on AI Chatbot navigated to `/features/ai-chatbot`, whose actual H1 was “Answer the question. Capture the enquiry.” The shared footer was confirmed there with the same five groups and eight exact feature destinations. Focus styling was visible during narrow-view testing.
- The existing background artwork/video and footer surface remain. No motion logic was changed. A failed full-page capture was a screenshot-tool limitation; viewport captures and ordinary scrolling were used instead. No physical-device matrix, separate browser engine, screen-reader session or new OS reduced-motion test is claimed.

The final evidence/cleanup commit removes the temporary QA page and changes no footer source after this rendered check. No numerical score, owner approval or live-product acceptance is asserted.

Current main is fetched before committing; only the shared footer, this evidence, the owner-correction brief and temporary QA file are included. GitHub owns changes. Lovable is read-only; no Publish action or history rewrite is used.
