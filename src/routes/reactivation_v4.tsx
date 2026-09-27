import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";

export const Route=createFileRoute("/reactivation_v4")({
  staticData:{sitemap:false},
  head:()=>({meta:[{title:"Reopen | The Echo | Zapla"},{name:"robots",content:"noindex, nofollow"}]}),
  component:TheEcho,
});

const BOOK_URL="https://zapla.io/booking";
const DISPLAY='"Inter Tight","Outfit","Manrope",system-ui,sans-serif';
const BODY='"Manrope",system-ui,sans-serif';
const EASE=[0.22,1,0.36,1] as const;

const FAQS=[
  ["What is Reopen?","Reopen helps service businesses restart dormant enquiries, stale quotes and past-customer conversations."],
  ["Does it message everyone?","No. Reopen is designed around controlled audience selection and exclusions."],
  ["What happens when someone replies?","Outreach can stop and the reply can route back to your team with the original history attached."],
] as const;

function Reveal({children,className="",delay=0}:{children:ReactNode;className?:string;delay?:number}) {
  const reduced=!!useReducedMotion();
  return <motion.div className={className} initial={reduced?false:{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:reduced?0:.58,delay:reduced?0:delay,ease:EASE}}>{children}</motion.div>;
}
function Eyebrow({children,color="#8C8177"}:{children:ReactNode;color?:string}) {
  return <div className="text-[9px] font-semibold uppercase tracking-[.24em]" style={{color}}>{children}</div>;
}

function TheEcho() {
  return <main className="bg-[#151614] text-white" style={{fontFamily:BODY}}>
    <EchoHero/>
    <FadingConversation/>
    <Silence/>
    <NewLine/>
    <Selection/>
    <Commercial/>
    <Faq/>
    <FinalCta/>
    <DominoFooter/>
  </main>;
}

function EchoHero() {
  return <section className="relative min-h-[88svh] overflow-hidden px-5 pb-20 pt-[116px] sm:px-10 lg:px-16 lg:pt-[136px]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(191,116,88,.09),transparent_27%),radial-gradient(circle_at_10%_90%,rgba(169,180,122,.07),transparent_24%)]"/>
    <div className="relative mx-auto max-w-[1450px]">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[8px] font-semibold uppercase tracking-[.18em] text-white/32">
        <span>Zapla Reopen</span><span>The Echo</span>
      </div>

      <Reveal className="pt-[12vh]">
        <Eyebrow color="#D88B6F">Lead & customer reactivation</Eyebrow>
        <h1 className="mt-6 max-w-[1260px] text-[60px] font-medium leading-[.86] tracking-[-.07em] sm:text-[86px] lg:text-[118px]" style={{fontFamily:DISPLAY}}>
          The conversation
          <span className="block text-white/28">didn't end.</span>
          <span className="block text-[#D88B6F]">It faded.</span>
        </h1>
      </Reveal>
    </div>
  </section>;
}

function FadingConversation() {
  const lines=[
    {text:"How much would this cost?",size:"text-[34px] sm:text-[46px] lg:text-[58px]",opacity:"text-white/92",indent:"ml-0"},
    {text:"Can you send me a quote?",size:"text-[30px] sm:text-[42px] lg:text-[52px]",opacity:"text-white/68",indent:"ml-[10%]"},
    {text:"Thanks. I'll take a look.",size:"text-[27px] sm:text-[38px] lg:text-[46px]",opacity:"text-white/45",indent:"ml-[21%]"},
    {text:"…",size:"text-[24px] sm:text-[34px] lg:text-[40px]",opacity:"text-white/20",indent:"ml-[34%]"},
  ];
  return <section className="px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
    <div className="mx-auto max-w-[1320px]">
      <Eyebrow color="#D88B6F">FEBRUARY</Eyebrow>
      <div className="mt-12 space-y-16">
        {lines.map((x,i)=><Reveal key={x.text} delay={i*.05} className={x.indent}>
          <div className={x.size+" "+x.opacity+" font-medium tracking-[-.045em]"} style={{fontFamily:DISPLAY}}>{x.text}</div>
          <div className="mt-4 h-px w-[68%] bg-white/8"/>
        </Reveal>)}
      </div>
    </div>
  </section>;
}

function Silence() {
  return <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden border-y border-white/8">
    <div className="absolute inset-0 bg-[#121311]"/>
    <Reveal className="relative text-center">
      <div className="text-[10px] font-semibold uppercase tracking-[.22em] text-white/22">MAR · APR · MAY · JUN · JUL</div>
      <div className="mt-8 text-[82px] font-medium leading-none tracking-[-.075em] text-white/[.08] sm:text-[140px] lg:text-[220px]" style={{fontFamily:DISPLAY}}>167 DAYS</div>
      <div className="mt-2 text-[12px] uppercase tracking-[.18em] text-white/24">no reply</div>
    </Reveal>
  </section>;
}

function NewLine() {
  return <section className="relative overflow-hidden bg-[#F4EBDD] px-5 py-24 text-[#171816] sm:px-10 lg:px-16 lg:py-32">
    <div className="mx-auto max-w-[1320px]">
      <Reveal>
        <Eyebrow color="#BF7458">08 AUG · REOPEN</Eyebrow>
        <div className="mt-10 flex items-start gap-4">
          <span className="mt-4 block h-8 w-[3px] animate-pulse bg-[#BF7458]"/>
          <div className="text-[48px] font-medium leading-[.98] tracking-[-.055em] sm:text-[68px] lg:text-[86px]" style={{fontFamily:DISPLAY}}>
            Want us to update that quote?
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-20 lg:ml-[20%]" delay={.12}>
        <Eyebrow color="#667044">REPLY RECEIVED</Eyebrow>
        <div className="mt-6 text-[42px] font-medium leading-[1] tracking-[-.05em] text-[#667044] sm:text-[60px] lg:text-[76px]" style={{fontFamily:DISPLAY}}>
          Yes. Send me the latest pricing.
        </div>
        <div className="mt-8 flex flex-wrap gap-5 text-[9px] font-semibold uppercase tracking-[.13em] text-[#706B64]">
          {["Outreach stopped","History preserved","Sales notified"].map(x=><span key={x} className="inline-flex items-center gap-2"><Check size={11} className="text-[#70804B]"/>{x}</span>)}
        </div>
      </Reveal>
    </div>
  </section>;
}

function Selection() {
  const rows=[
    ["ACTIVE QUOTE","Still moving.","LEAVE IT ALONE",false],
    ["CONTACTED YESTERDAY","Too soon.","LEAVE IT ALONE",false],
    ["UNSUBSCRIBED","Not eligible.","LEAVE IT ALONE",false],
    ["5 MONTHS QUIET · NO CLEAR NO","Still unresolved.","REOPEN",true],
  ] as const;
  return <section className="bg-[#E7E0EA] px-5 py-24 text-[#171816] sm:px-10 lg:px-16 lg:py-28">
    <div className="mx-auto max-w-[1320px]">
      <Reveal className="max-w-[900px]">
        <Eyebrow color="#7E687F">Not every echo needs an answer</Eyebrow>
        <h2 className="mt-5 text-[48px] font-medium leading-[.92] tracking-[-.06em] sm:text-[66px] lg:text-[78px]" style={{fontFamily:DISPLAY}}>
          Reopen chooses
          <span className="block text-[#7E687F]">where to speak again.</span>
        </h2>
      </Reveal>

      <div className="mt-14 border-t border-[#7E687F]/16">
        {rows.map(([a,b,c,active],i)=><Reveal key={a} delay={i*.04}>
          <div className={"grid gap-4 border-b border-[#7E687F]/16 py-6 sm:grid-cols-[1.2fr_.8fr_auto] sm:items-center "+(active?"":"opacity-35")}>
            <div className={"text-[30px] font-medium tracking-[-.04em] sm:text-[40px] "+(active?"text-[#BF7458]":"")} style={{fontFamily:DISPLAY}}>{a}</div>
            <div className="text-[12px] text-[#756D77]">{b}</div>
            <div className={"text-[9px] font-bold uppercase tracking-[.14em] "+(active?"text-[#BF7458]":"text-[#7E687F]")}>{c}</div>
          </div>
        </Reveal>)}
      </div>
    </div>
  </section>;
}

function Commercial() {
  return <section className="bg-[#F7F4EE] px-5 py-24 text-[#171816] sm:px-10 lg:px-16">
    <div className="mx-auto max-w-[1180px]">
      <Eyebrow>Two ways to use Reopen</Eyebrow>
      <div className="mt-10 grid border-y border-[#D9D0C6] lg:grid-cols-2">
        <div className="py-9 lg:border-r lg:border-[#D9D0C6] lg:pr-10">
          <div className="text-[9px] font-bold uppercase tracking-[.14em] text-[#667044]">GROWTH</div>
          <div className="mt-4 text-[38px] font-medium tracking-[-.045em]" style={{fontFamily:DISPLAY}}>A$699 /mo + GST</div>
        </div>
        <div className="py-9 lg:pl-10">
          <div className="text-[9px] font-bold uppercase tracking-[.14em] text-[#BF7458]">GHOST TO GOLD</div>
          <div className="mt-4 text-[38px] font-medium tracking-[-.045em]" style={{fontFamily:DISPLAY}}>From A$997 + GST</div>
        </div>
      </div>
    </div>
  </section>;
}

function Faq() {
  return <section className="bg-[#F4EBDD] px-5 py-20 text-[#171816] sm:px-10 lg:px-16">
    <div className="mx-auto max-w-[960px]">
      <Eyebrow>FAQ</Eyebrow>
      <h2 className="mt-5 text-[42px] font-medium tracking-[-.05em] sm:text-[54px]" style={{fontFamily:DISPLAY}}>Before you reopen anything.</h2>
      <div className="mt-10 divide-y divide-[#D8CCC0] border-y border-[#D8CCC0]">{FAQS.map(([q,a])=><FaqItem key={q} q={q} a={a}/>)}</div>
    </div>
  </section>;
}
function FaqItem({q,a}:{q:string;a:string}) {
  const [open,setOpen]=useState(false);
  return <div><button onClick={()=>setOpen(v=>!v)} className="flex w-full items-center justify-between py-5 text-left"><span className="text-[14px] font-semibold">{q}</span><ChevronDown size={16} className={open?"rotate-180":""}/></button>{open&&<div className="pb-5 pr-10 text-[13px] leading-[1.75] text-[#6B645D]">{a}</div>}</div>;
}

function FinalCta() {
  return <section className="bg-[#151614] px-5 py-24 sm:px-10 lg:px-16">
    <div className="mx-auto max-w-[1120px]">
      <Eyebrow color="#DDA34B">One more line can change the story</Eyebrow>
      <h2 className="mt-5 text-[48px] font-medium leading-[.92] tracking-[-.06em] sm:text-[68px] lg:text-[82px]" style={{fontFamily:DISPLAY}}>
        Reopen the conversations
        <span className="block text-[#C7D19B]">that still have an answer.</span>
      </h2>
      <a href={BOOK_URL} className="mt-9 inline-flex h-[52px] items-center gap-2 rounded-full bg-white px-7 text-[13px] font-semibold text-[#171816]">Book a Call <ArrowRight size={15}/></a>
    </div>
  </section>;
}
