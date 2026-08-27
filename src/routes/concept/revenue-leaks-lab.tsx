import { createFileRoute } from "@tanstack/react-router";
import { RevenueLeaksLab } from "@/components/concept/RevenueLeaksLab";

const TITLE = "Revenue Leaks Motion Lab — Zapla concept";
const DESC =
  "Ten premium motion treatments of the same beat: one enquiry, one working day, one lost customer. Concept comparison page.";

function RevenueLeaksLabRoute() {
  return (
    <main>
      <RevenueLeaksLab />
    </main>
  );
}

export const Route = createFileRoute("/concept/revenue-leaks-lab")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RevenueLeaksLabRoute,
});
