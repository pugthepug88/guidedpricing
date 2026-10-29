import { createFileRoute } from "@tanstack/react-router";
import { FollowThroughPage } from "@/components/solutions/FollowThroughPage";

export const Route = createFileRoute("/follow-up-v2")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Follow-Up Automation — V2 Preview | Zapla" },
      {
        name: "description",
        content:
          "Explore connected follow-up for enquiries, quotes, bookings and repeat business, with your messages, timing and team in control.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: FollowThroughPage,
});
