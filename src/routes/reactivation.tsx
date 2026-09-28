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
const PETALS_ICON = "data:image/png;base64,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";

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
  { cell: 2, x: 5, y: 13, size: 74, rotate: -3, opacity: 0.28, label: "Old enquiry", meta: "7 months quiet" },
  { cell: 13, x: 34, y: 9, size: 82, rotate: 2, opacity: 0.24, label: "Past customer", meta: "11 months quiet" },
  { cell: 20, x: 81, y: 16, size: 78, rotate: -2, opacity: 0.26, label: "Quote sent", meta: "4 months quiet" },
  { cell: 6, x: 8, y: 56, size: 84, rotate: 2, opacity: 0.22, label: "Old enquiry", meta: "5 months quiet" },
  { cell: 17, x: 79, y: 55, size: 82, rotate: -2, opacity: 0.24, label: "Past customer", meta: "14 months quiet" },
  { cell: 11, x: 24, y: 86, size: 76, rotate: 2, opacity: 0.19, label: "Quote sent", meta: "8 months quiet" },
  { cell: 23, x: 86, y: 84, size: 72, rotate: -2, opacity: 0.18, label: "Old enquiry", meta: "9 months quiet" },
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

function ReactivationPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F1] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <Hero />
      <QuietMoments />
      <AudienceSection />
      <ReopenedStory />
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
    <section className="relative overflow-hidden bg-[#F7F2EA] px-5 pb-10 pt-[108px] sm:px-10 sm:pt-[118px] lg:px-16 lg:pb-12 lg:pt-[126px]">

      <div className="relative mx-auto grid min-h-[760px] max-w-[1540px] items-center gap-6 lg:grid-cols-[1.18fr_.82fr] lg:gap-8">
        <Reveal className="order-2 lg:order-1">
          <ArchiveScene />
        </Reveal>

        <Reveal className="order-1 max-w-[660px] lg:order-2 lg:justify-self-end" delay={0.04}>
          <div className="flex items-center gap-4">
            <Eyebrow>Reopen</Eyebrow>
            <span className="h-px flex-1 bg-[#D4C5B8]" />
          </div>

          <h1
            className="mt-8 text-[52px] font-medium leading-[0.88] tracking-[-0.068em] sm:text-[70px] lg:text-[78px]"
            style={{ fontFamily: DISPLAY }}
          >
            <span className="block text-[#151817] lg:whitespace-nowrap">They went quiet.</span>
            <span className="mt-2 block text-[#BF7458] lg:whitespace-nowrap">That doesn't mean</span>
            <span className="block text-[#BF7458] lg:whitespace-nowrap">they're gone.</span>
          </h1>

          <p className="mt-7 max-w-[575px] text-[16px] leading-[1.68] text-[#625D57] sm:text-[18px]">
            Zapla finds old enquiries, stale quotes and past customers worth reopening, reaches out with the right message, and stops the moment they reply.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BOOK_URL}
              className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#1E2B29] px-7 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px"
            >
              Book a Call <ArrowRight size={15} />
            </a>
            <a
              href="#how-reopen-works"
              className="inline-flex h-[52px] items-center rounded-full border border-[#C9BDB2] bg-white/40 px-7 text-[13px] font-semibold text-[#1F211E]"
            >
              See how Reopen works
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 border-t border-[#D7CCC2] pt-5">
            <div className="pr-4">
              <div className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#9A8F85]">Last activity</div>
              <div className="mt-2 text-[18px] font-medium tracking-[-0.02em] text-[#302C28]">14 February</div>
            </div>
            <div className="border-l border-[#D7CCC2] px-4">
              <div className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#9A8F85]">Days since reply</div>
              <div className="mt-2 text-[18px] font-medium tracking-[-0.02em] text-[#302C28]">167</div>
            </div>
            <div className="border-l border-[#D7CCC2] pl-4">
              <div className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#9A8F85]">Status</div>
              <div className="mt-2 flex items-center gap-2 text-[18px] font-medium tracking-[-0.02em] text-[#302C28]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#879653]" />
                Reopened
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArchiveScene() {
  const reduced = !!useReducedMotion();

  const backgroundRecords = [
    { cell: 4, name: "Daniel Brooks", type: "Enquiry", quiet: "132 days quiet", left: 1, top: 4, rotate: -2 },
    { cell: 13, name: "Priya Sharma", type: "Quote sent", quiet: "96 days quiet", left: 37, top: 15, rotate: 1 },
    { cell: 18, name: "Marcus Lee", type: "Enquiry", quiet: "201 days quiet", left: 0, top: 36, rotate: -1 },
    { cell: 7, name: "Ellie Carter", type: "Quote sent", quiet: "124 days quiet", left: 0, top: 66, rotate: 2 },
    { cell: 21, name: "Tom Bennett", type: "Past customer", quiet: "188 days quiet", left: 8, top: 84, rotate: -1 },
    { cell: 11, name: "Hannah Brooks", type: "Enquiry", quiet: "142 days quiet", left: 45, top: 84, rotate: 1 },
  ] as const;

  return (
    <div className="relative mx-auto min-h-[610px] w-full max-w-[900px] sm:min-h-[690px] lg:min-h-[760px]">
      <div className="pointer-events-none absolute -left-[8%] top-[4%] h-[90%] w-[86%] bg-[radial-gradient(circle_at_43%_44%,rgba(196,187,177,.08),transparent_34%)]" />

      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 900 760" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 70 100 C 270 82, 430 135, 555 268 C 665 385, 660 540, 806 606" fill="none" stroke="#C98D74" strokeWidth="1.45" strokeDasharray="5 7" opacity=".52" />
        <path d="M 120 645 C 330 620, 370 490, 515 420 C 615 370, 735 330, 835 352" fill="none" stroke="#98A06D" strokeWidth="1.35" strokeDasharray="4 7" opacity=".52" />
        <path d="M 220 720 C 375 585, 380 286, 690 92" fill="none" stroke="#D5C8BC" strokeWidth="1.05" opacity=".58" />
        <circle cx="555" cy="268" r="6" fill="#BF7458" opacity=".9" />
        <circle cx="660" cy="540" r="6" fill="#8E9C5C" opacity=".95" />
        <circle cx="690" cy="92" r="5" fill="#D0C3B7" />
      </svg>

      <div className="absolute left-[48%] top-[3%] opacity-45">
        <AutumnAvatar cell={2} size={48} muted />
      </div>
      <div className="absolute left-[76%] top-[8%] opacity-38">
        <AutumnAvatar cell={16} size={48} muted />
      </div>

      {backgroundRecords.map((record, index) => (
        <motion.div
          key={record.name}
          className="absolute w-[300px] rounded-[22px] border border-white/65 bg-[#FBF8F2]/76 px-4 py-4 shadow-[0_12px_35px_rgba(70,54,40,.07)] backdrop-blur-[1px]"
          style={{
            left: record.left + "%",
            top: record.top + "%",
            rotate: record.rotate,
            filter: "blur(.12px)",
          }}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: index < 2 ? 0.48 : 0.39, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reduced ? 0 : 0.48, delay: reduced ? 0 : index * 0.03, ease: EASE }}
        >
          <div className="flex items-center gap-3">
            <AutumnAvatar cell={record.cell} size={58} muted />
            <div className="min-w-0">
              <div className="truncate text-[12px] font-semibold text-[#5F5851]">{record.name}</div>
              <div className="mt-1 text-[10px] text-[#887E75]">{record.type}</div>
              <div className="mt-0.5 text-[10px] text-[#938980]">{record.quiet}</div>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="h-2.5 w-[72%] rounded-full bg-black/[0.07]" />
            <div className="h-2.5 w-[45%] rounded-full bg-black/[0.055]" />
          </div>
        </motion.div>
      ))}

      <motion.div
        className="absolute left-[27%] top-[28%] z-20 w-[545px] max-w-[62%] rounded-[24px] border border-white/72 bg-[#FCF9F4]/95 p-5 shadow-[0_30px_72px_rgba(76,55,40,.17)] backdrop-blur-sm"
        initial={reduced ? false : { opacity: 0, y: 10, scale: .97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.42 }}
        transition={{ duration: reduced ? 0 : 0.58, delay: reduced ? 0 : 0.12, ease: EASE }}
      >
        <div className="flex items-start gap-5">
          <div className="rounded-full bg-[#EBC5B3] p-2.5">
            <AutumnAvatar cell={9} size={104} />
          </div>
          <div className="min-w-0 flex-1 pt-1">
            <div className="flex items-center justify-between gap-4">
              <div className="text-[20px] font-semibold tracking-[-0.02em] text-[#282522]">Sarah Nguyen</div>
              <span className="rounded-full bg-[#EAE9E4] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-[#6D6861]">Dormant</span>
            </div>
            <div className="mt-2 text-[14px] text-[#69615A]">
              Quote sent <span className="px-2 text-[#B0A69E]">•</span> A$4,800
            </div>
            <div className="mt-1 text-[14px] text-[#766E67]">167 days quiet</div>
            <div className="mt-5 space-y-2">
              <div className="h-3 w-[72%] rounded-full bg-black/[0.075]" />
              <div className="h-3 w-[50%] rounded-full bg-black/[0.06]" />
            </div>
          </div>
        </div>
      </motion.div>

      <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" viewBox="0 0 900 760" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 430 405 C 455 420, 470 450, 488 466" fill="none" stroke="#B75E3F" strokeWidth="2.2" />
        <circle cx="430" cy="405" r="6" fill="#B75E3F" />
        <circle cx="488" cy="466" r="5" fill="#B75E3F" />
        <path d="M 545 525 C 560 545, 575 565, 600 580" fill="none" stroke="#76834F" strokeWidth="2.1" />
        <circle cx="545" cy="525" r="5" fill="#76834F" />
        <path d="M 635 630 C 655 645, 672 655, 692 662" fill="none" stroke="#76834F" strokeWidth="2.1" />
      </svg>

      <motion.div
        className="absolute left-[50%] top-[52%] z-30 w-[320px] max-w-[38%] rounded-[18px] border border-[#E6D9CF] bg-white/96 px-5 py-4 shadow-[0_18px_45px_rgba(74,53,39,.10)]"
        initial={reduced ? false : { opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.42 }}
        transition={{ duration: reduced ? 0 : 0.48, delay: reduced ? 0 : 0.3, ease: EASE }}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center">
            <img src={PETALS_ICON} alt="" className="h-8 w-8 object-contain" />
          </div>
          <div>
            <div className="text-[14px] font-semibold leading-[1.45] text-[#292623]">Want us to update that quote?</div>
            <div className="mt-2 text-[9px] text-[#A0968C]">10:14 AM</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute left-[60%] top-[66%] z-30 w-[360px] max-w-[43%] rounded-[18px] border border-[#C7D0A7] bg-[#E8EBD9]/97 px-5 py-4 shadow-[0_18px_45px_rgba(77,85,54,.10)]"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.42 }}
        transition={{ duration: reduced ? 0 : 0.48, delay: reduced ? 0 : 0.44, ease: EASE }}
      >
        <div className="flex items-center gap-3">
          <AutumnAvatar cell={9} size={44} />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold leading-[1.45] text-[#2E3128]">Yes. Please send me the latest pricing.</div>
            <div className="mt-2 flex items-center gap-2 text-[9px] text-[#7B8367]">
              10:27 AM <Check size={11} strokeWidth={2.4} />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute left-[82%] top-[63%] z-40">
        <span className="absolute h-[18px] w-[3px] -rotate-[12deg] bg-[#70804B]" />
        <span className="absolute left-3 top-[-4px] h-[18px] w-[3px] rotate-[8deg] bg-[#70804B]" />
        <span className="absolute left-6 top-[2px] h-[16px] w-[3px] rotate-[28deg] bg-[#70804B]" />
      </div>

      <motion.div
        className="absolute bottom-[6%] left-[64%] z-30 flex w-[370px] max-w-[44%] items-center justify-between gap-4 rounded-[18px] border border-[#D5D7C5] bg-[#FAF8F2]/96 px-5 py-4 shadow-[0_18px_45px_rgba(61,64,46,.08)]"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.42 }}
        transition={{ duration: reduced ? 0 : 0.48, delay: reduced ? 0 : 0.56, ease: EASE }}
      >
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-[#879653]" />
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-[#E5E8D5] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#637044]">Reopened</div>
            <div className="h-7 w-px bg-[#D5D3C9]" />
            <div>
              <div className="text-[11px] font-semibold text-[#373631]">Sarah is back</div>
              <div className="mt-1 text-[9px] text-[#77726C]">Resumed conversation</div>
            </div>
          </div>
        </div>
        <ArrowRight size={16} className="text-[#5E6257]" />
      </motion.div>
    </div>
  );
}

function QuietMoments() {
  return (
    <section className="bg-[#FCFBF8] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow tone="muted">Where opportunities go quiet</Eyebrow>
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
          <Eyebrow tone="muted">Not another database blast</Eyebrow>
          <h2
            className="mt-4 text-[43px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[58px] lg:text-[70px]"
            style={{ fontFamily: DISPLAY }}
          >
            Don't wake everyone up.
            <span className="block text-[#7E687F]">Wake the right ones.</span>
          </h2>
          <p className="mt-6 max-w-[540px] text-[15px] leading-[1.75] text-[#645D66] sm:text-[17px]">
            Reopen starts with selection, not sending. Active opportunities stay out. Recent contacts stay out. Unsubscribed people stay out. Only the right dormant records move forward.
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
          <Eyebrow>Context stays attached</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[60px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            A reply doesn't become a brand-new lead.
            <span className="block text-[#BF7458]">It reopens the same customer story.</span>
          </h2>
          <p className="mt-6 max-w-[720px] text-[15px] leading-[1.75] text-[#6A625B] sm:text-[17px]">
            The enquiry, quote, notes and messages stay with the same customer record, so your team picks up where the conversation left off.
          </p>
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
            Questions before you reopen old conversations.
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
          <Eyebrow tone="light">Before you buy another lead</Eyebrow>
          <h2
            className="mx-auto mt-5 max-w-[960px] text-[45px] font-medium leading-[0.93] tracking-[-0.058em] sm:text-[62px] lg:text-[76px]"
            style={{ fontFamily: DISPLAY }}
          >
            Look at the conversations you already paid to start.
          </h2>
          <p className="mx-auto mt-6 max-w-[650px] text-[15px] leading-[1.75] text-white/72">
            Reopen the ones that still have somewhere to go.
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
