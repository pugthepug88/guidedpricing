const PROOF_SLOTS = ["Logo 01", "Logo 02", "Logo 03", "Logo 04", "Logo 05"];

const LOST_JOURNEY = [
  {
    time: "10:07",
    meta: "Tuesday",
    title: "New enquiry",
    detail: "Brake inspection requested for tomorrow morning.",
    state: "received",
  },
  {
    time: "10:42",
    meta: "+35 min",
    title: "No reply",
    detail: "The enquiry is still sitting untouched.",
    state: "waiting",
  },
  {
    time: "13:18",
    meta: "+3h 11m",
    title: "Still unassigned",
    detail: "No owner. No follow-up. No next action.",
    state: "waiting",
  },
  {
    time: "08:34",
    meta: "Next morning",
    title: "Booked elsewhere",
    detail: "The opportunity disappeared without ever becoming a conversation.",
    state: "lost",
  },
] as const;

export function CredibilityBand() {
  return (
    <section className="border-y border-slate-200/80 bg-white">
      <div className="mx-auto max-w-[1280px] px-5 py-8 sm:px-8 sm:py-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
          <div className="shrink-0 lg:w-[230px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Customer proof
            </p>
            <p className="mt-1.5 text-[12px] font-medium text-slate-600">
              Approved customer logos will live here.
            </p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-5 border-t border-slate-200/80 pt-6 sm:grid-cols-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {PROOF_SLOTS.map((slot) => (
              <div key={slot} className="flex h-9 items-center justify-center border-b border-dashed border-slate-300/80">
                <span className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                  {slot}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ConnectedSystemStory() {
  return (
    <section className="relative overflow-hidden bg-[#f2f5f9] px-5 py-24 text-slate-950 sm:px-8 sm:py-32 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 83% 19%, rgba(37,99,235,.065), transparent 70%), radial-gradient(650px 420px at 8% 82%, rgba(15,23,42,.035), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.19em] text-zapla-blue">
              Where revenue disappears
            </p>
            <p className="mt-4 max-w-[320px] text-[14px] leading-6 text-slate-500">
              Lost opportunities can look deceptively ordinary: time passing with no reply, no owner and no next action.
            </p>
          </div>

          <h2 className="max-w-[880px] text-[48px] font-semibold leading-[0.98] tracking-[-0.048em] text-slate-950 sm:text-[66px] lg:text-[82px]">
            The enquiry came in.
            <br />
            <span className="text-slate-400">Nothing happened next.</span>
          </h2>
        </div>

        <div className="mt-16 border-y border-slate-300/90 bg-white/45 sm:mt-20">
          <div className="grid lg:min-h-[610px] lg:grid-cols-[290px_minmax(0,1fr)]">
            <aside className="border-b border-slate-300/90 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-9">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[9.5px] font-semibold uppercase tracking-[0.17em] text-slate-400">
                  Illustrative journey
                </span>
                <span className="h-2 w-2 rounded-full bg-zapla-blue" />
              </div>

              <div className="mt-16 sm:mt-20">
                <p className="text-[11px] font-medium text-slate-400">New enquiry</p>
                <h3 className="mt-2 text-[28px] font-semibold tracking-[-0.03em] text-slate-950">
                  Sarah Miller
                </h3>
                <p className="mt-2 text-[13px] leading-5 text-slate-500">
                  Brake inspection
                  <br />
                  Tomorrow morning
                </p>
              </div>

              <div className="mt-16 border-t border-slate-300/80 pt-5 sm:mt-24">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Status at arrival
                </p>
                <p className="mt-2 text-[13px] font-semibold text-slate-800">Unassigned</p>
              </div>
            </aside>

            <div className="relative p-6 sm:p-8 lg:p-10 xl:p-12">
              <div className="flex flex-col gap-4 border-b border-slate-300/80 pb-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-400">
                    Time without follow-through
                  </p>
                  <p className="mt-2 text-[13px] text-slate-500">One enquiry. Four increasingly expensive moments of silence.</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-[50px] font-semibold leading-none tracking-[-0.055em] text-slate-950 sm:text-[64px]">
                    22h 27m
                  </p>
                  <p className="mt-2 text-[10.5px] font-medium uppercase tracking-[0.12em] text-slate-400">
                    enquiry → lost opportunity
                  </p>
                </div>
              </div>

              <div className="relative mt-2">
                <div className="absolute bottom-0 left-[76px] top-0 w-px bg-slate-300/80 sm:left-[112px]" />

                {LOST_JOURNEY.map((event, index) => {
                  const lost = event.state === "lost";
                  return (
                    <div
                      key={`${event.time}-${event.title}`}
                      className="relative grid grid-cols-[62px_minmax(0,1fr)] gap-5 border-b border-slate-200/90 py-7 last:border-b-0 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-7 sm:py-8"
                    >
                      <div>
                        <p
                          className={
                            lost
                              ? "text-[18px] font-semibold tracking-[-0.025em] text-slate-950"
                              : "text-[18px] font-semibold tracking-[-0.025em] text-slate-700"
                          }
                        >
                          {event.time}
                        </p>
                        <p className="mt-1 text-[9.5px] font-medium uppercase tracking-[0.1em] text-slate-400">
                          {event.meta}
                        </p>
                      </div>

                      <div className="relative pl-6 sm:pl-8">
                        <span
                          className={
                            lost
                              ? "absolute -left-[5px] top-[5px] h-[11px] w-[11px] rounded-full border-2 border-[#f2f5f9] bg-slate-950 shadow-[0_0_0_1px_rgba(15,23,42,.18)]"
                              : index === 0
                                ? "absolute -left-[5px] top-[5px] h-[11px] w-[11px] rounded-full border-2 border-[#f2f5f9] bg-zapla-blue shadow-[0_0_0_1px_rgba(37,99,235,.20)]"
                                : "absolute -left-[4px] top-[6px] h-[9px] w-[9px] rounded-full border-2 border-[#f2f5f9] bg-slate-300"
                          }
                        />
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                          <h4
                            className={
                              lost
                                ? "text-[19px] font-semibold tracking-[-0.02em] text-slate-950"
                                : "text-[17px] font-semibold tracking-[-0.015em] text-slate-800"
                            }
                          >
                            {event.title}
                          </h4>
                          {lost ? (
                            <span className="w-fit border-b border-slate-950 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-950">
                              Opportunity lost
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 max-w-[560px] text-[12.5px] leading-5 text-slate-500">
                          {event.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-300/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] font-semibold tracking-[-0.01em] text-slate-800">
            The problem is not capturing the enquiry. It is making sure the next thing actually happens.
          </p>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.13em] text-slate-400">
            Act 2 baseline · no product solution shown yet
          </p>
        </div>
      </div>
    </section>
  );
}
