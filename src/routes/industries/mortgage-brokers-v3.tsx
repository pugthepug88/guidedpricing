import { createFileRoute } from "@tanstack/react-router";
import { MortgageBrokersPage } from "@/components/industry-v3/MortgageBrokersPage";
import pageCss from "@/styles/mortgage-brokers-v3.css?url";

export const Route = createFileRoute("/industries/mortgage-brokers-v3")({
  staticData: { sitemap: false },
  head: () => ({
    links: [{ rel: "stylesheet", href: pageCss }],
    meta: [
      { title: "Client Relationships & Follow Through for Mortgage Brokers | Zapla" },
      {
        name: "description",
        content:
          "Keep client relationships, repeat business and referral conversations moving with Zapla, alongside your specialist mortgage software.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MortgageBrokersPage,
});
