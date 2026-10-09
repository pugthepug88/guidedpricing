import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
const BOOK = "https://zapla.io/booking";
function Label({ children }: { children: ReactNode }) {
  return <p className="ah-eyebrow">{children}</p>;
}
function BookButton() {
  return (
    <a className="ah-button ah-primary" href={BOOK}>
      Book a Call <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="ah-text-link" href={href}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function Sender({ children }: { children: ReactNode }) {
  return (
    <div className="ah-sender">
      <ZaplaPetal size={26} />
      <span>{children}</span>
    </div>
  );
}
export function AlliedHealthPage() {
  return (
    <main className="allied-health-page" data-page="allied-health">
      <section className="ah-hero ah-wrap" aria-labelledby="ah-title">
        <div>
          <Label>Zapla for allied health</Label>
          <h1 id="ah-title">
            Keep new patient enquiries moving while your team is caring for people.
          </h1>
          <p className="ah-intro">
            Capture enquiries, give patients a clear next step and help reception follow through,
            alongside your existing practice software.
          </p>
          <div className="ah-actions">
            <BookButton />
            <TextLink href="#enquiry-story">See how it works</TextLink>
          </div>
          <p className="ah-reassurance">
            Keep your practice software. Start with the gaps worth fixing.
          </p>
        </div>
        <div className="ah-hero-visual">
          <img
            src="/concept/cinematic-v5/physio.jpg"
            width={800}
            height={450}
            fetchPriority="high"
            alt="A physiotherapist guiding a patient through a movement in a naturally lit practice"
          />
          <div className="ah-hero-note">
            <Sender>Zapla follows through</Sender>
            <p>“Can someone help me find a time?”</p>
            <div className="ah-note-outcome">
              <span>Callback task</span>
              <strong>Assigned to reception</strong>
            </div>
          </div>
        </div>
      </section>
      <section className="ah-fit ah-wrap" aria-labelledby="ah-fit-title">
        <div>
          <Label>Around your existing practice software</Label>
          <h2 id="ah-fit-title">
            Your clinical system
            <br />
            stays in charge.
          </h2>
        </div>
        <div className="ah-fit-roles">
          <div>
            <h3>Your practice software</h3>
            <p>
              Clinical records, your appointment diary and the booking tools your team already uses.
            </p>
          </div>
          <div>
            <h3>Zapla</h3>
            <p>
              Enquiry replies, agreed follow through and a clear owner when reception needs to step
              in.
            </p>
          </div>
          <p className="ah-small">
            We check your current setup first. Booking links can be a starting point; deeper
            connections depend on your software and the agreed scope.
          </p>
        </div>
      </section>
      <section id="enquiry-story" className="ah-story-section" aria-labelledby="ah-story-title">
        <div className="ah-wrap ah-story-layout">
          <div className="ah-copy">
            <Label>From enquiry to a human handoff</Label>
            <h2 id="ah-story-title">
              A booking link isn’t
              <br />
              the end of an enquiry.
            </h2>
            <p>
              Your practice software may already handle online bookings and reminders. The gap is
              the person who asks a question, doesn’t choose a time or needs someone to help.
            </p>
            <p>
              Zapla can send the agreed reply, follow through while the enquiry is unresolved and
              put the conversation in reception’s hands when the person replies.
            </p>
            <TextLink href="/follow-up">Explore enquiry follow through</TextLink>
          </div>
          <EnquiryStory />
        </div>
      </section>
      <section className="ah-call ah-wrap" aria-labelledby="ah-call-title">
        <div className="ah-call-scene">
          <p className="ah-call-label">When reception is unavailable</p>
          <p className="ah-call-quote">
            “I’d like someone to call me about making an appointment.”
          </p>
          <div className="ah-callback">
            <Sender>Optional AI Receptionist</Sender>
            <h3>A clear message for reception.</h3>
            <p>
              Appointment enquiry
              <br />
              Preferred callback time: tomorrow morning
            </p>
            <div className="ah-task-line">
              Next step <strong>Reception callback</strong>
            </div>
          </div>
          <p className="ah-example">Illustrative call summary</p>
        </div>
        <div className="ah-copy">
          <Label>Optional call support</Label>
          <h2 id="ah-call-title">When reception can’t answer, give callers a next step.</h2>
          <p>
            AI Receptionist can handle configured administrative questions and collect a callback
            request. Your team decides what it can answer and when a person should take over.
          </p>
          <p className="ah-aside">
            Clinical questions stay with your team. Agree a clear human fallback and an urgent call
            process before launch. AI does not assess urgency.
          </p>
          <TextLink href="/ai-receptionist">Explore AI Receptionist</TextLink>
        </div>
      </section>
      <section className="ah-control" aria-labelledby="ah-control-title">
        <div className="ah-wrap">
          <Label>Built around your team’s judgement</Label>
          <h2 id="ah-control-title">
            Routine communication can move automatically.
            <br />
            <span>Your team stays in control.</span>
          </h2>
          <div className="ah-control-columns">
            <div>
              <h3>Let Zapla carry the routine steps.</h3>
              <ul>
                <li>Send your configured acknowledgement and booking link.</li>
                <li>Follow through at the timing your practice agrees.</li>
                <li>Route replies and create a task with a named owner.</li>
                <li>Stop scheduled follow ups on reply, opt out or recorded resolution.</li>
              </ul>
            </div>
            <div>
              <h3>Keep care decisions with people.</h3>
              <ul>
                <li>Clinical questions and treatment advice.</li>
                <li>Whether an appointment or practitioner is appropriate.</li>
                <li>Who is eligible for a clinical recall.</li>
                <li>Exceptions, cancellations and sensitive conversations.</li>
              </ul>
            </div>
          </div>
          <p className="ah-control-bottom">
            A cancellation request can reach reception for review. Changing the diary or offering
            the slot requires an agreed, supported booking workflow.
          </p>
        </div>
      </section>
      <section className="ah-launch ah-wrap" aria-labelledby="ah-launch-title">
        <div className="ah-copy">
          <Label>Guided Launch</Label>
          <h2 id="ah-launch-title">
            Start with one gap
            <br />
            worth fixing.
          </h2>
          <p>Choose a useful first workflow, prove it with your team and expand from there.</p>
        </div>
        <div className="ah-launch-stages">
          <div>
            <h3>Map</h3>
            <p>
              Walk through your enquiry flow, existing tools and reception workload. Agree what
              success looks like.
            </p>
          </div>
          <div>
            <h3>Build</h3>
            <p>
              Configure messages, timing, responsibilities and contact permissions. Check the data
              and connections needed.
            </p>
          </div>
          <div>
            <h3>Launch</h3>
            <p>
              Test the reply, handoff, opt out and stop conditions with reception before going live.
              Review what needs attention.
            </p>
          </div>
        </div>
      </section>
      <section className="ah-commercial" aria-labelledby="ah-commercial-title">
        <div className="ah-wrap ah-commercial-layout">
          <div className="ah-copy">
            <Label>A scope that earns its place</Label>
            <h2 id="ah-commercial-title">
              Choose the scope
              <br />
              your practice needs.
            </h2>
            <p>
              Start with enquiry follow through. Add more only where there is a clear operational
              reason.
            </p>
            <a className="ah-button ah-secondary" href="/Pricing-v3">
              View plans and pricing <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="ah-scope-list">
            <div>
              <h3>Follow Through</h3>
              <p>
                The starting point for configured enquiry replies, follow ups and reception
                handoffs.
              </p>
            </div>
            <div>
              <h3>Growth, when it fits</h3>
              <p>
                Optional proactive communication to appropriate audiences, with contact permissions
                and practice approval.
              </p>
            </div>
            <div>
              <h3>AI Receptionist, if you need it</h3>
              <p>
                Optional incoming call support with an administrative scope and a clear route to
                your team.
              </p>
            </div>
            <p className="ah-small">
              A platform fee and Guided Launch setup apply. Communication usage and any custom
              integration work are separate. Unlimited users lets reception and practice owners
              share the workflow.
            </p>
          </div>
        </div>
      </section>
      <section className="ah-faq ah-wrap" aria-labelledby="ah-faq-title">
        <div>
          <Label>Before you get started</Label>
          <h2 id="ah-faq-title">
            Good questions.
            <br />
            Clear boundaries.
          </h2>
        </div>
        <div className="ah-faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="ah-final ah-wrap" aria-labelledby="ah-final-title">
        <div className="ah-petal-holder">
          <ZaplaPetal size={34} />
        </div>
        <h2 id="ah-final-title">
          See where Zapla fits
          <br />
          in your practice.
        </h2>
        <p>
          Bring your current enquiry process. We’ll map where the next step gets stuck and what is
          worth improving.
        </p>
        <div className="ah-actions">
          <BookButton />
          <a className="ah-button ah-secondary" href="/Pricing-v3">
            View pricing
          </a>
        </div>
      </section>
    </main>
  );
}
function EnquiryStory() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.1, margin: "0px 0px 80px 0px" });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [manual, setManual] = useState(false);
  useEffect(() => {
    if (reduced) setStep(2);
  }, [reduced]);
  useEffect(() => {
    if (!visible || reduced || manual || step >= 2) return;
    const timer = window.setTimeout(
      () => setStep((s) => Math.min(s + 1, 2)),
      step === 0 ? 350 : 600,
    );
    return () => window.clearTimeout(timer);
  }, [visible, reduced, manual, step]);
  return (
    <div
      ref={ref}
      className="ah-enquiry-demo"
      aria-label="Illustrative enquiry follow through"
      data-step={step}
    >
      <div className="ah-demo-top">
        <span>Appointment enquiry</span>
        <span>Illustrative workflow</span>
      </div>
      <div className="ah-message-thread">
        <div className="ah-message ah-patient">
          <span>Patient enquiry</span>
          <p>Do you have physio appointments after 5?</p>
        </div>
        <div className="ah-message ah-zapla">
          <Sender>Your practice, via Zapla</Sender>
          <p>
            Thanks for getting in touch. You can see our available times using our booking link.
            Reply here if you’d like reception to help.
          </p>
          <span className="ah-booking-link">Practice booking link</span>
        </div>
        <div className={"ah-progress-beat " + (step >= 1 ? "ah-shown" : "")} aria-hidden={step < 1}>
          <div className="ah-message ah-zapla">
            <Sender>Agreed follow up</Sender>
            <p>Still looking for a suitable time? Reply if you’d like reception to call you.</p>
          </div>
        </div>
        <div className={"ah-progress-beat " + (step >= 2 ? "ah-shown" : "")} aria-hidden={step < 2}>
          <div className="ah-message ah-patient">
            <p>Yes please. Tomorrow morning would be great.</p>
          </div>
          <div className="ah-reception-task">
            <div>
              <span>Reception task</span>
              <strong>Call about appointment options</strong>
              <p>Owner: reception · Tomorrow morning</p>
            </div>
            <div className="ah-stop-note">Reply received · Scheduled follow ups stopped</div>
          </div>
        </div>
      </div>
      <div className="ah-demo-steps" aria-label="Explore the workflow">
        {["Enquiry received", "Clear next step", "Reception takes over"].map((label, index) => (
          <button
            type="button"
            key={label}
            aria-pressed={step === index}
            onClick={() => {
              setManual(true);
              setStep(index);
            }}
            className={step === index ? "ah-step-selected" : ""}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="ah-demo-caption">
        A reply triggers the handoff. Appointment confirmation stays with your booking system.
      </p>
    </div>
  );
}
const faqs = [
  [
    "Can we keep our practice software?",
    "Yes. We first check which enquiry tasks it already handles, so Zapla addresses a real gap. If your current system handles the workflow well, keep it there. We confirm any required connections before committing to them.",
  ],
  [
    "Does Zapla confirm appointments in our diary?",
    "A practice booking link can direct people to your existing booking flow. Direct availability checks, diary updates or booking confirmations depend on a supported, tested connection. A link click is not a confirmed booking. We agree the source of booking status and stop conditions during scoping.",
  ],
  [
    "What information should we put into Zapla?",
    "Start with the minimum administrative information needed. Patient enquiries can contain sensitive information, so data handling, access, retention, service providers and any overseas processing must be checked with your practice before launch. Clinical notes stay in your clinical system.",
  ],
  [
    "Do we need AI Receptionist?",
    "No. It is optional. Start with written enquiries if that is your priority. For call support, agree its administrative scope, disclosure, escalation and human fallback before launch. AI does not diagnose, recommend treatment or assess urgency.",
  ],
  [
    "Can we contact past patients?",
    "Only where the purpose, audience and contact permissions are appropriate. Your practice decides eligibility and approves communication. Clinical recalls need practitioner oversight. Marketing needs appropriate consent, sender identification and a working opt out. A past appointment alone is not a reason to start a marketing sequence.",
  ],
];
