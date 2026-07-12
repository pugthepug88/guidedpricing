## Goal
Replace the homepage funnel image with a high-fidelity render that uses your actual 16 apps pouring in and your Zapla logo dropping out — matching the quality of the v3 image, but with the correct brand assets.

## Steps

1. **Generate a new funnel render** using premium image generation. Prompt will specify:
   - 3D photoreal glass/blue funnel (same style as v3 Option A)
   - Falling into it: WordPress, HubSpot, Mailchimp, ClickFunnels, Calendly, Zapier, Typeform, Stripe, QuickBooks, Slack, Zoom, DocuSign, Trello, Google Analytics, Facebook Ads, Instagram — recognizable brand-color icons
   - Emerging from the spout: your Zapla logo (blue rounded-square icon with white Z)
   - Clean white/light background, soft shadow pool
   - Saved to `src/assets/pillar-funnel-v2.jpg` (or as a Lovable Asset pointer)

2. **Swap the image in `src/routes/index.tsx`** — update the `funnelImg` import to the new file. No layout, animation, or copy changes. Everything around it (headline, subhead, savings pill, tool list) stays exactly as-is.

3. **Verify** the homepage renders the new image cleanly at desktop width.

## Notes
- No animation. Static image only, matching the v3 treatment.
- Because AI image generation can't perfectly reproduce brand logos, some icons may render as close-approximations rather than pixel-exact (same tradeoff as the v3 image you approved).
- If the first render has wrong icons or a distorted Zapla logo, I'll regenerate before wiring it in.