import { useEffect, useRef } from "react";
import "./RobotAssistant.css";

const ROBOT_SRC = "https://ibb.co/QWZ1MBg";
const EYES_SRC = "/public/images/robot/robot-eyes.png";

const ROBOT_W = 220;
const ROBOT_H = 147;
const ANCHOR_IN = 55;
const OVER_PX = 10;
const DETECT_RADIUS = 300;
const HIDE_MIN_MS = 250;
const HIDE_MAX_MS = 350;
const HIDDEN_MIN_MS = 1500;
const HIDDEN_MAX_MS = 4500;
const APPEAR_MIN_MS = 700;
const APPEAR_MAX_MS = 950;
const WAVE_CHANCE = 0.05;
const WAVE_MIN_MS = 2000;
const WAVE_MAX_MS = 3000;
const INITIAL_DELAY_MS = 700;
const THROTTLE_MS = 32;

type Side = "left" | "right";
type Vert = "top" | "middle" | "bottom";
type Phase = "hidden" | "appearing" | "idle" | "hiding" | "waving";

const SPAWNS: { side: Side; vert: Vert }[] = [
  { side: "left", vert: "top" },
  { side: "left", vert: "middle" },
  { side: "left", vert: "bottom" },
  { side: "right", vert: "top" },
  { side: "right", vert: "middle" },
  { side: "right", vert: "bottom" },
];

const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function RobotAssistant() {
  const robotRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const gazeRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>("hidden");
  const offsetRef = useRef(0);
  const sideRef = useRef<Side>("left");
  const lastSpawnRef = useRef(-1);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const cooldownUntilRef = useRef(0);
  const lastCheckRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;

    const robot = robotRef.current;
    const art = artRef.current;
    const gaze = gazeRef.current;
    if (!robot || !art || !gaze) return;

    robot.style.transform = "translateX(-1000px)";

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const setOffset = (px: number) => {
      offsetRef.current = px;
      robot.style.transform = `translateX(${px}px)`;
    };

    const setGaze = (amount: number) => {
      if (amount <= 0) {
        gaze.style.transform = "";
        return;
      }
      gaze.style.transform = `perspective(600px) translateX(${amount}px) rotateY(${amount * 1.5}deg)`;
    };

    const setWave = (on: boolean) => {
      art.classList.toggle("robot-assistant--waving", on);
    };

    const runTween = (
      from: number,
      to: number,
      duration: number,
      ease: (t: number) => number,
      onUpdate: (value: number) => void,
      onDone: () => void,
    ) => {
      const start = performance.now();
      const step = (now: number) => {
        if (!aliveRef.current) return;
        const t = Math.min(1, (now - start) / duration);
        onUpdate(from + (to - from) * ease(t));
        if (t < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          rafRef.current = null;
          onDone();
        }
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const applySpawn = (index: number) => {
      const spawn = SPAWNS[index];
      sideRef.current = spawn.side;
      const anchor = -ANCHOR_IN;
      if (spawn.side === "left") {
        robot.style.right = "";
        robot.style.left = `${anchor}px`;
      } else {
        robot.style.left = "";
        robot.style.right = `${anchor}px`;
      }
      const jitter = (Math.random() - 0.5) * 24;
      let bottom: number;
      if (spawn.vert === "bottom") {
        bottom = 90 + jitter;
      } else if (spawn.vert === "middle") {
        bottom = window.innerHeight / 2 - ROBOT_H / 2 + jitter;
      } else {
        bottom = window.innerHeight - ROBOT_H - 48 + jitter;
      }
      bottom = Math.max(36, Math.min(bottom, window.innerHeight - ROBOT_H - 24));
      robot.style.bottom = `${bottom}px`;
      art.style.transform = spawn.side === "right" ? "scaleX(-1)" : "";
    };

    const pickSpawn = () => {
      let idx = Math.floor(Math.random() * SPAWNS.length);
      while (idx === lastSpawnRef.current) {
        idx = Math.floor(Math.random() * SPAWNS.length);
      }
      lastSpawnRef.current = idx;
      applySpawn(idx);
      return idx;
    };

    const hiddenX = () => (sideRef.current === "left" ? -ROBOT_W : ROBOT_W);
    const overX = () => (sideRef.current === "left" ? OVER_PX : -OVER_PX);

    const mouseNear = () => {
      const rect = robot.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mouseRef.current.x - cx;
      const dy = mouseRef.current.y - cy;
      return dx * dx + dy * dy <= DETECT_RADIUS * DETECT_RADIUS;
    };

    const hideNow = (onHidden: () => void) => {
      runTween(offsetRef.current, hiddenX(), rand(HIDE_MIN_MS, HIDE_MAX_MS), easeInOutQuad, setOffset, onHidden);
    };

    const waitThenAppear = () => {
      timeoutRef.current = window.setTimeout(appearAt, rand(HIDDEN_MIN_MS, HIDDEN_MAX_MS));
    };

    const appearAt = () => {
      pickSpawn();
      setOffset(hiddenX());
      setGaze(0);
      setWave(false);
      phaseRef.current = "appearing";
      const dur = rand(APPEAR_MIN_MS, APPEAR_MAX_MS);
      runTween(hiddenX(), overX(), dur * 0.7, easeOutCubic, setOffset, () => {
        runTween(overX(), 0, dur * 0.3, easeInOutCubic, setOffset, () => {
          if (Math.random() < WAVE_CHANCE) {
            phaseRef.current = "waving";
            setGaze(6);
            setWave(true);
            timeoutRef.current = window.setTimeout(() => {
              if (phaseRef.current !== "waving") return;
              phaseRef.current = "hiding";
              setWave(false);
              hideNow(() => {
                phaseRef.current = "hidden";
                waitThenAppear();
              });
            }, rand(WAVE_MIN_MS, WAVE_MAX_MS));
            return;
          }
          if (mouseNear()) {
            startHide();
            return;
          }
          phaseRef.current = "idle";
          cooldownUntilRef.current = performance.now() + 300;
        });
      });
    };

    const startHide = () => {
      if (phaseRef.current !== "idle") return;
      phaseRef.current = "hiding";
      hideNow(() => {
        phaseRef.current = "hidden";
        waitThenAppear();
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      const now = performance.now();
      if (now - lastCheckRef.current < THROTTLE_MS) return;
      lastCheckRef.current = now;
      if (phaseRef.current !== "idle") return;
      if (now < cooldownUntilRef.current) return;
      if (mouseNear()) startHide();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    timeoutRef.current = window.setTimeout(appearAt, INITIAL_DELAY_MS);

    return () => {
      aliveRef.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current != null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div ref={robotRef} className="robot" aria-hidden="true">
      <div ref={artRef} className="robot-art">
        <div className="robot-assistant__float">
          <div className="robot-assistant__breathe">
            <div ref={gazeRef} className="robot-assistant__gaze">
              <div className="robot-assistant__wave">
                <div className="robot-assistant__head">
                  <img
                    className="robot-body"
                    src={ROBOT_SRC}
                    alt="Robot"
                    width={1536}
                    height={1024}
                    draggable={false}
                  />
                  <img
                    className="robot-eyes"
                    src={EYES_SRC}
                    alt=""
                    width={1536}
                    height={1024}
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
