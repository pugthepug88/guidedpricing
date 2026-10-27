import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Check, ChevronDown, Mic, MonitorUp, Video } from "lucide-react";
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
              <caption className="cal-sr-only">Choose a date in November 2026</caption>
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
            <div role="group" aria-label={`Times for ${label}`}>
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
          <span>From Emma’s booking form</span>
          <strong>Emma Wilson</strong>
          <div className="cal-booking-answer">
            <span>What would you like to discuss?</span>
            <p>Kitchen renovation · Benchtop materials</p>
          </div>
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
        </div>
      </div>
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
            Ask for useful details in your booking form. For returning customers, your team can also
            review their existing CRM history.
          </p>
        </div>
      </div>
      <div className="cal-wrap cal-calendar-connections" id="calendar-connections">
        <p>Send bookings to the calendars your team uses.</p>
        <ul aria-label="Supported calendar connections">
          <li>
            <img
              src="/concept/calendars/providers/google-calendar.svg"
              width="24"
              height="24"
              alt=""
              loading="lazy"
            />
            <span>Google Calendar</span>
          </li>
          <li>
            <img
              src="/concept/calendars/providers/microsoft-outlook.svg"
              width="24"
              height="24"
              alt=""
              loading="lazy"
            />
            <span>Microsoft 365</span>
          </li>
          <li>
            <img
              src="/concept/calendars/providers/apple-calendar.png"
              width="24"
              height="24"
              alt=""
              loading="lazy"
            />
            <span>Apple iCloud</span>
          </li>
        </ul>
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
      <div className="cal-formats-panel">
        <div className="cal-wrap">
          <div className="cal-formats-intro">
            <h2 id="cal-formats-title">
              Five ways
              <br />
              to meet.
            </h2>
            <p>Choose the calendar format that fits who needs to be there.</p>
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
        </div>
      </div>
    </section>
  );
}

function MeetingRoomScene() {
  return (
    <figure className="cal-meeting-demo" aria-label="Video consultation and saved attendee record">
      <div className="cal-meeting-window">
        <div className="cal-meeting-call">
          <div className="cal-meeting-call-heading">
            <span>Project consultation</span>
            <span className="cal-recording-indicator">Recording</span>
          </div>
          <div className="cal-meeting-video">
            <img
              src="/concept/calendars/meeting-participants-v1.webp"
              width="1774"
              height="887"
              loading="lazy"
              alt="Alex Chen in his studio and Emma Wilson joining the video consultation from home"
            />
            <div className="cal-meeting-names" aria-hidden="true">
              <span>Alex Chen</span>
              <span>Emma Wilson</span>
            </div>
          </div>
          <div className="cal-meeting-tools" aria-label="Video, microphone and screen sharing">
            <span>
              <Mic size={17} aria-hidden="true" />
              Microphone
            </span>
            <span>
              <Video size={18} aria-hidden="true" />
              Camera
            </span>
            <span>
              <MonitorUp size={18} aria-hidden="true" />
              Share screen
            </span>
          </div>
        </div>
        <div className="cal-meeting-saved">
          <div className="cal-meeting-contact">
            <div>
              <p>After the meeting · Attendee’s CRM record</p>
              <h3>Emma Wilson</h3>
            </div>
          </div>
          <div className="cal-meeting-history">
            <div className="cal-meeting-recording">
              <span>Recording saved</span>
              <p>Project consultation</p>
              <div>
                <Video size={18} aria-hidden="true" />
                <span>Meeting recording</span>
                <Check size={16} aria-hidden="true" />
              </div>
            </div>
            <div className="cal-meeting-transcript">
              <span>Transcript saved</span>
              <p>
                <strong>Emma</strong> Let’s compare the light stone with the timber.
              </p>
              <p>
                <strong>Alex</strong> I’ll send both options for you to review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

/** One customer's messages, with a separately triggered no-show follow-up. */
function BookingAutomations({ day, time }: { day: number; time: string | null }) {
  return (
    <div className="cal-automation" id="booking-automations" aria-labelledby="cal-automation-title">
      <div className="cal-automation-copy">
        <h2 id="cal-automation-title">
          Confirm. Remind.
          <br />
          Help them rebook.
        </h2>
        <p>
          Send confirmations and reminders by email or SMS. When your team marks an appointment as
          missed, follow up with a link to book again.
        </p>
        <a className="cal-text-link" href="/features/automation-builder">
          Explore Automation Builder <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
      <div
        className="cal-phone-scene"
        aria-label={
          time
            ? "Emma’s phone: booking confirmation, reminder and a follow-up if marked as missed"
            : "Choose a time to see the booking automation"
        }
      >
        <div className="cal-message-phone">
          <div className="cal-phone-screen">
            <span className="cal-phone-speaker" aria-hidden="true" />
            <div className="cal-phone-heading">
              <Avatar />
              <div>
                <h3>Alex Chen</h3>
                <p>Project consultation</p>
              </div>
            </div>
            {time ? (
              <ol className="cal-phone-thread" aria-label="Messages Emma receives">
                <li>
                  <h4>When booked</h4>
                  <p className="cal-phone-bubble">
                    You’re booked, Emma.
                    <strong>
                      {dateLabel(day)} · {time}
                    </strong>
                  </p>
                </li>
                <li>
                  <h4>1 day before</h4>
                  <p className="cal-phone-bubble">
                    A reminder about your consultation tomorrow at {time}. See you then.
                  </p>
                </li>
                <li className="cal-phone-rebook">
                  <h4>If marked as missed</h4>
                  <div className="cal-phone-bubble">
                    <p>Sorry we missed you, Emma. Find another time that suits you.</p>
                    <a
                      href="#booking-example"
                      aria-label="Choose another time in the booking demonstration"
                    >
                      Choose another time <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </li>
              </ol>
            ) : (
              <p className="cal-message-pending">
                <a href="#booking-example">Choose a booking time</a> to see Emma’s messages.
              </p>
            )}
            <span className="cal-phone-home" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BusinessDay({ day, time }: { day: number; time: string | null }) {
  return (
    <section className="cal-business" id="meeting-rooms" aria-labelledby="cal-business-title">
      <div className="cal-wrap">
        <BookingAutomations day={day} time={time} key={`${day}-${time}`} />
        <div className="cal-business-meet">
          <MeetingRoomScene />
          <div className="cal-meeting-rooms">
            <h2 id="cal-business-title">
              Video meetings.
              <br /> Saved in your CRM.
            </h2>
            <p>
              Use Zapla’s <strong>Meeting Rooms</strong> to host video consultations and team
              meetings in your browser. Share your screen to walk through a plan or proposal
              together.
            </p>
            <p className="cal-meeting-payoff">
              Meetings are recorded and saved, with transcripts saved to attendees’ CRM records.
              Revisit what was said before the next conversation.
            </p>
            <p>
              Share a room link. Keep access public, or choose the contacts and team members who can
              join.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  [
    "Are meetings recorded, and where are transcripts saved?",
    "Yes. Meetings are recorded and saved, and their transcripts are saved to attendees’ CRM records. Your team can revisit the recording and read what was said with the attendee’s customer history in view.",
  ],
  [
    "Can I host video meetings inside Zapla?",
    "Yes. Meeting Rooms lets you create native video meeting rooms and share a room’s unique link. Guests join in the browser, with camera and microphone controls and screen sharing. Public rooms allow anyone with the link; restricted rooms let you select up to four contacts, alongside selected team members. The four-contact limit applies to the restricted invitation list.",
  ],
  [
    "Can I set my hours and appointment lengths?",
    "Yes. Set working days, hours and a time zone, including split time ranges. Give each booking type its own duration and minimum notice. If you offer several services, customers choose one before selecting a date and time.",
  ],
  [
    "Can I collect details before the appointment?",
    "Yes. Link a custom booking form to ask the questions your team needs, and map relevant answers to contact fields. Existing contact profiles also bring together messages, notes, forms and bookings. You can adjust the booking page’s fonts and colours, share its link or embed it on your website.",
  ],
  [
    "Can customers book from another time zone?",
    "Yes. The booking page detects the visitor’s time zone and lets them change it, so they can choose a time in their own time zone.",
  ],
  [
    "Can I automate confirmations, reminders and missed-appointment follow-ups?",
    "Yes. Send confirmation and reminder messages using a configured booking automation. When your team marks an appointment as missed, a status-change automation can send a link to book again. Choose the calendar, booking statuses, messages and timing during setup. Message usage is charged separately.",
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
      <BusinessDay day={selectedDay} time={selectedTime} />
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
              We work through your services, team calendars, booking form and message automations,
              then test the customer journey, including changes and cancellations, before launch.
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
