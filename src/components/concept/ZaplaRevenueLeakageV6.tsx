import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const DISPLAY = '\"Inter Tight\", \"Outfit\", \"Manrope\", system-ui, sans-serif';

export function ZaplaRevenueLeakageV6() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const introOpacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0.08, 0.2], [0, -70]);

  const storyOpacity = useTransform(scrollYProgress, [0.12, 0.2], [0, 1]);
  const messageOpacity = useTransform(scrollYProgress, [0.16, 0.24, 0.62, 0.76], [0, 1, 1, 0.08]);
  const messageX = useTransform(scrollYProgress, [0.2, 0.72], [0, -180]);
  const messageY = useTransform(scrollYProgress, [0.2, 0.72], [0, 56]);
  const messageScale = useTransform(scrollYProgress, [0.2, 0.72], [1, 0.72]);
  const messageBlur = useTransform(scrollYProgress, [0.54, 0.76], ["blur(0px)", "blur(2.8px)"]);

  const t1014 = useTransform(scrollYProgress, [0.14, 0.2, 0.28], [0, 1, 0]);
  const t1047 = useTransform(scrollYProgress, [0.26, 0.33, 0.42], [0, 1, 0]);
  const t1223 = useTransform(scrollYProgress, [0.4, 0.49, 0.6], [0, 1, 0]);
  const t1438 = useTransform(scrollYProgress, [0.57, 0.64, 0.72], [0, 1, 0]);
  const t1632 = useTransform(scrollYProgress, [0.7, 0.78, 0.88], [0, 1, 0]);

  const status1 = useTransform(scrollYProgress, [0.18, 0.24, 0.29], [0, 1, 0]);
  const status2 = useTransform(scrollYProgress, [0.31, 0.37, 0.43], [0, 1, 0]);
  const status3 = useTransform(scrollYProgress, [0.47, 0.53, 0.61], [0, 1, 0]);
  const status4 = useTransform(scrollYProgress, [0.62, 0.68, 0.74], [0, 1, 0]);

  const outcomeOpacity = useTransform(scrollYProgress, [0.73, 0.81], [0, 1]);
  const outcomeY = useTransform(scrollYProgress, [0.73, 0.84], [42, 0]);
  const outcomeScale = useTransform(scrollYProgress, [0.73, 0.84], [0.96, 1]);

  const canvasColor = useTransform(
    scrollYProgress,
    [0, 0.86, 1],
    ["#F2EEE7", "#F2EEE7", "#070A0D"],
  );
  const handoffOpacity = useTransform(scrollYProgress, [0.88, 0.96], [0, 1]);
  const handoffScale = useTransform(scrollYProgress, [0.88, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[310vh] sm:h-[330vh]"
      aria-label="Where revenue leaks"
    >
      <motion.div
        className="sticky top-0 h-screen overflow-hidden text-[#0D1117]"
        style={{ backgroundColor: canvasColor }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-black/[0.06]" />

        {/* Opening statement — intentionally still and spacious after the kinetic hero. */}
        <motion.div
          className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-16"
          style={reduced ? undefined : { opacity: introOpacity, y: introY }}
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[1.18fr_.62fr] lg:items-end lg:gap-24">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#68736F]">
                Where revenue leaks
              </div>
              <h2
                className="mt-5 max-w-[980px] text-[48px] leading-[0.92] tracking-[-0.06em] sm:text-[68px] lg:text-[90px]"
                style={{ fontFamily: DISPLAY, fontWeight: 500 }}
              >
                The customer was ready.
                <span className="block text-[#858782]">The business was busy.</span>
              </h2>
            </div>
            <p className="max-w-[500px] text-[16px] leading-[1.72] text-[#6E706C] sm:text-[18px] lg:pb-2">
              No system crashed. No one decided to lose the enquiry. The day simply kept moving while the customer kept waiting.
            </p>
          </div>
        </motion.div>

        {/* The story — time is the dominant visual object. */}
        <motion.div
          className="absolute inset-0"
          style={reduced ? { opacity: 1 } : { opacity: storyOpacity }}
        >
          <div className="absolute left-5 top-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#858781] sm:left-10 lg:left-16">
            One enquiry · one working day
          </div>

          <div className="absolute bottom-7 right-5 text-right text-[8px] font-semibold uppercase tracking-[0.16em] text-[#9A958D] sm:right-10 lg:right-16">
            Revenue rarely disappears loudly
          </div>

          {/* Oversized clock states. They replace decorative imagery completely. */}
          {[
            { value: "10:14", opacity: t1014 },
            { value: "10:47", opacity: t1047 },
            { value: "12:23", opacity: t1223 },
            { value: "2:38", opacity: t1438 },
            { value: "4:32", opacity: t1632 },
          ].map(({ value, opacity }) => (
            <motion.div
              key={value}
              className="pointer-events-none absolute -right-[2vw] top-[8vh] select-none text-[31vw] leading-[0.72] tracking-[-0.095em] text-[#D8D0C4] sm:text-[25vw] lg:-right-[1vw] lg:top-[2vh] lg:text-[20vw]"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 500,
                opacity: reduced ? (value === "4:32" ? 1 : 0) : opacity,
              }}
            >
              {value}
            </motion.div>
          ))}

          {/* One meaningful artefact. It gradually loses prominence as time wins. */}
          <motion.div
            className="absolute left-[7%] top-[33%] z-20 w-[86%] max-w-[710px] sm:left-[8%] sm:top-[35%] sm:w-[68%] lg:left-[9%] lg:top-[37%] lg:w-[52%]"
            style={
              reduced
                ? undefined
                : {
                    opacity: messageOpacity,
                    x: messageX,
                    y: messageY,
                    scale: messageScale,
                    filter: messageBlur,
                    transformOrigin: "left center",
                  }
            }
          >
            <div className="flex items-center gap-3 border-b border-[#BCB6AD] pb-4 sm:gap-4 sm:pb-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111318] text-[9px] font-bold text-white sm:h-12 sm:w-12 sm:text-[10px]">
                SM
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold sm:text-[15px]">Sarah Miller</div>
                <div className="mt-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#908B84]">
                  Website enquiry · received 10:14 AM
                </div>
              </div>
              <div className="ml-auto hidden text-[8px] font-semibold uppercase tracking-[0.15em] text-[#9A958E] sm:block">
                New enquiry
              </div>
            </div>

            <div
              className="mt-6 max-w-[650px] text-[32px] leading-[1.02] tracking-[-0.045em] sm:mt-8 sm:text-[44px] lg:text-[54px]"
              style={{ fontFamily: DISPLAY, fontWeight: 500 }}
            >
              “Hi, are you available this week?”
            </div>

            <div className="mt-6 flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.17em] text-[#97928B] sm:mt-8">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A7A198]" />
              Waiting for a reply
            </div>
          </motion.div>

          {/* Quiet status beats — typography only, no card stack. */}
          <motion.div
            className="absolute bottom-[19%] left-[9%] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#706D68] sm:text-[12px]"
            style={{ opacity: reduced ? 0 : status1 }}
          >
            33 minutes · no reply
          </motion.div>
          <motion.div
            className="absolute bottom-[19%] left-[9%] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#706D68] sm:text-[12px]"
            style={{ opacity: reduced ? 0 : status2 }}
          >
            2 hours 9 minutes · still waiting
          </motion.div>
          <motion.div
            className="absolute bottom-[19%] left-[9%] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#706D68] sm:text-[12px]"
            style={{ opacity: reduced ? 0 : status3 }}
          >
            Afternoon · the enquiry is no longer urgent
          </motion.div>
          <motion.div
            className="absolute bottom-[19%] left-[9%] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E565A] sm:text-[12px]"
            style={{ opacity: reduced ? 0 : status4 }}
          >
            The customer makes another choice
          </motion.div>

          {/* Consequence. No statistical theatre; just the commercial outcome. */}
          <motion.div
            className="absolute inset-0 z-40 flex items-center px-5 sm:px-10 lg:px-16"
            style={
              reduced
                ? { opacity: 1 }
                : { opacity: outcomeOpacity, y: outcomeY, scale: outcomeScale }
            }
          >
            <div className="mx-auto w-full max-w-[1440px]">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A66066]">
                4:32 PM · outcome
              </div>
              <div
                className="mt-5 max-w-[1120px] text-[58px] leading-[0.86] tracking-[-0.07em] text-[#A93640] sm:text-[82px] lg:text-[126px]"
                style={{ fontFamily: DISPLAY, fontWeight: 500 }}
              >
                Booked elsewhere.
              </div>
              <div className="mt-7 max-w-[780px] border-t border-[#C9B4B1] pt-6 sm:mt-9 sm:pt-7">
                <div
                  className="text-[27px] leading-[1.02] tracking-[-0.04em] text-[#17191B] sm:text-[36px] lg:text-[44px]"
                  style={{ fontFamily: DISPLAY, fontWeight: 500 }}
                >
                  Nothing broke. The next step never happened.
                </div>
                <p className="mt-4 max-w-[600px] text-[14px] leading-[1.65] text-[#756E69] sm:text-[16px]">
                  That is what revenue leakage looks like when nobody notices it happening.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Visual hand-off into the next dark section: one live signal, not another component. */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 bottom-0 z-50 h-px origin-left bg-[#52D9DE]"
            style={{ opacity: handoffOpacity, scaleX: handoffScale }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 z-[45] h-[18vh] bg-gradient-to-b from-transparent to-[#070A0D]"
            style={{ opacity: handoffOpacity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
