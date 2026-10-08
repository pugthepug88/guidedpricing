import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import dentalCss from "@/styles/dental.css?url";

const TITLE = "Patient Communication & Follow-Up for Dental Practices | Zapla";
const DESCRIPTION =
  "Keep dental enquiries and patient follow-up moving with Zapla. Support reception, reconnect with eligible patients and keep your existing dental software.";
export const Route = createFileRoute("/industries/dental")({
  staticData: { sitemap: false },
  head: () => ({
    links: [{ rel: "stylesheet", href: dentalCss }],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DentalPage,
});
const BOOK = "https://zapla.io/booking";
const FAQS = [
  [
    "Our dental software already sends reminders. Why add Zapla?",
    "Start with the gaps your team actually has: unanswered enquiries, follow-up that lives in someone's memory, or replies spread across channels. If your current system handles these well, keep that workflow there. Zapla should earn its place by solving an agreed gap.",
  ],
  [
    "Does Zapla connect to Dental4Windows, EXACT, Core Practice or Dentally?",
    "We do not promise a native connection to these systems. We review your software, available exports or APIs, permissions and process before agreeing the scope. A contact import is not a live sync. Where a connection cannot be verified, reception keeps booking and updating appointments in the existing dental system.",
  ],
  [
    "Can the AI Receptionist book directly into our dental diary?",
    "Only where the booking connection and permitted appointment types have been verified. Otherwise, use it for agreed routine enquiries and callback requests. Your team confirms appointments in the dental diary. Urgent concerns and clinical questions need a practice-approved human handoff process; AI does not diagnose, recommend treatment or assess urgency.",
  ],
  [
    "Can we follow up patients who asked for time to decide?",
    "Yes, an agreed non-clinical check-in can invite questions or offer contact with your team. Your practice chooses eligible patients, timing and wording. Configure the sequence to stop on a reply or opt-out, and keep clinical advice with your clinicians. No pressure, treatment recommendations or promises of results.",
  ],
  [
    "What patient information goes into Zapla?",
    "Agree the minimum information required for each workflow, such as contact details, communication preferences and an administrative follow-up status. Clinical charts, X-rays, health histories and treatment records stay in your dental software. Even contact and conversation data may reveal health information, so access, consent, hosting, providers and retention must be reviewed before importing patient data.",
  ],
  [
    "Can we contact inactive patients or ask for reviews?",
    "Select eligible recipients and check communication permissions before any campaign. Marketing messages need the appropriate consent, sender identification and opt-out process. For reviews, agree a neutral request process and check healthcare advertising rules. Collecting independent feedback and republishing clinical testimonials in advertising are different activities. No automatic testimonial widgets are part of this dental proposal.",
  ],
  [
    "What does it cost?",
    "Follow-Through is A$399 per month and Growth is A$699 per month, excluding GST. Both include unlimited users and stored contacts under fair use. Guided Launch, SMS, email and voice usage are separate. AI Receptionist is an optional add-on. We confirm the plan and implementation scope with your practice before you commit.",
  ],
] as const;
function Label({ children }: { children: ReactNode }) {
  return <p className="dn-label">{children}</p>;
}
function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="dn-link" href={href}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function Actions({ secondary = false }: { secondary?: boolean }) {
  return (
    <div className="dn-actions">
      <a className="dn-button dn-primary" href={BOOK}>
        Book a Call <ArrowRight size={16} aria-hidden="true" />
      </a>
      <a
        className={secondary ? "dn-button dn-secondary" : "dn-link"}
        href={secondary ? "/Pricing-v3" : "#patient-flow"}
      >
        {secondary ? "View pricing" : "See the patient flow"}
        {!secondary && <ArrowRight size={16} aria-hidden="true" />}
      </a>
    </div>
  );
}
function Message({
  sender,
  automated = false,
  visible = true,
  children,
}: {
  sender: string;
  automated?: boolean;
  visible?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`dn-message ${automated ? "dn-outgoing" : ""} ${visible ? "dn-visible" : "dn-hidden"}`}
      aria-hidden={!visible}
    >
      <span className={automated ? "dn-petal" : "dn-avatar"}>
        {automated && <ZaplaPetal size={28} />}
      </span>
      <div>
        <strong>{sender}</strong>
        <div className="dn-bubble">{children}</div>
      </div>
    </div>
  );
}
// One short causal sequence. Pre-trigger near the viewport, pause offscreen, hold the result.
function useDialogue() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.1, margin: "0px 0px 80px 0px" });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduced) setStep(2);
  }, [reduced]);
  useEffect(() => {
    if (!visible || reduced || step >= 2) return;
    const timer = window.setTimeout(
      () => setStep((s) => Math.min(s + 1, 2)),
      step === 0 ? 350 : 550,
    );
    return () => window.clearTimeout(timer);
  }, [visible, reduced, step]);
  return { ref, step };
}
function DentalPage() {
  return (
    <main className="dental-page" data-page="dental">
      <section className="dn-hero dn-wrap" aria-labelledby="dental-title">
        <div className="dn-hero-copy">
          <Label>For independent dental practices</Label>
          <h1 id="dental-title">
            Care in the chair.
            <br />
            <span>
              Follow-through
              <br />
              between visits.
            </span>
          </h1>
          <p className="dn-intro">
            Respond to new patient enquiries. Keep agreed follow-up moving. Help reception stay on
            top of the conversations that bring patients back.
          </p>
          <Actions />
          <p className="dn-hero-boundary">
            Your dental software stays. Zapla adds the patient communication around it.
          </p>
        </div>
        <div className="dn-hero-scene">
          <img
            src="/concept/industries/dental-reception.webp"
            alt="A receptionist helping a patient at an independent dental practice"
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <div className="dn-hero-note dn-glass">
            <div className="dn-note-heading">
              <ZaplaPetal size={25} />
              <span>New patient enquiry</span>
            </div>
            <p>“We’ve just moved nearby. Are you taking new patients?”</p>
            <div className="dn-note-result">
              Automatic reply sent.
              <br />
              Conversation ready for reception.
            </div>
          </div>
        </div>
      </section>
      <section className="dn-gap dn-wrap" aria-labelledby="gap-title">
        <h2 id="gap-title">
          The appointment is only
          <br />
          part of the relationship.
        </h2>
        <div className="dn-gap-rows">
          <p>
            <span>Before the first visit</span>A new patient asks. Reception is already helping
            someone.
          </p>
          <p>
            <span>After the discussion</span>A patient needs time. The next conversation never
            happens.
          </p>
          <p>
            <span>Between appointments</span>A reminder goes out. A reply still needs someone to act
            on it.
          </p>
        </div>
      </section>
      <div id="patient-flow">
        <section className="dn-split dn-wrap" aria-labelledby="enquiry-title">
          <EnquiryScene />
          <div className="dn-copy">
            <Label>New patient enquiries</Label>
            <h2 id="enquiry-title">
              A warm welcome.
              <br />
              Even when reception
              <br />
              is busy.
            </h2>
            <p>
              Acknowledge a web enquiry automatically and keep the reply with the patient’s contact
              record. Reception can pick up the conversation and arrange the right appointment in
              your dental diary.
            </p>
            <TextLink href="/follow-up">Explore Follow-Up</TextLink>
            <p className="dn-aside">
              Need help with incoming calls? Optional <a href="/ai-receptionist">AI Receptionist</a>{" "}
              can handle agreed routine questions and callback requests. Clinical questions stay
              with your team.
            </p>
          </div>
        </section>
        <section className="dn-follow" aria-labelledby="follow-title">
          <div className="dn-wrap dn-split">
            <div className="dn-copy">
              <Label>When a patient asks for time</Label>
              <h2 id="follow-title">
                Leave the door open.
                <br />
                <span>
                  Leave the choice
                  <br />
                  with the patient.
                </span>
              </h2>
              <p>
                Agree a gentle check-in after a treatment discussion, without including clinical
                details in the message. Give patients an easy way to ask a question or speak to your
                team.
              </p>
              <p>
                When they reply, the configured reminders stop and your team takes over. Your
                clinicians handle the advice.
              </p>
              <TextLink href="/crm">Keep the conversation together</TextLink>
            </div>
            <FollowScene />
          </div>
        </section>
        <section className="dn-return dn-wrap" aria-labelledby="return-title">
          <div className="dn-copy">
            <Label>Reconnecting between visits</Label>
            <h2 id="return-title">
              A relevant invitation.
              <br />A conversation
              <br />
              your team can finish.
            </h2>
            <p>
              For patients your practice has approved to contact, run a carefully scoped return
              campaign. Keep the invitation simple, respect communication preferences and bring
              replies back to reception.
            </p>
            <p className="dn-aside">
              Your dental system sets recall dates. Zapla uses only the agreed information supplied
              to it. We confirm how bookings, replies and opt-outs will be kept current before
              outreach begins.
            </p>
            <TextLink href="/reactivation">Explore patient reactivation</TextLink>
          </div>
          <ReturnScene />
        </section>
      </div>
      <section className="dn-boundary" aria-labelledby="boundary-title">
        <div className="dn-wrap">
          <Label>Two clear responsibilities</Label>
          <h2 id="boundary-title">
            Keep the clinical system.
            <br />
            <span>Close the communication gaps.</span>
          </h2>
          <div className="dn-responsibilities">
            <div>
              <h3>Your dental software</h3>
              <p>
                Clinical records, treatment plans, X-rays, billing, the appointment book and
                clinician-set recall dates.
              </p>
            </div>
            <div>
              <h3>Zapla</h3>
              <p>
                Enquiry conversations, agreed follow-up, eligible patient campaigns and the next
                administrative step for your team.
              </p>
            </div>
          </div>
          <p className="dn-boundary-note">
            No assumed PMS integration. We verify the data flow, permissions and booking process
            before recommending a setup.
          </p>
        </div>
      </section>
      <section className="dn-launch dn-wrap" aria-labelledby="launch-title">
        <div className="dn-copy">
          <Label>Guided Launch</Label>
          <h2 id="launch-title">
            Start with one gap.
            <br />
            Get the whole
            <br />
            practice comfortable.
          </h2>
          <p>
            We map how reception works today and agree the first workflow worth improving. Then we
            build, test and walk your team through it.
          </p>
          <TextLink href="/Pricing-v3">Explore plans and Guided Launch</TextLink>
        </div>
        <ol className="dn-launch-list">
          <li>
            <span>01</span>
            <div>
              <h3>Confirm the fit</h3>
              <p>
                Check what your dental software already does. Agree where Zapla adds value and how
                information stays current.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Set the boundaries</h3>
              <p>
                Agree minimum data, access, consent, message wording, stop rules and human handoffs.
                Review privacy and providers before patient data moves.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Test with your team</h3>
              <p>
                Walk through an enquiry, a reply and an opt-out. Confirm appointment handling,
                urgent-call escalation and who owns the next step.
              </p>
            </div>
          </li>
        </ol>
      </section>
      <section className="dn-value dn-wrap" aria-labelledby="value-title">
        <div>
          <Label>Room for the whole team</Label>
          <h2 id="value-title">
            Unlimited users.
            <br />
            One flat platform price.
          </h2>
        </div>
        <div>
          <p>
            Give reception, the practice manager and the people responsible for follow-up access to
            the same conversation.
          </p>
          <p className="dn-value-note">
            Unlimited stored contacts under fair use. GST, Guided Launch and communication usage are
            separate. AI Receptionist is an optional add-on.
          </p>
          <TextLink href="/Pricing-v3">Compare current plans</TextLink>
        </div>
      </section>
      <section className="dn-faq dn-wrap" aria-labelledby="faq-title">
        <div>
          <Label>A few practical questions</Label>
          <h2 id="faq-title">
            Before you add
            <br />
            anything new.
          </h2>
        </div>
        <div>
          {FAQS.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <ChevronDown size={17} aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="dn-final dn-wrap" aria-labelledby="final-title">
        <span className="dn-final-petal">
          <ZaplaPetal />
        </span>
        <h2 id="final-title">
          Find the follow-through
          <br />
          your practice is missing.
        </h2>
        <p>
          Show us how enquiries and patient communication work today. We’ll map the gaps, check the
          fit with your dental software and agree a sensible first step.
        </p>
        <Actions secondary />
      </section>
    </main>
  );
}
function EnquiryScene() {
  const { ref, step } = useDialogue();
  return (
    <div
      ref={ref}
      className="dn-dialogue dn-enquiry"
      aria-label="Illustrative new patient enquiry and reception handoff"
      data-step={step}
    >
      <p className="dn-scene-heading">A new patient gets a response</p>
      <Message sender="Mia">Hi, we’ve just moved nearby. Are you taking new patients?</Message>
      <Message sender="Your practice · Automated reply" automated visible={step >= 1}>
        Hi Mia, yes, we welcome new patients. Would you prefer a morning or afternoon callback from
        reception?
      </Message>
      <Message sender="Mia" visible={step >= 2}>
        Afternoon would be great. Thank you!
      </Message>
      <p className={`dn-handoff ${step >= 2 ? "dn-visible" : "dn-hidden"}`} aria-hidden={step < 2}>
        Callback request with reception
      </p>
    </div>
  );
}
function FollowScene() {
  const { ref, step } = useDialogue();
  return (
    <div
      ref={ref}
      className="dn-dialogue dn-follow-scene"
      aria-label="Illustrative patient-led follow-up; reply stops reminders and returns to the team"
      data-step={step}
    >
      <p className="dn-scene-heading">An agreed check-in after the visit</p>
      <div className="dn-follow-context">
        <span>Mia’s follow-up</span>
        <strong>{step >= 2 ? "Reply with your team" : "Check-in agreed"}</strong>
      </div>
      <Message sender="Your practice · Automated check-in" automated visible={step >= 1}>
        Hi Mia, as agreed, just checking whether you’d like to speak with our team about your next
        step. No rush. Reply here whenever you’re ready.
      </Message>
      <Message sender="Mia" visible={step >= 2}>
        Could someone call me tomorrow? I have a couple of questions.
      </Message>
      <p className={`dn-handoff ${step >= 2 ? "dn-visible" : "dn-hidden"}`} aria-hidden={step < 2}>
        Reminders stopped · Conversation with your team
      </p>
    </div>
  );
}
function ReturnScene() {
  const { ref, step } = useDialogue();
  return (
    <div
      ref={ref}
      className="dn-dialogue dn-return-scene"
      aria-label="Illustrative practice-approved patient return invitation and reply"
      data-step={step}
    >
      <p className="dn-scene-heading">A practice-approved return campaign</p>
      <div className="dn-audience">
        <span>Who gets the invitation?</span>
        <strong>Patients approved to contact</strong>
        <p>Current bookings, recent replies and opt-outs excluded using the agreed records.</p>
      </div>
      <Message sender="Your practice · Automated invitation" automated visible={step >= 1}>
        Hi Mia, it’s your dental practice. If you’d like to arrange your next visit, reply here and
        reception can help. Reply STOP to opt out.
      </Message>
      <Message sender="Mia" visible={step >= 2}>
        Thanks. Could reception call me about a time next week?
      </Message>
      <p className={`dn-handoff ${step >= 2 ? "dn-visible" : "dn-hidden"}`} aria-hidden={step < 2}>
        Reply with reception · Campaign follow-up stopped
      </p>
    </div>
  );
}
