import { createFileRoute } from "@tanstack/react-router";
import { PipelineManagementPage } from "@/components/features/PipelineManagementPage";

export const Route = createFileRoute("/features/pipeline-management")({
  head: () => ({
    meta: [
      { title: "Pipeline Management | Every Opportunity in View | Zapla" },
      {
        name: "description",
        content:
          "See where every opportunity stands, who owns it and what happens next. Explore pipeline management connected to Zapla CRM.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Pipeline Management | Zapla" },
      {
        property: "og:description",
        content: "Keep opportunities, customer context and follow up connected in Zapla.",
      },
    ],
  }),
  component: PipelineManagementPage,
});
