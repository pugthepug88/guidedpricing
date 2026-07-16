import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_company_info",
  title: "Get Zapla company info",
  description:
    "Return a short overview of Zapla: what it is, who it's for, and key links (home, pricing, blog, login).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: "Zapla is the AI operating system for growing businesses. One flat platform price, unlimited users, launched with you.",
      },
    ],
    structuredContent: {
      name: "Zapla",
      tagline: "The AI operating system for growing businesses.",
      value_prop: "One flat platform price, unlimited users, launched with you.",
      links: {
        home: "https://zapla.io/",
        pricing: "https://zapla.io/pricing",
        crm: "https://zapla.io/crm",
        vibe_studio: "https://zapla.io/vibe-studio",
        blog: "https://zapla.io/blog",
        booking: "https://zapla.io/booking",
        login: "https://my.zapla.io/",
      },
    },
  }),
});
