import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown, MessageSquare } from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";

export const Route = createFileRoute("/reactivation_v2")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Reopen V2 | Lead & Customer Reactivation | Zapla" },
      {
        name: "description",
        content:
          "An experimental Zapla Reopen concept for lead and customer reactivation, built around the quiet archive of old enquiries, stale quotes and past customers.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ReactivationV2Page,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

const AUTUMN = {
  paper: "#F7F5F1",
  parchment: "#F1E7D8",
  coral: "#BF7458",
  peach: "#E7CEC2",
  gold: "#DDA34B",
  straw: "#F0D59D",
  sage: "#A9B47A",
  sageSoft: "#DCE0CC",
  lavender: "#9B86B8",
  lavenderSoft: "#E7E0EA",
  ink: "#171816",
  greenInk: "#1E2B29",
} as const;

const ARCHIVE_PEOPLE = [
  { cell: 0, x: 7, y: 17, size: 54, opacity: 0.28, rotate: -6 },
  { cell: 4, x: 18, y: 9, size: 68, opacity: 0.34, rotate: 5 },
  { cell: 11, x: 31, y: 16, size: 47, opacity: 0.23, rotate: -3 },
  { cell: 18, x: 45, y: 8, size: 58, opacity: 0.31, rotate: 4 },
  { cell: 21, x: 61, y: 15, size: 50, opacity: 0.24, rotate: -5 },
  { cell: 3, x: 78, y: 8, size: 65, opacity: 0.29, rotate: 4 },
  { cell: 13, x: 92, y: 18, size: 48, opacity: 0.24, rotate: -3 },
  { cell: 7, x: 8, y: 46, size: 64, opacity: 0.3, rotate: 5 },
  { cell: 16, x: 24, y: 51, size: 48, opacity: 0.2, rotate: -4 },
  { cell: 10, x: 74, y: 44, size: 57, opacity: 0.28, rotate: 3 },
  { cell: 22, x: 91, y: 49, size: 46, opacity: 0.2, rotate: -4 },
  { cell: 2, x: 10, y: 78, size: 49, opacity: 0.21, rotate: -5 },
  { cell: 15, x: 27, y: 87, size: 61, opacity: 0.3, rotate: 5 },
  { cell: 5, x: 48, y: 86, size: 48, opacity: 0.23, rotate: -2 },
  { cell: 19, x: 72, y: 83, size: 64, opacity: 0.3, rotate: 4 },
  { cell: 23, x: 92, y: 78, size: 50, opacity: 0.22, rotate: -4 },
] as const;

const PIPELINE_QUIET = [
  { cell: 2, x: 10, y: 24, label: "Enquiry · 42 days", tone: "#BF7458" },
  { cell: 7, x: 28, y: 46, label: "Quote · 5 months", tone: "#DDA34B" },
  { cell: 14, x: 48, y: 27, label: "Customer · 11 months", tone: "#9B86B8" },
  { cell: 20, x: 67, y: 54, label: "Enquiry · 7 months", tone: "#A9B47A" },
  { cell: 11, x: 86, y: 33, label: "Quote · 4 months", tone: "#C89A5D" },
] as const;

const CURATION = [
  { cell: 0, x: 8, y: 17, tag: "7 months quiet", selected: true },
  { cell: 5, x: 29, y: 12, tag: "active quote", selected: false },
  { cell: 13, x: 49, y: 24, tag: "past customer", selected: true },
  { cell: 9, x: 72, y: 12, tag: "recently contacted", selected: false },
  { cell: 18, x: 91, y: 25, tag: "5 months quiet", selected: true },
  { cell: 21, x: 13, y: 67, tag: "unsubscribed", selected: false },
  { cell: 7, x: 36, y: 76, tag: "old enquiry", selected: true },
  { cell: 15, x: 61, y: 67, tag: "active job", selected: false },
  { cell: 23, x: 85, y: 77, tag: "past customer", selected: true },
] as const;

const FAQS = [
  {
    q: "What is Reopen?",
    a: "Reopen is Zapla's lead and customer reactivation solution. It helps you identify dormant enquiries, older quotes and past customers worth revisiting, then restart the conversation under rules you control.",
  },
  {
    q: "How is Reopen different from Follow-Up?",
    a: "Follow-Up keeps active opportunities moving while they are still live. Reopen goes back to opportunities that have already gone quiet and gives them a fresh reason to re-engage.",
  },
  {
    q: "Does Reopen contact everyone?",
    a: "No. The audience should be deliberate. Active opportunities, recent contacts, unsubscribed contacts and people who already replied can be excluded before anything sends.",
  },
  {
    q: "What happens when someone replies?",
    a: "The outreach can stop automatically and the conversation can route back to your team with the previous customer history still attached.",
  },
  {
    q: "What is Ghost to Gold?",
    a: "Ghost to Gold is the done for you Reopen service. Sprint starts from A$997 plus GST. Managed starts from A$1,497 plus GST and adds monitoring and handoff.",
  },
] as const;

function ReactivationV2Page() {
  return (
    <main className="min-h-screen bg-[#F7F5F1] text-[#171816] antialiased" style={{ fontFamily: BODY }}>
      <ArchiveHero />
      <SecondPipeline />
      <CurationDesk />
      <ConversationArchaeology />
      <CommercialSplit />
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
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduced ? 0 : 0.52, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({
  children,
  color = "#77716A",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <div
      className="text-[10px] font-semibold uppercase tracking-[0.23em]"
      style={{ color }}
    >
      {children}
    </div>
  );
}

function Portrait({
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
      className={"block shrink-0 overflow-hidden rounded-full " + className}
      style={{
        width: size,
        height: size,
        backgroundImage: "url(" + PORTRAIT_SHEET + ")",
        backgroundPosition: (column / 5) * 100 + "% " + (row / 3) * 100 + "%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
        filter: muted ? "grayscale(.82) saturate(.52) contrast(.94)" : undefined,
      }}
      aria-hidden="true"
    />
  );
}

function ArchiveHero() {
  return (
    <section className="relative min-h-[900px] overflow-hidden bg-[#F1E7D8] px-5 pb-16 pt-[112px] sm:px-10 sm:pt-[124px] lg:px-16 lg:pt-[136px]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.24]" style={{
        backgroundImage:
          "radial-gradient(circle at 10% 18%, rgba(191,116,88,.18), transparent 24%), radial-gradient(circle at 82% 8%, rgba(169,180,122,.18), transparent 25%), radial-gradient(circle at 70% 82%, rgba(155,134,184,.14), transparent 23%)",
      }} />

      <div className="relative mx-auto max-w-[1420px]">
        <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-start lg:gap-10">
          <Reveal className="relative z-20 max-w-[650px] lg:pt-10">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow color={AUTUMN.coral}>Reopen</Eyebrow>
              <span className="h-px w-7 bg-[#CDB9A7]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A7D72]">
                Lead & customer reactivation
              </span>
            </div>

            <h1
              className="mt-5 text-[52px] font-medium leading-[0.89] tracking-[-0.066em] sm:text-[72px] lg:text-[90px]"
              style={{ fontFamily: DISPLAY }}
            >
              They went quiet.
              <span className="mt-2 block text-[#BF7458]">
                That doesn't mean they're gone.
              </span>
            </h1>

            <p className="mt-7 max-w-[590px] text-[16px] leading-[1.72] text-[#675F58] sm:text-[18px]">
              Reopen finds the old enquiries, stale quotes and past customers worth revisiting, then brings the right conversations back to life.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={BOOK_URL}
                className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px"
              >
                Book a Call <ArrowRight size={15} />
              </a>
              <a
                href="#second-pipeline"
                className="inline-flex h-[50px] items-center rounded-full border border-[#CDB9A7] bg-white/48 px-6 text-[13px] font-semibold text-[#282521] backdrop-blur-sm"
              >
                Enter the archive
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.07}>
            <ArchiveWorld />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ArchiveWorld() {
  const reduced = !!useReducedMotion();

  return (
    <div className="relative mx-auto h-[650px] w-full max-w-[820px] lg:h-[700px]">
      <div className="absolute inset-[4%] rounded-[48%] bg-white/20 blur-3xl" />

      <div className="absolute left-[4%] top-[6%] text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9A8D80]">
        Quiet archive · 1,284 records
      </div>

      {ARCHIVE_PEOPLE.map((person, index) => (
        <motion.div
          key={index}
          className={(index > 11 ? "hidden sm:block " : "") + "absolute -translate-x-1/2 -translate-y-1/2"}
          style={{
            left: person.x + "%",
            top: person.y + "%",
            rotate: person.rotate,
          }}
          initial={reduced ? false : { opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: person.opacity, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.05 + index * 0.02, ease: EASE }}
        >
          <Portrait cell={person.cell} size={person.size} muted className="ring-1 ring-black/[0.05] shadow-[0_12px_30px_rgba(58,43,30,.08)]" />
        </motion.div>
      ))}

      <ArchiveFragment className="left-[5%] top-[31%] -rotate-[5deg]" tone="#E7CEC2" eyebrow="OLD ENQUIRY" line1="Website form" line2="Quiet · 7 months" />
      <ArchiveFragment className="right-[3%] top-[24%] rotate-[4deg]" tone="#F0D59D" eyebrow="QUOTE SENT" line1="A$4,800" line2="No activity · 5 months" />
      <ArchiveFragment className="bottom-[7%] left-[8%] rotate-[3deg]" tone="#DCE0CC" eyebrow="PAST CUSTOMER" line1="Job complete" line2="Last contact · 14 months" />

      <motion.div
        className="absolute left-[38%] top-[40%] z-20 -translate-x-1/2 -translate-y-1/2"
        initial={reduced ? false : { opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.3, ease: EASE }}
      >
        <div className="relative">
          <span className="absolute -inset-4 rounded-full border border-[#BF7458]/28" />
          <span className="absolute -inset-8 rounded-full border border-[#BF7458]/12" />
          <span className="absolute -inset-12 rounded-full border border-[#BF7458]/6" />
          <Portrait cell={9} size={112} className="ring-4 ring-[#F1E7D8] shadow-[0_22px_50px_rgba(70,44,28,.17)]" />
        </div>
        <div className="mt-6 rounded-full border border-[#D7C6B6] bg-[#FBF6ED]/92 px-4 py-2 text-center text-[9px] font-semibold uppercase tracking-[0.13em] text-[#7B6B60] shadow-sm">
          Quote · 5 months quiet
        </div>
      </motion.div>

      <div className="pointer-events-none absolute left-[49%] top-[40%] hidden w-[13%] border-t border-dashed border-[#BF7458]/42 sm:block" />
      <span className="pointer-events-none absolute left-[61.5%] top-[40%] hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#BF7458] sm:block" />

      <motion.div
        className="absolute right-[1%] top-[31%] z-30 w-[46%] max-w-[335px] bg-white/92 px-5 py-5 shadow-[0_24px_58px_rgba(72,50,35,.13)] backdrop-blur-sm"
        style={{ clipPath: "polygon(0 4%, 96% 0, 100% 92%, 4% 100%)" }}
        initial={reduced ? false : { opacity: 0, x: 14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.5, ease: EASE }}
      >
        <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#A66A55]">Reopen found a reason</div>
        <div className="mt-3 text-[16px] font-medium leading-[1.48] tracking-[-0.015em] text-[#2E2925]">
          Want us to update that quote?
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[16%] right-[5%] z-30 w-[48%] max-w-[350px] bg-[#1E2B29] px-5 py-5 text-[#F7F4EE] shadow-[0_26px_60px_rgba(31,43,41,.18)]"
        style={{ clipPath: "polygon(4% 0, 100% 5%, 96% 100%, 0 94%)" }}
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.68, ease: EASE }}
      >
        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/44">
          <MessageSquare size={12} />
          Reply received
        </div>
        <div className="mt-3 text-[16px] font-medium leading-[1.48] tracking-[-0.015em] text-white/94">
          Yes. Send me the latest pricing.
        </div>
        <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#C7D39B]">
          <span className="h-2 w-2 rounded-full bg-[#A9B47A]" />
          Reopened
        </div>
      </motion.div>
    </div>
  );
}

function ArchiveFragment({
  className,
  tone,
  eyebrow,
  line1,
  line2,
}: {
  className: string;
  tone: string;
  eyebrow: string;
  line1: string;
  line2: string;
}) {
  return (
    <div
      className={"absolute hidden w-[170px] px-4 py-4 shadow-[0_16px_36px_rgba(72,52,38,.08)] sm:block " + className}
      style={{ backgroundColor: tone }}
    >
      <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#71675E]">{eyebrow}</div>
      <div className="mt-3 text-[14px] font-semibold text-[#302D29]">{line1}</div>
      <div className="mt-1 text-[10px] text-[#716A63]">{line2}</div>
    </div>
  );
}

function SecondPipeline() {
  const reduced = !!useReducedMotion();

  return (
    <section id="second-pipeline" className="relative overflow-hidden bg-[#171816] px-5 py-24 text-[#F7F5F1] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1360px]">
        <Reveal className="max-w-[980px]">
          <Eyebrow color="#DDA34B">The quiet layer</Eyebrow>
          <h2
            className="mt-5 text-[46px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[64px] lg:text-[78px]"
            style={{ fontFamily: DISPLAY }}
          >
            Most businesses have a second pipeline.
            <span className="block text-[#C8D39C]">It's just gone quiet.</span>
          </h2>
        </Reveal>

        <div className="relative mt-16 min-h-[760px] overflow-hidden border-y border-white/10">
          <div className="absolute inset-x-0 top-0 h-[31%] bg-white/[0.025]" />
          <div className="absolute inset-x-0 top-[31%] h-px bg-[#DDA34B]/42" />
          <div className="absolute left-0 top-[31%] -translate-y-1/2 bg-[#171816] pr-4 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#DDA34B]">
            Active pipeline
          </div>
          <div className="absolute left-0 top-[35%] text-[9px] font-semibold uppercase tracking-[0.17em] text-white/28">
            Quiet pipeline
          </div>

          <div className="absolute left-[7%] top-[12%] flex items-center gap-3">
            <Portrait cell={4} size={48} className="ring-2 ring-white/10" />
            <div>
              <div className="text-[11px] font-semibold text-white/86">New enquiry</div>
              <div className="mt-1 text-[9px] text-white/35">Today · active</div>
            </div>
          </div>
          <div className="absolute left-[39%] top-[13%] flex items-center gap-3">
            <Portrait cell={12} size={48} className="ring-2 ring-white/10" />
            <div>
              <div className="text-[11px] font-semibold text-white/86">Quote follow-up</div>
              <div className="mt-1 text-[9px] text-white/35">Yesterday · active</div>
            </div>
          </div>
          <div className="absolute right-[8%] top-[12%] flex items-center gap-3">
            <Portrait cell={18} size={48} className="ring-2 ring-white/10" />
            <div>
              <div className="text-[11px] font-semibold text-white/86">Booked</div>
              <div className="mt-1 text-[9px] text-white/35">Next Tuesday</div>
            </div>
          </div>

          {PIPELINE_QUIET.map((record, index) => (
            <motion.div
              key={record.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: record.x + "%", top: 36 + record.y * 0.58 + "%" }}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : index * 0.06, ease: EASE }}
            >
              <div className="flex flex-col items-center text-center">
                <Portrait cell={record.cell} size={index === 1 ? 82 : 62} muted={index !== 1} className="ring-1 ring-white/10 shadow-[0_18px_40px_rgba(0,0,0,.16)]" />
                <span className="mt-3 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[9px] font-semibold text-white/45">
                  {record.label}
                </span>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="absolute bottom-[5%] left-[26%] right-[8%] border-t border-dashed border-white/12 pt-6"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.35 }}
          >
            <div className="max-w-[680px] text-[14px] leading-[1.7] text-white/48 sm:text-[16px]">
              The active pipeline gets attention because everyone can see it. Reopen makes the quiet layer visible again, without pretending every old record deserves another message.
            </div>
          </motion.div>

          <motion.div
            className="absolute left-[28%] top-[56%] h-[188px] w-px origin-bottom bg-[#DDA34B]/55"
            initial={reduced ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.48, ease: EASE }}
          />
          <motion.div
            className="absolute left-[28%] top-[28%] -translate-x-1/2"
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.7, ease: EASE }}
          >
            <span className="rounded-full bg-[#DDA34B] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-[#171816]">
              Worth reopening
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CurationDesk() {
  return (
    <section className="relative overflow-hidden bg-[#E7E0EA] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="pointer-events-none absolute right-[-8%] top-[-18%] h-[500px] w-[500px] rounded-full bg-white/26 blur-3xl" />
      <div className="relative mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
        <Reveal className="max-w-[520px]">
          <Eyebrow color="#7E687F">Selection before sending</Eyebrow>
          <h2
            className="mt-5 text-[45px] font-medium leading-[0.94] tracking-[-0.06em] sm:text-[60px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            Don't wake everyone up.
            <span className="block text-[#7E687F]">Wake the right ones.</span>
          </h2>
          <p className="mt-6 max-w-[500px] text-[16px] leading-[1.75] text-[#645D66]">
            Reopen behaves more like a curator than a megaphone. It starts by deciding who should be left alone.
          </p>
          <div className="mt-8 space-y-3 text-[12px] font-semibold text-[#544E56]">
            {["Active opportunities stay out.", "Recent contacts stay out.", "Unsubscribed contacts stay out.", "Replies stop the sequence."].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/50 text-[#7E687F]">
                  <Check size={13} strokeWidth={2.5} />
                </span>
                {item}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="relative h-[640px] min-h-[640px]">
            <div className="absolute inset-[4%] border border-[#7E687F]/12" />
            <div className="absolute left-[4%] top-[4%] -translate-y-1/2 bg-[#E7E0EA] pr-3 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#817784]">
              Selection desk · Thursday 10:12
            </div>

            {CURATION.map((person, index) => (
              <CurationRecord key={index} person={person} index={index} />
            ))}

            <div className="absolute bottom-[2%] left-[4%] right-[4%] flex flex-wrap items-center justify-between gap-4 border-t border-[#7E687F]/14 pt-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#776E79]">
                5 selected · 4 intentionally left alone
              </div>
              <div className="text-[10px] text-[#817784]">Rules decide before outreach starts.</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CurationRecord({
  person,
  index,
}: {
  person: (typeof CURATION)[number];
  index: number;
}) {
  const reduced = !!useReducedMotion();

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: person.x + "%", top: person.y + "%" }}
      initial={reduced ? false : { opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduced ? 0 : 0.42, delay: reduced ? 0 : index * 0.045, ease: EASE }}
    >
      <div className={"relative " + (!person.selected ? "opacity-48" : "")}>
        {person.selected ? (
          <>
            <span className="absolute -inset-3 rounded-full border border-[#7E687F]/28" />
            <span className="absolute -inset-1.5 rounded-full border border-white/70" />
          </>
        ) : (
          <span className="absolute left-[-16px] top-1/2 h-px w-[calc(100%+32px)] -rotate-[12deg] bg-[#7E687F]/32" />
        )}
        <Portrait cell={person.cell} size={person.selected ? 76 : 62} muted={!person.selected} className="shadow-[0_14px_34px_rgba(72,59,76,.11)]" />
      </div>
      <div className="mt-4 max-w-[118px] text-center">
        <span
          className={
            "inline-block px-2.5 py-1 text-[8.5px] font-bold uppercase tracking-[0.1em] " +
            (person.selected ? "bg-white/62 text-[#6E5B70]" : "bg-white/24 text-[#8E858F]")
          }
        >
          {person.tag}
        </span>
      </div>
    </motion.div>
  );
}

function ConversationArchaeology() {
  return (
    <section className="bg-[#FCFBF8] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <Reveal className="max-w-[520px] lg:sticky lg:top-32 lg:self-start">
          <Eyebrow color="#BF7458">One record returns</Eyebrow>
          <h2
            className="mt-5 text-[45px] font-medium leading-[0.94] tracking-[-0.06em] sm:text-[60px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            Silence is part of the story.
          </h2>
          <p className="mt-6 max-w-[500px] text-[16px] leading-[1.75] text-[#66605A]">
            Reopen does not create a new lead. It picks up an old story where it stopped.
          </p>
        </Reveal>

        <Reveal>
          <div className="relative min-h-[980px] pl-10 sm:pl-14">
            <div className="absolute bottom-0 left-[14px] top-0 w-px bg-[#D8D0C6] sm:left-[18px]" />

            <TimelineMoment top={0} date="12 FEB" tone="#C2A07B" title="Enquiry received" copy="Sarah asks about pricing and timing." />
            <TimelineMoment top={145} date="14 FEB" tone="#DDA34B" title="Quote sent" copy="A$4,800 proposal goes out." />
            <TimelineMoment top={290} date="28 FEB" tone="#9A9870" title="Conversation goes quiet" copy="No reply. No clear no. The record simply stops moving." />

            <div className="absolute left-[44px] right-0 top-[420px] sm:left-[62px]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B1AAA2]">March</div>
              <div className="mt-16 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C1BAB2]">April</div>
              <div className="mt-16 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#CDC6BF]">May</div>
              <div className="mt-16 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D5CFC8]">June</div>
              <div className="mt-16 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#DDD7D0]">July</div>
            </div>

            <div className="absolute left-[14px] top-[758px] h-3 w-3 -translate-x-1/2 rounded-full bg-[#BF7458] ring-4 ring-[#FCFBF8] sm:left-[18px]" />
            <div className="absolute left-[44px] right-0 top-[740px] sm:left-[62px]">
              <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#A66A55]">08 AUG · REOPEN</div>
              <div className="mt-3 max-w-[520px] text-[28px] font-medium leading-[1.05] tracking-[-0.04em] text-[#2B2926]" style={{ fontFamily: DISPLAY }}>
                Want us to update the quote we sent earlier this year?
              </div>
            </div>

            <div className="absolute bottom-0 left-[44px] right-0 bg-[#1E2B29] px-6 py-6 text-[#F7F4EE] shadow-[0_26px_60px_rgba(31,43,41,.13)] sm:left-[62px] sm:px-8">
              <div className="flex items-center gap-3">
                <Portrait cell={9} size={48} className="ring-2 ring-white/10" />
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/38">Sarah replied</div>
                  <div className="mt-1 text-[10px] text-white/36">Same customer record</div>
                </div>
              </div>
              <div className="mt-5 text-[24px] font-medium leading-[1.25] tracking-[-0.03em] text-white/94" style={{ fontFamily: DISPLAY }}>
                “Yes. Please send me the latest pricing.”
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Outreach stopped", "History preserved", "Sales notified"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-[9px] font-semibold text-white/58">
                    <Check size={10} className="text-[#B9C88C]" strokeWidth={2.5} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TimelineMoment({
  top,
  date,
  tone,
  title,
  copy,
}: {
  top: number;
  date: string;
  tone: string;
  title: string;
  copy: string;
}) {
  return (
    <>
      <div
        className="absolute left-[14px] h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-[#FCFBF8] sm:left-[18px]"
        style={{ top, backgroundColor: tone }}
      />
      <div className="absolute left-[44px] right-0 sm:left-[62px]" style={{ top: top - 10 }}>
        <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#A19890]">{date}</div>
        <div className="mt-2 text-[20px] font-semibold tracking-[-0.02em] text-[#2D2A27]">{title}</div>
        <div className="mt-2 max-w-[500px] text-[13px] leading-[1.65] text-[#716A64]">{copy}</div>
      </div>
    </>
  );
}

function CommercialSplit() {
  return (
    <section className="overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="bg-[#DCE0CC] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
          <div className="mx-auto max-w-[620px] lg:ml-auto lg:mr-0">
            <Reveal>
              <Eyebrow color="#667044">Use Reopen yourself</Eyebrow>
              <h2 className="mt-5 text-[44px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[58px]" style={{ fontFamily: DISPLAY }}>
                Keep the quiet pipeline visible.
              </h2>
              <p className="mt-6 max-w-[500px] text-[15px] leading-[1.75] text-[#59604D]">
                Reopen sits inside Growth so you can build audiences and run targeted reactivation whenever the business needs it.
              </p>

              <div className="mt-10 text-[38px] font-semibold tracking-[-0.045em] text-[#252A22]">
                A$699
                <span className="ml-1 text-[12px] font-medium tracking-normal text-[#69705F]">/mo + GST</span>
              </div>
              <div className="mt-2 text-[11px] text-[#727866]">Guided Launch from A$2,997 + GST</div>

              <a href={PRICING_URL} className="mt-10 inline-flex items-center gap-2 text-[12.5px] font-semibold text-[#252A22]">
                View Growth <ArrowRight size={14} />
              </a>
            </Reveal>
          </div>
        </div>

        <div className="bg-[#1E2B29] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
          <div className="mx-auto max-w-[620px] lg:ml-0 lg:mr-auto">
            <Reveal delay={0.04}>
              <Eyebrow color="#DDA34B">Ghost to Gold</Eyebrow>
              <h2 className="mt-5 text-[44px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[58px]" style={{ fontFamily: DISPLAY }}>
                Or hand us the archive.
              </h2>
              <p className="mt-6 max-w-[510px] text-[15px] leading-[1.75] text-white/56">
                Ghost to Gold is the done for you Reopen offer. We build and launch the campaign, with a managed option for monitoring and handoff.
              </p>

              <div className="mt-10 grid max-w-[440px] grid-cols-2 gap-8 border-t border-white/10 pt-6">
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/36">Sprint</div>
                  <div className="mt-2 text-[25px] font-semibold">A$997+</div>
                </div>
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/36">Managed</div>
                  <div className="mt-2 text-[25px] font-semibold">A$1,497+</div>
                </div>
              </div>

              <a href={BOOK_URL} className="mt-10 inline-flex items-center gap-2 text-[12.5px] font-semibold text-[#F7F4EE]">
                Ask about Ghost to Gold <ArrowRight size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="bg-[#F1E7D8] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[960px]">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-5 max-w-[760px] text-[42px] font-medium leading-[0.97] tracking-[-0.052em] sm:text-[54px]" style={{ fontFamily: DISPLAY }}>
            Before you reopen anything.
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-[#D4C6B8] border-y border-[#D4C6B8]">
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
        <span className="text-[14px] font-semibold text-[#2D2925] sm:text-[15px]">{q}</span>
        <ChevronDown
          size={17}
          className={"shrink-0 text-[#776D64] transition-transform " + (open ? "rotate-180" : "")}
        />
      </button>
      {open && <div className="max-w-[820px] pb-5 pr-10 text-[13.5px] leading-[1.75] text-[#6A625B]">{a}</div>}
    </div>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#BF7458] px-5 py-24 text-[#FFF9F5] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="pointer-events-none absolute inset-0" style={{
        background:
          "radial-gradient(circle at 14% 80%, rgba(231,224,234,.12), transparent 26%), radial-gradient(circle at 84% 12%, rgba(240,213,157,.16), transparent 28%)",
      }} />
      <div className="relative mx-auto max-w-[1100px] text-center">
        <Reveal>
          <Eyebrow color="rgba(255,255,255,.62)">Reopen what is already there</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-[980px] text-[46px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[64px] lg:text-[80px]" style={{ fontFamily: DISPLAY }}>
            You already paid to get their attention.
            <span className="block text-[#F8E2B5]">Don't pay twice before you look back.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-[650px] text-[15px] leading-[1.75] text-white/70">
            Reopen the conversations that still have somewhere to go.
          </p>
          <a
            href={BOOK_URL}
            className="mt-9 inline-flex h-[52px] items-center gap-2 rounded-full bg-[#1E2B29] px-7 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px"
          >
            Book a Call <ArrowRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
