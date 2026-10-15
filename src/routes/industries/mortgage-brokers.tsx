import { createFileRoute } from "@tanstack/react-router";
import { MortgageBrokersPage } from "@/components/industries/MortgageBrokersPage";
import pageCss from "@/styles/mortgage-brokers.css?url";

export const Route = createFileRoute("/industries/mortgage-brokers")({
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
      {
        property: "og:title",
        content: "Client Relationships & Follow Through for Mortgage Brokers | Zapla",
      },
      {
        property: "og:description",
        content:
          "Keep client relationships, repeat business and referral conversations moving with Zapla, alongside your specialist mortgage software.",
      },
      {
        name: "twitter:title",
        content: "Client Relationships & Follow Through for Mortgage Brokers | Zapla",
      },
      {
        name: "twitter:description",
        content:
          "Keep client relationships, repeat business and referral conversations moving with Zapla, alongside your specialist mortgage software.",
      },
    ],
  }),
  component: MortgageBrokersPage,
});
