import { createFileRoute } from "@tanstack/react-router";
import { UnifiedInboxPage } from "@/components/features/UnifiedInboxPage";

export const Route = createFileRoute("/features/unified-inbox")({
  head: () => ({
    meta: [
      { title: "Unified Inbox | Customer Conversations Together | Zapla" },
      {
        name: "description",
        content:
          "Keep customer messages, history and next steps together. Explore Zapla’s unified inbox for your team.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Unified Inbox | Zapla" },
      {
        property: "og:description",
        content:
          "Every message. The whole conversation. SMS, email and customer history together for your team.",
      },
    ],
  }),
  component: UnifiedInboxPage,
});
