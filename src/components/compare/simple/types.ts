export type ComparisonStatus = 'included' | 'plan-dependent' | 'separate' | 'scoped' | 'documented';
export interface ComparisonCell { text: string; detail?: string; mark?: 'tick' | 'cross'; status: ComparisonStatus; sources: readonly string[] }
export interface ComparisonRow { id: string; label: string; competitor: ComparisonCell; zapla: ComparisonCell }
export interface ComparisonSource { id: string; title: string; url: string }
export interface ComparisonDefinition {
  competitor: string;
  headline: string;
  headlineAccent: string;
  introduction: string;
  highlights: readonly { title: string; description: string; link?: { href: string; label: string } }[];
  tableIntroduction: string;
  tableCaption: string;
  vendorPricingUrl: string;
  vendorPlan: string;
  vendorEntryPrice: number;
  vendorEntryPlan: string;
  vendorPrice: number;
  vendorAnnualPrice: number;
  vendorPriceUnit: string;
  vendorBilling: string;
  workflowNote: string;
  tableNotes?: readonly string[];
  pricingIntroduction?: string;
  pricingHeading?: string;
  calculator?: {
    teamSizeLabel: string;
    monthlyLabel: string;
    annualLabel: string;
    monthlyCommitment: string;
    seatName: string;
    qualification: string;
    annualRateNote: string;
    onboarding: number;
  };
  pricingHeadline: string;
  vendorPlanReason: string;
  vendorLowerPlans: string;
  costCaution: string;
  additionalTools: readonly { title: string; description: string; sources: readonly string[] }[];
  vendorEntryScope: string;
  vendorScope: string;
  offerScope: string;
  recurringExamples: readonly { label: string; values: readonly number[] }[];
  costExamples: {
    title: string;
    introduction: string;
    columns: readonly string[];
    rows: readonly { label: string; values: readonly number[] }[];
    note: string;
    caption?: string;
    teamHeading?: string;
  };
  launch: {
    headline: string;
    introduction: string;
    steps: readonly { title: string; description: string }[];
    note: string;
  };
  foundationNote: string;
  methodology: string;
  fit: readonly { title: string; description: string; consideration: string }[];
  rows: readonly ComparisonRow[];
  growthRows: readonly ComparisonRow[];
  marketingNote: string;
  growthComparison?: { headline: string; description: string; vendorPrice: string; qualification: string; url: string };
  optionalRows: readonly ComparisonRow[];
  offer: { monthly: number; launch: number; growthMonthly: number; growthLaunch: number; unlimitedUsers: boolean; unlimitedContacts: boolean; trial: boolean };
  foundations: readonly { title: string; description: string; sources: readonly string[] }[];
  faqs: readonly { question: string; answer: string }[];
  sources: readonly ComparisonSource[];
  updated: string;
  pricingUrl: '/Pricing-v3';
}
