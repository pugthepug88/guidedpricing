import { ZaplaPlatformShowcase } from "@/components/concept/ZaplaPlatformShowcase";
import { ZaplaRevenueLeakageV7 } from "@/components/concept/ZaplaRevenueLeakageV7";
import { ZaplaAIConversationsV5 } from "@/components/concept/ZaplaAIConversationsV5";
import { ZaplaGrowthV6, ZaplaUnlimitedV6 } from "@/components/concept/ZaplaGrowthUnlimitedV6";
import { ZaplaFinalV6, ZaplaGuidedLaunchV6, ZaplaProofV6 } from "@/components/concept/ZaplaClosingV6";

export function ZaplaHomepageContinuationV5() {
  return (
    <>
      <ZaplaRevenueLeakageV7 />
      <ZaplaPlatformShowcase variant="follow-through" />
      <ZaplaAIConversationsV5 />
      <ZaplaGrowthV6 />
      <ZaplaUnlimitedV6 />
      <ZaplaGuidedLaunchV6 />
      <ZaplaProofV6 />
      <ZaplaFinalV6 />
    </>
  );
}
