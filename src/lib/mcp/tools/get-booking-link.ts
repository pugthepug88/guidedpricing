import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_booking_link",
  title: "Get Zapla booking link",
  description:
    "Return the URL where a prospect can book a call with the Zapla team to discuss Guided Launch pricing and onboarding.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: "https://zapla.io/booking" }],
    structuredContent: { url: "https://zapla.io/booking", label: "Book a Call" },
  }),
});
