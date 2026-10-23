
// --- Images (keep the imports, just swap the files in src/assets/) ---
import web1 from "../assets/projects/web-1.jpg";
import web2 from "../assets/projects/web-2.jpg";
import video1 from "../assets/projects/video-1.jpg";
import video2 from "../assets/projects/video-2.jpg";
import design1 from "../assets/projects/design-1.jpg";
import design2 from "../assets/projects/design-2.jpg";
import game1 from "../assets/projects/game-1.jpg";
import game2 from "../assets/projects/game-2.jpg";

export type Category = "web" | "video" | "design" | "games";

export const profile = {
  // TODO: replace with your preferred display name
  name: "Samuel Wanjiru",
  firstName: "Samuel",
  // TODO: your email — used by the contact section + "Copy email" button
  email: "wanjirusamkiarie@gmail.com",
  // TODO: your city & country
  location: "Nairobi, Kenya",
  // TODO: 3-4 warm bio sentences
  bio: "I'm a multidisciplinary creative who moves fluidly between code, camera and canvas. I design and build websites that feel effortless, cut videos that keep people watching, craft brands with a point of view, and tinker with game prototypes on weekends. Whatever the medium, I care about the same thing: work that feels polished and human.",
  availability: "Available for work",
  languages: ["English", "Kiswahili"],
  // TODO: quick-fact counters (keep honest numbers!)
  counters: [
    { value: 4, suffix: "+", label: "Years of experience" },
    { value: 40, suffix: "+", label: "Projects completed" },
    { value: 15, suffix: "+", label: "Happy clients" },
  ],
  // TODO: make it personal
  funFacts: [
    "Currently playing: Hollow Knight: Silksong",
    "Currently learning: Godot 4 shaders",
    "Fueled by Kenyan coffee ☕",
    "Once edited 200+ videos in a single year",
  ],
};

// Hero typewriter line — add or reorder freely
export const typewriterLines = [
  "I build websites.",
  "I edit videos.",
  "I design brands.",
  "I create games.",
];

// The five disciplines ("What I Do")
export const disciplines = [
  {
    id: "web",
    title: "Web Development",
    tagline: "Fast, beautiful websites",
    detail: "React, responsive layouts and buttery interactions.",
    anchor: "work",
  },
  {
    id: "video",
    title: "Video Editing",
    tagline: "Stories that hold attention",
    detail: "Pacing, color and sound — cut with intent.",
    anchor: "work",
  },
  {
    id: "design",
    title: "Graphic Design",
    tagline: "Brands with a point of view",
    detail: "Identity systems, posters and social kits.",
    anchor: "work",
  },
  {
    id: "games",
    title: "Game Development",
    tagline: "Playable little worlds",
    detail: "Prototypes to polished builds in Unity & Godot.",
    anchor: "work",
  },
  {
    id: "experience",
    title: "Professional Experience",
    tagline: "Creative who ships",
    detail: "Freelance & agency work across all of the above.",
    anchor: "experience",
  },
] as const;

// --- Portfolio projects (2 per category) ---
export const projects: Array<{
  id: string;
  title: string;
  category: Category;
  image: string;
  short: string;
  description: string;
  role: string;
  tools: string[];
  // TODO: real links — live site, YouTube/Vimeo, itch.io or GitHub
  link: string;
}> = [
  {
    id: "nexora",
    title: "Nexora Analytics Dashboard",
    category: "web",
    image: web1,
    short: "SaaS analytics platform UI",
    description:
      "A complete SaaS dashboard: auth flows, real-time charts, and a component library that kept the team shipping fast. Fully responsive down to tablet.",
    role: "Design & front-end development",
    tools: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
    link: "#", // TODO
  },
  {
    id: "lumora",
    title: "Lumora Fashion Store",
    category: "web",
    image: web2,
    short: "E-commerce for a fashion label",
    description:
      "Minimal indigo-and-cream storefront with a product grid, cart flow and a lookbook. Conversion-focused design with a 60+ Lighthouse score.",
    role: "Web design & development",
    tools: ["React", "Tailwind CSS", "Figma"],
    link: "#", // TODO
  },
  {
    id: "travel-edit",
    title: "Adventure Travel Edit",
    category: "video",
    image: video1,
    short: "12-minute travel documentary cut",
    description:
      "Story-first edit of 40 hours of travel footage — pacing, color grade and sound design. Delivered 16:9 and 9:16 cutdowns for socials.",
    role: "Editor & colorist",
    tools: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
    link: "#", // TODO — YouTube/Vimeo link
  },
  {
    id: "golden-hour",
    title: "Golden Hour Road Trip",
    category: "video",
    image: video2,
    short: "Cinematic drone mini-film",
    description:
      "A 90-second drone film graded for warm golden-hour tones. Shot, edited and color graded end-to-end in under a week.",
    role: "Drone op, editor, colorist",
    tools: ["Premiere Pro", "Resolve"],
    link: "#", // TODO
  },
  {
    id: "northridge",
    title: "Northridge Brand Identity",
    category: "design",
    image: design1,
    short: "Full identity for a creative studio",
    description:
      "Logo suite, stationery, color system and brand guidelines for a boutique studio. Built to flex from business card to billboard.",
    role: "Brand designer",
    tools: ["Illustrator", "Figma", "Photoshop"],
    link: "#", // TODO
  },
  {
    id: "abstract-forms",
    title: "Abstract Forms Poster Series",
    category: "design",
    image: design2,
    short: "Swiss-style print series",
    description:
      "A three-poster print series exploring shape and negative space, exhibited at a local design showcase.",
    role: "Art direction & print design",
    tools: ["Illustrator", "Photoshop"],
    link: "#", // TODO
  },
  {
    id: "skybound",
    title: "Skybound Pixel Quest",
    category: "games",
    image: game1,
    short: "2D pixel platformer",
    description:
      "A retro platformer with 3 worlds, 40+ levels and a built-in level editor. Made solo over six months.",
    role: "Solo developer — code, art, sound",
    tools: ["Godot", "GDScript", "Aseprite"],
    link: "#", // TODO — itch.io link
  },
  {
    id: "orbit-runner",
    title: "Orbit Runner 3D",
    category: "games",
    image: game2,
    short: "Endless runner prototype",
    description:
      "A neon endless runner with procedural tracks and score multipliers. Currently in open playtest on itch.io.",
    role: "Gameplay programmer",
    tools: ["Unity", "C#", "Blender"],
    link: "#", // TODO
  },
];

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "video", label: "Video" },
  { id: "design", label: "Design" },
  { id: "games", label: "Games" },
] as const;

// --- Skills (visual clusters) — TODO: reorder/prune to match reality ---
export const skillGroups = [
  {
    id: "web",
    title: "Web",
    skills: [
      { name: "HTML & CSS", level: 92 },
      { name: "JavaScript", level: 88 },
      { name: "React", level: 82 },
      { name: "TypeScript", level: 74 },
    ],
  },
  {
    id: "video",
    title: "Video",
    skills: [
      { name: "Premiere Pro", level: 90 },
      { name: "After Effects", level: 80 },
      { name: "DaVinci Resolve", level: 72 },
    ],
  },
  {
    id: "design",
    title: "Design",
    skills: [
      { name: "Photoshop", level: 85 },
      { name: "Illustrator", level: 84 },
      { name: "Figma", level: 88 },
    ],
  },
  {
    id: "games",
    title: "Games",
    skills: [
      { name: "Unity & C#", level: 78 },
      { name: "Godot", level: 70 },
      { name: "Unreal", level: 55 },
    ],
  },
  {
    id: "soft",
    title: "Soft skills",
    skills: [
      { name: "Communication", level: 90 },
      { name: "Teamwork", level: 88 },
      { name: "Problem-solving", level: 92 },
    ],
  },
];

// Marquee strip of tools (icons come from lucide in the component)
export const toolbox = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Figma",
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Photoshop",
  "Illustrator",
  "Unity",
  "C#",
  "Godot",
  "Blender",
  "Git",
];

// --- Experience timeline — TODO: replace all three placeholder jobs ---
export const jobs = [
  {
    company: "Freelance — Self-employed", // TODO: JOB 1
    role: "Multidisciplinary Creative (Web · Video · Design)",
    period: "2023 — Present",
    location: "Nairobi, Kenya",
    achievements: [
      "Delivered 25+ client projects across web, video and design",
      "Grew a referral network of 10+ repeat clients",
      "Built a template system that cut project setup time in half",
    ],
    icon: "briefcase",
  },
  {
    company: "Streamline Studios", // TODO: JOB 2 (placeholder)
    role: "Video Editor",
    period: "2022 — 2023",
    location: "Nairobi, Kenya",
    achievements: [
      "Edited 100+ marketing and social videos, avg. 34% watch-through",
      "Introduced a color-grade preset library used studio-wide",
      "Cut turnarounds from 5 days to 2 on recurring formats",
    ],
    icon: "clapperboard",
  },
  {
    company: "PrintWorks Agency", // TODO: JOB 3 (placeholder)
    role: "Junior Graphic Designer",
    period: "2021 — 2022",
    location: "Nairobi, Kenya",
    achievements: [
      "Produced print and social assets for 12 brand accounts",
      "Redesigned the agency's own pitch deck template",
      "Learned production print standards, prepress and bleed setups",
    ],
    icon: "pentool",
  },
];

// --- Testimonials — TODO: replace with real quotes + names ---
export const testimonials = [
  {
    quote:
      "Samuel rebuilt our site and our sales page video in the same month. The whole package just works — and he's a joy to work with.",
    name: "Amina Otieno",
    title: "Founder, Lumora",
  },
  {
    quote:
      "The fastest editor we've had. Pacing instincts you can't teach, and the color work made our footage look twice its budget.",
    name: "David Kimani",
    title: "Producer, Streamline Studios",
  },
  {
    quote:
      "He turned a messy brief into a brand we're proud of. Every asset arrived pixel-perfect and on time.",
    name: "Grace Mwangi",
    title: "Marketing Lead, Northridge",
  },
];

// --- Socials — TODO: paste your real profile URLs ---
export const socials = [
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/your-handle" },
  { id: "github", label: "GitHub", href: "https://github.com/your-handle" },
  { id: "youtube", label: "YouTube", href: "https://youtube.com/..your-handle" },
  { id: "dribbble", label: "Behance", href: "https://behance.net/your-handle" },
  { id: "itch", label: "itch.io", href: "https://your-handle.itch.io" },
  { id: "instagram", label: "Instagram", href: "https://instagram.com/your-handle" },
];
