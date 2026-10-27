import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock3, Video } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import bookingCss from "@/styles/booking.css?url";

const TITLE = "Book a Call | Find Your First Useful Zapla Workflow";
const DESCRIPTION =
  "Talk through your enquiries, customer follow-up and current tools. See where Zapla fits and understand the proposed setup and costs.";

export const Route = createFileRoute("/booking")({
  staticData: { sitemap: false },
  head: () => ({
    links: [{ rel: "stylesheet", href: bookingCss }],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: BookingPage,
});

const AGENDA = [
  {
    title: "Start with how you work.",
    copy: "Tell us how you handle enquiries, customer conversations and follow-up today.",
  },
  {
    title: "See where Zapla could help.",
    copy: "We’ll look at the gaps and show you the relevant workflows, alongside the tools you already use.",
  },
  {
    title: "Understand the next step.",
    copy: "Talk through a useful starting workflow, what setup involves and the costs before deciding.",
  },
] as const;

/** Replace this working email arrangement path when the actual calendar embed is supplied. */
function BookingCalendar() {
  const emailBody = encodeURIComponent(
    "Hi Zapla,\n\nI’d like to arrange a call.\n\nMy business:\nWhat I’d like help with:\nTimes that suit me (including timezone):\n\nThanks",
  );
  return (
    <div className="bk-calendar-slot" data-booking-embed="pending">
      <div className="bk-calendar-fallback">
        <a
          className="bk-email-button"
          href={`mailto:hello@zapla.io?subject=Arrange%20a%20Zapla%20call&body=${emailBody}`}
        >
          Email to arrange a call <ArrowRight size={16} aria-hidden="true" />
        </a>
        <span className="bk-email-address">hello@zapla.io</span>
        <p>We’ll confirm a time with you.</p>
      </div>
    </div>
  );
}

function BookingPage() {
  return (
    <div className="booking-page" data-page="booking">
      <a className="bk-skip" href="#booking-main">
        Skip to content
      </a>
      <main id="booking-main" className="bk-main bk-wrap">
        <div className="bk-introduction">
          <div className="bk-brand-line">
            <ZaplaPetal size={56} />
            <p className="bk-eyebrow">Book a Call</p>
          </div>
          <h1>Let’s talk about your business.</h1>
          <p className="bk-intro">
            Tell us what takes up your team’s time. We’ll explore where Zapla could help, using the
            tools and processes you already have.
          </p>
          <div className="bk-call-details" aria-label="Call details">
            <span>
              <Clock3 size={16} aria-hidden="true" />
              30 minutes
            </span>
            <span>
              <Video size={17} aria-hidden="true" />
              Online call
            </span>
          </div>
        </div>

        <section className="bk-booking-panel" aria-labelledby="choose-time">
          <div className="bk-panel-heading">
            <h2 id="choose-time">Arrange your call by email.</h2>
            <p>Send a few suitable times and what you’d like to discuss.</p>
          </div>
          <BookingCalendar />
          <p className="bk-calendar-note">
            Have a question first? <a href="mailto:hello@zapla.io">hello@zapla.io</a>
          </p>
        </section>
        <section className="bk-agenda" aria-labelledby="call-agenda">
          <h2 id="call-agenda">What we’ll cover</h2>
          <ol>
            {AGENDA.map((item) => (
              <li key={item.title}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <p className="bk-starting-point">
          Using spreadsheets, a CRM or specialist software? We’ll start with your current setup.
        </p>
      </main>
    </div>
  );
}
