import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  MessageSquareText,
  Phone,
  Sparkles,
  Star,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import heroColor from "@/assets/connected-hero-color.png.asset.json";
import heroSketch from "@/assets/connected-hero-sketch.png.asset.json";
import pCustomer from "@/assets/portrait-customer.jpg.asset.json";

type Moment = {
  kind: "enquiry" | "conversation" | "followup" | "booking" | "payment" | "review";
  title: string;
  icon: LucideIcon;
  accent: string;
  soft: string;
  x: number;
  y: number;
  ingestAt: number;
};

const MOMENTS: Moment[] = [
  {
    kind: "enquiry",
    title: "Enquiry captured",
    icon: Phone,
    accent: "#F17364",
    soft: "#FFF0EC",
    x: 14,
    y: 16,
    ingestAt: 0.14,
  },
  {
    kind: "conversation",
    title: "Conversation",
    icon: MessageSquareText,
    accent: "#D45B8A",
    soft: "#FCECF3",
    x: 86,
    y: 16,
    ingestAt: 0.26,
  },
  {
    kind: "followup",
    title: "Follow-up adjusts",
    icon: Workflow,
    accent: "#A97ABB",
    soft: "#F3ECF8",
    x: 14,
    y: 50,
    ingestAt: 0.38,
  },
  {
    kind: "booking",
    title: "Booking confirmed",
    icon: CalendarDays,
    accent: "#2563FF",
    soft: "#EAF0FF",
    x: 86,
    y: 50,
    ingestAt: 0.50,
  },
  {
    kind: "payment",
    title: "Payment received",
    icon: CreditCard,
    accent: "#99965E",
    soft: "#F3F2E8",
    x: 14,
    y: 84,
    ingestAt: 0.62,
  },
  {
    kind: "review",
    title: "Review completed",
    icon: Star,
    accent: "#E99A3A",
    soft: "#FFF4E5",
    x: 86,
    y: 84,
    ingestAt: 0.74,
  },
];

export function PlatformConnectedSystemScene() {
  const reduced = !!useReducedMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  return (
    <section className="relative overflow-x-clip border-b border-[#E4E8EF] bg-[#FCFCFA] px-5 pb-16 pt-[112px] text-[#111318] sm:px-10 sm:pb-20 sm:pt-[120px] lg:px-16 lg:pb-24 lg:pt-[122px]">
      <div className="pointer-events-none absolute -left-[12%] top-[18%] h-[520px] w-[520px] rounded-full bg-[#DDE7FF]/32 blur-[170px]" />
      <div className="pointer-events-none absolute -right-[10%] top-[32%] h-[420px] w-[420px] rounded-full bg-[#F7DED5]/24 blur-[165px]" />

      <div className="relative mx-auto max-w-[1380px]">
        <div className="mx-auto max-w-[960px] text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#58706F]">
            Zapla Platform
          </div>

          <h1 className="mx-auto mt-5 max-w-[900px] font-zapla text-[40px] font-medium leading-[0.99] tracking-[-0.052em] sm:text-[48px] lg:text-[54px]">
            <span className="block">One customer.</span>
            <span className="block text-[#2563FF]">One connected system.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[930px] text-[15px] font-medium leading-[1.65] text-[#5F655F] sm:text-[17px]">
            When someone enquires, replies, books, pays, leaves a review or comes back months later, Zapla keeps that activity attached to the same customer story, so the next step can change with it.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#platform-map"
              className="inline-flex h-[52px] items-center rounded-full border border-[#D8D0C5] bg-white px-7 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#C7BDAF]"
            >
              Explore the platform
            </a>
            <a
              href="https://zapla.io/booking"
              className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#1E2B29] px-7 text-[13px] font-semibold text-[#F7F4EE] shadow-[0_12px_28px_rgba(30,43,41,.14)] transition-transform hover:-translate-y-px"
            >
              Book a Call <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {desktop && !reduced ? <DesktopContextScene /> : <StaticContextScene />}
      </div>
    </section>
  );
}

function DesktopContextScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    let raf = 0;
    const update = () => {
      const total = Math.max(1, section.scrollHeight - window.innerHeight);
      const value = (window.scrollY - section.offsetTop) / total;
      setProgress(Math.max(0, Math.min(1, value)));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const sketchOpacity = 1 - smoothstep(0.10, 0.84, progress);
  const colourOpacity = smoothstep(0.10, 0.84, progress);
  const endLabelOpacity = smoothstep(0.82, 0.94, progress);

  return (
    <div ref={ref} className="relative mt-12 h-[300vh]">
      <div className="sticky top-[66px] flex h-[calc(100vh-66px)] items-center overflow-hidden">
        <div className="relative mx-auto h-[640px] max-h-[calc(100vh-104px)] min-h-[540px] w-full max-w-[1280px]">
          <div
            className="pointer-events-none absolute left-1/2 top-[51%] h-[74%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle at center, rgba(37,99,255,0.10), rgba(212,91,138,0.045) 34%, rgba(255,255,255,0) 72%)",
              opacity: 0.3 + colourOpacity * 0.7,
            }}
          />

          <motion.img
            src={heroSketch.url}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute left-1/2 top-[52%] h-[86%] w-auto -translate-x-1/2 -translate-y-1/2 select-none object-contain"
            animate={{ opacity: sketchOpacity }}
            transition={{ duration: 0.08 }}
          />
          <motion.img
            src={heroColor.url}
            alt="A customer at the centre of a connected customer journey"
            draggable={false}
            className="pointer-events-none absolute left-1/2 top-[52%] h-[86%] w-auto -translate-x-1/2 -translate-y-1/2 select-none object-contain"
            animate={{ opacity: colourOpacity }}
            transition={{ duration: 0.08 }}
          />

          {MOMENTS.map((moment) => (
            <CustomerMoment key={moment.kind} moment={moment} progress={progress} />
          ))}

          <div
            className="absolute bottom-[2%] left-1/2 -translate-x-1/2 rounded-full border border-[#DDE3EC] bg-white/94 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#6D7686] shadow-sm backdrop-blur"
            style={{ opacity: endLabelOpacity }}
          >
            One customer · one history
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerMoment({ moment, progress }: { moment: Moment; progress: number }) {
  const ingest = smoothstep(moment.ingestAt, moment.ingestAt + 0.14, progress);
  const left = moment.x + (50 - moment.x) * ingest;
  const top = moment.y + (52 - moment.y) * ingest;
  const opacity = 1 - smoothstep(moment.ingestAt + 0.07, moment.ingestAt + 0.15, progress);
  const scale = 1 - ingest * 0.32;

  return (
    <div
      className="absolute z-20 w-[278px]"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      <MomentCard moment={moment} />
    </div>
  );
}

function MomentCard({ moment }: { moment: Moment }) {
  const Icon = moment.icon;

  return (
    <div className="overflow-hidden rounded-[18px] border border-[#DCE2EA] bg-white shadow-[0_14px_36px_rgba(24,38,64,.075)]">
      <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-3.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px]"
            style={{ backgroundColor: moment.soft, color: moment.accent }}
          >
            <Icon size={16} />
          </span>
          <div className="min-w-0">
            <div className="truncate text-[12.5px] font-semibold tracking-[-0.015em] text-[#202938]">
              {moment.title}
            </div>
            <div className="mt-0.5 text-[9px] font-medium text-[#8A93A2]">Emma Wilson · customer history</div>
          </div>
        </div>
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: moment.accent }}
        />
      </div>

      <div className="border-t border-[#EDF0F4] bg-[#FBFCFE] px-4 py-3">
        <MomentBody kind={moment.kind} accent={moment.accent} soft={moment.soft} />
      </div>
    </div>
  );
}

function MomentBody({
  kind,
  accent,
  soft,
}: {
  kind: Moment["kind"];
  accent: string;
  soft: string;
}) {
  if (kind === "enquiry") {
    return (
      <>
        <div className="flex items-center gap-2.5">
          <img src={pCustomer.url} alt="" className="h-8 w-8 rounded-full object-cover ring-2 ring-white" />
          <div className="min-w-0 flex-1">
            <div className="text-[10.5px] font-semibold text-[#263142]">Incoming call · 0:42</div>
            <div className="mt-0.5 truncate text-[9px] text-[#7B8595]">04•• ••• ••• · just now</div>
          </div>
          <span className="rounded-full px-2 py-1 text-[7px] font-bold" style={{ backgroundColor: soft, color: accent }}>
            AI LIVE
          </span>
        </div>
        <div className="mt-2.5 rounded-[10px] bg-white px-3 py-2 text-[9.5px] leading-[1.45] text-[#596474] ring-1 ring-[#E7EBF1]">
          “Calling about a quote for a bathroom renovation next month…”
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[8.5px] font-semibold" style={{ color: accent }}>
          <Sparkles size={10} /> Transcribed · added to CRM
        </div>
      </>
    );
  }

  if (kind === "conversation") {
    return (
      <>
        <div className="flex items-center gap-2.5">
          <img src={pCustomer.url} alt="" className="h-8 w-8 rounded-full object-cover ring-2 ring-white" />
          <div>
            <div className="text-[10.5px] font-semibold text-[#263142]">Emma replied by SMS</div>
            <div className="mt-0.5 text-[9px] text-[#7B8595]">Same customer record · just now</div>
          </div>
        </div>
        <div className="mt-2.5 ml-auto max-w-[86%] rounded-[12px] rounded-br-[4px] px-3 py-2 text-[9.5px] leading-[1.45]" style={{ backgroundColor: soft, color: "#354052" }}>
          Can I move my 3pm to Thursday?
        </div>
      </>
    );
  }

  if (kind === "followup") {
    const steps = [
      ["Lead captured", true],
      ["Welcome SMS sent", true],
      ["Follow-up paused after reply", false],
    ] as const;

    return (
      <div className="space-y-2">
        {steps.map(([label, done], index) => (
          <div key={label} className="flex items-center gap-2.5">
            <span
              className="grid h-5 w-5 place-items-center rounded-full text-[8px] font-bold"
              style={{ backgroundColor: done ? "#EAF8F1" : soft, color: done ? "#159767" : accent }}
            >
              {done ? "✓" : index + 1}
            </span>
            <span className={"text-[9.5px] " + (done ? "text-[#87909E]" : "font-semibold text-[#313B4B]")}>
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "booking") {
    return (
      <div className="grid grid-cols-[58px_1fr] items-center gap-3">
        <div className="overflow-hidden rounded-[11px] bg-white text-center ring-1 ring-[#DFE5ED]">
          <div className="py-1 text-[7px] font-bold uppercase tracking-[0.08em] text-white" style={{ backgroundColor: accent }}>
            Thu
          </div>
          <div className="py-2 text-[19px] font-semibold leading-none text-[#232D3C]">14</div>
        </div>
        <div>
          <div className="text-[10.5px] font-semibold text-[#263142]">2:00 PM · Consultation</div>
          <div className="mt-1 text-[9px] text-[#7B8595]">45 min · Emma Wilson</div>
          <div className="mt-2 flex items-center gap-1.5 text-[8.5px] font-semibold" style={{ color: accent }}>
            <CheckCircle2 size={10} /> Booking confirmed
          </div>
        </div>
      </div>
    );
  }

  if (kind === "payment") {
    return (
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.11em] text-[#8A93A2]">Invoice paid</div>
          <div className="mt-1 text-[22px] font-semibold tracking-[-0.04em] text-[#1E2837]">$1,250.00</div>
          <div className="mt-1 text-[8.5px] text-[#7B8595]">INV-2841 · Visa ending 4242</div>
        </div>
        <span className="rounded-full px-2.5 py-1 text-[7px] font-bold" style={{ backgroundColor: soft, color: accent }}>
          PAID
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2.5">
        <img src={pCustomer.url} alt="" className="h-8 w-8 rounded-full object-cover ring-2 ring-white" />
        <div>
          <div className="text-[10.5px] font-semibold text-[#263142]">Emma Wilson</div>
          <div className="mt-0.5 flex gap-0.5" style={{ color: accent }}>
            {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={11} fill="currentColor" />)}
          </div>
        </div>
      </div>
      <div className="mt-2.5 text-[9.5px] leading-[1.5] text-[#596474]">
        “Absolutely brilliant service from start to finish.”
      </div>
      <div className="mt-2 text-[8.5px] text-[#8A93A2]">Google review · requested after completed work</div>
    </>
  );
}

function StaticContextScene() {
  return (
    <div className="mx-auto mt-12 max-w-[980px]">
      <div className="relative mx-auto h-[350px] w-[270px]">
        <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(37,99,255,0.09),rgba(212,91,138,0.04)_42%,transparent_72%)]" />
        <img
          src={heroColor.url}
          alt="A customer at the centre of a connected customer journey"
          className="relative h-full w-full object-contain"
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {MOMENTS.map((moment) => (
          <MomentCard key={moment.kind} moment={moment} />
        ))}
      </div>
    </div>
  );
}

function smoothstep(start: number, end: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
}
