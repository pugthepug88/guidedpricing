/* Concept-only, isolated art direction. Major iteration V3.
   V1 and V2 remain frozen as benchmarks.

   V3 changes the visual grammar rather than polishing V2:
   - one dominant human world at a time
   - no equal-card grid at the recognition peak
   - one persistent follow-through thread carries meaning across industries
   - the same thread resolves into the product record
   - max three moving films on desktop; max one on mobile
*/
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Check, CreditCard, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const MEDIA = "/concept/multi-world-v2";
const DISPLAY = '"Inter Tight", "Manrope", system-ui, sans-serif';
const BG = "#07090E";
const INK = "#0B1220";
const PURPLE = "#7254F3";

const worlds = [
  { key: "mechanic", trade: "Automotive workshop", objectPosition: "50% 46%" },
  { key: "broker", trade: "Mortgage broker", objectPosition: "48% 52%" },
  { key: "agent", trade: "Property agency", objectPosition: "52% 50%" },
] as const;

type World = (typeof worlds)[number];

type Beat = { at: number; label: string };
const beats: Beat[] = [
  { at: 0.04, label: "New enquiry" },
  { at: 0.20, label: "Reply sent" },
  { at: 0.36, label: "Booking offered" },
  { at: 0.51, label: "Booked" },
  { at: 0.63, label: "Paid" },
  { at: 0.73, label: "Review requested" },
];

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const p = useMotionValue(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "150px" });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    const tick = () => {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const travel = Math.max(1, r.height - window.innerHeight);
        p.set(Math.min(1, Math.max(0, -r.top / travel)));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [p, ref, visible]);

  return p;
}

function useBeat(p: MotionValue<number>) {
  const [index, setIndex] = useState(0);
  useEffect(() => p.on("change", (v) => {
    let next = 0;
    beats.forEach((b, i) => { if (v >= b.at) next = i; });
    setIndex((old) => Math.max(old, next));
  }), [p]);
  return beats[index];
}

function Film({ world, active, className }: { world: World; active: boolean; className?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active]);

  return (
    <div className={cn("relative overflow-hidden bg-[#0C1018]", className)}>
      {active ? (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="metadata"
          poster={`${MEDIA}/${world.key}.jpg`}
          className="h-full w-full object-cover"
          style={{ objectPosition: world.objectPosition }}
        >
          <source src={`${MEDIA}/${world.key}.mp4`} type="video/mp4" />
        </video>
      ) : (
        <img
          src={`${MEDIA}/${world.key}.jpg`}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: world.objectPosition }}
        />
      )}
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,14,.04),rgba(7,9,14,.35))]" />
    </div>
  );
}

function Thread({ label, compact = false }: { label: string; compact?: boolean }) {
  return (
    <div className="relative flex items-center gap-3 text-white">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#7254F3] shadow-[0_0_0_6px_rgba(114,84,243,.13)]" />
      <div className="h-px min-w-8 flex-1 bg-gradient-to-r from-[#7254F3] via-[#8A75F7] to-white/20" />
      <span className={cn("whitespace-nowrap uppercase tracking-[0.18em] text-white/72", compact ? "text-[10px]" : "text-[11px]")}>{label}</span>
    </div>
  );
}

function HeroCopy({ mobile }: { mobile: boolean }) {
  return (
    <div className="relative z-20">
      <p className={cn("font-medium uppercase tracking-[0.17em] text-white/55", mobile ? "text-[9px] leading-[1.45]" : "text-[11px]")}>Built for teams where follow-through cannot depend on memory.</p>
      <h1 className={cn("mt-4 tracking-[-0.052em] text-white", mobile ? "text-[47px] leading-[.98]" : "text-[76px] leading-[.94]")} style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
        You lead.<br />Zapla follows through.
      </h1>
      <p className={cn("text-white/62", mobile ? "mt-5 text-[15px] leading-[1.55]" : "mt-6 max-w-[590px] text-[18px] leading-[1.6]")}>Your team does the work. Zapla keeps customers moving — enquiries, replies, bookings, payments, reviews and everything between.</p>
      <div className={cn("flex items-center", mobile ? "mt-6 gap-5" : "mt-7 gap-7")}>
        <a href="https://zapla.io/booking" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-[#090B10] transition-transform hover:scale-[1.02]">Book a demo <ArrowRight className="h-4 w-4" /></a>
        <a href="#zapla-product" className="text-[14px] font-medium text-white/72 hover:text-white">See how it works</a>
      </div>
    </div>
  );
}

function ProductRecord() {
  return (
    <div id="zapla-product" className="h-full w-full overflow-hidden rounded-[18px] bg-[#F7F8FB] text-[#0B1220] shadow-[0_40px_120px_-45px_rgba(0,0,0,.45)]">
      <div className="flex h-12 items-center border-b border-black/5 bg-white px-5 text-[12px] font-semibold">ZAPLA</div>
      <div className="grid h-[calc(100%-48px)] grid-cols-[190px_1fr]">
        <aside className="border-r border-black/5 bg-[#F1F3F8] p-5 text-[11px] leading-8 text-slate-500">Customers<br />Conversations<br />Bookings<br />Payments<br />Reviews</aside>
        <main className="p-7">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Customer record</p>
          <h3 className="mt-2 text-[29px] font-semibold tracking-[-0.035em]">Michael Tran</h3>
          <p className="mt-1 text-[13px] text-slate-500">Marrickville · Automotive workshop</p>
          <div className="mt-8 flex items-center gap-2 text-[11px] font-medium text-slate-600">
            <span className="h-2 w-2 rounded-full bg-[#7254F3]" />
            <span className="h-px flex-1 bg-[#7254F3]/45" />
            <span>Enquiry</span><Check className="h-3.5 w-3.5" />
            <span>Booked</span><Check className="h-3.5 w-3.5" />
            <span>Paid</span><Check className="h-3.5 w-3.5" />
            <span>Review</span>
          </div>
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between border-b border-black/5 pb-3 text-[13px]"><span>Reply sent and booking offered</span><span className="text-slate-400">09:12</span></div>
            <div className="flex items-center justify-between border-b border-black/5 pb-3 text-[13px]"><span>Booking confirmed · Thu 10:30</span><Check className="h-4 w-4 text-emerald-500" /></div>
            <div className="flex items-center justify-between border-b border-black/5 pb-3 text-[13px]"><span className="flex items-center gap-2"><CreditCard className="h-4 w-4" />Payment · A$1,280</span><Check className="h-4 w-4 text-emerald-500" /></div>
            <div className="flex items-center justify-between text-[13px]"><span className="flex items-center gap-2"><Star className="h-4 w-4" />Review request queued</span><span className="text-slate-400">Tomorrow</span></div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Desktop({ p, beat, reduced }: { p: MotionValue<number>; beat: Beat; reduced: boolean }) {
  const heroOp = useTransform(p, [0, .08, .17], [1, 1, 0]);
  const heroY = useTransform(p, [.08, .17], [0, -32]);
  const mechOp = useTransform(p, [0, .49, .60], [1, 1, 0]);
  const brokerOp = useTransform(p, [.13, .20, .52, .60], [0, 1, 1, 0]);
  const agentOp = useTransform(p, [.27, .34, .52, .60], [0, 1, 1, 0]);
  const threadOp = useTransform(p, [.04, .08, .58, .70], [0, 1, 1, 0]);
  const stmtOp = useTransform(p, [.38, .44, .54, .59], [0, 1, 1, 0]);
  const productOp = useTransform(p, [.58, .68], [0, 1]);
  const productScale = useTransform(p, [.58, .72], [.92, 1]);
  const bridgeOp = useTransform(p, [.72, .80], [0, 1]);
  const active = !reduced;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute left-[4.8%] top-[50%] z-30 w-[35%] -translate-y-1/2" style={{ opacity: heroOp, y: heroY }}><HeroCopy mobile={false} /></motion.div>

      <motion.div className="absolute inset-y-0 right-0 w-[61%]" style={{ opacity: mechOp }}>
        <Film world={worlds[0]} active={active} className="h-full w-full" />
      </motion.div>

      <motion.div className="absolute left-[48%] top-[13%] z-20 h-[40%] w-[36%] shadow-[0_45px_90px_-30px_rgba(0,0,0,.65)]" style={{ opacity: brokerOp }}>
        <Film world={worlds[1]} active={active} className="h-full w-full" />
      </motion.div>

      <motion.div className="absolute right-[3%] top-[49%] z-20 h-[29%] w-[29%] shadow-[0_45px_90px_-30px_rgba(0,0,0,.65)]" style={{ opacity: agentOp }}>
        <Film world={worlds[2]} active={active} className="h-full w-full" />
      </motion.div>

      <motion.div className="absolute bottom-[12%] left-[6%] z-40 w-[50%]" style={{ opacity: threadOp }}><Thread label={beat.label} /></motion.div>

      <motion.div className="absolute left-[6%] top-[57%] z-40 w-[38%] text-[42px] leading-[1.04] tracking-[-0.045em] text-white" style={{ opacity: stmtOp, fontFamily: DISPLAY, fontWeight: 500 }}>
        Different work.<br />Same follow-through.
      </motion.div>

      <motion.div className="absolute left-[8%] top-[13%] z-50 h-[70%] w-[84%] origin-center" style={{ opacity: productOp, scale: productScale }}><ProductRecord /></motion.div>
      <motion.div className="absolute left-[8%] top-[5.5%] z-[60]" style={{ opacity: bridgeOp }}>
        <h2 className="text-[46px] leading-none tracking-[-0.045em] text-[#0B1220]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>One customer. Everything connected.</h2>
      </motion.div>
    </div>
  );
}

function Mobile({ p, beat, reduced }: { p: MotionValue<number>; beat: Beat; reduced: boolean }) {
  const heroOp = useTransform(p, [0, .10, .17], [1, 1, 0]);
  const filmOp = useTransform(p, [0, .56, .64], [1, 1, 0]);
  const productOp = useTransform(p, [.60, .70], [0, 1]);
  const idx = useMemo(() => beat.at < .20 ? 0 : beat.at < .36 ? 1 : 2, [beat]);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-x-0 top-0 h-[56%]" style={{ opacity: filmOp }}>
        <Film world={worlds[idx]} active={!reduced} className="h-full w-full" />
      </motion.div>
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,14,.05)_0%,rgba(7,9,14,.28)_40%,#07090E_67%)]" />
      <motion.div className="absolute left-6 right-6 top-[48%] z-20" style={{ opacity: heroOp }}><HeroCopy mobile /></motion.div>
      <div className="absolute bottom-[8%] left-7 right-7 z-30"><Thread label={beat.label} compact /></div>
      <motion.div className="absolute inset-x-4 top-[13%] z-40 h-[70%]" style={{ opacity: productOp }}><ProductRecord /></motion.div>
    </div>
  );
}

export function MultiWorldFollowThroughV3() {
  const wrap = useRef<HTMLElement | null>(null);
  const p = useScrollProgress(wrap);
  const beat = useBeat(p);
  const mobile = useIsMobile();
  const reduced = !!useReducedMotion();

  return (
    <main className="min-h-screen bg-[#07090E]" style={{ background: BG }}>
      <section ref={wrap} className={cn("relative", mobile ? "h-[430vh]" : "h-[520vh]")}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {mobile ? <Mobile p={p} beat={beat} reduced={reduced} /> : <Desktop p={p} beat={beat} reduced={reduced} />}
        </div>
      </section>
      <section className="bg-white px-6 py-24 text-center">
        <h2 className="mx-auto max-w-[760px] text-[42px] leading-[1.04] tracking-[-0.045em]" style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}>While you do the work, Zapla handles the follow-through.</h2>
        <p className="mx-auto mt-5 max-w-[650px] text-[16px] leading-[1.65] text-slate-500">Every enquiry, message, booking, payment and review stays connected in one customer record.</p>
      </section>
    </main>
  );
}
