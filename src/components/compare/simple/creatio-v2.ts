import { creatioSimple } from './creatio';
import { pipedriveSimple } from './pipedrive';
import type { ComparisonDefinition, ComparisonRow } from './types';

const rows: ComparisonRow[] = creatioSimple.rows.map(row => ({ ...row, competitor: { ...row.competitor }, zapla: { ...row.zapla } }));
const feature = (id: string) => rows.find(row => row.id === id)!;
feature('team').competitor.detail = 'Growth + Sales charges per licensed user. At least five platform users and a separate A$16,000 annual purchase minimum apply to new customers. The calculator gives each selected person a Sales licence. Other access types and product mixes can change the quote.';
feature('email').competitor.detail = 'Growth documents unlimited workflow count, with a soft cap of 50,000 executed custom process elements per month per environment. Unchanged standard processes are excluded. This is not 50,000 complete workflows; higher capacity requires an appropriate plan.';
feature('website').zapla.detail = 'Self-service website and funnel builders are included. A done-for-you website build is separately scoped and priced.';
feature('forms').competitor.detail = 'Current Creatio documentation supports importing external web-form submissions through webhooks. Form-provider setup and field mapping are required. This credits connected form capture, not an identical built-in public form builder.';
feature('replies').competitor.text = 'Shared mailbox';
feature('reviews').competitor.detail = 'A packaged review-request and management feature was not identified in Growth + Sales. A listed YouScan integration brings reputation-monitoring results into case workflows, with a paid YouScan subscription. It does not establish an equivalent review-request workflow.';
feature('reviews').competitor.sources = ['pricing', 'sales', 'youscan'];
feature('phone').zapla.text = 'Included¹';
const booking = pipedriveSimple.rows.find(row => row.id === 'booking')!;
rows.splice(4, 0, { ...booking, competitor: { text: 'Separate app', status: 'separate', sources: ['calendly'], detail: 'A listed Calendly connector brings scheduled or cancelled meetings into Creatio. Connector licensing and an eligible Calendly subscription are separate. Compatibility and current provider requirements need checking; this is not an included Growth + Sales booking service.' } });

export const creatioV2: ComparisonDefinition = {
  ...creatioSimple,
  customerVisual: 'missed-call',
  headline: 'Your whole team.',
  headlineAccent: 'One CRM subscription.',
  introduction: 'Give reception, sales and the owner customer conversations, quotes, bookings and automated follow-ups for A$399/month + GST. Unlimited users. No extra seat fees.',
  highlights: [
    { title: 'A lower subscription commitment.', description: 'Zapla is A$399/month, with month-to-month software after launch. Creatio publishes an A$16,000 annual minimum purchase for new customers and a standard three-year contract.', link: { href: '#pricing-comparison', label: 'Compare the prices and terms' } },
    { title: 'Everyday customer tools included.', description: 'Two-way SMS, missed-call text-back, reviews and bookings sit alongside your CRM. Phone numbers and communications usage are extra.', link: { href: '/crm#crm-workbench', label: 'Explore customer records and conversations' } },
    { title: 'Your first workflows built and tested.', description: 'We import your agreed customer data, connect your tools, configure your first workflows, and test them with your team.' },
  ],
  rows,
  tableIntroduction: 'Zapla Follow-Through vs Creatio Growth + Sales. Compare team access and the tools you use to respond, book and follow up.',
  workflowNote: 'Both plans document unlimited workflow count. Creatio Growth has a separate custom-process execution allowance. Unlimited workflows do not mean unlimited executions, sending or setup work.',
  vendorPrice: 88,
  vendorAnnualPrice: 88,
  vendorEntryPrice: 88,
  vendorPriceUnit: 'per full user/month, billed annually',
  vendorBilling: 'Minimum five platform users. A$16,000 annual new-customer purchase minimum. Standard three-year contract.',
  publishedPricing: { currencyPrefix: 'A$', platformRate: 64, productRate: 24, minimumUsers: 5, minimumAnnualPurchase: 16000, standardTermYears: 3, qualification: 'AUD list prices before applicable taxes. Purchase conditions and different feature bundles apply.', historicalReference: '' },
  vendorPlanReason: 'Growth supplies the workflow and application platform. Sales adds packaged sales processes, quotes and invoice records. Enterprise adds higher capacity and governance; it is not required for the workflow designer.',
  vendorEntryScope: 'Growth A$64 + Sales A$24 per full user/month, billed annually. Purchase minimum applies.',
  vendorLowerPlans: '',
  pricingHeading: 'A smaller CRM bill. Your whole team included.',
  pricingIntroduction: 'Zapla’s software is A$4,788 for 12 months, paid monthly. Creatio publishes an A$16,000 annual minimum purchase for new customers. Compare the commitment below, then the tools and setup you need.',
  costCaution: 'The annual minimum is a purchase condition, not a quoted five-user package. Features and setup scopes differ.',
  costExamples: {
    title: 'See annual subscriptions and required setup',
    introduction: 'Zapla’s first-year examples include 12 monthly payments and minimum Guided Launch. Creatio shows licence arithmetic separately from purchase eligibility.',
    columns: ['Creatio · annual licences', 'Zapla · first year with launch'],
    rows: [
      { label: '1 person', values: ['A$4,128; below A$16,000 minimum', 6785] },
      { label: '5 people', values: ['A$5,280; below A$16,000 minimum', 6785] },
      { label: '16 people', values: ['A$16,896', 6785] },
      { label: '25 people', values: ['A$26,400', 6785] },
      { label: '100 people', values: ['A$105,600', 6785] },
    ],
    caption: 'AUD annual licence subtotals and purchase eligibility compared with Zapla’s first year including minimum launch.',
    note: 'Zapla: A$399 × 12 + minimum launch A$1,997 = A$6,785. Creatio: A$64 per platform licence + A$24 per Sales licence per month, annual billing. One person uses five platform licences and one Sales licence. Below-minimum subtotals are not purchasable offers; other configurations or sales-confirmed terms are required. Larger totals use published rates, not negotiated quotes. Creatio implementation, if required, is not priced here. All figures exclude tax, usage, optional services and payment fees. Feature bundles and setup scopes differ.',
  },
  launch: { ...creatioSimple.launch, steps: creatioSimple.launch.steps.map(step => step.title === 'Build and connect' ? { ...step, description: 'Import up to 5,000 clean contacts and configure up to two pipelines, three forms, two calendars and three agreed automations.' } : step) },
  growthRows: creatioSimple.growthRows.map(row => row.id === 'sms-marketing' ? { ...row, label: 'Bulk SMS campaigns' } : row),
  showMarketingNote: true,
  marketingNote: 'Growth also includes WhatsApp campaigns. Creatio Marketing is separately priced at A$24 per marketing user/month on top of the platform, with marketing-contact and email allowances. Add Sales only when its packaged features are needed; the platform is counted once.',
  optionalRows: [{ ...creatioSimple.optionalRows[0], competitor: { text: 'AI package + setup', status: 'separate', sources: ['voice', 'pricing', 'ai-packages'], detail: 'Creatio documents inbound AI voice agents with configured telephony. Beyond the initial allowance, ongoing AI requires a separately purchased package; Start is listed at A$8,000/year. Setup, carrier charges and Australian deployment requirements are separate. Feature equivalence has not been account-tested.' } }],
  fit: [
    { title: 'Custom applications and complex processes', description: 'A strong fit when your organisation needs configurable applications, approvals and cross-team processes, with implementation resources to shape the system around your requirements.', consideration: 'Choose the platform around the capacity, governance and deployment features you need.' },
    { title: 'Everyday follow-up, with your team included', description: 'Give reception, sales and the owner shared customer history, two-way SMS, missed-call text-back, reviews, bookings and quotes, with help building the first workflows.', consideration: 'A$399/month + GST brings everyday customer tools and unlimited users into one subscription.' },
  ],
  faqs: [
    { question: 'Is Zapla cheaper than Creatio?', answer: 'For the published new-customer offer compared here, Zapla has the lower subscription commitment: A$4,788 for 12 months of Follow-Through, paid monthly, versus Creatio’s A$16,000 annual minimum purchase. Zapla’s first year starts at A$6,785 including minimum Guided Launch. These amounts exclude tax, usage and extras; bundles and implementation scopes differ. Existing-customer or negotiated Creatio terms can differ.' },
    { question: 'Is the minimum five users or A$16,000 a year?', answer: 'Both conditions apply to the published offer. Five Growth + Sales licences total A$5,280/year, but the public checkout does not allow that below-minimum configuration to be bought as shown. The A$16,000 annual minimum is a purchase condition, not an extra setup fee or a quoted five-user package. Other configurations or sales-confirmed terms are required.' },
    { question: 'Why compare Growth + Sales?', answer: 'Growth supplies the workflow and application platform. Sales adds the packaged sales processes, quotes and invoice records used in this comparison. The bundles overlap but are not identical. Marketing, Service, paid support and AI are not automatically added to the comparison price.' },
    { question: 'Can I pay Creatio monthly?', answer: 'The public checkout inspected on 18 October 2026 showed an annual order total, not a month-to-month subscription. Creatio states a standard three-year contract. Your signed order sets the commitment and payment schedule. Card payment added 4%; invoice payment removed that fee.' },
    { question: 'What happens if I’m moving from Creatio?', answer: 'We agree which data to move, which tools to keep and which workflows to rebuild before you commit. Follow-Through Guided Launch covers up to 5,000 clean contacts, two pipelines, three forms, two calendars and three agreed automations, plus testing and training. Existing workflows, conversation history and integrations are assessed individually. Extra work is scoped and priced separately.' },
    { question: 'Which plan includes marketing and AI Receptionist?', answer: 'Zapla Growth includes Follow-Through plus database reactivation, email campaigns, bulk SMS and WhatsApp campaigns, and social scheduling for A$699/month + GST total. Required Guided Launch starts at A$2,997 + GST; sending usage is separate. AI Receptionist is an optional paid service on either plan.' },
  ],
  methodology: 'Checked 18 October 2026. Fixed comparison: Creatio Growth + Sales versus Zapla Follow-Through. AUD rates of A$64 Growth and A$24 Sales, the five-platform-user starting quantity, A$16,000 annual new-customer purchase minimum and standard three-year term were observed in the public pricing configurator. Five-user and 15-user full Sales configurations were below the minimum with Buy unavailable; 16 users reached an A$16,896 annual checkout total. A 4% card fee was removed by selecting invoice. No invoice was issued and final GST treatment, billing schedule and terms require the order. The headline minimum is not a quoted five-user package. Each selected person receives Sales; the platform quantity is at least five. Five platform plus one Sales was independently observed. Other product mixes and access types differ. Values above tested configurations are transparent list-price arithmetic, not negotiated quotes. Marketing, Service, paid support, ongoing AI and integrations are separate where required and are not silently stacked. Zapla’s required launch, usage and optional services are separate. Documentation establishes capabilities, not account-tested parity; shared-mailbox and connector behaviour needs current deployment confirmation. Zapla reviews and missed-call text-back are owner-confirmed inclusions. Unlimited workflow count does not mean unlimited execution, storage, sending or setup. Creatio Growth’s custom-process soft cap is 50,000 executed elements per month per environment, with unchanged standard processes excluded. No security, speed, hosting or ROI superiority is claimed.',
  sources: [
    ...creatioSimple.sources.filter(source => source.id !== 'forms'),
    { id: 'forms', title: 'Creatio: integrate a WordPress web form', url: 'https://academy.creatio.com/guides/creatio-apps/creatio-basics/business-data/data-import/web-forms-and-pages/wordpress-import' },
    { id: 'calendly', title: 'Calendly connector for Creatio', url: 'https://marketplace.creatio.com/app/calendly-connector-creatio' },
    { id: 'youscan', title: 'YouScan for Creatio', url: 'https://marketplace.creatio.com/app/social-media-cases-creatio' },
    { id: 'ai-packages', title: 'Creatio AI package entitlements and credit terms', url: 'https://www.creatio.com/products/pricing/compare-ai-packages' },
    { id: 'limits', title: 'Creatio platform pricing model and limits', url: 'https://academy.creatio.com/guides/setup-and-administration/administration/pricing-model-limits' },
  ],
  updated: '18 October 2026',
};
