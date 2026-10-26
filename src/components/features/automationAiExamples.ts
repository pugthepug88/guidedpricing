export type AutomationStep = {
  kind: "trigger" | "email" | "sms" | "wait" | "call" | "slack";
  title: string;
  detail?: string;
};

export type AutomationExample = {
  id: string;
  label: string;
  description: string;
  request: string;
  scope: string;
  steps: AutomationStep[];
};

// Prepared configurations based on the inspected trigger, wait and action
// catalogue. These are explanations, not saved recipes or live AI executions.
export const automationAiExamples: AutomationExample[] = [
  {
    id: "nurture",
    label: "Automate a 7 day nurture",
    description: "Keep new enquiries moving through their first week.",
    request:
      "Build a 7 day nurture for new form enquiries. Welcome them now, share useful information on day 2, invite them to book on day 5, then check in on day 7.",
    scope: "Choose your enquiry form, follow-up audience and email sender.",
    steps: [
      {
        kind: "trigger",
        title: "New enquiry form submitted",
        detail: "Your selected form",
      },
      {
        kind: "email",
        title: "Send a welcome email",
        detail: "Day 0",
      },
      {
        kind: "wait",
        title: "Wait 2 days",
      },
      {
        kind: "email",
        title: "Share useful information",
        detail: "Day 2",
      },
      {
        kind: "wait",
        title: "Wait 3 days",
      },
      {
        kind: "email",
        title: "Send a booking invitation",
        detail: "Day 5",
      },
      {
        kind: "wait",
        title: "Wait 2 days",
      },
      {
        kind: "email",
        title: "Send a final check-in",
        detail: "Day 7",
      },
    ],
  },
  {
    id: "reactivation",
    label: "Re-engage inactive customers",
    description: "Give a quiet customer relationship a new conversation.",
    request:
      "When a customer joins our Inactive customers list, email a check-in. Wait 3 days, then send an invitation to get back in touch.",
    scope: "Your Smart List defines which customers count as inactive.",
    steps: [
      {
        kind: "trigger",
        title: "Customer joins inactive list",
        detail: "Your configured Smart List",
      },
      {
        kind: "email",
        title: "Send a personal check-in",
        detail: "Reopen the conversation",
      },
      {
        kind: "wait",
        title: "Wait 3 days",
      },
      {
        kind: "email",
        title: "Invite them to reconnect",
        detail: "Your message and next step",
      },
    ],
  },
  {
    id: "invoices",
    label: "Follow up overdue invoices",
    description: "Put payment follow-up in motion when an invoice becomes overdue.",
    request:
      "When my billing system reports an overdue invoice, email its payment link to the customer and let our finance team know in Slack.",
    scope:
      "A configured billing webhook supplies the overdue event and payment link. Connect Slack for the team message.",
    steps: [
      {
        kind: "trigger",
        title: "Billing reports overdue invoice",
        detail: "Configured inbound webhook",
      },
      {
        kind: "email",
        title: "Send the payment reminder",
        detail: "Use the supplied payment link",
      },
      {
        kind: "slack",
        title: "Let finance know in Slack",
        detail: "Your connected team channel",
      },
    ],
  },
  {
    id: "onboarding",
    label: "Welcome new customers",
    description: "Help a new customer get started with clear next steps.",
    request:
      "When a contact gets the New customer tag, email a welcome. Send getting-started information 2 days later, then check in after another 5 days.",
    scope: "Starts when your team or an agreed process adds the New customer tag.",
    steps: [
      {
        kind: "trigger",
        title: "New customer tag added",
        detail: "Customer entry rule",
      },
      {
        kind: "email",
        title: "Send the welcome email",
        detail: "Introduce the next steps",
      },
      {
        kind: "wait",
        title: "Wait 2 days",
      },
      {
        kind: "email",
        title: "Send getting-started information",
        detail: "Help them use what they bought",
      },
      {
        kind: "wait",
        title: "Wait 5 days",
      },
      {
        kind: "email",
        title: "Check how they’re getting on",
        detail: "Invite a question",
      },
    ],
  },
  {
    id: "flash-sale",
    label: "Create a flash sale campaign",
    description: "Announce an offer and give your audience a timely reminder.",
    request:
      "Start a 24 hour flash sale for selected customers. Email the offer now, then send a final reminder 20 hours later.",
    scope: "You choose the audience, offer and sale timing before starting the workflow.",
    steps: [
      {
        kind: "trigger",
        title: "Start for the sale audience",
        detail: "Selected contacts, started by you",
      },
      {
        kind: "email",
        title: "Announce the offer",
        detail: "Your offer and sale link",
      },
      {
        kind: "wait",
        title: "Wait 20 hours",
      },
      {
        kind: "email",
        title: "Send a final reminder",
        detail: "Before the agreed sale ends",
      },
    ],
  },
  {
    id: "vip-sale",
    label: "Create a VIP sales campaign",
    description: "Give selected customers early access to your offer.",
    request:
      "Start a campaign for selected VIP customers. Email them early access to our offer, wait 1 day, then send an SMS reminder.",
    scope: "You choose who qualifies as VIP, the offer and the connected senders.",
    steps: [
      {
        kind: "trigger",
        title: "Start for selected VIP customers",
        detail: "Your chosen audience",
      },
      {
        kind: "email",
        title: "Send early access",
        detail: "Your offer and link",
      },
      {
        kind: "wait",
        title: "Wait 1 day",
      },
      {
        kind: "sms",
        title: "Send the SMS reminder",
        detail: "Invite them to use the offer",
      },
    ],
  },
  {
    id: "ai-call",
    label: "Follow up leads with an AI call",
    description: "Connect a requested callback to your configured AI voice agent.",
    request:
      "When a lead gets the Callback requested tag, wait 10 minutes, then have our configured AI voice agent call them about their enquiry.",
    scope:
      "For leads who requested a callback. Requires an AI voice agent, calling number and destination phone field.",
    steps: [
      {
        kind: "trigger",
        title: "Callback requested tag added",
        detail: "The lead has asked for a call",
      },
      {
        kind: "wait",
        title: "Wait 10 minutes",
      },
      {
        kind: "call",
        title: "Start the AI outbound call",
        detail: "Your voice agent and caller ID",
      },
    ],
  },
  {
    id: "appointments",
    label: "Confirm appointments and send reminders",
    description: "Keep the customer informed before their appointment.",
    request:
      "For confirmed appointments in our selected calendar, email the booking details. Send SMS reminders 1 day before and again 1 hour before the appointment.",
    scope: "Uses your selected calendar, booking status and appointment time.",
    steps: [
      {
        kind: "trigger",
        title: "Confirmed appointment booked",
        detail: "Your selected calendar and status",
      },
      {
        kind: "email",
        title: "Send the confirmation email",
        detail: "Include the booking details",
      },
      {
        kind: "wait",
        title: "Wait until 1 day before",
      },
      {
        kind: "sms",
        title: "Send the first reminder",
        detail: "Appointment details by SMS",
      },
      {
        kind: "wait",
        title: "Wait until 1 hour before",
      },
      {
        kind: "sms",
        title: "Send the final reminder",
        detail: "Before the appointment",
      },
    ],
  },
];
