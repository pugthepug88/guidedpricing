import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CinematicFollowThroughV5 } from "@/components/concept/CinematicFollowThroughV5";
import { ZaplaHomepageContinuationV6 } from "@/components/concept/ZaplaHomepageContinuationV6";
import { DominoFooter } from "@/components/DominoFooter";

const TITLE = "Zapla — Different work. Same follow-through.";
const DESC =
  "Zapla is the AI operating system for growing businesses. Every enquiry, booking, and review followed through, all in one place.";

function HomeFinalCta() {
  return (
    <section className="bg-[#F7F4EE] px-5 pb-16 pt-16 sm:px-10 sm:pb-20 sm:pt-20 lg:px-16 lg:pb-24 lg:pt-24">
      <div className="mx-auto max-w-[1180px] rounded-[34px] bg-[#1E2B29] px-6 py-16 text-center text-[#F7F4EE] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#DDA34B]">
          See where Zapla fits
        </p>
        <h2
          className="mx-auto mt-5 max-w-[880px] text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[68px]"
          style={{ fontFamily: '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif' }}
        >
          One call. We’ll show you what Zapla would change.
        </h2>
        <p className="mx-auto mt-5 max-w-[700px] text-[15px] leading-[1.7] text-white/60 sm:text-[17px]">
          We’ll map where enquiries, conversations and next steps are getting lost, then show you what to connect, what to automate and what should stay human.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="https://zapla.io/booking"
            className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#F7F4EE] px-7 text-[13px] font-semibold text-[#1E2B29] transition-transform hover:-translate-y-px"
          >
            Book a Call <ArrowRight size={15} />
          </a>
          <a
            href="/Pricing-v3"
            className="inline-flex h-[52px] items-center rounded-full border border-white/20 bg-white/[0.02] px-7 text-[13px] font-semibold text-[#F7F4EE] transition-colors hover:bg-white/[0.06]"
          >
            View pricing
          </a>
        </div>
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
      <DominoFooter />
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
