import { useState, type ReactNode } from "react";
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
        <span>Try a date and time</span>
        <p>Booking demonstration. No appointment is created.</p>
      </div>
      <div className="cal-booking-sheet">
        <div className="cal-service">
          <div className="cal-host">
            <Avatar />
            <span>With Alex Chen</span>
          </div>
          <h2 id="cal-demo-title">
            Project
            <br className="cal-service-break" /> consultation
          </h2>
          <p>A first conversation about your project and what you need next.</p>
          <span className="cal-duration">
            <Clock3 size={16} aria-hidden="true" />
            30 minutes
          </span>
          <div className="cal-service-bottom">Your customer’s view</div>
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

const faqs = [
  [
    "How do customers book an appointment?",
    "Share your booking link. Customers choose an appointment type if you offer more than one, pick an available date and time, enter their details, then review and complete the booking. They see confirmation on screen once it is complete.",
  ],
  [
    "Can I control when appointments are offered?",
    "Yes. Set your available days, hours and time zone, including separate time ranges within a day. Booking calendars also have their own hours, appointment durations and a minimum notice setting. We help you check how those settings work together.",
  ],
  [
    "Can customers book from another time zone?",
    "Yes. The booking page detects the visitor’s time zone and lets them change it. The interactive example on this page uses fixed Sydney times so you can explore the selection without making a booking.",
  ],
  [
    "Which calendars can I connect?",
    "Google Calendar, Microsoft 365 and Apple iCloud are supported. You can connect calendar accounts and choose the destination for booking events. We review your calendars during setup, including how Zapla should fit alongside any specialist booking system.",
  ],
  [
    "Can it send appointment reminders?",
    "Yes. Appointment reminders can be sent by email or SMS. We agree the reminders you need during setup.",
  ],
  [
    "How do rescheduling and cancellations work?",
    "Customers contact your business when they need to change or cancel an appointment. Your team can edit the booking’s start and end time or update its status. Whether a status releases the time for another booking depends on how that status is configured.",
  ],
  [
    "Can more than one team member use it?",
    "Yes. You can assign people to a booking calendar and choose a calendar destination for each person’s bookings. Individual availability is managed separately. We work through the right arrangement for your team during setup.",
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
              A good time for them.
              <br />A day that works for you.
            </h1>
            <p>
              Give customers a link to choose a suitable appointment. Set your availability, keep
              the booking connected to the customer and manage what happens around it.
            </p>
            <div className="cal-hero-actions">
              <Cta />
              <a className="cal-text-link" href="#booking-example">
                Try the booking example
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <BookingDemo
            selectedDay={selectedDay}
            selectedTime={selectedTime}
            onDayChange={setSelectedDay}
            onTimeChange={setSelectedTime}
          />
        </div>
      </section>

      <section className="cal-section cal-availability" aria-labelledby="cal-availability-title">
        <div className="cal-wrap cal-availability-layout">
          <div className="cal-copy">
            <p className="cal-eyebrow">Before the customer chooses</p>
            <h2 id="cal-availability-title">
              You decide
              <br />
              what’s available.
            </h2>
            <p>
              Your working week sets the starting point. Choose the days and hours you offer, with
              separate time ranges when you need a break in the day.
            </p>
            <p>
              Set the appointment length and minimum notice on the booking calendar. Keep each
              person’s availability in view as you build the setup.
            </p>
          </div>
          <div
            className="cal-hours-example"
            aria-label="Illustrative Tuesday availability, 9 am to 12 pm and 1 pm to 5 pm"
          >
            <div className="cal-hours-heading">
              <h3>A day with room around it.</h3>
              <span>Example availability</span>
            </div>
            <div className="cal-hours-person">
              <Avatar />
              <div>
                <strong>Alex’s Tuesday</strong>
                <span>Sydney · AEDT</span>
              </div>
            </div>
            <div className="cal-hours-line">
              <span>9:00 am</span>
              <div className="cal-working">
                <strong>Available</strong>
                <span>Morning appointments</span>
              </div>
            </div>
            <div className="cal-hours-line cal-break-line">
              <span>12:00 pm</span>
              <div>
                <span>Not offered for booking</span>
              </div>
            </div>
            <div className="cal-hours-line">
              <span>1:00 pm</span>
              <div className="cal-working">
                <strong>Available</strong>
                <span>Afternoon appointments</span>
              </div>
            </div>
            <div className="cal-hours-end">
              <span>5:00 pm</span>
              <span>End of availability</span>
            </div>
            <p>Personal availability and booking calendar hours are set separately.</p>
          </div>
        </div>
      </section>

      <section className="cal-section cal-follow-through" aria-labelledby="cal-follow-title">
        <div className="cal-wrap">
          <div className="cal-follow-heading">
            <p className="cal-eyebrow">Around the appointment</p>
            <h2 id="cal-follow-title">
              From choosing a time
              <br />
              to remembering it.
            </h2>
            <p>
              {selectedTime
                ? "In the next part of this example, Priya Shah adds her details and completes the appointment you selected."
                : "Choose a time in the example above to follow Priya Shah’s appointment through the next part of the journey."}
            </p>
          </div>
          <div className="cal-follow-scenes">
            <article className="cal-confirmation-scene">
              <div className="cal-scene-copy">
                <h3>A clear confirmation.</h3>
                <p>
                  After the customer enters their details and completes the booking, they see
                  confirmation on screen.
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
                    The message and timing are agreed during setup.
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
                A booking belongs
                <br />
                to a customer.
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
              {selectedTime && <p>Customer and appointment details, together.</p>}
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

      <section className="cal-section cal-connections" aria-labelledby="cal-connections-title">
        <div className="cal-wrap cal-connections-layout">
          <div className="cal-copy">
            <p className="cal-eyebrow">Connected calendars</p>
            <h2 id="cal-connections-title">
              Give the booking
              <br />a place in your day.
            </h2>
            <p>
              Connect your calendar accounts and choose where booking events go. For a team
              calendar, assign the people involved and choose where each person’s bookings are
              added.
            </p>
          </div>
          <div className="cal-providers" aria-label="Supported calendar connections">
            <p>Works with</p>
            <ul>
              <li>Google Calendar</li>
              <li>Microsoft 365</li>
              <li>Apple iCloud</li>
            </ul>
            <p className="cal-provider-note">
              Already use a specialist booking system? We’ll review how it fits before recommending
              a connection.
            </p>
          </div>
        </div>
      </section>

      <section className="cal-section cal-launch" aria-labelledby="cal-launch-title">
        <div className="cal-wrap">
          <div className="cal-launch-intro">
            <p className="cal-eyebrow">Guided Launch</p>
            <h2 id="cal-launch-title">Set up around the way you make appointments.</h2>
            <p>
              We work through your services, people and existing calendars with you, then check the
              booking journey before launch.
            </p>
          </div>
          <div className="cal-launch-plan">
            <div>
              <h3>What customers can book</h3>
              <p>Appointment types, durations and the details you need from each customer.</p>
            </div>
            <div>
              <h3>When your team is available</h3>
              <p>
                Working hours, calendar destinations and the people involved in each booking
                calendar.
              </p>
            </div>
            <div>
              <h3>What happens around it</h3>
              <p>
                Reminders, handling changes and a walkthrough of the customer’s booking experience.
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
