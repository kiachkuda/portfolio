/**
 * Sticky navigation: blur on scroll, active-section highlighting,
 * mobile hamburger menu, theme toggle and "Let's talk" CTA.
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import logo from "../assets/logo.png";
import { profile } from "../data/portfolio";

export const sections = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "cv", label: "CV" },
  { id: "contact", label: "Contact" },
];

export function Nav({ theme, onToggleTheme }: { theme: "light" | "dark"; onToggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-section-a/80 shadow-lg shadow-deep/10 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <a href="#top" className="flex items-center gap-2.5" data-cursor>
          <img src={logo} alt={`${profile.name} logo`} width={64} height={64} className="h-9 w-9 rounded-lg bg-vanilla p-1" />
          <span className="font-display text-lg font-bold tracking-tight text-section-a-fg">
            {profile.firstName}
            <span className="text-coral">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active === id
                    ? "text-section-a-fg"
                    : "text-section-a-fg/70 hover:text-section-a-fg"
                }`}
              >
                {label}
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-vanilla/15"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
            className="rounded-full p-2 text-section-a-fg/80 transition hover:bg-vanilla/15 hover:text-section-a-fg"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <a
            href="#contact"
            className="hidden rounded-full bg-vanilla px-4 py-2 text-sm font-semibold text-indigo shadow-sm transition hover:bg-coral hover:text-vanilla sm:inline-block"
          >
            Let&apos;s talk
          </a>
          <button
            className="rounded-full p-2 text-section-a-fg md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden bg-section-a/95 backdrop-blur-md md:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {sections.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-2.5 font-medium ${
                      active === id ? "bg-vanilla/15 text-section-a-fg" : "text-section-a-fg/80"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-xl bg-vanilla px-4 py-2.5 text-center font-semibold text-indigo"
                >
                  Let&apos;s talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
