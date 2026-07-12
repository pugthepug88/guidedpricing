## What's wrong with the current image

Looking at `zapla-funnel-16-apps-final.png` on the page right now:

1. **Typeform appears twice** — clear duplicate tile.
2. **Text logos are garbled** — "NiceJob" and "DocuSign" tiles have mangled/cut-off text because AI image models can't render small brand text reliably.
3. **~4–5 generic blue "Z/L" tiles** filling space inside and above the funnel — these aren't real brands, and worse, several look like tiny Zapla logos mixed into the *input* pile, which contradicts the whole "16 in → Zapla out" story.
4. **Missing from your list:** ClickFunnels, ClickSend, Birdeye, and a clearly identifiable Pipedrive / DocuSign / NiceJob. They got replaced by the generic tiles above.

Re-prompting `imagegen edit` will produce the same category of failure — it hallucinates, duplicates, and fills gaps whenever it's asked to render 16 specific brand marks with text.

## The fix — composite, don't regenerate

Keep the **approved funnel + Zapla drop render** exactly as-is (the glass funnel body and the blue Zapla square at the bottom — those look great). Stop asking AI to draw the 16 brand tiles inside it. Instead:

1. **Generate a clean version of the funnel** — same style, same lighting, same Zapla drop below — but **empty inside and above** (no tiles at all). One `imagegen edit` pass on the current image with prompt: "remove all app icon tiles from inside and above the funnel, leave the glass funnel body and the blue Zapla square below untouched, transparent background."

2. **Overlay the 16 real brand logos as HTML/CSS** on top of that empty funnel image, positioned to look like they're cascading in. Each logo is a real SVG/PNG from the brand's official source (via Simple Icons CDN `https://cdn.simpleicons.org/{slug}` where available, otherwise the brand's own favicon or a manually sourced official mark), wrapped in a rounded-square tile with a subtle 3D shadow to match the render's style.

   The 16 confirmed, deduped:
   ```
   WordPress · ClickFunnels · HubSpot · Pipedrive · Mailchimp
   SimpleTexting · Calendly · Typeform · Zapier · Google Sheets
   NiceJob · DocuSign · Wix · Birdeye · Hootsuite · ClickSend
   ```

3. **Position them** with absolute-positioned divs over the funnel image — roughly 6 cascading above the funnel mouth, 10 settling inside the glass bowl — using the same visual density as the approved v3 Option A render.

### Why this works

- **Zero duplicates** — we control the array.
- **Every logo is pixel-perfect and identifiable** — real brand SVGs, not AI approximations.
- **The funnel and Zapla drop stay exactly as approved** — untouched pixels.
- **No AI hallucinations** — no more generic blue tiles, no cut-off text.
- **Section height stays the same** — we're not changing the layout, only what goes inside the funnel.

### Files touched

- `src/routes/index.tsx` — `Pillars()` section: replace the single `<img>` with a positioned stack (funnel image as background layer + 16 absolutely-positioned brand tiles on top).
- `src/assets/zapla-funnel-empty.png` — new: empty funnel + Zapla drop, generated once.
- `src/assets/zapla-funnel-16-apps-final.png` — deleted (replaced by the empty funnel + overlay).

### What does NOT change

- Section copy, padding, heading, savings pill — all as-is.
- Funnel visual style, Zapla logo drop, blue glow behind it — all as-is.
- Rest of the page — untouched.

## One thing to confirm before I build

The tiles in the approved render have a **specific 3D glossy style** (rounded square, soft top-light, subtle drop shadow). To match that with real brand logos, I have two options:

- **A. Flat brand tiles** — real logo on a colored rounded-square background, flat with a soft shadow. Cleaner, more accurate, slightly less "3D render" than the current funnel body. Fast, reliable.
- **B. 3D-styled brand tiles** — same real logos, but each tile gets a glossy top highlight + drop shadow via CSS to mimic the render style. Closer visual match to the funnel, ~30 min more work.

I'd recommend **B** so the tiles feel native to the render. Confirm A or B and I'll build.
