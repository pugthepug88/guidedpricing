import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
const BOOK = "https://zapla.io/booking";
const ASSETS = "/concept/industries/";
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
      <ZaplaPetal size={24} />
      <span>{children}</span>
    </div>
  );
}
function useWorkflow() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.15, margin: "0px 0px 60px 0px" });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [manual, setManual] = useState(false);
  useEffect(() => {
    if (!visible || reduced || manual || step >= 2) return;
    const timer = window.setTimeout(
      () => setStep((s) => Math.min(s + 1, 2)),
      step === 0 ? 450 : 1100,
    );
    return () => window.clearTimeout(timer);
  }, [visible, reduced, manual, step]);
  return {
    ref,
    step: reduced ? 2 : step,
    choose: (n: number) => {
      setManual(true);
      setStep(n);
    },
  };
}
function Beat({
  active,
  children,
  className = "",
}: {
  active: boolean;
  children: ReactNode;
  className?: string;
}) {
  return <div className={"ah-beat " + (active ? "ah-beat-on " : "") + className}>{children}</div>;
}
export function AlliedHealthPage() {
  return (
    <main className="allied-health-page" data-page="allied-health">
      <section className="ah-hero ah-wrap" aria-labelledby="ah-title">
        <div className="ah-hero-copy">
          <Label>Zapla for allied health practices</Label>
          <h1 id="ah-title">Keep patient enquiries moving between appointments.</h1>
          <p className="ah-intro">
            Reply to new enquiries, follow up unanswered messages and give reception a clear next
            step. Zapla works around your existing practice software while your team focuses on
            care.
          </p>
          <div className="ah-actions">
            <BookButton />
            <TextLink href="#enquiry-story">See how it works</TextLink>
          </div>
          <p className="ah-reassurance">
            For appointment based practices, including physiotherapy.
          </p>
        </div>
        <figure className="ah-hero-visual">
          <img
            src={ASSETS + "allied-health-care.webp"}
            width={1536}
            height={1024}
            fetchPriority="high"
            alt="A physiotherapist guiding a seated patient through a shoulder movement"
          />
          <div className="ah-hero-note ah-glass">
            <Sender>Zapla follows through</Sender>
            <p>“Could reception help me find a time?”</p>
            <div className="ah-task-line">
              <span>Next step</span>
              <strong>Reception callback</strong>
            </div>
            <small>Illustrative enquiry handover</small>
          </div>
        </figure>
      </section>
      <section className="ah-opening ah-wrap" aria-label="Where Zapla helps">
        <p>
          The diary handles appointments.
          <br />
          <strong>What happens before someone books?</strong>
        </p>
        <div>
          <h3>A reply while you’re with patients.</h3>
          <p>Give a new enquiry a useful next step.</p>
        </div>
        <div>
          <h3>A handover reception can act on.</h3>
          <p>Keep the request, reply and owner together.</p>
        </div>
      </section>
      <section id="enquiry-story" className="ah-enquiry ah-wrap" aria-labelledby="ah-enquiry-title">
        <div className="ah-enquiry-panel">
          <div className="ah-copy">
            <Label>New patient enquiries</Label>
            <h2 id="ah-enquiry-title">
              Don’t leave the next appointment in an unanswered message.
            </h2>
            <p>
              A patient asks about evening appointments. Reception is busy. Without a reply or
              follow up, the enquiry can sit there even when your diary has room.
            </p>
            <p>
              Zapla sends your agreed reply and booking link. If the enquiry stays unresolved, it
              follows up. When the patient replies, scheduled follow ups stop and reception gets the
              conversation.
            </p>
            <TextLink href="/follow-up">Explore enquiry follow through</TextLink>
            <p className="ah-aside">
              Appointment confirmation stays with your booking system. A link click does not mean a
              booking.
            </p>
          </div>
          <EnquiryStory />
        </div>
      </section>
      <section className="ah-admin ah-wrap" aria-labelledby="ah-admin-title">
        <AdminScene />
        <div className="ah-copy">
          <Label>Before reception calls</Label>
          <h2 id="ah-admin-title">
            Ask once.
            <br />
            Pick up the conversation with the details ready.
          </h2>
          <p>
            Send a short administrative form for contact details and the best time to call. The
            submission stays with the enquiry, so reception can follow through without asking the
            same questions again.
          </p>
          <p>
            An outstanding form can trigger an agreed reminder. When it is submitted, the reminder
            stops and the task is updated.
          </p>
          <TextLink href="/crm">Explore forms and enquiry records</TextLink>
          <p className="ah-aside">
            For external forms, stopping reminders needs a verified completion signal. Use your
            existing forms where they already do the job. Medical history, symptoms and clinical
            consent stay in your practice system.
          </p>
        </div>
      </section>
      <section className="ah-return ah-wrap" aria-labelledby="ah-return-title">
        <div className="ah-return-heading">
          <div>
            <Label>Practitioner approved return reminders</Label>
            <h2 id="ah-return-title">
              When another visit is recommended, help the patient take the next step.
            </h2>
          </div>
          <div>
            <p>
              Use the due date and eligibility your practice supplies to send an agreed reminder.
              Give the patient a booking link or an easy way to ask reception for help.
            </p>
            <p className="ah-aside">
              Your practitioner decides who is due back. Booking status and contact permissions must
              be current. Being inactive alone is not a clinical reason for a reminder.
            </p>
            <TextLink href="/reactivation">Explore approved return campaigns</TextLink>
          </div>
        </div>
        <ReturnScene />
      </section>
      <section className="ah-feedback ah-wrap" aria-labelledby="ah-feedback-title">
        <div className="ah-copy">
          <Label>Patient feedback and reviews</Label>
          <h2 id="ah-feedback-title">
            Ask about the experience.
            <br />
            Give your team the reply.
          </h2>
          <p>
            After an agreed visit event, send a neutral feedback or review request. Route direct
            replies to a named person so reception can address administration concerns and a
            practitioner can handle clinical questions.
          </p>
          <TextLink href="/reviews">Explore feedback and review requests</TextLink>
          <p className="ah-aside">
            Invite people consistently, without incentives or filtering by positive feedback. Check
            healthcare advertising requirements before reusing reviews in your marketing.
          </p>
        </div>
        <ReviewScene />
      </section>
      <section className="ah-control" aria-labelledby="ah-control-title">
        <div className="ah-wrap ah-control-layout">
          <div>
            <Label>Around your existing practice software</Label>
            <h2 id="ah-control-title">
              Keep the diary.
              <br />
              Connect the admin.
              <br />
              <span>Leave care with people.</span>
            </h2>
            <p>
              Your practice system remains the home for clinical records and appointments. Zapla
              carries the agreed communication steps around it.
            </p>
            <p className="ah-aside">
              Connections are checked before they are promised. Direct diary updates require a
              supported, tested workflow.
            </p>
          </div>
          <div className="ah-control-right">
            <div>
              <h3>Routine steps, with a clear owner.</h3>
              <p>
                Configured replies, reminders and reception tasks. Stop on a reply, opt out or
                recorded resolution. Sensitive conversations and clinical decisions go to your team.
              </p>
            </div>
            <div className="ah-call-card">
              <Sender>Optional AI Receptionist</Sender>
              <h3>When reception can’t answer.</h3>
              <p>
                Handle agreed administrative questions and capture a callback request. A named
                person picks up what needs human help.
              </p>
              <TextLink href="/ai-receptionist">Explore call support</TextLink>
              <p className="ah-aside">
                AI does not diagnose, recommend treatment or assess urgency. Agree a human fallback
                and urgent call process before launch.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="ah-value ah-wrap" aria-labelledby="ah-value-title">
        <div>
          <Label>Guided Launch</Label>
          <h2 id="ah-value-title">Start with the gap that costs your team the most time.</h2>
          <p>
            Walk through a real enquiry with us. Choose one workflow, test it with reception and
            expand when it earns its place.
          </p>
          <div className="ah-actions">
            <BookButton />
            <TextLink href="/Pricing-v3">View plans and pricing</TextLink>
          </div>
        </div>
        <div className="ah-value-notes">
          <div>
            <h3>Fewer enquiries waiting for a reply.</h3>
            <p>Review unresolved enquiries and whether each has a next step and an owner.</p>
          </div>
          <div>
            <h3>Less repeated reception work.</h3>
            <p>Review duplicate questions, manual reminders and time spent chasing replies.</p>
          </div>
          <div>
            <h3>A scope you can assess.</h3>
            <p>
              Platform and Guided Launch fees apply. Communication usage and custom integration work
              are separate. Unlimited users keeps the whole team involved.
            </p>
          </div>
          <p className="ah-small">
            These are measures to review with your practice, not promised results.
          </p>
        </div>
      </section>
      <section className="ah-faq ah-wrap" aria-labelledby="ah-faq-title">
        <div>
          <Label>Before you get started</Label>
          <h2 id="ah-faq-title">
            How it fits
            <br />
            your practice.
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
          Give your next enquiry
          <br />a clear next step.
        </h2>
        <p>
          Book a call to map where patient enquiries get stuck and which steps Zapla can carry for
          your team.
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
  const { ref, step, choose } = useWorkflow();
  return (
    <div ref={ref} className="ah-enquiry-demo" aria-label="Illustrative enquiry follow through">
      <p className="ah-example">Illustrative workflow · fictional patient</p>
      <div className="ah-message ah-patient">
        <span>Patient enquiry</span>
        <p>Do you have physio appointments after 5?</p>
      </div>
      <div className="ah-message ah-zapla">
        <Sender>Your practice, via Zapla</Sender>
        <p>
          You can see our available times using our booking link. Reply here if you’d like reception
          to help.
        </p>
        <span className="ah-example-link">
          View appointment times <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
      <Beat active={step >= 1}>
        <div className="ah-message ah-zapla">
          <span>Agreed follow up, if unresolved</span>
          <p>Still looking for a suitable time? Reply if you’d like reception to call.</p>
        </div>
      </Beat>
      <Beat active={step >= 2}>
        <div className="ah-message ah-patient">
          <p>Yes please. Tomorrow morning would be great.</p>
        </div>
        <div className="ah-reception-task">
          <span>Reception task</span>
          <strong>Call about appointment options</strong>
          <p>Owner: reception · Tomorrow morning</p>
          <small>Reply received. Scheduled follow ups stopped.</small>
        </div>
      </Beat>
      <div className="ah-demo-steps" aria-label="Explore the enquiry workflow">
        {["Enquiry", "Follow up", "Handover"].map((label, n) => (
          <button key={label} type="button" aria-pressed={step === n} onClick={() => choose(n)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
function AdminScene() {
  const { ref, step } = useWorkflow();
  return (
    <div
      ref={ref}
      className="ah-admin-visual"
      aria-label="Illustrative administrative form and reception task"
    >
      <img
        src={ASSETS + "allied-health-form.webp"}
        width={1122}
        height={1402}
        loading="lazy"
        alt="A woman completing a short form on her phone at home"
      />
      <div className="ah-form-overlay ah-glass">
        <p className="ah-example">Illustrative administrative form</p>
        <h3>Before we call</h3>
        <dl>
          <div>
            <dt>Name</dt>
            <dd>Mia</dd>
          </div>
          <div>
            <dt>Best time to call</dt>
            <dd>Tomorrow morning</dd>
          </div>
        </dl>
        <Beat active={step >= 1}>
          <p className="ah-form-submitted">Details submitted</p>
        </Beat>
        <Beat active={step >= 2}>
          <div className="ah-form-outcome">
            <Sender>Zapla follows through</Sender>
            <p>
              Reception task updated.
              <br />
              Form reminder stopped.
            </p>
          </div>
        </Beat>
      </div>
    </div>
  );
}
function ReturnScene() {
  const { ref, step } = useWorkflow();
  return (
    <div
      ref={ref}
      className="ah-return-visual"
      aria-label="Illustrative approved return reminder and reception handover"
    >
      <img
        src={ASSETS + "allied-health-reception.webp"}
        width={1536}
        height={1024}
        loading="lazy"
        alt="A patient speaking with reception at a contemporary allied health practice"
      />
      <div className="ah-return-reminder ah-glass">
        <p className="ah-example">Illustrative approved reminder</p>
        <Sender>Your practice, via Zapla</Sender>
        <p>
          Your practice asked us to contact you about your next appointment. Reply if you’d like
          reception to help.
        </p>
        <small>Reply STOP to opt out.</small>
      </div>
      <Beat active={step >= 1} className="ah-return-reply ah-glass">
        <span>Patient reply</span>
        <p>Could someone call me about a time next week?</p>
        <Beat active={step >= 2}>
          <div className="ah-task-line">
            <strong>Reception takes over</strong>
            <small>Reply received. Reminder sequence stopped.</small>
          </div>
        </Beat>
      </Beat>
    </div>
  );
}
function ReviewScene() {
  const { ref, step } = useWorkflow();
  return (
    <div
      ref={ref}
      className="ah-review-scene"
      aria-label="Illustrative Google review invitation, not a real patient review"
    >
      <p className="ah-review-trigger">Agreed completed visit event</p>
      <Beat active={step >= 1}>
        <div className="ah-review-invite ah-glass">
          <Sender>Your practice, via Zapla</Sender>
          <p>
            Thanks for visiting. If you’d like to share your experience, you can leave a Google
            review.
          </p>
          <span className="ah-example-link">
            Leave a review <ArrowRight size={14} aria-hidden="true" />
          </span>
        </div>
      </Beat>
      <Beat active={step >= 2}>
        <div className="ah-google-screen">
          <div className="ah-google" aria-label="Google">
            {"Google".split("").map((letter, n) => (
              <span key={n} aria-hidden="true">
                {letter}
              </span>
            ))}
          </div>
          <h3>Your practice</h3>
          <div className="ah-google-stars" aria-label="Five unselected rating stars">
            {Array.from({ length: 5 }, (_, n) => (
              <Star key={n} size={29} strokeWidth={1.5} aria-hidden="true" />
            ))}
          </div>
          <p>Share your experience</p>
        </div>
      </Beat>
      <p className="ah-example">Illustrative invitation. No patient review or rating shown.</p>
    </div>
  );
}
const faqs = [
  [
    "What does it cost?",
    "Follow Through is A$399 per month with Guided Launch from A$1,997. Growth is A$699 per month with Guided Launch from A$2,997. Prices exclude GST. SMS, email and voice usage are separate. AI Receptionist is optional, and custom connections are scoped separately. We confirm the workflow, plan and setup cost before you commit.",
  ],
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
  [
    "Can Zapla handle digital new patient forms?",
    "An agreed administrative form can collect the details needed for reception, route the submission and stop outstanding form reminders. We check what your current software already does and where submissions should go. Medical history, symptoms, clinical consent and treatment records stay in the clinical system.",
  ],
  [
    "Can we automate feedback and Google review requests?",
    "We can configure a neutral request after an agreed event and route replies to your team. The practice approves eligibility, wording and communication permissions. Do not offer incentives or restrict review invitations to satisfied patients. Independent patient reviews and republishing clinical testimonials in healthcare advertising are different activities; review the advertising requirements before using feedback in marketing.",
  ],
];
