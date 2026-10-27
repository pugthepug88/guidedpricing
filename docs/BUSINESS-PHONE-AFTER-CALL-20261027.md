# Business Phone — useful after-call actions and navigation audit

27 October 2026. This supersedes the name/icon/colour configuration demonstration. The owner rejected that section because it required the buyer to work out why custom buttons matter.

## Commercial story and visual

The buyer question is: what can my team do after a customer call? The replacement shows Mia's completed call and the existing pendant-options request, followed by three clearly named custom choices: Add to pipeline, Start follow-up and Book a visit. Short consequences distinguish reviewing/saving a lead, running a chosen workflow and opening a booking page. The copy explicitly says the shortcuts are the team's own choices. They are neither an immutable bundle nor automatic effects of a call ending.

The completed-call context and bottom shortcut bar occupy one compact full-width native product panel, rather than a settings table. Its standard Zapla header, portrait, neutral surfaces, readable labels and equally styled action buttons with blue icons preserve the page's current visual language. On narrow screens the context and intact labelled choices stack in ordinary flow; no fixed content height or inner scrolling is introduced. The original photographic opening, Power Dialler calling sequence and final CTA remain. No sample shortcut bars or unlabelled control glyphs return to those scenes.

## Capability evidence and reference decisions

The owner supplied `image(20261027-123337).png` showing the rejected marketing section and `image(20261027-123356).png` showing the unobscured quick-action type selector. Both were visually inspected. The selector directly supports Add to Pipeline, Trigger Automation and Redirect to URL, as well as other configured actions. The visible Ticketing option does not reopen Zapla's withdrawn Ticketing offering and is excluded.

The current official help article H8 already recorded in BUSINESS-PHONE-EVIDENCE.md describes saved, configurable phone actions and existing pipeline/stage, automation and URL targets. The previously downloaded deployed public client C2 was re-read at the exact phone-action handler: pipeline opens a prefilled entry dialog and requires a person's save before POST /pipelines/items; automation explicitly triggers the selected workflow for the matched contact; URL opens the configured destination. The page therefore does not show a silently saved pipeline result, automatically sent follow-up or confirmed booking. Booking-page choice is a configured URL destination, not a new native one-click booking capability. No service endpoint was called.

USE the screenshots to establish supported action types. ADAPT the custom-action feature into obvious business choices from the completed call. REJECT reproducing the admin creation panel, configuration vocabulary, unrelated sample names or the withdrawn Ticketing action. The scene's people and choices are prepared marketing content, not a live account result.

## Navigation and Lovable audit

Before the edit, GitHub main and Lovable both reported `daa8a0b3eba445bb157cd0aa084c482bf496f6cd` and Lovable was ready. Current Lovable source confirmed Business Phone in SiteNav's shared desktop/mobile Features list under Leads & conversations. The leaf route resolves to BusinessPhonePage at /features/business-phone with the existing title/noindex policy.

The user asked about both header and footer. The audit found that the global DominoFooter lacked this link. __root.tsx owns that footer; SiteFooter is an inert legacy shim. A separate Features heading and Business Phone anchor are now added within the existing footer column structure. Existing Platform destinations, all five columns, other links, artwork, video and timing remain. This is the narrow footer-link addition authorised by the user's navigation request, not a footer redesign.

## Reviews and checks

Independent Product Marketing/Conversion/SME/buyer review found the business choices clearer than the configuration table and recommended “Review and save the lead” to preserve the verified human save. That wording is applied. Separate independent Brand/UI/Motion source review found the completed-call/choice geometry clearer and checked normal-flow stacking plus preservation of the five-column footer. It flagged the first blue button as implying priority or selection; all three choices now share the same neutral treatment with blue icons. These remain source judgements, not a fresh rendered visual test. Root assessment keeps the action choices visibly person-selected, without automatic progression or an invented outcome.

Build, TypeScript, scoped ESLint, SEO policy and whitespace checks passed. Final formatting is checked before commit. Fresh main is checked before the GitHub ref update and concurrent Chatbot work is preserved by using its current tree as the base.

Fresh rendered desktop/tablet/mobile verification remains blocked by the unavailable originating browser context; the earlier cloud attempt reached Lovable sign-in. The supplied marketing screenshot proves the previous problem, not this revised layout. Source analysis/build success do not prove three-second comprehension, current crops, text wrapping, nested clipping or click-through. No browser or owner acceptance is claimed. The footer anchor uses the existing keyboard focus treatment; it has not been re-tested in a rendered browser in this revision.

Direct preview: https://id-preview--b1bef4bc-7c76-4229-924e-e0e5b64a632b.lovable.app/features/business-phone
