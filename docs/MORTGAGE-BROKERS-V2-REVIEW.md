# Mortgage brokers v2 comparison review

12 October 2026. Separate draft route: `/industries/mortgage-brokers-v2`.

## Scope and incumbent strategy

The canonical `/industries/mortgage-brokers` route and its stylesheet remain unchanged. V2 is a leaf route with a dedicated comparison component and scoped CSS. Navigation and footer remain root-owned. Both drafts remain excluded from indexing and the sitemap. V2 links to the original at the opening and close.

The approved industry positioning map governs the page: target an established brokerage principal who wants a valuable client book, repeat and referred opportunities, and consistent service without every next action depending on the principal. The headline is “Be the broker they come back to. And recommend.” The eyebrow is “For mortgage brokers”.

## Material differences from the original

| Original emphasis                                | V2 emphasis                                                             |
| ------------------------------------------------ | ----------------------------------------------------------------------- |
| Not ready yet should not mean forgotten          | Be the broker clients return to and recommend                           |
| Prospect check-ins lead the story                | Post-settlement relationships lead the proof                            |
| Dormant enquiries are a short supporting mention | Separate warm and dormant examples with distinct eligibility            |
| No Google review or referral story               | Neutral Google review invitation and a separate introduction invitation |
| Mostly client message demonstrations             | A connected team record showing context, action, owner and history      |
| Generic commercial close                         | Unlimited users linked to shared client relationship ownership          |

## Visual and interaction decisions

Retain the existing original editorial photographs, generous asymmetrical hero frame, soft autumn palette and Dental-style double-border glass treatment. These assets were generated for the previous approved mortgage page; V2 reuses them to keep the strategic comparison controlled. No external stock or attachment-dependent paths were introduced.

Vary the page rhythm: open editorial hero and owner framing, cream wide relationship scene, lavender reputation composition, dark team view, human prospect scene, sage scope band, compact setup and pricing, practical questions and final call. Photos remain dominant and faces unobstructed.

Examples are illustrative, including the Google empty-star request, not live product screenshots or customer results. Selectable examples render complete states immediately. There is no autoplay or delayed dialogue; reduced-motion users receive the same content. On small phones, hero cards enter normal flow to prevent overlapping wrapped quotes.

## Lens review

| Lens                     | Finding                                                                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Strategy / senior broker | Client-book continuity leads; prospect revival supports the wider outcome.                                                                           |
| Customer                 | Contact has a useful reason and an easy response; broker handles personal advice.                                                                    |
| Frontline / principal    | Selected examples show a clear owner and next action, not a principal-only inbox.                                                                    |
| Product marketing        | Annual review, verified fixed-date invitation, review request, introduction and prospect cases explain mechanisms.                                   |
| Conversion / sales       | Clear booking call, product links and concrete gap-mapping agenda.                                                                                   |
| CFO / competitor         | Existing systems are acknowledged; no universal need for another CRM or invented loan ROI. Actual incremental value must be established on the call. |
| Brand / creative         | Matches the approved human photography, tight typography, glass and soft autumn system.                                                              |
| Whole-page composition   | Large human scenes, a dark interruption and a calm scope band break up product messages.                                                             |
| Copy / AI-slop critic    | Industry-specific client-book language; referral heading made explicit; no generic AI feature parade.                                                |
| UI / accessibility       | Native buttons with pressed states, live team/prospect text, keyboard-operable FAQs, visible focus, responsive layouts.                              |
| Motion                   | Complete static states and user-selected examples; no forced looping or reveal delay.                                                                |
| Product / data           | No assumed native mortgage sync, verified dates required, reply/booking/opt-out handling tested during configured launch.                            |
| Financial claims         | No savings, loan approval, automatic advice, commission or settlement promises.                                                                      |
| Reviews / referrals      | Neutral feedback and permission-aware introductions; no positive-rating gating, reward engine or fake testimonials.                                  |
| Website / SEO            | Separate noindex comparison route, original preserved, links to relevant product pages, shared nav/footer untouched.                                 |
| Investor / delivery      | Scope is configured and tested; no claim of a prebuilt integration across every broker stack.                                                        |

This is an implementation review, not independent customer validation or proof that every deployment works. Do not label every lens 9/10 to manufacture approval. Remaining commercial evidence is real customer results and measured incremental value; neither is invented here.

## Verification

Production build, TypeScript check and scoped ESLint completed successfully. Browser checks covered 1440, 1024, 768, 390 and 320px, including full-page screenshots and zoomed-out comparison with Dental, Mechanics and the original mortgage page. All three photos loaded, no horizontal overflow, no page errors. Tested both review invitation states, both prospect states, all three team states, keyboard FAQ opening and navigation from V2 to the original and back. The small-phone hero overlap was found during review and corrected before the final pass. Original route and CSS SHA-256 hashes match their pre-change copies.

Preview source verification is recorded after the GitHub connected-branch update. A signed-in Lovable session may be needed to open the private draft preview; local browser verification uses the same source.

## Preview access follow up

The user reported a 404 on the direct hosted V2 URL. Source synchronization and local rendering had been verified, but those checks did not verify that the direct hosted URL was reachable. Hosted browser inspection was redirected to Lovable login and the secure sign-in request was declined, so the exact hosted failure remains unconfirmed.

Added Mortgage Brokers and Mortgage Brokers V2 entries to the existing root-owned desktop and mobile Solutions menu. These links and V2’s original comparison links use the TanStack router to navigate within the loaded preview. This gives a menu entry point without a full-document deep-link request. Both canonical page content and original stylesheet remain unchanged. Local menu navigation and direct route rendering are tested separately. The direct hosted 404 must not be reported as resolved without hosted evidence.

## Client book economics refinement

Following the owner review, keep the relationship-led hero headline and strengthen the supporting copy: the client book represents ongoing income and future opportunities. Mention trail income once in the owner framing, alongside repeat business and referrals. The mechanism remains useful client contact and shared team follow through; no promise to protect commission, retain an existing loan or prevent suitable refinancing is made. This refines the incumbent strategy rather than replacing it with commission-led messaging. Original page remains unchanged.

## Production presentation cleanup

Restore the user's selected staggered recognition layout from the original mortgage page, with the lead relationship outcome and three steps for repeat contact, introductions and changing plans. Preserve the client-book strategy and mention trail income once.

Remove all visible illustrative captions, comparison-draft labels, sample opt-out footers and implementation notes from the marketing scenes. Loan review messages invite a conversation and still make no advice, savings or approval claim. Actual contact permissions and timing remain workflow requirements covered by the practical FAQs, not copy on simulated message cards. These are designed demonstrations, not fabricated customer proof.

Google feedback now matches Dental's separate invitation and white rating panel: full coloured wordmark, five unselected 31px outlined stars at 1.5 stroke, 20px panel radius and matching shadow. Referral invitation has its own conversation beside the review scene. Glass surfaces retain exactly Dental's rgba(252,252,250,.91), 2px light double border, inset outline, shadow and 6px blur; card density is reduced so the treatment reads consistently.

Cleanup verification: production build and TypeScript/scoped lint pass. Full renders checked at 1440, 1024, 768, 390 and 320px; no horizontal overflow, visible draft/illustrative/opt-out footers or browser errors. Loan-review and prospect selectors still work. Browser-computed glass background, border, inset shadow, drop shadow and blur match Dental exactly. Google panel background, radius and shadow match Dental, with the same coloured wordmark and outlined star system. Full page inspected at reduced scale and targeted review/Google scenes inspected at readable scale. Original mortgage route and stylesheet retain their pre-change hashes.

## Incumbent combined review brief, 12 October 2026

Carry these decisions together across subsequent turns. A new comment or reference does not replace earlier accepted decisions. Change positioning only with new evidence or a material improvement judged against the same criteria. The latest visual cleanup is not a fresh approval through every strategic lens; that systematic whole-page review remains outstanding.

### Broker buying questions

Read the whole page as an established brokerage principal: will clients return and refer others; does the process support relationships behind ongoing income; can the team deliver consistent service without everything depending on the principal; what does Zapla add around an existing mortgage CRM; is that improvement worth the subscription, setup cost and operational effort? The weakest current argument is incremental value alongside existing software. Do not invent competitor deficiencies or unique capabilities. Demonstrate a real gap between recording clients and consistently acting on relevant next steps, and acknowledge when the existing system already does it well.

### Five buyer awareness stages

Review unaware, problem aware, solution aware, product aware and most aware visitors. Prioritise problem and solution awareness for this industry page without assuming every visitor already recognises a gap or wants automation. Use familiar situations to establish missed contact, stalled opportunities and principal dependency; connect these to commercial consequences without invented figures. Demonstrate the shared process, establish why Zapla earns a place alongside the existing CRM, then explain scope, price and the call. Do not force five awareness stages into five sections. Actual traffic awareness is an assumption until validated.

### Preserve and assess the staggered section

The reference requested a visual break, not an automatic content endorsement. Retain the staggered visual only if it earns its place in the full page. Its job is the bridge between the hero's relationship promise and the mechanisms below. The incumbent proposed revision, not yet implemented, is: “Your client book holds more than past settlements.” Three distinct commercial roles: “Stay their first call” (returning clients), “Earn the next introduction” (referrals), “Be there when plans move” (paused and future opportunities). Avoid implying every new opportunity is already inside the client book. Assess these words for specificity and broker comprehension before adopting them; avoid generic slogans and unnecessary repetition of following sections.

### Positioning and presentation retained

Keep the relationship-led headline and established-principal client-book outcome, repeat and referred business, shared team ownership, and trail income mentioned once as commercial context without guaranteeing commission or discouraging appropriate refinancing. Preserve the separate V2 and unchanged original. Keep the selected staggered layout, editorial human photos, compact Dental-matched glass and consistent Google review visual. Do not restore draft captions, sample opt-out footers or setup commentary in demonstrations. Calls support the mortgage proposition rather than leading it; reactivation is one substantial supporting mechanism, not the entire offer.

### Complete review before approval

Review the complete page and overall website fit through strategy, broker/principal, frontline, client experience, five awareness stages, product marketing, sales/conversion, CFO/competitor, copy, brand/art direction, whole-page rhythm, UI/accessibility, motion, product/data/claims, reputation/referrals and delivery perspectives. Every section must have a distinct buyer job, a supported mechanism where relevant and a reason for its order. Inspect actual desktop/mobile renders, zoomed out and readable details. Identify weaknesses before edits; assess the whole page again after changes. Self-review is not independent broker validation, and scores must not be inflated to satisfy a target.

## Approved dual audience revision and completed holistic review

Implemented the proposal approved after the combined broker and buyer-awareness review. This section supersedes earlier notes saying the fresh systematic review is outstanding. Software starting point is independent of buyer awareness or brokerage maturity: both spreadsheet/inbox users and existing-CRM users are addressed.

### Final page sequence and buyer job

| Section                                | Buyer job                                                                                                                                                                                            |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Relationship-led hero                  | Establish returning/recommending clients as the outcome and explain CRM plus automation in plain language. Explicitly welcome spreadsheet and existing-CRM users.                                    |
| Original staggered recognition         | Recognise a review due, an introduction and a prospect who asks for later contact. Connect each situation to a distinct commercial purpose.                                                          |
| Connected client record, moved earlier | Show conversations, history, owner and next action together. Relevant to a solo broker and a brokerage team. New enquiry is the default example.                                                     |
| After-settlement relationship          | Show an annual/fixed-period review invitation and reply. One mention of trail income alongside repeat business, with no commission guarantee.                                                        |
| Reputation and introductions           | Show neutral Google feedback and a separate personal introduction. Match Dental's visual pattern, without claiming a positive rating or automatic referral engine.                                   |
| Warm and dormant prospects             | Distinguish an agreed future contact from relevant reconnection with a past enquiry. Reduce repeated introductory copy.                                                                              |
| Two software starting points           | Zapla as the client CRM for spreadsheet users, or assessed follow-through gaps around an existing CRM. Keep useful existing workflows in place. Lending tools and broker advice retain their roles.  |
| Guided Launch                          | Explain agreeing the first workflow, importing scoped contacts, configuring messages and response owners, testing and training.                                                                      |
| Plans                                  | Show CRM, inbox and pipelines in Follow-Through; Growth adds client marketing and eligible reactivation. Preserve current prices, setup costs, unlimited users, contact fair use and separate usage. |
| Practical FAQs                         | Answer spreadsheet and existing-CRM objections separately, plus connections, response handling, optional calls/forms, invitations and message control.                                               |
| Final call                             | Identify the first workflow worth fixing and explain setup scope and cost, rather than promise unspecified transformation.                                                                           |

### Five awareness stages

Unaware: familiar situations in the staggered layout and disconnected inbox/spreadsheet/next-action example. Problem aware: missed contact and unclear ownership are recognisable without invented loss figures. Solution aware: the connected record and specific invitation/reply scenes show a practical process. Product aware: the fit section explains both starting points, Guided Launch explains delivery, and pricing makes the CRM foundation visible. Most aware: plan inclusions, setup/usage, FAQs and a concrete call agenda support the next decision. No assumption that all spreadsheet users are unaware or all CRM users are product aware. No five extra awareness sections.

### Lens review after implementation

These are editorial judgments about the implemented marketing page, not independent broker validation, measured conversion rates or verification of a customer's configured automation.

| Lens                                       | Assessment | Evidence and limit                                                                                                                                                                                    |
| ------------------------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Strategy and brokerage owner               | 9/10       | Returning clients, referrals and client-book continuity remain incumbent; reactivation and calls support the wider proposition.                                                                       |
| Dual audience and buying awareness         | 9/10       | Spreadsheet and CRM entry points appear in the opening, fit and FAQs. Situation recognition precedes most product demonstrations.                                                                     |
| Frontline and solo/team use                | 9/10       | One record, named responsibility and next action; solo brokers explicitly included. Lending work stays in its appropriate tools.                                                                      |
| Customer experience and buyer psychology   | 9/10       | Relevant invitations, a simple reply and a personal next conversation; no pressure, implied loan advice or savings promises.                                                                          |
| Copywriting and AI-slop critic             | 8.5/10     | Concrete scenarios and product explanation replace abstract opening copy. Some relationship-led language remains deliberately for brand continuity.                                                   |
| Product marketing and sales                | 8.5/10     | Clear mechanisms, implementation offer and two starting points; no feature-uniqueness claim. A verified brokerage case would strengthen the buying argument.                                          |
| CFO, competitor and investor               | 8.5/10     | Explicit software/setup/usage scope; adding Zapla must solve a useful gap. Import and connections are scoped, not assumed. Incremental customer value remains to be measured.                         |
| Brand, art direction and whole-page rhythm | 9/10       | Approved original photos, staggered break, early dark record scene, cream relationship photo, Dental-matched Google panel, open prospect scene and sage fit band.                                     |
| UI, accessibility and motion               | 9/10       | Responsive full-page renders, readable next-action record, native pressed-state buttons and keyboard FAQs. Full states are immediate with no forced reveal delay.                                     |
| Product, data and claim accuracy           | 9/10       | No invented native integrations, settlements, commission protection, approval, savings, performance metrics or customer testimonials. Current site product/pricing source supports the offered scope. |
| Reputation, referrals and boundaries       | 9/10       | Unselected Google stars and personal introductions, distinct from referral attribution/rewards; borrower permission and advice remain human responsibilities.                                         |
| Website and SEO fit                        | 9/10       | Same shared brand and relevant product links. V2 remains a separate noindex comparison route and the original page is unchanged.                                                                      |

### Validation and remaining evidence

Production build, TypeScript and scoped lint passed. Full-page browser renders checked at 1440, 1024, 768, 390 and 320px, including whole-page overview and readable detail crops. No horizontal overflow, visible illustrative/draft/opt-out captions or browser errors. Final mobile fit layouts inspected at 390 and 320px. All three record examples, both prospect modes, fixed-rate review and keyboard spreadsheet FAQ tested. Glass and Google screen computed styles continue to match Dental. Trail income appears once. Original mortgage route and stylesheet retain their pre-change SHA-256 hashes.

The remaining commercial evidence gap is an approved brokerage case demonstrating measured incremental value. Do not fill it with simulated settlements, invented revenue or an assertion that every lens is 9/10. Hosted source sync is checked separately from local visual QA; this review does not claim a signed-in hosted-browser test.

## Visual consistency correction — 12 October 2026

This supersedes the earlier visual acceptance and its statement that matching computed glass values was enough. The client identities were absent and the invitation controls and large headings made the photo cards appear heavier. Review included the supplied screenshots, the actual Dental recall/reply render, the V2 hero, the whole-page overview and detailed desktop, tablet and phone renders.

- All five photo cards now use one lighter frosted surface: 84% cream, 6px blur, the same white border, inner edge, shadow, radius and 20px padding. Dental's reply structure, portrait sprite and petal distinction remain the reference; its 91% surface is not changed. Differences caused by the photo behind the glass are expected. The opaque Google interface and cream referral conversation retain their distinct surface roles.
- Priya has the same portrait in the hero, review reply and selected client record. Alex and Sam have distinct portraits in their respective records; Sam's referral reply uses his record portrait. Actual client messages use portraits, automated brokerage messages use the Zapla petal. No client avatar is attached to an outgoing brokerage invitation.
- Annual/fixed-rate controls moved above the photo, outside the invitation. The review invitation is 300px wide and its headline is 24px; the prospect invitation is 290px on desktop with the same typography. Client replies use the Dental avatar-plus-text hierarchy. Photos and faces remain the focus.
- The tablet hero cards no longer overlap. The mobile prospect grid can shrink to its container; explicit card bounds catch clipping even when the page's overflow is clipped. On phones, replies flow below the photo rather than cover faces.

Validation: production build, TypeScript, scoped ESLint and diff checks passed. Browser renders checked at 1440, 1024, 768, 390 and 320px, including detailed hero, review, prospect and referral crops. Annual/fixed-rate and warm/dormant states checked; all three record selections show the correct portrait. Keyboard FAQ and 44px button heights verified. Images load, no runtime errors, no page overflow, and all photo-card horizontal bounds fit at the checked tablet and phone widths after the correction. The original mortgage route/style retain their baseline hashes. Strategic content, both software starting points, staggered recognition, Google composition and root navigation/footer are preserved. This is local rendered QA plus hosted source-sync verification, not a claim of independent user testing or certainty across every browser.
