import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/calendars-bookings.css";

// Fixed illustrative availability. Nothing is submitted or booked by this page.
const exampleTimes: Record<number, string[]> = {
  9: ["9:00 am", "11:00 am", "2:00 pm"],
  10: ["9:00 am", "10:30 am", "2:00 pm", "3:30 pm"],
  11: ["10:00 am", "11:30 am", "1:00 pm"],
  12: ["9:30 am", "1:30 pm", "3:00 pm"],
  13: ["9:00 am", "10:30 am"],
  16: ["10:00 am", "1:00 pm", "3:00 pm"],
  17: ["9:30 am", "11:00 am", "2:30 pm"],
  18: ["9:00 am", "1:30 pm"],
  19: ["10:30 am", "2:00 pm", "3:30 pm"],
  20: ["9:30 am", "11:30 am"],
};
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const calendarCells = Array.from({ length: 42 }, (_, index) => {
  const date = index - 5; // November 2026 begins on Sunday; the grid begins on Monday.
  return date > 0 && date <= 30 ? date : null;
});
const dateLabel = (day: number) =>
  new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(2026, 10, day)));

function Avatar({ cell = 8 }: { cell?: number }) {
  return (
    <span
      className="cal-avatar"
      aria-hidden="true"
      style={{ backgroundPosition: `${(cell % 6) * 20}% ${(Math.floor(cell / 6) / 3) * 100}%` }}
    />
  );
}
function Cta({ children = "Book a Call" }: { children?: ReactNode }) {
  return (
    <a className="cal-cta" href="/booking">
      {children} <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

function BookingScene({
  selectedDay,
  selectedTime,
  onDayChange,
  onTimeChange,
}: {
  selectedDay: number;
  selectedTime: string | null;
  onDayChange: (day: number) => void;
  onTimeChange: (time: string) => void;
}) {
  const label = dateLabel(selectedDay);
  const [interactive, setInteractive] = useState(false);
  useEffect(() => {
    setInteractive(true);
  }, []);
  return (
    <div className="cal-booking-scene" id="booking-example">
      <div className="cal-booking-paper">
        <div className="cal-booking-heading">
          <div>
            <p className="cal-scene-label">Emma’s booking</p>
            <h2>Project consultation</h2>
            <p>30 minutes · With Alex Chen</p>
          </div>
          <Avatar />
        </div>
        <div className="cal-date-and-time">
          <div className="cal-month">
            <h3>November 2026</h3>
            <table className="cal-date-grid">
              <caption className="cal-sr-only">
                Choose an available example date in November 2026
              </caption>
              <thead>
                <tr>
                  {weekdays.map((day) => (
                    <th key={day} scope="col">
                      <abbr title={day}>{day.slice(0, 1)}</abbr>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }, (_, week) => (
                  <tr key={week}>
                    {calendarCells.slice(week * 7, week * 7 + 7).map((day, column) => (
                      <td key={column}>
                        {day !== null && (
                          <button
                            type="button"
                            disabled={!interactive || !exampleTimes[day]}
                            aria-label={`${dateLabel(day)} 2026${exampleTimes[day] ? "" : ", unavailable"}`}
                            aria-pressed={day === selectedDay}
                            aria-controls="cal-time-options cal-booking-outcome"
                            onClick={() => onDayChange(day)}
                          >
                            {day}
                          </button>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="cal-timezone">Sydney · AEDT (UTC+11)</p>
          </div>
          <div className="cal-times" id="cal-time-options">
            <h3>{selectedDay} November</h3>
            <div role="group" aria-label={`Example times for ${label}`}>
              {exampleTimes[selectedDay].map((time) => (
                <button
                  type="button"
                  key={time}
                  disabled={!interactive}
                  aria-pressed={time === selectedTime}
                  aria-controls="cal-booking-outcome"
                  onClick={() => onTimeChange(time)}
                >
                  {time}
                  <Check size={14} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="cal-customer-details">
          <span>Then, the customer adds their details</span>
          <strong>
            Emma Wilson <span>· emma@example.com</span>
          </strong>
        </div>
      </div>
      <div
        className="cal-booking-outcome"
        id="cal-booking-outcome"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="cal-outcome-content" key={`${selectedDay}-${selectedTime}`}>
          <div className="cal-booked-line">
            {selectedTime && <Check size={20} aria-hidden="true" />}
            <h3>{selectedTime ? "Appointment booked" : "Choose a time for Emma"}</h3>
          </div>
          <p className="cal-confirmed-date">
            {selectedTime ? `${label} · ${selectedTime}` : `${label} · Time not selected`}
          </p>
          <div className="cal-reminder">
            <span>SMS reminder example</span>
            <p>
              {selectedTime
                ? `Hi Emma, a reminder of your project consultation on ${label} at ${selectedTime}, Sydney time. We look forward to seeing you.`
                : "The confirmation and reminder will use the same appointment once you choose a time."}
            </p>
          </div>
        </div>
      </div>
      <p className="cal-demo-note">
        {interactive
          ? "Try a date and time. This example creates no appointment."
          : "Illustrative booking. No appointment is created."}
      </p>
    </div>
  );
}

/** One bounded native continuation, no scroll capture, timers or format menu.
 * Without enhancement the complete illustration stays in normal reading order. */
function CalendarOpening({
  selectedDay,
  selectedTime,
  onDayChange,
  onTimeChange,
}: {
  selectedDay: number;
  selectedTime: string | null;
  onDayChange: (day: number) => void;
  onTimeChange: (time: string) => void;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1100px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      const scene = sceneRef.current;
      setEnhanced(media.matches && !!scene && scene.offsetHeight <= window.innerHeight - 120);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    const observer = new ResizeObserver(requestUpdate);
    if (sceneRef.current) observer.observe(sceneRef.current);
    window.addEventListener("resize", requestUpdate);
    media.addEventListener("change", requestUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", requestUpdate);
    };
  }, []);
  return (
    <section className="cal-opening" aria-labelledby="cal-title">
      <div className="cal-wrap cal-opening-grid" data-enhanced={enhanced}>
        <header className="cal-hero-intro">
          <p className="cal-eyebrow">Calendars &amp; Bookings</p>
          <h1 id="cal-title">
            <span>A good time</span> <span>for them.</span> <span>A day that</span>{" "}
            <span>works for you.</span>
          </h1>
          <p>
            Give customers a booking link. Offer the times, people and appointment types that work
            for your business.
          </p>
          <div className="cal-hero-actions">
            <Cta />
            <a className="cal-text-link" href="#calendar-formats">
              Explore five booking formats <span aria-hidden="true">↓</span>
            </a>
          </div>
        </header>
        <div className="cal-opening-visual">
          <div className="cal-booking-desk" ref={sceneRef}>
            <BookingScene
              selectedDay={selectedDay}
              selectedTime={selectedTime}
              onDayChange={onDayChange}
              onTimeChange={(time) => {
                onTimeChange(time);
              }}
            />
          </div>
        </div>
        <div className="cal-follow-copy">
          <h2>
            They choose a time.
            <br />
            You know who’s coming.
          </h2>
          <p>
            From a shared link or your website, customers choose an available date and time, add
            their details and see their booking confirmed on screen.
          </p>
          <p>
            Send an email or SMS reminder as the appointment approaches. The same visit, kept in
            mind.
          </p>
          <p className="cal-small-note">
            Reminder content and timing are agreed during setup. Message usage is charged
            separately.
          </p>
        </div>
      </div>
    </section>
  );
}

function People({
  cells,
  label,
  chooseOne = false,
}: {
  cells: number[];
  label: string;
  chooseOne?: boolean;
}) {
  return (
    <div className={`cal-people ${chooseOne ? "cal-people-choose-one" : ""}`}>
      <div>
        {cells.map((cell) => (
          <Avatar cell={cell} key={cell} />
        ))}
      </div>
      <span>{label}</span>
    </div>
  );
}
const formats = [
  {
    name: "1-on-1",
    description: "One host. One customer.",
    use: "Consultations and individual appointments.",
    hosts: [8],
    guests: [9],
    hostLabel: "One host",
    guestLabel: "One attendee",
  },
  {
    name: "Group booking",
    description: "One host. A shared session.",
    use: "Workshops, classes and group appointments.",
    hosts: [8],
    guests: [9, 4, 5],
    hostLabel: "One host",
    guestLabel: "Multiple attendees",
  },
  {
    name: "Collective",
    description: "Your team, in the same meeting.",
    use: "Joint consultations with one customer.",
    hosts: [8, 13],
    guests: [9],
    hostLabel: "Multiple hosts",
    guestLabel: "One attendee",
  },
  {
    name: "Round robin",
    description: "One customer. One host from your team.",
    use: "Appointments different team members can handle.",
    hosts: [8, 13, 15],
    guests: [9],
    hostLabel: "One host booked",
    guestLabel: "One attendee",
  },
];
function BookingFormats() {
  return (
    <section className="cal-formats" id="calendar-formats" aria-labelledby="cal-formats-title">
      <div className="cal-wrap">
        <div className="cal-formats-intro">
          <h2 id="cal-formats-title">
            Not every meeting
            <br />
            is a one-to-one.
          </h2>
          <p>Five calendar formats. Choose the one that fits who needs to be there.</p>
        </div>
        <div className="cal-format-list">
          {formats.map((format) => (
            <article className="cal-format-row" key={format.name}>
              <h3>{format.name}</h3>
              <div className="cal-format-explanation">
                <p>{format.description}</p>
                <span>{format.use}</span>
              </div>
              <div
                className="cal-format-relationship"
                aria-label={`${format.hostLabel}, ${format.guestLabel.toLowerCase()}`}
              >
                <People
                  cells={format.hosts}
                  label={format.hostLabel}
                  chooseOne={format.name === "Round robin"}
                />
                <span className="cal-relationship-symbol" aria-hidden="true">
                  →
                </span>
                <People cells={format.guests} label={format.guestLabel} />
              </div>
            </article>
          ))}
          <article className="cal-format-row cal-format-event">
            <h3>Event</h3>
            <div className="cal-format-explanation">
              <p>A particular date. Its own time slots.</p>
              <span>Open days, information sessions and special occasions.</span>
            </div>
            <div className="cal-event-illustration">
              <strong>
                18 <span>Nov</span>
              </strong>
              <div>
                <span>Project open day</span>
                <p>
                  10:00 am <span>or</span> 2:00 pm
                </p>
              </div>
            </div>
          </article>
        </div>
        <p className="cal-formats-note">People and sessions shown are illustrative.</p>
      </div>
    </section>
  );
}

function BusinessDay({
  selectedDay,
  selectedTime,
}: {
  selectedDay: number;
  selectedTime: string | null;
}) {
  return (
    <section className="cal-business" aria-labelledby="cal-business-title">
      <div className="cal-wrap">
        <div className="cal-business-intro">
          <h2 id="cal-business-title">
            Your calendar.
            <br /> With room for the work.
          </h2>
          <p>
            Your booking page offers the hours you choose. Your team has the appointment and the
            customer context together when it is time to meet.
          </p>
        </div>
        <figure className="cal-consultation-photo">
          <img
            src="/concept/calendars/consultation-studio-v2.webp"
            width="1536"
            height="1024"
            loading="lazy"
            alt="A design consultant and a homeowner discussing stone and timber samples over an architectural plan"
          />
        </figure>
        <div className="cal-business-sheet">
          <div className="cal-appointment-record">
            <p className="cal-scene-label">Appointment &amp; customer, together</p>
            <div className="cal-record-person">
              <Avatar cell={9} />
              <div>
                <h3>Emma Wilson</h3>
                <p>Project consultation · With Alex</p>
              </div>
            </div>
            <p className="cal-record-time">
              {selectedTime
                ? `${dateLabel(selectedDay)} · ${selectedTime}`
                : "Choose an example time above"}
            </p>
            <div className="cal-record-changes">
              <h4>Plans change. Your team can handle it.</h4>
              <p>
                Customers contact your business to change or cancel. Your team can update the
                booking time or status.
              </p>
            </div>
            <a className="cal-text-link" href="/crm">
              Explore the connected CRM <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="cal-availability">
            <h3>A day with breathing room.</h3>
            <p>
              Set working days, split hours and a time zone. Choose each appointment’s duration and
              minimum notice.
            </p>
            <div
              className="cal-day-ranges"
              aria-label="Example split availability: nine to noon, then one to five"
            >
              <div>
                <span>9:00 am — 12:00 pm</span>
                <strong>Available for appointments</strong>
              </div>
              <div className="cal-day-break">
                <span>12:00 pm — 1:00 pm</span>
                <strong>Time kept for yourself</strong>
              </div>
              <div>
                <span>1:00 pm — 5:00 pm</span>
                <strong>Available for appointments</strong>
              </div>
            </div>
            <p className="cal-small-note">
              Illustrative hours. Personal availability and booking calendar hours are set
              separately.
            </p>
          </div>
          <div className="cal-calendar-connections">
            <p>
              Connect your calendars.
              <br />
              <span>Choose where each team member’s bookings go.</span>
            </p>
            <ul aria-label="Supported calendar connections">
              <li>Google Calendar</li>
              <li>Microsoft 365</li>
              <li>Apple iCloud</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  [
    "Can I offer different services and appointment lengths?",
    "Yes. Add booking types with their own names and durations, plus a minimum notice setting. If a calendar offers several services, customers choose one before selecting a date and time.",
  ],
  [
    "Can the booking page look like my business?",
    "Yes. Adjust the booking page’s fonts, colours and date styling. Share its link or embed it on your website. You can also link a custom booking form to ask for the details you need before the appointment.",
  ],
  [
    "Can customers book from another time zone?",
    "Yes. The booking page detects the visitor’s time zone and lets them change it. This page’s example uses fixed Sydney times and creates no appointment.",
  ],
  [
    "Can it send appointment reminders?",
    "Yes. Appointment reminders can be sent by email or SMS. We agree the reminders you need during setup. Message usage is charged separately.",
  ],
  [
    "How do changes and cancellations work?",
    "Customers contact your business to change or cancel. Your team can edit the booking’s start and end time or update its status. A status only releases the time for another booking when its slot-release setting is enabled.",
  ],
  [
    "What if I already have a CRM or booking system?",
    "We start with your current tools. If you use email and a diary, we can map a first booking flow. If you have a CRM or specialist booking system, we review where Zapla fits and what connections are supported before recommending a change.",
  ],
];

export function CalendarsBookingsPage() {
  const [selectedDay, setSelectedDay] = useState(10);
  const [selectedTime, setSelectedTime] = useState<string | null>("10:30 am");
  function chooseDay(day: number) {
    if (day !== selectedDay) {
      setSelectedDay(day);
      setSelectedTime(null);
    }
  }
  return (
    <main className="zapla-feature zapla-calendars">
      <CalendarOpening
        selectedDay={selectedDay}
        selectedTime={selectedTime}
        onDayChange={chooseDay}
        onTimeChange={setSelectedTime}
      />
      <BookingFormats />
      <BusinessDay selectedDay={selectedDay} selectedTime={selectedTime} />
      <section className="cal-start" aria-labelledby="cal-start-title">
        <div className="cal-wrap cal-start-grid">
          <div className="cal-launch">
            <p className="cal-eyebrow">Guided Launch</p>
            <h2 id="cal-start-title">
              Set up for the way
              <br />
              you book.
            </h2>
            <p>
              We work through your services, team calendars and booking form, then walk the customer
              journey with you before launch.
            </p>
            <p>
              Guided Launch is the separately priced initial setup. We agree the scope around your
              business and the tools you already use.
            </p>
            <Cta>Talk through your setup</Cta>
          </div>
          <div className="cal-faq" aria-label="Practical booking questions">
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
        </div>
      </section>
      <section className="cal-final">
        <div className="cal-wrap">
          <div className="cal-final-petal">
            <ZaplaPetal size={34} />
          </div>
          <p className="cal-eyebrow">See it around your business</p>
          <h2>
            Make room for
            <br />
            your next customer.
          </h2>
          <p>
            Bring the appointments you offer and the calendars you use. We’ll show you how a booking
            could work from the customer’s first choice to your team’s next step.
          </p>
          <Cta />
        </div>
      </section>
    </main>
  );
}
