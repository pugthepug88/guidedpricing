import { createFileRoute } from "@tanstack/react-router";
import { TapLab } from "@/components/concept/TapLab";
import { TapShapes } from "@/components/concept/TapShapes";
import { TapRenderStyles } from "@/components/concept/TapRenderStyles";

function TapLabRoute() {
  return (
    <>
      <TapRenderStyles />
      <TapLab />
      <TapShapes />
    </>
  );
}

const TITLE = "Tap lab — 20 leak illustrations | Zapla concept";
const DESC =
  "Twenty tap and leak illustration treatments for the Zapla follow-through section, each tying the visual metaphor closer to the message.";

export const Route = createFileRoute("/concept/tap-lab")({
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
  component: TapLabRoute,
});
