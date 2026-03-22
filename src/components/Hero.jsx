import { motion } from "framer-motion";
import Container from "./Container";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

export default function Hero({ profile }) {
  const { name, headline, hero, links, email, location } = profile;

  return (
    <section id="home" className="pt-10">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-sm text-zinc-600 dark:text-zinc-300"
            >
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} />
                {location}
              </span>
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl"
            >
              {name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="mt-3 text-lg text-zinc-700 dark:text-zinc-200"
            >
              {headline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="mt-5 text-zinc-700 dark:text-zinc-200"
            >
              {hero.intro}
            </motion.p>

            <div className="mt-6 flex flex-wrap gap-2">
              {hero.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs text-zinc-700 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-200"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {hero.ctas.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className={
                    c.variant === "primary"
                      ? "rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                      : "rounded-lg border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                  }
                >
                  {c.label}
                </a>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a className="inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white" href={links.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={16} /> LinkedIn
              </a>
              <a className="inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white" href={links.github} target="_blank" rel="noreferrer">
                <Github size={16} /> GitHub
              </a>
              <a className="inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white" href={`mailto:${email}`}>
                <Mail size={16} /> Email
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex justify-center md:justify-end"
          >
            <div className="group relative">
              <div className="absolute -inset-3 rounded-3xl bg-zinc-200/60 blur-xl dark:bg-zinc-800/60" />
              <img
                src="/profile.jpg"
                alt={`${name} profile`}
                className="relative h-72 w-72 rounded-3xl object-cover shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <p className="mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
                Put your photo at public/profile.jpg
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
