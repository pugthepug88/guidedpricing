import { createFileRoute } from "@tanstack/react-router";
import { CalendarsBookingsPage } from "@/components/features/CalendarsBookingsPage";

export const Route = createFileRoute("/features/calendars-bookings")({
  head: () => ({
    meta: [
      { title: "Calendars & Bookings | Appointments, Teams & Events | Zapla" },
      {
        name: "description",
        content:
          "Offer 1-on-1, group, collective, round robin and event bookings, set availability, and host native video meetings with Zapla’s Meeting Rooms.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Calendars & Bookings | Zapla" },
    ],
  }),
  component: CalendarsBookingsPage,
});
