import Container from "./Container";
import { Moon, Sun } from "lucide-react";

export default function Navbar({ sections, activeId, isDark, toggleDark, resumeUrl }) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/75">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">RS</a>

          <nav className="hidden items-center gap-5 md:flex">
            {sections.map((s) => {
              const isActive = activeId === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={[
                    "text-sm transition-colors",
                    isActive
                      ? "text-zinc-950 dark:text-white"
                      : "text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white",
                  ].join(" ")}
                >
                  {s.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={resumeUrl}
              className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              View Resume
            </a>

            <button
              onClick={toggleDark}
              className="rounded-lg border border-zinc-200 p-2 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
              aria-label="Toggle theme"
              type="button"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
