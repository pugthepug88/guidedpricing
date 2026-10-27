import { createFileRoute } from "@tanstack/react-router";
import { BusinessPhonePage } from "@/components/features/BusinessPhonePage";

export const Route = createFileRoute("/features/business-phone")({
  head: () => ({
    meta: [
      { title: "Business Phone & Power Dialler | Zapla" },
      {
        name: "description",
        content:
          "Make and receive customer calls in Zapla. Work through selected contacts with Power Dialler, review contact notes and record what was agreed.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Business Phone & Power Dialler | Zapla" },
      {
        property: "og:description",
        content:
          "Customer calls, contact notes and a focused list to work through. Explore Business Phone in Zapla.",
      },
    ],
  }),
  component: BusinessPhonePage,
});
