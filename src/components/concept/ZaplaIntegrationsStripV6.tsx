import {
  siAirtable,
  siClickup,
  siFacebook,
  siGoogle,
  siInstagram,
  siLinkedin,
  siNotion,
  siQuickbooks,
  siShopify,
  siSlack,
  siStripe,
  siTiktok,
  siWhatsapp,
  siXero,
  siZapier,
  type SimpleIcon,
} from "simple-icons";

const INTEGRATIONS: SimpleIcon[] = [
  siGoogle,
  siFacebook,
  siInstagram,
  siWhatsapp,
  siLinkedin,
  siTiktok,
  siStripe,
  siXero,
  siQuickbooks,
  siAirtable,
  siNotion,
  siSlack,
  siClickup,
  siShopify,
  siZapier,
];

function IntegrationLogo({ icon }: { icon: SimpleIcon }) {
  return (
    <div className="flex shrink-0 items-center gap-3 whitespace-nowrap px-5 sm:px-7">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6 sm:h-7 sm:w-7"
      >
        <path d={icon.path} fill={`#${icon.hex}`} />
      </svg>
      <span className="text-[17px] font-semibold tracking-[-0.025em] text-[#343936] sm:text-[19px]">
        {icon.title}
      </span>
    </div>
  );
}

export function ZaplaIntegrationsStripV6() {
  return (
    <section
      aria-label="Zapla integrations"
      className="border-y border-[#111318]/10 bg-[#F7F4EE]"
    >
      <style>{`
        @keyframes zapla-integrations-marquee-v6 {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .zapla-integrations-track-v6 {
          animation: zapla-integrations-marquee-v6 58s linear infinite;
          will-change: transform;
        }
        .zapla-integrations-marquee-v6:hover .zapla-integrations-track-v6 {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .zapla-integrations-track-v6 {
            animation: none;
            transform: none;
          }
          .zapla-integrations-copy-v6 {
            display: none;
          }
        }
      `}</style>

      <div className="mx-auto flex max-w-[1600px] flex-col lg:flex-row lg:items-stretch">
        <div className="flex shrink-0 items-center border-b border-[#111318]/10 px-5 py-5 sm:px-10 lg:w-[245px] lg:border-b-0 lg:border-r lg:px-10 lg:py-0">
          <p className="max-w-[180px] text-[10px] font-semibold uppercase leading-[1.55] tracking-[0.2em] text-[#747A76] sm:text-[11px]">
            Works with the tools you already use
          </p>
        </div>

        <div className="zapla-integrations-marquee-v6 min-w-0 flex-1 overflow-hidden py-5 sm:py-6">
          <div className="zapla-integrations-track-v6 flex w-max items-center">
            <div className="flex shrink-0 items-center" aria-label="Integration examples">
              {INTEGRATIONS.map((icon) => (
                <IntegrationLogo key={`a-${icon.slug}`} icon={icon} />
              ))}
            </div>
            <div
              className="zapla-integrations-copy-v6 flex shrink-0 items-center"
              aria-hidden="true"
            >
              {INTEGRATIONS.map((icon) => (
                <IntegrationLogo key={`b-${icon.slug}`} icon={icon} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ZaplaIntegrationsStripV6;
