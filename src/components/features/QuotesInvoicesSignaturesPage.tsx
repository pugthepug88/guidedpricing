import { useEffect, useRef, useState } from "react";
import { Check, MousePointer2, Pause, Play, Plus, RotateCcw } from "lucide-react";
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

function Portrait({ cell = 19 }: { cell?: number }) {
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
      <nav className="qi-related-documents" aria-label="See the other documents for this job">
        <a href="#qi-signatures">
          <span>Scope of work</span>
          <strong>Signed by Priya Shah</strong>
        </a>
        <a href="#qi-payments">
          <span>Invoice · {JOB.invoice}</span>
          <strong>View payment &amp; balance</strong>
        </a>
      </nav>
    </div>
  );
}

function QuoteOverview() {
  return (
    <div className="qi-wrap qi-overview">
      <div className="qi-overview-copy">
        <h2>A price they can understand. A quote you can find.</h2>
        <p>
          Set the products, quantities, tax and terms. Find the quote by customer and status when
          it’s time to follow up.
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

// Each clock advances only while its scene and browser tab are visible.
// Static/server-rendered scenes start with the complete, meaningful result.
function useScenePlayback(beats: readonly number[]) {
  const scene = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const [stage, setStage] = useState(beats.length);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    setEnhanced(true);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(preference.matches);
      if (preference.matches) {
        setStage(beats.length);
        setPlaying(false);
      }
    };
    sync();
    preference.addEventListener("change", sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.12,
    });
    if (scene.current) observer.observe(scene.current);
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, [beats]);

  useEffect(() => {
    if (!playing || !visible || !tabVisible) return;
    let previous = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      elapsed.current += now - previous;
      previous = now;
      const next = beats.filter((at) => elapsed.current >= at).length;
      setStage(next);
      if (next === beats.length) setPlaying(false);
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, visible, tabVisible, beats]);

  const watch = () => {
    if (reduced) {
      setStage(beats.length);
      return;
    }
    if (playing) {
      setPlaying(false);
      return;
    }
    if (!played || stage === beats.length) {
      elapsed.current = 0;
      setStage(0);
    }
    setPlayed(true);
    setPlaying(true);
  };
  const complete = () => {
    elapsed.current = 0;
    setPlaying(false);
    setPlayed(false);
    setStage(beats.length);
  };
  return {
    scene,
    stage,
    finished: stage === beats.length,
    playing,
    played,
    enhanced,
    reduced,
    watch,
    complete,
  };
}

const SIGNING_TIMES = [1600, 3200, 4800, 6200, 7600] as const;
const SIGNING_BEATS = [
  "Priya opens her personal signing link and reviews the scope.",
  "She adopts her signature in the field assigned to her.",
  "She completes her initials and date. All three fields are ready.",
  "Priya chooses Finish & Submit after reviewing her fields.",
  "She confirms that she wants to submit the document.",
  "Her submission is complete. Your document record now shows Signed.",
];

function PlaybackButton({
  player,
  name,
  controls,
}: {
  player: ReturnType<typeof useScenePlayback>;
  name: string;
  controls: string;
}) {
  return (
    <button
      className="qi-watch"
      type="button"
      hidden={!player.enhanced || player.reduced}
      onClick={player.watch}
      aria-controls={controls}
    >
      {player.playing ? (
        <Pause size={16} aria-hidden="true" />
      ) : player.played && player.finished ? (
        <RotateCcw size={16} aria-hidden="true" />
      ) : (
        <Play size={16} aria-hidden="true" />
      )}
      {player.playing
        ? "Pause"
        : player.played
          ? player.finished
            ? "Watch again"
            : "Continue"
          : "Watch " + name}
    </button>
  );
}

function SigningScene() {
  const player = useScenePlayback(SIGNING_TIMES);
  const { stage } = player;
  const signed = stage >= 1;
  const fieldsComplete = stage >= 2;
  const submitted = stage === 5;

  return (
    <div className="qi-sign-scene" ref={player.scene} data-stage={stage}>
      <div className="qi-playback qi-sign-playback">
        <PlaybackButton
          player={player}
          name="signing"
          controls="qi-signing-document qi-signer-record"
        />
        <p role="status">{SIGNING_BEATS[stage]}</p>
      </div>
      <div className="qi-sign-workspace">
        <article className="qi-sign-paper" id="qi-signing-document">
          <header className="qi-document-brand">
            <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width="95" height="28" />
            <span>Personal signing link</span>
          </header>
          <div className="qi-sign-person">
            <span>
              Signing as <strong>{JOB.customer}</strong>
            </span>
            <strong>
              {submitted
                ? "Document signed"
                : fieldsComplete
                  ? "All fields complete"
                  : signed
                    ? "2 fields remaining"
                    : "3 fields remaining"}
            </strong>
          </div>
          <p className="qi-document-kind">Scope of work · {JOB.quote}</p>
          <h3>{JOB.title}</h3>
          <p>
            Design, manufacture and installation of your reception sign. Final artwork is approved
            before manufacture.
          </p>
          <div className="qi-signature-field" data-entered={signed} data-active={stage === 1}>
            <span>Customer signature · {JOB.customer}</span>
            <strong className="qi-handwriting">{signed ? JOB.customer : "Your signature"}</strong>
          </div>
          <div className="qi-sign-fields" data-active={stage === 2}>
            <div>
              <span>Initials</span>
              <strong>{fieldsComplete ? "PS" : "Your initials"}</strong>
            </div>
            <div>
              <span>Date</span>
              <strong>{fieldsComplete ? "27 October 2026" : "Signing date"}</strong>
            </div>
          </div>
          <div className="qi-document-action" data-active={stage === 3 || stage === 4}>
            {submitted ? (
              <div className="qi-completed-action">
                <Check size={20} aria-hidden="true" />
                <div>
                  <strong>Document signed</strong>
                  <span>Submitted by Priya Shah</span>
                </div>
              </div>
            ) : stage === 4 ? (
              <div className="qi-scripted-action">
                <span>Confirm submission</span>
                <strong>
                  Priya confirms <MousePointer2 size={18} aria-hidden="true" />
                </strong>
              </div>
            ) : (
              <div className="qi-scripted-action">
                <span>
                  {fieldsComplete ? "Ready for Priya to submit" : "Complete your assigned fields"}
                </span>
                <strong>
                  Finish &amp; Submit{" "}
                  {stage === 3 ? <MousePointer2 size={18} aria-hidden="true" /> : null}
                </strong>
              </div>
            )}
          </div>
        </article>
        <aside
          className="qi-signer-record"
          id="qi-signer-record"
          aria-label="Your signature document record"
        >
          <p>Your document record</p>
          <h3>See the signed result.</h3>
          <div className="qi-signer-person">
            <Portrait />
            <div>
              <strong>{JOB.customer}</strong>
              <span>{submitted ? "Signed · 27 October 2026" : "Pending signature"}</span>
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
              ? "The completed scope is available to view or save as a PDF."
              : "Priya’s signature is recorded only after she submits and confirms."}
          </p>
        </aside>
      </div>
    </div>
  );
}

type PaymentPlan = "full" | "deposit" | "instalments";
const PAYMENT_PLANS: { id: PaymentPlan; name: string; copy: string; due: number }[] = [
  { id: "full", name: "Full payment", copy: "The full A$3,300 invoice.", due: 3300 },
  { id: "deposit", name: "Deposit first", copy: "30% now. A$2,310 remains.", due: 990 },
  { id: "instalments", name: "In instalments", copy: "Two dated payments of A$1,650.", due: 1650 },
];
const PAYMENT_TIMES = [1800, 3600, 5600] as const;

function PaymentScene() {
  const [plan, setPlan] = useState<PaymentPlan>("full");
  const player = useScenePlayback(PAYMENT_TIMES);
  const selected = PAYMENT_PLANS.find((item) => item.id === plan)!;
  const received = player.stage === 3;
  const paid = received ? selected.due : 0;
  const balance = JOB.total - paid;
  const invoiceStatus = received ? (plan === "full" ? "Paid" : "Partially Paid") : "Open";
  const beats = [
    "Priya opens the invoice link and reviews the charges.",
    "She chooses Card from the payment methods enabled for this invoice.",
    "Priya confirms the " + money(selected.due) + " payment through the provider.",
    "Payment received. " + money(paid) + " paid, with " + money(balance) + " left on the invoice.",
  ];

  return (
    <section
      className="qi-section qi-payments"
      id="qi-payments"
      aria-labelledby="qi-payment-heading"
    >
      <div className="qi-wrap qi-payment-layout">
        <div className="qi-payment-copy">
          <p className="qi-eyebrow">Invoices & online payments</p>
          <h2 id="qi-payment-heading">Give them a clear way to pay.</h2>
          <p>
            Prepare the invoice when it’s time to bill, then share its payment link. Your customer
            pays online. You see what’s paid and what remains.
          </p>
          <fieldset className="qi-payment-choices" disabled={!player.enhanced}>
            <legend>Choose a payment arrangement</legend>
            {PAYMENT_PLANS.map((item) => (
              <label key={item.id} className={plan === item.id ? "qi-chosen" : ""}>
                <input
                  type="radio"
                  name="qi-payment-plan"
                  value={item.id}
                  checked={plan === item.id}
                  onChange={() => {
                    setPlan(item.id);
                    player.complete();
                  }}
                  aria-controls="qi-invoice-preview qi-payment-status"
                />
                <span>
                  <strong>{item.name}</strong>
                  <span>{item.copy}</span>
                </span>
              </label>
            ))}
          </fieldset>
          <div className="qi-playback qi-payment-playback">
            <PlaybackButton player={player} name="payment" controls="qi-invoice-preview" />
            <p role="status" id="qi-payment-status">
              {beats[player.stage]}
            </p>
          </div>
          <p className="qi-provider-note">
            Payment options depend on your connected provider and invoice settings.
          </p>
        </div>
        <div className="qi-invoice-stage" ref={player.scene} data-stage={player.stage}>
          <article className="qi-invoice" id="qi-invoice-preview">
            <header className="qi-document-brand">
              <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width="95" height="28" />
              <span>Customer invoice</span>
            </header>
            <div className="qi-invoice-title">
              <div>
                <p>{JOB.invoice}</p>
                <h3>{JOB.title}</h3>
              </div>
              <span>For {JOB.customer}</span>
            </div>
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
            <div className="qi-payment-schedule">
              {plan === "instalments" ? (
                <>
                  <div>
                    <span>10 November</span>
                    <strong>
                      {money(1650)} · {received ? "Paid" : "Due"}
                    </strong>
                  </div>
                  <div>
                    <span>24 November</span>
                    <strong>{money(1650)} · Scheduled</strong>
                  </div>
                </>
              ) : (
                <div>
                  <span>{plan === "deposit" ? "30% deposit" : "Due 10 November"}</span>
                  <strong>{money(selected.due)}</strong>
                </div>
              )}
            </div>
            <div className="qi-payment-action" data-received={received}>
              <div className="qi-payment-amount">
                <span>
                  {received
                    ? "Payment received"
                    : plan === "deposit"
                      ? "Deposit to pay"
                      : plan === "instalments"
                        ? "First instalment"
                        : "Amount to pay"}
                </span>
                <strong>{money(selected.due)}</strong>
              </div>
              <div className="qi-payment-event">
                {received ? (
                  <>
                    <Check size={19} aria-hidden="true" />
                    <span>Thank you, Priya. Your payment is confirmed.</span>
                  </>
                ) : player.stage === 2 ? (
                  <>
                    <MousePointer2 size={19} aria-hidden="true" />
                    <span>Priya confirms payment through the provider.</span>
                  </>
                ) : (
                  <>
                    <span className="qi-method" data-selected={player.stage >= 1}>
                      Card
                    </span>
                    <span>
                      {player.stage === 1
                        ? "Priya selects her payment method."
                        : "Review the invoice, then choose how to pay."}
                    </span>
                  </>
                )}
              </div>
            </div>
          </article>
          <aside className="qi-payment-record" aria-label="Your updated invoice record">
            <header>
              <span>Your invoice record</span>
              <strong data-paid={received}>{invoiceStatus}</strong>
            </header>
            <dl>
              <div>
                <dt>Invoice total</dt>
                <dd>{money(JOB.total)}</dd>
              </div>
              <div>
                <dt>Amount paid</dt>
                <dd>{money(paid)}</dd>
              </div>
              <div>
                <dt>Balance due</dt>
                <dd>{money(balance)}</dd>
              </div>
            </dl>
          </aside>
          <div className="qi-provider-row" aria-label="Documented payment provider connections">
            <span>Connect</span>
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
              Give customers a clear price, an easy way to sign and an invoice they can pay online.
              Keep the paperwork with the customer in Zapla.
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
              Use a PDF or build your document. Assign the fields and send a personal link. Your
              customer reviews and signs on their phone or computer, with no account to create.
            </p>
          </header>
          <SigningScene />
        </div>
      </section>

      <PaymentScene />

      <section className="qi-context" aria-labelledby="qi-context-heading">
        <div className="qi-wrap qi-context-layout">
          <figure className="qi-work-photo">
            <img
              src="/concept/quotes/signage-workshop-20261026.webp"
              width="1536"
              height="1024"
              alt="Two signage professionals checking a metal reception sign and materials in their workshop"
              loading="lazy"
            />
          </figure>
          <div className="qi-context-copy">
            <p className="qi-eyebrow">Connected to the customer</p>
            <h2 id="qi-context-heading">Know what’s agreed.</h2>
            <p>
              The scope, signed document and invoices stay with the customer, so your team has the
              context for the next question.
            </p>
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
                  <dt>Scope of work</dt>
                  <dd>
                    Signature request<span className="qi-accepted">Completed</span>
                  </dd>
                </div>
                <div>
                  <dt>Invoice</dt>
                  <dd>
                    {JOB.invoice}
                    <span>{money(JOB.total)}</span>
                  </dd>
                </div>
              </dl>
              <p className="qi-record-owner">
                <Portrait cell={8} />
                Your team contact: Alex Chen
              </p>
            </div>
            <a className="qi-text-link" href="/crm">
              Explore the connected CRM
            </a>
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
                Bring your current quotes, documents and billing process. We’ll map what belongs in
                Zapla and where your existing tools fit.
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
                <dd>Prices, tax, numbering and the information your customers need.</dd>
              </div>
              <div>
                <dt>Your documents and signers</dt>
                <dd>Your documents, assigned fields and the customer’s signing experience.</dd>
              </div>
              <div>
                <dt>Your payment setup</dt>
                <dd>Your provider, payment arrangements and existing accounting tools.</dd>
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
