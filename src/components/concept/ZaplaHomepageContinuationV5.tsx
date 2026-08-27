import { useRef, useState } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  CircleDollarSign,
  MessageSquareText,
  PhoneMissed,
  RefreshCw,
  Star,
  Zap,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { AppShell } from "@/components/v5/kit";
import { SceneInboxLive } from "@/components/v5/scene-inbox-live";
import { SceneSalesLive } from "@/components/v5/scene-sales-live";
import { SceneCalendarLive } from "@/components/v5/scene-calendar-live";
import { SceneAutomationsLive } from "@/components/v5/scene-automations-live";
import { SceneContacts } from "@/components/v5/scenes-a";

const DISPLAY = '\"Inter Tight\", \"Outfit\", \"Manrope\", system-ui, sans-serif';
const BOOK_URL = "https://zapla.io/booking";
const EASE = [0.22, 1, 0.36, 1] as const;

const PRODUCT_SCENES = [
  {
    key: "inbox",
    title: "Unified Inbox",
    subtitle: "The enquiry arrives with context",
    render: (reduced: boolean) => <SceneInboxLive phase={7} elapsedMs={1100} reduced={reduced} />,
  },
  {
    key: "opportunities",
    title: "Sales",
    subtitle: "The same customer becomes an opportunity",
    render: (reduced: boolean) => <SceneSalesLive phase={11} elapsedMs={1200} reduced={reduced} />,
  },
  {
    key: "calendar",
    title: "Calendar",
    subtitle: "The conversation becomes a booking",
    render: (reduced: boolean) => <SceneCalendarLive phase={5} elapsedMs={1200} reduced={reduced} />,
  },
  {
    key: "automations",
    title: "Automations",
    subtitle: "The next step no longer depends on memory",
    render: (reduced: boolean) => <SceneAutomationsLive phase={9} elapsedMs={1200} reduced={reduced} />,
  },
];

const LEAK_BEATS = [
  { time: "9:14", label: "NEW ENQUIRY" },
  { time: "9:28", label: "NO REPLY" },
  { time: "10:41", label: "STILL WAITING" },
  { time: "4:32", label: "BOOKED ELSEWHERE" },
];

const OUTCOMES = [
  {
    key: "enquiry",
    issue: "Missed enquiry",
    result: "Conversation started",
    kicker: "Reply while intent is still warm",
    copy: "The enquiry does not have to wait for someone to notice the inbox.",
  },
  {
    key: "quote",
    issue: "Quiet quote",
    result: "Opportunity moving",
    kicker: "Silence becomes a next action",
    copy: "A quote going quiet becomes a follow-up moment, not the end of the trail.",
  },
  {
    key: "reactivation",
    issue: "Past customer",
    result: "Reactivated",
    kicker: "Dormant does not mean gone",
    copy: "Find the right customers, reach back out and bring live conversations back into the pipeline.",
  },
  {
    key: "complete",
    issue: "Completed job",
    result: "Paid · reviewed · returning",
    kicker: "Completion is not the finish line",
    copy: "Keep the journey moving through payment, reputation and the next reason to come back.",
  },
] as const;

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function SceneNumber({ n, dark = false }: { n: string; dark?: boolean }) {
  return (
    <div
      className={`font-mono text-[10px] font-semibold tracking-[0.14em] ${dark ? "text-white/35" : "text-slate-400"}`}
    >
      {n} / 05
    </div>
  );
}

function ActivityStrip({
  progress,
  threshold,
  top,
  time,
  label,
  accent,
}: {
  progress: MotionValue<number>;
  threshold: number;
  top: string;
  time: string;
  label: string;
  accent: string;
}) {
  const x = useTransform(progress, [threshold - 0.08, threshold + 0.16], [140, -36]);
  const opacity = useTransform(progress, [threshold - 0.08, threshold, threshold + 0.2], [0, 0.78, 0.16]);

  return (
    <motion.div
      className="absolute right-[5%] flex w-[49%] items-center gap-4 border-b border-white/10 pb-3 sm:right-[7%] lg:w-[42%]"
      style={{ top, x, opacity }}
    >
      <span className="w-[48px] shrink-0 font-mono text-[10px] text-white/28">{time}</span>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
      <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-white/58 sm:text-[12px]">
        {label}
      </span>
    </motion.div>
  );
}

function RevenueLeakScene({
  opacity,
  progress,
  beat,
}: {
  opacity: MotionValue<number>;
  progress: MotionValue<number>;
  beat: number;
}) {
  const leadY = useTransform(progress, [0, 0.58, 1], [0, 96, 220]);
  const leadX = useTransform(progress, [0, 1], [0, -42]);
  const leadOpacity = useTransform(progress, [0, 0.66, 0.9, 1], [1, 1, 0.42, 0.08]);
  const leadScale = useTransform(progress, [0, 1], [1, 0.94]);
  const wordX = useTransform(progress, [0, 1], [-120, 20]);
  const sweepX = useTransform(progress, [0, 1], ["7%", "93%"]);
  const lostOpacity = useTransform(progress, [0.72, 0.9, 1], [0, 1, 1]);
  const lostY = useTransform(progress, [0.72, 1], [52, 0]);

  return (
    <motion.div className="absolute inset-0 overflow-hidden bg-[#080B10] text-white" style={{ opacity }}>
      <div className="absolute inset-x-5 top-7 z-40 flex items-center justify-between sm:inset-x-10 lg:inset-x-16">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/75">Where revenue leaks</div>
        <SceneNumber n="01" dark />
      </div>

      <motion.div
        className="pointer-events-none absolute left-[-3%] top-[6%] whitespace-nowrap text-[23vw] font-medium leading-none tracking-[-0.08em] text-white/[0.035]"
        style={{ fontFamily: DISPLAY, x: wordX }}
      >
        UNANSWERED
      </motion.div>

      <div className="absolute left-[6%] top-[17%] z-20 max-w-[520px]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/32">One ordinary Tuesday</div>
        <h2
          className="mt-4 text-[44px] leading-[0.94] tracking-[-0.055em] text-white sm:text-[62px] lg:text-[76px]"
          style={{ fontFamily: DISPLAY, fontWeight: 500 }}
        >
          The business<br />keeps moving.
        </h2>
      </div>

      <motion.div
        className="absolute left-[6%] top-[49%] z-30 w-[72%] max-w-[620px] border-l-2 border-cyan-300 bg-white/[0.055] px-5 py-5 backdrop-blur-[2px] sm:w-[54%] sm:px-7 sm:py-6 lg:left-[8%] lg:w-[44%]"
        style={{ y: leadY, x: leadX, opacity: leadOpacity, scale: leadScale }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#111318]">SM</div>
          <div>
            <div className="text-[13px] font-semibold text-white">Sarah Miller</div>
            <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/32">Website enquiry · 9:14</div>
          </div>
        </div>
        <div className="mt-5 text-[24px] leading-[1.08] tracking-[-0.035em] text-white sm:text-[31px] lg:text-[38px]" style={{ fontFamily: DISPLAY }}>
          “Hi, are you available this week?”
        </div>
      </motion.div>

      <div className="absolute right-[6%] top-[17%] z-30 text-right">
        <AnimatePresence mode="wait">
          <motion.div
            key={LEAK_BEATS[beat].time}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(5px)" }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="font-mono text-[54px] leading-none tracking-[-0.07em] text-white/92 sm:text-[80px] lg:text-[116px]">
              {LEAK_BEATS[beat].time}
            </div>
            <div className={`mt-3 text-[9px] font-semibold uppercase tracking-[0.2em] ${beat === 3 ? "text-rose-400" : "text-cyan-300"}`}>
              {LEAK_BEATS[beat].label}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <ActivityStrip progress={progress} threshold={0.11} top="39%" time="9:17" label="Another call answered" accent="#67E8F9" />
      <ActivityStrip progress={progress} threshold={0.28} top="48%" time="9:31" label="Appointment confirmed" accent="#A7F3D0" />
      <ActivityStrip progress={progress} threshold={0.46} top="57%" time="10:05" label="Payment received" accent="#C4B5FD" />
      <ActivityStrip progress={progress} threshold={0.63} top="66%" time="11:24" label="Review posted" accent="#FDE68A" />

      <motion.div className="absolute bottom-0 top-0 z-10 w-px bg-cyan-300/28 shadow-[0_0_30px_rgba(103,232,249,.22)]" style={{ left: sweepX }} />

      <motion.div className="absolute bottom-[6%] left-[7%] right-[7%] z-40 border-t border-rose-400/40 pt-4 sm:pt-5" style={{ opacity: lostOpacity, y: lostY }}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-[31px] leading-[0.95] tracking-[-0.045em] text-rose-300 sm:text-[48px] lg:text-[62px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            Revenue left quietly.
          </div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-rose-300/70">Nothing broke · nobody followed through</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CustomerThread({ progress, sceneIndex }: { progress: MotionValue<number>; sceneIndex: number }) {
  const left = useTransform(progress, [0, 0.24, 0.5, 0.76, 1], ["34%", "44%", "59%", "71%", "82%"]);
  const top = useTransform(progress, [0, 0.24, 0.5, 0.76, 1], ["42%", "54%", "48%", "61%", "72%"]);
  const rotate = useTransform(progress, [0, 0.35, 0.7, 1], [-5, 2, -2, 0]);
  const scale = useTransform(progress, [0, 0.18, 1], [1.12, 1, 0.94]);

  return (
    <motion.div className="absolute z-50 flex items-center gap-2.5" style={{ left, top, rotate, scale }}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111318] text-[10px] font-bold text-white shadow-[0_10px_30px_rgba(15,23,42,.22)]">SM</div>
      <div className="hidden bg-[#111318] px-3 py-2 text-white shadow-[0_10px_30px_rgba(15,23,42,.18)] sm:block">
        <div className="text-[10px] font-semibold">Sarah Miller</div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={PRODUCT_SCENES[sceneIndex].title}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.55, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-0.5 text-[8px] uppercase tracking-[0.11em]"
          >
            {PRODUCT_SCENES[sceneIndex].title}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ConnectedProductScene({
  opacity,
  progress,
  sceneIndex,
  reduced,
}: {
  opacity: MotionValue<number>;
  progress: MotionValue<number>;
  sceneIndex: number;
  reduced: boolean;
}) {
  const shellY = useTransform(progress, [0, 0.16], [42, 0]);
  const shellScale = useTransform(progress, [0, 0.18, 1], [0.94, 1, 1]);
  const routeLength = useTransform(progress, [0.02, 0.94], [0, 1]);
  const wordX = useTransform(progress, [0, 1], [-100, 18]);
  const scene = PRODUCT_SCENES[sceneIndex];

  return (
    <motion.div className="absolute inset-0 overflow-hidden bg-[#F2F6F5] text-[#111318]" style={{ opacity }}>
      <div className="absolute inset-x-5 top-7 z-40 flex items-center justify-between sm:inset-x-10 lg:inset-x-16">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#29727A]">Every customer moment · one connected system</div>
        <SceneNumber n="02" />
      </div>

      <motion.div
        className="pointer-events-none absolute left-[-3%] top-[4%] whitespace-nowrap text-[20vw] font-medium leading-none tracking-[-0.075em] text-[#D7E7E5]/80"
        style={{ fontFamily: DISPLAY, x: wordX }}
      >
        CONNECTED
      </motion.div>

      <div className="absolute left-[6%] top-[17%] z-20 max-w-[690px]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5E8588]">One customer thread</div>
        <h2 className="mt-4 text-[42px] leading-[0.94] tracking-[-0.055em] sm:text-[58px] lg:text-[72px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
          The interface can change.<br />Sarah does not disappear.
        </h2>
      </div>

      <motion.div
        className="absolute bottom-[6%] left-[5%] right-[4%] h-[49%] origin-center overflow-hidden border border-[#C9D9D7] bg-white shadow-[0_42px_100px_-48px_rgba(15,23,42,.32)] sm:left-[7%] lg:bottom-[8%] lg:left-[29%] lg:h-[70%]"
        style={{ y: shellY, scale: shellScale }}
      >
        <AppShell activeKey={scene.key} title={scene.title} subtitle={scene.subtitle}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={scene.key}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 62, clipPath: "inset(0 0 0 22%)" }}
              animate={{ opacity: 1, x: 0, clipPath: "inset(0 0 0 0%)" }}
              exit={{ opacity: 0, x: -34, clipPath: "inset(0 18% 0 0)" }}
              transition={{ duration: reduced ? 0 : 0.42, ease: EASE }}
            >
              {scene.render(reduced)}
            </motion.div>
          </AnimatePresence>
        </AppShell>
      </motion.div>

      <svg className="pointer-events-none absolute inset-0 z-30 h-full w-full" viewBox="0 0 1200 700" preserveAspectRatio="none" aria-hidden>
        <motion.path
          d="M400 305 C470 390 530 300 620 382 S790 355 860 435 S1010 480 1065 525"
          fill="none"
          stroke="rgba(14,165,169,.18)"
          strokeWidth="10"
          strokeLinecap="round"
          style={{ pathLength: routeLength }}
        />
        <motion.path
          d="M400 305 C470 390 530 300 620 382 S790 355 860 435 S1010 480 1065 525"
          fill="none"
          stroke="#0EA5A9"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: routeLength }}
        />
      </svg>

      <CustomerThread progress={progress} sceneIndex={sceneIndex} />

      <div className="absolute bottom-[3.5%] left-[7%] right-[7%] z-40 hidden items-center justify-between lg:flex">
        {PRODUCT_SCENES.map((item, index) => (
          <div key={item.key} className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${index <= sceneIndex ? "bg-[#0EA5A9]" : "bg-[#B8CECC]"}`} />
            <span className={`text-[9px] font-semibold uppercase tracking-[0.13em] ${index === sceneIndex ? "text-[#111318]" : "text-[#7E9B99]"}`}>
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function RoleMarker({
  label,
  threshold,
  progress,
  className,
}: {
  label: string;
  threshold: number;
  progress: MotionValue<number>;
  className: string;
}) {
  const opacity = useTransform(progress, [threshold - 0.08, threshold], [0, 1]);
  const x = useTransform(progress, [threshold - 0.08, threshold], [28, 0]);
  const scale = useTransform(progress, [threshold - 0.08, threshold + 0.04], [0.86, 1]);

  return (
    <motion.div className={`absolute z-40 items-center gap-2 ${className}`} style={{ opacity, x, scale }}>
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden>
        <path d="M1 1L14 10L8.1 11.2L5.2 18.2L1 1Z" fill="#111318" />
      </svg>
      <span className="whitespace-nowrap bg-[#111318] px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-sm">{label}</span>
    </motion.div>
  );
}

function UnlimitedUsersScene({ opacity, progress, reduced }: { opacity: MotionValue<number>; progress: MotionValue<number>; reduced: boolean }) {
  const wordX = useTransform(progress, [0, 1], [-90, 0]);
  const productScale = useTransform(progress, [0, 0.35, 1], [0.92, 1, 1]);

  return (
    <motion.div className="absolute inset-0 overflow-hidden bg-[#DCEBEB] text-[#111318]" style={{ opacity }}>
      <div className="absolute inset-x-5 top-7 z-40 flex items-center justify-between sm:inset-x-10 lg:inset-x-16">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3B7277]">Unlimited users included</div>
        <SceneNumber n="03" />
      </div>

      <motion.div className="pointer-events-none absolute left-[-2%] top-[8%] whitespace-nowrap text-[21vw] font-medium leading-none tracking-[-0.075em] text-[#BAD5D5]/55" style={{ fontFamily: DISPLAY, x: wordX }}>
        UNLIMITED
      </motion.div>

      <div className="absolute left-[6%] top-[22%] z-20 max-w-[560px] lg:top-[36%]">
        <h2 className="text-[44px] leading-[0.95] tracking-[-0.055em] sm:text-[60px] lg:text-[72px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
          Add the team.<br />Not the seat tax.
        </h2>
        <p className="mt-5 max-w-[470px] text-[14px] leading-[1.65] text-slate-600 sm:text-[16px] lg:mt-6 lg:text-[17px]">
          The same customer journey can stay visible to the people who need it without turning every extra teammate into another licence decision.
        </p>
      </div>

      <motion.div className="absolute bottom-[6%] right-[3%] h-[47%] w-[88%] overflow-hidden border border-[#AEC9C9] bg-white shadow-[0_36px_90px_-42px_rgba(15,23,42,.35)] lg:bottom-[10%] lg:h-[58%] lg:w-[58%]" style={{ scale: productScale }}>
        <AppShell activeKey="opportunities" title="Sales" subtitle="Shared customer context">
          <div className="absolute inset-0"><SceneSalesLive phase={11} elapsedMs={1200} reduced={reduced} /></div>
        </AppShell>
      </motion.div>

      <RoleMarker label="Owner" threshold={0.12} progress={progress} className="left-[9%] top-[48%] flex lg:left-[66%] lg:top-[23%]" />
      <RoleMarker label="Front desk" threshold={0.28} progress={progress} className="left-[51%] top-[45%] flex lg:left-[78%] lg:top-[33%]" />
      <RoleMarker label="Sales" threshold={0.44} progress={progress} className="left-[13%] top-[69%] flex lg:left-[58%] lg:top-[58%]" />
      <RoleMarker label="Accounts" threshold={0.6} progress={progress} className="left-[51%] top-[68%] flex lg:left-[83%] lg:top-[67%]" />
      <RoleMarker label="Team" threshold={0.76} progress={progress} className="left-[30%] top-[82%] flex lg:left-[69%] lg:top-[77%]" />

      <div className="absolute bottom-[3%] left-[6%] border-t border-[#A8C6C6] pt-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#3B7277] lg:bottom-[8%] lg:text-[11px]">
        One customer context · everyone who needs access
      </div>
    </motion.div>
  );
}

function FlowArtifact({
  progress,
  startX,
  startY,
  startRotate,
  className,
  children,
}: {
  progress: MotionValue<number>;
  startX: number;
  startY: number;
  startRotate: number;
  className: string;
  children: React.ReactNode;
}) {
  const x = useTransform(progress, [0.05, 0.55], [startX, 0]);
  const y = useTransform(progress, [0.05, 0.55], [startY, 0]);
  const rotate = useTransform(progress, [0.05, 0.55], [startRotate, 0]);
  const scale = useTransform(progress, [0.05, 0.55], [0.88, 1]);
  const opacity = useTransform(progress, [0, 0.56, 0.76], [1, 1, 0.08]);

  return (
    <motion.div className={`absolute z-30 ${className}`} style={{ x, y, rotate, scale, opacity }}>
      {children}
    </motion.div>
  );
}

function GuidedLaunchScene({ opacity, progress, reduced }: { opacity: MotionValue<number>; progress: MotionValue<number>; reduced: boolean }) {
  const wordX = useTransform(progress, [0, 1], [-110, 0]);
  const shellOpacity = useTransform(progress, [0.34, 0.58], [0, 1]);
  const shellScale = useTransform(progress, [0.34, 0.7], [0.9, 1]);
  const shellY = useTransform(progress, [0.34, 0.66], [70, 0]);
  const intakeOpacity = useTransform(progress, [0.32, 0.48], [0, 1]);
  const intakeScale = useTransform(progress, [0.32, 0.54], [0.7, 1]);
  const routeLength = useTransform(progress, [0.18, 0.66], [0, 1]);

  return (
    <motion.div className="absolute inset-0 overflow-hidden bg-[#F0ECE4] text-[#111318]" style={{ opacity }}>
      <div className="absolute inset-x-5 top-7 z-40 flex items-center justify-between sm:inset-x-10 lg:inset-x-16">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B765B]">Guided Launch</div>
        <SceneNumber n="04" />
      </div>

      <motion.div
        className="pointer-events-none absolute left-[-2%] top-[6%] whitespace-nowrap text-[22vw] font-medium leading-none tracking-[-0.075em] text-[#DED6C8]/75"
        style={{ fontFamily: DISPLAY, x: wordX }}
      >
        MAPPED
      </motion.div>

      <div className="absolute left-[6%] top-[16%] z-20 max-w-[700px]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9B866A]">Your real workflow</div>
        <h2 className="mt-4 text-[42px] leading-[0.94] tracking-[-0.055em] sm:text-[58px] lg:text-[70px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
          We do not hand you<br />a blank account.
        </h2>
        <p className="mt-5 max-w-[540px] text-[14px] leading-[1.65] text-[#756958] sm:text-[16px]">
          Guided Launch starts with the way enquiries, calls, bookings and follow-up already move through your business, then builds the important flow into Zapla.
        </p>
      </div>

      <FlowArtifact progress={progress} startX={-170} startY={100} startRotate={-9} className="left-[7%] top-[52%] lg:left-[9%] lg:top-[61%]">
        <div className="w-[210px] border-l-2 border-[#111318] bg-white/80 px-4 py-4 backdrop-blur-sm sm:w-[250px] sm:px-5">
          <div className="text-[8px] font-semibold uppercase tracking-[0.15em] text-slate-400">Website enquiry</div>
          <div className="mt-2 text-[12px] leading-[1.45] text-slate-800 sm:text-[13px]">Can I book Thursday morning?</div>
        </div>
      </FlowArtifact>

      <FlowArtifact progress={progress} startX={150} startY={-90} startRotate={8} className="left-[48%] top-[46%] lg:left-[25%] lg:top-[51%]">
        <div className="flex w-[185px] items-center gap-3 border-y border-[#CFC5B5] bg-[#FAF8F3]/90 px-4 py-3 sm:w-[210px] sm:py-4">
          <PhoneMissed className="h-5 w-5 text-rose-500" />
          <div>
            <div className="text-[8px] uppercase tracking-[0.14em] text-slate-400">Missed call</div>
            <div className="mt-1 text-[11px] font-semibold sm:text-[12px]">0412 884 103</div>
          </div>
        </div>
      </FlowArtifact>

      <FlowArtifact progress={progress} startX={220} startY={110} startRotate={10} className="left-[14%] top-[70%] lg:left-[38%] lg:top-[66%]">
        <div className="w-[190px] border-b border-[#A99B87] bg-[#F8F5EE]/92 px-4 py-3 sm:w-[220px] sm:py-4">
          <div className="text-[8px] uppercase tracking-[0.14em] text-slate-400">Calendar note</div>
          <div className="mt-2 text-[12px] font-semibold sm:text-[13px]">Thu · 10:30 · Sarah?</div>
        </div>
      </FlowArtifact>

      <FlowArtifact progress={progress} startX={-120} startY={-145} startRotate={-7} className="left-[51%] top-[65%] lg:left-[48%] lg:top-[49%]">
        <div className="w-[175px] bg-[#FFF0A8] px-4 py-4 shadow-[0_15px_40px_-28px_rgba(15,23,42,.4)] sm:w-[205px] sm:px-5 sm:py-5">
          <div className="text-[12px] font-semibold leading-[1.35] sm:text-[14px]">Remember to follow up quote</div>
        </div>
      </FlowArtifact>

      <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full" viewBox="0 0 1200 700" preserveAspectRatio="none" aria-hidden>
        <motion.path
          d="M150 520 C300 450 390 560 520 470 S690 470 760 430"
          fill="none"
          stroke="rgba(14,165,169,.14)"
          strokeWidth="12"
          strokeLinecap="round"
          style={{ pathLength: routeLength }}
        />
        <motion.path
          d="M150 520 C300 450 390 560 520 470 S690 470 760 430"
          fill="none"
          stroke="#0EA5A9"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: routeLength }}
        />
      </svg>

      <motion.div className="absolute left-[47%] top-[58%] z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#111318] text-white shadow-[0_16px_40px_-18px_rgba(15,23,42,.45)] lg:left-[54%] lg:top-[58%]" style={{ opacity: intakeOpacity, scale: intakeScale }}>
        <Zap className="h-5 w-5" />
      </motion.div>

      <motion.div
        className="absolute bottom-[5%] left-[5%] right-[5%] z-25 h-[38%] overflow-hidden border border-[#CFC5B5] bg-white shadow-[0_38px_90px_-46px_rgba(82,63,39,.36)] lg:bottom-[8%] lg:left-[43%] lg:right-[4%] lg:h-[55%]"
        style={{ opacity: shellOpacity, scale: shellScale, y: shellY }}
      >
        <AppShell activeKey="automations" title="Automations" subtitle="Your mapped follow-through">
          <div className="absolute inset-0"><SceneAutomationsLive phase={9} elapsedMs={1200} reduced={reduced} /></div>
        </AppShell>
      </motion.div>

      <motion.div className="absolute bottom-[2.5%] left-[6%] z-40 hidden items-center gap-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8B765B] lg:flex" style={{ opacity: shellOpacity }}>
        <span>Understand</span><span>→</span><span>Configure</span><span>→</span><span>Launch</span><span>→</span><span>Improve</span>
      </motion.div>
    </motion.div>
  );
}

function ConversationOutcome({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative h-full overflow-hidden bg-[#0C1118] p-5 sm:p-8">
      <motion.div
        initial={reduced ? false : { opacity: 0, x: -34 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
        className="absolute left-[7%] top-[20%] max-w-[72%] border-l-2 border-white/20 bg-white/[0.055] px-5 py-4"
      >
        <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/32">Sarah · website enquiry</div>
        <div className="mt-2 text-[17px] leading-[1.35] text-white sm:text-[22px]">Are you available this week?</div>
      </motion.div>
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 44, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: reduced ? 0 : 0.28, duration: reduced ? 0 : 0.5, ease: EASE }}
        className="absolute bottom-[16%] right-[7%] max-w-[72%] bg-cyan-200 px-5 py-4 text-[#081015]"
      >
        <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#25656C]">Zapla · 2 min later</div>
        <div className="mt-2 text-[17px] leading-[1.35] sm:text-[22px]">Yes. Thursday morning is available. Want me to book it?</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 0.6, duration: 0.25 }}
        className="absolute bottom-[7%] right-[7%] flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-cyan-200/65"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> Conversation live
      </motion.div>
    </div>
  );
}

function QuoteOutcome({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative h-full overflow-hidden bg-[#F4F6F7] p-6 text-[#111318] sm:p-8">
      <div className="absolute left-[8%] top-[18%] right-[8%]">
        <div className="flex items-end justify-between gap-4 border-b border-slate-300 pb-5">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-400">Quote #1048</div>
            <div className="mt-2 text-[26px] tracking-[-0.04em] sm:text-[34px]" style={{ fontFamily: DISPLAY }}>Kitchen electrical upgrade</div>
          </div>
          <div className="text-right text-[9px] font-semibold uppercase tracking-[0.14em] text-rose-500">Viewed · 3 days ago</div>
        </div>
        <div className="relative mt-12 h-px bg-slate-300">
          <motion.div
            initial={reduced ? false : { width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: reduced ? 0 : 1.05, ease: EASE }}
            className="absolute left-0 top-0 h-px bg-cyan-500 shadow-[0_0_18px_rgba(6,182,212,.35)]"
          />
          <motion.div
            initial={reduced ? false : { left: "0%" }}
            animate={{ left: "94%" }}
            transition={{ duration: reduced ? 0 : 1.05, ease: EASE }}
            className="absolute -top-1.5 h-3 w-3 rounded-full bg-cyan-500"
          />
        </div>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.72, duration: reduced ? 0 : 0.4, ease: EASE }}
          className="mt-10 flex items-center justify-between border-l-2 border-cyan-500 bg-white px-5 py-4 shadow-[0_18px_50px_-35px_rgba(15,23,42,.35)]"
        >
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-700">Follow-up sent</div>
            <div className="mt-1 text-[14px] font-semibold sm:text-[16px]">“Any questions before we lock in a time?”</div>
          </div>
          <div className="hidden text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-600 sm:block">Reply received</div>
        </motion.div>
      </div>
    </div>
  );
}

function ReactivationOutcome({ reduced }: { reduced: boolean }) {
  return (
    <div className="absolute inset-0 bg-white">
      <AppShell activeKey="contacts" title="Contacts" subtitle="Dormant customers wake up">
        <div className="absolute inset-0"><SceneContacts phase={18} elapsedMs={1200} reduced={reduced} /></div>
      </AppShell>
    </div>
  );
}

function CompletionOutcome({ reduced }: { reduced: boolean }) {
  const steps = [
    { label: "Job complete", icon: CalendarCheck2 },
    { label: "Paid", icon: CircleDollarSign },
    { label: "Review", icon: Star },
    { label: "Return", icon: RefreshCw },
  ];

  return (
    <div className="relative h-full overflow-hidden bg-[#EEF5F4] p-6 text-[#111318] sm:p-9">
      <div className="absolute left-[7%] right-[7%] top-[26%]">
        <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#4D7779]">The journey keeps going</div>
        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-5 h-px bg-[#B8CECC]" />
          <motion.div
            initial={reduced ? false : { width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: reduced ? 0 : 1.15, ease: EASE }}
            className="absolute left-0 top-5 h-[2px] bg-[#0EA5A9]"
          />
          <div className="relative grid grid-cols-4 gap-2">
            {steps.map(({ label, icon: Icon }, index) => (
              <motion.div
                key={label}
                initial={reduced ? false : { opacity: 0.25, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0 : index * 0.2, duration: reduced ? 0 : 0.38, ease: EASE }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#9FC2C1] bg-[#EEF5F4] text-[#236A70] sm:h-11 sm:w-11">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.11em] text-[#355E62] sm:text-[11px]">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OutcomeVisual({ index, reduced }: { index: number; reduced: boolean }) {
  if (index === 0) return <ConversationOutcome reduced={reduced} />;
  if (index === 1) return <QuoteOutcome reduced={reduced} />;
  if (index === 2) return <ReactivationOutcome reduced={reduced} />;
  return <CompletionOutcome reduced={reduced} />;
}

function OutcomesScene({
  opacity,
  progress,
  outcomeIndex,
  reduced,
}: {
  opacity: MotionValue<number>;
  progress: MotionValue<number>;
  outcomeIndex: number;
  reduced: boolean;
}) {
  const wordX = useTransform(progress, [0, 1], [-100, 20]);
  const ctaOpacity = useTransform(progress, [0.78, 0.96], [0, 1]);
  const contentOpacity = useTransform(progress, [0.74, 0.94], [1, 0.08]);
  const visualScale = useTransform(progress, [0, 0.74, 1], [0.96, 1, 0.92]);
  const item = OUTCOMES[outcomeIndex];

  return (
    <motion.div className="absolute inset-0 overflow-hidden bg-[#070A0F] text-white" style={{ opacity }}>
      <div className="absolute inset-x-5 top-7 z-40 flex items-center justify-between sm:inset-x-10 lg:inset-x-16">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/75">Follow-through changes the ending</div>
        <SceneNumber n="05" dark />
      </div>

      <motion.div
        className="pointer-events-none absolute left-[-3%] top-[5%] whitespace-nowrap text-[20vw] font-medium leading-none tracking-[-0.075em] text-cyan-200/[0.055]"
        style={{ fontFamily: DISPLAY, x: wordX }}
      >
        MOVING
      </motion.div>

      <motion.div className="absolute inset-0" style={{ opacity: contentOpacity }}>
        <div className="absolute left-[6%] top-[17%] z-20 w-[88%] lg:w-[36%]">
          <div className="text-[9px] font-semibold uppercase tracking-[0.17em] text-cyan-200/55">{item.kicker}</div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{ duration: reduced ? 0 : 0.36, ease: EASE }}
            >
              <div className="mt-5 text-[24px] leading-none tracking-[-0.035em] text-white/34 line-through decoration-white/18 sm:text-[30px] lg:text-[38px]" style={{ fontFamily: DISPLAY }}>
                {item.issue}
              </div>
              <h2 className="mt-4 text-[46px] leading-[0.9] tracking-[-0.06em] text-white sm:text-[62px] lg:text-[78px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
                {item.result}
              </h2>
              <p className="mt-6 max-w-[440px] text-[14px] leading-[1.65] text-white/43 sm:text-[16px]">{item.copy}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-7 flex gap-2">
            {OUTCOMES.map((outcome, index) => (
              <span key={outcome.key} className={`h-1.5 transition-all duration-300 ${index === outcomeIndex ? "w-10 bg-cyan-300" : "w-3 bg-white/16"}`} />
            ))}
          </div>
        </div>

        <motion.div
          className="absolute bottom-[7%] left-[6%] right-[5%] h-[43%] overflow-hidden border border-white/10 bg-[#0B1017] shadow-[0_38px_100px_-45px_rgba(0,0,0,.7)] lg:bottom-[9%] lg:left-[45%] lg:h-[66%]"
          style={{ scale: visualScale }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.key}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.97, clipPath: "inset(0 0 0 12%)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0%)" }}
              exit={{ opacity: 0, scale: 0.985, clipPath: "inset(0 12% 0 0)" }}
              transition={{ duration: reduced ? 0 : 0.38, ease: EASE }}
            >
              <OutcomeVisual index={outcomeIndex} reduced={reduced} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div className="absolute inset-x-[6%] top-[23%] z-50" style={{ opacity: ctaOpacity }}>
        <div className="max-w-[1100px] text-[52px] leading-[0.88] tracking-[-0.065em] text-white sm:text-[76px] lg:text-[108px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
          Make follow-through<br />part of the system.
        </div>
        <p className="mt-7 max-w-[590px] text-[15px] leading-[1.7] text-white/48 sm:text-[17px]">
          Bring the customer journey into one connected place, then let Zapla keep the important next steps moving.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 bg-white px-5 text-[13px] font-semibold text-[#111318]">
            Book a Call <ArrowRight className="h-4 w-4" />
          </a>
          <a href="/pricing" className="inline-flex h-[50px] items-center border border-white/20 px-5 text-[13px] font-semibold text-white/80">
            See plans and pricing
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ZaplaHomepageContinuationV5() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = !!useReducedMotion();
  const [scene, setScene] = useState(0);
  const [leakBeat, setLeakBeat] = useState(0);
  const [productScene, setProductScene] = useState(0);
  const [outcomeScene, setOutcomeScene] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const v = clamp01(value);
    const nextScene = v < 0.19 ? 0 : v < 0.45 ? 1 : v < 0.62 ? 2 : v < 0.79 ? 3 : 4;
    setScene(nextScene);

    const lb = Math.min(3, Math.floor(clamp01(v / 0.19) * 4));
    setLeakBeat(lb);

    const productLocal = clamp01((v - 0.19) / 0.26);
    setProductScene(Math.min(3, Math.floor(Math.min(0.999, productLocal) * 4)));

    const outcomeLocal = clamp01((v - 0.79) / 0.16);
    setOutcomeScene(Math.min(3, Math.floor(Math.min(0.999, outcomeLocal) * 4)));
  });

  const leakProgress = useTransform(scrollYProgress, [0, 0.19], [0, 1], { clamp: true });
  const connectedProgress = useTransform(scrollYProgress, [0.19, 0.45], [0, 1], { clamp: true });
  const teamProgress = useTransform(scrollYProgress, [0.45, 0.62], [0, 1], { clamp: true });
  const guidedProgress = useTransform(scrollYProgress, [0.62, 0.79], [0, 1], { clamp: true });
  const outcomesProgress = useTransform(scrollYProgress, [0.79, 1], [0, 1], { clamp: true });

  const o1 = useTransform(scrollYProgress, [0, 0.16, 0.205], [1, 1, 0], { clamp: true });
  const o2 = useTransform(scrollYProgress, [0.16, 0.205, 0.42, 0.47], [0, 1, 1, 0], { clamp: true });
  const o3 = useTransform(scrollYProgress, [0.42, 0.47, 0.59, 0.64], [0, 1, 1, 0], { clamp: true });
  const o4 = useTransform(scrollYProgress, [0.59, 0.64, 0.76, 0.81], [0, 1, 1, 0], { clamp: true });
  const o5 = useTransform(scrollYProgress, [0.76, 0.81, 1], [0, 1, 1], { clamp: true });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-[430vh] bg-[#080B10] sm:h-[410vh]">
      <div className="sticky top-[66px] h-[calc(100vh-66px)] min-h-[610px] overflow-hidden bg-[#080B10]">
        <RevenueLeakScene opacity={o1} progress={leakProgress} beat={leakBeat} />
        <ConnectedProductScene opacity={o2} progress={connectedProgress} sceneIndex={productScene} reduced={reduced} />
        <UnlimitedUsersScene opacity={o3} progress={teamProgress} reduced={reduced} />
        <GuidedLaunchScene opacity={o4} progress={guidedProgress} reduced={reduced} />
        <OutcomesScene opacity={o5} progress={outcomesProgress} outcomeIndex={outcomeScene} reduced={reduced} />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-[90] h-px bg-white/10">
          <motion.div className="h-px origin-left bg-cyan-300" style={{ scaleX: progressScale }} />
        </div>

        <div className="pointer-events-none absolute bottom-5 left-5 z-[90] hidden items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/28 lg:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> Follow-through story · scene {scene + 1}
        </div>
      </div>
    </section>
  );
}
