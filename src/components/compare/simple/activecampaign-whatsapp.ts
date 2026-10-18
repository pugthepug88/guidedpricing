// Observed in AC's AUD Plus purchase configurator, 18 October 2026.
// Separate WhatsApp subscription component: five included numbers, zero message credits.
// Annual = upfront annual charge, not monthly equivalent. No SMS charges.
export const activecampaignWhatsAppFees = [
  { contacts: 5000, monthly: 172, annual: 1135 },
  { contacts: 10000, monthly: 664, annual: 3623 },
  { contacts: 25000, monthly: 1186, annual: 7627 },
  { contacts: 50000, monthly: 2750, annual: 13884 },
] as const;
