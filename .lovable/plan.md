# Plan: GHL-ready HTML export of the Zapla pricing page

## Goal
Convert the current `/` pricing page into a single self-contained HTML file/block that can be pasted into a GoHighLevel funnel/page custom HTML element, keeping the visual design, pricing cards, calculator, FAQ, and CTA intact.

## Recommended approach

### 1. Static HTML generation
- Build the project and prerender the `/` route to raw HTML/CSS/JS.
- Extract the rendered markup and the generated CSS.
- Inline all styles into a `<style>` block so GHL does not depend on external stylesheets.

### 2. Image handling
- The funnel image and customer photos are currently local files in `src/assets/`.
- Option A (recommended): upload them to a CDN or GHL file manager and use absolute URLs.
- Option B: embed them as base64 data URIs inside the HTML for a truly single-file paste.
- I will use whichever the user prefers; if no preference, I will use base64 for the funnel hero and customer thumbnails so the block works immediately after paste.

### 3. Interactivity conversion
The page currently uses React state for:
- Pricing comparison table show/hide
- ROI calculator sliders and number input
- FAQ accordions
- Launch Pack scope accordions
- Customer results carousel + dots
- Sticky nav background on scroll
- Reveal-on-scroll animations

These will be rewritten as vanilla JS inside a `<script>` block so they continue to work inside GHL without React.

### 4. Cleanup for GHL
- Remove TanStack/router-specific markup and hydration comments.
- Remove nav/footer if not needed (user previously removed them from the Lovable page; I will match that).
- Keep the page width responsive so it fits GHL’s container.
- Ensure all buttons link to `https://zapla.io/getstartedtrial`.

### 5. Delivery
- Output: `ghl-pricing-page.html` saved to `/mnt/documents/`.
- Include a short README with paste instructions for GHL.
- Verify by opening the file in a browser and checking that all sections render and interactions work.

## What I need from you
- **Image preference**: CDN URLs (you host) or base64 embedded (one big file, instant paste)?
- **Scope**: Full page exactly as shown on `/`, or strip any sections before export?

## Outcome
A single HTML file you can paste into GHL’s Custom HTML / Code element and publish immediately.