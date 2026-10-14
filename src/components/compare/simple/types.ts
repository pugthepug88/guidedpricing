export type ComparisonStatus = 'included' | 'plan-dependent' | 'separate' | 'scoped' | 'documented';
export interface ComparisonCell { text: string; status: ComparisonStatus; sources: readonly string[] }
export interface ComparisonRow { id: string; label: string; competitor: ComparisonCell; zapla: ComparisonCell }
export interface ComparisonSource { id: string; title: string; url: string }
export interface ComparisonDefinition {
  competitor: string;
  headline: string;
  introduction: string;
  fit: readonly { title: string; description: string; consideration: string }[];
  rows: readonly ComparisonRow[];
  offer: { monthly: number; launch: number; growthMonthly: number; growthLaunch: number; unlimitedUsers: boolean; trial: boolean };
  foundations: readonly { title: string; description: string; sources: readonly string[] }[];
  faqs: readonly { question: string; answer: string }[];
  sources: readonly ComparisonSource[];
  updated: string;
  pricingUrl: '/Pricing-v3';
}
export const TEAM_SIZES = [1, 5, 10, 20] as const;
export function teamPricing(offer: ComparisonDefinition['offer'], team: number) {
  return { competitorSeats: team, zaplaMonthly: offer.monthly, requiredLaunch: offer.launch };
}