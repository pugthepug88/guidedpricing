import { SceneAutomations as AutomationsScene } from "./scene-automations";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

export function SceneAutomationsLive(props: SceneProps) {
  const { phase, reduced } = props;

  const points: Record<number, CursorPoint> = {
    1: { left: "50%", top: "16%" },
    2: { left: "50%", top: "29%" },
    3: { left: "50%", top: "40%" },
    4: { left: "50%", top: "52%" },
    5: { left: "24%", top: "69%" },
    6: { left: "24%", top: "80%" },
    7: { left: "24%", top: "90%" },
    8: { left: "67%", top: "90%" },
  };

  const point = points[phase] ?? null;
  const press = phase >= 1 && phase <= 8;

  return (
    <div className="automation-cursor-fix absolute inset-0 overflow-hidden">
      <style>{`.automation-cursor-fix span.pointer-events-none.absolute.left-0.top-0.z-30.h-\\[9px\\].w-\\[9px\\] { display: none !important; }`}</style>
      <AutomationsScene {...props} />
      <ZaplaDemoCursor point={point} press={press} reduced={reduced} />
    </div>
  );
}
