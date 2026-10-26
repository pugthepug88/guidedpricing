import { createFileRoute } from "@tanstack/react-router";
import { CalendarsBookingsPage } from "@/components/features/CalendarsBookingsPage";

export const Route = createFileRoute("/features/calendars-bookings")({
  head: () => ({
    meta: [
      { title: "Calendars & Bookings | Appointments, Teams & Events | Zapla" },
      {
        name: "description",
        content:
          "Offer five booking formats and host native video meetings in Zapla, with saved recordings and transcripts connected to attendees in your CRM.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Calendars & Bookings | Zapla" },
    ],
  }),
  component: CalendarsBookingsPage,
});
