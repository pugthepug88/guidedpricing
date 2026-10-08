import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronRight, Pause, Play, RotateCcw, Wrench } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import mechanicsV2Css from "@/styles/mechanics-v2.css?url";

export const Route = createFileRoute("/industries/mechanics-v2")({
  staticData: { sitemap: false },
  head: () => ({
    links: [
      { rel: "stylesheet", href: mechanicsV2Css },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&display=swap",
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
            An enquiry while you’re under the bonnet. An estimate the customer hasn’t answered. A
            service customer who hasn’t returned. Keep the next conversation moving without making
            your team chase every step.
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
            <Eyebrow>01 / While you’re on the tools</Eyebrow>
            <h2 id="enquiry-title">The enquiry shouldn’t have to wait for you.</h2>
            <p>
              A customer needs help while your team is busy. Bring their request and vehicle details
              into one conversation, with a clear next step for the person handling it.
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
                <Eyebrow>02 / After the estimate goes out</Eyebrow>
                <h2 id="estimate-title">
                  An estimate sent isn’t
                  <br />a decision made.
                </h2>
              </div>
              <div>
                <p>
                  Silence doesn’t tell you whether the customer is busy, unsure or ready to proceed.
                  A well timed follow-up gives them a way to answer. When they reply, the chase
                  stops.
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
            <Eyebrow>03 / Long after the keys go back</Eyebrow>
            <h2 id="return-title">The next visit starts before they need to call.</h2>
            <p>
              They already know your workshop. Give them a relevant reason to return. Use the right
              vehicle’s service date to send a timely reminder, then pick up the conversation when
              they reply.
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
          <div className="m2-return-visual">
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
            <span className="m2-icon-circle">
              <Wrench size={20} aria-hidden="true" />
            </span>
            <h3>Your workshop system</h3>
            <p>
              Jobs, vehicle history, parts and the workshop diary stay with the tools your team
              already uses.
            </p>
          </div>
          <div>
            <span className="m2-icon-circle m2-icon-petal">
              <ZaplaPetal />
            </span>
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
              <span>01</span>
              <h3>Map</h3>
              <p>
                Look at how enquiries, estimates and return visits work today. Choose the gaps to
                address first.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Build</h3>
              <p>
                Set up the agreed flows, customer information and handoffs. Give every next step an
                owner.
              </p>
            </li>
            <li>
              <span>03</span>
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

      <section className="m2-final m2-wrap" aria-labelledby="final-title">
        <span className="m2-final-petal">
          <ZaplaPetal />
        </span>
        <h2 id="final-title">
          See where Zapla fits
          <br />
          in your workshop.
        </h2>
        <p>
          We’ll look at your enquiries, estimate follow-up and existing systems, then agree which
          customer steps are worth automating.
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
const ENQUIRY_STAGES = ["Customer asks", "Details captured", "Reception takes over"];
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
function SceneControls({
  scene,
  stages,
  name,
  compact = false,
}: {
  scene: Scene;
  stages: string[];
  name: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`m2-controls ${compact ? "m2-controls-compact" : ""}`}
      aria-label={`${name} demonstration controls`}
    >
      {!compact && (
        <div className="m2-scene-stages">
          {stages.map((stage, i) => (
            <button
              key={stage}
              type="button"
              aria-label={`${name}: ${stage}`}
              aria-pressed={scene.step === i}
              className={scene.step === i ? "is-current" : scene.step > i ? "is-complete" : ""}
              onClick={() => scene.select(i)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {stage}
            </button>
          ))}
        </div>
      )}
      <div className="m2-playback">
        <span>{stages[scene.step]}</span>
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
  const scene = useScene(ENQUIRY_STAGES, [1800, 2100]);
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
          <span className="m2-owner-initials">WR</span>
          <div>
            <strong>Reception to confirm a time</strong>
            <span>Request captured. Team owns the booking.</span>
          </div>
        </div>
      </div>
      <SceneControls scene={scene} stages={ENQUIRY_STAGES} name="hero enquiry" compact />
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
      <div className="m2-capture-bridge">
        <span className={scene.step >= 1 ? "is-filled" : ""} />
        <ZaplaPetal />
        <p>
          {scene.step === 0
            ? "A customer starts the conversation"
            : "The useful details stay together"}
        </p>
      </div>
      <div className={`m2-enquiry-record ${scene.step >= 1 ? "is-captured" : ""}`}>
        <div className="m2-record-heading">
          <strong>Brake inspection</strong>
          <span>Customer request</span>
        </div>
        <div className="m2-vehicle-line">
          <span>Vehicle supplied</span>
          <strong>2019 Toyota RAV4</strong>
        </div>
        <div className={`m2-reception-owner ${scene.step >= 2 ? "is-owned" : ""}`}>
          <span className="m2-owner-initials">WR</span>
          <div>
            <strong>Workshop reception</strong>
            <span>
              {scene.step >= 2
                ? "Next: check the diary and confirm a time"
                : "Responsible for the next step"}
            </span>
          </div>
          <ArrowRight size={17} />
        </div>
      </div>
      <SceneControls scene={scene} stages={ENQUIRY_STAGES} name="enquiry capture" />
    </div>
  );
}
function EstimateSceneV2() {
  const scene = useScene(ESTIMATE_STAGES, [1800, 2600, 1700]);
  return (
    <div ref={scene.ref} className="m2-estimate-scene" data-step={scene.step}>
      <div className="m2-estimate-workspace">
        <aside className="m2-job-context">
          <div className="m2-event-sender">
            <ZaplaPetal />
            <strong>Customer follow-up</strong>
          </div>
          <div className="m2-job-person">
            <span className="m2-person-avatar" />
            <strong>Mia Thompson</strong>
            <span>2019 Toyota RAV4</span>
          </div>
          <div className="m2-job-summary">
            <span>Workshop estimate</span>
            <h3>Brake work</h3>
            <p>
              Estimate sent.
              <br />
              Customer decision requested.
            </p>
          </div>
          <div className={`m2-next-reminder ${scene.step >= 2 ? "is-cancelled" : ""}`}>
            <span>Next reminder</span>
            <strong>
              {scene.step >= 2 ? "Cancelled after Mia replied" : "Scheduled if there’s no reply"}
            </strong>
            <div className="m2-queued-message">Check in with Mia</div>
            <p>
              {scene.step >= 2
                ? "No more automated chasing."
                : "Only while the estimate is unanswered."}
            </p>
          </div>
        </aside>
        <div className="m2-estimate-conversation">
          <div className="m2-inbox-title">
            <strong>The conversation stays connected.</strong>
            <span>Workshop reception</span>
          </div>
          <div className="m2-estimate-thread">
            <div
              className={`m2-awaiting ${scene.step === 0 ? "is-waiting" : ""}`}
              aria-hidden={scene.step !== 0}
            >
              <span className="m2-awaiting-line" />
              <h3>
                An estimate.
                <br />
                An unanswered decision.
              </h3>
              <p>
                Mia has the estimate. Your team is busy.
                <br />
                The agreed follow-up is the next step.
              </p>
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
              <span className="m2-message-caption">
                A useful prompt, without another phone call.
              </span>
            </div>
            <div
              className={`m2-incoming-message ${scene.step >= 2 ? "is-arrived" : ""}`}
              aria-hidden={scene.step < 2}
            >
              <div>
                <span className="m2-person-avatar" />
                <strong>Mia replied</strong>
              </div>
              <p>Thanks! Can I drop the car off on Thursday?</p>
            </div>
          </div>
          <div className={`m2-team-handoff ${scene.step >= 3 ? "is-owned" : ""}`}>
            <span className="m2-owner-initials">WR</span>
            <div>
              <strong>
                {scene.step >= 3
                  ? "Your team takes it from here."
                  : scene.step >= 2
                    ? "Reply received. Follow-up stopped."
                    : "Your team owns the next decision."}
              </strong>
              <p>
                {scene.step >= 2
                  ? "Check the diary and confirm Thursday with Mia."
                  : "A customer reply stops the automated chase."}
              </p>
            </div>
            <ArrowRight size={19} />
          </div>
        </div>
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
          <strong>Mia’s RAV4</strong>
        </div>
        <span>2019 Toyota RAV4</span>
        <p>
          <span>Next service</span>
          <strong>November</strong>
        </p>
      </div>
      <div className={`m2-return-message ${scene.step >= 1 ? "is-sent" : ""}`}>
        <div className="m2-event-sender">
          <ZaplaPetal />
          <strong>{scene.step >= 1 ? "Your workshop" : "Prepared service reminder"}</strong>
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
      <SceneControls scene={scene} stages={RETURN_STAGES} name="service reminder" compact />
    </div>
  );
}
