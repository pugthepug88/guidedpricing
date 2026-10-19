import type { ComparisonCell, ComparisonDefinition, ComparisonRow } from './types';
import { pipedriveSimple } from './pipedrive';

// Fixed Growth + Sales match. USD reference prices and purchase conditions stay visible.
// The supplied AUD capture is dated evidence, not a current Australian quote.
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
  // Legacy AUD fields are unused in the explicitly labelled USD-reference mode.
  vendorEntryPrice: 0,
  vendorEntryPlan: 'Growth + Sales',
  vendorPrice: 0,
  vendorAnnualPrice: 0,
  vendorPriceUnit: 'US$55 per user/month; purchase minimum applies',
  vendorBilling: 'Minimum five platform users; US$10,000 annual new-customer purchase minimum; standard three-year contract. Australian terms require confirmation.',
  vendorPlanReason: 'The named configuration combines the Growth platform with the Sales product.',
  vendorLowerPlans: '',
  vendorEntryScope: 'Growth platform plus Sales product. Published US reference: US$40 + US$15 per user/month, subject to purchase conditions.',
  vendorScope: 'CRM, workflow designers, shared mailbox configuration, quotes and invoices. Connected services and additional products have their own scope.',
  pricingHeading: 'Compare the tools. Then the team price.',
  pricingIntroduction: 'Creatio Growth + Sales is US$55 per user/month at the published US reference rates. A five-user minimum and US$10,000 annual minimum purchase apply to new customers, with a standard three-year contract. Zapla Follow-Through is A$399/month + GST with unlimited users. Currencies differ; no savings calculation is made.',
  quotePricing: undefined,
  publishedPricing: {
    currencyPrefix: 'US$',
    platformRate: 40,
    productRate: 15,
    minimumUsers: 5,
    minimumAnnualPurchase: 10000,
    standardTermYears: 3,
    qualification: 'Creatio amounts are published USD references; Zapla amounts are AUD excluding GST. They are not a same-currency savings comparison. The model assigns Growth + Sales to each licensed user and starts at five licences, even for a smaller team. Other user types have different access. Licence arithmetic alone does not override Creatio’s annual purchase minimum or establish a payment schedule. Usage, implementation and optional services are separate; final regional terms require a quote.',
    historicalReference: 'Dated Australian reference (1 July 2026): A$64 Growth + A$24 Sales per user/month, with a stated A$16,000 annual new-customer minimum and standard three-year term. These AUD figures have not been reconfirmed and are not used as current calculator rates or an exchange-rate conversion. Basic support is listed as free; paid support upgrades, extra AI packages and connected services are not automatically added to the model.',
  },
  costCaution: 'Published USD licence subtotals are not final purchase quotes or AUD savings figures. The annual minimum and regional terms apply.',
  recurringExamples: [],
  costExamples: {
    title: 'See the annual costs and required setup',
    introduction: 'Creatio’s licence subtotal and minimum purchase are separate figures. The USD reference below applies the published annual purchase floor to Growth + Sales licence arithmetic. Zapla includes 12 monthly subscriptions and minimum Guided Launch in AUD. These are different currencies, not savings examples.',
    columns: ['Creatio · USD reference', 'Zapla · AUD including launch'],
    rows: [1, 5, 25].map(users => ({ label: users + (users === 1 ? ' person' : ' people'), values: [users <= 5 ? 'US$10,000 minimum' : 'US$16,500', 6785] })),
    caption: 'Annual published-reference purchase floor for Creatio in USD versus Zapla first-year subscription and minimum launch in AUD. Currencies and scope differ.',
    note: 'For one or five people, five Growth + Sales licences total US$3,300/year, below the published US$10,000 annual purchase minimum. For 25 full users, licences total US$16,500/year, above that floor. These are illustrative purchase-floor calculations, not checkout quotes; payment timing and qualifying purchases require confirmation. Creatio’s standard term is three years, not monthly cancellation. Zapla: A$399 × 12 + A$1,997 minimum Guided Launch = A$6,785, excluding GST. Usage, optional products and extra work are excluded. No FX conversion or savings claim is made.',
  },
  workflowNote: 'Both plans document unlimited workflow count. Creatio Growth separately lists 50,000 executed process elements per month. Zapla’s allowance does not mean unlimited executions, sending or setup work.',
  tableNotes: ['“Not listed” means not identified as a packaged Growth + Sales inclusion in the reviewed catalogue. Customisation or connected services may support the outcome.'],
  rows: [
    row('team', 'Unlimited users', source('Per-user pricing', 'This row applies only to the named Growth platform + Sales configuration, which charges per licensed user. Growth starts at five platform users. The calculator models Growth + Sales licences, with the licence subtotal, annual purchase minimum and standard term shown separately. Limited-access user types and final regional terms can differ.', ['pricing', 'plans'])),
    row('sms', 'Two-way SMS', source('Separate app', 'Creatio’s Twilio Services connector supports sending and receiving SMS inside Creatio. Connector scope, provider accounts, numbers and usage charges must be confirmed separately.', ['twilio'])),
    row('missed-call', 'Missed-call text-back', source('Not listed', notListed, ['pricing', 'sales', 'twilio'])),
    row('reviews', 'Review management', source('Not listed', notListed, ['pricing', 'sales'])),
    row('website', 'Websites & funnels', source('Separate tools', 'Growth + Sales does not include the separate Marketing product’s advertised landing-page builder. The no-code application designer is not evidence of an included public website builder. Website services and connections can be scoped separately.', ['pricing', 'marketing', 'plans'])),
    row('phone', 'Built-in business phone', source('Separate app', 'Calling can run inside Creatio using a connected provider such as Twilio. Connector licensing, regional availability, numbers and call usage depend on the agreed setup.', ['twilio', 'voice'])),
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
    { title: 'One system for everyday customer follow-up', description: 'Manage enquiries, conversations, quotes, bookings, invoices and reviews with reception, sales and the owner working from the same customer history.', consideration: 'A$399/month + GST brings everyday customer tools and unlimited users into one subscription.' },
  ],
  faqs: [
    { question: 'Why compare Creatio Growth + Sales?', answer: 'Growth supplies the workflow platform and Sales adds the sales product used in this comparison. It is a fixed named configuration, not a promise that the two platforms have identical capabilities.' },
    { question: 'Is the minimum five users or US$10,000 a year?', answer: 'Both conditions are published. Growth starts at five platform users. Five Growth + Sales licences calculate to US$275/month or US$3,300/year at the published US rates, but new customers also face a US$10,000 annual minimum purchase. The minimum is a spending floor, not an extra US$10,000 setup fee. The standard contract term is three years. Confirm eligible purchases, payment timing, Australian rates, taxes and implementation in your quote.' },
    { question: 'Why show USD prices on an Australian comparison?', answer: 'The published US reference gives a visible price without inventing an AUD conversion. An Australian pricing reference dated 1 July 2026 lists A$64 Growth + A$24 Sales per user/month and an A$16,000 annual minimum; these local figures have not been reconfirmed currently. We show them as dated reference evidence in the pricing notes, not as today’s Australian quote. Different currencies are not used to calculate savings.' },
    { question: 'What happens if I’m moving from Creatio?', answer: 'We agree which data to move, which tools to keep and which workflows to rebuild before you commit. Existing workflows, conversation history and integrations are assessed individually. Guided Launch covers the agreed initial setup; extra migration or integration work is scoped and priced separately.' },
    { question: 'Which plan includes marketing and AI Receptionist?', answer: 'Growth includes Follow-Through plus database reactivation, email campaigns, bulk SMS/WhatsApp campaigns and social scheduling for A$699/month + GST total, with required Guided Launch from A$2,997 + GST. Sending usage is separate. AI Receptionist is an optional paid service on either plan.' },
  ],
  foundations: [],
  foundationNote: '',
  methodology: 'The table and pricing section compare Creatio Growth platform + Sales product with Zapla Follow-Through throughout. Only this named Creatio configuration is evaluated; this is not a catalogue of all Creatio offers. The visible pricing uses the published USD40 Growth + USD15 Sales per user/month reference, a five-user platform minimum, USD10000 annual new-customer minimum and standard three-year contract. The licence subtotal is not the minimum purchase or a promise of monthly billing. Annual examples apply the published spending floor to the modelled licence subtotal and exclude implementation; they are illustrative, not checkout quotes. The supplied pricing guide captured on 1 July 2026 lists AUD64 + AUD24 and AUD16000 minimum. This dated Australian evidence is acknowledged in the pricing notes; it has not been reconfirmed and is not substituted for current rates. USD documentation is not a verified Australian contract. No same-currency savings or monthly cancellation claim is made. Basic support is listed as free; no paid support or AI package is assumed mandatory. Zapla prices exclude GST; launch, communications usage, optional services and payment-provider fees are separate. Feature bundles differ. Creatio receives credit for unlimited workflow count and records, shared mailbox documentation, quotes, invoices and connected calling/SMS. “Not listed” is a catalogue observation, not proof that a custom workflow or integration is impossible. Some mailbox/form evidence is legacy documentation and current account behaviour has not been tested. Zapla review management and missed-call text-back are owner-confirmed Follow-Through inclusions on 16 October 2026. Unlimited workflow count does not mean unlimited executions, sending, storage or setup work. This is a vendor-documentation comparison, not an independent account-level product test. No comparative security, hosting, performance or ROI claim is made.',
  sources: [
    ...base.sources.filter(item => ['platform-pricing', 'offer', 'inbox', 'phone', 'crm'].includes(item.id)),
    { id: 'pricing', title: 'Creatio pricing and commercial terms', url: 'https://www.creatio.com/products/pricing' },
    { id: 'support', title: 'Creatio support options and paid upgrades', url: 'https://www.creatio.com/services/support/options' },
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

