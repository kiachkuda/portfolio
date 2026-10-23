/**
 * About — portrait, bio, quick facts, animated counters and fun facts.
 */
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { MapPin, Languages, Clock } from "lucide-react";
import { profile } from "../data/portfolio";
import { Reveal } from "../components/effects";


/* Counter that animates when scrolled into view */
function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <div ref={ref} className="rounded-2xl border border-cream-border bg-card p-5 text-center shadow-sm">
      <p className="font-display text-4xl font-bold text-indigo">
        {n}
        <span className="text-coral">{suffix}</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="bg-section-b py-24 text-section-b-fg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Portrait */}
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              <div aria-hidden className="absolute -inset-3 -rotate-2 rounded-3xl border-2 border-cream-border" />
              
              <span className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-card px-4 py-2 text-sm font-semibold shadow-lg">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                {profile.availability}
              </span>
            </div>
          </Reveal>

          {/* Bio + facts */}
          <div>
            <Reveal>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-coral">About me</p>
              <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Hi, I&apos;m {profile.firstName} 👋
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/85">{profile.bio}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-6 flex flex-wrap gap-3 text-sm">
                <li className="flex items-center gap-2 rounded-full border border-cream-border bg-card px-4 py-2">
                  <MapPin size={16} className="text-coral" aria-hidden /> {profile.location}
                </li>
                <li className="flex items-center gap-2 rounded-full border border-cream-border bg-card px-4 py-2">
                  <Languages size={16} className="text-coral" aria-hidden /> {profile.languages.join(" · ")}
                </li>
                <li className="flex items-center gap-2 rounded-full border border-cream-border bg-card px-4 py-2">
                  <Clock size={16} className="text-coral" aria-hidden /> Flexible hours (EAT / UTC+3)
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {profile.counters.map((c) => (
                  <Counter key={c.label} {...c} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 rounded-3xl border border-cream-border bg-card p-6">
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-coral">
                  Currently
                </h3>
                <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  {profile.funFacts.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span aria-hidden>✦</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
