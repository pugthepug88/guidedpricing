import { defineTool } from "@lovable.dev/mcp-js";

const PLANS = [
  {
    name: "Core",
    monthly_price_aud: 299,
    launch_fee_aud: 995,
    fit: "For solo operators and small teams that need the essential operating system launched.",
    includes: [
      "Unlimited users",
      "2,500 contacts",
      "CRM, inbox and bookings",
      "Reviews, payments and mobile POS where configured",
      "Missed-call textback",
      "250 SMS segments/month",
    ],
  },
  {
    name: "Growth",
    monthly_price_aud: 499,
    launch_fee_aud: 1995,
    recommended: true,
    fit: "For most businesses that want quote follow-up, reactivation and growth workflows.",
    includes: [
      "Everything in Core",
      "10,000 contacts",
      "Quote follow-up workflow",
      "Ghost-to-Gold standard workflow",
      "AI chat where relevant",
      "Funnels, pages and extra capture points",
      "500 SMS segments/month",
    ],
  },
  {
    name: "Scale",
    monthly_price_aud: 899,
    launch_fee_aud: 3500,
    fit: "For larger teams, higher volume or multi-location businesses that need routing and reporting.",
    includes: [
      "Everything in Growth",
      "25,000 contacts",
      "2 locations included",
      "Team routing and staff access controls",
      "Advanced reporting dashboard",
      "Scheduled rollout check-ins",
      "1,000 SMS segments/month",
    ],
  },
  {
    name: "Scale+",
    monthly_price_aud: "Custom",
    launch_fee_aud: "Custom",
    fit: "For businesses beyond standard Scale: 3+ locations, franchises, multi-brand groups or complex integrations.",
    includes: [
      "Franchise or multi-brand setup",
      "Complex integrations",
      "High-volume contacts, SMS, email or AI",
      "Custom migration and reporting",
      "Rollout model agreed before build",
    ],
  },
];

export default defineTool({
  name: "get_pricing_plans",
  title: "Get Zapla pricing plans",
  description:
    "Return Zapla's Guided Launch pricing plans (Core, Growth, Scale, Scale+) with monthly price, launch fee, and what each plan includes. Prices in AUD, exclude GST.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(PLANS, null, 2) }],
    structuredContent: { plans: PLANS, currency: "AUD", notes: "Prices exclude GST." },
  }),
});
