import { motion, AnimatePresence } from "motion/react";
import type { ReactNode } from "react";
import {
  Bell,
  CalendarDays,
  Check,
  CircleDollarSign,
  FileText,
  Inbox,
  LayoutGrid,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Settings,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/zapla-logo-green.png.asset.json";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* App shell                                                           */
/* ------------------------------------------------------------------ */

const RAIL = [
  { icon: LayoutGrid, key: "enquiries" },
  { icon: Inbox, key: "inbox" },
  { icon: CalendarDays, key: "bookings" },
  { icon: Workflow, key: "automations" },
  { icon: Users, key: "winback" },
  { icon: Zap, key: "marketing" },
  { icon: FileText, key: "proposals" },
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
    <div className="flex h-full w-full overflow-hidden rounded-[18px] bg-white">
      {/* icon rail */}
      <div className="hidden w-[52px] shrink-0 flex-col items-center gap-1 border-r border-slate-200/80 bg-slate-50/80 py-3 sm:flex">
        <img src={logo.url} alt="Zapla" className="mb-2 h-6 w-6 rounded-[7px]" />
        {RAIL.map(({ icon: Icon, key }) => {
          const on = key === activeKey;
          return (
            <div
              key={key}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-[9px] transition-colors duration-500",
                on ? "bg-blue-600/10 text-blue-600" : "text-slate-400",
              )}
            >
              <Icon className="h-[15px] w-[15px]" strokeWidth={2} />
            </div>
          );
        })}
        <div className="mt-auto flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-[9px] font-semibold text-slate-500">
          AZ
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* top bar */}
        <div className="flex h-[46px] shrink-0 items-center gap-3 border-b border-slate-200/80 px-3 sm:px-4">
          <div className="min-w-0">
            <div className="truncate text-[13px] font-semibold tracking-tight text-slate-900">
              {title}
            </div>
            {subtitle ? (
              <div className="truncate text-[10px] text-slate-400">{subtitle}</div>
            ) : null}
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="hidden h-6 items-center gap-1.5 rounded-md border border-slate-200 px-2 text-[10px] text-slate-400 md:flex">
              <Search className="h-3 w-3" />
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

        <div className="relative min-h-0 flex-1 bg-[#FAFBFF]">{children}</div>
      </div>
    </div>
  );
}

function IconBtn({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-md border border-slate-200 text-slate-400">
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
        "inline-flex items-center gap-1 rounded-full px-2 py-[2px] text-[9.5px] font-medium leading-none",
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
  size = 24,
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
  size = 16,
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
          className="absolute bottom-3 right-3 z-30 flex max-w-[260px] items-start gap-2.5 rounded-xl border border-slate-200 bg-white/95 px-3 py-2.5 shadow-[0_12px_30px_-12px_rgba(15,23,42,0.28)] backdrop-blur"
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
            <div className="text-[11px] font-semibold text-slate-900">{title}</div>
            {body ? (
              <div className="mt-0.5 text-[10px] leading-snug text-slate-500">{body}</div>
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
