# Follow-through family — separate V2 review pages

29 October 2026, Australia/Sydney.

## Scope and preservation

Owner authorised a coherent Follow-Up / Quote Follow-Up family after visual inspection of Wispr Flow, then explicitly required a new Follow-Up V2 instead of overwriting the original. Both rebuilds are separate review routes: `/follow-up-v2` and `/quote-follow-up-v2`. Original route/page styles, shared header/footer, navigation and production search-page list are unchanged. V2 routes are noindex/nofollow and excluded from the sitemap; they are not added to global menus.

`QuoteFollowJourney` retains its default behavior for the original page. Quote V2 opts into `pageTrack`, which suppresses the old internal guide so one shared `FollowThroughTrack` owns the entire V2 page. No duplicate scroll listener or second trail mounts there.

## Product and visual decisions

The broader page owns “You lead. Zapla follows through.” Quote Follow-Up is one focused proof point, linked as a child with a return breadcrumb. The alternative of merging both pages was rejected: distinct breadth and depth jobs justify retaining both, provided the hierarchy and material are shared.

Adapt Wispr's recurring product-relevant visual thread, not its colours, typography or layout. Use Zapla warm paper, ink type and controls, exact blue mark, pearl product records, one local ink scene and warm human photography. The native logo domino course now carries both V2 pages from the hero, with two relaxed side changes concealed behind product surfaces. It exits the left edge near the final CTA. A detached returning SVG fragment was rejected after actual contact-state review. Desktop V2 alone shifts the existing footer camera to the right crop, favoring its foreground course on the left; original pages and mobile keep the centered camera. This is an offscreen editorial handoff, not a literal physical collision or synchronised video seam. No footer film or tile scaling was added.

The old quote hero's two large records on a blue plate are replaced by one customer conversation, containing compact quote context, the actual prepared check-in, Emma's scope question and the team's deliberate next step. A restrained physical starter sits beside the hero copy: seven pieces taper from 3.2× to the regular size. It begins upright and tips only with native scrolling; there is no autoplay hero loop or row between product records. Starter shadows are shorter and softer so they do not form pale rectangular backplates. Final CTAs reuse the existing `ZaplaPetal size={34}` in the canonical 52px ink circle.

## Story and capability gate

- Broad page: enquiry → automatic configured SMS with booking link → Emma explicitly makes her booking → confirmation/reminder → quote check-in → optional later reconnect. The repeat campaign is a separate business choice, not an inevitable next step or won job.
- Quote page: Quote Sent → chosen wait/SMS or email → customer question → Alex reviews scope and replies. No automatic acceptance, revised quote or task creation is implied.
- Photography supplies the human role; configured messages supply the system role. Scope, price and sensitive decisions remain with people.
- Native event/wait/channel building blocks are configuration evidence, not proof of delivery, conversion or measured customer results. No fabricated metrics/testimonials were added. Capability references are `AUTOMATION-BUILDER-EVIDENCE.md`, `CALENDARS-BOOKING-AUTOMATIONS-20261027.md` and the earlier quote audit.
- Messaging/usage and separately priced required Guided Launch are visible. Supported-tool compatibility and reply/exit handling are agreed before setup.

## Motion implementation

`FollowThroughTrack` measures real content edges and two marked opaque scenes. It projects fixed hinges along local tangents with the same regular geometry on both V2 pages: width vector based on20px, upright vector(4,−13), fall28px and pitch24px. Only the seven opening pieces are larger. Reserved desktop hero gutters prevent the enlarged starter touching the text at1100/1152px. Regular tile size is unchanged.

The side courses drift gently. Diagonal crossings use180–500px of vertical travel behind product surfaces, instead of crossing the open page width in a short whitespace gap. An SVG mask shields all readable content wrappers and explicit product occluders. The final course completes beyond the left crop.

Native passive scrolling advances the contact through RAF, updating visible SVG attributes rather than rendering React per scroll. Standing/settled projections are cached. Future/settled material stays quiet; saturation follows the contact. At scroll0 the first piece is upright, and reversing to a measured position restores the same progress.

No wheel capture, scroll snapping, loop or content gating. Under1100px and reduced motion omit the long course. No-JavaScript retains all product content in normal flow. The original Quote page keeps its existing guide and centered footer camera.

## Validation and review

The original family review and evidence remain in `docs/qa/follow-through-family-v2-20261029/`. The continuity revision adds `docs/qa/domino-continuity-v2-20261029/checks.json`.

- Both routes tested at1440,1152,1100,834,393 and320px frame widths (content1425,1137,1085,819,378,305): zero document overflow or flagged text clipping; loaded fonts and images; noindex/nofollow retained. Extra2048px parent layout check also passed. The narrow desktop starter physical face stays inside the viewport with clear copy gutters.
- All tiles after index6 expose the same regular size1 on both routes; first hero shapes also match. Initial progress0; native forward progression0→0.0044→0.0102→0.2646→0.5270→0.9414. Reverse returned exactly0.5270→0.0102→0.0000.
- Actual scripts-disabled iframe checks retain7/8 h2 headings and the full content, with no domino SVG mounted. Source media gating covers reduced motion; an OS-level reduced-motion run was not performed.
- Quote Email/five-day choices update both preview and matching Inbox on393px, with no clipping or overflow. The original Quote page still mounts its old guide and keeps footer camera50%62%; V2 desktop alone uses100%62%.
- Independent visual review approved the hidden crossing and canonical lotus, identified starter shadow backplates (fixed), and rejected the paper return stub (removed). This is qualitative design review, not measured conversion or owner acceptance.
- Scoped ESLint, TypeScript noEmit, formatting, production build, SEO policy and whitespace checks passed. Physical Safari/device use, screen reader operation and field performance remain unmeasured.

All source goes through GitHub; Lovable is read only, with no separate Publish action.
