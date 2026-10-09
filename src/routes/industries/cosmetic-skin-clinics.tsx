import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Star, Check, FileText } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import skinCss from "@/styles/cosmetic-skin-clinics.css?url";

const TITLE = "CRM & Client Follow-Up for Skin & Cosmetic Clinics | Zapla";
const DESCRIPTION =
  "Automate skin clinic enquiry replies, pre-visit admin, consultation follow-up and eligible client reactivation. Keep your existing clinic software.";
export const Route = createFileRoute("/industries/cosmetic-skin-clinics")({
  staticData: { sitemap: false },
  head: () => ({
    links: [{ rel: "stylesheet", href: skinCss }],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SkinClinicsPage,
});
const BOOK = "https://zapla.io/booking";
const FAQS = [
  [
    "We already use Timely, Fresha, Kitomba or Pabau. Why add Zapla?",
    "Keep the workflows your existing software handles well. Zapla earns its place where new enquiries, agreed follow-up or campaign replies are still slipping between people and channels. We map that gap first. If your current system already solves it, adding another tool may not make sense.",
  ],
  [
    "Does Zapla integrate with our clinic software?",
    "No native connection to Timely, Fresha, Kitomba or Pabau is promised here. We verify your system, available APIs or exports, permissions and update process before recommending a workflow. A contact import is not a live sync. Your team continues to confirm appointments in your existing diary unless a booking connection has been tested.",
  ],
  [
    "Can AI recommend a treatment or answer suitability questions?",
    "No. Configure AI Receptionist for approved administrative questions such as opening hours, location and callback requests. Treatment suitability, risks, symptoms and clinical recommendations belong with your qualified team. We agree escalation and fallback procedures before enabling calls. Direct appointment booking depends on a verified connection.",
  ],
  [
    "Can we run campaigns for every treatment we offer?",
    "No. The clinic must approve the audience, purpose, wording and timing for each campaign. Prescription medicine advertising and regulated healthcare advertising have specific restrictions. Communication consent does not make an otherwise prohibited promotion permissible. The return invitation shown here is an administrative illustration, not a pre-approved template for every clinic or service.",
  ],
  [
    "What happens when someone replies or opts out?",
    "Set the relevant sequence to stop and bring the reply back to the conversation for your team. During launch we test replies, opt-outs and staff handoffs. Current bookings and communication preferences must be reflected through the agreed update process. We do not assume your existing diary automatically updates Zapla.",
  ],
  [
    "Do we move our clinical records into Zapla?",
    "This proposal is for client communication, not replacing clinical records. Treatment notes, consent forms, health histories and clinical photographs stay in your existing system. Agree the minimum administrative information for each workflow. Enquiries can still contain sensitive health information, so privacy, access, providers, hosting and retention need review before any client data is imported.",
  ],
  [
    "What about reviews and testimonials?",
    "Agree the approach for your services before using review requests or publishing feedback. Independent feedback and using clinical testimonials in healthcare advertising are different activities. This page does not promise automated clinical testimonial widgets or reputation campaigns for regulated services.",
  ],
  [
    "Can Zapla send forms and pre-visit information?",
    "Yes. Send a link to an administrative form or your existing clinic form, plus approved arrival information. Completion-based reminders need a verified form-submission event; sending an external link does not prove completion. Medical histories, treatment consent, clinical photographs and treatment advice stay in your approved clinical system. Appointment messages depend on reliable booking updates and are tested before launch.",
  ],
  [
    "How is Zapla priced?",
    "Follow-Through is A$399 per month, with Guided Launch from A$1,997. Growth is A$699 per month, with Guided Launch from A$2,997. Prices exclude GST. Both include unlimited users and stored contacts under fair use. SMS, email and voice usage are separate. AI Receptionist is optional. The clinic data flow and any extra integration work are scoped before you commit.",
  ],
] as const;
function Label({ children }: { children: ReactNode }) {
  return <p className="sk-label">{children}</p>;
}
function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="sk-link" href={href}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function Actions({ final = false }: { final?: boolean }) {
  return (
    <div className="sk-actions">
      <a className="sk-button sk-primary" href={BOOK}>
        Book a Call <ArrowRight size={16} aria-hidden="true" />
      </a>
      <a
        className={final ? "sk-button sk-secondary" : "sk-link"}
        href={final ? "/Pricing-v3" : "#clinic-flow"}
      >
        {final ? "View pricing" : "See the client flow"}
        {!final && <ArrowRight size={16} aria-hidden="true" />}
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
      className={`sk-message ${automated ? "sk-outgoing" : ""} ${visible ? "sk-visible" : "sk-hidden"}`}
      aria-hidden={!visible}
    >
      <span className={automated ? "sk-petal" : "sk-avatar"}>
        {automated && <ZaplaPetal size={28} />}
      </span>
      <div>
        <strong>{sender}</strong>
        <div className="sk-bubble">{children}</div>
      </div>
    </div>
  );
}
// Hydration-safe, finite sequence: begin at the viewport edge, never hide the first message.
// Timers pause offscreen; completed conversations never replay or regress.
function useDialogue() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.05, margin: "0px 0px 100px 0px" });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduced) setStep(2);
  }, [reduced]);
  useEffect(() => {
    if (!inView || reduced || step >= 2) return;
    const timer = window.setTimeout(
      () => setStep((s) => Math.min(2, s + 1)),
      step === 0 ? 200 : 450,
    );
    return () => window.clearTimeout(timer);
  }, [inView, reduced, step]);
  return { ref, step };
}
function SkinClinicsPage() {
  return (
    <main className="skin-clinics-page" data-page="skin-clinics">
      <section className="sk-hero sk-wrap" aria-labelledby="skin-title">
        <div className="sk-hero-copy">
          <Label>For skin & cosmetic clinics</Label>
          <h1 id="skin-title">
            Less chasing.
            <br />
            <span>
              More time
              <br /> with clients.
            </span>
          </h1>
          <p className="sk-intro">
            Reply to new enquiries, send pre-visit information and follow up after consultations.
            Zapla handles the routine messages while your team looks after the people in your
            clinic.
          </p>
          <Actions />
          <p className="sk-hero-boundary">
            Keep your clinic software. Add the client follow-up around it.
          </p>
        </div>
        <div className="sk-hero-scene">
          <img
            src="/concept/industries/skin-clinic-reception.webp"
            alt="A client talking with a receptionist in a contemporary skin clinic"
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <div className="sk-hero-note sk-glass">
            <div className="sk-note-heading">
              <ZaplaPetal size={25} />
              <span>Example · Consultation enquiry</span>
            </div>
            <p>“I’m thinking about a first visit. How do I get started?”</p>
            <div className="sk-note-result">
              Automatic reply sent.
              <br />
              Callback request with your clinic team.
            </div>
          </div>
        </div>
      </section>
      <section className="sk-gap sk-wrap" aria-labelledby="gap-title">
        <h2 id="gap-title">
          The appointment is only
          <br />
          part of the work.
        </h2>
        <div className="sk-gap-grid">
          <div>
            <span>Before they book</span>
            <p>A first enquiry arrives while reception is helping someone else.</p>
          </div>
          <div>
            <span>Before they arrive</span>
            <p>There are forms, directions and appointment details to send.</p>
          </div>
          <div>
            <span>After they leave</span>
            <p>A consultation needs a follow-up. A past client hasn’t returned.</p>
          </div>
        </div>
      </section>
      <section id="clinic-flow" className="sk-split sk-wrap" aria-labelledby="enquiry-title">
        <EnquiryScene />
        <div className="sk-copy">
          <Label>New client enquiries</Label>
          <h2 id="enquiry-title">
            Respond while
            <br />
            reception is busy.
          </h2>
          <p>
            A website enquiry triggers an automatic reply. Capture a callback preference and keep
            the conversation with the client’s contact record, ready for your team to arrange a
            consultation.
          </p>
          <Link href="/follow-up">Explore enquiry follow-up</Link>
          <p className="sk-aside">
            Need help with calls too? Optional <a href="/ai-receptionist">AI Receptionist</a>{" "}
            handles approved routine questions and callback requests. Clinical questions go to your
            qualified team.
          </p>
        </div>
      </section>
      <section className="sk-feature sk-wrap" aria-labelledby="admin-title">
        <div className="sk-admin-panel">
          <div className="sk-copy">
            <Label>Before the first visit</Label>
            <h2 id="admin-title">
              Send the essentials.
              <br />
              Before they arrive.
            </h2>
            <p>
              Once the consultation is confirmed, send directions, arrival details and a link to the
              clinic’s administrative form. Reception has less information to send by hand.
            </p>
            <p className="sk-supporting">
              Appointment messages use verified booking updates. Health histories and treatment
              consent stay in your clinical system.
            </p>
            <Link href="/crm">Explore forms and client records</Link>
          </div>
          <AdminScene />
        </div>
      </section>
      <section className="sk-feature sk-wrap" aria-labelledby="consider-title">
        <div className="sk-follow-panel">
          <div className="sk-copy">
            <Label>After a consultation</Label>
            <h2 id="consider-title">
              Follow up the enquiry.
              <br />
              Keep advice
              <br />
              with the clinician.
            </h2>
            <p>
              A client wants time to think. Zapla sends the check-in your team agreed with them, so
              reception doesn’t have to remember another callback.
            </p>
            <p>
              When they reply, automated reminders stop and your team gets the conversation.
              Treatment decisions stay between the clinician and client.
            </p>
            <Link href="/follow-up">Explore automatic follow-up</Link>
          </div>
          <ConsiderScene />
        </div>
      </section>
      <section className="sk-return sk-wrap" aria-labelledby="return-title">
        <div className="sk-return-heading">
          <div>
            <Label>Clients who haven’t returned</Label>
            <h2 id="return-title">
              Restart the conversation.
              <br />
              Without another
              <br />
              list to chase.
            </h2>
          </div>
          <div>
            <p>
              Contact eligible clients who haven’t returned with a relevant, clinic-approved
              invitation. Replies go to your team to discuss the next visit.
            </p>
            <Link href="/reactivation">Explore client reactivation</Link>
            <p className="sk-supporting">
              Use current bookings and communication permissions. Campaigns must be appropriate for
              your services and advertising rules.
            </p>
          </div>
        </div>
        <ReturnPhoto />
      </section>
      <section className="sk-reviews sk-wrap" aria-labelledby="review-title">
        <ReviewScene />
        <div className="sk-copy">
          <Label>After a completed visit</Label>
          <h2 id="review-title">
            Ask for feedback.
            <br />
            Without asking
            <br />
            reception to remember.
          </h2>
          <p>
            A recorded completed visit can trigger a neutral Google review invitation. Give clients
            a simple way to share their experience.
          </p>
          <p className="sk-supporting">
            Review requests depend on your services and the rules that apply. Clinical testimonials
            are not automatically republished in your advertising.
          </p>
          <Link href="/reviews">Explore review requests</Link>
        </div>
      </section>
      <section className="sk-fit sk-wrap" aria-labelledby="fit-title">
        <Label>Works around your clinic</Label>
        <h2 id="fit-title">
          Your clinic system stays.
          <br />
          <span>The chasing doesn’t have to.</span>
        </h2>
        <div className="sk-responsibilities">
          <div>
            <h3>Your clinic software</h3>
            <p>
              The appointment diary, health histories, treatment notes, consent and clinical
              photographs.
            </p>
          </div>
          <div>
            <h3>Zapla</h3>
            <p>
              Enquiry replies, pre-visit admin, consultation follow-up, eligible client campaigns
              and conversations your team can pick up.
            </p>
          </div>
        </div>
        <p className="sk-fit-note">
          No native connection to Timely, Fresha, Kitomba or Pabau is assumed. We check the
          available data flow before agreeing the scope.
        </p>
      </section>
      <section className="sk-launch" aria-labelledby="launch-title">
        <div className="sk-wrap sk-launch-inner">
          <div className="sk-copy">
            <Label>Guided Launch</Label>
            <h2 id="launch-title">
              Built around
              <br />
              your reception desk.
            </h2>
            <p>
              We map the work your team is doing by hand, build the useful automations and test them
              with your clinic before launch.
            </p>
            <Link href="/Pricing-v3">Explore Guided Launch</Link>
          </div>
          <ol className="sk-launch-list">
            <li>
              <span>01</span>
              <div>
                <h3>Find the gaps</h3>
                <p>
                  Keep what your existing software does well. Choose where Zapla can reduce chasing.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Build the follow-up</h3>
                <p>Agree messages, timing, permissions and who handles replies.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Test with your team</h3>
                <p>
                  Check enquiries, booking updates, replies and opt-outs. Measure manual follow-up
                  time and response handling against your starting point.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section className="sk-value sk-wrap" aria-labelledby="value-title">
        <div>
          <Label>Room for your whole team</Label>
          <h2 id="value-title">
            Unlimited users.
            <br />
            One flat platform price.
          </h2>
        </div>
        <div>
          <p>
            Reception, the clinic manager and client coordinators share the same conversations
            without another seat charge.
          </p>
          <div className="sk-plan-prices" aria-label="Current clinic platform plans">
            <div>
              <strong>Follow-Through</strong>
              <span>A$399/month</span>
              <small>Guided Launch from A$1,997</small>
            </div>
            <div>
              <strong>Growth</strong>
              <span>A$699/month</span>
              <small>Guided Launch from A$2,997</small>
            </div>
          </div>
          <p className="sk-value-note">
            Unlimited stored contacts under fair use. GST, Guided Launch and SMS, email and voice
            usage are separate. AI Receptionist is optional.
          </p>
          <Link href="/Pricing-v3">Compare plans and costs</Link>
        </div>
      </section>
      <section className="sk-faq sk-wrap" aria-labelledby="faq-title">
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
      <section className="sk-final sk-wrap" aria-labelledby="final-title">
        <span className="sk-final-petal">
          <ZaplaPetal />
        </span>
        <h2 id="final-title">
          See what Zapla can
          <br />
          automate for your clinic.
        </h2>
        <p>
          Show us how enquiries and client follow-up work today. We’ll identify useful automations,
          check the fit with your clinic software and explain the setup and costs.
        </p>
        <Actions final />
      </section>
    </main>
  );
}
function AdminScene() {
  const { ref, step } = useDialogue();
  return (
    <div
      ref={ref}
      className="sk-admin-scene"
      data-step={step}
      aria-label="Illustrative pre-visit admin message and form delivery"
    >
      <img
        src="/concept/industries/skin-clinic-previsit.webp"
        alt="A woman using her phone at home before her clinic visit"
        width="1536"
        height="1024"
        loading="lazy"
      />
      <div className="sk-admin-note sk-glass">
        <div className="sk-note-heading">
          <FileText size={18} aria-hidden="true" />
          Before your consultation
        </div>
        <h3>
          Your first visit.
          <br />
          The essentials, sent.
        </h3>
        <p>Hi Mia, here are our arrival details and a short form for your contact preferences.</p>
        <span className="sk-example-link">View arrival details</span>
        <span className="sk-example-link">Complete contact details</span>
        <div
          className={`sk-status ${step >= 1 ? "sk-visible" : "sk-hidden"}`}
          aria-hidden={step < 1}
        >
          <Check size={16} aria-hidden="true" />
          Pre-visit message sent
        </div>
      </div>
    </div>
  );
}
function ReturnPhoto() {
  const { ref, step } = useDialogue();
  return (
    <div
      ref={ref}
      className="sk-return-photo"
      data-step={step}
      aria-label="Illustrative eligible client invitation and reply"
    >
      <img
        src="/concept/industries/skin-clinic-consultation.webp"
        alt="A clinician listening to a client during a skin clinic consultation"
        width="1536"
        height="1024"
        loading="lazy"
      />
      <div className="sk-return-note sk-glass">
        <div className="sk-note-heading">
          <ZaplaPetal size={25} />
          <span>Your clinic · Client invitation</span>
        </div>
        <h3>
          It’s been a while.
          <br />
          Would you like to talk?
        </h3>
        <p>
          Hi Mia, it’s your skin clinic. If you’d like to arrange another visit, reply here and our
          team can help.
        </p>
        <small>Reply STOP to opt out.</small>
        <div
          className={`sk-status ${step >= 1 ? "sk-visible" : "sk-hidden"}`}
          aria-hidden={step < 1}
        >
          Sent to clients approved to contact
        </div>
      </div>
      <div
        className={`sk-return-reply sk-glass ${step >= 2 ? "sk-visible" : "sk-hidden"}`}
        aria-hidden={step < 2}
      >
        <span className="sk-avatar" />
        <div>
          <strong>Mia · Replied</strong>
          <p>“Could someone call me about a time next week?”</p>
          <small>Reply with your team. Follow-up stopped.</small>
        </div>
      </div>
      <span className="sk-illustration">Illustrative client communication</span>
    </div>
  );
}
function ReviewScene() {
  const { ref, step } = useDialogue();
  return (
    <div
      ref={ref}
      className="sk-review-scene"
      data-step={step}
      aria-label="Illustrative Google invitation with five unselected rating stars, not a customer rating"
    >
      <p className="sk-review-trigger">Visit recorded as completed</p>
      <div className="sk-review-invite sk-glass">
        <div className="sk-note-heading">
          <ZaplaPetal size={24} />
          Your clinic · Review invitation
        </div>
        <p>Thanks for visiting, Mia. Would you share your experience on Google?</p>
        <span className="sk-example-link">Leave a Google review</span>
      </div>
      <div
        className={`sk-google-card sk-glass ${step >= 1 ? "sk-visible" : "sk-hidden"}`}
        aria-hidden={step < 1}
      >
        <span className="sk-google-wordmark" aria-label="Google">
          {["G", "o", "o", "g", "l", "e"].map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </span>
        <h3>How was your visit?</h3>
        <div className="sk-stars" aria-label="Five unselected rating stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} size={29} strokeWidth={1.5} aria-hidden="true" />
          ))}
        </div>
        <p>Share your experience</p>
      </div>
      <p className="sk-example-caption">Illustrative invitation, not customer evidence</p>
    </div>
  );
}
function EnquiryScene() {
  const { ref, step } = useDialogue();
  return (
    <div
      ref={ref}
      className="sk-dialogue sk-enquiry"
      data-step={step}
      aria-label="Illustrative web enquiry, automatic acknowledgement and clinic handoff"
    >
      <p className="sk-scene-heading">Example · Website enquiry</p>
      <Message sender="Mia">Hi, I’m thinking about a first visit. How do I get started?</Message>
      <Message automated sender="Your clinic · Automated reply" visible={step >= 1}>
        Hi Mia, thanks for getting in touch. Our team can help you arrange a consultation. Would you
        prefer a morning or afternoon callback?
      </Message>
      <Message sender="Mia" visible={step >= 2}>
        Afternoon, please. I’d love to ask a few questions first.
      </Message>
      <p className={`sk-handoff ${step >= 2 ? "sk-visible" : "sk-hidden"}`} aria-hidden={step < 2}>
        Callback request with your clinic team
      </p>
    </div>
  );
}
function ConsiderScene() {
  const { ref, step } = useDialogue();
  return (
    <div
      ref={ref}
      className="sk-dialogue sk-consider-scene"
      data-step={step}
      aria-label="Illustrative agreed check-in; a reply stops reminders and returns to staff"
    >
      <p className="sk-scene-heading">An agreed check-in after the consultation</p>
      <Message automated sender="Your clinic · Agreed check-in">
        Hi Mia, as agreed, just checking whether you’d like to speak with our team about your next
        step. No rush. You can reply here.
      </Message>
      <Message sender="Mia" visible={step >= 1}>
        Thanks. I have a few more questions. Could someone call me tomorrow?
      </Message>
      <div
        className={`sk-handoff sk-handoff-panel ${step >= 2 ? "sk-visible" : "sk-hidden"}`}
        aria-hidden={step < 2}
      >
        <strong>Conversation with your team</strong>
        <span>Further reminders stopped</span>
      </div>
    </div>
  );
}
