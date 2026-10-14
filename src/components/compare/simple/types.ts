export type ComparisonStatus = 'included' | 'plan-dependent' | 'separate' | 'scoped' | 'documented';
export interface ComparisonCell { text: string; status: ComparisonStatus; sources: readonly string[] }
export interface ComparisonRow { id: string; label: string; competitor: ComparisonCell; zapla: ComparisonCell }
export interface ComparisonSource { id: string; title: string; url: string }
export interface ComparisonDefinition {
  competitor: string;
  headline: string;
  introduction: string;
  differences: readonly { title: string; competitor: string; zapla: string }[];
  example: { title: string; steps: readonly { label: string; text: string }[]; caption: string };
  tableIntroduction: string;
  tableCaption: string;
  vendorPricingUrl: string;
  vendorPriceHeading: string;
  vendorPriceDescription: string;
  costCaution: string;
  foundationNote: string;
  methodology: string;
  fit: readonly { title: string; description: string; consideration: string }[];
  rows: readonly ComparisonRow[];
  offer: { monthly: number; launch: number; growthMonthly: number; growthLaunch: number; unlimitedUsers: boolean; trial: boolean };
  foundations: readonly { title: string; description: string; sources: readonly string[] }[];
  faqs: readonly { question: string; answer: string }[];
  sources: readonly ComparisonSource[];
  updated: string;
  pricingUrl: '/Pricing-v3';
}
