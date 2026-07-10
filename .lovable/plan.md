## Goal
Remove the pricing anchor/snapshot card I added to the hero, and restore a cleaner hero that matches the Zapla homepage tone while still feeling appropriate for a pricing page.

## What I’ll change
1. **Strip the hero price snapshot** — remove the 3-column card showing Launch Fee / Growth Plan / ROI Timeline from the `Hero` component in `src/routes/index.tsx`.
2. **Rebuild the hero as a lightweight, pricing-intent headline section:**
   - Keep the original headline: *“Run your whole business from one AI operating system.”*
   - Keep or tighten the subheadline around value/ROI, without inventing specific price callouts.
   - Restore the primary CTA row (*Get started* / *Book a call*) and a small trust row (checkmarks or rating).
   - Keep the light, airy Zapla styling (lavender-white background, electric blue accents, Manrope typography).
3. **Verify the page still builds and the hero no longer contains the fabricated price snapshot.**

## Out of scope
- No changes to the actual pricing cards/tiers below.
- No changes to the customer carousel, pillars, FAQ, or other sections unless they visually break from the hero change.

## Files touched
- `src/routes/index.tsx` — Hero component only.
- Possibly `src/styles.css` if any hero-specific utility classes need cleanup.

## Verification
- Run the production build (`bun run build`) to confirm no syntax or type errors.
- Take a preview screenshot of the hero to confirm the price snapshot is gone and the layout feels balanced.