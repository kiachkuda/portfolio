
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Send, CheckCircle2, Gamepad2 } from "lucide-react";
import { FaDribbble, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { toast } from "sonner";
import { profile, socials } from "../data/portfolio";
import { Reveal } from "../components/effects";

const socialIcons: Record<string, typeof FaDribbble> = {
  linkedin: FaLinkedin,
  github: FaGithub,
  youtube: FaYoutube,
  dribbble: FaDribbble,
  itch: Gamepad2,
  instagram: FaInstagram,
};

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (values.name.trim().length < 2) e.name = "Please tell me your name.";
    if (!/^[^\s..]+..[^\s..]+\.[^\s..]+$/.test(values.email)) e.email = "That email doesn't look right.";
    if (values.message.trim().length < 10) e.message = "A few more words, please (10+ characters).";
    return e;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    // TODO (backend): send the message to your email / form service here.
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
    toast.success("Message sent — I'll get back to you soon!");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Couldn't copy — it's " + profile.email);
    }
  };

  const field =
    "w-full rounded-xl border border-vanilla/25 bg-vanilla/10 px-4 py-3 text-vanilla placeholder:text-vanilla/50 transition focus:border-coral focus:outline-none";

  return (
    <section id="contact" className="relative overflow-hidden bg-section-a py-24 text-section-a-fg">
      <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-vanilla/5 blur-2xl" />
      <div aria-hidden className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-coral/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Let&apos;s build something great together<span className="text-coral">.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-vanilla/75">
            Websites, videos, brands or games — tell me what you&apos;re dreaming up.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {/* Form */}
          <Reveal>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full min-h-64 flex-col items-center justify-center rounded-3xl border border-vanilla/20 bg-vanilla/10 p-10 text-center"
                role="status"
              >
                <CheckCircle2 size={48} className="text-coral" aria-hidden />
                <p className="mt-4 font-display text-xl font-semibold">Message sent!</p>
                <p className="mt-1 text-vanilla/75">Thanks for reaching out — I usually reply within a day.</p>
                <button
                  onClick={() => {
                    setSent(false);
                    setValues({ name: "", email: "", message: "" });
                  }}
                  className="mt-6 rounded-full border border-vanilla/40 px-5 py-2 text-sm font-semibold transition hover:border-coral hover:text-coral"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-vanilla/20 bg-vanilla/5 p-7 backdrop-blur-sm sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cf-name" className="mb-1.5 block text-sm font-semibold">Name</label>
                    <input
                      id="cf-name"
                      className={field}
                      placeholder="Your name"
                      value={values.name}
                      onChange={(e) => setValues({ ...values, name: e.target.value })}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className="mt-1.5 text-sm text-coral">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="cf-email" className="mb-1.5 block text-sm font-semibold">Email</label>
                    <input
                      id="cf-email"
                      type="email"
                      className={field}
                      placeholder="you..example.com"
                      value={values.email}
                      onChange={(e) => setValues({ ...values, email: e.target.value })}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="mt-1.5 text-sm text-coral">{errors.email}</p>}
                  </div>
                </div>
                <div className="mt-5">
                  <label htmlFor="cf-message" className="mb-1.5 block text-sm font-semibold">Message</label>
                  <textarea
                    id="cf-message"
                    rows={5}
                    className={`${field} resize-none`}
                    placeholder="Tell me about your project…"
                    value={values.message}
                    onChange={(e) => setValues({ ...values, message: e.target.value })}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="mt-1.5 text-sm text-coral">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-vanilla px-7 py-3.5 font-semibold text-indigo shadow-lg transition hover:bg-coral hover:text-vanilla"
                >
                  Send message
                  <Send size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden />
                </button>
              </form>
            )}
          </Reveal>

          {/* Direct contact */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-vanilla/20 bg-vanilla/5 p-7 backdrop-blur-sm sm:p-8">
              <div>
                <h3 className="font-display text-lg font-semibold">Prefer email?</h3>
                <div className="mt-4 flex items-center gap-3">
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-2 break-all text-vanilla/90 underline-offset-4 hover:underline">
                    <Mail size={18} className="shrink-0 text-coral" aria-hidden />
                    {profile.email}
                  </a>
                  <button
                    onClick={copyEmail}
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-vanilla/30 px-3 py-1.5 text-xs font-semibold transition hover:bg-vanilla/15"
                    aria-label="Copy email address"
                  >
                    <Copy size={13} aria-hidden /> Copy
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold">Elsewhere</h3>
                {/* TODO: real URLs live in src/data/portfolio.ts */}
                <ul className="mt-4 flex flex-wrap gap-3">
                  {socials.map((s) => {
                    const Icon = socialIcons[s.id] ?? Mail;
                    return (
                      <li key={s.id}>
                        <motion.a
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={s.label}
                          whileHover={{ y: -4, scale: 1.08 }}
                          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-vanilla/25 bg-vanilla/10 text-vanilla transition-colors hover:bg-coral hover:text-vanilla"
                        >
                          <Icon size={20} aria-hidden />
                        </motion.a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <p className="text-sm text-vanilla/60">
                Based in {profile.location} · working worldwide.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
