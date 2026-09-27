import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";

export const Route = createFileRoute("/reactivation_v2")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Reopen | Lead & Customer Reactivation | Zapla" },
      {
        name: "description",
        content:
          "Zapla Reopen brings old enquiries, stale quotes and past customers back into conversation without blasting the whole database.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ReopenV2,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

const QUIET_FACES = [
  { cell: 0, left: 2, top: 7, w: 19, h: 29, opacity: .24 },
  { cell: 7, left: 25, top: 0, w: 17, h: 24, opacity: .34 },
  { cell: 12, left: 47, top: 7, w: 22, h: 33, opacity: .18 },
  { cell: 18, left: 76, top: 0, w: 18, h: 27, opacity: .27 },
  { cell: 4, left: 7, top: 45, w: 17, h: 26, opacity: .2 },
  { cell: 15, left: 29, top: 39, w: 21, h: 32, opacity: .29 },
  { cell: 21, left: 73, top: 42, w: 21, h: 32, opacity: .18 },
  { cell: 2, left: 2, top: 76, w: 19, h: 22, opacity: .15 },
  { cell: 11, left: 53, top: 77, w: 18, h: 22, opacity: .22 },
  { cell: 23, left: 78, top: 78, w: 17, h: 20, opacity: .14 },
] as const;

const FAQS = [
  {
    q: "What is Reopen?",
    a: "Reopen is Zapla's lead and customer reactivation solution. It identifies dormant enquiries, older quotes and past customers worth revisiting, then helps restart the conversation under rules you control.",
  },
  {
    q: "How is Reopen different from Follow-Up?",
    a: "Follow-Up keeps active opportunities moving while they are still live. Reopen goes back to opportunities that have already gone quiet.",
  },
  {
    q: "Does Reopen message everyone?",
    a: "No. Active opportunities, recent contacts, unsubscribed contacts and people who have already replied can be excluded before anything sends.",
  },
  {
    q: "What happens when someone replies?",
    a: "The outreach can stop automatically and the conversation can route back to your team with the previous history still attached.",
  },
  {
    q: "What is Ghost to Gold?",
    a: "Ghost to Gold is the done for you Reopen service. Sprint starts from A$997 plus GST. Managed starts from A$1,497 plus GST and adds monitoring and handoff.",
  },
] as const;

function ReopenV2() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#161715]" style={{ fontFamily: BODY }}>
      <Hero />
      <UnfinishedConversations />
      <ChooseWhoReturns />
      <Rewind />
      <Commercial />
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
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .18 }}
      transition={{ duration: reduced ? 0 : .58, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, color = "#877C72" }: { children: ReactNode; color?: string }) {
  return (
    <div className="text-[9px] font-semibold uppercase tracking-[0.24em]" style={{ color }}>
      {children}
    </div>
  );
}

function Portrait({
  cell,
  className = "",
  muted = false,
}: {
  cell: number;
  className?: string;
  muted?: boolean;
}) {
  const col = cell % 6;
  const row = Math.floor(cell / 6);
  return (
    <div
      className={"bg-[#D6C2AD] " + className}
      style={{
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition: `${(col / 5) * 100}% ${(row / 3) * 100}%`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
        filter: muted ? "grayscale(.94) saturate(.38) contrast(.94)" : undefined,
      }}
      aria-hidden="true"
    />
  );
}

function Hero() {
  const reduced = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#F2E8DA] px-5 pb-16 pt-[112px] sm:px-10 lg:px-16 lg:pb-20 lg:pt-[132px]">
      <div className="pointer-events-none absolute right-[-8%] top-[-12%] h-[560px] w-[560px] rounded-full bg-[#DCE0CC]/50 blur-3xl" />
      <div className="mx-auto max-w-[1450px]">
        <div className="flex items-center justify-between border-b border-[#CFC0B2] pb-3 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#8D8176]">
          <span>Zapla Reopen</span>
          <span>Lead & customer reactivation</span>
        </div>

        <div className="grid min-h-[760px] lg:grid-cols-[.82fr_1.18fr]">
          <div className="relative z-20 flex flex-col justify-center border-b border-[#CFC0B2] py-12 lg:border-b-0 lg:border-r lg:pr-14">
            <Reveal>
              <Eyebrow color="#BF7458">Reopen</Eyebrow>
              <h1
                className="mt-6 max-w-[650px] text-[58px] font-medium leading-[.88] tracking-[-.068em] sm:text-[76px] lg:text-[92px]"
                style={{ fontFamily: DISPLAY }}
              >
                They went quiet.
                <span className="mt-3 block text-[#BF7458]">That doesn't mean they're gone.</span>
              </h1>
              <p className="mt-7 max-w-[560px] text-[16px] leading-[1.72] text-[#655E57] sm:text-[18px]">
                Reopen finds old enquiries, stale quotes and past customers worth revisiting, then brings the right conversations back to life.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-white">
                  Book a Call <ArrowRight size={15} />
                </a>
                <a href="#unfinished" className="inline-flex h-[50px] items-center rounded-full border border-[#C9B8AA] bg-white/32 px-6 text-[13px] font-semibold text-[#302B27]">
                  See what went quiet
                </a>
              </div>
            </Reveal>

            <div className="mt-12 grid grid-cols-3 border-t border-[#D5C7BA] pt-5 text-[10px] text-[#877D74]">
              <div>
                <div className="text-[8px] font-semibold uppercase tracking-[.14em] text-[#9D9186]">Last activity</div>
                <div className="mt-2 text-[14px] font-semibold text-[#3A342F]">14 February</div>
              </div>
              <div>
                <div className="text-[8px] font-semibold uppercase tracking-[.14em] text-[#9D9186]">Quiet for</div>
                <div className="mt-2 text-[14px] font-semibold text-[#3A342F]">167 days</div>
              </div>
              <div>
                <div className="text-[8px] font-semibold uppercase tracking-[.14em] text-[#9D9186]">Last step</div>
                <div className="mt-2 text-[14px] font-semibold text-[#3A342F]">Quote sent</div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[700px] overflow-hidden">
            <div className="absolute inset-0">
              {QUIET_FACES.map((face, i) => (
                <motion.div
                  key={i}
                  className="absolute overflow-hidden"
                  style={{
                    left: face.left + "%",
                    top: face.top + "%",
                    width: face.w + "%",
                    height: face.h + "%",
                  }}
                  initial={reduced ? false : { opacity: 0, scale: .98 }}
                  whileInView={{ opacity: face.opacity, scale: 1 }}
                  viewport={{ once: true, amount: .35 }}
                  transition={{ duration: reduced ? 0 : .5, delay: reduced ? 0 : i * .035, ease: EASE }}
                >
                  <Portrait cell={face.cell} muted className="h-full w-full" />
                </motion.div>
              ))}
            </div>

            <div className="absolute left-[35%] top-[19%] z-20 h-[44%] w-[34%] border border-[#BF7458]/34 bg-[#E7CEC2]/35 p-3 shadow-[0_24px_65px_rgba(86,56,37,.12)]">
              <Portrait cell={9} className="h-full w-full" />
              <div className="absolute left-[-1px] top-[-33px] bg-[#BF7458] px-3 py-2 text-[8px] font-bold uppercase tracking-[.14em] text-white">
                167 days quiet
              </div>
              <div className="absolute bottom-[-38px] left-0 text-[9px] font-semibold uppercase tracking-[.13em] text-[#8E6D61]">
                Quote · A$4,800 · no decision
              </div>
            </div>

            <svg className="absolute inset-0 z-10 h-full w-full" viewBox="0 0 900 700" preserveAspectRatio="none" aria-hidden="true">
              <motion.path
                d="M 50 530 C 210 500, 250 330, 400 330 S 620 410, 835 300"
                fill="none"
                stroke="#BF7458"
                strokeWidth="2"
                strokeDasharray="4 8"
                initial={reduced ? false : { pathLength: 0, opacity: .2 }}
                whileInView={{ pathLength: 1, opacity: .62 }}
                viewport={{ once: true, amount: .4 }}
                transition={{ duration: reduced ? 0 : 1.2, ease: EASE }}
              />
            </svg>

            <motion.div
              className="absolute right-[4%] top-[37%] z-30 w-[29%] min-w-[220px] border-l-2 border-[#BF7458] bg-[#FFF9F3]/92 px-5 py-5 shadow-[0_18px_42px_rgba(70,47,32,.08)]"
              initial={reduced ? false : { opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: .45 }}
              transition={{ duration: reduced ? 0 : .5, delay: reduced ? 0 : .35, ease: EASE }}
            >
              <div className="text-[8px] font-bold uppercase tracking-[.15em] text-[#A66B57]">REOPEN</div>
              <div className="mt-3 text-[16px] font-medium leading-[1.45] text-[#2E2925]">
                Want us to update that quote?
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-[11%] right-[3%] z-30 w-[49%] bg-[#1E2B29] px-5 py-5 text-[#F7F4EE] shadow-[0_26px_65px_rgba(31,43,41,.2)]"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .45 }}
              transition={{ duration: reduced ? 0 : .5, delay: reduced ? 0 : .5, ease: EASE }}
            >
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                <Portrait cell={9} className="h-11 w-11" />
                <div>
                  <div className="text-[7px] font-semibold uppercase tracking-[.14em] text-white/36">Reply received</div>
                  <div className="mt-2 text-[17px] font-medium tracking-[-.02em]" style={{ fontFamily: DISPLAY }}>
                    “Yes. Send me the latest pricing.”
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[.12em] text-[#C3CF95]">
                  <span className="h-2 w-2 rounded-full bg-[#A9B47A]" />
                  Reopened
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UnfinishedConversations() {
  const items = [
    {
      cell: 0,
      kicker: "OLD ENQUIRY",
      title: "They asked. Then life happened.",
      note: "7 months quiet",
      color: "#D58C75",
      basis: "lg:col-span-5",
    },
    {
      cell: 18,
      kicker: "STALE QUOTE",
      title: "They never actually said no.",
      note: "5 months quiet",
      color: "#DDA34B",
      basis: "lg:col-span-4",
    },
    {
      cell: 7,
      kicker: "PAST CUSTOMER",
      title: "They already know your name.",
      note: "11 months quiet",
      color: "#A9B47A",
      basis: "lg:col-span-3",
    },
  ] as const;

  return (
    <section id="unfinished" className="bg-[#17201D] px-5 py-24 text-[#F7F4EE] sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1380px]">
        <Reveal className="max-w-[1050px]">
          <Eyebrow color="#DDA34B">Unfinished conversations</Eyebrow>
          <h2
            className="mt-5 text-[48px] font-medium leading-[.92] tracking-[-.062em] sm:text-[66px] lg:text-[82px]"
            style={{ fontFamily: DISPLAY }}
          >
            Your next opportunity may already
            <span className="block text-[#C7D19B]">know your name.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden bg-white/10 lg:grid-cols-12">
          {items.map((item, index) => (
            <Reveal key={item.kicker} className={item.basis} delay={index * .05}>
              <article className="relative min-h-[520px] overflow-hidden bg-[#17201D]">
                <Portrait cell={item.cell} muted={index !== 1} className="absolute inset-0 h-full w-full opacity-55" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17201D] via-[#17201D]/42 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="text-[8px] font-bold uppercase tracking-[.15em]" style={{ color: item.color }}>{item.kicker}</div>
                  <h3 className="mt-3 max-w-[430px] text-[32px] font-medium leading-[1.02] tracking-[-.045em]" style={{ fontFamily: DISPLAY }}>
                    {item.title}
                  </h3>
                  <div className="mt-5 flex items-center gap-3 text-[10px] text-white/45">
                    <span className="h-px w-8" style={{ backgroundColor: item.color }} />
                    {item.note}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-8 border-t border-white/10 pt-6 lg:grid-cols-[.55fr_1.45fr]">
          <div className="text-[9px] font-semibold uppercase tracking-[.16em] text-white/30">
            The active pipeline is visible.
            <br />
            The quiet one usually isn't.
          </div>
          <p className="max-w-[760px] text-[16px] leading-[1.75] text-white/50">
            Reopen looks for the conversations that stopped without a clear ending, then gives the right ones somewhere sensible to restart.
          </p>
        </div>
      </div>
    </section>
  );
}

function ChooseWhoReturns() {
  return (
    <section className="relative overflow-hidden bg-[#E7E0EA] px-5 py-24 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-16">
          <Reveal className="max-w-[560px]">
            <Eyebrow color="#7E687F">Selection before sending</Eyebrow>
            <h2 className="mt-5 text-[48px] font-medium leading-[.92] tracking-[-.062em] sm:text-[64px] lg:text-[76px]" style={{ fontFamily: DISPLAY }}>
              Not everyone should hear from you again.
            </h2>
            <p className="mt-6 max-w-[510px] text-[16px] leading-[1.75] text-[#625B64]">
              Reopen narrows the field first. Active quotes stay alone. Recent contacts stay alone. Unsubscribed contacts stay alone.
            </p>

            <div className="mt-10 border-t border-[#7E687F]/18">
              {[
                ["Active quote", "Leave alone"],
                ["Recent contact", "Leave alone"],
                ["Unsubscribed", "Leave alone"],
                ["Dormant opportunity", "Worth reviewing"],
              ].map(([label, action], i) => (
                <div key={label} className="flex items-center justify-between border-b border-[#7E687F]/14 py-4 text-[11px]">
                  <span className="font-semibold text-[#4B454D]">{label}</span>
                  <span className={i === 3 ? "font-semibold text-[#6E5870]" : "text-[#8E858F]"}>{action}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="relative h-[650px]">
              <div className="absolute left-[5%] top-[17%] h-[62%] w-[28%] overflow-hidden opacity-28">
                <Portrait cell={5} muted className="h-full w-full" />
                <div className="absolute inset-x-5 bottom-5 text-[8px] font-bold uppercase tracking-[.13em] text-[#817783]">ACTIVE QUOTE · LEAVE ALONE</div>
              </div>

              <div className="absolute left-[30%] top-[5%] z-20 h-[82%] w-[40%] overflow-hidden bg-[#D7B998] shadow-[0_32px_75px_rgba(70,58,74,.16)]">
                <Portrait cell={18} className="h-full w-full" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2F2630]/70 via-transparent to-transparent p-6 pt-24 text-white">
                  <div className="text-[8px] font-bold uppercase tracking-[.13em] text-[#F0C5B4]">5 MONTHS QUIET</div>
                  <div className="mt-2 text-[22px] font-medium tracking-[-.025em]" style={{ fontFamily: DISPLAY }}>Worth reopening.</div>
                </div>
                <span className="absolute right-5 top-5 h-3 w-3 bg-[#7E687F]" />
              </div>

              <div className="absolute right-[2%] top-[24%] h-[57%] w-[27%] overflow-hidden opacity-22">
                <Portrait cell={12} muted className="h-full w-full" />
                <div className="absolute inset-x-5 bottom-5 text-[8px] font-bold uppercase tracking-[.13em] text-[#817783]">RECENT CONTACT · LEAVE ALONE</div>
              </div>

              <div className="absolute left-[14%] top-[3%] h-px w-[20%] bg-[#7E687F]/20" />
              <div className="absolute right-[8%] bottom-[8%] h-px w-[27%] bg-[#7E687F]/20" />
              <div className="absolute bottom-[4%] left-[34%] text-[9px] font-semibold uppercase tracking-[.15em] text-[#756B77]">
                Selected because the conversation stopped without a clear ending.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Rewind() {
  const reduced = !!useReducedMotion();

  const timeline = [
    ["12 FEB", "Enquiry received", "Sarah asks about pricing and timing.", "#C2A07B"],
    ["14 FEB", "Quote sent", "A$4,800 proposal sent.", "#DDA34B"],
    ["28 FEB", "Conversation goes quiet", "No clear no. No next step either.", "#9A9870"],
    ["08 AUG", "Reopen", "Want us to update the quote we sent earlier this year?", "#BF7458"],
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#F8F5F0] px-5 py-24 sm:px-10 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute right-[-2%] top-[3%] text-[220px] font-medium leading-none tracking-[-.08em] text-[#EFE9E2] sm:text-[300px] lg:text-[420px]" style={{ fontFamily: DISPLAY }}>
        167
      </div>

      <div className="relative mx-auto grid max-w-[1300px] gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <Reveal className="max-w-[500px]">
          <Eyebrow color="#BF7458">One conversation, rewound</Eyebrow>
          <h2 className="mt-5 text-[48px] font-medium leading-[.93] tracking-[-.062em] sm:text-[64px] lg:text-[76px]" style={{ fontFamily: DISPLAY }}>
            Five months of silence.
            <span className="block text-[#BF7458]">One reason to speak again.</span>
          </h2>
          <p className="mt-6 max-w-[480px] text-[16px] leading-[1.75] text-[#68615B]">
            Reopen restores the context before it starts anything new. Same customer. Same quote. Same history.
          </p>
        </Reveal>

        <div className="relative">
          <div className="absolute bottom-[120px] left-[17px] top-[20px] w-px bg-[#D8D0C7]" />

          {timeline.map(([date, title, copy, tone], index) => (
            <motion.div
              key={date}
              className="relative grid grid-cols-[52px_1fr] gap-5 pb-8 last:pb-0"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .5 }}
              transition={{ duration: reduced ? 0 : .45, delay: reduced ? 0 : index * .06, ease: EASE }}
            >
              <div className="relative z-10 flex justify-center pt-1">
                <span className="h-3 w-3 ring-4 ring-[#F8F5F0]" style={{ backgroundColor: tone }} />
              </div>
              <div className={index === 3 ? "border-l-2 border-[#BF7458] bg-[#F3E4DA] px-5 py-5" : "border-b border-[#DDD5CC] pb-8"}>
                <div className="text-[8px] font-bold uppercase tracking-[.14em] text-[#9A9189]">{date}</div>
                <div className="mt-2 text-[18px] font-semibold text-[#2D2A27]">{title}</div>
                <div className="mt-2 max-w-[600px] text-[13px] leading-[1.65] text-[#736C66]">{copy}</div>
              </div>
            </motion.div>
          ))}

          <div className="ml-[52px] mt-5 bg-[#1E2B29] px-6 py-6 text-[#F7F4EE] shadow-[0_24px_58px_rgba(31,43,41,.14)]">
            <div className="grid gap-5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <Portrait cell={9} className="h-14 w-14" />
              <div>
                <div className="text-[8px] font-semibold uppercase tracking-[.14em] text-white/34">Reply received</div>
                <div className="mt-2 text-[23px] font-medium leading-[1.28] tracking-[-.028em]" style={{ fontFamily: DISPLAY }}>
                  “Yes. Please send me the latest pricing.”
                </div>
              </div>
              <div className="space-y-2 text-[9px] font-semibold text-white/55">
                {["Outreach stopped", "History preserved", "Sales notified"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check size={10} className="text-[#B9C88C]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Commercial() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="relative overflow-hidden bg-[#DCE0CC] px-5 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full border border-[#657044]/12" />
        <div className="relative mx-auto max-w-[610px] lg:ml-auto lg:mr-0">
          <Eyebrow color="#667044">Reopen inside Growth</Eyebrow>
          <h2 className="mt-5 text-[44px] font-medium leading-[.95] tracking-[-.057em] sm:text-[56px]" style={{ fontFamily: DISPLAY }}>
            Keep Reopen in your toolkit.
          </h2>
          <p className="mt-6 max-w-[510px] text-[15px] leading-[1.75] text-[#59604D]">
            Build audiences and run targeted reactivation whenever the business needs it.
          </p>
          <div className="mt-10 text-[38px] font-semibold tracking-[-.045em] text-[#252A22]">
            A$699 <span className="text-[12px] font-medium tracking-normal text-[#69705F]">/mo + GST</span>
          </div>
          <div className="mt-2 text-[11px] text-[#727866]">Guided Launch from A$2,997 + GST</div>
          <a href={PRICING_URL} className="mt-10 inline-flex items-center gap-2 text-[12.5px] font-semibold text-[#252A22]">
            View Growth <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <div className="relative overflow-hidden bg-[#BF7458] px-5 py-20 text-[#FFF9F5] sm:px-10 lg:px-16 lg:py-24">
        <div className="pointer-events-none absolute -bottom-24 right-[-4%] h-80 w-80 rounded-full border border-white/10" />
        <div className="relative mx-auto max-w-[610px] lg:ml-0 lg:mr-auto">
          <Eyebrow color="#F2D6A5">Ghost to Gold</Eyebrow>
          <h2 className="mt-5 text-[44px] font-medium leading-[.95] tracking-[-.057em] sm:text-[56px]" style={{ fontFamily: DISPLAY }}>
            Or hand us the quiet list.
          </h2>
          <p className="mt-6 max-w-[510px] text-[15px] leading-[1.75] text-white/72">
            Ghost to Gold is the done for you Reopen offer. We build and launch the campaign, with a managed option for monitoring and handoff.
          </p>
          <div className="mt-10 grid max-w-[430px] grid-cols-2 gap-8 border-t border-white/20 pt-6">
            <div><div className="text-[9px] uppercase tracking-[.14em] text-white/48">Sprint</div><div className="mt-2 text-[25px] font-semibold">A$997+</div></div>
            <div><div className="text-[9px] uppercase tracking-[.14em] text-white/48">Managed</div><div className="mt-2 text-[25px] font-semibold">A$1,497+</div></div>
          </div>
          <a href={BOOK_URL} className="mt-10 inline-flex items-center gap-2 text-[12.5px] font-semibold text-white">
            Ask about Ghost to Gold <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="bg-[#F2E8DA] px-5 py-20 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[980px]">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-5 max-w-[760px] text-[42px] font-medium leading-[.97] tracking-[-.052em] sm:text-[54px]" style={{ fontFamily: DISPLAY }}>
          Before you reopen anything.
        </h2>
        <div className="mt-10 divide-y divide-[#D4C6B8] border-y border-[#D4C6B8]">
          {FAQS.map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpen(v => !v)} aria-expanded={open} className="flex w-full items-center justify-between gap-6 py-5 text-left">
        <span className="text-[14px] font-semibold text-[#2D2925] sm:text-[15px]">{q}</span>
        <ChevronDown size={17} className={"shrink-0 text-[#776D64] transition-transform " + (open ? "rotate-180" : "")} />
      </button>
      {open && <div className="max-w-[820px] pb-5 pr-10 text-[13.5px] leading-[1.75] text-[#6A625B]">{a}</div>}
    </div>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#17201D] px-5 py-24 text-[#F7F5F1] sm:px-10 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute right-[-10%] top-[-30%] h-[650px] w-[650px] rounded-full bg-[#A9B47A]/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1120px]">
        <Eyebrow color="#DDA34B">Before you buy another lead</Eyebrow>
        <h2 className="mt-5 max-w-[1040px] text-[48px] font-medium leading-[.92] tracking-[-.06em] sm:text-[66px] lg:text-[82px]" style={{ fontFamily: DISPLAY }}>
          Look at the conversations
          <span className="block text-[#C7D19B]">you already paid to start.</span>
        </h2>
        <p className="mt-6 max-w-[620px] text-[15px] leading-[1.75] text-white/50">
          Reopen the ones that still have somewhere to go.
        </p>
        <a href={BOOK_URL} className="mt-9 inline-flex h-[52px] items-center gap-2 rounded-full bg-[#F7F5F1] px-7 text-[13px] font-semibold text-[#171816]">
          Book a Call <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}
