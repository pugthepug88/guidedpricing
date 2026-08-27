import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MaskTestScene } from "@/components/concept/mask-test/MaskTestScene";

export const Route = createFileRoute("/concept/mask-test")({
  head: () => ({
    meta: [
      { title: "Mask Animation Execution Test | Motion Lab" },
      {
        name: "description",
        content:
          "Isolated visual fidelity test: a bespoke moulded SVG mask, red signal silhouette and scroll-scrubbed portrait reveal built with GSAP.",
      },
      { property: "og:title", content: "Mask Animation Execution Test" },
      {
        property: "og:description",
        content: "Scroll-scrubbed hero artwork test: custom SVG mask, grain, silhouette to portrait resolve.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MaskTestPage,
});

function MaskTestPage() {
  // route-local: hide the global site chrome so the mock artboard reads cleanly
  useEffect(() => {
    const chrome = Array.from(document.body.querySelectorAll<HTMLElement>(":scope > nav, :scope > footer"));
    chrome.forEach((n) => (n.style.display = "none"));
    return () => chrome.forEach((n) => (n.style.display = ""));
  }, []);

  return (
    <main className="min-h-screen bg-[#FBF9F6] text-[#17151A]">

      <header className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 md:px-8">
        <div className="flex items-center gap-8">
          <span className="text-[19px] font-semibold tracking-[-0.03em]">agentlab</span>
          <nav className="hidden items-center gap-6 text-[13px] text-[#4B4750] md:flex">
            <span>Product</span>
            <span>Solutions</span>
            <span>Resources</span>
            <span>Pricing</span>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-[13px]">
          <span className="hidden text-[#4B4750] md:inline">Get a Demo</span>
          <span className="hidden text-[#4B4750] md:inline">Login</span>
          <span className="rounded-[10px] bg-[#17151A] px-4 py-2 text-white">Sign Up</span>
        </div>
      </header>

      <MaskTestScene />

      <section className="mx-auto max-w-[1240px] px-5 pb-32 pt-24 md:px-8">
        <h1 className="max-w-[16ch] text-[44px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[56px]">
          Execution test, not a page.
        </h1>
        <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-[#4B4750]">
          Scroll the artwork above to scrub the choreography: mask descent, silhouette rise, portrait
          resolve, annotation draw-in, and a still final hold.
        </p>
      </section>
    </main>
  );
}
