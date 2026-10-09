import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import skinCss from "@/styles/cosmetic-skin-clinics.css?url";

const TITLE = "CRM & Client Follow-Up for Skin & Cosmetic Clinics | Zapla";
const DESCRIPTION =
  "Give every clinic enquiry a clear next step. Zapla helps skin and cosmetic clinics respond, follow up and reconnect with eligible clients around their existing booking software.";
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
    "How is Zapla priced?",
    "Unlimited users and stored contacts under fair use, with a flat platform price for your chosen plan. Guided Launch and SMS, email and voice usage are separate. AI Receptionist is optional. See the current pricing page for inclusions and GST details; we agree the plan and implementation scope before you commit.",
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
            Your care starts
            <br />
            with a conversation.
            <br />
            <span>Keep it moving.</span>
          </h1>
          <p className="sk-intro">
            Give every enquiry a clear next step. Respond while your team is with clients, follow up
            with care and keep the conversation together.
          </p>
          <Actions />
          <p className="sk-hero-boundary">
            Your clinic software stays. Zapla handles the communication around it.
          </p>
        </div>
        <div className="sk-hero-scene">
          <img
            src="/concept/industries/skin-clinic-consultation.webp"
            alt="A clinician listening to a client in a contemporary skin clinic consultation room"
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <div className="sk-hero-note sk-glass">
            <div className="sk-note-heading">
              <ZaplaPetal size={25} />
              <span>New consultation enquiry</span>
            </div>
            <p>“Hi, I’m thinking about a first visit. How do I get started?”</p>
            <div className="sk-note-result">
              Automatic acknowledgement sent.
              <br />
              Next conversation with your team.
            </div>
          </div>
        </div>
      </section>
      <section className="sk-gap sk-wrap" aria-labelledby="gap-title">
        <h2 id="gap-title">
          A thoughtful enquiry.
          <br />A busy clinic.
          <br />
          <span>A conversation left waiting.</span>
        </h2>
        <div className="sk-gap-rows">
          <p>
            <span>They ask after you close.</span>By morning, the enquiry is buried under a full day
            of appointments.
          </p>
          <p>
            <span>They want time to think.</span>Your team means to check in. Another busy day gets
            in the way.
          </p>
          <p>
            <span>They haven’t been back.</span>There may be a reason to reconnect. Nobody has
            agreed who, when or how.
          </p>
        </div>
      </section>
      <section id="clinic-flow" className="sk-split sk-wrap" aria-labelledby="enquiry-title">
        <EnquiryScene />
        <div className="sk-copy">
          <Label>01 · The first enquiry</Label>
          <h2 id="enquiry-title">
            A personal first step.
            <br />
            <span>
              Without waiting
              <br />
              for a free moment.
            </span>
          </h2>
          <p>
            Acknowledge a web enquiry automatically using your approved wording. Ask a simple
            administrative question and give your team the reply, ready to arrange a consultation in
            your clinic diary.
          </p>
          <p>
            The conversation stays with the contact, so the next person knows where to pick it up.
          </p>
          <Link href="/follow-up">Explore Follow-Up</Link>
          <p className="sk-aside">
            For incoming calls, optional <a href="/ai-receptionist">AI Receptionist</a> can handle
            agreed routine questions and callback requests. Clinical questions go to your qualified
            team.
          </p>
        </div>
      </section>
      <section className="sk-consider" aria-labelledby="consider-title">
        <div className="sk-wrap sk-split">
          <div className="sk-copy">
            <Label>02 · The space to decide</Label>
            <h2 id="consider-title">
              Follow up.
              <br />
              <span>
                Without turning
                <br />
                up the pressure.
              </span>
            </h2>
            <p>
              Some clients want time after a consultation. Set an agreed check-in that invites a
              conversation, instead of a sales deadline.
            </p>
            <p>
              A reply stops the configured reminders and returns the conversation to your team.
              Treatment decisions and clinical advice remain with the clinician and client.
            </p>
            <Link href="/crm">Keep the conversation together</Link>
          </div>
          <ConsiderScene />
        </div>
      </section>
      <section className="sk-return sk-wrap" aria-labelledby="return-title">
        <div className="sk-return-heading">
          <Label>03 · The relationship between visits</Label>
          <h2 id="return-title">
            A reason to reconnect.
            <br />
            <span>For the right clients.</span>
          </h2>
          <p>
            Choose an eligible audience, approve the message and make it easy to reply. Your team
            gets a conversation to work with, rather than another list to chase.
          </p>
          <Link href="/customer-marketing">Explore Customer Marketing</Link>
        </div>
        <ReturnScene />
        <p className="sk-return-footnote">
          Use only agreed, current records. Booking updates, consent and opt-outs follow the data
          process verified for your clinic. Campaigns depend on the services you offer and the
          advertising rules that apply.
        </p>
      </section>
      <section className="sk-fit" aria-labelledby="fit-title">
        <div className="sk-wrap">
          <Label>Built around your clinic</Label>
          <h2 id="fit-title">
            One clear role.
            <br />
            No clinical guesswork.
          </h2>
          <div className="sk-responsibilities">
            <div>
              <h3>Zapla keeps communication moving.</h3>
              <p>
                New enquiries, approved administrative messages, agreed check-ins, eligible client
                campaigns and replies with your team.
              </p>
            </div>
            <div>
              <h3>Your clinic owns the care.</h3>
              <p>
                Treatment advice, suitability, clinical records, consent and the appointment diary
                remain with your team and clinic software.
              </p>
            </div>
          </div>
          <p className="sk-fit-note">
            For independent skin, dermal, laser and cosmetic clinics with a real communication gap.
            This is not a clinical system or a cosmetic surgery marketing funnel.
          </p>
        </div>
      </section>
      <section className="sk-launch sk-wrap" aria-labelledby="launch-title">
        <div className="sk-copy">
          <Label>Guided Launch</Label>
          <h2 id="launch-title">
            Start with one gap.
            <br />
            <span>
              Make it work
              <br />
              for your team.
            </span>
          </h2>
          <p>
            Show us how enquiries and bookings work today. We agree where Zapla adds value, then
            build and test that first workflow with your clinic.
          </p>
          <Link href="/Pricing-v3">Explore plans and Guided Launch</Link>
        </div>
        <ol className="sk-launch-list">
          <li>
            <span>01</span>
            <div>
              <h3>Check the fit.</h3>
              <p>
                Review what your current software already does. Verify the data and booking process
                before promising a connection.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Agree the boundaries.</h3>
              <p>
                Define audience permissions, approved wording, minimum data, access, stop rules and
                staff handoffs.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Test the real next step.</h3>
              <p>
                Walk through an enquiry, a reply and an opt-out. Your team knows what happens
                automatically and what they own.
              </p>
            </div>
          </li>
        </ol>
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
            Reception, the clinic manager and client coordinators can work from the same
            conversation. Add the people who need access without another seat charge.
          </p>
          <p className="sk-value-note">
            Unlimited stored contacts under fair use. Guided Launch and communication usage are
            separate. AI Receptionist is optional.
          </p>
          <Link href="/Pricing-v3">Compare plans and inclusions</Link>
        </div>
      </section>
      <section className="sk-faq sk-wrap" aria-labelledby="faq-title">
        <div>
          <Label>A few practical questions</Label>
          <h2 id="faq-title">
            A better fit.
            <br />
            <span>A clearer start.</span>
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
          Give the next conversation
          <br />
          somewhere to go.
        </h2>
        <p>
          Let’s find where clinic enquiries and follow-up get stuck, check your existing software
          and map the first workflow worth improving.
        </p>
        <Actions final />
      </section>
    </main>
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
      <p className="sk-scene-heading">A first visit starts here</p>
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
      <p className="sk-scene-heading">The client sets the pace</p>
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
function ReturnScene() {
  const { ref, step } = useDialogue();
  return (
    <div
      ref={ref}
      className="sk-return-flow"
      data-step={step}
      aria-label="Illustrative clinic-approved return invitation to eligible clients"
    >
      <div className="sk-audience">
        <span>Choose who to contact</span>
        <h3>
          Clients approved
          <br />
          for this invitation.
        </h3>
        <p>
          Communication permission checked.
          <br />
          Current bookings and opt-outs excluded.
        </p>
        <div className="sk-audience-rule">Audience and wording approved by your clinic.</div>
      </div>
      <div className="sk-return-conversation">
        <Message automated sender="Your clinic · Return invitation">
          Hi Mia, it’s your skin clinic. If you’d like to arrange another visit, reply here and our
          team can help. Reply STOP to opt out.
        </Message>
        <Message sender="Mia" visible={step >= 1}>
          Thanks. Could someone call me about a time next week?
        </Message>
        <p
          className={`sk-handoff ${step >= 2 ? "sk-visible" : "sk-hidden"}`}
          aria-hidden={step < 2}
        >
          Reply with your team · Campaign follow-up stopped
        </p>
      </div>
    </div>
  );
}
