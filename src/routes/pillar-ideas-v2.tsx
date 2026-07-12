import { createFileRoute } from "@tanstack/react-router";
import zaplaIcon from "@/assets/zapla-icon.png.asset.json";

export const Route = createFileRoute("/pillar-ideas-v2")({
  component: PillarIdeasV2,
  head: () => ({
    meta: [{ title: "Pillar ideas v2 · Zapla" }],
  }),
});

const TOOLS: { name: string; domain: string; color: string }[] = [
  { name: "WordPress", domain: "wordpress.com", color: "#21759b" },
  { name: "HubSpot", domain: "hubspot.com", color: "#ff7a59" },
  { name: "Mailchimp", domain: "mailchimp.com", color: "#ffe01b" },
  { name: "Calendly", domain: "calendly.com", color: "#006bff" },
  { name: "Stripe", domain: "stripe.com", color: "#635bff" },
  { name: "QuickBooks", domain: "quickbooks.intuit.com", color: "#2ca01c" },
  { name: "Zoom", domain: "zoom.us", color: "#2d8cff" },
  { name: "Slack", domain: "slack.com", color: "#4a154b" },
  { name: "Hootsuite", domain: "hootsuite.com", color: "#ff4c00" },
  { name: "Typeform", domain: "typeform.com", color: "#262627" },
  { name: "Zapier", domain: "zapier.com", color: "#ff4a00" },
  { name: "Trello", domain: "trello.com", color: "#0079bf" },
  { name: "Wix", domain: "wix.com", color: "#0e2240" },
  { name: "Klaviyo", domain: "klaviyo.com", color: "#0a6cb9" },
  { name: "NiceJob", domain: "nicejob.com", color: "#00b67a" },
  { name: "DocuSign", domain: "docusign.com", color: "#005cb9" },
];

function ToolLogo({ tool, size = 28 }: { tool: (typeof TOOLS)[0]; size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-lg bg-white shadow-zapla-sm"
      style={{ width: size, height: size, padding: size > 32 ? 4 : 3 }}
      title={tool.name}
    >
      <img
        src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`}
        alt={tool.name}
        className="h-full w-full object-contain"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = "none";
          target.parentElement!.style.background = tool.color;
          target.parentElement!.style.color = "#fff";
          target.parentElement!.innerText = tool.name[0];
          target.parentElement!.style.fontSize = `${size * 0.4}px`;
          target.parentElement!.style.fontWeight = "700";
        }}
      />
    </span>
  );
}

function Frame({
  n,
  title,
  tagline,
  children,
}: {
  n: number;
  title: string;
  tagline: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <div className="mb-5 flex flex-wrap items-baseline gap-3">
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

/* -------- Idea 1: The Funnel -------- */
function Idea1() {
  return (
    <div className="relative flex min-h-[420px] flex-col items-center justify-start overflow-hidden rounded-2xl bg-gradient-to-b from-zapla-bg via-white to-zapla-bg2 pt-10">
      <div className="relative z-10 flex flex-wrap justify-center gap-2 px-8" style={{ maxWidth: 520 }}>
        {TOOLS.map((t, i) => (
          <span
            key={t.name}
            className="zapla-funnel-fall inline-flex items-center gap-1.5 rounded-full border border-zapla-line bg-white px-2.5 py-1 text-[11px] font-semibold text-zapla-ink shadow-zapla-sm"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <ToolLogo tool={t} size={18} />
            {t.name}
          </span>
        ))}
      </div>

      {/* Funnel shape */}
      <div className="relative mt-2 h-64 w-72">
        <div
          className="absolute left-1/2 top-0 h-52 w-64 -translate-x-1/2 rounded-b-3xl"
          style={{
            background: "linear-gradient(180deg, #2563ff 0%, #1d4ed8 60%, #0f2a8a 100%)",
            clipPath: "polygon(8% 0%, 92% 0%, 100% 18%, 58% 100%, 42% 100%, 0% 18%)",
            boxShadow: "inset 0 0 40px rgba(255,255,255,0.15), 0 20px 60px rgba(37,99,255,0.25)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 h-16 w-8 -translate-x-1/2 rounded-b-full"
          style={{
            background: "linear-gradient(180deg, #1d4ed8 0%, #0f2a8a 100%)",
          }}
        />
        {/* Zapla output drop */}
        <div className="absolute -bottom-2 left-1/2 z-20 -translate-x-1/2">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-zapla-blue">
            <img src={zaplaIcon.url} alt="Zapla" className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      </div>

      <p className="relative z-10 mt-8 text-center text-sm text-zapla-muted">
        16 tools pour in. One Zapla flows out.
      </p>
    </div>
  );
}

/* -------- Idea 2: The Vortex -------- */
function Idea2() {
  return (
    <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-zapla-ink via-[#141832] to-black">
      {/* Spiral trace */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 420" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="vortexGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2563ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="400" cy="210" r="180" fill="url(#vortexGrad)" />
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M ${400 + 40 + i * 45} 210 Q ${400 + 80 + i * 60} ${210 - 60 - i * 30} ${400} ${210 - 120 - i * 25} T ${400 - 40 - i * 45} 210`}
            fill="none"
            stroke="rgba(37,99,255,0.15)"
            strokeWidth={1.5}
            strokeDasharray="6 6"
          />
        ))}
      </svg>

      {/* Orbiting logos */}
      <div className="relative h-80 w-80">
        {TOOLS.map((t, i) => {
          const orbit = 60 + (i % 3) * 55;
          const duration = 8 + (i % 5) * 2;
          const delay = i * -0.6;
          const angle = (i / TOOLS.length) * 360;
          return (
            <div
              key={t.name}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${angle}deg) translateX(${orbit}px)`,
                animation: `zapla-vortex-orbit ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
                ["--orbit-radius" as string]: `${orbit}px`,
              }}
            >
              <div
                className="flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-zapla-sm"
                style={{ transform: `translate(-50%, -50%) rotate(${-angle}deg)` }}
              >
                <ToolLogo tool={t} size={22} />
              </div>
            </div>
          );
        })}

        {/* Center orb */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 -m-10 rounded-full bg-zapla-blue/40 blur-2xl zapla-pulse-dot" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-zapla-blue to-zapla-violet shadow-zapla-lift">
              <img src={zaplaIcon.url} alt="Zapla" className="h-12 w-12 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      <p className="absolute bottom-5 left-0 right-0 text-center text-xs text-white/60">
        16 scattered tools spiral into one gravity well.
      </p>
    </div>
  );
}

/* -------- Idea 3: The Magnet -------- */
function Idea3() {
  return (
    <div className="relative flex min-h-[360px] items-center gap-8 overflow-hidden rounded-2xl bg-zapla-bg2 px-8">
      {/* Magnet */}
      <div className="relative flex h-56 w-56 shrink-0 items-center justify-center rounded-3xl bg-white shadow-zapla">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-zapla-blue/10 to-transparent" />
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-zapla-blue/10 blur-xl" />
          <img src={zaplaIcon.url} alt="Zapla" className="relative h-20 w-20 rounded-2xl shadow-zapla-blue" />
        </div>
        <p className="absolute bottom-4 text-xs font-semibold text-zapla-ink">The Zapla magnet</p>
      </div>

      {/* Field lines */}
      <div className="absolute left-56 top-1/2 h-px w-40 -translate-y-1/2 bg-gradient-to-r from-zapla-blue/30 to-transparent" />
      <div className="absolute left-56 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full border border-zapla-blue/10" />
      <div className="absolute left-56 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-zapla-blue/10" />

      {/* Scattered → aligned tools */}
      <div className="flex-1">
        <div className="flex flex-wrap gap-2">
          {TOOLS.map((t, i) => {
            const startX = 60 + (i % 4) * 35;
            const startY = (i % 3) * 20 - 20;
            const startR = ((i * 47) % 30) - 15;
            return (
              <span
                key={t.name}
                className="zapla-magnet-snap inline-flex items-center gap-2 rounded-full border border-zapla-line bg-white px-3 py-1.5 text-xs font-semibold text-zapla-ink shadow-zapla-sm"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  ["--start-x" as string]: `${startX}px`,
                  ["--start-y" as string]: `${startY}px`,
                  ["--start-r" as string]: `${startR}deg`,
                }}
              >
                <ToolLogo tool={t} size={18} />
                {t.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -------- Idea 4: The Blender -------- */
function Idea4() {
  return (
    <div className="relative flex min-h-[420px] items-center justify-center gap-10 overflow-hidden rounded-2xl bg-gradient-to-b from-zapla-bg to-white px-8">
      {/* Ingredients falling */}
      <div className="relative h-72 w-64">
        {TOOLS.slice(0, 10).map((t, i) => (
          <div
            key={t.name}
            className="absolute left-1/2 top-0"
            style={{
              transform: `translateX(${(i % 5) * 24 - 48}px)`,
              animation: `zapla-funnel-fall 2.2s ease-in infinite`,
              animationDelay: `${i * 0.18}s`,
            }}
          >
            <ToolLogo tool={t} size={24} />
          </div>
        ))}

        {/* Blender jar */}
        <div className="absolute bottom-0 left-1/2 h-56 w-40 -translate-x-1/2">
          <div className="absolute inset-0 rounded-b-3xl rounded-t-lg border-4 border-zapla-line2 bg-white/80 backdrop-blur-sm" />
          <div className="absolute bottom-4 left-2 right-2 top-8 overflow-hidden rounded-b-2xl rounded-t-lg bg-gradient-to-b from-zapla-blue/20 to-zapla-blue/80">
            <div className="zapla-blend-swirl absolute inset-0 opacity-60" style={{ ["--orbit-radius" as string]: "0px" }}>
              {TOOLS.slice(0, 8).map((t, i) => (
                <div
                  key={t.name}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `rotate(${i * 45}deg) translateY(${30 + (i % 3) * 18}px)` }}
                >
                  <ToolLogo tool={t} size={16} />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={zaplaIcon.url} alt="Zapla" className="h-12 w-12 rounded-xl shadow-zapla-blue" />
            </div>
          </div>
          {/* Lid */}
          <div className="absolute -top-3 left-0 right-0 h-5 rounded-lg bg-zapla-ink" />
        </div>
      </div>

      {/* Output */}
      <div className="text-center">
        <div className="mx-auto flex h-32 w-40 items-center justify-center rounded-2xl border border-zapla-line bg-white shadow-zapla">
          <div className="text-center">
            <img src={zaplaIcon.url} alt="Zapla" className="mx-auto h-12 w-12 rounded-xl" />
            <div className="mt-2 text-sm font-bold text-zapla-ink">One Zapla blend</div>
          </div>
        </div>
        <p className="mt-4 text-sm text-zapla-muted">16 ingredients. One smooth result.</p>
      </div>
    </div>
  );
}

/* -------- Idea 5: Shredder → Printer -------- */
function Idea5() {
  return (
    <div className="relative flex min-h-[420px] flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl bg-zapla-bg2 px-8">
      {/* Messy invoices */}
      <div className="relative h-32 w-72">
        {TOOLS.slice(0, 8).map((t, i) => (
          <div
            key={t.name}
            className="absolute left-0 top-0 h-20 w-44 rounded-md border border-zapla-line bg-white p-2 shadow-zapla-sm"
            style={{
              transform: `rotate(${(i - 4) * 4}deg) translate(${(i - 4) * 8}px, ${i * 5}px)`,
              zIndex: i,
            }}
          >
            <div className="flex items-center gap-2">
              <ToolLogo tool={t} size={16} />
              <span className="text-[10px] font-semibold text-zapla-ink">{t.name}</span>
            </div>
            <div className="mt-2 text-[10px] text-zapla-muted line-through">A$29–149/mo</div>
          </div>
        ))}
      </div>

      {/* Shredder */}
      <div className="relative z-10 flex h-16 w-56 items-center justify-center rounded-2xl bg-gradient-to-r from-zapla-ink to-zapla-ink2 shadow-zapla">
        <div className="h-1.5 w-40 rounded-full bg-zapla-line2/30" />
        <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-zapla-blue shadow-zapla-blue zapla-pulse-dot" />
      </div>

      {/* Shredded strips */}
      <div className="relative flex h-16 w-40 justify-center gap-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="zapla-shred-strips h-12 w-1.5 rounded-full bg-zapla-line2"
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>

      {/* Clean invoice */}
      <div className="w-64 rounded-xl bg-white p-5 shadow-zapla">
        <div className="flex items-center gap-2">
          <img src={zaplaIcon.url} alt="Zapla" className="h-6 w-6 rounded" />
          <span className="font-semibold text-zapla-ink">Zapla · Monthly</span>
        </div>
        <div className="mt-3 text-3xl font-bold text-zapla-ink">A$347</div>
        <div className="mt-1 text-xs text-zapla-muted">One invoice. One system.</div>
      </div>
    </div>
  );
}

/* -------- Idea 6: Satellite Hub -------- */
function Idea6() {
  return (
    <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#0a0f24] via-[#10163a] to-[#0a0f24]">
      {/* Orbit rings */}
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
      <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

      {/* Center hub */}
      <div className="relative z-10">
        <div className="absolute inset-0 -m-12 rounded-full bg-zapla-blue/20 blur-3xl zapla-pulse-dot" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 shadow-zapla-lift backdrop-blur-md">
          <img src={zaplaIcon.url} alt="Zapla" className="h-12 w-12 rounded-2xl" />
        </div>
      </div>

      {/* Satellites distributed across 3 rings */}
      {TOOLS.map((t, i) => {
        const ring = (i % 3);
        const radius = [130, 180, 235][ring];
        const angle = (i / TOOLS.length) * 360 + (ring * 40);
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <div
            key={t.name}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
          >
            <div className="relative flex flex-col items-center">
              {/* Beam to center */}
              <div
                className="zapla-satellite-beam absolute left-1/2 top-1/2 h-px w-24 origin-left bg-gradient-to-r from-zapla-blue/60 to-transparent"
                style={{
                  width: radius - 40,
                  transform: `rotate(${Math.atan2(-y, -x) * (180 / Math.PI)}deg)`,
                }}
              />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-zapla-sm">
                <ToolLogo tool={t} size={22} />
              </div>
            </div>
          </div>
        );
      })}

      <p className="absolute bottom-5 left-0 right-0 text-center text-xs text-white/60">
        16 satellites. One command centre.
      </p>
    </div>
  );
}

function PillarIdeasV2() {
  return (
    <main className="min-h-screen bg-zapla-bg font-zapla">
      <header className="mx-auto max-w-6xl px-6 pt-16 pb-6">
        <a href="/" className="text-sm text-zapla-blue hover:underline">← Back to pricing</a>
        <h1 className="mt-4 font-zapla text-4xl font-bold text-zapla-ink">
          6 more ways to show "16 tools → 1 Zapla"
        </h1>
        <p className="mt-2 max-w-2xl text-zapla-muted">
          Fresh visual metaphors, including the funnel direction from your reference. Pick the one that feels right and I'll refine + animate it into the pricing page.
        </p>
      </header>

      <Frame n={1} title="The Funnel" tagline="Every tool pours into one Zapla output">
        <Idea1 />
      </Frame>
      <Frame n={2} title="The Vortex" tagline="Scattered tools spiral into a single gravity well">
        <Idea2 />
      </Frame>
      <Frame n={3} title="The Magnet" tagline="Zapla pulls the messy stack into clean alignment">
        <Idea3 />
      </Frame>
      <Frame n={4} title="The Blender" tagline="16 ingredients blend into one smooth system">
        <Idea4 />
      </Frame>
      <Frame n={5} title="Shredder → Printer" tagline="Messy invoices in, one clean bill out">
        <Idea5 />
      </Frame>
      <Frame n={6} title="Satellite Hub" tagline="Every tool orbits one central command centre">
        <Idea6 />
      </Frame>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl border border-zapla-line bg-white p-6 shadow-zapla">
          <h3 className="font-zapla text-lg font-bold text-zapla-ink">Also still on the table</h3>
          <p className="mt-1 text-sm text-zapla-muted">
            The single-frame browser tab collapse can be refined so all 16 tabs disappear and one Zapla tab appears in one browser window — no split. Want me to add that as Idea 7 here, or build it directly?
          </p>
        </div>
      </div>
    </main>
  );
}
