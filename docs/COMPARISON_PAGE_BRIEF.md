# Zapla comparison page operating brief
Last updated: 16 October 2026. Read this entire file before competitor work.

## Objective and working style
Create concise, persuasive and accurate comparison pages that help a buyer choose Zapla. Use the approved Pipedrive page as the structural and visual baseline. Form independent recommendations. Do not change direction simply because Cao suggests an alternative. Explain material changes in reasoning. Never manufacture claims or crosses. Give exact before/after wording before significant copy or structure changes. Execute approved work without repeatedly seeking approval. Work only on drafts; do not publish unless explicitly instructed.

## Source of truth and project
Repository: pugthepug88/guidedpricing. Lovable project b1bef4bc-7c76-4229-924e-e0e5b64a632b.
Baseline: /compare/zapla-vs-pipedrive-simple.
Reusable module: src/components/compare/simple/ComparisonPage.tsx, types.ts, TeamPricing.tsx, simple.css.
Competitor data: src/components/compare/simple/pipedrive.ts. Use separate data and a leaf route for each competitor.
Read AGENTS.md and applicable local instructions. Other chats edit this repository. Fetch current main, isolate changes and use a safe branch lease. Never overwrite unrelated changes or rewrite published history.
The former widerVersions list and industry-v3/VersionShell.tsx were deleted during V3 cleanup. The comparison-only draft selector is `/compare/review`; register each approved comparison once in its local drafts list. Use a leaf route and verify discovery in the Lovable editor page selector; its internals are not controlled by a repository list. Keep drafts noindex and excluded from the production sitemap. Provide the direct preview URL and state any editor-selector verification limitation. Do not recreate deleted V3 pages.

## Current offer
Follow-Through: A$399/month excluding GST, unlimited users and stored contacts subject to fair use. Required Guided Launch from A$1,997 excluding GST.
Growth: A$699/month TOTAL excluding GST; includes Follow-Through. Required Guided Launch from A$2,997 excluding GST.
No free trial.
Follow-Through includes CRM, shared inbox, pipelines, forms, bookings, quotes/proposals, invoices, self-service website/funnel builders, business phone access, two-way SMS, review management and missed-call text-back.
Cao explicitly confirmed review management and missed-call text-back in Follow-Through on 16 October 2026. Do not overstate exact review channel/reply/AI functionality beyond that confirmation.
Growth adds database reactivation tools, email campaigns, bulk SMS/WhatsApp campaigns and social scheduling. These must not appear as Follow-Through inclusions.
AI Receptionist is an optional paid service. Do not invent voice allowances. Read current pricing before quoting its price.
Phone numbers, communication usage, payment-provider fees and optional managed services are separate. Included tools do not mean unlimited sending or unlimited setup.
Guided Launch is finite scoped work; current pricing page lists initial import and build quantities. Do not confuse setup quantities with software capacity.
The current platform source in this work is NextGen (thenextgencrm.com), not historical GHL assumptions in older memories. Recheck platform and offer evidence rather than transferring GHL features.
Unlimited workflow COUNT is documented. Do not claim no execution, rate, step, storage, leads/deals or processing limits without proof.

## Editorial and design template
One fixed named competitor tier versus Follow-Through throughout the main table and calculator. Choose and justify that competitor tier per competitor; never switch tiers row by row.
Separate compact Growth upgrade block showing total price. AI Receptionist clearly optional.
Short feature names, ticks, crosses and compact labels such as Via integration, Paid add-on, Unlimited, 150 active. Detailed qualifications go in expandable notes.
A cross applies only to the precisely named inclusion. If a competitor achieves an outcome via integration, say so. Never imply an outcome is impossible because it is not native.
Lead with commercially relevant differences, not a count of crosses. No generic mobile/integration rows or exhaustive technical limits without a compelling buyer reason.
Keep the hero, three Why choose reasons, contextual customer visual, concise table, pricing calculator, optional first-year examples, fit section, short FAQs, collapsed sources and consistent final CTA/footer.
Use the existing white, dark green, restrained sage and Zapla-blue system. No beige wash, decorative connector lines, generic AI art or gratuitous animations. Reuse established branding. No additional demo section by default.
Keep copy concrete and understandable to SMB owners. Avoid jargon and unexplained metaphors. Preserve concise page length.

## Comparison integrity
Use current official pricing, plan matrices, help docs and integration-provider documentation. Research files from Kimi, Perplexity and Claude are leads, not proof. Resolve conflicts using current authoritative evidence.
Inspect competitors' actual comparison pages and relevant individual comparisons for messaging, table design, proof, objections, pricing framing and visual hierarchy. Record URLs actually reviewed. Do not claim all competitors or all pages reviewed unless done.
Compare same currency, billing cadence and tax basis. Show annual upfront commitment beside annual monthly equivalents.
Do not inflate competitor costs: exclude products included in chosen tier, count a shared provider once, distinguish optional tools and usage. Use a matched cost stack only when justified and verified.
Identify evidence as official documentation, account test, vendor/owner confirmation, assumption or unresolved. Keep precise unresolved questions out of public definitive claims.
Do not add HIPAA, security, hosting, compliance or performance claims without evidence for exact product, region, plan and scope.
No invented ratings, testimonials, results, ROI or guaranteed conversion. A design audit score is judgment, not measured conversion performance.

## Pipedrive decisions and findings
Premium A$109/user/month monthly; A$79/user/month annual equivalent, A$948/user/year. Cao confirmed both exclude GST on 16 October 2026. Annual screenshot supplied; AUD checkout not independently reproduced.
Premium includes 150 ACTIVE automations per company; inactive workflows excluded, paid top-ups available. Pipelines and contacts unlimited. Leads/deals have separate limits.
Premium includes shared email inbox, LeadBooster forms, Smart Docs and Projects. Do not add charges for them.
SMS and automated SMS via providers such as JustCall; missed-call text-back via integration; review management via integrations such as Trophy Jar. These are not absent capabilities.
Campaigns is a paid marketing add-on; sales email sequences/workflows already included. Reactivation is possible with Pipedrive workflows.
Do not add leads/deals, reporting, fields, API or workflow-structure-limit rows to the main page. Decision: insufficient incremental buyer value and/or unverified matching Zapla capacity.
No new content sections are currently required.

## Completion and publication checks
Inspect rendered desktop, tablet and mobile, including narrow 375/390px widths, every section, expanded details and first-year tables. Check overflow, wrapping, contrast, logo/avatar integrity, focus, touch targets and reduced motion.
Test calculator monthly/annual at 1,5,25 users; validate first-year launch inclusion and all tax labels.
Test FAQs/details, CTA destinations, anchors, source links, pricing consistency and review dropdown discoverability.
Run appropriate build and runtime checks. State actual coverage and any limitations; never claim an unperformed check passed.
Keep fixes scoped and synchronize GitHub/Lovable. Give the exact draft link when done.
Baseline responsive QA on 16 October passed all 24 calculator states at 375,390,768,1440px, no horizontal overflow or runtime errors. Lovable inspected screenshots and reported automatic build OK; root also checked hosted desktop interactions and links. This baseline pass does not certify future competitors.
Known site-wide caveat: /booking currently offers email to arrange a call and says online scheduling coming soon. No live calendar flow tested. Footer artwork renders; video playback was not verified in automated QA. No account-level feature testing performed.

## Next competitor workflow
Use one competitor chat per page in this same Project, with this file as the shared brief. Keep cross-page template decisions in a central chat and update this file when they change. Do not let a competitor-specific change silently alter all pages.
Initial proposed priority is GHL, HubSpot, Zoho, monday CRM and Salesforce, based on strategic coverage, not verified search demand. Confirm remaining priorities using buyer/traffic/lead evidence rather than committing to ten for volume.
For each competitor: audit current template and pricing; research vendor and comparison pages; choose matched tier; show proposed changes; implement approved page; verify desktop/mobile/calculator/links; report evidence and unresolved items.

## HubSpot draft decisions (16 October 2026)
Baseline: `/compare/zapla-vs-hubspot-simple`; HubSpot Sales Hub Professional consistently versus Follow-Through. AUD observed in HubSpot pricing UI:155/full Sales seat/month paid monthly with ANNUAL commitment; headline annual equivalent rounds to140 but bundle quotes1674/seat/year (139.50/month), confirmed at8370/year for five Sales seats. Required onboarding2160 once/account. All examples exclude GST, usage and optional products.
Calculator assigns each selected person a full Sales seat. Core and free view-only seats may lower actual cost. Annual Core-seat rate72/month observed; no unverified monthly Core rate used. Starter has up to50 restricted workflows and may meet simpler needs; Professional300 fully customisable workflows, paid limit increases. Current Professional matrix lists100 total pipelines across object types.
Credit HubSpot for included calling, shared inbox, forms, free website/landing-page tools and invoicing. Australian SMS through integration; native Sales/Service SMS add-on limited to US sending and US/Canada recipients. Review-management integrations exist. Current CPQ requires Revenue Hub/seat; preserve legacy quoting qualification. Customer Agent calling is documented beta using credits, not an absent capability. Do not assert Australian AI-call availability or tested feature equivalence. No hypothetical extra product stack added to price.
Reuse the shell with data-specific workflow notes, seat labels, commitment wording and optional onboarding. Preserve Pipedrive defaults. No new security/hosting claims.

Draft review access: `/compare/review` provides a comparison dropdown and real iframe viewports at375,390,768,1440px. This is an internal reviewer, outside navigation and the production sitemap. HubSpot leaf permits editor discovery without sitemap:false; noindex and explicit SEARCH_PAGES exclusion remain authoritative. Do not infer that the native Lovable selector was visually verified unless it was.


HubSpot verification record (16 October 2026):
- Standalone Smart CRM Professional also supports advanced workflows. Sales Hub Professional is the fixed sales-feature comparison, not HubSpot's minimum automation purchase. This qualification is visible in table/pricing notes and FAQs.
- Final hosted revision 6dfd531: 24 calculator states passed across 375,390,768,1440px, monthly/annual and 1,5,25 full Sales seats. Eight collapsed/expanded layout states passed with no horizontal overflow; long calculator amounts stay on one line. First-year setup totals, loaded images and noindex assertions passed.
- Rendered desktop, mobile calculator/expanded first-year table and tablet FAQs inspected. Pipedrive monthly/annual five-seat defaults remain545/395, annual upfront4740. CTA/CRM anchor destinations checked. Existing booking destination still offers email scheduling.
- Build, TypeScript, SEO policy checks and diff whitespace check passed. SEO retains17 production pages and excludes both comparison drafts and reviewer. No app-specific console errors observed after excluding browser-extension metadata/hydration noise.
- Focus and reduced-motion CSS reviewed; OS-level reduced-motion emulation, account-level product testing, video playback and the native Lovable editor page selector were not verified. The comparison-only dropdown and its direct draft links were verified.
- GitHub is synchronized to the Lovable preview. No production publish action performed.


## HubSpot revision decisions (17 October 2026)
- Approved revision retains Sales Hub Professional versus Follow-Through and the Pipedrive shell. Simple rows: Unlimited users, Two-way SMS, Unlimited pipelines, Dedicated database per account. Crosses apply only to the named unlimited/dedicated inclusion; details preserve Core/view-only access, 100 total pipelines, integrations and logical isolation. Websites/funnels combined to preserve concise table length.
- NextGen is Zapla’s underlying platform. Its privacy policy documents a physically separate database per account (https://thenextgencrm.com/privacy/); HubSpot DPA documents multi-tenant storage with logical access controls (https://legal.hubspot.com/dpa). These support the precise database row, not a security ranking, dedicated server or fastest-CRM claim. No comparative speed benchmark was found. HIPAA omitted from this Australian buyer comparison; region, BAA and contract scope matter.
- Growth marketing block separately compares advertised subscription starts: Zapla699/month total, launch from2997; Marketing Hub Professional1241/month paid annually or1380/month paid monthly with annual commitment, onboarding4320, 3 Core seats, 2000 marketing contacts, AUD excluding GST. Features/allowances/setup differ. Marketing Hub Professional includes Smart CRM Professional. Sales Hub Professional is NOT a mandatory additional purchase; no automatic stacked price or universal savings claim. Free/Starter marketing options exist.
- Current Sales Hub Professional has no five-seat minimum for new customers. Standard Zapla plans month-to-month after launch; HubSpot Professional offer shown requires annual commitment even with monthly payments. Guided Launch quantities are scoped setup, not capacity limits.
- Reviewed supplied NextGen comparison/homepage screenshots, Kimi final audit commercial sections and Perplexity audit, plus both Pipedrive/HubSpot comparison pages. Research archives are leads, not current proof; not every archive working file was audited. NextGen comparison’s old five-seat minimum, blanket website/invoicing crosses and HIPAA coming-soon text were not copied. Ignore GHL comparison per Cao.

Preview review note: the public preview can cache an older document after GitHub sync. Confirm revised text before running checks; the internal reviewer now has a Refresh preview control that requests a fresh iframe URL. A previous QA pass on cached content does not certify the new revision.


HubSpot revision verification (17 October 2026):
- Revised content visually confirmed before testing: simple labels, dedicated database row, separate Marketing Hub price context and revised FAQs. Hosted suite passed24 calculator states (375/390/768/1440px, monthly/annual, 1/5/25 full Sales seats),8 collapsed/expanded layout states, no horizontal overflow, price wrapping, first-year totals, images and noindex checks.
- Desktop hero and Growth/database context,375px Growth/marketing terms and768px FAQs inspected. Source/CTA/anchor destinations reviewed. Pipedrive defaults rechecked545 monthly,395 annual equivalent,4740 annual upfront for five users; no HubSpot marketing context appears on Pipedrive.
- Final source build, TypeScript, SEO17-page policy and whitespace checks passed. No app-specific errors in observed console logs (extension metadata errors excluded). Reviewer Refresh preview control changes iframe URL and loads revised content; comparison dropdown works. Native Lovable editor selector, account-level capabilities, OS reduced-motion emulation and video playback remain unverified. Existing booking caveat remains.
- GitHub main synchronized to Lovable preview through d229d40; revised direct preview inspected with revision query to avoid stale cache. Production was not published. Lovable's refresh-only agent reported a stale internal workspace, so its response was not treated as independent QA evidence; root verified the hosted page directly.


## HubSpot objection-handling copy pass (17 October 2026)
Cao approved the focused copy/switching pass after the six-lens audit. Answer cheaper small/mixed-seat HubSpot scenarios through a clearer combined-tool/implementation case, not inflated competitor costs or universal savings. Retain visible cheaper-plan/mixed-seat qualification and HubSpot sales-management fit. Pricing heading now compares tools and team price; Zapla fit names included daily work and separately priced launch/usage. Condense Growth copy without hiding marketing price, annual commitment, setup, Core/marketing-contact allowance or separate-product scope. Simplify quote cell to Separate plan / legacy, preserving its exception. Add a scoped HubSpot switching FAQ: clean-contact import and configured quantities are included; workflow/history/integration transfers must be assessed individually, extra work agreed separately. Do not promise automatic migration or downtime guarantees. Existing booking flow still arranges calls by email; no live calendar has been supplied/configured. Preserve the shared Pipedrive default heading and baseline.

Calculator qualification states the verified subscription crossover: three full Sales Hub Professional seats cost465/month with monthly payments or418.50/month annual equivalent, versus Zapla399. This applies to the named full-seat subscription scenario, before setup/usage/GST, not every mixed-access team or HubSpot plan. No calculator rates or hypothetical add-ons changed.
