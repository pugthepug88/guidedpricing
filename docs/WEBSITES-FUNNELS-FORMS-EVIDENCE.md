# Websites, Funnels & Forms: evidence ledger

Evidence record: **2026-10-22 (UTC)**. Page: `/features/websites-funnels-forms`.

This ledger separates documented product capabilities from the page's illustrative journey. The visual is an explanatory business example, **not an exact reproduction of the NextGen builder interface**. Official documentation supports the capabilities below; it is not a record of testing a live customer account.

## Source of truth

Detailed official help:

- Help centre: https://app.thenextgencrm.com/help-centre.html?lang=en
- English help content loaded by that centre: https://app.thenextgencrm.com/help-content/en.json

The table records the exact article keys in the help JSON. Bracketed IDs are documentation route parameters, not customer IDs. Prefer these detailed articles for interface behaviour; use the official feature catalogue for broader capabilities the help articles do not describe.

| Help article key | Verified scope relevant to this page |
| --- | --- |
| `websites` | Create websites, open the builder and organise sites into folders. |
| `websites/[id]/builder` | Add pages and drag blocks onto a visual canvas; edit content, typography, colours and spacing; save reusable components; save changes separately from publishing. Publication follows confirmation and replaces the live version. |
| `funnels` | Manage funnels and open their page or flow editors. |
| `funnels/[id]` | Redirect into a funnel page editor; this route is not a separate analytics dashboard. |
| `funnels/[id]/flow` | Connect pages, split tests and conditions. Live analytics and planning simulations are separate modes. Domain setup is optional while building and can be completed later. |
| `funnels/[id]/pages/[pageId]/builder` | Edit a funnel page with text, images, buttons, forms and calendars. Form/calendar blocks select an existing form/calendar. Save and Publish are distinct actions. |
| `forms/create` | Build and style multi-page forms; configure labels, required fields, choices, submit text and a post-submission redirect URL. AI can add fields, pages, styles and settings. Save keeps a draft; Publish saves and generates a public URL. |
| `forms/[id]/edit` | Edit form fields and choices, reorder pages, style the form and republish changes. Field types include text, email, phone, date, dropdown, radio and checkbox. |
| `form-fields` | Custom questions can be mapped to an existing contact field using **Map to Contact**, or left unmapped. |
| `forms/[id]/submissions` | Inspect submitted answers alongside the contact summary; view Complete or Partial status and download a submission PDF. Editing a received submission is not supported in this view. |
| `p/forms/[id]/docs` | Per-form submission endpoint and accepted fields, including required status and types; integration rules cover workflow triggering and merging. This does not establish universal merge rules. |
| `settings/domains` | Connect a hostname to a resource, configure the provided CNAME target and verify DNS. The interface distinguishes Pending, Active, Error and Unpointed states and reports SSL status. |
| `site-tracking` | Select a site, **one page** and a date range. Review page views, unique visitors, clicks, average scroll depth and a click/scroll heatmap. The article explicitly excludes viewing all pages together. |
| `automations/create` | Form Submitted is a documented trigger. Configure and validate a workflow, then save it as a draft or publish it live. |
| `automations/[id]` | Configure connected triggers/actions; inactive drafts and live workflows are distinct. Publishing activates a configured workflow. |

## Supporting official product sources

| URL | Supported claim and boundary |
| --- | --- |
| https://thenextgencrm.com/features/sites-funnels/ | Website/landing-page/funnel builders, AI with manual editing, templates, custom domains, SSL, funnel split tests and per-page conversion tracking. Does not prove free domain registration, guaranteed search rankings or unlimited delivery resources. |
| https://thenextgencrm.com/features/forms/ | Forms can create or update CRM contacts, embed on an existing website or use standalone links. Conditional logic is explicitly listed, although the help articles above do not describe its exact rule editor. |
| https://thenextgencrm.com/features/workflows/ | A form submission can trigger configured actions including messages, field updates and task creation. This supports a configured next step, not an automatic default attached to every form. |
| https://thenextgencrm.com/features/crm/ | Contact records support custom fields and customer history. |
| https://thenextgencrm.com/features/calendar/ | Public booking pages and intake forms exist. Offering a booking link is distinct from creating a confirmed appointment automatically. |
| https://thenextgencrm.com/usage-pricing/ | AI site/funnel prompts, storage and bandwidth are metered supplier services. These are not Zapla retail prices. This detailed pricing prevents an unrestricted free/unlimited hosting claim despite broader marketing wording elsewhere. |

Some official product pages currently display Reven.you branding while remaining on the NextGen domain. The detailed help is served from the confirmed NextGen application origin. No GHL documentation is used as evidence of NextGen functionality.

## Approved scope for the illustrative journey

**Business page → submitted enquiry → customer record → configured next step.**

- A website explains the business; a landing page or funnel focuses on an offer and its next steps; a form collects information. These roles belong together on this initial feature page.
- Name/email fields can represent contact details. A custom service or enquiry-details answer appears in the customer record only when its field mapping has been configured. Do not imply every answer automatically becomes a CRM field or note.
- A form submission can trigger a configured follow-up task or message. The illustration must describe the setup shown, rather than imply this workflow is enabled for every account/form by default.
- A configured redirect or message can offer a booking page. Do not portray an ordinary enquiry as a confirmed appointment without the customer choosing a time.
- The marketing demonstration uses predetermined illustrative details and local UI state. It must not collect or transmit visitor contact information.
- The demonstration can simplify presentation for comprehension. It must not invent product controls, exact field-mapping rules or unsupported delivery guarantees.

## Tracking scope

Use **“See where visitors click and scroll.”** Support it with selected-page visits, clicks, scroll depth and heatmaps. Keep detailed campaign analysis with Customer Marketing or Reporting & Analytics.

Do not invent traffic, conversion or revenue figures. The help does not establish complete attribution, cross-device identification, consent-free tracking, cookie-free operation or automatic compliance. There is no reason to turn these unknowns into a prominent customer-facing disclaimer; keep the feature claim precise.

## Self-service platform versus paid design

Existing repository evidence consistently distinguishes the software tools from a delivered website:

- `src/routes/Pricing-v3.tsx`: self-service website/funnel tools and forms are platform features; Guided Launch is required for new standard setups and covers a finite, agreed initial build separately from the monthly plan.
- `src/components/compare/simple/pipedrive.ts`: self-service website/funnel builders are included; done-for-you builds are separately scoped and priced.
- `src/components/compare/simple/monday.ts`: website projects are separately scoped and priced and are not automatically part of Guided Launch.
- `src/components/compare/simple/hubspot.ts`: the same self-service versus separately priced build distinction.
- `docs/ZAPLA-CONCISE-COMPARISON-TEMPLATE.md`: website/funnel building means a self-service builder, not a done-for-you website.

The page must visibly explain that Zapla website design is a **separately scoped, paid service**. Do not imply a custom-built website is included in the subscription or automatically included with Guided Launch. No service price is inferred from historical offers. Sales CTAs lead to `/booking`.

## Rejected assumptions and remaining limits

- No inherited GHL feature parity.
- No guaranteed enquiries, conversion uplift, SEO rankings or automatic legal compliance.
- No unlimited hosting, storage or bandwidth claim; no free domain-registration claim.
- No editor autosave or one-click rollback claim. Form partial-submission saving concerns visitor progress, not editor autosave.
- No instant domain activation before DNS configuration and verification.
- No fabricated conditional-rule editor; conditional forms are catalogue-supported but exact controls are not established here.
- No universal field mapping, contact deduplication or merge rule inferred from the generic contact-creation claim.
- No claim that a form submission itself confirms an appointment.
- No live NextGen account end-to-end test is represented by this evidence review. The Zapla page's responsive rendering and local demonstration are verified separately during implementation.


## Public-copy correction, 26 October 2026

The owner rejected public prototype captions and placeholder email addresses across the active feature pages. The prepared form now shows that an email address was provided, and the customer record says contact details were captured without printing an invented address. The same name, service and request remain consistent. The prototype no-action caption and repeated mapping note are removed; the main copy still explains configured field mapping. All values remain fixed/local and no endpoint is added.

The newer live Automation audit in `AUTOMATION-BUILDER-EVIDENCE.md` did not expose a dedicated Create Task action. Its current evidence supersedes the older supplier-level task wording in this page. The form-triggered workflow now shows a configured acknowledgement email, supported by the inspected Send Email action and form-submission trigger. The FAQ and supporting copy are updated accordingly. No automatic task, assignee, send guarantee or new integration claim is implied, and no live form or email was sent.
