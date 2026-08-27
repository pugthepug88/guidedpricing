import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskGlasses, PanelGrain } from "./MaskArtwork";

gsap.registerPlugin(ScrollTrigger);

const PORTRAIT = "/concept/mask-test/portrait-cut.png";
/* measured on the graded cutout: eye centre at 54.5% x / 34.3% y of the image box */
const EYE_X = 54.5;
const EYE_Y = 34.3;

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MaskTestScene() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const reduced = prefersReduced();

    const ctx = gsap.context(() => {
      // composed start state
      gsap.set(q(".mask-obj"), { yPercent: -132, scale: 0.9, opacity: 0.95, rotate: -1.5 });
      gsap.set(q(".sil"), { yPercent: 15, opacity: 0.55, filter: "blur(14px) saturate(1.6)" });
      gsap.set(q(".real"), { opacity: 0, yPercent: 4 });
      gsap.set(q(".haze"), { opacity: 0.35 });
      gsap.set(q(".cta"), { opacity: 0, y: 14 });
      gsap.set(q(".anno"), { opacity: 0, y: 8 });
      gsap.set(q(".leader"), { opacity: 0, scaleX: 0, scaleY: 0 });
      gsap.set(q(".ghost"), { opacity: 0, scale: 1.04 });

      if (reduced) {
        gsap.set(q(".mask-obj"), { yPercent: -50, scale: 1, opacity: 1, rotate: 0 });
        gsap.set(q(".sil"), { opacity: 0, yPercent: 0 });
        gsap.set(q(".real"), { opacity: 1, yPercent: 0 });
        gsap.set(q(".haze"), { opacity: 1 });
        gsap.set([...q(".cta"), ...q(".anno")], { opacity: 1, y: 0 });
        gsap.set(q(".leader"), { opacity: 1, scaleX: 1, scaleY: 1 });
        gsap.set(q(".ghost"), { opacity: 1, scale: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      // 0.00–0.18 mask floats high, silhouette low and faint
      tl.to(q(".sil"), { yPercent: 11, opacity: 0.68, duration: 0.18 }, 0);
      tl.to(q(".mask-obj"), { yPercent: -118, duration: 0.18 }, 0);

      // 0.18–0.38 silhouette rises, mask descends, haze strengthens
      tl.to(q(".sil"), { yPercent: 2, opacity: 1, filter: "blur(6px) saturate(1.7)", duration: 0.2 }, 0.18);
      tl.to(q(".mask-obj"), { yPercent: -72, scale: 0.97, rotate: -0.6, duration: 0.2 }, 0.18);
      tl.to(q(".haze"), { opacity: 0.8, duration: 0.2 }, 0.18);

      // 0.38–0.52 mask settles on the eye line, CTA arrives
      tl.to(q(".mask-obj"), { yPercent: -50, scale: 1, rotate: 0, opacity: 1, duration: 0.14, ease: "power2.out" }, 0.38);
      tl.to(q(".sil"), { yPercent: 0, filter: "blur(4px) saturate(1.7)", duration: 0.14 }, 0.38);
      tl.to(q(".cta"), { opacity: 1, y: 0, duration: 0.1 }, 0.42);

      // 0.52–0.68 the real portrait resolves through the red signal
      tl.to(q(".real"), { opacity: 1, yPercent: 0, duration: 0.16 }, 0.52);
      tl.to(q(".sil"), { opacity: 0, duration: 0.14 }, 0.54);
      tl.to(q(".haze"), { opacity: 1, duration: 0.16 }, 0.52);

      // 0.68–0.84 annotations and background ghost type
      tl.to(q(".ghost"), { opacity: 1, scale: 1, duration: 0.14 }, 0.66);
      q(".anno").forEach((n, i) => {
        tl.to(n, { opacity: 1, y: 0, duration: 0.07 }, 0.7 + i * 0.035);
      });
      q<HTMLElement>(".leader").forEach((p, i) => {
        tl.to(p, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.07 }, 0.68 + i * 0.028);
      });

      // 0.84–1.00 hold: 1–3px breathing only
      tl.to(q(".stage"), { y: -3, duration: 0.16 }, 0.84);
      tl.to(q(".mask-obj"), { yPercent: -52, duration: 0.16 }, 0.84);

    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative h-[260vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center px-4 md:px-8">
        <div className="stage relative w-full max-w-[1240px]">
          {/* hero panel */}
          <div
            className="relative overflow-hidden rounded-[28px]"
            style={{
              height: "min(74vh, 720px)",
              background:
                "radial-gradient(120% 90% at 50% 118%, #FF9C7A 0%, #FFC2AE 26%, #FFE2D8 52%, #FFF4EF 74%, #FFFCFA 100%)",
            }}
          >
            {/* strengthening lower haze */}
            <div
              className="haze pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(90% 70% at 50% 112%, rgba(240,70,55,0.55) 0%, rgba(255,120,80,0.28) 38%, rgba(255,190,170,0.10) 62%, rgba(255,255,255,0) 82%)",
              }}
            />

            {/* blurred background ghost type behind the head */}
            <div className="ghost pointer-events-none absolute inset-x-0 top-[9%] flex flex-col items-center gap-1 md:gap-2">
              <span
                className="font-semibold tracking-[-0.03em] text-[#B4392C]"
                style={{ fontSize: "clamp(48px,7.6vw,116px)", opacity: 0.07, filter: "blur(8px)" }}
              >
                SUPER AGENT
              </span>
              <span
                className="tracking-[0.28em] text-[#8E3A2E]"
                style={{ fontSize: "clamp(11px,1.3vw,19px)", opacity: 0.1, filter: "blur(3px)" }}
              >
                DELEGATE ANY TASK
              </span>
            </div>

            {/* subject */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ height: "104%", aspectRatio: "1100 / 1664", bottom: "-6%" }}
            >
              {/* red signal silhouette derived from the portrait matte */}
              <div
                className="sil absolute inset-0"
                style={{
                  WebkitMaskImage: `url(${PORTRAIT})`,
                  maskImage: `url(${PORTRAIT})`,
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  background:
                    "linear-gradient(to top, #E5300F 0%, #F04A18 24%, #EE5B33 46%, rgba(233,96,70,0.55) 72%, rgba(233,120,100,0.05) 96%)",
                }}
              />
              <div
                className="sil absolute inset-0 opacity-70"
                style={{
                  WebkitMaskImage: `url(${PORTRAIT})`,
                  maskImage: `url(${PORTRAIT})`,
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                }}
              >
                <PanelGrain id="silgrain" opacity={0.85} />
              </div>

              {/* resolved portrait */}
              <img
                src={PORTRAIT}
                alt="Portrait of a person wearing the Super Agent mask"
                className="real absolute inset-0 h-full w-full object-cover"
                style={{
                  filter: "saturate(1.04) contrast(1.02)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%)",
                }}
              />

              {/* bespoke moulded mask, locked to the eye line */}
              <div
                className="mask-obj absolute"
                style={{ left: `${EYE_X}%`, top: `${EYE_Y}%`, width: "66%", transform: "translate(-50%,-50%)" }}
              >
                <MaskGlasses id="m1" />
              </div>
            </div>

            {/* technical annotations: hairline elbow leaders + mono labels */}
            <div className="pointer-events-none absolute inset-0 hidden md:block">
              {/* upper-left -> jaw / shoulder */}
              <div className="leader absolute left-[15%] top-[30%] h-px w-[16%] origin-left bg-[#231A17]/55" />
              <div className="leader absolute left-[31%] top-[30%] h-[10%] w-px origin-top bg-[#231A17]/55" />
              {/* upper-right -> head */}
              <div className="leader absolute right-[16%] top-[22%] h-px w-[14%] origin-right bg-[#231A17]/55" />
              <div className="leader absolute right-[30%] top-[22%] h-[8%] w-px origin-top bg-[#231A17]/55" />
              {/* mid-right -> cheek */}
              <div className="leader absolute right-[13%] top-[52%] h-px w-[19%] origin-right bg-[#231A17]/55" />
              <div className="leader absolute right-[32%] top-[46%] h-[6%] w-px origin-bottom bg-[#231A17]/55" />
            </div>

            <div className="pointer-events-none absolute inset-0 font-mono text-[#231A17]">
              <span className="anno absolute left-[5%] top-[64%] text-[10px] tracking-[0.18em] md:left-[6%] md:top-[27%] md:text-[11px]">
                WORKS 24/7
              </span>
              <span className="anno absolute right-[6%] top-[16%] hidden text-right text-[11px] leading-[1.5] tracking-[0.18em] md:block">
                500+ TOOL
                <br />
                SUPERPOWERS
              </span>
              <span className="anno absolute right-[5%] top-[54%] hidden text-[11px] tracking-[0.18em] md:block">
                INFINITE MEMORY
              </span>
            </div>


            {/* CTA */}
            <div className="absolute inset-x-0 bottom-[9%] flex justify-center">
              <button
                type="button"
                className="cta rounded-[13px] bg-[#17151A] px-6 py-3.5 text-[15px] font-medium text-white shadow-[0_18px_44px_-18px_rgba(23,21,26,0.6)]"
              >
                Build your own agent
              </button>
            </div>

            <PanelGrain id="panelgrain" opacity={0.36} />
          </div>
        </div>
      </div>
    </div>
  );
}
