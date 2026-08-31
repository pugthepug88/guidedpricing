import { ZaplaCustomerJourneyShowcaseV6 } from "@/components/concept/ZaplaCustomerJourneyShowcaseV6";
import { ZaplaCustomerJourneyPrototypeSmoothV6 } from "@/components/concept/ZaplaCustomerJourneyPrototypeSmoothV6";
import { ZaplaRevenueLeakageV7 } from "@/components/concept/ZaplaRevenueLeakageV7";
import { ZaplaAISectionV6 } from "@/components/concept/ZaplaAISectionV6";
import { ZaplaGrowthV6, ZaplaUnlimitedV6 } from "@/components/concept/ZaplaGrowthUnlimitedV6";
import { ZaplaFinalV6, ZaplaGuidedLaunchV6, ZaplaProofV6 } from "@/components/concept/ZaplaClosingV6";

export function ZaplaHomepageContinuationV6() {
  return (
    <>
      <ZaplaRevenueLeakageV7 />
      <ZaplaCustomerJourneyShowcaseV6 />
      <ZaplaCustomerJourneyPrototypeSmoothV6 />
      <ZaplaAISectionV6 />
      <ZaplaGrowthV6 />
      <ZaplaUnlimitedV6 />
      <ZaplaGuidedLaunchV6 />
      <ZaplaProofV6 />
      <ZaplaFinalV6 />
    </>
  );
}
