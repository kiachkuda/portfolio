
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Nav } from "../components/nav";
import { Hero } from "../components/hero";
import { WhatIDo } from "../components/whatido";
import { Work } from "../components/work";
import { Skills } from "../components/skills";
import { Experience } from "../components/experience";
import { About } from "../components/about";
import { CVSection } from "../components/cv-section";
import { Testimonials } from "../components/testimonials";
import { Contact } from "../components/contact";
import { Footer } from "../components/footer";
import { CursorFollower, EasterEgg, Loader, ScrollProgress } from "../components/effects";
import { profile } from "../data/portfolio";


export function Index() {
  // Theme: light (vanilla-dominant) / dark (indigo-dominant).
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Loader />
      <ScrollProgress />
      <CursorFollower />
      <EasterEgg />
      <Nav theme={theme} onToggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))} />

     
        <Hero />
        <WhatIDo />
        <Work />
        <Skills />
        <Experience />
        <About />
        <CVSection />
        <Testimonials />
        <Contact />
    
      <Footer />

      <Toaster position="bottom-right" richColors />
    </>
  );
}
