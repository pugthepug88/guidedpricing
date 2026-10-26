import { createFileRoute } from "@tanstack/react-router";
import { AutomationBuilderPage } from "@/components/features/AutomationBuilderPage";

export const Route = createFileRoute("/features/automation-builder")({
  head: () => ({
    meta: [
      { title: "Automation Builder | Build & Control Workflows | Zapla" },
      {
        name: "description",
        content:
          "Describe your process and let AI build a workflow draft. Review triggers, timing, messages and conditions with Zapla’s Automation Builder.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Automation Builder | Zapla" },
    ],
  }),
  component: AutomationBuilderPage,
});
