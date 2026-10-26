import { createFileRoute } from "@tanstack/react-router";
import { PipelineManagementPage } from "@/components/features/PipelineManagementPage";

export const Route = createFileRoute("/features/pipeline-management")({
  head: () => ({
    meta: [
      { title: "Pipeline Management & Route Planning | Zapla" },
      {
        name: "description",
        content:
          "Track opportunities through clear stages, keep the next action visible and plan visit routes from pipeline jobs. Explore Zapla Pipeline Management.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Pipeline Management | Zapla" },
      {
        property: "og:description",
        content:
          "Clear stages, shared customer context and route planning from the jobs already in your pipeline.",
      },
    ],
  }),
  component: PipelineManagementPage,
});
