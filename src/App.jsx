import { useEffect, useMemo, useState } from "react";
import { profile } from "./data/profile";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Section from "./components/Section";
import ScrollProgress from "./components/ScrollProgress";

export default function App() {
  const sections = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
  });

  const [activeId, setActiveId] = useState("about");

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { threshold: [0.15, 0.25, 0.35], rootMargin: "-20% 0px -60% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  function toggleDark() {
    setIsDark((v) => !v);
  }

  function onMouseMove(e) {
    const x = `${(e.clientX / window.innerWidth) * 100}%`;
    const y = `${(e.clientY / window.innerHeight) * 100}%`;
    document.documentElement.style.setProperty("--spot-x", x);
    document.documentElement.style.setProperty("--spot-y", y);
  }

  return (
    <div
      onMouseMove={onMouseMove}
      className="bg-ambient min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white"
    >
      <ScrollProgress />
      <Navbar
        sections={sections}
        activeId={activeId}
        isDark={isDark}
        toggleDark={toggleDark}
        resumeUrl={profile.links.resumeUrl}
      />

      <main className="pb-10">
        <Hero profile={profile} />

        <Section id="about" title={profile.about.title}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white/60 p-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40">
              <div className="space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
                {profile.about.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white/60 p-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40">
              <div className="text-sm font-semibold">Highlights</div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
                {profile.about.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="space-y-4">
            {profile.experience.map((e) => (
              <div
                key={`${e.company}-${e.role}-${e.dates}`}
                className="rounded-2xl border border-zinc-200 bg-white/60 p-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="text-base font-semibold">{e.role}</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-300">
                      {e.company}{e.location ? `, ${e.location}` : ""}
                    </div>
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-300">{e.dates}</div>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                {e.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-700 dark:border-zinc-800 dark:text-zinc-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid gap-4 md:grid-cols-2">
            {profile.projects.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-zinc-200 bg-white/60 p-5 backdrop-blur hover:shadow-lg transition-shadow dark:border-zinc-800 dark:bg-zinc-950/40"
              >
                <div className="text-base font-semibold">{p.title}</div>
                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{p.subtitle}</div>
                <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-200">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-700 dark:border-zinc-800 dark:text-zinc-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid gap-4 md:grid-cols-3">
            {profile.skills.groups.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl border border-zinc-200 bg-white/60 p-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40"
              >
                <div className="text-sm font-semibold">{g.title}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-700 dark:border-zinc-800 dark:text-zinc-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="rounded-2xl border border-zinc-200 bg-white/60 p-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40">
            <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
              <div>
                <span className="text-zinc-600 dark:text-zinc-300">Email: </span>
                <a className="hover:underline" href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <div>
                <span className="text-zinc-600 dark:text-zinc-300">LinkedIn: </span>
                <a className="hover:underline" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  {profile.links.linkedin}
                </a>
              </div>
            </div>
          </div>
        </Section>

        <footer className="border-t border-zinc-200 py-10 dark:border-zinc-800">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-600 dark:text-zinc-300">
              <div>© {new Date().getFullYear()} {profile.name}</div>
              <div className="flex gap-4">
                <a className="hover:underline" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="hover:underline" href={`mailto:${profile.email}`}>
                  Email
                </a>
                <a className="hover:underline" href={profile.links.resumeUrl}>
                  Resume
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
