/**
 * Skills — grouped visual clusters with animated proficiency bars,
 * plus an infinite marquee strip of tools.
 */
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Code2, Clapperboard, PenTool, Gamepad2, HeartHandshake, Wrench } from "lucide-react";
import { skillGroups, toolbox } from "../data/portfolio";
import { Reveal } from "../components/effects";

const groupIcons: Record<string, typeof Code2> = {
  web: Code2,
  video: Clapperboard,
  design: PenTool,
  games: Gamepad2,
  soft: HeartHandshake,
};

export function Skills() {
  return (
    <section id="skills" className="overflow-hidden bg-section-b py-24 text-section-b-fg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-coral">Skills</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            The toolkit, in numbers
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = groupIcons[g.id] ?? Code2;
            return (
              <Reveal key={g.id} delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-cream-border bg-card p-7 shadow-sm">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo text-vanilla">
                      <Icon size={22} aria-hidden />
                    </span>
                    <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                  </div>
                  <ul className="space-y-4">
                    {g.skills.map((s) => (
                      <SkillBar key={s.name} name={s.name} level={s.level} />
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Marquee tool strip */}
      <div className="mt-16 border-y border-cream-border py-5" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {[...toolbox, ...toolbox].map((t, i) => (
            <span key={i} className="flex items-center gap-2 whitespace-nowrap font-display text-sm font-semibold text-indigo/70 dark:text-vanilla/60">
              <Wrench size={14} className="text-coral" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Bar fills when scrolled into view */
function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  return (
    <li ref={ref}>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo to-coral"
          initial={{ width: reduce ? `${level}%` : 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
      </div>
    </li>
  );
}
