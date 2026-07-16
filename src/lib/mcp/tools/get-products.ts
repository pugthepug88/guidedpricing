import { defineTool } from "@lovable.dev/mcp-js";

const PRODUCTS = [
  {
    name: "Zapla CRM",
    url: "https://zapla.io/crm",
    description:
      "The AI operating system for growing businesses. CRM, inbox, bookings, reviews, payments and workflows in one platform.",
  },
  {
    name: "Zapla Vibe Studio",
    url: "https://zapla.io/vibe-studio",
    description: "Zapla's build and launch studio for websites, funnels and landing pages.",
  },
];

export default defineTool({
  name: "get_products",
  title: "List Zapla products",
  description: "List Zapla's products with a short description and URL for each.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(PRODUCTS, null, 2) }],
    structuredContent: { products: PRODUCTS },
  }),
});
