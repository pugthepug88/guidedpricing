import { defineMcp } from "@lovable.dev/mcp-js";
import getPricingPlans from "./tools/get-pricing";
import getProducts from "./tools/get-products";
import getBookingLink from "./tools/get-booking-link";
import getCompanyInfo from "./tools/get-company-info";

export default defineMcp({
  name: "zapla-mcp",
  title: "Zapla",
  version: "0.1.0",
  instructions:
    "Public tools for Zapla, the AI operating system for growing businesses. Use these to answer questions about Zapla's products, Guided Launch pricing, and how to book a call.",
  tools: [getCompanyInfo, getProducts, getPricingPlans, getBookingLink],
});
