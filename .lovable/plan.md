## Current rating: 6.5/10

The v3 Option A funnel image itself is strong, but the section around it undercuts it: a white card frame, a redundant strip of 16 favicon chips below it (the icons are already baked into the render), and a hard rectangular boundary make the graphic look pasted-in rather than part of the page. No scroll payoff — it's a static block.

## Goal
Make the funnel feel native to the page, remove the duplicate icon strip, and add a scroll-driven "pour → drop" animation so scrolling down physically pushes icons through the funnel and reveals the Zapla logo at the bottom.

## Steps

1. **Regenerate the funnel graphic to layered pieces** (so we can animate parts independently):
   - `pillar-funnel-body.png` — just the 3D blue glass funnel + soft shadow, transparent background, no icons.
   - `pillar-funnel-icons.png` — the 16 brand icons (WordPress, Wix, ClickFunnels, HubSpot, Pipedrive, Mailchimp, Klaviyo, Twilio, Calendly, Typeform, Jotform, Zapier, Hootsuite, NiceJob, DocuSign, Stripe) as a floating cluster above the funnel mouth, transparent background.
   - `zapla-logo-3d.png` — regenerate the Zapla icon to match the attached logo (rounded-square blue tile, white "Z"), with the white "Z" fully filled solid white as requested, matte 3D drop-shadow, transparent background.

2. **Rebuild the Pillars section** in `src/routes/index.tsx`:
   - Remove the white card frame, border, and the entire duplicate favicon chip row underneath. Section becomes a tall, blended canvas that flows with the page background (soft ambient glows only).
   - Compose the graphic as three stacked absolutely-positioned layers inside a tall (~ 900px) scroll stage: icon cluster on top, funnel body in the middle, Zapla logo below the spout.
   - Keep the savings pills (A$1,847 crossed out / One bill · Save…) but float them cleanly under the whole scene, not inside a card.

3. **Scroll-driven animation** (using `useScroll` + `useTransform` from framer-motion, already in the project):
   - As the section enters and progresses through the viewport (0 → 1):
     - Icon cluster: translateY from -60px → +180px and fade out near the funnel mouth (pouring in).
     - Individual icons stagger slightly (varying speeds) for a "raining into funnel" feel.
     - Funnel body: gentle scale/glow pulse peaks at mid-scroll.
     - Zapla logo: starts hidden below spout (opacity 0, translateY +40px, scale 0.7) → at ~65% scroll snaps up to full opacity + scale 1 with a soft blue glow bloom (the "drop out" moment).
   - Respect `prefers-reduced-motion`: fall back to a static composed layout.

4. **Verify** at desktop and mobile widths — the scene should feel tall and cinematic on desktop, and compress cleanly on mobile without the icons overlapping the funnel awkwardly.

## Notes
- No copy changes (heading, sub, CTAs, savings pills stay identical).
- No changes outside the Pillars section.
- The `pillar-funnel-v2.jpg` composite stays in the repo as a fallback but is no longer imported.
