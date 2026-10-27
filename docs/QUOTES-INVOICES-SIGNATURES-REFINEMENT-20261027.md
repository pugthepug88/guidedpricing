# Quotes, Invoices & Signatures refinement

27 October 2026. Supersedes the previous composition assessment, not the established capability boundaries.

## Before implementation

Read current main bffde531, AGENTS, the full build protocol, design guardrails, feature brief including current corrections, motion system, the complete target page/styles and the current Inbox and Chatbot components. Inspected the current rendered Quotes opening/signing scene and the current Inbox and Chatbot openings. Read the supplied DO-NOT-BE-A-YES-MAN instructions. GitHub is authoritative; Lovable remains read-only. Preserve the H1, final CTA, root-owned shell, Platform, /booking and draft indexing.

USE the current outcome headline, same-customer document arithmetic, actual Zapla wordmark, portraits and workshop photo. ADAPT the existing feature pages' compact product proportions and open/enclosed rhythm. REJECT another feature catalogue, automatic quote morph/conversion, extra colour bands, dummy financial/signing submissions and additional decorative motion.

The buyer question for signing is: what does my customer do, and when is the document recorded? The visual will show review, assigned signature/initial/date fields, explicit finish and confirmation, then the completed business record. The signature is not recorded merely because a field is filled. The alternative of just fading status text is rejected as insufficient proof. Initial complete state and static/reduced-motion equivalents remain useful. User-triggered playback runs once, supports pause/continue/replay, suspends offscreen/hidden and holds the result. No forced scroll or loop.

The buyer question for payments is: what happens after the customer opens the invoice? Retain full/deposit/instalment choices, show the customer choosing an enabled method and explicitly confirming the requested amount, then show receipt plus the corresponding amount paid, remaining balance and Paid/Partially Paid invoice record. Keep invoice creation a separate staff step. Do not collect payment details or call any product/processor service. The only actual action is Watch payment.

Re-read the current official English Help Centre payload on 27 October 2026: https://app.thenextgencrm.com/help-content/en.json. p/sign/[token] documents outstanding-field counts, assigned fields, adopt/draw/type, Finish & Submit, confirmation and success. p/signatures/[id] documents Signed/Pending and Completed only after all signers. p/i/[id] documents enabled payment methods, full/deposit/instalment amounts, explicit provider confirmation and updated invoice status, amount paid and balance. invoices documents Paid, Partially Paid, Open and Void. These sources support a prepared causal scene, not a live account execution claim. All exclusions in QUOTES-INVOICES-SIGNATURES-EVIDENCE.md remain.

Proportions: compact quote with meaningful linked references to the separate scope and invoice; a bounded paper signing surface beside its business record; one readable customer invoice with a clearly distinguished business ledger; combined workshop/customer context rather than a photograph followed by another long chapter. Shorten repeated prose without shrinking main body text.

## Implementation and checks

The quote paper is more compact and now includes meaningful links to the separate scope and invoice. The H1 and final CTA are unchanged. Main explanatory copy is shortened. The workshop image and customer documents form one chapter, with both people and their work visible in the inspected desktop crop. The customer document list uses the fixed invoice total rather than a stale Open status that would contradict the payment result.

Signing now has six cumulative states: review; adopted signature; initials/date complete; Finish & Submit; confirmation; recorded signature. The thresholds are 1.6, 3.2, 4.8, 6.2 and 7.6 seconds. The request stays Sent and the signer Pending through field completion and confirmation. The final state is Signed/Completed. The action region contains scripted native text and a meaningful pointer, not an interactive signing or submission control. Filled signature fields use a solid boundary; the empty field is dashed. Reserved action/payoff space reduces state-dependent movement.

Payment now has four states: invoice review; enabled Card method selected; explicit provider confirmation of the selected amount; payment received and the corresponding business ledger. Thresholds are 1.8, 3.6 and 5.6 seconds. Full payment records A$3,300 paid, A$0 balance, Paid. Deposit records A$990 paid, A$2,310 balance, Partially Paid. First instalment records A$1,650 paid, A$1,650 balance, Partially Paid, with the second scheduled payment still visible. Selecting an arrangement cancels a previous run and shows that arrangement’s complete result. Watch starts a new local sequence; no payment form, visitor data or processor API is involved.

Production build, TypeScript, targeted component ESLint, SEO policy, Prettier and whitespace checks passed for the initial implementation. The production build also emitted the existing bundler warnings for motion library module directives. No dependency inputs changed. The final production build, TypeScript, targeted ESLint, SEO, formatting and whitespace checks also pass after the small stability corrections.

## Rendered coverage so far

The ea029648 branch build passed Vercel and Cloudflare. The actual Cloudflare commit preview was inspected at https://1bcf94bc-guidedpricing.jinrcao.workers.dev/features/quotes-invoices-signatures in the normal 1692 × 762 browser view. Lovable was used read-only for the incumbent and reference pages, not modified.

Inspected the opening, compact quote and related-document links, signing paper and business record, payment invoice and ledger, and combined workshop/customer-context chapter. Signing playback was observed at review, filled-fields-but-Pending, explicit confirmation-but-Pending and final Signed/Completed. Pause/Continue work. The revised actor/action relation is clearer than the earlier status-only treatment. A text wait missed a short transient signing beat during one automation attempt; later paused-state inspection established the relevant intermediate state. This is not recorded as a product failure or a successful observation of every animation frame.

Payment review, selected Card, explicit provider confirmation and completed deposit were inspected. Before confirmation the invoice is Open with A$0 paid and A$3,300 outstanding. After payment it is Partially Paid with A$990 paid and A$2,310 outstanding. Native ArrowDown changes deposit to instalments and updates the completed ledger to A$1,650 paid and A$1,650 remaining. Full-payment initial state shows Paid and a zero balance. Keyboard Enter operates Pause/Continue. No real signature or financial transaction was executed.

## Remaining verification and delivery gate

Browser access was interrupted while moving to FAQ/responsive review, then reported that the originating browser context was unavailable. The final small solid-field/reserved-space corrections have not yet been inspected in the browser. Do not claim current phone/tablet verification, completed FAQ testing, runtime offscreen/hidden-tab suspension, reduced-motion/JavaScript-disabled sessions, screen-reader/cross-browser testing, live account acceptance, owner approval or a 9/10 score. The guards and complete server-rendered defaults are reviewed in source only.

PR #207 remains a draft until rendered phone/tablet and final-state review can resume. The standing build protocol requires rendered quality review; source checks alone do not close that gate. No main merge, Lovable builder prompt or separate production Publish action has been performed for this refinement.

## Review lenses

These are separate lenses applied by the implementation agent, not independent-agent or owner approval.

| Lens                         | Finding                                                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Owner/frontline              | Clear separate scope/signature/payment responsibilities; a deposit no longer risks reading as a fully paid job.                                   |
| Product marketing/conversion | Customer action now precedes the recorded result. Actual scope/arithmetic and existing-tools setup remain, with less repeated prose.              |
| Brand/creative               | The compact paper, restrained stone/charcoal and combined human context retain Zapla’s language. No added feature-card catalogue or colour bands. |
| UI/UX                        | Native payment radios, keyboard playback and adjacent status feedback work in the inspected desktop view. Responsive sign-off is still open.      |
| Motion                       | One short causal run, explicit pause/continue/replay and completed hold. Latest reserved-space refinements need rendered verification.            |
| Copy/buyer psychology        | Preserve the strong promise, remove repeated explanations and show deliberate customer commitment without legal or payment-speed guarantees.      |
| Technical/AI-slop            | Page-scoped source; no new dependency, dummy action, invented performance data, live service or automatic conversion promise.                     |
