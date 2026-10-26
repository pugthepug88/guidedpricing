import { createFileRoute } from "@tanstack/react-router";
import { AIChatbotPage } from "@/components/features/AIChatbotPage";
export const Route = createFileRoute("/features/ai-chatbot")({
  head: () => ({
    meta: [
      { title: "AI Chatbot | Answer Questions & Capture Enquiries | Zapla" },
      {
        name: "description",
        content:
          "Answer website questions around the clock, collect contact details in conversation and connect enquiries to your CRM. Book agreed appointments and involve your team when needed.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "AI Chatbot | Zapla" },
    ],
  }),
  component: AIChatbotPage,
});
