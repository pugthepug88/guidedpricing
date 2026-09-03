import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  MessageSquareText,
  RotateCcw,
  Star,
  UserRound,
} from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

const CORAL = "#E97D62";
const SAGE = "#99A36D";
const AMBER = "#DDA34B";

type StoryKey = "return" | "reactivate" | "reputation";
type IconKind = "calendar" | "message" | "return" | "star" | "check";

type Story = {
  key: StoryKey;
  number: string;
  label: string;
  title: string;
  description: string;
  accent: string;
  panel: string;
  panelDeep: string;
  customerStatus: string;
  note: string;
  steps: Array<{
    kicker: string;
    title: string;
    detail: string;
    icon: IconKind;
  }>;
};

const STORIES: Story[] = [
  {
    key: "return",
    number: "01",
    label: "Return",
    title: "Bring customers back at the right time.",
    description:
      "Zapla keeps track of when the next visit is due, sends the right reminder, and makes it easy to book again.",
    accent: CORAL,
    panel: "#F4DED7",
    panelDeep: "#EDC8BC",
    customerStatus: "Ready to return",
    note: "The relationship keeps moving without someone remembering to chase it.",
    steps: [
      { kicker: "Customer moment", title: "Next service due", detail: "8 months since last booking", icon: "calendar" },
      { kicker: "Zapla action", title: "Reminder sent", detail: "SMS · Today, 9:12 AM", icon: "message" },
      { kicker: "Business outcome", title: "Booked again", detail: "Thursday · 10:30 AM", icon: "return" },
    ],
  },
  {
    key: "reactivate",
    number: "02",
    label: "Reactivate",
    title: "Win back customers who go quiet.",
    description:
      "Find customers who have gone dormant, restart the conversation with a relevant message, and reopen the opportunity.",
    accent: SAGE,
    panel: "#E5E8D8",
    panelDeep: "#D3D9BC",
    customerStatus: "Re-engaged",
    note: "A quiet customer is not a lost customer until you stop following up.",
    steps: [
      { kicker: "Customer status", title: "Inactive · 120 days", detail: "No booking or reply", icon: "calendar" },
      { kicker: "Zapla action", title: "Re-engagement sent", detail: "Personalised SMS · 10:04 AM", icon: "message" },
      { kicker: "Customer response", title: "“Thursday works.”", detail: "Reply received · 10:11 AM", icon: "message" },
      { kicker: "Business outcome", title: "Opportunity reopened", detail: "Back in play", icon: "return" },
    ],
  },
  {
    key: "reputation",
    number: "03",
    label: "Reputation",
    title: "Turn great service into your next customer.",
    description:
      "Ask at the right moment, collect more 5-star reviews, and turn happy customers into the proof that wins the next one.",
    accent: AMBER,
    panel: "#F4E8C7",
    panelDeep: "#EAD6A2",
    customerStatus: "Promoter",
    note: "The job is finished. The value of a great experience does not have to be.",
    steps: [
      { kicker: "Customer moment", title: "Job completed", detail: "Marked complete · 4:48 PM", icon: "check" },
      { kicker: "Zapla action", title: "Review request sent", detail: "SMS · 5:03 PM", icon: "message" },
      { kicker: "Customer response", title: "★★★★★ Google review", detail: "“Made the whole process easy.”", icon: "star" },
      { kicker: "Business outcome", title: "More proof for the next buyer", detail: "Visible where prospects are choosing", icon: "return" },
    ],
  },
];

function StepIcon({ kind }: { kind: IconKind }) {
  const props = { size: 19, strokeWidth: 1.9 };
  if (kind === "calendar") return <CalendarCheck2 {...props} />;
  if (kind === "message") return <MessageSquareText {...props} />;
  if (kind === "star") return <Star {...props} fill="currentColor" />;
  if (kind === "check") return <CheckCircle2 {...props} />;
  return <RotateCcw {...props} />;
}

function PetalBadge({ story }: { story: Story }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="relative flex h-8 w-[54px] items-center" aria-hidden="true">
        {[0, 1, 2].map((item) => (
          <span
            key={item}
            className="absolute h-8 w-8 rounded-full border border-white/55"
            style={{ left: item * 11, backgroundColor: story.accent, opacity: 0.34 + item * 0.24 }}
          />
        ))}
      </span>
      <span
        className="rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#17191D]"
        style={{ backgroundColor: "rgba(255,255,255,.66)" }}
      >
        {story.label}
      </span>
    </div>
  );
}

function CustomerAvatar({ story, active }: { story: Story; active: boolean }) {
  const reactivate = story.key === "reactivate";
  return (
    <motion.div
      className="relative h-[74px] w-[74px] shrink-0 overflow-hidden rounded-full border border-black/[0.08] bg-white/45 shadow-[0_10px_30px_rgba(17,19,24,.08)]"
      initial={false}
      animate={{
        filter: reactivate ? (active ? "grayscale(0) saturate(1)" : "grayscale(1) saturate(.2)") : "grayscale(.06) saturate(.94)",
        opacity: reactivate && !active ? 0.72 : 1,
      }}
      transition={{ duration: 0.72, ease: EASE }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${PORTRAIT_SHEET})`,
          backgroundPosition: "0% 0%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "600% 400%",
        }}
      />
    </motion.div>
  );
}

function CustomerRecord({ story, active }: { story: Story; active: boolean }) {
  return (
    <div className="rounded-[16px] border border-black/[0.08] bg-white/80 p-5 shadow-[0_18px_50px_rgba(17,19,24,.06)] backdrop-blur-sm sm:p-6">
      <div className="flex items-center gap-4">
        <CustomerAvatar story={story} active={active} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-[20px] font-semibold tracking-[-0.025em] text-[#17191D]">Sarah Nguyen</div>
              <div className="mt-1 text-[11px] text-[#77736D]">Customer since February 2025</div>
            </div>
            <span
              className="rounded-full border px-3 py-1.5 text-[10px] font-semibold"
              style={{ borderColor: `${story.accent}66`, backgroundColor: `${story.accent}14`, color: "#343630" }}
            >
              {story.customerStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-black/[0.07] pt-4">
        {[
          ["Last booking", "12 Jan 2026"],
          ["Bookings", "4 completed"],
          ["Lifetime value", "$2,460"],
        ].map(([label, value]) => (
          <div key={label}>
            <div className="text-[8px] font-semibold uppercase tracking-[0.13em] text-[#99958D]">{label}</div>
            <div className="mt-1.5 text-[12px] font-semibold text-[#2B2D31] sm:text-[13px]">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Workflow({ story, active, reduced }: { story: Story; active: boolean; reduced: boolean }) {
  return (
    <div className="relative mt-5 space-y-2.5">
      {story.steps.map((step, index) => (
        <motion.div
          key={`${story.key}-${step.title}`}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={active || reduced ? { opacity: 1, y: 0 } : { opacity: 0.45, y: 10 }}
          transition={{ duration: reduced ? 0 : 0.48, delay: reduced ? 0 : 0.08 + index * 0.1, ease: EASE }}
          className="relative grid grid-cols-[42px_1fr_auto] items-center gap-3 rounded-[14px] border border-black/[0.075] bg-white/76 px-4 py-3.5 shadow-[0_10px_34px_rgba(17,19,24,.045)] backdrop-blur-sm sm:grid-cols-[44px_1fr_auto] sm:px-5 sm:py-4"
        >
          {index < story.steps.length - 1 && (
            <span className="absolute left-[36px] top-[57px] z-0 h-[16px] w-px bg-black/[0.12] sm:left-[42px] sm:top-[62px]" aria-hidden="true" />
          )}
          <span
            className="relative z-10 flex h-[42px] w-[42px] items-center justify-center rounded-[12px] border border-white/65"
            style={{ backgroundColor: `${story.accent}24`, color: story.accent }}
          >
            <StepIcon kind={step.icon} />
          </span>
          <div className="min-w-0">
            <div className="text-[8px] font-semibold uppercase tracking-[0.13em] text-[#8B877F]">{step.kicker}</div>
            <div className="mt-1 text-[14px] font-semibold tracking-[-0.015em] text-[#1B1D21] sm:text-[15px]">{step.title}</div>
            <div className="mt-0.5 text-[11px] leading-[1.45] text-[#6F6B65] sm:text-[12px]">{step.detail}</div>
          </div>
          {index === story.steps.length - 1 && (
            <span className="hidden h-8 w-8 items-center justify-center rounded-full bg-[#17191D] text-white sm:flex">
              <ArrowRight size={15} strokeWidth={2} />
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function StoryPanel({ story, index }: { story: Story; index: number }) {
  const reduced = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { amount: 0.42 });

  return (
    <div ref={ref} className="relative lg:h-[108vh]" style={{ zIndex: 20 + index }}>
      <motion.article
        initial={reduced ? false : { opacity: 0.96, y: 30, scale: 0.992 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: reduced ? 0 : 0.58, ease: EASE }}
        className="relative mb-6 overflow-hidden rounded-[24px] border border-black/[0.06] px-6 py-8 shadow-[0_24px_70px_rgba(17,19,24,.08)] sm:px-9 sm:py-10 lg:sticky lg:top-[84px] lg:mb-0 lg:min-h-[calc(100vh-112px)] lg:rounded-[28px] lg:px-12 lg:py-12 xl:px-14"
        style={{ backgroundColor: story.panel }}
      >
        <div
          className="pointer-events-none absolute -right-[8%] -top-[25%] h-[70%] w-[46%] rounded-full blur-[90px]"
          style={{ backgroundColor: story.panelDeep, opacity: 0.55 }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-[25%] left-[25%] h-[52%] w-[38%] rounded-full blur-[100px]"
          style={{ backgroundColor: "rgba(255,255,255,.52)" }}
          aria-hidden="true"
        />

        <div className="relative grid min-h-full gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:gap-12 xl:gap-16">
          <div className="max-w-[500px]">
            <div className="flex items-center justify-between gap-4">
              <PetalBadge story={story} />
              <span className="text-[11px] font-semibold tracking-[0.18em] text-black/35">{story.number} / 03</span>
            </div>

            <h3
              className="mt-9 max-w-[470px] text-[44px] font-medium leading-[0.96] tracking-[-0.055em] text-[#111318] sm:text-[55px] lg:text-[62px]"
              style={{ fontFamily: DISPLAY }}
            >
              {story.title}
            </h3>
            <p className="mt-6 max-w-[455px] text-[16px] leading-[1.65] text-[#55534F] sm:text-[17px]">{story.description}</p>

            <div className="mt-10 border-t border-black/[0.1] pt-5">
              <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/40">Why it matters</div>
              <p className="mt-2 max-w-[420px] text-[14px] font-medium leading-[1.55] text-[#282A2E]">{story.note}</p>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-8 rounded-full bg-white/24 blur-3xl" aria-hidden="true" />
            <div className="relative rounded-[20px] border border-black/[0.075] bg-white/38 p-4 shadow-[0_28px_80px_rgba(17,19,24,.07)] backdrop-blur-[2px] sm:p-5 lg:p-6">
              <div className="mb-4 flex items-center justify-between gap-3 px-1">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#716E68]">
                  <UserRound size={14} strokeWidth={1.9} /> Customer relationship
                </div>
                <div className="flex items-center gap-2 text-[10px] font-medium text-[#716E68]">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: story.accent }} /> Live in Zapla
                </div>
              </div>
              <CustomerRecord story={story} active={active} />
              <Workflow story={story} active={active} reduced={reduced} />
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ZaplaRepeatBusinessV6() {
  const reduced = !!useReducedMotion();

  return (
    <section className="relative bg-[#F8F6F1] px-5 pb-16 pt-24 text-[#111318] sm:px-10 sm:pb-20 sm:pt-28 lg:px-12 lg:pb-28 lg:pt-[132px]">
      <div className="mx-auto max-w-[1320px]">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduced ? 0 : 0.66, ease: EASE }}
          className="mb-14 grid gap-7 lg:mb-16 lg:grid-cols-[.9fr_1.1fr] lg:items-end lg:gap-16"
        >
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7A766F]">Repeat business</div>
            <h2
              className="mt-5 max-w-[650px] text-[48px] font-medium leading-[0.94] tracking-[-0.06em] sm:text-[64px] lg:text-[76px]"
              style={{ fontFamily: DISPLAY }}
            >
              Turn customers into repeat business.
            </h2>
          </div>
          <p className="max-w-[590px] text-[17px] leading-[1.68] text-[#69665F] sm:text-[18px] lg:pb-1">
            Bring customers back at the right time, re-engage the ones who go quiet, and turn great experiences into more 5-star reviews.
          </p>
        </motion.div>

        <div className="relative">
          {STORIES.map((story, index) => (
            <StoryPanel key={story.key} story={story} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
