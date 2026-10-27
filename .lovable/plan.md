# Audit: native editor page dropdown vs current pages (revision 5f28c41)

## What was actually observed
- Workspace is at 5f28c41ad28862e69f8bfbfde0badcaba3004385.
- The native dropdown itself could NOT be observed. No available tool can open, read, refresh or reindex it. The only preview tool present today is "publish", which is out of scope. So there is no observed before-list; anything below about the menu is inference.
- The project settings file holds only template info, no page list, so there is nothing in the project that controls the menu.

## Current pages in Git (from route files, 38)
/, /platform, /crm, /customer-marketing, /follow-up, /ai-receptionist, /quote-follow-up, /reactivation, /reviews, /booking, /pricing-v2, /Pricing-v3
/features/ai-chatbot, /features/unified-inbox, /features/business-phone, /features/pipeline-management, /features/automation-builder, /features/calendars-bookings, /features/quotes-invoices-signatures, /features/websites-funnels-forms
/industries, /industries/allied-health, /industries/cosmetic-skin-clinics, /industries/dental, /industries/mechanics, /industries/mortgage-brokers, /industries/trades
/comparison, /comparison/review, /comparison/zapla-vs-activecampaign, creatio, ghl, hubspot, keap, monday-crm, pipedrive, podium, salesforce, thryv, zoho

## Inferred stale or missing (not observed)
- Should be missing from the menu if it is stale: any /compare/*, /comparison/*-simple, /concept/cinematic-follow-through-*, Ticketing. None exist in Git.
- Most likely missing per your report: the eight /features/* pages. All eight are registered and carry no hiding flag, so the code is not the cause.

## Supported minimal repair (your side, no code change)
1. Hard reload the editor tab (Ctrl+Shift+R) and reopen the page menu.
2. If unchanged: DevTools, Application, Clear site data for the editor, then reload.
3. Open one /features/* page directly in the preview address bar once, then recheck the menu.

## Step I cannot perform
Reading or refreshing the native menu. If steps 1 to 3 fail, the menu index is held by the editor itself and only Lovable staff can rebuild it, using the page list above.

## Not doing
No code, SEO, sitemap, route, navigation or content edits, no replacement selector, no recreated retired pages, no publishing.
