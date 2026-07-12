
## Fair point

A pricing page hero should orient the buyer on **price + value + next step** — not re-sell the product with a dashboard mockup. That belongs on the home page. Let's strip pricing-v2 back to a proper pricing hero and keep the other improvements (softer "messy" accent, Scale+ enterprise card, sticky mobile CTA, human testimonials).

## Revised hero for /pricing-v2

Single centered column, tight and compact — no dashboard visual.

```text
                    [ ★★★★★  Trusted by 200+ AU businesses ]

              Simple pricing. One operating system.
                  Replace 16 tools. Save thousands.

     Pick a plan below — or book a 20-min call and we'll map the
     right setup for your business (no pressure, no hard sell).

              [ See plans ↓ ]   [ Book a strategy call ]

     ✓ Guided launch included    ✓ Cancel anytime    ✓ AU-based support
```

Then the page jumps straight into the pricing tiers (which is what a buyer clicked "Pricing" to see).

### Structure changes on /pricing-v2

1. **Hero** — compact, centered, pricing-first (above). Kills the two-column dashboard mockup.
2. **Anchor jump** — "See plans" scrolls to the pricing grid immediately below.
3. **Order of sections** (revised for a pricing-page narrative):
   - Hero (compact)
   - Pricing tiers (with Scale+ enterprise treatment — keep)
   - Comparison table / what's included
   - "Replace the messy stack" pillars + funnel (justifies the price)
   - Human-face testimonials / customer results (keep — Monday-style)
   - Savings calculator
   - Launch pack / guided onboarding
   - FAQ
   - Sticky mobile CTA (keep)
4. **Keep as-is**: softer coral "messy" color, Scale+ dark enterprise card, sticky mobile CTA, noindex meta.
5. **Remove**: the dashboard mockup component and its imports.

### Technical notes

- Edit only `src/routes/pricing-v2.tsx`. `/` (home) stays untouched.
- Replace the two-column hero JSX with the compact centered version.
- Move the pricing section directly under the hero; keep other sections in the reordered flow above.
- Trust bar (5 stars + count + AU support) stays but shrinks to a single pill above the headline.

Approve and I'll make the swap.
