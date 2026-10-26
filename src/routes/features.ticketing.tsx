import { createFileRoute } from "@tanstack/react-router";
import { TicketingPage } from "@/components/features/TicketingPage";

export const Route = createFileRoute("/features/ticketing")({
  head: () => ({
    meta: [
      { title: "Ticketing | Track Customer Issues to Resolution | Zapla" },
      {
        name: "description",
        content:
          "Give customer issues a priority, responsible people and a clear place in your process. Keep tickets connected to customers and related work in Zapla.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Customer Support Ticketing | Zapla" },
    ],
  }),
  component: TicketingPage,
});
