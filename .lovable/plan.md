# Pricing V3 rebuild

## Scope
Rebuild only `/Pricing-v3`. Keep `/pricing-v2`, `/pricing`, the homepage, navigation, and shared pages unchanged.

## Implementation
- Recreate the opening section directly from Pricing V2's hierarchy, widths, spacing, card geometry, and reveal timing, using the agreed Follow-Through, Growth, and Custom commercial content.
- Restore the exact V2 24-face unlimited-users marquee, including its 64-second loop, pointer pause, and static reduced-motion state.
- Add one dark Follow-Through versus Growth section using V2's dark-section styling and a one-time cause-to-outcome sequence.
- Use V2's comparison presentation with the newer four commercial groups, a sticky first desktop column, subtle Growth emphasis, and grouped mobile accordions.
- Reuse V2's Guided Launch composition and staged Map, Build, Launch motion, followed by the agreed launch-scope accordions.
- Keep only the requested Ghost to Gold, usage, add-ons, FAQ, and final call-to-action sections, all restyled to V2's cadence and editorial hierarchy.
- Preserve `noindex, nofollow`, the tiny internal-draft utility note, accessible expanded states, and route-scoped mobile call-to-action.

## Technical details
- Replace `src/routes/Pricing-v3.tsx` as one fresh implementation.
- Keep motion one-time and causal, with `prefers-reduced-motion` static fallbacks.
- Preserve the exact agreed prices, feature inventory, scope boundaries, and cautious draft wording.

## Validation
- Run TypeScript checks and the production build.
- Inspect at 1440×900 and 390×844, including screenshots and interaction checks.
- Verify one header, no horizontal overflow, balanced cards, mobile comparison usability, accordion behavior, and reduced-motion readability.
- Smoke-check `/pricing-v2`, `/pricing`, and `/` without changing them.
- Complete Product Marketing, UI/UX, Brand, and Motion reviews, then correct any Pricing V3 issues found.
