/**
 * Footer — minimal: back to top, copyright, builder credit,
 * plus a cheeky hint at the hidden easter egg.
 */
import { ArrowUp } from "lucide-react";
import { profile } from "../data/portfolio";

export function Footer() {
  return (
    <footer className="bg-deep py-10 text-vanilla/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        <div className="text-center text-sm sm:text-left">
          <p>© {new Date().getFullYear()} {profile.name}. Designed &amp; built by me.</p>
          <p className="mt-1 text-xs text-vanilla/40">PS: old-school gamers, try the Konami code. ↑↑↓↓←→←→BA</p>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-vanilla text-indigo shadow-lg transition hover:bg-coral hover:text-vanilla"
          aria-label="Back to top"
        >
          <ArrowUp size={20} aria-hidden />
        </button>
      </div>
    </footer>
  );
}
