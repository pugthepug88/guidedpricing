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
      <div className="pointer-events-none absolute -left-28 top-[10%] h-[520px] w-[520px] rounded-full bg-[#DCE0CC]/32 blur-3xl" />
      <div className="pointer-events-none absolute left-[28%] top-[8%] h-[480px] w-[480px] rounded-full bg-[#E7CEC2]/28 blur-3xl" />
      <div className="pointer-events-none absolute right-[-12%] bottom-[-22%] h-[560px] w-[560px] rounded-full bg-[#E7E0EA]/24 blur-3xl" />

      <div className="relative mx-auto grid min-h-[760px] max-w-[1540px] items-center gap-6 lg:grid-cols-[1.18fr_.82fr] lg:gap-8">
        <Reveal className="order-2 lg:order-1">
          <ArchiveScene />
        </Reveal>

        <Reveal className="order-1 max-w-[610px] lg:order-2 lg:justify-self-end" delay={0.04}>
          <div className="flex items-center gap-4">
            <Eyebrow>Reopen</Eyebrow>
            <span className="h-px flex-1 bg-[#D4C5B8]" />
          </div>

          <h1
            className="mt-8 text-[52px] font-medium leading-[0.88] tracking-[-0.068em] sm:text-[70px] lg:text-[82px]"
            style={{ fontFamily: DISPLAY }}
          >
            <span className="block text-[#151817]">They went quiet.</span>
            <span className="mt-2 block text-[#BF7458]">That doesn't</span>
            <span className="block text-[#BF7458]">mean they're gone.</span>
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
    { cell: 4, name: "Daniel Brooks", type: "Enquiry", quiet: "132 days quiet", left: -1, top: 4, rotate: -2 },
    { cell: 13, name: "Priya Sharma", type: "Quote sent", quiet: "96 days quiet", left: 37, top: 15, rotate: 1 },
    { cell: 18, name: "Marcus Lee", type: "Enquiry", quiet: "201 days quiet", left: -3, top: 36, rotate: -1 },
    { cell: 7, name: "Ellie Carter", type: "Quote sent", quiet: "124 days quiet", left: 0, top: 66, rotate: 2 },
    { cell: 21, name: "Tom Bennett", type: "Past customer", quiet: "188 days quiet", left: 8, top: 84, rotate: -1 },
    { cell: 11, name: "Hannah Brooks", type: "Enquiry", quiet: "142 days quiet", left: 45, top: 84, rotate: 1 },
  ] as const;

  return (
    <div className="relative mx-auto min-h-[610px] w-full max-w-[900px] sm:min-h-[690px] lg:min-h-[760px]">
      <div className="pointer-events-none absolute -left-[8%] top-[4%] h-[90%] w-[86%] bg-[radial-gradient(circle_at_43%_44%,rgba(231,206,194,.42),transparent_28%),radial-gradient(circle_at_27%_75%,rgba(220,224,204,.46),transparent_30%)]" />

      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 900 760" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 70 100 C 270 82, 430 135, 555 268 C 665 385, 660 540, 806 606" fill="none" stroke="#C98D74" strokeWidth="1.45" strokeDasharray="5 7" opacity=".52" />
        <path d="M 120 645 C 330 620, 370 490, 515 420 C 615 370, 735 330, 835 352" fill="none" stroke="#98A06D" strokeWidth="1.35" strokeDasharray="4 7" opacity=".52" />
        <path d="M 220 720 C 375 585, 380 286, 690 92" fill="none" stroke="#D5C8BC" strokeWidth="1.05" opacity=".58" />
        <circle cx="555" cy="268" r="6" fill="#BF7458" opacity=".9" />
        <circle cx="660" cy="540" r="6" fill="#8E9C5C" opacity=".95" />
        <circle cx="690" cy="92" r="5" fill="#D0C3B7" />
      </svg>

      <div className="absolute left-[48%] top-[3%] opacity-35">
        <AutumnAvatar cell={2} size={48} muted />
      </div>
      <div className="absolute left-[76%] top-[8%] opacity-28">
        <AutumnAvatar cell={16} size={48} muted />
      </div>

      {backgroundRecords.map((record, index) => (
        <motion.div
          key={record.name}
          className="absolute w-[300px] rounded-[22px] border border-white/45 bg-[#FBF8F2]/58 px-4 py-4 shadow-[0_12px_35px_rgba(70,54,40,.06)] backdrop-blur-[2px]"
          style={{
            left: record.left + "%",
            top: record.top + "%",
            rotate: record.rotate,
            filter: "blur(.55px)",
          }}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: index < 2 ? 0.32 : 0.25, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reduced ? 0 : 0.48, delay: reduced ? 0 : index * 0.03, ease: EASE }}
        >
          <div className="flex items-center gap-3">
            <AutumnAvatar cell={record.cell} size={58} muted />
            <div className="min-w-0">
              <div className="truncate text-[12px] font-semibold text-[#675F58]">{record.name}</div>
              <div className="mt-1 text-[10px] text-[#978D84]">{record.type}</div>
              <div className="mt-0.5 text-[10px] text-[#A1978E]">{record.quiet}</div>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="h-2.5 w-[72%] rounded-full bg-black/[0.055]" />
            <div className="h-2.5 w-[45%] rounded-full bg-black/[0.045]" />
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
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#1677FF] text-white">
            <MessageSquare size={14} />
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
