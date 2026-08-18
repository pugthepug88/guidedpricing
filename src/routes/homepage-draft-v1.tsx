import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Phone, Sparkles, CalendarCheck, UserRoundPlus } from "lucide-react";
import { BelowHeroV5 } from "@/components/v5/below-hero";
import { AppShell } from "@/components/v5/kit";
import { SceneContacts } from "@/components/v5/scenes-a";
import logo from "@/assets/zapla-logo-green.png.asset.json";

export const Route = createFileRoute("/homepage-draft-v1")({
  head: () => ({
    meta: [
      { title: "Homepage Draft V1 — Zapla" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Zapla homepage draft V1 — conversion and positioning workspace." },
    ],
  }),
  component: HomepageDraftV1,
});

const BOOK_URL = "https://zapla.io/booking";

function HomepageDraftV1() {
  return (
    <main className="min-h-screen bg-white font-zapla text-zapla-ink">
      <Hero />
      <Fragmentation />
      <Journey />
      <AiWorkforce />
      <BelowHeroV5 />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-100">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(900px 480px at 78% 8%, rgba(37,99,255,0.09), transparent 70%), radial-gradient(700px 420px at 96% 62%, rgba(139,92,246,0.08), transparent 70%), radial-gradient(600px 380px at 4% 30%, rgba(34,211,238,0.07), transparent 70%)" }} />
      <header className="relative mx-auto flex max-w-[1360px] items-center gap-3 px-5 py-5 sm:px-8">
        <img src={logo.url} alt="Zapla" className="h-8 w-8 rounded-[10px]" />
        <span className="text-[15px] font-semibold tracking-tight">Zapla</span>
        <span className="ml-2 rounded-full border border-slate-200 bg-white/70 px-2 py-[2px] text-[10px] font-medium text-slate-400">Homepage draft v1</span>
      </header>
      <div className="relative mx-auto grid max-w-[1360px] items-center gap-10 px-5 pb-20 pt-5 sm:px-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        <div className="max-w-[430px]">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-zapla-blue">AI-powered business platform</p>
          <h1 className="mt-4 text-[42px] font-extrabold leading-[1.03] tracking-[-0.035em] sm:text-[52px]">You lead.<br />Zapla follows through.</h1>
          <p className="mt-5 text-[15.5px] leading-relaxed text-zapla-muted">Capture every enquiry, keep every conversation in one place, and move customers from first message to booked, paid and returning.</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a href={BOOK_URL} className="inline-flex items-center gap-2 rounded-full bg-zapla-blue px-6 py-3 text-[14px] font-semibold text-white shadow-zapla-blue">Book a walkthrough <ArrowRight className="h-4 w-4" /></a>
            <span className="text-[13px] font-semibold text-slate-600">See Zapla in action</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-medium text-slate-500">
            {["Unlimited users", "One connected platform", "Built around your business"].map((x) => <span key={x} className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" />{x}</span>)}
          </div>
        </div>
        <div className="rounded-[22px] border border-slate-200/80 bg-white p-1.5 shadow-[0_40px_90px_-40px_rgba(15,23,42,0.35)]">
          <div className="h-[520px] lg:h-[580px]">
            <AppShell activeKey="contacts" title="Contacts" subtitle="Dormant customers wake up">
              <div className="absolute inset-0"><SceneContacts phase={11} elapsedMs={0} reduced /></div>
            </AppShell>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fragmentation() {
  const tools = ["Leads", "SMS", "Email", "Bookings", "CRM", "Reviews", "Payments", "Social"];
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-[1120px] text-center">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-blue-600">One connected system</p>
        <h2 className="mx-auto mt-4 max-w-[760px] text-[34px] font-bold leading-tight tracking-[-0.03em] sm:text-[46px]">Your customer journey shouldn't live across eight different apps.</h2>
        <p className="mx-auto mt-5 max-w-[650px] text-[16px] leading-relaxed text-slate-500">When leads, conversations and follow-up live in different places, things get missed. Zapla connects the customer journey from first enquiry to repeat business.</p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {tools.map((tool) => <div key={tool} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] font-semibold text-slate-600 shadow-sm">{tool}</div>)}
          <ArrowRight className="mx-2 hidden h-5 w-5 text-slate-300 md:block" />
          <div className="flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-[15px] font-bold text-white shadow-xl"><img src={logo.url} alt="" className="h-7 w-7 rounded-lg" />Zapla</div>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const stages = [
    ["01", "Capture", "A new enquiry becomes a real customer record."],
    ["02", "Communicate", "Every message stays connected to the same customer."],
    ["03", "Convert", "Follow-up turns interest into a booked opportunity."],
    ["04", "Deliver", "Your team knows what happens next."],
    ["05", "Retain", "Reviews and reminders happen after the job."],
    ["06", "Grow", "Past customers come back instead of disappearing."],
  ];
  return (
    <section className="bg-slate-50 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="max-w-[720px]"><p className="text-[12px] font-bold uppercase tracking-[0.16em] text-blue-600">One customer. One continuous journey.</p><h2 className="mt-4 text-[34px] font-bold leading-tight tracking-[-0.03em] sm:text-[46px]">From first enquiry to the next sale, nothing falls between the cracks.</h2></div>
        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {stages.map(([n,t,d]) => <div key={n} className="rounded-2xl border border-slate-200 bg-white p-6"><span className="text-[11px] font-bold text-blue-500">{n}</span><h3 className="mt-4 text-[18px] font-bold">{t}</h3><p className="mt-2 text-[13.5px] leading-relaxed text-slate-500">{d}</p></div>)}
        </div>
      </div>
    </section>
  );
}

function AiWorkforce() {
  return (
    <section className="relative overflow-hidden bg-[#07090d] px-5 py-28 text-white sm:px-8">
      <div aria-hidden className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(700px 420px at 70% 30%, rgba(37,99,255,.24), transparent 70%), radial-gradient(600px 380px at 25% 80%, rgba(139,92,246,.16), transparent 70%)" }} />
      <div className="relative mx-auto max-w-[1180px]">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-blue-400">AI that does the work</p>
        <h2 className="mt-5 max-w-[820px] text-[40px] font-bold leading-[1.05] tracking-[-0.04em] sm:text-[58px]">Some work shouldn't wait for someone to do it.</h2>
        <p className="mt-6 max-w-[650px] text-[16px] leading-relaxed text-slate-400">Zapla's AI works inside the same customer system as your team — answering, following up and moving work forward while you're busy doing the actual job.</p>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <AiCard icon={<Phone className="h-5 w-5" />} label="Incoming call" title="AI answers while you're busy" body="A customer calls. Zapla answers, understands what they need and keeps the conversation moving." />
          <AiCard icon={<CalendarCheck className="h-5 w-5" />} label="Appointment" title="A conversation becomes a booking" body="Availability is checked and the customer can move from enquiry to an actual appointment." />
          <AiCard icon={<UserRoundPlus className="h-5 w-5" />} label="Customer record" title="Your team gets the context" body="The lead, conversation and next action arrive inside Zapla instead of disappearing into another tool." />
        </div>
        <div className="mt-5 flex items-center gap-2 text-[12px] text-slate-500"><Sparkles className="h-4 w-4 text-blue-400" />AI is part of the workflow, not another tab to manage.</div>
      </div>
    </section>
  );
}

function AiCard({ icon, label, title, body }: { icon: React.ReactNode; label: string; title: string; body: string }) {
  return <div className="rounded-[22px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur"><div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300">{icon}{label}</div><h3 className="mt-8 text-[20px] font-semibold tracking-tight">{title}</h3><p className="mt-3 text-[13.5px] leading-relaxed text-slate-400">{body}</p></div>;
}
