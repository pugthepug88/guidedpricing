import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { INDUSTRY_GROUPS } from "@/lib/industries";
import pageCss from "@/styles/industries-hub.css?url";

const TITLE = "Industries | See How Zapla Works for Your Business";
const DESCRIPTION =
  "Explore Zapla for mechanics, trades, allied health, dental practices, skin clinics and mortgage brokers. Customer communication built around how you work.";

export const Route = createFileRoute("/industries/")({
  staticData: { sitemap: false },
  head: () => ({
    links: [{ rel: "stylesheet", href: pageCss }],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      // Release indexing with the approved industry estate in the production SEO pass.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <main className="industries-hub" data-page="industries">
      <section className="ih-hero ih-wrap" aria-labelledby="industries-title">
        <div>
          <p className="ih-label">Industries</p>
          <h1 id="industries-title">
            See how Zapla works
            <br />
            <span>for your business.</span>
          </h1>
        </div>
        <div className="ih-intro">
          <p>
            A workshop quote, a patient enquiry and a client check-in need different follow-up.
            Explore the workflows that fit how you work.
          </p>
          <a className="ih-text-link" href="#industry-directory">
            Find your industry <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>

      <div id="industry-directory" className="ih-directory ih-wrap">
        {INDUSTRY_GROUPS.map((group) => (
          <section
            className={`ih-group ih-group-${group.id}`}
            key={group.id}
            aria-labelledby={group.id}
          >
            <div className="ih-group-heading">
              <h2 id={group.id}>{group.title}</h2>
              <p>{group.description}</p>
            </div>
            <div className="ih-entries">
              {group.industries.map((industry) => (
                <a className="ih-entry" href={industry.href} key={industry.href}>
                  <img
                    src={`/concept/industries/${industry.image}`}
                    alt={industry.alt}
                    width="1536"
                    height="1024"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="ih-entry-copy">
                    <h3>{industry.name}</h3>
                    <p>{industry.copy}</p>
                    <span className="ih-entry-link">
                      Explore {industry.name} <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="ih-fit" aria-labelledby="fit-title">
        <div className="ih-wrap ih-fit-layout">
          <div>
            <p className="ih-label">Start where you are</p>
            <h2 id="fit-title">
              Build around
              <br />
              how you work today.
            </h2>
            <a className="ih-text-link" href="/platform">
              Explore the platform <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="ih-starting-points">
            <div>
              <h3>Using inboxes and spreadsheets?</h3>
              <p>
                Bring customer details, conversations and follow-up into one place, so your team can
                see what needs to happen next.
              </p>
            </div>
            <div>
              <h3>Already have specialist software?</h3>
              <p>
                Start with the communication gaps around it. Keep the tools that serve your
                business. We check available connections and data before agreeing what to automate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ih-final ih-wrap" aria-labelledby="next-title">
        <div>
          <h2 id="next-title">Not sure where your business fits?</h2>
          <p>
            Tell us how enquiries and customer follow-up work today. We’ll identify a useful
            starting workflow and check what’s needed to set it up.
          </p>
        </div>
        <a className="ih-button" href="/booking">
          Book a Call <ArrowRight size={17} aria-hidden="true" />
        </a>
      </section>
    </main>
  );
}
