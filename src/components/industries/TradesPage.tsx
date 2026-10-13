import { AIReceptionistSection } from "@/components/industries/AIReceptionistSection";
import { GoogleReviewCard, ReviewInvitation } from "@/components/industries/ReviewCards";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Pause, Play, RotateCcw } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";

const BOOK = "https://zapla.io/booking";
const PRICING = "/Pricing-v3";
const PHOTOS = "/concept/industries/";

function Label({ children }: { children: ReactNode }) {
  return <p className="tr-label">{children}</p>;
}
function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="tr-link" href={href}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function Actions({ final = false }: { final?: boolean }) {
  return (
    <div className="tr-actions">
      <a className="tr-button tr-primary" href={BOOK}>
        Book a Call
        <ArrowRight size={16} aria-hidden="true" />
      </a>
      <a
        className={final ? "tr-button tr-secondary" : "tr-link"}
        href={final ? PRICING : "#customer-flow"}
      >
        {final ? "View pricing" : "See how it works"}
        {!final && <ArrowRight size={16} aria-hidden="true" />}
      </a>
    </div>
  );
}
function Avatar({ customer = "daniel" }: { customer?: "daniel" | "alex" }) {
  return <span className={`tr-avatar tr-avatar-${customer}`} aria-hidden="true" />;
}
function Sender({ children, customer }: { children: ReactNode; customer?: "daniel" | "alex" }) {
  return (
    <div className="tr-sender">
      {customer ? <Avatar customer={customer} /> : <ZaplaPetal size={23} />}
      <span>{children}</span>
    </div>
  );
}
function useStory(last = 2) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.1, margin: "0px 0px 80px 0px" });
  const preference = useReducedMotion();
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(Boolean(preference)), [preference]);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reduced) setStep(last);
  }, [reduced, last]);
  useEffect(() => {
    if (!visible || reduced || paused || step >= last) return;
    const timer = window.setTimeout(
      () => setStep((s) => Math.min(last, s + 1)),
      step === 0 ? 350 : 650,
    );
    return () => window.clearTimeout(timer);
  }, [visible, reduced, paused, step, last]);
  return {
    ref,
    step,
    reduced,
    paused,
    setPaused,
    replay: () => {
      setStep(0);
      setPaused(false);
    },
  };
}
type Story = ReturnType<typeof useStory>;
function Controls({ story, name }: { story: Story; name: string }) {
  if (story.reduced) return null;
  return (
    <div className="tr-story-controls">
      {!story.reduced && (
        <div>
          <button
            type="button"
            aria-label={`${story.paused ? "Play" : "Pause"} ${name} demonstration`}
            onClick={() => story.setPaused(!story.paused)}
          >
            {story.paused ? <Play size={13} /> : <Pause size={13} />}
            <span>{story.paused ? "Play" : "Pause"}</span>
          </button>
          <button type="button" aria-label={`Replay ${name} demonstration`} onClick={story.replay}>
            <RotateCcw size={13} />
            <span>Replay</span>
          </button>
        </div>
      )}
    </div>
  );
}

export function TradesPage() {
  return (
    <main className="trades-page" data-page="trades">
      <section className="tr-hero tr-wrap" aria-labelledby="trades-title">
        <div className="tr-hero-copy">
          <Label>Trades &amp; home services</Label>
          <h1 id="trades-title">
            Reply to enquiries.
            <br />
            <span>Follow up quotes.</span>
            <br />
            Stay on the tools.
          </h1>
          <p className="tr-intro">
            Keep new enquiries, unanswered quotes and repeat service moving while you’re on the job.
            Zapla keeps requests, replies and the next step in one place.
          </p>
          <Actions />
          <p className="tr-hero-foot">
            For local service businesses, from plumbing and electrical to air conditioning, roofing,
            pest control and pool services.
          </p>
        </div>
        <div className="tr-hero-photo">
          <img
            src={`${PHOTOS}trades-technician.webp`}
            alt="An air conditioning technician working on a condenser outside a home"
            width="1122"
            height="1402"
            fetchPriority="high"
          />
          <div className="tr-hero-note tr-glass">
            <Sender customer="daniel">Daniel · New enquiry</Sender>
            <p>“Can you quote to replace our split system in Ashfield?”</p>
            <div className="tr-note-result">
              <ZaplaPetal size={18} />
              <span>
                Automatic reply sent.
                <br />
                Job details requested.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="customer-flow" className="tr-enquiry tr-wrap" aria-labelledby="enquiry-title">
        <EnquiryScene />
        <div className="tr-copy">
          <Label>A new enquiry comes in</Label>
          <h2 id="enquiry-title">
            Get the details.
            <br />
            Without stopping
            <br />
            the job.
          </h2>
          <p>
            A homeowner asks about a replacement or repair. Zapla replies automatically and gathers
            the address and service details your team needs to take the next step.
          </p>
          <p>
            The conversation stays with the customer record. You or your office can arrange the
            assessment, and the person replying can see what’s already been asked.
          </p>
          <Link href="/crm">See the connected customer record</Link>
        </div>
      </section>

      <AIReceptionistSection industry="trades" tone="cream" />
      <section className="tr-wrap tr-quote-section" aria-labelledby="quote-title">
        <div className="tr-quote-panel">
          <div className="tr-copy">
            <Label>After the quote goes out</Label>
            <h2 id="quote-title">
              Follow up the quote.
              <br />
              <span>
                Stop when
                <br />
                they reply.
              </span>
            </h2>
            <p>
              A quiet quote still needs a next step. Zapla sends a relevant follow-up so the
              customer can ask a question or move ahead.
            </p>
            <p>
              When they reply, further reminders stop and the conversation goes to your team. You
              handle the scope, price and decision about the work.
            </p>
            <Link href="/follow-up">Explore quote follow-up</Link>
            <p className="tr-qualification">
              Follow-up starts when the quote is recorded in Zapla.{" "}
              <a href="#trade-faq">How connections work</a>.
            </p>
          </div>
          <QuoteScene />
        </div>
      </section>

      <section className="tr-return tr-wrap" aria-labelledby="return-title">
        <div className="tr-return-heading">
          <div>
            <Label>For services customers need again</Label>
            <h2 id="return-title">
              Remind customers
              <br />
              <span>when service is due.</span>
            </h2>
          </div>
          <div>
            <p>
              Use recorded service dates to remind customers about air conditioning maintenance,
              pest inspections or pool servicing. They reply to arrange a visit; your team confirms
              the time.
            </p>
            <Link href="/customer-marketing">Explore service reminders</Link>
          </div>
        </div>
        <ReturnScene />
        <div className="tr-return-support">
          <strong>Haven’t heard from them in a while?</strong>
          <p>
            A relevant <a href="/reactivation">reactivation campaign</a> can reopen the
            conversation. Contact eligible customers with a real service reason, rather than chasing
            every past job.
          </p>
        </div>
      </section>

      <section className="tr-reviews tr-wrap" aria-labelledby="reviews-title">
        <div className="tr-copy">
          <Label>After the work is finished</Label>
          <h2 id="reviews-title">
            Ask for the review.
            <br />
            While the job
            <br />
            is still fresh.
          </h2>
          <p>
            When a job is marked complete in Zapla, it can trigger a Google review request. Zapla
            sends the message and gives the customer a direct way to share their experience.
          </p>
          <p>
            Make asking part of finishing the job, rather than another thing to remember at the end
            of the week.
          </p>
          <Link href="/reviews">Explore Google review requests</Link>
        </div>
        <ReviewScene />
      </section>

      <section className="tr-fit tr-wrap" aria-labelledby="fit-title">
        <div>
          <Label>Your starting point</Label>
          <h2 id="fit-title">
            Bring the customer work
            <br />
            into one place.
          </h2>
          <p className="tr-fit-intro">
            Start with what you use today. Zapla can become your customer CRM or fill a gap
            alongside the tools you keep.
          </p>
        </div>
        <div className="tr-fit-options">
          <div>
            <h3>Using spreadsheets and inboxes?</h3>
            <p>
              Bring your contacts, enquiries and conversations together. Give each quote a visible
              next step and automate the follow-up that currently depends on you remembering.
            </p>
          </div>
          <div>
            <h3>Already using a CRM or job system?</h3>
            <p>
              Keep what works. Add Zapla where customer replies, quote follow-up or repeat-service
              campaigns still need attention. Your scheduling, dispatch, costing and invoicing can
              stay in place.
            </p>
          </div>
          <Link href="#trade-faq">Read about connections and fit</Link>
        </div>
      </section>

      <section className="tr-wrap tr-launch-section" aria-labelledby="launch-title">
        <div className="tr-launch-panel">
          <div className="tr-copy">
            <Label>Guided Launch</Label>
            <h2 id="launch-title">
              Built around
              <br />
              how your business
              <br />
              actually works.
            </h2>
            <p>
              We map the customer process, build the agreed automations and test the journey with
              your team. You get help getting it working, rather than another system to configure
              after dinner.
            </p>
            <Link href={PRICING}>See Guided Launch</Link>
          </div>
          <ol>
            <li>
              <span>01</span>
              <div>
                <h3>Find the gap</h3>
                <p>Identify the enquiries, quotes or service reminders that need attention.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Connect the right information</h3>
                <p>
                  Confirm customer details, trigger updates and who takes over when someone replies.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Test before launch</h3>
                <p>Walk through the message, reply, stop rules and team handoff together.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <Plans />
      <Faq />
      <section className="tr-final tr-wrap" aria-labelledby="final-title">
        <div className="tr-final-petal">
          <ZaplaPetal size={32} />
        </div>
        <h2 id="final-title">
          See what Zapla can automate
          <br />
          for your trade business.
        </h2>
        <p>
          Bring your current enquiry and follow-up process. We’ll check the gaps, the tools you
          already use and the first workflow worth improving.
        </p>
        <Actions final />
      </section>
    </main>
  );
}

function EnquiryScene() {
  const story = useStory();
  return (
    <div
      className="tr-enquiry-story"
      ref={story.ref}
      data-step={story.step}
      role="group"
      aria-label="Example workflow: Daniel’s website enquiry triggers an automatic reply; his details return to the customer record for an assessment"
    >
      <div className="tr-office-photo">
        <img
          src={`${PHOTOS}trades-office.webp`}
          alt="An office coordinator working at a local air conditioning business"
          width="1536"
          height="1024"
          loading="lazy"
        />
        <div className="tr-enquiry-note tr-glass">
          <Sender customer="daniel">Daniel · Split system enquiry</Sender>
          <div
            className={`tr-enquiry-auto tr-beat ${story.step >= 1 ? "is-visible" : ""}`}
            aria-hidden={story.step < 1}
          >
            <Sender>Automatic reply</Sender>
            <p>Thanks Daniel. What’s the property address?</p>
          </div>
          <div
            className={`tr-note-answer tr-beat ${story.step >= 2 ? "is-visible" : ""}`}
            aria-hidden={story.step < 2}
          >
            <Sender customer="daniel">Daniel Brooks</Sender>
            <p>14 Banksia Street, Ashfield. It’s for the lounge room.</p>
          </div>
        </div>
      </div>
      <div
        className={`tr-enquiry-handoff tr-beat ${story.step >= 2 ? "is-visible" : ""}`}
        aria-hidden={story.step < 2}
      >
        <Sender customer="daniel">Daniel’s customer record</Sender>
        <p>Next action: arrange an assessment.</p>
      </div>
      <Controls story={story} name="enquiry" />
    </div>
  );
}
function QuoteScene() {
  const story = useStory();
  return (
    <div
      className="tr-quote-story"
      ref={story.ref}
      data-step={story.step}
      role="group"
      aria-label="Example quote workflow: automatic follow-up leads to Daniel’s question, reminders stop and the team answers"
    >
      <div className="tr-quote-context">
        <Sender customer="daniel">Daniel Brooks</Sender>
        <div>
          <strong>Split system replacement</strong>
          <span>{story.step >= 2 ? "Team reply needed" : "Quote sent"}</span>
        </div>
      </div>
      <div
        className={`tr-message tr-beat ${story.step >= 1 ? "is-visible" : ""}`}
        aria-hidden={story.step < 1}
      >
        <Sender>Automatic follow-up</Sender>
        <p className="tr-glass">
          Hi Daniel, did you have any questions about the split system replacement quote? Reply here
          and we’ll help.
        </p>
      </div>
      <div
        className={`tr-message tr-beat ${story.step >= 2 ? "is-visible" : ""}`}
        aria-hidden={story.step < 2}
      >
        <Sender customer="daniel">Daniel Brooks</Sender>
        <p className="tr-glass">Does that include removing the old system?</p>
      </div>
      <Controls story={story} name="quote follow-up" />
    </div>
  );
}
function ReturnScene() {
  const story = useStory();
  return (
    <div
      className="tr-return-story"
      ref={story.ref}
      data-step={story.step}
      role="group"
      aria-label="Example service workflow: a recorded due date triggers a reminder; Alex replies and the team confirms a visit"
    >
      <div className="tr-return-photo">
        <img
          src={`${PHOTOS}trades-service-visit.webp`}
          alt="A homeowner talking with an air conditioning technician after a service visit"
          width="1672"
          height="941"
          loading="lazy"
        />
        <div
          className={`tr-service-note tr-glass tr-beat ${story.step >= 1 ? "is-visible" : ""}`}
          aria-hidden={story.step < 1}
        >
          <Sender>Automatic service reminder</Sender>
          <p>
            Hi Alex, your air conditioning service is due next month. Want us to arrange a visit?
          </p>
        </div>
        <div
          className={`tr-service-reply tr-glass tr-beat ${story.step >= 2 ? "is-visible" : ""}`}
          aria-hidden={story.step < 2}
        >
          <Sender customer="alex">Alex · Customer reply</Sender>
          <p>“Yes please. Do you have a time next week?”</p>
        </div>
      </div>
      <Controls story={story} name="service reminder" />
    </div>
  );
}
function ReviewScene() {
  const story = useStory();
  return (
    <div
      className="tr-review-story"
      ref={story.ref}
      data-step={story.step}
      role="group"
      aria-label="Example review workflow: a completed installation triggers a Google review invitation; the review stars are unselected"
    >
      <div className="tr-review-example">
        <div className="tr-review-trigger">
          <Sender customer="daniel">Daniel Brooks</Sender>
          <p>Split system installation completed</p>
        </div>
        <ReviewInvitation sender="Your business · Review invitation" visible={story.step >= 1}>
          Thanks for having us out, Daniel. Would you share your experience on Google?
        </ReviewInvitation>
        <GoogleReviewCard heading="How did we do?" visible={story.step >= 2} />
      </div>
      <Controls story={story} name="review request" />
    </div>
  );
}
function Plans() {
  return (
    <section className="tr-plans tr-wrap" aria-labelledby="plans-title">
      <div>
        <Label>Room for the whole team</Label>
        <h2 id="plans-title">
          Unlimited users.
          <br />
          <span>One flat platform price.</span>
        </h2>
        <p>
          The owner, office and people handling customer replies can work from the same record. No
          extra platform seat fee when another person needs access.
        </p>
      </div>
      <div className="tr-plan-options">
        <div>
          <strong>Follow-Through</strong>
          <p>Enquiry replies, customer conversations, quote follow-up and review requests.</p>
          <span>
            A$399<small>/month + GST</small>
          </span>
        </div>
        <div>
          <strong>Growth</strong>
          <p>
            Everything in Follow-Through, plus repeat-service campaigns and customer reactivation.
          </p>
          <span>
            A$699<small>/month + GST</small>
          </span>
        </div>
        <p className="tr-price-note">
          Guided Launch from A$1,997 + GST for Follow-Through or A$2,997 + GST for Growth. SMS,
          email, voice usage, optional AI Receptionist and custom connections are separate. Stored
          contacts are unlimited under fair use.
        </p>
        <Link href={PRICING}>Compare plans and total costs</Link>
      </div>
    </section>
  );
}
const FAQS = [
  [
    "Do we need a CRM before using Zapla?",
    "No. Zapla can be your customer CRM if you currently use spreadsheets, email and messages. We can bring across the agreed contacts and organise enquiries, quotes and conversations. If you already use ServiceM8, Simpro, Fergus, Tradify or another CRM, keep the workflows that work. We assess the remaining gap and the data path before recommending another system. No native connection is assumed.",
  ],
  [
    "Will Zapla know when a quote is sent or a job is completed?",
    "A workflow needs the relevant stage or date in Zapla. It can come from a team update, an agreed import or a connection verified during Guided Launch. We do not assume a native integration, live sync or automatic access to your job software. We check the data path before enabling messages.",
  ],
  [
    "What happens when a customer replies or accepts the quote?",
    "We configure quote reminders to stop on a reply and route the conversation to your team. We also agree stop rules for accepted or declined quotes, opt-outs and other outcomes. If acceptance happens in your job system, that status needs the agreed update or connection to reach Zapla.",
  ],
  [
    "Can it book technicians or handle emergencies?",
    "The workflows shown here capture requests and help your team arrange the next step. They do not demonstrate live technician availability, dispatch or automatic service booking. Optional AI Receptionist can capture enquiries and callback requests under agreed rules; urgent dispatch, technical advice and safety decisions stay with your team.",
  ],
  [
    "Can we use it for service reminders and past customers?",
    "Yes, where there is a relevant service reason, reliable recorded dates and appropriate messaging permissions. Your business chooses the customers and timing. We account for opt-outs and new bookings, and agree which system sends each reminder. One-off jobs do not automatically imply an annual service need.",
  ],
  [
    "Can we collect job details before calling the customer?",
    "Yes. Use agreed forms, customer fields and enquiry messages for details such as service type, suburb, property address and a description of the request. We confirm which fields and steps suit the workflow. Your team still assesses the work and confirms scope and pricing.",
  ],
  [
    "How do we judge whether it is worth the extra cost?",
    "Pick a specific gap. Include the plan, setup, usage, optional services and any extra team time in the cost. Measure the enquiries handled, replies, office time and additional work you can actually attribute. Compare the contribution from that work, rather than its full invoice value, with the total cost. No increase in jobs or return is guaranteed.",
  ],
] as const;
function Faq() {
  return (
    <section id="trade-faq" className="tr-faq tr-wrap" aria-labelledby="faq-title">
      <div>
        <Label>Before you add another system</Label>
        <h2 id="faq-title">
          The practical
          <br />
          questions.
        </h2>
        <p>
          Running a workshop?
          <br />
          <a href="/industries/mechanics">See Zapla for mechanics</a>.
        </p>
      </div>
      <div>
        {FAQS.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <ChevronDown size={18} aria-hidden="true" />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

