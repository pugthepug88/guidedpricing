import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Mail,
  MessageSquareText,
  Plus,
  Tag,
} from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";
import { ZaplaPetal } from "@/components/ZaplaPetal";

export const Route = createFileRoute("/customer-marketing")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Customer Marketing Software for Small Business | Zapla" },
      {
        name: "description",
        content:
          "Use customer data and tags to build relevant audiences, run SMS and email outreach through automations, and track campaign engagement, conversions and return in Zapla.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CustomerMarketingPage,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const ZAPLA_WORDMARK_URL = "/concept/zapla-logo-dark.svg";

const CUSTOMERS = [
  { initials: "MT", name: "Mia Thompson", detail: "Residential · Sydney", selected: true },
  { initials: "DK", name: "Daniel Kim", detail: "Residential · Sydney", selected: true },
  { initials: "PS", name: "Priya Shah", detail: "Commercial · Sydney", selected: false },
  { initials: "LM", name: "Lucas Martin", detail: "Residential · Newcastle", selected: false },
  { initials: "SN", name: "Sophie Nguyen", detail: "Residential · Sydney", selected: true },
] as const;

const FAQS = [
  {
    q: "What is Customer Marketing in Zapla?",
    a: "It is the proactive side of Zapla. Use customer data to build a relevant audience, run SMS or email outreach through automations, then use Campaigns to group the wider marketing initiative and track what it produced.",
  },
  {
    q: "Can I target customers using tags?",
    a: "Yes. Tags, fields, filters and saved lists can help define who should be included instead of treating the whole customer database as one audience.",
  },
  {
    q: "Where do SMS and email campaigns run?",
    a: "SMS and email outreach is built through Automations. The Campaigns area is used to group marketing assets and track engagement, conversions and performance across the wider campaign.",
  },
  {
    q: "What can sit inside a Campaign?",
    a: "Campaigns can group supported assets such as forms, websites, funnels, landing pages, calendars, automations, pipelines, email templates, social posts and tracking links.",
  },
  {
    q: "Is Customer Marketing the same as Reopen?",
    a: "No. Reopen focuses on dormant enquiries and stale opportunities. Customer Marketing is broader proactive marketing to relevant customer groups.",
  },
] as const;

function CustomerMarketingPage() {
  return (
    <main
      data-page="customer-marketing"
      className="min-h-screen overflow-x-hidden bg-white text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <Hero />
      <CinematicCampaignStory />
      <CampaignExamples />
      <ConnectedSystem />
      <Faq />
      <GrowthCta />
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
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduced ? 0 : 0.44, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function PrimaryButton() {
  return (
    <a
      href={BOOK_URL}
      className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2B29] focus-visible:ring-offset-2"
    >
      Book a Call <ArrowRight size={15} />
    </a>
  );
}

function ProductBar({ label, right }: { label: string; right?: string }) {
  return (
    <div className="flex min-h-[46px] items-center justify-between border-b border-[#E3E7E3] bg-[#FCFCFB] px-4 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <img src={ZAPLA_WORDMARK_URL} alt="Zapla" className="h-[18px] w-auto shrink-0 object-contain" />
        <span className="h-4 w-px shrink-0 bg-[#D9DEDA]" />
        <span className="truncate text-[7px] font-bold uppercase tracking-[0.12em] text-[#78817B]">{label}</span>
      </div>
      {right ? (
        <span className="hidden text-[8px] font-bold uppercase tracking-[0.12em] text-[#929893] sm:block">
          {right}
        </span>
      ) : null}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FCFCFA] px-5 pb-16 pt-[106px] sm:px-10 sm:pb-20 sm:pt-[116px] lg:px-16 lg:pb-24 lg:pt-[120px]">
      <div className="pointer-events-none absolute right-[4%] top-[7%] h-[440px] w-[440px] rounded-full bg-[#2563FF]/[0.045] blur-[125px]" />
      <div className="pointer-events-none absolute right-[18%] bottom-[-12%] h-[300px] w-[300px] rounded-full bg-[#DDA34B]/[0.06] blur-[110px]" />

      <div className="relative mx-auto grid max-w-[1380px] items-center gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:gap-14">
        <Reveal className="max-w-[625px]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#58706F]">
            Customer Marketing
          </div>

          <h1
            className="mt-5 text-[41px] font-medium leading-[0.99] tracking-[-0.052em] sm:text-[48px] lg:text-[53px]"
            style={{ fontFamily: DISPLAY }}
          >
            <span className="block">Turn the customers</span>
            <span className="block">you already know into</span>
            <span className="block text-[#2563FF]">your next campaign.</span>
          </h1>

          <p className="mt-6 max-w-[570px] text-[15px] leading-[1.72] text-[#626862] sm:text-[17px]">
            Use customer data and tags to choose the right audience, then run targeted SMS and email outreach through Zapla Automations.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton />
            <a
              href="#customer-marketing-flow"
              className="inline-flex h-[50px] items-center rounded-full border border-[#D7DDD8] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#BBC5BD]"
            >
              See how it works
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <HeroAutomation />
        </Reveal>
      </div>
    </section>
  );
}

function HeroAutomation() {
  return (
    <div className="relative mx-auto w-full max-w-[820px]">
      <div className="pointer-events-none absolute -right-8 top-8 h-[300px] w-[300px] rounded-full bg-[#2563FF]/[0.045] blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-10 left-[20%] h-[220px] w-[220px] rounded-full bg-[#DDA34B]/[0.055] blur-[85px]" />

      <div className="relative rounded-[28px] border border-[#E0E4E1] bg-white px-5 py-6 shadow-[0_34px_90px_rgba(30,43,41,.11)] sm:px-7 sm:py-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#7E8781]">
              Targeted outreach
            </div>
            <div className="mt-1 text-[18px] font-semibold tracking-[-0.03em] text-[#303632]">
              Service availability
            </div>
          </div>
          <span className="hidden rounded-full border border-[#DCE5FF] bg-[#F6F8FF] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-[#2563FF] sm:inline-flex">
            Automation
          </span>
        </div>

        <div className="mt-6 grid items-center gap-5 lg:grid-cols-[0.72fr_auto_1.28fr]">
          <div className="rounded-[18px] border border-[#DCE4D7] bg-[#F2F6EF] p-4 sm:p-5">
            <div className="text-[7px] font-bold uppercase tracking-[0.13em] text-[#7A8673]">
              Audience
            </div>
            <div className="mt-1.5 flex items-end justify-between gap-4">
              <div>
                <div className="text-[26px] font-semibold leading-none tracking-[-0.04em] text-[#303832]">86</div>
                <div className="mt-1 text-[9px] text-[#7E877F]">matching customers</div>
              </div>
              <Check size={16} className="text-[#708060]" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Existing customer", "Service due", "Sydney"].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[8px] font-semibold text-[#596458]"
                >
                  <Tag size={9} className="text-[#718067]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden items-center lg:flex">
            <span className="h-px w-10 bg-[#C8CECA]" />
            <ArrowRight size={15} className="-ml-1 text-[#8D9690]" />
          </div>

          <div className="rounded-[20px] border border-[#DDE3E8] bg-[#FBFCFF] p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
              <div className="rounded-[15px] border border-[#DCE5FF] bg-white p-4 shadow-[0_8px_24px_rgba(37,99,255,.045)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#2563FF]">SMS</div>
                  <MessageSquareText size={13} className="text-[#2563FF]" />
                </div>
                <div className="mt-2 text-[11px] font-semibold text-[#36414F]">Send message</div>
                <div className="mt-2 text-[9px] leading-[1.45] text-[#798391]">
                  Extra service appointments next week.
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="rounded-full border border-[#EADBBE] bg-[#FFF9EE] px-3 py-2 text-center">
                  <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#A66F20]">Wait</div>
                  <div className="mt-0.5 text-[9px] font-semibold text-[#66583F]">2 days</div>
                </div>
              </div>

              <div className="rounded-[15px] border border-[#DCE5FF] bg-white p-4 shadow-[0_8px_24px_rgba(37,99,255,.045)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#2563FF]">Email</div>
                  <Mail size={13} className="text-[#2563FF]" />
                </div>
                <div className="mt-2 text-[11px] font-semibold text-[#36414F]">Follow up</div>
                <div className="mt-2 text-[9px] leading-[1.45] text-[#798391]">
                  Continue the outreach if needed.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#E7EAE7] pt-4 text-[9px] font-semibold">
          <span className="text-[#66715F]">CRM data chooses the audience.</span>
          <span className="text-[#C4C9C5]">→</span>
          <span className="text-[#2563FF]">Automation runs the outreach.</span>
        </div>
      </div>
    </div>
  );
}

function AutomationNode({
  dot,
  eyebrow,
  title,
  meta,
  icon,
  last = false,
}: {
  dot: string;
  eyebrow: string;
  title: string;
  meta: string;
  icon?: ReactNode;
  last?: boolean;
}) {
  return (
    <div className={"relative grid grid-cols-[18px_1fr] gap-3 " + (last ? "" : "pb-4")}>
      <span className="relative z-10 mt-[13px] h-[9px] w-[9px] rounded-full border-2 border-white" style={{ backgroundColor: dot }} />
      <div className="rounded-[13px] border border-[#E2E6E2] bg-white px-4 py-3 shadow-[0_8px_22px_rgba(34,44,37,.035)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#949A95]">{eyebrow}</div>
            <div className="mt-1 text-[11px] font-semibold text-[#3D4540]">{title}</div>
          </div>
          {icon ? <span className="text-[#2563FF]">{icon}</span> : null}
        </div>
        <div className="mt-1 text-[8px] text-[#8A918C]">{meta}</div>
      </div>
    </div>
  );
}

function CinematicCampaignStory() {
  const scenes = [
    { key: "audience", label: "Audience", eyebrow: "Start with the customer" },
    { key: "automation", label: "Automation", eyebrow: "Put the audience into motion" },
    { key: "campaign", label: "Campaigns", eyebrow: "Keep the initiative together" },
    { key: "performance", label: "Performance", eyebrow: "See what it produced" },
  ] as const;

  return (
    <section
      id="customer-marketing-flow"
      className="relative bg-[#F7F5F1] px-5 pb-28 pt-16 text-[#111318] sm:px-10 sm:pb-32 sm:pt-20 lg:px-12 lg:pb-[18vh] lg:pt-[92px]"
    >
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-black/[0.08] pb-6 sm:mb-14 lg:mb-16">
          <div className="max-w-[760px]">
            <div className="text-[9px] font-semibold uppercase tracking-[0.19em] text-[#77716A]">
              One connected campaign
            </div>
            <p
              className="mt-3 text-[27px] font-medium leading-[1.12] tracking-[-0.04em] text-[#242629] sm:text-[34px] lg:text-[38px]"
              style={{ fontFamily: DISPLAY }}
            >
              The customer data, the outreach and the result
              <span className="text-[#777B77]"> stay part of the same story.</span>
            </p>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            {scenes.map((scene, index) => (
              <div key={scene.key} className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.12em] text-[#8A8D89]">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{scene.label}</span>
                {index < scenes.length - 1 ? <span className="mx-1 h-px w-5 bg-[#C8CBC7]" /> : null}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <AudienceScene index={0} />
          <AutomationScene index={1} />
          <CampaignScene index={2} />
          <PerformanceScene index={3} />
        </div>
      </div>
    </section>
  );
}

function SceneShell({
  index,
  bg,
  dark = false,
  children,
}: {
  index: number;
  bg: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="relative mb-8 lg:sticky lg:top-[92px] lg:mb-[12vh] lg:h-[calc(100vh-116px)] lg:min-h-[650px] lg:max-h-[850px]"
      style={{ zIndex: 10 + index }}
    >
      <article
        className={
          "relative min-h-[720px] overflow-hidden rounded-[30px] border px-7 py-9 shadow-[0_26px_80px_rgba(28,25,30,.09)] sm:px-10 sm:py-11 lg:h-full lg:min-h-0 lg:px-[58px] lg:py-[52px] " +
          (dark ? "border-white/[0.10] text-white" : "border-black/[0.06] text-[#111318]")
        }
        style={{ backgroundColor: bg }}
      >
        {children}
      </article>
    </div>
  );
}

function SceneCopy({
  step,
  eyebrow,
  title,
  copy,
  dark = false,
  accent,
}: {
  step: string;
  eyebrow: string;
  title: ReactNode;
  copy: string;
  dark?: boolean;
  accent: string;
}) {
  return (
    <div className="relative z-20 flex h-full flex-col justify-center">
      <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.17em]">
        <span style={{ color: accent }}>{step}</span>
        <span className={dark ? "h-px w-7 bg-white/20" : "h-px w-7 bg-black/15"} />
        <span className={dark ? "text-white/46" : "text-[#797D78]"}>{eyebrow}</span>
      </div>

      <h2
        className={
          "mt-7 max-w-[500px] text-[43px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[54px] lg:text-[62px] " +
          (dark ? "text-white" : "text-[#17191C]")
        }
        style={{ fontFamily: DISPLAY }}
      >
        {title}
      </h2>

      <p className={"mt-6 max-w-[470px] text-[16px] leading-[1.62] sm:text-[17px] " + (dark ? "text-white/60" : "text-[#666B66]")}>
        {copy}
      </p>
    </div>
  );
}

function AudienceScene({ index }: { index: number }) {
  const people = [
    ["MT", "Mia Thompson", "Residential · Sydney", true],
    ["DK", "Daniel Kim", "Residential · Sydney", true],
    ["PS", "Priya Shah", "Commercial · Sydney", false],
    ["LM", "Lucas Martin", "Residential · Newcastle", false],
    ["SN", "Sophie Nguyen", "Residential · Sydney", true],
    ["JW", "James Wong", "Residential · Sydney", true],
  ] as const;

  return (
    <SceneShell index={index} bg="#F1EFE8">
      <div className="pointer-events-none absolute -right-[10%] -top-[25%] h-[520px] w-[520px] rounded-full bg-[#DCE6D7]/55 blur-3xl" />
      <div className="relative grid h-full gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-[72px]">
        <SceneCopy
          step="01"
          eyebrow="Audience"
          accent="#718067"
          title={<>Your whole database isn't the audience.</>}
          copy="Use tags, fields and saved lists to narrow the customers this campaign is actually for."
        />

        <div className="relative min-h-[480px] lg:min-h-[560px]">
          <div className="absolute left-0 top-5 z-20 flex max-w-[520px] flex-wrap gap-2">
            {["Existing customer", "Service due", "Sydney"].map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white/90 px-4 py-2.5 text-[10px] font-semibold text-[#505B51] shadow-[0_8px_24px_rgba(53,64,55,.06)]"
              >
                <Tag size={11} className="text-[#718067]" />
                {item}
              </motion.span>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 top-[88px] overflow-hidden">
            <div className="absolute left-0 right-0 top-0 border-y border-black/[0.08]">
              {people.map(([initials, name, detail, selected], i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: 26 }}
                  whileInView={{
                    opacity: selected ? 1 : 0.22,
                    x: selected ? 0 : 42,
                    filter: selected ? "blur(0px)" : "blur(0.45px)",
                  }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.62, delay: 0.08 + i * 0.06, ease: EASE }}
                  className="grid grid-cols-[48px_1fr_auto] items-center gap-4 border-b border-black/[0.08] py-4 last:border-b-0 sm:grid-cols-[54px_1fr_auto]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/75 text-[9px] font-semibold text-[#59605A] ring-1 ring-black/[0.04]">
                    {initials}
                  </span>
                  <div>
                    <div className="text-[14px] font-semibold tracking-[-0.02em] text-[#2E332F]">{name}</div>
                    <div className="mt-1 text-[10px] text-[#858A85]">{detail}</div>
                  </div>
                  <span className={"mr-1 text-[10px] font-semibold " + (selected ? "text-[#667458]" : "text-[#B8BBB8]")}>
                    {selected ? "Included" : "Filtered out"}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.48, ease: EASE }}
              className="absolute bottom-3 right-3 rounded-[22px] bg-[#1E2B29] px-6 py-5 text-white shadow-[0_24px_60px_rgba(30,43,41,.20)]"
            >
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/50">Audience matched</div>
              <div className="mt-2 text-[38px] font-semibold leading-none tracking-[-0.05em]">86</div>
              <div className="mt-1 text-[10px] text-white/58">customers ready for outreach</div>
            </motion.div>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

function AutomationScene({ index }: { index: number }) {
  return (
    <SceneShell index={index} bg="#111820" dark>
      <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[620px] w-[620px] rounded-full bg-[#2563FF]/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-30%] left-[34%] h-[520px] w-[520px] rounded-full bg-[#DDA34B]/10 blur-[130px]" />

      <div className="relative grid h-full gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-[64px]">
        <SceneCopy
          step="02"
          eyebrow="Automations"
          accent="#7EA2FF"
          dark
          title={<>Put the right audience into motion.</>}
          copy="Run targeted SMS and email outreach through Automations, with the customer context already decided."
        />

        <div className="relative min-h-[480px] lg:min-h-[560px]">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute left-[4%] top-[7%] rounded-[18px] border border-[#7D8A70]/35 bg-[#202A23] px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,.22)]"
          >
            <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#A8B59E]">Audience</div>
            <div className="mt-1 text-[20px] font-semibold tracking-[-0.03em] text-white">86 customers</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Existing customer", "Service due", "Sydney"].map((item) => (
                <span key={item} className="rounded-full bg-white/[0.07] px-2.5 py-1.5 text-[8px] font-semibold text-white/64">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="absolute left-[17%] top-[26%] h-[58%] w-px origin-top bg-gradient-to-b from-[#72816A] via-[#2563FF] to-[#2563FF]/30"
          />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.62, delay: 0.22, ease: EASE }}
            className="absolute left-[23%] top-[31%] w-[68%] rounded-[24px] border border-[#406FFF]/35 bg-[#162239] px-6 py-5 shadow-[0_30px_70px_rgba(0,0,0,.28)]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#7EA2FF]">Send SMS</div>
                <div className="mt-2 text-[16px] font-semibold text-white">Service availability</div>
              </div>
              <MessageSquareText size={18} className="text-[#7EA2FF]" />
            </div>
            <div className="mt-4 rounded-[14px] bg-white/[0.06] px-4 py-3 text-[11px] leading-[1.55] text-white/66">
              We've opened extra service appointments next week. Want the available times?
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55, delay: 0.42, ease: EASE }}
            className="absolute left-[10%] top-[61%] rounded-full border border-[#DDA34B]/35 bg-[#2A251D] px-5 py-3"
          >
            <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#E5B96E]">Wait</span>
            <span className="ml-3 text-[11px] font-semibold text-white/82">2 days</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.62, delay: 0.55, ease: EASE }}
            className="absolute bottom-[7%] left-[31%] w-[55%] rounded-[22px] border border-[#406FFF]/30 bg-[#151F32] px-6 py-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#7EA2FF]">Send email</div>
                <div className="mt-2 text-[14px] font-semibold text-white">Follow up if needed</div>
              </div>
              <Mail size={17} className="text-[#7EA2FF]" />
            </div>
          </motion.div>
        </div>
      </div>
    </SceneShell>
  );
}

function CampaignScene({ index }: { index: number }) {
  const assets = [
    ["Automation", "Service availability outreach"],
    ["Calendar", "Service booking"],
    ["Landing Page", "Campaign offer"],
    ["Tracking Link", "Campaign link"],
    ["Social Post", "Supporting post"],
  ] as const;

  return (
    <SceneShell index={index} bg="#EFE2D2">
      <div className="pointer-events-none absolute -right-[8%] -top-[22%] h-[520px] w-[520px] rounded-full bg-white/22 blur-3xl" />

      <div className="relative grid h-full gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-[64px]">
        <SceneCopy
          step="03"
          eyebrow="Campaigns"
          accent="#A66F20"
          title={<>One campaign. Everything behind it.</>}
          copy="Group the automation, booking links, forms, pages and other assets behind the initiative, then track them together."
        />

        <div className="relative min-h-[500px] lg:min-h-[570px]">
          <motion.div
            initial={{ opacity: 0, y: 22, rotate: -0.7 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.68, ease: EASE }}
            className="absolute left-0 top-[7%] w-[88%] overflow-hidden rounded-[24px] border border-black/[0.08] bg-white shadow-[0_30px_80px_rgba(65,48,29,.13)]"
          >
            <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-4">
              <div>
                <div className="text-[18px] font-semibold tracking-[-0.03em] text-[#26231F]">Service availability</div>
                <div className="mt-1 text-[8px] text-[#8C8276]">Influence window: 30 days</div>
              </div>
              <span className="rounded-[8px] bg-[#DDA34B] px-4 py-2 text-[8px] font-bold uppercase tracking-[0.1em] text-[#2D2A26]">
                Add assets
              </span>
            </div>

            <div className="flex gap-6 border-b border-black/[0.07] px-5 pt-4 text-[8px] font-semibold text-[#837A70]">
              <span className="border-b-2 border-[#26231F] pb-3 text-[#26231F]">Assets (5)</span>
              <span className="pb-3">Members</span>
              <span className="pb-3">Activity</span>
              <span className="pb-3">Performance</span>
              <span className="pb-3">Settings</span>
            </div>

            <div className="px-5 py-3">
              {assets.map(([type, name], i) => (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.48, delay: 0.08 + i * 0.06, ease: EASE }}
                  className="flex items-center justify-between border-b border-black/[0.06] py-3.5 last:border-b-0"
                >
                  <div>
                    <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#958B80]">{type}</div>
                    <div className="mt-1 text-[10px] font-semibold text-[#413D37]">{name}</div>
                  </div>
                  <Check size={12} className="text-[#7A846E]" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.36, ease: EASE }}
            className="absolute bottom-[3%] right-[-2%] z-30 w-[42%] rounded-[22px] border border-black/[0.08] bg-[#FFFDF9] px-5 py-5 shadow-[0_26px_70px_rgba(65,48,29,.16)]"
          >
            <div className="text-[13px] font-semibold text-[#2F2A24]">Add assets</div>
            <div className="mt-1 text-[8px] text-[#8D8377]">Pick what belongs to this campaign.</div>
            <div className="mt-4 space-y-2.5">
              {["Form", "Website", "Funnel", "Calendar", "Automation", "Pipeline", "Email Template", "Social Post"].map((item) => (
                <div key={item} className="flex items-center justify-between text-[9px] text-[#514B44]">
                  <span>{item}</span>
                  <Plus size={10} className="text-[#9D9286]" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SceneShell>
  );
}

function PerformanceScene({ index }: { index: number }) {
  const funnel = ["Reached", "Engaged", "Converted", "Won deals"] as const;
  const returns = ["Won deal value", "Collected", "Costs", "Return on cost"] as const;

  return (
    <SceneShell index={index} bg="#10151B" dark>
      <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-[#DDA34B]/10 blur-[140px]" />
      <div className="relative grid h-full gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:gap-[64px]">
        <SceneCopy
          step="04"
          eyebrow="Performance"
          accent="#E3B160"
          dark
          title={<>See what turned into business.</>}
          copy="Track engagement, conversions, won deals, costs and return from the same campaign."
        />

        <div className="relative min-h-[480px] lg:min-h-[560px]">
          <div className="absolute left-0 right-0 top-[7%]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#E3B160]">Performance</div>
                <div className="mt-1 text-[17px] font-semibold text-white">Service availability</div>
              </div>
              <div className="text-[8px] text-white/35">30 day influence window</div>
            </div>

            <div className="mt-7 grid grid-cols-4 gap-3">
              {funnel.map((metric, i) => (
                <motion.div
                  key={metric}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}
                  className="relative overflow-hidden rounded-[18px] border border-white/[0.09] bg-white/[0.045] px-4 py-5"
                >
                  <span className="absolute inset-x-0 top-0 h-[2px] bg-[#DDA34B]" />
                  <div className="text-[9px] text-white/42">{metric}</div>
                  <div className="mt-4 text-[34px] font-medium leading-none tracking-[-0.05em] text-white/90">—</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <div className="text-[9px] font-semibold text-white/60">Return</div>
              <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-white/[0.09] bg-white/[0.08] sm:grid-cols-4">
                {returns.map((metric, i) => (
                  <motion.div
                    key={metric}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.45, delay: 0.42 + i * 0.06 }}
                    className="bg-[#151B22] px-4 py-5"
                  >
                    <div className="text-[8px] leading-[1.35] text-white/40">{metric}</div>
                    <div className="mt-3 text-[20px] font-semibold text-white/78">—</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, delay: 0.65, ease: EASE }}
              className="mt-7 flex items-center gap-3 rounded-[16px] border border-[#DDA34B]/25 bg-[#DDA34B]/[0.07] px-5 py-4"
            >
              <span className="h-2 w-2 rounded-full bg-[#DDA34B]" />
              <div className="text-[10px] font-semibold text-[#F0D3A3]">From reach to return, the campaign stays measurable.</div>
            </motion.div>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

function CampaignExamples() {
  const examples = [
    ["Seasonal service", "Existing customer · Service due · Sydney"],
    ["Rate update", "Mortgage client · Variable rate"],
    ["New service", "Existing customer · Relevant service"],
  ] as const;

  return (
    <section className="border-t border-[#ECEEEB] bg-white px-5 py-14 sm:px-10 sm:py-16 lg:px-16">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#777F79]">Campaign ideas</div>
            <h2
              className="mt-3 max-w-[520px] text-[30px] font-medium leading-[1.03] tracking-[-0.045em] text-[#202326] sm:text-[35px]"
              style={{ fontFamily: DISPLAY }}
            >
              Same customer base.
              <span className="block text-[#747A75]">Different reasons to get in touch.</span>
            </h2>
          </div>

          <div className="grid border-y border-[#E3E7E3] sm:grid-cols-3">
            {examples.map(([title, tags], index) => (
              <div
                key={title}
                className={"py-5 sm:px-5 " + (index < examples.length - 1 ? "border-b border-[#E3E7E3] sm:border-b-0 sm:border-r" : "")}
              >
                <div className="text-[13px] font-semibold tracking-[-0.02em] text-[#303733]">{title}</div>
                <div className="mt-2 text-[10px] leading-[1.5] text-[#7A817B]">{tags}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ConnectedSystem() {
  return (
    <section className="bg-[#1E2B29] px-5 py-16 text-white sm:px-10 sm:py-20 lg:px-16">
      <Reveal className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <div className="max-w-[620px]">
          <h2
            className="text-[32px] font-medium leading-[1.04] tracking-[-0.045em] sm:text-[38px] lg:text-[41px]"
            style={{ fontFamily: DISPLAY }}
          >
            From customer data to campaign results,
            <span className="block text-[#AFC3FF]">it stays connected.</span>
          </h2>
          <p className="mt-5 max-w-[570px] text-[14px] leading-[1.7] text-white/58">
            Build the audience in your CRM. Run the outreach through Automations. Group the initiative in Campaigns. Track what engaged and converted, while replies and customer history stay connected to the record.
          </p>
        </div>

        <div className="grid gap-0 sm:grid-cols-4">
          {[
            ["CRM", "Customer data + tags"],
            ["Automations", "SMS + email outreach"],
            ["Campaigns", "Assets + attribution"],
            ["Performance", "Engagement + results"],
          ].map(([title, copy], index) => (
            <div
              key={title}
              className={"py-4 sm:px-5 " + (index < 3 ? "border-b border-white/12 sm:border-b-0 sm:border-r" : "")}
            >
              <div className={"text-[9px] font-bold uppercase tracking-[0.13em] " + (index < 2 ? "text-[#AFC3FF]" : "text-[#DDA34B]")}>{title}</div>
              <div className="mt-2 text-[11px] leading-[1.55] text-white/58">{copy}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = !!useReducedMotion();

  return (
    <section className="bg-[#FCFCFA] px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.64fr_1.36fr] lg:gap-16">
        <Reveal className="max-w-[330px]">
          <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#68736C]">Questions</div>
          <h2
            className="mt-3 text-[28px] font-medium leading-[1.04] tracking-[-0.042em] sm:text-[33px]"
            style={{ fontFamily: DISPLAY }}
          >
            The practical stuff.
          </h2>
        </Reveal>

        <div className="border-y border-[#DDE2DE]">
          {FAQS.map((item, index) => {
            const active = open === index;

            return (
              <div key={item.q} className="border-b border-[#DDE2DE] last:border-b-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-5 py-5 text-left"
                  onClick={() => setOpen(active ? null : index)}
                  aria-expanded={active}
                >
                  <span className="text-[14px] font-semibold tracking-[-0.015em] text-[#282E2A] sm:text-[15px]">
                    {item.q}
                  </span>

                  <motion.span
                    className={
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border " +
                      (active
                        ? "border-[#1E2B29] bg-[#1E2B29] text-white"
                        : "border-[#DDE2DE] bg-white text-[#59615B]")
                    }
                    animate={reduced ? undefined : { rotate: active ? 180 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
                  >
                    <ChevronDown size={14} strokeWidth={1.7} />
                  </motion.span>
                </button>

                <motion.div
                  className="grid overflow-hidden"
                  initial={false}
                  animate={{ gridTemplateRows: active ? "1fr" : "0fr", opacity: active ? 1 : 0 }}
                  transition={{ duration: reduced ? 0 : 0.22, ease: EASE }}
                >
                  <div className="min-h-0">
                    <p className="max-w-[700px] pb-5 pr-10 text-[13px] leading-[1.7] text-[#6C736D]">
                      {item.a}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GrowthCta() {
  return (
    <section className="border-t border-[#E3E7E3] bg-white px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <Reveal className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <div className="max-w-[760px]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111214]">
            <ZaplaPetal size={27} />
          </div>
          <div className="mt-5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#68736C]">Zapla Growth</div>
          <h2
            className="mt-2 text-[31px] font-medium leading-[1.04] tracking-[-0.045em] text-[#242A26] sm:text-[37px] lg:text-[40px]"
            style={{ fontFamily: DISPLAY }}
          >
            Put the customer data you already have to work.
          </h2>
          <p className="mt-4 max-w-[620px] text-[14px] leading-[1.7] text-[#69706A]">
            Customer Marketing is part of Zapla Growth.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          <a
            href={PRICING_URL}
            className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-white"
          >
            View Growth pricing <ArrowRight size={14} />
          </a>
          <a
            href={BOOK_URL}
            className="inline-flex h-[50px] items-center rounded-full border border-[#D7DDD8] px-6 text-[13px] font-semibold text-[#1E2B29]"
          >
            Book a Call
          </a>
        </div>
      </Reveal>
    </section>
  );
}
