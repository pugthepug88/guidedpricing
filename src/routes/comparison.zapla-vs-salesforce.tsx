import { SalesforcePricing } from '@/components/compare/simple/SalesforcePricing';
import salesforceCss from '@/components/compare/simple/salesforce.css?url';
import { createFileRoute } from '@tanstack/react-router';
import { ComparisonPage } from '@/components/compare/simple/ComparisonPage';
import { salesforceComparison } from '@/components/compare/simple/salesforce';
import simpleCss from '@/components/compare/simple/simple.css?url';

const title = 'Zapla vs Salesforce: Pricing, Features and Unlimited Users | Zapla';
const description = 'Compare Zapla and Salesforce for team access, customer tools, Guided Launch and annual subscriptions in AUD. See plan inclusions and source-linked pricing.';
export const Route = createFileRoute("/comparison/zapla-vs-salesforce")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "stylesheet", href: simpleCss },
      { rel: "stylesheet", href: salesforceCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&family=Outfit:wght@500;600&display=swap",
      },
    ],
  }),
  component: SalesforceComparisonPage,
});
function SalesforceComparisonPage() { return <ComparisonPage data={salesforceComparison} pricingContent={<SalesforcePricing data={salesforceComparison} />}/>; }