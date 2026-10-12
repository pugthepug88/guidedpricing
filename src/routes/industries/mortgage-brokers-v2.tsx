import { createFileRoute } from "@tanstack/react-router";
import { MortgageBrokersV2Page } from "@/components/industries/comparison/MortgageBrokersV2Page";
import pageCss from "@/styles/mortgage-brokers-v2.css?url";

export const Route = createFileRoute("/industries/mortgage-brokers-v2")({
  staticData: { sitemap: false },
  head: () => ({
    links: [{ rel: "stylesheet", href: pageCss }],
    meta: [
      { title: "Mortgage Brokers V2: Client Relationships & Follow Through | Zapla" },
      {
        name: "description",
        content:
          "Keep client relationships, repeat business and referral conversations moving with Zapla. A separate mortgage brokers comparison page.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MortgageBrokersV2Page,
});
