## Problem
The transparent gaps inside the funnel were filled with a soft glass tint `rgba(232,236,246,170)`, but that tone reads slightly whiter/cooler than the page background `#EEF0FB` and the surrounding glass, so the patched areas are visibly a different shade from the environment.

## Fix
Re-tint only the previously patched pixels so they blend into the funnel's real glass — no other pixels touched, transparency of the true outside preserved.

1. Re-open `src/assets/zapla-funnel-16-apps-final.png`.
2. Identify the patched pixels (they are the only pixels with the exact fill color `(232,236,246,170)` — unique in the image).
3. Sample the average color of the nearby real glass interior (a ring of pixels just inside the funnel rim that were never patched) to get the true ambient glass tone.
4. Replace the patched pixels with that sampled tone at a low alpha (~120–150) so the page's lavender shows through consistently, matching the rest of the funnel interior.
5. No changes to icons, funnel rim, Zapla logo, or the transparent outside area.

## Verify
Composite the updated PNG onto the page's `#EEF0FB` background in a temp file and visually inspect that the patched regions are indistinguishable from the surrounding glass before handing back.
