/**
 * CV section — on-page résumé preview + prominent PDF download.
 * The actual file is public/cv.pdf (replace it with your real CV).
 */
import { Download, ExternalLink, GraduationCap, Award } from "lucide-react";
import { jobs, profile } from "../data/portfolio";
import { Reveal } from "../components/effects";

export function CVSection() {
  return (
    <section id="cv" className="bg-section-a py-24 text-section-a-fg">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-coral">CV / Résumé</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            The one-page version
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-10 rounded-3xl bg-vanilla/95 p-7 text-indigo shadow-xl sm:p-10 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-lg font-bold">Experience highlights</h3>
              <ul className="mt-4 space-y-4">
                {jobs.map((j) => (
                  <li key={j.company} className="border-l-2 border-indigo/30 pl-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-coral">{j.period}</p>
                    <p className="font-semibold">{j.role}</p>
                    <p className="text-sm text-indigo/70">{j.company}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-start gap-3 text-sm">
                <Award size={18} className="mt-0.5 shrink-0 text-coral" aria-hidden />
                <p>
                  <span className="font-semibold">Certifications:</span> Google UX Design Certificate ·
                  Adobe Certified Professional {/* TODO: your real certifications */}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold">Education</h3>
              <div className="mt-4 flex items-start gap-3 text-sm">
                <GraduationCap size={18} className="mt-0.5 shrink-0 text-coral" aria-hidden />
                <p>
                  <span className="font-semibold">BSc Computer Science</span>
                  <br />
                  University of Nairobi · 2019–2023{" "}
                  <span className="text-indigo/60">
                    {/* TODO: your real degree & school */}
                  </span>
                </p>
              </div>

              <h3 className="mt-8 font-display text-lg font-bold">Contact</h3>
              <p className="mt-3 text-sm leading-relaxed text-indigo/80">
                {profile.email}
                <br />
                {profile.location} · {profile.availability}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/cv.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-indigo px-7 py-3.5 font-semibold text-vanilla shadow-lg transition hover:bg-coral"
                >
                  <Download size={18} aria-hidden />
                  Download CV (PDF)
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-indigo/30 px-7 py-3.5 font-semibold text-indigo transition hover:border-coral hover:text-coral"
                >
                  <ExternalLink size={18} aria-hidden />
                  View online
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
