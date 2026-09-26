import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CinematicFollowThroughV5 } from "@/components/concept/CinematicFollowThroughV5";
import { ZaplaHomepageContinuationV6 } from "@/components/concept/ZaplaHomepageContinuationV6";
import { DominoFooter } from "@/components/DominoFooter";

const TITLE = "Zapla — Different work. Same follow-through.";
const DESC =
  "Zapla is the AI operating system for growing businesses. Every enquiry, booking, and review followed through, all in one place.";

const PETAL_PATH =
  "M80 14 C95 14 104 25 102 42 C100 58 92 70 80 82 C68 70 60 58 58 42 C56 25 65 14 80 14 Z";
const PETAL_COLORS = ["#E97D62", "#C96C85", "#DDA34B", "#99A36D", "#9B86B8", "#D58C75"] as const;

function HomePetal() {
  return (
    <svg width="34" height="34" viewBox="0 0 160 160" aria-hidden="true" className="block">
      {PETAL_COLORS.map((color, index) => (
        <g key={color} transform={`rotate(${index * 60} 80 80)`}>
          <path d={PETAL_PATH} fill={color} />
        </g>
      ))}
      <circle cx="80" cy="80" r="14" fill="#111214" />
    </svg>
  );
}

function HomeFinalCta() {
  return (
    <section className="overflow-hidden bg-[#FCFCFA] pt-24 sm:pt-28 lg:pt-32">
      <div className="mx-auto max-w-[940px] px-5 text-center sm:px-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#111214] ring-1 ring-black/[0.06]">
          <HomePetal />
        </div>

        <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C96F55]">
          Keep the next step moving
        </p>

        <h2
          className="mx-auto mt-4 max-w-[900px] text-[42px] font-medium leading-[1.01] tracking-[-0.045em] text-balance text-[#111318] sm:text-[58px] lg:text-[68px]"
          style={{ fontFamily: '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif' }}
        >
          Your business keeps moving. Zapla makes sure your customers do too.
        </h2>

        <p className="mx-auto mt-5 max-w-[690px] text-[15px] leading-[1.7] text-[#666B66] sm:text-[16px]">
          Book a call and we’ll show you where enquiries, follow-ups and repeat business are getting stuck, then map what Zapla can automate.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="https://zapla.io/booking"
            className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#1E2B29] px-7 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px sm:w-auto"
          >
            Book a Call <ArrowRight size={15} />
          </a>
          <a
            href="/Pricing-v3"
            className="inline-flex h-[52px] w-full items-center justify-center rounded-full border border-[#E2DBD1] bg-white px-7 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#CFC6BA] sm:w-auto"
          >
            View pricing
          </a>
        </div>
      </div>

      <div className="mt-8 sm:mt-10">
        <DominoFooter />
      </div>
    </section>
  );
}

function ZaplaHomepage() {
  return (
    <>
      <CinematicFollowThroughV5 variant="follow-through" />
      <ZaplaHomepageContinuationV6 />
      <HomeFinalCta />
    </>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ZaplaHomepage,
});
