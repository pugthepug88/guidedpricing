import { useRef, useState } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
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

const DISPLAY = '\"Inter Tight\", \"Outfit\", \"Manrope\", system-ui, sans-serif';
const BOOK_URL = "https://zapla.io/booking";

const PRODUCT_SCENES = [
  {
    key: "inbox",
    title: "Unified Inbox",
    subtitle: "The enquiry arrives with context",
    phase: 7,
    render: (reduced: boolean) => <SceneInboxLive phase={7} elapsedMs={1100} reduced={reduced} />,
  },
  {
    key: "opportunities",
    title: "Sales",
    subtitle: "The same customer becomes an opportunity",
    phase: 11,
    render: (reduced: boolean) => <SceneSalesLive phase={11} elapsedMs={1200} reduced={reduced} />,
  },
  {
    key: "calendar",
    title: "Calendar",
    subtitle: "The conversation becomes a booking",
    phase: 5,
    render: (reduced: boolean) => <SceneCalendarLive phase={5} elapsedMs={1200} reduced={reduced} />,
  },
  {
    key: "automations",
    title: "Automations",
    subtitle: "The next step no longer depends on memory",
    phase: 9,
    render: (reduced: boolean) => <SceneAutomationsLive phase={9} elapsedMs={1200} reduced={reduced} />,
  },
];

const LEAK_BEATS = [
  { time: "9:14", label: "NEW ENQUIRY", copy: "Hi, are you available this week?" },
  { time: "9:28", label: "NO REPLY", copy: "The team is busy doing the work." },
  { time: "10:41", label: "STILL WAITING", copy: "Nobody owns the next step." },
  { time: "4:32", label: "BOOKED ELSEWHERE", copy: "Nothing broke. Revenue left quietly." },
];

const OUTCOME_ROWS = [
  ["Missed enquiry", "Conversation started"],
  ["Quiet quote", "Opportunity moving"],
  ["Past customer", "Reactivated"],
  ["Completed job", "Paid · reviewed · retained"],
] as const;

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function SceneNumber({ n, dark = false }: { n: string; dark?: boolean }) {
  return (
    <div className={`font-mono text-[10px] font-semibold tracking-[0.14em] ${dark ? "text-white/35" : "text-slate-400"}`}>
      {n} / 05
    </div>
  );
}

function RevenueLeakScene({ opacity, progress, beat }: { opacity: MotionValue<number>; progress: MotionValue<number>; beat: number }) {
  const messageOpacity = useTransform(progress, [0, 0.68, 1], [1, 1, 0.12]);
  const messageX = useTransform(progress, [0, 1], [0, -70]);
  const sweepX = useTransform(progress, [0, 1], ["8%", "92%"]);
  const lostOpacity = useTransform(progress, [0.72, 0.92, 1], [0, 1, 1]);
  const lostY = useTransform(progress, [0.72, 1], [40, 0]);

  return (
    <motion.div className="absolute inset-0 overflow-hidden bg-[#080B10] text-white" style={{ opacity }}>
      <div className="absolute inset-x-5 top-7 flex items-center justify-between sm:inset-x-10 lg:inset-x-16">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/75">Where revenue leaks</div>
        <SceneNumber n="01" dark />
      </div>

      <motion.div className="absolute bottom-[18%] left-[5%] max-w-[75%] sm:left-[7%] lg:left-[8%] lg:max-w-[58%]" style={{ opacity: messageOpacity, x: messageX }}>
        <div className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">Sarah Miller · website enquiry</div>
        <div className="text-[42px] leading-[1.01] tracking-[-0.045em] text-white sm:text-[62px] lg:text-[78px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
          “Hi, are you available this week?”
        </div>
      </motion.div>

      <div className="absolute right-[5%] top-[18%] w-[38%] min-w-[250px] max-w-[520px] sm:right-[8%]">
        <AnimatePresence mode="wait">
          <motion.div key={LEAK_BEATS[beat].time} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.28 }}>
            <div className="font-mono text-[72px] leading-none tracking-[-0.07em] text-white/95 sm:text-[96px] lg:text-[128px]">{LEAK_BEATS[beat].time}</div>
            <div className={`mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] ${beat === 3 ? "text-rose-400" : "text-cyan-300"}`}>{LEAK_BEATS[beat].label}</div>
            <div className="mt-3 max-w-[360px] text-[14px] leading-[1.65] text-white/45 sm:text-[16px]">{LEAK_BEATS[beat].copy}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div className="absolute bottom-0 top-0 w-px bg-cyan-300/45 shadow-[0_0_28px_rgba(34,211,238,.35)]" style={{ left: sweepX }} />
      <motion.div className="absolute bottom-[8%] left-[8%] right-[8%] border-t border-rose-400/45 pt-5" style={{ opacity: lostOpacity, y: lostY }}>
        <div className="text-[30px] leading-[0.98] tracking-[-0.04em] text-rose-300 sm:text-[46px] lg:text-[58px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
          The expensive part is how ordinary it looks.
        </div>
      </motion.div>
    </motion.div>
  );
}

function ConnectedProductScene({ opacity, progress, sceneIndex, reduced }: { opacity: MotionValue<number>; progress: MotionValue<number>; sceneIndex: number; reduced: boolean }) {
  const reveal = useTransform(progress, [0, 0.2, 1], [0.9, 1, 1]);
  const shellY = useTransform(progress, [0, 0.18], [38, 0]);
  const threadWidth = useTransform(progress, [0, 1], ["4%", "92%"]);
  const scene = PRODUCT_SCENES[sceneIndex];

  return (
    <motion.div className="absolute inset-0 overflow-hidden bg-[#F4F6F7] text-[#111318]" style={{ opacity }}>
      <div className="absolute inset-x-5 top-7 flex items-center justify-between sm:inset-x-10 lg:inset-x-16">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-700">Every customer moment · one connected system</div>
        <SceneNumber n="02" />
      </div>

      <div className="absolute left-[5%] top-[17%] z-20 max-w-[420px] sm:left-[7%] lg:left-[6%] lg:top-[22%]">
        <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">Same customer</div>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111318] text-[11px] font-bold text-white">SM</div>
          <div>
            <div className="text-[16px] font-semibold">Sarah Miller</div>
            <div className="mt-1 text-[12px] text-slate-400">Context stays attached</div>
          </div>
        </div>
        <h2 className="mt-8 text-[42px] leading-[0.95] tracking-[-0.055em] sm:text-[56px] lg:text-[68px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
          The system changes.<br />The customer does not.
        </h2>
      </div>

      <motion.div className="absolute left-[5%] right-[4%] top-[49%] h-[43%] origin-center overflow-hidden border border-slate-200 bg-white shadow-[0_42px_100px_-48px_rgba(15,23,42,.35)] sm:left-[7%] lg:left-[34%] lg:top-[16%] lg:h-[72%]" style={{ scale: reveal, y: shellY }}>
        <AppShell activeKey={scene.key} title={scene.title} subtitle={scene.subtitle}>
          <AnimatePresence mode="wait">
            <motion.div key={scene.key} className="absolute inset-0" initial={{ opacity: 0, x: 42, clipPath: "inset(0 0 0 14%)" }} animate={{ opacity: 1, x: 0, clipPath: "inset(0 0 0 0%)" }} exit={{ opacity: 0, x: -28, clipPath: "inset(0 12% 0 0)" }} transition={{ duration: reduced ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}>
              {scene.render(reduced)}
            </motion.div>
          </AnimatePresence>
        </AppShell>
      </motion.div>

      <div className="absolute bottom-[5%] left-[7%] right-[7%] hidden items-center gap-0 lg:flex">
        <div className="relative h-px flex-1 bg-slate-300">
          <motion.div className="absolute left-0 top-0 h-px bg-cyan-500" style={{ width: threadWidth }} />
        </div>
        {PRODUCT_SCENES.map((item, index) => (
          <div key={item.key} className="ml-4 flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${index <= sceneIndex ? "bg-cyan-500" : "bg-slate-300"}`} />
            <span className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${index === sceneIndex ? "text-slate-900" : "text-slate-400"}`}>{item.title}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function RoleMarker({ label, x, y, threshold, progress }: { label: string; x: string; y: string; threshold: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [threshold - 0.08, threshold], [0, 1]);
  const translate = useTransform(progress, [threshold - 0.08, threshold], [26, 0]);
  return (
    <motion.div className="absolute z-30 flex items-center gap-2" style={{ left: x, top: y, opacity, x: translate }}>
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
      <div className="absolute inset-x-5 top-7 flex items-center justify-between sm:inset-x-10 lg:inset-x-16">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3B7277]">Unlimited users included</div>
        <SceneNumber n="03" />
      </div>

      <motion.div className="pointer-events-none absolute left-[-2%] top-[8%] whitespace-nowrap text-[21vw] font-medium leading-none tracking-[-0.075em] text-[#BAD5D5]/55" style={{ fontFamily: DISPLAY, x: wordX }}>
        UNLIMITED
      </motion.div>

      <div className="absolute left-[6%] top-[24%] z-20 max-w-[560px] lg:top-[36%]">
        <h2 className="text-[44px] leading-[0.95] tracking-[-0.055em] sm:text-[60px] lg:text-[72px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
          Add the team.<br />Not the seat tax.
        </h2>
        <p className="mt-6 max-w-[470px] text-[15px] leading-[1.7] text-slate-600 sm:text-[17px]">
          The same customer journey can stay visible to the people who need it without turning every extra teammate into another licence decision.
        </p>
      </div>

      <motion.div className="absolute bottom-[8%] right-[4%] h-[48%] w-[74%] overflow-hidden border border-[#AEC9C9] bg-white shadow-[0_36px_90px_-42px_rgba(15,23,42,.35)] lg:bottom-[10%] lg:h-[58%] lg:w-[58%]" style={{ scale: productScale }}>
        <AppShell activeKey="opportunities" title="Sales" subtitle="Shared customer context">
          <div className="absolute inset-0"><SceneSalesLive phase={11} elapsedMs={1200} reduced={reduced} /></div>
        </AppShell>
      </motion.div>

      <RoleMarker label="Owner" x="66%" y="23%" threshold={0.12} progress={progress} />
      <RoleMarker label="Front desk" x="78%" y="33%" threshold={0.28} progress={progress} />
      <RoleMarker label="Sales" x="58%" y="58%" threshold={0.44} progress={progress} />
      <RoleMarker label="Accounts" x="83%" y="67%" threshold={0.6} progress={progress} />
      <RoleMarker label="Team" x="69%" y="77%" threshold={0.76} progress={progress} />

      <div className="absolute bottom-[5%] left-[6%] border-t border-[#A8C6C6] pt-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#3B7277] lg:bottom-[8%]">
        One customer context · everyone who needs access
      </div>
    </motion.div>
  );
}

function ProcessFragment({ progress, startX, startY, startRotate, left, top, children }: { progress: MotionValue<number>; startX: number; startY: number; startRotate: number; left: string; top: string; children: React.ReactNode }) {
  const x = useTransform(progress, [0.08, 0.82], [startX, 0]);
  const y = useTransform(progress, [0.08, 0.82], [startY, 0]);
  const rotate = useTransform(progress, [0.08, 0.82], [startRotate, 0]);
  const scale = useTransform(progress, [0.08, 0.82], [0.94, 1]);
  return (
    <motion.div className="absolute z-20" style={{ left, top, x, y, rotate, scale }}>
      {children}
    </motion.div>
  );
}

function GuidedLaunchScene({ opacity, progress }: { opacity: MotionValue<number>; progress: MotionValue<number> }) {
  const frameOpacity = useTransform(progress, [0.3, 0.78], [0, 1]);
  const routeLength = useTransform(progress, [0.32, 0.86], [0, 1]);
  const messOpacity = useTransform(progress, [0, 0.58, 0.9], [1, 0.65, 0.18]);

  return (
    <motion.div className="absolute inset-0 overflow-hidden bg-[#F0ECE4] text-[#111318]" style={{ opacity }}>
      <div className="absolute inset-x-5 top-7 flex items-center justify-between sm:inset-x-10 lg:inset-x-16">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B765B]">Guided Launch</div>
        <SceneNumber n="04" />
      </div>

      <div className="absolute left-[5%] top-[13%] max-w-[640px] sm:left-[7%] lg:top-[17%]">
        <div className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#9B866A]">Before Zapla</div>
        <h2 className="mt-4 text-[44px] leading-[0.95] tracking-[-0.055em] sm:text-[60px] lg:text-[70px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
          Your process already exists.<br />It is just scattered.
        </h2>
      </div>

      <motion.div className="absolute inset-0" style={{ opacity: messOpacity }}>
        <ProcessFragment progress={progress} startX={-150} startY={120} startRotate={-8} left="10%" top="58%">
          <div className="w-[250px] border-l-2 border-slate-900 bg-white/70 px-5 py-4 backdrop-blur-sm">
            <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-400">Website enquiry</div>
            <div className="mt-2 text-[13px] leading-[1.45] text-slate-800">Can I book Thursday morning?</div>
          </div>
        </ProcessFragment>
        <ProcessFragment progress={progress} startX={170} startY={-110} startRotate={7} left="34%" top="48%">
          <div className="flex w-[210px] items-center gap-3 border-y border-slate-300 bg-[#FAF8F3]/85 px-4 py-4">
            <PhoneMissed className="h-5 w-5 text-rose-500" />
            <div><div className="text-[9px] uppercase tracking-[0.14em] text-slate-400">Missed call</div><div className="mt-1 text-[12px] font-semibold">0412 884 103</div></div>
          </div>
        </ProcessFragment>
        <ProcessFragment progress={progress} startX={230} startY={130} startRotate={10} left="57%" top="58%">
          <div className="w-[220px] border-b border-slate-400 bg-[#F8F5EE]/90 px-4 py-4">
            <div className="text-[9px] uppercase tracking-[0.14em] text-slate-400">Calendar note</div>
            <div className="mt-2 text-[13px] font-semibold">Thu · 10:30 · Sarah?</div>
          </div>
        </ProcessFragment>
        <ProcessFragment progress={progress} startX={-110} startY={-150} startRotate={-6} left="73%" top="44%">
          <div className="w-[200px] bg-[#FFF3B0] px-5 py-5 shadow-[0_15px_40px_-28px_rgba(15,23,42,.4)]">
            <div className="text-[14px] font-semibold leading-[1.35]">Remember to follow up quote</div>
          </div>
        </ProcessFragment>
      </motion.div>

      <motion.div className="absolute bottom-[7%] left-[7%] right-[7%] top-[42%] border border-[#CFC5B5]" style={{ opacity: frameOpacity }}>
        <div className="absolute -top-6 left-0 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#8B765B]">Your customer journey · mapped and built</div>
        <div className="grid h-full grid-cols-3">
          {[
            ["CAPTURE", "Enquiry · call · form"],
            ["FOLLOW THROUGH", "Ownership · reply · booking"],
            ["COMPLETE", "Payment · review · return"],
          ].map(([title, copy], index) => (
            <div key={title} className={`flex flex-col justify-end p-5 sm:p-7 ${index ? "border-l border-[#D8D0C4]" : ""}`}>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8B765B]">{title}</div>
              <div className="mt-2 text-[13px] text-[#665B4D]">{copy}</div>
            </div>
          ))}
        </div>
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden>
          <motion.path d="M80 230 C220 110 300 335 430 215 S680 100 910 200" fill="none" stroke="#0EA5A9" strokeWidth="3" strokeLinecap="round" style={{ pathLength: routeLength }} />
          <motion.path d="M80 230 C220 110 300 335 430 215 S680 100 910 200" fill="none" stroke="rgba(14,165,169,.12)" strokeWidth="12" strokeLinecap="round" style={{ pathLength: routeLength }} />
        </svg>
      </motion.div>

      <motion.div className="absolute bottom-[4%] right-[7%] text-right" style={{ opacity: frameOpacity }}>
        <div className="text-[26px] leading-[1] tracking-[-0.04em] text-[#111318] sm:text-[34px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>Messy inputs. One operating flow.</div>
      </motion.div>
    </motion.div>
  );
}

function OutcomeRow({ issue, result, index, progress }: { issue: string; result: string; index: number; progress: MotionValue<number> }) {
  const threshold = 0.16 + index * 0.17;
  const beforeOpacity = useTransform(progress, [threshold - 0.08, threshold + 0.05], [1, 0.18]);
  const resultOpacity = useTransform(progress, [threshold, threshold + 0.1], [0, 1]);
  const resultX = useTransform(progress, [threshold, threshold + 0.1], [34, 0]);
  return (
    <div className="grid min-h-[94px] grid-cols-[1fr_auto] items-center gap-6 border-t border-white/12 py-5 sm:min-h-[116px] sm:grid-cols-2">
      <motion.div className="text-[24px] leading-none tracking-[-0.035em] text-white sm:text-[34px] lg:text-[42px]" style={{ fontFamily: DISPLAY, opacity: beforeOpacity }}>{issue}</motion.div>
      <motion.div className="text-right text-[18px] font-medium leading-none tracking-[-0.025em] text-cyan-200 sm:text-[28px] lg:text-[34px]" style={{ fontFamily: DISPLAY, opacity: resultOpacity, x: resultX }}>{result}</motion.div>
    </div>
  );
}

function OutcomesScene({ opacity, progress }: { opacity: MotionValue<number>; progress: MotionValue<number> }) {
  const scanX = useTransform(progress, [0, 0.88], ["5%", "94%"]);
  const ctaOpacity = useTransform(progress, [0.76, 0.95], [0, 1]);
  const rowsOpacity = useTransform(progress, [0.72, 0.94], [1, 0.18]);

  return (
    <motion.div className="absolute inset-0 overflow-hidden bg-[#070A0F] text-white" style={{ opacity }}>
      <div className="absolute inset-x-5 top-7 flex items-center justify-between sm:inset-x-10 lg:inset-x-16">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/75">Follow-through changes the ending</div>
        <SceneNumber n="05" dark />
      </div>

      <motion.div className="absolute left-[6%] right-[6%] top-[16%]" style={{ opacity: rowsOpacity }}>
        <h2 className="max-w-[880px] text-[46px] leading-[0.94] tracking-[-0.055em] sm:text-[64px] lg:text-[80px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
          Same moments.<br />Different ending.
        </h2>
        <div className="mt-10 border-b border-white/12">
          {OUTCOME_ROWS.map(([issue, result], index) => <OutcomeRow key={issue} issue={issue} result={result} index={index} progress={progress} />)}
        </div>
      </motion.div>

      <motion.div className="absolute bottom-0 top-0 w-px bg-cyan-300/70 shadow-[0_0_40px_rgba(103,232,249,.45)]" style={{ left: scanX }} />

      <motion.div className="absolute inset-x-[6%] top-[26%] z-30" style={{ opacity: ctaOpacity }}>
        <div className="max-w-[1040px] text-[54px] leading-[0.9] tracking-[-0.065em] text-white sm:text-[76px] lg:text-[104px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
          Make follow-through<br />part of the system.
        </div>
        <p className="mt-7 max-w-[590px] text-[15px] leading-[1.7] text-white/48 sm:text-[17px]">
          Bring the customer journey into one connected place, then let Zapla keep the important next steps moving.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 bg-white px-5 text-[13px] font-semibold text-[#111318]">Book a Call <ArrowRight className="h-4 w-4" /></a>
          <a href="/pricing" className="inline-flex h-[50px] items-center border border-white/20 px-5 text-[13px] font-semibold text-white/80">See plans and pricing</a>
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const v = clamp01(value);
    const nextScene = v < 0.2 ? 0 : v < 0.47 ? 1 : v < 0.64 ? 2 : v < 0.81 ? 3 : 4;
    setScene(nextScene);

    const lb = Math.min(3, Math.floor(clamp01(v / 0.2) * 4));
    setLeakBeat(lb);

    const productLocal = clamp01((v - 0.2) / 0.27);
    setProductScene(Math.min(3, Math.floor(Math.min(0.999, productLocal) * 4)));
  });

  const leakProgress = useTransform(scrollYProgress, [0, 0.2], [0, 1], { clamp: true });
  const connectedProgress = useTransform(scrollYProgress, [0.2, 0.47], [0, 1], { clamp: true });
  const teamProgress = useTransform(scrollYProgress, [0.47, 0.64], [0, 1], { clamp: true });
  const guidedProgress = useTransform(scrollYProgress, [0.64, 0.81], [0, 1], { clamp: true });
  const outcomesProgress = useTransform(scrollYProgress, [0.81, 1], [0, 1], { clamp: true });

  const o1 = useTransform(scrollYProgress, [0, 0.17, 0.215], [1, 1, 0], { clamp: true });
  const o2 = useTransform(scrollYProgress, [0.17, 0.22, 0.44, 0.49], [0, 1, 1, 0], { clamp: true });
  const o3 = useTransform(scrollYProgress, [0.44, 0.49, 0.61, 0.66], [0, 1, 1, 0], { clamp: true });
  const o4 = useTransform(scrollYProgress, [0.61, 0.66, 0.78, 0.83], [0, 1, 1, 0], { clamp: true });
  const o5 = useTransform(scrollYProgress, [0.78, 0.83, 1], [0, 1, 1], { clamp: true });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-[470vh] bg-[#080B10] sm:h-[440vh]">
      <div className="sticky top-[66px] h-[calc(100vh-66px)] min-h-[610px] overflow-hidden bg-[#080B10]">
        <RevenueLeakScene opacity={o1} progress={leakProgress} beat={leakBeat} />
        <ConnectedProductScene opacity={o2} progress={connectedProgress} sceneIndex={productScene} reduced={reduced} />
        <UnlimitedUsersScene opacity={o3} progress={teamProgress} reduced={reduced} />
        <GuidedLaunchScene opacity={o4} progress={guidedProgress} />
        <OutcomesScene opacity={o5} progress={outcomesProgress} />

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
