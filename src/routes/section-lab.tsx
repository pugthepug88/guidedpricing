import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/section-lab")({
  head: () => ({
    meta: [
      { title: "Section Lab — Zapla" },
      { name: "description", content: "Six non-cartoon directions for the one system section." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SectionLab,
});

const CATS = [
  { label: "Bookings", value: "42 today", tone: "text-blue-600", dot: "bg-blue-500" },
  { label: "Reviews", value: "4.9 avg", tone: "text-amber-600", dot: "bg-amber-500" },
  { label: "Invoices", value: "$12,480", tone: "text-emerald-600", dot: "bg-emerald-500" },
  { label: "Conversations", value: "17 open", tone: "text-fuchsia-600", dot: "bg-fuchsia-500" },
  { label: "Ads", value: "3.2x ROAS", tone: "text-rose-600", dot: "bg-rose-500" },
  { label: "Automations", value: "24 live", tone: "text-violet-600", dot: "bg-violet-500" },
];

/* ---------- Reusable fake product UI ---------- */

function DashboardMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="w-full rounded-2xl border border-neutral-200 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] overflow-hidden">
      <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
        </div>
        <div className="ml-3 text-xs text-neutral-400 font-mono">zapla.io / dashboard</div>
      </div>
      <div className={`grid gap-3 p-4 ${compact ? "grid-cols-2" : "grid-cols-3"}`}>
        {CATS.map((c) => (
          <div key={c.label} className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-3">
            <div className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
              <div className="text-[11px] font-medium text-neutral-500">{c.label}</div>
            </div>
            <div className={`mt-2 text-lg font-semibold tracking-tight ${c.tone}`}>{c.value}</div>
            <div className="mt-2 h-1 w-full rounded-full bg-neutral-200/70 overflow-hidden">
              <div className={`h-full ${c.dot}`} style={{ width: `${40 + ((c.label.length * 7) % 55)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TilePill({ label, value, dot, tone }: (typeof CATS)[number]) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/90 backdrop-blur px-3 py-1.5 shadow-sm">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      <span className="text-[11px] font-medium text-neutral-700">{label}</span>
      <span className={`text-[11px] font-semibold ${tone}`}>{value}</span>
    </div>
  );
}

/* ---------- Six variations ---------- */

function V1EditorialSplit() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-5">
        <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">One system</div>
        <h2 className="mt-4 text-5xl md:text-6xl font-semibold leading-[1.02] tracking-tight text-neutral-950">
          Every tool your business needs, in one screen.
        </h2>
        <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-md">
          Bookings, reviews, invoices, conversations, ads and automations.
          One brain, running everything.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <button className="rounded-full bg-neutral-950 text-white text-sm font-medium px-5 py-2.5">Book a call</button>
          <button className="rounded-full border border-neutral-300 text-sm font-medium px-5 py-2.5">See it live</button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <DashboardMock />
      </div>
    </div>
  );
}

function V2DarkCockpit() {
  return (
    <div className="relative rounded-3xl bg-neutral-950 p-10 md:p-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.15),transparent_60%)]" />
      <div className="relative">
        <div className="text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">The operating system for your business</div>
          <h2 className="mt-4 text-5xl md:text-6xl font-semibold leading-[1.02] tracking-tight text-white">
            One system. Everything runs.
          </h2>
        </div>
        <div className="relative mt-14 flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-1">
              <DashboardMock compact />
            </div>
          </div>
          {/* Orbiting pills */}
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            {CATS.map((c, i) => {
              const angle = (i / CATS.length) * Math.PI * 2 - Math.PI / 2;
              const left = 50 + Math.cos(angle) * 42;
              const top = 50 + Math.sin(angle) * 55;
              return (
                <div key={c.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${left}%`, top: `${top}%` }}>
                  <TilePill {...c} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function V3Bento() {
  return (
    <div>
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-neutral-950">
          Six tools. One workspace.
        </h2>
        <p className="mt-4 text-neutral-600">Each tile is a real Zapla surface. Scroll and watch them lock together.</p>
      </div>
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
        {CATS.map((c, i) => (
          <div
            key={c.label}
            className={`rounded-2xl border border-neutral-200 bg-white p-5 ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
          >
            <div className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
              <span className="text-xs font-medium text-neutral-500">{c.label}</span>
            </div>
            <div className={`mt-4 font-semibold tracking-tight ${c.tone} ${i === 0 ? "text-4xl md:text-5xl" : "text-2xl"}`}>{c.value}</div>
            {i === 0 && (
              <div className="mt-6 space-y-2">
                {["Sarah booked 2pm cut", "Deposit $60 paid", "SMS confirmation sent"].map((r) => (
                  <div key={r} className="flex items-center gap-2 text-xs text-neutral-600">
                    <span className="h-1 w-1 rounded-full bg-neutral-400" />
                    {r}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function V4LinearMinimal() {
  return (
    <div className="text-center">
      <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">/ platform</div>
      <h2 className="mt-6 text-6xl md:text-7xl font-semibold tracking-[-0.03em] leading-[0.95] text-neutral-950 max-w-4xl mx-auto">
        The whole business,
        <br />
        <span className="text-neutral-400">on one canvas.</span>
      </h2>
      <div className="mt-14 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-[0_50px_100px_-40px_rgba(0,0,0,0.2)] p-2">
          <DashboardMock />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {CATS.map((c) => (
            <span key={c.label} className="text-xs font-mono text-neutral-500 border border-neutral-200 rounded-full px-3 py-1">
              {c.label.toLowerCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function V5StickyScroll() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div className="space-y-16">
        {CATS.slice(0, 4).map((c) => (
          <div key={c.label}>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">{c.label}</div>
            <h3 className="text-3xl font-semibold tracking-tight text-neutral-950">
              {c.label === "Bookings" && "Slots fill themselves."}
              {c.label === "Reviews" && "Five-star replies, auto-sent."}
              {c.label === "Invoices" && "Paid before you chase."}
              {c.label === "Conversations" && "Every channel, one inbox."}
            </h3>
            <p className="mt-3 text-neutral-600">On the real homepage, the tile on the right morphs to this one as it enters view.</p>
          </div>
        ))}
      </div>
      <div>
        <div className="sticky top-24">
          <DashboardMock />
        </div>
      </div>
    </div>
  );
}

function V6FullBleed() {
  return (
    <div className="relative">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-neutral-950">
          Everything, in one dashboard.
        </h2>
        <p className="mt-4 text-neutral-600">The category pills float in from the edges as you scroll and dock into their tile.</p>
      </div>
      <div className="relative mt-14">
        <div className="max-w-5xl mx-auto">
          <DashboardMock />
        </div>
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {CATS.map((c, i) => {
            const positions = [
              { left: "4%", top: "10%" },
              { left: "92%", top: "18%" },
              { left: "2%", top: "60%" },
              { left: "94%", top: "62%" },
              { left: "12%", top: "92%" },
              { left: "86%", top: "94%" },
            ];
            return (
              <div key={c.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={positions[i]}>
                <TilePill {...c} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

const variations = [
  { n: "01", name: "Editorial split", tag: "Statement + product", note: "Big typographic promise on the left, one clean dashboard on the right. Zero decoration. Feels like Linear or Attio.", el: <V1EditorialSplit /> },
  { n: "02", name: "Dark cockpit", tag: "Premium, atmospheric", note: "Dark surface, dashboard glows in center, six category pills orbit it. Serious infrastructure feel.", el: <V2DarkCockpit /> },
  { n: "03", name: "Bento assemble", tag: "Six real tiles", note: "Every category is a real tile. On scroll they lock into a bento grid. Notion / Arc energy but with your product data.", el: <V3Bento /> },
  { n: "04", name: "Linear minimal", tag: "Typography-forward", note: "Massive headline, tight mono labels, one product hero underneath. Restrained, premium, cartoon-free.", el: <V4LinearMinimal /> },
  { n: "05", name: "Sticky scroll", tag: "Feature-by-feature", note: "Right side pins one product tile. Left side scrolls through categories. The tile morphs as each enters view. Stripe school.", el: <V5StickyScroll /> },
  { n: "06", name: "Full-bleed dashboard", tag: "Product IS the hero", note: "One big real Zapla dashboard center-stage. Category pills float in from the edges and dock into their tile as you scroll.", el: <V6FullBleed /> },
];

function SectionLab() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-8 md:pt-32">
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">Section lab · one system, everything runs</p>
        <h1 className="mt-6 text-5xl md:text-7xl font-semibold leading-[1.02] tracking-tight">
          Six ways to say it,
          <br />
          <span className="text-neutral-400">without a cartoon.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-neutral-600 leading-relaxed">
          Every variation is for the same single section on the homepage. No mascots, no illustrations.
          Product UI is the hero. Pick a number and I'll build it in place of the current scroll block.
        </p>
      </section>

      {variations.map((v, i) => (
        <section key={v.n} className={`border-t border-neutral-200 ${i % 2 === 1 ? "bg-neutral-50" : "bg-white"}`}>
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="mb-10 flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <div className="font-mono text-xs tracking-widest text-neutral-400">{v.n} / 06</div>
                <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">{v.name}</h2>
                <p className="mt-2 text-neutral-600 max-w-2xl">{v.note}</p>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 border border-neutral-200 rounded-full px-3 py-1 bg-white">{v.tag}</span>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-12 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.15)]">
              {v.el}
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-neutral-200 bg-neutral-950 text-white">
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">Pick a number.</h2>
          <p className="mt-6 text-lg text-neutral-400">
            01 to 06. I'll replace only the current scroll section with the chosen direction.
            The rest of the homepage stays untouched.
          </p>
        </div>
      </section>
    </div>
  );
}
