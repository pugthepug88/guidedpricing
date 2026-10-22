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
          "Connect your channels, use saved responses and schedule messages. Customer conversations and context together in Zapla.",
      },
    ],
  }),
  component: UnifiedInboxPage,
});
