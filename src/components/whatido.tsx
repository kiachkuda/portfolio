/**
 * "What I Do" — five large interactive discipline cards, visual-first.
 * Clicking a card scrolls to the matching portfolio/experience section.
 */
import { motion } from "framer-motion";
import { Code2, Clapperboard, PenTool, Gamepad2, Briefcase } from "lucide-react";
import { disciplines } from "../data/portfolio";
import { Reveal } from "../components/effects";

const icons: Record<string, typeof Code2> = {
  web: Code2,
  video: Clapperboard,
  design: PenTool,
  games: Gamepad2,
  experience: Briefcase,
};

export function WhatIDo() {
  return (
    <section id="what-i-do" className="bg-section-b py-24 text-section-b-fg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-coral">What I do</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Five crafts. One creative.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {disciplines.map((d, i) => {
            const Icon = icons[d.id] ?? Code2;
            return (
              <Reveal key={d.id} delay={i * 0.07} className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <motion.button
                  type="button"
                  onClick={() =>
                    document.getElementById(d.anchor)?.scrollIntoView({ behavior: "smooth" })
                  }
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group flex h-full w-full flex-col items-start rounded-3xl border border-cream-border bg-card p-7 text-left shadow-sm transition-colors hover:border-indigo/40 focus-visible:bg-secondary"
                >
                  {/* Animated icon badge */}
                  <motion.div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo text-vanilla"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon size={26} aria-hidden />
                  </motion.div>
                  <h3 className="font-display text-xl font-semibold">{d.title}</h3>
                  <p className="mt-1 font-medium text-indigo dark:text-coral">{d.tagline}</p>
                  {/* Detail line revealed on hover / focus */}
                  <p className="mt-3 max-h-0 overflow-hidden text-sm text-muted-foreground opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100 group-focus-visible:max-h-16 group-focus-visible:opacity-100">
                    {d.detail}
                  </p>
                </motion.button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
