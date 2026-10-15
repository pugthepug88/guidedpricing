import { createFileRoute } from "@tanstack/react-router";
import { getRobotsTxt } from "@/lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(getRobotsTxt(new URL(request.url).origin), {
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
        }),
    },
  },
});
