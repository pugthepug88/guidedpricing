import { createFileRoute } from "@tanstack/react-router";
import { TradesPage } from "@/components/industry-v3/TradesPage";
import tradesCss from "@/styles/trades-v3.css?url";
const TITLE = "Customer Follow-Up for Trades & Home Services | Zapla";
const DESCRIPTION =
  "Reply to trade enquiries, follow up quotes, send service reminders and request Google reviews with Zapla while your team stays on the tools.";
export const Route = createFileRoute("/industries/trades-v3")({
  staticData: { sitemap: false },
  head: () => ({
    links: [
      { rel: "stylesheet", href: tradesCss },
      {
        rel: "preload",
        href: "/concept/industries/fonts/inter-tight-latin-500-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: TradesPage,
});
