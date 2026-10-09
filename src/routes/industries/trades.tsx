import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronRight, ChevronDown, Star } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import tradesCss from "@/styles/trades.css?url";

export const Route = createFileRoute("/industries/trades")({
  staticData: { sitemap: false },
  head: () => ({
    links: [
      { rel: "stylesheet", href: tradesCss },
      {
        rel: "preload",
        href: "/concept/industries/fonts/inter-tight-latin-500-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/concept/industries/fonts/manrope-latin-400-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
    meta: [
      { title: "Customer Follow-Up for Trades & Home Services | Zapla" },
      {
        name: "description",
        content:
          "Capture trade enquiries, follow up quotes and bring service customers back. Customer communication alongside your existing job management software.",
      },
      { property: "og:title", content: "Customer Follow-Up for Trades & Home Services | Zapla" },
      {
        property: "og:description",
        content:
          "Capture trade enquiries, follow up quotes and bring service customers back. Customer communication alongside your existing job management software.",
      },
      { name: "twitter:title", content: "Customer Follow-Up for Trades & Home Services | Zapla" },
      {
        name: "twitter:description",
        content:
          "Capture trade enquiries, follow up quotes and bring service customers back. Customer communication alongside your existing job management software.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: TradesPage,
});

const BOOK = "https://zapla.io/booking";
function ActionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="tr-text-link" href={href}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="tr-eyebrow">{children}</p>;
}
function TradesPage() {
  return (
    <main className="trades-page" data-page="trades">
      <section className="tr-hero tr-wrap" aria-labelledby="trades-title">
        <div className="tr-hero-copy">
          <Eyebrow>For trades &amp; home services</Eyebrow>
          <h1 id="trades-title">
            You do the work.
            <br />
            <span>Zapla follows through.</span>
          </h1>
          <p className="tr-intro">
            Reply to enquiries while you’re on site. Follow up quotes before they go quiet. Bring
            customers back when their next service is due.
          </p>
          <div className="tr-actions">
            <a className="tr-button tr-primary" href={BOOK}>
              Book a Call
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="tr-flow-link" href="#customer-flow">
              See the customer flow
              <ChevronRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="tr-hero-visual">
          <img
            className="tr-workshop-photo"
            src="/concept/customer-stories-v6/plumber.webp"
            alt="A plumber working on pipework"
            width="900"
            height="1200"
            fetchPriority="high"
          />
          <HeroEnquiry />
        </div>
      </section>

      <div id="customer-flow" className="tr-story">
        <section className="tr-enquiry tr-wrap" aria-labelledby="enquiry-title">
          <EnquiryScene />
          <div className="tr-scene-copy">
            <Eyebrow>While you’re on the tools</Eyebrow>
            <h2 id="enquiry-title">The enquiry shouldn’t have to wait for you.</h2>
            <p>
              A homeowner asks for a quote while you’re on a job. Zapla replies automatically and
              asks for the property address and job details. Your team picks up the conversation
              with the context already there.
            </p>
            <p className="tr-aside">
              Want help answering calls too? <a href="/ai-receptionist">AI Receptionist</a> is an
              optional add-on for agreed enquiries and callback requests. Urgent dispatch stays with
              your team.
            </p>
            <ActionLink href="/follow-up">Explore enquiry follow-through</ActionLink>
          </div>
        </section>

        <section className="tr-estimate-section" aria-labelledby="estimate-title">
          <div className="tr-wrap tr-quote-layout">
            <div className="tr-scene-copy">
              <Eyebrow>After the quote goes out</Eyebrow>
              <h2 id="estimate-title">Follow up quotes before they go cold.</h2>
              <p>
                You’ve done the site visit and sent the quote. Zapla sends the agreed follow-up so
                the customer can ask a question or take the next step. Reminders stop when they
                reply, and your team gets the conversation.
              </p>
              <ActionLink href="/follow-up">Explore Follow-Up</ActionLink>
              <p className="tr-aside">
                Starts from a quote stage recorded in Zapla or a connection agreed during setup.
              </p>
            </div>
            <QuoteScene />
          </div>
        </section>

        <section className="tr-return tr-wrap" aria-labelledby="return-title">
          <div className="tr-scene-copy">
            <Eyebrow>Service and inspection reminders</Eyebrow>
            <h2 id="return-title">The right reminder. Before the next service is due.</h2>
            <p>
              An air conditioning service, pest inspection or pool maintenance visit can create a
              genuine reason to contact a past customer. Use the recorded service date to send a
              relevant reminder and invite them to arrange the next visit.
            </p>
            <ActionLink href="/customer-marketing">Explore Customer Marketing</ActionLink>
            <p className="tr-return-support">
              Reconnect with customers you haven’t heard from through a relevant{" "}
              <a href="/reactivation">reactivation campaign</a>.
            </p>
          </div>
          <ReturnScene />
        </section>
      </div>

      <ReviewScene />

      <section className="tr-fit tr-wrap" aria-labelledby="fit-title">
        <h2 id="fit-title">
          Keep your job software.
          <br />
          <span>Add the customer follow-through.</span>
        </h2>
        <p>
          Scheduling, dispatch, quoting and invoicing stay in your existing system. During setup, we
          confirm how Zapla gets the customer details and status updates it needs. Add it where
          customer communication still needs attention.
        </p>
      </section>

      <section className="tr-launch" aria-labelledby="launch-title">
        <div className="tr-wrap tr-launch-layout">
          <div className="tr-launch-copy">
            <Eyebrow>Guided Launch</Eyebrow>
            <h2 id="launch-title">
              Built around
              <br />
              your business.
            </h2>
            <p>We map your process, build the agreed flows and get your team ready to use them.</p>
            <p>
              We confirm the enquiry questions, quote triggers, service dates and who handles
              customer replies. Then we test the whole flow with your team.
            </p>
            <ActionLink href="/Pricing-v3">Explore plans and Guided Launch</ActionLink>
          </div>
          <div className="tr-launch-plan" aria-label="Illustrative trade business launch plan">
            <div className="tr-launch-plan-heading">
              <span>Your customer follow-up plan</span>
            </div>
            <h3>
              Start with the gaps
              <br />
              in your business.
            </h3>
            <div className="tr-launch-plan-row">
              <strong>Quotes going quiet</strong>
              <p>Agree when to follow up and when to stop.</p>
            </div>
            <div className="tr-launch-plan-row">
              <strong>Customers due back</strong>
              <p>Choose relevant service dates and eligible customers.</p>
            </div>
            <div className="tr-launch-plan-row">
              <strong>Enquiries while you’re on site</strong>
              <p>Test the automatic reply, job details and team handoff.</p>
            </div>
          </div>
        </div>
      </section>

      <TradesPlans />
      <Faq />

      <section className="tr-final tr-wrap" aria-labelledby="final-title">
        <span className="tr-final-petal">
          <ZaplaPetal />
        </span>
        <h2 id="final-title">
          Find the follow-up
          <br />
          your business is missing.
        </h2>
        <p>
          Show us how enquiries, quotes and service reminders work today. We’ll map what Zapla can
          automate, what your team handles and which plan fits your business.
        </p>
        <div className="tr-actions">
          <a className="tr-button tr-primary" href={BOOK}>
            Book a Call
            <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a className="tr-button tr-secondary" href="/Pricing-v3">
            View pricing
          </a>
        </div>
      </section>
    </main>
  );
}

const QUOTE_STAGES = ["Quote sent", "Follow-up sent", "Customer replied"];
const ENQUIRY_STAGES = ["Customer asks", "Automatic reply sent"];
const RETURN_STAGES = ["Service record", "Reminder sent", "Customer replies"];

// Each brief scene progresses once, pauses offscreen and holds its final state.
function useScene(stages: string[], timings: number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.1, margin: "0px 0px 80px 0px" });
  const prefersReduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const last = stages.length - 1;
  useEffect(() => {
    if (prefersReduced) setStep(last);
  }, [prefersReduced, last]);
  const delay = timings[step] ?? 650;
  useEffect(() => {
    if (!visible || prefersReduced || step >= last) return;
    const timer = window.setTimeout(() => setStep((s) => Math.min(s + 1, last)), delay);
    return () => window.clearTimeout(timer);
  }, [visible, prefersReduced, step, last, delay]);
  return { ref, step };
}
function HeroEnquiry() {
  return (
    <div className="tr-hero-event">
      <div className="tr-glass tr-hero-event-body">
        <div className="tr-customer-heading">
          <span className="tr-person-avatar" />
          <div>
            <strong>Daniel Brooks</strong>
            <span>Website enquiry</span>
          </div>
        </div>
        <p>“Can you quote to replace our hot water unit?”</p>
        <p className="tr-hero-next">Automatic reply sent. Job details requested.</p>
      </div>
    </div>
  );
}
function EnquiryScene() {
  const scene = useScene(ENQUIRY_STAGES, [450]);
  return (
    <div
      ref={scene.ref}
      className="tr-enquiry-scene"
      data-step={scene.step}
      role="img"
      aria-label="Illustrative enquiry: Daniel asks about hot water replacement and receives an automatic request for job details"
    >
      <div className="tr-dialogue-row">
        <span className="tr-person-avatar" />
        <div className="tr-dialogue-content">
          <strong>Daniel Brooks</strong>
          <p className="tr-glass tr-dialogue-bubble">
            Hi, can you quote to replace our hot water unit in Marrickville?
          </p>
        </div>
      </div>
      <div
        className={`tr-dialogue-row tr-dialogue-outgoing tr-enquiry-ack ${scene.step >= 1 ? "is-revealed" : ""}`}
        aria-hidden={scene.step < 1}
      >
        <span className="tr-zapla-avatar">
          <ZaplaPetal />
        </span>
        <div className="tr-dialogue-content">
          <strong>Your business · Automated reply</strong>
          <div className="tr-glass tr-dialogue-bubble">
            <p>
              Thanks Daniel. What’s the property address? If you can send a photo of the existing
              unit, that will help us prepare for the quote.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
function QuoteScene() {
  const scene = useScene(QUOTE_STAGES, [450, 650]);
  return (
    <div
      ref={scene.ref}
      className="tr-quote-scene"
      data-step={scene.step}
      role="img"
      aria-label="Illustrative quote follow-up: Daniel asks whether removal is included; further reminders stop and his question goes to the team"
    >
      <div className="tr-glass tr-quote-summary">
        <div className="tr-customer-heading">
          <span className="tr-person-avatar" />
          <div>
            <strong>Daniel Brooks</strong>
            <span>Marrickville · Hot water replacement</span>
          </div>
        </div>
        <div className="tr-quote-jobline">
          <strong>Hot water replacement quote</strong>
          <span>{scene.step >= 2 ? "Customer replied" : "Awaiting response"}</span>
        </div>
      </div>
      <div
        className={`tr-dialogue-row tr-quote-message ${scene.step >= 1 ? "is-visible" : ""}`}
        aria-hidden={scene.step < 1}
      >
        <span className="tr-zapla-avatar">
          <ZaplaPetal />
        </span>
        <div className="tr-dialogue-content">
          <strong>Your business · Follow-up sent</strong>
          <p className="tr-glass tr-dialogue-bubble">
            Hi Daniel, did you have any questions about the hot water replacement quote? Reply here
            and we’ll help.
          </p>
        </div>
      </div>
      <div
        className={`tr-dialogue-row tr-quote-reply ${scene.step >= 2 ? "is-visible" : ""}`}
        aria-hidden={scene.step < 2}
      >
        <span className="tr-person-avatar" />
        <div className="tr-dialogue-content">
          <strong>Daniel Brooks</strong>
          <p className="tr-glass tr-dialogue-bubble">Does that include taking the old unit away?</p>
        </div>
      </div>
    </div>
  );
}
function ReturnScene() {
  const scene = useScene(RETURN_STAGES, [450, 650]);
  return (
    <div
      ref={scene.ref}
      className="tr-return-visual"
      data-step={scene.step}
      role="img"
      aria-label="Illustrative air conditioning service reminder, followed by a customer asking to arrange a visit"
    >
      <img
        src="/concept/customer-marketing-customer-message.webp"
        alt="A customer reading a message on her phone"
        width="733"
        height="1100"
        loading="lazy"
      />
      <div className="tr-glass tr-service-reminder">
        <div className="tr-overlay-heading">
          <span>Air conditioning service due</span>
          <ZaplaPetal />
        </div>
        <p>
          Hi Alex, your air conditioning service is due next month. Want us to arrange a visit
          before the warmer weather?
        </p>
        <span className="tr-message-link">
          Arrange a service <ArrowRight size={15} aria-hidden="true" />
        </span>
        <span className="tr-overlay-caption">
          {scene.step >= 1 ? "Reminder sent automatically" : "Based on the recorded service date"}
        </span>
      </div>
      <div
        className={`tr-glass tr-return-reply ${scene.step >= 2 ? "is-arrived" : ""}`}
        aria-hidden={scene.step < 2}
      >
        <div className="tr-customer-heading">
          <span className="tr-person-avatar" />
          <div>
            <strong>Alex Chen</strong>
            <span>Replied to the reminder</span>
          </div>
        </div>
        <p>“Yes please. Do you have a time next week?”</p>
      </div>
    </div>
  );
}
const REVIEW_STAGES = ["Job completed", "Invitation sent", "Review screen"];
function GoogleWordmark() {
  return (
    <span className="tr-google-wordmark" aria-label="Google">
      <span>G</span>
      <span>o</span>
      <span>o</span>
      <span>g</span>
      <span>l</span>
      <span>e</span>
    </span>
  );
}
function ReviewScene() {
  const scene = useScene(REVIEW_STAGES, [450, 650]);
  return (
    <section className="tr-reviews tr-wrap" aria-labelledby="review-title">
      <div
        ref={scene.ref}
        className="tr-review-scene"
        data-step={scene.step}
        role="img"
        aria-label="Illustrative review request after a completed hot water replacement; unselected review stars"
      >
        <div className="tr-review-completed">
          <span className="tr-person-avatar" />
          <span>
            Hot water replacement <strong>Job completed</strong>
          </span>
        </div>
        <div className="tr-review-message">
          <span className="tr-zapla-avatar">
            <ZaplaPetal />
          </span>
          <div className="tr-glass tr-review-invitation">
            <span className="tr-review-sender">
              Your business · {scene.step >= 1 ? "Invitation sent" : "Invitation prepared"}
            </span>
            <p>Thanks for having us out, Daniel. Would you share your experience on Google?</p>
            <span className="tr-google-link">
              Leave a Google review <ArrowRight size={15} aria-hidden="true" />
            </span>
          </div>
        </div>
        <div
          className={`tr-glass tr-google-review-screen ${scene.step >= 2 ? "is-visible" : ""}`}
          aria-hidden={scene.step < 2}
        >
          <GoogleWordmark />
          <h3>How did we do?</h3>
          <div
            className="tr-google-stars"
            aria-label="Five unselected rating stars in an illustrative review screen"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={28} strokeWidth={1.6} aria-hidden="true" />
            ))}
          </div>
          <span className="tr-google-write">Share your experience</span>
        </div>
      </div>
      <div className="tr-scene-copy">
        <Eyebrow>After the job is done</Eyebrow>
        <h2 id="review-title">
          Let your good work
          <br />
          build your reputation.
        </h2>
        <p>
          Send a Google review request after the job is marked complete in Zapla or through the
          agreed connection. Make it easy to share feedback and help the next homeowner feel
          confident choosing your business.
        </p>
        <ActionLink href="/reviews">Explore review automation</ActionLink>
      </div>
    </section>
  );
}

function TradesPlans() {
  return (
    <section className="tr-plans tr-wrap" aria-labelledby="plans-title">
      <div>
        <Eyebrow>Monthly plans</Eyebrow>
        <h2 id="plans-title">
          Plans for
          <br />
          your business.
        </h2>
        <p className="tr-plan-value">
          One setup for the customer work that’s easy to put off: enquiries, quote follow-up and
          review requests. Growth adds a reason for existing customers to book again.
        </p>
      </div>
      <div className="tr-plan-options">
        <div className="tr-plan-option">
          <div>
            <strong>Follow-Through</strong>
            <p>
              Automatic enquiry replies, customer conversations, quote follow-up and Google review
              requests.
            </p>
          </div>
          <span>
            A$399<small>/month</small>
          </span>
        </div>
        <div className="tr-plan-option">
          <div>
            <strong>Growth</strong>
            <p>Everything in Follow-Through, plus service reminders and customer reactivation.</p>
          </div>
          <span>
            A$699<small>/month</small>
          </span>
        </div>
        <p className="tr-plan-note">
          Unlimited users and stored contacts under fair use. GST, usage and Guided Launch setup
          extra. AI Receptionist is optional.{" "}
          <a href="/Pricing-v3">
            Compare plans and inclusions <ArrowRight size={14} aria-hidden="true" />
          </a>
        </p>
      </div>
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
