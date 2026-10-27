// Keep completed feature names and destinations aligned across site navigation.
export const FEATURE_LINKS = [
  { name: "Unified Inbox", href: "/features/unified-inbox", section: "Leads & conversations" },
  { name: "Business Phone", href: "/features/business-phone" },
  { name: "AI Chatbot", href: "/features/ai-chatbot" },
  {
    name: "Pipeline Management",
    href: "/features/pipeline-management",
    section: "Sales & automation",
  },
  { name: "Automation Builder", href: "/features/automation-builder" },
  { name: "Calendars & Bookings", href: "/features/calendars-bookings" },
  { name: "Quotes, Invoices & Signatures", href: "/features/quotes-invoices-signatures" },
  {
    name: "Websites, Funnels & Forms",
    href: "/features/websites-funnels-forms",
    section: "Marketing & operations",
  },
] as const;
