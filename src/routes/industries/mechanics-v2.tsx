import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import mechanicsV2Css from "@/styles/mechanics-v2.css?url";

export const Route = createFileRoute("/industries/mechanics-v2")({
  staticData: { sitemap: false },
  head: () => ({
    links: [
      { rel: "stylesheet", href: mechanicsV2Css },
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
      { title: "Customer Follow-Up for Mechanics & Repair Workshops | Zapla" },
      {
        name: "description",
        content:
          "Keep workshop enquiries, quote follow-up and customer return visits moving with Zapla. Built around your team and your existing workshop systems.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MechanicsV2Page,
});

const BOOK = "https://zapla.io/booking";
function ActionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="m2-text-link" href={href}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="m2-eyebrow">{children}</p>;
}
function MechanicsV2Page() {
  return (
    <main className="mechanics-v2-page" data-page="mechanics-v2">
      <section className="m2-hero m2-wrap" aria-labelledby="mechanics-title">
        <div className="m2-hero-copy">
          <Eyebrow>For independent mechanics and repair workshops</Eyebrow>
          <h1 id="mechanics-title">
            You fix the cars.
            <br />
            <span>Zapla follows through.</span>
          </h1>
          <p className="m2-intro">
            Capture workshop enquiries, follow up unanswered quotes and remind customers when their
            next service is due. Keep the customer side moving while your team stays on the tools.
          </p>
          <div className="m2-actions">
            <a className="m2-button m2-primary" href={BOOK}>
              Book a Call
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="m2-flow-link" href="#workshop-flow">
              See the workshop flow
              <ChevronRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="m2-hero-visual">
          <img
            className="m2-workshop-photo"
            src="/concept/industries/mechanics-workshop.webp"
            alt="A mechanic inspecting an engine in a modern independent workshop"
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <HeroEnquiry />
        </div>
      </section>

      <div id="workshop-flow" className="m2-story">
        <section className="m2-enquiry m2-wrap" aria-labelledby="enquiry-title">
          <EnquiryScene />
          <div className="m2-scene-copy">
            <Eyebrow>While you’re on the tools</Eyebrow>
            <h2 id="enquiry-title">The enquiry shouldn’t have to wait for you.</h2>
            <p>
              Give an interested customer a next step while your team is busy. Acknowledge their
              request, capture their vehicle details and give reception the conversation to follow
              up.
            </p>
            <p className="m2-aside">
              Want help answering calls too? AI Receptionist is an optional add-on, configured
              around what your workshop can handle.
            </p>
            <ActionLink href="/ai-receptionist">Explore AI Receptionist</ActionLink>
          </div>
        </section>

        <section className="m2-estimate-section" aria-labelledby="estimate-title">
          <div className="m2-wrap">
            <div className="m2-estimate-intro">
              <div>
                <Eyebrow>After the quote goes out</Eyebrow>
                <h2 id="estimate-title">
                  A quote sent isn’t
                  <br />a decision made.
                </h2>
              </div>
              <div>
                <p>
                  You’ve inspected the car and sent the quote. Zapla follows up while the decision
                  is open, then stops the reminders when the customer replies.
                </p>
                <ActionLink href="/follow-up">Explore Follow-Up</ActionLink>
              </div>
            </div>
            <QuoteSceneV2 />
            <p className="m2-demo-note">
              Illustrative workshop flows. Triggers, data connections and handoffs are agreed during
              setup. Quotes stay in your workshop system.
            </p>
          </div>
        </section>

        <section className="m2-return m2-wrap" aria-labelledby="return-title">
          <div className="m2-scene-copy">
            <Eyebrow>Long after the keys go back</Eyebrow>
            <h2 id="return-title">Bring customers back for their next service.</h2>
            <p>
              A timely reminder gives an existing customer a reason to return. Use the right
              vehicle’s service date, then pick up the conversation when they reply.
            </p>
            <ActionLink href="/customer-marketing">Explore Customer Marketing</ActionLink>
            <p className="m2-return-support">
              For customers you haven’t heard from, an agreed{" "}
              <a href="/reactivation">reactivation campaign</a> can reopen the conversation.
            </p>
          </div>
          <ReturnScene />
        </section>
      </div>

      <ReviewScene />

      <section className="m2-fit m2-wrap" aria-labelledby="fit-title">
        <h2 id="fit-title">
          Keep your workshop system.
          <br />
          <span>Add the customer follow-through.</span>
        </h2>
        <p>
          Jobs, vehicles and parts stay where they are. During setup, we agree how Zapla gets the
          customer information it needs.
        </p>
      </section>

      <section className="m2-launch" aria-labelledby="launch-title">
        <div className="m2-wrap m2-launch-layout">
          <div className="m2-launch-copy">
            <Eyebrow>Guided Launch</Eyebrow>
            <h2 id="launch-title">
              Built around
              <br />
              your workshop.
            </h2>
            <p>We map your process, build the agreed flows and get your team ready to use them.</p>
            <ol className="m2-launch-steps">
              <li>
                <strong>Map</strong>
                <span>Choose the customer steps worth fixing.</span>
              </li>
              <li>
                <strong>Build</strong>
                <span>Connect the information and agree who acts next.</span>
              </li>
              <li>
                <strong>Launch</strong>
                <span>Test the journey and train your team.</span>
              </li>
            </ol>
            <ActionLink href="/Pricing-v3">Explore plans and Guided Launch</ActionLink>
          </div>
          <img
            src="/concept/guided-launch-natural-v6-760.webp"
            width="760"
            height="570"
            alt="A business owner and launch specialist working through the setup together"
            loading="lazy"
          />
        </div>
      </section>

      <WorkshopCostCheck />

      <section className="m2-final m2-wrap" aria-labelledby="final-title">
        <span className="m2-final-petal">
          <ZaplaPetal />
        </span>
        <h2 id="final-title">
          Find the follow-up
          <br />
          your workshop is missing.
        </h2>
        <p>
          We’ll look at unanswered enquiries, unanswered quotes and upcoming services, then assess
          whether an agreed Zapla setup is worth the cost.
        </p>
        <div className="m2-actions">
          <a className="m2-button m2-primary" href={BOOK}>
            Book a Call
            <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a className="m2-button m2-secondary" href="/Pricing-v3">
            View pricing
          </a>
        </div>
      </section>
    </main>
  );
}

const QUOTE_STAGES = ["Quote sent", "Follow-up sent", "Customer replied", "Reception follows up"];
const HERO_STAGES = ["New enquiry", "Request captured", "Reception follows up"];
const ENQUIRY_STAGES = ["Customer asks", "Workshop replies", "Reception follows up"];
const RETURN_STAGES = ["Service record", "Reminder sent", "Customer replies"];

// One finite sequence per scene. It pauses offscreen and never resets without a user action.
function useScene(stages: string[], timings: number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.25 });
  const prefersReduced = useReducedMotion();
  const [reduced, setReduced] = useState(false);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const last = stages.length - 1;
  useEffect(() => {
    setReduced(Boolean(prefersReduced));
    if (prefersReduced) {
      setStep(last);
      setPlaying(false);
    }
  }, [prefersReduced, last]);
  const delay = timings[step] ?? 2000;
  useEffect(() => {
    if (!visible || !playing || prefersReduced || step >= last) return;
    const timer = window.setTimeout(() => setStep((s) => Math.min(s + 1, last)), delay);
    return () => window.clearTimeout(timer);
  }, [visible, playing, prefersReduced, step, last, delay]);
  return {
    ref,
    step,
    playing,
    reduced,
    last,
    select: (i: number) => {
      setStep(i);
      setPlaying(false);
    },
    toggle: () => setPlaying((p) => !p),
    replay: () => {
      setStep(0);
      setPlaying(!reduced);
    },
  };
}
type Scene = ReturnType<typeof useScene>;
function SceneControls({ scene, stages, name }: { scene: Scene; stages: string[]; name: string }) {
  return (
    <div className="m2-controls" aria-label={`${name} demonstration controls`}>
      <select
        className="m2-stage-select"
        aria-label={`Review ${name} stage`}
        value={scene.step}
        onChange={(event) => scene.select(Number(event.target.value))}
      >
        {stages.map((stage, i) => (
          <option key={stage} value={i}>
            {stage}
          </option>
        ))}
      </select>
      <div className="m2-playback">
        {scene.step < scene.last && !scene.reduced ? (
          <button
            type="button"
            aria-label={`${scene.playing ? "Pause" : "Play"} ${name}`}
            onClick={scene.toggle}
          >
            {scene.playing ? <Pause size={13} /> : <Play size={13} />}{" "}
            {scene.playing ? "Pause" : "Play"}
          </button>
        ) : (
          <button type="button" aria-label={`Replay ${name}`} onClick={scene.replay}>
            <RotateCcw size={13} /> {scene.reduced ? "Review" : "Replay"}
          </button>
        )}
      </div>
    </div>
  );
}
function HeroEnquiry() {
  const scene = useScene(HERO_STAGES, [2000, 2400]);
  return (
    <div ref={scene.ref} className="m2-hero-event" data-step={scene.step}>
      <div className="m2-glass m2-hero-event-body">
        <div className="m2-customer-heading">
          <span className="m2-person-avatar" />
          <div>
            <strong>Mia Thompson</strong>
            <span>Workshop enquiry</span>
          </div>
        </div>
        <p>“My brakes are squeaking. Could you take a look this week?”</p>
        <p className="m2-hero-context">2019 Toyota RAV4</p>
        <p className="m2-hero-next">
          {scene.step >= 2
            ? "Reception to confirm a time."
            : scene.step >= 1
              ? "Request captured for reception."
              : "A new enquiry while you’re on the tools."}
        </p>
      </div>
      <SceneControls scene={scene} stages={HERO_STAGES} name="hero enquiry" />
    </div>
  );
}
function EnquiryScene() {
  const scene = useScene(ENQUIRY_STAGES, [2300, 2800]);
  return (
    <div ref={scene.ref} className="m2-enquiry-scene" data-step={scene.step}>
      <div className="m2-dialogue-row">
        <span className="m2-person-avatar" />
        <div className="m2-dialogue-content">
          <strong>Mia Thompson</strong>
          <p className="m2-dialogue-bubble">
            Hi, my brakes have started squeaking. Could you take a look this week? It’s a 2019 RAV4.
          </p>
        </div>
      </div>
      <div
        className={`m2-dialogue-row m2-dialogue-outgoing m2-enquiry-ack ${scene.step >= 1 ? "is-revealed" : ""}`}
        aria-hidden={scene.step < 1}
      >
        <span className="m2-zapla-avatar">
          <ZaplaPetal />
        </span>
        <div className="m2-dialogue-content">
          <strong>Your workshop · Automated reply</strong>
          <p className="m2-dialogue-bubble">
            Thanks Mia, we’ve received your request. Reception will check availability and confirm a
            time with you.
          </p>
        </div>
      </div>
      <p className="m2-enquiry-next">
        {scene.step >= 2
          ? "Reception has the request and vehicle details."
          : "The customer gets a reply while your team keeps working."}
      </p>
      <SceneControls scene={scene} stages={ENQUIRY_STAGES} name="enquiry capture" />
    </div>
  );
}
function QuoteSceneV2() {
  const scene = useScene(QUOTE_STAGES, [2200, 2600, 2200]);
  return (
    <div ref={scene.ref} className="m2-quote-scene" data-step={scene.step}>
      <div className="m2-quote-composition">
        <div className="m2-quote-paper">
          <div className="m2-customer-heading">
            <span className="m2-person-avatar" />
            <div>
              <strong>Mia Thompson</strong>
              <span>2019 Toyota RAV4</span>
            </div>
          </div>
          <div className="m2-quote-job">
            <span>Workshop quote</span>
            <h3>Brake work</h3>
            <p>
              {scene.step >= 2
                ? "Sent to Mia. Her response is with reception."
                : "Sent to Mia. Waiting for her decision."}
            </p>
          </div>
          <div className={`m2-quote-state ${scene.step >= 2 ? "has-reply" : ""}`}>
            <span>Customer response</span>
            <strong>{scene.step >= 2 ? "Mia replied" : "Still open"}</strong>
            <p>
              {scene.step >= 2
                ? "“Can I drop the car off on Thursday?”"
                : "The next step shouldn’t depend on another phone call."}
            </p>
          </div>
        </div>
        <div className="m2-quote-action">
          <span className="m2-quote-connector" aria-hidden="true" />
          <div className="m2-quote-followup">
            <ZaplaPetal />
            <span>{scene.step >= 1 ? "Follow-up sent" : "Follow-up agreed"}</span>
          </div>
          <h3>{scene.step >= 2 ? "The reply stops the chase." : "Give the quote a next step."}</h3>
          <div className={`m2-next-reminder ${scene.step >= 2 ? "is-cancelled" : ""}`}>
            <span>Next reminder</span>
            <strong>{scene.step >= 2 ? "Cancelled" : "Only if there’s no reply"}</strong>
          </div>
          <p className="m2-quote-owner">
            {scene.step >= 3
              ? "Reception checks Thursday and confirms with Mia."
              : "Reception handles availability and the booking."}
          </p>
        </div>
      </div>
      <SceneControls scene={scene} stages={QUOTE_STAGES} name="quote follow-up" />
    </div>
  );
}
function ReturnScene() {
  const scene = useScene(RETURN_STAGES, [2400, 2800]);
  return (
    <div ref={scene.ref} className="m2-return-visual" data-step={scene.step}>
      <img
        src="/concept/customer-marketing-service-arrival.svg"
        alt="A customer handing her keys to a mechanic at workshop reception"
        width="1024"
        height="768"
        loading="lazy"
      />
      <div className="m2-glass m2-service-reminder">
        <div className="m2-overlay-heading">
          <span>Service due in November</span>
          <ZaplaPetal />
        </div>
        <p>
          Hi Mia, your RAV4’s next service is due in November. Would you like us to find a suitable
          time?
        </p>
        <span className="m2-overlay-caption">
          {scene.step >= 1
            ? "Reminder sent by your workshop"
            : "Based on the vehicle’s service date"}
        </span>
      </div>
      <div
        className={`m2-glass m2-return-reply ${scene.step >= 2 ? "is-arrived" : ""}`}
        aria-hidden={scene.step < 2}
      >
        <div className="m2-customer-heading">
          <span className="m2-person-avatar" />
          <div>
            <strong>Mia Thompson</strong>
            <span>Replied to the reminder</span>
          </div>
        </div>
        <p>“Yes please. A Friday would be great.”</p>
        <span className="m2-overlay-caption">Reception to confirm a time with Mia.</span>
      </div>
      <SceneControls scene={scene} stages={RETURN_STAGES} name="service reminder" />
    </div>
  );
}
const REVIEW_STAGES = ["Service completed", "Invitation sent"];
function ReviewScene() {
  const scene = useScene(REVIEW_STAGES, [2600]);
  return (
    <section className="m2-reviews m2-wrap" aria-labelledby="review-title">
      <div ref={scene.ref} className="m2-review-scene" data-step={scene.step}>
        <div className="m2-review-completed">
          <div className="m2-customer-heading">
            <span className="m2-person-avatar" />
            <div>
              <strong>Mia’s RAV4</strong>
              <span>Service completed</span>
            </div>
          </div>
        </div>
        <span className="m2-review-connector" aria-hidden="true" />
        <div className={`m2-review-invitation ${scene.step >= 1 ? "is-sent" : ""}`}>
          <div className="m2-overlay-heading">
            <span>{scene.step >= 1 ? "Review invitation sent" : "Review invitation prepared"}</span>
            <ZaplaPetal />
          </div>
          <p>Thanks for bringing your RAV4 in, Mia. Would you share your experience on Google?</p>
          <span className="m2-google-link">
            Leave a Google review <ArrowRight size={15} aria-hidden="true" />
          </span>
        </div>
        <SceneControls scene={scene} stages={REVIEW_STAGES} name="review invitation" />
      </div>
      <div className="m2-scene-copy">
        <Eyebrow>After the job is done</Eyebrow>
        <h2 id="review-title">
          Don’t leave the review
          <br />
          to chance.
        </h2>
        <p>
          Send a Google review invitation after completed work, while the visit is still fresh. Make
          it easy for customers to share an honest experience.
        </p>
        <ActionLink href="/reviews">Explore review automation</ActionLink>
        <p className="m2-demo-note">
          Illustrative invitation. The completion trigger and timing are agreed during setup.
        </p>
      </div>
    </section>
  );
}

// Prices match Pricing-v3. This compares revenue, not profit or forecast results.
const WORKSHOP_PLANS = {
  follow: { name: "Follow-Through", monthly: 399, setup: 1997 },
  growth: { name: "Growth", monthly: 699, setup: 2997 },
} as const;
function WorkshopCostCheck() {
  const [planKey, setPlanKey] = useState<keyof typeof WORKSHOP_PLANS>("growth");
  const [jobValue, setJobValue] = useState("");
  const plan = WORKSHOP_PLANS[planKey];
  const value = Number(jobValue);
  const valid = jobValue.trim() !== "" && Number.isFinite(value) && value >= 0.01;
  const equivalent = valid ? plan.monthly / value : null;
  const money = (amount: number) => `A$${amount.toLocaleString("en-AU")}`;
  return (
    <section className="m2-cost m2-wrap" aria-labelledby="cost-title">
      <div className="m2-cost-intro">
        <Eyebrow>Put the monthly price in perspective</Eyebrow>
        <h2 id="cost-title">
          Put the price in
          <br />
          workshop terms.
        </h2>
      </div>
      <div className="m2-cost-tool">
        <div className="m2-cost-fields">
          <label htmlFor="workshop-plan">
            Your plan
            <select
              id="workshop-plan"
              value={planKey}
              onChange={(event) => setPlanKey(event.target.value as keyof typeof WORKSHOP_PLANS)}
            >
              <option value="follow">Follow-Through · A$399/month</option>
              <option value="growth">Growth · A$699/month</option>
            </select>
          </label>
          <label htmlFor="workshop-job-value">
            Average job value (A$)
            <input
              id="workshop-job-value"
              type="number"
              min="0.01"
              step="any"
              inputMode="decimal"
              placeholder="What you typically charge"
              value={jobValue}
              onChange={(event) => setJobValue(event.target.value)}
            />
          </label>
          <p className="m2-cost-scope">
            {planKey === "growth"
              ? "Growth includes proactive recall and reactivation."
              : "Proactive recall and reactivation require Growth."}
          </p>
        </div>
        <div className="m2-cost-result" aria-live="polite" aria-atomic="true">
          {valid && equivalent !== null ? (
            <>
              <p>The monthly plan is equivalent to</p>
              <strong>
                {equivalent < 0.1
                  ? "<0.1"
                  : equivalent.toLocaleString("en-AU", { maximumFractionDigits: 1 })}
                <span>average {equivalent === 1 ? "job" : "jobs"} in revenue</span>
              </strong>
              <p>
                {money(plan.monthly)} monthly plan ÷ {money(value)} average job value.
              </p>
            </>
          ) : (
            <p>
              {jobValue !== ""
                ? "Enter an average job value of A$0.01 or more."
                : "Enter your average job value to compare."}
            </p>
          )}
        </div>
      </div>
      <p className="m2-cost-disclosure">
        Revenue comparison, not profit or break-even. Excludes job costs, GST, usage and setup.{" "}
        {plan.name} setup starts at {money(plan.setup)} + GST. <a href="/Pricing-v3">See pricing</a>
        .
      </p>
    </section>
  );
}
