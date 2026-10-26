import { useEffect, useRef, useState } from "react";
import { Check, Play, Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/quotes-invoices-signatures.css";

// Fixed, fictional document values. No live customer, signing or payment APIs.
const JOB = {
  customer: "Priya Shah",
  title: "Reception signage",
  quote: "Q-2026-0042",
  invoice: "INV-2026-0042",
  items: [
    { name: "Design & artwork", detail: "Artwork and production files", amount: 1200 },
    {
      name: "Manufacture & installation",
      detail: "Reception sign, supplied and fitted",
      amount: 1800,
    },
  ],
  subtotal: 3000,
  tax: 300,
  total: 3300,
};
const money = (value: number) =>
  `A$${value.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function Portrait({ cell = 3 }: { cell?: number }) {
  return (
    <span
      className="qi-portrait"
      aria-hidden="true"
      style={{
        backgroundImage: "url('/concept/revenue/soft-autumn-portraits-v1.webp')",
        backgroundSize: "600% 400%",
        backgroundPosition: `${((cell % 6) / 5) * 100}% ${(Math.floor(cell / 6) / 3) * 100}%`,
      }}
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

function QuoteDocument() {
  return (
    <div className="qi-quote-stage">
      <article className="qi-quote-paper" aria-label="Reception signage quote for Priya Shah">
        <header className="qi-document-brand">
          <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width="105" height="30" />
          <span>Quote</span>
        </header>
        <div className="qi-document-title">
          <p>{JOB.quote}</p>
          <h2>{JOB.title}</h2>
          <div className="qi-quote-recipient">
            <span>Prepared for</span>
            <strong>{JOB.customer}</strong>
          </div>
        </div>
        <table className="qi-line-items">
          <caption className="qi-sr-only">
            Quoted services and amounts in Australian dollars
          </caption>
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Qty</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {JOB.items.map((item) => (
              <tr key={item.name}>
                <th scope="row">
                  {item.name}
                  <span>{item.detail}</span>
                </th>
                <td>1</td>
                <td>{money(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <dl className="qi-quote-totals">
          <div>
            <dt>Subtotal</dt>
            <dd>{money(JOB.subtotal)}</dd>
          </div>
          <div>
            <dt>GST · 10%</dt>
            <dd>{money(JOB.tax)}</dd>
          </div>
          <div className="qi-document-total">
            <dt>Total</dt>
            <dd>{money(JOB.total)}</dd>
          </div>
        </dl>
        <div className="qi-quote-terms">
          <div>
            <strong>Included in the scope</strong>
            <p>Artwork, manufacture and installation of your reception sign.</p>
          </div>
          <div>
            <strong>Before production</strong>
            <p>Final artwork to be approved. Quote valid until 10 November.</p>
          </div>
        </div>
      </article>
    </div>
  );
}

function QuoteOverview() {
  return (
    <div className="qi-wrap qi-overview">
      <div className="qi-overview-copy">
        <h2>A price they can understand. A quote you can find.</h2>
        <p>
          Choose the customer, add products or services, and set the quantities, tax and terms. Keep
          quotes organised by customer and status, with numbering that fits your business.
        </p>
        <a className="qi-text-link" href="/quote-follow-up">
          Explore quote follow-up
        </a>
      </div>
      <div className="qi-quote-register" aria-label="Quotes organised by customer and status">
        <div className="qi-register-heading">
          <h3>Your quotes</h3>
          <span>Customer, scope and status</span>
        </div>
        <div className="qi-register-row">
          <div>
            <strong>{JOB.customer}</strong>
            <p>{JOB.title}</p>
          </div>
          <span>{JOB.quote}</span>
          <strong className="qi-sent">Sent</strong>
        </div>
        <div className="qi-register-row">
          <div>
            <strong>Daniel Brooks</strong>
            <p>Window graphics</p>
          </div>
          <span>Q-2026-0041</span>
          <strong className="qi-accepted">Accepted</strong>
        </div>
        <div className="qi-register-row">
          <div>
            <strong>Rachel Evans</strong>
            <p>Wayfinding signs</p>
          </div>
          <span>Q-2026-0040</span>
          <strong>Draft</strong>
        </div>
      </div>
    </div>
  );
}

const SIGNING_BEATS = [
  "Priya opens her personal signing link.",
  "She reviews the scope and the fields assigned to her.",
  "She completes her signature, initials and date.",
  "Priya finishes and submits. Her signed document is recorded.",
];

function SigningScene() {
  // Start complete so the initial / server-rendered scene is useful without motion.
  const [stage, setStage] = useState(3);
  const [playing, setPlaying] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const [reduced, setReduced] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    setEnhanced(true);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(preference.matches);
      if (preference.matches) {
        setStage(3);
        setPlaying(false);
      }
    };
    sync();
    preference.addEventListener("change", sync);
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    if (scene.current) observer.observe(scene.current);
    return () => {
      preference.removeEventListener("change", sync);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    let elapsed = 0;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      if (visible.current && !document.hidden) elapsed += Math.min(now - last, 150);
      last = now;
      setStage(elapsed >= 4200 ? 3 : elapsed >= 2800 ? 2 : elapsed >= 1500 ? 1 : 0);
      if (elapsed >= 4200) setPlaying(false);
    }, 100);
    return () => window.clearInterval(timer);
  }, [playing]);

  const watch = () => {
    if (reduced) {
      setStage(3);
      return;
    }
    setStage(0);
    setPlaying(true);
  };
  const entered = stage >= 2;
  const submitted = stage === 3;

  return (
    <div className="qi-sign-scene" ref={scene} data-stage={stage}>
      <div className="qi-sign-playback">
        <p role="status" aria-live="polite">
          {SIGNING_BEATS[stage]}
        </p>
        <button
          className="qi-watch"
          type="button"
          hidden={!enhanced || reduced}
          disabled={playing}
          onClick={watch}
          aria-controls="qi-signing-document qi-signer-record"
        >
          <Play size={16} aria-hidden="true" />
          {playing ? "Signing in progress" : "Watch signing"}
        </button>
      </div>
      <div className="qi-sign-workspace">
        <article className="qi-sign-paper" id="qi-signing-document">
          <header>
            <span>Customer view</span>
            <strong>{submitted ? "Signing complete" : "Review your document"}</strong>
          </header>
          <p className="qi-document-kind">Scope of work</p>
          <h3>{JOB.title}</h3>
          <p>
            Design, manufacture and installation of reception signage, as detailed in quote{" "}
            {JOB.quote}.
          </p>
          <div className="qi-scope-clause">
            <strong>Artwork approval</strong>
            <p>Final artwork is approved before manufacture. Installation is arranged with you.</p>
          </div>
          <div className="qi-signature-field" data-entered={entered}>
            <span>Customer signature · {JOB.customer}</span>
            <strong className="qi-handwriting">{entered ? JOB.customer : "Your signature"}</strong>
          </div>
          <div className="qi-sign-fields">
            <div>
              <span>Initials</span>
              <strong>{entered ? "PS" : "Your initials"}</strong>
            </div>
            <div>
              <span>Date</span>
              <strong>{entered ? "27 October 2026" : "Signing date"}</strong>
            </div>
          </div>
          <div className="qi-sign-result">
            {submitted ? <Check size={17} aria-hidden="true" /> : null}
            <p>
              {submitted
                ? "Finished and submitted by Priya Shah."
                : entered
                  ? "Fields complete. Priya reviews before submitting."
                  : "Complete the fields, then finish and submit."}
            </p>
          </div>
        </article>
        <aside
          className="qi-signer-record"
          id="qi-signer-record"
          aria-label="Your signature document record"
        >
          <p>Your document record</p>
          <h3>Who has signed?</h3>
          <div className="qi-signer-person">
            <Portrait />
            <div>
              <strong>{JOB.customer}</strong>
              <span>{submitted ? "Signed · 27 October 2026" : "Awaiting submission"}</span>
            </div>
          </div>
          <dl>
            <div>
              <dt>Document</dt>
              <dd>Reception signage scope</dd>
            </div>
            <div>
              <dt>Signature request</dt>
              <dd className={submitted ? "qi-signed" : ""}>{submitted ? "Completed" : "Sent"}</dd>
            </div>
          </dl>
          <p className="qi-signer-payoff">
            {submitted
              ? "View the completed document and save a PDF copy."
              : "The request stays open until Priya finishes and submits."}
          </p>
        </aside>
      </div>
    </div>
  );
}

type PaymentPlan = "full" | "deposit" | "instalments";
const PAYMENT_PLANS: { id: PaymentPlan; name: string; copy: string; due: number }[] = [
  { id: "full", name: "Full payment", copy: "One invoice. One amount to pay.", due: 3300 },
  {
    id: "deposit",
    name: "Deposit first",
    copy: "Request 30% now, with the balance still visible.",
    due: 990,
  },
  {
    id: "instalments",
    name: "In instalments",
    copy: "Set dated amounts across a payment schedule.",
    due: 1650,
  },
];

function PaymentScene() {
  const [plan, setPlan] = useState<PaymentPlan>("full");
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(true), []);
  const selected = PAYMENT_PLANS.find((item) => item.id === plan)!;
  return (
    <section className="qi-section qi-payments" aria-labelledby="qi-payment-heading">
      <div className="qi-wrap qi-payment-layout">
        <div className="qi-payment-copy">
          <p className="qi-eyebrow">Invoices & online payments</p>
          <h2 id="qi-payment-heading">Give them a clear way to pay.</h2>
          <p>
            When you’re ready to bill, create an invoice for the customer and share its payment
            link. They can review the charges and pay through the methods you’ve enabled.
          </p>
          <fieldset className="qi-payment-choices" disabled={!enhanced}>
            <legend>Choose a payment arrangement</legend>
            {PAYMENT_PLANS.map((item) => (
              <label key={item.id} className={plan === item.id ? "qi-chosen" : ""}>
                <input
                  type="radio"
                  name="qi-payment-plan"
                  value={item.id}
                  checked={plan === item.id}
                  onChange={() => setPlan(item.id)}
                  aria-controls="qi-invoice-preview"
                />
                <span>
                  <strong>{item.name}</strong>
                  <span>{item.copy}</span>
                </span>
              </label>
            ))}
          </fieldset>
          <p className="qi-provider-note">
            Connect your payment provider, then choose the options for each invoice.
          </p>
        </div>
        <div className="qi-invoice-stage">
          <article
            className="qi-invoice"
            id="qi-invoice-preview"
            aria-live="polite"
            aria-atomic="true"
          >
            <header>
              <span>Invoice for {JOB.customer}</span>
              <span>{JOB.invoice}</span>
            </header>
            <h3>{JOB.title}</h3>
            <dl className="qi-invoice-lines">
              {JOB.items.map((item) => (
                <div key={item.name}>
                  <dt>{item.name}</dt>
                  <dd>{money(item.amount)}</dd>
                </div>
              ))}
              <div>
                <dt>GST · 10%</dt>
                <dd>{money(JOB.tax)}</dd>
              </div>
              <div className="qi-invoice-total">
                <dt>Invoice total</dt>
                <dd>{money(JOB.total)}</dd>
              </div>
            </dl>
            {plan === "instalments" ? (
              <div className="qi-payment-schedule">
                <h4>Payment schedule</h4>
                <div>
                  <span>10 November</span>
                  <strong>{money(1650)}</strong>
                </div>
                <div>
                  <span>24 November</span>
                  <strong>{money(1650)}</strong>
                </div>
              </div>
            ) : (
              <div className="qi-payment-schedule">
                <h4>{plan === "deposit" ? "Deposit arrangement" : "Payment due"}</h4>
                <div>
                  <span>{plan === "deposit" ? "30% deposit" : "10 November"}</span>
                  <strong>{money(selected.due)}</strong>
                </div>
                <div>
                  <span>{plan === "deposit" ? "Balance after deposit" : "Amount paid"}</span>
                  <strong>{money(plan === "deposit" ? 2310 : 0)}</strong>
                </div>
              </div>
            )}
            <div className="qi-payment-due">
              <div>
                <span>
                  {plan === "deposit"
                    ? "Deposit to pay"
                    : plan === "instalments"
                      ? "First instalment"
                      : "Amount to pay"}
                </span>
                <strong>{money(selected.due)}</strong>
              </div>
              <p>
                {plan === "full"
                  ? "Review your invoice. Pay online."
                  : `${money(JOB.total - selected.due)} remains after this payment.`}
              </p>
            </div>
          </article>
          <div className="qi-provider-row" aria-label="Documented payment provider connections">
            <span>Payment connections</span>
            <strong>Stripe</strong>
            <strong>PayPal</strong>
            <strong>Authorize.Net</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  [
    "Can I add my own products, prices and terms?",
    "Yes. Select products or services, set quantities and item-level tax, and add customer notes and terms. You can add a new product or contact while preparing the quote. Quote and invoice numbering can be configured for your business.",
  ],
  [
    "Can I use a PDF I already have?",
    "Yes. Upload a PDF and place the fields you need, or build a document with headings and text. Add signers and assign signature, initials and date fields to the right person before sending.",
  ],
  [
    "Does the customer need an account to sign?",
    "No. They open their personal signing link, review the document, complete the fields assigned to them and finish and submit. They can sign on a phone or tablet using touch, as well as on a computer.",
  ],
  [
    "Can more than one person sign?",
    "Yes. Add the people who need to sign and assign each field to its signer. You can see who is pending and who has signed. The document is completed once all signers have signed, and the shared view can be printed or saved as a PDF.",
  ],
  [
    "Can customers pay a deposit or in instalments?",
    "Yes. Configure a deposit or dated instalment schedule for the invoice. The customer’s payment page shows the relevant amounts and balance. Online payment methods depend on your connected provider and the options enabled for that invoice.",
  ],
  [
    "Does a signed document automatically collect payment?",
    "A quote, a signed document and a paid invoice record different things. Prepare and share the invoice when it is time to bill. Your customer then pays through the enabled options. Agree any further automation separately during setup.",
  ],
  [
    "What if I already use accounting software?",
    "We review how you quote, agree work and collect payment today, including the accounting or specialist software you already use. Then we agree what belongs in Zapla and check any required connection before recommending a change.",
  ],
  [
    "What does setup cost, and are payment fees included?",
    "Guided Launch is the required, separately priced initial setup for a new standard plan. We agree the document, payment and workflow scope before work begins. Payment-provider charges and any applicable usage costs are separate from the software subscription and are confirmed for your setup.",
  ],
];

export function QuotesInvoicesSignaturesPage() {
  return (
    <main className="zapla-feature zapla-quotes" data-page="quotes-invoices-signatures">
      <section className="qi-hero" aria-labelledby="qi-title">
        <div className="qi-wrap qi-hero-layout">
          <div className="qi-hero-copy">
            <p className="qi-eyebrow">Quotes, Invoices & Signatures</p>
            <h1 id="qi-title">
              Quote the work.
              <br />
              Get it signed.
              <br />
              Get paid.
            </h1>
            <p className="qi-lead">
              Give customers a clear price, a document they can sign and an invoice they can pay
              online. Manage the paperwork in the same platform as your customer relationships.
            </p>
            <div className="qi-actions">
              <BookCall />
              <a className="qi-text-link" href="#qi-signatures">
                See how signing works
              </a>
            </div>
          </div>
          <QuoteDocument />
        </div>
        <QuoteOverview />
      </section>

      <section className="qi-sign-section" id="qi-signatures" aria-labelledby="qi-sign-heading">
        <div className="qi-wrap qi-sign-container">
          <header className="qi-chapter-heading">
            <div>
              <p className="qi-eyebrow">Documents & e-signatures</p>
              <h2 id="qi-sign-heading">The agreement, without the print and scan.</h2>
            </div>
            <p>
              Upload a PDF or build your document in Zapla. Choose who signs and where, then send
              their signing link. They review and sign from their phone or computer, without
              creating an account.
            </p>
          </header>
          <SigningScene />
          <div className="qi-sign-breadth">
            <p>
              <strong>Your document.</strong> Start with a PDF or build it from scratch.
            </p>
            <p>
              <strong>The right signers.</strong> Assign signatures, initials and dates.
            </p>
            <p>
              <strong>A visible result.</strong> See who has signed and who is still pending.
            </p>
          </div>
        </div>
      </section>

      <PaymentScene />

      <section className="qi-context" aria-labelledby="qi-context-heading">
        <div className="qi-wrap">
          <figure className="qi-work-photo">
            <img
              src="/concept/quotes/signage-workshop-20261026.webp"
              width="1536"
              height="1024"
              alt="Two signage professionals checking a metal reception sign and materials in their workshop"
              loading="lazy"
            />
          </figure>
          <div className="qi-context-layout">
            <div>
              <p className="qi-eyebrow">Connected to the customer</p>
              <h2 id="qi-context-heading">Know what’s agreed. See what’s outstanding.</h2>
              <p>
                Keep the quote, signature request and invoice connected to the right customer. Your
                team can find the scope, check signing progress and see the invoice status when the
                next question comes in.
              </p>
              <a className="qi-text-link" href="/crm">
                Explore the connected CRM
              </a>
            </div>
            <div className="qi-customer-documents">
              <header>
                <Portrait />
                <div>
                  <h3>{JOB.customer}</h3>
                  <p>{JOB.title}</p>
                </div>
              </header>
              <dl>
                <div>
                  <dt>Quote</dt>
                  <dd>
                    {JOB.quote}
                    <span className="qi-sent">Sent</span>
                  </dd>
                </div>
                <div>
                  <dt>Signature request</dt>
                  <dd>
                    Scope of work<span className="qi-accepted">Completed</span>
                  </dd>
                </div>
                <div>
                  <dt>Invoice</dt>
                  <dd>
                    {JOB.invoice}
                    <span>Open</span>
                  </dd>
                </div>
              </dl>
              <p className="qi-record-owner">
                <Portrait cell={8} />
                Your team contact: Alex Chen
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="qi-section qi-closing" aria-labelledby="qi-launch-heading">
        <div className="qi-wrap">
          <div className="qi-launch-layout">
            <div>
              <p className="qi-eyebrow">Guided Launch</p>
              <h2 id="qi-launch-heading">Your paperwork. Your process. Set up with you.</h2>
              <p>
                Starting with spreadsheets and attachments, or already using a CRM or billing tool?
                We work through how you quote, agree work and collect payment before deciding what
                to set up in Zapla.
              </p>
              <p className="qi-setup-terms">
                Guided Launch is the required, separately priced initial setup for a new standard
                plan. We agree the scope before work begins.
              </p>
              <a className="qi-text-link" href="/booking">
                Talk through your process
              </a>
            </div>
            <dl className="qi-launch-plan">
              <div>
                <dt>Your products and terms</dt>
                <dd>
                  Agree the prices, tax settings, numbering and customer information you need on
                  your documents.
                </dd>
              </div>
              <div>
                <dt>Your documents and signers</dt>
                <dd>
                  Prepare the documents, place assigned fields and walk through the customer’s
                  signing experience.
                </dd>
              </div>
              <div>
                <dt>Your payment setup</dt>
                <dd>
                  Review providers, invoice payment options and where your existing accounting tools
                  fit.
                </dd>
              </div>
            </dl>
          </div>
          <div className="qi-faq" aria-labelledby="qi-faq-heading">
            <div>
              <p className="qi-eyebrow">Before you get started</p>
              <h2 id="qi-faq-heading">The practical questions.</h2>
            </div>
            <div>
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
