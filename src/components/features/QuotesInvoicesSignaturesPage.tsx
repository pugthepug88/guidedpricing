import { Check, Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/quotes-invoices-signatures.css";

// Prepared document illustrations, not live records or payment controls.
// Secondary document text is deliberately abstracted. No service is called.
function Portrait() {
  return (
    <span
      className="qi-portrait"
      aria-hidden="true"
      style={{
        backgroundImage: "url('/concept/revenue/soft-autumn-portraits-v1.webp')",
        backgroundSize: "600% 400%",
        backgroundPosition: "20% 100%",
      }}
    />
  );
}

function Logo() {
  return (
    <img
      className="qi-product-logo"
      src="/concept/zapla-logo-dark.svg"
      alt="Zapla"
      width="96"
      height="29"
    />
  );
}

function BookCall() {
  return (
    <a className="qi-button" href="/booking">
      Book a Call
    </a>
  );
}

function DocumentLines({ short = false }: { short?: boolean }) {
  return (
    <div className={"qi-document-lines" + (short ? " qi-lines-short" : "")} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function QuoteIllustration() {
  return (
    <div className="qi-quote-stage">
      <article className="qi-quote-paper" aria-label="A quote for Priya Shah’s reception signage">
        <header className="qi-paper-brand">
          <Logo />
          <span>Quote</span>
        </header>
        <div className="qi-quote-title">
          <p>Prepared for Priya Shah</p>
          <h2>Reception signage</h2>
        </div>
        <div className="qi-quote-items">
          <div>
            <span>Design &amp; artwork</span>
            <i className="qi-amount-line" aria-hidden="true" />
          </div>
          <div>
            <span>Supply &amp; installation</span>
            <i className="qi-amount-line" aria-hidden="true" />
          </div>
        </div>
        <div className="qi-quote-total">
          <strong>Total</strong>
          <span className="qi-total-line" aria-hidden="true" />
        </div>
        <div className="qi-quote-terms">
          <span>Scope &amp; terms</span>
          <DocumentLines short />
        </div>
      </article>
    </div>
  );
}

function SigningIllustration() {
  return (
    <article className="qi-sign-paper" aria-label="Priya’s signed scope of work">
      <header className="qi-paper-brand">
        <Logo />
        <span>Scope of work</span>
      </header>
      <DocumentLines />
      <dl className="qi-signature-fields">
        <div className="qi-signature">
          <dt>Signature</dt>
          <dd>Priya Shah</dd>
        </div>
        <div>
          <dt>Initials</dt>
          <dd className="qi-initials">PS</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>27 Oct 2026</dd>
        </div>
      </dl>
      <p className="qi-signed-result">
        <Check size={20} aria-hidden="true" />
        <span>Signed and submitted by Priya</span>
      </p>
    </article>
  );
}

function InvoiceIllustration() {
  return (
    <div className="qi-invoice-stage">
      <article className="qi-invoice-paper" aria-label="Priya’s invoice with payment received">
        <header className="qi-paper-brand">
          <Logo />
          <span>Invoice</span>
        </header>
        <div className="qi-invoice-customer">
          <h3>Reception signage</h3>
          <p>Priya Shah</p>
        </div>
        <div className="qi-invoice-rows" aria-hidden="true">
          <div>
            <span />
            <i />
          </div>
          <div>
            <span />
            <i />
          </div>
          <div>
            <span />
            <i />
          </div>
        </div>
        <dl className="qi-paid-amount">
          <dt>Amount paid</dt>
          <dd>A$3,300</dd>
        </dl>
        <p className="qi-payment-result">
          <Check size={21} aria-hidden="true" />
          <span>Payment received</span>
        </p>
      </article>
    </div>
  );
}

const FAQS = [
  [
    "Can I use my own products, prices and terms?",
    "Yes. Add your products or services, quantities, tax, customer notes and terms. Quote and invoice numbering can also be configured.",
  ],
  [
    "Can I use PDFs and add more than one signer?",
    "Yes. Upload a PDF or build a document, then assign signature, initials and date fields to the right people. See who is pending and who has signed.",
  ],
  [
    "Does the customer need an account to sign?",
    "No. They open their personal signing link, review the document, complete their fields and submit. Signing works on a phone, tablet or computer.",
  ],
  [
    "Can I request deposits or instalments?",
    "Yes. Configure a deposit or dated instalment schedule. The invoice shows the requested amount and remaining balance.",
  ],
  [
    "Does signing automatically collect payment?",
    "Signing records the agreement. Prepare and share the invoice separately when it’s time to bill. The customer then pays through the options you’ve enabled.",
  ],
  [
    "What if I already use accounting software?",
    "We review your current tools and agree where Zapla fits. Any required connection is checked before recommending a change.",
  ],
  [
    "What setup and payment fees apply?",
    "Guided Launch is required for a new standard plan and priced separately. Payment connections include Stripe, PayPal and Authorize.Net. Available methods, provider charges and any applicable usage costs are confirmed for your setup.",
  ],
] as const;

export function QuotesInvoicesSignaturesPage() {
  return (
    <main className="zapla-feature zapla-quotes" data-page="quotes-invoices-signatures">
      <section className="qi-hero" aria-labelledby="qi-title">
        <div className="qi-wrap qi-hero-layout">
          <div className="qi-hero-copy">
            <p className="qi-eyebrow">Quotes, Invoices &amp; Signatures</p>
            <h1 id="qi-title">
              Quote the work.
              <br />
              Get it signed.
              <br />
              Get paid.
            </h1>
            <p className="qi-lead">
              Keep your quotes, signed documents and invoice payments together in Zapla.
            </p>
            <div className="qi-actions">
              <BookCall />
              <a className="qi-text-link" href="#qi-signatures">
                Explore the documents
              </a>
            </div>
          </div>
          <QuoteIllustration />
        </div>
      </section>

      <section className="qi-sign-section" id="qi-signatures" aria-labelledby="qi-sign-heading">
        <div className="qi-wrap qi-sign-layout">
          <div className="qi-sign-copy">
            <p className="qi-eyebrow">Documents &amp; e-signatures</p>
            <h2 id="qi-sign-heading">Signed. Without the print and scan.</h2>
            <p>
              Upload a PDF or build your document. Your customer reviews and signs through a
              personal link.
            </p>
          </div>
          <SigningIllustration />
        </div>
      </section>

      <section className="qi-section qi-payments" aria-labelledby="qi-payment-heading">
        <div className="qi-wrap qi-payment-layout">
          <InvoiceIllustration />
          <div className="qi-payment-copy">
            <p className="qi-eyebrow">Invoices &amp; online payments</p>
            <h2 id="qi-payment-heading">A clear way to pay.</h2>
            <p>
              Share the invoice link. Customers pay online, and you can see the payment against
              their invoice.
            </p>
            <p className="qi-payment-options">Full payment, deposits or instalments.</p>
          </div>
        </div>
      </section>

      <section className="qi-context" aria-labelledby="qi-context-heading">
        <div className="qi-wrap qi-context-layout">
          <figure className="qi-work-photo">
            <img
              src="/concept/quotes/signage-workshop-20261026.webp"
              width="1536"
              height="1024"
              alt="Two signage professionals checking a reception sign and materials in their workshop"
              loading="lazy"
            />
          </figure>
          <div className="qi-context-copy">
            <p className="qi-eyebrow">Connected to the customer</p>
            <h2 id="qi-context-heading">Keep it with the customer.</h2>
            <p>
              Find the quote, signed document and invoice alongside the customer’s other details.
            </p>
            <div className="qi-customer">
              <Portrait />
              <div>
                <strong>Priya Shah</strong>
                <span>Quote · Signed scope · Invoice</span>
              </div>
            </div>
            <a className="qi-text-link" href="/crm">
              Explore the connected CRM
            </a>
          </div>
        </div>
      </section>

      <section className="qi-section qi-closing" aria-labelledby="qi-launch-heading">
        <div className="qi-wrap qi-setup-panel">
          <div className="qi-launch-copy">
            <p className="qi-eyebrow">Guided Launch</p>
            <h2 id="qi-launch-heading">
              Your process.
              <br />
              Set up with you.
            </h2>
            <p>
              Bring your current paperwork. We’ll agree your documents, signing fields and payment
              setup, including where your existing tools fit.
            </p>
            <a className="qi-text-link" href="/booking">
              Talk through your setup
            </a>
            <p className="qi-setup-terms">
              Guided Launch is required for a new standard plan and priced separately.
            </p>
          </div>
          <div
            className="qi-faq"
            aria-label="Practical questions about quotes, signatures and invoices"
          >
            {FAQS.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <Plus size={19} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="qi-final">
        <div className="qi-wrap">
          <div className="qi-final-petal">
            <ZaplaPetal size={34} />
          </div>
          <p className="qi-eyebrow">See it around your business</p>
          <h2>See your quoting and payment process in Zapla.</h2>
          <p>
            Bring the way you quote, get agreement and bill today. We’ll show you the customer
            experience and map the setup your team needs.
          </p>
          <BookCall />
        </div>
      </section>
    </main>
  );
}
