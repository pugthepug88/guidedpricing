import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown, MessageSquare } from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";

export const Route = createFileRoute("/reactivation")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Lead & Customer Reactivation for Service Businesses | Zapla" },
      {
        name: "description",
        content:
          "Zapla Reopen helps service businesses bring old enquiries, stale quotes and past customers back into conversation with controlled lead and customer reactivation.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ReactivationPage,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

const FAQS = [
  {
    q: "What is Reopen?",
    a: "Reopen is Zapla's lead and customer reactivation solution. It helps you identify dormant enquiries, older quotes and past customers worth revisiting, then restart the conversation with rules around who gets contacted and what happens when they reply.",
  },
  {
    q: "How is Reopen different from Follow-Up?",
    a: "Follow-Up keeps active opportunities moving while they are still live. Reopen goes back to opportunities that have already gone quiet and gives them a fresh reason to re-engage.",
  },
  {
    q: "Does Reopen message my whole database?",
    a: "No. The audience should be deliberate. You can exclude active opportunities, recent contacts, unsubscribed contacts, people who already replied and anyone outside the segment you want to reach.",
  },
  {
    q: "What happens when someone replies?",
    a: "The outreach can stop automatically and the conversation can route back to your team with the previous customer history still attached.",
  },
  {
    q: "Which Zapla plan includes Reopen?",
    a: "Reopen is included in Growth. Growth is currently A$699 per month plus GST, with Guided Launch from A$2,997 plus GST.",
  },
  {
    q: "What is Ghost to Gold?",
    a: "Ghost to Gold is the done for you Reopen service. Sprint starts from A$997 plus GST and covers campaign build and launch. Managed starts from A$1,497 plus GST and also includes monitoring and handoff of interested customers to your team.",
  },
] as const;

const ARCHIVE_CONTACTS = [
  { cell: 2, x: 7, y: 14, size: 54, rotate: -6, opacity: 0.54 },
  { cell: 6, x: 20, y: 8, size: 66, rotate: 4, opacity: 0.45 },
  { cell: 13, x: 34, y: 16, size: 48, rotate: -3, opacity: 0.42 },
  { cell: 17, x: 52, y: 10, size: 62, rotate: 5, opacity: 0.5 },
  { cell: 20, x: 72, y: 16, size: 52, rotate: -4, opacity: 0.4 },
  { cell: 4, x: 88, y: 10, size: 64, rotate: 3, opacity: 0.46 },
  { cell: 10, x: 10, y: 44, size: 62, rotate: 5, opacity: 0.46 },
  { cell: 7, x: 25, y: 52, size: 48, rotate: -5, opacity: 0.38 },
  { cell: 15, x: 78, y: 48, size: 56, rotate: 3, opacity: 0.5 },
  { cell: 22, x: 91, y: 43, size: 46, rotate: -3, opacity: 0.38 },
  { cell: 11, x: 9, y: 76, size: 48, rotate: -4, opacity: 0.36 },
  { cell: 16, x: 24, y: 84, size: 60, rotate: 5, opacity: 0.44 },
  { cell: 1, x: 48, y: 86, size: 50, rotate: -3, opacity: 0.42 },
  { cell: 19, x: 72, y: 82, size: 64, rotate: 4, opacity: 0.46 },
  { cell: 23, x: 92, y: 78, size: 48, rotate: -4, opacity: 0.38 },
] as const;

const AUDIENCE = [
  { cell: 0, label: "Old enquiry", selected: true },
  { cell: 3, label: "Active quote", selected: false },
  { cell: 7, label: "Past customer", selected: true },
  { cell: 12, label: "Recent contact", selected: false },
  { cell: 18, label: "Old quote", selected: true },
  { cell: 21, label: "Unsubscribed", selected: false },
  { cell: 5, label: "Dormant lead", selected: true },
  { cell: 9, label: "Active job", selected: false },
  { cell: 14, label: "Past customer", selected: true },
  { cell: 20, label: "Already replied", selected: false },
  { cell: 11, label: "Old enquiry", selected: true },
  { cell: 16, label: "Recent lead", selected: false },
] as const;

const USE_CASES = [
  {
    label: "OLD ENQUIRY",
    accent: "#BF7458",
    bg: "#E7CEC2",
    title: "The enquiry was real. The timing was not.",
    message: "Still looking to get this sorted?",
    reply: "Yes. What are the next steps?",
  },
  {
    label: "STALE QUOTE",
    accent: "#9B6722",
    bg: "#F0D59D",
    title: "The quote went quiet before a decision was made.",
    message: "Want us to update that quote?",
    reply: "Yes, please send the latest pricing.",
  },
  {
    label: "PAST CUSTOMER",
    accent: "#667044",
    bg: "#DCE0CC",
    title: "They already know you. Nobody invited them back.",
    message: "Need a hand with this again?",
    reply: "Actually yes. Can someone call me today?",
  },
] as const;

function ReactivationPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F1] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <Hero />
      <QuietMoments />
      <AudienceSection />
      <ReopenedStory />
      <UseCases />
      <CommercialPaths />
      <Faq />
      <FinalCta />
      <DominoFooter />
    </main>
  );
}

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
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({
  children,
  tone = "coral",
}: {
  children: ReactNode;
  tone?: "coral" | "gold" | "muted" | "light";
}) {
  const tones = {
    coral: "text-[#BF7458]",
    gold: "text-[#DDA34B]",
    muted: "text-[#77716A]",
    light: "text-white/62",
  };

  return (
    <div className={"text-[10px] font-semibold uppercase tracking-[0.22em] " + tones[tone]}>
      {children}
    </div>
  );
}

function AutumnAvatar({
  cell,
  size,
  muted = false,
  className = "",
}: {
  cell: number;
  size: number;
  muted?: boolean;
  className?: string;
}) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);

  return (
    <span
      className={
        "block shrink-0 overflow-hidden rounded-full border border-black/[0.06] shadow-[0_10px_28px_rgba(46,36,28,.11)] " +
        className
      }
      style={{
        width: size,
        height: size,
        backgroundImage: "url(" + PORTRAIT_SHEET + ")",
        backgroundPosition: (column / 5) * 100 + "% " + (row / 3) * 100 + "%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
        filter: muted ? "grayscale(.78) saturate(.58)" : undefined,
      }}
      aria-hidden="true"
    />
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F3EBDD] px-5 pb-16 pt-[112px] sm:px-10 sm:pb-20 sm:pt-[124px] lg:px-16 lg:pb-24 lg:pt-[136px]">
      <div className="pointer-events-none absolute -left-20 top-[18%] h-[360px] w-[360px] rounded-full bg-[#E7CEC2]/45 blur-3xl" />
      <div className="pointer-events-none absolute right-[2%] top-[8%] h-[420px] w-[420px] rounded-full bg-[#DCE0CC]/42 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1420px] items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10">
        <Reveal className="max-w-[640px]">
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow>Reopen</Eyebrow>
            <span className="h-px w-7 bg-[#C9B7A6]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D8277]">
              Lead & customer reactivation
            </span>
          </div>

          <h1
            className="mt-5 text-[50px] font-medium leading-[0.91] tracking-[-0.062em] sm:text-[68px] lg:text-[84px]"
            style={{ fontFamily: DISPLAY }}
          >
            They went quiet.
            <span className="mt-1 block text-[#BF7458]">
              That doesn't mean they're gone.
            </span>
          </h1>

          <p className="mt-6 max-w-[595px] text-[16px] leading-[1.72] text-[#655F59] sm:text-[18px]">
            Reopen finds old enquiries, stale quotes and past customers worth revisiting, starts the right conversation, and stops as soon as someone replies.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BOOK_URL}
              className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px"
            >
              Book a Call <ArrowRight size={15} />
            </a>
            <a
              href="#how-reopen-works"
              className="inline-flex h-[50px] items-center rounded-[10px] border border-[#CFC1B4] bg-white/58 px-6 text-[13px] font-semibold text-[#1F211E] backdrop-blur-sm"
            >
              See how Reopen works
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-[#6D6862] sm:text-[12px]">
            {["Old enquiries", "Stale quotes", "Past customers"].map((item, index) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: ["#BF7458", "#DDA34B", "#99A36D"][index] }}
                />
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ArchiveScene />
        </Reveal>
      </div>
    </section>
  );
}

function ArchiveScene() {
  const reduced = !!useReducedMotion();

  return (
    <div className="relative mx-auto min-h-[500px] w-full max-w-[760px] sm:min-h-[560px] lg:min-h-[630px]">
      <div className="pointer-events-none absolute left-[8%] right-[8%] top-[12%] h-[70%] rounded-[50%] bg-white/30 blur-2xl" />

      {ARCHIVE_CONTACTS.map((contact, index) => (
        <motion.div
          key={index}
          className={(index > 11 ? "hidden sm:block " : "") + "absolute -translate-x-1/2 -translate-y-1/2"}
          style={{
            left: contact.x + "%",
            top: contact.y + "%",
            rotate: contact.rotate,
            opacity: contact.opacity,
          }}
          initial={reduced ? false : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: contact.opacity, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : index * 0.018, ease: EASE }}
        >
          <AutumnAvatar cell={contact.cell} size={contact.size} muted />
        </motion.div>
      ))}

      <motion.div
        className="absolute left-[36%] top-[42%] z-20 -translate-x-1/2 -translate-y-1/2"
        initial={reduced ? false : { opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.18, ease: EASE }}
      >
        <div className="relative">
          <span className="absolute -inset-3 rounded-full border border-[#BF7458]/22" />
          <span className="absolute -inset-6 rounded-full border border-[#BF7458]/10" />
          <AutumnAvatar cell={9} size={104} />
        </div>
        <div className="mt-5 -translate-x-2 rounded-full border border-[#D8C8B9] bg-[#F8F3EA]/90 px-4 py-2 text-center text-[9px] font-semibold uppercase tracking-[0.13em] text-[#7B6B60] shadow-sm backdrop-blur-sm">
          Quote sent · 5 months quiet
        </div>
      </motion.div>

      <div className="pointer-events-none absolute left-[47%] top-[42%] hidden h-px w-[12%] bg-[#BF7458]/45 sm:block" />
      <div className="pointer-events-none absolute left-[58%] top-[42%] hidden h-2 w-2 -translate-y-1/2 rounded-full bg-[#BF7458] sm:block" />

      <motion.div
        className="absolute right-[2%] top-[28%] z-30 w-[48%] max-w-[320px] rounded-[20px] bg-white px-5 py-5 shadow-[0_20px_54px_rgba(79,57,43,.12)] sm:right-[3%]"
        initial={reduced ? false : { opacity: 0, x: 14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.34, ease: EASE }}
      >
        <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#A66A55]">Reopen</div>
        <p className="mt-3 text-[14px] font-semibold leading-[1.5] text-[#2E2A27] sm:text-[15px]">
          Want us to update that quote?
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-[14%] right-[7%] z-30 w-[52%] max-w-[350px] rounded-[20px] bg-[#1E2B29] px-5 py-5 text-[#F7F4EE] shadow-[0_24px_58px_rgba(37,43,40,.18)]"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.5, ease: EASE }}
      >
        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/48">
          <MessageSquare size={12} />
          Reply received
        </div>
        <p className="mt-3 text-[14px] font-semibold leading-[1.5] sm:text-[15px]">
          Yes. Please send me the latest pricing.
        </p>
        <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4 text-[10px] font-semibold text-[#C9D2A7]">
          <span className="h-2 w-2 rounded-full bg-[#99A36D]" />
          REOPENED
        </div>
      </motion.div>

      <div className="absolute bottom-[5%] left-[5%] max-w-[250px] text-[10px] font-medium leading-[1.55] text-[#8A8178]">
        Most records stay quiet. The right ones come back into focus.
      </div>
    </div>
  );
}

function QuietMoments() {
  return (
    <section className="bg-[#FCFBF8] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow tone="muted">Where old revenue sits</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.056em] sm:text-[58px] lg:text-[70px]"
            style={{ fontFamily: DISPLAY }}
          >
            Some opportunities never really ended.
            <span className="block text-[#BF7458]">They just stopped moving.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <article className="relative min-h-[360px] overflow-hidden rounded-[30px] bg-[#BF7458] p-7 text-[#FFF9F5] sm:p-9">
              <div className="absolute right-5 top-0 text-[128px] font-medium leading-none tracking-[-0.08em] text-white/[0.075]" style={{ fontFamily: DISPLAY }}>
                01
              </div>
              <div className="relative flex min-h-[290px] flex-col justify-between">
                <div className="text-[9px] font-semibold uppercase tracking-[0.19em] text-white/62">Old enquiries</div>
                <div>
                  <h3 className="max-w-[560px] text-[46px] font-medium leading-[0.94] tracking-[-0.058em] sm:text-[58px]" style={{ fontFamily: DISPLAY }}>
                    They asked.
                    <span className="block">Timing got in the way.</span>
                  </h3>
                  <p className="mt-6 max-w-[460px] text-[14px] leading-[1.68] text-white/72 sm:text-[15px]">
                    The interest was real. The conversation simply never made it to the next step.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal className="lg:col-span-5">
            <article className="relative min-h-[360px] overflow-hidden rounded-[30px] bg-[#F0D59D] p-7 text-[#24231E] sm:p-9">
              <div className="absolute right-5 top-0 text-[116px] font-medium leading-none tracking-[-0.08em] text-[#111318]/[0.05]" style={{ fontFamily: DISPLAY }}>
                02
              </div>
              <div className="relative flex min-h-[290px] flex-col justify-between">
                <div className="text-[9px] font-semibold uppercase tracking-[0.19em] text-[#9B6722]">Stale quotes</div>
                <div>
                  <h3 className="max-w-[430px] text-[43px] font-medium leading-[0.94] tracking-[-0.058em] sm:text-[53px]" style={{ fontFamily: DISPLAY }}>
                    They didn't say no.
                    <span className="block">They stopped replying.</span>
                  </h3>
                  <p className="mt-6 max-w-[370px] text-[14px] leading-[1.68] text-[#5D563F]">
                    An older quote can still be an opportunity. It just needs a reason to come back into view.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal className="lg:col-span-12">
            <article className="grid min-h-[270px] overflow-hidden rounded-[30px] bg-[#DCE0CC] text-[#1A2018] sm:grid-cols-[0.78fr_1.22fr]">
              <div className="relative flex items-end p-7 sm:p-9">
                <div className="absolute right-4 top-[-18px] text-[122px] font-medium leading-none tracking-[-0.08em] text-[#111318]/[0.045]" style={{ fontFamily: DISPLAY }}>
                  03
                </div>
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.19em] text-[#667044]">Past customers</div>
                  <h3 className="mt-7 text-[44px] font-medium leading-[0.93] tracking-[-0.057em] sm:text-[56px]" style={{ fontFamily: DISPLAY }}>
                    They already know you.
                  </h3>
                </div>
              </div>
              <div className="flex items-center border-t border-[#1A2018]/10 p-7 sm:border-l sm:border-t-0 sm:p-10">
                <div>
                  <div className="text-[34px] font-medium leading-[1] tracking-[-0.046em] text-[#49513B]" style={{ fontFamily: DISPLAY }}>
                    Nobody invited them back.
                  </div>
                  <p className="mt-5 max-w-[590px] text-[16px] leading-[1.7] text-[#59604D]">
                    The relationship already exists. Reopen gives the next conversation somewhere to start.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section
      id="how-reopen-works"
      className="relative overflow-hidden bg-[#E7E0EA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      <div className="pointer-events-none absolute right-[-8%] top-[-18%] h-[460px] w-[460px] rounded-full bg-white/26 blur-3xl" />
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <Reveal className="max-w-[570px]">
          <Eyebrow tone="muted">Controlled reactivation</Eyebrow>
          <h2
            className="mt-4 text-[43px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[58px] lg:text-[70px]"
            style={{ fontFamily: DISPLAY }}
          >
            Don't wake everyone up.
            <span className="block text-[#7E687F]">Wake the right ones.</span>
          </h2>
          <p className="mt-6 max-w-[540px] text-[15px] leading-[1.75] text-[#645D66] sm:text-[17px]">
            Reopen starts with selection, not sending. Active opportunities stay out. Recent contacts stay out. People who should not be contacted stay out.
          </p>

          <div className="mt-8 grid gap-3 text-[12px] font-semibold text-[#514C53] sm:grid-cols-2">
            {["Audience rules", "Controlled batches", "Stop on reply", "Human handoff"].map((item) => (
              <span key={item} className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/56 text-[#7E687F]">
                  <Check size={13} strokeWidth={2.5} />
                </span>
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="relative mx-auto max-w-[720px]">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
              {AUDIENCE.map((person, index) => (
                <AudiencePerson key={index} person={person} index={index} />
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#7E687F]/15 pt-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#776E79]">
                6 records selected for this audience
              </div>
              <div className="flex items-center gap-4 text-[10px] font-semibold text-[#776E79]">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#7E687F]" />
                  Eligible
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#AAA1AA]" />
                  Excluded
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AudiencePerson({
  person,
  index,
}: {
  person: (typeof AUDIENCE)[number];
  index: number;
}) {
  const reduced = !!useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : index * 0.035, ease: EASE }}
      className={
        "relative flex min-h-[158px] flex-col items-center justify-center rounded-[22px] border px-3 py-4 text-center " +
        (person.selected
          ? "border-[#7E687F]/22 bg-white/60 shadow-[0_14px_36px_rgba(83,70,87,.08)]"
          : "border-white/30 bg-white/22")
      }
    >
      <AutumnAvatar cell={person.cell} size={54} muted={!person.selected} />
      <div className={"mt-3 text-[10px] font-semibold " + (person.selected ? "text-[#3D3940]" : "text-[#8A818B]")}>
        {person.label}
      </div>
      <div
        className={
          "mt-2 rounded-full px-2 py-1 text-[8px] font-bold uppercase tracking-[0.1em] " +
          (person.selected
            ? "bg-[#7E687F]/10 text-[#7E687F]"
            : "bg-black/[0.035] text-[#9A929B]")
        }
      >
        {person.selected ? "Select" : "Exclude"}
      </div>
    </motion.div>
  );
}

function ReopenedStory() {
  return (
    <section className="bg-[#F3EBDD] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>One old conversation</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[60px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            Same customer.
            <span className="block text-[#BF7458]">Conversation reopened.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:gap-6">
          <Reveal>
            <div className="h-full rounded-[28px] border border-[#D8CABC] bg-white/50 p-6 sm:p-8">
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8D8176]">History that stays attached</div>
              <div className="relative mt-8">
                <div className="absolute bottom-4 left-[15px] top-4 w-px bg-[#D9CFC3]" />
                {[
                  ["12 FEB", "Enquiry received", "Asked about pricing and timing."],
                  ["14 FEB", "Quote sent", "A$4,800 proposal sent."],
                  ["28 FEB", "Conversation went quiet", "No reply after the quote."],
                  ["08 AUG", "Reopen selected the record", "Eligible for a new conversation."],
                ].map(([date, title, copy], index) => (
                  <div key={title} className="relative grid grid-cols-[32px_1fr] gap-4 pb-7 last:pb-0">
                    <span
                      className="relative z-10 mt-1 h-[10px] w-[10px] rounded-full border-2 border-[#F3EBDD]"
                      style={{ backgroundColor: ["#C2A07B", "#DDA34B", "#9A9870", "#BF7458"][index] }}
                    />
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#9A8E83]">{date}</div>
                      <div className="mt-1.5 text-[15px] font-semibold text-[#2C2926]">{title}</div>
                      <div className="mt-1 text-[12px] leading-[1.55] text-[#716A63]">{copy}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="relative min-h-[520px] overflow-hidden rounded-[28px] bg-[#1E2B29] p-6 text-[#F7F4EE] sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[#BF7458]/12 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-4">
                  <AutumnAvatar cell={9} size={72} />
                  <div>
                    <div className="text-[24px] font-semibold tracking-[-0.035em]">Sarah Nguyen</div>
                    <div className="mt-1 text-[11px] text-white/42">Existing customer record · 5 months quiet</div>
                  </div>
                </div>

                <div className="mt-9 max-w-[490px] rounded-[20px] bg-[#E7CEC2] px-5 py-5 text-[#2B2926] shadow-[0_16px_42px_rgba(0,0,0,.12)]">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#9C6756]">Reopen</div>
                  <div className="mt-3 text-[17px] font-medium leading-[1.48] tracking-[-0.015em]">
                    Hi Sarah, want us to update the quote we sent earlier this year?
                  </div>
                </div>

                <div className="ml-auto mt-5 max-w-[430px] rounded-[20px] border border-white/10 bg-white/[0.055] px-5 py-5">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/40">Sarah replied</div>
                  <div className="mt-3 text-[18px] font-medium leading-[1.45] tracking-[-0.018em] text-white/94">
                    Yes. Please send me the latest pricing.
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2.5 border-t border-white/10 pt-6">
                  {["Outreach stopped", "Conversation reopened", "Routed to Sales"].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/[0.055] px-3 py-2 text-[10px] font-semibold text-white/68">
                      <Check size={11} className="text-[#B9C88C]" strokeWidth={2.5} />
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mt-8 max-w-[620px] text-[12px] leading-[1.65] text-white/46">
                  The reply does not become a brand new lead. The enquiry, quote, notes and messages stay with the same customer record.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="bg-[#FCFBF8] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[860px]">
          <Eyebrow tone="muted">Three ways Reopen earns its place</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[56px] lg:text-[66px]"
            style={{ fontFamily: DISPLAY }}
          >
            Same idea.
            <span className="block text-[#BF7458]">Different reason to come back.</span>
          </h2>
        </Reveal>

        <div className="mt-12 border-y border-[#DDD6CD] lg:grid lg:grid-cols-3">
          {USE_CASES.map((item, index) => (
            <Reveal
              key={item.label}
              className={index === 0 ? "" : "border-t border-[#DDD6CD] lg:border-l lg:border-t-0"}
              delay={index * 0.04}
            >
              <article className="min-h-[470px] px-1 py-8 sm:px-4 sm:py-10 lg:px-8 lg:py-12">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.accent }} />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.17em]" style={{ color: item.accent }}>
                    {item.label}
                  </span>
                </div>

                <h3 className="mt-7 max-w-[350px] text-[31px] font-medium leading-[1.02] tracking-[-0.046em]" style={{ fontFamily: DISPLAY }}>
                  {item.title}
                </h3>

                <div className="mt-9 rounded-[18px] px-4 py-4 text-[13px] font-semibold leading-[1.5] text-[#302D29]" style={{ backgroundColor: item.bg }}>
                  {item.message}
                </div>

                <div className="ml-auto mt-3 max-w-[88%] rounded-[18px] bg-[#1E2B29] px-4 py-4 text-[13px] font-semibold leading-[1.5] text-[#F7F4EE]">
                  {item.reply}
                </div>

                <div className="mt-6 flex items-center gap-2 text-[10px] font-semibold text-[#74706A]">
                  <Check size={12} style={{ color: item.accent }} strokeWidth={2.5} />
                  Stop on reply. Hand back to the team.
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommercialPaths() {
  return (
    <section className="bg-[#F7F5F1] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1220px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>Two ways to use Reopen</Eyebrow>
          <h2
            className="mt-4 text-[43px] font-medium leading-[0.96] tracking-[-0.056em] sm:text-[58px] lg:text-[68px]"
            style={{ fontFamily: DISPLAY }}
          >
            Use Reopen yourself.
            <span className="block text-[#BF7458]">Or let us run the first campaign.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full min-h-[400px] flex-col rounded-[28px] bg-[#E7E0EA] p-6 sm:p-8">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7E687F]">Growth</div>
              <h3 className="mt-5 max-w-[460px] text-[36px] font-medium leading-[0.98] tracking-[-0.048em]" style={{ fontFamily: DISPLAY }}>
                Reopen whenever the business needs it.
              </h3>
              <p className="mt-5 max-w-[500px] text-[14px] leading-[1.7] text-[#655D66]">
                Build the audience, run targeted reactivation and keep the capability inside Zapla for ongoing use.
              </p>

              <div className="mt-9 border-t border-[#7E687F]/16 pt-6">
                <div className="text-[31px] font-semibold tracking-[-0.04em] text-[#28242A]">
                  A$699
                  <span className="ml-1 text-[12px] font-medium tracking-normal text-[#706972]">/mo + GST</span>
                </div>
                <div className="mt-1 text-[11px] text-[#827A84]">Guided Launch from A$2,997 + GST</div>
              </div>

              <a href={PRICING_URL} className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-[12.5px] font-semibold text-[#332E35]">
                View Growth <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <div className="flex h-full min-h-[400px] flex-col rounded-[28px] bg-[#1E2B29] p-6 text-[#F7F4EE] sm:p-8">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#DDA34B]">Ghost to Gold</div>
              <h3 className="mt-5 max-w-[480px] text-[36px] font-medium leading-[0.98] tracking-[-0.048em]" style={{ fontFamily: DISPLAY }}>
                Want us to run the Reopen campaign for you?
              </h3>
              <p className="mt-5 max-w-[510px] text-[14px] leading-[1.7] text-white/56">
                Ghost to Gold is the done for you offer. Zapla can build and launch the campaign, or manage the response flow as well.
              </p>

              <div className="mt-9 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/36">Sprint</div>
                  <div className="mt-2 text-[23px] font-semibold">From A$997</div>
                  <div className="mt-1 text-[10px] text-white/42">+ GST</div>
                </div>
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/36">Managed</div>
                  <div className="mt-2 text-[23px] font-semibold">From A$1,497</div>
                  <div className="mt-1 text-[10px] text-white/42">+ GST</div>
                </div>
              </div>

              <a href={BOOK_URL} className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-[12.5px] font-semibold text-[#F7F4EE]">
                Ask about Ghost to Gold <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="bg-[#F3EBDD] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[980px]">
        <Reveal className="max-w-[760px]">
          <Eyebrow tone="muted">FAQ</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.97] tracking-[-0.052em] sm:text-[54px]"
            style={{ fontFamily: DISPLAY }}
          >
            The obvious questions before you wake old conversations up.
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-[#D8CFC3] border-y border-[#D8CFC3]">
          {FAQS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="text-[14px] font-semibold text-[#2E2A27] sm:text-[15px]">{q}</span>
        <ChevronDown
          size={17}
          className={"shrink-0 text-[#746D66] transition-transform " + (open ? "rotate-180" : "")}
        />
      </button>
      {open && (
        <div className="max-w-[820px] pb-5 pr-10 text-[13.5px] leading-[1.75] text-[#69635E]">
          {a}
        </div>
      )}
    </div>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#BF7458] px-5 py-20 text-[#FFF9F5] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#F0D59D]/16 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[320px] w-[320px] rounded-full bg-[#E7E0EA]/12 blur-3xl" />

      <div className="relative mx-auto max-w-[1080px] text-center">
        <Reveal>
          <Eyebrow tone="light">Reopen what is already there</Eyebrow>
          <h2
            className="mx-auto mt-5 max-w-[960px] text-[45px] font-medium leading-[0.93] tracking-[-0.058em] sm:text-[62px] lg:text-[76px]"
            style={{ fontFamily: DISPLAY }}
          >
            You already paid to get their attention.
            <span className="block text-[#F8E2B5]">Reopen the conversation.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[650px] text-[15px] leading-[1.75] text-white/72">
            We can help you work out which dormant opportunities are worth revisiting and the cleanest way to bring them back into conversation.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={BOOK_URL}
              className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px"
            >
              Book a Call <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
