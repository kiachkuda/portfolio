/**
 * Hero — the 5-second explainer: name, typewriter line, discipline toolkit,
 * CTAs, animated background and a scroll-down indicator.
 */
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Clapperboard,
  PenTool,
  Gamepad2,
  Briefcase,
  ChevronDown,
  Download,
  ArrowRight,
} from "lucide-react";
import { profile, typewriterLines } from "../data/portfolio";

const toolkit = [
  { icon: Code2, label: "Web dev" },
  { icon: Clapperboard, label: "Video" },
  { icon: PenTool, label: "Design" },
  { icon: Gamepad2, label: "Games" },
  { icon: Briefcase, label: "Experience" },
];

/* Typewriter that cycles through the lines */
function useTypewriter(lines: string[]) {
  const [text, setText] = useState("");
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) {
      setText(lines[0] ?? "");
      return;
    }
    let line = 0,
      char = 0,
      deleting = false,
      timer: number;
    const tick = () => {
      const current = lines[line] ?? lines[0] ?? "";
      if (!deleting) {
        char++;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1600);
          return;
        }
        timer = window.setTimeout(tick, 65);
      } else {
        char--;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          line = (line + 1) % lines.length;
          timer = window.setTimeout(tick, 350);
          return;
        }
        timer = window.setTimeout(tick, 32);
      }
    };
    timer = window.setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [lines, reduce]);
  return text;
}

export function Hero() {
  const typed = useTypewriter(typewriterLines);

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden bg-section-a text-section-a-fg"
    >
      {/* Animated background: floating shapes + grid */}
      <div aria-hidden className="w-full absolute inset-0">
        <div
          className="w-full absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--vanilla) 1px, transparent 1px), linear-gradient(90deg, var(--vanilla) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <motion.div
          className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-vanilla/10 blur-2xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-10 top-1/3 h-16 w-16 rounded-2xl bg-coral/60"
          animate={{ y: [0, -24, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-16 h-10 w-10 rounded-full border-4 border-vanilla/30"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-24 right-1/4 h-24 w-24 rounded-full bg-vanilla/10"
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-vanilla/25 px-4 py-1.5 text-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral" />
            </span>
            {profile.availability}
          </p>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            {profile.name}
            <span className="text-coral">.</span>
          </h1>

          <p className="mt-5 flex min-h-12 items-center font-display text-2xl text-vanilla/90 sm:text-3xl">
            <span>{typed}</span>
            <span
              className="ml-1 inline-block h-7 w-[3px] animate-pulse rounded bg-coral sm:h-8"
              aria-hidden
            />
          </p>

          <p className="mt-5 max-w-xl text-lg text-vanilla/75">
            Multidisciplinary creative — websites, videos, brands and games,
            built with equal parts craft and curiosity.
          </p>

          {/* Discipline toolkit strip */}
          <ul
            className="mt-8 flex flex-wrap gap-3"
            aria-label="Creative toolkit"
          >
            {toolkit.map(({ icon: Icon, label }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.09 }}
              >
                <div
                  className="flex items-center gap-2 rounded-2xl border border-vanilla/20 bg-vanilla/10 px-4 py-2.5 backdrop-blur-sm transition-colors hover:bg-vanilla/20"
                  data-cursor
                  tabIndex={0}
                >
                  <Icon size={20} className="text-coral" aria-hidden />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-vanilla px-7 py-3.5 font-semibold text-indigo shadow-lg transition hover:bg-coral hover:text-vanilla"
            >
              View my work
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </a>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border-2 border-vanilla/40 px-7 py-3.5 font-semibold text-section-a-fg transition hover:border-coral hover:text-coral"
            >
              <Download size={18} aria-hidden />
              Download CV
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll-down indicator */}
      <motion.a
        href="#what-i-do"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full p-2 text-vanilla/70 hover:text-vanilla"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={26} aria-hidden />
      </motion.a>
    </section>
  );
}
