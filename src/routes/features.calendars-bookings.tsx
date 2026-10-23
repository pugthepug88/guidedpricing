import { createFileRoute } from "@tanstack/react-router";
import { CalendarsBookingsPage } from "@/components/features/CalendarsBookingsPage";

export const Route = createFileRoute("/features/calendars-bookings")({
  head: () => ({
    meta: [
      { title: "Calendars & Bookings | Customer Appointments | Zapla" },
      {
        name: "description",
        content:
          "Let customers choose a suitable appointment. Set availability, connect calendars and manage bookings and reminders with Zapla.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Calendars & Bookings | Zapla" },
    ],
  }),
  component: CalendarsBookingsPage,
});
