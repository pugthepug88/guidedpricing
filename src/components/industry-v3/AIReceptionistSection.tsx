import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, PhoneIncoming } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/industry-ai-receptionist-v3.css";

type Industry =
  "skin" | "dental" | "mechanics" | "trades" | "allied" | "mortgage" | "mortgageOriginal";
const examples = {
  skin: {
    heading: "Answer calls and capture new enquiries.",
    copy: "AI Receptionist answers incoming calls, handles your clinic’s approved routine questions and collects callback details. Your team receives the request and follows up with the client.",
    boundary: "Clinical questions and treatment advice go to your qualified team.",
    name: "Mia",
    portrait: "60% 33.333%",
    business: "Your clinic",
    owner: "Reception",
    question: "I’d like to arrange a first consultation.",
    answer: "I’m the clinic’s AI assistant. May I take your name and a good time for a callback?",
    request: "First consultation enquiry",
  },
  dental: {
    heading: "Answer calls from new patients.",
    copy: "Answer routine questions and collect a callback request while reception helps patients. AI Receptionist keeps the caller’s details and request ready for your team to arrange an appointment.",
    boundary:
      "Clinical questions and urgent concerns follow your practice’s human response process. AI does not assess urgency.",
    name: "Mia",
    portrait: "60% 33.333%",
    business: "Your practice",
    owner: "Reception",
    question: "Are you taking new patients?",
    answer:
      "I’m the practice’s AI assistant. Yes, we welcome new patients. May I take your name and a good time for a callback?",
    request: "New patient enquiry",
  },
  mechanics: {
    heading: "Answer calls while you’re on the tools.",
    copy: "AI Receptionist answers routine enquiries and collects the customer’s request and vehicle details. Your team gets the information it needs to call back and arrange the next step.",
    boundary:
      "Mechanical advice, repair decisions and urgent concerns stay with your workshop team.",
    name: "Mia",
    portrait: "60% 33.333%",
    business: "Your workshop",
    owner: "Workshop team",
    question: "Could you look at my brakes? It’s a 2019 Toyota RAV4.",
    answer: "I’m the workshop’s AI assistant. May I take your name and a good time for a callback?",
    request: "Brake inspection enquiry · 2019 Toyota RAV4",
  },
  trades: {
    heading: "Answer calls while you’re on site.",
    copy: "Collect new job enquiries without stopping the work in front of you. AI Receptionist answers routine questions and records the customer’s request, ready for your team to call back.",
    boundary: "Technical advice, quotes and urgent dispatch stay with your team.",
    name: "Daniel",
    portrait: "80% 33.333%",
    business: "Your business",
    owner: "Your team",
    question: "Can someone quote for a split system installation?",
    answer: "I’m the AI assistant. May I take your name and a good time for a callback?",
    request: "Split system installation quote request",
  },
  allied: {
    heading: "Help reception answer incoming calls.",
    copy: "AI Receptionist answers approved administrative questions and collects appointment enquiries. Reception gets the caller’s request and preferred callback time.",
    boundary:
      "Clinical questions and urgent concerns go through your practice’s human response process. AI does not assess urgency.",
    name: "Mia",
    portrait: "100% 100%",
    business: "Your practice",
    owner: "Reception",
    question: "Could reception help me find a physio appointment?",
    answer: "I’m the practice’s AI assistant. May I take your name and a good time for a callback?",
    request: "Physiotherapy appointment enquiry",
  },
  mortgage: {
    heading: "Capture calls while you’re with a client.",
    copy: "AI Receptionist collects new enquiries and callback preferences. Your broker receives the request and follows up with the prospective client.",
    boundary: "Loan recommendations and financial advice stay with your broker.",
    name: "Sam",
    portrait: "20% 0%",
    business: "Your brokerage",
    owner: "Your broker",
    question: "Can I speak to someone about buying my first home?",
    answer:
      "I’m the brokerage’s AI assistant. May I take your name and a good time for a callback?",
    request: "First home buyer enquiry",
  },
  mortgageOriginal: {
    heading: "Capture calls while you’re with a client.",
    copy: "AI Receptionist collects new enquiries and callback preferences. Your broker receives the request and follows up with the prospective client.",
    boundary: "Loan recommendations and financial advice stay with your broker.",
    name: "Mia",
    portrait: "60% 33.333%",
    business: "Your brokerage",
    owner: "Your broker",
    question: "Can I speak to someone about buying my first home?",
    answer:
      "I’m the brokerage’s AI assistant. May I take your name and a good time for a callback?",
    request: "First home buyer enquiry",
  },
} satisfies Record<Industry, Record<string, string>>;

export function AIReceptionistSection({
  industry,
  compact = false,
  inline = false,
  tone = "dark",
}: {
  industry: Industry;
  compact?: boolean;
  inline?: boolean;
  tone?: "dark" | "cream" | "open";
}) {
  const item = examples[industry];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1, margin: "0px 0px 80px 0px" });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [foreground, setForeground] = useState(true);
  useEffect(() => {
    const update = () => setForeground(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (reduced) setStep(3);
  }, [reduced]);
  useEffect(() => {
    if (!inView || !foreground || reduced || step >= 3) return;
    const timer = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? 200 : 450);
    return () => window.clearTimeout(timer);
  }, [inView, foreground, reduced, step]);
  const Heading = inline ? "h3" : "h2";
  return (
    <section
      className={`za3-section za3-${tone} ${compact ? "za3-compact" : ""} ${inline ? "za3-inline" : ""}`}
      aria-labelledby={`ai-${industry}-title`}
    >
      <div className="za3-layout">
        <div className="za3-copy">
          <p className="za3-eyebrow">AI Receptionist</p>
          <Heading className="za3-title" id={`ai-${industry}-title`}>
            {item.heading}
          </Heading>
          <p className="za3-description">{item.copy}</p>
          <p className="za3-boundary">{item.boundary}</p>
          <a className="za3-link" href="/ai-receptionist-v3">
            Explore AI Receptionist <ArrowRight size={16} aria-hidden="true" />
          </a>
          <p className="za3-cost">
            Optional add-on. <a href="/pricing-review-v3">Setup and usage charges apply.</a>
          </p>
        </div>
        <div
          ref={ref}
          className="za3-call"
          data-step={step}
          aria-label={`Illustrative ${item.request.toLowerCase()}: incoming call, AI response, client reply and staff callback request. No appointment is booked.`}
        >
          <div className="za3-call-heading">
            <PhoneIncoming size={19} aria-hidden="true" />
            <span>{step === 0 ? "Incoming call" : "Call answered by AI Receptionist"}</span>
          </div>
          <div className="za3-person">
            <span
              className="za3-avatar"
              style={{ backgroundPosition: item.portrait }}
              aria-hidden="true"
            />
            <div>
              <strong>{item.name}</strong>
              <p>{item.question}</p>
            </div>
          </div>
          <div
            className={`za3-answer za3-glass ${step >= 1 ? "za3-visible" : "za3-hidden"}`}
            aria-hidden={step < 1}
          >
            <div className="za3-sender">
              <ZaplaPetal size={24} />
              <strong>{item.business} · AI Receptionist</strong>
            </div>
            <p>{item.answer}</p>
          </div>
          <div
            className={`za3-person za3-reply ${step >= 2 ? "za3-visible" : "za3-hidden"}`}
            aria-hidden={step < 2}
          >
            <span
              className="za3-avatar"
              style={{ backgroundPosition: item.portrait }}
              aria-hidden="true"
            />
            <div>
              <strong>{item.name}</strong>
              <p>It’s {item.name}. Afternoon, please.</p>
            </div>
          </div>
          <div
            className={`za3-request ${step >= 3 ? "za3-visible" : "za3-hidden"}`}
            aria-hidden={step < 3}
          >
            <strong>{item.owner} · Callback request</strong>
            <div className="za3-person za3-record-person">
              <span
                className="za3-avatar"
                style={{ backgroundPosition: item.portrait }}
                aria-hidden="true"
              />
              <div>
                <p>
                  {item.name} · {item.request}
                </p>
                <span>Preferred time: Afternoon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
