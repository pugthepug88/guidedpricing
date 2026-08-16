import { motion, AnimatePresence } from "motion/react";
import {
  Bell,
  CalendarCheck,
  Check,
  Facebook,
  FileSignature,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MessageSquare,
  Send,
  Trophy,
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

const DAYS = ["Mon 4", "Tue 5", "Wed 6", "Thu 7", "Fri 8", "Sat 9", "Sun 10"];

/* ================================================================= */
/* 5 — CONTENT PLANNER : one post becomes multi-channel distribution   */
/* ================================================================= */

function PlannerBackground({
  landed,
  connectBtnRef,
  connectedCount,
}: {
  landed: boolean;
  connectBtnRef: React.Ref<HTMLDivElement>;
  connectedCount: number;
}) {
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* native planner toolbar */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
            Week
          </span>
          <span className="text-[11.5px] font-semibold text-slate-400">4 - 10 August</span>
        </div>
        <div
          ref={connectBtnRef}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
        >
          <Share2 className="h-3.5 w-3.5 text-zapla-blue" />
          Connect accounts
          {connectedCount > 0 ? (
            <span className="rounded-full bg-emerald-100 px-1.5 text-[10px] font-bold text-emerald-700">
              {connectedCount}
            </span>
          ) : null}
        </div>
      </div>

      <div className="grid flex-1 grid-cols-7 gap-1.5 px-3 py-3">
        {DAYS.map((d, i) => (
          <div key={d} className="min-w-0">
            <div className="mb-1.5 truncate text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              {d}
            </div>
            <motion.div
              className="space-y-1.5"
              animate={{ y: landed && i === 4 ? 44 : 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
            >
              {Array.from({ length: i % 3 === 0 ? 2 : 1 }).map((_, j) => (
                <div
                  key={j}
                  className="space-y-1.5 rounded-lg border border-slate-200/80 bg-white p-2"
                >
                  <GhostRow w="80%" h={7} />
                  <GhostRow w="52%" h={6} />
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

const CONNECT_ORDER: PlatformId[] = ["instagram", "facebook", "linkedin"];

export function SceneContent({ phase, reduced }: SceneProps) {
  /* timeline
     0 populated planner hold
     1 cursor opens Connect social accounts
     2 Instagram connected · 3 Facebook connected · 4 LinkedIn connected
     5 Done, modal closes
     6 compose · 7 scheduled · 8 travel · 9 payoff · 10 collapse */
  const modalOpen = phase >= 1 && phase <= 5;
  const connected = CONNECT_ORDER.slice(0, Math.max(0, Math.min(3, phase - 1)));
  const compose = phase >= 6;
  const scheduled = phase >= 7;
  const travel = phase >= 8;
  const payoff = phase >= 9;
  const collapse = phase >= 10;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const connectBtnRef = useRef<HTMLDivElement | null>(null);
  const tiles = useRef<Record<string, HTMLElement | null>>({});
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);

  const target =
    phase === 1
      ? "button"
      : phase === 2
        ? "instagram"
        : phase === 3
          ? "facebook"
          : phase === 4
            ? "linkedin"
            : phase === 5
              ? "done"
              : null;

  useEffect(() => {
    if (!target || reduced) {
      setPoint(null);
      return;
    }
    let frame = 0;
    const measure = () => {
      const root = rootRef.current;
      const el = target === "button" ? connectBtnRef.current : tiles.current[target];
      if (!root || !el) {
        frame = requestAnimationFrame(measure);
        return;
      }
      const r = root.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      setPoint({
        x: b.left - r.left + b.width * 0.5,
        y: b.top - r.top + b.height * (target === "button" || target === "done" ? 0.55 : 0.78),
      });
    };
    frame = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(frame);
  }, [target, reduced]);

  const channels = [
    { Mark: InstagramMark, x: -186, y: -18 },
    { Mark: FacebookMark, x: -108, y: -120 },
    { Mark: LinkedInMark, x: 96, y: -120 },
    { Mark: GoogleBusinessMark, x: 176, y: -18 },
  ];

  return (
    <div ref={rootRef} className="absolute inset-0">
      <Scene
        reduced={reduced}
        recede={collapse ? 0.08 : compose ? 0.68 : 0}
        background={
          <PlannerBackground
            landed={payoff || collapse}
            connectBtnRef={connectBtnRef}
            connectedCount={connected.length}
          />
        }
        foreground={
          <>
            <ConnectAccountsModal
              show={modalOpen}
              connected={connected}
              reduced={reduced}
              registerTile={(id, el) => {
                tiles.current[id] = el;
              }}
            />

            <Glow
              show={compose && !collapse}
              tone="violet"
              className="left-[18%] top-[18%] h-56 w-72"
            />
            <AnimatePresence>
              {compose && !collapse ? (
                <motion.div
                  className="absolute left-[10%] top-[16%] w-[58%] max-w-[360px]"
                  initial={reduced ? false : { opacity: 0, y: 40, scale: 0.86 }}
                  animate={{
                    opacity: 1,
                    y: travel ? -34 : 0,
                    x: travel ? 190 : 0,
                    scale: payoff ? 0.62 : travel ? 0.8 : 1,
                    rotate: travel ? 2.5 : -1.2,
                  }}
                  exit={{ opacity: 0, scale: 0.5, y: -60 }}
                  transition={{ duration: reduced ? 0 : 0.7, ease: EASE_OUT }}
                >
                  <Hero className="overflow-hidden">
                    <div className="h-[74px] bg-gradient-to-br from-emerald-200 via-blue-200 to-violet-200" />
                    <div className="p-3.5">
                      <div className="text-[14.5px] font-bold leading-snug tracking-tight text-slate-900">
                        Summer garden refresh, 3 slots left this week.
                      </div>
                      <div className="mt-2.5 flex items-center gap-2">
                        <AnimatePresence>
                          {scheduled ? (
                            <motion.span
                              initial={reduced ? false : { opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, ease: EASE_OUT }}
                            >
                              <Tag tone="green">
                                <CalendarCheck className="h-3 w-3" /> Fri 8 · 09:00
                              </Tag>
                            </motion.span>
                          ) : (
                            <motion.span
                              key="draft"
                              exit={{ opacity: 0 }}
                              className="rounded-full bg-zapla-blue px-3 py-1.5 text-[12px] font-bold text-white"
                            >
                              Schedule
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </Hero>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {channels.map((c, i) => (
              <Signal
                key={i}
                show={travel && !collapse}
                reduced={reduced}
                delay={i * 0.08}
                from={{ x: 0, y: 0 }}
                to={payoff ? { x: c.x * 0.82, y: c.y * 0.75 } : { x: c.x, y: c.y }}
                rotate={i % 2 ? 4 : -4}
                className="left-[52%] top-[52%] h-9 w-9 justify-center p-0"
              >
                <c.Mark size={22} />
              </Signal>
            ))}

            <Payoff
              show={payoff && !collapse}
              reduced={reduced}
              style={{ top: "58%" }}
              className="left-1/2 w-[70%] max-w-[400px] -translate-x-1/2"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500 text-white">
                  <Send className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-[17px] font-extrabold tracking-tight text-slate-900">
                    Scheduled for Friday
                  </div>
                  <div className="text-[12.5px] font-medium text-slate-500">
                    Instagram, Facebook, LinkedIn, Google Business
                  </div>
                </div>
              </div>
            </Payoff>

            <PlannerCursor point={point} press={!!target} reduced={reduced} />
          </>
        }
      />
    </div>
  );
}

/* ================================================================= */
/* 6 — EMAIL MARKETING : personalisation becomes real                  */
/* ================================================================= */

function EmailBackground() {
  return (
    <div className="absolute inset-0 flex">
      <div className="w-[34%] space-y-2 border-r border-slate-200/80 bg-white p-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-1.5 rounded-lg border border-slate-200/70 p-2">
            <GhostRow w="72%" h={8} />
            <GhostRow w="44%" h={6} />
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-2.5 p-4">
        {[92, 78, 86, 60, 70].map((w, i) => (
          <GhostRow key={i} w={`${w}%`} h={9} />
        ))}
      </div>
    </div>
  );
}

export function SceneEmail({ phase, reduced }: SceneProps) {
  const sheet = phase >= 1;
  const merged = phase >= 2;
  const published = phase >= 3;
  const reply = phase >= 4;
  const payoff = phase >= 5;
  const collapse = phase >= 6;

  return (
    <Scene
      reduced={reduced}
      recede={collapse ? 0.08 : sheet ? 0.72 : 0}
      background={<EmailBackground />}
      foreground={
        <>
          <Glow show={sheet && !collapse} className="left-[14%] top-[16%] h-60 w-80" />
          <AnimatePresence>
            {sheet && !payoff ? (
              <motion.div
                className="absolute left-[8%] top-[14%] w-[60%] max-w-[380px]"
                initial={reduced ? false : { opacity: 0, y: 44, scale: 0.84 }}
                animate={{
                  opacity: reply ? 0.4 : 1,
                  y: published ? 14 : 0,
                  scale: published ? 0.84 : 1,
                  rotate: published ? -3 : -1,
                  filter: reply ? "blur(2px)" : "blur(0px)",
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: reduced ? 0 : 0.65, ease: EASE_OUT }}
              >
                <Hero className="p-5">
                  <div className="flex flex-wrap items-baseline gap-2 text-[22px] font-extrabold tracking-tight text-slate-900">
                    <span>Hi</span>
                    <span className="relative inline-flex h-[30px] items-center overflow-hidden">
                      <AnimatePresence mode="popLayout" initial={false}>
                        {merged ? (
                          <motion.span
                            key="maya"
                            initial={reduced ? false : { y: 26, opacity: 0, scale: 0.86 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            transition={{ duration: reduced ? 0 : 0.5, ease: EASE_OUT }}
                            className="text-zapla-blue"
                          >
                            Maya
                          </motion.span>
                        ) : (
                          <motion.span
                            key="merge"
                            initial={false}
                            exit={{ y: -26, opacity: 0, scale: 0.86, filter: "blur(3px)" }}
                            transition={{ duration: reduced ? 0 : 0.45, ease: EASE_OUT }}
                            className="rounded-md bg-slate-100 px-2 font-mono text-[15px] text-slate-500"
                          >
                            {"{{contact.first_name}}"}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <GhostRow w="94%" h={8} />
                    <GhostRow w="82%" h={8} />
                    <GhostRow w="60%" h={8} />
                  </div>
                  <div className="mt-4">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={published ? "pub" : "draft"}
                        initial={reduced ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.4 }}
                        className={
                          published
                            ? "inline-flex rounded-full bg-emerald-500 px-3.5 py-1.5 text-[12px] font-bold text-white"
                            : "inline-flex rounded-full bg-zapla-blue px-3.5 py-1.5 text-[12px] font-bold text-white"
                        }
                      >
                        {published ? "Published" : "Publish"}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </Hero>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* future sequence emails collapse when Maya replies */}
          <AnimatePresence>
            {published && !payoff ? (
              <motion.div
                className="absolute right-[8%] top-[18%] w-[32%] max-w-[210px] space-y-2"
                initial={reduced ? false : { opacity: 0, x: 30 }}
                animate={{
                  opacity: reply ? 0 : 1,
                  x: reply ? 26 : 0,
                  scale: reply ? 0.8 : 1,
                  rotate: reply ? 6 : 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.6, ease: EASE_OUT }}
              >
                {["Email 2 · day 3", "Email 3 · day 7"].map((e, i) => (
                  <motion.div
                    key={e}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: reply ? i * 8 : 0 }}
                    transition={{ duration: 0.45, delay: reduced ? 0 : i * 0.08 }}
                    className="rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-[11.5px] font-semibold text-slate-500 shadow-[0_10px_24px_-16px_rgba(15,23,42,0.4)]"
                  >
                    {e}
                  </motion.div>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {reply && !payoff ? (
              <motion.div
                className="absolute bottom-[16%] left-[16%] w-[62%] max-w-[380px]"
                initial={reduced ? false : { opacity: 0, x: -70, y: 24, scale: 0.82, rotate: -4 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: -1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: reduced ? 0 : 0.6, ease: EASE_OUT }}
              >
                <div className="flex items-end gap-3">
                  <Avatar src={FACE.maya} size={42} />
                  <div className="rounded-[22px] rounded-bl-md bg-zapla-ink px-5 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_30px_60px_-26px_rgba(15,23,42,0.7)]">
                    Interested, can you call me?
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Payoff
            show={payoff && !collapse}
            reduced={reduced}
            className="left-1/2 top-[32%] w-[74%] max-w-[420px] -translate-x-1/2"
          >
            <div className="flex items-center gap-4">
              <Avatar src={FACE.maya} size={52} />
              <div>
                <div className="text-[17px] font-extrabold tracking-tight text-slate-900">
                  Maya replied
                </div>
                <div className="text-[12.5px] font-medium text-slate-500">
                  Remaining emails stopped
                </div>
              </div>
              <Mail className="ml-auto h-5 w-5 text-slate-300" />
            </div>
          </Payoff>
        </>
      }
    />
  );
}

/* ================================================================= */
/* 7 — CALENDAR : a selected time becomes a real appointment           */
/* ================================================================= */

function CalendarBackground({ docked }: { docked: boolean }) {
  return (
    <div className="absolute inset-0 grid grid-cols-5 gap-1.5 px-3 py-3">
      {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
        <div key={d} className="min-w-0">
          <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            {d}
          </div>
          <div className="space-y-1.5">
            {Array.from({ length: 4 }).map((_, j) => {
              const target = i === 4 && j === 2;
              if (target)
                return (
                  <motion.div
                    key={j}
                    animate={{
                      opacity: 1,
                      borderColor: docked ? "rgba(16,185,129,0.6)" : "rgba(148,163,184,0.5)",
                      backgroundColor: docked ? "rgba(209,250,229,0.9)" : "rgba(255,255,255,1)",
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-[42px] rounded-lg border border-dashed p-2 text-[10px] font-semibold text-slate-400"
                  >
                    {docked ? "Nina · 12:00" : "12:00"}
                  </motion.div>
                );
              return (
                <div
                  key={j}
                  className="h-[42px] space-y-1.5 rounded-lg border border-slate-200/80 bg-white p-2"
                >
                  <GhostRow w="70%" h={6} />
                  <GhostRow w="46%" h={5} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SceneCalendar({ phase, reduced }: SceneProps) {
  const token = phase >= 1;
  const appt = phase >= 2;
  const confirm = phase >= 3;
  const payoff = phase >= 4;
  const collapse = phase >= 5;

  return (
    <Scene
      reduced={reduced}
      recede={collapse ? 0.08 : token ? 0.7 : 0}
      background={<CalendarBackground docked={collapse} />}
      foreground={
        <>
          <Glow
            show={token && !collapse}
            tone="green"
            className="left-1/2 top-[20%] h-56 w-72 -translate-x-1/2"
          />
          <AnimatePresence>
            {token && !payoff ? (
              <motion.div
                className="absolute left-1/2 top-[24%] w-[46%] max-w-[300px]"
                initial={reduced ? false : { opacity: 0, y: 40, scale: 0.7, x: "-50%" }}
                animate={{
                  opacity: 1,
                  x: "-50%",
                  y: confirm ? 26 : 0,
                  scale: confirm ? 0.9 : 1,
                  rotate: -1.5,
                }}
                exit={{ opacity: 0, scale: 0.9, x: "-50%" }}
                transition={{ duration: reduced ? 0 : 0.6, ease: EASE_OUT }}
              >
                <Hero className="p-4">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {appt ? (
                      <motion.div
                        key="appt"
                        initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: reduced ? 0 : 0.5, ease: EASE_OUT }}
                        className="flex items-center gap-3"
                      >
                        <Avatar src={FACE.nina} size={46} />
                        <div>
                          <div className="text-[15.5px] font-extrabold tracking-tight text-slate-900">
                            Nina Alvarez
                          </div>
                          <div className="text-[11.5px] text-slate-400">
                            Consultation · Fri 12:00
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="slot"
                        initial={false}
                        exit={{ opacity: 0, scale: 0.94, filter: "blur(3px)" }}
                        transition={{ duration: reduced ? 0 : 0.4 }}
                        className="py-1.5 text-center text-[20px] font-extrabold tracking-tight text-slate-400"
                      >
                        Fri 12:00 available
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Hero>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Signal
            show={confirm && !payoff}
            reduced={reduced}
            from={{ x: 0, y: 0 }}
            to={{ x: -130, y: -34 }}
            rotate={-5}
            className="left-1/2 top-[36%] px-3 py-2 text-[12px]"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-600" /> SMS confirmed
          </Signal>
          <Signal
            show={confirm && !payoff}
            reduced={reduced}
            delay={0.12}
            from={{ x: 0, y: 0 }}
            to={{ x: 120, y: -34 }}
            rotate={5}
            className="left-1/2 top-[36%] px-3 py-2 text-[12px]"
          >
            <Mail className="h-3.5 w-3.5 text-blue-600" /> Email sent
          </Signal>

          <Payoff
            show={payoff && !collapse}
            reduced={reduced}
            className="left-1/2 top-[32%] w-[62%] max-w-[350px] -translate-x-1/2"
          >
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
                <CalendarCheck className="h-6 w-6" />
              </span>
              <div>
                <div className="text-[19px] font-extrabold tracking-tight text-slate-900">
                  Booked
                </div>
                <div className="text-[12.5px] font-medium text-slate-500">
                  Nina Alvarez · Friday 12:00
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
/* 8 — CONTRACTS : one signature changes the deal                      */
/* ================================================================= */

function ContractsBackground() {
  return (
    <div className="absolute inset-0 flex">
      <div className="w-[34%] space-y-2 border-r border-slate-200/80 bg-white p-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-slate-200/70 p-2"
          >
            <FileSignature className="h-3.5 w-3.5 text-slate-300" />
            <div className="flex-1 space-y-1.5">
              <GhostRow w="72%" h={7} />
              <GhostRow w="40%" h={5} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-2.5 p-4">
        <div className="flex gap-1.5">
          {["Draft", "Sent", "Viewed", "Signed"].map((s) => (
            <span key={s} className="text-[9.5px] font-medium text-slate-300">
              {s}
            </span>
          ))}
        </div>
        {[94, 88, 76, 92, 64].map((w, i) => (
          <GhostRow key={i} w={`${w}%`} h={8} />
        ))}
      </div>
    </div>
  );
}

export function SceneContracts({ phase, reduced }: SceneProps) {
  const sheet = phase >= 1;
  const sign = phase >= 2;
  const sealed = phase >= 3;
  const dock = phase >= 4;
  const payoff = phase >= 5;
  const collapse = phase >= 6;

  return (
    <Scene
      reduced={reduced}
      recede={collapse ? 0.08 : sheet ? 0.74 : 0}
      background={<ContractsBackground />}
      foreground={
        <>
          <Glow show={sheet && !collapse} className="left-[12%] top-[16%] h-60 w-80" />
          <AnimatePresence>
            {sheet && !payoff ? (
              <motion.div
                className="absolute left-[9%] top-[16%] w-[58%] max-w-[370px]"
                initial={reduced ? false : { opacity: 0, y: 46, scale: 0.84, rotate: -3 }}
                animate={{
                  opacity: 1,
                  y: dock ? 10 : 0,
                  x: dock ? 210 : 0,
                  scale: sealed ? (dock ? 0.6 : 0.78) : 1,
                  rotate: sealed ? 2 : -1.5,
                }}
                exit={{ opacity: 0, scale: 0.6, x: 250 }}
                transition={{ duration: reduced ? 0 : 0.68, ease: EASE_OUT }}
              >
                <Hero className="p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Garden design agreement
                  </div>
                  <div className="mt-3 space-y-2">
                    <GhostRow w="92%" h={7} />
                    <GhostRow w="70%" h={7} />
                  </div>
                  <div className="relative mt-4 h-[74px] rounded-xl border border-dashed border-slate-300 bg-slate-50/70">
                    <svg viewBox="0 0 240 60" className="absolute inset-0 h-full w-full">
                      <motion.path
                        d="M18 44 C40 6, 62 54, 86 24 C104 2, 118 50, 142 30 C162 14, 186 46, 220 20"
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth={3}
                        strokeLinecap="round"
                        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                        animate={{ pathLength: sign ? 1 : 0 }}
                        transition={{ duration: reduced ? 0 : 0.95, ease: [0.4, 0, 0.3, 1] }}
                      />
                    </svg>
                    <AnimatePresence>
                      {sealed ? (
                        <motion.span
                          initial={reduced ? false : { opacity: 0, scale: 0.7, rotate: -8 }}
                          animate={{ opacity: 1, scale: 1, rotate: -6 }}
                          transition={{ duration: 0.45, ease: EASE_OUT }}
                          className="absolute -right-3 -top-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-[11.5px] font-bold text-white shadow-[0_16px_30px_-14px_rgba(16,185,129,0.9)]"
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} /> Signed
                        </motion.span>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </Hero>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* the deal object receiving the signed document */}
          <AnimatePresence>
            {sheet && !payoff ? (
              <motion.div
                className="absolute bottom-[16%] right-[9%] w-[38%] max-w-[240px]"
                initial={reduced ? false : { opacity: 0, y: 24, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: dock ? 1.08 : 0.96,
                  rotate: dock ? 0 : 2,
                }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: reduced ? 0 : 0.55, ease: EASE_OUT }}
              >
                <Hero className="p-3.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar src={FACE.tom} size={38} />
                    <div className="min-w-0">
                      <div className="truncate text-[13.5px] font-bold tracking-tight text-slate-900">
                        Bennett Landscapes
                      </div>
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                          key={dock ? "won" : "neg"}
                          initial={reduced ? false : { opacity: 0, rotateX: -70 }}
                          animate={{ opacity: 1, rotateX: 0 }}
                          exit={{ opacity: 0, rotateX: 70 }}
                          transition={{ duration: reduced ? 0 : 0.4 }}
                          className="mt-1"
                        >
                          <Tag tone={dock ? "green" : "slate"}>{dock ? "Won" : "Negotiation"}</Tag>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </Hero>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Signal
            show={dock && !payoff}
            reduced={reduced}
            delay={0.2}
            from={{ x: -30, y: 10 }}
            to={{ x: 0, y: 0 }}
            rotate={-3}
            className="right-[12%] top-[26%] px-3 py-2 text-[12px]"
          >
            <Bell className="h-3.5 w-3.5 text-blue-600" /> Team notified
          </Signal>

          <Payoff
            show={payoff && !collapse}
            reduced={reduced}
            className="left-1/2 top-[32%] w-[72%] max-w-[410px] -translate-x-1/2"
          >
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zapla-ink text-white">
                <Trophy className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[18px] font-extrabold tracking-tight text-slate-900">
                  Signed · Deal won
                </div>
                <div className="text-[12.5px] font-medium text-slate-500">
                  Bennett Landscapes · £8,400
                </div>
              </div>
            </div>
          </Payoff>
        </>
      }
    />
  );
}
