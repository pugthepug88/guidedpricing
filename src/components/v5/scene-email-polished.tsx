import { SceneEmailDirect } from "./scene-email-direct";
import { type SceneProps } from "./motion-kit";

export function SceneEmailPolished(props: SceneProps) {
  return (
    <div className="email-carousel-transparent absolute inset-0 overflow-hidden">
      <style>{`
        .email-carousel-transparent div[class*="right-[1%]"][class*="w-[49%]"][class*="bg-[#f7f8fb]"] {
          background: transparent !important;
        }
      `}</style>
      <SceneEmailDirect {...props} />
    </div>
  );
}
