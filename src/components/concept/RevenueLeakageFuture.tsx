/* Concept V3 prototype: "The future that never loaded."
   Isolated to /concept/revenue-leakage-future. All people, businesses and
   numbers are fictional. Borrows the Zapla product UI language (inbox,
   pipeline, calendar, payment, review automation) without editing it. */
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import {
  CalendarCheck,
  Check,
  Inbox as InboxIcon,
  Mail,
  MessageSquare,
  Repeat2,
  Star,
  Wallet,
  Workflow,
} from "lucide-react";
import { FACE } from "@/components/v5/faces";
import { useIsMobile } from "@/hooks/use-mobile";

const SARAH = FACE.sophie;

/* ---------------------------------------------------------------- */
/* Scroll progress (manual rAF read of the pin wrapper geometry)     */
/* ---------------------------------------------------------------- */

function usePinProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const progress = useMotionValue(0);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total > 0) {
          const p = Math.min(Math.max(-rect.top / total, 0), 1);
          progress.set(p);
        }
      }
      raf = requestAnimationFrame(read);
    };
    raf = requestAnimationFrame(read);
    return () => cancelAnimationFrame(raf);
  }, [ref, progress]);

  return progress;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

/* ---------------------------------------------------------------- */
/* Product surface primitives (same field hierarchy as v5 scenes)    */
/* ---------------------------------------------------------------- */

function Surface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[14px] border border-slate-200/90 bg-white shadow-[0_18px_44px_-26px_rgba(15,23,42,0.32)] ${className}`}
    >
      {children}
    </div>
  );
}

function SurfaceHead({
  icon,
  label,
  right,
}: {
  icon: React.ReactNode;
  label: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-[6px] bg-slate-100 text-slate-500">
        {icon}
      </span>
      <span className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-slate-500">
        {label}
      </span>
      {right ? <span className="ml-auto">{right}</span> : null}
    </div>
  );
}

function FieldRow({
  label,
  value,
  valueClass = "text-slate-800",
  strong = false,
}: {
  label: string;
  value: React.ReactNode;
  valueClass?: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-[7px]">
      <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-400">
        {label}
      </span>
      <span
        className={`text-[13px] ${strong ? "font-extrabold" : "font-semibold"} ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* The persistent enquiry: Unified Inbox crop + customer context     */
/* ---------------------------------------------------------------- */

function EnquirySurface({
  contextDim,
  nextActionScale,
  compact = false,
}: {
  contextDim?: MotionValue<number>;
  nextActionScale?: MotionValue<number>;
  compact?: boolean;
}) {
  return (
    <Surface className="overflow-hidden">
      <div className="flex items-center gap-2 border-b border-slate-100 px-3.5 py-2.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-[6px] bg-slate-100 text-slate-500">
          <InboxIcon className="h-3 w-3" />
        </span>
        <span className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-slate-500">
          Unified Inbox
        </span>
        <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-[3px] text-[9.5px] font-bold uppercase tracking-[0.06em] text-emerald-700">
          <MessageSquare className="h-2.5 w-2.5" />
          SMS
        </span>
      </div>

      <div className={compact ? "p-3.5" : "grid grid-cols-[1fr_210px]"}>
        <div className={compact ? "" : "border-r border-slate-100 p-4"}>
          <div className="flex items-center gap-3">
            <img
              src={SARAH}
              alt=""
              aria-hidden
              className="h-11 w-11 shrink-0 rounded-full object-cover outline outline-1 outline-slate-200"
            />
            <div className="min-w-0">
              <div className="truncate text-[17px] font-extrabold tracking-tight text-slate-900">
                Sarah Chen
              </div>
              <div className="mt-0.5 text-[11.5px] font-semibold text-slate-400">
                New enquiry · SMS · 10:14 AM
              </div>
            </div>
          </div>

          <div className="mt-3.5 max-w-[330px] rounded-[12px] rounded-tl-[4px] border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13.5px] font-medium leading-relaxed text-slate-800">
            Hi, do you have any availability this week?
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-cyan-600">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            Live thread
          </div>
        </div>

        <div className={compact ? "mt-3.5 border-t border-slate-100 pt-2" : "p-4"}>
          <motion.div style={contextDim ? { opacity: contextDim } : undefined}>
            <div className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-slate-300">
              Customer
            </div>
            <div className="mt-1 divide-y divide-slate-100">
              <FieldRow label="Owner" value="Unassigned" valueClass="text-slate-400" />
              <FieldRow label="Last activity" value="SMS · Just now" />
            </div>
          </motion.div>

          <motion.div
            className="mt-1 border-t border-slate-100 pt-2"
            style={nextActionScale ? { opacity: nextActionScale } : undefined}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">
              Next action
            </div>
            <div className="mt-1 flex items-end gap-2">
              <span className="text-[22px] font-extrabold leading-none text-slate-900">—</span>
              <span className="mb-[3px] h-px w-[54px] bg-slate-200" />
            </div>
          </motion.div>

        </div>
      </div>
    </Surface>
  );
}

/* ---------------------------------------------------------------- */
/* Future product-state fragments                                    */
/* ---------------------------------------------------------------- */

function PipelineFragment() {
  return (
    <Surface className="w-[330px] overflow-hidden">
      <SurfaceHead icon={<Workflow className="h-3 w-3" />} label="Sales Pipeline" />
      <div className="grid grid-cols-2 gap-2 p-2.5">
        <div className="rounded-[10px] bg-slate-50 p-2">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span className="text-[9.5px] font-bold uppercase tracking-[0.07em] text-slate-500">
              New Enquiry
            </span>
          </div>
          <div className="mt-2 space-y-1.5">
            <div className="h-[9px] w-[80%] rounded-full bg-slate-200" />
            <div className="h-[9px] w-[62%] rounded-full bg-slate-200" />
          </div>
        </div>
        <div className="rounded-[10px] bg-teal-50/70 p-2 ring-1 ring-teal-200">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            <span className="text-[9.5px] font-bold uppercase tracking-[0.07em] text-teal-700">
              Qualified
            </span>
          </div>
          <div className="mt-2 rounded-[8px] border border-teal-200 bg-white p-1.5">
            <div className="flex items-center gap-1.5">
              <img
                src={SARAH}
                alt=""
                aria-hidden
                className="h-4 w-4 rounded-full object-cover"
              />
              <span className="truncate text-[10.5px] font-bold text-slate-900">Sarah Chen</span>
            </div>
            <div className="mt-1 text-[12px] font-extrabold tracking-tight text-slate-900">
              A$450
            </div>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function CalendarFragment() {
  return (
    <Surface className="w-[268px] overflow-hidden">
      <SurfaceHead
        icon={<CalendarCheck className="h-3 w-3" />}
        label="Calendar"
        right={
          <span className="text-[9.5px] font-bold uppercase tracking-[0.07em] text-slate-400">
            August
          </span>
        }
      />
      <div className="p-2.5">
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {["Tue", "Wed", "Thu", "Fri"].map((d) => (
            <div
              key={d}
              className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="mt-1.5 grid grid-cols-4 gap-1.5">
          <div className="h-[46px] rounded-[8px] bg-slate-50" />
          <div className="h-[46px] rounded-[8px] bg-slate-50" />
          <div className="h-[46px] rounded-[8px] border border-blue-200 bg-blue-50/70 p-1">
            <div className="text-[8.5px] font-bold text-blue-700">3:00 PM</div>
            <div className="mt-0.5 flex items-center gap-1">
              <img src={SARAH} alt="" aria-hidden className="h-3 w-3 rounded-full object-cover" />
              <span className="truncate text-[8.5px] font-bold text-slate-800">Sarah C.</span>
            </div>
          </div>
          <div className="h-[46px] rounded-[8px] bg-slate-50" />
        </div>
        <div className="mt-2 text-[11px] font-semibold text-slate-500">
          Sarah Chen · <span className="text-slate-900">Thu · 3:00 PM</span>
        </div>
      </div>
    </Surface>
  );
}

function PaymentFragment() {
  return (
    <Surface className="w-[244px] overflow-hidden">
      <SurfaceHead icon={<Wallet className="h-3 w-3" />} label="Payment" />
      <div className="p-3">
        <div className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-slate-400">
          Invoice #1042
        </div>
        <div className="mt-1 flex items-end justify-between gap-3">
          <div className="text-[28px] font-extrabold leading-none tracking-[-0.03em] text-slate-900">
            A$450.00
          </div>
          <span className="flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-[3px] text-[9.5px] font-extrabold uppercase tracking-[0.06em] text-white">
            <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
            Paid
          </span>
        </div>
        <div className="mt-2.5 border-t border-slate-100 pt-2 text-[11px] font-semibold text-slate-500">
          Sarah Chen · Card
        </div>
      </div>
    </Surface>
  );
}

function ReviewFragment() {
  return (
    <Surface className="w-[286px] overflow-hidden">
      <SurfaceHead icon={<Repeat2 className="h-3 w-3" />} label="Review Automation" />
      <div className="p-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-amber-50 text-amber-500">
            <Star className="h-3.5 w-3.5" />
          </span>
          <div className="text-[12.5px] font-bold tracking-tight text-slate-900">
            Ask Sarah for a Google review
          </div>
        </div>
        <div className="mt-2.5 space-y-1.5">
          <div className="flex items-center gap-2 rounded-[9px] bg-slate-50 px-2 py-1.5">
            <Mail className="h-3 w-3 text-slate-400" />
            <span className="text-[10.5px] font-semibold text-slate-500">
              Send 2 days after payment
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-[9px] bg-slate-50 px-2 py-1.5">
            <MessageSquare className="h-3 w-3 text-slate-400" />
            <span className="text-[10.5px] font-semibold text-slate-500">
              SMS reminder if no reply
            </span>
          </div>
        </div>
      </div>
    </Surface>
  );
}

/* ---------------------------------------------------------------- */
/* Copy blocks                                                       */
/* ---------------------------------------------------------------- */

function Beat({
  o,
  eyebrow,
  headline,
  support,
  resolve,
  className = "",
}: {
  o: MotionValue<number>;
  eyebrow?: string;
  headline: string;
  support?: string;
  resolve?: string[];
  className?: string;
}) {
  return (
    <motion.div className={`absolute max-w-[430px] ${className}`} style={{ opacity: o }}>
      {eyebrow ? (
        <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-600">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="font-zapla text-[38px] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0a0a14]">
        {headline}
      </h2>
      {support ? (
        <p className="mt-4 max-w-[380px] text-[15px] leading-relaxed text-slate-500">{support}</p>
      ) : null}
      {resolve ? (
        <div className="mt-6 border-l border-slate-200 pl-4">
          {resolve.map((line, i) => (
            <div
              key={line}
              className={`font-zapla text-[19px] leading-snug tracking-[-0.02em] ${
                i === resolve.length - 1 ? "font-semibold text-[#0a0a14]" : "text-slate-400"
              }`}
            >
              {line}
            </div>
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Desktop pinned sequence                                           */
/* ---------------------------------------------------------------- */

function DesktopStory() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const p = usePinProgress(wrapRef);
  const reduced = useReducedMotion();

  /* copy */
  const c1 = useTransform(p, [0, 0.03, 0.15, 0.2], [1, 1, 1, 0]);
  const c2 = useTransform(p, [0.21, 0.27, 0.41, 0.46], [0, 1, 1, 0]);
  const c3 = useTransform(p, [0.48, 0.54, 0.68, 0.73], [0, 1, 1, 0]);
  const c4 = useTransform(p, [0.75, 0.81, 1, 1], [0, 1, 1, 1]);

  /* enquiry anchor */
  const enqX = useTransform(p, [0.14, 0.28, 0.74, 0.86], [0, -150, -150, 0]);
  const enqY = useTransform(p, [0.14, 0.28, 0.74, 0.86], [24, 0, 0, 0]);
  const enqScale = useTransform(p, [0.14, 0.28, 0.74, 0.88], [1.02, 0.95, 0.95, 1.06]);
  const contextDim = useTransform(p, [0.76, 0.86], [1, 0.4]);
  const nextScale = useTransform(p, [0.78, 0.9], [1, 1.1]);

  /* fragment helper ranges: arrive -> settle -> fail to resolve */
  const frag = (arrive: number, leave: number, from: { x: number; y: number }) => ({
    opacity: useTransform(p, [arrive, arrive + 0.055, leave, leave + 0.065], [0, 1, 1, 0]),
    x: useTransform(p, [arrive, arrive + 0.08, leave, leave + 0.085], [from.x, 0, 0, from.x * 0.5]),
    y: useTransform(p, [arrive, arrive + 0.08, leave, leave + 0.085], [from.y, 0, 0, from.y * 0.35]),
    scale: useTransform(p, [arrive, arrive + 0.08, leave, leave + 0.085], [0.92, 1, 1, 0.97]),
    clip: useTransform(
      p,
      [arrive, arrive + 0.065, leave, leave + 0.075],
      [
        "inset(0% 0% 100% 0% round 14px)",
        "inset(0% 0% 0% 0% round 14px)",
        "inset(0% 0% 0% 0% round 14px)",
        "inset(0% 0% 90% 0% round 14px)",
      ],
    ),
  });

  const pipeline = frag(0.22, 0.48, { x: 110, y: -64 });
  const calendar = frag(0.26, 0.53, { x: 140, y: 36 });
  const payment = frag(0.3, 0.58, { x: -90, y: 110 });
  const review = frag(0.34, 0.63, { x: 150, y: 96 });

  return (
    <div ref={wrapRef} className="relative h-[430vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F7F9FC]">
        {/* copy column */}
        <div className="absolute left-[6.5%] top-[calc(50%+18px)] h-0 w-[440px] -translate-y-1/2">
          <div className="absolute -top-[168px] left-0 w-[440px]">
            <Beat
              o={c1}
              eyebrow="Where revenue leaks"
              headline="Customers don’t always say no."
              support="An enquiry arrives with intent. Around it are all the things that could happen next."
            />
            <Beat
              o={c2}
              headline="What should happen next is already visible."
              support="A reply, a qualified opportunity, a booking, a payment, a review request. All of it sits one action away."
            />
            <Beat
              o={c3}
              headline="Sometimes nobody followed through."
              support="Nothing dramatic happens. The enquiry is still there. What disappears is everything that should have come after it."
              resolve={["That wasn’t a “no.”", "It was a future that never loaded."]}
            />
            <Beat
              o={c4}
              headline="The expensive part is what never happened."
              support="The next action was never created. So the booking, payment, review and repeat customer never had a chance to exist."
              resolve={["The enquiry survived.", "The next action didn’t."]}
            />
          </div>
        </div>

        {/* product canvas (kept clear of the fixed site nav) */}
        <div className="absolute bottom-6 right-2 top-[84px] left-[40%]">
          {/* persistent enquiry */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-30 w-[600px] -translate-x-1/2 -translate-y-1/2"
            style={reduced ? undefined : { x: enqX, y: enqY, scale: enqScale }}
          >
            <EnquirySurface contextDim={contextDim} nextActionScale={nextScale} />
          </motion.div>

          {/* future states */}
          {!reduced ? (
            <>
              <motion.div
                className="absolute left-[42%] top-0 z-20"
                style={{ opacity: pipeline.opacity, x: pipeline.x, y: pipeline.y, scale: pipeline.scale, clipPath: pipeline.clip }}
              >
                <PipelineFragment />
              </motion.div>
              <motion.div
                className="absolute left-[64%] top-[42%] z-20"
                style={{ opacity: calendar.opacity, x: calendar.x, y: calendar.y, scale: calendar.scale, clipPath: calendar.clip }}
              >
                <CalendarFragment />
              </motion.div>
              <motion.div
                className="absolute left-[4%] top-[70%] z-20"
                style={{ opacity: payment.opacity, x: payment.x, y: payment.y, scale: payment.scale, clipPath: payment.clip }}
              >
                <PaymentFragment />
              </motion.div>
              <motion.div
                className="absolute left-[36%] top-[66%] z-10"
                style={{ opacity: review.opacity, x: review.x, y: review.y, scale: review.scale, clipPath: review.clip }}
              >
                <ReviewFragment />
              </motion.div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );

}

/* ---------------------------------------------------------------- */
/* Mobile: vertical, non-pinned narrative                            */
/* ---------------------------------------------------------------- */

function MobileStory() {
  const items = [
    { key: "pipeline", node: <PipelineFragment /> },
    { key: "calendar", node: <CalendarFragment /> },
    { key: "payment", node: <PaymentFragment /> },
    { key: "review", node: <ReviewFragment /> },
  ];

  return (
    <div className="px-5 pb-24 pt-16">
      <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-600">
        Where revenue leaks
      </div>
      <h2 className="mt-3 font-zapla text-[30px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0a0a14]">
        Customers don’t always say no.
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-slate-500">
        An enquiry arrives with intent. Around it are all the things that could happen next.
      </p>

      <div className="mt-7">
        <EnquirySurface compact />
      </div>

      <h3 className="mt-14 font-zapla text-[26px] font-semibold leading-tight tracking-[-0.03em] text-[#0a0a14]">
        What should happen next is already visible.
      </h3>

      <div className="mt-6 space-y-4">
        {items.map((it, i) => (
          <motion.div
            key={it.key}
            className="origin-top [&>div]:w-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
          >
            {it.node}
          </motion.div>
        ))}
      </div>

      <h3 className="mt-14 font-zapla text-[26px] font-semibold leading-tight tracking-[-0.03em] text-[#0a0a14]">
        Sometimes nobody followed through.
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-slate-500">
        Nothing dramatic happens. The enquiry is still there. What disappears is everything that
        should have come after it.
      </p>

      <div className="relative mt-6 space-y-4">
        {items.map((it, i) => (
          <motion.div
            key={`ghost-${it.key}`}
            className="[&>div]:w-full"
            initial={{ opacity: 0.9, clipPath: "inset(0% 0% 0% 0% round 14px)" }}
            whileInView={{ opacity: 0.06, clipPath: "inset(0% 0% 82% 0% round 14px)" }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.08 }}
          >
            {it.node}
          </motion.div>
        ))}
      </div>

      <div className="mt-8 border-l border-slate-200 pl-4">
        <div className="font-zapla text-[18px] tracking-[-0.02em] text-slate-400">
          That wasn’t a “no.”
        </div>
        <div className="font-zapla text-[18px] font-semibold tracking-[-0.02em] text-[#0a0a14]">
          It was a future that never loaded.
        </div>
      </div>

      <h3 className="mt-14 font-zapla text-[26px] font-semibold leading-tight tracking-[-0.03em] text-[#0a0a14]">
        The expensive part is what never happened.
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-slate-500">
        The next action was never created. So the booking, payment, review and repeat customer never
        had a chance to exist.
      </p>

      <div className="mt-7">
        <EnquirySurface compact />
      </div>

      <div className="mt-8 border-l border-slate-200 pl-4">
        <div className="font-zapla text-[18px] tracking-[-0.02em] text-slate-400">
          The enquiry survived.
        </div>
        <div className="font-zapla text-[18px] font-semibold tracking-[-0.02em] text-[#0a0a14]">
          The next action didn’t.
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

export function RevenueLeakageFuture() {
  const isMobile = useIsMobile();
  return (
    <div className="bg-[#F7F9FC] text-[#0a0a14]">
      {isMobile ? <MobileStory /> : <DesktopStory />}
    </div>
  );
}
