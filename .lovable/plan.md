## Plan: Refine "Feel the Zapla difference" heading

### Current state
In `src/routes/hero-preview.tsx` line 48, the selected heading is:
- `font-black`
- `text-[44px] sm:text-6xl md:text-7xl`
- `tracking-tight`

This makes it very heavy and large compared to the cleaner reference style.

### Proposed change
Update the `DifferenceHeading` component so the `h2` is lighter and more refined:
- Drop weight from `font-black` to `font-semibold` (or `font-bold` if you want slightly more presence).
- Reduce size to a more editorial scale, e.g. `text-3xl sm:text-4xl md:text-5xl`.
- Keep `tracking-tight` and center alignment.
- Use the Zapla brand font stack (`font-zapla`) so it matches the rest of the page.

### Example target class string
```
mx-auto max-w-6xl text-center font-zapla font-semibold tracking-tight text-neutral-900 text-3xl sm:text-4xl md:text-5xl
```

### Scope
Only the `DifferenceHeading` `h2` in `src/routes/hero-preview.tsx` will be changed. No other sections or logic are affected.

If you want me to match the exact size/weight from the original screenshot, please confirm whether the target is closer to `font-semibold text-4xl/5xl` or `font-bold text-5xl/6xl`, and I will adjust accordingly.