# Concise comparison template

Updated 15 October 2026. Draft route: `/compare/zapla-vs-pipedrive-simple`.

## Scope and commercial decisions

This is a separate draft; the original comparison remains intact. No production publication. Preserve the separate removal of V3 drafts and the current shared header/footer.

Owner-confirmed Zapla offer: no free trial; Follow-Through A$399/month + GST, unlimited users, required Guided Launch from A$1,997 + GST. Growth A$699/month + GST, required launch from A$2,997 + GST. Keep usage charges and variable migration scope brief.

## Redesign decision

The owner's four desktop screenshots revealed a flat composition, generic booking illustration, repetitive differences, long table cells and an unresolved mobile/integrations row. This is new rendered evidence, not a change based only on a competing idea. Remove the illustrative enquiry/reply/booking panel and its animation, remove the unresolved row and move phone/AI details to a brief FAQ. The replacement hero is a factual commercial visual: unlimited users, actual monthly price and required launch.

Page sequence: explicit Zapla-versus-competitor label; buyer headline and factual team-offer panel; three short benefit summaries; six concise comparison rows; actual competitor and Zapla prices with billing terms; honest fit; three brief platform foundations; practical FAQs; call/pricing CTA; expandable sources.

Use short primary answers with immediately adjacent plan labels/details. The Zapla column has a restrained blue background for scanning. On mobile, a row heading sits above two side-by-side vendor cells with explicit visible vendor labels. Preserve semantic table roles and scope attributes. Never introduce blanket crosses for unknown features.

Motion decision: prices and feature comparisons remain immediately visible and static. Remove the old border-highlight sequence because the booking illustration does not prove the comparison argument. No counters, seat selector, fake UI, invented outcomes, testimonials or savings claims.

## Typed template contract

Use `src/components/compare/simple/ComparisonPage.tsx`, `types.ts` and competitor-specific data. Headline/accent, hero introduction, benefits, table rows/details/source IDs, pricing headline, vendor plan/price/unit/billing explanation, lower-plan context, fit, hosting qualification, FAQs and sources belong in typed data.

Do not impose Pipedrive's per-user annual pricing model on another vendor. The price unit and billing explanation are data fields. Re-evaluate the actual buying differences for each competitor, especially vendors that also offer unlimited users.

## Exact new reference inspection, 15 October 2026

The earlier work included a representative twenty-vendor content benchmark and a separate browser review of the sixteen named competitors plus HighLevel and NextGen (18). Neither meant every link on every vendor's website was inspected.

This additional pass opened the exact supplied Zoho comparison directory and HubSpot page in the browser. Followed all five CRM destinations linked from Zoho's Sales/CRM group. The directory contains many unrelated product categories; this pass does not claim exhaustive review of finance, HR, legal and other app comparisons.

| Reference | Observed pattern and decision |
|---|---|
| https://www.zoho.com/compare-alternatives.html | Browser-reviewed directory and actual comparison links. Use product/competitor organization when a comparison directory is needed; do not add the whole directory to one landing page. |
| https://www.zoho.com/crm/compare/hubspot.html | Strong centered comparison identity and contrasting sections. Adapt concise plan-labelled comparison; reject copying the massive table and stale December 2024 competitor-pricing snapshot. |
| https://www.zoho.com/crm/compare/salesforce.html | Direct buyer argument and pricing basis. Adapt prominent commercial argument; reject unsupported attacks, survey metrics and unproven savings. |
| https://www.zoho.com/crm/compare/microsoft-dynamics.html | Same reusable structure with competitor-specific context. Adapt consistency rather than duplicating every row. |
| https://www.zoho.com/crm/zwitch/sugar-crm-alternative.html | Redirected in the browser to https://www.zoho.com/crm/compare/; reviewed that destination, not a nonexistent separate SugarCRM page. |
| https://www.zoho.com/crm/compare/creatio.html | Opened the omnichannel disclosure and inspected table composition. Adapt short, distinct table answers. Reject enormous feature encyclopedias and importing vendor-authored competitor verdicts. |
| https://www.hubspot.com/comparisons/zoho-vs-hubspot | Viewed hero, table, product sections and FAQ interaction. Adapt clear comparison identity, hierarchy and limited primary arguments; do not copy percentages, third-party verdicts, trial CTAs or blanket crosses. |

These references inform design and presentation, not Zapla product claims.

## Evidence and pricing

Pipedrive official Australian pricing, checked 15 October 2026, lists annual-billing monthly equivalents: Lite A$19, Growth A$49, Premium A$79 and Ultimate A$109 per seat. Premium's A$948 per user/year is displayed beside its annual billing label. Premium is selected because the team email inbox and LeadBooster forms are included, not because it is feature-equivalent to Zapla. Lower-priced plans remain visible. Zapla is monthly and required launch is prominent. No currency conversion, usage comparison, artificial team-size calculation or total-cost saving is claimed. Vendor taxes/final pricing are qualified at checkout.

The attached Pipedrive research is a June 2026 USD snapshot; today's official AUD page takes precedence. Sources:

- https://www.pipedrive.com/en/pricing
- https://support.pipedrive.com/en/article/what-features-do-the-pipedrive-plans-have
- https://support.pipedrive.com/en/article/leadbooster-add-on
- https://support.pipedrive.com/en/article/how-does-pricing-work-in-pipedrive
- https://thenextgencrm.com/
- https://thenextgencrm.com/features/crm/
- https://thenextgencrm.com/features/inbox/
- https://thenextgencrm.com/features/phone/
- https://thenextgencrm.com/dpa/
- Owner confirmation and current `/Pricing-v3` for Zapla inclusions/prices.

Retain NextGen's DPA exceptions: Australian hosting is available, not confirmation of this customer's actual selected region. AI, communications and login processing can involve overseas services. Pipedrive also documents Australian hosting and separate company databases. No exclusive-hosting, fastest, microsecond UI, blanket compliance or four-live-region claim.

## QA status and remaining limits

The previous revision received actual Lovable browser QA at 1670×1000 and 390×844. It found and corrected a mobile caption layout defect and a 12px illustration note. This was remote-browser evidence; screenshots were not exposed as images by the connector. The owner then provided four desktop screenshots which were personally inspected and motivated this redesign.

This redesign requires build, TypeScript, and another actual desktop/mobile rendered pass. Do not label source review or a successful build as visual sign-off. Never assign numerical visual ratings without inspecting the resulting images.

Review lenses: buyer comprehension, copy, product marketing, conversion, buyer psychology, UI/UX, brand/creative, motion, AI-slop critic, evidence/fairness, accessibility, SEO/performance. Qualify what is observed versus inferred. Check real image load, text wrapping, offer prominence, mobile labels, focus/disclosures, no overflow, pricing units, launch visibility, no trial promise, route metadata and existing shell consistency.

Known remaining site-wide flag: global footer social icons point to generic service homepages. Correct only with verified Zapla profiles or a separately scoped removal; do not invent URLs. Preview sign-in and user-control handoff remain unavailable to this chat's user, so do not repeat the failed login route. Actual product enablement and customer hosting selection need owner/provider confirmation. Existing public trial/refund terms require separate reconciliation before public release.
