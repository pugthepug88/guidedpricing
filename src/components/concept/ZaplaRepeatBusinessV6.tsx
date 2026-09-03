import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarCheck2, MessageSquareText, RotateCcw, Star, UserRound } from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

type StoryKey = "return" | "reactivate" | "reputation";

type Story = {
  key: StoryKey;
  label: string;
  title: string;
  description: string;
  status: string;
  accent: string;
  tint: string;
  steps: Array<{
    kicker: string;
    title: string;
    detail: string;
    icon: "calendar" | "message" | "return" | "star";
  }>;
};

const STORIES: Story[] = [
  {
    key: "return",
    label: "Return",
    title: "Bring them back at the right time.",
    description: "Zapla spots the next natural moment to follow up, sends the reminder, and makes the next booking easy.",
    status: "Returning customer",
    accent: "#B56F5B",
    tint: "#F5E9E3",
    steps: [
      { kicker: "Service cycle", title: "Next visit due", detail: "8 months since last booking", icon: "calendar" },
      { kicker: "Zapla action", title: "Reminder sent", detail: "SMS · Today, 9:12 AM", icon: "message" },
      { kicker: "Outcome", title: "Booked again", detail: "Thu · 10:30 AM", icon: "return" },
    ],
  },
  {
    key: "reactivate",
    label: "Reactivate",
    title: "Wake up customers who went quiet.",
    description: "Dormant customers do not have to stay dormant. Zapla can identify the gap, reach out, and reopen the conversation.",
    status: "Re-engaged",
    accent: "#8A6F87",
    tint: "#EEE8EE",
    steps: [
      { kicker: "Customer status", title: "Inactive · 120 days", detail: "No booking or reply", icon: "calendar" },
      { kicker: "Zapla action", title: "Win-back message sent", detail: "Personalised SMS · 10:04 AM", icon: "message" },
      { kicker: "Outcome", title: "Customer replied", detail: "Opportunity reopened", icon: "return" },
    ],
  },
  {
    key: "reputation",
    label: "Reputation",
    title: "Turn a great experience into proof.",
    description: "When the work is done, Zapla keeps the momentum going with a timely review request and a simple path to respond.",
    status: "Promoter",
    accent: "#A27E43",
    tint: "#F3EAD8",
    steps: [
      { kicker: "Customer moment", title: "Job completed", detail: "Marked complete · 4:48 PM", icon: "calendar" },
      { kicker: "Zapla action", title: "Review request sent", detail: "SMS · 5:03 PM", icon: "message" },
      { kicker: "Outcome", title: "★★★★★ Google review", detail: "“Made the whole process easy.”", icon: "star" },
    ],
  },
];

function CustomerAvatar({ active }: { active: StoryKey }) {
  const isReactivated = active === "reactivate";
  return (
    <motion.div
      className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-full border border-[#D9D7D1] bg-[#E7DDD2] shadow-[0_10px_30px_rgba(17,19,24,.08)]"
      animate={{ filter: isReactivated ? "grayscale(0) saturate(1)" : "grayscale(.08) saturate(.9)" }}
      transition={{ duration: 0.55, ease: EASE }}
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

function StepIcon({ kind, accent }: { kind: Story["steps"][number]["icon"]; accent: string }) {
  const props = { size: 18, strokeWidth: 1.9 };
  if (kind === "calendar") return <CalendarCheck2 {...props} />;
  if (kind === "message") return <MessageSquareText {...props} />;
  if (kind === "star") return <Star {...props} fill="currentColor" />;
  return <RotateCcw {...props} />;
}

function WorkflowStep({ step, index, story, reduced }: { step: Story["steps"][number]; index: number; story: Story; reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.48, delay: reduced ? 0 : 0.08 + index * 0.11, ease: EASE }}
      className="relative grid grid-cols-[42px_1fr] gap-4 rounded-[14px] border border-[#E5E2DB] bg-white px-4 py-4 sm:grid-cols-[46px_1fr] sm:px-5 sm:py-5"
    >
      {index < 2 && <div className="absolute left-[36px] top-[57px] h-[31px] w-px bg-[#DDD9D1] sm:left-[42px] sm:top-[62px] sm:h-[34px]" aria-hidden="true" />}
      <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px]" style={{ backgroundColor: story.tint, color: story.accent }}>
        <StepIcon kind={step.icon} accent={story.accent} />
      </div>
      <div className="min-w-0 pt-0.5">
        <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#98958E]">{step.kicker}</div>
        <div className="mt-1.5 text-[15px] font-semibold tracking-[-0.015em] text-[#17191D] sm:text-[16px]">{step.title}</div>
        <div className="mt-1 text-[12px] leading-[1.5] text-[#73716C] sm:text-[13px]">{step.detail}</div>
      </div>
    </motion.div>
  );
}

export default function ZaplaRepeatBusinessV6() {
  const reduced = !!useReducedMotion();
  const [active, setActive] = useState<StoryKey>("return");
  const story = STORIES.find((item) => item.key === active) ?? STORIES[0];

  return (
    <section className="relative overflow-hidden bg-[#F7F4EE] px-5 py-24 text-[#111318] sm:px-10 sm:py-28 lg:px-16 lg:py-[144px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-center gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-[86px]">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: reduced ? 0 : 0.68, ease: EASE }}
            className="max-w-[520px]"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#78736B]">Repeat business</div>
            <h2
              className="mt-5 text-[48px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[60px] lg:text-[70px]"
              style={{ fontFamily: DISPLAY }}
            >
              Turn customers into repeat business.
            </h2>
            <p className="mt-6 max-w-[490px] text-[17px] leading-[1.65] text-[#67645F] sm:text-[18px]">
              Bring customers back at the right time, re-engage the ones who go quiet, and turn great experiences into more 5-star reviews.
            </p>

            <div className="mt-9 flex flex-wrap gap-2" role="tablist" aria-label="Repeat business outcomes">
              {STORIES.map((item) => {
                const selected = item.key === active;
                return (
                  <button
                    key={item.key}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(item.key)}
                    className="relative rounded-full border px-4 py-2.5 text-[13px] font-semibold transition-colors duration-300"
                    style={{
                      borderColor: selected ? item.accent : "#DDD9D0",
                      backgroundColor: selected ? item.tint : "rgba(255,255,255,.45)",
                      color: selected ? "#17191D" : "#77736C",
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={story.key}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: reduced ? 0 : 0.32, ease: EASE }}
                className="mt-8 border-l-2 pl-4"
                style={{ borderColor: story.accent }}
              >
                <div className="text-[18px] font-semibold tracking-[-0.025em] text-[#222429]">{story.title}</div>
                <p className="mt-2 max-w-[470px] text-[14px] leading-[1.62] text-[#77736E]">{story.description}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduced ? 0 : 0.72, delay: reduced ? 0 : 0.08, ease: EASE }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-12 rounded-full bg-[#EEE8DD]/55 blur-3xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[18px] border border-[#DDD9D0] bg-[#FBFAF7] shadow-[0_26px_80px_rgba(17,19,24,.08)]">
              <div className="flex items-center justify-between border-b border-[#E5E1D9] px-5 py-4 sm:px-7">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#8C8881]">
                  <UserRound size={15} strokeWidth={1.9} /> Customer relationship
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-[#8A867F]">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: story.accent }} />
                  Live in Zapla
                </div>
              </div>

              <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[.9fr_1.1fr] lg:gap-8 lg:p-8">
                <div className="rounded-[16px] border border-[#E5E2DB] bg-white p-5 sm:p-6">
                  <div className="flex items-center gap-4">
                    <CustomerAvatar active={active} />
                    <div className="min-w-0">
                      <div className="truncate text-[20px] font-semibold tracking-[-0.025em] text-[#17191D]">Sarah Nguyen</div>
                      <div className="mt-1 text-[12px] text-[#8A867F]">Customer since February 2025</div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-[#ECE9E3] pt-5">
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#A09C94]">Last booking</div>
                      <div className="mt-1.5 text-[13px] font-semibold text-[#292B30]">12 Jan 2026</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#A09C94]">Lifetime value</div>
                      <div className="mt-1.5 text-[13px] font-semibold text-[#292B30]">$2,460</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#A09C94]">Bookings</div>
                      <div className="mt-1.5 text-[13px] font-semibold text-[#292B30]">4 completed</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#A09C94]">Status</div>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={story.status}
                          initial={reduced ? false : { opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduced ? undefined : { opacity: 0, y: -3 }}
                          transition={{ duration: reduced ? 0 : 0.25 }}
                          className="mt-1.5 text-[13px] font-semibold"
                          style={{ color: story.accent }}
                        >
                          {story.status}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[12px] border border-[#EBE7DF] bg-[#F8F6F1] px-4 py-3.5">
                    <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#A09C94]">Relationship note</div>
                    <div className="mt-2 text-[12px] leading-[1.55] text-[#5F5C57]">Prefers SMS. Usually books weekday mornings.</div>
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="mb-4 flex items-end justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#9B978F]">Active journey</div>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={story.label}
                          initial={reduced ? false : { opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduced ? undefined : { opacity: 0, y: -3 }}
                          transition={{ duration: reduced ? 0 : 0.25 }}
                          className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-[#1B1D21]"
                        >
                          {story.label}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div className="hidden text-right text-[10px] leading-[1.45] text-[#A09C94] sm:block">One customer.<br />Next best action.</div>
                  </div>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={story.key}
                      initial={reduced ? false : { opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={reduced ? undefined : { opacity: 0, x: -10 }}
                      transition={{ duration: reduced ? 0 : 0.34, ease: EASE }}
                      className="space-y-3"
                    >
                      {story.steps.map((step, index) => (
                        <WorkflowStep key={`${story.key}-${step.title}`} step={step} index={index} story={story} reduced={reduced} />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-[#E5E1D9] bg-white/55 px-5 py-4 text-[11px] text-[#87837C] sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <span>Customer activity stays connected to one record.</span>
                <span className="font-semibold text-[#55524D]">Zapla follows through after the sale.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
