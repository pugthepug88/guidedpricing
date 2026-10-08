import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronRight, Star } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import mechanicsV2Css from "@/styles/mechanics-v2.css?url";

export const Route = createFileRoute("/industries/mechanics-v2")({
  staticData: { sitemap: false },
  head: () => ({
    links: [
      { rel: "stylesheet", href: mechanicsV2Css },
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
  component: MechanicsV2Page,
});

const BOOK = "https://zapla.io/booking";
function ActionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="m2-text-link" href={href}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="m2-eyebrow">{children}</p>;
}
function MechanicsV2Page() {
  return (
    <main className="mechanics-v2-page" data-page="mechanics-v2">
      <section className="m2-hero m2-wrap" aria-labelledby="mechanics-title">
        <div className="m2-hero-copy">
          <Eyebrow>For independent mechanics and repair workshops</Eyebrow>
          <h1 id="mechanics-title">
            You fix the cars.
            <br />
            <span>Zapla follows through.</span>
          </h1>
          <p className="m2-intro">
            Turn enquiries into bookings, follow up unanswered quotes and bring customers back when
            their next service is due. Zapla keeps the next step moving while you stay on the tools.
          </p>
          <div className="m2-actions">
            <a className="m2-button m2-primary" href={BOOK}>
              Book a Call
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="m2-flow-link" href="#workshop-flow">
              See the workshop flow
              <ChevronRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="m2-hero-visual">
          <img
            className="m2-workshop-photo"
            src="/concept/industries/mechanics-workshop.webp"
            alt="A mechanic inspecting an engine in a modern independent workshop"
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <HeroEnquiry />
        </div>
      </section>

      <div id="workshop-flow" className="m2-story">
        <section className="m2-enquiry m2-wrap" aria-labelledby="enquiry-title">
          <EnquiryScene />
          <div className="m2-scene-copy">
            <Eyebrow>While you’re on the tools</Eyebrow>
            <h2 id="enquiry-title">The enquiry shouldn’t have to wait for you.</h2>
            <p>
              Reply automatically, capture the vehicle details and send a link to available
              inspection times in your configured booking calendar. Customers can choose a time
              without waiting for someone to call back.
            </p>
            <p className="m2-aside">
              Want help answering calls too? <a href="/ai-receptionist">AI Receptionist</a> is an
              optional add-on, configured around what your workshop can handle.
            </p>
            <ActionLink href="/follow-up">Explore enquiry follow-through</ActionLink>
          </div>
        </section>

        <section className="m2-estimate-section" aria-labelledby="estimate-title">
          <div className="m2-wrap m2-quote-layout">
            <div className="m2-scene-copy">
              <Eyebrow>After the quote goes out</Eyebrow>
              <h2 id="estimate-title">Follow up quotes before they go cold.</h2>
              <p>
                A quote sitting in an inbox is work you’ve already put time into. Zapla follows up
                automatically and stops the reminders when the customer replies. If they have a
                question about the work, your team gets the conversation.
              </p>
              <ActionLink href="/follow-up">Explore Follow-Up</ActionLink>
            </div>
            <QuoteSceneV2 />
          </div>
        </section>

        <section className="m2-return m2-wrap" aria-labelledby="return-title">
          <div className="m2-scene-copy">
            <Eyebrow>Service and inspection reminders</Eyebrow>
            <h2 id="return-title">The right reminder. Before the next service is due.</h2>
            <p>
              Know who’s due back and why. Zapla uses recorded service dates or NSW pink slip due
              dates to send a relevant reminder automatically, with a link to book. Ask about the
              right service at the right time, rather than sending another generic “checking in”.
            </p>
            <ActionLink href="/customer-marketing">Explore Customer Marketing</ActionLink>
            <p className="m2-return-support">
              Reconnect with customers you haven’t heard from through a relevant{" "}
              <a href="/reactivation">reactivation campaign</a>.
            </p>
          </div>
          <ReturnScene />
        </section>
      </div>

      <ReviewScene />

      <section className="m2-fit m2-wrap" aria-labelledby="fit-title">
        <h2 id="fit-title">
          Keep your workshop system.
          <br />
          <span>Add the customer follow-through.</span>
        </h2>
        <p>
          Jobs, vehicles and parts stay where they are. During setup, we agree how Zapla gets the
          customer information it needs.
        </p>
      </section>

      <section className="m2-launch" aria-labelledby="launch-title">
        <div className="m2-wrap m2-launch-layout">
          <div className="m2-launch-copy">
            <Eyebrow>Guided Launch</Eyebrow>
            <h2 id="launch-title">
              Built around
              <br />
              your workshop.
            </h2>
            <p>We map your process, build the agreed flows and get your team ready to use them.</p>
            <p>
              We configure your booking calendar, reminder timing and the questions that need a
              human reply.
            </p>
            <ActionLink href="/Pricing-v3">Explore plans and Guided Launch</ActionLink>
          </div>
          <div className="m2-launch-plan" aria-label="Illustrative workshop launch plan">
            <div className="m2-launch-plan-heading">
              <span>Your workshop launch plan</span>
            </div>
            <h3>
              Start with the gaps
              <br />
              in your workshop.
            </h3>
            <div className="m2-launch-plan-row">
              <strong>Quotes going quiet</strong>
              <p>Agree when to follow up and when to stop.</p>
            </div>
            <div className="m2-launch-plan-row">
              <strong>Customers due back</strong>
              <p>Choose the service dates and reminder timing.</p>
            </div>
            <div className="m2-launch-plan-row">
              <strong>Bookings without the back-and-forth</strong>
              <p>Test the enquiry, booking link and confirmation together.</p>
            </div>
          </div>
        </div>
      </section>

      <WorkshopPlans />

      <section className="m2-final m2-wrap" aria-labelledby="final-title">
        <span className="m2-final-petal">
          <ZaplaPetal />
        </span>
        <h2 id="final-title">
          Find the follow-up
          <br />
          your workshop is missing.
        </h2>
        <p>
          Show us how enquiries, quotes and service reminders work today. We’ll map what Zapla can
          automate, what your team handles and which plan fits your workshop.
        </p>
        <div className="m2-actions">
          <a className="m2-button m2-primary" href={BOOK}>
            Book a Call
            <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a className="m2-button m2-secondary" href="/Pricing-v3">
            View pricing
          </a>
        </div>
      </section>
    </main>
  );
}

const QUOTE_STAGES = ["Quote sent", "Follow-up sent", "Customer replied"];
const ENQUIRY_STAGES = ["Customer asks", "Booking link sent"];
const RETURN_STAGES = ["Service record", "Reminder sent", "Customer replies"];

// Each brief scene progresses once, pauses offscreen and holds its final state.
function useScene(stages: string[], timings: number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.25 });
  const prefersReduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const last = stages.length - 1;
  useEffect(() => {
    if (prefersReduced) setStep(last);
  }, [prefersReduced, last]);
  const delay = timings[step] ?? 1400;
  useEffect(() => {
    if (!visible || prefersReduced || step >= last) return;
    const timer = window.setTimeout(() => setStep((s) => Math.min(s + 1, last)), delay);
    return () => window.clearTimeout(timer);
  }, [visible, prefersReduced, step, last, delay]);
  return { ref, step };
}
function HeroEnquiry() {
  return (
    <div className="m2-hero-event">
      <div className="m2-glass m2-hero-event-body">
        <div className="m2-customer-heading">
          <span className="m2-person-avatar" />
          <div>
            <strong>Mia Thompson</strong>
            <span>Workshop enquiry</span>
          </div>
        </div>
        <p>“My brakes are squeaking. Could you take a look this week?”</p>
        <p className="m2-hero-next">Inspection booking link sent automatically.</p>
      </div>
    </div>
  );
}
function EnquiryScene() {
  const scene = useScene(ENQUIRY_STAGES, [1400]);
  return (
    <div
      ref={scene.ref}
      className="m2-enquiry-scene"
      data-step={scene.step}
      role="img"
      aria-label="Illustrative enquiry: Mia asks about her brakes and receives an automatic inspection booking link"
    >
      <div className="m2-dialogue-row">
        <span className="m2-person-avatar" />
        <div className="m2-dialogue-content">
          <strong>Mia Thompson</strong>
          <p className="m2-glass m2-dialogue-bubble">
            Hi, my brakes have started squeaking. Could you take a look this week? It’s a 2019 RAV4.
          </p>
        </div>
      </div>
      <div
        className={`m2-dialogue-row m2-dialogue-outgoing m2-enquiry-ack ${scene.step >= 1 ? "is-revealed" : ""}`}
        aria-hidden={scene.step < 1}
      >
        <span className="m2-zapla-avatar">
          <ZaplaPetal />
        </span>
        <div className="m2-dialogue-content">
          <strong>Your workshop · Automated reply</strong>
          <div className="m2-glass m2-dialogue-bubble">
            <p>
              Thanks Mia. Choose an available inspection time here and we’ll get your RAV4 booked
              in.
            </p>
            <span className="m2-message-link">
              Book an inspection <ArrowRight size={15} aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
function QuoteSceneV2() {
  const scene = useScene(QUOTE_STAGES, [1400, 1400]);
  return (
    <div ref={scene.ref} className="m2-quote-scene" data-step={scene.step}>
      <div className="m2-glass m2-quote-summary">
        <div className="m2-customer-heading">
          <span className="m2-person-avatar" />
          <div>
            <strong>Mia Thompson</strong>
            <span>2019 Toyota RAV4</span>
          </div>
        </div>
        <div className="m2-quote-jobline">
          <strong>Brake work quote</strong>
          <span>{scene.step >= 2 ? "Customer replied" : "Awaiting response"}</span>
        </div>
      </div>
      <div
        className={`m2-dialogue-row m2-quote-message ${scene.step >= 1 ? "is-visible" : ""}`}
        aria-hidden={scene.step < 1}
      >
        <span className="m2-zapla-avatar">
          <ZaplaPetal />
        </span>
        <div className="m2-dialogue-content">
          <strong>Your workshop · Follow-up sent</strong>
          <p className="m2-glass m2-dialogue-bubble">
            Hi Mia, did you have any questions about the brake work we quoted? Reply here and we’ll
            help.
          </p>
        </div>
      </div>
      <div
        className={`m2-dialogue-row m2-quote-reply ${scene.step >= 2 ? "is-visible" : ""}`}
        aria-hidden={scene.step < 2}
      >
        <span className="m2-person-avatar" />
        <div className="m2-dialogue-content">
          <strong>Mia Thompson</strong>
          <p className="m2-glass m2-dialogue-bubble">
            Does the quote include both the pads and discs?
          </p>
        </div>
      </div>
      <p className="m2-quote-stop">
        {scene.step >= 2
          ? "Mia’s question reaches your team. Further reminders stop."
          : "Follow-up continues only while the quote is unanswered."}
      </p>
    </div>
  );
}
function ReturnScene() {
  const scene = useScene(RETURN_STAGES, [1600, 1600]);
  return (
    <div
      ref={scene.ref}
      className="m2-return-visual"
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
      <div className="m2-glass m2-service-reminder">
        <div className="m2-overlay-heading">
          <span>Service due in November</span>
          <ZaplaPetal />
        </div>
        <p>
          Hi Mia, your RAV4’s next service is due in November. Book a time that suits you below.
        </p>
        <span className="m2-message-link">
          Book your next service <ArrowRight size={15} aria-hidden="true" />
        </span>
        <span className="m2-overlay-caption">
          {scene.step >= 1
            ? "Reminder sent by your workshop"
            : "Based on the vehicle’s service date"}
        </span>
      </div>
      <div
        className={`m2-glass m2-return-reply ${scene.step >= 2 ? "is-arrived" : ""}`}
        aria-hidden={scene.step < 2}
      >
        <div className="m2-customer-heading">
          <span className="m2-person-avatar" />
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
function GoogleWordmark() {
  return (
    <span className="m2-google-wordmark" aria-label="Google">
      <span>G</span>
      <span>o</span>
      <span>o</span>
      <span>g</span>
      <span>l</span>
      <span>e</span>
    </span>
  );
}
function ReviewScene() {
  const scene = useScene(REVIEW_STAGES, [1400, 1400]);
  return (
    <section className="m2-reviews m2-wrap" aria-labelledby="review-title">
      <div ref={scene.ref} className="m2-review-scene" data-step={scene.step}>
        <div className="m2-review-completed">
          <span className="m2-person-avatar" />
          <span>
            Mia’s RAV4 <strong>Service completed</strong>
          </span>
        </div>
        <div className="m2-review-message">
          <span className="m2-zapla-avatar">
            <ZaplaPetal />
          </span>
          <div className="m2-glass m2-review-invitation">
            <span className="m2-review-sender">
              Your workshop · {scene.step >= 1 ? "Invitation sent" : "Invitation prepared"}
            </span>
            <p>Thanks for bringing your RAV4 in, Mia. Would you share your experience on Google?</p>
            <span className="m2-google-link">
              Leave a Google review <ArrowRight size={15} aria-hidden="true" />
            </span>
          </div>
        </div>
        <div
          className={`m2-glass m2-google-review-screen ${scene.step >= 2 ? "is-visible" : ""}`}
          aria-hidden={scene.step < 2}
        >
          <GoogleWordmark />
          <h3>How was your visit?</h3>
          <div
            className="m2-google-stars"
            aria-label="Five unselected rating stars in an illustrative review screen"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={28} strokeWidth={1.6} aria-hidden="true" />
            ))}
          </div>
          <span className="m2-google-write">Share your experience</span>
        </div>
      </div>
      <div className="m2-scene-copy">
        <Eyebrow>After the job is done</Eyebrow>
        <h2 id="review-title">
          Let your good work
          <br />
          build your reputation.
        </h2>
        <p>
          Automatically invite customers to leave a Google review after their visit. Make it easy
          for them to share their experience and help the next customer feel confident choosing your
          workshop.
        </p>
        <ActionLink href="/reviews">Explore review automation</ActionLink>
      </div>
    </section>
  );
}

function WorkshopPlans() {
  return (
    <section className="m2-plans m2-wrap" aria-labelledby="plans-title">
      <div>
        <Eyebrow>Monthly plans</Eyebrow>
        <h2 id="plans-title">
          Plans for
          <br />
          your workshop.
        </h2>
        <p className="m2-plan-value">
          One setup for the customer work that’s easy to put off: enquiries, quote follow-up and
          review requests. Growth adds a reason for existing customers to book again.
        </p>
      </div>
      <div className="m2-plan-options">
        <div className="m2-plan-option">
          <div>
            <strong>Follow-Through</strong>
            <p>
              Automatic enquiry replies, online booking, quote follow-up and Google review requests.
            </p>
          </div>
          <span>
            A$399<small>/month</small>
          </span>
        </div>
        <div className="m2-plan-option">
          <div>
            <strong>Growth</strong>
            <p>Everything in Follow-Through, plus service reminders and customer reactivation.</p>
          </div>
          <span>
            A$699<small>/month</small>
          </span>
        </div>
        <p className="m2-plan-note">
          GST, usage and setup extra.{" "}
          <a href="/Pricing-v3">
            Compare plans and inclusions <ArrowRight size={14} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
