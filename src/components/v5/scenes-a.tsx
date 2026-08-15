import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  FileText,
  Instagram,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import { FACE } from "./faces";
import {
  Avatar,
  EASE_OUT,
  GhostRow,
  Glow,
  Hero,
  Payoff,
  Scene,
  Signal,
  Tag,
  type SceneProps,
} from "./motion-kit";

export type { SceneProps };

/* ================================================================= */
/* 1 — CONTACTS : dormant customers wake up                           */
/* ================================================================= */

const CONTACTS = [
  { name: "Maya Chen", face: FACE.maya, tag: "VIP", last: "7 months ago", match: true },
  { name: "Daniel Ross", face: FACE.daniel, tag: "VIP", last: "8 months ago", match: true },
  { name: "Priya Nair", face: FACE.priya, tag: "VIP", last: "6 months ago", match: true },
  { name: "Tom Whyte", face: FACE.tom, tag: "VIP", last: "9 months ago", match: true },
  { name: "Sophie Bell", face: FACE.sophie, tag: "Lead", last: "3 days ago" },
  { name: "Leo Marsh", face: FACE.leo, tag: "Client", last: "yesterday" },
  { name: "Ava Dunn", face: FACE.jordan, tag: "Lead", last: "1 week ago" },
  { name: "Noah Reid", face: FACE.sam, tag: "Client", last: "2 weeks ago" },
  { name: "Iris Kaye", face: FACE.nina, tag: "Client", last: "4 days ago" },
  { name: "Ben Foley", face: FACE.alex, tag: "Lead", last: "5 days ago" },
];

function ContactsBackground() {
  return (
    <div className="absolute inset-0 px-4 pt-3">
      <div className="mb-2 flex items-center gap-2">
        <GhostRow w="88px" h={9} />
        <div className="ml-auto flex gap-1.5">
          <GhostRow w="52px" h={16} className="rounded-md" />
          <GhostRow w="42px" h={16} className="rounded-md" />
        </div>
      </div>
      <div className="divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-white">
        {CONTACTS.map((c) => (
          <div key={c.name} className="flex items-center gap-3 px-3 py-[9px]">
            <img
              src={c.face}
              alt=""
              aria-hidden
              className="h-6 w-6 shrink-0 rounded-full object-cover"
            />
            <span className="w-[110px] truncate text-[11.5px] font-medium text-slate-500">
              {c.name}
            </span>
            <GhostRow w="34px" h={10} className="rounded" />
            <span className="ml-auto text-[10.5px] text-slate-300">{c.last}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SceneContacts({ phase, reduced }: SceneProps) {
  const chips = phase >= 1;
  const cohort = phase >= 2;
  const action = phase >= 3;
  const burst = phase >= 3;
  const maya = phase >= 4;
  const payoff = phase >= 5;
  const collapse = phase >= 6;

  return (
    <Scene
      reduced={reduced}
      recede={collapse ? 0.15 : cohort ? 0.75 : chips ? 0.3 : 0}
      background={<ContactsBackground />}
      foreground={
        <>
          <Glow show={cohort && !collapse} className="left-[8%] top-[14%] h-56 w-72" />

          {/* A — filter chips land like physical objects */}
          <AnimatePresence>
            {chips && !payoff ? (
              <motion.div
                className="absolute left-5 top-4 flex gap-2"
                initial={reduced ? false : { opacity: 0, y: -34, scale: 1.25, rotate: -4 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: -1.5 }}
                exit={{ opacity: 0, y: -14, scale: 0.9 }}
                transition={{ duration: reduced ? 0 : 0.55, ease: EASE_OUT }}
              >
                {["VIP", "Inactive 6m+"].map((t, i) => (
                  <motion.span
                    key={t}
                    initial={reduced ? false : { opacity: 0, y: -26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.09, ease: EASE_OUT }}
                    className="rounded-full bg-zapla-ink px-4 py-2 text-[13px] font-bold text-white shadow-[0_22px_44px_-18px_rgba(15,23,42,0.6)]"
                  >
                    {t}
                  </motion.span>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* B — matching cohort gathers as a raised stack */}
          <AnimatePresence>
            {cohort && !payoff ? (
              <motion.div
                className="absolute left-[6%] top-[22%] w-[62%] max-w-[420px]"
                initial={reduced ? false : { opacity: 0, y: 26, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: reduced ? 0 : 0.6, ease: EASE_OUT }}
              >
                {CONTACTS.filter((c) => c.match).map((c, i) => {
                  const isMaya = i === 0;
                  return (
                    <motion.div
                      key={c.name}
                      layout
                      initial={reduced ? false : { opacity: 0, x: -18, rotate: i % 2 ? 1.5 : -1.5 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        rotate: i % 2 ? 0.8 : -0.8,
                        y: maya && !isMaya ? 8 : 0,
                        scale: maya ? (isMaya ? 1 : 0.94) : 1,
                        filter: maya && !isMaya ? "blur(1.5px)" : "blur(0px)",
                      }}
                      transition={{
                        duration: reduced ? 0 : 0.6,
                        delay: reduced ? 0 : i * 0.08,
                        ease: EASE_OUT,
                      }}
                      className="relative -mt-1 flex items-center gap-3 rounded-2xl border border-white/80 bg-white px-3.5 py-3 shadow-[0_26px_50px_-26px_rgba(15,23,42,0.4)]"
                      style={{ zIndex: 10 - i }}
                    >
                      <Avatar src={c.face} size={isMaya ? 40 : 34} />
                      <div className="min-w-0">
                        <div className="truncate text-[13.5px] font-bold tracking-tight text-slate-900">
                          {c.name}
                        </div>
                        <div className="text-[11px] text-slate-400">Last order {c.last}</div>
                      </div>
                      <div className="ml-auto flex items-center gap-1.5">
                        <Tag tone="amber">VIP</Tag>
                        <AnimatePresence>
                          {burst ? (
                            <motion.span
                              initial={reduced ? false : { opacity: 0, scale: 0.6 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, delay: reduced ? 0 : 0.18 + i * 0.1 }}
                            >
                              <Tag tone="blue">
                                <Send className="h-3 w-3" /> Sent
                              </Tag>
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* C/D — one oversized action object + signal burst */}
          <AnimatePresence>
            {action && !maya ? (
              <motion.div
                className="absolute bottom-[12%] left-[10%] z-40"
                initial={reduced ? false : { opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.92 }}
                transition={{ duration: reduced ? 0 : 0.55, ease: EASE_OUT }}
              >
                <div className="flex items-center gap-3 rounded-[18px] bg-zapla-blue px-5 py-4 text-white shadow-[0_34px_70px_-24px_rgba(37,99,255,0.7)]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                    <MessageSquare className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <div className="text-[15px] font-bold leading-tight">Re-engage 4 customers</div>
                    <div className="text-[11.5px] text-white/75">SMS · personalised offer</div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* E/F/G — Maya expands, reply grows out of the same object */}
          <AnimatePresence>
            {maya && !collapse ? (
              <motion.div
                className="absolute right-[6%] top-[16%] w-[46%] max-w-[330px]"
                initial={reduced ? false : { opacity: 0, x: 40, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, x: -30 }}
                transition={{ duration: reduced ? 0 : 0.6, ease: EASE_OUT }}
              >
                <Hero className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={FACE.maya} size={52} />
                    <div>
                      <div className="text-[16px] font-extrabold tracking-tight text-slate-900">
                        Maya Chen
                      </div>
                      <div className="text-[11.5px] text-slate-400">Dormant 7 months</div>
                    </div>
                  </div>
                  <motion.div
                    initial={reduced ? false : { opacity: 0, scaleY: 0.4, y: -10 }}
                    animate={{ opacity: 1, scaleY: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: reduced ? 0 : 0.22, ease: EASE_OUT }}
                    style={{ originY: 0 }}
                    className="mt-3 rounded-2xl rounded-tl-sm bg-blue-50 px-3.5 py-3 text-[13px] font-medium leading-snug text-blue-900"
                  >
                    Yes please, Thursday works.
                  </motion.div>
                </Hero>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Signal
            show={maya && !payoff}
            reduced={reduced}
            delay={0.45}
            from={{ x: 20, y: -14 }}
            rotate={-3}
            className="right-[10%] top-[calc(16%+150px)] text-emerald-700"
          >
            <CalendarCheck className="h-3.5 w-3.5" /> Booking requested
          </Signal>

          {/* PAYOFF */}
          <Payoff
            show={payoff && !collapse}
            reduced={reduced}
            className="left-1/2 top-[38%] w-[76%] max-w-[440px] -translate-x-1/2"
          >
            <div className="flex items-center gap-4">
              <Avatar src={FACE.maya} size={56} />
              <div>
                <div className="text-[18px] font-extrabold tracking-tight text-slate-900">
                  Maya Chen
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <Tag tone="green">
                    <Zap className="h-3 w-3" /> Re-engaged
                  </Tag>
                  <Tag tone="blue">
                    <CalendarCheck className="h-3 w-3" /> Booking requested
                  </Tag>
                </div>
              </div>
            </div>
          </Payoff>
        </>
      }
    />
  );
}

/* ================================================================= */
/* 2 — OPPORTUNITIES : one deal creates downstream work               */
/* ================================================================= */

const BOARD = [
  { col: "New enquiry", n: 3 },
  { col: "Qualified", n: 2 },
  { col: "Proposal sent", n: 3 },
  { col: "Negotiation", n: 2 },
];

function BoardBackground() {
  return (
    <div className="absolute inset-0 grid grid-cols-4 gap-2.5 px-4 py-3">
      {BOARD.map((c) => (
        <div key={c.col} className="min-w-0">
          <div className="mb-2 truncate text-[10.5px] font-semibold uppercase tracking-wide text-slate-400">
            {c.col}
          </div>
          <div className="space-y-2">
            {Array.from({ length: c.n }).map((_, i) => (
              <div
                key={i}
                className="space-y-1.5 rounded-lg border border-slate-200/80 bg-white p-2.5"
              >
                <GhostRow w="76%" h={8} />
                <GhostRow w="48%" h={7} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const STAGES = ["Qualified", "Proposal sent", "Negotiation", "Won"] as const;

export function SceneOpportunities({ phase, reduced }: SceneProps) {
  const lifted = phase >= 1;
  const stageIndex = Math.min(Math.max(phase - 1, 0), 3);
  const won = phase >= 4;
  const fan = phase >= 5;
  const payoff = phase >= 6;
  const collapse = phase >= 7;

  const work = [
    { label: "Deposit request", icon: FileText, rot: -7, x: -150, y: 22 },
    { label: "Welcome email", icon: Mail, rot: 0, x: 0, y: 44 },
    { label: "Onboarding call", icon: CalendarCheck, rot: 7, x: 150, y: 22 },
  ];

  return (
    <Scene
      reduced={reduced}
      recede={collapse ? 0.1 : won ? 0.8 : lifted ? 0.45 : 0}
      background={<BoardBackground />}
      foreground={
        <>
          <Glow show={won && !collapse} tone="green" className="left-1/2 top-[18%] h-64 w-80 -translate-x-1/2" />
          <AnimatePresence>
            {lifted && !payoff ? (
              <motion.div
                className="absolute left-1/2 top-[16%] w-[54%] max-w-[360px]"
                initial={reduced ? false : { opacity: 0, y: 46, scale: 0.86, x: "-50%" }}
                animate={{
                  opacity: 1,
                  x: "-50%",
                  y: won ? -6 : 0,
                  scale: won ? 1.06 : 1,
                  rotate: won ? 0 : -1.2,
                }}
                exit={{ opacity: 0, scale: 0.94, x: "-50%" }}
                transition={{ duration: reduced ? 0 : 0.6, ease: EASE_OUT }}
              >
                <Hero className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar src={FACE.tom} size={44} />
                    <div className="min-w-0">
                      <div className="text-[16.5px] font-extrabold leading-tight tracking-tight text-slate-900">
                        Bennett Landscapes
                      </div>
                      <div className="text-[11.5px] text-slate-400">Garden design · £8,400</div>
                    </div>
                    <div className="ml-auto text-right">
                      <AnimatePresence mode="popLayout">
                        <motion.div
                          key={STAGES[stageIndex]}
                          initial={reduced ? false : { opacity: 0, y: 14, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -14, scale: 0.9 }}
                          transition={{ duration: reduced ? 0 : 0.4, ease: EASE_OUT }}
                          className={
                            won
                              ? "rounded-full bg-emerald-500 px-3 py-1.5 text-[12px] font-bold text-white"
                              : "rounded-full bg-slate-900 px-3 py-1.5 text-[12px] font-bold text-white"
                          }
                        >
                          {STAGES[stageIndex]}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    {STAGES.slice(0, 3).map((s, i) => (
                      <motion.span
                        key={s}
                        initial={false}
                        animate={{ opacity: i <= stageIndex ? 1 : 0.25 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Tag tone={i <= stageIndex ? "blue" : "slate"}>{s}</Tag>
                      </motion.span>
                    ))}
                  </div>
                </Hero>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* downstream work fans out from behind the same deal card */}
          {work.map((w, i) => (
            <Signal
              key={w.label}
              show={fan && !collapse}
              reduced={reduced}
              delay={i * 0.11}
              from={{ x: 0, y: -30 }}
              to={{ x: w.x, y: w.y }}
              rotate={w.rot}
              className="left-1/2 top-[46%] -translate-x-1/2 px-3 py-2 text-[12px]"
            >
              <w.icon className="h-3.5 w-3.5 text-blue-600" /> {w.label}
            </Signal>
          ))}

          <Payoff
            show={payoff && !collapse}
            reduced={reduced}
            className="left-1/2 top-[34%] w-[74%] max-w-[420px] -translate-x-1/2"
          >
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_18px_34px_-14px_rgba(16,185,129,0.8)]">
                <Check className="h-6 w-6" strokeWidth={3} />
              </span>
              <div>
                <div className="text-[18px] font-extrabold tracking-tight text-slate-900">Won</div>
                <div className="text-[12.5px] font-medium text-slate-500">
                  Next steps started automatically
                </div>
              </div>
            </div>
          </Payoff>
        </>
      }
    />
  );
}

/* ================================================================= */
/* 3 — INBOX : one customer, every channel                            */
/* ================================================================= */

function InboxBackground() {
  return (
    <div className="absolute inset-0 flex">
      <div className="w-[38%] space-y-2 border-r border-slate-200/80 bg-white p-3">
        {[FACE.maya, FACE.sophie, FACE.leo, FACE.priya, FACE.daniel, FACE.nina].map((f, i) => (
          <div key={i} className="flex items-center gap-2.5 rounded-lg px-1.5 py-2">
            <img src={f} alt="" aria-hidden className="h-7 w-7 rounded-full object-cover" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <GhostRow w="62%" h={8} />
              <GhostRow w="84%" h={6} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-3 p-4">
        {[68, 52, 74, 44].map((w, i) => (
          <div
            key={i}
            className={i % 2 ? "flex justify-end" : ""}
            style={{ width: "100%" }}
          >
            <div
              style={{ width: `${w}%` }}
              className="h-9 rounded-2xl border border-slate-200/70 bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SceneInbox({ phase, reduced }: SceneProps) {
  const lift = phase >= 1;
  const sms = phase >= 2;
  const token = phase >= 3;
  const payoff = phase >= 4;
  const collapse = phase >= 5;

  return (
    <Scene
      reduced={reduced}
      recede={collapse ? 0.1 : lift ? 0.7 : 0}
      background={<InboxBackground />}
      foreground={
        <>
          <Glow show={lift && !collapse} className="left-[16%] top-[20%] h-56 w-72" />
          <AnimatePresence>
            {lift && !payoff ? (
              <motion.div
                className="absolute top-[18%] w-[58%] max-w-[380px]"
                initial={reduced ? false : { opacity: 0, x: -60, y: 30, scale: 0.86 }}
                animate={{
                  opacity: 1,
                  x: sms ? 46 : 0,
                  y: 0,
                  scale: 1,
                  rotate: sms ? 0 : -1.5,
                  left: "8%",
                }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: reduced ? 0 : 0.62, ease: EASE_OUT }}
              >
                <Hero className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={FACE.maya} size={46} />
                    <div>
                      <div className="text-[16px] font-extrabold tracking-tight text-slate-900">
                        Maya Chen
                      </div>
                      <div className="text-[11.5px] text-slate-400">One conversation</div>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      <ChannelMorph sms={sms} reduced={reduced} />
                    </div>
                  </div>
                  <div className="mt-3.5 space-y-2">
                    <div className="max-w-[86%] rounded-2xl rounded-tl-sm bg-slate-100 px-3.5 py-2.5 text-[12.5px] font-medium text-slate-700">
                      Do you have Thursday free?
                    </div>
                    <AnimatePresence>
                      {sms ? (
                        <motion.div
                          initial={reduced ? false : { opacity: 0, y: 16, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.5, ease: EASE_OUT }}
                          className="ml-auto max-w-[86%] rounded-2xl rounded-br-sm bg-zapla-blue px-3.5 py-2.5 text-[12.5px] font-medium text-white"
                        >
                          Thursday 2pm is yours, Maya.
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </Hero>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Signal
            show={token && !payoff}
            reduced={reduced}
            from={{ x: -70, y: 0 }}
            to={{ x: 0, y: 0 }}
            rotate={-2}
            className="right-[7%] top-[42%] px-3 py-2 text-[12px]"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-600" /> Opportunity created
          </Signal>

          <Payoff
            show={payoff && !collapse}
            reduced={reduced}
            className="left-1/2 top-[32%] w-[78%] max-w-[440px] -translate-x-1/2"
          >
            <div className="flex items-center gap-4">
              <Avatar src={FACE.maya} size={58} />
              <div>
                <div className="text-[18px] font-extrabold tracking-tight text-slate-900">
                  Maya Chen
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-gradient-to-br from-fuchsia-500 to-orange-400 text-white">
                    <Instagram className="h-4 w-4" />
                  </span>
                  <span className="-ml-4 flex h-7 w-7 items-center justify-center rounded-[8px] bg-emerald-500 text-white ring-2 ring-white">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  <Tag tone="blue" className="ml-1.5">
                    Opportunity created
                  </Tag>
                </div>
              </div>
            </div>
          </Payoff>
        </>
      }
    />
  );
}

function ChannelMorph({ sms, reduced }: { sms: boolean; reduced: boolean }) {
  return (
    <div className="relative h-8 w-8">
      <AnimatePresence initial={false} mode="popLayout">
        {sms ? (
          <motion.span
            key="sms"
            initial={reduced ? false : { opacity: 0, rotateY: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 90, scale: 0.7 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE_OUT }}
            className="absolute inset-0 flex items-center justify-center rounded-[9px] bg-emerald-500 text-white"
          >
            <MessageSquare className="h-4 w-4" />
          </motion.span>
        ) : (
          <motion.span
            key="ig"
            initial={false}
            exit={{ opacity: 0, rotateY: 90, scale: 0.7 }}
            transition={{ duration: reduced ? 0 : 0.4 }}
            className="absolute inset-0 flex items-center justify-center rounded-[9px] bg-gradient-to-br from-fuchsia-500 to-orange-400 text-white"
          >
            <Instagram className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================= */
/* 4 — AUTOMATIONS : reply makes future work disappear                */
/* ================================================================= */

export function SceneAutomations({ phase, reduced }: SceneProps) {
  const lead = phase >= 1;
  const branch = phase >= 2;
  const reply = phase >= 3;
  const cancel = phase >= 4;
  const booking = phase >= 4;
  const payoff = phase >= 5;
  const collapse = phase >= 6;

  return (
    <Scene
      reduced={reduced}
      recede={collapse ? 0.1 : reply ? 0.85 : lead ? 0.5 : 0}
      background={
        <div className="absolute inset-0 p-5">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(148,163,184,0.35) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative flex h-full items-center gap-6">
            {["New lead", "Send SMS", "Wait 2 days"].map((n) => (
              <div
                key={n}
                className="rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 text-[11px] font-medium text-slate-400"
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      }
      foreground={
        <>
          <Glow show={reply && !collapse} className="left-1/2 top-[24%] h-60 w-[420px] -translate-x-1/2" />

          {/* A — lead token triggers a large SMS action card */}
          <AnimatePresence>
            {lead && !payoff ? (
              <motion.div
                className="absolute left-[5%] top-[24%] w-[42%] max-w-[280px]"
                initial={reduced ? false : { opacity: 0, x: -50, scale: 0.86 }}
                animate={{
                  opacity: reply ? 0.35 : 1,
                  x: 0,
                  scale: reply ? 0.92 : 1,
                  rotate: -1.5,
                  filter: reply ? "blur(1.5px)" : "blur(0px)",
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: reduced ? 0 : 0.55, ease: EASE_OUT }}
              >
                <Hero className="p-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <MessageSquare className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <div className="text-[14px] font-extrabold tracking-tight text-slate-900">
                        Instant SMS
                      </div>
                      <div className="text-[11px] text-slate-400">New lead · Maya Chen</div>
                    </div>
                  </div>
                </Hero>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* B — lighter future branch to the right */}
          <AnimatePresence>
            {branch && !payoff ? (
              <motion.div
                className="absolute right-[7%] top-[16%] w-[34%] max-w-[220px] space-y-2"
                initial={reduced ? false : { opacity: 0, x: 36 }}
                animate={{
                  opacity: cancel ? 0 : 0.95,
                  x: cancel ? 34 : 0,
                  scale: cancel ? 0.82 : 1,
                  rotate: cancel ? 5 : 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.6, ease: EASE_OUT }}
              >
                {["Wait 2 days", "Follow-up email", "Second reminder"].map((n, i) => (
                  <motion.div
                    key={n}
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: cancel ? i * 6 : 0 }}
                    transition={{ duration: 0.45, delay: reduced ? 0 : i * 0.08 }}
                    className="relative rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-[11.5px] font-semibold text-slate-500 shadow-[0_10px_24px_-16px_rgba(15,23,42,0.4)]"
                  >
                    {n}
                    {cancel ? (
                      <span className="absolute left-2.5 right-2.5 top-1/2 h-[1.5px] bg-rose-400" />
                    ) : null}
                  </motion.div>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* C/D — huge reply sweeps in and overrides the branch */}
          <AnimatePresence>
            {reply && !payoff ? (
              <motion.div
                className="absolute left-[14%] top-[30%] w-[64%] max-w-[400px]"
                initial={reduced ? false : { opacity: 0, x: -90, y: 24, scale: 0.8, rotate: -4 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: -1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: reduced ? 0 : 0.65, ease: EASE_OUT }}
              >
                <div className="flex items-end gap-3">
                  <Avatar src={FACE.maya} size={44} />
                  <div className="rounded-[22px] rounded-bl-md bg-zapla-ink px-5 py-4 text-[15px] font-semibold leading-snug text-white shadow-[0_34px_70px_-26px_rgba(15,23,42,0.7)]">
                    Thursday 2pm works, book me in.
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* E — booking card expands out of the reply */}
          <AnimatePresence>
            {booking && !payoff ? (
              <motion.div
                className="absolute bottom-[12%] right-[10%] w-[44%] max-w-[280px]"
                initial={reduced ? false : { opacity: 0, y: -18, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 1.5 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.16, ease: EASE_OUT }}
              >
                <Hero className="p-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CalendarCheck className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <div className="text-[14px] font-extrabold tracking-tight text-slate-900">
                        Thu 2:00pm
                      </div>
                      <div className="text-[11px] text-slate-400">Appointment booked</div>
                    </div>
                  </div>
                </Hero>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Payoff
            show={payoff && !collapse}
            reduced={reduced}
            className="left-1/2 top-[34%] w-[82%] max-w-[470px] -translate-x-1/2"
          >
            <div className="flex items-center gap-4">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-zapla-blue text-white">
                <MessageSquare className="h-5 w-5" />
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white ring-2 ring-white">
                  <X className="h-3 w-3" strokeWidth={3} />
                </span>
              </span>
              <div>
                <div className="text-[17px] font-extrabold leading-tight tracking-tight text-slate-900">
                  Reply received
                </div>
                <div className="text-[12.5px] font-medium text-slate-500">
                  Follow-ups stopped, appointment booked
                </div>
              </div>
              <ArrowRight className="ml-auto h-5 w-5 text-slate-300" />
            </div>
          </Payoff>
        </>
      }
    />
  );
}

export const ScenesAIcons = { Users };
