# HubSpot simple draft: review-list registration findings

## Verified findings (current main, HEAD ddc9f99)
- `widerVersions` no longer exists in any file. Its home, `src/components/industry-v3/VersionShell.tsx`, was deleted along with the whole `src/components/industry-v3/` folder during the V3 page removals. Only stale mentions are left, in AGENTS.md (line 16), docs/COMPARISON_PAGE_BRIEF.md (line 13) and roadmap.md.
- So there is no in-app review viewer to register with now. The "Lovable review dropdown" is the editor's page selector, and no project file controls it. It is built from the route tree, and pages with `staticData: { sitemap: false }` may be left out. That second point is likely but not confirmed.
- Sitemap visibility is set per route with `staticData: { sitemap: false }` plus the `robots: noindex, nofollow` meta tag, as in `src/routes/compare.zapla-vs-pipedrive-simple.tsx`.

## How to register the HubSpot draft
1. Create `src/routes/compare.zapla-vs-hubspot-simple.tsx` with `createFileRoute("/compare/zapla-vs-hubspot-simple")`. Keep `sitemap: false` and noindex, nofollow so the production sitemap does not change.
2. Add the data file `src/components/compare/simple/hubspot.ts`. Do not edit `routeTree.gen.ts`; it is generated automatically.
3. Review access: type the path into the editor page selector. No widerVersions entry is possible unless a new review list is built.
4. Optional follow-up, only if you approve it: either rebuild a small review list, or correct the stale widerVersions lines in AGENTS.md and the brief.

## Preview URL
https://id-preview--b1bef4bc-7c76-4229-924e-e0e5b64a632b.lovable.app/compare/zapla-vs-hubspot-simple
This needs Lovable sign-in, and it only loads once the route is merged and synced. Published host: https://guidedpricing.zapla.io

No edits or publishing done.
