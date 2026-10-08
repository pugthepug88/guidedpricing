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
          "Keep workshop enquiries, estimate follow-up and customer return visits moving with Zapla. Built around your team and your existing workshop systems.",
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
            Capture workshop enquiries, follow up unanswered estimates and remind customers when
            their next service is due. Keep the customer side moving while your team stays on the
            tools.
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
          <p className="m2-hero-note">Keep your workshop software for jobs, vehicles and parts.</p>
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
                <Eyebrow>After the estimate goes out</Eyebrow>
                <h2 id="estimate-title">
                  An estimate sent isn’t
                  <br />a decision made.
                </h2>
              </div>
              <div>
                <p>
                  Your team has already spent time inspecting the car and preparing the estimate.
                  Give the customer a way to make a decision, without another round of manual
                  chasing. When they reply, the automated reminders stop.
                </p>
                <ActionLink href="/follow-up">Explore Follow-Up</ActionLink>
              </div>
            </div>
            <EstimateSceneV2 />
            <p className="m2-demo-note">
              Illustrative workshop flows. Triggers, data connections and handoffs are agreed during
              setup. Estimate details stay in your workshop system.
            </p>
          </div>
        </section>

        <section className="m2-return m2-wrap" aria-labelledby="return-title">
          <div className="m2-scene-copy">
            <Eyebrow>Long after the keys go back</Eyebrow>
            <h2 id="return-title">Bring customers back for their next service.</h2>
            <p>
              They already trust you with their car. Remind the right owner when their vehicle is
              due, then give reception the reply to arrange a time. Turn a service date into a
              conversation about the next visit.
            </p>
            <ActionLink href="/customer-marketing">Explore Customer Marketing</ActionLink>
            <div className="m2-return-support">
              <p>
                <strong>Someone you haven’t heard from?</strong> An agreed{" "}
                <a href="/reactivation">reactivation campaign</a> can reopen the conversation.
              </p>
              <p>
                <strong>A job just completed?</strong> Ask for honest feedback with a neutral{" "}
                <a href="/reviews">review request</a>.
              </p>
            </div>
          </div>
          <div className="m2-return-visual m2-return-focused">
            <img
              src="/concept/customer-marketing-service-arrival.svg"
              alt="A customer handing her keys to a mechanic at a workshop reception desk"
              width="1024"
              height="768"
              loading="lazy"
            />
            <ReturnScene />
          </div>
        </section>
      </div>

      <section className="m2-fit m2-wrap" aria-labelledby="fit-title">
        <Eyebrow>Works around the way you work</Eyebrow>
        <h2 id="fit-title">
          Your workshop system runs the job.
          <br />
          <span>Zapla handles the customer follow-through.</span>
        </h2>
        <div className="m2-fit-columns">
          <div>
            <h3>Your workshop system</h3>
            <p>
              Jobs, vehicle history, parts and the workshop diary stay with the tools your team
              already uses.
            </p>
          </div>
          <div>
            <h3>Zapla</h3>
            <p>
              Customer enquiries, conversations, relevant context and agreed follow-up stay
              connected to the next person who needs to act.
            </p>
          </div>
        </div>
        <p className="m2-fit-note">
          During setup, we agree what information Zapla needs, how it gets there and who owns each
          next step.
        </p>
      </section>

      <section className="m2-launch" aria-labelledby="launch-title">
        <div className="m2-wrap">
          <div className="m2-launch-heading">
            <div>
              <Eyebrow>Guided Launch</Eyebrow>
              <h2 id="launch-title">
                Start with the gaps
                <br />
                worth fixing.
              </h2>
            </div>
            <p>
              Build around your workshop’s capacity, your existing tools and the customer steps that
              need attention.
            </p>
          </div>
          <ol className="m2-launch-steps">
            <li>
              <span>1</span>
              <h3>Map</h3>
              <p>
                Look at how enquiries, estimates and return visits work today. Choose the gaps to
                address first.
              </p>
            </li>
            <li>
              <span>2</span>
              <h3>Build</h3>
              <p>
                Set up the agreed flows, customer information and handoffs. Give every next step an
                owner.
              </p>
            </li>
            <li>
              <span>3</span>
              <h3>Launch</h3>
              <p>
                Test the customer journey, train your team and check that messages stop when they
                should.
              </p>
            </li>
          </ol>
          <div className="m2-commercial">
            <p>
              <strong>Choose the scope that fits.</strong> Follow-Through supports incoming
              enquiries and active customer follow-up. Growth adds proactive campaigns and
              reactivation. AI Receptionist is optional.
            </p>
            <div>
              <p>
                Unlimited users. Stored contacts subject to fair use. Messaging and other usage are
                charged separately.
              </p>
              <ActionLink href="/Pricing-v3">Compare plans and setup</ActionLink>
            </div>
          </div>
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
          We’ll look at unanswered enquiries, outstanding estimates and upcoming services, then
          assess whether an agreed Zapla setup is worth the cost.
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

const ESTIMATE_STAGES = ["Estimate sent", "Reminder sent", "Reply received", "Team takes over"];
const HERO_STAGES = ["New enquiry", "Details captured", "Reception takes over"];
const ENQUIRY_STAGES = ["Customer asks", "Request acknowledged", "Reception takes over"];
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
  const scene = useScene(HERO_STAGES, [1800, 2100]);
  return (
    <div ref={scene.ref} className="m2-hero-event" data-step={scene.step}>
      <div className="m2-hero-event-body">
        <div className="m2-event-sender">
          <ZaplaPetal />
          <span>{scene.step === 0 ? "New workshop enquiry" : "Enquiry captured"}</span>
        </div>
        <strong>Mia’s brakes are squeaking.</strong>
        <p className="m2-hero-event-quote">“Could you take a look this week?”</p>
        <div className={`m2-hero-context ${scene.step >= 1 ? "is-revealed" : ""}`}>
          <span>Vehicle supplied</span>
          <strong>2019 Toyota RAV4</strong>
        </div>
        <div className={`m2-hero-next ${scene.step >= 2 ? "is-revealed" : ""}`}>
          <strong>Reception to confirm a time</strong>
        </div>
      </div>
      <SceneControls scene={scene} stages={HERO_STAGES} name="hero enquiry" />
    </div>
  );
}
function EnquiryScene() {
  const scene = useScene(ENQUIRY_STAGES, [1900, 2300]);
  return (
    <div ref={scene.ref} className="m2-enquiry-scene" data-step={scene.step}>
      <div className="m2-enquiry-source">
        <span className="m2-person-avatar" />
        <div>
          <strong>Mia Thompson</strong>
          <span>Workshop enquiry</span>
        </div>
      </div>
      <blockquote>
        “My brakes have started squeaking. Could you take a look this week? It’s a 2019 RAV4.”
      </blockquote>
      <div
        className={`m2-enquiry-ack ${scene.step >= 1 ? "is-revealed" : ""}`}
        aria-hidden={scene.step < 1}
      >
        <strong>Your workshop replied</strong>
        <p>
          Thanks Mia, we’ve received your request. Reception will check availability and confirm a
          time with you.
        </p>
      </div>
      <div className={`m2-enquiry-record ${scene.step >= 1 ? "is-captured" : ""}`}>
        <div className="m2-record-heading">
          <strong>Brake inspection</strong>
          <span>2019 Toyota RAV4</span>
        </div>
        <p className={`m2-reception-owner ${scene.step >= 2 ? "is-owned" : ""}`}>
          {scene.step >= 2
            ? "Reception: check availability and confirm a time."
            : "Request captured for workshop reception."}
        </p>
      </div>
      <SceneControls scene={scene} stages={ENQUIRY_STAGES} name="enquiry capture" />
    </div>
  );
}
function EstimateSceneV2() {
  const scene = useScene(ESTIMATE_STAGES, [2200, 3000, 2200]);
  return (
    <div ref={scene.ref} className="m2-estimate-scene" data-step={scene.step}>
      <div className="m2-estimate-summary">
        <span className="m2-person-avatar" />
        <div>
          <strong>Mia Thompson</strong>
          <span>2019 Toyota RAV4</span>
        </div>
        <p>
          Brake work <span>Estimate sent</span>
        </p>
      </div>
      <div className="m2-estimate-conversation">
        <div className="m2-estimate-thread">
          <div
            className={`m2-awaiting ${scene.step === 0 ? "is-waiting" : ""}`}
            aria-hidden={scene.step !== 0}
          >
            <h3>
              The estimate is out.
              <br />
              The decision is still open.
            </h3>
            <p>Mia has the estimate. An agreed follow-up gives her a way to answer.</p>
          </div>
          <div
            className={`m2-outgoing-message ${scene.step >= 1 ? "is-arrived" : ""}`}
            aria-hidden={scene.step < 1}
          >
            <div className="m2-event-sender">
              <ZaplaPetal />
              <span>Your workshop · Automated SMS</span>
            </div>
            <p>
              Hi Mia, just checking you received our brake estimate. Any questions before you
              decide?
            </p>
          </div>
          <div
            className={`m2-incoming-message ${scene.step >= 2 ? "is-arrived" : ""}`}
            aria-hidden={scene.step < 2}
          >
            <strong>Mia replied</strong>
            <p>Thanks! Can I drop the car off on Thursday?</p>
          </div>
        </div>
        <div className={`m2-next-reminder ${scene.step >= 2 ? "is-cancelled" : ""}`}>
          <strong>
            {scene.step >= 2
              ? "Mia replied. Next reminder cancelled."
              : "Next reminder: only if Mia hasn’t replied."}
          </strong>
        </div>
        <p className={`m2-team-handoff ${scene.step >= 3 ? "is-owned" : ""}`}>
          {scene.step >= 3
            ? "Reception: check the diary and confirm Thursday with Mia."
            : "Reception handles availability and the booking."}
        </p>
      </div>
      <SceneControls scene={scene} stages={ESTIMATE_STAGES} name="estimate follow-up" />
    </div>
  );
}
function ReturnScene() {
  const scene = useScene(RETURN_STAGES, [2300, 2600]);
  return (
    <div ref={scene.ref} className="m2-return-scene" data-step={scene.step}>
      <div className="m2-service-record">
        <div>
          <span className="m2-person-avatar" />
          <strong>Mia Thompson</strong>
        </div>
        <span>2019 Toyota RAV4</span>
        <p>
          <span>Service due</span>
          <strong>November</strong>
        </p>
      </div>
      <div className={`m2-return-message ${scene.step >= 1 ? "is-sent" : ""}`}>
        <div className="m2-event-sender">
          <ZaplaPetal />
          <strong>
            {scene.step >= 1 ? "Reminder sent by your workshop" : "Service reminder prepared"}
          </strong>
        </div>
        <p>
          Hi Mia, our records show your RAV4’s next service is due in November. Would you like us to
          find a suitable time?
        </p>
        <div
          className={`m2-return-reply ${scene.step >= 2 ? "is-arrived" : ""}`}
          aria-hidden={scene.step < 2}
        >
          <strong>Mia replied</strong>
          <span>Yes please. A Friday would be great.</span>
        </div>
        <div className="m2-service-caption">
          {scene.step >= 2
            ? "Reception to check a Friday with Mia"
            : "Based on the right vehicle’s service record"}
        </div>
      </div>
      <SceneControls scene={scene} stages={RETURN_STAGES} name="service reminder" />
    </div>
  );
}

// Prices match Pricing-v3. This is a cost threshold, not a forecast of workshop results.
const WORKSHOP_PLANS = {
  follow: { name: "Follow-Through", monthly: 399, setup: 1997 },
  growth: { name: "Growth", monthly: 699, setup: 2997 },
} as const;
function WorkshopCostCheck() {
  const [planKey, setPlanKey] = useState<keyof typeof WORKSHOP_PLANS>("growth");
  const [usage, setUsage] = useState("");
  const [contribution, setContribution] = useState("");
  const plan = WORKSHOP_PLANS[planKey];
  const usageValue = usage.trim() === "" ? 0 : Number(usage);
  const jobValue = Number(contribution);
  const validUsage = Number.isFinite(usageValue) && usageValue >= 0;
  const validJob = contribution.trim() !== "" && Number.isFinite(jobValue) && jobValue > 0;
  const ready = validUsage && validJob;
  const ongoing = plan.monthly + usageValue;
  const jobs = ready ? Math.ceil(ongoing / jobValue) : null;
  const firstYearJobs = ready ? Math.ceil((ongoing + plan.setup / 12) / jobValue) : null;
  const money = (amount: number) =>
    `A$${amount.toLocaleString("en-AU", { maximumFractionDigits: 2 })}`;
  return (
    <section className="m2-cost m2-wrap" aria-labelledby="cost-title">
      <div className="m2-cost-intro">
        <Eyebrow>Make the cost concrete</Eyebrow>
        <h2 id="cost-title">What would this need to earn back?</h2>
        <p>
          Use your own numbers to check the ongoing cost against the contribution from an additional
          completed job.
        </p>
        <details className="m2-cost-capacity">
          <summary>Already at capacity?</summary>
          <p>
            Compare the staff time you could realistically save with the cost. More bookings may not
            be your priority.
          </p>
        </details>
        <ActionLink href="/Pricing-v3">Check plans, inclusions and setup</ActionLink>
      </div>
      <div className="m2-cost-tool">
        <div className="m2-cost-fields">
          <label htmlFor="workshop-plan">
            Plan
            <select
              id="workshop-plan"
              value={planKey}
              onChange={(event) => setPlanKey(event.target.value as keyof typeof WORKSHOP_PLANS)}
            >
              <option value="follow">Follow-Through · A$399/month</option>
              <option value="growth">Growth · A$699/month</option>
            </select>
          </label>
          <p className="m2-cost-scope">
            {planKey === "growth"
              ? "Adds proactive service recall and reactivation."
              : "Enquiries and active follow-up. Proactive recall requires Growth."}
          </p>
          <label htmlFor="workshop-usage">
            Monthly usage and extras (A$)
            <input
              id="workshop-usage"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              placeholder="Enter your estimate"
              value={usage}
              aria-describedby="workshop-usage-help"
              onChange={(event) => setUsage(event.target.value)}
            />
          </label>
          <p id="workshop-usage-help" className="m2-cost-help">
            Include messaging and recurring add-ons. Blank counts as A$0.
          </p>
          <label htmlFor="workshop-contribution">
            Contribution per completed job (A$)
            <input
              id="workshop-contribution"
              type="number"
              min="0.01"
              step="any"
              inputMode="decimal"
              placeholder="Enter your workshop’s figure"
              value={contribution}
              aria-describedby="workshop-contribution-help"
              onChange={(event) => setContribution(event.target.value)}
            />
          </label>
          <p id="workshop-contribution-help" className="m2-cost-help">
            After parts, additional labour and other variable costs, not the invoice total.
          </p>
        </div>
        <div
          className={`m2-cost-result ${ready ? "has-result" : ""}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {ready ? (
            <>
              <p>To cover the ongoing monthly cost</p>
              <strong>
                {jobs} <span>{jobs === 1 ? "additional job" : "additional jobs"} / month</span>
              </strong>
              <p>
                {money(ongoing)} monthly cost ÷ {money(jobValue)} contribution, rounded up.
              </p>
              <p className="m2-cost-first-year">
                Including minimum setup spread over the first 12 months:{" "}
                <b>
                  {firstYearJobs} {firstYearJobs === 1 ? "job" : "jobs"} / month
                </b>
                .
              </p>
            </>
          ) : (
            <p className="m2-cost-empty">
              {!validUsage
                ? "Enter a monthly usage estimate of zero or more."
                : contribution !== "" && !validJob
                  ? "Enter a contribution greater than zero."
                  : "Enter your contribution per job to see the cost threshold."}
            </p>
          )}
        </div>
        <p className="m2-cost-disclosure">
          All figures exclude GST. {plan.name} setup starts at {money(plan.setup)} and is paid
          separately. Actual setup scope and usage can increase the cost. This is a cost check, not
          a forecast or a promise of additional jobs.
        </p>
      </div>
    </section>
  );
}
