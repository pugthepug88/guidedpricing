import { createFileRoute } from "@tanstack/react-router";
import { QuotesInvoicesSignaturesPage } from "@/components/features/QuotesInvoicesSignaturesPage";

export const Route = createFileRoute("/features/quotes-invoices-signatures")({
  head: () => ({
    meta: [
      { title: "Quotes, Invoices & E-Signatures | Zapla" },
      {
        name: "description",
        content:
          "Prepare clear quotes, send documents for e-signature and collect invoice payments online. Manage your customer paperwork in Zapla.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Quotes, Invoices & Signatures | Zapla" },
      {
        property: "og:description",
        content: "Quote the work. Get it signed. Get paid. See your customer paperwork in Zapla.",
      },
    ],
  }),
  component: QuotesInvoicesSignaturesPage,
});
