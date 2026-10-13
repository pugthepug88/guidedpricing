# Editor page dropdown: diagnosis and remedy

## What is verified
- The app has 21 real page routes registered in the route tree, including `/industries/allied-health`. The route exists and is correctly named.
- 18 of those page files set `staticData: { sitemap: false }`: allied-health, cosmetic-skin-clinics, dental, mechanics, mechanics-v2, mortgage-brokers, mortgage-brokers-v2, trades, ai-receptionist, crm, customer-marketing, follow-up, platform, quote-follow-up, reactivation, reviews, Pricing-v3, compare/zapla-vs-pipedrive.
- Only `/`, `/pricing-v2` and the two `/concept/cinematic-follow-through-*` pages do NOT carry that flag.

## Likely cause (not confirmed by docs)
Lovable's documentation does not say how the editor page selector builds its list. The pattern strongly suggests it uses the same page discovery as the generated sitemap, so pages flagged `sitemap: false` are left out. That explains why allied-health and the other review drafts are missing while the root and concept pages appear.

## What I cannot do
I have no tool that controls, refreshes or reindexes the editor's page selector. Refresh only reloads the preview; it does not rescan the list.

## Remedies (no code change from me)
1. Immediate workaround: type the path into the selector, e.g. `/industries/allied-health`. Lovable documents this for missing pages.
2. If you want them listed: in GitHub, remove `staticData: { sitemap: false }` from the pages you want shown. Trade-off: they would then be included in the public sitemap. The `noindex, nofollow` meta tags still keep them out of search results, but they would no longer be hidden from crawlers' page list. Test this on one page (allied-health) first to confirm the cause before changing the rest.
3. Ask Lovable support to confirm whether the selector honors `sitemap: false`, if you prefer to keep drafts out of the sitemap.

No source, navigation, design or content changes, and no publishing.
