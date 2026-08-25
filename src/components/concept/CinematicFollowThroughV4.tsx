import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { ArrowRight, CalendarDays, Check, CreditCard, Star } from "lucide-react";
import { AppShell } from "@/components/v5/kit";
import { useIsMobile } from "@/hooks/use-mobile";

const MEDIA = "/concept/multi-world-v2";
const NAV = 66;
const CYAN = "#06B6D4";
const INK = "#111318";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';

type World = {
  key: string;
  file: string;
  trade: string;
  start: number;
  end: number;
  objectPosition: string;
};

const WORLDS: World[] = [
  { key: "mechanic", file: "mechanic", trade: "Automotive workshop", start: 1.2, end: 8.6, objectPosition: "50% 46%" },
  { key: "broker", file: "broker", trade: "Mortgage broker", start: 5, end: 13, objectPosition: "48% 52%" },
  { key: "agent", file: "agent", trade: "Property agency", start: 6, end: 12.5, objectPosition: "52% 50%" },
  { key: "facilities", file: "facilities", trade: "Service operations", start: 0.5, end: 6.5, objectPosition: "42% 40%" },
];

const THREAD_STATES = [
  { at: 0.04, label: "New enquiry" },
  { at: 0.18, label: "Reply sent" },
  { at: 0.31, label: "Booking offered" },
  { at: 0.43, label: "Booked" },
  { at: 0.54, label: "Paid" },
  { at: 0.64, label: "Review requested" },
] as const;

function useStoryScroll(ref: React.RefObject<HTMLDivElement | null>) {
  const p = useMotionValue(0);
  const [worldIndex, setWorldIndex] = useState(0);
  const [stateIndex, setStateIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let visible = true;
    let maxP = 0;

    const tick = () => {
      const total = el.offsetHeight - (window.innerHeight - NAV);
      const raw = total > 0 ? (NAV - el.getBoundingClientRect().top) / total : 0;
      const v = Math.max(0, Math.min(1, raw));
      p.set(v);

      if (v > maxP) {
        maxP = v;
        let nextState = 0;
        THREAD_STATES.forEach((s, i) => { if (maxP >= s.at) nextState = i; });
        setStateIndex((old) => Math.max(old, nextState));
      }

      const nextWorld = v < 0.17 ? 0 : v < 0.31 ? 1 : v < 0.45 ? 2 : 3;
      setWorldIndex((old) => old === nextWorld ? old : nextWorld);
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
  }, [p, ref]);

  return { p, worldIndex, threadLabel: THREAD_STATES[stateIndex].label };
}

function VideoLayer({ world, active, reduced }: { world: World; active: boolean; reduced: boolean }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v || reduced) return;
    if (active) {
      if (v.readyState >= 1 && (v.currentTime < world.start || v.currentTime > world.end)) v.currentTime = world.start;
      void v.play().catch(() => {});
    } else v.pause();
  }, [active, reduced, world.end, world.start]);

  return (
    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.025 }}
      transition={{ opacity: { duration: 0.7 }, scale: { duration: 1.2, ease: [0.2, 0.8, 0.2, 1] } }}
      style={{ pointerEvents: active ? "auto" : "none" }}
    >
      {reduced ? (
        <img src={`${MEDIA}/${world.file}.jpg`} alt="" className="h-full w-full object-cover" style={{ objectPosition: world.objectPosition }} />
      ) : (
        <video
          ref={video}
          src={`${MEDIA}/${world.file}.mp4`}
          poster={`${MEDIA}/${world.file}.jpg`}
          muted
          playsInline
          preload={active ? "metadata" : "none"}
          className="h-full w-full object-cover"
          style={{ objectPosition: world.objectPosition }}
          onLoadedMetadata={(e) => { e.currentTarget.currentTime = world.start; if (active) void e.currentTarget.play().catch(() => {}); }}
          onTimeUpdate={(e) => { if (e.currentTarget.currentTime >= world.end) e.currentTarget.currentTime = world.start; }}
        />
      )}
    </motion.div>
  );
}

function HeroCopy({ mobile }: { mobile: boolean }) {
  return (
    <div className={mobile ? "max-w-[340px]" : "max-w-[590px]"}>
      <div className="flex items-start gap-3">
        <span className="mt-[7px] h-[2px] w-7 shrink-0" style={{ background: CYAN }} />
        <span className="text-[10px] font-semibold uppercase leading-[1.45] tracking-[0.19em] text-white/70 md:text-[11px]">BUILT FOR TEAMS WHERE FOLLOW-THROUGH CANNOT DEPEND ON MEMORY.</span>
      </div>
      <h1 className={mobile ? "mt-4 text-[48px] leading-[0.98] tracking-[-0.045em] text-white" : "mt-5 text-[80px] leading-[0.94] tracking-[-0.05em] text-white"} style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
        You lead.<br />Zapla follows through.
      </h1>
      <p className={mobile ? "mt-4 text-[15px] leading-[1.55] text-white/74" : "mt-6 max-w-[525px] text-[17px] leading-[1.6] text-white/74"}>
        Your team does the work. Zapla keeps customers moving — enquiries, replies, bookings, payments, reviews and everything between.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a href="https://zapla.io/booking" className="inline-flex h-[48px] items-center gap-2 rounded-[10px] bg-white px-5 text-[14px] font-semibold text-[#111318]">Book a demo <ArrowRight className="h-4 w-4" /></a>
        <a href="#zapla-product-v4" className="inline-flex h-[48px] items-center rounded-[10px] border border-white/35 px-5 text-[14px] font-semibold text-white">See how it works</a>
      </div>
    </div>
  );
}

function FollowThread({ p, label, mobile }: { p: ReturnType<typeof useMotionValue<number>>; label: string; mobile: boolean }) {
  const opacity = useTransform(p, [0.03, 0.07, 0.65, 0.72], [0, 1, 1, 0]);
  const y = useTransform(p, [0.05, 0.58], [0, mobile ? -24 : -12]);
  return (
    <motion.div className={mobile ? "absolute bottom-[7%] left-[6%] right-[6%] z-40" : "absolute bottom-[7%] left-[6%] z-40 w-[44%]"} style={{ opacity, y }}>
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: CYAN }} />
        <span className="h-px flex-1 bg-white/45" />
        <div className="shrink-0 text-right">
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">Follow-through</div>
          <motion.div key={label} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-[13px] font-medium text-white">{label}</motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function GenericCustomerRecord() {
  const rows = [
    ["Enquiry received", "8:42 AM", true],
    ["Reply sent", "8:44 AM", true],
    ["Booking confirmed", "9:07 AM", true],
    ["Payment received", "Yesterday", true],
    ["Review requested", "2 days after", false],
  ] as const;

  return (
    <div id="zapla-product-v4" className="h-full w-full bg-white">
      <AppShell activeKey="inbox" title="Customer record" subtitle="Everything connected">
        <div className="grid h-full min-h-0 grid-cols-1 bg-[#F7F8FA] lg:grid-cols-[1fr_300px]">
          <div className="min-h-0 border-r border-slate-200/80 bg-white p-5 md:p-7">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Customer timeline</div>
            <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-slate-950">One customer. Everything connected.</h3>
            <p className="mt-2 max-w-[620px] text-[13.5px] leading-[1.55] text-slate-500">Every enquiry, reply, booking, payment and review is visible in one place.</p>
            <div className="mt-6 space-y-3">
              {rows.map(([label, time, done]) => (
                <div key={label} className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: done ? "#ECFEFF" : "#F3F4F6", color: done ? CYAN : "#9CA3AF" }}>{done ? <Check className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-current" />}</span>
                  <div className="min-w-0 flex-1"><div className="text-[13.5px] font-semibold text-slate-900">{label}</div><div className="mt-0.5 text-[11px] text-slate-400">{time}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden bg-white p-5 lg:block">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Connected</div>
            <div className="mt-4 space-y-3">
              {[
                [CalendarDays, "Booking", "Confirmed"],
                [CreditCard, "Payment", "Paid"],
                [Star, "Review", "Requested"],
              ].map(([Icon, label, value]) => {
                const I = Icon as typeof CalendarDays;
                return <div key={label as string} className="flex items-center gap-3 border-b border-slate-100 pb-3"><span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-cyan-50 text-cyan-600"><I className="h-4 w-4" /></span><div><div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-400">{label as string}</div><div className="mt-0.5 text-[13px] font-semibold text-slate-900">{value as string}</div></div></div>;
              })}
            </div>
          </div>
        </div>
      </AppShell>
    </div>
  );
}

function StoryStage({ mobile }: { mobile: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = !!useReducedMotion();
  const { p, worldIndex, threadLabel } = useStoryScroll(wrap);

  const filmOpacity = useTransform(p, [0.58, 0.68], [1, 0]);
  const filmScale = useTransform(p, [0.56, 0.69], [1, 0.955]);
  const heroOpacity = useTransform(p, [0.00, 0.09, 0.16], [1, 1, 0]);
  const midpointOpacity = useTransform(p, [0.34, 0.42, 0.55, 0.61], [0, 1, 1, 0]);
  const productOpacity = useTransform(p, [0.63, 0.72], [0, 1]);
  const productY = useTransform(p, [0.63, 0.75], [mobile ? 70 : 110, 0]);
  const productScale = useTransform(p, [0.63, 0.78], [0.94, 1]);
  const bg = useTransform(p, [0.58, 0.69], ["#080B10", "#F7F8FA"]);
  const headingOpacity = useTransform(p, [0.74, 0.83], [0, 1]);

  return (
    <div ref={wrap} className={mobile ? "relative h-[520vh]" : "relative h-[600vh]"}>
      <motion.div className="sticky overflow-hidden" style={{ top: NAV, height: `calc(100vh - ${NAV}px)`, background: bg }}>
        <motion.div className="absolute inset-0 overflow-hidden" style={{ opacity: filmOpacity, scale: filmScale }}>
          {WORLDS.map((world, i) => <VideoLayer key={world.key} world={world} active={i === worldIndex} reduced={reduced} />)}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,13,.76)_0%,rgba(5,8,13,.52)_33%,rgba(5,8,13,.14)_62%,rgba(5,8,13,.34)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute right-[4%] top-[5%] text-[10px] font-semibold uppercase tracking-[0.19em] text-white/45">{WORLDS[worldIndex].trade}</div>
        </motion.div>

        <motion.div className={mobile ? "absolute left-[6%] right-[6%] top-[51%] z-30" : "absolute left-[5.5%] top-1/2 z-30 w-[42%] -translate-y-1/2"} style={{ opacity: heroOpacity }}><HeroCopy mobile={mobile} /></motion.div>

        <motion.div className={mobile ? "absolute left-[6%] top-[57%] z-30 w-[88%] text-[34px] leading-[1.02] tracking-[-0.045em] text-white" : "absolute left-[6%] top-[57%] z-30 w-[46%] text-[58px] leading-[0.98] tracking-[-0.05em] text-white"} style={{ opacity: midpointOpacity, fontFamily: DISPLAY, fontWeight: 500 }}>
          Different work.<br />Same follow-through.
        </motion.div>

        <FollowThread p={p} label={threadLabel} mobile={mobile} />

        <motion.div className={mobile ? "absolute left-[4%] right-[4%] top-[19%] bottom-[4%] z-50" : "absolute left-[5%] right-[5%] top-[17%] bottom-[5%] z-50"} style={{ opacity: productOpacity, y: productY, scale: productScale }}>
          <div className="h-full w-full overflow-hidden rounded-[14px] border border-slate-200/80 bg-white shadow-[0_40px_110px_-48px_rgba(15,23,42,.38)]"><GenericCustomerRecord /></div>
        </motion.div>

        <motion.div className={mobile ? "absolute left-[6%] top-[3.5%] z-[60] w-[88%]" : "absolute left-[5%] top-[4%] z-[60] w-[70%]"} style={{ opacity: headingOpacity }}>
          <h2 className={mobile ? "text-[34px] leading-[1.02] tracking-[-0.04em]" : "text-[52px] leading-[0.98] tracking-[-0.045em]"} style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}>One customer. Everything connected.</h2>
          <p className={mobile ? "mt-2 max-w-[335px] text-[13.5px] leading-[1.5] text-slate-500" : "mt-3 max-w-[650px] text-[15px] leading-[1.55] text-slate-500"}>Every enquiry, message, booking, payment and review stays connected in one customer record.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function CinematicFollowThroughV4() {
  const mobile = useIsMobile();
  return (
    <div className="bg-[#F7F8FA]">
      <StoryStage mobile={mobile} />
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-7 px-6 py-16 md:flex-row md:items-end md:justify-between md:px-10 md:py-20">
          <div>
            <h2 className="max-w-[760px] text-[36px] leading-[1.02] tracking-[-0.04em] text-[#111318] md:text-[52px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>While you do the work, Zapla handles the follow-through.</h2>
            <p className="mt-4 max-w-[660px] text-[16px] leading-[1.6] text-slate-500">Every enquiry, message, booking, payment and review stays connected in one customer record.</p>
          </div>
          <a href="https://zapla.io/booking" className="inline-flex h-[50px] shrink-0 items-center gap-2 rounded-[10px] px-6 text-[14px] font-semibold text-white" style={{ background: CYAN }}>Book a demo <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>
    </div>
  );
}
