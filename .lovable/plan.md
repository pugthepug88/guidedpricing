## Why the text looks less sharp

Two real differences vs zapla.io (not your eyes):

1. **Missing font weight 900.** The footer headings and G2 badge use `font-black` (900), but our Google Fonts `<link>` in `src/routes/__root.tsx` only loads Manrope weights `400;500;600;700;800`. The browser fakes 900 by synthetically bolding 800, which looks fuzzy/thick.
2. **Nav uses heavier + smaller type than zapla.io.** Our `SiteNav` links are `text-[14px] font-semibold` (600). Zapla.io's live nav is `font-size:16px; font-weight:500`. Heavier weight at a smaller size on a light background reads as "less sharp / slightly muddier".

Footer body links (`text-[14px] font-semibold text-zapla-muted`) have the same issue — zapla.io footer uses ~14–15px at weight 400–500.

## Plan

Frontend / presentation only. No logic changes.

1. **`src/routes/__root.tsx`** — extend the Manrope `<link>` to include weight 900:
   `family=Manrope:wght@400;500;600;700;800;900`
2. **`src/routes/index.tsx` → `SiteNav`**
   - Top-level nav links: `text-[14px] font-semibold` → `text-[15px] font-medium` (matches zapla.io's 16/500 while staying compact).
   - Dropdown item links: `font-semibold` → `font-medium`.
   - "Log In" pill: `font-extrabold` → `font-bold`.
3. **`src/routes/index.tsx` → `SiteFooter`**
   - Column body links: `font-semibold` → `font-medium`.
   - Column headings (`Company`, `Resources`, `Compare`): keep `font-black` (now that 900 actually loads it will render crisply instead of synthetic).
   - Trustpilot / G2 pills: `font-bold` stays.
4. **`src/styles.css`** — add explicit smoothing on `html, body` so both header and footer inherit consistent rendering across browsers:
   ```
   html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
   ```

Nothing else on the page changes — pricing, funnel, hero, comparison table, CTAs, links all stay identical.

## Expected result

Nav and footer text renders at the same weight/size rhythm as zapla.io, `font-black` headings stop being synthetically bolded, and overall header/footer type reads noticeably crisper on your Retina display.