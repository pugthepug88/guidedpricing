import type { ComparisonDefinition } from './types';

// Approved proposal: fixed Pro Suite, published AUD annual list rate, no add-on stack.
export const salesforceComparison = {
  "competitor": "Salesforce",
  "headline": "Your whole team.",
  "headlineAccent": "One CRM subscription.",
  "customerVisual": "missed-call",
  "introduction": "Give reception, sales and the owner one place for enquiries, two-way SMS, quotes, bookings and automated follow-ups. A$399/month + GST, with unlimited users and no extra seat fees.",
  "highlights": [
    {
      "title": "Give your whole team access.",
      "description": "Reception, sales and the owner can each work from the same customer records. Add people without adding seat fees."
    },
    {
      "title": "Keep enquiries moving after the first contact.",
      "description": "Reply by SMS, follow up a missed call and keep the next action with the customer record. Follow-Through brings these everyday tools together.",
      "link": {
        "href": "/crm#crm-workbench",
        "label": "Explore customer records and conversations"
      }
    },
    {
      "title": "Get your first workflows built and tested.",
      "description": "We agree your process, import your clean customer data and configure your first follow-up workflows. Then we test the setup and train your team."
    }
  ],
  "tableIntroduction": "Zapla Follow-Through vs Salesforce Pro Suite. Compare team access and everyday customer tools, then check the package limits and billing terms.",
  "tableCaption": "Salesforce Pro Suite compared with Zapla Follow-Through.",
  "vendorPricingUrl": "https://www.salesforce.com/au/small-business/pricing/",
  "vendorPlan": "Pro Suite",
  "vendorEntryPrice": 35,
  "vendorEntryPlan": "Starter Suite",
  "vendorPrice": 140,
  "vendorAnnualPrice": 140,
  "vendorPriceUnit": "per user/month equivalent, billed annually",
  "vendorBilling": "Annual contract. A$1,680 per user/year before taxes.",
  "workflowNote": "Zapla’s unlimited allowance refers to workflow count. Executions, sending, usage and setup scope are separate. Salesforce applies different limits to custom flows, marketing automation and integration runs.",
  "pricingHeading": "Compare the cost for your whole team.",
  "pricingHeadline": "Compare the cost for your whole team.",
  "pricingIntroduction": "Salesforce Pro Suite charges per paid user and requires an annual contract. Zapla Follow-Through includes unlimited users for A$399/month + GST. Compare subscriptions below, then consider the included tools and required setup.",
  "vendorPlanReason": "Pro Suite includes opportunity management and is selected for quoting, forecasting, enhanced web chat, customisation and AppExchange access.",
  "vendorLowerPlans": "Starter Suite is available from A$35 per user/month with monthly or annual billing and may be sufficient for simpler requirements. Free Suite supports two users.",
  "costCaution": "Feature bundles differ. Setup, taxes, usage and optional services are separate.",
  "additionalTools": [],
  "vendorEntryScope": "CRM, service and email marketing.",
  "vendorScope": "Opportunity management, quoting, forecasting, enhanced web chat, customisation and AppExchange access alongside bundled CRM, service and marketing.",
  "offerScope": "CRM, shared inbox, forms, bookings, quotes and automated follow-ups. Usage is separate.",
  "recurringExamples": [],
  "costExamples": {
    "title": "See annual subscription comparisons",
    "introduction": "Twelve months of the named software subscriptions. Setup, usage and optional services are disclosed separately.",
    "columns": [
      "Salesforce Pro Suite",
      "Zapla Follow-Through"
    ],
    "rows": [
      {
        "label": "1 user",
        "values": [
          1680,
          4788
        ]
      },
      {
        "label": "3 users",
        "values": [
          5040,
          4788
        ]
      },
      {
        "label": "5 users",
        "values": [
          8400,
          4788
        ]
      },
      {
        "label": "10 users",
        "values": [
          16800,
          4788
        ]
      },
      {
        "label": "20 users",
        "values": [
          33600,
          4788
        ]
      }
    ],
    "note": "Salesforce totals use annual billing. Zapla totals use twelve monthly payments. All figures exclude applicable taxes, setup, usage and optional services. Required Zapla Guided Launch starts at A$1,997 + GST separately. Feature bundles differ.",
    "caption": "AUD annual software subscriptions. Taxes, setup and usage excluded."
  },
  "launch": {
    "headline": "Get your first setup working.",
    "introduction": "Guided Launch turns the software into an agreed setup for your business. It is required and priced separately from the subscription.",
    "steps": [
      {
        "title": "Agree the process",
        "description": "Choose the enquiries, quotes or bookings to follow up and agree what moves from your current tools."
      },
      {
        "title": "Build and connect",
        "description": "Initial scope includes up to 5,000 clean contacts, two pipelines, three forms, two calendars and three agreed follow-through automations."
      },
      {
        "title": "Test and train",
        "description": "Test the agreed setup, complete one team training session and take the first version live. These quantities describe implementation work, not software capacity. Your scope and price are confirmed before you commit."
      }
    ],
    "note": "Your scope and price are confirmed before you commit."
  },
  "foundationNote": "",
  "methodology": "This comparison uses Salesforce Pro Suite and Zapla Follow-Through throughout. Salesforce figures use published AUD annual list pricing; Zapla uses monthly subscription pricing. Taxes, launch, usage and optional services are separate. Growth marketing and AI Receptionist are separate from Follow-Through. Feature cells describe the named package inclusion, not complete product equivalence. Crosses do not mean an outcome is technically impossible. Integration and messaging requirements depend on the selected product and provider.",
  "fit": [
    {
      "title": "Sales management and a wider app ecosystem",
      "description": "Salesforce Pro Suite suits businesses that prioritise sales forecasting, customisation and the Salesforce app ecosystem.",
      "consideration": "Pro includes sales, service and marketing tools, with their own allowances."
    },
    {
      "title": "One system for your customer-facing team",
      "description": "Choose Zapla when reception, sales and the owner need customer conversations, quotes, bookings and follow-ups in one place, with an agreed initial setup built and tested with your team.",
      "consideration": "Unlimited users keep the software subscription steady as more people join."
    }
  ],
  "rows": [
    {
      "id": "users",
      "label": "Unlimited users",
      "zapla": {
        "text": "",
        "detail": "Unlimited users are included in Zapla Follow-Through and Growth.",
        "status": "included",
        "sources": [
          "offer",
          "platform"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "Paid users",
        "detail": "Each person modelled here receives a paid Pro Suite licence.",
        "status": "separate",
        "sources": [
          "pricing"
        ],
        "mark": "cross"
      }
    },
    {
      "id": "sms",
      "label": "Two-way SMS",
      "zapla": {
        "text": "Included¹",
        "detail": "Two-way SMS tools are included in Follow-Through. Phone numbers and message usage are separate. Bulk campaigns require Growth.",
        "status": "included",
        "sources": [
          "offer",
          "inbox"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "Separate product",
        "detail": "Native SMS messaging sits outside Pro Suite. Salesforce’s messaging products require eligible editions and additional channel entitlements. Connected apps can offer other routes; their terms vary.",
        "status": "separate",
        "sources": [
          "messaging"
        ],
        "mark": "cross"
      }
    },
    {
      "id": "whatsapp",
      "label": "Connected WhatsApp numbers",
      "zapla": {
        "text": "8",
        "detail": "Eight connected WhatsApp numbers and unlimited WhatsApp contacts are included, with no separate contact-band fee. Messaging usage is extra. Bulk campaigns require Growth.",
        "status": "included",
        "sources": [
          "offer",
          "inbox"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "Separate product",
        "detail": "Native WhatsApp messaging is outside Pro Suite and has separate product, edition and messaging requirements.",
        "status": "separate",
        "sources": [
          "messaging"
        ],
        "mark": "cross"
      }
    },
    {
      "id": "contract",
      "label": "Month-to-month subscription",
      "zapla": {
        "text": "",
        "mark": "tick",
        "status": "included",
        "detail": "Standard Zapla subscriptions are month-to-month after launch. Required Guided Launch is separate.",
        "sources": [
          "offer"
        ]
      },
      "competitor": {
        "text": "",
        "mark": "cross",
        "status": "plan-dependent",
        "detail": "Pro Suite requires an annual contract and is billed annually. A monthly equivalent is not a month-to-month subscription.",
        "sources": [
          "pricing",
          "terms"
        ]
      }
    },
    {
      "id": "workflows",
      "label": "Automation workflows",
      "zapla": {
        "text": "Unlimited",
        "detail": "Unlimited workflow count is included. This does not mean unlimited executions, messages or implementation work.",
        "status": "included",
        "sources": [
          "offer",
          "platform"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "Limits apply",
        "detail": "Pro includes automation. Custom flows, marketing flows and integration runs have separate allowances.",
        "status": "included",
        "sources": [
          "flows",
          "marketing",
          "connections"
        ],
        "mark": "tick"
      }
    },
    {
      "id": "email",
      "label": "Shared email inbox",
      "zapla": {
        "text": "",
        "detail": "Connected email conversations can be managed in the shared inbox alongside supported messaging channels.",
        "status": "included",
        "sources": [
          "offer",
          "inbox"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "Email-to-case",
        "detail": "Pro includes email-to-case routing and case management, so incoming support emails can be assigned and handled by the team. This credits that included capability without treating it as an identical shared email inbox.",
        "status": "included",
        "sources": [
          "features",
          "pro"
        ]
      }
    },
    {
      "id": "quotes",
      "label": "Quotes & proposals",
      "zapla": {
        "text": "",
        "detail": "Quote and proposal tools are included.",
        "status": "included",
        "sources": [
          "offer",
          "platform"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "Quotes included",
        "detail": "Pro includes quote creation and management. Proposal design, electronic signatures and advanced CPQ have different product requirements; identical document functionality is not implied.",
        "status": "included",
        "sources": [
          "features",
          "pro"
        ],
        "mark": "tick"
      }
    },
    {
      "id": "forms",
      "label": "Forms",
      "zapla": {
        "text": "",
        "detail": "Forms and surveys are included. Guided Launch covers the agreed initial forms.",
        "status": "included",
        "sources": [
          "offer",
          "platform"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "",
        "detail": "Pro includes forms and landing pages.",
        "status": "included",
        "sources": [
          "features"
        ],
        "mark": "tick"
      }
    },
    {
      "id": "chat",
      "label": "Web chat",
      "zapla": {
        "text": "",
        "detail": "Website chat is included; initial configuration is agreed during launch.",
        "status": "included",
        "sources": [
          "offer",
          "inbox"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "",
        "detail": "Pro includes in-app and web messaging.",
        "status": "included",
        "sources": [
          "features"
        ],
        "mark": "tick"
      }
    },
    {
      "id": "contacts",
      "label": "Unlimited contacts",
      "zapla": {
        "text": "",
        "detail": "Unlimited stored contacts are subject to fair use. Sending and usage are separate.",
        "status": "included",
        "sources": [
          "offer",
          "platform"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "Storage limits",
        "detail": "CRM storage and marketing allowances are separate. The published Pro data-storage allocation is 10 GB per organisation.",
        "status": "included",
        "sources": [
          "sales",
          "marketing"
        ]
      }
    }
  ],
  "growthRows": [
    {
      "id": "marketing",
      "label": "Email campaigns",
      "zapla": {
        "text": "",
        "detail": "Email campaign tools require Growth; sending usage is separate.",
        "status": "included",
        "sources": [
          "offer",
          "platform"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "2,000 sends/month",
        "detail": "Pro includes 2,000 marketing email sends per month across the account. Additional sends are purchased separately.",
        "status": "included",
        "sources": [
          "marketing"
        ],
        "mark": "tick"
      }
    },
    {
      "id": "social",
      "label": "Social scheduling",
      "zapla": {
        "text": "",
        "detail": "Social scheduling is included in Growth for supported connected channels.",
        "status": "included",
        "sources": [
          "offer",
          "platform"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "LinkedIn publishing",
        "detail": "LinkedIn publishing is supported.",
        "status": "included",
        "sources": [
          "social",
          "pro"
        ],
        "mark": "tick"
      }
    }
  ],
  "optionalRows": [],
  "showMarketingNote": true,
  "marketingNote": "Salesforce Pro Suite already includes email marketing, segmentation and campaign analytics. It also supports LinkedIn publishing. Growth and Pro Suite have different channel coverage and allowances.",
  "offer": {
    "monthly": 399,
    "launch": 1997,
    "growthMonthly": 699,
    "growthLaunch": 2997,
    "unlimitedUsers": true,
    "unlimitedContacts": true,
    "trial": false
  },
  "foundations": [],
  "faqs": [
    {
      "question": "Why compare with Pro Suite rather than Starter?",
      "answer": "Pro adds quoting, forecasting, enhanced web chat, customisation and AppExchange access. Starter already includes useful CRM, service and email marketing tools at a lower price. Choose the package that fits the work you need to do."
    },
    {
      "question": "When is Zapla’s subscription lower?",
      "answer": "From three paid Pro Suite users at the published list rate. Five users cost A$700/month equivalent with Salesforce, billed A$8,400 annually. Follow-Through costs A$399/month + GST with unlimited users. Required Zapla Guided Launch is separate, so this is a subscription comparison, not a first-year total-cost claim. Salesforce Starter and smaller Pro teams can cost less."
    },
    {
      "question": "Does Salesforce already include marketing?",
      "answer": "Yes. Pro includes email campaigns, segmentation and campaign analytics, with sending allowances. Zapla’s marketing tools are in Growth at A$699/month + GST total, with required Guided Launch from A$2,997 + GST. Sending usage is separate."
    },
    {
      "question": "What can increase the Salesforce price?",
      "answer": "More paid users increase the subscription. Optional Premier support, API access, extra marketing email capacity and connected apps can also add cost when needed. Standard support is included; Premier is priced at 30% of net licence fees. At the published list rate, five Pro users plus Premier would be A$910/month equivalent before tax, subject to the order. These optional extras are not added to the calculator."
    },
    {
      "question": "Does the calculator include setup and usage?",
      "answer": "No. It compares software subscriptions for the named plans. Required Zapla Guided Launch starts at A$1,997 + GST separately. Communications usage, optional services and any separately purchased implementation work are additional."
    },
    {
      "question": "Can I move from Salesforce and keep my existing tools?",
      "answer": "We agree which data to move, which tools to keep and which workflows to rebuild before you commit. Guided Launch covers the agreed initial import, configuration, testing and team training. Existing automations, conversation history and integrations are assessed individually, with scope and price agreed before work starts."
    },
    {
      "question": "Is AI Receptionist included?",
      "answer": "No. AI Receptionist is optional on either Zapla plan, at A$199/month + GST with setup from A$997 + GST. Voice and communications usage are separate. Its scope is agreed before you commit."
    }
  ],
  "sources": [
    {
      "id": "pricing",
      "title": "Salesforce Australian suite pricing",
      "url": "https://www.salesforce.com/au/small-business/pricing/"
    },
    {
      "id": "sales",
      "title": "Salesforce sales editions and storage",
      "url": "https://www.salesforce.com/au/sales/pricing/"
    },
    {
      "id": "features",
      "title": "Salesforce suite feature comparison",
      "url": "https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/small-business/comparison-chart-starter-prosuite-features-us.pdf"
    },
    {
      "id": "pro",
      "title": "Salesforce Pro Suite capabilities",
      "url": "https://www.salesforce.com/au/small-business/pro-suite/"
    },
    {
      "id": "marketing",
      "title": "Salesforce marketing allowances",
      "url": "https://help.salesforce.com/s/articleView?id=xcloud.starter_marketing_considerations.htm&language=en_US&type=5"
    },
    {
      "id": "flows",
      "title": "Salesforce Pro Suite allocations",
      "url": "https://help.salesforce.com/s/articleView?id=overview_limits_pro_suite.htm&language=en_US&type=5"
    },
    {
      "id": "connections",
      "title": "Salesforce included app connections",
      "url": "https://help.salesforce.com/s/articleView?id=xcloud.connect_external_apps.htm&language=en_US&type=5"
    },
    {
      "id": "messaging",
      "title": "Salesforce messaging editions and channel entitlements",
      "url": "https://help.salesforce.com/s/articleView?id=service.messaging_editions.htm&language=en_US&type=5"
    },
    {
      "id": "social",
      "title": "Salesforce LinkedIn publishing",
      "url": "https://help.salesforce.com/s/articleView?id=mktg.mktg_content_linkedin_social_posting.htm&language=en_US&type=5"
    },
    {
      "id": "terms",
      "title": "Salesforce subscription agreement",
      "url": "https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/legal/salesforce_MSA.pdf"
    },
    {
      "id": "platform",
      "title": "NextGen platform inclusions",
      "url": "https://thenextgencrm.com/pricing/"
    },
    {
      "id": "inbox",
      "title": "NextGen shared inbox",
      "url": "https://thenextgencrm.com/features/inbox/"
    },
    {
      "id": "phone",
      "title": "NextGen phone capabilities",
      "url": "https://thenextgencrm.com/features/phone/"
    },
    {
      "id": "offer",
      "title": "Zapla current plans and Guided Launch",
      "url": "/Pricing-v3"
    },
    {
      "id": "support",
      "title": "Salesforce Success Plans pricing",
      "url": "https://www.salesforce.com/services/pricing/"
    }
  ],
  "updated": "20 October 2026",
  "pricingUrl": "/Pricing-v3"
} as const satisfies ComparisonDefinition;
