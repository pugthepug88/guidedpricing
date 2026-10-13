import { createFileRoute, redirect } from "@tanstack/react-router";

// Keep existing comparison links working after promoting the approved page.
export const Route = createFileRoute("/industries/mortgage-brokers-v2")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/industries/mortgage-brokers", replace: true, statusCode: 301 });
  },
});
