import { motion, AnimatePresence } from "motion/react";
import type { ReactNode } from "react";
import {
  Bell,
  CalendarDays,
  Check,
  CircleDollarSign,
  FileSignature,
  Inbox,
  Instagram,
  Facebook,
  Linkedin,
  LayoutGrid,
  Globe,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Settings,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/zapla-logo-green.png.asset.json";
import { FACE } from "./faces";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* App shell — white, icon only rail                                   */
/* ------------------------------------------------------------------ */

const RAIL = [
  { icon: Users, key: "contacts", label: "Contacts" },
  { icon: Target, key: "opportunities", label: "Opportunities" },
  { icon: Inbox, key: "inbox", label: "Inbox" },
  { icon: Workflow, key: "automations", label: "Automations" },
  { icon: LayoutGrid, key: "content", label: "Content Planner" },
  { icon: Mail, key: "email", label: "Email Marketing" },
  { icon: CalendarDays, key: "calendar", label: "Calendar" },
  { icon: FileSignature, key: "contracts", label: "Contracts" },
];

export function AppShell({
  activeKey,
  title,
  subtitle,
  children,
}: {
  activeKey: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full w-full overflow-hidden rounded-[16px] bg-white">
      {/* light icon-only rail */}
      <div className="hidden w-[56px] shrink-0 flex-col items-center gap-1.5 border-r border-slate-200/80 bg-[#FBFCFF] py-3 shadow-[1px_0_0_rgba(15,23,42,0.02)] sm:flex">
        <img src={logo.url} alt="Zapla" className="mb-2.5 h-7 w-7 rounded-[9px]" />
        {RAIL.map(({ icon: Icon, key, label }) => {
          const on = key === activeKey;
          return (
            <div
              key={key}
              aria-label={label}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-[11px] transition-colors duration-500",
                on ? "bg-blue-50 text-blue-600 ring-1 ring-blue-100" : "text-slate-300",
              )}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
            </div>
          );
        })}
        <img
          src={FACE.alex}
          alt=""
          className="mt-auto h-7 w-7 rounded-full object-cover ring-1 ring-slate-200"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* top bar */}
        <div className="flex h-[50px] shrink-0 items-center gap-3 border-b border-slate-200/80 px-3 sm:px-4">
          <div className="min-w-0">
            <div className="truncate text-[14.5px] font-semibold tracking-tight text-slate-900">
              {title}
            </div>
            {subtitle ? (
              <div className="truncate text-[11px] text-slate-400">{subtitle}</div>
            ) : null}
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="hidden h-7 items-center gap-1.5 rounded-md border border-slate-200 px-2.5 text-[11px] text-slate-400 md:flex">
              <Search className="h-3.5 w-3.5" />
              Search
            </div>
            <IconBtn>
              <Bell className="h-3.5 w-3.5" />
            </IconBtn>
            <IconBtn>
              <Settings className="h-3.5 w-3.5" />
            </IconBtn>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 bg-[#F8FAFF]">{children}</div>
      </div>
    </div>
  );
}

function IconBtn({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

export function Pill({
  children,
  tone = "slate",
  className,
}: {
  children: ReactNode;
  tone?: "slate" | "blue" | "violet" | "green" | "amber" | "cyan" | "rose";
  className?: string;
}) {
  const tones: Record<string, string> = {
    slate: "bg-slate-100 text-slate-600",
    blue: "bg-blue-50 text-blue-700",
    violet: "bg-violet-50 text-violet-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    cyan: "bg-cyan-50 text-cyan-700",
    rose: "bg-rose-50 text-rose-700",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-[10.5px] font-medium leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* Human face avatar (fictional demo portraits) */
export function Face({
  src,
  size = 28,
  className,
  ring = true,
}: {
  src: string;
  size?: number;
  className?: string;
  ring?: boolean;
}) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      style={{ width: size, height: size }}
      className={cn(
        "shrink-0 rounded-full object-cover",
        ring && "ring-1 ring-slate-200",
        className,
      )}
    />
  );
}

export function ChannelMark({
  channel,
  size = 18,
}: {
  channel: "instagram" | "sms" | "email" | "messenger" | "phone";
  size?: number;
}) {
  const map = {
    instagram: {
      cls: "bg-gradient-to-br from-fuchsia-500 to-orange-400 text-white",
      icon: Instagram,
    },
    messenger: { cls: "bg-blue-500 text-white", icon: Facebook },
    sms: { cls: "bg-emerald-500 text-white", icon: MessageSquare },
    email: { cls: "bg-slate-700 text-white", icon: Mail },
    phone: { cls: "bg-indigo-500 text-white", icon: Phone },
  } as const;
  const { cls, icon: Icon } = map[channel];
  return (
    <span
      style={{ width: size, height: size }}
      className={cn("inline-flex items-center justify-center rounded-[5px]", cls)}
    >
      <Icon style={{ width: size * 0.6, height: size * 0.6 }} />
    </span>
  );
}

export function SocialMark({ id, size = 13 }: { id: string; size?: number }) {
  const style = { width: size, height: size };
  if (id === "ig") return <Instagram style={style} className="text-fuchsia-600" />;
  if (id === "fb") return <Facebook style={style} className="text-blue-600" />;
  if (id === "li") return <Linkedin style={style} className="text-cyan-700" />;
  return <Globe style={style} className="text-emerald-600" />;
}

export const SOCIAL_LABEL: Record<string, string> = {
  ig: "Instagram",
  fb: "Facebook",
  li: "LinkedIn",
  gb: "Google Business",
};

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/90 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* Soft interaction indicator — appears only for a single purposeful action */
export function Pointer({
  x,
  y,
  show,
  active,
  reduced,
}: {
  x: number;
  y: number;
  show?: boolean;
  active?: boolean;
  reduced?: boolean;
}) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute z-40 hidden sm:block"
          style={{ left: `${x}%`, top: `${y}%` }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <span className="absolute left-1/2 top-1/2 h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/45 bg-white/50 shadow-[0_0_16px_rgba(99,102,241,0.35)] backdrop-blur-[1px]" />
            <span className="absolute left-1/2 top-1/2 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,255,0.7)]" />
            {active && !reduced ? (
              <motion.span
                key="ripple"
                className="absolute left-1/2 top-1/2 h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/70"
                initial={{ scale: 0.6, opacity: 0.85 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.85, ease: "easeOut" }}
              />
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* Toast that slides in from bottom-right of the stage */
export function Toast({
  show,
  icon,
  title,
  body,
  tone = "green",
}: {
  show: boolean;
  icon?: ReactNode;
  title: string;
  body?: string;
  tone?: "green" | "blue";
}) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="absolute bottom-3 right-3 z-30 flex max-w-[280px] items-start gap-2.5 rounded-xl border border-slate-200 bg-white/95 px-3 py-2.5 shadow-[0_12px_30px_-12px_rgba(15,23,42,0.28)] backdrop-blur"
        >
          <span
            className={cn(
              "mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
              tone === "green" ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600",
            )}
          >
            {icon ?? <Check className="h-3 w-3" strokeWidth={3} />}
          </span>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-slate-900">{title}</div>
            {body ? (
              <div className="mt-0.5 text-[11px] leading-snug text-slate-500">{body}</div>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function StepIn({
  show,
  children,
  delay = 0,
  y = 8,
  className,
}: {
  show: boolean;
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.45, ease: EASE, delay: show ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
}

export function MoneyIcon() {
  return <CircleDollarSign className="h-3 w-3" />;
}

/* Small shared workspace toolbar used inside scenes */
export function Toolbar({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 bg-white px-3 py-2">
      {children}
    </div>
  );
}

export function FilterChip({
  children,
  active,
  icon,
}: {
  children: ReactNode;
  active?: boolean;
  icon?: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-[4px] text-[11.5px] font-medium transition-colors duration-500",
        active
          ? "border-blue-500/40 bg-blue-50 text-blue-700"
          : "border-slate-200 bg-white text-slate-500",
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export function Btn({
  children,
  tone = "primary",
  className,
}: {
  children: ReactNode;
  tone?: "primary" | "ghost";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-[5px] text-[11.5px] font-semibold",
        tone === "primary"
          ? "bg-blue-600 text-white shadow-[0_6px_14px_-8px_rgba(37,99,235,0.9)]"
          : "border border-slate-200 bg-white text-slate-600",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* Node used in workflow / sequence canvases */
export function NodeState({ state }: { state: "idle" | "active" | "done" }) {
  if (state === "done")
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
    );
  if (state === "active")
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
        <span className="h-2 w-2 rounded-full bg-blue-600" />
      </span>
    );
  return <span className="h-5 w-5 rounded-full border border-slate-200 bg-slate-50" />;
}
