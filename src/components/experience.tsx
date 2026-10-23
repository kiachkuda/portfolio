/**
 * Experience — vertical timeline with animated entries.
 * Job data lives in src/data/portfolio.ts.
 */
import { motion } from "framer-motion";
import { Briefcase, Clapperboard, PenTool, MapPin } from "lucide-react";
import { jobs } from "../data/portfolio";
import { Reveal } from "../components/effects";

const jobIcons: Record<string, typeof Briefcase> = {
  briefcase: Briefcase,
  clapperboard: Clapperboard,
  pentool: PenTool,
};

export function Experience() {
  return (
    <section id="experience" className="bg-section-a py-24 text-section-a-fg">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-coral">Experience</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Where I&apos;ve worked</h2>
        </Reveal>

        <ol className="relative mt-14 space-y-12 before:absolute before:left-[27px] before:top-2 before:h-[calc(100%-2rem)] before:w-0.5 before:bg-vanilla/20 sm:before:left-1/2 sm:before:-translate-x-1/2">
          {jobs.map((job, i) => {
            const Icon = jobIcons[job.icon] ?? Briefcase;
            const right = i % 2 === 1;
            return (
              <li key={job.company} className="relative sm:grid sm:grid-cols-2 sm:gap-10">
                {/* Node icon */}
                <motion.div
                  className="absolute left-0 top-0 z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-vanilla text-indigo shadow-lg sm:left-1/2 sm:-translate-x-1/2"
                  whileHover={{ rotate: -8, scale: 1.05 }}
                >
                  <Icon size={24} aria-hidden />
                </motion.div>

                <Reveal
                  className={`ml-20 sm:ml-0 ${right ? "sm:col-start-2" : "sm:col-start-1 sm:text-right"}`}
                  delay={i * 0.08}
                >
                  <div className="rounded-3xl border border-vanilla/20 bg-vanilla/10 p-6 backdrop-blur-sm">
                    <p className="text-sm font-semibold text-coral">{job.period}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold">{job.role}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-vanilla/80 sm:justify-inherit">
                      <span className={right ? "" : "sm:order-2"}>{job.company}</span>
                      <span className="inline-flex items-center gap-1 text-vanilla/60">
                        <MapPin size={13} aria-hidden />
                        {job.location}
                      </span>
                    </p>
                    <ul className={`mt-4 space-y-2 text-sm text-vanilla/85 ${right ? "" : "sm:text-right"}`}>
                      {job.achievements.map((a) => (
                        <li key={a} className={right ? "" : "sm:flex sm:justify-end"}>
                          <span className="mr-2 text-coral" aria-hidden>▸</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
