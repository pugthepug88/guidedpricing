import { ConnectedSystemSectionV3 } from "@/components/ConnectedSystemSectionV3";

const SIGNALS = [
  {
    label: "Unlimited users",
    detail: "Your software bill does not climb with every new teammate.",
  },
  {
    label: "Guided launch",
    detail: "Configured around how your business actually works.",
  },
  {
    label: "One customer history",
    detail: "Enquiry, conversation and next action stay connected.",
  },
];

const INDUSTRIES = [
  "Trades",
  "Health & wellness",
  "Property",
  "Brokers",
  "Automotive",
  "Professional services",
];

const LIFECYCLE = [
  { number: "01", label: "Capture", detail: "Enquiry" },
  { number: "02", label: "Communicate", detail: "Conversation" },
  { number: "03", label: "Convert", detail: "Booking" },
  { number: "04", label: "Operate", detail: "Delivery" },
  { number: "05", label: "Retain", detail: "Review" },
  { number: "06", label: "Grow", detail: "Repeat" },
];

export function CredibilityBand() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200/70 bg-[#f7f9fc]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(620px 260px at 12% 10%, rgba(37,99,255,.055), transparent 72%), radial-gradient(520px 240px at 92% 88%, rgba(124,58,237,.045), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-zapla-blue">
              Built for service businesses
            </p>
            <h2 className="mt-3 max-w-[480px] text-[28px] font-semibold leading-[1.12] tracking-[-0.03em] text-slate-950 sm:text-[34px]">
              Where every enquiry matters, follow-through matters more.
            </h2>
          </div>

          <div className="grid border-t border-slate-300/70 sm:grid-cols-3 sm:border-l sm:border-t-0">
            {SIGNALS.map((signal) => (
              <div
                key={signal.label}
                className="border-b border-slate-300/70 py-5 sm:border-b-0 sm:border-r sm:px-6 sm:py-1 last:border-r-0"
              >
                <p className="text-[13px] font-semibold tracking-[-0.01em] text-slate-900">
                  {signal.label}
                </p>
                <p className="mt-1.5 max-w-[230px] text-[11.5px] leading-5 text-slate-500">
                  {signal.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200/80 pt-5 sm:flex-row sm:items-center">
          <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Designed around businesses like
          </p>
          <div className="zapla-scroll-hide flex min-w-0 flex-1 items-center gap-7 overflow-x-auto pb-1 sm:justify-between sm:gap-5">
            {INDUSTRIES.map((industry) => (
              <span
                key={industry}
                className="shrink-0 whitespace-nowrap text-[13px] font-semibold tracking-[-0.01em] text-slate-600"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ConnectedSystemStory() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-white px-5 pt-20 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                One customer lifecycle
              </p>
              <p className="mt-2 max-w-[520px] text-[17px] font-medium leading-6 tracking-[-0.015em] text-slate-800">
                From first enquiry to the next sale, the customer should never disappear between steps.
              </p>
            </div>
            <p className="max-w-[330px] text-[11.5px] leading-5 text-slate-500 sm:text-right">
              Each stage feeds the next, so your team sees the same customer history and the same next action.
            </p>
          </div>

          <div className="zapla-scroll-hide relative mt-7 overflow-x-auto pb-3">
            <div className="relative grid min-w-[760px] grid-cols-6 gap-0">
              <div className="absolute left-[8%] right-[8%] top-[16px] h-px bg-slate-200" />
              <div className="absolute left-[8%] right-[8%] top-[16px] h-px bg-gradient-to-r from-blue-500/75 via-blue-400/40 to-cyan-400/25" />

              {LIFECYCLE.map((stage) => (
                <div key={stage.label} className="relative px-2 first:pl-0 last:pr-0">
                  <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-white text-[9.5px] font-bold text-blue-700 shadow-[0_4px_16px_-8px_rgba(37,99,255,.65)]">
                    {stage.number}
                  </div>
                  <p className="mt-3 text-[13px] font-semibold tracking-[-0.01em] text-slate-900">
                    {stage.label}
                  </p>
                  <p className="mt-0.5 text-[10.5px] text-slate-400">{stage.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="-mt-2 sm:-mt-4">
        <ConnectedSystemSectionV3 />
      </div>
    </div>
  );
}
