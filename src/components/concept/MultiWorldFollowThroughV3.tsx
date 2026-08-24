/* Concept-only, isolated art direction. Major iteration V3.
   V1 and V2 remain frozen as benchmarks.

   V3 deliberately starts from V2's visual system rather than inventing a
   separate look: same footage, cyan accent, light/dark transition, Zapla
   product environment, typography and scroll-cinematic language.

   V3 changes only the narrative/composition:
   - one dominant human film with unequal editorial fragments, never a tile grid
   - maximum three moving films on desktop and one on mobile
   - one persistent follow-through thread carries a customer state across worlds
   - that same thread physically resolves into the Zapla customer record
   - locked hero / bridge / closing copy and larger mobile typography
*/
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowRight, CalendarDays, Check, CreditCard, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell, Face } from "@/components/v5/kit";
import { FACE } from "@/components/v5/faces";
import { useIsMobile } from "@/hooks/use-mobile";

const MEDIA = "/concept/multi-world-v2";
const NAV = 66;
const DISPLAY = '"Inter Tight", "Manrope", system-ui, sans-serif';
const INK = "#0B1220";
const CYAN = "#06B6D4";

type World = {
  key: string;
  file: string;
  trade: string;
  start: number;
  end: number;
  objectPosition?: string;
};

const MECHANIC: World = {
  key: "mechanic",
  file: "mechanic",
  trade: "Automotive workshop",
  start: 1.2,
  end: 8.6,
  objectPosition: "50% 46%",
};
const BROKER: World = {
  key: "broker",
  file: "broker",
  trade: "Mortgage broker",
  start: 5,
  end: 13,
  objectPosition: "48% 52%",
};
const AGENT: World = {
  key: "agent",
  file: "agent",
  trade: "Property agency",
  start: 6,
  end: 12.5,
  objectPosition: "52% 50%",
};
const FACILITIES: World = {
  key: "facilities",
  file: "facilities",
  trade: "Service operations",
  start: 0.5,
  end: 6.5,
  objectPosition: "42% 40%",
};

const STATES = [
  { at: 0.03, label: "New enquiry" },
  { at: 0.18, label: "Reply sent" },
  { at: 0.31, label: "Booking offered" },
  { at: 0.44, label: "Booked" },
  { at: 0.56, label: "Paid" },
  { at: 0.69, label: "Review requested" },
] as const;

type Box = [number, number, number, number];

function useBoxStyle(p: MotionValue<number>, at: number[], boxes: Box[]) {
  return {
    left: useTransform(p, at, boxes.map((b) => `${b[0]}%`)),
    top: useTransform(p, at, boxes.map((b) => `${b[1]}%`)),
    width: useTransform(p, at, boxes.map((b) => `${b[2]}%`)),
    height: useTransform(p, at, boxes.map((b) => `${b[3]}%`)),
  };
}

function Clip({ world, mounted, playing, reduced }: { world: World; mounted: boolean; playing: boolean; reduced: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    if (playing) {
      if (v.readyState >= 1 && (v.currentTime < world.start || v.currentTime > world.end)) v.currentTime = world.start;
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [playing, reduced, world.end, world.start]);

  if (reduced || !mounted) {
    return <img src={`${MEDIA}/${world.file}.jpg`} alt="" aria-hidden className="h-full w-full object-cover" style={{ objectPosition: world.objectPosition }} />;
  }

  return (
    <video
      ref={ref}
      src={`${MEDIA}/${world.file}.mp4`}
      poster={`${MEDIA}/${world.file}.jpg`}
      muted
      playsInline
      preload="metadata"
      aria-hidden
      className="h-full w-full object-cover"
      style={{ objectPosition: world.objectPosition }}
      onLoadedMetadata={(e) => {
        e.currentTarget.currentTime = world.start;
        if (playing) void e.currentTarget.play().catch(() => {});
      }}
      onTimeUpdate={(e) => {
        if (e.currentTarget.currentTime >= world.end || e.currentTarget.currentTime < world.start - 0.05) e.currentTarget.currentTime = world.start;
      }}
    />
  );
}

function Film({ world, mounted, playing, reduced, veil = 0.12 }: { world: World; mounted: boolean; playing: boolean; reduced: boolean; veil?: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0A0E17] shadow-[0_50px_110px_-45px_rgba(0,0,0,0.82)]">
      <Clip world={world} mounted={mounted} playing={playing} reduced={reduced} />
      <span className="pointer-events-none absolute inset-0 bg-[#070B14]" style={{ opacity: veil }} aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-[#070B14]/70 to-transparent" />
      <div className="pointer-events-none absolute bottom-3 left-3 right-3">
        <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50">{world.trade}</div>
      </div>
    </div>
  );
}

function HeroCopy({ mobile }: { mobile: boolean }) {
  return (
    <>
      <div className="flex items-center gap-2.5">
        <span className="h-[2px] w-6 shrink-0" style={{ background: CYAN }} aria-hidden />
        <span className={cn("font-semibold uppercase tracking-[0.2em] text-white/65", mobile ? "text-[8.5px] leading-[1.45]" : "text-[10.5px]")}>BUILT FOR TEAMS WHERE FOLLOW-THROUGH CANNOT DEPEND ON MEMORY.</span>
      </div>
      <h1 className={cn("tracking-[-0.04em] text-white", mobile ? "mt-4 text-[48px] leading-[0.98]" : "mt-5 text-[76px] leading-[0.98]")} style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
        You lead.<br />Zapla follows through.
      </h1>
      <p className={cn("text-white/70", mobile ? "mt-4 text-[14px] leading-[1.55]" : "mt-6 max-w-[500px] text-[15.5px] leading-[1.6]")}>
        Your team does the work. Zapla keeps customers moving — enquiries, replies, bookings, payments, reviews and everything between.
      </p>
      <div className={cn("flex flex-wrap items-center gap-3", mobile ? "mt-5" : "mt-7")}>
        <a href="https://zapla.io/booking" className="inline-flex h-[46px] items-center gap-2 rounded-[10px] px-5 text-[14px] font-semibold text-white md:h-[49px] md:px-6" style={{ background: CYAN }}>
          Book a demo <ArrowRight className="h-4 w-4" />
        </a>
        <a href="#zapla-product-v3" className="inline-flex h-[46px] items-center rounded-[10px] border border-white/25 px-5 text-[14px] font-semibold text-white md:h-[49px]">See how it works</a>
      </div>
    </>
  );
}

function useSequenceScroll(wrap: React.RefObject<HTMLDivElement | null>) {
  const p = useMotionValue(0);
  const [stage, setStage] = useState(0);
  const [stateIndex, setStateIndex] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let raf = 0;
    let visible = true;
    let maxP = 0;
    let lastStage = -1;

    const tick = () => {
      const total = el.offsetHeight - (window.innerHeight - NAV);
      const raw = total > 0 ? (NAV - el.getBoundingClientRect().top) / total : 0;
      const v = Math.min(1, Math.max(0, raw));
      p.set(v);

      if (v > maxP) {
        maxP = v;
        let next = 0;
        STATES.forEach((s, i) => { if (maxP >= s.at) next = i; });
        setStateIndex((old) => Math.max(old, next));
      }

      const nextStage = v < 0.14 ? 0 : v < 0.29 ? 1 : v < 0.42 ? 2 : v < 0.62 ? 3 : 4;
      if (nextStage !== lastStage) {
        lastStage = nextStage;
        setStage(nextStage);
      }
      if (visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    }, { rootMargin: "10% 0px" });

    io.observe(el);
    raf = requestAnimationFrame(tick);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [p, wrap]);

  return { p, stage, label: STATES[stateIndex].label };
}

function FollowThread({ p, label, mobile }: { p: MotionValue<number>; label: string; mobile: boolean }) {
  const box = mobile
    ? useBoxStyle(p, [0.04, 0.59, 0.74], [[6, 53, 88, 8], [6, 57, 88, 8], [11, 25, 74, 6]])
    : useBoxStyle(p, [0.04, 0.58, 0.74], [[6, 84, 49, 7], [6, 82, 49, 7], [27, 29, 47, 6]]);
  const surface = useTransform(p, [0.61, 0.70], [0, 1]);
  const fg = useTransform(surface, [0, 1], ["rgba(255,255,255,.88)", "rgba(11,18,32,.74)"]);
  const muted = useTransform(surface, [0, 1], ["rgba(255,255,255,.48)", "rgba(100,116,139,.9)"]);
  const line = useTransform(surface, [0, 1], ["rgba(6,182,212,.92)", "rgba(6,182,212,.56)"]);
  const opacity = useTransform(p, [0.02, 0.06, 0.91, 0.96], [0, 1, 1, 0]);

  return (
    <motion.div className="pointer-events-none absolute z-[70]" style={{ ...box, opacity }}>
      <div className="flex h-full w-full items-center gap-3">
        <span className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: CYAN }} />
        <motion.span className="h-px flex-1" style={{ background: line }} />
        <div className="min-w-0 shrink-0 text-right">
          <motion.div className="text-[8.5px] font-semibold uppercase tracking-[0.18em]" style={{ color: muted }}>Follow-through</motion.div>
          <motion.div key={label} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className={cn("mt-1 font-medium tracking-[-0.01em]", mobile ? "text-[11px]" : "text-[12.5px]")} style={{ color: fg, fontFamily: DISPLAY }}>{label}</motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const THREAD = [
  { from: "them", text: "Hi, the brakes are grinding. Can you look this week?", time: "8:42 AM" },
  { from: "us", text: "Quote attached. Thursday 9:00 AM is open, I'll hold it.", time: "8:44 AM" },
  { from: "them", text: "Booked. See you Thursday.", time: "9:07 AM" },
];

function SysRow({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: "blue" | "green" | "slate" }) {
  const tones = { blue: "bg-blue-50 text-blue-600", green: "bg-emerald-50 text-emerald-600", slate: "bg-slate-100 text-slate-500" };
  return (
    <div className="flex items-center gap-2.5 rounded-[8px] border border-slate-200/80 px-2.5 py-2">
      <span className={cn("flex h-6 w-6 items-center justify-center rounded-[7px]", tones[tone])}>{icon}</span>
      <div className="min-w-0"><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</div><div className="truncate text-[12px] font-semibold text-slate-900">{value}</div></div>
    </div>
  );
}

function CustomerRecord({ compact }: { compact: boolean }) {
  return (
    <div id="zapla-product-v3" className="h-full w-full">
      <AppShell activeKey="inbox" title="Michael Tran" subtitle="Customer · Marrickville, NSW">
        <div className="flex h-full min-h-0">
          <div className="hidden w-[206px] shrink-0 flex-col border-r border-slate-200/80 bg-white lg:flex">
            <div className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Conversations</div>
            {[
              { n: "Michael Tran", m: "Booked. See you Thursday.", f: FACE.daniel, on: true },
              { n: "Emma & Josh", m: "Confirmed · Sat 10:00", f: FACE.maya },
              { n: "Daniel Whitmore", m: "Lodged with lender", f: FACE.tom },
              { n: "Northline Depot", m: "Scheduled · Tue 7:00", f: FACE.sophie },
            ].map((c) => (
              <div key={c.n} className={cn("flex items-center gap-2.5 px-3 py-2.5", c.on && "bg-[#F3F7FF] shadow-[inset_2px_0_0_#2563ff]")}>
                <Face src={c.f} size={26} /><div className="min-w-0"><div className="truncate text-[12px] font-semibold text-slate-900">{c.n}</div><div className="truncate text-[11px] text-slate-400">{c.m}</div></div>
              </div>
            ))}
          </div>

          <div className="flex min-w-0 flex-1 flex-col bg-[#F8FAFF]">
            <div className="flex items-center gap-2.5 border-b border-slate-200/80 bg-white px-4 py-2.5">
              <Face src={FACE.daniel} size={26} />
              <div><div className="text-[12.5px] font-semibold leading-none text-slate-900">Michael Tran</div><div className="mt-[6px] flex items-center gap-1.5"><span className="h-[5px] w-[5px] rounded-full" style={{ background: CYAN }} /><span className="text-[11.5px] font-medium leading-none text-slate-700">Paid · A$1,280</span></div></div>
            </div>
            <div className="border-b border-slate-200/70 bg-white px-4 py-3">
              <div className="flex items-center gap-2 text-[9.5px] font-semibold uppercase tracking-[0.13em] text-slate-400"><span className="h-[6px] w-[6px] rounded-full" style={{ background: CYAN }} /><span className="h-px flex-1 bg-[#06B6D4]/45" /><span>Enquiry</span><Check className="h-3 w-3" /><span>Booked</span><Check className="h-3 w-3" /><span>Paid</span><Check className="h-3 w-3" /><span>Review</span></div>
            </div>
            <div className="flex flex-1 flex-col justify-end gap-2.5 p-4">
              {THREAD.map((m) => <div key={m.text} className={cn("flex", m.from === "us" ? "justify-end" : "justify-start")}><div className={cn("max-w-[78%] rounded-[8px] px-3 py-2 text-[12.5px] leading-snug", m.from === "us" ? "bg-zapla-blue text-white" : "border border-slate-200 bg-white text-slate-800")}>{m.text}<div className={cn("mt-1 text-[9.5px] uppercase tracking-[0.12em]", m.from === "us" ? "text-white/65" : "text-slate-400")}>{m.time}</div></div></div>)}
              <div className="mt-3 flex items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-3 py-2.5"><span className="text-[12px] text-slate-400">Write a reply</span><span className="ml-auto inline-flex h-6 items-center rounded-[8px] px-2.5 text-[11px] font-semibold text-white" style={{ background: CYAN }}>Send</span></div>
            </div>
          </div>

          {!compact && <div className="hidden w-[244px] shrink-0 flex-col gap-2.5 border-l border-slate-200/80 bg-white p-3 md:flex"><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Connected</div><SysRow icon={<CalendarDays className="h-3.5 w-3.5" />} label="Booking" value="Thu 9:00 AM · confirmed" tone="blue" /><SysRow icon={<CreditCard className="h-3.5 w-3.5" />} label="Payment" value="A$1,280 paid" tone="green" /><SysRow icon={<Star className="h-3.5 w-3.5" />} label="Review" value="Requested · 2 days after" tone="slate" /></div>}
        </div>
      </AppShell>
    </div>
  );
}

function ProductHeading({ mobile }: { mobile: boolean }) {
  return (
    <><h2 className={cn("tracking-[-0.04em]", mobile ? "text-[25px] leading-[1.06]" : "text-[44px] leading-[1.02]")} style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}>One customer. Everything connected.</h2><p className={cn("text-slate-500", mobile ? "mt-2 max-w-[330px] text-[12.5px] leading-[1.5]" : "mt-3 max-w-[610px] text-[14.5px] leading-[1.6]")}>Every enquiry, message, booking, payment and review stays connected in one customer record.</p></>
  );
}

function DesktopStage({ p, stage, label, reduced }: { p: MotionValue<number>; stage: number; label: string; reduced: boolean }) {
  const mech = useBoxStyle(p, [0, 0.14, 0.29, 0.43, 0.59, 0.66], [[40,0,60,100],[40,0,60,100],[20,5,61,74],[5,8,59,67],[4,11,52,57],[4,11,52,57]]);
  const broker = useBoxStyle(p, [0.15,0.29,0.43,0.59], [[100,14,37,52],[56,15,37,52],[65,10,31,38],[66,12,29,35]]);
  const agent = useBoxStyle(p, [0.30,0.43,0.59], [[100,58,31,28],[70,56,27,27],[72,58,24,23]]);
  const mechOp = useTransform(p, [0,0.58,0.64],[1,1,0]);
  const brokerOp = useTransform(p, [0.15,0.21,0.575,0.635],[0,1,1,0]);
  const agentOp = useTransform(p, [0.30,0.36,0.57,0.63],[0,1,1,0]);
  const heroOp = useTransform(p, [0,0.08,0.15],[1,1,0]);
  const heroY = useTransform(p, [0.08,0.15],[0,-28]);
  const statementOp = useTransform(p, [0.41,0.47,0.57,0.61],[0,1,1,0]);
  const shell = useBoxStyle(p, [0.61,0.74], [[10,23,80,65],[3,18,94,77]]);
  const shellOp = useTransform(p, [0.60,0.67],[0,1]);
  const headOp = useTransform(p, [0.77,0.85],[0,1]);
  const headY = useTransform(p, [0.77,0.85],[14,0]);

  const mechPlay = !reduced && stage <= 3;
  const brokerPlay = !reduced && stage >= 1 && stage <= 3;
  const agentPlay = !reduced && stage >= 2 && stage <= 3;

  return (
    <>
      <motion.div className="absolute overflow-hidden" style={{ ...agent, opacity: agentOp, zIndex: 14 }}><Film world={AGENT} mounted={agentPlay} playing={agentPlay} reduced={reduced} veil={0.11} /></motion.div>
      <motion.div className="absolute overflow-hidden" style={{ ...broker, opacity: brokerOp, zIndex: 17 }}><Film world={BROKER} mounted={brokerPlay} playing={brokerPlay} reduced={reduced} veil={0.10} /></motion.div>
      <motion.div className="absolute overflow-hidden" style={{ ...mech, opacity: mechOp, zIndex: 20 }}><Film world={MECHANIC} mounted={mechPlay} playing={mechPlay} reduced={reduced} veil={0.12} /></motion.div>

      <motion.div className="absolute left-[5.5%] top-1/2 z-30 w-[33%] -translate-y-1/2" style={{ opacity: heroOp, y: heroY }}><HeroCopy mobile={false} /></motion.div>

      <motion.div className="absolute left-[6%] top-[60%] z-40 w-[38%] text-[42px] leading-[1.04] tracking-[-0.04em] text-white [text-shadow:0_2px_28px_rgba(6,10,20,.85)]" style={{ opacity: statementOp, fontFamily: DISPLAY, fontWeight: 500 }}>Different work.<br />Same follow-through.</motion.div>

      <motion.div className="absolute z-40" style={{ ...shell, opacity: shellOp }}><div className="h-full w-full overflow-hidden rounded-[10px] shadow-[0_50px_120px_-40px_rgba(6,10,20,.35)]"><CustomerRecord compact={false} /></div></motion.div>
      <motion.div className="absolute left-[3%] top-[5.5%] z-[60] w-[62%]" style={{ opacity: headOp, y: headY }}><ProductHeading mobile={false} /></motion.div>
      <FollowThread p={p} label={label} mobile={false} />
    </>
  );
}

const MOBILE_ORDER = [MECHANIC, BROKER, AGENT, FACILITIES];

function MobileStage({ p, label, reduced }: { p: MotionValue<number>; label: string; reduced: boolean }) {
  const [active, setActive] = useState(0);
  useEffect(() => p.on("change", (v) => {
    const i = v < .20 ? 0 : v < .34 ? 1 : v < .48 ? 2 : 3;
    setActive((old) => old === i ? old : i);
  }), [p]);

  const film = useBoxStyle(p, [0,0.14,0.56,0.63], [[0,0,100,56],[0,0,100,56],[0,4,90,47],[0,4,90,47]]);
  const filmOp = useTransform(p, [0,0.59,0.65],[1,1,0]);
  const heroOp = useTransform(p, [0,0.08,0.14],[1,1,0]);
  const statementOp = useTransform(p, [0.46,0.51,0.58,0.62],[0,1,1,0]);
  const shell = useBoxStyle(p, [0.62,0.75], [[4,19,92,69],[2,15,96,79]]);
  const shellOp = useTransform(p, [0.61,0.68],[0,1]);
  const headOp = useTransform(p, [0.79,0.87],[0,1]);

  return (
    <>
      <motion.div className="absolute overflow-hidden" style={{ ...film, opacity: filmOp, zIndex: 20 }}>
        <div className="relative h-full w-full bg-[#0A0E17]">
          {MOBILE_ORDER.map((world, i) => <div key={world.key} className="absolute inset-0 transition-opacity duration-500" style={{ opacity: active === i ? 1 : 0 }}><Film world={world} mounted={!reduced && active === i} playing={!reduced && active === i} reduced={reduced} veil={0.13} /></div>)}
        </div>
      </motion.div>

      <motion.div className="absolute left-[6%] top-[60%] z-30 w-[88%]" style={{ opacity: heroOp }}><HeroCopy mobile /></motion.div>
      <motion.div className="absolute left-[6%] top-[58%] z-40 w-[88%] text-[28px] leading-[1.06] tracking-[-0.04em] text-white" style={{ opacity: statementOp, fontFamily: DISPLAY, fontWeight: 500 }}>Different work.<br />Same follow-through.</motion.div>

      <motion.div className="absolute z-40" style={{ ...shell, opacity: shellOp }}><div className="h-full w-full overflow-hidden rounded-[10px] shadow-[0_40px_90px_-35px_rgba(6,10,20,.35)]"><CustomerRecord compact /></div></motion.div>
      <motion.div className="absolute left-[6%] top-[3%] z-[60] w-[88%]" style={{ opacity: headOp }}><ProductHeading mobile /></motion.div>
      <FollowThread p={p} label={label} mobile />
    </>
  );
}

function Sequence({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const { p, stage, label } = useSequenceScroll(wrap);
  const canvas = useTransform(p, [0.595,0.655], ["#080C14", "#F5F6FA"]);
  return (
    <div ref={wrap} data-seq="mwft-v3-v2-derived" className={mobile ? "relative h-[560vh]" : "relative h-[640vh]"}>
      <motion.div className="sticky w-full overflow-hidden" style={{ top: NAV, height: `calc(100vh - ${NAV}px)`, background: canvas }}>
        {mobile ? <MobileStage p={p} label={label} reduced={reduced} /> : <DesktopStage p={p} stage={stage} label={label} reduced={reduced} />}
      </motion.div>
    </div>
  );
}

export function MultiWorldFollowThroughV3() {
  const reduced = !!useReducedMotion();
  const mobile = useIsMobile();
  return (
    <div className="bg-[#F5F6FA]">
      <Sequence reduced={reduced} mobile={mobile} />
      <section className="border-t border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-6 py-16 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-[700px] text-[30px] leading-[1.08] tracking-[-0.035em] md:text-[38px]" style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}>While you do the work, Zapla handles the follow-through.</h2>
            <p className="mt-3 max-w-[650px] text-[14.5px] leading-[1.6] text-slate-500">Every enquiry, message, booking, payment and review stays connected in one customer record.</p>
          </div>
          <a href="https://zapla.io/booking" className="inline-flex h-[49px] shrink-0 items-center gap-2 rounded-[10px] px-6 text-[14.5px] font-semibold text-white" style={{ background: CYAN }}>Book a demo <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>
    </div>
  );
}
