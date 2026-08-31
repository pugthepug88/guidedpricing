import { ZaplaConnectedJourneyV6 } from "@/components/concept/ZaplaConnectedJourneyV6";
import { ZaplaRevenueLeakageV7 } from "@/components/concept/ZaplaRevenueLeakageV7";
import { ZaplaAISectionV6 } from "@/components/concept/ZaplaAISectionV6";
import { ZaplaGrowthV6, ZaplaUnlimitedV6 } from "@/components/concept/ZaplaGrowthUnlimitedV6";
import { ZaplaFinalV6, ZaplaGuidedLaunchV6, ZaplaProofV6 } from "@/components/concept/ZaplaClosingV6";

export function ZaplaHomepageContinuationV6() {
  return (
    <>
      <ZaplaRevenueLeakageV7 />
      <ZaplaConnectedJourneyV6 />
      <ZaplaAISectionV6 />
      <ZaplaGrowthV6 />
      <ZaplaUnlimitedV6 />
      <ZaplaGuidedLaunchV6 />
      <ZaplaProofV6 />
      <ZaplaFinalV6 />
    </>
  );
}
