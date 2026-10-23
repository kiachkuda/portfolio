/**
 * Portfolio — filter tabs, project grid with category-tailored hover
 * effects, and a detail modal (image, description, role, tools, link).
 *
 * Project data lives in src/data/portfolio.ts.
 */
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Globe, X, ArrowUpRight, Sparkles } from "lucide-react";
import { projects, projectFilters, type Category } from "../data/portfolio";
import { Reveal } from "../components/effects";

type Filter = (typeof projectFilters)[number]["id"];

export function Work() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="work" className="bg-section-a py-24 text-section-a-fg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-coral">Selected work</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Projects I&apos;m proud of
          </h2>
        </Reveal>

        {/* Filter tabs */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {projectFilters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  filter === f.id
                    ? "bg-vanilla text-indigo shadow"
                    : "border border-vanilla/30 text-vanilla/80 hover:bg-vanilla/10 hover:text-vanilla"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
                className="group overflow-hidden rounded-3xl bg-vanilla/95 text-indigo shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => setSelected(p)}
                  className="block w-full text-left focus-visible:outline-offset-4"
                  aria-label={`Open details for ${p.title}`}
                >
                  {/* Thumbnail with category-tailored hover */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    <img
                      src={p.image}
                      alt={`${p.title} — ${p.short}`}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="h-full w-full object-cover transition-transform duration-500"
                      data-hover-anim={p.category}
                    />
                    {/* Web: browser-frame chrome overlay */}
                    {p.category === "web" && (
                      <div className="absolute inset-x-4 top-3 flex gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {["bg-coral", "bg-yellow-400", "bg-green-500"].map((c, i) => (
                          <span key={i} className={`h-2.5 w-2.5 rounded-full ${c}`} />
                        ))}
                      </div>
                    )}
                    {/* Video: play badge; real preview: swap in a <video muted autoplay loop> on hover */}
                    {p.category === "video" && (
                      <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-coral text-vanilla shadow-xl">
                          <Play size={24} className="ml-0.5" aria-hidden />
                        </span>
                      </span>
                    )}
                    {/* Games: "Play" badge always visible on hover */}
                    {p.category === "games" && (
                      <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-coral px-3 py-1 text-xs font-bold uppercase tracking-wide text-vanilla opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100">
                        <GamepadIcon /> Play
                      </span>
                    )}
                    {/* Design: image zoom handled via group-hover scale below */}
                  </div>

                  <div className="p-5">
                    <span className="text-xs font-bold uppercase tracking-widest text-coral">
                      {p.category}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-semibold leading-snug">{p.title}</h3>
                    <p className="mt-1 text-sm text-indigo/70">{p.short}</p>
                  </div>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Repeated CTA */}
        <Reveal className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-vanilla px-7 py-3.5 font-semibold text-indigo transition hover:bg-coral hover:text-vanilla"
          >
            <Sparkles size={18} aria-hidden />
            Have a project in mind?
          </a>
        </Reveal>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

function GamepadIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
      <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01" strokeLinecap="round" />
      <path d="M17.32 5H6.68a4 4 0 0 0-3.98 3.59L2 17a2 2 0 0 0 3.3 1.53L8.5 16h7l3.2 2.53A2 2 0 0 0 22 17l-.7-8.41A4 4 0 0 0 17.32 5z" />
    </svg>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[number];
  onClose: () => void;
}) {
  // Lock page scroll while open
  useState(() => {
    document.body.style.overflow = "hidden";
  });
  const unlock = () => {
    document.body.style.overflow = "";
    onClose();
  };
  return (
    <motion.div
      className="fixed inset-0 z-[75] flex items-center justify-center bg-deep/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={unlock}
      role="dialog"
      aria-modal="true"
      aria-label={`About ${project.title}`}
    >
      <motion.div
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-card p-6 shadow-2xl sm:p-8"
        initial={{ scale: 0.92, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-coral">{project.category}</span>
            <h3 className="mt-1 font-display text-2xl font-bold">{project.title}</h3>
          </div>
          <button
            onClick={unlock}
            aria-label="Close project details"
            className="rounded-full bg-secondary p-2 transition hover:bg-secondary/70"
          >
            <X size={20} aria-hidden />
          </button>
        </div>

        <img
          src={project.image}
          alt={`${project.title} preview`}
          width={1024}
          height={768}
          className="mt-5 w-full rounded-2xl object-cover"
          loading="lazy"
        />

        <p className="mt-5 text-foreground/85">{project.description}</p>

        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-coral">My role</dt>
            <dd className="mt-1 text-foreground/80">{project.role}</dd>
          </div>
          <div>
            <dt className="font-semibold text-coral">Tools</dt>
            <dd className="mt-1 flex flex-wrap gap-1.5">
              {project.tools.map((t) => (
                <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                  {t}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo px-6 py-3 font-semibold text-vanilla transition hover:bg-coral"
        >
          {project.category === "web" ? <Globe size={18} aria-hidden /> : <ArrowUpRight size={18} aria-hidden />}
          {project.category === "web" ? "Visit live site" : project.category === "games" ? "Play on itch.io" : "Watch the video"}
        </a>
      </motion.div>
    </motion.div>
  );
}
