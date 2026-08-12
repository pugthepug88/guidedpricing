import { motion, AnimatePresence } from "motion/react";
import type { ReactNode } from "react";
import {
  Bell,
  CalendarDays,
  Check,
  CircleDollarSign,
  FileText,
  Inbox,
  Mail,
  MessageSquare,
  Megaphone,
  Phone,
  Search,
  Settings,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/zapla-logo-green.png.asset.json";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* App shell                                                           */
/* ------------------------------------------------------------------ */

const RAIL = [
  { icon: Users, key: "contacts", label: "Contacts" },
  { icon: Target, key: "opportunities", label: "Opportunities" },
  { icon: Inbox, key: "inbox", label: "Inbox" },
  { icon: Workflow, key: "automations", label: "Automations" },
  { icon: Megaphone, key: "social", label: "Social" },
  { icon: Mail, key: "email", label: "Email" },
  { icon: CalendarDays, key: "bookings", label: "Bookings" },
  { icon: FileText, key: "documents", label: "Documents" },
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
      {/* dark navigation rail */}
      <div className="hidden w-[64px] shrink-0 flex-col items-center gap-1 bg-[#0B1526] py-3 sm:flex">
        <img src={logo.url} alt="Zapla" className="mb-3 h-7 w-7 rounded-[8px]" />
        {RAIL.map(({ icon: Icon, key, label }) => {
          const on = key === activeKey;
          return (
            <div
              key={key}
              className={cn(
                "flex w-[52px] flex-col items-center gap-[3px] rounded-[10px] py-1.5 transition-colors duration-500",
                on ? "bg-white/10 text-white" : "text-slate-400/70",
              )}
            >
              <Icon className="h-[16px] w-[16px]" strokeWidth={1.9} />
              <span className="text-[8px] font-medium leading-none">{label}</span>
            </div>
          );
        })}
        <div className="mt-auto flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-[9px] font-semibold text-white/80">
          AZ
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* top bar */}
        <div className="flex h-[50px] shrink-0 items-center gap-3 border-b border-slate-200/80 px-3 sm:px-4">
          <div className="min-w-0">
            <div className="truncate text-[14px] font-semibold tracking-tight text-slate-900">
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

        <div className="relative min-h-0 flex-1 bg-[#F7F9FC]">{children}</div>
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

export function Avatar({
  name,
  tone = "bg-blue-100 text-blue-700",
  size = 26,
}: {
  name: string;
  tone?: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold",
        tone,
      )}
    >
      {initials}
    </span>
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
      icon: MessageSquare,
    },
    messenger: { cls: "bg-blue-500 text-white", icon: MessageSquare },
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

/* Animated cursor pointer */
export function Cursor({
  x,
  y,
  clicking,
  reduced,
}: {
  x: number;
  y: number;
  clicking?: boolean;
  reduced?: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-40 hidden sm:block"
      initial={false}
      animate={{ left: `${x}%`, top: `${y}%` }}
      transition={{ duration: reduced ? 0 : 0.85, ease: EASE }}
    >
      <div className="relative -translate-x-1 -translate-y-1">
        <svg width="18" height="18" viewBox="0 0 18 18" className="drop-shadow-sm">
          <path
            d="M2 1.5 L14.5 9 L9 10 L7.5 16 Z"
            fill="white"
            stroke="#0f172a"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
        <AnimatePresence>
          {clicking && !reduced ? (
            <motion.span
              className="absolute -left-2 -top-2 h-7 w-7 rounded-full border-2 border-blue-500/60"
              initial={{ scale: 0.3, opacity: 0.9 }}
              animate={{ scale: 1.15, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
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
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-[4px] text-[11px] font-medium transition-colors duration-400",
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
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-[5px] text-[11px] font-semibold",
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
