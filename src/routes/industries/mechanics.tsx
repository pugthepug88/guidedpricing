import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  CheckCheck,
  ChevronRight,
  MessageCircle,
  Pause,
  Play,
  RotateCcw,
  Wrench,
} from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import mechanicsCss from "@/styles/mechanics.css?url";

export const Route = createFileRoute("/industries/mechanics")({
  staticData: { sitemap: false },
  head: () => ({
    links: [
      { rel: "stylesheet", href: mechanicsCss },
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
  component: MechanicsPage,
});

const BOOK = "https://zapla.io/booking";
function ActionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="mc-text-link" href={href}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mc-eyebrow">{children}</p>;
}
function MechanicsPage() {
  return (
    <main className="mechanics-page" data-page="mechanics">
      <section className="mc-hero mc-wrap" aria-labelledby="mechanics-title">
        <div className="mc-hero-copy">
          <Eyebrow>For independent mechanics and repair workshops</Eyebrow>
          <h1 id="mechanics-title">
            You fix the cars.
            <br />
            <span>Zapla follows through.</span>
          </h1>
          <p className="mc-intro">
            Handle incoming enquiries, follow up unanswered estimates and bring the right customers
            back. Zapla helps keep the customer side moving while your team gets on with the work.
          </p>
          <div className="mc-actions">
            <a className="mc-button mc-primary" href={BOOK}>
              Book a Call
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="mc-flow-link" href="#workshop-flow">
              See the workshop flow
              <ChevronRight size={17} aria-hidden="true" />
            </a>
          </div>
          <p className="mc-hero-note">Keep your workshop software for jobs, vehicles and parts.</p>
        </div>
        <div className="mc-hero-visual">
          <img
            className="mc-workshop-photo"
            src="/concept/industries/mechanics-workshop.webp"
            alt="A mechanic inspecting an engine in a modern independent workshop"
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <div className="mc-enquiry-overlay">
            <div className="mc-card-top">
              <span className="mc-petal-mini">
                <ZaplaPetal />
              </span>
              <span>New workshop enquiry</span>
              <span className="mc-status-dot" />
            </div>
            <p className="mc-card-name">
              Mia Thompson <span>Brake inspection</span>
            </p>
            <div className="mc-detail-row">
              <span>Vehicle supplied</span>
              <strong>2019 Toyota RAV4</strong>
            </div>
            <div className="mc-detail-row">
              <span>Next step</span>
              <strong>Team to confirm availability</strong>
            </div>
            <div className="mc-card-foot">
              <Check size={14} aria-hidden="true" />
              Booking request captured
            </div>
          </div>
        </div>
      </section>

      <div id="workshop-flow" className="mc-story">
        <section className="mc-enquiry mc-wrap" aria-labelledby="enquiry-title">
          <div className="mc-request-panel">
            <div className="mc-request-header">
              <span className="mc-icon-circle">
                <MessageCircle size={21} aria-hidden="true" />
              </span>
              <div>
                <strong>A customer needs help.</strong>
                <span>Your team is on the tools.</span>
              </div>
            </div>
            <div className="mc-customer-message">
              “My brakes have started squeaking. Could you take a look this week?”
            </div>
            <div className="mc-capture">
              <p className="mc-small-label">Ready for your team</p>
              <dl>
                <div>
                  <dt>Customer</dt>
                  <dd>Mia Thompson</dd>
                </div>
                <div>
                  <dt>Vehicle</dt>
                  <dd>2019 Toyota RAV4</dd>
                </div>
                <div>
                  <dt>Request</dt>
                  <dd>Brake inspection this week</dd>
                </div>
                <div>
                  <dt>Owner</dt>
                  <dd>Workshop reception</dd>
                </div>
              </dl>
              <p className="mc-capture-next">
                <Check size={15} aria-hidden="true" />
                Confirm a suitable time with Mia
              </p>
            </div>
            <p className="mc-panel-note">
              A request for your team to confirm. Your diary stays in charge.
            </p>
          </div>
          <div className="mc-scene-copy">
            <Eyebrow>01 / While you’re on the tools</Eyebrow>
            <h2 id="enquiry-title">The enquiry shouldn’t have to wait for you.</h2>
            <p>
              Give the customer a clear next step and give your team the details they need to
              respond. Keep the conversation, the supplied vehicle information and the person
              responsible together.
            </p>
            <p className="mc-aside">
              Want help answering calls too? AI Receptionist is an optional add-on, configured
              around what your workshop can handle.
            </p>
            <ActionLink href="/ai-receptionist">Explore AI Receptionist</ActionLink>
          </div>
        </section>

        <section className="mc-estimate-section" aria-labelledby="estimate-title">
          <div className="mc-wrap">
            <div className="mc-estimate-intro">
              <div>
                <Eyebrow>02 / After the estimate goes out</Eyebrow>
                <h2 id="estimate-title">
                  An estimate sent isn’t
                  <br />a decision made.
                </h2>
              </div>
              <div>
                <p>
                  A busy day can leave an estimate unanswered. Agree when to follow up, what to say
                  and when your team should take over.
                </p>
                <ActionLink href="/follow-up">Explore Follow-Up</ActionLink>
              </div>
            </div>
            <EstimateScene />
            <p className="mc-demo-note">
              Illustrative workshop flows. Triggers, data connections and handoffs are agreed during
              setup. Estimate details stay in your workshop system.
            </p>
          </div>
        </section>

        <section className="mc-return mc-wrap" aria-labelledby="return-title">
          <div className="mc-scene-copy">
            <Eyebrow>03 / Long after the keys go back</Eyebrow>
            <h2 id="return-title">The next visit starts before they need to call.</h2>
            <p>
              When you have reliable service information for the right vehicle, use it to send a
              relevant reminder. Give the customer a simple way to reply and your team a clear
              request to handle.
            </p>
            <ActionLink href="/customer-marketing">Explore Customer Marketing</ActionLink>
            <div className="mc-return-support">
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
          <div className="mc-return-visual">
            <img
              src="/concept/customer-marketing-service-arrival.svg"
              alt="A customer handing her keys to a mechanic at a workshop reception desk"
              width="1024"
              height="768"
              loading="lazy"
            />
            <div className="mc-reminder">
              <div className="mc-card-top">
                <span className="mc-petal-mini">
                  <ZaplaPetal />
                </span>
                <strong>Your workshop</strong>
                <span className="mc-small-label">SMS reminder</span>
              </div>
              <p>
                Hi Mia, our records show your RAV4’s next service is due in November. Would you like
                us to find a suitable time?
              </p>
              <div className="mc-reminder-footer">
                <CheckCheck size={15} aria-hidden="true" />
                <span>Sent using agreed service records</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="mc-fit mc-wrap" aria-labelledby="fit-title">
        <Eyebrow>Works around the way you work</Eyebrow>
        <h2 id="fit-title">
          Your workshop system runs the job.
          <br />
          <span>Zapla handles the customer follow-through.</span>
        </h2>
        <div className="mc-fit-columns">
          <div>
            <span className="mc-icon-circle">
              <Wrench size={20} aria-hidden="true" />
            </span>
            <h3>Your workshop system</h3>
            <p>
              Jobs, vehicle history, parts and the workshop diary stay with the tools your team
              already uses.
            </p>
          </div>
          <div>
            <span className="mc-icon-circle mc-icon-petal">
              <ZaplaPetal />
            </span>
            <h3>Zapla</h3>
            <p>
              Customer enquiries, conversations, relevant context and agreed follow-up stay
              connected to the next person who needs to act.
            </p>
          </div>
        </div>
        <p className="mc-fit-note">
          During setup, we agree what information Zapla needs, how it gets there and who owns each
          next step.
        </p>
      </section>

      <section className="mc-launch" aria-labelledby="launch-title">
        <div className="mc-wrap">
          <div className="mc-launch-heading">
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
          <ol className="mc-launch-steps">
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
          <div className="mc-commercial">
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

      <section className="mc-final mc-wrap" aria-labelledby="final-title">
        <span className="mc-final-petal">
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
        <div className="mc-actions">
          <a className="mc-button mc-primary" href={BOOK}>
            Book a Call
            <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a className="mc-button mc-secondary" href="/Pricing-v3">
            View pricing
          </a>
        </div>
      </section>
    </main>
  );
}

const STAGES = ["Waiting for an answer", "Follow-up sent", "Customer replies", "Team takes over"];
function EstimateScene() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduceActive, setReduceActive] = useState(false);
  useEffect(() => {
    setReduceActive(Boolean(reduced));
    if (reduced) {
      setStep(3);
      setPlaying(false);
      return;
    }
  }, [reduced]);
  useEffect(() => {
    if (reduced || !visible || !playing || step >= 3) return;
    const timer = window.setTimeout(() => setStep((s) => Math.min(s + 1, 3)), 2800);
    return () => window.clearTimeout(timer);
  }, [visible, playing, step, reduced]);
  return (
    <div className="mc-estimate-demo" ref={ref}>
      <div className="mc-demo-sidebar">
        <div className="mc-demo-brand">
          <ZaplaPetal />
          <strong>Estimate follow-up</strong>
        </div>
        <p className="mc-small-label">Customer journey</p>
        <div className="mc-stage-list">
          {STAGES.map((stage, i) => (
            <button
              type="button"
              key={stage}
              aria-pressed={step === i}
              onClick={() => {
                setPlaying(false);
                setStep(i);
              }}
              className={step === i ? "is-current" : step > i ? "is-complete" : ""}
            >
              <span>{step > i ? <Check size={13} aria-hidden="true" /> : `0${i + 1}`}</span>
              {stage}
            </button>
          ))}
        </div>
        <div className="mc-scene-controls">
          {step < 3 && !reduceActive ? (
            <button type="button" onClick={() => setPlaying((p) => !p)}>
              {playing ? (
                <Pause size={14} aria-hidden="true" />
              ) : (
                <Play size={14} aria-hidden="true" />
              )}
              {playing ? "Pause" : "Play"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setStep(0);
                setPlaying(!reduceActive);
              }}
            >
              <RotateCcw size={14} aria-hidden="true" />
              {reduceActive ? "Review steps" : "Replay"}
            </button>
          )}
        </div>
      </div>
      <div className="mc-demo-conversation">
        <div className="mc-conversation-head">
          <span className="mc-avatar" aria-hidden="true" />
          <div>
            <strong>Mia Thompson</strong>
            <span>2019 Toyota RAV4 · Brake inspection</span>
          </div>
          <span className="mc-owner">Workshop reception</span>
        </div>
        <div className="mc-thread">
          <div className="mc-estimate-record">
            <span className="mc-record-icon">
              <Wrench size={17} aria-hidden="true" />
            </span>
            <div>
              <strong>Estimate sent by your workshop</strong>
              <p>Brake work · Awaiting customer decision</p>
            </div>
          </div>
          <div
            className={`mc-message-slot ${step >= 1 ? "is-visible" : ""}`}
            aria-hidden={step < 1}
          >
            <div className="mc-sender">
              <ZaplaPetal />
              Your workshop · Automated follow-up
            </div>
            <div className="mc-outbound">
              Hi Mia, just checking you received our brake estimate. Any questions before you
              decide?
            </div>
          </div>
          <div
            className={`mc-message-slot mc-inbound-slot ${step >= 2 ? "is-visible" : ""}`}
            aria-hidden={step < 2}
          >
            <span className="mc-message-time">Mia replied</span>
            <div className="mc-inbound">Thanks! Can I drop the car off on Thursday?</div>
          </div>
        </div>
        <div className={`mc-handoff ${step >= 3 ? "is-done" : ""}`}>
          <Check size={16} aria-hidden="true" />
          <div>
            <strong>
              {step >= 3
                ? "Follow-up paused. Your team takes over."
                : "Your team owns the next decision."}
            </strong>
            <p>
              {step >= 3
                ? "Check the diary and confirm a time with Mia."
                : "A reply stops the chase. A booking still needs confirmation."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
