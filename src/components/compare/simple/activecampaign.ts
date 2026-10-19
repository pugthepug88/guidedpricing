import type { ComparisonDefinition, ComparisonRow } from './types';
import { pipedriveSimple } from './pipedrive';
import { activecampaignQuotes } from './activecampaign-quotes';
import { activecampaignWhatsAppFees } from './activecampaign-whatsapp';

// Compose separately checked components; do not claim every combined total was observed.
const configurations = activecampaignQuotes.map(base => {
  const whatsapp = activecampaignWhatsAppFees.find(item => item.contacts === Math.max(5000, base.contacts))!;
  return { ...base, monthly: base.monthly + whatsapp.monthly, annual: base.annual + whatsapp.annual };
});
const costConfigurations = configurations.filter(item => item.contacts <= 10000 && (item.users === 1 || item.users === 5));
const zapla = (detail: string, text = '', sources = ['offer']) => ({ text, detail, mark: 'tick' as const, status: 'included' as const, sources });
const integration = (detail: string, source: string) => ({ text: 'Separate app', detail, mark: 'cross' as const, status: 'separate' as const, sources: [source] });
const rows: ComparisonRow[] = [
  { id: 'team', label: 'Unlimited users', zapla: zapla('Add users without increasing your software subscription.'), competitor: {"text":"Paid users","mark":"cross","status":"plan-dependent","sources":["pricing","plans"],"detail":"Plus includes one user. Additional users are paid and priced according to the overall package. The calculator adds checked WhatsApp subscription fees to the observed Plus + Pipelines package totals; no per-user price is extrapolated."} },
  { id: 'contacts', label: 'Unlimited contacts', zapla: zapla('Unlimited stored contacts, subject to fair use. Sending usage is separate.'), competitor: { text: 'Contact bands', mark: 'cross', status: 'plan-dependent', sources: ['pricing', 'contact-counting'], detail: 'Select a contact allowance. For accounts created on or after 3 November 2025, contacts count regardless of list status, including unsubscribed and bounced. Older accounts follow different counting rules; archived contacts have separate rules. This is not unlimited contact storage.' } },
  { id: 'whatsapp-contacts', label: 'Unlimited WhatsApp contacts', zapla: zapla('No separate WhatsApp contact-band fee. Messaging usage is extra.'), competitor: { text: 'Contact bands', mark: 'cross', status: 'plan-dependent', sources: ['whatsapp-terms', 'configurator'], detail: 'WhatsApp has its own purchased contact allowance, separate from the email contact allowance. The calculator includes WhatsApp for the selected contact count, with a minimum 5,000-contact WhatsApp band. Audiences may overlap; these are not necessarily different people.' } },
  { id: 'whatsapp-numbers', label: 'Connected WhatsApp numbers', zapla: zapla('Connect up to eight WhatsApp business numbers. Messaging usage is extra; initial configuration is scoped separately.', '8'), competitor: { text: '5', mark: 'tick', status: 'included', sources: ['configurator', 'whatsapp'], detail: 'The Plus WhatsApp add-on shown includes five connected business numbers. A line means a connected WhatsApp business number, not a staff seat. Additional lines are available separately and are not added to this price.' } },
  { id: 'workflows', label: 'Automation workflows', zapla: zapla('Unlimited workflow count. Executions, message usage and done-for-you configuration are separate.', 'Unlimited', ['offer', 'platform-pricing']), competitor: { text: 'Unlimited', mark: 'tick', status: 'included', sources: ['crm', 'pricing', 'plans'], detail: 'Unlimited workflow count. Plus includes multi-step marketing automation with unlimited automation actions; available triggers and actions vary by tier and add-on. Pipelines supplies deal triggers and actions. Automated individual 1:1 sales email requires Sales Engagement instead. Sending limits are separate.' } },
  { id: 'pipelines', label: 'Unlimited pipelines', zapla: zapla('Unlimited pipelines on both plans; this does not promise unlimited deal records or processing.', '', ['offer', 'platform-pricing']), competitor: { text: '', mark: 'tick', status: 'included', sources: ['crm', 'plans'], detail: 'ActiveCampaign documents unlimited pipelines in its CRM. Pipelines is the paid CRM add-on already included in the configuration compared here. It is not charged again.' } },
  { id: 'inbox', label: 'Shared email inbox', zapla: zapla('Shared inbox included. Channels are connected during the agreed setup.'), competitor: {"text":"Via integration","detail":"A connected service such as Helpwise provides a shared email inbox with ActiveCampaign contact and deal context. Personal email sync, the SMS inbox and the included WhatsApp inbox are different capabilities. Provider terms and fees vary.","mark":"cross","status":"separate","sources":["shared-inbox"]} },
  { id: 'sms', label: 'Two-way SMS', zapla: zapla('Two-way SMS included. Numbers and message usage are separate. Bulk campaigns require Growth.', 'Included¹'), competitor: {"text":"Paid add-on","status":"separate","sources":["pricing","plans"],"detail":"The native paid SMS add-on supports an inbox, two-way messages, automated sending and reply triggers, including Australian SMS. Alternatively, connected providers such as JustCall can supply SMS. No add-on price or duplicate provider subscription is assumed in the calculator.","mark":"cross"} },
  { id: 'missed-call', label: 'Missed-call text-back', zapla: zapla('Automatically send a text when your business misses a call.', 'Included¹'), competitor: {"text":"Via integration","detail":"JustCall documents automatic SMS triggered by a missed call through its ActiveCampaign integration. Requires a suitable connected provider, configuration and usage. It is not an included Plus + Pipelines phone service.","mark":"cross","status":"separate","sources":["calling"]} },
  { id: 'reviews', label: 'Review management', zapla: zapla('Review management tools are included in Follow-Through.'), competitor: {"text":"Via integration","detail":"Review services such as NiceJob connect through Zapier. ActiveCampaign campaigns can also request a review; a review-request email alone is not a full review-management service. Provider scope and charges vary.","mark":"cross","status":"separate","sources":["reviews"]} },
  { id: 'forms', label: 'Forms', zapla: zapla('Forms and surveys included on both plans.'), competitor: { text: '', mark: 'tick', status: 'included', sources: ['pricing', 'plans'], detail: 'Plus includes form tools. This does not assume every survey or feedback product is included.' } },
  { id: 'booking', label: 'Online booking', zapla: zapla('Calendar and online booking tools included. Calendars are connected during launch.'), competitor: {"text":"Via integration","detail":"ActiveCampaign documents connecting Calendly and using booking events in automations. A separate scheduling account is required; existing tools may avoid another subscription.","mark":"cross","status":"separate","sources":["booking"]} },
  { id: 'quotes', label: 'Quotes & proposals', zapla: zapla('Quote and proposal tools included; payment-provider charges are separate.'), competitor: {"text":"Via integration","detail":"ActiveCampaign lists Qwilr for connected proposals and sales documents. Provider plans, integration requirements and charges must be checked; the calculator does not add a hypothetical subscription.","mark":"cross","status":"separate","sources":["documents"]} },
  { id: 'website', label: 'Websites & funnels', zapla: zapla('Self-service website and funnel builders included. Done-for-you builds are separately scoped and priced.'), competitor: {"text":"Landing pages only","status":"included","sources":["pricing","landing-pages"],"detail":"Plus includes a native landing-page builder with no page-count limit. External website tools such as WordPress, Squarespace, Wix and Webflow can connect. This credits landing pages without claiming an identical full website or funnel builder."} },
  { id: 'phone', label: 'Built-in business phone', zapla: zapla('Phone access included; phone numbers and voice usage are separate.', 'Included¹'), competitor: {"text":"Via integration","detail":"JustCall provides connected calling, recordings, voicemail and SMS with contact logging. The provider service and usage are separate from Plus + Pipelines.","mark":"cross","status":"separate","sources":["calling"]} },
  { id: 'invoices', label: 'Invoicing', zapla: zapla('Create and send invoices from your CRM.'), competitor: {"text":"Via integration","detail":"ActiveCampaign lists Qwilr for connected proposal and invoice workflows. This is a connected service, not a native Plus + Pipelines invoicing subscription. No duplicate document-provider fee is added.","mark":"cross","status":"separate","sources":["documents"]} },
];

export const activecampaignSimple = {
  ...pipedriveSimple,
  calculator: undefined,
  competitor: 'ActiveCampaign',
  headline: 'Your whole team.',
  headlineAccent: 'One CRM subscription.',
  introduction: 'Manage enquiries, conversations, quotes, bookings and invoices in one place. Zapla Follow-Through is A$399/month + GST, with unlimited users and unlimited stored contacts, subject to fair use.',
  highlights: [
    { title: 'Unlimited users. Unlimited stored contacts.', description: 'Add reception, sales and the owner, and keep your customer history without moving to a higher contact band. Sending usage is separate.' },
    { title: 'More everyday customer tools included.', description: 'Booking, quotes, invoicing, review management and business phone access sit alongside your CRM. Phone numbers, communications usage and payment-provider fees are extra.' },
    { title: 'Your first setup, configured with you.', description: 'We import your agreed customer data, connect your tools, configure your first workflows, and test them with your team.' },
  ],
  vendorPlan: 'Email Plus + Pipelines + WhatsApp',
  vendorPricingUrl: 'https://www.activecampaign.com/pricing',
  vendorEntryPlan: 'Plus', vendorEntryPrice: 74,
  vendorPrice: 335, vendorAnnualPrice: 2731 / 12, vendorPriceUnit: 'per month, 1,000 email contacts, 5,000 WhatsApp contacts and one user',
  vendorBilling: 'Or A$2,731 paid annually for 1,000 email contacts, 5,000 WhatsApp contacts and one user, including Pipelines. Messaging usage extra.',
  verifiedConfigurations: configurations,
  usageNote: 'Zapla communications usage, phone numbers and payment-provider fees are extra. ActiveCampaign includes the stated email allowance; optional channels, additional usage and connected services have separate charges.',
  showMarketingNote: true,
  tableIntroduction: 'Zapla Follow-Through vs ActiveCampaign Email Plus + Pipelines + WhatsApp. Compare the tools included in each package and where another add-on or app is needed.',
  tableCaption: 'The named configurations have different feature bundles; optional services and usage are separate.',
  workflowNote: 'Both include unlimited automation workflows. Available actions, sending allowances and usage differ. Zapla’s Guided Launch covers a finite initial setup.',
  tableNotes: ['Pipelines and the WhatsApp subscription are included in the ActiveCampaign prices shown. Messaging usage is extra. SMS is a separate add-on.'],
  pricingHeading: 'Grow your team and customer list. Keep the same Zapla subscription.',
  pricingIntroduction: 'ActiveCampaign prices below include Email Plus, Pipelines and WhatsApp. The total changes with contacts, users and billing choice. Zapla Follow-Through includes unlimited users and stored contacts, subject to fair use, for A$399/month + GST. Features and setup differ.',
  pricingHeadline: 'Customer tools and unlimited users, priced clearly.',
  vendorPlanReason: 'Plus + Pipelines provides the CRM and deal automation used in this comparison. Pro offers additional marketing capabilities. Sales Engagement is the alternative CRM package for automated 1:1 sales email and includes Pipelines.',
  vendorLowerPlans: 'Starter is cheaper for basic email marketing, but limits automations to five actions and does not support the CRM add-on used here.',
  costCaution: 'Small teams and smaller contact lists may pay less with ActiveCampaign. Compare the tools, sending allowances and setup you need.',
  vendorEntryScope: 'Plus alone does not include the paid Pipelines add-on used in this comparison.',
  vendorScope: 'Plus includes email campaigns, marketing automation, forms and landing pages. Pipelines adds deals and pipeline automation. The priced WhatsApp add-on includes the chosen contact band and five connected numbers, with no prepaid messaging credits selected. SMS, message usage and connected apps are separate.',
  offerScope: 'CRM, shared inbox, pipelines, forms, booking, quotes, invoices, self-service website/funnel builders, review management, phone access and WhatsApp messaging with eight connected numbers and no separate WhatsApp contact-band fee. Sending usage is separate; marketing campaigns require Growth.',
  recurringExamples: costConfigurations.map(item => ({ label: item.label, values: [item.monthly, item.annual / 12, 399] })),
  costExamples: {
    title: 'Compare 12-month subscriptions',
    introduction: 'Twelve months of the named subscription only. Required Zapla launch is additional. ActiveCampaign already includes marketing campaigns; the feature bundles differ.',
    columns: ['Plus + Pipelines + WhatsApp · monthly', 'Plus + Pipelines + WhatsApp · annual', 'Zapla Follow-Through'],
    rows: costConfigurations.map(item => ({ label: item.label, values: [item.monthly * 12, item.annual, 4788] })),
    teamHeading: 'Contacts and users',
    caption: 'Australian-dollar totals composed from checked package and WhatsApp component prices; 12-month subscriptions excluding setup, before applicable ActiveCampaign taxes; Zapla amounts exclude GST.',
    note: 'ActiveCampaign annual amounts are paid upfront; monthly examples use twelve monthly payments. Zapla uses twelve A$399 subscription payments. Required Guided Launch from A$1,997 + GST is additional. Usage, optional services and connected-provider fees are excluded. Features and included email-sending allowances differ.',
  },
  launch: {
    ...pipedriveSimple.launch,
    steps: [
      { title: 'Agree the process', description: 'Choose the enquiries, quotes and bookings to follow up and agree what to move or connect.' },
      { title: 'Build and connect', description: 'Import up to 5,000 clean contacts and configure up to two pipelines, three forms, two calendars and three agreed follow-through automations.' },
      { title: 'Test and train', description: 'Test the agreed setup, run one training session and take the first version live. These are initial setup quantities, not software capacity limits.' },
    ],
  },
  fit: [
    { title: 'Email marketing and customer journeys', description: 'A strong fit when campaigns and marketing automation are your priority, particularly when your existing booking, phone and other business tools already work well together.', consideration: '' },
    { title: 'Everyday customer work across your team', description: 'Capture enquiries and manage conversations, quotes, bookings and reviews with reception, sales and the owner working from the same history.', consideration: 'A strong fit when you want unlimited users, connected customer tools and help configuring the first setup.' },
  ],
  rows,
  growthRows: [
    { id: 'reactivation', label: 'Database reactivation', zapla: zapla('Campaign and reactivation tools are in Growth, not Follow-Through. Sending usage and managed services are separate.'), competitor: {"text":"","mark":"tick","status":"included","sources":["plans"],"detail":"Plus email campaigns and automations support re-engaging contacts. Consent, segmentation and sending limits apply. WhatsApp is included in the priced configuration; SMS is separate."} },
    { id: 'campaigns', label: 'Email campaigns', zapla: zapla('Included in Growth, not Follow-Through. Sending usage is separate.'), competitor: { text: '', mark: 'tick', status: 'included', sources: ['pricing'], detail: 'Email campaigns are already included in Plus. The monthly included marketing-send allowance is 10 times the selected contact band; overages and restrictions are separate.' } },
    { id: 'bulk', label: 'Bulk SMS campaigns', zapla: zapla('Included in Growth; channel setup and sending usage are separate.'), competitor: {"text":"Paid add-on","status":"separate","sources":["pricing"],"detail":"SMS campaign capabilities require the separate SMS add-on. No SMS subscription or usage is added to the calculator.","mark":"cross"} },
    { id: 'whatsapp-campaigns', label: 'WhatsApp campaigns', zapla: zapla('Included in Growth. Follow-Through WhatsApp messaging is not bulk campaign access. Sending usage is extra.'), competitor: {"text":"","mark":"tick","status":"included","sources":["whatsapp"],"detail":"WhatsApp broadcast and automation capabilities are included in the WhatsApp add-on already counted in this configuration. Chargeable template messaging uses separate credits."} },
    { id: 'social', label: 'Social scheduling', zapla: zapla('Included in Growth; supported channels must be connected.'), competitor: {"text":"Via integration","detail":"A separate social publishing tool is required. ActiveCampaign documents connected tools such as SOCi; connecting a tool does not include its subscription or establish identical publishing capabilities.","mark":"cross","status":"separate","sources":["social"]} },
    { id: 'campaign-attribution', label: 'Campaign attribution & conversion tracking', zapla: zapla('Campaign attribution and conversion tracking are included in Growth.'), competitor: {"text":"Higher-tier plan","status":"separate","sources":["pricing"],"detail":"ActiveCampaign lists attribution and conversion tracking in Pro and Enterprise. Plus includes campaign reporting and site/link tracking; those are distinct from its advanced attribution offering.","mark":"cross"} },
  ],
  marketingNote: 'ActiveCampaign includes email and WhatsApp campaigns in the configuration priced here. Zapla campaigns require Growth. SMS is a separate ActiveCampaign add-on.',
  optionalRows: [
    { id: 'ai', label: 'AI call answering', zapla: { text: 'Optional paid service', status: 'separate', sources: ['offer'], detail: 'Zapla AI Receptionist is an optional paid service, separate from both software plans. Setup and usage terms are confirmed before activation; no voice allowance is assumed.' }, competitor: {"text":"External service","detail":"AI call answering is not listed as a native Plus + Pipelines inclusion. Separate connected calling providers offer additional AI services; availability, Australian deployment, compatibility and charges must be confirmed. ActiveCampaign marketing AI is not an AI receptionist.","mark":"cross","status":"separate","sources":["calling"]} },
  ],
  foundations: [], foundationNote: '',
  methodology: "ActiveCampaign Email Plus + Pipelines + WhatsApp versus Zapla Follow-Through. AUD prices compose 250 previously checked Plus + Pipelines package quotes with separately checked WhatsApp contact-band fees from 18 October 2026; combined totals were spot-checked. Email and WhatsApp use the selected contact allowance, with a minimum 5,000 WhatsApp contacts and five connected numbers. Annual prices require upfront payment and a one-year commitment. Monthly billing has no annual commitment. Pipelines and the WhatsApp subscription are already included in the prices; SMS, message credits, extra reporting and connected tools are not added. Sales Engagement replaces Pipelines when selected, rather than stacking both CRM packages. Zapla includes eight connected WhatsApp numbers and no separate WhatsApp contact-band fee; usage is extra and bulk campaigns require Growth. Required Zapla Guided Launch is disclosed separately. Unchecked team/contact configurations require a current quote. ActiveCampaign amounts are before applicable taxes; Zapla excludes GST.",
  faqs: [
    { question: 'Why does ActiveCampaign’s price change?', answer: 'Your quote depends on the product, contact allowance, users, billing choice and selected add-ons. Email plans include a monthly sending allowance. SMS and WhatsApp use separate credits.' },
    { question: 'Why compare Plus with Pipelines?', answer: 'Plus is the lowest current email tier supporting the CRM add-on used here. Pipelines adds deals and pipeline automation. Pro is available for more advanced marketing capabilities. Automated individual 1:1 sales emails require Sales Engagement instead of Pipelines; that different configuration is not silently included in these prices.' },
    { question: 'Which Zapla plan includes marketing campaigns?', answer: 'Growth includes email campaigns, database reactivation, bulk SMS and WhatsApp campaigns, and social scheduling for A$699/month + GST total.' },
    { question: 'Does ActiveCampaign charge for unsubscribed contacts?', answer: 'For accounts created on or after 3 November 2025, its documentation says all contacts count towards the contact limit regardless of list status. Older accounts follow different counting rules; archiving has separate conditions. Check which rules apply to your existing account.' },
    { question: 'What happens if I’m moving from ActiveCampaign?', answer: 'We agree which tools to keep, connections to check and data to move before you commit. Follow-Through Guided Launch includes up to 5,000 clean contacts and the agreed initial setup quantities. We assess your existing automations, history and integrations, then agree the migration scope and price before work starts.' },
    { question: 'Is AI Receptionist included?', answer: 'No. AI Receptionist is an optional paid service. Phone numbers, communication usage and payment-provider fees are also separate. The calculator compares named subscriptions; the subscription totals exclude setup, and required Follow-Through Guided Launch is disclosed separately.' },
  ],
  sources: [
    { id: 'offer', title: 'Zapla plans and scoped Guided Launch', url: '/Pricing-v3' },
    { id: 'platform-pricing', title: 'NextGen platform capacities', url: 'https://thenextgencrm.com/pricing/' },
    { id: 'pricing', title: 'ActiveCampaign pricing and feature matrix', url: 'https://www.activecampaign.com/pricing' },
    { id: 'configurator', title: 'ActiveCampaign AUD purchase configurator', url: 'https://www.activecampaign.com/signup/?code=ac&tier=plus&contacts=1000&currency=AUD' },
    { id: 'whatsapp', title: 'ActiveCampaign WhatsApp plans, credits and additional lines', url: 'https://help.activecampaign.com/hc/en-us/articles/20677457960860-Purchasing-WhatsApp-Messaging-through-ActiveCampaign' },
    { id: 'whatsapp-terms', title: 'ActiveCampaign separate WhatsApp contact allowance', url: 'https://www.activecampaign.com/legal/terms-of-service' },
    { id: 'plans', title: 'ActiveCampaign plans and CRM add-ons', url: 'https://help.activecampaign.com/hc/en-us/articles/14251311251356-Overview-of-ActiveCampaign-plans' },
    { id: 'crm', title: 'ActiveCampaign CRM and unlimited pipelines', url: 'https://www.activecampaign.com/compare/hubspot' },
    { id: 'contact-counting', title: 'ActiveCampaign contact counting by account date', url: 'https://help.activecampaign.com/hc/en-us/articles/115000337324-Do-unsubscribed-unconfirmed-or-bounced-contacts-count-against-my-contact-limit' },
    { id: 'landing-pages', title: 'ActiveCampaign landing-page capacity', url: 'https://help.activecampaign.com/hc/en-us/articles/4404509430940-Is-there-a-limit-on-the-number-of-landing-pages-that-can-be-created-in-an-account' },
    { id: 'shared-inbox', title: 'Helpwise shared email inbox integration', url: 'https://helpwise.io/updates/shared-mailbox-active-campaign-integration/' },
    { id: 'calling', title: 'JustCall calling and missed-call SMS with ActiveCampaign', url: 'https://justcall.io/integration/active-campaign/' },
    { id: 'reviews', title: 'NiceJob and ActiveCampaign through Zapier', url: 'https://zapier.com/apps/activecampaign/integrations/nicejob' },
    { id: 'booking', title: 'ActiveCampaign Calendly integration', url: 'https://help.activecampaign.com/hc/en-us/articles/360010946759-Integrate-Calendly-with-your-ActiveCampaign-account' },
    { id: 'documents', title: 'ActiveCampaign Qwilr document and invoice integration', url: 'https://www.activecampaign.com/apps/qwilr-integration' },
    { id: 'social', title: 'ActiveCampaign SOCi integration', url: 'https://www.activecampaign.com/apps/soci-integration' },
    { id: 'comparison-mailchimp', title: 'Comparison reference: ActiveCampaign vs Mailchimp', url: 'https://www.activecampaign.com/compare/mailchimp' },
    { id: 'comparison-hubspot', title: 'Comparison reference: HubSpot vs ActiveCampaign', url: 'https://www.hubspot.com/comparisons/active-campaign-vs-hubspot' },
  ],
  updated: '18 Oct 2026',
} as const satisfies ComparisonDefinition;
