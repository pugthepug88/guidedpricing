import { motion, useReducedMotion } from "motion/react";
import {
  CalendarDays,
  Globe2,
  Headphones,
  MessageSquareText,
  Phone,
  Sparkles,
  UserRound,
} from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const BOOK_URL = "https://zapla.io/booking";

const BG = "#111214";
const CORAL = "#E97D62";
const AMBER = "#DDA34B";
const ROSE = "#C96C85";
const SAGE = "#99A36D";
const PLUM = "#9B86B8";
const APRICOT = "#D58C75";
const PETALS = [CORAL, ROSE, AMBER, SAGE, PLUM, APRICOT];
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

function RevenueAvatar({ size = 52, cell = 0 }: { size?: number; cell?: number }) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);

  return (
    <span
      className="shrink-0 overflow-hidden rounded-full border border-white/[0.13] shadow-[0_8px_24px_rgba(0,0,0,.28)]"
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition: `${(column / 5) * 100}% ${(row / 3) * 100}%`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
        backgroundColor: "#B98278",
      }}
      aria-hidden="true"
    />
  );
}

function PetalFlower({ size = 82 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" aria-hidden="true" className="shrink-0 overflow-visible">
      {PETALS.map((color, index) => (
        <g key={`${color}-${index}`} transform={`rotate(${index * 60} 80 80)`}>
          <path
            d="M80 14 C95 14 104 25 102 42 C100 58 92 70 80 82 C68 70 60 58 58 42 C56 25 65 14 80 14 Z"
            fill={color}
            stroke={color}
            strokeWidth="1.4"
          />
        </g>
      ))}
      <circle cx="80" cy="80" r="14" fill={BG} stroke="rgba(255,255,255,.08)" />
    </svg>
  );
}

function HoverTrace({ color = CORAL, radius = 30 }: { color?: string; radius?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden" style={{ borderRadius: radius }} aria-hidden="true">
      <span className="absolute left-8 right-8 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100" style={{ background: `linear-gradient(90deg, transparent, ${color}B8 34%, ${AMBER}86 68%, transparent)` }} />
      <span className="absolute bottom-8 right-0 top-8 w-px origin-top scale-y-0 transition-transform duration-700 delay-150 ease-out group-hover:scale-y-100" style={{ background: `linear-gradient(180deg, transparent, ${ROSE}92 44%, ${color}82, transparent)` }} />
      <span className="absolute bottom-0 left-8 right-8 h-px origin-right scale-x-0 transition-transform duration-700 delay-300 ease-out group-hover:scale-x-100" style={{ background: `linear-gradient(270deg, transparent, ${AMBER}78 34%, ${PLUM}72 68%, transparent)` }} />
      <span className="absolute bottom-8 left-0 top-8 w-px origin-bottom scale-y-0 transition-transform duration-700 delay-[450ms] ease-out group-hover:scale-y-100" style={{ background: `linear-gradient(0deg, transparent, ${color}7E 44%, ${AMBER}68, transparent)` }} />
    </div>
  );
}

function Capability({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-full border border-white/[0.09] bg-white/[0.025] px-3.5 py-2 text-[11px] font-medium text-white/72 transition-[border-color,background-color,box-shadow] duration-300 hover:border-white/[0.16] hover:bg-white/[0.04] hover:shadow-[0_0_18px_rgba(233,125,98,.06)]">
      <span style={{ color }}>{icon}</span>
      {label}
    </div>
  );
}

function Waveform() {
  const reduced = Boolean(useReducedMotion());
  const bars = [12, 20, 15, 28, 18, 34, 22, 42, 26, 35, 18, 29, 16, 24, 13];

  return (
    <div className="flex h-14 items-center justify-center gap-[4px]">
      {bars.map((height, index) => (
        <motion.span
          key={index}
          className="w-[3px] rounded-full"
          style={{ backgroundColor: index % 4 === 0 ? CORAL : "rgba(255,255,255,.34)" }}
          animate={reduced ? { height: height * 0.72 } : { height: [height * 0.55, height, height * 0.7] }}
          transition={{ duration: 1.15, repeat: reduced ? 0 : Infinity, delay: index * 0.045, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function OutcomeCard({ icon, title, detail, color, children }: { icon: React.ReactNode; title: string; detail?: string; color: string; children?: React.ReactNode }) {
  return (
    <motion.div
      className="rounded-[17px] border px-3.5 py-3"
      whileHover={{
        y: -2,
        borderColor: `${color}68`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,.05), 0 12px 30px rgba(0,0,0,.18), 0 0 22px ${color}15`,
      }}
      transition={{ duration: 0.28, ease: EASE }}
      style={{
        borderColor: `${color}35`,
        background: `linear-gradient(180deg, ${color}0D, rgba(255,255,255,.025))`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,.035), 0 10px 28px rgba(0,0,0,.16)`,
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-white/[0.08] bg-white/[0.025]" style={{ color }}>
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-medium text-white/86">{title}</div>
          {detail && <div className="mt-0.5 text-[9px] text-white/42">{detail}</div>}
        </div>
      </div>
      {children}
    </motion.div>
  );
}

export function ZaplaAIReceptionistV6() {
  const reduced = Boolean(useReducedMotion());

  return (
    <section className="relative -mt-16 overflow-hidden pb-24 sm:-mt-20 sm:pb-28 lg:-mt-24 lg:pb-32" style={{ backgroundColor: BG, fontFamily: DISPLAY }}>
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div
          className="group relative overflow-hidden rounded-[30px] border border-white/[0.14] px-6 py-7 transition-[border-color,box-shadow] duration-500 hover:border-white/[0.19] hover:shadow-[0_28px_100px_rgba(0,0,0,.28),0_0_38px_rgba(233,125,98,.07)] sm:px-8 sm:py-9 lg:grid lg:min-h-[326px] lg:grid-cols-[0.90fr_1.10fr] lg:items-center lg:gap-10 lg:px-12 lg:py-10"
          style={{
            background: `radial-gradient(circle at 72% 44%, ${CORAL}12 0%, transparent 29%), radial-gradient(circle at 86% 72%, ${ROSE}0E 0%, transparent 28%), linear-gradient(180deg, #191A1E, #16171A)`,
            boxShadow: "0 28px 90px rgba(0,0,0,.26), inset 0 1px 0 rgba(255,255,255,.035)",
          }}
        >
          <HoverTrace radius={30} />
          <div className="pointer-events-none absolute left-[9%] top-0 z-30 h-px w-[21%] bg-gradient-to-r from-transparent via-[#E97D62]/38 to-transparent" />
          <div className="pointer-events-none absolute right-[10%] top-0 z-30 h-px w-[18%] bg-gradient-to-r from-transparent via-[#C96C85]/26 to-transparent" />
          <div className="pointer-events-none absolute right-[8%] top-[16%] h-40 w-72 rounded-full bg-[#E97D62]/[0.06] blur-[50px]" />

          <div className="relative z-10 max-w-[590px]">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.13em]" style={{ color: CORAL }}>
              <Sparkles size={14} strokeWidth={2} />
              AI Receptionist
            </div>

            <h3 className="mt-5 max-w-[560px] text-[34px] font-semibold leading-[1.02] tracking-[-0.048em] text-white sm:text-[42px] lg:text-[47px]">
              Your front desk, even when no one picks up.
            </h3>

            <p className="mt-5 max-w-[590px] text-[14px] leading-[1.65] text-white/54 sm:text-[15px]">
              Zapla answers incoming calls 24/7, handles common questions, qualifies enquiries, books the next step, speaks multiple languages, and hands off to your team when a human is needed.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <Capability icon={<MessageSquareText size={14} />} label="Answers" color={CORAL} />
              <Capability icon={<UserRound size={14} />} label="Qualifies" color={AMBER} />
              <Capability icon={<CalendarDays size={14} />} label="Books" color={SAGE} />
              <Capability icon={<Globe2 size={14} />} label="Multilingual" color={ROSE} />
              <Capability icon={<Headphones size={14} />} label="Human transfer" color={PLUM} />
            </div>
          </div>

          <div className="relative z-10 mt-9 min-h-[245px] lg:mt-0">
            <div className="absolute left-[41%] top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
            <div className="absolute left-[41%] top-1/2 h-[156px] w-[156px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />

            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 640 245" preserveAspectRatio="none" aria-hidden="true">
              <path d="M164 122 C190 122 202 122 212 122" fill="none" stroke="rgba(233,125,98,.38)" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M318 122 C362 122 386 40 440 40" fill="none" stroke="rgba(233,125,98,.30)" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M318 122 C365 122 392 122 440 122" fill="none" stroke="rgba(221,163,75,.27)" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M318 122 C362 122 386 204 440 204" fill="none" stroke="rgba(201,108,133,.27)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>

            <div className="absolute left-0 top-1/2 w-[150px] -translate-y-1/2 rounded-[20px] border border-white/[0.10] bg-[#1E1F23]/95 p-4 shadow-[0_18px_45px_rgba(0,0,0,.22)] transition-[border-color,box-shadow] duration-300 hover:border-[#E97D62]/35 hover:shadow-[0_18px_46px_rgba(0,0,0,.24),0_0_20px_rgba(233,125,98,.08)] sm:w-[165px]">
              <div className="flex items-center gap-2 text-[9px] font-medium text-white/56"><Phone size={12} color={CORAL} /> Incoming call</div>
              <div className="mt-4 flex items-center gap-3">
                <RevenueAvatar size={45} cell={0} />
                <div>
                  <div className="text-[10px] font-medium text-white/86">New enquiry</div>
                  <div className="mt-1 text-[8px] text-white/36">AI answering</div>
                </div>
              </div>
              <div className="mt-3"><Waveform /></div>
            </div>

            <div className="absolute left-[41%] top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E97D62]/10 blur-[26px]" />
              <motion.div
                className="relative"
                animate={reduced ? undefined : { rotate: 360 }}
                transition={reduced ? undefined : { duration: 18, repeat: Infinity, ease: "linear" }}
              >
                <PetalFlower size={82} />
              </motion.div>
            </div>

            <div className="absolute right-0 top-1/2 grid w-[186px] -translate-y-1/2 gap-2.5 sm:w-[205px]">
              <OutcomeCard icon={<CalendarDays size={16} />} title="Appointment" detail="Thu 2:30 · Booked" color={AMBER} />
              <OutcomeCard icon={<Globe2 size={16} />} title="Multilingual" color={ROSE}>
                <div className="mt-2.5 flex items-center gap-2 pl-[42px] text-[8px] font-medium text-white/52">
                  <span className="text-white/82">EN</span><span>中文</span><span>ES</span>
                </div>
              </OutcomeCard>
              <OutcomeCard icon={<Headphones size={16} />} title="Transfer to team" detail="Human handoff" color={PLUM} />
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-20 max-w-[980px] overflow-hidden px-5 py-16 text-center sm:mt-24 sm:py-20 lg:mt-28 lg:py-24">
          <div
            className="pointer-events-none absolute bottom-[-120px] right-[-120px] h-[430px] w-[500px] rounded-[50%] blur-[72px]"
            style={{
              background: `radial-gradient(circle at 48% 42%, ${CORAL}2A 0%, transparent 30%), radial-gradient(circle at 64% 58%, ${ROSE}24 0%, transparent 36%), radial-gradient(circle at 38% 68%, ${AMBER}18 0%, transparent 34%)`,
            }}
          />
          <div className="pointer-events-none absolute bottom-[-150px] right-[-112px] h-[390px] w-[390px] opacity-[0.24]" aria-hidden="true">
            <span className="absolute bottom-[114px] left-[42px] h-[178px] w-[116px] rotate-[48deg] rounded-[58%_42%_58%_42%]" style={{ background: `linear-gradient(145deg, ${PLUM}B8, ${ROSE}58)` }} />
            <span className="absolute bottom-[150px] left-[142px] h-[202px] w-[126px] rotate-[18deg] rounded-[58%_42%_58%_42%]" style={{ background: `linear-gradient(145deg, ${ROSE}C8, ${CORAL}70)` }} />
            <span className="absolute bottom-[98px] left-[235px] h-[194px] w-[122px] -rotate-[24deg] rounded-[58%_42%_58%_42%]" style={{ background: `linear-gradient(145deg, ${CORAL}C4, ${AMBER}62)` }} />
            <span className="absolute bottom-[18px] left-[210px] h-[168px] w-[120px] -rotate-[66deg] rounded-[58%_42%_58%_42%]" style={{ background: `linear-gradient(145deg, ${AMBER}A8, ${APRICOT}58)` }} />
            <span className="absolute bottom-[2px] left-[94px] h-[170px] w-[120px] rotate-[84deg] rounded-[58%_42%_58%_42%]" style={{ background: `linear-gradient(145deg, ${APRICOT}82, ${PLUM}4A)` }} />
            <span className="absolute bottom-[88px] left-[166px] h-[46px] w-[46px] rounded-full bg-[#141518]/95 shadow-[0_0_30px_rgba(0,0,0,.35)]" />
          </div>
          <div className="pointer-events-none absolute bottom-[-22px] left-[9%] h-[150px] w-[520px] rounded-[50%] blur-[64px]" style={{ background: `radial-gradient(ellipse at center, ${CORAL}16 0%, ${ROSE}0D 42%, transparent 72%)` }} />

          <div className="relative z-10">
            <h3 className="mx-auto max-w-[760px] text-[36px] font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-[46px] lg:text-[54px]">
              AI that actually follows through.
            </h3>
            <p className="mx-auto mt-5 max-w-[650px] text-[14px] leading-[1.65] text-white/52 sm:text-[16px]">
              From first contact to booked job, Zapla helps you respond, follow up, and keep opportunities moving.
            </p>
            <div className="mt-8 flex justify-center">
              <a href={BOOK_URL} className="inline-flex h-[50px] items-center justify-center rounded-full bg-white px-6 text-[13px] font-semibold text-[#111214] shadow-[0_10px_34px_rgba(233,125,98,.10)] transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-[0_12px_38px_rgba(233,125,98,.16)]">
                Book a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ZaplaAIReceptionistV6;
