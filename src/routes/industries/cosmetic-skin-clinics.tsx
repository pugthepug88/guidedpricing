import { AIReceptionistSection } from "@/components/industries/AIReceptionistSection";
import { GoogleReviewCard, ReviewInvitation } from "@/components/industries/ReviewCards";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Check } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import skinCss from "@/styles/cosmetic-skin-clinics.css?url";

const TITLE = "CRM & Client Follow-Up for Skin & Cosmetic Clinics | Zapla";
const DESCRIPTION =
  "Automate skin clinic enquiry replies, pre-visit admin, consultation follow-up and eligible client reactivation.";
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
    "We use spreadsheets and inboxes. Can we start with Zapla?",
    "Yes. Your team can keep contact details, enquiries, replies and follow-up in Zapla. We help import suitable contacts and set up the agreed messages. Clinical records and consent stay in your clinical system. You do not need another CRM to start.",
  ],
  [
    "We already use Timely, Fresha, Kitomba or Pabau. Why add Zapla?",
    "Keep the functions that work well. Zapla can help where your team still handles enquiry replies, consultation follow-up or client campaigns manually. If your existing software already does these jobs well, you may not need another tool.",
  ],
  [
    "Does Zapla integrate with our clinic software?",
    "We check your clinic software before confirming a connection. Importing contacts does not automatically keep records updated between systems. Your team continues to manage appointments in its existing diary unless a booking connection has been tested.",
  ],
  [
    "Can AI recommend a treatment or answer suitability questions?",
    "No. AI Receptionist handles approved routine questions, such as opening hours and location, and collects callback requests. Treatment suitability, risks, symptoms and recommendations go to your qualified team. We agree how calls needing a person are handled before launch. Direct appointment booking requires a verified connection.",
  ],
  [
    "Can we run campaigns for every treatment we offer?",
    "No. Your clinic must approve who is contacted, what the message says and when it is sent. Messages must comply with the advertising rules for your services. Permission to contact someone does not make every treatment promotion appropriate.",
  ],
  [
    "What happens when someone replies or opts out?",
    "The agreed reminders stop when the client replies or opts out. Your team receives replies in the conversation. We test both before launch. Current bookings and contact preferences must be kept up to date using the process agreed with your clinic.",
  ],
  [
    "Do we move our clinical records into Zapla?",
    "Treatment notes, consent forms, health histories and clinical photographs stay in your clinical system. Zapla uses the administrative information needed for the agreed communication. Enquiries may contain sensitive information, so data handling, access, storage and retention need review before client information is imported.",
  ],
  [
    "What about reviews and testimonials?",
    "Collecting client feedback and using clinical testimonials in advertising have different requirements. Check what is appropriate for your services before sending review requests or publishing feedback. A Google review request does not automatically republish a testimonial on your website.",
  ],
  [
    "Can Zapla send forms and pre-visit information?",
    "Yes. Zapla can send your approved arrival information and an administrative form link. A connected form is needed to tell when it has been submitted and stop reminders. Sending an external link alone does not confirm completion. Clinical forms stay in your clinical system. Appointment messages require reliable booking information.",
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
  const [foreground, setForeground] = useState(true);
  useEffect(() => {
    const update = () => setForeground(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (reduced) setStep(2);
  }, [reduced]);
  useEffect(() => {
    if (!inView || !foreground || reduced || step >= 2) return;
    const timer = window.setTimeout(
      () => setStep((s) => Math.min(2, s + 1)),
      step === 0 ? 200 : 450,
    );
    return () => window.clearTimeout(timer);
  }, [inView, foreground, reduced, step]);
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
              <span className="sk-avatar" aria-hidden="true" />
              <span>Mia · Consultation enquiry</span>
            </div>
            <p>“I’m thinking about a first visit. How do I get started?”</p>
            <div className="sk-note-result">
              <ZaplaPetal size={22} /> Automatic reply sent.
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
            <span>Enquiries left unanswered</span>
            <p>
              Someone asks about a consultation. A delayed reply can mean they book with another
              clinic.
            </p>
          </div>
          <div>
            <span>Forms to chase</span>
            <p>
              Your team sends form links, checks what’s missing and contacts clients again before
              their visit.
            </p>
          </div>
          <div>
            <span>Follow-up forgotten</span>
            <p>
              A client asks for time to think after a consultation. Your team has another follow-up
              to remember.
            </p>
          </div>
        </div>
      </section>
      <section id="clinic-flow" className="sk-split sk-wrap" aria-labelledby="enquiry-title">
        <EnquiryScene />
        <div className="sk-copy">
          <Label>New client enquiries</Label>
          <h2 id="enquiry-title">Reply to new enquiries automatically.</h2>
          <p>
            When someone submits a website enquiry, Zapla replies and asks when they would prefer a
            callback. Your team receives their response and arranges the consultation. Unanswered
            enquiries receive the follow-up you’ve agreed.
          </p>
          <Link href="/follow-up">Explore enquiry follow-up</Link>
        </div>
      </section>
      <AIReceptionistSection industry="skin" />
      <section className="sk-feature sk-wrap" aria-labelledby="admin-title">
        <div className="sk-admin-panel">
          <div className="sk-copy">
            <Label>Before the first visit</Label>
            <h2 id="admin-title">Send appointment details and forms automatically.</h2>
            <p>
              Once a consultation is confirmed, Zapla sends your arrival information and contact
              details form. When the form is submitted, reception gets a notification.
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
            <h2 id="consider-title">Send the follow-up your client agreed to.</h2>
            <p>
              If a client asks for time to think, Zapla contacts them at the agreed time. Their
              reply stops further reminders and goes to your team. Treatment questions stay with
              your clinician.
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
            <h2 id="return-title">Invite past clients to arrange another visit.</h2>
          </div>
          <div>
            <p>
              Choose clients your clinic has approved to contact. Zapla sends your invitation and
              brings replies back to your team to discuss their next visit.
            </p>
            <Link href="/reactivation">Explore client reactivation</Link>
          </div>
        </div>
        <ReturnPhoto />
      </section>
      <section className="sk-reviews sk-wrap" aria-labelledby="review-title">
        <ReviewScene />
        <div className="sk-copy">
          <Label>After a completed visit</Label>
          <h2 id="review-title">Request Google reviews automatically.</h2>
          <p>
            After a visit is marked complete, Zapla can send a Google review request. Your team
            doesn’t have to send each message.
          </p>

          <Link href="/reviews">Explore review requests</Link>
        </div>
      </section>
      <section className="sk-fit sk-wrap" aria-labelledby="fit-title">
        <Label>Works around your clinic</Label>
        <h2 id="fit-title">One place for enquiries and client follow-up.</h2>
        <div className="sk-responsibilities">
          <div>
            <h3>Spreadsheets and inboxes?</h3>
            <p>
              Keep contact details, enquiries and replies together. Your team can see who needs a
              response and what happens next.
            </p>
          </div>
          <div>
            <h3>Already using clinic software?</h3>
            <p>
              Keep the functions that work well. Use Zapla for replies, reminders and client
              follow-up your team still handles manually.
            </p>
          </div>
        </div>
        <p className="sk-fit-note">
          Zapla brings client enquiries and follow up together. Your clinical records stay in your
          clinic software.
        </p>
      </section>
      <section className="sk-launch" aria-labelledby="launch-title">
        <div className="sk-wrap sk-launch-inner">
          <div className="sk-copy">
            <Label>Guided Launch</Label>
            <h2 id="launch-title">We set up your clinic’s follow-up.</h2>
            <p>
              We build and test your agreed enquiry and follow-up workflows with your team before
              launch.
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
          <p className="sk-value-note">
            Unlimited stored contacts under fair use. Guided Launch and communication usage are
            separate. AI Receptionist is optional. Standard launch includes up to three agreed
            follow-through automations; extra clinic connections or workflows are scoped separately.
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
      aria-label="Demonstration: confirmed consultation sends admin form; Mia submits contact details and reception is notified"
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
          <ZaplaPetal size={24} />
          <span>Your clinic · Before your visit</span>
        </div>
        <p>Hi Mia, here are our arrival details and your contact details form.</p>
        <div
          className={`sk-admin-response ${step >= 1 ? "sk-visible" : "sk-hidden"}`}
          aria-hidden={step < 1}
        >
          <span className="sk-avatar" aria-hidden="true" />
          <div>
            <strong>Mia</strong>
            <span>Contact details submitted</span>
          </div>
        </div>
        <div
          className={`sk-status ${step >= 2 ? "sk-visible" : "sk-hidden"}`}
          aria-hidden={step < 2}
        >
          <Check size={16} aria-hidden="true" />
          Reception notified
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
        <p>
          Hi Mia, it’s your skin clinic. If you’d like to arrange another visit, reply here and our
          team can help.
        </p>
      </div>
      <div
        className={`sk-return-reply sk-glass ${step >= 2 ? "sk-visible" : "sk-hidden"}`}
        aria-hidden={step < 2}
      >
        <span className="sk-avatar" aria-hidden="true" />
        <div>
          <strong>Mia · Replied</strong>
          <p>“Could someone call me about a time next week?”</p>
        </div>
      </div>
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
      <div className="sk-review-trigger">
        <span className="sk-avatar" aria-hidden="true" />
        <span>
          <strong>Mia</strong>Visit completed
        </span>
      </div>
      <ReviewInvitation sender="Your clinic · Review invitation">
        Thanks for visiting, Mia. Would you share your experience on Google?
      </ReviewInvitation>
      <GoogleReviewCard visible={step >= 1} />
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
      <p className="sk-scene-heading">Website enquiry received</p>
      <Message sender="Mia">Hi, I’m thinking about a first visit. How do I get started?</Message>
      <Message automated sender="Your clinic · Automated reply" visible={step >= 1}>
        Hi Mia, thanks for getting in touch. Our team can help you arrange a consultation. Would you
        prefer a morning or afternoon callback?
      </Message>
      <Message sender="Mia" visible={step >= 2}>
        Afternoon, please. I’d love to ask a few questions first.
      </Message>
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
        <strong>Callback requested</strong>
      </div>
    </div>
  );
}
