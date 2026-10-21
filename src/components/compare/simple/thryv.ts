import type { ComparisonDefinition } from './types';

export const thryvComparison = {
  "competitor": "Thryv",
  "headline": "Your whole team.",
  "headlineAccent": "One CRM subscription.",
  "introduction": "Give reception, sales and the owner one place for enquiries, two-way SMS, quotes, bookings and automated follow-ups. A$399/month + GST, with unlimited users and no extra seat fees.",
  "highlights": [
    {
      "title": "Turn a missed call into a conversation.",
      "description": "When you cannot answer, Zapla sends a text so the caller can reply. Your team can pick up the conversation and book the next step."
    },
    {
      "title": "Add people without adding seat fees.",
      "description": "Give reception, sales and the owner their own access. Your Zapla subscription stays the same as your team grows."
    },
    {
      "title": "Keep customer work in one place.",
      "description": "CRM & pipelines, a shared inbox, quotes, invoices and a support ticketing system are included. Give each customer issue an owner and track it through to resolution."
    }
  ],
  "tableIntroduction": "Zapla Follow-Through versus Thryv Signature. Compare missed-call recovery, customer follow-up, reporting and the tools your team uses every day.",
  "tableCaption": "Thryv Signature compared with Zapla Follow-Through.",
  "vendorPricingUrl": "https://www.thryv.com.au/pricing/",
  "vendorPlan": "Signature",
  "vendorEntryPrice": 99,
  "vendorEntryPlan": "Starter",
  "vendorPrice": 560,
  "vendorAnnualPrice": 476,
  "vendorPriceUnit": "AUD per month, excluding GST",
  "vendorBilling": "Six-month initial term on monthly billing. Annual option has a twelve-month initial term.",
  "workflowNote": "",
  "pricingHeading": "One team price. Follow-up tools included.",
  "pricingIntroduction": "Compare Zapla Follow-Through with Thryv Signature’s published monthly subscription.",
  "pricingHeadline": "One team price. Follow-up tools included.",
  "vendorPlanReason": "Signature is the broader advertised website and marketing offer.",
  "vendorLowerPlans": "Starter is a lower-priced option for basic online visibility.",
  "costCaution": "Subscription differences are not total-cost savings.",
  "additionalTools": [],
  "vendorEntryScope": "Basic online visibility.",
  "vendorScope": "Signature’s Australian advertised package. No Business Center, Keap or advertising subscriptions added.",
  "offerScope": "Customer follow-up tools with separately priced Guided Launch.",
  "recurringExamples": [],
  "costExamples": {
    "title": "Subscription totals & plan details",
    "introduction": "Twelve months of the named software subscriptions. Setup, usage and optional services are additional.",
    "teamHeading": "Subscription",
    "columns": [
      "Zapla Follow-Through",
      "Thryv Signature"
    ],
    "rows": [
      {
        "label": "12 monthly payments",
        "values": [
          4788,
          6720
        ]
      },
      {
        "label": "With Signature’s annual option",
        "values": [
          4788,
          5712
        ]
      }
    ],
    "caption": "AUD subscription totals, excluding GST, setup and usage.",
    "note": "Signature’s annual option displays A$476/month equivalent, or A$5,712 for twelve months, with a twelve-month initial term. Payment timing is set out in the order. Zapla is A$161/month lower than monthly Signature or A$77/month lower than its annual equivalent. These are subscription differences, not total-cost savings. Zapla Guided Launch is required and additional, from A$1,997 + GST. Thryv’s current pricing page advertises free onboarding. Custom implementation and optional services should be assessed separately. Thryv’s Australian terms provide for annual renewal after the initial period, with cancellation of a renewed period on thirty days’ written notice and a refund of unused prepaid fees."
  },
  "launch": {
    "headline": "Get your first setup working.",
    "introduction": "Guided Launch turns the software into an agreed setup for your business. It is required and priced separately from the subscription.",
    "steps": [
      {
        "title": "Agree the process",
        "description": "Choose the enquiries, quotes or bookings to follow up, and agree what moves from your current tools."
      },
      {
        "title": "Build and connect",
        "description": "Configure the agreed CRM, inbox, forms, calendars and first follow-up automations. Follow-Through’s standard launch scope includes up to 5,000 clean contacts, two pipelines, three forms, two calendars and three automations."
      },
      {
        "title": "Test and train",
        "description": "Test the agreed setup, run one training session and take the first version live. These quantities describe implementation work, not software capacity."
      }
    ],
    "note": "Your launch scope and price are confirmed before you commit."
  },
  "foundationNote": "",
  "methodology": "This comparison uses Thryv Signature’s Australian published offer and Zapla’s current plans. Subscription totals exclude setup, usage and optional services. Features and service scopes differ. Business Center, Keap and advertising services are not added to Signature’s subscription. Starter is a cheaper alternative for basic online visibility.",
  "fit": [
    {
      "title": "Build your online presence.",
      "description": "Signature suits businesses prioritising directory visibility, social publishing, reviews and a professionally designed website.",
      "consideration": ""
    },
    {
      "title": "Bring customer follow-up together.",
      "description": "Choose Zapla to recover missed calls, bring enquiries, quotes and bookings together, and configure the next follow-up for your team.",
      "consideration": ""
    }
  ],
  "rows": [
    {
      "id": "missed-call",
      "label": "Missed-call text-back",
      "zapla": {
        "text": "Included¹",
        "detail": "Automatically send a text when your business misses a call. Phone numbers and messaging usage are separate.",
        "status": "included",
        "sources": [
          "offer"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "",
        "detail": "Thryv’s published HighLevel comparison marks missed-call text-back as unavailable. The table is dated 9 October 2025. Call tracking and incoming-call notifications are different capabilities.",
        "status": "documented",
        "sources": [
          "highlevel-comparison"
        ],
        "mark": "cross"
      }
    },
    {
      "id": "workflows",
      "label": "Automation workflows",
      "zapla": {
        "text": "Unlimited",
        "detail": "Zapla includes configurable workflows for customer follow-up. Unlimited refers to workflow count; sending, executions and setup are separate considerations.",
        "status": "included",
        "sources": [
          "offer",
          "workflows"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "Marketing automations",
        "detail": "Thryv advertises workflow automation across its product family. Its Lead Flow documentation connects configurable lead-follow-up workflows to Keap. No additional Keap subscription is included in the price shown.",
        "status": "documented",
        "sources": [
          "features",
          "leadflow",
          "highlevel-comparison"
        ]
      }
    },
    {
      "id": "forms",
      "label": "Forms",
      "zapla": {
        "text": "",
        "detail": "Forms connect to customer records and follow-up workflows.",
        "status": "included",
        "sources": [
          "offer"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "",
        "detail": "Thryv’s professional website offering includes forms. This does not imply identical form logic or workflow capabilities.",
        "status": "included",
        "sources": [
          "website"
        ],
        "mark": "tick"
      }
    },
    {
      "id": "booking",
      "label": "Online booking",
      "zapla": {
        "text": "",
        "detail": "Booking tools connect to customer records.",
        "status": "included",
        "sources": [
          "offer"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "Website booking",
        "detail": "Thryv’s professional website offering includes online scheduling. This does not imply identical calendar-management capabilities.",
        "status": "included",
        "sources": [
          "website"
        ],
        "mark": "tick"
      }
    },
    {
      "id": "reviews",
      "label": "Review management",
      "zapla": {
        "text": "",
        "detail": "Review management is included in Follow-Through.",
        "status": "included",
        "sources": [
          "offer"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "",
        "detail": "Signature includes review-management tools and AI assistance for review responses.",
        "status": "included",
        "sources": [
          "pricing"
        ],
        "mark": "tick"
      }
    },
    {
      "id": "websites",
      "label": "Websites & funnels",
      "zapla": {
        "text": "",
        "detail": "Zapla includes self-service website and funnel builders. A website builder and a website design service are different inclusions.",
        "status": "included",
        "sources": [
          "offer"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "Website included",
        "detail": "Signature includes a professionally designed website. Thryv also advertises funnels and landing pages in its broader HighLevel comparison; the named Signature offer is credited here for its custom website.",
        "status": "documented",
        "sources": [
          "pricing",
          "website",
          "highlevel-comparison"
        ]
      }
    },
    {
      "id": "dashboards",
      "label": "Custom dashboards",
      "zapla": {
        "text": "",
        "detail": "Create dashboards for your team’s reporting. Bespoke reporting configuration is scoped separately from software access.",
        "status": "included",
        "sources": [
          "platform"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "",
        "detail": "Thryv’s published HubSpot comparison marks custom dashboards as unavailable. Signature includes digital performance and lead insights; those reports are not the same as custom dashboards. The comparison table is dated 9 October 2025.",
        "status": "documented",
        "sources": [
          "hubspot-comparison",
          "pricing"
        ],
        "mark": "cross"
      }
    },
    {
      "id": "commitment",
      "label": "Month-to-month subscription",
      "zapla": {
        "text": "",
        "detail": "Zapla is monthly after launch. Required Guided Launch is separately priced.",
        "status": "included",
        "sources": [
          "offer"
        ],
        "mark": "tick"
      },
      "competitor": {
        "text": "Six-month initial term",
        "detail": "Signature’s monthly option has a six-month initial term; its annual option has a twelve-month initial term.",
        "status": "documented",
        "sources": [
          "pricing",
          "terms"
        ],
        "mark": "cross"
      }
    }
  ],
  "growthRows": [
    {
      "id": "marketing",
      "label": "Marketing services",
      "zapla": {
        "text": "",
        "detail": "Growth adds campaign and social tools for A$699/month + GST in total, including Follow-Through. Signature’s online visibility tools and custom website are different from Zapla Growth’s campaign tools.",
        "status": "documented",
        "sources": [
          "offer"
        ]
      },
      "competitor": {
        "text": "",
        "detail": "Signature includes social scheduling. Advertising budgets and optional managed services are outside this comparison.",
        "status": "documented",
        "sources": [
          "pricing"
        ]
      }
    },
    {
      "id": "whatsapp",
      "label": "WhatsApp and communications",
      "zapla": {
        "text": "",
        "detail": "Zapla includes eight connected WhatsApp numbers and unlimited WhatsApp contacts without a separate contact-band fee. Messaging usage is extra. Bulk campaigns require Growth. Phone numbers, calling and other communications usage are separate.",
        "status": "documented",
        "sources": [
          "offer"
        ]
      },
      "competitor": {
        "text": "",
        "detail": "This comparison does not add a messaging or calling subscription to Signature’s price.",
        "status": "documented",
        "sources": [
          "pricing"
        ]
      }
    }
  ],
  "optionalRows": [],
  "showMarketingNote": true,
  "marketingNote": "Social scheduling is already included in Thryv Signature.",
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
      "question": "Which Thryv package is compared?",
      "answer": "Thryv Signature at its published Australian monthly price. The comparison does not add Business Center, Keap or advertising services."
    },
    {
      "question": "What happens when I miss a call?",
      "answer": "Zapla can automatically text the caller so they can reply while your team is busy. The conversation stays with the customer record for your team to follow up. Phone numbers and messaging usage are separate."
    },
    {
      "question": "Does Thryv also offer CRM, invoicing and automation?",
      "answer": "Yes. Thryv offers these capabilities across its product family. This page prices the Australian Signature package; it does not combine Business Center, Keap or other subscriptions into that price. Confirm the exact products and allowances in your Thryv order."
    },
    {
      "question": "Can my team manage customer support tickets?",
      "answer": "Yes. Follow-Through includes a support ticketing system to organise customer issues, assign responsibility and track progress. Configuration and automation are agreed as part of your launch scope."
    },
    {
      "question": "Is Zapla’s subscription cheaper?",
      "answer": "Follow-Through is A$399/month + GST. Its subscription is lower than Signature’s monthly and annual-equivalent rates. Required Zapla launch and differences in the included services mean this is not a claim of lower total cost."
    },
    {
      "question": "Does Thryv have a cheaper plan?",
      "answer": "Yes. Starter is a lower-priced option for basic online visibility. This page compares Signature’s broader website and marketing offer."
    },
    {
      "question": "Does Zapla include marketing?",
      "answer": "Growth adds campaign and social tools for A$699/month + GST in total, including Follow-Through. Signature already includes social scheduling. The packages provide different marketing capabilities."
    },
    {
      "question": "Can I keep my existing website?",
      "answer": "Yes. We can agree how Zapla’s forms, bookings and customer follow-up work alongside your current website."
    },
    {
      "question": "What happens to my existing customer data?",
      "answer": "We agree what to migrate, check the available export and confirm the scope and launch price before work starts."
    },
    {
      "question": "Is AI Receptionist included?",
      "answer": "No. It is optional at A$199/month + GST, with setup from A$997 + GST. Voice usage is priced separately."
    },
    {
      "question": "Am I locked into an annual Zapla contract?",
      "answer": "Follow-Through is monthly after launch. Required launch is separate from the subscription."
    }
  ],
  "sources": [
    {
      "id": "pricing",
      "title": "Thryv Australian Signature pricing",
      "url": "https://www.thryv.com.au/pricing/"
    },
    {
      "id": "website",
      "title": "Thryv professional website inclusions",
      "url": "https://www.thryv.com.au/features/professional-website/"
    },
    {
      "id": "features",
      "title": "Thryv marketing and AI features",
      "url": "https://www.thryv.com.au/features/"
    },
    {
      "id": "leadflow",
      "title": "Thryv and Keap lead-follow-up integration",
      "url": "https://learn.thryv.com/hc/en-us/articles/39805872558733-Capture-and-Nurture-High-Quality-Leads-with-ThryvAI-Lead-Flow"
    },
    {
      "id": "terms",
      "title": "Thryv terms, including Australian GST and renewal clauses",
      "url": "https://www.thryv.com/thryv-ba-terms/"
    },
    {
      "id": "workflows",
      "title": "NextGen workflow capabilities",
      "url": "https://thenextgencrm.com/features/workflows/"
    },
    {
      "id": "offer",
      "title": "Zapla current plans and Guided Launch",
      "url": "/Pricing-v3"
    },
    {
      "id": "highlevel-comparison",
      "title": "Thryv’s own HighLevel feature comparison",
      "url": "https://www.thryv.com.au/compare/highlevel-vs-thryv-software/"
    },
    {
      "id": "hubspot-comparison",
      "title": "Thryv’s own HubSpot feature comparison",
      "url": "https://www.thryv.com.au/compare/hubspot-vs-thryv-small-businesses/"
    },
    {
      "id": "platform",
      "title": "NextGen platform dashboards and core capabilities",
      "url": "https://thenextgencrm.com/pricing/"
    },
    {
      "id": "bc-inbox",
      "title": "Thryv Business Center client inbox",
      "url": "https://learn.thryv.com/hc/en-us/articles/360001653032-Manage-All-Your-Client-Messages-from-the-Thryv-Business-Center-Inbox"
    },
    {
      "id": "thryv-invoices",
      "title": "Thryv estimates and invoices",
      "url": "https://www.thryv.com.au/features/invoice-software/"
    },
    {
      "id": "nextgen-dpa",
      "title": "NextGen platform scope, including support records",
      "url": "https://thenextgencrm.com/dpa/"
    }
  ],
  "updated": "21 October 2026",
  "pricingUrl": "/Pricing-v3",
  "customerVisual": "missed-call"
} satisfies ComparisonDefinition;
