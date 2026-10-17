import type { ComparisonCell, ComparisonDefinition, ComparisonRow } from './types';
import { pipedriveSimple } from './pipedrive';

// The fixed comparison is Growth + Sales. Regional pricing is not an AUD quote.
const base = pipedriveSimple;
const source = (text: string, detail: string, sources: string[], mark?: 'tick' | 'cross'): ComparisonCell => ({
  text, detail, sources, mark, status: mark === 'tick' ? 'included' : 'plan-dependent',
});
function row(id: string, label: string, competitor: ComparisonCell): ComparisonRow {
  const original = base.rows.find(item => item.id === id);
  if (!original) throw new Error('Missing shared Zapla feature: ' + id);
  return { id, label, competitor, zapla: original.zapla };
}
const notListed = 'Not identified as a packaged Growth + Sales inclusion in the reviewed catalogue. Custom workflows or connected services may support this outcome; scope and charges must be confirmed. This is not a claim that the outcome is impossible.';

export const creatioSimple: ComparisonDefinition = {
  ...base,
  competitor: 'Creatio',
  vendorPlan: 'Growth + Sales',
  tableIntroduction: 'Zapla Follow-Through vs Creatio Growth + Sales. See what’s included, what’s limited and what needs another tool.',
  tableCaption: 'Creatio Growth + Sales compared with Zapla Follow-Through.',
  vendorPricingUrl: 'https://www.creatio.com/products/pricing',
  // Unused numeric legacy fields: the quote-only mode never renders these as prices.
  vendorEntryPrice: 0,
  vendorEntryPlan: 'Growth + Sales',
  vendorPrice: 0,
  vendorAnnualPrice: 0,
  vendorPriceUnit: 'Australian quote required',
  vendorBilling: 'Confirm regional billing, tax treatment and contract terms with Creatio.',
  vendorPlanReason: 'The named configuration combines the Growth platform with the Sales product.',
  vendorLowerPlans: '',
  vendorEntryScope: 'Growth platform plus Sales product. Australian commercial terms require a quote.',
  vendorScope: 'CRM, workflow designers, shared mailbox configuration, quotes and invoices. Connected services and additional products have their own scope.',
  pricingHeading: 'Compare the tools. Then the team price.',
  pricingIntroduction: 'Creatio Growth + Sales uses per-user platform and Sales licences, with a minimum purchase. Zapla Follow-Through includes unlimited users for A$399/month + GST. Compare the included tools and agreed setup alongside your regional quote.',
  quotePricing: {
    message: 'Australian quote required',
    detail: 'Per-user platform and Sales licences. A minimum purchase applies. Confirm regional pricing, billing, taxes and setup with Creatio.',
    qualification: 'Growth starts with five platform users. The published US reference is US$40 per platform user/month plus US$15 per Sales user/month. The USD pricing surface states a US$10,000 annual minimum for new customers and a standard three-year term. These are vendor reference terms, not a verified Australian quote or month-to-month billing offer. No currency conversion or savings figure is assumed.',
  },
  costCaution: 'Australian Creatio pricing is not verified; no numeric savings comparison is made.',
  recurringExamples: [],
  costExamples: {
    title: 'See the first-year cash outlay, including launch',
    introduction: 'Zapla’s example includes 12 monthly subscriptions and minimum required Guided Launch. Creatio’s Australian subscription and implementation require a quote.',
    columns: ['Creatio Growth + Sales', 'Zapla Follow-Through'],
    rows: [1, 5, 25].map(users => ({ label: users + (users === 1 ? ' person' : ' people'), values: ['Quote required', 6785] })),
    caption: 'First-year Zapla amounts in AUD; Creatio’s Australian price is quote-based.',
    note: 'Zapla: A$399 × 12 + A$1,997 minimum Guided Launch = A$6,785, excluding GST. Usage, optional services and extra work are excluded. Creatio values are not estimated. Features, billing and implementation differ.',
  },
  workflowNote: 'Both plans document unlimited workflow count. Creatio Growth separately lists 50,000 executed process elements per month. Zapla’s allowance does not mean unlimited executions, sending or setup work.',
  tableNotes: ['“Not listed” means not identified as a packaged Growth + Sales inclusion in the reviewed catalogue. Customisation or connected services may support the outcome.'],
  rows: [
    row('team', 'Unlimited users', source('Per-user pricing', 'This row applies only to the named Growth platform + Sales configuration, which charges per licensed user. The calculator requests a regional quote and does not treat every team member as a confirmed paid licence.', ['pricing', 'plans'])),
    row('sms', 'Two-way SMS', source('Via integration', 'Creatio’s Twilio Services connector supports sending and receiving SMS inside Creatio. Connector scope, provider accounts, numbers and usage charges must be confirmed separately.', ['twilio'])),
    row('missed-call', 'Missed-call text-back', source('Not listed', notListed, ['pricing', 'sales', 'twilio'])),
    row('reviews', 'Review management', source('Not listed', notListed, ['pricing', 'sales'])),
    row('website', 'Websites & funnels', source('Separate tools', 'Growth + Sales does not include the separate Marketing product’s advertised landing-page builder. The no-code application designer is not evidence of an included public website builder. Website services and connections can be scoped separately.', ['pricing', 'marketing', 'plans'])),
    row('phone', 'Built-in business phone', source('Via integration', 'Calling can run inside Creatio using a connected provider such as Twilio. Connector licensing, regional availability, numbers and call usage depend on the agreed setup.', ['twilio', 'voice'])),
    row('email', 'Automation workflows', source('Unlimited', 'The Growth plan lists unlimited workflow count, with a separate allowance of 50,000 executed process elements per month. This is not a limit of 50,000 complete workflows.', ['plans'], 'tick')),
    row('contacts', 'Unlimited contacts', source('', 'Creatio Growth lists unlimited records. Database and attachment storage allocations are separate; marketing contacts, if the Marketing product is purchased, have separate commercial terms.', ['plans'], 'tick')),
    row('replies', 'Shared email inbox', source('', 'Creatio documents shared mailbox access, permissions and sending from a shared address across products. Mailbox connection and configuration are required. The cited mailbox guide is legacy documentation; current account-level behaviour has not been independently tested.', ['mailbox'], 'tick')),
    row('forms', 'Forms', source('Connected forms', 'Creatio documents web-to-object integration to create CRM records from connected web forms. This credits form capture, not an assumed identical native form-builder experience. The cited guide is legacy documentation and deployment scope should be confirmed.', ['forms'])),
    row('proposals', 'Quotes & proposals', source('', 'Creatio Sales advertises quote creation and sharing. Its Sales objects include orders, contracts and documents. Templates and any advanced proposal, signature or CPQ requirements must be scoped; no additional quote tool is automatically charged.', ['sales', 'artifacts'], 'tick')),
    row('invoices', 'Invoicing', source('', 'Creatio Sales includes an Invoice object and order, contract and invoice approval workflows. Payment processing and accounting connections are separate; neither platform is presented as replacing accounting software.', ['artifacts'], 'tick')),
  ],
  growthRows: [
    { ...base.growthRows[0], label: 'Database reactivation', competitor: source('Configured workflows', 'Creatio workflows can be configured for re-engagement. Broader marketing campaigns and sending channels depend on the selected products and connections. This is not marked unavailable.', ['plans', 'marketing', 'artifacts']) },
    { ...base.growthRows[1], label: 'Email campaigns', competitor: source('Marketing product', 'Campaigns, segmentation and marketing email are documented in the separately selected Marketing product, outside the fixed Growth + Sales configuration. No Marketing subscription is added to the price comparison.', ['pricing', 'marketing', 'artifacts']) },
    { ...base.growthRows[2], label: 'Bulk SMS / WhatsApp campaigns', competitor: source('Product / integration', 'Creatio Marketing and suitable connected messaging providers support campaigns. Product entitlement, consent, channel setup and sending costs require confirmation.', ['marketing', 'artifacts', 'twilio']) },
    { ...base.growthRows[3], label: 'Social scheduling', competitor: source('Not listed', 'A social publishing scheduler was not identified as a packaged Growth + Sales inclusion. Do not confuse social messaging or advertising analytics with a publishing scheduler.', ['pricing', 'sales', 'marketing']) },
  ],
  marketingNote: 'Creatio’s Marketing product and connected providers support campaign work. They are outside this fixed Growth + Sales comparison; no hypothetical additional stack is charged.',
  optionalRows: [{
    id: 'ai', label: 'AI call answering',
    competitor: source('AI Studio setup', 'Creatio AI Studio documents voice agents that answer inbound calls and transfer live calls through configured Twilio connections. Licensing, AI consumption, regional availability and feature equivalence have not been account-tested; this is not marked absent.', ['voice', 'pricing']),
    zapla: { text: 'Optional paid service', detail: 'AI Receptionist is separately priced, outside both software subscriptions. Setup, scope and communications usage are agreed separately; no voice allowance is assumed.', status: 'separate', sources: ['offer', 'phone'] },
  }],
  fit: [
    { title: 'Custom applications and complex processes', description: 'A strong fit when your organisation needs to build and adapt applications, approvals and workflows around more complex operational requirements.', consideration: 'Assess the configuration, connected services and implementation alongside your Creatio quote.' },
    { title: 'One system for everyday customer follow-up', description: 'Manage enquiries, conversations, quotes, bookings, invoices and reviews with reception, sales and the owner working from the same customer history.', consideration: 'A$399/month + GST includes unlimited users. Required Guided Launch is separately scoped and priced; communications usage and optional services are extra.' },
  ],
  faqs: [
    { question: 'Why compare Creatio Growth + Sales?', answer: 'Growth supplies the workflow platform and Sales adds the sales product used in this comparison. It is a fixed named configuration, not a promise that the two platforms have identical capabilities.' },
    { question: 'Why does Creatio show “Australian quote required”?', answer: 'We have not verified a current Australian invoice, billing currency or tax treatment for Growth + Sales. Creatio publishes per-user reference rates, a new-customer minimum and a standard contract term. Confirm the applicable regional offer and implementation before comparing totals.' },
    { question: 'What happens if I’m moving from Creatio?', answer: 'We agree which data to move, which tools to keep and which workflows to rebuild before you commit. Existing workflows, conversation history and integrations are assessed individually. Guided Launch covers the agreed initial setup; extra migration or integration work is scoped and priced separately.' },
    { question: 'Which plan includes marketing and AI Receptionist?', answer: 'Growth includes Follow-Through plus database reactivation, email campaigns, bulk SMS/WhatsApp campaigns and social scheduling for A$699/month + GST total, with required Guided Launch from A$2,997 + GST. Sending usage is separate. AI Receptionist is an optional paid service on either plan.' },
  ],
  foundations: [],
  foundationNote: '',
  methodology: 'The table and pricing section compare Creatio Growth platform + Sales product with Zapla Follow-Through throughout. Only this named Creatio configuration is evaluated; this is not a catalogue of all Creatio offers. Creatio’s Australian invoice, currency and GST treatment have not been reproduced, so the pricing section requests a quote rather than presenting estimated AUD prices, currency conversions, a fictitious monthly billing option or savings. The USD reference pricing and general minimum/standard term are documentation only, not a verified Australian contract. Zapla prices exclude GST; launch, communications usage, optional services and payment-provider fees are separate. Feature bundles differ. Creatio receives credit for unlimited workflow count and records, shared mailbox documentation, quotes, invoices and connected calling/SMS. “Not listed” is a catalogue observation, not proof that a custom workflow or integration is impossible. Some mailbox/form evidence is legacy documentation and current account behaviour has not been tested. Zapla review management and missed-call text-back are owner-confirmed Follow-Through inclusions on 16 October 2026. Unlimited workflow count does not mean unlimited executions, sending, storage or setup work. This is a vendor-documentation comparison, not an independent account-level product test. No comparative security, hosting, performance or ROI claim is made.',
  sources: [
    ...base.sources.filter(item => ['platform-pricing', 'offer', 'inbox', 'phone', 'crm'].includes(item.id)),
    { id: 'pricing', title: 'Creatio pricing and commercial terms', url: 'https://www.creatio.com/products/pricing' },
    { id: 'plans', title: 'Creatio platform plan features and allowances', url: 'https://www.creatio.com/products/pricing/compare-platform-plans' },
    { id: 'sales', title: 'Creatio Sales and quoting', url: 'https://www.creatio.com/sales' },
    { id: 'artifacts', title: 'Creatio v10 Sales and Marketing objects and workflows', url: 'https://academy.creatio.com/guides/creatio-apps/overview/creatio-artifacts-overview' },
    { id: 'marketing', title: 'Creatio Marketing and landing pages', url: 'https://www.creatio.com/marketing' },
    { id: 'mailbox', title: 'Creatio shared mailbox documentation (legacy guide)', url: 'https://academy.creatio.com/docs/user/setup_and_administration/base_integrations/mailbox_setup/set_up_a_shared_mailbox/configure_a_shared_mailbox' },
    { id: 'forms', title: 'Creatio connected web forms (legacy guide)', url: 'https://academy.creatio.com/docs/developer/application_components/landings/web_to_object/overview' },
    { id: 'twilio', title: 'Twilio Services for Creatio', url: 'https://marketplace.creatio.com/app/twilio-services-creatio' },
    { id: 'voice', title: 'Creatio AI Studio telephony and inbound routing', url: 'https://academy.creatio.com/guides/ai-studio/connectivity/set-up-telephony' },
    { id: 'comparison-reference', title: 'Reference reviewed: Creatio competitor comparison', url: 'https://www.creatio.com/landings/creatio-vs-competitors' },
    { id: 'salesforce-reference', title: 'Reference reviewed: Creatio versus Salesforce', url: 'https://www.creatio.com/glossary/creatio-vs-salesforce' },
  ],
  updated: '17 October 2026',
};

