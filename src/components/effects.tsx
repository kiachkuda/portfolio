/**
 * Site-wide effects: scroll reveal, progress bar, custom cursor,
 * loading overlay and the Konami-code mini game (easter egg).
 */
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import logo from "../assets/logo.png";

/* ---------- Scroll reveal wrapper (respects prefers-reduced-motion) ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Scroll progress bar ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-coral"
      style={{ scaleX }}
    />
  );
}

/* ---------- Custom cursor follower (desktop only) ---------- */
export function CursorFollower() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only on devices with a fine pointer
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (reduce) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setActive(!!t?.closest("a, button, [role='button'], input, textarea, select, [data-cursor]"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] rounded-full bg-indigo/25 mix-blend-multiply"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: active ? 56 : 18, height: active ? 56 : 18, opacity: active ? 0.45 : 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    />
  );
}

/* ---------- First-visit loading overlay ---------- */
export function Loader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1100);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-section-a"
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
        >
          <motion.img
            src={logo}
            alt=""
            width={140}
            height={140}
            className="w-32"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 14 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Konami code easter egg: "Pixel Dodge" mini game ---------- */
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

export function EasterEgg() {
  const [open, setOpen] = useState(false);
  const [reduce] = [useReducedMotion()];

  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      idx = k === KONAMI[idx] ? idx + 1 : k === KONAMI[0] ? 1 : 0;
      if (idx === KONAMI.length) {
        setOpen(true);
        idx = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {open && !reduce && <PixelDodge onClose={() => setOpen(false)} />}
    </AnimatePresence>
  );
}

function PixelDodge({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const W = (canvas.width = 420);
    const H = (canvas.height = 320);
    let raf = 0;
    let running = true;

    const player = { x: W / 2 - 14, y: H - 46, w: 28, h: 28, speed: 5, dir: 0 };
    const keys = new Set<string>();
    const onKeyDown = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "a", "d"].includes(e.key)) {
        e.preventDefault();
        keys.add(e.key);
      }
      if (e.key === "Escape") onClose();
    };
    const onKeyUp = (e: KeyboardEvent) => keys.delete(e.key);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    type Block = { x: number; y: number; s: number; v: number };
    let blocks: Block[] = [];
    let spawn = 0;
    let s = 0;

    const loop = (t: number) => {
      if (!running) return;
      // update
      player.dir =
        (keys.has("ArrowLeft") || keys.has("a") ? -1 : 0) +
        (keys.has("ArrowRight") || keys.has("d") ? 1 : 0);
      player.x = Math.max(6, Math.min(W - player.w - 6, player.x + player.dir * player.speed));
      if (t - spawn > 620) {
        blocks.push({
          x: Math.random() * (W - 30) + 4,
          y: -30,
          s: 24 + Math.random() * 8,
          v: 2.2 + Math.random() * 2,
        });
        spawn = t;
      }
      blocks.forEach((b) => (b.y += b.v));
      blocks = blocks.filter((b) => {
        const hit =
          b.x < player.x + player.w && b.x + b.s > player.x &&
          b.y < player.y + player.h && b.y + b.s > player.y;
        if (hit) running = false;
        return b.y < H;
      });
      if (running) s += 1;
      setScoreThrottled(s);

      // draw
      const css = getComputedStyle(document.documentElement);
      const indigo = css.getPropertyValue("--indigo").trim() || "#263BAA";
      const vanilla = css.getPropertyValue("--vanilla").trim() || "#FFF4D6";
      const coral = css.getPropertyValue("--coral").trim() || "#FF6B4A";
      ctx.fillStyle = indigo;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = vanilla;
      ctx.fillRect(player.x, player.y, player.w, player.h);
      ctx.fillStyle = coral;
      blocks.forEach((b) => ctx.fillRect(b.x, b.y, b.s, b.s));
      if (!running) {
        ctx.fillStyle = vanilla;
        ctx.font = "bold 28px 'Space Grotesk', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Game over — press R", W / 2, H / 2);
      }
      raf = requestAnimationFrame(loop);
    };

    let lastSet = 0;
    const setScoreThrottled = (v: number) => {
      if (Date.now() - lastSet > 200) {
        lastSet = Date.now();
        setScore(v);
      }
    };

    const onRestart = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "r" && !running) {
        running = true;
        blocks = [];
        s = 0;
      }
    };
    window.addEventListener("keydown", onRestart);
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onRestart);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[85] flex items-center justify-center bg-deep/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-[460px] rounded-3xl bg-card p-4 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="font-display text-sm font-semibold">
            🎮 Pixel Dodge <span className="text-muted-foreground">· score {score}</span>
          </p>
          <button onClick={onClose} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium hover:bg-secondary/70">
            Close (Esc)
          </button>
        </div>
        <canvas ref={canvasRef} className="w-full rounded-xl" aria-label="Pixel Dodge mini game" />
        <p className="mt-3 text-center text-xs text-muted-foreground">
          ← → / A D to move · R to restart after a crash
        </p>
      </motion.div>
    </motion.div>
  );
}
