import { createFileRoute } from "@tanstack/react-router";
import zaplaIcon from "@/assets/zapla-icon.png.asset.json";

export const Route = createFileRoute("/pillar-ideas")({
  component: PillarIdeas,
  head: () => ({
    meta: [{ title: "Pillar ideas · Zapla" }],
  }),
});

const TOOLS = [
  "WordPress", "HubSpot", "Mailchimp", "Calendly", "Stripe",
  "QuickBooks", "Zoom", "Slack", "Hootsuite", "Typeform",
  "Zapier", "Trello", "Wix", "Klaviyo", "NiceJob", "DocuSign",
];

function Frame({
  n, title, tagline, children,
}: { n: number; title: string; tagline: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="mb-6 flex items-baseline gap-3">
        <span className="rounded-full bg-zapla-blue px-3 py-1 text-xs font-semibold text-white">
          Idea {n}
        </span>
        <h2 className="font-zapla text-2xl font-bold text-zapla-ink">{title}</h2>
        <span className="text-sm text-zapla-muted">— {tagline}</span>
      </div>
      <div className="overflow-hidden rounded-3xl border border-zapla-line bg-white p-8 shadow-zapla">
        {children}
      </div>
    </section>
  );
}

/* -------- Idea 1: Single-frame tab collapse -------- */
function Idea1() {
  return (
    <div className="rounded-2xl border border-zapla-line bg-zapla-bg2 p-4">
      <div className="mb-2 flex gap-1.5">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
      </div>
      <div className="flex flex-wrap gap-1 border-b border-zapla-line pb-2">
        {TOOLS.map((t, i) => (
          <span
            key={t}
            className="zapla-tab-close rounded-t-md bg-white px-2 py-1 text-[10px] text-zapla-muted"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {t}
          </span>
        ))}
        <span
          className="zapla-tab-appear ml-1 flex items-center gap-1 rounded-t-md bg-zapla-blue px-3 py-1 text-[11px] font-semibold text-white"
        >
          <img src={zaplaIcon.url} alt="" className="h-3 w-3 rounded-sm" />
          Zapla · All-in-one
        </span>
      </div>
      <div className="mt-6 flex items-center justify-center py-16">
        <div className="text-center">
          <img src={zaplaIcon.url} alt="" className="mx-auto h-16 w-16 rounded-2xl shadow-zapla-blue" />
          <div className="mt-3 font-zapla text-xl font-bold text-zapla-ink">
            16 tabs collapse into 1 screen
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------- Idea 2: Keychain → keycard -------- */
function Idea2() {
  return (
    <div className="relative flex min-h-[320px] items-center justify-around">
      <div className="relative h-56 w-56">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-zapla-line2" />
        {TOOLS.slice(0, 12).map((t, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x = Math.cos(angle) * 100;
          const y = Math.sin(angle) * 100;
          return (
            <div
              key={t}
              className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded bg-white text-[8px] font-semibold text-zapla-ink shadow-zapla-sm"
              style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${(i * 30)}deg)` }}
            >
              🔑
            </div>
          );
        })}
        <p className="absolute inset-x-0 -bottom-8 text-center text-xs text-zapla-muted">16 jangling keys</p>
      </div>
      <div className="text-3xl text-zapla-blue">→</div>
      <div className="text-center">
        <div className="mx-auto flex h-32 w-52 items-center justify-center rounded-2xl bg-gradient-to-br from-zapla-blue to-zapla-violet shadow-zapla-lift">
          <img src={zaplaIcon.url} alt="" className="h-10 w-10 rounded-lg" />
          <span className="ml-2 font-zapla text-lg font-bold text-white">Zapla</span>
        </div>
        <p className="mt-3 text-xs text-zapla-muted">One keycard. One tap.</p>
      </div>
    </div>
  );
}

/* -------- Idea 3: Receipts → one invoice -------- */
function Idea3() {
  return (
    <div className="flex min-h-[320px] items-center justify-around">
      <div className="relative h-64 w-40">
        {TOOLS.map((t, i) => (
          <div
            key={t}
            className="absolute left-0 top-0 h-20 w-32 rounded-md border border-zapla-line bg-white p-2 text-[9px] shadow-zapla-sm"
            style={{
              transform: `rotate(${(i - 8) * 3}deg) translate(${(i - 8) * 2}px, ${i * 6}px)`,
              zIndex: i,
            }}
          >
            <div className="font-semibold text-zapla-ink">{t}</div>
            <div className="mt-1 text-zapla-muted">$—</div>
            <div className="mt-2 border-t border-dashed border-zapla-line" />
          </div>
        ))}
      </div>
      <div className="text-3xl text-zapla-blue">→</div>
      <div className="w-56 rounded-xl bg-zapla-ink p-5 text-white shadow-zapla-lift">
        <div className="flex items-center gap-2">
          <img src={zaplaIcon.url} alt="" className="h-6 w-6 rounded" />
          <span className="font-semibold">Zapla · Monthly</span>
        </div>
        <div className="mt-3 text-3xl font-bold">A$347</div>
        <div className="mt-1 text-xs text-white/60">One clean invoice</div>
      </div>
    </div>
  );
}

/* -------- Idea 4: Constellation & gravity well -------- */
function Idea4() {
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-gradient-to-b from-zapla-ink via-zapla-ink2 to-black">
      {TOOLS.map((t, i) => {
        const x = 8 + ((i * 37) % 84);
        const y = 10 + ((i * 53) % 70);
        const size = 3 + (i % 4);
        return (
          <span
            key={t}
            className="absolute rounded-full bg-white/70"
            style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, filter: "blur(0.3px)" }}
            title={t}
          />
        );
      })}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 -m-24 rounded-full bg-zapla-blue/30 blur-3xl" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-zapla-blue shadow-zapla-lift">
            <img src={zaplaIcon.url} alt="" className="h-12 w-12" />
          </div>
        </div>
      </div>
      <p className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/70">
        16 scattered stars, one gravity well.
      </p>
    </div>
  );
}

/* -------- Idea 5: Slot machine reels -------- */
function Idea5() {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <div className="flex gap-3 rounded-2xl border-4 border-zapla-ink bg-zapla-bg2 p-5">
        {[0, 1, 2].map((c) => (
          <div key={c} className="h-24 w-20 overflow-hidden rounded-lg bg-white shadow-inner">
            <div className="flex flex-col items-center justify-center gap-2 py-2">
              <div className="text-[10px] text-zapla-muted line-through">Slack</div>
              <div className="text-[10px] text-zapla-muted line-through">HubSpot</div>
              <div className="flex items-center gap-1 text-xs font-bold text-zapla-blue">
                <img src={zaplaIcon.url} alt="" className="h-4 w-4" /> Zapla
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="ml-6">
        <div className="rounded-full bg-zapla-green px-3 py-1 text-xs font-bold text-white">
          JACKPOT
        </div>
        <p className="mt-2 text-sm text-zapla-muted">All three reels land on Zapla.</p>
      </div>
    </div>
  );
}

/* -------- Idea 6: Junk drawer → clean drawer -------- */
function Idea6() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="rounded-2xl border-2 border-zapla-line bg-zapla-bg2 p-6">
        <div className="mb-3 text-xs uppercase tracking-wider text-zapla-muted">Before</div>
        <div className="flex flex-wrap gap-1.5">
          {TOOLS.map((t, i) => (
            <span
              key={t}
              className="rounded bg-white px-2 py-1 text-[10px] text-zapla-ink shadow-zapla-sm"
              style={{ transform: `rotate(${((i * 47) % 20) - 10}deg)` }}
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs text-zapla-muted">Tangled cables. 16 gadgets.</p>
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-zapla-ink to-zapla-ink2 p-6 text-white">
        <div className="mb-3 text-xs uppercase tracking-wider text-white/60">After</div>
        <div className="flex h-32 items-center justify-center rounded-xl bg-white/5">
          <img src={zaplaIcon.url} alt="" className="h-16 w-16 rounded-2xl" />
        </div>
        <p className="mt-4 text-xs text-white/60">One device. On velvet.</p>
      </div>
    </div>
  );
}

function PillarIdeas() {
  return (
    <main className="min-h-screen bg-zapla-bg font-zapla">
      <header className="mx-auto max-w-6xl px-6 pt-16 pb-6">
        <a href="/" className="text-sm text-zapla-blue hover:underline">← Back to pricing</a>
        <h1 className="mt-4 font-zapla text-4xl font-bold text-zapla-ink">
          6 ways to show "16 tools → 1 Zapla"
        </h1>
        <p className="mt-2 max-w-2xl text-zapla-muted">
          Static previews so you can compare side by side. Tell me which to build (or which to kill) and I'll animate the winner.
        </p>
      </header>
      <Frame n={1} title="Single-frame tab collapse" tagline="16 browser tabs cascade-close into one Zapla tab">
        <Idea1 />
      </Frame>
      <Frame n={2} title="Keychain → keycard" tagline="A ring of jangling keys becomes one tap-to-enter card">
        <Idea2 />
      </Frame>
      <Frame n={3} title="Receipt stack → one invoice" tagline="Messy pile of bills folds into one clean Zapla receipt">
        <Idea3 />
      </Frame>
      <Frame n={4} title="Constellation & gravity well" tagline="Cosmic canvas: scattered stars pulled into one glowing core">
        <Idea4 />
      </Frame>
      <Frame n={5} title="Slot machine jackpot" tagline="Three reels spin through tool logos, all land on Zapla">
        <Idea5 />
      </Frame>
      <Frame n={6} title="Junk drawer → clean drawer" tagline="Cluttered drawer of gadgets vs. one device on velvet">
        <Idea6 />
      </Frame>
      <div className="h-24" />
    </main>
  );
}
