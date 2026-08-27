import { createFileRoute } from "@tanstack/react-router";
import { ZaplaRevenueLeakageV7 } from "@/components/concept/ZaplaRevenueLeakageV7";

const TITLE = "Revenue Leakage V7 — Zapla concept";
const DESC =
  "One enquiry, one working day. A scroll-scrubbed cinematic beat showing intent cooling until the customer books elsewhere.";

function RevenueLeaksV7() {
  return (
    <main>
      <h1 className="sr-only">Where revenue leaks</h1>
      <ZaplaRevenueLeakageV7 />
      <section className="bg-[#070A0D] px-5 py-24 text-white sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#52D9DE]">
            Next section
          </div>
          <p className="mt-5 max-w-[720px] text-[24px] leading-[1.08] tracking-[-0.04em] text-white/80 sm:text-[34px]">
            Placeholder dark block, here only so the hand-off seam can be judged in context.
          </p>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/concept/revenue-leaks-v7")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RevenueLeaksV7,
});
