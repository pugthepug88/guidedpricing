## Fix the funnel image — regenerate from scratch, kill the white container

Two problems, both baked into `zapla-funnel-16-apps-final.png`:

1. **White square background** — that's what's reading as "a container." The section wrapper in `src/routes/index.tsx` has no border/card; the boxed look is inside the PNG itself.
2. **Wrong icons** — current render has duplicates (multiple lightning bolts, multiple thumbs-ups) and is missing Calendly, Jotform, Birdeye, SimpleTexting, and a distinct ClickFunnels mark.

### The plan

1. **Regenerate the funnel PNG from scratch** with `imagegen--generate_image`, model `google/gemini-3-pro-image` (best fidelity for real brand logos on 3D tiles), transparent background, so it blends into `bg-zapla-bg` with zero visible edge.
   - Composition: same as the version you approved — clear glass funnel, ~16 glossy 3D app-icon tiles pouring in from above and settling inside, a single blue rounded-square Zapla logo dropping out the bottom.
   - **Exact icon set, no duplicates**: WordPress, ClickFunnels, HubSpot, Pipedrive, Mailchimp, Twilio, SimpleTexting, Calendly, Typeform, Jotform, Zapier, Google Sheets, NiceJob, DocuSign, Wix, Birdeye.
   - Zapla mark = blue rounded square with the black stylised Z (matches `src/assets/zapla-icon.png`).
   - Prompt will explicitly forbid: white background, drop shadow plate, duplicate icons, unrequested brands.

2. **Save** as a new asset `src/assets/pillar-funnel-transparent.png` (via `lovable-assets create`), so the old file stays around as a fallback until you approve the new one.

3. **Swap the import** in `src/routes/index.tsx` (line 11) to the new asset. No other code changes — the Pillars section already has no container; once the PNG background is transparent it will visually blend into the page.

4. **QA**: view the rendered PNG, verify (a) transparent background, (b) all 16 requested icons present, (c) no duplicates, (d) Zapla drop present. If any icon is wrong or duplicated, regenerate before swapping the import.

### Risk

Gemini 3 Pro is good but not perfect at rendering 16 specific brand logos legibly at small size. If a couple of icons come out ambiguous, I'll do one refinement pass rather than an endless loop — and flag which ones so you can decide whether to accept or iterate.

Nothing else on the page changes.