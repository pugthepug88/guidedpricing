import { createFileRoute } from "@tanstack/react-router";
import { QuoteFollowUpPage } from "@/components/solutions/QuoteFollowUpPage";

const TITLE = "Quote Follow-Up | Keep Quoted Work Moving | Zapla";
const DESCRIPTION =
  "Follow up on quotes by SMS or email, keep customer replies in view and give your team a clear next step. Set up around your quoting process with Zapla.";

export const Route = createFileRoute("/quote-follow-up")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: QuoteFollowUpPage,
});
