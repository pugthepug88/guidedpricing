import { GoogleReviewCard, ReviewInvitation } from "@/components/industry-v3/ReviewCards";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
const BOOK = "https://zapla.io/booking";
const ASSETS = "/concept/industries/";
function Label({ children }: { children: ReactNode }) {
  return <p className="ah3-eyebrow">{children}</p>;
}
function BookButton() {
  return (
    <a className="ah3-button ah3-primary" href={BOOK}>
      Book a call <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="ah3-text-link" href={href}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function Sender({ children }: { children: ReactNode }) {
  return (
    <div className="ah3-sender">
      <ZaplaPetal size={24} />
      <span>{children}</span>
    </div>
  );
}
function PatientIdentity({ detail }: { detail?: string }) {
  return (
    <div className="ah3-patient-identity">
      <span className="ah3-avatar" aria-hidden="true" />
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
  return <div className={"ah3-beat " + (active ? "ah3-beat-on " : "") + className}>{children}</div>;
}
export function AlliedHealthPage() {
  return (
    <main className="allied-health-v3-page" data-page="allied-health">
      <section className="ah3-hero ah3-wrap" aria-labelledby="ah3-title">
        <div className="ah3-hero-copy">
          <Label>Zapla for allied health practices</Label>
          <h1 id="ah3-title">Keep patient enquiries moving.</h1>
          <p className="ah3-intro">
            Reply to new enquiries, follow up unanswered messages and give reception a clear next
            step. Zapla brings enquiries, replies and reception tasks together while your team
            focuses on care.
          </p>
          <div className="ah3-actions">
            <BookButton />
            <TextLink href="#enquiry-story">See how it works</TextLink>
          </div>
          <p className="ah3-reassurance">
            For appointment based practices, including physiotherapy.
          </p>
        </div>
        <figure className="ah3-hero-visual">
          <img
            src={ASSETS + "allied-health-care.webp"}
            width={1536}
            height={1024}
            fetchPriority="high"
            alt="A physiotherapist guiding a seated patient through a shoulder movement"
          />
          <div className="ah3-hero-note ah3-glass">
            <PatientIdentity detail="Appointment enquiry" />
            <p>“Could reception help me find a time?”</p>
            <div className="ah3-task3-line">
              <Sender>Callback assigned to reception</Sender>
            </div>
          </div>
        </figure>
      </section>
      <section id="enquiry-story" className="ah3-enquiry ah3-wrap" aria-labelledby="ah3-enquiry-title">
        <div className="ah3-enquiry-panel">
          <div className="ah3-copy">
            <Label>New patient enquiries</Label>
            <h2 id="ah3-enquiry-title">Reply while reception is busy.</h2>
            <p>
              Zapla sends your reply and booking link, then follows up unresolved enquiries. When
              someone replies, reminders stop and reception gets the conversation and callback
              details.
            </p>
            <TextLink href="/follow-up-v3">Explore enquiry follow up</TextLink>
            <p className="ah3-aside">Your existing diary confirms appointments.</p>
          </div>
          <EnquiryStory />
        </div>
      </section>
      <section className="ah3-admin ah3-wrap" aria-labelledby="ah3-admin-title">
        <AdminScene />
        <div className="ah3-copy">
          <Label>Before reception calls</Label>
          <h2 id="ah3-admin-title">Have the details ready before you call.</h2>
          <p>
            A short form collects contact details and the best time to call. Zapla keeps the
            submission with the enquiry, reminds people with outstanding forms and updates
            reception’s task when details arrive.
          </p>
          <TextLink href="/crm-v3">Explore forms and enquiry records</TextLink>
          <p className="ah3-aside">Clinical forms and records stay in your practice system.</p>
        </div>
      </section>
      <section className="ah3-return ah3-wrap" aria-labelledby="ah3-return-title">
        <div className="ah3-return-heading">
          <div>
            <Label>Practitioner approved return reminders</Label>
            <h2 id="ah3-return-title">Help patients arrange their next visit.</h2>
          </div>
          <div>
            <p>
              When a practitioner recommends another visit, Zapla sends an agreed reminder using the
              due date your practice supplies. Patients can book or ask reception for help.
            </p>
            <p className="ah3-aside">
              Your practitioner decides who is due back. Reminders need current booking records and
              contact permissions.
            </p>
            <TextLink href="/reactivation-v3">Explore return reminders</TextLink>
          </div>
        </div>
        <ReturnScene />
      </section>
      <section className="ah3-feedback ah3-wrap" aria-labelledby="ah3-feedback-title">
        <div className="ah3-copy">
          <Label>Patient feedback and reviews</Label>
          <h2 id="ah3-feedback-title">Ask for feedback after the visit.</h2>
          <p>
            After a completed visit, Zapla sends a neutral feedback or review request. Direct
            replies reach reception, with clinical questions passed to a practitioner.
          </p>
          <TextLink href="/reviews-v3">Explore feedback and review requests</TextLink>
          <p className="ah3-aside">
            Healthcare advertising rules apply when reusing patient reviews in marketing.
          </p>
        </div>
        <ReviewScene />
      </section>
      <section className="ah3-control" aria-labelledby="ah3-control-title">
        <div className="ah3-wrap ah3-control-layout">
          <div>
            <Label>Fit for your starting point</Label>
            <h2 id="ah3-control-title">
              Fit around the tools
              <br />{" "}
              <span>your practice uses.</span>
            </h2>
            <div className="ah3-starting-points">
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
            <p className="ah3-aside">
              Clinical records and appointments stay in your practice system.
            </p>
          </div>
          <div className="ah3-control-right">
            <CallSupport />
          </div>
        </div>
      </section>
      <section className="ah3-value ah3-wrap" aria-labelledby="ah3-value-title">
        <div>
          <Label>Guided Launch</Label>
          <h2 id="ah3-value-title">Start with one useful workflow.</h2>
          <p>
            We map the gap, build the agreed messages and test replies and handovers with reception
            before launch.
          </p>
          <div className="ah3-actions">
            <BookButton />
            <TextLink href="/pricing-review-v3">View plans and pricing</TextLink>
          </div>
        </div>
        <div className="ah3-launch-cost">
          <h3>Know the cost before you start.</h3>
          <p>
            Follow-Through: A$399/month, with Guided Launch from A$1,997. Growth: A$699/month,
            with Guided Launch from A$2,997. Prices exclude GST. Both include unlimited users.
            Communication usage, optional AI Receptionist and custom connections are separate.
          </p>
          <p className="ah3-aside">
            We confirm the scope and costs with your practice before you commit.
          </p>
        </div>
      </section>
      <section className="ah3-faq ah3-wrap" aria-labelledby="ah3-faq-title">
        <div>
          <Label>Before you get started</Label>
          <h2 id="ah3-faq-title">
            How it fits
            <br />{" "}
            your practice.
          </h2>
        </div>
        <div className="ah3-faq-list">
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
      <section className="ah3-final ah3-wrap" aria-labelledby="ah3-final-title">
        <div className="ah3-petal-holder">
          <ZaplaPetal size={34} />
        </div>
        <h2 id="ah3-final-title">
          Give your next enquiry
          <br />{" "}a clear next step.
        </h2>
        <p>
          Book a call to map where patient enquiries get stuck and which steps Zapla can carry for
          your team.
        </p>
        <div className="ah3-actions">
          <BookButton />
          <a className="ah3-button ah3-secondary" href="/pricing-review-v3">
            View pricing
          </a>
        </div>
      </section>
    <p className="v3-scope-note">Standard Follow-Through Guided Launch includes up to three agreed automations. Growth campaign scope, additional workflows and connections are agreed before you commit. The stories above are illustrative examples, not customer results.</p>
    </main>
  );
}
function EnquiryStory() {
  const { ref, step } = useWorkflow();
  return (
    <div
      ref={ref}
      className="ah3-enquiry-demo"
      aria-label="Sample patient enquiry, automatic reply, follow up and reception callback"
    >
      <div className="ah3-enquiry-conversation">
        <div className="ah3-enquiry-patient-row">
          <span className="ah3-avatar" aria-hidden="true" />
          <div>
            <strong>Mia</strong>
            <p>Do you have physio appointments after 5?</p>
          </div>
        </div>
        <div className="ah3-enquiry-reply ah3-glass">
          <Sender>Your practice, via Zapla</Sender>
          <p>Hi Mia, you can see available times using our booking link.</p>
          <span className="ah3-example-link">
            View appointment times <ArrowRight size={14} aria-hidden="true" />
          </span>
        </div>
        <Beat active={step >= 1} className="ah3-enquiry-reminder">
          <Sender>Follow up</Sender>
          <p>Still need a time? Reply if you’d like reception to call.</p>
        </Beat>
        <Beat active={step >= 2}>
          <div className="ah3-enquiry-patient-row">
            <span className="ah3-avatar" aria-hidden="true" />
            <div>
              <strong>Mia</strong>
              <p>Yes please. Tomorrow morning would be great.</p>
            </div>
          </div>
        </Beat>
      </div>
      <div className="ah3-enquiry-record">
        <Beat active={step >= 2}>
          <Sender>Reception callback</Sender>
          <div className="ah3-enquiry-record-details">
            <span>Mia · Tomorrow morning</span>
            <span>Reminders stopped</span>
          </div>
        </Beat>
      </div>
    </div>
  );
}
function CallSupport() {
  return (
    <section className="ah3-call-support" aria-labelledby="ah3-call-title">
      <Label>Optional AI Receptionist</Label>
      <h3 id="ah3-call-title">Answer calls when reception can’t.</h3>
      <p>Handle approved administrative questions and have callback details ready for your team.</p>
      <div
        className="ah3-call-summary ah3-glass"
        aria-label="Sample appointment call captured for reception"
      >
        <PatientIdentity detail="Incoming appointment enquiry" />
        <p>“Could you help me arrange a physio appointment?”</p>
        <div className="ah3-call-response">
          <Sender>Your practice’s AI assistant</Sender>
          <p>I’m the practice’s AI assistant. What’s a good time for reception to call?</p>
        </div>
        <div className="ah3-call-patient-reply">
          <span className="ah3-avatar" aria-hidden="true" />
          <p>
            <strong>Mia</strong> Afternoon, please.
          </p>
        </div>
        <div className="ah3-task3-line">
          <Sender>Reception callback · Afternoon</Sender>
        </div>
      </div>
      <TextLink href="/ai-receptionist-v3">Explore AI Receptionist</TextLink>
      <p className="ah3-aside">
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
      className="ah3-admin-visual"
      aria-label="Sample administrative form submission updates a reception task"
    >
      <img
        src={ASSETS + "allied-health-form.webp"}
        width={1122}
        height={1402}
        loading="lazy"
        alt="A woman completing a short form on her phone at home"
      />
      <div className="ah3-form-overlay ah3-glass">
        <h3>Before we call</h3>
        <PatientIdentity detail="Appointment enquiry" />
        <dl>
          <div>
            <dt>Best time to call</dt>
            <dd>Tomorrow morning</dd>
          </div>
        </dl>
        <Beat active={step >= 1}>
          <p className="ah3-form-submitted">Details submitted</p>
        </Beat>
        <div className="ah3-form-outcome">
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
      className="ah3-return-visual"
      aria-label="Sample practitioner approved reminder and patient reply"
    >
      <img
        src={ASSETS + "allied-health-reception.webp"}
        width={1536}
        height={1024}
        loading="lazy"
        alt="A patient speaking with reception at a contemporary allied health practice"
      />
      <div className="ah3-return-reminder ah3-glass">
        <Sender>Your practice, via Zapla</Sender>
        <p>
          Hi Mia, your practitioner recommended another visit. Would you like reception to help
          you arrange a time?
        </p>
      </div>
      <div className="ah3-return-reply ah3-glass">
        <Beat active={step >= 1}>
          <PatientIdentity />
          <p>Could someone call me about a time next week?</p>
        </Beat>
        <div className="ah3-task3-line">
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
      className="ah3-review-scene"
      aria-label="Sample Google review request with no submitted patient review or rating"
    >
      <p className="ah3-review-trigger">After a completed visit</p>
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
