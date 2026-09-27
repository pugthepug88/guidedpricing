import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
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
          "Zapla Reopen helps service businesses revive dormant enquiries, stale quotes and past customers without blasting the whole database.",
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
    a: "No. The audience is selected first. Active opportunities, recent contacts, unsubscribed contacts and people who have already replied can be excluded before anything sends.",
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

const LEDGER_ROWS = [
  { cell: 4, type: "Web enquiry", quiet: "18 days quiet", last: "Asked about Tuesday", state: "ACTIVE", tone: "#A9B47A" },
  { cell: 9, type: "Quote sent", quiet: "5 months quiet", last: "A$4,800 proposal", state: "REOPEN", tone: "#BF7458" },
  { cell: 14, type: "Past customer", quiet: "11 months quiet", last: "Job completed", state: "QUIET", tone: "#9B86B8" },
  { cell: 2, type: "Phone enquiry", quiet: "7 months quiet", last: "Requested callback", state: "QUIET", tone: "#DDA34B" },
  { cell: 19, type: "Quote sent", quiet: "4 months quiet", last: "No decision", state: "QUIET", tone: "#C89A5D" },
] as const;

const CONTACTS = [
  { cell: 0, label: "7 months quiet", selected: true },
  { cell: 5, label: "Active quote", selected: false },
  { cell: 7, label: "Past customer", selected: true },
  { cell: 12, label: "Recent contact", selected: false },
  { cell: 18, label: "5 months quiet", selected: true },
  { cell: 21, label: "Unsubscribed", selected: false },
] as const;

function ReactivationV2Page() {
  return (
    <main className="min-h-screen bg-[#F7F5F1] text-[#171816] antialiased" style={{ fontFamily: BODY }}>
      <Hero />
      <SecondPipeline />
      <Selection />
      <OneRecord />
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
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({
  children,
  color = "#786F68",
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
        filter: muted ? "grayscale(.92) saturate(.46) contrast(.95)" : undefined,
      }}
      aria-hidden="true"
    />
  );
}

function Hero() {
  const reduced = !!useReducedMotion();

  return (
    <section className="relative min-h-[880px] overflow-hidden bg-[#F1E7D8] px-5 pb-14 pt-[112px] sm:px-10 sm:pt-[124px] lg:px-16 lg:pt-[136px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 80% 8%, rgba(169,180,122,.24), transparent 24%), radial-gradient(circle at 12% 74%, rgba(191,116,88,.13), transparent 22%)",
        }}
      />

      <div className="relative mx-auto max-w-[1450px]">
        <div className="border-b border-[#CFC0B2] pb-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8E8176]">
          Zapla Reopen / Lead & customer reactivation
        </div>

        <div className="grid min-h-[700px] lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative flex flex-col justify-between border-b border-[#CFC0B2] py-10 lg:border-b-0 lg:border-r lg:py-14 lg:pr-14">
            <Reveal>
              <Eyebrow color="#BF7458">Reopen</Eyebrow>
              <h1
                className="mt-6 max-w-[720px] text-[58px] font-medium leading-[0.88] tracking-[-0.07em] sm:text-[78px] lg:text-[96px]"
                style={{ fontFamily: DISPLAY }}
              >
                They went quiet.
                <span className="mt-3 block text-[#BF7458]">
                  That doesn't mean they're gone.
                </span>
              </h1>

              <p className="mt-7 max-w-[590px] text-[16px] leading-[1.72] text-[#665F58] sm:text-[18px]">
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
                  className="inline-flex h-[50px] items-center rounded-full border border-[#C8B8AA] bg-white/36 px-6 text-[13px] font-semibold text-[#27231F]"
                >
                  See the quiet pipeline
                </a>
              </div>
            </Reveal>

            <div className="mt-12 flex items-end justify-between gap-5 border-t border-[#D4C6B8] pt-5">
              <div className="max-w-[310px] text-[11px] leading-[1.6] text-[#8A817A]">
                Most businesses keep watching what is active. Reopen looks at what stopped moving.
              </div>
              <div className="text-right text-[9px] font-semibold uppercase tracking-[0.18em] text-[#978A7E]">
                quiet records / selected / reopened
              </div>
            </div>
          </div>

          <div className="relative min-h-[650px] overflow-hidden lg:min-h-0">
            <div className="absolute left-8 top-8 z-20 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8F8277]">
              Quiet index
            </div>
            <div className="absolute right-8 top-8 z-20 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#A3968B]">
              last 18 months
            </div>

            <div className="absolute inset-x-0 top-[88px] h-px bg-[#D5C6B7]" />
            <div className="absolute bottom-0 left-[18%] top-[88px] w-px bg-[#D5C6B7]" />
            <div className="absolute bottom-0 left-[58%] top-[88px] w-px bg-[#D5C6B7]" />

            <motion.div
              className="absolute left-[6%] top-[18%] h-[42%] w-[46%] overflow-hidden bg-[#D4C0AC]"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reduced ? 0 : 0.65, ease: EASE }}
            >
              <Portrait cell={9} className="h-full w-full scale-[1.08]" muted />
              <div className="absolute inset-0 bg-[#A97C5D]/10 mix-blend-multiply" />
              <div className="absolute bottom-0 left-0 right-0 border-t border-black/[0.08] bg-[#EEE2D4]/92 px-4 py-3">
                <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#8A796C]">
                  QUOTE SENT
                </div>
                <div className="mt-1 text-[12px] font-semibold text-[#312B27]">5 months quiet</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute right-[7%] top-[16%] w-[35%] border-y border-[#CDBEAF] py-4"
              initial={reduced ? false : { opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.18, ease: EASE }}
            >
              <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#9C6A57]">Last known context</div>
              <div className="mt-3 text-[26px] font-medium leading-[1.05] tracking-[-0.04em] text-[#2A2723]" style={{ fontFamily: DISPLAY }}>
                A$4,800 quote
              </div>
              <div className="mt-2 text-[11px] text-[#7B7169]">No decision recorded.</div>
            </motion.div>

            <motion.div
              className="absolute right-[7%] top-[41%] w-[35%] bg-white/68 px-5 py-5 shadow-[0_20px_48px_rgba(71,49,33,.08)]"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.34, ease: EASE }}
            >
              <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#A26753]">REOPEN</div>
              <div className="mt-3 text-[16px] font-medium leading-[1.5] text-[#302B27]">
                Want us to update that quote?
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-[10%] left-[25%] right-[7%] bg-[#1E2B29] px-6 py-6 text-[#F7F4EE] shadow-[0_28px_70px_rgba(31,43,41,.18)]"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.52, ease: EASE }}
            >
              <div className="grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                <Portrait cell={9} className="h-12 w-12" />
                <div>
                  <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/38">Reply received</div>
                  <div className="mt-2 text-[20px] font-medium leading-[1.35] tracking-[-0.02em]" style={{ fontFamily: DISPLAY }}>
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

function SecondPipeline() {
  return (
    <section id="second-pipeline" className="bg-[#151614] px-5 py-24 text-[#F5F1EB] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1360px]">
        <Reveal className="max-w-[1000px]">
          <Eyebrow color="#DDA34B">The quiet layer</Eyebrow>
          <h2
            className="mt-5 text-[48px] font-medium leading-[0.92] tracking-[-0.062em] sm:text-[68px] lg:text-[82px]"
            style={{ fontFamily: DISPLAY }}
          >
            Most businesses have a second pipeline.
            <span className="block text-[#C7D19B]">It's just gone quiet.</span>
          </h2>
        </Reveal>

        <div className="mt-16 border-y border-white/10">
          <div className="grid grid-cols-[1.2fr_.8fr_1.2fr_.55fr] gap-4 border-b border-white/10 py-3 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/30">
            <div>Record</div>
            <div>Quiet for</div>
            <div>Last context</div>
            <div className="text-right">State</div>
          </div>

          {LEDGER_ROWS.map((row, index) => (
            <LedgerRow key={row.type + index} row={row} index={index} />
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[.65fr_1.35fr]">
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">
            Active pipeline gets watched.
            <br />
            Quiet pipeline gets forgotten.
          </div>
          <p className="max-w-[760px] text-[17px] leading-[1.72] text-white/52 sm:text-[19px]">
            Reopen makes the quiet layer visible again, then gives your team a way to act on the records that still have somewhere to go.
          </p>
        </div>
      </div>
    </section>
  );
}

function LedgerRow({
  row,
  index,
}: {
  row: (typeof LEDGER_ROWS)[number];
  index: number;
}) {
  const reduced = !!useReducedMotion();
  const active = row.state === "REOPEN";

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: reduced ? 0 : 0.42, delay: reduced ? 0 : index * 0.045, ease: EASE }}
      className={
        "grid grid-cols-[1.2fr_.8fr_1.2fr_.55fr] items-center gap-4 border-b border-white/10 py-5 last:border-b-0 " +
        (active ? "bg-[#BF7458]/[0.08]" : "")
      }
    >
      <div className="flex min-w-0 items-center gap-3">
        <Portrait cell={row.cell} muted={!active} className={"h-11 w-11 " + (active ? "ring-2 ring-[#BF7458]" : "opacity-55")} />
        <span className="truncate text-[12px] font-semibold text-white/82">{row.type}</span>
      </div>
      <div className="text-[11px] text-white/42">{row.quiet}</div>
      <div className="truncate text-[11px] text-white/50">{row.last}</div>
      <div className="text-right">
        <span
          className="inline-flex border px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em]"
          style={{
            borderColor: active ? "#BF7458" : "rgba(255,255,255,.12)",
            color: active ? "#E6A48B" : "rgba(255,255,255,.34)",
          }}
        >
          {row.state}
        </span>
      </div>
    </motion.div>
  );
}

function Selection() {
  return (
    <section className="bg-[#E7E0EA] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:items-start lg:gap-20">
          <Reveal className="max-w-[540px]">
            <Eyebrow color="#7E687F">Selection before sending</Eyebrow>
            <h2
              className="mt-5 text-[46px] font-medium leading-[0.94] tracking-[-0.06em] sm:text-[62px] lg:text-[74px]"
              style={{ fontFamily: DISPLAY }}
            >
              Don't wake everyone up.
              <span className="block text-[#7E687F]">Wake the right ones.</span>
            </h2>
            <p className="mt-6 max-w-[510px] text-[16px] leading-[1.75] text-[#625B64]">
              Reopen starts by narrowing the field. The point is not reach. The point is relevance.
            </p>

            <div className="mt-10 border-t border-[#7E687F]/20">
              {[
                ["Active opportunity", "Leave it alone"],
                ["Recent contact", "Leave it alone"],
                ["Unsubscribed", "Leave it alone"],
                ["Dormant opportunity", "Consider reopening"],
              ].map(([label, action], index) => (
                <div key={label} className="flex items-center justify-between gap-5 border-b border-[#7E687F]/15 py-4 text-[11px]">
                  <span className="font-semibold text-[#4F4951]">{label}</span>
                  <span className={index === 3 ? "font-semibold text-[#7E687F]" : "text-[#877E89]"}>{action}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="border-l border-t border-[#7E687F]/18">
              <div className="grid grid-cols-2 sm:grid-cols-3">
                {CONTACTS.map((contact, index) => (
                  <ContactPanel key={contact.label + index} contact={contact} index={index} />
                ))}
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between gap-5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#766D79]">
              <span>3 selected</span>
              <span>3 intentionally excluded</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactPanel({
  contact,
  index,
}: {
  contact: (typeof CONTACTS)[number];
  index: number;
}) {
  const reduced = !!useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : index * 0.04 }}
      className={
        "relative min-h-[250px] border-b border-r border-[#7E687F]/18 " +
        (contact.selected ? "bg-white/28" : "bg-transparent")
      }
    >
      <Portrait
        cell={contact.cell}
        muted={!contact.selected}
        className={"absolute inset-x-6 top-6 h-[150px] " + (contact.selected ? "" : "opacity-40")}
      />
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
        <div>
          <div className="text-[8px] font-semibold uppercase tracking-[0.13em] text-[#7D747F]">{contact.label}</div>
          <div className="mt-1 text-[10px] font-semibold text-[#403B42]">
            {contact.selected ? "Worth reviewing" : "Excluded"}
          </div>
        </div>
        {contact.selected ? (
          <span className="h-3 w-3 bg-[#7E687F]" />
        ) : (
          <span className="h-px w-8 rotate-[-18deg] bg-[#7E687F]/35" />
        )}
      </div>
    </motion.div>
  );
}

function OneRecord() {
  return (
    <section className="bg-[#FCFBF8] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1260px]">
        <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <Reveal className="max-w-[500px] lg:sticky lg:top-32 lg:self-start">
            <Eyebrow color="#BF7458">One record returns</Eyebrow>
            <h2
              className="mt-5 text-[46px] font-medium leading-[0.94] tracking-[-0.06em] sm:text-[62px] lg:text-[74px]"
              style={{ fontFamily: DISPLAY }}
            >
              Silence is part of the story.
            </h2>
            <p className="mt-6 max-w-[480px] text-[16px] leading-[1.75] text-[#67615B]">
              Reopen does not create a new lead. It picks up an old story where it stopped.
            </p>
          </Reveal>

          <Reveal>
            <div className="border-t border-[#D9D0C6]">
              <StoryRow date="12 FEB" title="Enquiry received" copy="Sarah asks about pricing and timing." tone="#C2A07B" />
              <StoryRow date="14 FEB" title="Quote sent" copy="A$4,800 proposal sent." tone="#DDA34B" />
              <StoryRow date="28 FEB" title="Conversation goes quiet" copy="No clear no. No next step either." tone="#9A9870" />

              <div className="grid min-h-[360px] grid-cols-[110px_1fr] border-b border-[#D9D0C6] sm:grid-cols-[150px_1fr]">
                <div className="border-r border-[#D9D0C6] py-8 pr-5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#B6AEA6]">
                  Mar → Jul
                </div>
                <div className="flex items-center px-6 py-10 sm:px-10">
                  <div className="w-full">
                    <div className="h-px w-full bg-gradient-to-r from-[#D8D0C8] via-[#E6E0DA] to-transparent" />
                    <div className="mt-5 text-[12px] font-medium text-[#B5AEA7]">Nothing.</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[110px_1fr] border-b border-[#D9D0C6] sm:grid-cols-[150px_1fr]">
                <div className="border-r border-[#D9D0C6] py-8 pr-5">
                  <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#A76B58]">08 AUG</div>
                  <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#BF7458]">REOPEN</div>
                </div>
                <div className="px-6 py-8 sm:px-10">
                  <div className="max-w-[590px] text-[28px] font-medium leading-[1.08] tracking-[-0.035em] text-[#2D2926]" style={{ fontFamily: DISPLAY }}>
                    Want us to update the quote we sent earlier this year?
                  </div>
                </div>
              </div>

              <div className="bg-[#1E2B29] px-6 py-7 text-[#F7F4EE] sm:px-10">
                <div className="grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                  <Portrait cell={9} className="h-14 w-14" />
                  <div>
                    <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/36">Sarah replied</div>
                    <div className="mt-2 text-[24px] font-medium leading-[1.28] tracking-[-0.028em]" style={{ fontFamily: DISPLAY }}>
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
          </Reveal>
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
            Or hand us the quiet pipeline.
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
    <section className="bg-[#171816] px-5 py-24 text-[#F7F5F1] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
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
