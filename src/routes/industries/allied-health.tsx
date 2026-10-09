import { createFileRoute } from "@tanstack/react-router";
import { AlliedHealthPage } from "@/components/industries/AlliedHealthPage";
import pageCss from "@/styles/allied-health.css?url";
const title = "Enquiry Follow Through for Allied Health Practices | Zapla";
const description =
  "Keep patient enquiries moving with configured replies, booking links and reception handoffs, around your existing practice software.";
export const Route = createFileRoute("/industries/allied-health")({
  staticData: { sitemap: false },
  head: () => ({
    links: [{ rel: "stylesheet", href: pageCss }],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AlliedHealthPage,
});
