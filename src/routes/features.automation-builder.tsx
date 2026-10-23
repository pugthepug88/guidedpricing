import { createFileRoute } from "@tanstack/react-router";
import { AutomationBuilderPage } from "@/components/features/AutomationBuilderPage";

export const Route = createFileRoute("/features/automation-builder")({
  head: () => ({
    meta: [
      { title: "Automation Builder | Build & Control Workflows | Zapla" },
      {
        name: "description",
        content:
          "Build workflows around your business. Choose triggers, timing and actions, keep people involved, and review what ran with Zapla’s Automation Builder.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Automation Builder | Zapla" },
    ],
  }),
  component: AutomationBuilderPage,
});
