import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Mail,
  MessageSquare,
  RotateCcw,
  UserRound,
} from "lucide-react";

export const Route = createFileRoute("/follow-up")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Follow-Up Automation for Service Businesses | Zapla" },
      {
        name: "description",
        content:
          "Zapla keeps new enquiries, quotes, bookings and past customers moving with connected follow-up across SMS, email and your CRM.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: FollowUpPage,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const PETAL_COLORS = ["#E97D62", "#C96C85", "#DDA34B", "#99A36D", "#9B86B8", "#D58C75"] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

const FAQS = [
  {
    q: "Can Zapla follow up by SMS and email?",
    a: "Yes. Follow-up can run across the channels you choose, with the conversation kept against the customer record so your team can see what has happened.",
  },
  {
    q: "What happens when a customer replies?",
    a: "You decide what should happen next. A reply can pause an automated sequence, move the opportunity forward, or bring the conversation back to your team.",
  },
  {
    q: "Is follow-up only for new leads?",
    a: "No. You can use it for new enquiries, quotes, bookings, reminders and reactivation of past customers, depending on the workflow you set.",
  },
  {
    q: "Does my team still control the messages?",
    a: "Yes. You choose the timing, wording, channels, handoff points and rules. Automation should remove repetitive chasing, not remove human judgment.",
  },
] as const;

function FollowUpPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <Hero />
      <LeakSection />
      <ThreadSection />
      <UseCases />
      <HumanControl />
      <ConnectedCrm />
      <Faq />
      <FinalCta />
    </main>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = !!useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduced ? 0 : 0.48, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={"text-[10px] font-semibold uppercase tracking-[0.2em] " + (dark ? "text-[#DDA34B]" : "text-[#C96F55]")}>
      {children}
    </div>
  );
}

function ZaplaPetal({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" aria-hidden="true" className="block overflow-visible">
      {PETAL_COLORS.map((color, index) => (
        <g key={color} transform={`rotate(${index * 60} 80 80)`}>
          <path
            d="M80 14 C95 14 104 25 102 42 C100 58 92 70 80 82 C68 70 60 58 58 42 C56 25 65 14 80 14 Z"
            fill={color}
            stroke={color}
            strokeWidth="1.4"
          />
        </g>
      ))}
      <circle cx="80" cy="80" r="14" fill="#111214" stroke="rgba(255,255,255,.08)" />
    </svg>
  );
}

function TeamAvatar({ size = 42, cell = 0 }: { size?: number; cell?: number }) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);
  return (
    <span
      className="block shrink-0 overflow-hidden rounded-full border-2 border-white/15 shadow-[0_8px_24px_rgba(0,0,0,.22)]"
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition: `${(column / 5) * 100}% ${(row / 3) * 100}%`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
      }}
      aria-hidden="true"
    />
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F2E9DE] px-5 pb-20 pt-[116px] sm:px-10 sm:pb-24 sm:pt-[126px] lg:px-16 lg:pb-28 lg:pt-[138px]">
      <div className="pointer-events-none absolute right-[-8%] top-[12%] h-[520px] w-[520px] rounded-full bg-[#DDA34B]/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-[-25%] left-[32%] h-[420px] w-[420px] rounded-full bg-[#C96C85]/8 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1420px] items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <Reveal className="max-w-[650px]">
          <Eyebrow>Follow-up automation</Eyebrow>
          <h1 className="mt-4 text-[50px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[68px] lg:text-[82px]" style={{ fontFamily: DISPLAY }}>
            The lead came in.
            <span className="block text-[#C96F55]">Zapla keeps it moving.</span>
          </h1>
          <p className="mt-6 max-w-[600px] text-[16px] leading-[1.7] text-[#626762] sm:text-[18px]">
            Zapla follows up across SMS and email, keeps every conversation tied to the customer record, and keeps opportunities moving while your team gets on with the work.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px">
              Book a Call <ArrowRight size={15} />
            </a>
            <a href="#how-it-works" className="inline-flex h-[50px] items-center rounded-[10px] border border-[#C9BFB2] bg-white/55 px-6 text-[13px] font-semibold text-[#111318]">
              See how it works
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-[#656A65] sm:text-[12px]">
            {["New enquiries", "Quotes", "Bookings", "Reactivation"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C96F55]" />
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <FollowUpScene />
        </Reveal>
      </div>
    </section>
  );
}

function FollowUpScene() {
  const reduced = !!useReducedMotion();
  return (
    <div className="relative overflow-hidden rounded-[30px] bg-[#1E2B29] p-4 shadow-[0_30px_80px_rgba(47,41,34,.16)] sm:p-5 lg:min-h-[620px] lg:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_62%_42%,rgba(221,163,75,.12),transparent_28%),radial-gradient(circle_at_18%_82%,rgba(201,108,133,.09),transparent_28%)]" />
      <div className="relative flex items-center justify-between">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#DDA34B]">Live opportunity</div>
          <div className="mt-1 text-[12px] font-semibold text-white/78">Website enquiry · Today</div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/52">
          Follow-up active
        </div>
      </div>

      <div className="relative mt-7 min-h-[560px] sm:min-h-[500px]">
        <motion.div
          className="absolute left-0 top-0 w-[78%] rounded-[22px] border border-white/10 bg-[#172320] p-5 shadow-[0_18px_46px_rgba(0,0,0,.18)] sm:w-[64%]"
          initial={reduced ? false : { opacity: 0, x: -14, y: 6 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2E9DE] text-[#C96F55]">
              <UserRound size={17} />
            </span>
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/36">New enquiry</div>
              <div className="mt-1 text-[14px] font-semibold text-white/90">Sarah Mitchell</div>
            </div>
            <div className="ml-auto text-[10px] font-medium text-white/38">10:04am</div>
          </div>
          <div className="mt-4 rounded-[14px] bg-white/[0.05] px-4 py-3 text-[13px] leading-[1.55] text-white/76">
            Hi, I’m interested in booking a consultation next week.
          </div>
        </motion.div>

        <motion.div
          className="absolute right-0 top-[150px] w-[82%] rounded-[22px] border border-[#DDA34B]/20 bg-[#F7F4EE] p-5 text-[#111318] shadow-[0_18px_50px_rgba(0,0,0,.18)] sm:w-[68%]"
          initial={reduced ? false : { opacity: 0, x: 18, y: 10 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.46, delay: reduced ? 0 : 0.2, ease: EASE }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111214]">
              <ZaplaPetal size={25} />
            </span>
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#C96F55]">Zapla AI follow-up</div>
              <div className="mt-1 text-[12px] font-semibold text-[#595E59]">SMS · 10:05am</div>
            </div>
          </div>
          <p className="mt-4 text-[14px] font-medium leading-[1.55] text-[#343834]">
            Hi Sarah, thanks for reaching out. We have a few consultation times available next week. Would Tuesday morning suit you?
          </p>
        </motion.div>

        <motion.div
          className="absolute left-[4%] top-[338px] w-[72%] rounded-[18px] sm:left-[11%] sm:top-[328px] sm:w-[54%] border border-white/10 bg-[#16221F] p-4"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.38, ease: EASE }}
        >
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/34">Customer reply · 10:12am</div>
          <div className="mt-2 text-[15px] font-semibold text-white/88">Tuesday morning works.</div>
        </motion.div>

        <motion.div
          className="absolute bottom-0 right-0 w-[92%] rounded-[20px] sm:right-[2%] sm:w-[58%] border border-[#99A36D]/20 bg-[#151B19] p-4"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.42, delay: reduced ? 0 : 0.52, ease: EASE }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#99A36D]/12 text-[#B8C28A]">
              <Calendar size={16} />
            </span>
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/34">Next step</div>
              <div className="mt-1 text-[14px] font-semibold text-white/90">Consultation · Tuesday 10:30am</div>
            </div>
            <span className="ml-12 rounded-full bg-[#99A36D]/12 px-2.5 py-1 text-[8px] sm:ml-auto font-semibold uppercase tracking-[0.1em] text-[#B8C28A]">
              Booked
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function LeakSection() {
  const rows = [
    ["01", "New enquiry", "The first reply waits until someone remembers."],
    ["02", "Quote sent", "Silence gets mistaken for a no."],
    ["03", "Past customer", "The next job never gets asked for."],
  ];

  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>The revenue leak</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[70px]" style={{ fontFamily: DISPLAY }}>
            Most leads don’t say no.
            <span className="block text-[#C96F55]">They just go quiet.</span>
          </h2>
          <p className="mt-6 max-w-[680px] text-[15px] leading-[1.72] text-[#666B67] sm:text-[17px]">
            Follow-up breaks when the next step lives in someone’s memory. A good enquiry becomes an old tab, a quote becomes stale, and a customer who already trusts you quietly disappears.
          </p>
        </Reveal>

        <div className="mt-12 border-y border-[#D8D0C7]">
          {rows.map(([n, title, copy]) => (
            <Reveal key={n}>
              <div className="grid gap-3 border-b border-[#D8D0C7] py-7 last:border-b-0 sm:grid-cols-[70px_220px_1fr] sm:items-center sm:py-8">
                <div className="text-[10px] font-bold tracking-[0.18em] text-[#C96F55]">{n}</div>
                <div className="text-[23px] font-medium tracking-[-0.035em] text-[#111318]" style={{ fontFamily: DISPLAY }}>{title}</div>
                <div className="max-w-[650px] text-[15px] leading-[1.65] text-[#666B67] sm:text-[16px]">{copy}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ThreadSection() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#111214] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute left-[48%] top-[28%] h-[420px] w-[420px] rounded-full bg-[#DDA34B]/8 blur-[130px]" />
      <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <Reveal>
          <Eyebrow dark>One connected thread</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[56px]" style={{ fontFamily: DISPLAY }}>
            The conversation should not reset every time someone gets busy.
          </h2>
          <p className="mt-6 max-w-[520px] text-[15px] leading-[1.72] text-white/58 sm:text-[16px]">
            Zapla keeps the enquiry, messages, status and next step attached to the same customer record. Your team can see what happened without reconstructing the story from inboxes and memory.
          </p>
        </Reveal>

        <Reveal>
          <div className="rounded-[28px] border border-white/[0.08] bg-[#151619] p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div className="flex items-center gap-3">
                <TeamAvatar size={44} cell={0} />
                <div>
                  <div className="text-[14px] font-semibold text-white/92">Sarah Mitchell</div>
                  <div className="mt-1 text-[10px] font-medium text-white/38">Customer record · Active opportunity</div>
                </div>
              </div>
              <span className="rounded-full bg-[#99A36D]/12 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#B8C28A]">
                Follow-up active
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <ThreadRow icon={<MessageSquare size={15} />} label="SMS sent" meta="Today · 10:05am" copy="Thanks for reaching out. Would Tuesday morning suit you?" accent="#E97D62" />
              <ThreadRow icon={<MessageSquare size={15} />} label="Customer replied" meta="Today · 10:12am" copy="Tuesday morning works." accent="#DDA34B" />
              <ThreadRow icon={<Calendar size={15} />} label="Booking updated" meta="Today · 10:13am" copy="Consultation · Tuesday 10:30am" accent="#99A36D" />
              <ThreadRow icon={<Clock3 size={15} />} label="Next follow-up" meta="Stops here" copy="Customer replied. No unnecessary chase." accent="#C96C85" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ThreadRow({ icon, label, meta, copy, accent }: { icon: ReactNode; label: string; meta: string; copy: string; accent: string }) {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-3 rounded-[16px] border border-white/[0.07] bg-white/[0.025] p-4 sm:grid-cols-[40px_150px_1fr] sm:items-center">
      <span className="flex h-9 w-9 items-center justify-center rounded-[10px]" style={{ backgroundColor: `${accent}18`, color: accent }}>{icon}</span>
      <div>
        <div className="text-[11px] font-semibold text-white/82">{label}</div>
        <div className="mt-1 text-[9px] text-white/32">{meta}</div>
      </div>
      <div className="col-start-2 text-[12px] leading-[1.55] text-white/58 sm:col-start-auto">{copy}</div>
    </div>
  );
}

function UseCases() {
  return (
    <section className="bg-[#EFE3D4] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[820px]">
          <Eyebrow>Where follow-up matters</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[58px]" style={{ fontFamily: DISPLAY }}>
            Not one automation. Four places revenue quietly slips away.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <UseCaseCard
              eyebrow="New leads"
              title="Reply while the enquiry is still warm."
              copy="A new enquiry can get an immediate response, the right questions and a clear next step instead of sitting untouched until someone gets back to it."
              icon={<MessageSquare size={19} />}
              className="min-h-[330px] bg-[#1E2B29] text-[#F7F4EE]"
              dark
            />
          </Reveal>
          <Reveal className="lg:col-span-5">
            <UseCaseCard
              eyebrow="Quotes"
              title="Silence is not the same as no."
              copy="Keep a quote moving with timed follow-up instead of leaving the whole opportunity dependent on someone remembering to chase it."
              icon={<FileText size={19} />}
              className="min-h-[330px] bg-[#F7F4EE]"
            />
          </Reveal>
          <Reveal className="lg:col-span-5">
            <UseCaseCard
              eyebrow="Bookings"
              title="Reduce the gap between booked and arrived."
              copy="Use reminders and confirmations to keep the next appointment visible without turning your staff into a reminder service."
              icon={<Calendar size={19} />}
              className="min-h-[280px] bg-[#F7F4EE]"
            />
          </Reveal>
          <Reveal className="lg:col-span-7">
            <UseCaseCard
              eyebrow="Reactivation"
              title="Past customers are not dead leads."
              copy="Bring the right customers back into a conversation when there is a genuine reason to reconnect instead of buying attention from strangers every time."
              icon={<RotateCcw size={19} />}
              className="min-h-[280px] bg-[#C96F55] text-[#FFF8F3]"
              dark
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function UseCaseCard({ eyebrow, title, copy, icon, className, dark = false }: { eyebrow: string; title: string; copy: string; icon: ReactNode; className: string; dark?: boolean }) {
  return (
    <div className={`relative flex h-full flex-col justify-between overflow-hidden rounded-[26px] p-7 sm:p-9 ${className}`}>
      <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full border border-current opacity-[0.06]" />
      <div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-[12px] ${dark ? "bg-white/10" : "bg-[#1E2B29] text-[#F7F4EE]"}`}>{icon}</span>
        <div className={`mt-7 text-[10px] font-semibold uppercase tracking-[0.18em] ${dark ? "text-white/56" : "text-[#C96F55]"}`}>{eyebrow}</div>
        <h3 className="mt-3 max-w-[560px] text-[32px] font-medium leading-[1.02] tracking-[-0.045em] sm:text-[38px]" style={{ fontFamily: DISPLAY }}>{title}</h3>
      </div>
      <p className={`mt-8 max-w-[560px] text-[14px] leading-[1.68] ${dark ? "text-white/68" : "text-[#666B67]"}`}>{copy}</p>
    </div>
  );
}

function HumanControl() {
  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <Reveal>
          <div className="flex h-full min-h-[440px] flex-col justify-between rounded-[28px] bg-[#1E2B29] p-7 text-[#F7F4EE] sm:p-9">
            <div>
              <Eyebrow dark>Human control</Eyebrow>
              <h2 className="mt-4 text-[40px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[52px]" style={{ fontFamily: DISPLAY }}>
                Automation should know when to get out of the way.
              </h2>
            </div>
            <div className="mt-10 rounded-[20px] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111214]">
                  <ZaplaPetal size={30} />
                </span>
                <ArrowRight size={18} className="text-[#DDA34B]" />
                <div className="flex -space-x-3">
                  <TeamAvatar size={48} cell={7} />
                  <TeamAvatar size={52} cell={0} />
                  <TeamAvatar size={48} cell={14} />
                </div>
              </div>
              <div className="mt-5 text-[12px] font-semibold text-white/82">Customer replied. Bring the conversation back to your team.</div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="flex h-full flex-col justify-center rounded-[28px] bg-[#F1EADF] p-7 sm:p-9 lg:p-12">
            <p className="max-w-[640px] text-[18px] leading-[1.7] text-[#555B56] sm:text-[21px]">
              You decide the timing, wording, channels and handoff rules. When a customer replies, a sequence can stop, change direction or return to a person. The point is not to automate every interaction. It is to stop good opportunities being lost to repetitive work.
            </p>
            <div className="mt-9 grid gap-5 border-t border-[#D4CABD] pt-7 sm:grid-cols-3">
              <SmallPrinciple title="Your rules" copy="You decide what triggers follow-up." />
              <SmallPrinciple title="Your voice" copy="Messages are built around your business." />
              <SmallPrinciple title="Your team" copy="Humans step in where judgment matters." />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SmallPrinciple({ title, copy }: { title: string; copy: string }) {
  return (
    <div>
      <div className="text-[13px] font-semibold text-[#111318]">{title}</div>
      <div className="mt-2 text-[12px] leading-[1.55] text-[#6A706B]">{copy}</div>
    </div>
  );
}

function ConnectedCrm() {
  return (
    <section className="bg-[#111214] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
        <Reveal>
          <Eyebrow dark>Connected CRM</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[56px]" style={{ fontFamily: DISPLAY }}>
            Follow-up works better when the CRM already knows what happened.
          </h2>
          <p className="mt-6 max-w-[520px] text-[15px] leading-[1.72] text-white/58 sm:text-[16px]">
            The customer record, messages, notes and opportunity status stay connected. Your team can pick up the relationship with context instead of starting from scratch.
          </p>
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#171819]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <TeamAvatar size={46} cell={0} />
                <div>
                  <div className="text-[14px] font-semibold text-white/90">Sarah Mitchell</div>
                  <div className="mt-1 text-[10px] text-white/36">Customer since today</div>
                </div>
              </div>
              <span className="rounded-full bg-[#DDA34B]/12 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#E9B96B]">Consultation booked</span>
            </div>

            <div className="grid gap-0 sm:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-white/[0.08] p-5 sm:border-b-0 sm:border-r sm:p-6">
                <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/30">Opportunity</div>
                <div className="mt-5 space-y-4">
                  <CrmLine label="Stage" value="Booked" />
                  <CrmLine label="Source" value="Website enquiry" />
                  <CrmLine label="Owner" value="Front desk" />
                  <CrmLine label="Next step" value="Tuesday · 10:30am" />
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/30">Recent activity</div>
                <div className="mt-5 space-y-3">
                  <Activity icon={<Mail size={14} />} title="Follow-up sent" meta="10:05am" />
                  <Activity icon={<MessageSquare size={14} />} title="Customer replied" meta="10:12am" />
                  <Activity icon={<Calendar size={14} />} title="Consultation booked" meta="10:13am" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CrmLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3">
      <span className="text-[11px] text-white/34">{label}</span>
      <span className="text-[11px] font-semibold text-white/76">{value}</span>
    </div>
  );
}

function Activity({ icon, title, meta }: { icon: ReactNode; title: string; meta: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] bg-white/[0.035] p-3.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#DDA34B]/10 text-[#DDA34B]">{icon}</span>
      <div>
        <div className="text-[11px] font-semibold text-white/78">{title}</div>
        <div className="mt-1 text-[9px] text-white/28">{meta}</div>
      </div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[980px]">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[56px]" style={{ fontFamily: DISPLAY }}>
            The practical stuff.
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-[#D7CFC5] border-y border-[#D7CFC5]">
          {FAQS.map((item, index) => {
            const active = open === index;
            return (
              <button key={item.q} type="button" className="w-full py-6 text-left" onClick={() => setOpen(active ? null : index)}>
                <div className="flex items-center justify-between gap-5">
                  <span className="text-[16px] font-semibold text-[#111318] sm:text-[18px]">{item.q}</span>
                  <ChevronDown size={18} className={`shrink-0 transition-transform ${active ? "rotate-180" : ""}`} />
                </div>
                {active && <p className="mt-4 max-w-[760px] pr-8 text-[14px] leading-[1.7] text-[#666B67]">{item.a}</p>}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-[#1E2B29] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <Reveal className="mx-auto max-w-[1050px] text-center">
        <Eyebrow dark>Keep the next step moving</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-[900px] text-[46px] font-medium leading-[0.94] tracking-[-0.055em] sm:text-[64px] lg:text-[74px]" style={{ fontFamily: DISPLAY }}>
          Stop relying on memory to make the next move.
        </h2>
        <p className="mx-auto mt-6 max-w-[620px] text-[15px] leading-[1.7] text-white/62 sm:text-[17px]">
          Zapla keeps the conversation, follow-up and next step connected so good opportunities do not quietly disappear.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#F7F4EE] px-6 text-[13px] font-semibold text-[#1E2B29]">
            Book a Call <ArrowRight size={15} />
          </a>
          <a href={PRICING_URL} className="inline-flex h-[50px] items-center rounded-[10px] border border-white/20 px-6 text-[13px] font-semibold text-[#F7F4EE]">
            View pricing
          </a>
        </div>
      </Reveal>
    </section>
  );
}
