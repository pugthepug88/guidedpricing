import { createFileRoute } from "@tanstack/react-router";
import { getSitemapXml } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(getSitemapXml(new URL(request.url).origin), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "no-store",
          },
        }),
    },
  },
});
