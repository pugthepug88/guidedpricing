import { cn } from "@/lib/utils";

export const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
export const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
export const EASE = [0.22, 1, 0.36, 1] as const;
export const CONTACT_COLS = "26px minmax(0,1.85fr) 128px minmax(0,1.55fr) 92px 82px 112px";

const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";
const SARAH_CELL = 0;
const SARAH_BG = "#C89A5D";

export function RevenueAvatar({ size = 30, className = "" }: { size?: number; className?: string }) {
  const column = SARAH_CELL % 6;
  const row = Math.floor(SARAH_CELL / 6);
  const backgroundPosition = `${(column / 5) * 100}% ${(row / 3) * 100}%`;
  return (
    <span
      aria-hidden="true"
      className={cn("block shrink-0 overflow-hidden rounded-full ring-1 ring-black/[0.06] shadow-[0_6px_18px_rgba(61,49,39,.10)]", className)}
      style={{
        width: size,
        height: size,
        backgroundColor: SARAH_BG,
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition,
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
      }}
    />
  );
}

export function SarahIdentity({ detail, size = 30 }: { detail?: string; size?: number }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <RevenueAvatar size={size} />
      <div className="min-w-0">
        <div className="truncate text-[12px] font-bold tracking-tight text-slate-900">Sarah Nguyen</div>
        {detail ? <div className="truncate text-[9.5px] font-medium text-slate-400">{detail}</div> : null}
      </div>
    </div>
  );
}
