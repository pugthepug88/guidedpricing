# Quotes, Invoices & Signatures

Evidence and composition brief, 26 October 2026. Page: `/features/quotes-invoices-signatures`.

## Authority and scope

Read current `main` at `7940583c`, AGENTS, the complete build protocol, design guardrails, feature brief including superseding corrections, motion system, and the supplied DO-NOT-BE-A-YES-MAN instructions. Reviewed the current rendered Inbox, Pipeline, Chatbot, Calendars, Automation, homepage and Receptionist; reviewed complete Inbox and Pipeline components and the shared architecture. Lovable is read-only. GitHub owns source changes. Preserve the root-owned navigation/footer, Platform structure, `/booking`, noindex and sitemap exclusion. No production Publish action.

Primary product evidence: current official [English Help Centre payload](https://app.thenextgencrm.com/help-content/en.json), retrieved 26 October 2026, exposed through [Help Centre](https://app.thenextgencrm.com/help-centre.html?lang=en). This is documentation evidence, not a live customer-account acceptance test. No GHL inheritance.

| Article key | Supported behaviour |
| --- | --- |
| `quotes/create` | Choose an existing customer or add one; select products/prices, quantities and item-level tax; add line items, customer notes, terms and optional dated instalments; save a quote. Quotes are not payable. |
| `quotes` | Customer, number, dates, amount and status; search, selected columns, folders and configurable numbering. Manual statuses include Draft, Sent, Accepted, Declined, Expired and Void. View Public is documented here, but public sharing conflicts with the create article; do not base the page on unverified quote-link acceptance. |
| `signatures` | Upload a PDF or build a document, add signers, manage Draft/Sent/Completed and inspect signer counts. |
| `forms/signatures/[id]/builder` | Add named contacts/users as signers; headings/text plus assigned signature/initial/date fields; multiple pages; save and publish; master and individual signer links. |
| `forms/signatures/[id]/send` | Review recipients, save without sending or deliberately send to all listed recipients; individual Signed/Pending states. |
| `p/sign/[token]` | Open a personal signing link without creating an account; review highlighted assigned fields; type/draw/adopt signatures and initials; touch support; finish and confirm before recording; completed confirmation. |
| `p/signatures/[id]` | Read-only document with signer statuses and signed dates; print/save PDF. Completed means all signers have signed. |
| `payments/invoices/create` | Select customer/products, quantities, tax, coupon and optional dated instalments; totals; save separately from publishing; published invoice gets a web link. |
| `invoices` | Number/customer/date/due/amount/status; search, selected columns, folders, numbering, editing and manual status changes. Overdue styling is documented. |
| `p/i/[id]` | Public invoice details/totals; enabled methods; configured deposit or instalment payments; amount paid/balance due; payment confirmation; print/PDF. Deposits/instalments are configured, not an automatic option on every invoice. |
| `integrations` | Stripe, PayPal and Authorize.Net connections. Invoice payment choices depend on the connected provider and invoice settings. No universal method/country support or fee claim. |
| `contacts/[id]` | Customer profile gathers messages, notes, invoices, payments and other activity; its tabs include signatures. Quotes separately select the customer. The page's concise document list is an explanatory consolidation, not a claim that the exact drawn list is a native CRM tab. |

## Conflicts and excluded promises

`quotes/create` describes later quote conversion; `quotes` expressly says there is no conversion option. Do not promise one-click or automatic quote-to-invoice conversion. Quote acceptance is not a signature. A signature does not automatically create an invoice or charge a card. Staff prepare the invoice as a separate step.

The current public application entry explicitly imports `nodes/119.DZnrBvQO.js` and `nodes/120.CZXAIF_g.js`, which import the Quotes list (`chunks/DyII4cM3.js`) and create editor (`chunks/C4_qxEZa.js`). These were read as primary client evidence. The list contains a View Public destination and manual status handlers, and marketing strings mention conversion; that does not establish an executed conversion flow. The bounded claim decision above is retained. No authenticated account was changed or product data submitted.

Do not assert automatic quote delivery/acceptance, quote-view tracking, automatic invoice reminders, recurring billing, Xero/MYOB/QuickBooks sync, bank reconciliation, legal enforceability/certification, tamper evidence, audit certificates, signer order, unlimited signatures/payments, included processor fees or guaranteed payment speed. The current Automation audit also does not establish a native Invoice Overdue trigger. Related follow-up belongs to the existing solution page and configured workflow scope.

## Story and composition blueprint

Commercial promise: **Quote the work. Get it signed. Get paid.** The alternative of three equal feature tiles was rejected: it describes a menu without proving the customer experience. A single automatically morphing quote/signature/invoice was rejected because it would imply the unsupported conversion chain.

- Opening: warm-white split composition, large ink heading, readable white quote on one local stone material surface. Products, quantities, GST, scope and terms answer what is being agreed. Keep paper aligned and all copy native. A shallow quotes register adds useful status/numbering proof without another dashboard or large coloured band.
- Signing: one contained charcoal chapter. White scope document beside its signer record, preserving Priya and the same job. A discoverable Watch signing button demonstrates opening/review, completing assigned fields and explicit submission. The complete state is initially useful. One run holds; no timed reset, scrolling requirement or live service. Final status appears only after submission.
- Invoices: open white composition. Three actual payment-plan choices change due-now, dated schedule and remaining balance together. A single invoice surface shows the same total and customer. No dummy Pay/Send/Download control and no payment details collected.
- Human context: fresh workshop panorama; useful customer-linked document list follows in normal flow, with no floating cards across faces. The business does the skilled work; staff deliberately manage the documents. No fabricated testimonial or unattended automation promise.
- Adoption: open Guided Launch scope, then a single rounded neutral FAQ container. Required separate initial-setup pricing and provider/usage terms stay meaningful and visible. Established final CTA/petal/type scale flows into the unchanged shared sky/footer.

Motion proportions: one roughly 600px-wide signature document and compact 300px record on desktop; no stacked/tilted cards. Review holds 1.5s, entered fields appear at 2.8s, explicit submission completes at 4.2s; then hold. One movement idea, subtle state opacity only, no layout jumps. Pause while offscreen/tab hidden. Reduced motion immediately retains the complete result; no-JavaScript has all substantive content and completed states. Smaller viewports stack the entire sequence in normal flow.

Reference classification: USE Zapla palette, fonts, exact logo, portraits and CTA; ADAPT previous pages' grain/glass distinction, compact proof and restrained colour coverage; REJECT repeated conversation windows, pastel feature tiles, decorative edge glows, empty cards, fake metrics, scroll traps and repetitive public prototype disclaimers.

## Prepared record provenance

Fictional reception-signage job for Priya Shah; Alex Chen is the staff contact. Design/artwork A$1,200 plus manufacture/installation A$1,800 = subtotal A$3,000, GST A$300, total A$3,300. These are coherent document values necessary to explain tax, deposits and instalments, not Zapla prices, customer results, revenue or performance evidence. Deposit is A$990 (30%); remaining balance A$2,310. Two instalments are A$1,650 each, on 10 and 24 November 2026. Document signature date is 27 October 2026. No real person, enquiry, payment or signature is transmitted.

Sources, prepared-state provenance, implementation review and test limitations stay in internal records; do not repeat illustrative/sample captions or placeholder addresses on the marketing page.
