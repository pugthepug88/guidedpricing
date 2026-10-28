import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { INDUSTRY_LINKS } from "@/lib/industries";
import { FEATURE_LINKS } from "@/lib/features";

const FOOTER_GROUPS = [
  {
    label: "Platform",
    links: [
      ["Overview", "/platform"],
      ["CRM", "/crm"],
      ["Customer Marketing", "/customer-marketing"],
      ["AI Receptionist", "/ai-receptionist"],
      ["Compare Zapla", "/comparison"],
    ],
  },
  {
    label: "Features",
    links: FEATURE_LINKS.map(({ name, href }) => [name, href] as const),
  },
  {
    label: "Solutions",
    links: [
      ["Follow-Up", "/follow-up"],
      ["Reactivation", "/reactivation"],
      ["Reviews & Reputation", "/reviews"],
    ],
  },
  {
    label: "Industries",
    links: [
      ...INDUSTRY_LINKS.map(({ name, href }) => [name, href] as const),
      ["View all industries", "/industries"],
    ],
  },
  {
    label: "Company",
    links: [
      ["Pricing", "/Pricing-v3"],
      ["Book a Call", "/booking"],
      ["Blog", "https://zapla.io/blog"],
      ["Contact us", "mailto:hello@zapla.io"],
      ["Terms & conditions", "https://zapla.io/terms-and-conditions"],
      ["Privacy policy", "https://zapla.io/privacy-policy"],
      ["Refund policy", "https://zapla.io/refund-policy"],
    ],
  },
] as const;

export function DominoFooter() {
  const reduced = !!useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dominoVideo = "/concept/zapla-domino-web.mp4";
  const dominoPoster = "/concept/zapla-domino-first-frame.jpg";

  useEffect(() => {
    if (reduced) return;

    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        void videoRef.current?.play().catch(() => undefined);
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <footer ref={sectionRef} aria-label="Site footer" className="relative isolate overflow-hidden">
      <div className="relative min-h-[760px] sm:min-h-[840px] lg:min-h-[900px] xl:min-h-[940px]">
        <img
          src={dominoPoster}
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_62%]"
        />

        <video
          ref={videoRef}
          src={dominoVideo}
          poster={dominoPoster}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[center_62%]"
          muted
          playsInline
          preload="auto"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#FCFCFA] via-[#FCFCFA]/30 to-transparent sm:h-36"
        />

        <div className="relative z-20 px-4 pt-[240px] sm:px-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:px-12 lg:pt-0">
          <div className="mx-auto w-full max-w-[1240px] rounded-t-[34px] border border-b-0 border-white/75 bg-[#F8F5EF]/[0.97] p-7 pb-8 shadow-[0_-18px_70px_rgba(45,37,28,.16)] backdrop-blur-[12px] sm:p-9 sm:pb-10 lg:p-10 lg:pb-12">
            <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-[200px_minmax(0,.85fr)_minmax(0,1.35fr)_minmax(0,.95fr)_minmax(0,1.15fr)_minmax(0,.95fr)] xl:gap-x-5">
              <div className="col-span-full min-w-0 xl:col-span-1">
                <a href="/" className="inline-flex items-center">
                  <img src="/concept/zapla-logo-dark.svg" alt="Zapla" className="h-9 w-auto" />
                </a>

                <p className="mt-4 text-[15px] font-medium leading-[1.6] text-[#454C46]">
                  You lead.
                  <br />
                  Zapla follows through.
                </p>

                <div className="mt-6 grid gap-3">
                  <a
                    href="https://www.trustpilot.com/review/zapla.io"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E2DBD1] bg-white/75 px-3.5 py-1.5 text-[13px] font-bold text-[#111318] transition-colors hover:border-[#2563FF]"
                  >
                    <span className="text-[#00b67a]">★</span>
                    Review us on Trustpilot
                  </a>
                  <a
                    href="https://www.g2.com/products/zapla-zapla/reviews/new"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E2DBD1] bg-white/75 px-3.5 py-1.5 text-[13px] font-bold text-[#111318] transition-colors hover:border-[#2563FF]"
                  >
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ff492c] text-[10px] font-black text-white">
                      G2
                    </span>
                    Review us on G2
                  </a>
                </div>
              </div>

              {FOOTER_GROUPS.map((group) => (
                <nav
                  key={group.label}
                  aria-label={`${group.label} footer links`}
                  className="min-w-0"
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#20241F]">
                    {group.label}
                  </div>
                  <div className="mt-4 grid gap-2.5">
                    {group.links.map(([label, href]) => (
                      <a
                        key={label}
                        href={href}
                        className={`text-[13px] font-medium leading-relaxed text-[#676B65] transition-colors hover:text-[#2563FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563FF]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F8F5EF] ${href === "/comparison" ? "flex min-h-11 items-center" : ""}`}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </nav>
              ))}
            </div>

            <div className="mt-8 border-t border-[#DED8CF] pt-5 text-[12px] text-[#888C85]">
              © {new Date().getFullYear()} Zapla. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default DominoFooter;
