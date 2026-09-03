import { motion, useReducedMotion } from "motion/react";
import { CalendarDays, Check, MessageSquareText, RotateCcw, Star } from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

type Story = {
  key: "return" | "reactivate" | "reputation";
  number: string;
  label: string;
  headline: string;
  copy: string;
  bg: string;
  accent: string;
  accentSoft: string;
};

const STORIES: Story[] = [
  {
    key: "return",
    number: "01 / 03",
    label: "Return",
    headline: "Bring customers back at the right time.",
    copy: "Zapla remembers when the next visit is due and makes coming back easy.",
    bg: "#E7E0EA",
    accent: "#7E687F",
    accentSoft: "#D5C8DA",
  },
  {
    key: "reactivate",
    number: "02 / 03",
    label: "Reactivate",
    headline: "Win back customers who go quiet.",
    copy: "Spot the customers who have drifted away and restart the conversation while it can still become revenue.",
    bg: "#E2E4D2",
    accent: "#737650",
    accentSoft: "#CED1B8",
  },
  {
    key: "reputation",
    number: "03 / 03",
    label: "Reputation",
    headline: "Turn great service into your next customer.",
    copy: "Ask at the right moment, make reviewing easy, and turn a finished job into proof for the next buyer.",
    bg: "#EFE2D2",
    accent: "#A36F55",
    accentSoft: "#E3CDB9",
  },
];

function Avatar({ muted = false }: { muted?: boolean }) {
  return (
    <motion.div
      className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-full border border-black/[0.07] bg-[#C89A5D] shadow-[0_12px_30px_rgba(35,28,24,.10)]"
      initial={false}
      whileInView={muted ? { filter: ["grayscale(1) saturate(.45)", "grayscale(0) saturate(.92)"] } : { filter: "grayscale(0) saturate(.92)" }}
      viewport={{ amount: 0.7 }}
      transition={{ duration: 0.9, ease: EASE }}
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

function PetalTag({ story }: { story: Story }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-7 w-12" aria-hidden="true">
        <span className="absolute left-0 top-1 h-6 w-6 rounded-full" style={{ backgroundColor: story.accentSoft, opacity: 0.72 }} />
        <span className="absolute left-2.5 top-1 h-6 w-6 rounded-full" style={{ backgroundColor: story.accent, opacity: 0.58 }} />
        <span className="absolute left-5 top-1 h-6 w-6 rounded-full" style={{ backgroundColor: story.accent, opacity: 0.9 }} />
      </div>
      <span className="rounded-full border border-black/[0.07] bg-white/72 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#252328] backdrop-blur-sm">
        {story.label}
      </span>
    </div>
  );
}

function ReturnVisual({ story, reduced }: { story: Story; reduced: boolean }) {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-[570px] flex-col justify-center">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.55 }}
        transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
        className="flex items-center gap-4"
      >
        <Avatar />
        <div>
          <div className="text-[24px] font-semibold tracking-[-0.035em] text-[#1A191D]">Sarah Nguyen</div>
          <div className="mt-1 text-[13px] text-[#66616A]">Last visit · 8 months ago</div>
        </div>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.55 }}
        transition={{ duration: reduced ? 0 : 0.58, delay: reduced ? 0 : 0.06, ease: EASE }}
        className="mt-10 max-w-[470px] rounded-[18px] bg-white px-6 py-5 shadow-[0_18px_48px_rgba(42,33,45,.09)]"
      >
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: story.accent }}>
          <MessageSquareText size={15} strokeWidth={2} /> Zapla reminder
        </div>
        <div className="mt-3 text-[20px] leading-[1.4] tracking-[-0.025em] text-[#242127]">“Your next service is due. Thursday 10:30?”</div>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ amount: 0.55 }}
        transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.12, ease: EASE }}
        className="ml-auto mt-5 flex w-full max-w-[340px] items-center gap-4 rounded-[18px] bg-[#19191D] px-5 py-5 text-white shadow-[0_20px_50px_rgba(30,25,31,.16)]"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: story.accent }}><Check size={21} strokeWidth={2.4} /></span>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/46">Booked again</div>
          <div className="mt-1 text-[19px] font-semibold tracking-[-0.02em]">Thursday · 10:30 AM</div>
        </div>
      </motion.div>
    </div>
  );
}

function ReactivateVisual({ story, reduced }: { story: Story; reduced: boolean }) {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-[570px] flex-col justify-center">
      <div className="flex items-center gap-4">
        <Avatar muted />
        <div>
          <div className="flex items-center gap-2">
            <div className="text-[24px] font-semibold tracking-[-0.035em] text-[#1A191D]">Sarah Nguyen</div>
            <span className="rounded-full bg-white/66 px-3 py-1 text-[10px] font-semibold text-[#696A59]">120 days quiet</span>
          </div>
          <div className="mt-1 text-[13px] text-[#626456]">No recent booking or reply</div>
        </div>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.55 }}
        transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
        className="mt-10 max-w-[475px] rounded-[18px] bg-white px-6 py-5 shadow-[0_18px_48px_rgba(43,46,31,.08)]"
      >
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: story.accent }}>
          <RotateCcw size={15} strokeWidth={2} /> Re-engagement
        </div>
        <div className="mt-3 text-[19px] leading-[1.42] tracking-[-0.02em] text-[#23251D]">“Still thinking about your renovation? I’m here when you’re ready.”</div>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.55 }}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.08, ease: EASE }}
        className="ml-auto mt-4 rounded-[16px] bg-[#191B17] px-5 py-4 text-[18px] font-medium tracking-[-0.02em] text-white"
      >
        “Yes, let’s book.”
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.55 }}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.14, ease: EASE }}
        className="mt-5 flex items-center gap-3 text-[14px] font-semibold text-[#3E4031]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full text-white" style={{ backgroundColor: story.accent }}><Check size={16} strokeWidth={2.3} /></span>
        Opportunity reopened
      </motion.div>
    </div>
  );
}

function ReputationVisual({ story, reduced }: { story: Story; reduced: boolean }) {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-[570px] flex-col justify-center">
      <div className="flex items-center gap-4">
        <Avatar />
        <div>
          <div className="text-[24px] font-semibold tracking-[-0.035em] text-[#1A191D]">Sarah Nguyen</div>
          <div className="mt-1 flex items-center gap-2 text-[13px] text-[#6C6158]"><CalendarDays size={14} /> Job completed · 4:48 PM</div>
        </div>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.55 }}
        transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
        className="mt-10 flex w-max items-center gap-2 rounded-full bg-white/75 px-4 py-2.5 text-[11px] font-semibold text-[#6B584D] shadow-[0_10px_28px_rgba(58,42,31,.06)]"
      >
        <MessageSquareText size={15} style={{ color: story.accent }} /> Review request sent
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.55 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.06, ease: EASE }}
        className="mt-5 rounded-[22px] bg-white px-7 py-7 shadow-[0_22px_58px_rgba(61,45,34,.10)]"
      >
        <div className="flex gap-1" style={{ color: story.accent }}>
          {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={23} fill="currentColor" strokeWidth={1.5} />)}
        </div>
        <div className="mt-5 text-[27px] font-medium leading-[1.25] tracking-[-0.035em] text-[#28221E]">“Made the whole process easy.”</div>
        <div className="mt-5 text-[12px] font-semibold text-[#81766E]">New Google review · just now</div>
      </motion.div>
    </div>
  );
}

function StoryPanel({ story, index, reduced }: { story: Story; index: number; reduced: boolean }) {
  return (
    <div
      className="relative mb-8 lg:sticky lg:top-[92px] lg:mb-[14vh] lg:h-[calc(100vh-116px)] lg:min-h-[650px] lg:max-h-[860px]"
      style={{ zIndex: 10 + index }}
    >
      <motion.article
        initial={reduced ? false : { opacity: 0.85, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: reduced ? 0 : 0.65, ease: EASE }}
        className="relative min-h-[760px] overflow-hidden rounded-[28px] border border-black/[0.06] px-7 py-9 shadow-[0_24px_70px_rgba(28,25,30,.08)] sm:px-10 sm:py-11 lg:h-full lg:min-h-0 lg:px-[60px] lg:py-[54px]"
        style={{ backgroundColor: story.bg }}
      >
        <div className="pointer-events-none absolute right-[-12%] top-[-22%] h-[480px] w-[480px] rounded-full bg-white/18 blur-3xl" aria-hidden="true" />
        <div className="relative grid h-full gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:gap-[76px]">
          <div className="flex h-full flex-col justify-center">
            <div className="flex items-center justify-between gap-5">
              <PetalTag story={story} />
              <span className="text-[10px] font-semibold tracking-[0.2em] text-black/34">{story.number}</span>
            </div>
            <h3
              className="mt-10 max-w-[520px] text-[46px] font-medium leading-[0.95] tracking-[-0.06em] text-[#17161A] sm:text-[58px] lg:text-[66px]"
              style={{ fontFamily: DISPLAY }}
            >
              {story.headline}
            </h3>
            <p className="mt-7 max-w-[480px] text-[17px] leading-[1.65] text-[#615D64] sm:text-[18px]">
              {story.copy}
            </p>
          </div>

          <div className="relative h-[440px] lg:h-full lg:min-h-[520px]">
            {story.key === "return" && <ReturnVisual story={story} reduced={reduced} />}
            {story.key === "reactivate" && <ReactivateVisual story={story} reduced={reduced} />}
            {story.key === "reputation" && <ReputationVisual story={story} reduced={reduced} />}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ZaplaRepeatBusinessV6() {
  const reduced = !!useReducedMotion();

  return (
    <section className="relative bg-[#F7F5F1] px-5 pb-28 pt-24 text-[#111318] sm:px-10 sm:pb-32 sm:pt-28 lg:px-12 lg:pb-[22vh] lg:pt-[120px]">
      <div className="mx-auto max-w-[1320px]">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduced ? 0 : 0.65, ease: EASE }}
          className="mb-14 max-w-[860px] sm:mb-16 lg:mb-20"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.21em] text-[#77716A]">Repeat business</div>
          <h2 className="mt-5 text-[48px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[62px] lg:text-[76px]" style={{ fontFamily: DISPLAY }}>
            Turn customers into repeat business.
          </h2>
          <p className="mt-6 max-w-[690px] text-[17px] leading-[1.65] text-[#6D6862] sm:text-[19px]">
            Bring customers back, re-engage the ones who go quiet, and turn great experiences into more business.
          </p>
        </motion.div>

        <div className="relative">
          {STORIES.map((story, index) => (
            <StoryPanel key={story.key} story={story} index={index} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}
