import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
      { name: "robots", content: "noindex, nofollow" },
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

/** Replace this fallback with the supplied calendar embed, not a second enquiry form. */
function BookingCalendar() {
  return (
    <div className="bk-calendar-slot" data-booking-embed="pending">
      <div className="bk-calendar-fallback">
        <ZaplaPetal size={48} />
        <h3>Let’s find a time to talk.</h3>
        <p>Online scheduling will be available here soon. You can email us to arrange your call.</p>
        <a
          className="bk-email-button"
          href="mailto:hello@zapla.io?subject=Arrange%20a%20Zapla%20call"
        >
          Email to arrange a call <ArrowRight size={16} aria-hidden="true" />
        </a>
        <span className="bk-email-address">hello@zapla.io</span>
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
      <header className="bk-header bk-wrap">
        <a href="/" aria-label="Zapla home" className="bk-brand">
          <img src="/concept/zapla-logo-dark.svg" width="112" height="32" alt="Zapla" />
        </a>
        <a className="bk-return" href="/platform">
          Explore Zapla <ArrowRight size={15} aria-hidden="true" />
        </a>
      </header>

      <main id="booking-main" className="bk-main bk-wrap">
        <div className="bk-introduction">
          <p className="bk-eyebrow">Book a Call</p>
          <h1>
            See where Zapla
            <br />
            fits <span>your business.</span>
          </h1>
          <p className="bk-intro">
            Less time chasing. More enquiries followed up. Customers who hear from you at the right
            time. Let’s look at where Zapla could help your business.
          </p>
          <p className="bk-duration">A 30 minute conversation about how you work.</p>
        </div>

        <section className="bk-booking-panel" aria-labelledby="choose-time">
          <div className="bk-panel-heading">
            <h2 id="choose-time">Choose a time to talk.</h2>
            <p>Tell us a little about your business when you book.</p>
          </div>
          <BookingCalendar />
          <p className="bk-calendar-note">
            Have a question first? <a href="mailto:hello@zapla.io">hello@zapla.io</a>
          </p>
        </section>
        <section className="bk-agenda" aria-labelledby="call-agenda">
          <h2 id="call-agenda">What we’ll cover</h2>
          <ol>
            {AGENDA.map((item, index) => (
              <li key={item.title}>
                <span className="bk-step" aria-hidden="true">
                  0{index + 1}
                </span>
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

      <footer className="bk-footer bk-wrap">
        <p>© {new Date().getFullYear()} Zapla</p>
        <nav aria-label="Booking page footer">
          <a href="https://zapla.io/privacy-policy">Privacy policy</a>
          <a href="https://zapla.io/terms-and-conditions">Terms &amp; conditions</a>
        </nav>
      </footer>
    </div>
  );
}
