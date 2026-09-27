import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";

export const Route = createFileRoute("/reactivation_v2")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Reopen V2 | Lead & Customer Reactivation | Zapla" },
      {
        name: "description",
        content:
          "Zapla Reopen helps service businesses bring dormant enquiries, stale quotes and past customers back into conversation without blasting the whole database.",
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
    q: "Does Reopen message everyone?",
    a: "No. The audience is selected first. Active opportunities, recent contacts, unsubscribed contacts and people who already replied can be excluded before anything sends.",
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

const CAST = [
  { cell: 0, label: "7 months quiet", status: "ELIGIBLE", selected: true },
  { cell: 5, label: "Active quote", status: "LEAVE ALONE", selected: false },
  { cell: 7, label: "Past customer", status: "ELIGIBLE", selected: true },
  { cell: 12, label: "Recent contact", status: "LEAVE ALONE", selected: false },
  { cell: 18, label: "5 months quiet", status: "ELIGIBLE", selected: true },
  { cell: 21, label: "Unsubscribed", status: "LEAVE ALONE", selected: false },
] as const;

function ReactivationV2Page() {
  return (
    <main className="min-h-screen bg-[#F7F5F1] text-[#171816] antialiased" style={{ fontFamily: BODY }}>
      <TimeHero />
      <DormantField />
      <SelectionCast />
      <RewindStory />
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
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduced ? 0 : 0.58, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({
  children,
  color = "#7A7169",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <div
      className="text-[9px] font-semibold uppercase tracking-[0.24em]"
      style={{ color }}
    >
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
  const column = cell % 6;
  const row = Math.floor(cell / 6);

  return (
    <div
      className={"bg-[#D8C6B2] " + className}
      style={{
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition: `${(column / 5) * 100}% ${(row / 3) * 100}%`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
        filter: muted ? "grayscale(.96) saturate(.34) contrast(.93)" : undefined,
      }}
      aria-hidden="true"
    />
  );
}

function TimeHero() {
  const reduced = !!useReducedMotion();

  return (
    <section className="relative min-h-[980px] overflow-hidden bg-[#F0E5D7] px-5 pb-12 pt-[108px] sm:px-10 sm:pt-[120px] lg:px-16 lg:pt-[132px]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 76% 12%, rgba(169,180,122,.26), transparent 24%), radial-gradient(circle at 12% 80%, rgba(191,116,88,.12), transparent 22%)",
        }}
      />

      <div className="relative mx-auto max-w-[1460px]">
        <div className="flex items-center justify-between border-b border-[#CDBEAF] pb-3 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#8F8277]">
          <span>Zapla Reopen</span>
          <span>Lead & customer reactivation</span>
        </div>

        <div className="grid min-h-[810px] lg:grid-cols-[.82fr_1.18fr]">
          <div className="flex flex-col justify-between border-b border-[#CDBEAF] py-12 lg:border-b-0 lg:border-r lg:py-16 lg:pr-14">
            <Reveal>
              <Eyebrow color="#BF7458">Reopen</Eyebrow>
              <h1
                className="mt-6 max-w-[700px] text-[58px] font-medium leading-[0.88] tracking-[-0.07em] sm:text-[80px] lg:text-[98px]"
                style={{ fontFamily: DISPLAY }}
              >
                They went quiet.
                <span className="mt-3 block text-[#BF7458]">
                  That doesn't mean they're gone.
                </span>
              </h1>

              <p className="mt-7 max-w-[590px] text-[16px] leading-[1.72] text-[#655E57] sm:text-[18px]">
                Reopen finds old enquiries, stale quotes and past customers worth revisiting, then brings the right conversations back to life.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={BOOK_URL}
                  className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px"
                >
                  Book a Call <ArrowRight size={15} />
                </a>
                <a
                  href="#quiet-pipeline"
                  className="inline-flex h-[50px] items-center rounded-full border border-[#C8B7A8] bg-white/34 px-6 text-[13px] font-semibold text-[#28231F]"
                >
                  See what went quiet
                </a>
              </div>
            </Reveal>

            <div className="mt-14 grid grid-cols-2 gap-8 border-t border-[#D4C5B7] pt-5">
              <div>
                <div className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#96897D]">Last activity</div>
                <div className="mt-2 text-[20px] font-medium tracking-[-0.03em] text-[#3A342F]" style={{ fontFamily: DISPLAY }}>
                  14 February
                </div>
              </div>
              <div>
                <div className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#96897D]">Days since reply</div>
                <div className="mt-2 text-[20px] font-medium tracking-[-0.03em] text-[#3A342F]" style={{ fontFamily: DISPLAY }}>
                  167
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[730px] overflow-hidden lg:min-h-0">
            <div className="absolute left-6 top-7 z-20 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#8C8075] sm:left-8">
              167 days quiet
            </div>
            <div className="absolute right-6 top-7 z-20 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#A09185] sm:right-8">
              Quote · A$4,800
            </div>

            <motion.div
              className="absolute bottom-0 left-0 top-[78px] w-[56%] overflow-hidden"
              initial={reduced ? false : { opacity: 0, scale: 1.015 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
            >
              <Portrait cell={9} muted className="h-full w-full scale-[1.04]" />
              <div className="absolute inset-0 bg-[#7A6B5C]/10 mix-blend-multiply" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#F0E5D7] via-[#F0E5D7]/20 to-transparent pt-40" />
            </motion.div>

            <div className="absolute bottom-0 left-[56%] top-[78px] w-px bg-[#CDBEAF]" />

            <div className="absolute left-[61%] right-[4%] top-[22%]">
              <div className="border-t border-[#CABAAA] pt-4">
                <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#9D6B58]">
                  Last known context
                </div>
                <div className="mt-3 text-[27px] font-medium leading-[1.05] tracking-[-0.04em] text-[#2B2723]" style={{ fontFamily: DISPLAY }}>
                  Quote sent.<br />No decision recorded.
                </div>
              </div>
            </div>

            <motion.div
              className="absolute left-[61%] right-[5%] top-[48%] border-l-2 border-[#BF7458] bg-white/54 px-5 py-5 backdrop-blur-sm"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.22, ease: EASE }}
            >
              <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#A66A55]">REOPEN</div>
              <div className="mt-3 text-[17px] font-medium leading-[1.5] text-[#2F2A26]">
                Want us to update that quote?
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-[9%] left-[35%] right-[4%] bg-[#1E2B29] px-6 py-6 text-[#F7F4EE] shadow-[0_28px_72px_rgba(31,43,41,.2)]"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.42, ease: EASE }}
            >
              <div className="grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                <Portrait cell={9} className="h-12 w-12" />
                <div>
                  <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/34">Reply received</div>
                  <div className="mt-2 text-[21px] font-medium leading-[1.34] tracking-[-0.025em]" style={{ fontFamily: DISPLAY }}>
                    “Yes. Send me the latest pricing.”
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#C5D098]">
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

function DormantField() {
  const marks = Array.from({ length: 88 }, (_, i) => ({
    left: 2 + ((i * 11) % 96),
    top: 8 + ((i * 17) % 84),
    width: 18 + ((i * 13) % 64),
    opacity: 0.12 + ((i % 5) * 0.035),
    active: [7, 19, 34, 52, 73].includes(i),
    tone: ["#BF7458", "#DDA34B", "#A9B47A", "#9B86B8", "#D58C75"][i % 5],
  }));

  return (
    <section id="quiet-pipeline" className="relative overflow-hidden bg-[#151614] px-5 py-24 text-[#F7F5F1] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1380px]">
        <Reveal className="max-w-[1040px]">
          <Eyebrow color="#DDA34B">The second pipeline</Eyebrow>
          <h2
            className="mt-5 text-[48px] font-medium leading-[0.91] tracking-[-0.063em] sm:text-[68px] lg:text-[84px]"
            style={{ fontFamily: DISPLAY }}
          >
            Your pipeline doesn't end
            <span className="block text-[#C7D19B]">where your team stopped looking.</span>
          </h2>
          <p className="mt-7 max-w-[720px] text-[16px] leading-[1.75] text-white/46 sm:text-[18px]">
            Some opportunities are still active. Others have simply slipped out of view.
          </p>
        </Reveal>

        <div className="relative mt-16 h-[720px] overflow-hidden border-y border-white/10">
          <div className="absolute left-0 top-0 h-full w-[18%] border-r border-white/10 bg-white/[0.02]" />
          <div className="absolute left-[18%] top-0 h-full w-px bg-white/10" />
          <div className="absolute left-[18%] top-0 -translate-y-1/2 bg-[#151614] pr-4 text-[8px] font-semibold uppercase tracking-[0.17em] text-white/30">
            now
          </div>

          {[18, 38, 58, 78].map((left, index) => (
            <div key={left} className="absolute bottom-0 top-0" style={{ left: left + "%" }}>
              <div className="h-full w-px bg-white/[0.055]" />
              <span className="absolute bottom-5 -translate-x-1/2 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/18">
                {index + 1} qtr
              </span>
            </div>
          ))}

          {marks.map((mark, index) => (
            <motion.span
              key={index}
              className="absolute h-px origin-left"
              style={{
                left: mark.left + "%",
                top: mark.top + "%",
                width: mark.width,
                backgroundColor: mark.active ? mark.tone : "rgba(255,255,255,.55)",
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: mark.active ? 0.9 : mark.opacity, scaleX: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.006, 0.35), ease: EASE }}
            />
          ))}

          <div className="absolute left-[23%] top-[20%]">
            <Portrait cell={2} muted className="h-14 w-14 opacity-35" />
            <div className="mt-2 text-[8px] font-semibold uppercase tracking-[0.13em] text-white/22">42 days</div>
          </div>
          <div className="absolute left-[47%] top-[47%]">
            <Portrait cell={14} muted className="h-16 w-16 opacity-30" />
            <div className="mt-2 text-[8px] font-semibold uppercase tracking-[0.13em] text-white/20">11 months</div>
          </div>
          <div className="absolute left-[72%] top-[28%]">
            <Portrait cell={20} muted className="h-14 w-14 opacity-30" />
            <div className="mt-2 text-[8px] font-semibold uppercase tracking-[0.13em] text-white/20">7 months</div>
          </div>

          <motion.div
            className="absolute left-[55%] top-[61%] flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, delay: 0.42, ease: EASE }}
          >
            <Portrait cell={9} className="h-20 w-20 ring-2 ring-[#BF7458]" />
            <div>
              <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#D68E74]">Worth reopening</div>
              <div className="mt-2 text-[12px] font-semibold text-white/78">Quote · 5 months quiet</div>
            </div>
          </motion.div>

          <div className="absolute bottom-8 left-[4%] max-w-[760px] text-[15px] leading-[1.7] text-white/38 sm:text-[17px]">
            Reopen does not treat the quiet pipeline as dead. It identifies which records still have a reason to move.
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectionCast() {
  return (
    <section className="bg-[#E7E0EA] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1380px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow color="#7E687F">Selection before sending</Eyebrow>
          <h2
            className="mt-5 text-[48px] font-medium leading-[0.92] tracking-[-0.062em] sm:text-[66px] lg:text-[80px]"
            style={{ fontFamily: DISPLAY }}
          >
            Reopen doesn't blast the database.
            <span className="block text-[#7E687F]">It chooses.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 border-l border-t border-[#7E687F]/18 sm:grid-cols-3 lg:grid-cols-6">
          {CAST.map((person, index) => (
            <CastMember key={person.label + index} person={person} index={index} />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#7E687F]/16 pt-5">
          <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#776E79]">
            3 selected
          </div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8B828D]">
            3 intentionally left alone
          </div>
        </div>
      </div>
    </section>
  );
}

function CastMember({
  person,
  index,
}: {
  person: (typeof CAST)[number];
  index: number;
}) {
  const reduced = !!useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : index * 0.045 }}
      className="relative min-h-[430px] border-b border-r border-[#7E687F]/18"
    >
      <Portrait
        cell={person.cell}
        muted={!person.selected}
        className={
          "absolute inset-x-0 top-0 h-[300px] " +
          (person.selected ? "" : "opacity-28")
        }
      />
      <div
        className={
          "absolute inset-x-0 bottom-0 top-[300px] px-4 py-5 " +
          (person.selected ? "bg-white/22" : "bg-transparent")
        }
      >
        <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#7B727D]">{person.label}</div>
        <div className={"mt-2 text-[11px] font-bold tracking-[0.02em] " + (person.selected ? "text-[#544757]" : "text-[#938B95]")}>
          {person.status}
        </div>
      </div>
      {person.selected ? (
        <span className="absolute right-4 top-4 h-3 w-3 bg-[#7E687F]" />
      ) : (
        <span className="absolute left-3 right-3 top-[150px] h-px -rotate-[18deg] bg-[#7E687F]/26" />
      )}
    </motion.div>
  );
}

function RewindStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const beforeY = useTransform(scrollYProgress, [0, 0.46], [0, -90]);
  const afterY = useTransform(scrollYProgress, [0.5, 1], [60, 0]);

  return (
    <section ref={sectionRef} className="bg-[#FCFBF8] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1260px]">
        <div className="grid gap-14 lg:grid-cols-[.68fr_1.32fr] lg:gap-20">
          <Reveal className="max-w-[500px] lg:sticky lg:top-32 lg:self-start">
            <Eyebrow color="#BF7458">One conversation, rewound</Eyebrow>
            <h2
              className="mt-5 text-[48px] font-medium leading-[0.93] tracking-[-0.062em] sm:text-[64px] lg:text-[76px]"
              style={{ fontFamily: DISPLAY }}
            >
              Go back far enough
              <span className="block text-[#BF7458]">to move forward again.</span>
            </h2>
            <p className="mt-6 max-w-[480px] text-[16px] leading-[1.75] text-[#68615B]">
              Reopen restores the context first. The old enquiry, quote and silence all stay part of the same customer story.
            </p>
          </Reveal>

          <div className="relative">
            <motion.div style={reduced ? undefined : { y: beforeY }}>
              <StoryRow date="12 FEB" title="Enquiry received" copy="Sarah asks about pricing and timing." tone="#C2A07B" />
              <StoryRow date="14 FEB" title="Quote sent" copy="A$4,800 proposal sent." tone="#DDA34B" />
              <StoryRow date="28 FEB" title="Conversation goes quiet" copy="No clear no. No next step either." tone="#9A9870" />
            </motion.div>

            <div className="grid min-h-[620px] grid-cols-[110px_1fr] border-b border-[#D9D0C6] sm:grid-cols-[150px_1fr]">
              <div className="border-r border-[#D9D0C6] py-10 pr-5">
                <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#B2AAA2]">MAR → JUL</div>
              </div>
              <div className="relative flex items-center px-6 py-16 sm:px-10">
                <div className="w-full">
                  <div className="text-[12px] font-medium text-[#B8B0A9]">Nothing.</div>
                  <div className="mt-8 h-px w-full bg-gradient-to-r from-[#D8D0C8] via-[#E6E0DA] to-transparent" />
                </div>
                <div className="absolute bottom-8 right-0 text-right text-[72px] font-medium leading-none tracking-[-0.07em] text-[#EEE9E4] sm:text-[104px]" style={{ fontFamily: DISPLAY }}>
                  167 DAYS
                </div>
              </div>
            </div>

            <motion.div style={reduced ? undefined : { y: afterY }}>
              <div className="grid grid-cols-[110px_1fr] border-b border-[#D9D0C6] sm:grid-cols-[150px_1fr]">
                <div className="border-r border-[#D9D0C6] py-9 pr-5">
                  <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#A76B58]">08 AUG</div>
                  <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#BF7458]">REOPEN</div>
                </div>
                <div className="px-6 py-9 sm:px-10">
                  <div className="max-w-[600px] text-[30px] font-medium leading-[1.08] tracking-[-0.038em] text-[#2C2926]" style={{ fontFamily: DISPLAY }}>
                    Want us to update the quote we sent earlier this year?
                  </div>
                </div>
              </div>

              <div className="bg-[#1E2B29] px-6 py-8 text-[#F7F4EE] sm:px-10">
                <div className="grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                  <Portrait cell={9} className="h-16 w-16" />
                  <div>
                    <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/34">Reply received</div>
                    <div className="mt-2 text-[26px] font-medium leading-[1.26] tracking-[-0.03em]" style={{ fontFamily: DISPLAY }}>
                      “Yes. Please send me the latest pricing.”
                    </div>
                  </div>
                  <div className="space-y-2 text-[9px] font-semibold text-white/54">
                    {["Outreach stopped", "History preserved", "Sales notified"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Check size={10} className="text-[#B9C88C]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 border-b border-[#D9D0C6] text-[9px] font-semibold uppercase tracking-[0.13em] text-[#77716B]">
                <div className="border-r border-[#D9D0C6] px-4 py-5">08 AUG · REPLY</div>
                <div className="border-r border-[#D9D0C6] px-4 py-5">08 AUG · SALES</div>
                <div className="px-4 py-5">NEXT STEP · OPEN</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryRow({
  date,
  title,
  copy,
  tone,
}: {
  date: string;
  title: string;
  copy: string;
  tone: string;
}) {
  return (
    <div className="grid grid-cols-[110px_1fr] border-b border-[#D9D0C6] sm:grid-cols-[150px_1fr]">
      <div className="border-r border-[#D9D0C6] py-7 pr-5">
        <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#989088]">{date}</div>
        <span className="mt-4 block h-2.5 w-2.5" style={{ backgroundColor: tone }} />
      </div>
      <div className="px-6 py-7 sm:px-10">
        <div className="text-[17px] font-semibold text-[#2D2A27]">{title}</div>
        <div className="mt-2 text-[13px] leading-[1.65] text-[#736C66]">{copy}</div>
      </div>
    </div>
  );
}

function Commercial() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="bg-[#DCE0CC] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <Reveal className="mx-auto max-w-[610px] lg:ml-auto lg:mr-0">
          <Eyebrow color="#667044">Reopen inside Growth</Eyebrow>
          <h2 className="mt-5 text-[44px] font-medium leading-[0.95] tracking-[-0.057em] sm:text-[58px]" style={{ fontFamily: DISPLAY }}>
            Keep the quiet pipeline visible.
          </h2>
          <p className="mt-6 max-w-[510px] text-[15px] leading-[1.75] text-[#59604D]">
            Build audiences and run targeted reactivation whenever the business needs it.
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

      <div className="bg-[#BF7458] px-5 py-20 text-[#FFF9F5] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <Reveal className="mx-auto max-w-[610px] lg:ml-0 lg:mr-auto" delay={0.04}>
          <Eyebrow color="#F2D6A5">Ghost to Gold</Eyebrow>
          <h2 className="mt-5 text-[44px] font-medium leading-[0.95] tracking-[-0.057em] sm:text-[58px]" style={{ fontFamily: DISPLAY }}>
            Or let us reopen it for you.
          </h2>
          <p className="mt-6 max-w-[510px] text-[15px] leading-[1.75] text-white/70">
            Ghost to Gold is the done for you Reopen offer. We build and launch the campaign, with a managed option for monitoring and handoff.
          </p>
          <div className="mt-10 grid max-w-[430px] grid-cols-2 gap-8 border-t border-white/20 pt-6">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/48">Sprint</div>
              <div className="mt-2 text-[25px] font-semibold">A$997+</div>
            </div>
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/48">Managed</div>
              <div className="mt-2 text-[25px] font-semibold">A$1,497+</div>
            </div>
          </div>
          <a href={BOOK_URL} className="mt-10 inline-flex items-center gap-2 text-[12.5px] font-semibold text-white">
            Ask about Ghost to Gold <ArrowRight size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="bg-[#F0E5D7] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
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
    <section className="bg-[#151614] px-5 py-24 text-[#F7F5F1] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1120px]">
        <Reveal>
          <Eyebrow color="#DDA34B">Look back before you buy forward</Eyebrow>
          <h2 className="mt-5 max-w-[1040px] text-[48px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[66px] lg:text-[82px]" style={{ fontFamily: DISPLAY }}>
            You already paid to get their attention.
            <span className="block text-[#C7D19B]">Reopen the conversations that still matter.</span>
          </h2>
          <a
            href={BOOK_URL}
            className="mt-9 inline-flex h-[52px] items-center gap-2 rounded-full bg-[#F7F5F1] px-7 text-[13px] font-semibold text-[#171816] transition-transform hover:-translate-y-px"
          >
            Book a Call <ArrowRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
