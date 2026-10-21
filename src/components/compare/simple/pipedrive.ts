import type { ComparisonDefinition } from './types';

const offer = { monthly: 399, launch: 1997, growthMonthly: 699, growthLaunch: 2997, unlimitedUsers: true, unlimitedContacts: true, trial: false } as const;
const annualBilledRates = { Growth: 49, Premium: 79 } as const;
const monthlyPremium = 109; // AUD public pricing observed 18 October 2026; final checkout not tested.

export const pipedriveSimple = {
  competitor: 'Pipedrive',
  headline: 'Your whole team.',
  headlineAccent: 'One CRM subscription.',
  introduction: 'Give reception, sales and the owner one place for enquiries, two-way SMS, quotes, bookings and automated follow-ups. A$399/month + GST, with unlimited users and no extra seat fees.',
  highlights: [
    { title: 'Add people without adding seat fees.', description: 'Give reception, sales and the owner their own access. Your subscription stays the same as more people join.' },
    { title: 'Keep missed calls and follow-ups together.', description: 'Two-way SMS, missed-call text-back and review management are included alongside your CRM. Phone numbers and communications usage are separate.', link: { href: '/crm#crm-workbench', label: 'Explore customer records and conversations' } },
    { title: 'We configure the first workflows with you.', description: 'We import your agreed customer data, connect your tools, configure your first workflows, and test them with your team.' },
  ],
  tableIntroduction: 'Zapla Follow-Through vs Pipedrive Premium. See what’s included, what’s limited and what needs another tool.',
  tableCaption: 'Pipedrive Premium compared with Zapla Follow-Through; optional services are labeled.',
  vendorPricingUrl: 'https://www.pipedrive.com/en/pricing',
  vendorPlan: 'Premium',
  vendorEntryPrice: annualBilledRates.Growth,
  vendorEntryPlan: 'Growth',
  vendorPrice: monthlyPremium,
  vendorAnnualPrice: annualBilledRates.Premium,
  vendorPriceUnit: 'per user/month, billed monthly',
  workflowNote: 'Pipedrive Premium includes 150 active automations per company; paid top-ups are available. Zapla’s unlimited allowance refers to workflow count.',
  calculator: {
  "teamSizeLabel": "People who need CRM access",
  "monthlyLabel": "Monthly",
  "annualLabel": "Annual",
  "monthlyCommitment": "Billed monthly.",
  "seatName": "paid seat",
  "rateUnit": "user",
  "annualCommitment": false,
  "qualification": "Zapla’s subscription is lower from 4 Premium users billed monthly, or 6 billed annually. Setup and usage are priced separately.",
  "annualRateNote": "Premium is A$109 per user/month billed monthly, or A$948 per user/year paid upfront (A$79/month equivalent). Public AUD list pricing rechecked 19 October 2026. Optional add-ons are priced separately."
},
  vendorBilling: 'Or A$79 per user/month, billed annually (A$948 per user/year).',
  pricingHeadline: 'One team price. More tools included.',
  vendorPlanReason: 'Adds a team email inbox, LeadBooster forms and Smart Docs.',
  vendorLowerPlans: 'Lower Pipedrive plans are available: Lite A$19 and Growth A$49 per user/month, billed annually. Premium includes the shared email inbox, forms and Smart Docs used in this comparison.',
  costCaution: 'Monthly billing is compared first; Pipedrive’s annual discount is shown alongside. Tools, setup and usage differ.',
  additionalTools: [
    { title: 'Phone access and invoicing', description: 'Included in both Zapla plans. Communications usage and payment-provider charges are separate.', sources: ['platform-pricing', 'offer'] },
    { title: 'Reviews and customer follow-up', description: 'Follow-Through includes review requests, quote follow-up and appointment recovery tools. Launch configuration is agreed with you.', sources: ['offer'] },
  ],
  vendorEntryScope: 'Forms and Smart Docs cost extra. A business calling/SMS service and website builder are separate.',
  vendorScope: 'CRM, automations, shared email inbox, forms and Smart Docs. Website and calling/SMS services are separate.',
  offerScope: 'CRM, inbox, forms, bookings, website/funnel builder, invoicing and phone access. Usage is separate.',
  recurringExamples: [5, 10, 20].map(users => ({ label: `${users} users`, values: [users * monthlyPremium, users * annualBilledRates.Premium, offer.monthly] })),
  costExamples: {
  "title": "See annual subscription comparisons",
  "introduction": "Twelve months of the named software subscriptions. Setup, usage and optional services are disclosed separately.",
  "columns": [
    "Premium · monthly billing",
    "Premium · annual billing",
    "Zapla Follow-Through"
  ],
  "rows": [
    {
      "label": "5 users",
      "values": [
        6540,
        4740,
        4788
      ]
    },
    {
      "label": "10 users",
      "values": [
        13080,
        9480,
        4788
      ]
    },
    {
      "label": "20 users",
      "values": [
        26160,
        18960,
        4788
      ]
    }
  ],
  "note": "Pipedrive monthly billing uses twelve monthly payments; annual subscriptions are paid upfront. Zapla uses twelve A$399 monthly payments. Required Guided Launch from A$1,997 + GST is additional. All subscription totals exclude GST, usage, optional products and services. Feature bundles differ.",
  "caption": "AUD 12-month software subscription comparison, excluding GST, setup and usage. Feature bundles differ."
},
  launch: {
    headline: 'Get your first setup working.',
    introduction: 'Guided Launch turns the software into an agreed setup for your business. It is required and priced separately from the subscription.',
    steps: [
      { title: 'Agree the process', description: 'Choose the enquiries, quotes or bookings to follow up, and agree what moves from your current tools.' },
      { title: 'Build and connect', description: 'Configure the agreed CRM, inbox, forms, calendars and first follow-up automations.' },
      { title: 'Test and train', description: 'Test the agreed setup, train your team and take the first version live.' },
    ],
    note: 'Your launch scope and price are confirmed before you commit. Compare the agreed setup work alongside the software subscription.',
  },
  foundationNote: 'AI, communications and global login services can involve overseas processing. Pipedrive also documents regional hosting and separate company databases.',
  methodology: "Pipedrive Premium versus Zapla Follow-Through. AUD software subscriptions exclude GST, setup, usage and optional services. Premium is A$109/user/month paid monthly or A$948/user/year paid upfront. Monthly and annual list rates were rechecked on 19 October 2026. Premium includes 150 active automations, shared email inbox, forms and document tools; Campaigns and connected services are separate. Integrations are labelled and are not automatically added to the calculator. Zapla Growth marketing and optional AI Receptionist are separate from Follow-Through. Unlimited workflow count does not mean unlimited executions or sending. Required Zapla Guided Launch is disclosed separately. Final account entitlements and quotes may vary.",

  fit: [
    { title: 'Sales pipeline first', description: 'A strong fit when your priority is sales pipeline management and your other customer tools already work well together.', consideration: '' },
    { title: 'One system for your customer-facing team', description: 'Capture enquiries, follow up on quotes and manage bookings with reception, sales and the owner working from the same customer history.', consideration: 'Choose Zapla for unlimited users, connected customer tools and help configuring your first workflows.' },
  ],
  rows: [
    { id: 'team', label: 'Unlimited users', competitor: {"text":"Paid users","mark":"cross","detail":"Pipedrive charges per paid seat.","status":"plan-dependent","sources":["billing","pricing"]}, zapla: { text: '', mark: 'tick', detail: 'Unlimited users on both Zapla plans.', status: 'included', sources: ['offer'] } },
    { id: 'sms', label: 'Two-way SMS', competitor: {"text":"Via integration","detail":"Connected SMS providers support sending and receiving texts in Pipedrive. JustCall also documents SMS workflows triggered by Person, Deal and Activity events. Provider plans, setup and usage charges vary.","status":"separate","sources":["sms-workflows","calling"],"mark":"cross"}, zapla: { text: 'Included¹', mark: 'tick', detail: 'Two-way SMS is included in Follow-Through. Number and message usage charges are separate. Bulk marketing campaigns are in Growth.', status: 'included', sources: ['inbox', 'phone', 'offer'] } },
    { id: 'missed-call', label: 'Missed-call text-back', competitor: {"text":"Via integration","detail":"JustCall documents automated missed-call SMS follow-ups with Pipedrive. A connected calling/SMS provider and configured workflow are required; provider and usage charges vary.","status":"separate","sources":["missed-call-integration"],"mark":"cross"}, zapla: { text: 'Included¹', mark: 'tick', detail: 'Automatically send a text when your business misses a call.', status: 'included', sources: ['offer'] } },
    { id: 'reviews', label: 'Review management', competitor: {"text":"Via integration","detail":"Review platforms such as Trophy Jar connect to Pipedrive to automate review requests, track responses and manage reviews. Integration scope and charges vary.","status":"separate","sources":["review-integration"],"mark":"cross"}, zapla: { text: '', mark: 'tick', detail: 'Review management tools are included in Follow-Through.', status: 'included', sources: ['offer'] } },
    { id: 'email', label: 'Automation workflows', competitor: { text: '150 active', mark: 'tick', detail: 'Premium includes up to 150 active automations per company before optional top-ups. Execution and step limits also apply.', status: 'included', sources: ['automation-limits', 'top-ups', 'wait-condition'], subLines: ['10 actions per workflow', '90 days total delay', '7 days per condition wait'] }, zapla: { text: 'Unlimited', mark: 'tick', detail: 'Unlimited workflow/automation count on the underlying platform. This does not mean unlimited messages, usage or done-for-you setup; Guided Launch covers the agreed initial configuration.', status: 'included', sources: ['platform-pricing', 'offer'], subLines: ['No action cap', 'No total delay cap', 'No condition wait cap'] } },
    { id: 'replies', label: 'Shared email inbox', competitor: { text: '', mark: 'tick', detail: 'Included on Premium and Ultimate.', status: 'included', sources: ['plans'] }, zapla: { text: '', mark: 'tick', detail: 'Included on both plans; channels are connected during the agreed setup.', status: 'included', sources: ['inbox', 'offer'] } },
    { id: 'forms', label: 'Forms', competitor: { text: '', mark: 'tick', detail: 'LeadBooster is included on Premium/Ultimate; a paid add-on on Lite/Growth.', status: 'included', sources: ['plans', 'leadbooster'] }, zapla: { text: '', mark: 'tick', detail: 'Forms and surveys included on both plans.', status: 'included', sources: ['platform-pricing', 'offer'] } },
    { id: 'booking', label: 'Online booking', competitor: { text: '', mark: 'tick', detail: 'Scheduler included on Growth and above, or with LeadBooster.', status: 'included', sources: ['plans', 'leadbooster'] }, zapla: { text: '', mark: 'tick', detail: 'Calendars and booking tools included on both plans.', status: 'included', sources: ['platform-pricing', 'offer'] } },
    { id: 'proposals', label: 'Quotes & proposals', competitor: { text: '', mark: 'tick', detail: 'Smart Docs is included on Premium/Ultimate; a paid add-on on Lite/Growth.', status: 'included', sources: ['plans'] }, zapla: { text: '', mark: 'tick', detail: 'Proposal tools included on both plans.', status: 'included', sources: ['platform-pricing', 'offer'] } },
    { id: 'website', label: 'Websites & funnels', competitor: {"text":"Separate product","detail":"Website and funnel-page builders are not native CRM-plan inclusions. Separate tools can connect through forms and integrations.","status":"separate","sources":["website","plans"],"mark":"cross"}, zapla: { text: '', mark: 'tick', detail: 'Self-service website and funnel builders included. Done-for-you builds are separately scoped and priced.', status: 'included', sources: ['platform-pricing', 'offer'] } },
    { id: 'phone', label: 'Built-in business phone', competitor: {"text":"Via integration","detail":"Web calling uses a connected provider. Mobile calling and logging are available.","status":"separate","sources":["calling","mobilecalling"],"mark":"cross"}, zapla: { text: 'Included¹', mark: 'tick', detail: 'Phone access included; numbers and usage are charged separately.', status: 'included', sources: ['phone', 'offer'] } },
    { id: 'invoices', label: 'Invoicing', competitor: {"text":"Requires accounting app","detail":"The invoicing interface is included in Pipedrive, but creating and sending invoices requires a connected invoicing app. Pipedrive’s documented QuickBooks connection needs an active paid or trial account with both services. The accounting subscription is separate; an existing subscription may avoid a new subscription cost.","status":"separate","sources":["invoicing"],"mark":"cross"}, zapla: { text: '', mark: 'tick', detail: 'Create and send invoices from your CRM.', status: 'included', sources: ['platform-pricing', 'offer'] } },
    { id: 'contacts', label: 'Unlimited contacts', competitor: { text: '', mark: 'tick', detail: 'No stored-contact usage limit. Deal and marketing-subscriber limits are separate.', status: 'included', sources: ['limits'] }, zapla: { text: '', mark: 'tick', detail: 'Unlimited stored contacts, subject to fair use. Message usage is separate.', status: 'included', sources: ['platform-pricing', 'offer'] } },
    { id: 'crm', label: 'Unlimited pipelines', competitor: { text: '', mark: 'tick', detail: 'Unlimited sales pipelines on all plans. Lead and deal record limits are separate.', status: 'included', sources: ['pipelines', 'limits'] }, zapla: { text: '', mark: 'tick', detail: 'Unlimited pipelines on both Zapla plans. Stored contacts are subject to fair use.', status: 'included', sources: ['crm', 'platform-pricing', 'offer'] } },
  ],
  growthRows: [
    { id: 'reactivation', label: 'Database reactivation', competitor: { text: 'Email workflows', mark: 'tick', detail: 'Premium email workflows can re-engage inactive contacts. Broadcast marketing campaigns use the paid Campaigns add-on; SMS outreach uses a connected provider. Pipedrive documents reactivation workflows, so this capability is not marked unavailable.', status: 'included', sources: ['reactivation', 'plans', 'campaigns', 'sms-marketplace'] }, zapla: { text: '', mark: 'tick', detail: 'Database reactivation tools included in Growth, using targeted email, SMS or WhatsApp campaigns. Sending usage and separately managed campaign services are additional; results are not guaranteed.', status: 'included', sources: ['offer'] } },
    { id: 'marketing', label: 'Email campaigns', competitor: {"text":"Paid add-on","detail":"Campaigns is separate on every CRM plan. Price depends on tier and subscribed contacts. Sales email sync, bulk sales emails and nurturing sequences are different features and are included in Premium.","status":"separate","sources":["billing","campaigns","pricing"],"mark":"cross"}, zapla: { text: '', mark: 'tick', detail: 'Email campaign tools included in Growth, not Follow-Through. Sending usage is separate.', status: 'included', sources: ['offer'] } },
    { id: 'sms-marketing', label: "Bulk SMS campaigns", competitor: {"text":"Via integration","detail":"SMS campaigns use a connected provider, including the Australian SMS Marketplace app. This row compares SMS campaigns; Pipedrive’s native WhatsApp conversations in beta are a separate capability. Provider terms and messaging usage vary.","status":"separate","sources":["sms-marketplace","plans","whatsapp"],"mark":"cross"}, zapla: {"text":"","mark":"tick","detail":"Bulk SMS campaign tools included in Growth. Sending usage is separate.","status":"included","sources":["offer"]} },
    { id: 'social', label: 'Social scheduling', competitor: {"text":"Via integration","detail":"A native social publishing scheduler is not listed in the current CRM plan catalogue. Pipedrive documents separate social scheduling tools such as Hootsuite. This is a catalogue-based distinction, not a claim that social tools cannot connect.","status":"separate","sources":["plans","pricing","social-tools"],"mark":"cross"}, zapla: { text: '', mark: 'tick', detail: 'Social scheduling included in Growth. Supported channels must be connected.', status: 'included', sources: ['offer'] } },
  ],
  showMarketingNote: true,
  marketingNote: 'Pipedrive offers email campaigns through its paid Campaigns add-on. SMS campaigns and social scheduling use connected tools. Costs depend on your chosen services and usage.',
  optionalRows: [
    { id: 'ai-receptionist', label: 'AI call answering', competitor: {"text":"External service","detail":"AI call answering is not listed as a Premium plan inclusion. Pipedrive discusses external AI receptionist tools separately from its own AI sales assistant. Any provider connection, scope and charges must be checked.","status":"separate","sources":["ai-tools","pricing","plans"],"mark":"cross"}, zapla: { text: 'Optional paid service', detail: 'A separately priced service that answers calls, captures details and can book or route enquiries. It is not included in the A$399 or A$699 subscription. Scope, setup and usage allowances are confirmed separately.', status: 'separate', sources: ['offer', 'phone'] } },
  ],
  offer,
  foundations: [
    { title: 'Choose your data region', description: 'Core account data and backups stay in the selected live region. US, EEA and Australian regions are currently available.', sources: ['dpa'] },
    { title: 'A separate account database', description: 'Your customer records are stored in an account database separate from other accounts.', sources: ['platform', 'dpa'] },
    { title: 'App and data in one region', description: 'The application and account database run together in the selected region.', sources: ['dpa'] },
  ],
  faqs: [
  {
    "question": "Which plan includes marketing and reactivation?",
    "answer": "Growth includes everything in Follow-Through, plus database reactivation, email campaigns, bulk SMS/WhatsApp campaigns and social scheduling. It is A$699/month + GST, with required Guided Launch from A$2,997 + GST. Sending usage is separate."
  },
  {
    "question": "Does the calculator include setup and usage?",
    "answer": "No. The calculator and annual table compare software subscriptions for the named plans. Required Zapla Guided Launch from A$1,997 + GST is disclosed separately. Usage and optional services are additional."
  },
  {
    "question": "Can I move from Pipedrive and keep my existing tools?",
    "answer": "We assess the data and tools you want to bring across, then agree the migration and connections in Guided Launch before you commit."
  },
  {
    "question": "Is AI Receptionist included?",
    "answer": "AI Receptionist is available as an optional paid service on either Zapla plan. Business phone access is included; phone numbers and communications usage are separate."
  }
],
  sources: [
    { id: 'whatsapp', title: 'Pipedrive WhatsApp beta availability', url: 'https://support.pipedrive.com/en/article/whatsapp-integration' },
    { id: 'top-ups', title: 'Pipedrive paid automation top-ups', url: 'https://support.pipedrive.com/en/article/top-ups' },
    { id: 'sms-workflows', title: 'JustCall SMS automation with Pipedrive', url: 'https://help.justcall.io/en/articles/7836221-simplify-business-communications-with-automated-sms-campaigns-using-justcall-pipedrive-integration' },
    { id: 'missed-call-integration', title: 'JustCall missed-call SMS follow-ups with Pipedrive', url: 'https://justcall.io/integration/pipedrive/' },
    { id: 'review-integration', title: 'Pipedrive review-management integration', url: 'https://www.pipedrive.com/en/marketplace/app/trophy-jar-reviews/9baf0dcb410388b0' },
    { id: 'automation-limits', title: 'Pipedrive active automation counts and execution limits', url: 'https://support.pipedrive.com/en/article/automation-limits' },
    { id: 'wait-condition', title: 'Pipedrive wait-for-condition step time limit', url: 'https://support.pipedrive.com/en/article/automation-wait-for-condition' },
    { id: 'pipelines', title: 'Pipedrive unlimited pipelines on all plans', url: 'https://www.pipedrive.com/en/crm-comparison/attio-vs-pipedrive' },
    { id: 'reactivation', title: 'Pipedrive reactivation and customer outreach workflows', url: 'https://www.pipedrive.com/en/blog/what-is-rfm' },
    { id: 'sms-marketplace', title: 'Pipedrive Australian SMS campaign integration', url: 'https://www.pipedrive.com/en/marketplace/app/send-sms-in-pipedrive-australia/42a68717caf3a56d' },
    { id: 'social-tools', title: 'Pipedrive guide to separate marketing and social tools', url: 'https://www.pipedrive.com/en/blog/marketing-agency-software' },
    { id: 'ai-tools', title: 'Pipedrive guide distinguishing sales AI and external AI receptionists', url: 'https://www.pipedrive.com/en/blog/ai-sales-tools' },
    { id: 'invoicing', title: 'Pipedrive invoicing and connected app requirements', url: 'https://support.pipedrive.com/en/article/invoicing-feature-in-pipedrive' },
    { id: 'campaigns', title: 'Pipedrive Campaigns tiers and subscriber billing', url: 'https://support.pipedrive.com/en/article/campaigns-subscription-and-billing' },
    { id: 'website', title: 'Pipedrive website and landing-page integrations', url: 'https://www.pipedrive.com/en/connect-tools-you-use' },
    { id: 'platform-pricing', title: 'NextGen core platform inclusions', url: 'https://thenextgencrm.com/pricing/' },
    { id: 'limits', title: 'Pipedrive contacts and usage limits', url: 'https://support.pipedrive.com/en/article/usage-limits-in-pipedrive' },
    { id: 'plans', title: 'Pipedrive plan features', url: 'https://support.pipedrive.com/en/article/what-features-do-the-pipedrive-plans-have' },
    { id: 'leadbooster', title: 'Pipedrive LeadBooster', url: 'https://support.pipedrive.com/en/article/leadbooster-add-on' },
    { id: 'billing', title: 'Pipedrive billing and paid seats', url: 'https://support.pipedrive.com/en/article/how-does-pricing-work-in-pipedrive' },
    { id: 'pricing', title: 'Current Pipedrive pricing', url: 'https://www.pipedrive.com/en/pricing' },
    { id: 'calling', title: 'Pipedrive business calling', url: 'https://support.pipedrive.com/en/article/how-can-i-make-calls-in-pipedrive' },
    { id: 'mobilecalling', title: 'Pipedrive mobile calling', url: 'https://support.pipedrive.com/en/article/calling-and-logging-calls-in-the-mobile-app' },
    { id: 'onboarding', title: 'Pipedrive onboarding options', url: 'https://www.pipedrive.com/en/products/sales/onboarding' },
    { id: 'security', title: 'Pipedrive data security and hosting', url: 'https://support.pipedrive.com/en/article/how-secure-is-my-data-in-pipedrive' },
    { id: 'crm', title: 'NextGen customer records and pipelines', url: 'https://thenextgencrm.com/features/crm/' },
    { id: 'inbox', title: 'NextGen shared inbox', url: 'https://thenextgencrm.com/features/inbox/' },
    { id: 'phone', title: 'NextGen phone and AI voice', url: 'https://thenextgencrm.com/features/phone/' },
    { id: 'platform', title: 'NextGen platform features and architecture', url: 'https://thenextgencrm.com/' },
    { id: 'dpa', title: 'NextGen data processing agreement and regional exceptions', url: 'https://thenextgencrm.com/dpa/' },
    { id: 'offer', title: 'Zapla current plans and Guided Launch', url: '/Pricing-v3' },
  ],
  updated: '18 October 2026',
  pricingUrl: '/Pricing-v3',
} as const satisfies ComparisonDefinition;
