import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";

export const Route = createFileRoute("/reactivation_v3")({
  staticData:{sitemap:false},
  head:()=>({meta:[{title:"Reopen | The Unfinished File | Zapla"},{name:"robots",content:"noindex, nofollow"}]}),
  component:UnfinishedFile,
});

const BOOK_URL="https://zapla.io/booking";
const DISPLAY='"Inter Tight","Outfit","Manrope",system-ui,sans-serif';
const BODY='"Manrope",system-ui,sans-serif';
const PHOTO="/concept/customer-stories-v6/broker.webp";
const EASE=[0.22,1,0.36,1] as const;

const FAQS=[
  ["What is Reopen?","Reopen helps identify dormant enquiries, older quotes and past customers worth revisiting, then restarts the conversation under rules you control."],
  ["How is it different from Follow-Up?","Follow-Up keeps active opportunities moving. Reopen revisits conversations that have already gone quiet."],
  ["Does Reopen contact everyone?","No. The audience is deliberately narrowed before anything sends."],
] as const;

function Reveal({children,className="",delay=0}:{children:ReactNode;className?:string;delay?:number}) {
  const reduced=!!useReducedMotion();
  return <motion.div className={className} initial={reduced?false:{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:reduced?0:.58,delay:reduced?0:delay,ease:EASE}}>{children}</motion.div>;
}
function Eyebrow({children,color="#8A7E73"}:{children:ReactNode;color?:string}) {
  return <div className="text-[9px] font-semibold uppercase tracking-[.24em]" style={{color}}>{children}</div>;
}

function UnfinishedFile() {
  return <main className="bg-[#EDE3D6] text-[#1C1B19]" style={{fontFamily:BODY}}>
    <FileHero/>
    <Evidence/>
    <OpenAgain/>
    <Commercial/>
    <Faq/>
    <FinalCta/>
    <DominoFooter/>
  </main>;
}

function Paper({children,className="",style}:{children:ReactNode;className?:string;style?:React.CSSProperties}) {
  return <div className={"bg-[#FBF8F2] shadow-[0_24px_70px_rgba(73,54,39,.12)] "+className} style={style}>{children}</div>;
}

function FileHero() {
  return <section className="relative overflow-hidden px-5 pb-24 pt-[116px] sm:px-10 lg:px-16 lg:pt-[136px]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_5%,rgba(169,180,122,.18),transparent_24%),radial-gradient(circle_at_10%_88%,rgba(191,116,88,.12),transparent_22%)]"/>
    <div className="relative mx-auto max-w-[1450px]">
      <div className="flex items-center justify-between border-b border-[#CBBEAF] pb-3 text-[8px] font-semibold uppercase tracking-[.18em] text-[#8E8276]">
        <span>Zapla Reopen</span><span>The Unfinished File</span>
      </div>

      <div className="grid gap-14 py-14 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
        <Reveal>
          <Eyebrow color="#BF7458">Lead & customer reactivation</Eyebrow>
          <h1 className="mt-5 text-[58px] font-medium leading-[.89] tracking-[-.066em] sm:text-[76px] lg:text-[94px]" style={{fontFamily:DISPLAY}}>
            Some opportunities
            <span className="block text-[#BF7458]">never got an ending.</span>
          </h1>
          <p className="mt-7 max-w-[590px] text-[17px] leading-[1.72] text-[#675F58]">
            Reopen goes back to the old enquiry, quote and customer history, then gives the right record a reason to start moving again.
          </p>
          <a href="#file" className="mt-8 inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-white">Open the file <ArrowRight size={15}/></a>
        </Reveal>

        <Reveal delay={.08}>
          <div id="file" className="relative mx-auto h-[680px] w-full max-w-[760px]">
            <div className="absolute left-[7%] top-[7%] h-[86%] w-[86%] rotate-[3deg] rounded-[2px] bg-[#B9A68E] shadow-[0_30px_80px_rgba(72,53,38,.17)]"/>
            <div className="absolute left-[4%] top-[10%] h-[83%] w-[90%] -rotate-[2deg] bg-[#D8C4AB] shadow-[0_20px_55px_rgba(72,53,38,.12)]"/>
            <Paper className="absolute left-[12%] top-[2%] h-[92%] w-[78%] rotate-[.6deg] p-8 sm:p-10">
              <div className="flex items-start justify-between border-b border-[#D8D0C7] pb-5">
                <div>
                  <div className="text-[8px] font-bold uppercase tracking-[.16em] text-[#8A7E74]">CUSTOMER FILE</div>
                  <div className="mt-2 text-[26px] font-medium tracking-[-.035em]" style={{fontFamily:DISPLAY}}>Sarah Nguyen</div>
                </div>
                <div className="text-right text-[8px] font-semibold uppercase tracking-[.14em] text-[#A1978E]">ENQUIRY 02481</div>
              </div>

              <div className="mt-7 grid grid-cols-[1fr_150px] gap-6">
                <div>
                  <div className="border-b border-[#E0D8D0] pb-5">
                    <div className="text-[8px] font-bold uppercase tracking-[.14em] text-[#A0968C]">12 FEB</div>
                    <div className="mt-2 text-[15px] font-semibold">Enquiry received</div>
                    <div className="mt-1 text-[11px] text-[#756E67]">Asked about pricing and timing.</div>
                  </div>
                  <div className="border-b border-[#E0D8D0] py-5">
                    <div className="text-[8px] font-bold uppercase tracking-[.14em] text-[#A0968C]">14 FEB</div>
                    <div className="mt-2 text-[15px] font-semibold">Quote sent</div>
                    <div className="mt-1 text-[11px] text-[#756E67]">A$4,800 proposal.</div>
                  </div>
                </div>
                <img src={PHOTO} alt="" className="h-[180px] w-full object-cover grayscale-[.35]"/>
              </div>

              <div className="mt-8 rotate-[-3deg] border-[3px] border-[#BF7458] px-4 py-3 text-center text-[18px] font-bold uppercase tracking-[.12em] text-[#BF7458]">
                NO ACTIVITY · 167 DAYS
              </div>

              <div className="mt-8 border-t border-[#D8D0C7] pt-5">
                <div className="text-[8px] font-bold uppercase tracking-[.14em] text-[#A0968C]">STATUS</div>
                <div className="mt-2 text-[15px] font-semibold">No decision recorded.</div>
              </div>

              <div className="absolute bottom-[-28px] right-[18px] rotate-[4deg] bg-[#BF7458] px-5 py-3 text-[9px] font-bold uppercase tracking-[.14em] text-white shadow-lg">QUIET</div>
            </Paper>
          </div>
        </Reveal>
      </div>
    </div>
  </section>;
}

function Evidence() {
  return <section className="bg-[#F6F0E8] px-5 py-24 sm:px-10 lg:px-16">
    <div className="mx-auto max-w-[1300px]">
      <Reveal className="max-w-[900px]">
        <Eyebrow color="#7E687F">Inside the file</Eyebrow>
        <h2 className="mt-5 text-[48px] font-medium leading-[.93] tracking-[-.06em] sm:text-[64px] lg:text-[76px]" style={{fontFamily:DISPLAY}}>
          The context is already there.
          <span className="block text-[#7E687F]">The conversation just stopped.</span>
        </h2>
      </Reveal>

      <div className="relative mt-16 min-h-[720px]">
        <Paper className="absolute left-[2%] top-[7%] w-[43%] rotate-[-2deg] p-7">
          <div className="text-[8px] font-bold uppercase tracking-[.15em] text-[#9A8F84]">QUOTE · 14 FEB</div>
          <div className="mt-6 text-[42px] font-medium tracking-[-.05em]" style={{fontFamily:DISPLAY}}>A$4,800</div>
          <div className="mt-5 space-y-3 border-t border-[#DDD5CC] pt-5 text-[11px] text-[#726A63]">
            <div className="flex justify-between"><span>Scope</span><span>Included</span></div>
            <div className="flex justify-between"><span>Valid for</span><span>30 days</span></div>
            <div className="flex justify-between"><span>Status</span><span>No decision</span></div>
          </div>
        </Paper>

        <Paper className="absolute right-[5%] top-[2%] w-[39%] rotate-[2deg] p-7">
          <div className="text-[8px] font-bold uppercase tracking-[.15em] text-[#9A8F84]">LAST MESSAGE · 28 FEB</div>
          <div className="mt-6 text-[26px] font-medium leading-[1.15] tracking-[-.03em]" style={{fontFamily:DISPLAY}}>“Thanks. I'll take a look.”</div>
          <div className="mt-6 text-[10px] text-[#8A8178]">No reply after this.</div>
        </Paper>

        <Paper className="absolute bottom-[4%] left-[25%] z-10 w-[50%] rotate-[.4deg] p-8">
          <div className="flex justify-between gap-5 border-b border-[#DDD5CC] pb-4">
            <div className="text-[8px] font-bold uppercase tracking-[.15em] text-[#9A8F84]">08 AUG · REOPEN NOTE</div>
            <div className="text-[8px] font-bold uppercase tracking-[.15em] text-[#BF7458]">NEW ACTIVITY</div>
          </div>
          <div className="mt-6 text-[30px] font-medium leading-[1.12] tracking-[-.035em]" style={{fontFamily:DISPLAY}}>Want us to update that quote?</div>
          <div className="mt-7 border-l-2 border-[#A9B47A] bg-[#E6E9D6] p-5">
            <div className="text-[8px] font-bold uppercase tracking-[.14em] text-[#6A714E]">REPLY</div>
            <div className="mt-2 text-[23px] font-medium tracking-[-.03em]" style={{fontFamily:DISPLAY}}>Yes. Send me the latest pricing.</div>
          </div>
        </Paper>
      </div>
    </div>
  </section>;
}

function OpenAgain() {
  return <section className="bg-[#17201D] px-5 py-24 text-white sm:px-10 lg:px-16">
    <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
      <Reveal>
        <Eyebrow color="#DDA34B">Reopened</Eyebrow>
        <h2 className="mt-5 text-[48px] font-medium leading-[.92] tracking-[-.06em] sm:text-[64px] lg:text-[76px]" style={{fontFamily:DISPLAY}}>
          Same customer.
          <span className="block text-[#C7D19B]">Same file. New movement.</span>
        </h2>
        <p className="mt-6 max-w-[520px] text-[16px] leading-[1.75] text-white/50">
          Reopen does not manufacture a new lead. It resumes an old story with the previous context still attached.
        </p>
      </Reveal>

      <Reveal delay={.05}>
        <div className="relative mx-auto h-[520px] w-full max-w-[700px]">
          <div className="absolute inset-[5%] rotate-[-2deg] bg-[#C9B39A]"/>
          <Paper className="absolute inset-[7%] rotate-[1deg] p-8 text-[#171816]">
            <div className="flex items-center justify-between border-b border-[#D9D0C6] pb-4">
              <div className="text-[8px] font-bold uppercase tracking-[.15em] text-[#9A8E84]">SARAH NGUYEN · 02481</div>
              <div className="bg-[#A9B47A] px-4 py-2 text-[8px] font-bold uppercase tracking-[.14em] text-[#28301E]">REOPENED</div>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-3">
              {["OUTREACH STOPPED","HISTORY PRESERVED","SALES NOTIFIED"].map(x=><div key={x} className="border-t border-[#D9D0C6] pt-4">
                <Check size={14} className="text-[#70804B]"/>
                <div className="mt-3 text-[9px] font-bold uppercase tracking-[.12em] text-[#6E675F]">{x}</div>
              </div>)}
            </div>
            <div className="mt-9 text-[38px] font-medium leading-[1] tracking-[-.045em]" style={{fontFamily:DISPLAY}}>The file is moving again.</div>
          </Paper>
        </div>
      </Reveal>
    </div>
  </section>;
}

function Commercial() {
  return <section className="bg-[#F6F0E8] px-5 py-24 sm:px-10 lg:px-16">
    <div className="mx-auto max-w-[1180px]">
      <Reveal>
        <Eyebrow>Two ways to use Reopen</Eyebrow>
        <h2 className="mt-5 text-[46px] font-medium tracking-[-.05em] sm:text-[60px]" style={{fontFamily:DISPLAY}}>Run it yourself. Or hand us the file.</h2>
      </Reveal>
      <div className="mt-12 grid border-y border-[#D8CEC4] lg:grid-cols-2">
        <div className="py-9 lg:border-r lg:border-[#D8CEC4] lg:pr-10">
          <div className="text-[9px] font-bold uppercase tracking-[.14em] text-[#667044]">GROWTH</div>
          <div className="mt-4 text-[34px] font-medium" style={{fontFamily:DISPLAY}}>A$699 /mo + GST</div>
        </div>
        <div className="py-9 lg:pl-10">
          <div className="text-[9px] font-bold uppercase tracking-[.14em] text-[#BF7458]">GHOST TO GOLD</div>
          <div className="mt-4 text-[34px] font-medium" style={{fontFamily:DISPLAY}}>From A$997 + GST</div>
        </div>
      </div>
    </div>
  </section>;
}

function Faq() {
  return <section className="bg-[#E7E0EA] px-5 py-20 sm:px-10 lg:px-16">
    <div className="mx-auto max-w-[960px]">
      <Eyebrow color="#7E687F">FAQ</Eyebrow>
      <h2 className="mt-5 text-[42px] font-medium tracking-[-.05em] sm:text-[54px]" style={{fontFamily:DISPLAY}}>Before you reopen anything.</h2>
      <div className="mt-10 divide-y divide-[#7E687F]/18 border-y border-[#7E687F]/18">
        {FAQS.map(([q,a])=><FaqItem key={q} q={q} a={a}/>)}
      </div>
    </div>
  </section>;
}
function FaqItem({q,a}:{q:string;a:string}) {
  const [open,setOpen]=useState(false);
  return <div><button onClick={()=>setOpen(v=>!v)} className="flex w-full items-center justify-between py-5 text-left"><span className="text-[14px] font-semibold">{q}</span><ChevronDown size={16} className={open?"rotate-180":""}/></button>{open&&<div className="pb-5 pr-10 text-[13px] leading-[1.75] text-[#6B636D]">{a}</div>}</div>;
}
function FinalCta() {
  return <section className="bg-[#17201D] px-5 py-24 text-white sm:px-10 lg:px-16">
    <div className="mx-auto max-w-[1100px]">
      <Eyebrow color="#DDA34B">Before you buy another lead</Eyebrow>
      <h2 className="mt-5 text-[48px] font-medium leading-[.92] tracking-[-.06em] sm:text-[68px] lg:text-[82px]" style={{fontFamily:DISPLAY}}>Check the file you already have.</h2>
      <a href={BOOK_URL} className="mt-8 inline-flex h-[52px] items-center gap-2 rounded-full bg-white px-7 text-[13px] font-semibold text-[#17201D]">Book a Call <ArrowRight size={15}/></a>
    </div>
  </section>;
}
