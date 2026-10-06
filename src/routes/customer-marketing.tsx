import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  FileText,
  Mail,
  MessageSquareText,
  MousePointer2,
  Plus,
  Tag,
} from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";

export const Route = createFileRoute("/customer-marketing")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Customer Marketing Software for Small Business | Zapla" },
      {
        name: "description",
        content:
          "Use customer data to build the right audience, automate relevant outreach, connect the forms and pages behind a campaign, and track what converts in Zapla.",
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

const FAQS = [
  {
    q: "What is Customer Marketing in Zapla?",
    a: "Customer Marketing is the proactive side of Zapla. Use customer data to define a relevant audience, run outreach through Automations, connect the assets behind the campaign, and use Campaigns to see what engaged and converted.",
  },
  {
    q: "How can I choose which customers receive a campaign?",
    a: "Customer data such as tags, fields, filters, smart lists and subscription lists can help define the audience instead of treating the whole database as one group.",
  },
  {
    q: "Where do SMS and email campaigns run?",
    a: "SMS and email outreach runs through Automations. The Campaigns area is the tracking and attribution layer that groups the wider initiative and the assets behind it.",
  },
  {
    q: "What can sit behind a campaign?",
    a: "Supported assets can include automations, forms, websites, funnels, landing pages, calendars, tracking links, pipelines, email templates and social posts.",
  },
  {
    q: "What can Campaigns track?",
    a: "Campaigns can surface members, activity and performance measures such as reach, engagement, conversions, won deals, costs and return-related metrics.",
  },
  {
    q: "Is Customer Marketing the same as Reopen?",
    a: "No. Reopen focuses on dormant enquiries and stale opportunities. Customer Marketing is broader proactive marketing to relevant customer groups.",
  },
] as const;

const CAPABILITIES = [
  {
    key: "audience",
    title: "Reach the right customers",
    copy: "Use tags, fields, smart lists and subscription status to define who this campaign is actually for.",
  },
  {
    key: "automation",
    title: "Automate what happens next",
    copy: "Run SMS and email outreach through workflows that can respond to timing and customer actions.",
  },
  {
    key: "convert",
    title: "Give the campaign somewhere to convert",
    copy: "Connect forms, landing pages, funnels and booking pages to the same marketing initiative.",
  },
  {
    key: "performance",
    title: "See what actually worked",
    copy: "Group campaign assets together and track engagement, conversions, won deals, costs and return.",
  },
] as const;

const USE_CASES = [
  {
    key: "seasonal",
    label: "Seasonal service",
    title: "Fill next week's service capacity.",
    audience: ["Existing customer", "Service due", "Sydney", "Subscribed"],
    outreach: "SMS first, then email if needed",
    destination: "Service booking page",
    result: "Booked appointment",
  },
  {
    key: "update",
    label: "Customer update",
    title: "Tell the right customers when something changes.",
    audience: ["Existing customer", "Relevant service", "Active customer"],
    outreach: "Targeted customer update",
    destination: "Information page",
    result: "Reply or next action",
  },
  {
    key: "service",
    label: "New service",
    title: "Give existing customers another reason to buy.",
    audience: ["Existing customer", "Relevant service", "Eligible"],
    outreach: "Launch sequence",
    destination: "Offer landing page",
    result: "Enquiry or booking",
  },
  {
    key: "rate",
    label: "Rate change",
    title: "Reach customers affected by a change.",
    audience: ["Mortgage client", "Variable rate", "Subscribed"],
    outreach: "SMS + email update",
    destination: "Review form / booking",
    result: "Conversation started",
  },
] as const;

function CustomerMarketingPage() {
  return (
    <main
      data-page="customer-marketing"
      className="min-h-screen overflow-x-hidden bg-[#FCFCFA] text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <Hero />
      <CapabilityExplorer />
      <SupportingCapabilities />
      <ConnectedLoop />
      <UseCaseSelector />
      <PerformanceProof />
      <ConnectedSystem />
      <Faq />
      <GrowthCta />
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
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduced ? 0 : 0.48, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function PrimaryButton() {
  return (
    <a
      href={BOOK_URL}
      className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#111318] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318] focus-visible:ring-offset-2"
    >
      Book a Call <ArrowRight size={15} />
    </a>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FCFCFA] px-5 pb-8 pt-[116px] sm:px-10 sm:pb-10 sm:pt-[126px] lg:px-16 lg:pb-12 lg:pt-[136px]">
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="mx-auto max-w-[940px] text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#58706F]">
            Customer Marketing
          </div>

          <h1
            className="mx-auto mt-5 max-w-[880px] text-[40px] font-medium leading-[0.99] tracking-[-0.052em] sm:text-[49px] lg:text-[56px]"
            style={{ fontFamily: DISPLAY }}
          >
            Turn the customers you already know into
            <span className="text-[#2563FF]"> your next campaign.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[700px] text-[15px] leading-[1.72] text-[#636963] sm:text-[17px]">
            Use customer data to build the right audience, automate relevant outreach, and see what your marketing turns into.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryButton />
            <a
              href="#customer-marketing-system"
              className="inline-flex h-[50px] items-center rounded-[10px] border border-[#D7DDD8] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#BBC5BD]"
            >
              See how it works
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-9 sm:mt-10 lg:mt-11" delay={0.05}>
          <HeroStage />
        </Reveal>
      </div>
    </section>
  );
}

function HeroStage() {
  const reduced = !!useReducedMotion();

  return (
    <div className="relative mx-auto min-h-[350px] max-w-[1040px] sm:min-h-[390px] lg:min-h-[420px]">
      <div className="pointer-events-none absolute left-[14%] right-[12%] top-[55%] h-px bg-[#E4E7E4]" />

      <div className="absolute left-[2%] top-[22%] z-10 hidden space-y-2 sm:block">
        {[
          ["Existing customer", "#99A36D"],
          ["Service due", "#DDA34B"],
          ["Sydney", "#9B86B8"],
          ["Subscribed", "#C96C85"],
        ].map(([label, color], index) => (
          <motion.div
            key={label}
            initial={reduced ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: reduced ? 0 : 0.42, delay: reduced ? 0 : index * 0.06, ease: EASE }}
            className="flex min-w-[160px] items-center gap-2.5 rounded-[12px] border border-[#E4E6E2] bg-white px-3.5 py-2.5 shadow-[0_10px_28px_rgba(34,42,36,.04)]"
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[8px] font-semibold text-[#5D635E]">{label}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 18, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.42 }}
        transition={{ duration: reduced ? 0 : 0.56, delay: reduced ? 0 : 0.08, ease: EASE }}
        className="absolute left-[12%] top-[18%] z-30 w-[310px] rounded-[24px] bg-[#1E2B29] p-6 text-white shadow-[0_30px_75px_rgba(30,43,41,.20)] sm:left-[19%] sm:w-[350px]"
      >
        <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#BFC6AE]">Smart audience</div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-[54px] font-medium leading-none tracking-[-0.065em]">86</div>
            <div className="mt-2 text-[10px] text-white/55">matching customers</div>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[#C7D0BA]">
            <Check size={17} />
          </span>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 text-[10px] leading-[1.55] text-white/65">
          Existing customers due for service in Sydney
        </div>
      </motion.div>

      <div className="pointer-events-none absolute left-[44%] top-[54%] z-20 hidden h-px w-[9%] bg-[#BAC1BC] sm:block" />
      <ArrowRight
        size={14}
        className="pointer-events-none absolute left-[52%] top-[calc(54%-7px)] z-20 hidden text-[#969E98] sm:block"
      />

      <motion.div
        initial={reduced ? false : { opacity: 0, x: 28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.42 }}
        transition={{ duration: reduced ? 0 : 0.58, delay: reduced ? 0 : 0.18, ease: EASE }}
        className="absolute right-[8%] top-[13%] z-40 w-[360px] overflow-hidden rounded-[24px] border border-[#DCE5FF] bg-white shadow-[0_32px_82px_rgba(37,99,255,.13)] sm:right-[12%] sm:w-[410px]"
      >
        <div className="flex items-center justify-between border-b border-[#E7EBF4] px-5 py-4">
          <div>
            <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#2563FF]">Automation</div>
            <div className="mt-1 text-[14px] font-semibold tracking-[-0.02em] text-[#303846]">Service availability</div>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#EEF2FF] text-[#2563FF]">
            <MessageSquareText size={15} />
          </span>
        </div>

        <div className="px-5 py-5">
          <div className="rounded-[15px] bg-[#F5F7FB] px-4 py-4">
            <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#2563FF]">Send SMS</div>
            <div className="mt-2 text-[11px] leading-[1.58] text-[#5E6876]">
              We've opened extra service appointments next week. Want the available times?
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="rounded-[12px] border border-[#E5E8E5] px-3 py-3">
              <div className="text-[7px] font-bold uppercase tracking-[0.11em] text-[#9A7B48]">Wait</div>
              <div className="mt-1 text-[9px] font-semibold text-[#555C56]">2 days</div>
            </div>
            <ArrowRight size={12} className="text-[#A7ADA8]" />
            <div className="rounded-[12px] border border-[#E5E8E5] px-3 py-3">
              <div className="text-[7px] font-bold uppercase tracking-[0.11em] text-[#2563FF]">Email</div>
              <div className="mt-1 text-[9px] font-semibold text-[#555C56]">If needed</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 0.38 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.24 }}
        className="absolute right-[1%] top-[9%] z-10 hidden space-y-3 sm:block"
      >
        {[
          ["Landing page", "#9B86B8"],
          ["Booking page", "#DDA34B"],
          ["Form submitted", "#E97D62"],
          ["Campaign performance", "#99A36D"],
        ].map(([label, color], index) => (
          <motion.div
            key={label}
            animate={reduced ? undefined : { y: [0, index % 2 === 0 ? -4 : 4, 0] }}
            transition={{ duration: 5.2 + index * 0.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex min-w-[178px] items-center gap-3 rounded-[12px] border border-[#E5E7E4] bg-white px-3.5 py-2.5"
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[8px] font-semibold text-[#666C67]">{label}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 text-center text-[9px] font-semibold tracking-[0.01em] text-[#7A807A]">
        Audience selected <span className="mx-2 text-[#B5BBB6]">→</span>
        Outreach running <span className="mx-2 text-[#B5BBB6]">→</span>
        Campaign stays connected
      </div>
    </div>
  );
}

function CapabilityExplorer() {
  const [active, setActive] = useState(0);

  return (
    <section id="customer-marketing-system" className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1260px]">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <h2
            className="text-[34px] font-medium leading-[1.02] tracking-[-0.048em] text-[#17191C] sm:text-[42px] lg:text-[48px]"
            style={{ fontFamily: DISPLAY }}
          >
            More than sending another message.
          </h2>
          <p className="mx-auto mt-4 max-w-[650px] text-[14px] leading-[1.7] text-[#6A6F6A] sm:text-[15px]">
            Customer Marketing connects who you know, what happens next, where the campaign converts and what it produced.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <div className="border-y border-[#D8D1C7]">
            {CAPABILITIES.map((item, index) => {
              const open = active === index;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActive(index)}
                  className="block w-full border-b border-[#D8D1C7] py-5 text-left last:border-b-0 sm:py-6"
                  aria-pressed={open}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={
                        "text-[17px] font-semibold tracking-[-0.025em] transition-colors sm:text-[19px] " +
                        (open ? "text-[#111318]" : "text-[#5F625F]")
                      }
                    >
                      {item.title}
                    </span>
                    <span
                      className={
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors " +
                        (open
                          ? "border-[#111318] bg-[#111318] text-white"
                          : "border-[#CBC5BC] bg-transparent text-[#777B77]")
                      }
                    >
                      {open ? <Check size={13} /> : <Plus size={13} />}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.p
                        initial={{ opacity: 0, height: 0, y: -4 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.24, ease: EASE }}
                        className="max-w-[500px] overflow-hidden pr-8 text-[13px] leading-[1.7] text-[#6E726E]"
                      >
                        <span className="block pt-3">{item.copy}</span>
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          <CapabilityStage active={active} />
        </div>
      </div>
    </section>
  );
}

function CapabilityStage({ active }: { active: number }) {
  const reduced = !!useReducedMotion();

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-[26px] border border-[#DDD6CC] bg-[#FCFBF8] shadow-[0_24px_70px_rgba(51,45,39,.07)]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={reduced ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? undefined : { opacity: 0, x: -10 }}
          transition={{ duration: reduced ? 0 : 0.32, ease: EASE }}
          className="absolute inset-0"
        >
          {active === 0 ? <AudienceVisual /> : null}
          {active === 1 ? <AutomationVisual /> : null}
          {active === 2 ? <ConversionVisual /> : null}
          {active === 3 ? <CampaignPerformanceVisual /> : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AudienceVisual() {
  const customers = [
    ["Mia Thompson", "Residential · Sydney", true],
    ["Daniel Kim", "Residential · Sydney", true],
    ["Priya Shah", "Commercial · Sydney", false],
    ["Lucas Martin", "Residential · Newcastle", false],
    ["Sophie Nguyen", "Residential · Sydney", true],
  ] as const;

  return (
    <div className="h-full p-6 sm:p-8">
      <div className="flex items-end justify-between gap-5">
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#737650]">Smart audience</div>
          <div className="mt-2 text-[22px] font-semibold tracking-[-0.03em]">Residential service due</div>
        </div>
        <div className="rounded-[14px] bg-[#F0F1EC] px-4 py-3 text-right">
          <div className="text-[26px] font-semibold leading-none tracking-[-0.04em]">86</div>
          <div className="mt-1 text-[8px] text-[#767D74]">matching customers</div>
        </div>
      </div>

      <div className="mt-7 grid gap-6 md:grid-cols-[0.72fr_1.28fr]">
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#979B97]">Rules</div>
          <div className="mt-3 space-y-2.5">
            {["Existing customer", "Service due", "Sydney", "SMS subscribed"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-[12px] border border-[#E3E5DF] bg-white px-3.5 py-3">
                <div className="flex items-center gap-2 text-[9px] font-semibold text-[#4F5650]">
                  <Tag size={10} className="text-[#737650]" />
                  {item}
                </div>
                <Check size={11} className="text-[#737650]" />
              </div>
            ))}
          </div>
        </div>

        <div className="border-y border-[#E1E4DF]">
          {customers.map(([name, detail, selected]) => (
            <div key={name} className={"flex items-center justify-between border-b border-[#E7E9E5] py-3.5 last:border-b-0 " + (selected ? "" : "opacity-30")}>
              <div>
                <div className="text-[10px] font-semibold text-[#373D38]">{name}</div>
                <div className="mt-1 text-[8px] text-[#919691]">{detail}</div>
              </div>
              <span className={"text-[8px] font-semibold " + (selected ? "text-[#737650]" : "text-[#AEB2AE]")}>
                {selected ? "Included" : "Filtered out"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AutomationVisual() {
  return (
    <div className="h-full bg-[#18191C] p-6 text-white sm:p-8">
      <div className="flex items-start justify-between gap-5">
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#77A0FF]">Automation</div>
          <div className="mt-2 text-[22px] font-semibold tracking-[-0.03em]">Service availability</div>
          <div className="mt-1 text-[9px] text-white/42">Audience: Residential service due</div>
        </div>
        <span className="rounded-full bg-[#2563FF]/15 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-[#8AA9FF]">
          Active
        </span>
      </div>

      <div className="mt-7 space-y-3">
        <AutomationRow tone="blue" icon={<MessageSquareText size={14} />} label="Send SMS" copy="Extra service appointments next week." />
        <AutomationRow tone="gold" label="If customer replies or books" copy="Stop the follow-up and continue the customer journey." />
        <AutomationRow tone="blue" icon={<Mail size={14} />} label="If no response" copy="Send a follow-up email two days later." />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {["Customer enters audience", "Timing", "Customer action", "Next step"].map((item, index) => (
          <span
            key={item}
            className="rounded-full px-3 py-2 text-[8px] font-semibold"
            style={{
              backgroundColor: index === 1 ? "rgba(221,163,75,.10)" : "rgba(255,255,255,.06)",
              color: index === 1 ? "#E7B96F" : "rgba(255,255,255,.56)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function AutomationRow({
  tone,
  icon,
  label,
  copy,
}: {
  tone: "blue" | "gold";
  icon?: ReactNode;
  label: string;
  copy: string;
}) {
  const blue = tone === "blue";
  return (
    <div
      className={
        "rounded-[16px] border px-4 py-4 " +
        (blue
          ? "border-[#456CF0]/30 bg-[#20263A]"
          : "border-[#DDA34B]/24 bg-[#2A241B]")
      }
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className={"text-[8px] font-bold uppercase tracking-[0.12em] " + (blue ? "text-[#7EA2FF]" : "text-[#E3B160]")}>
            {label}
          </div>
          <div className="mt-1.5 text-[10px] leading-[1.55] text-white/58">{copy}</div>
        </div>
        {icon ? <span className={blue ? "text-[#7EA2FF]" : "text-[#E3B160]"}>{icon}</span> : null}
      </div>
    </div>
  );
}

function ConversionVisual() {
  return (
    <div className="h-full p-6 sm:p-8">
      <div>
        <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#9B86B8]">Campaign destinations</div>
        <div className="mt-2 text-[22px] font-semibold tracking-[-0.03em]">Turn attention into the next action.</div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <ConversionCard
          accent="#9B86B8"
          icon={<MousePointer2 size={15} />}
          label="Landing page"
          title="Spring service offer"
          copy="A focused page for the campaign."
        />
        <ConversionCard
          accent="#E97D62"
          icon={<FileText size={15} />}
          label="Form"
          title="Request a quote"
          copy="Capture intent and customer data."
        />
        <ConversionCard
          accent="#DDA34B"
          icon={<CalendarDays size={15} />}
          label="Calendar"
          title="Book service"
          copy="Turn interest into an appointment."
        />
        <ConversionCard
          accent="#C96C85"
          icon={<Check size={15} />}
          label="Next step"
          title="Customer record"
          copy="Keep the action tied to the customer."
        />
      </div>
    </div>
  );
}

function ConversionCard({
  accent,
  icon,
  label,
  title,
  copy,
}: {
  accent: string;
  icon: ReactNode;
  label: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#E3E0DA] bg-white p-5">
      <span className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: accent }} />
      <div className="flex items-center justify-between">
        <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#8C908C]">{label}</div>
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <div className="mt-4 text-[14px] font-semibold tracking-[-0.02em] text-[#343936]">{title}</div>
      <div className="mt-2 text-[9px] leading-[1.55] text-[#777D78]">{copy}</div>
    </div>
  );
}

function CampaignPerformanceVisual() {
  const assets = ["Automation", "Landing page", "Form", "Calendar", "Social post"] as const;

  return (
    <div className="h-full p-6 sm:p-8">
      <div className="flex items-start justify-between gap-5">
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#A66F20]">Campaigns</div>
          <div className="mt-2 text-[22px] font-semibold tracking-[-0.03em]">Service availability</div>
          <div className="mt-1 text-[9px] text-[#8A8E89]">Influence window: 30 days</div>
        </div>
        <span className="rounded-[8px] bg-[#DDA34B] px-3 py-2 text-[8px] font-bold uppercase tracking-[0.09em] text-[#2D2A26]">
          Add assets
        </span>
      </div>

      <div className="mt-6 flex gap-5 overflow-x-auto border-b border-[#E3E5E1] text-[8px] font-semibold text-[#7E837E]">
        <span className="border-b-2 border-[#111318] pb-3 text-[#111318]">Assets</span>
        <span className="pb-3">Members</span>
        <span className="pb-3">Activity</span>
        <span className="pb-3">Performance</span>
        <span className="pb-3">Settings</span>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
        <div className="divide-y divide-[#E6E8E4] border-y border-[#E6E8E4]">
          {assets.map((asset) => (
            <div key={asset} className="flex items-center justify-between py-3.5">
              <span className="text-[9px] font-semibold text-[#4C524D]">{asset}</span>
              <Check size={11} className="text-[#737650]" />
            </div>
          ))}
        </div>

        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#979B97]">Performance</div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {["Reached", "Engaged", "Converted", "Won deals"].map((metric) => (
              <div key={metric} className="rounded-[12px] border border-[#E4E5DF] bg-white p-3.5">
                <div className="text-[8px] text-[#8A908B]">{metric}</div>
                <div className="mt-2 text-[18px] font-semibold text-[#4A504B]">—</div>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {["Costs", "Return on cost"].map((metric) => (
              <div key={metric} className="rounded-[12px] border border-[#EADFCB] bg-[#FFF9EE] p-3.5">
                <div className="text-[8px] text-[#9A7C4E]">{metric}</div>
                <div className="mt-2 text-[18px] font-semibold text-[#6B5B42]">—</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportingCapabilities() {
  return (
    <section className="bg-[#F7F4EE] px-5 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
      <div className="mx-auto grid max-w-[1260px] gap-4 lg:grid-cols-3">
        <SupportCard
          accent="#99A36D"
          label="Audience"
          title="Build the right list"
          copy="Tags, smart lists and subscription lists help narrow who should receive the campaign."
        >
          <div className="mt-6 flex flex-wrap gap-2">
            {["VIP", "Service due", "Subscribed", "Sydney"].map((tag) => (
              <span key={tag} className="rounded-full bg-[#F0F1EC] px-3 py-2 text-[8px] font-semibold text-[#68705D]">
                {tag}
              </span>
            ))}
          </div>
        </SupportCard>

        <SupportCard
          accent="#9B86B8"
          label="Conversion"
          title="Capture the response"
          copy="Forms, funnels, landing pages and booking pages give the campaign somewhere to convert."
        >
          <div className="mt-6 grid grid-cols-3 gap-2">
            {[
              ["Form", "#E97D62"],
              ["Page", "#9B86B8"],
              ["Book", "#DDA34B"],
            ].map(([label, color]) => (
              <div key={label} className="rounded-[12px] border border-[#E5E1DB] bg-white px-3 py-4 text-center">
                <span className="mx-auto block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                <div className="mt-2 text-[8px] font-semibold text-[#555B56]">{label}</div>
              </div>
            ))}
          </div>
        </SupportCard>

        <SupportCard
          accent="#DDA34B"
          label="Tracking"
          title="Keep the initiative together"
          copy="Campaigns can group automations, pages, forms, social posts and other assets behind one initiative."
        >
          <div className="mt-6 space-y-2">
            {["Automation", "Landing page", "Form", "Social post"].map((item) => (
              <div key={item} className="flex items-center justify-between border-b border-[#E8E3DB] py-2 text-[8px] font-semibold text-[#5B615C] last:border-b-0">
                <span>{item}</span>
                <Check size={10} className="text-[#A66F20]" />
              </div>
            ))}
          </div>
        </SupportCard>
      </div>
    </section>
  );
}

function SupportCard({
  accent,
  label,
  title,
  copy,
  children,
}: {
  accent: string;
  label: string;
  title: string;
  copy: string;
  children: ReactNode;
}) {
  return (
    <Reveal className="relative overflow-hidden rounded-[22px] border border-[#DDD7CE] bg-[#FCFBF8] p-6 sm:p-7">
      <span className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: accent }} />
      <div className="text-[8px] font-bold uppercase tracking-[0.13em]" style={{ color: accent }}>
        {label}
      </div>
      <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.03em] text-[#252A26]">{title}</h3>
      <p className="mt-3 text-[12px] leading-[1.65] text-[#707570]">{copy}</p>
      {children}
    </Reveal>
  );
}

function ConnectedLoop() {
  return (
    <section className="bg-white px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1260px]">
        <Reveal className="mx-auto max-w-[900px] text-center">
          <h2
            className="text-[35px] font-medium leading-[1.02] tracking-[-0.05em] text-[#151719] sm:text-[44px] lg:text-[50px]"
            style={{ fontFamily: DISPLAY }}
          >
            From customer data to campaign results,
            <span className="text-[#2563FF]"> it stays connected.</span>
          </h2>
        </Reveal>

        <Reveal className="mt-14" delay={0.05}>
          <div className="relative mx-auto max-w-[1100px] rounded-[28px] border border-[#E2E4E1] bg-[#FCFCFA] px-5 py-8 sm:px-8 sm:py-10">
            <div className="grid gap-3 md:grid-cols-5 md:items-center">
              <LoopNode color="#99A36D" label="Audience" copy="Customer data + tags" />
              <LoopNode color="#2563FF" label="Automate" copy="SMS + email" />
              <LoopNode color="#9B86B8" label="Convert" copy="Page · form · booking" />
              <LoopNode color="#E97D62" label="Customer action" copy="Reply · enquire · book" />
              <LoopNode color="#DDA34B" label="Measure" copy="Engage · convert · return" />
            </div>

            <div className="mt-7 rounded-[18px] border border-[#E8DDC9] bg-[#FFF9EE] px-5 py-4 text-center">
              <div className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#A66F20]">Campaigns</div>
              <div className="mt-1 text-[11px] leading-[1.55] text-[#71634F]">
                The tracking layer around the initiative: assets, members, activity and performance.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LoopNode({ color, label, copy }: { color: string; label: string; copy: string }) {
  return (
    <div className="relative rounded-[16px] border border-[#E4E6E2] bg-white px-4 py-4 text-center md:min-h-[112px]">
      <span className="mx-auto block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      <div className="mt-3 text-[11px] font-semibold tracking-[-0.015em] text-[#363C37]">{label}</div>
      <div className="mt-1.5 text-[8px] leading-[1.45] text-[#858A85]">{copy}</div>
    </div>
  );
}

function UseCaseSelector() {
  const [active, setActive] = useState(0);
  const item = USE_CASES[active];
  const reduced = !!useReducedMotion();

  return (
    <section className="bg-[#F6F0E8] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1260px]">
        <Reveal className="text-center">
          <h2
            className="text-[34px] font-medium leading-[1.02] tracking-[-0.048em] text-[#17191C] sm:text-[42px] lg:text-[48px]"
            style={{ fontFamily: DISPLAY }}
          >
            Different customers. Different reasons to get back in touch.
          </h2>
        </Reveal>

        <div className="mx-auto mt-9 flex max-w-[900px] gap-6 overflow-x-auto border-b border-[#D6CEC3] text-[12px] font-semibold text-[#737771]">
          {USE_CASES.map((useCase, index) => (
            <button
              key={useCase.key}
              type="button"
              onClick={() => setActive(index)}
              className={
                "shrink-0 border-b-2 pb-3 transition-colors " +
                (active === index
                  ? "border-[#111318] text-[#111318]"
                  : "border-transparent hover:text-[#333833]")
              }
            >
              {useCase.label}
            </button>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-[26px] border border-[#DCD4C9] bg-white">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.key}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reduced ? 0 : 0.28, ease: EASE }}
              className="grid lg:grid-cols-[0.72fr_1.28fr]"
            >
              <div className="flex flex-col justify-between border-b border-[#E4E1DC] p-7 sm:p-9 lg:min-h-[470px] lg:border-b-0 lg:border-r">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#58706F]">{item.label}</div>
                  <h3
                    className="mt-4 max-w-[410px] text-[31px] font-medium leading-[1.02] tracking-[-0.045em] text-[#1B1D20] sm:text-[37px]"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {item.title}
                  </h3>
                </div>
                <div className="mt-10">
                  <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#8B908B]">Audience</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.audience.map((tag) => (
                      <span key={tag} className="rounded-full bg-[#F0F1EC] px-3 py-2 text-[8px] font-semibold text-[#666E5D]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative min-h-[470px] overflow-hidden bg-[#FCFBF8] p-7 sm:p-9">
                <UseCasePath item={item} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function UseCasePath({ item }: { item: (typeof USE_CASES)[number] }) {
  const steps = [
    { label: "Outreach", value: item.outreach, color: "#2563FF" },
    { label: "Destination", value: item.destination, color: "#9B86B8" },
    { label: "Customer action", value: item.result, color: "#DDA34B" },
  ] as const;

  return (
    <div className="flex h-full flex-col justify-center">
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8A8F8A]">Campaign path</div>
      <div className="mt-6 grid gap-4">
        {steps.map((step, index) => (
          <div key={step.label} className="grid grid-cols-[38px_1fr] items-center gap-4">
            <span
              className="grid h-9 w-9 place-items-center rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: step.color }}
            >
              {index + 1}
            </span>
            <div className="rounded-[16px] border border-[#E3E4E0] bg-white px-5 py-4">
              <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#8B908B]">{step.label}</div>
              <div className="mt-1.5 text-[13px] font-semibold tracking-[-0.015em] text-[#3C423D]">{step.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PerformanceProof() {
  return (
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1260px] gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:gap-16">
        <Reveal>
          <div className="max-w-[460px]">
            <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#A66F20]">Campaign performance</div>
            <h2
              className="mt-4 text-[34px] font-medium leading-[1.02] tracking-[-0.048em] text-[#17191C] sm:text-[41px]"
              style={{ fontFamily: DISPLAY }}
            >
              Know what the campaign actually did.
            </h2>
            <p className="mt-5 text-[14px] leading-[1.7] text-[#6A706A]">
              Campaigns is the tracking and attribution layer. See who engaged, what converted, and how the initiative performed without pretending the send tool and the tracking tool are the same thing.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="overflow-hidden rounded-[24px] border border-[#E2E3DF] bg-[#FCFCFA] shadow-[0_24px_70px_rgba(38,42,39,.07)]">
            <div className="flex items-start justify-between gap-5 border-b border-[#E5E7E3] px-6 py-5">
              <div>
                <div className="text-[18px] font-semibold tracking-[-0.03em]">Service availability</div>
                <div className="mt-1 text-[8px] text-[#8A8F8A]">Influence window: 30 days</div>
              </div>
              <span className="rounded-[8px] bg-[#DDA34B] px-3 py-2 text-[8px] font-bold uppercase tracking-[0.09em] text-[#2D2A26]">
                Campaign
              </span>
            </div>

            <div className="flex gap-6 overflow-x-auto border-b border-[#E5E7E3] px-6 pt-4 text-[8px] font-semibold text-[#7D827D]">
              <span className="pb-3">Assets</span>
              <span className="pb-3">Members</span>
              <span className="pb-3">Activity</span>
              <span className="border-b-2 border-[#DDA34B] pb-3 text-[#111318]">Performance</span>
              <span className="pb-3">Settings</span>
            </div>

            <div className="p-6">
              <div className="text-[9px] font-semibold text-[#4E554F]">Reach</div>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["Reached", "Engaged", "Converted", "Won deals"].map((metric) => (
                  <Metric key={metric} label={metric} accent="#DDA34B" />
                ))}
              </div>

              <div className="mt-6 text-[9px] font-semibold text-[#4E554F]">Return</div>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["Won deal value", "Collected", "Costs", "Return on cost"].map((metric) => (
                  <Metric key={metric} label={metric} accent="#9B86B8" />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Metric({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="relative overflow-hidden rounded-[12px] border border-[#E4E5E1] bg-white p-3.5">
      <span className="absolute inset-x-0 top-0 h-[2px]" style={{ backgroundColor: accent }} />
      <div className="text-[8px] leading-[1.35] text-[#858B86]">{label}</div>
      <div className="mt-3 text-[18px] font-semibold text-[#4D534E]">—</div>
    </div>
  );
}

function ConnectedSystem() {
  const modules = [
    ["CRM", "Customer data + history", "#2563FF"],
    ["Automations", "Outreach + next steps", "#E97D62"],
    ["Campaigns", "Assets + attribution", "#DDA34B"],
    ["Conversations", "Replies stay connected", "#C96C85"],
    ["Performance", "Engagement + return", "#99A36D"],
  ] as const;

  return (
    <section className="bg-[#18191C] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1260px]">
        <Reveal className="mx-auto max-w-[880px] text-center">
          <h2
            className="text-[35px] font-medium leading-[1.02] tracking-[-0.05em] sm:text-[44px] lg:text-[50px]"
            style={{ fontFamily: DISPLAY }}
          >
            The campaign doesn't live in another
            <span className="text-[#AFC3FF]"> marketing silo.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[680px] text-[14px] leading-[1.7] text-white/55">
            Customer data, outreach, replies, campaign activity and results stay connected to the same customer system.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-[1080px] gap-3 sm:grid-cols-5">
          {modules.map(([title, copy, color], index) => (
            <Reveal key={title} delay={index * 0.04}>
              <div className="relative min-h-[150px] overflow-hidden rounded-[18px] border border-white/[0.09] bg-white/[0.035] p-5">
                <span className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: color }} />
                <div className="text-[11px] font-semibold text-white/88">{title}</div>
                <div className="mt-3 text-[9px] leading-[1.55] text-white/42">{copy}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = !!useReducedMotion();

  return (
    <section className="bg-[#FCFCFA] px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
        <Reveal className="max-w-[330px]">
          <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#68736C]">Questions</div>
          <h2
            className="mt-3 text-[29px] font-medium leading-[1.04] tracking-[-0.042em] sm:text-[34px]"
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
                    <p className="max-w-[700px] pb-5 pr-10 text-[13px] leading-[1.7] text-[#6C736D]">{item.a}</p>
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
            className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-white"
          >
            View Growth pricing <ArrowRight size={14} />
          </a>
          <a
            href={BOOK_URL}
            className="inline-flex h-[50px] items-center rounded-[10px] border border-[#D7DDD8] px-6 text-[13px] font-semibold text-[#1E2B29]"
          >
            Book a Call
          </a>
        </div>
      </Reveal>
    </section>
  );
}
