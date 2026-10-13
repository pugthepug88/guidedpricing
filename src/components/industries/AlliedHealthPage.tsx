import { GoogleReviewCard, ReviewInvitation } from "@/components/industries/ReviewCards";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
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
function PatientIdentity({ detail }: { detail?: string }) {
  return (
    <div className="ah-patient-identity">
      <span className="ah-avatar" aria-hidden="true" />
      <div>
        <strong>Mia</strong>
        {detail && <span>{detail}</span>}
      </div>
    </div>
  );
}
function useWorkflow() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.15, margin: "0px 0px 60px 0px" });
  const motionPreference = useReducedMotion();
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(Boolean(motionPreference)), [motionPreference]);
  const [step, setStep] = useState(0);
  const [foreground, setForeground] = useState(true);
  useEffect(() => {
    const update = () => setForeground(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (!visible || !foreground || reduced || step >= 2) return;
    const timer = window.setTimeout(
      () => setStep((s) => Math.min(s + 1, 2)),
      step === 0 ? 450 : 1100,
    );
    return () => window.clearTimeout(timer);
  }, [visible, foreground, reduced, step]);
  return { ref, step: reduced ? 2 : step };
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
            step. Zapla brings enquiries, replies and reception tasks together while your team
            focuses on care.
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
            <PatientIdentity detail="Appointment enquiry" />
            <p>“Could reception help me find a time?”</p>
            <div className="ah-task-line">
              <Sender>Callback assigned to reception</Sender>
            </div>
          </div>
        </figure>
      </section>
      <section id="enquiry-story" className="ah-enquiry ah-wrap" aria-labelledby="ah-enquiry-title">
        <div className="ah-enquiry-panel">
          <div className="ah-copy">
            <Label>New patient enquiries</Label>
            <h2 id="ah-enquiry-title">Reply while reception is busy.</h2>
            <p>
              Zapla sends your reply and booking link, then follows up unresolved enquiries. When
              someone replies, reminders stop and reception gets the conversation and callback
              details.
            </p>
            <TextLink href="/follow-up">Explore enquiry follow up</TextLink>
            <p className="ah-aside">Your existing diary confirms appointments.</p>
          </div>
          <EnquiryStory />
        </div>
      </section>
      <section className="ah-admin ah-wrap" aria-labelledby="ah-admin-title">
        <AdminScene />
        <div className="ah-copy">
          <Label>Before reception calls</Label>
          <h2 id="ah-admin-title">Have the details ready before you call.</h2>
          <p>
            A short form collects contact details and the best time to call. Zapla keeps the
            submission with the enquiry, reminds people with outstanding forms and updates
            reception’s task when details arrive.
          </p>
          <TextLink href="/crm">Explore forms and enquiry records</TextLink>
          <p className="ah-aside">Clinical forms and records stay in your practice system.</p>
        </div>
      </section>
      <section className="ah-return ah-wrap" aria-labelledby="ah-return-title">
        <div className="ah-return-heading">
          <div>
            <Label>Practitioner approved return reminders</Label>
            <h2 id="ah-return-title">Help patients arrange their next visit.</h2>
          </div>
          <div>
            <p>
              When a practitioner recommends another visit, Zapla sends an agreed reminder using the
              due date your practice supplies. Patients can book or ask reception for help.
            </p>
            <p className="ah-aside">
              Your practitioner decides who is due back. Reminders need current booking records and
              contact permissions.
            </p>
            <TextLink href="/reactivation">Explore return reminders</TextLink>
          </div>
        </div>
        <ReturnScene />
      </section>
      <section className="ah-feedback ah-wrap" aria-labelledby="ah-feedback-title">
        <div className="ah-copy">
          <Label>Patient feedback and reviews</Label>
          <h2 id="ah-feedback-title">Ask for feedback after the visit.</h2>
          <p>
            After a completed visit, Zapla sends a neutral feedback or review request. Direct
            replies reach reception, with clinical questions passed to a practitioner.
          </p>
          <TextLink href="/reviews">Explore feedback and review requests</TextLink>
          <p className="ah-aside">
            Healthcare advertising rules apply when reusing patient reviews in marketing.
          </p>
        </div>
        <ReviewScene />
      </section>
      <section className="ah-control" aria-labelledby="ah-control-title">
        <div className="ah-wrap ah-control-layout">
          <div>
            <Label>Fit for your starting point</Label>
            <h2 id="ah-control-title">
              Fit around the tools
              <br />
              <span>your practice uses.</span>
            </h2>
            <div className="ah-starting-points">
              <div>
                <h3>Enquiries in spreadsheets and inboxes?</h3>
                <p>Keep contact details, replies and reception tasks in one shared workflow.</p>
              </div>
              <div>
                <h3>Already using a CRM or practice software?</h3>
                <p>
                  Keep the workflows that work. Add Zapla where enquiries or callbacks still need
                  chasing.
                </p>
              </div>
            </div>
            <p className="ah-aside">
              Clinical records and appointments stay in your practice system.
            </p>
          </div>
          <div className="ah-control-right">
            <CallSupport />
          </div>
        </div>
      </section>
      <section className="ah-value ah-wrap" aria-labelledby="ah-value-title">
        <div>
          <Label>Guided Launch</Label>
          <h2 id="ah-value-title">Start with one useful workflow.</h2>
          <p>
            We map the gap, build the agreed messages and test replies and handovers with reception
            before launch.
          </p>
          <div className="ah-actions">
            <BookButton />
            <TextLink href="/Pricing-v3">View plans and pricing</TextLink>
          </div>
        </div>
        <div className="ah-launch-cost">
          <h3>Know the cost before you start.</h3>
          <p>
            Platform and Guided Launch fees apply. Communication usage, AI Receptionist and custom
            connections are separate. Plans include unlimited users.
          </p>
          <p className="ah-aside">
            We confirm the scope and costs with your practice before you commit.
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
  const { ref, step } = useWorkflow();
  return (
    <div
      ref={ref}
      className="ah-enquiry-demo"
      aria-label="Sample patient enquiry, automatic reply, follow up and reception callback"
    >
      <div className="ah-message ah-patient">
        <PatientIdentity detail="New patient enquiry" />
        <p>Do you have physio appointments after 5?</p>
      </div>
      <div className="ah-message ah-zapla">
        <Sender>Your practice, via Zapla</Sender>
        <p>Hi Mia, you can see available times using our booking link.</p>
        <span className="ah-example-link">
          View appointment times <ArrowRight size={14} aria-hidden="true" />
        </span>
        <div className="ah-enquiry-follow">
          <Beat active={step >= 1}>
            <span>If the enquiry is still unresolved</span>
            <p>Still need a time? Reply if you’d like reception to call.</p>
          </Beat>
        </div>
      </div>
      <div className="ah-message ah-patient">
        <Beat active={step >= 2}>
          <PatientIdentity />
          <p>Yes please. Tomorrow morning would be great.</p>
          <div className="ah-enquiry-outcome">
            <Sender>Callback assigned to reception</Sender>
          </div>
        </Beat>
      </div>
    </div>
  );
}
function CallSupport() {
  return (
    <section className="ah-call-support" aria-labelledby="ah-call-title">
      <Label>Optional AI Receptionist</Label>
      <h3 id="ah-call-title">Answer calls when reception can’t.</h3>
      <p>Handle approved administrative questions and have callback details ready for your team.</p>
      <div
        className="ah-call-summary ah-glass"
        aria-label="Sample appointment call captured for reception"
      >
        <PatientIdentity detail="Incoming appointment enquiry" />
        <p>“Could you help me arrange a physio appointment?”</p>
        <div className="ah-call-response">
          <Sender>Your practice’s AI assistant</Sender>
          <p>I’m the practice’s AI assistant. What’s a good time for reception to call?</p>
        </div>
        <div className="ah-call-patient-reply">
          <span className="ah-avatar" aria-hidden="true" />
          <p>
            <strong>Mia</strong> Afternoon, please.
          </p>
        </div>
        <div className="ah-task-line">
          <Sender>Reception callback · Afternoon</Sender>
        </div>
      </div>
      <TextLink href="/ai-receptionist">Explore AI Receptionist</TextLink>
      <p className="ah-aside">
        Clinical questions and urgent concerns need your team. AI does not assess urgency. Setup and
        usage charges apply.
      </p>
    </section>
  );
}
function AdminScene() {
  const { ref, step } = useWorkflow();
  return (
    <div
      ref={ref}
      className="ah-admin-visual"
      aria-label="Sample administrative form submission updates a reception task"
    >
      <img
        src={ASSETS + "allied-health-form.webp"}
        width={1122}
        height={1402}
        loading="lazy"
        alt="A woman completing a short form on her phone at home"
      />
      <div className="ah-form-overlay ah-glass">
        <h3>Before we call</h3>
        <PatientIdentity detail="Appointment enquiry" />
        <dl>
          <div>
            <dt>Best time to call</dt>
            <dd>Tomorrow morning</dd>
          </div>
        </dl>
        <Beat active={step >= 1}>
          <p className="ah-form-submitted">Details submitted</p>
        </Beat>
        <div className="ah-form-outcome">
          <Beat active={step >= 2}>
            <Sender>Callback task updated</Sender>
            <p>Form reminder stopped.</p>
          </Beat>
        </div>
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
      aria-label="Sample practitioner approved reminder and patient reply"
    >
      <img
        src={ASSETS + "allied-health-reception.webp"}
        width={1536}
        height={1024}
        loading="lazy"
        alt="A patient speaking with reception at a contemporary allied health practice"
      />
      <div className="ah-return-reminder ah-glass">
        <Sender>Your practice, via Zapla</Sender>
        <p>
          Hi Mia, your practice asked us to contact you about your next appointment. Reply if you’d
          like reception to help.
        </p>
      </div>
      <div className="ah-return-reply ah-glass">
        <Beat active={step >= 1}>
          <PatientIdentity />
          <p>Could someone call me about a time next week?</p>
        </Beat>
        <div className="ah-task-line">
          <Beat active={step >= 2}>
            <Sender>Reception callback assigned</Sender>
          </Beat>
        </div>
      </div>
    </div>
  );
}
function ReviewScene() {
  const { ref, step } = useWorkflow();
  return (
    <div
      ref={ref}
      className="ah-review-scene"
      aria-label="Sample Google review request with no submitted patient review or rating"
    >
      <p className="ah-review-trigger">After a completed visit</p>
      <ReviewInvitation sender="Your practice · Review invitation" visible={step >= 1}>
        Thanks for visiting, Mia. Would you share your experience on Google?
      </ReviewInvitation>
      <GoogleReviewCard visible={step >= 2} />
    </div>
  );
}
const faqs = [
  [
    "What does it cost?",
    "Follow Through covers configured enquiry follow ups, forms and review requests at A$399 per month, with Guided Launch from A$1,997. Growth adds ongoing return and nurture campaigns at A$699 per month, with Guided Launch from A$2,997. Prices exclude GST. Communication usage is separate from the platform fee. AI Receptionist is an optional A$199 per month add-on with setup from A$997, excluding GST. It includes 200 Voice AI minutes; additional voice usage is separate. Custom connections are scoped separately. We confirm the workflow, plan and setup cost before you commit.",
  ],
  [
    "Can we keep our practice software?",
    "Yes. Keep your clinical records and appointment diary. We check which enquiry tasks your current tools already handle and add Zapla only where there is a useful gap. If you use spreadsheets and inboxes for enquiries, Zapla can provide the shared contact record, conversation and task workflow. No native practice system connection is promised without verification.",
  ],
  [
    "Does Zapla confirm appointments in our diary?",
    "A practice booking link can direct people to your existing booking flow. Direct availability checks, diary updates or booking confirmations depend on a supported, tested connection. A link click is not a confirmed booking. We agree the source of booking status during scoping. Enquiry follow ups stop on a reply, opt out or resolved status.",
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
    "An administrative form can collect callback details, keep the submission with the enquiry and update reception’s task. Reminders stop on a verified submission. Sending a link to an external form does not tell Zapla it is complete; that requires a verified completion signal. Use existing forms when they already solve the need. Medical history, symptoms, clinical consent and treatment records stay in the clinical system.",
  ],
  [
    "Can we automate feedback and Google review requests?",
    "We can configure a neutral request after an agreed event and route replies to your team. The practice approves eligibility, wording and communication permissions. Do not offer incentives or restrict review invitations to satisfied patients. Independent patient reviews and republishing clinical testimonials in healthcare advertising are different activities; review the advertising requirements before using feedback in marketing.",
  ],
];
