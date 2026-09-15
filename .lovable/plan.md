# Pricing V3 Revision Audit and Implementation Plan

## Audit conclusion

The current V3 has the right strategic spine, especially the revenue headline, the dark upgrade-logic section, grouped comparison, Guided Launch separation, Ghost to Gold, usage transparency, and final CTA. Its main failure is the opening decision experience: three equal cards make CUSTOM look like a standard tier, and the long feature lists turn the plans into inventories rather than persuasive choices.

Rendered evidence supports this. At 1440px, the current V3 plan cards are approximately 859px tall and the opening section is approximately 1,506px tall. V2's four cards are approximately 588px tall. On mobile, V3 becomes a very long sequence before the upgrade logic appears. Both routes render cleanly without horizontal page overflow, so this is a hierarchy and density problem, not a runtime problem.

## Four-lens review

### 1. Product Marketing and Conversion Director

**USE**
- V3's hero promise, reassurance principles, explicit Guided Launch pricing, dark upgrade-logic section, Ghost to Gold wedge, transparent usage section, and final job-first CTA.
- V2's clear price prominence, visible Guided Launch block, recommended-plan emphasis, and repeated Book a Call path.

**ADAPT**
- Replace the three-card choice with two primary choices. FOLLOW-THROUGH and GROWTH should each lead with the exact locked promise, price, Guided Launch, roughly four outcome bullets, one concise shared-platform line, and one CTA.
- Preserve Growth emphasis, but label it as the proactive growth choice rather than an internal "architecture focus."
- Turn the current Enterprise card into a compact CUSTOM route below the pair. It should describe genuine complexity without presenting another tier.
- Strengthen the dark section from a list of triggers into two causal lanes: trigger or audience, Zapla action, business result.
- Move detailed capabilities out of the cards and into comparison.

**REJECT**
- V2's contact caps, seat or location escalation, four-tier ladder, and "bigger business equals bigger plan" logic.
- The current V3 Enterprise label and any unverified governance, security, compliance, SLA, or readiness claims.
- Feature-complete inventories inside the primary cards.

### 2. UI and UX Director

**USE**
- V2's centered opening hierarchy, strong monthly-price scale, separate Guided Launch inset, compact CTA treatment, sticky first comparison column, accessible accordion buttons, smooth 200ms disclosure, and restrained mobile sticky CTA pattern.
- V3's two-column logic section, grouped comparison categories, warm-paper canvas, and clean full-width section bands.

**ADAPT**
- Use two balanced primary cards at desktop and a single clean stack on mobile. Keep both cards similar in height without spacer blocks or forced tall minimums.
- Remove plan-card accordions because four outcome bullets fit naturally. This makes the choice scannable without an extra interaction.
- Make CUSTOM a slim full-width row beneath the cards with a short qualification list and text CTA, not a third visual peer.
- Keep comparison compact. On desktop, use a grouped table with the first column sticky. On mobile, present each category as an accordion with rows showing Follow-Through and Growth values without requiring a wide horizontal pan.
- Shorten and compress utility sections so the major dark bands remain the visual anchors.

**REJECT**
- Current V3's 859px desktop cards and long mobile inclusions.
- V2's four-column desktop squeeze and 760px or wider comparison as the only mobile solution.
- Repeated card-within-card framing when simple rows, dividers, or unframed columns communicate more clearly.

### 3. Brand and Creative Director

**USE**
- Inter Tight for display, Manrope for body, warm cream paper, charcoal and deep green anchors, and restrained amber, coral, sage, and plum accents.
- V3's dark-green Ghost to Gold treatment and near-black upgrade section as distinct strategic moments.
- Rounded geometry, but only for true decision objects and repeated items.

**ADAPT**
- Reduce the V3 headline slightly from its current oversized desktop treatment while preserving its authority and exact wording.
- Use color semantically: coral for Follow-Through urgency, amber for Growth opportunity, deep green for primary actions, and muted neutrals for shared platform details.
- Replace the current equal-card rhythm with more editorial contrast: two plan cards, one subordinate CUSTOM row, an unframed causal dark band, then lighter comparison and scope sections.
- Keep subtle dividers between light sections so the long page feels paced rather than assembled from interchangeable panels.

**REJECT**
- V2's animated portrait marquee as-is. The unlimited-user message is strategically valid, but continuous movement and faces compete with the revised two-plan decision.
- Generic enterprise visual codes, oversized dark third cards, decorative icons without information value, and accent colors applied merely for variety.

### 4. Motion Director

**USE**
- The existing visible-by-default reveal pattern, small vertical movement, card hover lift, CTA arrow movement, accordion height and opacity transitions, and reduced-motion support.

**ADAPT**
- Use one restrained entrance sequence for the two plan cards, then the CUSTOM row.
- In the dark upgrade section, reveal each causal lane in order once: source event or audience, Zapla action, clear outcome. Motion should explain the distinction, not decorate it.
- Keep accordion transitions between 180ms and 220ms and make all reduced-motion states immediately visible.

**REJECT**
- An autoplay marquee, looping decorative motion, animated feature checks, parallax, floating cards, or any movement that delays pricing comprehension.

## Exact V2 pattern decisions

| V2 pattern | Decision for V3 | Application |
|---|---|---|
| Centered eyebrow, headline, supporting copy | USE | Keep the clear opening stack and V3's existing revenue headline. |
| Large monthly price with small suffix | USE | Preserve as the strongest element inside each primary card. |
| Guided Launch inset inside each card | USE | Keep visible directly below monthly pricing. |
| Recommended amber plan treatment | ADAPT | Apply only to Growth, with customer-facing wording tied to proactive growth. |
| Four equal desktop plan cards | REJECT | Replace with two primary cards and one subordinate CUSTOM row. |
| Long card feature inventories | REJECT | Replace with roughly four commercial outcomes plus a shared-platform line. |
| Unlimited-users portrait marquee | ADAPT | Keep the principle as a calm static reassurance band, without portrait or marquee motion. |
| Collapsible comparison trigger | ADAPT | Keep progressive disclosure, but retain a useful summary and build a mobile-native grouped view. |
| Sticky comparison first column | USE | Preserve on desktop. |
| Dark Guided Launch storytelling band | ADAPT | Keep the strong contrast and scope message, but avoid duplicating information already on cards. |
| Map, Build, Launch stage cards | ADAPT | Reuse only if they clarify implementation before the detailed two-scope section. Otherwise collapse to a concise process line. |
| Smooth launch and FAQ accordions | USE | Preserve their accessibility and restrained transition grammar. |
| Warm alternating page bands | USE | Retain, with fewer equally weighted light sections. |
| Full-width pill CTAs and mobile sticky CTA | USE | Keep Book a Call as the primary action and hide the sticky CTA near the final CTA. |
| Tiny hover lift and arrow shift | USE | Preserve as the maximum card and CTA motion. |

## Recommended V3 section order

1. **Internal draft marker and hero**
   - Keep "Stop revenue leaking. Then create more of it."
   - Keep concise explanation and the four shared principles.

2. **Two primary plan cards**
   - FOLLOW-THROUGH
   - Exact promise: “Stop losing the business already coming to you.”
   - A$399 monthly price, Guided Launch from A$997, four outcome bullets, concise shared-platform line, Book a Call.
   - GROWTH
   - Exact promise: “Turn the customers and leads you already have into more revenue.”
   - A$699 monthly price, Guided Launch from A$1,497, four proactive-growth outcome bullets, concise "everything in Follow-Through" shared line, Book a Call.

3. **Subordinate CUSTOM path**
   - Compact full-width row below the cards.
   - Qualify multi-entity or multi-brand operations, advanced integrations or migrations, non-standard routing or reporting, high-volume operations, and custom implementation.
   - Do not mention enterprise readiness, governance, security, compliance, or SLA claims.

4. **Static shared-principle band**
   - Unlimited users, unlimited stored contacts under fair use, month-to-month.
   - No moving portraits or marquee.

5. **Dark upgrade-logic section**
   - Keep the exact headline "Growth isn't more CRM. It's a different job."
   - Two visual causal lanes showing Follow-Through as live-event response and Growth as proactive audience and campaign creation.

6. **Plan comparison**
   - Operating platform, Follow-through systems, Proactive growth, Support and expansion.
   - Detailed features live here, with Growth differing only where proactive capability begins.
   - Desktop grouped table and mobile category accordions.

7. **Guided Launch**
   - Keep the software-access versus implementation-scope distinction.
   - Preserve the exact Follow-Through and Growth launch scopes and the after-launch builder-access note.

8. **Ghost to Gold**
   - Keep as its own deep-green acquisition wedge directly after launch scope, before general add-ons.

9. **Optional expansion**
   - AI Receptionist, Priority Expert Support, Managed Success, and Website AI Chat validation placeholder.
   - Maintain regional-pricing caution.

10. **Usage rates**
    - Preserve the simple AU rate rows and SG/HK validation note.

11. **Commercial FAQ**
    - Preserve all required objections in compact two-column desktop accordions and one-column mobile accordions.

12. **Final CTA**
    - Keep "Start with the job. Then choose the plan." and Book a Call.

## Technical scope and validation

- Edit only `src/routes/Pricing-v3.tsx` unless a strictly necessary route-specific support change is discovered during implementation.
- Do not change `/pricing-v2`, `/pricing`, the homepage, shared navigation behavior, or any other route.
- Preserve `noindex, nofollow` and the internal-draft marker.
- Validate TypeScript and the available production build.
- Browser-check `/Pricing-v3` at 1440 by 900 and 390 by 844 for one header, no horizontal overflow, clean card alignment, comparison usability, accordion behavior, reduced motion, and no console or page errors.
- Smoke-check `/pricing-v2`, `/pricing`, and the homepage without changing them.
