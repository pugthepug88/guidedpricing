# Pricing V3 Internal Concept

## Goal
Create a standalone first-draft pricing concept at `/Pricing-v3`, leaving `/pricing`, `/pricing-v2`, the homepage, and all existing components unchanged.

## Page structure
1. **Draft pricing opener**
   - Visible `Pricing V3 · internal draft` marker and search-engine `noindex` metadata.
   - Headline: “Stop revenue leaking. Then create more of it.”
   - Short explanation, four commercial reassurance points, and three plan cards for Follow-Through, Growth, and Enterprise.
   - Candidate pricing and Guided Launch amounts will be clearly labelled as draft candidates.

2. **Upgrade logic**
   - A strong dark section titled “Growth isn’t more CRM. It’s a different job.”
   - Side-by-side explanation of event-triggered follow-through versus proactive demand creation.

3. **Plan comparison**
   - A compact comparison table grouped into Operating platform, Follow-through systems, Growth marketing, and Support + expansion.
   - Growth differentiates only through proactive marketing capability, never seats or contact caps.

4. **Guided Launch**
   - Separate software access from Zapla’s implementation labour.
   - Show Follow-Through and Growth launch scopes exactly as supplied, with builder access retained after launch and extra work moving to Managed Success or custom scope.

5. **Expansion and usage**
   - Four optional expansion cards with candidate pricing and validation status exactly represented.
   - A dedicated Ghost to Gold acquisition section.
   - A simple draft usage-rate section for SMS, voice AI overage, email, and WhatsApp.

6. **FAQ and final action**
   - Answer the eight specified commercial objections.
   - Close with “Start with the job. Then choose the plan.” and the standard Book a Call action.

## Visual and interaction approach
- Copy the established V2 page language into the new file: warm cream paper, dark green and near-black bands, Soft Autumn accents, rounded cards, restrained reveal motion, responsive comparison scrolling, smooth accordions, and a mobile call action.
- Keep content visible before animation triggers and respect reduced-motion settings.
- Use the existing shared site header and footer without modifying them.

## Technical details
- Add only `src/routes/Pricing-v3.tsx` with `createFileRoute('/Pricing-v3')`.
- Add route-specific title, description, Open Graph metadata, Twitter card, canonical URL, and `robots: noindex, nofollow`.
- Mark sitemap inclusion as false.
- Verify TypeScript, route rendering, desktop and mobile layout, horizontal overflow, console errors, and smoke-check existing pricing routes.
