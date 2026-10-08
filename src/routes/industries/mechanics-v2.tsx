import { createFileRoute, redirect } from "@tanstack/react-router";

// Keep existing preview links working after promoting the revised mechanics page.
export const Route = createFileRoute("/industries/mechanics-v2")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/industries/mechanics", replace: true, statusCode: 301 });
  },
});
