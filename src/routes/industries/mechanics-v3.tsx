import { AIReceptionistSection } from "@/components/industry-v3/AIReceptionistSection";
import { GoogleReviewCard, ReviewInvitation } from "@/components/industry-v3/ReviewCards";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import mechanicsCss from "@/styles/mechanics-v3.css?url";

export const Route = createFileRoute("/industries/mechanics-v3")({
  staticData: { sitemap: false },
  head: () => ({
    links: [
      { rel: "stylesheet", href: mechanicsCss },
      {
        rel: "preload",
        href: "/concept/industries/fonts/inter-tight-latin-500-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/concept/industries/fonts/manrope-latin-400-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
    meta: [
      { title: "Customer Follow-Up for Mechanics & Repair Workshops | Zapla" },
      {
        name: "description",
        content:
          "Keep workshop enquiries, quote follow-up and customer return visits moving with Zapla. Built around your team and your existing workshop systems.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MechanicsPage,
});

const BOOK = "https://zapla.io/booking";
function ActionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="mc3-text-link" href={href}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mc3-eyebrow">{children}</p>;
}
function MechanicsPage() {
  return (
    <main className="mechanics-v3-page" data-page="mechanics">
      <section className="mc3-hero mc3-wrap" aria-labelledby="mechanics-title">
        <div className="mc3-hero-copy">
          <Eyebrow>For independent mechanics and repair workshops</Eyebrow>
          <h1 id="mechanics-title">
            You fix the cars.
            <br />{" "}
            <span>Zapla follows through.</span>
          </h1>
          <p className="mc3-intro">
            Turn enquiries into bookings, follow up unanswered quotes and bring customers back when
            their next service is due. Zapla keeps the next step moving while you stay on the tools.
          </p>
          <div className="mc3-actions">
            <a className="mc3-button mc3-primary" href={BOOK}>
              Book a call
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="mc3-flow-link" href="#workshop-flow">
              See the workshop flow
              <ChevronRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="mc3-hero-visual">
          <img
            className="mc3-workshop-photo"
            src="/concept/industries/mechanics-workshop.webp"
            alt="A mechanic inspecting an engine in a modern independent workshop"
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <HeroEnquiry />
        </div>
      </section>

      <div id="workshop-flow" className="mc3-story">
        <section className="mc3-enquiry mc3-wrap" aria-labelledby="enquiry-title">
          <EnquiryScene />
          <div className="mc3-scene-copy">
            <Eyebrow>While you’re on the tools</Eyebrow>
            <h2 id="enquiry-title">The enquiry shouldn’t have to wait for you.</h2>
            <p>
              Reply automatically and capture the vehicle details. Send your workshop’s booking link
              where the available times and booking process have been verified. Otherwise, collect
              a preferred time for your team to confirm in the workshop diary.
            </p>
            <ActionLink href="/follow-up-v3">Explore enquiry follow-through</ActionLink>
          </div>
        </section>

        <AIReceptionistSection industry="mechanics" tone="dark" />
        <section className="mc3-estimate-section" aria-labelledby="estimate-title">
          <div className="mc3-wrap mc3-quote-layout">
            <div className="mc3-scene-copy">
              <Eyebrow>After the quote goes out</Eyebrow>
              <h2 id="estimate-title">Follow up quotes before they go cold.</h2>
              <p>
                A quote sitting in an inbox is work you’ve already put time into. Zapla follows up
                automatically and stops the reminders when the customer replies. If they have a
                question about the work, your team gets the conversation.
              </p>
              <ActionLink href="/follow-up-v3">Explore Follow-Up</ActionLink>
            </div>
            <QuoteScene />
          </div>
        </section>

        <section className="mc3-return mc3-wrap" aria-labelledby="return-title">
          <div className="mc3-scene-copy">
            <Eyebrow>Service and inspection reminders</Eyebrow>
            <h2 id="return-title">The right reminder. Before the next service is due.</h2>
            <p>
              Know who’s due back and why. Zapla uses recorded service dates or NSW pink slip due
              dates to send a relevant reminder automatically, with a link to book. Ask about the
              right service at the right time, rather than sending another generic “checking in”.
            </p>
            <ActionLink href="/customer-marketing-v3">Explore Customer Marketing</ActionLink>
            <p className="mc3-return-support">
              Reconnect with customers you haven’t heard from through a relevant{" "}
              <a href="/reactivation-v3">reactivation campaign</a>.
            </p>
          </div>
          <ReturnScene />
        </section>
      </div>

      <ReviewScene />

      <section className="mc3-fit mc3-wrap" aria-labelledby="fit-title">
        <h2 id="fit-title">
          Keep your workshop system.
          <br />{" "}
          <span>Add the customer follow-through.</span>
        </h2>
        <p>
          Keep jobs, vehicles and parts in your workshop system. Zapla keeps customer enquiries and
          follow-up together.
        </p>
      </section>

      <section className="mc3-launch" aria-labelledby="launch-title">
        <div className="mc3-wrap mc3-launch-layout">
          <div className="mc3-launch-copy">
            <Eyebrow>Guided Launch</Eyebrow>
            <h2 id="launch-title">
              Built around
              <br />{" "}
              your workshop.
            </h2>
            <p>We map your process, build the agreed flows and get your team ready to use them.</p>
            <p>
              We agree how booking requests reach your team, when reminders stop, and which questions
              need a human reply. Any connection to your workshop diary is checked before we promise it.
            </p>
            <ActionLink href="/pricing-review-v3">Explore plans and Guided Launch</ActionLink>
          </div>
          <div className="mc3-launch-plan" aria-label="Illustrative workshop launch plan">
            <div className="mc3-launch-plan-heading">
              <span>Your workshop launch plan</span>
            </div>
            <h3>
              Start with the gaps
              <br />{" "}
              in your workshop.
            </h3>
            <div className="mc3-launch-plan-row">
              <strong>Quotes going quiet</strong>
              <p>Agree when to follow up and when to stop.</p>
            </div>
            <div className="mc3-launch-plan-row">
              <strong>Customers due back</strong>
              <p>Choose the service dates and reminder timing.</p>
            </div>
            <div className="mc3-launch-plan-row">
              <strong>Bookings without the back-and-forth</strong>
              <p>Test the enquiry, booking link and confirmation together.</p>
            </div>
          </div>
        </div>
      </section>

      <WorkshopPlans />
      <section className="v3-practical mc3-wrap" aria-labelledby="workshop-practical-title">
        <div><Eyebrow>Before you get started</Eyebrow><h2 id="workshop-practical-title">Make it fit your workshop.</h2>
        <p>Using an inbox or spreadsheet? Start with one shared enquiry and follow-up process. Already using workshop software? Keep jobs, parts and the diary there; add Zapla only where your customer follow-up needs help.</p></div>
        <div>
          <details><summary>Will it connect to our workshop software?</summary><p>We check the available APIs, exports and permissions before agreeing a connection. An import is not a live sync. If a connection is unavailable, we agree who keeps bookings and service dates current.</p></details>
          <details><summary>What happens when a customer replies?</summary><p>The agreed reminders stop and the conversation goes to your team. Repair advice, quote changes and appointment confirmation remain with the workshop. We test replies, opt-outs and staff handoffs before launch.</p></details>
          <details><summary>What about customers with more than one vehicle?</summary><p>Agree a vehicle-specific service date, registration and eligible recipient for each reminder. A customer’s last visit alone is not a reliable due date. Remove sold vehicles and update bookings so reminders remain relevant.</p></details>
          <details><summary>Can we start with one workflow?</summary><p>Yes. Choose the gap that matters most: enquiries, unanswered quotes or service reminders. We agree the messages, reliable trigger, stop conditions and staff owner before building it. We confirm the plan, launch scope and separate usage costs before you commit.</p></details>
        </div>
      </section>

      <section className="mc3-final mc3-wrap" aria-labelledby="final-title">
        <span className="mc3-final-petal">
          <ZaplaPetal />
        </span>
        <h2 id="final-title">
          Find the follow-up
          <br />{" "}
          your workshop is missing.
        </h2>
        <p>
          Show us how enquiries, quotes and service reminders work today. We’ll map what Zapla can
          automate, what your team handles and which plan fits your workshop.
        </p>
        <div className="mc3-actions">
          <a className="mc3-button mc3-primary" href={BOOK}>
            Book a call
            <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a className="mc3-button mc3-secondary" href="/pricing-review-v3">
            View pricing
          </a>
        </div>
      </section>
    <p className="v3-scope-note">Standard Follow-Through Guided Launch includes up to three agreed automations. Growth campaign scope, additional workflows and connections are agreed before you commit. The stories above are illustrative examples, not customer results.</p>
    </main>
  );
}

const QUOTE_STAGES = ["Quote sent", "Follow-up sent", "Customer replied"];
const ENQUIRY_STAGES = ["Customer asks", "Automatic reply sent"];
const RETURN_STAGES = ["Service record", "Reminder sent", "Customer replies"];

// Each brief scene progresses once, pauses offscreen and holds its final state.
function useScene(stages: string[], timings: number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.1, margin: "0px 0px 80px 0px" });
  const prefersReduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const last = stages.length - 1;
  useEffect(() => {
    if (prefersReduced) setStep(last);
  }, [prefersReduced, last]);
  const delay = timings[step] ?? 650;
  useEffect(() => {
    if (!visible || prefersReduced || step >= last) return;
    const timer = window.setTimeout(() => setStep((s) => Math.min(s + 1, last)), delay);
    return () => window.clearTimeout(timer);
  }, [visible, prefersReduced, step, last, delay]);
  return { ref, step };
}
function HeroEnquiry() {
  return (
    <div className="mc3-hero-event">
      <div className="mc3-glass mc3-hero-event-body">
        <div className="mc3-customer-heading">
          <span className="mc3-person-avatar" />
          <div>
            <strong>Mia Thompson</strong>
            <span>Workshop enquiry</span>
          </div>
        </div>
        <p>“My brakes are squeaking. Could you take a look this week?”</p>
        <p className="mc3-hero-next">Automatic reply sent. Inspection requested.</p>
      </div>
    </div>
  );
}
function EnquiryScene() {
  const scene = useScene(ENQUIRY_STAGES, [450]);
  return (
    <div
      ref={scene.ref}
      className="mc3-enquiry-scene"
      data-step={scene.step}
      role="img"
      aria-label="Illustrative enquiry: Mia asks about her brakes, receives an automatic reply and requests an inspection for the workshop team to confirm"
    >
      <div className="mc3-dialogue-row">
        <span className="mc3-person-avatar" />
        <div className="mc3-dialogue-content">
          <strong>Mia Thompson</strong>
          <p className="mc3-glass mc3-dialogue-bubble">
            Hi, my brakes have started squeaking. Could you take a look this week? It’s a 2019 RAV4.
          </p>
        </div>
      </div>
      <div
        className={`mc3-dialogue-row mc3-dialogue-outgoing mc3-enquiry-ack ${scene.step >= 1 ? "is-revealed" : ""}`}
        aria-hidden={scene.step < 1}
      >
        <span className="mc3-zapla-avatar">
          <ZaplaPetal />
        </span>
        <div className="mc3-dialogue-content">
          <strong>Your workshop · Automated reply</strong>
          <div className="mc3-glass mc3-dialogue-bubble">
            <p>
              Thanks Mia. What day suits you for an inspection? Our team will confirm a time
              for your RAV4.
            </p>
            <span className="mc3-message-link">
              Request an inspection <ArrowRight size={15} aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
function QuoteScene() {
  const scene = useScene(QUOTE_STAGES, [450, 650]);
  return (
    <div ref={scene.ref} className="mc3-quote-scene" data-step={scene.step}>
      <div className="mc3-glass mc3-quote-summary">
        <div className="mc3-customer-heading">
          <span className="mc3-person-avatar" />
          <div>
            <strong>Mia Thompson</strong>
            <span>2019 Toyota RAV4</span>
          </div>
        </div>
        <div className="mc3-quote-jobline">
          <strong>Brake work quote</strong>
          <span>{scene.step >= 2 ? "Team reply needed" : "Awaiting response"}</span>
        </div>
      </div>
      <div
        className={`mc3-dialogue-row mc3-quote-message ${scene.step >= 1 ? "is-visible" : ""}`}
        aria-hidden={scene.step < 1}
      >
        <span className="mc3-zapla-avatar">
          <ZaplaPetal />
        </span>
        <div className="mc3-dialogue-content">
          <strong>Your workshop · Follow-up sent</strong>
          <p className="mc3-glass mc3-dialogue-bubble">
            Hi Mia, did you have any questions about the brake work we quoted? Reply here and we’ll
            help.
          </p>
        </div>
      </div>
      <div
        className={`mc3-dialogue-row mc3-quote-reply ${scene.step >= 2 ? "is-visible" : ""}`}
        aria-hidden={scene.step < 2}
      >
        <span className="mc3-person-avatar" />
        <div className="mc3-dialogue-content">
          <strong>Mia Thompson</strong>
          <p className="mc3-glass mc3-dialogue-bubble">
            Does the quote include both the pads and discs?
          </p>
        </div>
      </div>
    </div>
  );
}
function ReturnScene() {
  const scene = useScene(RETURN_STAGES, [450, 650]);
  return (
    <div
      ref={scene.ref}
      className="mc3-return-visual"
      data-step={scene.step}
      role="img"
      aria-label="Illustrative service reminder with a booking link, followed by Mia confirming she has booked"
    >
      <img
        src="/concept/customer-marketing-service-arrival.svg"
        alt="A customer handing her keys to a mechanic at workshop reception"
        width="1024"
        height="768"
        loading="lazy"
      />
      <div className="mc3-glass mc3-service-reminder">
        <div className="mc3-overlay-heading">
          <span>Service due in November</span>
          <ZaplaPetal />
        </div>
        <p>
          Hi Mia, your RAV4’s next service is due in November. Book a time that suits you below.
        </p>
        <span className="mc3-message-link">
          Book your next service <ArrowRight size={15} aria-hidden="true" />
        </span>
        <span className="mc3-overlay-caption">
          {scene.step >= 1
            ? "Reminder sent by your workshop"
            : "Based on the vehicle’s service date"}
        </span>
      </div>
      <div
        className={`mc3-glass mc3-return-reply ${scene.step >= 2 ? "is-arrived" : ""}`}
        aria-hidden={scene.step < 2}
      >
        <div className="mc3-customer-heading">
          <span className="mc3-person-avatar" />
          <div>
            <strong>Mia Thompson</strong>
            <span>Replied to the reminder</span>
          </div>
        </div>
        <p>“I’ve booked Friday. See you then!”</p>
      </div>
    </div>
  );
}
const REVIEW_STAGES = ["Service completed", "Invitation sent", "Review screen"];
function ReviewScene() {
  const scene = useScene(REVIEW_STAGES, [450, 650]);
  return (
    <section className="mc3-reviews mc3-wrap" aria-labelledby="review-title">
      <div ref={scene.ref} className="mc3-review-scene" data-step={scene.step}>
        <div className="mc3-review-completed">
          <span className="mc3-person-avatar" />
          <span>
            Mia’s RAV4 <strong>Service completed</strong>
          </span>
        </div>
        <ReviewInvitation
          sender={`Your workshop · ${scene.step >= 1 ? "Invitation sent" : "Invitation prepared"}`}
        >
          Thanks for bringing your RAV4 in, Mia. Would you share your experience on Google?
        </ReviewInvitation>
        <GoogleReviewCard visible={scene.step >= 2} />
      </div>
      <div className="mc3-scene-copy">
        <Eyebrow>After the job is done</Eyebrow>
        <h2 id="review-title">
          Let your good work
          <br />{" "}
          build your reputation.
        </h2>
        <p>
          Automatically invite customers to leave a Google review after their visit. Make it easy
          for them to share their experience and help the next customer feel confident choosing your
          workshop.
        </p>
        <ActionLink href="/reviews-v3">Explore review automation</ActionLink>
      </div>
    </section>
  );
}

function WorkshopPlans() {
  return (
    <section className="mc3-plans mc3-wrap" aria-labelledby="plans-title">
      <div>
        <Eyebrow>Monthly plans</Eyebrow>
        <h2 id="plans-title">
          Plans for
          <br />{" "}
          your workshop.
        </h2>
        <p className="mc3-plan-value">
          One setup for the customer work that’s easy to put off: enquiries, quote follow-up and
          review requests. Growth adds a reason for existing customers to book again.
        </p>
      </div>
      <div className="mc3-plan-options">
        <div className="mc3-plan-option">
          <div>
            <strong>Follow-Through</strong>
            <p>
              Automatic enquiry replies, inspection requests, quote follow-up and neutral review requests.
            </p>
          </div>
          <span>
            A$399<small>/month</small>
          </span>
        </div>
        <div className="mc3-plan-option">
          <div>
            <strong>Growth</strong>
            <p>Everything in Follow-Through, plus service reminders and customer reactivation.</p>
          </div>
          <span>
            A$699<small>/month</small>
          </span>
        </div>
        <p className="mc3-plan-note">
          Prices exclude GST. Guided Launch from A$1,997 for Follow-Through or A$2,997 for Growth.
          Communication usage and optional AI Receptionist are separate. Standard Follow-Through launch includes up to three agreed automations.{" "}
          <a href="/pricing-review-v3">
            Compare plans and inclusions <ArrowRight size={14} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
