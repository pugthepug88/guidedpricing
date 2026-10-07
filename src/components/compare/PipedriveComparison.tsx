import { useState, type KeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import zaplaLogo from "@/assets/zapla-logo-blue.png.asset.json";
import { capabilityRows, faqs, sources, workflows } from "./pipedrive-data";

function Refs({ items }: { items: number[] }) {
  return <sup>{items.map((number, index) => <span key={number}>{index > 0 ? ", " : ""}<a className="compare-source-link" href={`#source-${number}`} aria-label={`Source ${number}`}>{number}</a></span>)}</sup>;
}

function BookButton() {
  return <Button asChild className="compare-primary"><a href="https://zapla.io/booking">Book a Call <ArrowRight size={16} /></a></Button>;
}

function Hero() {
  return <section className="pb-16 pt-32 md:pb-20 md:pt-36">
    <div className="compare-inner">
      <div className="text-center">
        <p className="compare-label compare-coral">Zapla vs Pipedrive</p>
        <h1>Which setup fits the way you <span className="compare-blue">follow up?</span></h1>
        <p className="compare-muted mx-auto mt-6 max-w-[720px]">Compare Pipedrive's sales-focused CRM with Zapla's shared follow-through setup for enquiries, quotes and bookings.</p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"><BookButton /><Button asChild className="compare-secondary"><a href="#setup">Compare the setup <ArrowRight size={16} /></a></Button></div>
      </div>
      <div className="compare-rule mt-14 grid gap-8 border-y py-8 md:grid-cols-2 md:gap-14">
        <div>
          <p className="compare-label">Pipedrive</p>
          <h3 className="mt-3">A sales pipeline at the centre.</h3>
          <p className="compare-muted mt-3">Pipeline, activities, email follow-up and scheduling, with automation on the appropriate plan.<Refs items={[1]} /></p>
        </div>
        <div>
          <div className="flex items-center gap-2"><img src={zaplaLogo.url} alt="" width={28} height={28} className="h-7 w-7 object-contain" /><p className="compare-label">Zapla</p></div>
          <h3 className="mt-3">The customer journey, shared by the team.</h3>
          <p className="compare-muted mt-3">CRM, inbox, forms, booking and follow-through with unlimited users.<Refs items={[10]} /></p>
        </div>
      </div>
    </div>
  </section>;
}

function BuyerFit() {
  return <section className="compare-band compare-warm"><div className="compare-inner">
    <h2>Start with what your business needs.</h2>
    <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
      <div><h3>Pipedrive may fit when...</h3><ul className="compare-muted mt-5 space-y-4 list-disc pl-5"><li>Sales activity and the pipeline are your primary daily workspace.</li><li>Your team relies on its documented mobile apps or specific Marketplace integrations.<Refs items={[1]} /></li><li>The existing setup works, and switching would disrupt it.</li></ul></div>
      <div><h3>Zapla may fit when...</h3><ul className="compare-muted mt-5 space-y-4 list-disc pl-5"><li>Several people handle enquiries, replies and bookings.</li><li>You want forms, pipelines, inbox and calendars within the current packaged offer.<Refs items={[10]} /></li><li>You want a scoped Guided Launch rather than configuring the first setup alone.</li></ul></div>
    </div>
    <p className="compare-rule mt-10 border-t pt-6 font-medium">If Pipedrive already solves your process, a broader feature list is not a reason to switch.</p>
  </div></section>;
}

function SetupComparison() {
  return <section id="setup" className="compare-band"><div className="compare-inner">
    <p className="compare-label compare-coral mb-4">The configuration matters</p>
    <h2>Compare the setup.<br />Not just the feature names.</h2>
    <div className="mt-8 grid gap-7 md:grid-cols-2 md:gap-14">
      <div><h3>Pipedrive Growth</h3><p className="compare-muted mt-3">Our baseline for its combination of email sync, sequences, automation and scheduling. It is not necessary for every manual-CRM buyer.<Refs items={[1, 5]} /></p><p className="compare-muted mt-4">Native web intake adds LeadBooster on Growth. Premium includes it and also matters for automatic assignment and advanced permissions, so price-check Premium too. An existing external form may avoid LeadBooster.<Refs items={[1, 2]} /></p></div>
      <div><h3>Zapla Follow-Through</h3><p className="compare-muted mt-3">Our baseline for incoming enquiries, quotes and bookings, with the included platform and an agreed first build.<Refs items={[10]} /></p><p className="compare-muted mt-4">Zapla Growth is for ongoing marketing and database reactivation. You do not need to select it simply because Pipedrive's comparison baseline is named Growth.</p></div>
    </div>
    <div className="compare-desktop-table mt-10"><table className="compare-table"><caption className="sr-only">Pipedrive Growth and Zapla Follow-Through capability comparison, with plan-specific exceptions</caption><thead><tr><th scope="col">Capability</th><th scope="col">Pipedrive</th><th scope="col" className="compare-zapla-cell">Zapla</th></tr></thead><tbody>{capabilityRows.map(row => <tr key={row.name}><th scope="row">{row.name}</th><td>{row.pipedrive}<Refs items={row.pRefs} /></td><td className="compare-zapla-cell">{row.zapla}<Refs items={row.zRefs} /></td></tr>)}</tbody></table></div>
    <div className="compare-mobile-table compare-rule mt-8 border-t">{capabilityRows.map(row => <section key={row.name} className="compare-rule border-b py-6"><h3 className="mb-4">{row.name}</h3><dl className="space-y-5"><div><dt className="compare-label">Pipedrive</dt><dd className="compare-muted mt-2">{row.pipedrive}<Refs items={row.pRefs} /></dd></div><div><dt className="compare-label compare-blue">Zapla</dt><dd className="compare-muted mt-2">{row.zapla}<Refs items={row.zRefs} /></dd></div></dl></section>)}</div>
    <p className="compare-footnote compare-muted mt-5">Vendor-documented components and Zapla commercial inclusions, not a promise of identical behaviour. Confirm the configuration that matters to your business.</p>
  </div></section>;
}

function WorkflowComparison() {
  const [active, setActive] = useState(0);
  const workflow = workflows[active] ?? workflows[0];
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") next = index === 0 ? 1 : 0;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 1;
    else return;
    event.preventDefault(); setActive(next); document.getElementById(`workflow-tab-${next}`)?.focus();
  }
  return <section className="compare-band compare-dark"><div className="compare-inner">
    <p className="compare-label compare-confirm mb-4">Two everyday journeys</p><h2>Follow an enquiry.<br />Revisit a cold quote.</h2>
    <div className="compare-rule mt-8 flex gap-8 border-b" role="tablist" aria-label="Compare a workflow">{workflows.map((item, index) => <Button key={item.id} variant="ghost" role="tab" id={`workflow-tab-${index}`} aria-selected={active === index} aria-controls={`workflow-panel-${index}`} tabIndex={active === index ? 0 : -1} className="compare-tab" onClick={() => setActive(index)} onKeyDown={event => onKeyDown(event, index)}>{item.title}</Button>)}</div>
    <div role="tabpanel" id={`workflow-panel-${active}`} aria-labelledby={`workflow-tab-${active}`} tabIndex={0}>
      <p className="compare-muted mt-6">{workflow.intro}</p>
      <div className="compare-rule mt-6 hidden grid-cols-[.55fr_1fr_1fr] gap-7 border-b pb-4 md:grid"><span className="compare-label">Step</span><span className="compare-label">Pipedrive</span><span className="compare-label">Zapla</span></div>
      <ol>{workflow.steps.map((step, index) => <li key={step.name} className="compare-rule grid gap-4 border-b py-6 md:grid-cols-[.55fr_1fr_1fr] md:gap-7"><h3 className="compare-step-name"><span className="compare-confirm mr-2">{String(index + 1).padStart(2, "0")}</span>{step.name}</h3><div><p className="compare-label mb-2 md:hidden">Pipedrive</p><p className="compare-muted">{step.p}</p></div><div><p className="compare-label mb-2 md:hidden">Zapla</p><p className="compare-muted">{step.z}</p><p className="compare-confirm mt-3">Confirm in your setup: {step.confirm}.</p></div></li>)}</ol>
    </div>
    <p className="compare-footnote compare-muted mt-6">Illustrative setup based on documented capabilities. These end-to-end workflows have not been hands-on tested for this comparison.<Refs items={[1, 2, 4, 5, 10]} /></p>
  </div></section>;
}

function Costs() {
  return <section id="cost" className="compare-band compare-warm"><div className="compare-inner">
    <h2>Compare the whole bill.</h2><p className="compare-muted mt-5 max-w-[720px]">The team subscription is only one part. Compare the plan, first setup, communications and the work you still need.</p>
    <div className="compare-rule mt-10 grid gap-10 border-y py-8 md:grid-cols-2 md:gap-16">
      <div><h3>Pipedrive</h3><dl className="mt-6 space-y-5"><div><dt className="font-semibold">Subscription</dt><dd className="compare-muted">Per paid seat, with monthly or annual billing. The selected tier and team size change the bill.<Refs items={[3]} /></dd></div><div><dt className="font-semibold">First setup</dt><dd className="compare-muted">Account for your own configuration time or any implementation help you choose.</dd></div><div><dt className="font-semibold">Add-ons and usage</dt><dd className="compare-muted">LeadBooster, Campaigns and external communications providers depend on the chosen configuration.<Refs items={[1, 2, 6, 11]} /></dd></div></dl><p className="compare-footnote compare-muted mt-6">Current Australian checkout price, currency and GST treatment are unverified in this comparison.</p><a className="compare-source-link mt-3 inline-block" href={sources[8]?.url}>Check current Pipedrive pricing</a></div>
      <div><h3>Zapla</h3><dl className="mt-6 space-y-5"><div><dt className="font-semibold">Subscription</dt><dd className="compare-muted">Follow-Through A$399/month + GST, with unlimited users. Growth A$699/month + GST only when ongoing marketing and reactivation are needed.<Refs items={[10]} /></dd></div><div><dt className="font-semibold">First setup</dt><dd className="compare-muted">Guided Launch is required for a new standard setup. Follow-Through starts from A$1,997 + GST; Growth starts from A$2,997 + GST.<Refs items={[10]} /></dd></div><div><dt className="font-semibold">Add-ons and usage</dt><dd className="compare-muted">Communications, optional services and work beyond the agreed scope are separate. Confirm provisioning and telecom charges before enablement.</dd></div></dl><p className="compare-footnote compare-muted mt-6">Month-to-month after launch. No early termination fee. Optional Managed Success is not required for this baseline.<Refs items={[10]} /></p><Link className="compare-source-link mt-3 inline-block" to="/Pricing-v3">View current Zapla packaging</Link></div>
    </div>
    <p className="mt-6 text-xl font-medium">Unlimited users does not mean unlimited communications or implementation.</p>
    <details className="mt-5"><summary>Current Zapla usage and optional AI Receptionist <ChevronDown size={20} className="shrink-0" /></summary><div className="pb-7"><dl className="grid gap-5 md:grid-cols-2"><div><dt className="font-semibold">SMS</dt><dd className="compare-muted">Outbound A$0.13 + GST per carrier segment. Inbound A$0.02 + GST per carrier segment.</dd></div><div><dt className="font-semibold">Email overage</dt><dd className="compare-muted">A$1 + GST per 1,000 events. The included allowance and event definition are not established here; this is not the total email price.</dd></div><div><dt className="font-semibold">Optional AI Receptionist</dt><dd className="compare-muted">A$199/month + GST, including 200 Voice AI minutes. Setup from A$997 + GST.</dd></div><div><dt className="font-semibold">Voice AI and telecom</dt><dd className="compare-muted">Voice AI overage A$0.90 + GST per minute. Telecom and number provisioning charges are also confirmed in scope.</dd></div></dl><p className="compare-footnote compare-muted mt-5">Current commercial rates from Zapla Pricing V3, read 7 Oct 2026.<Refs items={[10]} /></p></div></details>
    <div className="mt-12 grid gap-8 md:grid-cols-[.85fr_1.15fr] md:gap-16"><div><p className="compare-label compare-coral mb-3">Guided Launch</p><h3>A finite first build.<br />Not unlimited implementation.</h3><p className="compare-muted mt-4">Follow-Through's starting scope, agreed before work starts. Larger migrations and additional work need separate scope.<Refs items={[10]} /></p></div><ul className="grid gap-x-8 gap-y-3 list-disc pl-5 sm:grid-cols-2"><li>Up to 5,000 clean contacts</li><li>Up to 2 pipelines</li><li>Up to 3 forms or surveys</li><li>Up to 2 calendars</li><li>Up to 3 agreed automations, built and tested</li><li>One training session, testing and go-live</li></ul></div>
  </div></section>;
}

function Switching() {
  const steps = [
    ["Map before importing", "Map contacts and run a sample import. Rebuild pipelines, fields, users, rules, forms and calendars as needed."],
    ["Validate each object", "Check deals, activities, notes and relationships individually. Email history and attachments may need a retained archive. Exportability does not prove target importability."],
    ["Protect permission to contact", "Preserve consent and unsubscribe records. Prevent sends until those records and sending rules are mapped and checked."],
    ["Keep what still works", "Your existing website, numbers and specialist tools may stay. Agree the connections rather than assuming everything must be replaced."],
  ];
  return <section id="switching" className="compare-band"><div className="compare-inner"><h2>Plan the move before you replace the CRM.</h2><p className="compare-muted mt-5 max-w-[740px]">A useful export is the beginning of a migration plan, not evidence of a complete transfer.<Refs items={[8]} /></p><ol className="compare-rule mt-10 border-t">{steps.map(([title, copy], index) => <li key={title} className="compare-rule grid gap-4 border-b py-6 md:grid-cols-[.85fr_1.15fr] md:gap-16"><h3 className="flex items-baseline gap-4"><span className="compare-label compare-coral">0{index + 1}</span>{title}</h3><p className="compare-muted">{copy}</p></li>)}</ol></div></section>;
}

function Decision() {
  return <section className="compare-band compare-warm"><div className="compare-inner"><p className="compare-label compare-coral mb-4">The decision</p><div className="grid gap-10 md:grid-cols-2 md:gap-16"><div><h3>Choose Pipedrive when the sales setup already fits.</h3><p className="compare-muted mt-5">Its documented mobile apps, Marketplace and tier-dependent reporting are substantive reasons to stay if they support your daily work.<Refs items={[1, 5]} /></p></div><div><h3>Consider Zapla when shared follow-through is the real requirement.</h3><p className="compare-muted mt-5">Make the choice around enquiries, replies and bookings across the team. Budget for launch and usage, not just unlimited users.<Refs items={[10]} /></p></div></div><p className="compare-rule compare-muted mt-9 border-t pt-6">Retain clinical records, loan origination, property management, accounting, dispatch, job costing and other specialist tools as required. This comparison concerns enquiries and customer coordination. It makes no regulatory compliance claim.</p></div></section>;
}

function Faq() {
  return <section className="compare-band"><div className="compare-inner grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-16"><h2>The practical stuff.</h2><div className="compare-rule border-t">{faqs.map(item => <details key={item.q}><summary>{item.q}<ChevronDown size={20} className="shrink-0" /></summary><p className="compare-muted pb-6">{item.a}<Refs items={item.refs} /></p></details>)}</div></div></section>;
}

function Sources() {
  return <section id="sources" className="compare-warm py-14"><div className="compare-inner"><h3>Sources and method</h3><p className="compare-muted mt-4 max-w-[900px]">Prepared by Zapla using vendor documentation and current Zapla plan packaging. This is not an independent product test.</p><p className="compare-muted mt-4 max-w-[900px]">Pipedrive research: 28 Sep 2026. Plan, LeadBooster and billing spot-check: 7 Oct 2026. Zapla pricing implementation read: 7 Oct 2026. These dates do not mean all evidence was updated today.</p><p className="compare-footnote compare-muted mt-4 max-w-[900px]">Capability statements describe documented components. Zapla inclusions describe commercial packaging. The workflows are illustrative configurations, not tested outputs. Buyer-fit recommendations are judgements, not product rankings.</p><ol className="mt-7 grid gap-x-12 gap-y-4 md:grid-cols-2">{sources.map((source, index) => <li key={source.title} id={`source-${index + 1}`} className="compare-footnote flex gap-3"><span className="font-semibold">[{index + 1}]</span><div>{index === 9 ? <Link className="compare-source-link" to="/Pricing-v3">{source.title}</Link> : <a className="compare-source-link" href={source.url}>{source.title}</a>}<p className="compare-muted mt-1">{source.date}</p></div></li>)}</ol></div></section>;
}

function FinalCta() {
  return <section className="compare-final"><div className="compare-inner"><div className="compare-petal-disc"><ZaplaPetal size={34} /></div><h2>Let's map the setup your business actually needs.</h2><p className="compare-muted mx-auto mt-4 max-w-[760px]">Book a call to discuss your enquiries, team and next steps, then agree what belongs in the setup.</p><div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"><BookButton /><Button asChild className="compare-secondary"><Link to="/Pricing-v3">View pricing</Link></Button></div></div></section>;
}

export function PipedriveComparison() {
  return <main className="zapla-comparison" data-page="zapla-vs-pipedrive"><Hero /><BuyerFit /><SetupComparison /><WorkflowComparison /><Costs /><Switching /><Decision /><Faq /><Sources /><FinalCta /></main>;
}