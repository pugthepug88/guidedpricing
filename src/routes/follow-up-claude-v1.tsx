import { createFileRoute } from "@tanstack/react-router";
import { DOMINO_POSTER_DATA_URI } from "../assets/dominoPosterData";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  Bell,
  CalendarCheck,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  FileText,
  Globe,
  Inbox,
  Mail,
  MessageSquare,
  Pause,
  PenLine,
  PhoneMissed,
  SlidersHorizontal,
  Snowflake,
  Sparkles,
  SquareKanban,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/follow-up-claude-v1")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Follow-Up Automation for Service Businesses | Zapla" },
      {
        name: "description",
        content:
          "Zapla replies to new enquiries straight away, chases quotes, confirms bookings and stops the moment a customer replies. Follow-up by SMS and email, built into your CRM.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: FollowUpClaudeV1Page,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";
const PETAL_PATH =
  "M80 14 C95 14 104 25 102 42 C100 58 92 70 80 82 C68 70 60 58 58 42 C56 25 65 14 80 14 Z";

// Soft autumn palette shared with the homepage, AI Receptionist and pricing pages.
const CORAL = "#E97D62";
const ROSE = "#C96C85";
const AMBER = "#DDA34B";
const SAGE = "#99A36D";
const PLUM = "#9B86B8";
const APRICOT = "#D58C75";
const PETAL_COLORS = [CORAL, ROSE, AMBER, SAGE, PLUM, APRICOT] as const;

// Pulled from the Follow-Through and Growth plans on /Pricing-v3. Update both together.
const PLAN_PRICE = "A$399";
const LAUNCH_PRICE = "from A$1,997 + GST";
const GROWTH_PRICE = "A$699/mo + GST";

const KEYFRAMES = `
@keyframes zfu-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes zfu-typing { 0%, 60%, 100% { transform: translateY(0); opacity: .35; } 30% { transform: translateY(-3px); opacity: 1; } }
@keyframes zfu-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
@media (prefers-reduced-motion: reduce) { .zfu-motion { animation: none !important; } }
`;

const HERO_POINTS = ["Instant first reply", "Stops when they reply", "Set up with you"] as const;

const INDUSTRIES = [
  "Physio clinics",
  "Plumbers",
  "Dental practices",
  "Salons",
  "HVAC",
  "Mechanics",
  "Med spas",
  "Personal trainers",
  "Photographers",
  "Builders",
  "Real estate",
  "Mortgage brokers",
] as const;

type Channel = "SMS" | "Email";

type Moment = {
  key: string;
  label: string;
  line: string;
  headline: string;
  context: string;
  color: string;
  ink: string;
  tint: string;
  plan?: string;
  steps: { when: string; channel: Channel; text: string }[];
  outcome: { title: string; note: string };
};

const MOMENTS: Moment[] = [
  {
    key: "enquiry",
    label: "New enquiries",
    line: "Reply while they’re still looking.",
    headline: "Answer while the enquiry is still warm.",
    context: "Northside Physio · Website enquiry",
    color: CORAL,
    ink: "#B4523A",
    tint: "#FBEDE8",
    steps: [
      {
        when: "Instantly",
        channel: "SMS",
        text: "Hi Sarah, thanks for reaching out to Northside Physio. I can fit you in Tuesday 10:30am or Thursday 2pm. Would either work?",
      },
      {
        when: "After 1 hour",
        channel: "Email",
        text: "Here’s what to expect at your first visit, plus a link to book a time that suits you.",
      },
      {
        when: "Next day",
        channel: "SMS",
        text: "Just checking you saw this, Sarah. Happy to hold Tuesday 10:30am for you.",
      },
    ],
    outcome: {
      title: "Sarah replied and booked Tuesday 10:30am.",
      note: "The rest of the sequence stopped on its own.",
    },
  },
  {
    key: "quote",
    label: "Quotes",
    line: "Silence is not a no.",
    headline: "Keep the quote alive until they decide.",
    context: "Harbour Plumbing · Quote #1042",
    color: AMBER,
    ink: "#94661C",
    tint: "#FBF3E4",
    steps: [
      {
        when: "Day 0",
        channel: "Email",
        text: "Here’s your quote for the hot water system replacement. Any questions, just reply to this email.",
      },
      {
        when: "Day 2",
        channel: "SMS",
        text: "Hi Tom, did the quote make sense? Happy to talk through the options.",
      },
      {
        when: "Day 5",
        channel: "SMS",
        text: "We have an install slot next Wednesday if you’d like to lock it in.",
      },
    ],
    outcome: {
      title: "Tom accepted the quote.",
      note: "The job moved to Won in your pipeline.",
    },
  },
  {
    key: "booking",
    label: "Bookings",
    line: "Booked is not the same as arrived.",
    headline: "Get them from booked to through the door.",
    context: "Glow Skin Studio · Facial, Thursday 2pm",
    color: SAGE,
    ink: "#66704A",
    tint: "#F0F2E7",
    steps: [
      {
        when: "On booking",
        channel: "SMS",
        text: "You’re booked for Thursday at 2pm. Reply C to confirm.",
      },
      {
        when: "Day before",
        channel: "SMS",
        text: "See you tomorrow at 2pm. Need to move it? Pick a new time here.",
      },
      {
        when: "If missed",
        channel: "SMS",
        text: "Sorry we missed you today, Emma. Want to grab another time this week?",
      },
    ],
    outcome: {
      title: "Emma confirmed Thursday 2pm.",
      note: "Missed visits get a rebook message automatically.",
    },
  },
  {
    key: "reactivation",
    label: "Past customers",
    line: "Your next job is already in your database.",
    headline: "Bring the right customers back at the right time.",
    context: "Bayside Dental · Last visit 8 months ago",
    color: PLUM,
    ink: "#6E5C8E",
    tint: "#F2EFF7",
    plan: "Growth",
    steps: [
      {
        when: "6 months on",
        channel: "SMS",
        text: "Hi Priya, you’re due for your check-up. I have Monday 9am or Wednesday 3:30pm.",
      },
      {
        when: "1 week later",
        channel: "Email",
        text: "A quick reminder that your six-monthly check-up is due. Book online whenever suits you.",
      },
    ],
    outcome: {
      title: "Priya booked Wednesday 3:30pm.",
      note: "Back on the calendar without anyone chasing.",
    },
  },
];

const FAQS = [
  {
    q: "Can Zapla follow up by SMS and email?",
    a: "Yes. Follow-up can run across SMS and email, and every message is kept against the customer record so your team can see exactly what has been sent.",
  },
  {
    q: "What happens when a customer replies?",
    a: "The automated sequence stops. Depending on the rules you set, the reply can move the opportunity forward, book the next step or go straight to the right person on your team.",
  },
  {
    q: "Will the messages sound like us?",
    a: "They should. You approve the wording, timing and channels before anything goes live, and you can change them whenever you like.",
  },
  {
    q: "Is follow-up only for new leads?",
    a: "No. It also covers quotes, bookings, reminders and missed appointments. Campaigns that bring past customers back are part of the Growth plan.",
  },
  {
    q: "Which plan includes follow-up?",
    a: `Lead follow-up, quote chasing and appointment recovery are included in Follow-Through, from ${PLAN_PRICE} per month plus GST, and in Growth. Growth adds reactivation, repeat and recall campaigns for past customers.`,
  },
  {
    q: "Do we have to set it up ourselves?",
    a: "No. Your Guided Launch includes up to 3 agreed follow-up automations, built and tested with you before go-live.",
  },
] as const;

function FollowUpClaudeV1Page() {
  return (
    <main
      className="min-h-screen overflow-x-clip bg-white text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <style>{KEYFRAMES}</style>
      <Hero />
      <QuietLeak />
      <Moments />
      <KnowsWhenToStop />
      <Connected />
      <SetupAndPricing />
      <Faq />
      <FinalCta />
      <StickyMobileCta />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Shared pieces                                                      */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = !!useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({
  children,
  onDark = false,
  className = "",
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${onDark ? "text-[#DDA34B]" : "text-[#B35C43]"} ${className}`}
    >
      {children}
    </p>
  );
}

function PrimaryCta({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  return (
    <a
      href={BOOK_URL}
      className={`group inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-[14px] font-semibold transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transform-none ${className} ${
        onDark
          ? "bg-[#F7F4EE] text-[#1E2B29] hover:bg-white focus-visible:outline-[#DDA34B]"
          : "bg-[#1E2B29] text-[#F7F4EE] shadow-[0_12px_28px_-12px_rgba(30,43,41,.6)] hover:shadow-[0_18px_36px_-14px_rgba(30,43,41,.65)] focus-visible:outline-[#C96F55]"
      }`}
    >
      Book a Call
      <ArrowRight
        size={16}
        className="transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transform-none"
      />
    </a>
  );
}

function SecondaryCta({
  href,
  children,
  icon,
  onDark = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex h-[52px] items-center justify-center gap-2 rounded-full border px-7 text-[14px] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${className} ${
        onDark
          ? "border-white/20 text-[#F7F4EE] hover:border-white/40 focus-visible:outline-[#DDA34B]"
          : "border-[#E2DBD1] bg-white text-[#111318] hover:border-[#CFC6BA] focus-visible:outline-[#C96F55]"
      }`}
    >
      {children}
      {icon}
    </a>
  );
}

function ZaplaPetal({
  size = 24,
  core = "#111214",
  bloom = false,
}: {
  size?: number;
  core?: string;
  bloom?: boolean;
}) {
  const reduced = !!useReducedMotion();
  const animated = bloom && !reduced;
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      aria-hidden="true"
      className="block shrink-0 overflow-visible"
      initial={animated ? { rotate: -50, scale: 0.7 } : false}
      whileInView={animated ? { rotate: 0, scale: 1 } : undefined}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      {PETAL_COLORS.map((color, index) => (
        <g key={color} transform={`rotate(${index * 60} 80 80)`}>
          <motion.path
            d={PETAL_PATH}
            fill={color}
            initial={animated ? { opacity: 0 } : false}
            whileInView={animated ? { opacity: 1 } : undefined}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, delay: 0.1 + index * 0.08, ease: EASE }}
          />
        </g>
      ))}
      <circle cx="80" cy="80" r="14" fill={core} />
    </motion.svg>
  );
}

function Portrait({
  size,
  cell,
  ring = "ring-white",
  className = "",
}: {
  size: number;
  cell: number;
  ring?: string;
  className?: string;
}) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);
  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 overflow-hidden rounded-full bg-[#E8DCCB] ring-2 ${ring} ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition: `${(column / 5) * 100}% ${(row / 3) * 100}%`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
      }}
    />
  );
}

function CardLabel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#77726B]">
      {icon}
      {children}
    </div>
  );
}

function ChannelIcon({ channel, color = "#1E2B29" }: { channel: Channel; color?: string }) {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7F4EE]"
      style={{ color }}
    >
      {channel === "SMS" ? <MessageSquare size={14} /> : <Mail size={14} />}
    </span>
  );
}

type Status = "sent" | "sending" | "queued" | "scheduled" | "cancelled" | "paused";

const STATUS: Record<Status, { label: string; className: string }> = {
  sent: { label: "Sent", className: "bg-[#EEF1E4] text-[#4F5838]" },
  sending: { label: "Sending", className: "bg-[#FBF1DE] text-[#8A5F1A]" },
  queued: { label: "Queued", className: "bg-[#F4F1EC] text-[#6A665F]" },
  scheduled: { label: "Scheduled", className: "bg-[#F4F1EC] text-[#6A665F]" },
  cancelled: { label: "Not needed", className: "bg-[#F4F1EC] text-[#6A665F]" },
  paused: { label: "Paused", className: "bg-[#F8E9EE] text-[#9E4F66]" },
};

function StatusPill({ state }: { state: Status }) {
  const status = STATUS[state];
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={state}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.22, ease: EASE }}
        className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${status.className}`}
      >
        {state === "sent" && <Check size={10} strokeWidth={3} />}
        {state === "sending" && (
          <span
            className="zfu-motion h-1.5 w-1.5 rounded-full bg-[#DDA34B]"
            style={{ animation: "zfu-pulse 1s ease-in-out infinite" }}
          />
        )}
        {state === "paused" && <Pause size={9} strokeWidth={3} />}
        {status.label}
      </motion.span>
    </AnimatePresence>
  );
}

function TypingDots({ color = "#1E2B29" }: { color?: string }) {
  return (
    <span className="flex items-center gap-1">
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className="zfu-motion h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: color,
            animation: `zfu-typing 1.1s ${dot * 0.15}s ease-in-out infinite`,
          }}
        />
      ))}
    </span>
  );
}

// Steps through a timeline on a loop while the element is on screen.
// Reduced motion users get the finished state straight away.
function useLoopedSequence(
  ref: RefObject<Element | null>,
  timeline: readonly number[],
  loopMs: number,
) {
  const reduced = !!useReducedMotion();
  const inView = useInView(ref, { amount: 0.35 });
  const [step, setStep] = useState(0);
  const last = timeline.length - 1;

  useEffect(() => {
    if (reduced) {
      setStep(last);
      return;
    }
    if (!inView) return;

    let timers: number[] = [];
    const run = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];
      setStep(0);
      timeline.forEach((at, index) => {
        if (index > 0) timers.push(window.setTimeout(() => setStep(index), at));
      });
      timers.push(window.setTimeout(run, loopMs));
    };
    run();

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [inView, reduced, last, loopMs, timeline]);

  return step;
}

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const reduced = !!useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease: EASE },
  });

  return (
    <section className="relative overflow-hidden bg-white px-5 pb-16 pt-[118px] sm:px-10 sm:pb-20 sm:pt-[134px] lg:px-16 lg:pt-[150px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(55%_60%_at_50%_0%,rgba(221,163,75,.11),transparent_72%)]"
      />
      <div className="relative mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[960px] text-center">
          <motion.div
            {...enter(0)}
            className="inline-flex items-center gap-2 rounded-full border border-[#ECE6DD] bg-white/80 py-1.5 pl-1.5 pr-4 text-[12.5px] font-semibold text-[#3A3D39] shadow-[0_8px_24px_-14px_rgba(61,49,39,.35)] backdrop-blur"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#111214]">
              <ZaplaPetal size={16} />
            </span>
            Zapla Follow-Up
            <span className="h-3 w-px bg-[#E2DBD1]" />
            <span className="font-medium text-[#77726B]">SMS and email</span>
          </motion.div>

          <h1
            className="mt-7 text-[40px] font-medium leading-[1.02] tracking-[-0.045em] text-balance sm:text-[64px] lg:text-[80px]"
            style={{ fontFamily: DISPLAY }}
          >
            <motion.span {...enter(0.08)} className="block">
              A lead comes in.
            </motion.span>
            <motion.span {...enter(0.16)} className="block">
              Zapla follows up.
            </motion.span>
            <motion.span {...enter(0.24)} className="relative inline-block text-[#C96F55]">
              Nothing goes quiet.
              <HeroUnderline />
            </motion.span>
          </h1>

          <motion.p
            {...enter(0.34)}
            className="mx-auto mt-8 max-w-[620px] text-[16px] leading-[1.7] text-[#5F645F] sm:text-[18px]"
          >
            Zapla replies to new enquiries straight away, chases open quotes on schedule and keeps
            bookings confirmed by SMS and email. The moment a customer replies, it stops and hands
            the conversation to your team.
          </motion.p>

          <motion.div
            {...enter(0.42)}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <PrimaryCta className="w-full sm:w-auto" />
            <SecondaryCta
              href="#how-it-works"
              icon={<ArrowDown size={15} />}
              className="w-full sm:w-auto"
            >
              See how it works
            </SecondaryCta>
          </motion.div>

          <motion.ul
            {...enter(0.5)}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[12.5px] font-semibold text-[#4E534E]"
          >
            {HERO_POINTS.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#99A36D]/20 text-[#66704A]">
                  <Check size={11} strokeWidth={2.6} />
                </span>
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 36, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.45, ease: EASE }}
          className="mt-14 sm:mt-16 lg:mt-20"
        >
          <HeroStage />
        </motion.div>

        <IndustryMarquee />
      </div>
    </section>
  );
}

function HeroUnderline() {
  const reduced = !!useReducedMotion();
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 18"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-[0.16em] left-[2%] h-[0.2em] w-[96%] overflow-visible"
    >
      <motion.path
        d="M4 12 C 70 5, 150 4, 220 8 S 340 14, 396 6"
        fill="none"
        stroke={AMBER}
        strokeWidth="4.5"
        strokeLinecap="round"
        initial={reduced ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: reduced ? 0 : 1.1, delay: reduced ? 0 : 0.95, ease: EASE }}
      />
    </svg>
  );
}

const HERO_TIMELINE = [0, 700, 1700, 3400, 4500] as const;
const HERO_LOOP_MS = 10500;

function HeroStage() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useLoopedSequence(ref, HERO_TIMELINE, HERO_LOOP_MS);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[32px] border border-[#EFE9E0] bg-[linear-gradient(180deg,#FCF8F3_0%,#F8F3EC_100%)] px-4 py-8 sm:rounded-[40px] sm:px-8 sm:py-12 xl:min-h-[600px] xl:py-14"
    >
      <StageAtmosphere />

      <div className="relative z-10 mx-auto flex max-w-[420px] flex-col gap-4 lg:max-w-[740px] lg:flex-row lg:items-start lg:gap-5 xl:max-w-[408px] xl:flex-col">
        <div className="min-w-0 lg:flex-1">
          <ConversationCard step={step} />
        </div>
        <div className="lg:mt-12 lg:w-[300px] lg:shrink-0 xl:hidden">
          <SequenceCard step={step} />
        </div>
      </div>

      <FloatCard className="left-[5%] top-[14%] w-[236px]" delay={0}>
        <PipelineCard step={step} />
      </FloatCard>
      <FloatCard className="bottom-[14%] left-[8%] w-[214px]" delay={1.2}>
        <SpeedCard run={step >= 2} />
      </FloatCard>
      <FloatCard className="right-[4.5%] top-[11%] w-[272px]" delay={0.6}>
        <SequenceCard step={step} />
      </FloatCard>
      <FloatCard className="bottom-[13%] right-[7%] w-[256px]" delay={1.8}>
        <TeamCard booked={step >= 4} />
      </FloatCard>
    </div>
  );
}

function StageAtmosphere() {
  const reduced = !!useReducedMotion();
  const drift = (x: number, y: number, duration: number) =>
    reduced
      ? {}
      : {
          animate: { x: [0, x, 0], y: [0, y, 0] },
          transition: { duration, repeat: Infinity, ease: "easeInOut" as const },
        };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(rgba(120,100,80,.16)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent)]" />
      <motion.div
        {...drift(40, -20, 18)}
        className="absolute -left-24 top-1/3 h-[380px] w-[380px] rounded-full bg-[#E97D62]/[0.10] blur-[90px]"
      />
      <motion.div
        {...drift(-30, 30, 22)}
        className="absolute -right-20 -top-24 h-[420px] w-[420px] rounded-full bg-[#DDA34B]/[0.13] blur-[100px]"
      />
      <motion.div
        {...drift(24, -16, 26)}
        className="absolute -bottom-40 left-[calc(50%-260px)] h-[360px] w-[520px] rounded-full bg-[#99A36D]/[0.11] blur-[100px]"
      />
    </div>
  );
}

function FloatCard({
  className,
  delay,
  children,
}: {
  className: string;
  delay: number;
  children: ReactNode;
}) {
  const reduced = !!useReducedMotion();
  return (
    <motion.div
      className={`absolute z-20 hidden xl:block ${className}`}
      animate={reduced ? undefined : { y: [0, -7, 0] }}
      transition={reduced ? undefined : { duration: 7, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function FloatingShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[20px] border border-[#ECE6DD] bg-white/90 p-4 text-left shadow-[0_24px_50px_-28px_rgba(61,49,39,.45)] backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

function ConversationCard({ step }: { step: number }) {
  const reduced = !!useReducedMotion();
  const bubble = {
    initial: reduced ? false : { opacity: 0, y: 10, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, transition: { duration: 0.25 } },
    transition: { duration: 0.45, ease: EASE },
  };

  return (
    <div className="overflow-hidden rounded-[26px] border border-[#ECE6DD] bg-white text-left shadow-[0_1px_0_rgba(17,19,24,.03),0_30px_70px_-30px_rgba(61,49,39,.38)]">
      <div className="flex items-center justify-between gap-3 border-b border-[#F0EBE3] px-5 py-4">
        <div className="flex items-center gap-3">
          <Portrait size={38} cell={0} />
          <div>
            <div className="text-[14px] font-semibold tracking-[-0.01em] text-[#111318]">
              Sarah Mitchell
            </div>
            <div className="mt-0.5 text-[11.5px] text-[#77726B]">Website enquiry · SMS</div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F4EE] px-2.5 py-1 text-[10.5px] font-semibold text-[#4E534E]">
          <span
            className="zfu-motion h-1.5 w-1.5 rounded-full bg-[#99A36D]"
            style={{ animation: "zfu-pulse 2s ease-in-out infinite" }}
          />
          Live
        </span>
      </div>

      <div className="flex min-h-[376px] flex-col gap-3 px-4 py-5 sm:px-5">
        <AnimatePresence initial={false}>
          <motion.div key="enquiry" {...bubble} className="max-w-[86%]">
            <div className="mb-1.5 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#77726B]">
              <Globe size={11} />
              Website form · 10:04
            </div>
            <div className="rounded-[18px] rounded-tl-[6px] bg-[#F4F0EA] px-4 py-3 text-[13.5px] leading-[1.5] text-[#2A2D29]">
              Hi, do you have anything for a consultation next week?
            </div>
          </motion.div>

          {step === 1 && (
            <motion.div
              key="typing"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              className="ml-auto flex items-center gap-2"
            >
              <span className="rounded-full bg-[#F4F0EA] px-3.5 py-3">
                <TypingDots />
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111214]">
                <ZaplaPetal size={17} />
              </span>
            </motion.div>
          )}

          {step >= 2 && (
            <motion.div
              key="reply"
              {...bubble}
              className="ml-auto flex max-w-[90%] flex-col items-end"
            >
              <div className="rounded-[18px] rounded-tr-[6px] bg-[#1E2B29] px-4 py-3 text-[13.5px] leading-[1.5] text-[#F7F4EE] shadow-[0_12px_26px_-16px_rgba(30,43,41,.8)]">
                Hi Sarah, thanks for getting in touch! I can do Tuesday 10:30am or Thursday 2pm.
                Which suits you best?
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 text-[10.5px] font-semibold text-[#77726B]">
                <ZaplaPetal size={13} core="#FFFFFF" />
                Zapla · 10:04
              </div>
            </motion.div>
          )}

          {step >= 3 && (
            <motion.div key="sarah" {...bubble} className="max-w-[80%]">
              <div className="rounded-[18px] rounded-tl-[6px] bg-[#F4F0EA] px-4 py-3 text-[13.5px] leading-[1.5] text-[#2A2D29]">
                Tuesday works, thank you!
              </div>
              <div className="mt-1.5 text-[10.5px] font-semibold text-[#77726B]">Sarah · 10:12</div>
            </motion.div>
          )}

          {step >= 4 && (
            <motion.div
              key="booked"
              {...bubble}
              className="mt-1 flex flex-col items-center gap-1.5"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF1E4] px-3.5 py-1.5 text-[12px] font-semibold text-[#4F5838]">
                <CalendarCheck size={14} />
                Booked · Tuesday 10:30am
              </span>
              <span className="text-[11px] text-[#77726B]">
                Remaining follow-ups cancelled automatically
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const PIPELINE = [
  { label: "New enquiry", color: CORAL },
  { label: "Contacted", color: AMBER },
  { label: "Booked", color: SAGE },
] as const;

function PipelineCard({ step }: { step: number }) {
  const active = step < 2 ? 0 : step < 4 ? 1 : 2;
  return (
    <FloatingShell>
      <CardLabel icon={<SquareKanban size={12} />}>Pipeline</CardLabel>
      <div className="mt-3 space-y-1">
        {PIPELINE.map((stage, index) => {
          const isActive = index === active;
          const done = index < active;
          return (
            <div
              key={stage.label}
              className="relative flex items-center justify-between rounded-[12px] px-3 py-2.5"
            >
              {isActive && (
                <motion.span
                  layoutId="zfu-pipeline-active"
                  className="absolute inset-0 rounded-[12px] bg-[#F7F4EE]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className={`relative flex items-center gap-2.5 text-[13px] font-semibold ${isActive ? "text-[#111318]" : "text-[#77726B]"}`}
              >
                <span
                  className="h-2 w-2 rounded-full transition-colors duration-500"
                  style={{ backgroundColor: isActive || done ? stage.color : "#DDD6CC" }}
                />
                {stage.label}
              </span>
              {done && <Check size={13} strokeWidth={2.6} className="relative text-[#66704A]" />}
              {isActive && (
                <span className="relative text-[10.5px] font-semibold text-[#77726B]">Now</span>
              )}
            </div>
          );
        })}
      </div>
    </FloatingShell>
  );
}

function CountUp({ to, run }: { to: number; run: boolean }) {
  const reduced = !!useReducedMotion();
  const value = useMotionValue(0);
  const rounded = useTransform(value, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (!run) {
      value.set(0);
      return;
    }
    const controls = animate(value, to, { duration: reduced ? 0 : 0.9, ease: EASE });
    return () => controls.stop();
  }, [run, to, value, reduced]);

  return <motion.span>{rounded}</motion.span>;
}

function SpeedCard({ run }: { run: boolean }) {
  return (
    <FloatingShell>
      <CardLabel icon={<Clock size={12} />}>First reply</CardLabel>
      <div className="mt-2 flex items-baseline gap-1.5">
        {run ? (
          <>
            <span
              className="text-[40px] font-medium leading-none tracking-[-0.05em] text-[#111318]"
              style={{ fontFamily: DISPLAY }}
            >
              <CountUp to={38} run={run} />
            </span>
            <span className="text-[13px] font-semibold text-[#77726B]">seconds</span>
          </>
        ) : (
          <span className="flex h-10 items-center gap-2 text-[13px] font-semibold text-[#77726B]">
            <TypingDots color="#C96F55" />
            Replying
          </span>
        )}
      </div>
      <p className="mt-2 text-[11.5px] leading-[1.45] text-[#5F645F]">
        Sent while the enquiry is still warm.
      </p>
    </FloatingShell>
  );
}

function TeamCard({ booked }: { booked: boolean }) {
  return (
    <FloatingShell>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Portrait size={40} cell={7} />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C96C85] text-white ring-2 ring-white">
            <Bell size={8} strokeWidth={2.6} />
          </span>
        </div>
        <div className="min-w-0">
          <div className="text-[12.5px] font-semibold text-[#111318]">Jess · Front desk</div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={booked ? "booked" : "idle"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="mt-0.5 text-[11.5px] leading-[1.4] text-[#5F645F]"
            >
              {booked ? "New booking: Sarah, Tue 10:30am" : "Zapla is handling the follow-up"}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </FloatingShell>
  );
}

const HERO_SEQUENCE: { when: string; label: string; channel: Channel }[] = [
  { when: "Instantly", label: "SMS reply", channel: "SMS" },
  { when: "After 1 hour", label: "Email with details", channel: "Email" },
  { when: "Next day", label: "SMS nudge", channel: "SMS" },
  { when: "Day 3", label: "Final check-in", channel: "Email" },
];

function SequenceCard({ step }: { step: number }) {
  const replied = step >= 3;
  return (
    <FloatingShell>
      <div className="flex items-center justify-between">
        <CardLabel icon={<Sparkles size={12} />}>Follow-up sequence</CardLabel>
        <span className="text-[10.5px] font-semibold text-[#77726B]">4 steps</span>
      </div>
      <ol className="mt-3 space-y-1">
        {HERO_SEQUENCE.map((item, index) => {
          const state: Status =
            index === 0
              ? step >= 2
                ? "sent"
                : step === 1
                  ? "sending"
                  : "queued"
              : replied
                ? "cancelled"
                : "scheduled";
          const struck = state === "cancelled";
          return (
            <li key={item.label} className="flex items-center justify-between gap-3 py-1.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <ChannelIcon channel={item.channel} />
                <div className="min-w-0">
                  <div
                    className={`truncate text-[12.5px] font-semibold transition-colors duration-500 ${struck ? "text-[#A39E96] line-through decoration-[#CFC8BE]" : "text-[#111318]"}`}
                  >
                    {item.label}
                  </div>
                  <div className="text-[10.5px] text-[#77726B]">{item.when}</div>
                </div>
              </div>
              <StatusPill state={state} />
            </li>
          );
        })}
      </ol>
      <div
        className={`mt-3 flex items-center gap-2 rounded-[12px] px-3 py-2.5 text-[11.5px] font-semibold transition-colors duration-500 ${replied ? "bg-[#EEF1E4] text-[#4F5838]" : "bg-[#F7F4EE] text-[#5F645F]"}`}
      >
        {replied ? <Pause size={12} strokeWidth={2.6} /> : <Clock size={12} />}
        {replied ? "Sarah replied. Sequence stopped." : "Stops the moment they reply."}
      </div>
    </FloatingShell>
  );
}

function IndustryMarquee() {
  const row = [...INDUSTRIES, ...INDUSTRIES];
  return (
    <div className="mt-12 sm:mt-14">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#77726B]">
        Built for busy service businesses
      </p>
      <div className="relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="zapla-marquee zfu-motion flex w-max items-center gap-8 pr-8">
          {row.map((item, index) => (
            <span
              key={`${item}-${index}`}
              aria-hidden={index >= INDUSTRIES.length}
              className="flex items-center gap-8 whitespace-nowrap text-[15px] font-semibold tracking-[-0.01em] text-[#8A857E]"
            >
              {item}
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: PETAL_COLORS[index % PETAL_COLORS.length] }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The quiet leak                                                     */
/* ------------------------------------------------------------------ */

const LEAKS = [
  { word: "Waiting.", copy: "New enquiries sit until someone is free to reply.", color: CORAL },
  { word: "Stale.", copy: "Sent quotes go unanswered and get read as a no.", color: AMBER },
  { word: "Forgotten.", copy: "Past customers never get asked to come back.", color: PLUM },
] as const;

function QuietLeak() {
  return (
    <section className="bg-white px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-16">
          <Reveal>
            <Eyebrow>The quiet leak</Eyebrow>
            <h2
              className="mt-4 text-[38px] font-medium leading-[1.02] tracking-[-0.04em] text-balance sm:text-[54px] lg:text-[64px]"
              style={{ fontFamily: DISPLAY }}
            >
              Most leads don’t say no.
              <span className="block text-[#C96F55]">They just go quiet.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[440px] text-[16px] leading-[1.7] text-[#5F645F] lg:pb-2">
              Follow-up rarely fails in one big moment. It fades while the next step sits in
              someone’s head, between jobs, calls and everything else on the list.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-12 sm:mt-14">
          <CoolingChart />
        </Reveal>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {LEAKS.map((leak, index) => (
            <Reveal key={leak.word} delay={index * 0.06}>
              <div className="h-full rounded-[22px] bg-[#FAF8F4] p-6">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: leak.color }} />
                  <span
                    className="text-[22px] font-medium tracking-[-0.04em] text-[#111318]"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {leak.word}
                  </span>
                </div>
                <p className="mt-2.5 text-[14px] leading-[1.6] text-[#5F645F]">{leak.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const TICKS = [
  { at: 0.04, short: "Now", long: "Now" },
  { at: 0.27, short: "1h", long: "1 hour" },
  { at: 0.5, short: "Day 1", long: "Next day" },
  { at: 0.73, short: "Day 3", long: "Day 3" },
  { at: 1, short: "Day 7", long: "Day 7" },
] as const;

type Pip = { at: number; label: string; color: string; hollow?: boolean };

const MEMORY_PIPS: Pip[] = [
  { at: 0.04, label: "Enquiry lands", color: CORAL },
  { at: 0.27, label: "No reply yet", color: "#D9B3A5", hollow: true },
  { at: 0.5, label: "Still waiting", color: "#D3C9C0", hollow: true },
  { at: 0.73, label: "Late reply", color: "#C9C5BF" },
];

const ZAPLA_PIPS: Pip[] = [
  { at: 0.04, label: "Instant reply", color: CORAL },
  { at: 0.27, label: "Details emailed", color: "#E38F57" },
  { at: 0.5, label: "Friendly nudge", color: AMBER },
  { at: 0.73, label: "Sarah replies", color: "#B6AD5E" },
];

function CoolingChart() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const fill = useTransform(smooth, [0.02, 0.92], reduced ? [1, 1] : [0, 1]);

  return (
    <div
      ref={ref}
      className="relative rounded-[28px] border border-[#ECE6DD] bg-white p-5 shadow-[0_30px_80px_-50px_rgba(61,49,39,.45)] sm:p-8 lg:p-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77726B]">
          One enquiry. Two outcomes.
        </div>
        <div className="flex items-center gap-2 text-[11.5px] font-semibold text-[#77726B]">
          Warm
          <span className="h-1.5 w-16 rounded-full bg-[linear-gradient(90deg,#E97D62,#D3D0CB)]" />
          Cold
        </div>
      </div>

      <div className="mt-8 grid gap-x-6 md:grid-cols-[168px_1fr_132px]">
        <div className="hidden md:block" />
        <div className="relative h-5">
          {TICKS.map((tick) => (
            <span
              key={tick.long}
              className={`absolute top-0 whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#77726B] ${
                tick.at === 1 ? "-translate-x-full" : tick.at < 0.1 ? "" : "-translate-x-1/2"
              }`}
              style={{ left: `${tick.at * 100}%` }}
            >
              <span className="sm:hidden">{tick.short}</span>
              <span className="hidden sm:inline">{tick.long}</span>
            </span>
          ))}
        </div>
        <div className="hidden md:block" />
      </div>

      <div className="mt-4 space-y-7 sm:space-y-6">
        <CoolingRow
          title="Left to memory"
          subtitle="Depends on someone being free"
          gradient="linear-gradient(90deg,#E97D62 0%,#E3A08C 20%,#D8C3B6 45%,#D3D0CB 70%,#DAD8D4 100%)"
          pips={MEMORY_PIPS}
          fill={fill}
          end={
            <span className="bg-[#F1F1EF] text-[#5E6168]">
              <Snowflake size={13} />
              Gone quiet
            </span>
          }
        />
        <CoolingRow
          title="With Zapla"
          subtitle="Every step happens on time"
          gradient="linear-gradient(90deg,#E97D62 0%,#DDA34B 50%,#B6AD5E 76%,#99A36D 100%)"
          pips={ZAPLA_PIPS}
          fill={fill}
          petal
          end={
            <span className="bg-[#EEF1E4] text-[#4F5838]">
              <CalendarCheck size={13} />
              Booked
            </span>
          }
        />
      </div>
    </div>
  );
}

function CoolingRow({
  title,
  subtitle,
  gradient,
  pips,
  fill,
  end,
  petal = false,
}: {
  title: string;
  subtitle: string;
  gradient: string;
  pips: Pip[];
  fill: MotionValue<number>;
  end: ReactNode;
  petal?: boolean;
}) {
  const clipPath = useTransform(fill, (value) => `inset(0 ${(1 - value) * 100}% 0 0 round 999px)`);
  const endOpacity = useTransform(fill, [0.9, 1], [0, 1]);
  const endX = useTransform(fill, [0.9, 1], [-8, 0]);

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 md:grid-cols-[168px_1fr_132px] md:gap-y-3">
      <div className="order-1">
        <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111318]">
          {petal && <ZaplaPetal size={15} core="#FFFFFF" />}
          {title}
        </div>
        <div className="mt-0.5 text-[12px] text-[#77726B]">{subtitle}</div>
      </div>

      <div className="relative order-3 col-span-2 h-[34px] md:order-2 md:col-span-1 md:h-[40px] lg:h-[64px]">
        <div className="absolute inset-x-0 bottom-[14px] h-[8px] rounded-full bg-[#F2EEE8]" />
        <motion.div
          className="absolute inset-x-0 bottom-[14px] h-[8px] rounded-full"
          style={{ background: gradient, clipPath }}
        />
        {pips.map((pip) => (
          <ChartPip key={pip.label} pip={pip} fill={fill} />
        ))}
      </div>

      <motion.div
        style={{ opacity: endOpacity, x: endX }}
        className="order-2 md:order-3 [&>span]:inline-flex [&>span]:items-center [&>span]:gap-1.5 [&>span]:rounded-full [&>span]:px-3 [&>span]:py-1.5 [&>span]:text-[12px] [&>span]:font-semibold"
      >
        {end}
      </motion.div>
    </div>
  );
}

function ChartPip({ pip, fill }: { pip: Pip; fill: MotionValue<number> }) {
  const opacity = useTransform(fill, [pip.at - 0.05, pip.at], [0, 1]);
  const scale = useTransform(fill, [pip.at - 0.05, pip.at], [0.4, 1]);
  const align = pip.at < 0.1 ? "left-0" : "left-1/2 -translate-x-1/2";

  return (
    <motion.div
      className="absolute bottom-[18px] -translate-x-1/2 translate-y-1/2"
      style={{ left: `${pip.at * 100}%`, opacity }}
    >
      <motion.span
        style={{
          scale,
          backgroundColor: pip.hollow ? "#FFFFFF" : pip.color,
          borderColor: pip.color,
        }}
        className="block h-3.5 w-3.5 rounded-full border-2 shadow-[0_0_0_4px_#FFFFFF]"
      />
      <span
        className={`absolute bottom-[calc(100%+10px)] hidden whitespace-nowrap text-[11.5px] font-semibold text-[#4E534E] lg:block ${align}`}
      >
        {pip.label}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Four moments                                                       */
/* ------------------------------------------------------------------ */

const MOMENT_MS = 9000;

function Moments() {
  const reduced = !!useReducedMotion();
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [wide, setWide] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(panelRef, { amount: 0.35 });
  const moment = MOMENTS[index];

  // Auto-advance only on large screens, where the tabs and panel sit side by side.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const autoplay = auto && wide && !reduced;
  const playing = autoplay && inView && !paused;

  const select = (next: number, focus = false) => {
    setIndex(next);
    setAuto(false);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const count = MOMENTS.length;
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % count;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + count) % count;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = count - 1;
    if (next === null) return;
    event.preventDefault();
    select(next, true);
  };

  return (
    <section
      id="how-it-works"
      className="scroll-mt-16 bg-[#FAF8F4] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[380px_1fr] lg:gap-14">
        <div>
          <Reveal>
            <Eyebrow>Where follow-up wins</Eyebrow>
            <h2
              className="mt-4 text-[38px] font-medium leading-[1.02] tracking-[-0.04em] text-balance sm:text-[50px]"
              style={{ fontFamily: DISPLAY }}
            >
              Four moments where the job is won or lost.
            </h2>
            <p className="mt-5 max-w-[420px] text-[15px] leading-[1.7] text-[#5F645F] sm:text-[16px]">
              Pick a moment to see what Zapla sends, when it sends it, and when it stops.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              role="tablist"
              aria-label="Follow-up moments"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="mt-8 grid grid-cols-2 gap-2 lg:grid-cols-1"
            >
              {MOMENTS.map((item, itemIndex) => {
                const active = itemIndex === index;
                return (
                  <button
                    key={item.key}
                    ref={(element) => {
                      tabRefs.current[itemIndex] = element;
                    }}
                    type="button"
                    role="tab"
                    id={`zfu-tab-${item.key}`}
                    aria-selected={active}
                    aria-controls="zfu-moment-panel"
                    tabIndex={active ? 0 : -1}
                    onClick={() => select(itemIndex)}
                    className={`relative overflow-hidden rounded-[18px] border px-4 py-3.5 text-left transition-[background-color,border-color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96F55] lg:px-5 lg:py-4 ${
                      active
                        ? "border-[#E8E1D7] bg-white shadow-[0_18px_40px_-28px_rgba(61,49,39,.55)]"
                        : "border-transparent hover:bg-white/70"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[14px] font-semibold text-[#111318] sm:text-[15px]">
                        {item.label}
                      </span>
                      {item.plan && (
                        <span className="ml-auto hidden rounded-full bg-[#F2EFF7] px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#6E5C8E] sm:inline">
                          {item.plan}
                        </span>
                      )}
                    </span>
                    <span className="mt-1.5 hidden pl-5 text-[13px] leading-[1.5] text-[#5F645F] lg:block">
                      {item.line}
                    </span>
                    {active && autoplay && (
                      <span className="absolute inset-x-5 bottom-0 h-[2px] overflow-hidden rounded-full bg-[#EFE9E1]">
                        <span
                          key={index}
                          className="zfu-motion block h-full origin-left rounded-full"
                          style={{
                            backgroundColor: item.color,
                            animation: `zfu-progress ${MOMENT_MS}ms linear forwards`,
                            animationPlayState: playing ? "running" : "paused",
                          }}
                          onAnimationEnd={() =>
                            setIndex((current) => (current + 1) % MOMENTS.length)
                          }
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div
            ref={panelRef}
            id="zfu-moment-panel"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`zfu-tab-${moment.key}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="relative min-h-[640px] overflow-hidden rounded-[28px] border border-[#ECE6DD] bg-white p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C96F55] shadow-[0_40px_90px_-60px_rgba(61,49,39,.6)] sm:min-h-[600px] sm:p-8 lg:p-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-[300px] w-[300px] rounded-full blur-[70px] transition-colors duration-700"
              style={{ backgroundColor: moment.tint }}
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={moment.key}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
                className="relative"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11.5px] font-semibold"
                    style={{ backgroundColor: moment.tint, color: moment.ink }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: moment.color }}
                    />
                    {moment.label}
                    {moment.plan && <span className="opacity-80">· {moment.plan} plan</span>}
                  </span>
                  <span className="text-[12px] font-medium text-[#77726B]">
                    Example · {moment.context}
                  </span>
                </div>

                <h3
                  className="mt-5 max-w-[520px] text-[28px] font-medium leading-[1.05] tracking-[-0.04em] text-[#111318] sm:text-[34px]"
                  style={{ fontFamily: DISPLAY }}
                >
                  {moment.headline}
                </h3>

                <ol className="relative mt-8 space-y-4">
                  <span
                    aria-hidden="true"
                    className="absolute bottom-10 left-[15.5px] top-4 w-px bg-[#ECE6DD] sm:left-[123.5px]"
                  />
                  {moment.steps.map((item, stepIndex) => (
                    <motion.li
                      key={`${moment.key}-${item.when}`}
                      initial={reduced ? false : { opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: reduced ? 0 : 0.4,
                        delay: reduced ? 0 : 0.12 + stepIndex * 0.1,
                        ease: EASE,
                      }}
                      className="relative grid grid-cols-[32px_1fr] gap-3 sm:grid-cols-[96px_32px_1fr]"
                    >
                      <div className="hidden pt-2 text-right text-[11px] font-semibold uppercase tracking-[0.12em] text-[#77726B] sm:block">
                        {item.when}
                      </div>
                      <div className="relative flex justify-center pt-1">
                        <span
                          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] bg-white"
                          style={{ borderColor: moment.color, color: moment.ink }}
                        >
                          {item.channel === "SMS" ? (
                            <MessageSquare size={13} />
                          ) : (
                            <Mail size={13} />
                          )}
                        </span>
                      </div>
                      <div>
                        <div className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#77726B]">
                          <span className="sm:hidden">{item.when} · </span>
                          {item.channel}
                        </div>
                        <div className="rounded-[16px] rounded-tl-[6px] bg-[#F7F4EE] px-4 py-3 text-[14px] leading-[1.55] text-[#2A2D29]">
                          {item.text}
                        </div>
                      </div>
                    </motion.li>
                  ))}

                  <motion.li
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduced ? 0 : 0.45,
                      delay: reduced ? 0 : 0.18 + moment.steps.length * 0.1,
                      ease: EASE,
                    }}
                    className="relative grid grid-cols-[32px_1fr] gap-3 sm:grid-cols-[96px_32px_1fr]"
                  >
                    <div className="hidden pt-3 text-right text-[11px] font-semibold uppercase tracking-[0.12em] text-[#66704A] sm:block">
                      Outcome
                    </div>
                    <div className="relative flex justify-center pt-2">
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#99A36D] text-white">
                        <Check size={15} strokeWidth={2.6} />
                      </span>
                    </div>
                    <div className="rounded-[16px] bg-[#EEF1E4] px-4 py-3">
                      <div className="text-[14px] font-semibold text-[#2F3526]">
                        {moment.outcome.title}
                      </div>
                      <div className="mt-0.5 text-[12.5px] text-[#5B6348]">
                        {moment.outcome.note}
                      </div>
                    </div>
                  </motion.li>
                </ol>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Human control                                                      */
/* ------------------------------------------------------------------ */

const PRINCIPLES: { icon: LucideIcon; title: string; copy: string; color: string; tint: string }[] =
  [
    {
      icon: SlidersHorizontal,
      title: "Your rules",
      copy: "You decide what starts a follow-up, how often it runs and what stops it.",
      color: "#94661C",
      tint: "#FBF3E4",
    },
    {
      icon: PenLine,
      title: "Your voice",
      copy: "Messages are written for your business and approved by you before they go live.",
      color: "#9E4F66",
      tint: "#F8E9EE",
    },
    {
      icon: Users,
      title: "Your team",
      copy: "Replies that need a person go to the right person, with the full history attached.",
      color: "#66704A",
      tint: "#F0F2E7",
    },
  ];

function KnowsWhenToStop() {
  return (
    <section className="bg-white px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Human control</Eyebrow>
            <h2
              className="mt-4 text-[38px] font-medium leading-[1.02] tracking-[-0.04em] text-balance sm:text-[50px] lg:text-[56px]"
              style={{ fontFamily: DISPLAY }}
            >
              Automation that knows when to stop.
            </h2>
            <p className="mt-5 max-w-[480px] text-[15px] leading-[1.7] text-[#5F645F] sm:text-[16px]">
              Zapla handles the repetitive chasing. When a customer replies with something that
              needs judgement, the sequence stops and your team picks it up with the whole
              conversation in front of them.
            </p>
          </Reveal>

          <div className="mt-9 space-y-3">
            {PRINCIPLES.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <Reveal key={principle.title} delay={0.05 + index * 0.06}>
                  <div className="flex gap-4 rounded-[20px] border border-[#EEE8DF] bg-white p-5 transition-shadow duration-300 hover:shadow-[0_18px_40px_-30px_rgba(61,49,39,.5)]">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
                      style={{ backgroundColor: principle.tint, color: principle.color }}
                    >
                      <Icon size={17} />
                    </span>
                    <div>
                      <div className="text-[15px] font-semibold text-[#111318]">
                        {principle.title}
                      </div>
                      <p className="mt-1 text-[13.5px] leading-[1.6] text-[#5F645F]">
                        {principle.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.1}>
          <HandoffDemo />
        </Reveal>
      </div>
    </section>
  );
}

const HANDOFF_TIMELINE = [0, 1600, 3000, 4300, 5600] as const;
const HANDOFF_LOOP_MS = 11500;

function HandoffDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useLoopedSequence(ref, HANDOFF_TIMELINE, HANDOFF_LOOP_MS);
  const reduced = !!useReducedMotion();
  const paused = step >= 2;
  const enter = {
    initial: reduced ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, transition: { duration: 0.25 } },
    transition: { duration: 0.45, ease: EASE },
  };

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[32px] border border-[#EFE9E0] bg-[linear-gradient(180deg,#FCF8F3_0%,#F7F2EB_100%)] p-3 sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-10 h-[260px] w-[260px] rounded-full bg-[#C96C85]/[0.10] blur-[80px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-10 h-[260px] w-[260px] rounded-full bg-[#DDA34B]/[0.12] blur-[80px]"
      />

      <div className="relative min-h-[560px] rounded-[24px] border border-[#ECE6DD] bg-white p-4 shadow-[0_30px_70px_-40px_rgba(61,49,39,.5)] sm:min-h-[530px] sm:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-[#F0EBE3] pb-4">
          <div className="flex min-w-0 items-center gap-3">
            <Portrait size={40} cell={1} />
            <div className="min-w-0">
              <div className="text-[14px] font-semibold text-[#111318]">Tom Becker</div>
              <div className="truncate text-[11.5px] text-[#77726B]">
                Quote #1042 · Hot water system
              </div>
            </div>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={paused ? "paused" : "running"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: EASE }}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${
                paused ? "bg-[#F8E9EE] text-[#9E4F66]" : "bg-[#FBF1DE] text-[#8A5F1A]"
              }`}
            >
              {paused ? <Pause size={10} strokeWidth={3} /> : <Sparkles size={10} />}
              {paused ? "Sequence paused" : "Following up"}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="mt-4 space-y-2.5">
          <HandoffRow when="Day 0 · Email" label="Quote sent" channel="Email" state="sent" />
          <HandoffRow
            when="Day 2 · SMS"
            label="“Did the quote make sense?”"
            channel="SMS"
            state="sent"
          />

          <AnimatePresence initial={false}>
            {step >= 1 && (
              <motion.div key="tom" {...enter} className="py-1.5">
                <div className="flex items-end gap-2.5">
                  <Portrait size={26} cell={1} />
                  <div className="max-w-[82%] rounded-[18px] rounded-bl-[6px] bg-[#F4F0EA] px-4 py-3 text-[13.5px] leading-[1.5] text-[#2A2D29]">
                    Can you do it for less if we keep the old unit?
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {step >= 2 && (
                    <motion.span
                      key="needs-person"
                      {...enter}
                      className="ml-9 mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#F8E9EE] px-2.5 py-1 text-[10.5px] font-semibold text-[#9E4F66]"
                    >
                      <UserRound size={11} />
                      Needs a person
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <HandoffRow
            when="Day 5 · SMS"
            label="Install slot offer"
            channel="SMS"
            state={paused ? "paused" : "scheduled"}
          />
          <HandoffRow
            when="Day 9 · Email"
            label="Final check-in"
            channel="Email"
            state={paused ? "paused" : "scheduled"}
          />
        </div>

        <AnimatePresence initial={false}>
          {step >= 3 && (
            <motion.div
              key="handoff"
              {...enter}
              className="mt-4 flex items-center gap-3 rounded-[18px] bg-[#1E2B29] p-3.5 text-[#F7F4EE] sm:p-4"
            >
              <Portrait size={40} cell={3} ring="ring-[#1E2B29]" />
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold">Handed to Mark · Estimator</div>
                <div className="mt-0.5 text-[11.5px] text-white/65">
                  Full thread, quote and notes attached
                </div>
              </div>
              <ArrowRight size={16} className="shrink-0 text-[#DDA34B]" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {step >= 4 && (
            <motion.div
              key="typing"
              {...enter}
              className="mt-3 flex items-center justify-end gap-2 text-[11.5px] font-semibold text-[#77726B]"
            >
              Mark is replying
              <span className="rounded-full bg-[#F4F0EA] px-3 py-2.5">
                <TypingDots />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function HandoffRow({
  when,
  label,
  channel,
  state,
}: {
  when: string;
  label: string;
  channel: Channel;
  state: Status;
}) {
  const struck = state === "paused";
  return (
    <div className="flex items-center justify-between gap-3 rounded-[14px] border border-[#F0EBE3] px-3 py-2.5 sm:px-3.5">
      <div className="flex min-w-0 items-center gap-3">
        <ChannelIcon channel={channel} />
        <div className="min-w-0">
          <div
            className={`truncate text-[13px] font-semibold transition-colors duration-500 ${struck ? "text-[#A39E96] line-through decoration-[#D5CEC4]" : "text-[#111318]"}`}
          >
            {label}
          </div>
          <div className="text-[11px] text-[#77726B]">{when}</div>
        </div>
      </div>
      <StatusPill state={state} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Connected                                                          */
/* ------------------------------------------------------------------ */

type Node = { label: string; icon: LucideIcon; color: string };

const TRIGGERS: Node[] = [
  { label: "Website enquiry", icon: Globe, color: CORAL },
  { label: "Missed call", icon: PhoneMissed, color: ROSE },
  { label: "Quote sent", icon: FileText, color: AMBER },
  { label: "Booking made", icon: CalendarCheck, color: SAGE },
];

const DESTINATIONS: Node[] = [
  { label: "Customer record", icon: UserRound, color: APRICOT },
  { label: "Pipeline stage", icon: SquareKanban, color: AMBER },
  { label: "Calendar", icon: CalendarDays, color: SAGE },
  { label: "Team inbox", icon: Inbox, color: PLUM },
];

const ROW_Y = [55, 145, 235, 325] as const;

function Connected() {
  return (
    <section className="bg-white px-5 pb-24 sm:px-10 sm:pb-28 lg:px-16 lg:pb-32">
      <div className="mx-auto max-w-[1180px] border-t border-[#EFE9E0] pt-24 sm:pt-28 lg:pt-32">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <Eyebrow>Connected</Eyebrow>
          <h2
            className="mt-4 text-[38px] font-medium leading-[1.02] tracking-[-0.04em] text-balance sm:text-[50px] lg:text-[56px]"
            style={{ fontFamily: DISPLAY }}
          >
            Built into your CRM, not bolted on.
          </h2>
          <p className="mx-auto mt-5 max-w-[580px] text-[15px] leading-[1.7] text-[#5F645F] sm:text-[16px]">
            Follow-up starts from moments that already happen in Zapla, and everything it does lands
            back on the same customer record. No extra tools. No copy and paste.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <ConnectedDiagram />
          <ConnectedStack />
        </Reveal>
      </div>
    </section>
  );
}

function NodeChip({ node }: { node: Node }) {
  const Icon = node.icon;
  return (
    <div className="flex items-center gap-3 rounded-[16px] border border-[#ECE6DD] bg-white px-3.5 py-3 shadow-[0_14px_30px_-24px_rgba(61,49,39,.55)]">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
        style={{ backgroundColor: `${node.color}1F`, color: node.color }}
      >
        <Icon size={15} />
      </span>
      <span className="text-[13.5px] font-semibold text-[#111318]">{node.label}</span>
    </div>
  );
}

function ConnectedHub({ size = 150, petal = 70 }: { size?: number; petal?: number }) {
  const reduced = !!useReducedMotion();
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-[#DDA34B]/30"
          animate={{ scale: [1, 1.28], opacity: [0.5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className="absolute inset-0 rounded-full border border-[#ECE6DD] bg-white shadow-[0_24px_60px_-28px_rgba(61,49,39,.55)]" />
      <span className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle,#FBF4EA,transparent_70%)]" />
      <span className="relative">
        <ZaplaPetal size={petal} core="#FFFFFF" bloom />
      </span>
    </div>
  );
}

function ConnectedDiagram() {
  const reduced = !!useReducedMotion();
  const inbound = (y: number) => `M230 ${y} C 340 ${y}, 380 190, 480 190`;
  const outbound = (y: number) => `M520 190 C 620 190, 660 ${y}, 770 ${y}`;

  return (
    <div className="relative mx-auto hidden aspect-[1000/380] max-w-[1000px] lg:block">
      <svg
        viewBox="0 0 1000 380"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        {[
          ...TRIGGERS.map((node, i) => ({ node, d: inbound(ROW_Y[i]), i })),
          ...DESTINATIONS.map((node, i) => ({ node, d: outbound(ROW_Y[i]), i: i + 4 })),
        ].map(({ node, d, i }) => (
          <g key={`${node.label}-path`}>
            <path d={d} stroke="#EEE8DF" strokeWidth="2" />
            <motion.path
              d={d}
              stroke={node.color}
              strokeOpacity={0.55}
              strokeWidth="1.6"
              strokeLinecap="round"
              initial={reduced ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: reduced ? 0 : 0.9,
                delay: reduced ? 0 : 0.2 + i * 0.07,
                ease: EASE,
              }}
            />
            {!reduced && (
              <circle r="3.5" fill={node.color}>
                <animateMotion
                  dur="3.4s"
                  begin={`-${(i * 0.43).toFixed(2)}s`}
                  repeatCount="indefinite"
                  path={d}
                />
              </circle>
            )}
          </g>
        ))}
      </svg>

      {TRIGGERS.map((node, i) => (
        <div
          key={node.label}
          className="absolute left-0 w-[23%] -translate-y-1/2"
          style={{ top: `${(ROW_Y[i] / 380) * 100}%` }}
        >
          <NodeChip node={node} />
        </div>
      ))}

      {DESTINATIONS.map((node, i) => (
        <div
          key={node.label}
          className="absolute right-0 w-[23%] -translate-y-1/2"
          style={{ top: `${(ROW_Y[i] / 380) * 100}%` }}
        >
          <NodeChip node={node} />
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <ConnectedHub />
        <div className="absolute top-[calc(100%+14px)] whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77726B]">
          Zapla Follow-Up
        </div>
      </div>

      <div className="absolute -top-9 left-0 w-[23%] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77726B]">
        Starts from
      </div>
      <div className="absolute -top-9 right-0 w-[23%] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77726B]">
        Lands on
      </div>
    </div>
  );
}

function ConnectedStack() {
  return (
    <div className="mx-auto max-w-[560px] lg:hidden">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77726B]">
        Starts from
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {TRIGGERS.map((node) => (
          <NodeChip key={node.label} node={node} />
        ))}
      </div>
      <div className="my-6 flex flex-col items-center gap-3">
        <span className="h-8 w-px bg-[linear-gradient(180deg,transparent,#DDD6CC)]" />
        <ConnectedHub size={112} petal={52} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77726B]">
          Zapla Follow-Up
        </span>
        <span className="h-8 w-px bg-[linear-gradient(180deg,#DDD6CC,transparent)]" />
      </div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77726B]">
        Lands on
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {DESTINATIONS.map((node) => (
          <NodeChip key={node.label} node={node} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Setup and pricing                                                  */
/* ------------------------------------------------------------------ */

const SETUP_STEPS = [
  {
    n: "01",
    title: "Map your follow-up moments",
    copy: "We look at where enquiries, quotes and bookings stall in your business today.",
  },
  {
    n: "02",
    title: "Write it in your voice",
    copy: "Timing, wording and channels are agreed with you before anything sends.",
  },
  {
    n: "03",
    title: "Test and go live",
    copy: "We run real scenarios end to end before a single customer sees it.",
  },
] as const;

function SetupAndPricing() {
  return (
    <section className="bg-[#FAF8F4] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <Eyebrow>Guided Launch</Eyebrow>
          <h2
            className="mt-4 text-[38px] font-medium leading-[1.02] tracking-[-0.04em] text-balance sm:text-[50px] lg:text-[56px]"
            style={{ fontFamily: DISPLAY }}
          >
            We build it with you. You approve every word.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <div className="h-full rounded-[28px] border border-[#ECE6DD] bg-white p-6 sm:p-9">
              <ol className="space-y-7">
                {SETUP_STEPS.map((item, index) => (
                  <li key={item.n} className="relative grid grid-cols-[44px_1fr] gap-4">
                    {index < SETUP_STEPS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-[-22px] left-[21.5px] top-[50px] w-px bg-[#ECE6DD]"
                      />
                    )}
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E7D6CE] bg-[#FBF3EF] text-[12px] font-bold tracking-[0.08em] text-[#B35C43]">
                      {item.n}
                    </span>
                    <div className="pt-1">
                      <h3
                        className="text-[22px] font-medium tracking-[-0.035em] text-[#111318]"
                        style={{ fontFamily: DISPLAY }}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-1.5 max-w-[440px] text-[14px] leading-[1.65] text-[#5F645F]">
                        {item.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-9 flex items-start gap-3 rounded-[18px] bg-[#F7F4EE] p-4 text-[13.5px] leading-[1.6] text-[#4E534E]">
                <Sparkles size={16} className="mt-0.5 shrink-0 text-[#B35C43]" />
                Your Follow-Through Guided Launch includes up to 3 agreed follow-up automations,
                built and tested with you before go-live.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative h-full overflow-hidden rounded-[28px] bg-[#1E2B29] p-6 text-[#F7F4EE] sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-40 -right-36 opacity-[0.08]"
              >
                <ZaplaPetal size={300} core="#1E2B29" />
              </div>
              <div className="relative">
                <Eyebrow onDark>Included in Follow-Through</Eyebrow>
                <div className="mt-5 flex items-end gap-2">
                  <div
                    className="text-[60px] font-medium leading-none tracking-[-0.06em]"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {PLAN_PRICE}
                  </div>
                  <div className="pb-1.5 text-[13px] font-semibold text-white/64">/mo + GST</div>
                </div>
                <p className="mt-4 max-w-[400px] text-[14px] leading-[1.65] text-white/68">
                  Follow-up comes with the full Zapla platform: CRM, inbox, pipelines, calendars and
                  unlimited users.
                </p>

                <div className="mt-7 divide-y divide-white/10 border-y border-white/10">
                  <PriceLine label="Guided Launch" value={LAUNCH_PRICE} />
                  <PriceLine label="Built for you" value="Up to 3 automations, tested" />
                  <PriceLine label="Past customers" value={`Growth plan, ${GROWTH_PRICE}`} />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <PrimaryCta onDark />
                  <SecondaryCta href={PRICING_URL} onDark>
                    Compare plans
                  </SecondaryCta>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PriceLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 py-3.5 sm:grid-cols-[140px_1fr]">
      <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/62">
        {label}
      </div>
      <div className="text-[13.5px] font-semibold text-white/90">{value}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ and closing                                                    */
/* ------------------------------------------------------------------ */

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Questions</Eyebrow>
            <h2
              className="mt-4 text-[38px] font-medium leading-[1.02] tracking-[-0.04em] text-balance sm:text-[50px]"
              style={{ fontFamily: DISPLAY }}
            >
              The practical stuff.
            </h2>
            <p className="mt-5 max-w-[340px] text-[15px] leading-[1.7] text-[#5F645F]">
              Something else on your mind?{" "}
              <a
                href={BOOK_URL}
                className="font-semibold text-[#111318] underline decoration-[#DDA34B] decoration-2 underline-offset-4 hover:text-[#B35C43]"
              >
                Ask us on a call.
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="divide-y divide-[#ECE6DD] border-y border-[#ECE6DD]">
            {FAQS.map((item, index) => {
              const isOpen = open === index;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C96F55] sm:py-6"
                    aria-expanded={isOpen}
                    aria-controls={`zfu-faq-${index}`}
                  >
                    <span
                      className="text-[17px] font-semibold tracking-[-0.025em] text-[#111318] sm:text-[19px]"
                      style={{ fontFamily: DISPLAY }}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                        isOpen
                          ? "border-[#1E2B29] bg-[#1E2B29] text-white"
                          : "border-[#E2DBD1] text-[#5F645F]"
                      }`}
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div id={`zfu-faq-${index}`} role="region" className="overflow-hidden">
                      <p className="max-w-[640px] pb-6 pr-10 text-[14.5px] leading-[1.7] text-[#5F645F] sm:text-[15px]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const FOOTER_GROUPS = [
  {
    label: "Company",
    links: [
      ["Book a Call", "https://zapla.io/booking"],
      ["Pricing", "https://zapla.io/pricing"],
    ],
  },
  {
    label: "Resources",
    links: [
      ["Blog", "https://zapla.io/blog"],
      ["Request feature", "https://zapla.canny.io/feature-request"],
      ["Terms & conditions", "https://zapla.io/terms-and-conditions"],
      ["Privacy policy", "https://zapla.io/privacy-policy"],
      ["Refund policy", "https://zapla.io/refund-policy"],
      ["Contact us", "mailto:hello@zapla.io"],
    ],
  },
  {
    label: "Compare",
    links: [
      ["Zapla Vs Hubspot", "https://zapla.io/comparison/zapla-vs-hubspot"],
    ],
  },
] as const;

const FOOTER_SOCIALS = [
  {
    href: "https://facebook.com/",
    icon: "https://stcdn.leadconnectorhq.com/funnel/icons/dark/facebook-dark.svg",
    alt: "Facebook",
  },
  {
    href: "https://instagram.com/",
    icon: "https://stcdn.leadconnectorhq.com/funnel/icons/dark/instagram-dark.svg",
    alt: "Instagram",
  },
  {
    href: "https://linkedin.com/",
    icon: "https://stcdn.leadconnectorhq.com/funnel/icons/dark/linkedin-dark.svg",
    alt: "LinkedIn",
  },
  {
    href: "https://youtube.com/",
    icon: "https://stcdn.leadconnectorhq.com/funnel/icons/dark/youtube-dark.svg",
    alt: "YouTube",
  },
] as const;

function FooterLandscape() {
  const reduced = !!useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  const dominoVideo = "/concept/Zapla%20domino%20final.mp4";

  useEffect(() => {
    if (reduced) return;

    const startLoading = () => setShouldLoadVideo(true);
    const timer = window.setTimeout(startLoading, 700);
    const section = sectionRef.current;

    const observer =
      section && typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              if (!entry?.isIntersecting) return;
              startLoading();
              observer.disconnect();
            },
            { rootMargin: "4000px 0px" },
          )
        : null;

    if (section && observer) observer.observe(section);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [reduced]);

  useEffect(() => {
    if (!shouldLoadVideo || reduced) return;
    const video = videoRef.current;
    if (!video) return;

    video.preload = "auto";
    video.load();
  }, [shouldLoadVideo, reduced]);

  useEffect(() => {
    if (reduced) return;

    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") {
      setShouldPlayVideo(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldPlayVideo(true);
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!shouldPlayVideo || reduced) return;
    const video = videoRef.current;
    if (!video) return;

    void video.play().catch(() => undefined);
  }, [shouldPlayVideo, reduced]);

  return (
    <div ref={sectionRef} className="relative isolate overflow-hidden">
      <div
        className="relative min-h-[760px] bg-cover bg-[position:center_62%] sm:min-h-[840px] lg:min-h-[900px] xl:min-h-[940px]"
        style={{ backgroundImage: `url(${DOMINO_POSTER_DATA_URI})` }}
      >
        <video
          ref={videoRef}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover object-[center_62%] transition-opacity duration-200 ${videoReady ? "opacity-100" : "opacity-0"}`}
          muted
          playsInline
          preload={shouldLoadVideo ? "auto" : "none"}
          onCanPlay={() => {
            if (shouldPlayVideo && !reduced) {
              void videoRef.current?.play().catch(() => undefined);
            }
          }}
          onPlaying={() => setVideoReady(true)}
        >
          <source src={dominoVideo} type="video/mp4" />
        </video>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#FCFCFA] via-[#FCFCFA]/30 to-transparent sm:h-36"
        />

        <div className="absolute inset-x-0 bottom-0 z-20 px-4 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-[1240px] rounded-t-[34px] border border-b-0 border-white/75 bg-[#F8F5EF]/[0.97] p-7 pb-8 shadow-[0_-18px_70px_rgba(45,37,28,.16)] backdrop-blur-[12px] sm:p-9 sm:pb-10 lg:p-10 lg:pb-12">
            <div className="grid gap-9 lg:grid-cols-[1.15fr_.8fr_1.05fr_.7fr] lg:gap-10">
              <div>
                <a href="https://zapla.io/" className="inline-flex items-center">
                  <img src="/concept/zapla-logo-dark.svg" alt="Zapla" className="h-9 w-auto" />
                </a>

                <div className="mt-6 grid gap-3">
                  <a
                    href="https://www.trustpilot.com/review/zapla.io"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E2DBD1] bg-white/75 px-3.5 py-1.5 text-[13px] font-bold text-[#111318] transition-colors hover:border-[#2563FF]"
                  >
                    <span className="text-[#00b67a]">★</span>
                    Review us on Trustpilot
                  </a>
                  <a
                    href="https://www.g2.com/products/zapla-zapla/reviews/new"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E2DBD1] bg-white/75 px-3.5 py-1.5 text-[13px] font-bold text-[#111318] transition-colors hover:border-[#2563FF]"
                  >
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ff492c] text-[10px] font-black text-white">
                      G2
                    </span>
                    Review us on G2
                  </a>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  {FOOTER_SOCIALS.map((social) => (
                    <a
                      key={social.alt}
                      href={social.href}
                      aria-label={social.alt}
                      className="grid h-9 w-9 place-items-center rounded-full border border-[#E2DBD1] bg-white/80 transition-colors hover:border-[#2563FF]"
                    >
                      <img src={social.icon} alt="" className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              {FOOTER_GROUPS.map((group) => (
                <div key={group.label}>
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#20241F]">
                    {group.label}
                  </div>
                  <div className="mt-4 grid gap-2.5">
                    {group.links.map(([label, href]) => (
                      <a
                        key={label}
                        href={href}
                        className="text-[13px] font-medium text-[#676B65] transition-colors hover:text-[#2563FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563FF]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F8F5EF]"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 border-t border-[#DED8CF] pt-5 text-[12px] text-[#888C85]">
              © {new Date().getFullYear()} Zapla. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinalCta() {
  return (
    <section id="zfu-final-cta" className="overflow-hidden bg-[#FCFCFA] pt-24 sm:pt-28 lg:pt-32">
      <Reveal className="mx-auto max-w-[900px] px-5 text-center sm:px-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#111214] ring-1 ring-black/[0.06]">
          <ZaplaPetal size={34} bloom />
        </div>
        <Eyebrow className="mt-7">Keep the next step moving</Eyebrow>
        <h2
          className="mt-4 text-[42px] font-medium leading-[1.01] tracking-[-0.045em] text-balance text-[#111318] sm:text-[58px] lg:text-[68px]"
          style={{ fontFamily: DISPLAY }}
        >
          Stop relying on memory to make the next move.
        </h2>
        <p className="mx-auto mt-5 max-w-[650px] text-[15px] leading-[1.7] text-[#666B66] sm:text-[16px]">
          Book a call and we’ll map where follow-up is slipping, then show you what Zapla can automate and when.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryCta className="w-full sm:w-auto" />
          <SecondaryCta href={PRICING_URL} className="w-full sm:w-auto">
            View pricing
          </SecondaryCta>
        </div>
      </Reveal>

      <div className="mt-8 sm:mt-10">
        <FooterLandscape />
      </div>
    </section>
  );
}

function StickyMobileCta() {
  const [visible, setVisible] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const nearBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 360;
      setVisible(window.scrollY > 640 && !nearBottom);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const section = document.getElementById("zfu-final-cta");
    const observer =
      section && typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => setFinalVisible(Boolean(entry?.isIntersecting)), {
            threshold: 0.08,
          })
        : null;
    if (section && observer) observer.observe(section);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && !finalVisible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.06] bg-white/92 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden"
        >
          <a
            href={BOOK_URL}
            className="flex items-center justify-center gap-2 rounded-full bg-[#1E2B29] px-4 py-3 text-center text-[13.5px] font-semibold text-[#F7F4EE]"
          >
            Book a Call
            <ArrowRight size={15} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
