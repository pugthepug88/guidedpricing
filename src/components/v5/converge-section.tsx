import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  FileSpreadsheet,
  Instagram,
  Mail,
  MessageSquare,
  PhoneMissed,
  Star,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FACE } from "./faces";
import logo from "@/assets/zapla-logo-green.png.asset.json";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Scattered tool fragments                                            */
/* ------------------------------------------------------------------ */

type Frag = {
  key: string;
  x: number; // start offset, px, relative to canvas centre
  y: number;
  rot: number;
  scale: number;
  w: number;
  z: number; // 0 = far, 1 = near
  node: ReactNode;
};

function FragCard({
  icon,
  tint,
  label,
  children,
  className,
}: {
  icon: ReactNode;
  tint: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[14px] border border-slate-200/80 bg-white/95 p-3.5 backdrop-blur-[2px]",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-[8px]"
          style={{ background: tint }}
        >
          {icon}
        </span>
        <span className="text-[10.5px] font-bold uppercase tracking-[0.11em] text-slate-400">
          {label}
        </span>
      </div>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

const FRAGS: Frag[] = [
  {
    key: "missed",
    x: -430,
    y: -250,
    rot: -7,
    scale: 1.06,
    w: 268,
    z: 0.9,
    node: (
      <FragCard
        icon={<PhoneMissed className="h-3.5 w-3.5 text-rose-600" />}
        tint="#fee2e2"
        label="Missed call"
      >
        <p className="text-[14.5px] font-bold leading-tight text-slate-900">+61 412 908 331</p>
        <p className="mt-1 text-[12px] text-slate-500">No voicemail. Nobody called back.</p>
      </FragCard>
    ),
  },
  {
    key: "weblead",
    x: -300,
    y: 120,
    rot: 4,
    scale: 1,
    w: 286,
    z: 1,
    node: (
      <FragCard
        icon={<Globe className="h-3.5 w-3.5 text-blue-600" />}
        tint="#dbeafe"
        label="Web form lead"
      >
        <p className="text-[14.5px] font-bold leading-tight text-slate-900">Maya Chen</p>
        <p className="mt-1 text-[12px] leading-snug text-slate-500">
          "Looking for a quote for a full house repaint in Coogee."
        </p>
      </FragCard>
    ),
  },
  {
    key: "email",
    x: -110,
    y: -330,
    rot: 6,
    scale: 0.9,
    w: 250,
    z: 0.5,
    node: (
      <FragCard
        icon={<Mail className="h-3.5 w-3.5 text-slate-600" />}
        tint="#e2e8f0"
        label="Email enquiry"
      >
        <p className="text-[13px] font-semibold text-slate-900">Re: Quote request</p>
        <p className="mt-1 text-[12px] text-slate-500">Unread for 3 days</p>
      </FragCard>
    ),
  },
  {
    key: "sms",
    x: 250,
    y: -300,
    rot: -5,
    scale: 0.95,
    w: 244,
    z: 0.7,
    node: (
      <FragCard
        icon={<MessageSquare className="h-3.5 w-3.5 text-emerald-600" />}
        tint="#d1fae5"
        label="SMS reply"
      >
        <p className="text-[12.5px] leading-snug text-slate-700">
          "Hi, did you get my message about the quote?"
        </p>
      </FragCard>
    ),
  },
  {
    key: "social",
    x: 430,
    y: -110,
    rot: 8,
    scale: 0.88,
    w: 232,
    z: 0.45,
    node: (
      <FragCard
        icon={<Instagram className="h-3.5 w-3.5 text-pink-600" />}
        tint="#fce7f3"
        label="Instagram DM"
      >
        <p className="text-[12.5px] leading-snug text-slate-700">
          "Are you booked out in October?"
        </p>
      </FragCard>
    ),
  },
  {
    key: "cal",
    x: 380,
    y: 175,
    rot: -6,
    scale: 1.02,
    w: 260,
    z: 0.85,
    node: (
      <FragCard
        icon={<CalendarDays className="h-3.5 w-3.5 text-violet-600" />}
        tint="#ede9fe"
        label="Calendar"
      >
        <p className="text-[13.5px] font-bold text-slate-900">Thu 9:00am</p>
        <p className="mt-1 text-[12px] text-slate-500">On-site quote. Nobody told the team.</p>
      </FragCard>
    ),
  },
  {
    key: "review",
    x: 90,
    y: 320,
    rot: 5,
    scale: 0.92,
    w: 238,
    z: 0.6,
    node: (
      <FragCard
        icon={<Star className="h-3.5 w-3.5 text-amber-500" />}
        tint="#fef3c7"
        label="Review request"
      >
        <p className="text-[12.5px] text-slate-600">Job finished 11 days ago. Never sent.</p>
      </FragCard>
    ),
  },
  {
    key: "sheet",
    x: -450,
    y: 340,
    rot: -3,
    scale: 0.96,
    w: 272,
    z: 0.55,
    node: (
      <FragCard
        icon={<FileSpreadsheet className="h-3.5 w-3.5 text-teal-600" />}
        tint="#ccfbf1"
        label="Customer notes"
      >
        <p className="text-[12px] leading-snug text-slate-500">
          customers_final_v3.xlsx, last edited by someone else
        </p>
      </FragCard>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Resolved Zapla customer surface                                     */
/* ------------------------------------------------------------------ */

const TIMELINE = [
  { label: "Enquiry", meta: "Web form, Tue 4:12pm", tone: "done" },
  { label: "Replied", meta: "SMS in 4 minutes", tone: "done" },
  { label: "Booked", meta: "On-site quote, Thu 9:00am", tone: "done" },
  { label: "Completed", meta: "Invoice paid, $4,180", tone: "done" },
  { label: "Review requested", meta: "Sending tomorrow 10:00am", tone: "next" },
] as const;

function CustomerSurface({ progress }: { progress?: MotionValue<number> }) {
  return (
    <div className="w-full max-w-[660px] overflow-hidden rounded-[22px] border border-slate-200/90 bg-white shadow-[0_50px_110px_-45px_rgba(15,23,42,0.45),0_10px_30px_-18px_rgba(37,99,255,0.25)]">
      {/* head */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
        <img src={logo.url} alt="" className="h-6 w-6 shrink-0 rounded-[8px]" />
        <span className="text-[12px] font-bold tracking-tight text-slate-700">
          Zapla customer record
        </span>
        <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-blue-600">
          Live
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 pt-5 sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={FACE.maya}
            alt=""
            className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white"
          />
          <div className="min-w-0">
            <p className="truncate text-[18px] font-extrabold tracking-[-0.02em] text-slate-900">
              Maya Chen
            </p>
            <p className="truncate text-[12.5px] text-slate-500">
              Coogee NSW, +61 412 908 331
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-[12px] bg-slate-50 px-3 py-2 text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.11em] text-slate-400">
            Lifetime
          </p>
          <p className="text-[15px] font-extrabold text-slate-900">$4,180</p>
        </div>
      </div>

      {/* one thread */}
      <div className="mx-5 mt-4 rounded-[14px] border border-slate-100 bg-[#FBFCFF] p-3.5">
        <p className="text-[10px] font-bold uppercase tracking-[0.11em] text-slate-400">
          One conversation, every channel
        </p>
        <div className="mt-2.5 space-y-2">
          <ThreadRow icon={<Globe className="h-3 w-3" />} channel="Web">
            Quote for full house repaint
          </ThreadRow>
          <ThreadRow icon={<MessageSquare className="h-3 w-3" />} channel="SMS" mine>
            Thanks Maya, can we look at Thursday 9am?
          </ThreadRow>
          <ThreadRow icon={<Instagram className="h-3 w-3" />} channel="Instagram">
            Thursday works. See you then.
          </ThreadRow>
        </div>
      </div>

      {/* journey */}
      <div className="px-5 pb-5 pt-4">
        <div className="relative">
          <div className="absolute left-[9px] top-2 bottom-2 w-[2px] rounded bg-gradient-to-b from-blue-500/70 via-blue-400/40 to-blue-500/70" />
          <div className="space-y-2.5">
            {TIMELINE.map((t, i) => (
              <TimelineRow key={t.label} t={t} i={i} progress={progress} />
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineRow({
  t,
  i,
  progress,
}: {
  t: (typeof TIMELINE)[number];
  i: number;
  progress?: MotionValue<number>;
}) {
  const fallback = useMotionValue(1);
  const source = progress ?? fallback;
  const opacity = useTransform(source, [0.5 + i * 0.045, 0.58 + i * 0.045], [0, 1]);
  const x = useTransform(source, [0.5 + i * 0.045, 0.6 + i * 0.045], [16, 0]);
  const next = t.tone === "next";

  return (
    <motion.div
      className="relative flex items-center gap-3"
      style={progress ? { opacity, x } : undefined}
    >
      <span
        className={cn(
          "relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-4 ring-white",
          next ? "bg-blue-600" : "bg-blue-500/15",
        )}
      >
        {next ? (
          <ArrowRight className="h-3 w-3 text-white" />
        ) : (
          <Check className="h-3 w-3 text-blue-600" strokeWidth={3} />
        )}
      </span>
      <span
        className={cn(
          "shrink-0 text-[13.5px] font-bold tracking-tight",
          next ? "text-blue-700" : "text-slate-900",
        )}
      >
        {t.label}
      </span>
      <span className="min-w-0 truncate text-[12px] text-slate-500">{t.meta}</span>
    </motion.div>
  );
}



function ThreadRow({
  icon,
  channel,
  children,
  mine,
}: {
  icon: ReactNode;
  channel: string;
  children: ReactNode;
  mine?: boolean;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span
        className={cn(
          "mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-[7px]",
          mine ? "bg-blue-600 text-white" : "bg-white text-slate-500 ring-1 ring-slate-200",
        )}
      >
        {icon}
      </span>
      <p className="min-w-0 text-[12.5px] leading-snug text-slate-600">
        <span className="font-semibold text-slate-400">{channel} </span>
        {children}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fragment wrapper driven by scroll progress                          */
/* ------------------------------------------------------------------ */

function Fragment({ frag, p }: { frag: Frag; p: MotionValue<number> }) {
  const inA = 0.03 + (1 - frag.z) * 0.03;
  const outA = 0.34 + (1 - frag.z) * 0.12;
  const outB = outA + 0.16;

  const x = useTransform(p, [0, outA, outB], [frag.x, frag.x * 0.55, 0]);
  const y = useTransform(p, [0, outA, outB], [frag.y, frag.y * 0.5, 0]);
  const rotate = useTransform(p, [0, outB], [frag.rot, 0]);
  const scale = useTransform(p, [0, outA, outB], [frag.scale, frag.scale * 0.9, 0.55]);
  const opacity = useTransform(
    p,
    [0, inA, outA, outB - 0.04],
    [0.92, 1, 0.9, 0],
  );
  const blur = useTransform(p, [outA, outB], [0, 6]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: frag.w,
        marginLeft: -frag.w / 2,
        marginTop: -60,
        x,
        y,
        rotate,
        scale,
        opacity,
        filter,
        zIndex: Math.round(frag.z * 10),
        boxShadow: `0 ${18 + frag.z * 26}px ${34 + frag.z * 40}px -${18 + frag.z * 10}px rgba(15,23,42,${0.14 + frag.z * 0.16})`,
        borderRadius: 14,
      }}
    >
      {frag.node}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function ConvergeSection() {
  const reduced = !!useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  const surfaceOpacity = useTransform(p, [0.38, 0.56], [0, 1]);
  const surfaceScale = useTransform(p, [0.38, 0.62], [0.86, 1]);
  const surfaceY = useTransform(p, [0.38, 0.62], [40, 0]);
  const chaosLabel = useTransform(p, [0, 0.22, 0.36], [1, 1, 0]);
  const calmLabel = useTransform(p, [0.5, 0.62], [0, 1]);
  const glow = useTransform(p, [0.3, 0.62], [0.15, 0.6]);
  const lineOpacity = useTransform(p, [0.05, 0.2, 0.42], [0, 0.5, 0]);

  return (
    <section className="relative bg-[#FAFBFF]">
      {/* ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 620px at 88% 18%, rgba(37,99,255,0.09), transparent 70%), radial-gradient(760px 520px at 62% 88%, rgba(139,92,246,0.07), transparent 72%), radial-gradient(680px 460px at 2% 46%, rgba(34,211,238,0.06), transparent 70%)",
        }}
      />

      {/* ---------------- desktop: sticky canvas ---------------- */}
      <div ref={wrapRef} className="relative hidden h-[2400px] lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[1360px] grid-cols-[minmax(0,400px)_minmax(0,1fr)] items-center gap-8 px-8">
            {/* editorial copy */}
            <div className="relative z-30 max-w-[420px]">
              <div className="flex items-center gap-2.5">
                <span className="h-[2px] w-8 rounded bg-zapla-blue" />
                <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-zapla-blue">
                  Chaos to connected
                </p>
              </div>
              <h2 className="mt-5 text-[40px] font-extrabold leading-[1.04] tracking-[-0.04em] text-slate-900">
                Your customers don't care how many tools you use.
                <span className="mt-2 block text-zapla-blue">
                  They just expect you to follow through.
                </span>
              </h2>
              <p className="mt-6 max-w-[380px] text-[15.5px] leading-relaxed text-zapla-muted">
                Enquiries, messages, follow-up, bookings, reviews and customer context usually live
                in disconnected places. Zapla pulls them into one continuous customer journey.
              </p>

              <div className="relative mt-9 h-[26px]">
                <motion.p
                  style={{ opacity: reduced ? 0 : chaosLabel }}
                  className="absolute inset-0 text-[12.5px] font-semibold text-slate-400"
                >
                  Eight places to look. Nobody owns the next step.
                </motion.p>
                <motion.p
                  style={{ opacity: reduced ? 1 : calmLabel }}
                  className="absolute inset-0 text-[12.5px] font-bold text-slate-700"
                >
                  One customer. One history. One next action.
                </motion.p>
              </div>
            </div>

            {/* visual canvas, bleeds right */}
            <div className="relative h-[720px] w-full">
              <motion.div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  opacity: reduced ? 0.5 : glow,
                  background:
                    "radial-gradient(circle, rgba(37,99,255,0.20), rgba(37,99,255,0) 66%)",
                }}
              />

              {!reduced && (
                <motion.svg
                  aria-hidden
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 900 720"
                  style={{ opacity: lineOpacity }}
                >
                  {FRAGS.map((f) => (
                    <path
                      key={f.key}
                      d={`M ${450 + f.x * 0.62} ${360 + f.y * 0.62} Q ${450 + f.x * 0.3} ${360 + f.y * 0.15} 450 360`}
                      fill="none"
                      stroke="rgba(37,99,255,0.45)"
                      strokeWidth="1"
                      strokeDasharray="4 6"
                    />
                  ))}
                </motion.svg>
              )}

              {!reduced &&
                FRAGS.map((f) => <Fragment key={f.key} frag={f} p={p} />)}

              <motion.div
                className="absolute left-[54%] top-1/2 z-20 w-[660px] -translate-x-1/2 -translate-y-1/2"
                style={
                  reduced
                    ? undefined
                    : { opacity: surfaceOpacity, scale: surfaceScale, y: surfaceY }
                }
              >
                <CustomerSurface progress={reduced ? undefined : p} />

                <motion.div
                  className="absolute -right-14 -bottom-8 w-[268px] rounded-[16px] border border-blue-100 bg-white/95 p-4 shadow-[0_40px_80px_-34px_rgba(37,99,255,0.5)] backdrop-blur"
                  style={
                    reduced
                      ? undefined
                      : {
                          opacity: useTransform(p, [0.74, 0.82], [0, 1]),
                          y: useTransform(p, [0.74, 0.86], [26, 0]),
                          scale: useTransform(p, [0.74, 0.86], [0.92, 1]),
                        }
                  }
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-zapla-blue">
                    Next action, handled by Zapla
                  </p>
                  <p className="mt-2 text-[14px] font-bold leading-snug text-slate-900">
                    Review request sends tomorrow at 10:00am
                  </p>
                  <p className="mt-1.5 text-[12px] text-slate-500">
                    Nobody has to remember. Nothing falls through.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- mobile / tablet: vertical story ---------------- */}
      <div className="relative px-5 py-20 sm:px-8 lg:hidden">
        <div className="flex items-center gap-2.5">
          <span className="h-[2px] w-7 rounded bg-zapla-blue" />
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-zapla-blue">
            Chaos to connected
          </p>
        </div>
        <h2 className="mt-4 text-[30px] font-extrabold leading-[1.06] tracking-[-0.035em] text-slate-900">
          Your customers don't care how many tools you use.
          <span className="mt-2 block text-zapla-blue">
            They just expect you to follow through.
          </span>
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-zapla-muted">
          Enquiries, messages, follow-up, bookings, reviews and customer context usually live in
          disconnected places. Zapla pulls them into one continuous customer journey.
        </p>

        <div className="relative mt-10 space-y-3">
          {FRAGS.slice(0, 4).map((f, i) => (
            <motion.div
              key={f.key}
              initial={reduced ? false : { opacity: 0, y: 18, rotate: f.rot / 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1.4 : 1.4 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: EASE }}
              className={cn(
                "shadow-[0_20px_40px_-24px_rgba(15,23,42,0.3)]",
                i % 2 === 0 ? "mr-8" : "ml-8",
              )}
            >
              {f.node}
            </motion.div>
          ))}

          <div className="flex flex-col items-center py-2">
            <span className="h-10 w-[2px] rounded bg-gradient-to-b from-blue-200 to-zapla-blue" />
            <span className="mt-2 rounded-full bg-zapla-blue px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white">
              Into Zapla
            </span>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <CustomerSurface />
          </motion.div>

          <p className="pt-6 text-center text-[13px] font-bold text-slate-700">
            One customer. One history. One next action.
          </p>
        </div>
      </div>
    </section>
  );
}
