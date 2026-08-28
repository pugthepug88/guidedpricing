import { ZaplaPlatformShowcase } from "@/components/concept/ZaplaPlatformShowcase";
import { ZaplaRevenueLeakageV7 } from "@/components/concept/ZaplaRevenueLeakageV7";
import { ZaplaAISectionV6 } from "@/components/concept/ZaplaAISectionV6";
import { ZaplaGrowthV6, ZaplaUnlimitedV6 } from "@/components/concept/ZaplaGrowthUnlimitedV6";
import { ZaplaFinalV6, ZaplaGuidedLaunchV6, ZaplaProofV6 } from "@/components/concept/ZaplaClosingV6";

export function ZaplaHomepageContinuationV5() {
  return (
    <>
      <ZaplaRevenueLeakageV7 />
      <ZaplaAISectionV6 />
      <ZaplaPlatformShowcase variant="follow-through" />
      <ZaplaGrowthV6 />
      <ZaplaUnlimitedV6 />
      <ZaplaGuidedLaunchV6 />
      <ZaplaProofV6 />
      <ZaplaFinalV6 />
    </>
  );
}
