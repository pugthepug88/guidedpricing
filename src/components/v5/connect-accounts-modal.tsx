/* Connect social accounts modal used inside the v5 Social Planner scene.
   Neutral Zapla surface so the platform brand marks stay recognisable. */
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "./motion-kit";
import {
  FacebookMark,
  GoogleBusinessMark,
  InstagramMark,
  LinkedInMark,
  PinterestMark,
  TikTokMark,
} from "./social-brands";

export type PlatformId = "facebook" | "instagram" | "linkedin" | "tiktok" | "pinterest" | "gbp";

export const PLATFORMS: {
  id: PlatformId;
  name: string;
  Mark: (p: { size?: number; className?: string }) => React.ReactElement;
}[] = [
  { id: "facebook", name: "Facebook", Mark: FacebookMark },
  { id: "instagram", name: "Instagram", Mark: InstagramMark },
  { id: "linkedin", name: "LinkedIn", Mark: LinkedInMark },
  { id: "tiktok", name: "TikTok", Mark: TikTokMark },
  { id: "pinterest", name: "Pinterest", Mark: PinterestMark },
  { id: "gbp", name: "Google Business", Mark: GoogleBusinessMark },
];

export function ConnectAccountsModal({
  show,
  connected,
  reduced,
  registerTile,
}: {
  show: boolean;
  connected: PlatformId[];
  reduced: boolean;
  registerTile?: (id: PlatformId, el: HTMLDivElement | null) => void;
}) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="absolute inset-0 z-40 flex items-center justify-center p-3"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.28, ease: EASE_OUT }}
        >
          <div className="absolute inset-0 bg-slate-900/25 backdrop-blur-[3px]" />
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 26, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: reduced ? 0 : 0.45, ease: EASE_OUT }}
            className="relative w-full max-w-[560px] rounded-[20px] border border-slate-200/80 bg-white p-5 shadow-[0_44px_110px_-32px_rgba(15,23,42,0.5)] sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[16.5px] font-extrabold tracking-tight text-slate-900">
                  Connect social accounts
                </div>
                <div className="mt-1 text-[12.5px] font-medium text-slate-500">
                  Publish once, Zapla posts everywhere you sell.
                </div>
              </div>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-400">
                <X className="h-3.5 w-3.5" />
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3.5">
              {PLATFORMS.map(({ id, name, Mark }) => {
                const on = connected.includes(id);
                return (
                  <div
                    key={id}
                    ref={(el) => registerTile?.(id, el)}
                    className={cn(
                      "rounded-[15px] border bg-white p-3.5 transition-colors duration-300",
                      on ? "border-emerald-300/90 bg-emerald-50/40" : "border-slate-200",
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Mark size={28} />
                      <div className="min-w-0 truncate text-[12.5px] font-bold tracking-tight text-slate-800">
                        {name}
                      </div>
                    </div>
                    <div className="mt-3">
                      <AnimatePresence mode="popLayout" initial={false}>
                        {on ? (
                          <motion.span
                            key="on"
                            initial={reduced ? false : { opacity: 0, y: 8, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: reduced ? 0 : 0.35, ease: EASE_OUT }}
                            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white"
                          >
                            <Check className="h-3 w-3" strokeWidth={3} />
                            Connected
                          </motion.span>
                        ) : (
                          <motion.span
                            key="off"
                            initial={false}
                            exit={{ opacity: 0, y: -8, scale: 0.92 }}
                            transition={{ duration: reduced ? 0 : 0.25, ease: EASE_OUT }}
                            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-600"
                          >
                            Connect
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="text-[11.5px] font-medium text-slate-400">
                {connected.length} of {PLATFORMS.length} connected
              </span>
              <span className="rounded-full bg-zapla-blue px-4 py-2 text-[12px] font-bold text-white">
                Done
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
