/**
 * Testimonials — simple, accessible carousel with 3 quotes.
 * Quotes live in src/data/portfolio.ts.
 */
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../data/portfolio";
import { Reveal } from "../components/effects";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((next: number, direction: number) => {
    setDir(direction);
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance every 7s; pause is unnecessary since it's short content
  useEffect(() => {
    const t = setInterval(() => go(index + 1, 1), 7000);
    return () => clearInterval(t);
  }, [index, go]);

  const t = testimonials[index] ?? testimonials[0]!;

  return (
    <section id="testimonials" className="bg-section-b py-24 text-section-b-fg">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-coral">Testimonials</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Kind words</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-12 rounded-3xl border border-cream-border bg-card p-8 shadow-sm sm:p-10">
            <Quote size={36} className="mx-auto mb-5 text-coral" aria-hidden />
            <div aria-live="polite" className="min-h-32">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.blockquote
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-lg leading-relaxed text-foreground/90">“{t.quote}”</p>
                  <footer className="mt-5">
                    <p className="font-display font-semibold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.title}</p>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => go(index - 1, -1)}
                aria-label="Previous testimonial"
                className="rounded-full bg-secondary p-2.5 transition hover:bg-coral hover:text-vanilla"
              >
                <ChevronLeft size={20} aria-hidden />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i, i > index ? 1 : -1)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2.5 w-2.5 rounded-full transition ${i === index ? "scale-125 bg-coral" : "bg-indigo/25"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => go(index + 1, 1)}
                aria-label="Next testimonial"
                className="rounded-full bg-secondary p-2.5 transition hover:bg-coral hover:text-vanilla"
              >
                <ChevronRight size={20} aria-hidden />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
