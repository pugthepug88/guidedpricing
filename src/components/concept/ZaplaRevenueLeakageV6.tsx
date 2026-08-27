import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const DISPLAY = '\"Inter Tight\", \"Outfit\", \"Manrope\", system-ui, sans-serif';
const MONO = '\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, monospace';

const rows = [
  { time: "09:14", type: "WEBSITE ENQUIRY", title: "Sarah Miller", detail: "Hi, are you available this week?", tone: "lead" as const },
  { time: "09:31", type: "CALENDAR", title: "Appointment confirmed", detail: "Thursday · 10:30 AM" },
  { time: "10:05", type: "PAYMENTS", title: "Invoice paid", detail: "$840.00 received" },
  { time: "10:28", type: "PHONE", title: "Missed call", detail: "0412 884 231" },
  { time: "11:42", type: "WEBSITE ENQUIRY", title: "New enquiry received", detail: "Kitchen renovation · high intent" },
  { time: "12:23", type: "CALENDAR", title: "Booking moved", detail: "Friday · 2:00 PM" },
  { time: "13:16", type: "QUOTE", title: "Quote approved", detail: "$3,240.00" },
  { time: "14:38", type: "INBOX", title: "Customer replied", detail: "Can we move this to next Tuesday?" },
  { time: "15:11", type: "PAYMENTS", title: "Deposit received", detail: "$1,200.00" },
  { time: "16:02", type: "CALENDAR", title: "Tomorrow filled", detail: "8 appointments confirmed" },
];

function LogRow({
  time,
  type,
  title,
  detail,
  tone,
}: {
  time: string;
  type: string;
  title: string;
  detail: string;
  tone?: "lead";
}) {
  const lead = tone === "lead";
  return (
    <div
      className={
        lead
          ? "relative grid min-h-[148px] grid-cols-[76px_1fr] gap-5 border-y border-[#0D1117]/18 bg-[#E8FBFC] px-6 py-6 sm:grid-cols-[88px_1fr] sm:px-8"
          : "grid min-h-[116px] grid-cols-[76px_1fr] gap-5 border-b border-[#0D1117]/10 px-6 py-5 sm:grid-cols-[88px_1fr] sm:px-8"
      }
    >
      {lead && <div className="absolute inset-y-0 left-0 w-[3px] bg-[#06B6D4]" />}
      <div
        className={lead ? "pt-1 text-[15px] font-semibold text-[#087E8B]" : "pt-1 text-[13px] text-[#8A857D]"}
        style={{ fontFamily: MONO }}
      >
        {time}
      </div>
      <div>
        <div
          className={lead ? "text-[9px] font-semibold tracking-[0.16em] text-[#087E8B]" : "text-[8px] font-semibold tracking-[0.16em] text-[#9A958D]"}
          style={{ fontFamily: MONO }}
        >
          {type}
        </div>
        <div
          className={lead ? "mt-2 text-[25px] leading-[1.02] tracking-[-0.035em] text-[#111318] sm:text-[29px]" : "mt-2 text-[18px] leading-[1.08] tracking-[-0.025em] text-[#1A1C1F] sm:text-[20px]"}
          style={{ fontFamily: DISPLAY, fontWeight: 500 }}
        >
          {title}
        </div>
        <div className={lead ? "mt-3 text-[14px] leading-[1.55] text-[#555B5D] sm:text-[15px]" : "mt-2 text-[12px] leading-[1.5] text-[#817C75] sm:text-[13px]"}>
          {detail}
        </div>
        {lead && (
          <div className="mt-5 flex items-center gap-2 text-[8px] font-semibold tracking-[0.16em] text-[#7C807D]" style={{ fontFamily: MONO }}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
            WAITING FOR A REPLY
          </div>
        )}
      </div>
    </div>
  );
}

export function ZaplaRevenueLeakageV6() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const introOpacity = useTransform(scrollYProgress, [0, 0.13, 0.22], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0.1, 0.22], [0, -34]);

  const stageOpacity = useTransform(scrollYProgress, [0.12, 0.2], [0, 1]);
  const paperY = useTransform(scrollYProgress, [0.18, 0.73], [40, -790]);
  const paperRotate = useTransform(scrollYProgress, [0.18, 0.73], [1.4, -0.7]);
  const paperScale = useTransform(scrollYProgress, [0.18, 0.73], [1, 0.97]);

  const sideCopyOpacity = useTransform(scrollYProgress, [0.22, 0.31, 0.58, 0.7], [0, 1, 1, 0]);
  const sideCopyY = useTransform(scrollYProgress, [0.22, 0.32], [26, 0]);

  const markerOpacity = useTransform(scrollYProgress, [0.28, 0.34, 0.64, 0.7], [0, 1, 1, 0]);
  const markerY = useTransform(scrollYProgress, [0.28, 0.64], [0, -76]);

  const outcomeOpacity = useTransform(scrollYProgress, [0.7, 0.78], [0, 1]);
  const outcomeY = useTransform(scrollYProgress, [0.7, 0.82], [28, 0]);
  const outcomeScale = useTransform(scrollYProgress, [0.7, 0.82], [0.985, 1]);

  const paperFade = useTransform(scrollYProgress, [0.72, 0.8], [1, 0.08]);
  const cyanLineOpacity = useTransform(scrollYProgress, [0.84, 0.94], [0, 1]);
  const cyanLineScale = useTransform(scrollYProgress, [0.84, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[245vh] sm:h-[260vh]" aria-label="Where revenue leaks">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0A0C0F] text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

        <motion.div
          className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-16"
          style={reduced ? undefined : { opacity: introOpacity, y: introY }}
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-12 lg:grid-cols-[1.08fr_.72fr] lg:items-end lg:gap-24">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/65">Where revenue leaks</div>
              <h2
                className="mt-5 max-w-[920px] text-[50px] leading-[0.92] tracking-[-0.06em] sm:text-[70px] lg:text-[92px]"
                style={{ fontFamily: DISPLAY, fontWeight: 500 }}
              >
                The customer was ready.
                <span className="block text-white/38">The business was busy.</span>
              </h2>
            </div>
            <p className="max-w-[460px] text-[16px] leading-[1.72] text-white/46 sm:text-[18px] lg:pb-2">
              Most revenue leaks do not look dramatic. They look like a normal working day with one important next step quietly slipping out of view.
            </p>
          </div>
        </motion.div>

        <motion.div className="absolute inset-0" style={reduced ? { opacity: 1 } : { opacity: stageOpacity }}>
          <div className="absolute left-5 top-6 z-30 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/36 sm:left-10 lg:left-16">
            A normal working day
          </div>

          <motion.div
            className="absolute left-[7%] top-[22%] z-20 hidden max-w-[390px] lg:block"
            style={reduced ? undefined : { opacity: sideCopyOpacity, y: sideCopyY }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/32">09:14 AM</div>
            <div
              className="mt-5 text-[38px] leading-[1.02] tracking-[-0.045em] text-white sm:text-[44px]"
              style={{ fontFamily: DISPLAY, fontWeight: 500 }}
            >
              Sarah raised her hand.
            </div>
            <p className="mt-5 max-w-[350px] text-[15px] leading-[1.7] text-white/44">
              Then the business kept doing what busy businesses do.
            </p>
          </motion.div>

          <motion.div
            className="absolute left-[7%] top-[64%] z-30 hidden items-center gap-4 lg:flex"
            style={reduced ? undefined : { opacity: markerOpacity, y: markerY }}
          >
            <div className="h-px w-12 bg-[#06B6D4]" />
            <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
              Sarah is still waiting
            </div>
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-[18%] z-10 w-[86%] max-w-[650px] -translate-x-1/2 sm:w-[72%] lg:left-auto lg:right-[5%] lg:w-[46%] lg:translate-x-0"
            style={
              reduced
                ? undefined
                : {
                    y: paperY,
                    rotate: paperRotate,
                    scale: paperScale,
                    opacity: paperFade,
                    transformOrigin: "center top",
                  }
            }
          >
            <div className="relative overflow-hidden bg-[#F3EFE7] text-[#111318] shadow-[0_48px_140px_rgba(0,0,0,.42)]">
              <div className="flex items-center justify-between border-b border-[#0D1117]/12 px-6 py-5 sm:px-8">
                <div>
                  <div className="text-[8px] font-semibold tracking-[0.18em] text-[#8D877F]" style={{ fontFamily: MONO }}>
                    THURSDAY · LIVE ACTIVITY
                  </div>
                  <div className="mt-1 text-[12px] text-[#65615B]">Customer activity as it happens</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-[#06B6D4]" />
              </div>

              {rows.map((row) => (
                <LogRow key={`${row.time}-${row.title}`} {...row} />
              ))}

              <div className="h-[180px] border-t border-[#0D1117]/10 px-8 py-8">
                <div className="text-[8px] font-semibold tracking-[0.18em] text-[#A09A92]" style={{ fontFamily: MONO }}>
                  16:32 · END OF DAY
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 z-40 flex items-center px-5 sm:px-10 lg:px-16"
            style={
              reduced
                ? { opacity: 1 }
                : { opacity: outcomeOpacity, y: outcomeY, scale: outcomeScale }
            }
          >
            <div className="mx-auto w-full max-w-[1440px]">
              <div className="max-w-[960px]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#E79CA1]">4:32 PM · Sarah Miller</div>
                <div
                  className="mt-5 text-[62px] leading-[0.88] tracking-[-0.065em] text-white sm:text-[88px] lg:text-[124px]"
                  style={{ fontFamily: DISPLAY, fontWeight: 500 }}
                >
                  Booked elsewhere.
                </div>
                <div className="mt-8 h-px max-w-[720px] bg-white/14" />
                <div
                  className="mt-7 max-w-[760px] text-[28px] leading-[1.04] tracking-[-0.04em] text-white/80 sm:text-[36px] lg:text-[43px]"
                  style={{ fontFamily: DISPLAY, fontWeight: 500 }}
                >
                  Nothing broke. The next step never happened.
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            aria-hidden
            className="absolute inset-x-0 bottom-0 z-50 h-px origin-left bg-[#06B6D4]"
            style={{ opacity: cyanLineOpacity, scaleX: cyanLineScale }}
          />
        </motion.div>
      </div>
    </section>
  );
}
