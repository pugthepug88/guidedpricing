import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";

export const Route = createFileRoute("/reactivation_v2")({
  staticData: { sitemap: false },
  head: () => ({ meta: [
    { title: "Reopen | The Lost Thread | Zapla" },
    { name: "robots", content: "noindex, nofollow" },
  ]}),
  component: LostThread,
});

const BOOK_URL="https://zapla.io/booking";
const DISPLAY='"Inter Tight","Outfit","Manrope",system-ui,sans-serif';
const BODY='"Manrope",system-ui,sans-serif';
const EASE=[0.22,1,0.36,1] as const;

const FAQS=[
  ["What is Reopen?","Reopen is Zapla's lead and customer reactivation solution for dormant enquiries, older quotes and past customers."],
  ["How is it different from Follow-Up?","Follow-Up keeps active opportunities moving. Reopen goes back to conversations that have already gone quiet."],
  ["Does it message everyone?","No. Active opportunities, recent contacts, unsubscribed contacts and other ineligible records can be excluded before anything sends."],
] as const;

function Reveal({children,className="",delay=0}:{children:ReactNode;className?:string;delay?:number}) {
  const reduced=!!useReducedMotion();
  return <motion.div className={className} initial={reduced?false:{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:reduced?0:.58,delay:reduced?0:delay,ease:EASE}}>{children}</motion.div>;
}

function Eyebrow({children,color="#8A7F75"}:{children:ReactNode;color?:string}) {
  return <div className="text-[9px] font-semibold uppercase tracking-[.24em]" style={{color}}>{children}</div>;
}

function Thread({className="",muted=false}:{className?:string;muted?:boolean}) {
  return <svg className={className} viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
    <path d="M42 70 C180 72 210 182 332 182 C455 182 430 316 547 316 C686 316 638 475 755 475 C855 475 820 610 940 610"
      fill="none" stroke={muted?"#D7C9BC":"#BF7458"} strokeWidth="8" strokeLinecap="round"/>
  </svg>;
}

function LostThread() {
  return <main className="bg-[#F4EBDD] text-[#171816]" style={{fontFamily:BODY}}>
    <Hero/>
    <Break/>
    <Selection/>
    <Reconnect/>
    <Commercial/>
    <Faq/>
    <FinalCta/>
    <DominoFooter/>
  </main>;
}

function Hero() {
  return <section className="relative overflow-hidden px-5 pb-16 pt-[116px] sm:px-10 lg:px-16 lg:pt-[136px]">
    <div className="pointer-events-none absolute right-[-8%] top-[-12%] h-[520px] w-[520px] rounded-full bg-[#DCE0CC]/55 blur-3xl"/>
    <div className="mx-auto max-w-[1450px]">
      <div className="flex items-center justify-between border-b border-[#D4C6B8] pb-3 text-[8px] font-semibold uppercase tracking-[.18em] text-[#91857A]">
        <span>Zapla Reopen</span><span>The Lost Thread</span>
      </div>

      <Reveal className="max-w-[1040px] pt-14">
        <Eyebrow color="#BF7458">Lead & customer reactivation</Eyebrow>
        <h1 className="mt-5 text-[58px] font-medium leading-[.88] tracking-[-.068em] sm:text-[78px] lg:text-[104px]" style={{fontFamily:DISPLAY}}>
          They went quiet.
          <span className="block text-[#BF7458]">That doesn't mean they're gone.</span>
        </h1>
        <p className="mt-7 max-w-[720px] text-[17px] leading-[1.72] text-[#665F58]">
          Reopen finds old enquiries, stale quotes and past customers worth revisiting, then brings the right conversations back to life.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-white">Book a Call <ArrowRight size={15}/></a>
          <a href="#thread-break" className="inline-flex h-[50px] items-center rounded-full border border-[#CBBBAE] bg-white/42 px-6 text-[13px] font-semibold">Follow the thread</a>
        </div>
      </Reveal>

      <div className="relative mt-16 h-[430px] sm:h-[500px] lg:h-[560px]">
        <Thread className="absolute inset-0 h-full w-full"/>
        <div className="absolute left-[4%] top-[4%]">
          <div className="text-[8px] font-bold uppercase tracking-[.14em] text-[#9B6B59]">12 FEB</div>
          <div className="mt-2 text-[18px] font-semibold">Enquiry received</div>
        </div>
        <div className="absolute left-[27%] top-[15%]">
          <div className="text-[8px] font-bold uppercase tracking-[.14em] text-[#9B6B59]">14 FEB</div>
          <div className="mt-2 text-[18px] font-semibold">Quote sent · A$4,800</div>
        </div>

        <div className="absolute left-[50.8%] top-[26%] h-20 w-20 -translate-x-1/2 rounded-full bg-[#F4EBDD]"/>
        <div className="absolute left-[47%] top-[29%] w-[88px] -rotate-[16deg] border-t-[8px] border-[#BF7458]"/>
        <div className="absolute left-[52%] top-[31%] w-[92px] rotate-[18deg] border-t-[8px] border-[#BF7458]"/>

        <div className="absolute left-[47%] top-[40%]">
          <div className="text-[8px] font-bold uppercase tracking-[.14em] text-[#958980]">28 FEB</div>
          <div className="mt-2 text-[18px] font-semibold text-[#49433E]">Conversation breaks</div>
        </div>

        <div className="absolute right-[2%] top-[52%] text-right">
          <div className="text-[62px] font-medium leading-none tracking-[-.065em] text-[#D4C9BF] sm:text-[88px] lg:text-[118px]" style={{fontFamily:DISPLAY}}>167 DAYS</div>
          <div className="mt-2 text-[9px] font-semibold uppercase tracking-[.16em] text-[#9A8E84]">quiet</div>
        </div>
      </div>
    </div>
  </section>;
}

function Break() {
  return <section id="thread-break" className="relative overflow-hidden bg-[#17201D] px-5 py-24 text-white sm:px-10 lg:px-16 lg:py-28">
    <div className="mx-auto max-w-[1360px]">
      <Reveal className="max-w-[980px]">
        <Eyebrow color="#DDA34B">Where the thread goes cold</Eyebrow>
        <h2 className="mt-5 text-[48px] font-medium leading-[.92] tracking-[-.062em] sm:text-[68px] lg:text-[82px]" style={{fontFamily:DISPLAY}}>
          The opportunity didn't disappear.
          <span className="block text-[#C7D19B]">The next step did.</span>
        </h2>
      </Reveal>

      <div className="relative mt-16 grid gap-5 lg:grid-cols-3">
        {[
          ["OLD ENQUIRY","They asked. Then life happened.","7 months quiet","#D58C75"],
          ["STALE QUOTE","They never actually said no.","5 months quiet","#DDA34B"],
          ["PAST CUSTOMER","They already know your name.","11 months quiet","#A9B47A"],
        ].map(([k,t,m,c],i)=><Reveal key={k} delay={i*.05}>
          <article className="relative min-h-[360px] border border-white/10 p-7">
            <div className="absolute left-0 top-[78px] h-[7px] w-[52%]" style={{backgroundColor:c}}/>
            <div className="absolute right-0 top-[78px] h-[7px] w-[28%]" style={{backgroundColor:c}}/>
            <div className="absolute left-[55%] top-[66px] h-8 w-8 rounded-full bg-[#17201D]"/>
            <div className="text-[8px] font-bold uppercase tracking-[.15em]" style={{color:c}}>{k}</div>
            <div className="mt-24 text-[34px] font-medium leading-[1] tracking-[-.045em]" style={{fontFamily:DISPLAY}}>{t}</div>
            <div className="mt-6 text-[10px] text-white/42">{m}</div>
          </article>
        </Reveal>)}
      </div>
    </div>
  </section>;
}

function Selection() {
  return <section className="relative overflow-hidden bg-[#E7E0EA] px-5 py-24 sm:px-10 lg:px-16 lg:py-28">
    <div className="mx-auto max-w-[1360px]">
      <Reveal className="max-w-[920px]">
        <Eyebrow color="#7E687F">Selection before sending</Eyebrow>
        <h2 className="mt-5 text-[48px] font-medium leading-[.92] tracking-[-.062em] sm:text-[66px] lg:text-[78px]" style={{fontFamily:DISPLAY}}>
          Three threads.
          <span className="block text-[#7E687F]">Only one should continue.</span>
        </h2>
      </Reveal>

      <div className="relative mt-16 min-h-[560px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 560" preserveAspectRatio="none" aria-hidden="true">
          <path d="M70 280 C220 280 230 110 390 110" fill="none" stroke="#B9AEBB" strokeWidth="7" strokeLinecap="round"/>
          <path d="M70 280 C220 280 230 280 390 280" fill="none" stroke="#B9AEBB" strokeWidth="7" strokeLinecap="round"/>
          <path d="M70 280 C220 280 230 450 390 450 C600 450 700 450 1120 450" fill="none" stroke="#BF7458" strokeWidth="8" strokeLinecap="round"/>
        </svg>

        <div className="absolute left-[32%] top-[11%] w-[43%] border-t border-[#7E687F]/18 pt-4">
          <div className="text-[9px] font-bold uppercase tracking-[.14em] text-[#837986]">ACTIVE QUOTE</div>
          <div className="mt-2 text-[28px] font-medium tracking-[-.035em]" style={{fontFamily:DISPLAY}}>Leave it alone.</div>
        </div>
        <div className="absolute left-[32%] top-[41%] w-[43%] border-t border-[#7E687F]/18 pt-4">
          <div className="text-[9px] font-bold uppercase tracking-[.14em] text-[#837986]">CONTACTED YESTERDAY</div>
          <div className="mt-2 text-[28px] font-medium tracking-[-.035em]" style={{fontFamily:DISPLAY}}>Leave it alone.</div>
        </div>
        <div className="absolute left-[32%] top-[72%] w-[57%] border-t border-[#BF7458]/35 pt-4">
          <div className="text-[9px] font-bold uppercase tracking-[.14em] text-[#A96653]">5 MONTHS QUIET · NO CLEAR NO</div>
          <div className="mt-2 flex items-center justify-between gap-4">
            <div className="text-[34px] font-medium tracking-[-.04em] text-[#5F4B61]" style={{fontFamily:DISPLAY}}>Worth reopening.</div>
            <div className="bg-[#BF7458] px-4 py-2 text-[9px] font-bold uppercase tracking-[.14em] text-white">REOPEN</div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}

function Reconnect() {
  return <section className="relative overflow-hidden bg-[#F7F4EE] px-5 py-24 sm:px-10 lg:px-16 lg:py-28">
    <div className="mx-auto max-w-[1360px]">
      <Reveal className="max-w-[980px]">
        <Eyebrow color="#BF7458">The thread reconnects</Eyebrow>
        <h2 className="mt-5 text-[48px] font-medium leading-[.92] tracking-[-.062em] sm:text-[68px] lg:text-[82px]" style={{fontFamily:DISPLAY}}>
          One message can turn
          <span className="block text-[#BF7458]">silence back into movement.</span>
        </h2>
      </Reveal>

      <div className="relative mt-16 min-h-[470px]">
        <div className="absolute left-[3%] top-[45%] h-[8px] w-[36%] bg-[#BF7458]"/>
        <div className="absolute right-[3%] top-[45%] h-[8px] w-[33%] bg-[#A9B47A]"/>
        <div className="absolute left-[38%] top-[38%] h-[72px] w-[72px] rounded-full border-[8px] border-[#BF7458] border-r-transparent"/>
        <div className="absolute right-[32%] top-[38%] h-[72px] w-[72px] rounded-full border-[8px] border-[#A9B47A] border-l-transparent"/>

        <div className="absolute left-[4%] top-[12%] max-w-[360px] border-l-2 border-[#BF7458] bg-[#F2E2D8] p-5">
          <div className="text-[8px] font-bold uppercase tracking-[.14em] text-[#A76B58]">08 AUG · REOPEN</div>
          <div className="mt-3 text-[24px] font-medium leading-[1.18] tracking-[-.03em]" style={{fontFamily:DISPLAY}}>Want us to update that quote?</div>
        </div>

        <div className="absolute right-[4%] bottom-[10%] max-w-[420px] bg-[#1E2B29] p-6 text-white">
          <div className="text-[8px] font-bold uppercase tracking-[.14em] text-[#C7D19B]">REPLY RECEIVED</div>
          <div className="mt-3 text-[27px] font-medium leading-[1.16] tracking-[-.035em]" style={{fontFamily:DISPLAY}}>Yes. Send me the latest pricing.</div>
        </div>

        <div className="absolute left-1/2 top-[43%] -translate-x-1/2 bg-[#F7F4EE] px-4 py-2 text-[9px] font-bold uppercase tracking-[.14em] text-[#6B6F57]">REOPENED</div>
      </div>
    </div>
  </section>;
}

function Commercial() {
  return <section className="grid lg:grid-cols-2">
    <div className="bg-[#DCE0CC] px-5 py-20 sm:px-10 lg:px-16">
      <Eyebrow color="#667044">Reopen inside Growth</Eyebrow>
      <h3 className="mt-5 max-w-[540px] text-[44px] font-medium leading-[.95] tracking-[-.055em]" style={{fontFamily:DISPLAY}}>Keep the thread in your hands.</h3>
      <p className="mt-6 max-w-[500px] text-[15px] leading-[1.75] text-[#59604D]">Run targeted reactivation whenever the business needs it.</p>
      <div className="mt-9 text-[36px] font-semibold">A$699 <span className="text-[12px] font-medium text-[#6D7462]">/mo + GST</span></div>
    </div>
    <div className="bg-[#BF7458] px-5 py-20 text-white sm:px-10 lg:px-16">
      <Eyebrow color="#F5D0BE">Ghost to Gold</Eyebrow>
      <h3 className="mt-5 max-w-[540px] text-[44px] font-medium leading-[.95] tracking-[-.055em]" style={{fontFamily:DISPLAY}}>Or let us reconnect it for you.</h3>
      <p className="mt-6 max-w-[500px] text-[15px] leading-[1.75] text-white/72">Done-for-you campaign build, launch and optional managed handoff.</p>
      <div className="mt-9 text-[26px] font-semibold">From A$997 + GST</div>
    </div>
  </section>;
}

function Faq() {
  return <section className="bg-[#F4EBDD] px-5 py-20 sm:px-10 lg:px-16">
    <div className="mx-auto max-w-[960px]">
      <Eyebrow>FAQ</Eyebrow>
      <h2 className="mt-5 text-[42px] font-medium tracking-[-.05em] sm:text-[54px]" style={{fontFamily:DISPLAY}}>Before you reopen anything.</h2>
      <div className="mt-10 divide-y divide-[#D7C9BC] border-y border-[#D7C9BC]">
        {FAQS.map(([q,a])=><FaqItem key={q} q={q} a={a}/>)}
      </div>
    </div>
  </section>;
}

function FaqItem({q,a}:{q:string;a:string}) {
  const [open,setOpen]=useState(false);
  return <div>
    <button onClick={()=>setOpen(v=>!v)} className="flex w-full items-center justify-between gap-5 py-5 text-left">
      <span className="text-[14px] font-semibold">{q}</span><ChevronDown size={16} className={open?"rotate-180":""}/>
    </button>
    {open&&<div className="pb-5 pr-10 text-[13px] leading-[1.75] text-[#6D655E]">{a}</div>}
  </div>;
}

function FinalCta() {
  return <section className="bg-[#17201D] px-5 py-24 text-white sm:px-10 lg:px-16">
    <div className="mx-auto max-w-[1120px]">
      <Eyebrow color="#DDA34B">Before you buy another lead</Eyebrow>
      <h2 className="mt-5 max-w-[1040px] text-[48px] font-medium leading-[.92] tracking-[-.06em] sm:text-[68px] lg:text-[82px]" style={{fontFamily:DISPLAY}}>
        Look at the conversations
        <span className="block text-[#C7D19B]">you already paid to start.</span>
      </h2>
      <a href={BOOK_URL} className="mt-9 inline-flex h-[52px] items-center gap-2 rounded-full bg-white px-7 text-[13px] font-semibold text-[#17201D]">Book a Call <ArrowRight size={15}/></a>
    </div>
  </section>;
}
