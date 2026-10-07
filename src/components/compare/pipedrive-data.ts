export const sources = [
  { title: "Pipedrive plan features", url: "https://support.pipedrive.com/en/article/what-features-do-the-pipedrive-plans-have", date: "Last updated 3 Sep 2026. Checked 7 Oct 2026." },
  { title: "LeadBooster add-on", url: "https://support.pipedrive.com/en/article/leadbooster-add-on", date: "Checked 7 Oct 2026." },
  { title: "How Pipedrive pricing works", url: "https://support.pipedrive.com/en/article/how-does-pricing-work-in-pipedrive", date: "Checked 7 Oct 2026." },
  { title: "Pipedrive email sync", url: "https://support.pipedrive.com/en/article/email-sync", date: "Researched 28 Sep 2026." },
  { title: "Pipedrive usage limits", url: "https://support.pipedrive.com/en/article/usage-limits-in-pipedrive", date: "Researched 28 Sep 2026." },
  { title: "Making calls in Pipedrive", url: "https://support.pipedrive.com/en/article/how-can-i-make-calls-in-pipedrive", date: "Researched 28 Sep 2026." },
  { title: "Mobile calling and call logging", url: "https://support.pipedrive.com/en/article/calling-and-logging-calls-in-the-mobile-app", date: "Researched 28 Sep 2026." },
  { title: "Exporting data from Pipedrive", url: "https://support.pipedrive.com/en/article/exporting-data-from-pipedrive", date: "Researched 28 Sep 2026." },
  { title: "Current Pipedrive pricing", url: "https://www.pipedrive.com/en/pricing", date: "Live vendor pricing. Australian checkout amount, currency and GST not verified." },
  { title: "Current Zapla plan packaging", url: "/Pricing-v3", date: "Pricing implementation read 7 Oct 2026." },
  { title: "TNZ SMS Marketplace example", url: "https://www.pipedrive.com/en/marketplace/app/tnz-sms-send-sms-to-nz-au/6c18dc3c92b4432e", date: "External SMS provider example, researched 28 Sep 2026." },
];

export const capabilityRows = [
  { name: "CRM and pipeline", pipedrive: "People, organisations, deals and pipelines are available across plans.", pRefs: [1], zapla: "Customer records and pipelines are included. This is not a claim of organisation-object parity.", zRefs: [10] },
  { name: "Email and follow-up", pipedrive: "Growth and above include email sync, sequences and automations, subject to tier and usage limits.", pRefs: [1, 4, 5], zapla: "Inbox and scoped follow-through automations are included. Confirm your email connection requirements; exact sync parity is not assumed.", zRefs: [10] },
  { name: "Forms and intake", pipedrive: "Native web intake uses LeadBooster, paid on Growth and included on Premium and Ultimate. An existing external form may avoid it.", pRefs: [1, 2], zapla: "Forms and surveys are included, with the first agreed forms built within Guided Launch scope.", zRefs: [10] },
  { name: "Booking", pipedrive: "The meeting scheduler is included on Growth and above.", pRefs: [1], zapla: "Calendars and online booking are included. Agree the booking rules and connections in your setup.", zRefs: [10] },
  { name: "Team subscription", pipedrive: "Subscription cost follows the number of paid seats and the selected plan and billing period.", pRefs: [3], zapla: "Both standard plans include unlimited users. Communications and implementation are separate.", zRefs: [10] },
  { name: "SMS and business calling", pipedrive: "Reviewed business calling and SMS routes use external providers. Native mobile calling and logging are a distinct capability.", pRefs: [6, 7, 11], zapla: "Phone dialer and communications platform access are included. Number provisioning and telecom charges must be confirmed in scope.", zRefs: [10] },
  { name: "Mobile, integrations and reporting", pipedrive: "Native iOS and Android apps, Marketplace integrations and tier-dependent Insights are documented strengths.", pRefs: [1, 5], zapla: "Check your particular mobile, integration and reporting requirements. No app, API or reporting parity is promised here.", zRefs: [10] },
  { name: "Ongoing campaigns", pipedrive: "Campaigns is a separate add-on. Check the selected campaign setup and associated charges.", pRefs: [1, 9], zapla: "Growth commercially includes ongoing marketing and database reactivation. Verify required campaign and consent behaviour; suite equivalence is not assumed.", zRefs: [10] },
];

export const workflows = [
  { id: "enquiry", title: "Follow an enquiry", intro: "From the first enquiry to a useful next action.", steps: [
    { name: "Capture", p: "Use LeadBooster web intake or your existing form and its agreed connection.", z: "Use an included form or agreed intake channel.", confirm: "Exact form-to-deal creation" },
    { name: "Record", p: "Store the contact and deal using the configured fields.", z: "Use the included customer record and pipeline.", confirm: "Field mapping and record creation" },
    { name: "Owner", p: "Assign the owner manually or use the selected tier's assignment capability. Premium adds automatic assignment.", z: "Agree who is responsible and how the enquiry is routed.", confirm: "Deal-owner rules" },
    { name: "Follow-up", p: "Configure Growth sequences or automations within their limits; the owner remains responsible for exceptions.", z: "Build the agreed follow-through automation within launch scope.", confirm: "Triggers, timing and conditions" },
    { name: "Response", p: "The owner reviews the response and continues the conversation. Validate how the chosen sequence handles replies.", z: "The team handles the reply in the inbox. Validate when further messages stop.", confirm: "Response suppression" },
    { name: "Booking", p: "Use the Growth scheduler, then confirm the appointment and update the deal as required.", z: "Use an included calendar and agreed booking flow.", confirm: "Booking-to-stage changes" },
    { name: "Next action", p: "The owner updates the stage or activity, with configured automation where appropriate.", z: "Agree the next task, stage or handoff for the team.", confirm: "Next-action ownership" },
  ] },
  { id: "quote", title: "Revisit a cold quote", intro: "A configured reminder, not a guaranteed recovery.", steps: [
    { name: "Inactivity or stage", p: "Define the relevant deal stage or inactivity condition in the selected automation setup.", z: "Agree which cold quote or stage should receive follow-up.", confirm: "Eligibility and timing rules" },
    { name: "Configured follow-up", p: "Use Growth email follow-up or automations within tier limits; keep the owner involved.", z: "Use a scoped quote follow-through automation, not an ongoing marketing campaign by default.", confirm: "Message, consent and trigger conditions" },
    { name: "Task or escalation", p: "Configure an activity or have the owner create the next task when attention is needed.", z: "Agree the task or team handoff when a quote needs attention.", confirm: "Escalation and owner rules" },
    { name: "Response", p: "The owner reviews the reply and checks whether scheduled outreach should stop.", z: "The team handles the inbox response and validates further-message suppression.", confirm: "Response suppression" },
    { name: "Next action", p: "The owner updates the deal, books the next discussion or closes the opportunity as appropriate.", z: "Agree the next booking, task or pipeline change based on the response.", confirm: "Booking-to-stage and next-action rules" },
  ] },
];

export const faqs = [
  { q: "Why compare Pipedrive Growth with Zapla Follow-Through?", a: "Growth combines documented email sync, sequences, automation and scheduling. That makes it a useful setup baseline, not the minimum plan every CRM buyer needs. If you mainly manage contacts and deals manually, check Lite too. Zapla Growth is a different buying step, for ongoing reactivation and marketing.", refs: [1, 10] },
  { q: "Will I need LeadBooster with Pipedrive?", a: "If you want Pipedrive's native web intake on Growth, LeadBooster is a paid add-on. It is included on Premium and Ultimate, so price-check those configurations too. Keeping an existing external form may avoid LeadBooster, but its connection still needs checking.", refs: [1, 2] },
  { q: "Does Zapla charge for each user?", a: "No. Both standard Zapla plans include unlimited users. Pipedrive uses paid seats. This difference does not establish which whole setup costs less, because plan choices, launch, add-ons and usage also matter.", refs: [3, 10] },
  { q: "When would I need Zapla Growth?", a: "When ongoing database reactivation, repeat campaigns or proactive marketing are part of the requirement. Follow-Through covers the agreed setup around incoming enquiries, quotes and bookings. Check campaign and consent behaviour for the specific work you want to run.", refs: [10] },
  { q: "What should I budget beyond the subscription?", a: "For Zapla, budget for required Guided Launch, communications usage and any optional services or custom work. For Pipedrive, check paid seats, billing period, LeadBooster or other add-ons, provider charges and any implementation help you choose. Australian Pipedrive checkout pricing and GST remain unverified here.", refs: [2, 3, 9, 10] },
  { q: "Can my existing Pipedrive data be moved?", a: "Start with export options and a sample import. Contacts, deals, activities, notes and relationships need object-by-object validation. Email history and attachments may need a retained archive. Exportability does not establish that the destination can import everything, and this comparison does not promise a full automatic migration.", refs: [8, 10] },
  { q: "Do I have to replace my website or specialist tools?", a: "Not necessarily. Your website, numbers and specialist software may stay, subject to the agreed connections. Keep clinical records, loan origination, property management, accounting, dispatch and job costing tools where required. This comparison concerns enquiries and customer coordination, not regulatory compliance or specialist-tool replacement.", refs: [10] },
  { q: "Is there a Zapla free trial?", a: "No standard free trial is currently defined in the Zapla offer. Book a Call to discuss the requirement, plan and launch scope before deciding. Both standard plans are month-to-month after launch, with no early termination fee.", refs: [10] },
];