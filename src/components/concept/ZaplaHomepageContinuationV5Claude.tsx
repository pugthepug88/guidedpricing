import { ZaplaPlatformShowcase } from "@/components/concept/ZaplaPlatformShowcase";
import { ZaplaAISectionV6 } from "@/components/concept/ZaplaAISectionV6";
import { ZaplaGrowthV6, ZaplaUnlimitedV6 } from "@/components/concept/ZaplaGrowthUnlimitedV6";
import { ZaplaFinalV6, ZaplaGuidedLaunchV6, ZaplaProofV6 } from "@/components/concept/ZaplaClosingV6";
import { LeakV1Tangle } from "@/components/concept/leak-variants/LeakV1Tangle";
import { LeakV2TradeCut } from "@/components/concept/leak-variants/LeakV2TradeCut";
import { LeakV3WarmLedger } from "@/components/concept/leak-variants/LeakV3WarmLedger";
import { LeakV4InboxDecay } from "@/components/concept/leak-variants/LeakV4InboxDecay";

function VariantLabel({ children }: { children: string }) {
  return (
    <div className="flex h-[44px] w-full items-center justify-center bg-slate-900 text-[11px] font-medium uppercase tracking-[0.12em] text-white">
      {children}
    </div>
  );
}

export function ZaplaHomepageContinuationV5Claude() {
  return (
    <>
      <VariantLabel>Variant 1 — The Tangle</VariantLabel>
      <LeakV1Tangle />
      <VariantLabel>Variant 2 — The Trade Cut</VariantLabel>
      <LeakV2TradeCut />
      <VariantLabel>Variant 3 — Warm Ledger</VariantLabel>
      <LeakV3WarmLedger />
      <VariantLabel>Variant 4 — Live Inbox Decay</VariantLabel>
      <LeakV4InboxDecay />

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
