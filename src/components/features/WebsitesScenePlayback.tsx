import { useEffect, useState, type RefObject } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useScenePlayback, sceneProgress } from "./useWebsitesScenePlayback";

export function ScenePlaybackControl({
  player,
  name,
}: {
  player: ReturnType<typeof useScenePlayback>;
  name: string;
}) {
  if (player.staticView) return null;
  const action = player.finished ? "Replay" : player.paused ? "Resume" : "Pause";
  const Icon = player.finished ? RotateCcw : player.paused ? Play : Pause;
  return (
    <button
      className="wff-scene-control"
      type="button"
      aria-label={`${action} ${name}`}
      onClick={player.finished ? player.restart : player.togglePause}
    >
      <Icon size={13} aria-hidden="true" /> {action}
    </button>
  );
}

export function SceneCursor({
  host,
  target,
  elapsed,
  clickAt,
}: {
  host: RefObject<HTMLDivElement | null>;
  target: string;
  elapsed: number;
  clickAt: number;
}) {
  const [point, setPoint] = useState({ x: 50, y: 50 });
  useEffect(() => {
    const element = host.current;
    const destination = element?.querySelector(target);
    if (!element || !destination) return;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      const rect = element.getBoundingClientRect();
      const box = destination.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      setPoint({
        x: ((box.left + box.width / 2 - rect.left) / rect.width) * 100,
        y: ((box.top + box.height / 2 - rect.top) / rect.height) * 100,
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    observer.observe(destination);
    document.fonts.ready.then(measure);
    measure();
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, [host, target]);
  const travel = sceneProgress(elapsed, clickAt - 650, 500);
  const eased = travel * travel * (3 - 2 * travel);
  const pulse = sceneProgress(elapsed, clickAt - 100, 400);
  const visible = elapsed > clickAt - 650 && elapsed < clickAt + 420;
  return (
    <span
      className="wff-scene-cursor"
      aria-hidden="true"
      style={{
        left: `${point.x + (1 - eased) * 7}%`,
        top: `${point.y + (1 - eased) * 8}%`,
        opacity: visible ? 1 : 0,
      }}
    >
      <i
        style={{
          opacity: elapsed < clickAt - 100 ? 0 : 1 - pulse,
          transform: `translate(-50%, -50%) scale(${0.4 + pulse})`,
        }}
      />
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
        <path
          d="M2 1.5V21L7.2 16.2L11.4 24L15 22.1L10.9 14.6L18 13.8L2 1.5Z"
          fill="white"
          stroke="#24344D"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
