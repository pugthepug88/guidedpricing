const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';

export function ZaplaPlatformTeaserV6() {
  return (
    <section
      id="platform-teaser-v6"
      className="bg-[#F7F4EE] px-5 py-16 text-[#111318] sm:px-10 sm:py-20 lg:px-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,.78fr)] lg:items-center lg:gap-20 xl:gap-28">
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#747A76]">
            Zapla platform
          </div>
          <h2
            className="mt-5 text-[44px] leading-[0.94] tracking-[-0.055em] sm:text-[58px] lg:text-[68px]"
            style={{ fontFamily: DISPLAY, fontWeight: 500 }}
          >
            <span className="block">More of your business,</span>
            <span className="block text-[#C96F55]">connected.</span>
          </h2>
          <p className="mt-5 max-w-[700px] text-[15px] leading-[1.65] text-[#686D69] sm:text-[17px]">
            CRM · Conversations · Bookings · Payments · Reviews · Websites · AI · and more.
          </p>
          <a
            href="/platform"
            className="mt-6 inline-flex h-12 items-center gap-4 rounded-full bg-[#1E2B29] px-5 text-[13px] font-semibold text-[#F7F4EE] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2B29] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F4EE]"
          >
            Explore the platform <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="flex min-w-0 justify-center lg:justify-end">
          <img
            src="/concept/zapla-logo-dark.svg"
            alt="Zapla"
            width={1743}
            height={512}
            className="h-auto w-full max-w-[300px] lg:max-w-[500px]"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

export default ZaplaPlatformTeaserV6;
