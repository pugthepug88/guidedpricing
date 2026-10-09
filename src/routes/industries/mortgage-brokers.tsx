import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronRight, Pause, Play, RotateCcw, Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import pageCss from "@/styles/mortgage-brokers.css?url";

export const Route = createFileRoute("/industries/mortgage-brokers")({
  staticData: { sitemap: false },
  head: () => ({
    links: [
      { rel: "stylesheet", href: pageCss },
      {
        rel: "preload",
        href: "/concept/industries/fonts/inter-tight-latin-500-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
    meta: [
      { title: "Client Follow-Up for Australian Mortgage Brokers | Zapla" },
      {
        name: "description",
        content:
          "Stay connected with clients who are not ready yet, reconnect with older enquiries and invite settled clients to a loan review. Built around your brokerage with Guided Launch.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MortgageBrokersPage,
});
const BOOK = "https://zapla.io/booking";
function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-eyebrow">{children}</p>;
}
function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="mb-text-link" href={href}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function BookButton() {
  return (
    <a className="mb-button mb-primary" href={BOOK}>
      Book a Call
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}
function Avatar({ broker = false }: { broker?: boolean }) {
  return <span className={`mb-avatar ${broker ? "mb-avatar-broker" : ""}`} aria-hidden="true" />;
}
function PetalAvatar() {
  return (
    <span className="mb-petal-avatar">
      <ZaplaPetal size={27} />
    </span>
  );
}

// A brief, one-way story. It pauses offscreen and in background tabs, then holds the result.
function useStory(last: number, interval = 900) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.15 });
  const prefersReduced = useReducedMotion();
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(Boolean(prefersReduced)), [prefersReduced]);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [foreground, setForeground] = useState(true);
  useEffect(() => {
    const update = () => setForeground(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (!visible || reduced || paused || !foreground || step >= last) return;
    const timer = window.setTimeout(() => setStep((s) => Math.min(s + 1, last)), interval);
    return () => window.clearTimeout(timer);
  }, [visible, reduced, paused, foreground, step, last, interval]);
  return {
    ref,
    step: reduced ? last : step,
    paused,
    reduced,
    last,
    toggle: () => setPaused((p) => !p),
    replay: () => {
      setStep(0);
      setPaused(false);
    },
  };
}
function StoryControls({ story }: { story: ReturnType<typeof useStory> }) {
  if (story.reduced) return null;
  return (
    <div className="mb-story-controls">
      {story.step < story.last && (
        <button
          type="button"
          onClick={story.toggle}
          aria-label={story.paused ? "Play example" : "Pause example"}
        >
          {story.paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      )}
      <button type="button" onClick={story.replay} aria-label="Replay example">
        <RotateCcw size={14} />
      </button>
    </div>
  );
}
function HeroScene() {
  const story = useStory(1, 1100);
  return (
    <div
      ref={story.ref}
      className="mb-hero-scene"
      aria-label="Illustrative client relationship: an agreed check-in leads to a new conversation"
    >
      <div className="mb-hero-photo">
        <img
          src="/concept/human-work/broker.jpg"
          alt="Clients discussing their property plans with a mortgage broker"
          width="1280"
          height="720"
          fetchPriority="high"
        />
      </div>
      <div className="mb-glass mb-hero-request">
        <div className="mb-person">
          <Avatar />
          <div>
            <strong>Alex Chen</strong>
            <span>Still looking for a home</span>
          </div>
        </div>
        <p>“We’re not quite ready yet. Can we reconnect next month?”</p>
        <div className="mb-remember">
          <ZaplaPetal size={24} />
          <span>Next check-in remembered.</span>
        </div>
      </div>
      <div
        className={`mb-glass mb-hero-return ${story.step === 1 ? "is-visible" : ""}`}
        aria-hidden={story.step < 1}
      >
        <span className="mb-small-label">The following month</span>
        <p>
          “We’ve found somewhere.
          <br />
          Can we talk?”
        </p>
        <span className="mb-owner">Client reply → Your broker</span>
      </div>
      <span className="mb-hero-example">Illustrative example</span>
      <StoryControls story={story} />
    </div>
  );
}
function ProspectScene() {
  const story = useStory(2);
  return (
    <div ref={story.ref} className="mb-prospect-scene" data-step={story.step}>
      <div className="mb-scene-top">
        <span>From “not yet” to a conversation</span>
        <StoryControls story={story} />
      </div>
      <ol className="mb-timeline" aria-label="Example stages">
        <li className="is-current">Agreed timing</li>
        <li className={story.step >= 1 ? "is-current" : ""}>Check-in sent</li>
        <li className={story.step >= 2 ? "is-current" : ""}>Client replies</li>
      </ol>
      <div className="mb-record">
        <div className="mb-person">
          <Avatar />
          <div>
            <strong>Alex Chen</strong>
            <span>Asked us to reconnect next month</span>
          </div>
        </div>
        <span>Next conversation with your broker</span>
      </div>
      <div
        className={`mb-dialogue mb-outgoing ${story.step >= 1 ? "is-visible" : ""}`}
        aria-hidden={story.step < 1}
      >
        <PetalAvatar />
        <div>
          <span className="mb-sender">Your brokerage · Scheduled check-in</span>
          <div className="mb-message">
            <p>
              Hi Alex, you asked us to reconnect this month. How’s the property search going? If
              you’d like to talk through your next steps, reply here and we’ll arrange a chat.
            </p>
            <small>Reply STOP to opt out.</small>
          </div>
        </div>
      </div>
      <div
        className={`mb-dialogue mb-incoming ${story.step >= 2 ? "is-visible" : ""}`}
        aria-hidden={story.step < 2}
      >
        <Avatar />
        <div>
          <span className="mb-sender">Alex Chen</span>
          <div className="mb-message">
            <p>Good timing. We’ve found a place we like. Can we talk tomorrow?</p>
          </div>
        </div>
      </div>
      <div
        className={`mb-handoff ${story.step >= 2 ? "is-visible" : ""}`}
        aria-hidden={story.step < 2}
      >
        <Avatar broker />
        <p>
          <strong>Your broker takes it from here.</strong>
          <span>The previous conversation stays alongside the reply.</span>
        </p>
      </div>
      <p className="mb-example-note">
        Illustrative flow. Timing, messages and reply handling are agreed and tested during setup.
      </p>
    </div>
  );
}
function ReviewScene() {
  const [mode, setMode] = useState<"annual" | "fixed">("annual");
  const annual = mode === "annual";
  return (
    <div className="mb-review-scene">
      <div className="mb-review-tabs" role="group" aria-label="Choose a client review example">
        <button type="button" aria-pressed={annual} onClick={() => setMode("annual")}>
          Annual review
        </button>
        <button type="button" aria-pressed={!annual} onClick={() => setMode("fixed")}>
          Fixed rate ending
        </button>
      </div>
      <div className="mb-review-record">
        <div className="mb-person">
          <span className="mb-avatar mb-avatar-priya" aria-hidden="true" />
          <div>
            <strong>Priya Shah</strong>
            <span>Settled client</span>
          </div>
        </div>
        <p>
          {annual ? "Annual review date" : "Verified fixed rate end date"}
          <strong>{annual ? "Time to reconnect" : "Conversation due before expiry"}</strong>
        </p>
      </div>
      <div className="mb-dialogue is-visible">
        <PetalAvatar />
        <div>
          <span className="mb-sender">Your brokerage · Review invitation</span>
          <div className="mb-message">
            <p>
              {annual
                ? "Hi Priya, it’s been a year since we helped with your home loan. Would you like to arrange a review with your broker and talk through anything that’s changed?"
                : "Hi Priya, your recorded fixed rate period is coming to an end. Would you like to arrange a conversation with your broker about your next steps?"}
            </p>
            <span className="mb-message-link">Arrange a conversation</span>
            <small>Reply STOP to opt out.</small>
          </div>
        </div>
      </div>
      <div className="mb-review-response">
        <span className="mb-avatar mb-avatar-priya" aria-hidden="true" />
        <p>“Yes please. Our plans have changed since we last spoke.”</p>
      </div>
      <p className="mb-example-note">
        Illustrative invitation. Your broker verifies dates, approves the wording and handles the
        advice.
      </p>
    </div>
  );
}
const FAQS = [
  [
    "Does Zapla replace our mortgage software?",
    "No. Your specialist system remains the home for applications, lender research, submissions and loan processing. Zapla is for agreed client follow through around that work.",
  ],
  [
    "What if our current CRM already does this?",
    "Start there. If your current setup already handles these client moments well, adding another platform may not help. The call is about finding a real gap, then deciding whether Zapla is a useful fit.",
  ],
  [
    "Will it connect to our existing system?",
    "We assess your current setup before agreeing the scope. We do not assume a native connection or automatic two-way sync. The required information, how it reaches Zapla and who maintains it are agreed during Guided Launch.",
  ],
  [
    "Who approves the messages and contact timing?",
    "Your brokerage does. We agree the audiences, contact permissions, message wording, timing and opt-out handling before launch. Review dates and fixed rate end dates need to be verified by your team.",
  ],
  [
    "Does AI give loan or refinance advice?",
    "No. The examples here invite a conversation. Your broker assesses the client’s situation and provides the advice. Messages should not promise approval, a better rate or savings.",
  ],
  [
    "What happens when a client replies or books?",
    "We agree who owns the response and how your team receives it. Reply handling, booking links and any rules that stop later messages are tested as part of the agreed setup before you go live.",
  ],
  [
    "What does Guided Launch include?",
    "We map the agreed client journeys, configure the required contact information and flows, prepare messages with your team and test the next steps together. The scope and plan are confirmed before setup begins.",
  ],
];
function MortgageBrokersPage() {
  return (
    <main className="mortgage-brokers-page" data-page="mortgage-brokers">
      <section className="mb-hero mb-wrap" aria-labelledby="mortgage-title">
        <div className="mb-hero-copy">
          <Eyebrow>For Australian mortgage brokers</Eyebrow>
          <h1 id="mortgage-title">
            Not ready yet
            <br />
            shouldn’t mean
            <br />
            <span>forgotten.</span>
          </h1>
          <p className="mb-intro">
            Stay connected with clients who are still looking, reconnect with enquiries that went
            quiet and give settled clients a reason to speak with you again.
          </p>
          <div className="mb-actions">
            <BookButton />
            <a className="mb-flow-link" href="#client-relationship">
              See how it works
              <ChevronRight size={17} aria-hidden="true" />
            </a>
          </div>
          <p className="mb-hero-footnote">
            Built around your brokerage. Alongside your specialist mortgage software.
          </p>
        </div>
        <HeroScene />
      </section>
      <section className="mb-recognition mb-wrap" aria-labelledby="recognition-title">
        <div>
          <Eyebrow>The client relationship</Eyebrow>
          <h2 id="recognition-title">The next opportunity isn’t always a new lead.</h2>
        </div>
        <div className="mb-moments">
          <article>
            <span>Still looking</span>
            <h3>Reconnect when they’re ready.</h3>
            <p>The property search takes longer than expected. Keep the check-in you agreed to.</p>
          </article>
          <article>
            <span>Gone quiet</span>
            <h3>Revisit older enquiries.</h3>
            <p>A conversation paused. A relevant invitation can give it a next step.</p>
          </article>
          <article>
            <span>Settled last year</span>
            <h3>Keep loan reviews in view.</h3>
            <p>Life moves on after settlement. Make it easy to talk about what’s changed.</p>
          </article>
        </div>
      </section>
      <section
        id="client-relationship"
        className="mb-prospect mb-wrap"
        aria-labelledby="prospect-title"
      >
        <ProspectScene />
        <div className="mb-section-copy">
          <Eyebrow>Before they’re ready</Eyebrow>
          <h2 id="prospect-title">
            Keep the
            <br />
            conversation open.
          </h2>
          <p>Property searches pause. Plans change. “Not yet” becomes “we’ve found a place”.</p>
          <p>
            Agree when to reconnect, then let Zapla send the next check-in. When the client replies,
            your broker picks up the conversation with the context already there.
          </p>
          <TextLink href="/follow-up">Explore Follow-Up</TextLink>
          <div className="mb-support">
            <strong>And the enquiries that went quiet?</strong>
            <p>
              Reconnect with a relevant, approved invitation through{" "}
              <a href="/reactivation">Reactivation</a>.
            </p>
          </div>
        </div>
      </section>
      <section className="mb-retention" aria-labelledby="retention-title">
        <div className="mb-wrap mb-retention-inner">
          <div className="mb-section-copy">
            <Eyebrow>After settlement</Eyebrow>
            <h2 id="retention-title">Settlement shouldn’t end the conversation.</h2>
            <p>
              An annual review. A fixed rate period approaching its end. A change in the client’s
              plans.
            </p>
            <p>
              Use broker verified dates to invite the next conversation. Your team decides who to
              contact and what to say. Your broker handles the review and advice.
            </p>
            <TextLink href="/customer-marketing">Explore Customer Marketing</TextLink>
          </div>
          <ReviewScene />
        </div>
      </section>
      <section className="mb-fit mb-wrap" aria-labelledby="fit-title">
        <Eyebrow>Designed to fit your brokerage</Eyebrow>
        <h2 id="fit-title">
          Keep your broking software.
          <br />
          <span>Close the follow through gaps.</span>
        </h2>
        <p className="mb-fit-intro">
          If your existing setup already does this well, keep using it. Zapla belongs where there’s
          an agreed gap in keeping client conversations moving.
        </p>
        <div className="mb-fit-layout">
          <div>
            <h3>Your specialist software</h3>
            <p>Applications and loan processing</p>
            <p>Lender research and submissions</p>
            <p>Your core mortgage records</p>
          </div>
          <div className="mb-fit-boundary">
            <span>
              Clear roles. <br />
              Agreed data.
            </span>
          </div>
          <div>
            <img
              src="/concept/zapla-logo-dark.svg"
              alt="Zapla"
              width="112"
              height="34"
              loading="lazy"
            />
            <p>Follow up before clients are ready</p>
            <p>Reconnection with older enquiries</p>
            <p>Invitations to the next review</p>
          </div>
        </div>
        <p className="mb-fit-note">
          Data access and connections depend on your existing system. We confirm the approach before
          setup.
        </p>
      </section>
      <section className="mb-launch" aria-labelledby="launch-title">
        <div className="mb-wrap">
          <div className="mb-launch-heading">
            <div>
              <Eyebrow>Guided Launch</Eyebrow>
              <h2 id="launch-title">
                Start with the client
                <br />
                moments worth fixing.
              </h2>
            </div>
            <p>
              We map your process, build the agreed flows and get your team ready to use them. You
              approve the messages. We test the next steps together.
            </p>
          </div>
          <div className="mb-launch-steps">
            <article>
              <h3>Find the gap.</h3>
              <p>
                Which clients need a next conversation? Agree the audience, timing and contact
                permissions.
              </p>
            </article>
            <article>
              <h3>Make it yours.</h3>
              <p>
                Prepare your messages, check-in dates and team responsibilities around how your
                brokerage works.
              </p>
            </article>
            <article>
              <h3>Test the next step.</h3>
              <p>
                Walk through the message, reply and booking. Confirm what happens next and when
                further contact stops.
              </p>
            </article>
          </div>
          <div className="mb-launch-question">
            <p>The question to answer on the call</p>
            <h3>
              Which client conversations are being missed today,
              <br />
              and who will handle them when they restart?
            </h3>
            <TextLink href={BOOK}>Map your brokerage’s gaps</TextLink>
          </div>
        </div>
      </section>
      <section className="mb-commercial mb-wrap" aria-labelledby="plans-title">
        <div>
          <Eyebrow>Plans for your brokerage</Eyebrow>
          <h2 id="plans-title">
            Your team.
            <br />
            Your client book.
            <br />
            One platform price.
          </h2>
          <p>
            Unlimited users and contacts, with platform fair use. Pick the scope that fits the
            client work you want to improve.
          </p>
        </div>
        <div className="mb-plans">
          <article>
            <div>
              <h3>Follow-Through</h3>
              <p>Build the essential enquiry, follow up and booking flows.</p>
              <small>Guided Launch from A$1,997 + GST</small>
            </div>
            <strong>
              A$399<span>/month + GST</span>
            </strong>
          </article>
          <article>
            <div>
              <h3>Growth</h3>
              <p>Add ongoing client marketing and reactivation.</p>
              <small>Guided Launch from A$2,997 + GST</small>
            </div>
            <strong>
              A$699<span>/month + GST</span>
            </strong>
          </article>
          <p className="mb-plan-note">
            Usage is charged separately. Final scope and inclusions are confirmed before setup.
          </p>
          <TextLink href="/Pricing-v3">Compare plans and Guided Launch</TextLink>
        </div>
      </section>
      <section className="mb-faq mb-wrap" aria-labelledby="faq-title">
        <div>
          <Eyebrow>A few practical questions</Eyebrow>
          <h2 id="faq-title">
            Before we
            <br />
            get started.
          </h2>
        </div>
        <div>
          {FAQS.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Plus size={18} aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="mb-final mb-wrap" aria-labelledby="final-title">
        <span className="mb-final-petal">
          <ZaplaPetal size={34} />
        </span>
        <h2 id="final-title">
          Keep your next client
          <br />
          conversation moving.
        </h2>
        <p>
          Show us how you follow up today. We’ll map the gaps, what Zapla can help with and what
          your team needs to handle.
        </p>
        <div className="mb-actions">
          <BookButton />
          <a className="mb-button mb-secondary" href="/Pricing-v3">
            View pricing
          </a>
        </div>
      </section>
    </main>
  );
}
