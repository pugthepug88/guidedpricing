# Website optimisation progress

Owner authorisation: drive the agreed programme one step at a time. GitHub `pugthepug88/guidedpricing` is the source of truth; Lovable is read-only.

## Step 1: Industries architecture

Implemented `/industries` as a short directory, grouped by operating context. Existing industry photography, local fonts and Zapla's warm palette establish continuity. Each entry describes concrete customer work and links to its existing page. No prices, invented statistics, new integration promises or extra industries are introduced.

Desktop and mobile navigation now separate Platform, Solutions and Industries. Industry names and destinations come from the same source as the directory. Footer links to the hub. Keyboard disclosure, Escape, outside-click dismissal and mobile overflow handling are included.

Rendered review revealed clipping of the existing shared footer on mobile/tablet. Its content now participates in layout below desktop, preserving the desktop scene. Tablet clinic entries use photo-and-copy rows instead of three cramped columns. Photo crops preserve the people and work.

### Review lenses

These are distinct review perspectives applied by the implementing agent, not claims of separate human reviewers or customer testing.

| Lens              | Finding / response                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product Marketing | Hub owns industry discovery; detail and proof remain on existing pages. Workflows use industry language.                                                            |
| Conversion        | Whole entry is clickable; clear specific destinations; platform route for visitors investigating breadth; Book a Call for uncertain fit.                            |
| Brand / Creative  | Reuses existing photography, local typography, sage/ink/cream palette and root logo. Editorial groups replace boxed six-card sales layout.                          |
| UI/UX             | All six industries visible and labelled; mobile and keyboard access verified. Cramped tablet layout and footer clipping corrected after render.                     |
| Motion            | Directory content is immediately readable; no entrance delays or decorative loops. Small link feedback disabled for reduced motion. Existing footer film unchanged. |
| SME buyer         | Describes enquiries, quotes, registration and client contact rather than taxonomy or software internals.                                                            |
| Buyer psychology  | Supports inbox/spreadsheet businesses and existing specialist software; setup/connection scope checked rather than promised.                                        |
| AI-slop critic    | No generic growth slogans, fake UI, invented outcome counts or unnecessary badges.                                                                                  |

### Validation

- Production build passes.
- TypeScript `--noEmit` passes.
- ESLint passes for edited TS/TSX files.
- Rendered desktop (1440), tablet (820), mobile (390), compared with Mechanics.
- Additional 320, 600, 1024 and 1440 width checks: no horizontal overflow; footer logo remains inside footer bounds.
- Six directory images loaded; all six destination pages render one H1.
- Desktop keyboard opening, tab to industry link, Escape dismissal and outside-click dismissal pass.
- Mobile Industries menu exposes six industries plus hub; reduced-motion view checked.
- No page JavaScript errors in the browser checks.

The existing externally hosted footer social SVGs did not load in the local test environment. Their generic social destinations also need replacing with verified account URLs in Step 2. This is not treated as passed external-asset QA.

Indexing stays disabled until the agreed production-readiness step. GitHub sync does not by itself prove the Lovable preview has updated.

## Programme remaining

2. Whole-site consolidation audit: route inventory, page ownership, copy repetition, claims, product boundaries, visual rhythm, navigation, mobile, motion and CTA consistency. Deliver findings with exact locations and proposed changes before broad rewrites.
3. Production SEO/readiness: indexing, sitemap, canonicals, metadata, redirects, internal links, broken links and performance.
4. Homepage industry entry point, designed after the site audit so it fits the homepage hierarchy.
5. Conversion measurement: source attribution through completed call booking, with actual access and event verification.
6. Genuine proof and case-study system, based on real product/pilot evidence.
7. Assess Real Estate after the estate is consolidated; no further vertical expansion before then.
8. Traffic/message tests, using evidence to decide what to change next.

## Findings queued for Step 2

- Numerical pricing still appears on current industry pages, including Dental's FAQ, contrary to the owner's no-prices-on-industry-pages rule. Audit all six, not just Dental.
- Footer social destinations point to generic platform homepages; obtain/verify actual Zapla account URLs rather than guessing.
- Dental and Skin use similar reception images; assess recognition and visual repetition at whole-site level.
- Industry/product pages are still `noindex, nofollow` / excluded from sitemap. Release only after approved readiness review.
- Root metadata uses a pricing-led site description; evaluate route-specific social metadata inheritance.

No full-site quality score or conversion claim is assigned from this implementation. Customer behaviour and production measurement remain unverified.
