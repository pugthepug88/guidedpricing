import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import tradesCss from "@/styles/trades.css?url";

const TITLE = "CRM for Trades & Home Services in Australia | Zapla";
const DESCRIPTION =
  "Capture enquiries, follow up quiet quotes and bring service customers back. Zapla customer follow-through for trades, alongside your job management software.";
export const Route = createFileRoute("/industries/trades")({
  staticData: { sitemap: false },
  head: () => ({
    links: [{ rel: "stylesheet", href: tradesCss }],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: TradesPage,
});

const BOOK = "https://zapla.io/booking";
const PRICING = "/Pricing-v3";
function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="tr-eyebrow">{children}</p>;
}
function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="tr-text-link" href={href}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function Button({
  children = "Book a Call",
  href = BOOK,
  secondary = false,
}: {
  children?: ReactNode;
  href?: string;
  secondary?: boolean;
}) {
  return (
    <a className={`tr-button ${secondary ? "tr-secondary" : "tr-primary"}`} href={href}>
      {children}
      {!secondary && <ArrowRight size={16} aria-hidden="true" />}
    </a>
  );
}
function Sender({ children = "Zapla · SMS" }: { children?: ReactNode }) {
  return (
    <div className="tr-sender">
      <ZaplaPetal size={25} />
      <span>{children}</span>
    </div>
  );
}
function Portrait({ cell = 9 }: { cell?: number }) {
  return (
    <span
      className="tr-portrait"
      aria-hidden="true"
      style={{ backgroundPosition: `${(cell % 6) * 20}% ${Math.floor(cell / 6) * (100 / 3)}%` }}
    />
  );
}

// Finite customer stories: resume only while visible and hold the last state.
function useStory(delays: readonly number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.15 });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const final = delays.length;
  useEffect(() => {
    if (reduced) setStep(final);
  }, [reduced, final]);
  useEffect(() => {
    if (!visible || reduced || step >= final) return;
    const timer = window.setTimeout(
      () => setStep((value) => Math.min(value + 1, final)),
      delays[step],
    );
    return () => window.clearTimeout(timer);
  }, [visible, reduced, step, final, delays]);
  return { ref, step };
}
const ENQUIRY_DELAYS = [650, 850] as const;
const QUOTE_DELAYS = [700, 1000] as const;

function TradesPage() {
  return (
    <main className="trades-page" data-page="trades">
      <section className="tr-hero tr-wrap" aria-labelledby="trades-title">
        <div className="tr-hero-heading">
          <div>
            <Eyebrow>Trades &amp; Home Services</Eyebrow>
            <h1 id="trades-title">
              Don’t let the next job
              <br />
              <span>slip through the gaps.</span>
            </h1>
          </div>
          <div className="tr-hero-intro">
            <p>
              Capture enquiries while you’re on site. Follow up the quotes you’ve already sent. Give
              past customers a reason to book again.
            </p>
            <div className="tr-actions">
              <Button />
              <a className="tr-flow-link" href="#customer-flow">
                See it in action <ChevronDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div className="tr-hero-scene">
          <img
            src="/concept/cinematic-v5/roofing.jpg"
            alt="Roofers working on a tiled roof at a residential property"
            width="1280"
            height="720"
            fetchPriority="high"
          />
          <p className="tr-photo-line">
            You stay on the job.
            <br />
            <span>Zapla keeps the next step moving.</span>
          </p>
          <div
            className="tr-hero-message tr-glass"
            role="img"
            aria-label="Illustrative automatic reply to a roofing enquiry"
          >
            <Sender>Zapla · Enquiry reply</Sender>
            <p>
              Hi Alex, thanks for getting in touch about the roof inspection. What’s the property
              address?
            </p>
            <div className="tr-hero-message-foot">
              A conversation started.
              <br />
              <strong>Without stopping the work.</strong>
            </div>
          </div>
        </div>
        <div className="tr-trade-strip" aria-label="Representative service trades">
          <span>Plumbing</span>
          <span>Electrical</span>
          <span>Air conditioning</span>
          <span>Pest control</span>
          <span>Pool services</span>
          <span>Roofing</span>
        </div>
        <p className="tr-hero-boundary">
          Customer follow-through for local service businesses. Your job management software stays
          in place.
        </p>
      </section>

      <section
        id="customer-flow"
        className="tr-enquiry tr-wrap tr-split"
        aria-labelledby="enquiry-title"
      >
        <div className="tr-copy">
          <Eyebrow>From the first enquiry</Eyebrow>
          <h2 id="enquiry-title">
            You can be busy.
            <br />
            The customer shouldn’t
            <br />
            be left waiting.
          </h2>
          <p>
            A website enquiry arrives while you’re on site. Zapla sends the first reply, gathers the
            job details and keeps the conversation with the customer record.
          </p>
          <p>
            Your office can see the suburb, the request and the next action. They don’t have to ask
            you what happened.
          </p>
          <TextLink href="/crm">See the connected customer record</TextLink>
        </div>
        <EnquiryScene />
      </section>

      <section className="tr-call-band tr-wrap" aria-labelledby="call-title">
        <div>
          <Eyebrow>When the phone rings instead</Eyebrow>
          <h3 id="call-title">
            Someone can answer.
            <br />
            Even when you can’t.
          </h3>
        </div>
        <div>
          <p>
            The optional <a href="/ai-receptionist">AI Receptionist</a> answers calls, captures the
            request and passes the next step to the right person. You set the service area, hours
            and handoff rules.
          </p>
          <p className="tr-note">Technical advice and urgent dispatch stay with your team.</p>
          <TextLink href="/ai-receptionist">Explore AI Receptionist</TextLink>
        </div>
      </section>

      <section className="tr-quote-section" aria-labelledby="quote-title">
        <div className="tr-wrap tr-split">
          <QuoteScene />
          <div className="tr-copy">
            <Eyebrow>After the quote goes out</Eyebrow>
            <h2 id="quote-title">
              You’ve done the visit.
              <br />
              You’ve written the quote.
              <br />
              <span>Don’t leave it there.</span>
            </h2>
            <p>
              The customer gets busy too. A well timed follow-up gives them an easy way to ask a
              question or take the next step.
            </p>
            <p>
              Zapla sends the agreed message. When they reply, further reminders stop and the
              conversation goes to your team.
            </p>
            <TextLink href="/follow-up">Explore quote follow-up</TextLink>
            <p className="tr-note">
              Triggered by a quote stage recorded in Zapla or an agreed data connection. No assumed
              sync with your quoting software.
            </p>
          </div>
        </div>
      </section>

      <RepeatSection />
      <section className="tr-reviews tr-wrap" aria-labelledby="review-title">
        <div className="tr-review-panel">
          <div className="tr-copy">
            <Eyebrow>After the work is done</Eyebrow>
            <h2 id="review-title">
              Make asking for a review
              <br />
              part of finishing the job.
            </h2>
            <p>
              Your next customer wants to know what it’s like to hire you. Send a neutral Google
              review request after the agreed completion step, while the job is still fresh.
            </p>
            <TextLink href="/reviews">Explore Reviews &amp; Reputation</TextLink>
          </div>
          <div
            className="tr-review-note"
            role="img"
            aria-label="Illustrative review request after a completed plumbing job"
          >
            <Sender />
            <p>
              Hi Daniel, thanks for having us out to replace the hot water unit. Would you share
              your experience on Google?
            </p>
            <span className="tr-inline-action">
              Leave a Google review <ArrowRight size={14} aria-hidden="true" />
            </span>
            <small>Sent after the job is marked complete in Zapla.</small>
          </div>
        </div>
      </section>

      <section className="tr-fit tr-wrap" aria-labelledby="fit-title">
        <div className="tr-fit-heading">
          <Eyebrow>Fits around the way you work</Eyebrow>
          <h2 id="fit-title">
            Keep the system
            <br />
            that runs the job.
          </h2>
          <p>
            ServiceM8, Simpro, Fergus or Tradify may already handle parts of your customer journey.
            Start with what works. Add Zapla where enquiries, conversations or repeat business still
            need attention.
          </p>
        </div>
        <div className="tr-fit-comparison">
          <div>
            <h3>Your job management system</h3>
            <p>
              Scheduling and dispatch
              <br />
              Job cards and technician time
              <br />
              Materials and job costing
              <br />
              Quotes, invoices and payments
            </p>
          </div>
          <div>
            <h3>Zapla’s customer layer</h3>
            <p>
              Enquiry capture and conversations
              <br />
              Customer records and next actions
              <br />
              Agreed follow-up and handoffs
              <br />
              Reviews and relevant return campaigns
            </p>
          </div>
        </div>
        <p className="tr-fit-foot">
          Connections are scoped during Guided Launch. We confirm what can be linked, what needs
          importing and what your team updates.
        </p>
      </section>

      <section className="tr-launch-section">
        <div className="tr-wrap tr-launch">
          <div className="tr-copy">
            <Eyebrow>Guided Launch</Eyebrow>
            <h2>
              Start with one gap.
              <br />
              <span>Get it working properly.</span>
            </h2>
            <p>
              You don’t need another system to set up after dinner. We map the agreed process,
              configure the workflow and test it with your team before it goes live.
            </p>
            <TextLink href={PRICING}>See plans and Guided Launch</TextLink>
          </div>
          <ol className="tr-launch-steps">
            <li>
              <span>01</span>
              <div>
                <h3>Find the gap</h3>
                <p>Look at real enquiries, quote follow-up and customer return opportunities.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Agree the handoffs</h3>
                <p>Confirm where the data comes from, who owns replies and when messages stop.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Test the whole journey</h3>
                <p>Walk through the enquiry, message, reply and team action together.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <Plans />
      <Faq />
      <section className="tr-final tr-wrap" aria-labelledby="final-title">
        <span className="tr-final-petal">
          <ZaplaPetal size={34} />
        </span>
        <h2 id="final-title">
          The next job deserves
          <br />
          <span>a proper follow-through.</span>
        </h2>
        <p>
          Show us how an enquiry becomes a job today. We’ll identify the gaps, check your existing
          tools and map the first workflow worth fixing.
        </p>
        <div className="tr-actions">
          <Button />
          <Button href={PRICING} secondary>
            View pricing
          </Button>
        </div>
      </section>
    </main>
  );
}

function EnquiryScene() {
  const { ref, step } = useStory(ENQUIRY_DELAYS);
  return (
    <div
      ref={ref}
      className="tr-enquiry-scene"
      role="img"
      aria-label="Illustrative enquiry: a homeowner requests a hot water replacement, Zapla asks for the address, and the office receives the customer context"
    >
      <div className="tr-message tr-customer-message">
        <div className="tr-person">
          <Portrait cell={10} />
          <div>
            <strong>Daniel Brooks</strong>
            <span>Website enquiry</span>
          </div>
        </div>
        <p>Hi, can you quote to replace our hot water unit in Marrickville?</p>
      </div>
      <div className={`tr-message tr-auto-message tr-beat ${step >= 1 ? "tr-visible" : ""}`}>
        <Sender />
        <p>Hi Daniel, we can help with that. What’s the address, and is the unit still working?</p>
      </div>
      <div className={`tr-context tr-beat ${step >= 2 ? "tr-visible" : ""}`}>
        <div className="tr-context-heading">
          <img src="/concept/zapla-logo-dark.svg" alt="" />
          <span>Ready for your office</span>
        </div>
        <dl>
          <div>
            <dt>Customer</dt>
            <dd>Daniel Brooks</dd>
          </div>
          <div>
            <dt>Request</dt>
            <dd>Hot water replacement</dd>
          </div>
          <div>
            <dt>Suburb</dt>
            <dd>Marrickville</dd>
          </div>
          <div>
            <dt>Next step</dt>
            <dd>Confirm scope and arrange a visit</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
function QuoteScene() {
  const { ref, step } = useStory(QUOTE_DELAYS);
  return (
    <div
      ref={ref}
      className="tr-quote-scene"
      role="img"
      aria-label="Illustrative air conditioning quote follow-up. Zapla sends a reminder, Jess asks whether old unit removal is included, and further reminders stop for a team reply"
    >
      <div className="tr-quote-document">
        <span>QUOTE SENT</span>
        <h3>
          Split system
          <br />
          replacement
        </h3>
        <p>Prepared for Jess Mitchell</p>
        <div className="tr-quote-lines">
          <span>New unit and installation</span>
          <span>Electrical connection</span>
          <span>Site clean up</span>
        </div>
        <div className="tr-quote-document-foot">Waiting for a decision</div>
      </div>
      <div className={`tr-message tr-quote-follow tr-beat ${step >= 1 ? "tr-visible" : ""}`}>
        <Sender />
        <p>
          Hi Jess, any questions about the split system quote? Happy to help with the next step.
        </p>
      </div>
      <div className={`tr-message tr-quote-reply tr-beat ${step >= 2 ? "tr-visible" : ""}`}>
        <div className="tr-person">
          <Portrait cell={2} />
          <div>
            <strong>Jess Mitchell</strong>
            <span>Customer reply</span>
          </div>
        </div>
        <p>Thanks! Does it include taking the old unit away?</p>
        <div className="tr-handoff">Further reminders stopped · With your team</div>
      </div>
    </div>
  );
}

const RETURN_EXAMPLES = [
  {
    trade: "Air conditioning",
    audience: "Customers with a recorded service date",
    reason: "Before the next service is due",
    message: "Hi Priya, your air con service is coming up. Would you like us to arrange a time?",
    note: "Use recorded service dates and the interval your business recommends.",
  },
  {
    trade: "Pest control",
    audience: "Customers due for their next inspection",
    reason: "At the agreed inspection interval",
    message:
      "Hi Priya, it’s time to arrange your next pest inspection. Would you like a call to organise it?",
    note: "Use the inspection schedule agreed with each customer.",
  },
  {
    trade: "Pool services",
    audience: "Past customers who may need seasonal care",
    reason: "Before the season gets busy",
    message:
      "Hi Priya, would you like help getting the pool ready for summer? Reply here and we’ll organise the next step.",
    note: "Choose eligible customers and a relevant seasonal reason to reach out.",
  },
  {
    trade: "Plumbing & electrical",
    audience: "Past customers with an agreed maintenance need",
    reason: "When their recorded check is due",
    message:
      "Hi Priya, your agreed maintenance check is coming up. Would you like us to arrange a visit?",
    note: "Only send a maintenance reminder when there is a genuine recorded need.",
  },
] as const;
function RepeatSection() {
  const [selected, setSelected] = useState(0);
  const example = RETURN_EXAMPLES[selected];
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <section className="tr-repeat tr-wrap" aria-labelledby="repeat-title">
      <div className="tr-repeat-heading">
        <div>
          <Eyebrow>When there’s a reason to return</Eyebrow>
          <h2 id="repeat-title">
            The next job might
            <br />
            <span>already know your name.</span>
          </h2>
        </div>
        <div>
          <p>
            Past customers don’t all need the same message. Use the service history, dates and
            interests recorded in Zapla to contact the right people at the right time.
          </p>
          <TextLink href="/customer-marketing">Explore Customer Marketing</TextLink>
        </div>
      </div>
      <div className="tr-repeat-body">
        <div
          className="tr-trade-tabs"
          role="tablist"
          aria-label="Repeat business examples"
          aria-orientation="vertical"
        >
          {RETURN_EXAMPLES.map((item, index) => (
            <button
              key={item.trade}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`trade-tab-${index}`}
              aria-controls="trade-return-panel"
              aria-selected={selected === index}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => {
                const key = event.key;
                if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(key)) return;
                event.preventDefault();
                const next =
                  key === "Home"
                    ? 0
                    : key === "End"
                      ? RETURN_EXAMPLES.length - 1
                      : (index + (key === "ArrowDown" ? 1 : -1) + RETURN_EXAMPLES.length) %
                        RETURN_EXAMPLES.length;
                setSelected(next);
                tabs.current[next]?.focus();
              }}
            >
              {item.trade}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div
          className="tr-return-panel"
          id="trade-return-panel"
          role="tabpanel"
          aria-labelledby={`trade-tab-${selected}`}
          tabIndex={0}
        >
          <div className="tr-audience">
            <Portrait cell={9} />
            <div>
              <span>{example.reason}</span>
              <h3>{example.audience}</h3>
            </div>
          </div>
          <div className="tr-return-message">
            <Sender />
            <p>{example.message}</p>
          </div>
          <p className="tr-return-note">{example.note}</p>
        </div>
      </div>
      <p className="tr-repeat-foot">
        Older enquiries gone quiet? <a href="/reactivation">Reactivation</a> starts a fresh
        conversation with the eligible customers you choose.
      </p>
    </section>
  );
}
function Plans() {
  return (
    <section className="tr-plans tr-wrap" aria-labelledby="plans-title">
      <div className="tr-plans-heading">
        <Eyebrow>One platform price. Your whole team.</Eyebrow>
        <h2 id="plans-title">
          Bring the office and
          <br />
          the owner onto the same page.
        </h2>
        <p>
          Unlimited users. Unlimited stored contacts under fair use. No extra platform seat fee when
          another person needs access.
        </p>
      </div>
      <div className="tr-plan-pair">
        <article>
          <h3>Follow-Through</h3>
          <p>For the business already coming to you.</p>
          <div className="tr-price">
            A$399<span>/mo + GST</span>
          </div>
          <p className="tr-plan-scope">
            Enquiry capture, customer conversations, quote follow-up and review requests.
          </p>
          <p className="tr-launch-price">Guided Launch from A$1,997 + GST</p>
          <TextLink href={PRICING}>View full inclusions</TextLink>
        </article>
        <article>
          <h3>Growth</h3>
          <p>For bringing the right customers back.</p>
          <div className="tr-price">
            A$699<span>/mo + GST</span>
          </div>
          <p className="tr-plan-scope">
            Everything in Follow-Through, plus reactivation and targeted customer campaigns.
          </p>
          <p className="tr-launch-price">Guided Launch from A$2,997 + GST</p>
          <TextLink href={PRICING}>View Growth inclusions</TextLink>
        </article>
      </div>
      <p className="tr-pricing-note">
        Communications usage, AI Receptionist and custom connections are extra. Scope and total
        costs are agreed before launch.
      </p>
    </section>
  );
}
const FAQS = [
  [
    "Do I have to replace ServiceM8, Simpro, Fergus or Tradify?",
    "No. Keep your operational system for job scheduling, field work, costing and invoicing. During Guided Launch, we check what it already handles and agree where Zapla adds value. If your current system already solves the gap, there is no reason to duplicate it.",
  ],
  [
    "Will Zapla automatically know when a quote is sent or a job is finished?",
    "Only when that information is available in Zapla. A workflow can start from an updated stage, agreed import or a scoped connection. We confirm the data path before enabling messages. A native integration with your job system is not assumed.",
  ],
  [
    "Will customers keep getting reminders after they reply?",
    "We configure the quote workflow to stop further reminders when the customer replies and route the conversation to your team. We also agree how to stop messages for accepted or declined quotes, opt outs and other outcomes. External quote status needs the agreed update or connection.",
  ],
  [
    "Can AI Receptionist handle urgent trade calls?",
    "It can capture the request and urgency, then follow your agreed escalation rules. It should not diagnose faults, give technical safety advice or promise an emergency arrival. Urgent dispatch and decisions about the work stay with your team. AI Receptionist is an optional paid add-on.",
  ],
  [
    "Is this for every trade and construction business?",
    "The strongest fit is local service businesses with enquiries to handle, quotes to follow up or customers who may need relevant future service. Plumbing, electrical, air conditioning, roofing, pest control and pool services are examples. Major construction, long renovation projects and businesses needing emergency dispatch alone have different requirements. We assess fit before recommending a setup. Workshops have their own mechanics page.",
  ],
  [
    "Can we bring our existing customer list?",
    "Yes, the agreed customer data can be imported as part of Guided Launch. We agree which fields and dates matter and who can receive outreach. Past customer status alone does not mean someone should receive a campaign; eligibility, permissions and opt outs are part of the setup.",
  ],
  [
    "How do we know the extra software is worth paying for?",
    "Start with a specific gap and include the monthly plan, launch cost, usage and any optional services in the decision. Measure the enquiries handled, customer replies, team time and jobs you can actually attribute. Use the contribution from additional work, rather than its full invoice value, when assessing the return. There is no guaranteed job uplift.",
  ],
] as const;
function Faq() {
  return (
    <section className="tr-faq tr-wrap" aria-labelledby="faq-title">
      <div>
        <Eyebrow>Before you add another system</Eyebrow>
        <h2 id="faq-title">Fair questions.</h2>
        <p>
          Running a workshop instead?
          <br />
          <a href="/industries/mechanics">See Zapla for mechanics</a>.
        </p>
      </div>
      <div>
        {FAQS.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <ChevronDown size={18} aria-hidden="true" />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
