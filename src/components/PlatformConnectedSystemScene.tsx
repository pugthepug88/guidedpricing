import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
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

const EASE = [0.22, 1, 0.36, 1] as const;

type Moment = {
  title: string;
  detail: string;
  status: string;
  icon: LucideIcon;
  accent: string;
  soft: string;
  x: number;
  y: number;
  line: string;
};

const MOMENTS: Moment[] = [
  {
    title: "Enquiry captured",
    detail: "AI call · added to customer",
    status: "NEW",
    icon: Phone,
    accent: "#F17364",
    soft: "#FFF0EC",
    x: 12,
    y: 15,
    line: "M 145 92 C 270 95 430 205 600 320",
  },
  {
    title: "Conversation",
    detail: "“Thursday at 2 works for me.”",
    status: "REPLY",
    icon: MessageSquareText,
    accent: "#D45B8A",
    soft: "#FCECF3",
    x: 88,
    y: 15,
    line: "M 1055 92 C 930 95 770 205 600 320",
  },
  {
    title: "Follow-up adjusts",
    detail: "Reply detected · sequence paused",
    status: "PAUSED",
    icon: Workflow,
    accent: "#A97ABB",
    soft: "#F3ECF8",
    x: 12,
    y: 49,
    line: "M 145 304 C 310 304 455 312 600 320",
  },
  {
    title: "Booking confirmed",
    detail: "14 Nov · 2:00 PM consultation",
    status: "BOOKED",
    icon: CalendarDays,
    accent: "#2563FF",
    soft: "#EAF0FF",
    x: 88,
    y: 49,
    line: "M 1055 304 C 890 304 745 312 600 320",
  },
  {
    title: "Payment received",
    detail: "$1,250 · customer record updated",
    status: "PAID",
    icon: CreditCard,
    accent: "#AEA971",
    soft: "#F3F2E8",
    x: 16,
    y: 82,
    line: "M 205 505 C 330 485 470 390 600 320",
  },
  {
    title: "Review completed",
    detail: "5-star review · history retained",
    status: "5.0 ★",
    icon: Star,
    accent: "#F5A651",
    soft: "#FFF4E5",
    x: 84,
    y: 82,
    line: "M 995 505 C 870 485 730 390 600 320",
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
    <section className="relative border-b border-[#E4E8EF] bg-[#FCFCFA] px-5 pb-16 pt-[112px] text-[#111318] sm:px-10 sm:pb-20 sm:pt-[120px] lg:px-16 lg:pb-24 lg:pt-[122px]">
      <div className="pointer-events-none absolute -left-[12%] top-[18%] h-[520px] w-[520px] rounded-full bg-[#DDE7FF]/35 blur-[170px]" />
      <div className="pointer-events-none absolute -right-[10%] top-[32%] h-[420px] w-[420px] rounded-full bg-[#F7DED5]/28 blur-[165px]" />

      <div className="relative mx-auto max-w-[1380px]">
        <div className="mx-auto max-w-[930px] text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#58706F]">
            Zapla Platform
          </div>

          <h1 className="mx-auto mt-5 max-w-[900px] font-zapla text-[40px] font-medium leading-[0.99] tracking-[-0.052em] sm:text-[48px] lg:text-[54px]">
            <span className="block">One customer.</span>
            <span className="block text-[#2563FF]">One connected system.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[900px] text-[15px] font-medium leading-[1.7] text-[#5F655F] sm:text-[17px]">
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

  const converge = smoothstep(0.08, 0.82, progress);
  const cardOpacity = 1 - smoothstep(0.58, 0.9, progress) * 0.94;
  const sketchOpacity = 1 - smoothstep(0.12, 0.72, progress);
  const colourOpacity = smoothstep(0.12, 0.78, progress);
  const lineOpacity = 0.22 + (1 - Math.abs(progress - 0.42) / 0.42) * 0.26;
  const endLabelOpacity = smoothstep(0.78, 0.94, progress);

  return (
    <div ref={ref} className="relative mt-12 h-[285vh]">
      <div className="sticky top-[66px] flex h-[calc(100vh-66px)] items-center">
        <div className="relative mx-auto h-[620px] max-h-[calc(100vh-104px)] min-h-[520px] w-full max-w-[1240px]">
          <div
            className="pointer-events-none absolute inset-x-[12%] inset-y-[8%] rounded-full blur-[12px]"
            style={{
              background:
                "radial-gradient(circle at center, rgba(37,99,255,0.09) 0%, rgba(241,115,100,0.05) 31%, rgba(255,255,255,0) 70%)",
              opacity: 0.35 + colourOpacity * 0.65,
            }}
          />

          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1200 620"
            preserveAspectRatio="none"
          >
            {MOMENTS.map((moment) => (
              <path
                key={moment.title}
                d={moment.line}
                fill="none"
                stroke={moment.accent}
                strokeWidth="1.15"
                strokeLinecap="round"
                style={{
                  opacity: Math.max(0.08, lineOpacity) * (1 - converge * 0.75),
                  strokeDasharray: "3 7",
                }}
              />
            ))}
            <circle cx="600" cy="320" r="4.5" fill="#2563FF" opacity={0.18 + colourOpacity * 0.38} />
          </svg>

          <motion.img
            src={heroSketch.url}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute left-1/2 top-[52%] h-[82%] w-auto -translate-x-1/2 -translate-y-1/2 select-none object-contain"
            animate={{ opacity: sketchOpacity }}
            transition={{ duration: 0.12, ease: EASE }}
          />
          <motion.img
            src={heroColor.url}
            alt="A customer at the centre of a connected customer journey"
            draggable={false}
            className="pointer-events-none absolute left-1/2 top-[52%] h-[82%] w-auto -translate-x-1/2 -translate-y-1/2 select-none object-contain"
            animate={{ opacity: colourOpacity }}
            transition={{ duration: 0.12, ease: EASE }}
          />

          {MOMENTS.map((moment) => (
            <ContextMoment
              key={moment.title}
              moment={moment}
              converge={converge}
              opacity={cardOpacity}
            />
          ))}

          <div
            className="absolute bottom-[4%] left-1/2 -translate-x-1/2 rounded-full border border-[#DDE3EC] bg-white/92 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#6D7686] shadow-sm backdrop-blur"
            style={{ opacity: endLabelOpacity }}
          >
            One customer · one history
          </div>
        </div>
      </div>
    </div>
  );
}

function ContextMoment({
  moment,
  converge,
  opacity,
}: {
  moment: Moment;
  converge: number;
  opacity: number;
}) {
  const Icon = moment.icon;
  const left = moment.x + (50 - moment.x) * converge;
  const top = moment.y + (52 - moment.y) * converge;
  const scale = 1 - converge * 0.28;

  return (
    <div
      className="absolute z-20 w-[238px]"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      <div className="rounded-[16px] border border-[#DCE2EB] bg-white/96 px-3.5 py-3 shadow-[0_12px_30px_rgba(31,43,67,.07)] backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px]"
            style={{ backgroundColor: moment.soft, color: moment.accent }}
          >
            <Icon size={16} />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="truncate text-[11.5px] font-semibold tracking-[-0.015em] text-[#222C3B]">
                {moment.title}
              </div>
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[7px] font-bold tracking-[0.08em]"
                style={{ backgroundColor: moment.soft, color: moment.accent }}
              >
                {moment.status}
              </span>
            </div>
            <div className="mt-1 truncate text-[9px] leading-[1.45] text-[#7A8495]">
              {moment.detail}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StaticContextScene() {
  return (
    <div className="mx-auto mt-12 max-w-[980px]">
      <div className="relative mx-auto h-[330px] w-[250px]">
        <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(37,99,255,0.09),rgba(241,115,100,0.04)_42%,transparent_72%)]" />
        <img
          src={heroColor.url}
          alt="A customer at the centre of a connected customer journey"
          className="relative h-full w-full object-contain"
        />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {MOMENTS.map((moment) => {
          const Icon = moment.icon;
          return (
            <div
              key={moment.title}
              className="rounded-[16px] border border-[#DCE2EB] bg-white px-4 py-3.5 shadow-[0_10px_26px_rgba(31,43,67,.055)]"
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px]"
                  style={{ backgroundColor: moment.soft, color: moment.accent }}
                >
                  <Icon size={16} />
                </span>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-[#222C3B]">{moment.title}</div>
                  <div className="mt-1 text-[9.5px] text-[#7A8495]">{moment.detail}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function smoothstep(start: number, end: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
}
