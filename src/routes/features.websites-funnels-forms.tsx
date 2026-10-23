import { createFileRoute } from "@tanstack/react-router";
import { WebsitesFunnelsFormsPage } from "@/components/features/WebsitesFunnelsFormsPage";

export const Route = createFileRoute("/features/websites-funnels-forms")({
  head: () => ({
    meta: [
      { title: "Websites, Funnels & Forms | Connected Enquiries | Zapla" },
      {
        name: "description",
        content:
          "Create websites, landing pages and forms that connect enquiries to your Zapla CRM. Map customer details and configure the next step. Explore self-service tools and separately scoped website design.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Websites, Funnels & Forms | Zapla" },
    ],
  }),
  component: WebsitesFunnelsFormsPage,
});
