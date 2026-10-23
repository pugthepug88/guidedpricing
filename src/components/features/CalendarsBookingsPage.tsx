import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Check, ChevronDown, Clock3 } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/calendars-bookings.css";

// Fixed illustrative availability. This page has no booking API or submission.
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
// November 2026 starts on Sunday. Monday is the first column.
const calendarCells = Array.from({ length: 42 }, (_, index) => {
  const date = index - 5;
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
      style={{
        backgroundPosition: `${(cell % 6) * 20}% ${(Math.floor(cell / 6) / 3) * 100}%`,
      }}
    />
  );
}

function Cta({ children = "Book a Call" }: { children?: ReactNode }) {
  return (
    <a className="cal-cta" href="/booking">
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

function BookingDemo({
  selectedDay,
  selectedTime,
  onDayChange,
  onTimeChange,
}: {
  selectedDay: number;
  selectedTime: string | null;
  onDayChange: (day: number) => void;
  onTimeChange: (time: string | null) => void;
}) {
  const label = dateLabel(selectedDay);

  function chooseDay(day: number) {
    if (day === selectedDay) return;
    onDayChange(day);
    onTimeChange(null);
  }

  return (
    <div className="cal-demo" id="booking-example" aria-labelledby="cal-demo-title">
      <div className="cal-demo-caption">
        <span>Your customer’s view</span>
        <p>Demonstration. No appointment is created.</p>
      </div>
      <div className="cal-booking-sheet">
        <div className="cal-service">
          <div className="cal-host">
            <Avatar />
            <span>With Alex Chen</span>
          </div>
          <h2 id="cal-demo-title">Project consultation</h2>
          <span className="cal-duration">
            <Clock3 size={16} aria-hidden="true" />
            30 minutes
          </span>
          <div className="cal-service-bottom">1-on-1 appointment</div>
        </div>
        <div className="cal-month">
          <h3>Choose a date</h3>
          <p className="cal-month-label">November 2026</p>
          <table className="cal-date-grid">
            <caption className="cal-sr-only">
              Example availability in November 2026. Choose an available date.
            </caption>
            <thead>
              <tr>
                {weekdays.map((day) => (
                  <th key={day} scope="col">
                    <abbr title={day}>{day.slice(0, 3)}</abbr>
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
                          disabled={!exampleTimes[day]}
                          aria-label={`${dateLabel(day)} 2026${exampleTimes[day] ? "" : ", unavailable"}`}
                          aria-pressed={day === selectedDay}
                          aria-controls="cal-time-options cal-selection"
                          onClick={() => chooseDay(day)}
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
          <p className="cal-timezone">
            Example times in Sydney
            <br />
            <span>AEDT · UTC+11</span>
          </p>
        </div>
        <div className="cal-times" id="cal-time-options">
          <h3>Choose a time</h3>
          <p className="cal-selected-date">{label}</p>
          <div
            className="cal-time-options"
            role="group"
            aria-label={`Available times for ${label}`}
          >
            {exampleTimes[selectedDay].map((time) => (
              <button
                type="button"
                key={time}
                aria-pressed={time === selectedTime}
                aria-controls="cal-selection"
                onClick={() => onTimeChange(time)}
              >
                {time}
                <Check size={15} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div
            className="cal-selection"
            id="cal-selection"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span>
              {selectedTime ? "Your example selection" : "Select a time to continue the example"}
            </span>
            <strong>
              {label}
              {selectedTime ? ` at ${selectedTime}` : ""}
            </strong>
            <small>30 minutes · Sydney time</small>
          </div>
        </div>
      </div>
      <p className="cal-demo-next">
        Next, the customer adds their details and reviews the appointment. Confirmation appears
        after they complete the booking.
      </p>
    </div>
  );
}

type FormatId = "one" | "group" | "collective" | "round" | "event";
const bookingFormats: {
  id: FormatId;
  name: string;
  purpose: string;
  use: string;
  meeting: string;
  detail: string;
}[] = [
  {
    id: "one",
    name: "1-on-1",
    purpose: "One host meets one customer.",
    use: "Consultations, assessments and individual appointments.",
    meeting: "Project consultation",
    detail: "Alex meets Priya for an individual consultation.",
  },
  {
    id: "group",
    name: "Group booking",
    purpose: "One host welcomes several attendees.",
    use: "Workshops, classes and group sessions.",
    meeting: "Renovation workshop",
    detail: "One session with Alex, attended by Priya, Mia and Daniel.",
  },
  {
    id: "collective",
    name: "Collective",
    purpose: "Several hosts meet one customer.",
    use: "Joint consultations that need more than one person from your team.",
    meeting: "Joint project consultation",
    detail: "Alex and Ben both join Priya’s consultation.",
  },
  {
    id: "round",
    name: "Round robin",
    purpose: "A customer books with one host from a team.",
    use: "Enquiries or consultations that different team members can handle.",
    meeting: "Consultation with Alex",
    detail: "Alex is the host for this example. Ben and Sam are other members of the booking team.",
  },
  {
    id: "event",
    name: "Event",
    purpose: "A dated event with its own time slots.",
    use: "Open days, information sessions and other specific occasions.",
    meeting: "Project open day",
    detail: "Offer time slots for a particular event date.",
  },
];

function Person({
  name,
  cell,
  role,
  position,
  customer = false,
  selected = false,
}: {
  name: string;
  cell: number;
  role: string;
  position: number;
  customer?: boolean;
  selected?: boolean;
}) {
  return (
    <div
      className={`cal-format-person ${customer ? "cal-format-customer" : ""} ${selected ? "cal-person-selected" : ""}`}
      style={{ left: `${position}%` }}
    >
      <Avatar cell={cell} />
      <strong>{name}</strong>
      <span>{role}</span>
    </div>
  );
}

function BookingFormats() {
  const [selected, setSelected] = useState<FormatId>("one");
  const [eventTime, setEventTime] = useState("10:00 am");
  const [canPin, setCanPin] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const format = bookingFormats.find((item) => item.id === selected)!;
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1100px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)",
    );
    const check = () =>
      setCanPin(
        media.matches && (sceneRef.current?.offsetHeight ?? Infinity) < window.innerHeight - 130,
      );
    check();
    const observer = new ResizeObserver(check);
    if (sceneRef.current) observer.observe(sceneRef.current);
    window.addEventListener("resize", check);
    media.addEventListener("change", check);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", check);
      media.removeEventListener("change", check);
    };
  }, []);

  return (
    <section
      className="cal-section cal-formats"
      id="booking-formats"
      aria-labelledby="cal-formats-title"
    >
      <div className="cal-wrap">
        <div className="cal-section-heading">
          <div>
            <p className="cal-eyebrow">More ways to meet</p>
            <h2 id="cal-formats-title">
              Book the way
              <br />
              your business works.
            </h2>
          </div>
          <p>
            A private consultation and a group session need different setups. Choose a format to see
            who comes together.
          </p>
        </div>
        <div className="cal-formats-layout" data-pin={canPin}>
          <div
            className="cal-format-options"
            role="group"
            aria-label="Explore five booking formats"
          >
            {bookingFormats.map((item) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={item.id === selected}
                aria-controls="cal-format-illustration"
                onClick={() => setSelected(item.id)}
              >
                <span className="cal-format-option-title">
                  {item.name}
                  <ArrowRight size={19} aria-hidden="true" />
                </span>
                <span className="cal-format-purpose">{item.purpose}</span>
                <span className="cal-format-use">{item.use}</span>
              </button>
            ))}
          </div>
          <div className="cal-formats-scene" ref={sceneRef} id="cal-format-illustration">
            <div className="cal-format-scene-title">
              <span>Booking format</span>
              <h3>{format.name}</h3>
            </div>
            <div className="cal-mobile-format-copy">
              <p>{format.purpose}</p>
              <span>{format.use}</span>
            </div>
            {selected === "event" ? (
              <div className="cal-event-demo">
                <div className="cal-event-date">
                  <span>November</span>
                  <strong>18</strong>
                  <span>Wednesday · 2026</span>
                </div>
                <h4>Project open day</h4>
                <p>A specific date. A choice of times.</p>
                <div
                  className="cal-event-times"
                  role="group"
                  aria-label="Illustrative event time slots"
                >
                  {["10:00 am", "2:00 pm"].map((time) => (
                    <button
                      key={time}
                      type="button"
                      aria-pressed={eventTime === time}
                      onClick={() => setEventTime(time)}
                    >
                      {time}
                      <Check size={15} aria-hidden="true" />
                    </button>
                  ))}
                </div>
                <p role="status" className="cal-event-selection">
                  Example selection: 18 November at {eventTime}
                </p>
              </div>
            ) : (
              <div className={`cal-format-map cal-map-${selected}`} key={selected}>
                <svg viewBox="0 0 600 360" preserveAspectRatio="none" aria-hidden="true">
                  {selected === "collective" ? (
                    <>
                      <path pathLength="1" d="M195 112 V118 Q195 127 210 127 H300 V137" />
                      <path pathLength="1" d="M405 112 V118 Q405 127 390 127 H300 V137" />
                    </>
                  ) : (
                    <path
                      pathLength="1"
                      d={
                        selected === "round"
                          ? "M120 112 V118 Q120 127 140 127 H280 Q300 127 300 137"
                          : "M300 112 V137"
                      }
                    />
                  )}
                  {selected === "group" ? (
                    <>
                      <path
                        pathLength="1"
                        d="M300 227 V239 Q300 247 280 247 H140 Q120 247 120 264"
                      />
                      <path pathLength="1" d="M300 227 V264" />
                      <path
                        pathLength="1"
                        d="M300 227 V239 Q300 247 320 247 H460 Q480 247 480 264"
                      />
                    </>
                  ) : (
                    <path pathLength="1" d="M300 227 V264" />
                  )}
                </svg>
                {selected === "collective" ? (
                  <>
                    <Person name="Alex" cell={8} role="Host" position={32.5} />
                    <Person name="Ben" cell={13} role="Host" position={67.5} />
                  </>
                ) : selected === "round" ? (
                  <>
                    <Person name="Alex" cell={8} role="Booked host" position={20} selected />
                    <Person name="Ben" cell={13} role="Team member" position={50} />
                    <Person name="Sam" cell={15} role="Team member" position={80} />
                  </>
                ) : (
                  <Person name="Alex" cell={8} role="Host" position={50} />
                )}
                <div className="cal-format-meeting">
                  <h4>{format.meeting}</h4>
                  <p>One appointment</p>
                </div>
                {selected === "group" ? (
                  <>
                    <Person name="Priya" cell={4} role="Attendee" position={20} customer />
                    <Person name="Mia" cell={9} role="Attendee" position={50} customer />
                    <Person name="Daniel" cell={5} role="Attendee" position={80} customer />
                  </>
                ) : (
                  <Person name="Priya" cell={4} role="Customer" position={50} customer />
                )}
              </div>
            )}
            <p
              className="cal-format-description"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {format.detail}
            </p>
            <p className="cal-format-disclaimer">
              Illustrative people and sessions. No bookings are made.
            </p>
          </div>
        </div>
        <noscript>
          <dl className="cal-static-formats">
            {bookingFormats.map((item) => (
              <div key={item.id}>
                <dt>{item.name}</dt>
                <dd>
                  {item.purpose} {item.use}
                </dd>
              </div>
            ))}
          </dl>
        </noscript>
      </div>
    </section>
  );
}

function Availability() {
  const [split, setSplit] = useState(true);
  return (
    <section className="cal-section cal-availability" aria-labelledby="cal-availability-title">
      <div className="cal-wrap">
        <div className="cal-availability-layout">
          <div className="cal-copy">
            <p className="cal-eyebrow">Your time, on your terms</p>
            <h2 id="cal-availability-title">
              Offer the hours.
              <br />
              Keep room for the work.
            </h2>
            <p>
              Choose working days, time ranges and a time zone. Leave a break between sessions or
              offer different hours on different days.
            </p>
            <p>
              Set each appointment’s duration and minimum notice. Assign the people involved and
              choose where their booking events are added.
            </p>
            <p className="cal-availability-footnote">
              Personal availability and booking calendar hours are set separately.
            </p>
          </div>
          <div className="cal-hours-example">
            <div className="cal-hours-person">
              <Avatar />
              <div>
                <strong>Alex’s Tuesday</strong>
                <span>Sydney · AEDT</span>
              </div>
              <span className="cal-illustration-label">Availability example</span>
            </div>
            <div className="cal-hours-switch" role="group" aria-label="Illustrate working hours">
              <button type="button" aria-pressed={!split} onClick={() => setSplit(false)}>
                9 to 5
              </button>
              <button type="button" aria-pressed={split} onClick={() => setSplit(true)}>
                With a lunch break
              </button>
            </div>
            <div className="cal-hours-timeline" data-split={split}>
              <div className="cal-hours-line">
                <span>9:00 am</span>
                <div className="cal-working">
                  <strong>Available for appointments</strong>
                  <span>{split ? "Morning sessions" : "9:00 am to 5:00 pm"}</span>
                </div>
              </div>
              {split && (
                <>
                  <div className="cal-hours-line cal-break-line">
                    <span>12:00 pm</span>
                    <div>Not offered for booking</div>
                  </div>
                  <div className="cal-hours-line">
                    <span>1:00 pm</span>
                    <div className="cal-working">
                      <strong>Available for appointments</strong>
                      <span>Afternoon sessions</span>
                    </div>
                  </div>
                </>
              )}
              <div className="cal-hours-end">
                <span>5:00 pm</span>
                <span>End of availability</span>
              </div>
            </div>
            <p className="cal-hours-status" role="status">
              {split
                ? "Example hours: 9 am to noon, then 1 pm to 5 pm."
                : "Example hours: 9 am to 5 pm, with no break."}
            </p>
          </div>
        </div>
        <div className="cal-connected">
          <div>
            <h3>Keep your calendars connected.</h3>
            <p>
              Connect accounts, select your calendar and choose where each team member’s bookings
              go.
            </p>
          </div>
          <ul aria-label="Supported calendar connections">
            <li>Google Calendar</li>
            <li>Microsoft 365</li>
            <li>Apple iCloud</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  [
    "Which booking formats are available?",
    "Choose 1-on-1 for one host and one attendee, Group booking for one host and several attendees, Collective for several hosts and one attendee, or Round robin for an attendee booked with one host from a team. Event calendars offer a dated event with its own time slots.",
  ],
  [
    "Can I offer different services and appointment lengths?",
    "Yes. Add booking types with their own names and durations, plus a minimum notice setting. If a calendar offers several services, customers choose one before selecting a date and time.",
  ],
  [
    "Can I customise the booking page and the details it asks for?",
    "Yes. Adjust the booking page’s fonts, colours and date styling. You can also link a custom booking form so customers provide the details you need before completing their appointment.",
  ],
  [
    "Which calendars can I connect?",
    "Google Calendar, Microsoft 365 and Apple iCloud are supported. Connect your accounts, choose a calendar and select the destination for each assigned team member’s bookings. We review any specialist booking system separately during setup.",
  ],
  [
    "Can customers book from another time zone?",
    "Yes. The booking page detects the visitor’s time zone and lets them change it. This page’s demonstration uses fixed Sydney times and never creates an appointment.",
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
    "Do I need to replace the system I already use?",
    "We start with your current tools. If you use email and a diary, we can map a first booking flow. If you have a CRM or specialist booking system, we review where Zapla fits and what connections are supported before recommending a change.",
  ],
];

export function CalendarsBookingsPage() {
  const [selectedDay, setSelectedDay] = useState(10);
  const [selectedTime, setSelectedTime] = useState<string | null>("10:30 am");
  const selectedDate = dateLabel(selectedDay);

  return (
    <main className="zapla-feature zapla-calendars">
      <section className="cal-hero">
        <div className="cal-wrap">
          <div className="cal-hero-intro">
            <p className="cal-eyebrow">Calendars &amp; Bookings</p>
            <h1>
              <span>
                A good time <span className="cal-hero-phrase">for them.</span>
              </span>
              <span>
                A day that <span className="cal-hero-phrase">works for you.</span>
              </span>
            </h1>
            <p>
              Offer individual appointments, group sessions, team bookings and events. Share a
              booking link or add it to your website, with availability you control.
            </p>
            <div className="cal-hero-actions">
              <Cta />
              <a className="cal-text-link" href="#booking-example">
                Try a date and time
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <a className="cal-formats-link" href="#booking-formats">
              Explore all five booking formats <span aria-hidden="true">↓</span>
            </a>
          </div>
          <BookingDemo
            selectedDay={selectedDay}
            selectedTime={selectedTime}
            onDayChange={setSelectedDay}
            onTimeChange={setSelectedTime}
          />
        </div>
      </section>

      <BookingFormats />
      <Availability />

      <section className="cal-section cal-follow-through" aria-labelledby="cal-follow-title">
        <div className="cal-wrap">
          <div className="cal-follow-heading">
            <p className="cal-eyebrow">Around the appointment</p>
            <h2 id="cal-follow-title">
              A time chosen.
              <br />A customer expected.
            </h2>
            <p>
              {selectedTime
                ? "Next, Priya Shah adds her details and completes the appointment you selected."
                : "Choose a time in the example above to follow Priya Shah’s appointment through the next part of the journey."}
            </p>
          </div>
          <div className="cal-follow-scenes">
            <article className="cal-confirmation-scene">
              <div className="cal-scene-copy">
                <h3>A clear confirmation.</h3>
                <p>
                  Customers review their details and complete the booking, then see confirmation on
                  screen. Link a custom form to ask what you need before the appointment.
                </p>
              </div>
              {selectedTime ? (
                <div className="cal-confirmation-ticket">
                  <span className="cal-example-label">Completed booking example</span>
                  <div className="cal-confirmation-check">
                    <Check size={22} aria-hidden="true" />
                  </div>
                  <h4>Appointment booked</h4>
                  <p>Project consultation</p>
                  <dl>
                    <div>
                      <dt>Customer</dt>
                      <dd>Priya Shah</dd>
                    </div>
                    <div>
                      <dt>When</dt>
                      <dd>
                        {selectedDate} 2026
                        <br />
                        {selectedTime} · Sydney
                      </dd>
                    </div>
                    <div>
                      <dt>Duration</dt>
                      <dd>30 minutes</dd>
                    </div>
                  </dl>
                </div>
              ) : (
                <div className="cal-pending-example">
                  <p>A date is selected. Choose a time to see the completed-booking example.</p>
                  <a href="#booking-example">
                    Choose an example time
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </div>
              )}
            </article>
            <article className="cal-reminder-scene">
              <div className="cal-scene-copy">
                <h3>A useful reminder.</h3>
                <p>
                  Send appointment reminders by email or SMS, so the time stays in mind as the day
                  approaches.
                </p>
              </div>
              {selectedTime ? (
                <div className="cal-reminder-example">
                  <span className="cal-example-label">Illustrative SMS reminder</span>
                  <div className="cal-reminder-message">
                    <p>
                      Hi Priya, a reminder of your project consultation on {selectedDate}
                      {` at ${selectedTime}, Sydney time`}. We look forward to speaking with you.
                    </p>
                  </div>
                  <p className="cal-reminder-note">
                    Message content and timing are agreed during setup. Usage is charged separately.
                  </p>
                </div>
              ) : (
                <div className="cal-pending-example">
                  <p>The reminder example will use the same appointment once you choose a time.</p>
                </div>
              )}
            </article>
          </div>
        </div>
      </section>

      <section className="cal-section cal-team" aria-labelledby="cal-team-title">
        <div className="cal-wrap cal-team-layout">
          <div className="cal-team-photo">
            <img
              src="/concept/industries/mortgage-broker-consultation.webp"
              width="1122"
              height="1402"
              loading="lazy"
              alt="A business owner and customers discussing a project around a table"
            />
            <p>Arrive with the customer’s context.</p>
          </div>
          <div className="cal-team-content">
            <div className="cal-copy">
              <p className="cal-eyebrow">In your team’s hands</p>
              <h2 id="cal-team-title">
                Prepare for <span className="cal-keep">the person.</span>
                <br />
                Handle the changes.
              </h2>
              <p>
                Keep appointments connected to the customer record, alongside the conversations and
                details behind the visit.
              </p>
            </div>
            <div className="cal-customer-example">
              <div className="cal-customer-heading">
                <Avatar cell={4} />
                <div>
                  <strong>Priya Shah</strong>
                  <span>Project consultation</span>
                </div>
              </div>
              {selectedTime ? (
                <dl>
                  <div>
                    <dt>Appointment</dt>
                    <dd>
                      {selectedDay} November · {selectedTime}
                    </dd>
                  </div>
                  <div>
                    <dt>Team member</dt>
                    <dd>Alex Chen</dd>
                  </div>
                </dl>
              ) : (
                <p>Choose a time above to see the appointment alongside Priya’s details.</p>
              )}
            </div>
            <div className="cal-team-changes">
              <h3>When plans change, your team can update the booking.</h3>
              <p>
                Customers contact your business to change or cancel. Your team can update the
                booking time or status, keeping the next step clear.
              </p>
            </div>
            <a className="cal-text-link" href="/crm">
              Explore the connected CRM
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="cal-section cal-launch" aria-labelledby="cal-launch-title">
        <div className="cal-wrap">
          <div className="cal-launch-intro">
            <p className="cal-eyebrow">Guided Launch</p>
            <h2 id="cal-launch-title">
              Set up for the way <span className="cal-keep">you book.</span>
            </h2>
            <p>
              Guided Launch is the separately priced initial setup. We agree the scope, work through
              your services and calendars, then check the customer journey with you.
            </p>
          </div>
          <div className="cal-launch-plan">
            <div>
              <h3>What customers can book</h3>
              <p>The right calendar format, appointment lengths and customer booking form.</p>
            </div>
            <div>
              <h3>When your team is available</h3>
              <p>
                Working hours, calendar destinations and the people involved in each booking
                calendar.
              </p>
            </div>
            <div>
              <h3>The customer’s experience</h3>
              <p>
                Booking page styling, reminders, handling changes and a walkthrough before launch.
              </p>
            </div>
          </div>
          <p className="cal-launch-fit">
            Starting with email and a diary? We’ll map your first booking flow. Already using a CRM
            or specialist booking system? We’ll review where Zapla fits.
          </p>
          <Cta>Talk through your setup</Cta>
        </div>
      </section>

      <section className="cal-section cal-faq" aria-labelledby="cal-faq-title">
        <div className="cal-wrap cal-faq-layout">
          <div>
            <p className="cal-eyebrow">Before you get started</p>
            <h2 id="cal-faq-title">
              A few practical
              <br />
              questions.
            </h2>
          </div>
          <div className="cal-faq-list">
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
