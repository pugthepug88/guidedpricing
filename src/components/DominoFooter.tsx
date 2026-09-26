import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const FOOTER_GROUPS = [
  {
    label: "Company",
    links: [
      ["Book a Call", "https://zapla.io/booking"],
      ["Pricing", "/Pricing-v3"],
    ],
  },
  {
    label: "Resources",
    links: [
      ["Blog", "https://zapla.io/blog"],
      ["Request feature", "https://zapla.canny.io/feature-request"],
      ["Terms & conditions", "https://zapla.io/terms-and-conditions"],
      ["Privacy policy", "https://zapla.io/privacy-policy"],
      ["Refund policy", "https://zapla.io/refund-policy"],
      ["Contact us", "mailto:hello@zapla.io"],
    ],
  },
  {
    label: "Compare",
    links: [["Zapla Vs Hubspot", "https://zapla.io/comparison/zapla-vs-hubspot"]],
  },
] as const;

const FOOTER_SOCIALS = [
  {
    href: "https://facebook.com/",
    icon: "https://stcdn.leadconnectorhq.com/funnel/icons/dark/facebook-dark.svg",
    alt: "Facebook",
  },
  {
    href: "https://instagram.com/",
    icon: "https://stcdn.leadconnectorhq.com/funnel/icons/dark/instagram-dark.svg",
    alt: "Instagram",
  },
  {
    href: "https://linkedin.com/",
    icon: "https://stcdn.leadconnectorhq.com/funnel/icons/dark/linkedin-dark.svg",
    alt: "LinkedIn",
  },
  {
    href: "https://youtube.com/",
    icon: "https://stcdn.leadconnectorhq.com/funnel/icons/dark/youtube-dark.svg",
    alt: "YouTube",
  },
] as const;

export function DominoFooter() {
  const reduced = !!useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
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
    <div ref={sectionRef} className="relative isolate overflow-hidden">
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

        <div className="absolute inset-x-0 bottom-0 z-20 px-4 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-[1240px] rounded-t-[34px] border border-b-0 border-white/75 bg-[#F8F5EF]/[0.97] p-7 pb-8 shadow-[0_-18px_70px_rgba(45,37,28,.16)] backdrop-blur-[12px] sm:p-9 sm:pb-10 lg:p-10 lg:pb-12">
            <div className="grid gap-9 lg:grid-cols-[1.15fr_.8fr_1.05fr_.7fr] lg:gap-10">
              <div>
                <a href="/" className="inline-flex items-center">
                  <img src="/concept/zapla-logo-dark.svg" alt="Zapla" className="h-9 w-auto" />
                </a>

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

                <div className="mt-6 flex items-center gap-3">
                  {FOOTER_SOCIALS.map((social) => (
                    <a
                      key={social.alt}
                      href={social.href}
                      aria-label={social.alt}
                      className="grid h-9 w-9 place-items-center rounded-full border border-[#E2DBD1] bg-white/80 transition-colors hover:border-[#2563FF]"
                    >
                      <img src={social.icon} alt="" className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              {FOOTER_GROUPS.map((group) => (
                <div key={group.label}>
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#20241F]">
                    {group.label}
                  </div>
                  <div className="mt-4 grid gap-2.5">
                    {group.links.map(([label, href]) => (
                      <a
                        key={label}
                        href={href}
                        className="text-[13px] font-medium text-[#676B65] transition-colors hover:text-[#2563FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563FF]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F8F5EF]"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 border-t border-[#DED8CF] pt-5 text-[12px] text-[#888C85]">
              © {new Date().getFullYear()} Zapla. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DominoFooter;
