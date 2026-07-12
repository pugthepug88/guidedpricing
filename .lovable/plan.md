## Problem
The last AI image edit flattened the funnel image’s transparent background to white while changing the Zapla logo fill. We need to undo that and apply only the logo color change with pixel-precision.

## Plan
1. Inspect the current funnel asset (`src/assets/zapla-funnel-16-apps-final.png`) to confirm background state and locate the Zapla logo region.
2. Use Python/PIL to:
   - Restore full alpha transparency on all non-logo pixels.
   - Identify the Zapla logo mark at the bottom of the funnel.
   - Fill only the inner shape of that mark with white (`#FFFFFF`), leaving the outer blue square and every other pixel unchanged.
3. Save the result back to the same file path, preserving the original resolution and color profile.
4. Verify in the preview that the background is transparent and the Zapla logo inner mark is white.

## Outcome
A transparent-background funnel image with a white-filled Zapla logo and no other changes.