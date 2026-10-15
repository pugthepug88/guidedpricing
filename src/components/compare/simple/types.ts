export type ComparisonStatus = 'included' | 'plan-dependent' | 'separate' | 'scoped' | 'documented';
export interface ComparisonCell { text: string; detail?: string; status: ComparisonStatus; sources: readonly string[] }
export interface ComparisonRow { id: string; label: string; competitor: ComparisonCell; zapla: ComparisonCell }
export interface ComparisonSource { id: string; title: string; url: string }
export interface ComparisonDefinition {
  competitor: string;
  headline: string;
  headlineAccent: string;
  introduction: string;
  highlights: readonly { title: string; description: string }[];
  tableIntroduction: string;
  tableCaption: string;
  vendorPricingUrl: string;
  vendorPlan: string;
  vendorPrice: number;
  vendorPriceUnit: string;
  vendorBilling: string;
  pricingHeadline: string;
  vendorPlanReason: string;
  vendorLowerPlans: string;
  costCaution: string;
  additionalTools: readonly { title: string; description: string; sources: readonly string[] }[];
  costExamples: {
    title: string;
    introduction: string;
    columns: readonly string[];
    rows: readonly { label: string; values: readonly number[] }[];
    note: string;
  };
  foundationNote: string;
  methodology: string;
  fit: readonly { title: string; description: string; consideration: string }[];
  rows: readonly ComparisonRow[];
  offer: { monthly: number; launch: number; growthMonthly: number; growthLaunch: number; unlimitedUsers: boolean; unlimitedContacts: boolean; trial: boolean };
  foundations: readonly { title: string; description: string; sources: readonly string[] }[];
  faqs: readonly { question: string; answer: string }[];
  sources: readonly ComparisonSource[];
  updated: string;
  pricingUrl: '/Pricing-v3';
}
