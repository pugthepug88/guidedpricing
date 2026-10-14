// Shared by the directory and navigation so names and destinations stay aligned.
type Industry = { name: string; href: string; image: string; alt: string; copy: string };
type IndustryGroup = { id: string; title: string; description: string; industries: Industry[] };

export const INDUSTRY_GROUPS: IndustryGroup[] = [
  {
    id: "local-services",
    title: "On the tools",
    description: "The work keeps you busy. Enquiries and quotes still need a response.",
    industries: [
      {
        name: "Mechanics & Workshops",
        href: "/industries/mechanics",
        image: "mechanics-workshop.webp",
        alt: "A mechanic inspecting a car in an independent workshop",
        copy: "Reply to workshop enquiries, follow up repair quotes and remind customers when their next service is due.",
      },
      {
        name: "Trades & Home Services",
        href: "/industries/trades",
        image: "trades-technician.webp",
        alt: "A technician at work on a service visit",
        copy: "Keep new enquiries and unanswered quotes moving while your team is out on the job.",
      },
    ],
  },
  {
    id: "practices-clinics",
    title: "In the practice",
    description:
      "Reception has people to help, enquiries to answer and appointments to prepare for.",
    industries: [
      {
        name: "Allied Health",
        href: "/industries/allied-health",
        image: "allied-health-care.webp",
        alt: "A practitioner helping a patient in an allied health practice",
        copy: "Capture patient enquiries, gather appointment details and help reception arrange the next visit.",
      },
      {
        name: "Dental Practices",
        href: "/industries/dental",
        image: "dental-reception.webp",
        alt: "A patient speaking with a dental receptionist",
        copy: "Reply to new patient enquiries, send registration forms and follow up patients due back.",
      },
      {
        name: "Skin & Cosmetic Clinics",
        href: "/industries/cosmetic-skin-clinics",
        image: "skin-clinic-reception.webp",
        alt: "A client speaking with a receptionist in a skin clinic",
        copy: "Respond to consultation enquiries, send pre-visit information and arrange agreed client follow-up.",
      },
    ],
  },
  {
    id: "client-relationships",
    title: "Working with clients",
    description: "A client relationship matters long after the first enquiry or transaction.",
    industries: [
      {
        name: "Mortgage Brokers",
        href: "/industries/mortgage-brokers",
        image: "mortgage-broker-consultation.webp",
        alt: "A mortgage broker meeting with clients",
        copy: "Keep client conversations, follow-ups and ongoing contact together, alongside your mortgage software.",
      },
    ],
  },
];

export const INDUSTRY_LINKS = INDUSTRY_GROUPS.flatMap((group) => group.industries);
