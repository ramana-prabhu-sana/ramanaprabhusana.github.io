import { useEffect, useState } from "react";
import { Download, Github, Linkedin, Menu, X } from "lucide-react";
import Container from "./Container";
import Badge from "./Badge";
import { profile } from "../data/profile";
import { useActiveSection } from "../hooks/useActiveSection";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "why", label: "Strengths" },
  { id: "workflow", label: "Approach" },
  { id: "industry-highlights", label: "Industry" },
  { id: "case-studies", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certs" },
  { id: "testimonials", label: "Recommendations" },
  { id: "contact", label: "Contact" },
];

const sectionIds = navLinks.map((n) => n.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile drawer is open + escape-to-close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-ink-950/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#home"
            onClick={() => setOpen(false)}
            aria-label={`${profile.name} - home`}
            className="group flex items-center gap-2 font-semibold tracking-tight"
          >
            <span
              aria-hidden="true"
              className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-lime-300 transition-colors group-hover:border-lime-300/40 group-hover:text-lime-200"
            >
              RPS
              <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-lime-400/0 via-cyan-400/0 to-violet-400/0 opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
            <span className="hidden whitespace-nowrap text-sm text-white/80 2xl:inline">
              {profile.name}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "relative whitespace-nowrap rounded-lg px-2 py-2 text-sm transition-colors xl:px-3",
                    isActive
                      ? "text-white"
                      : "text-white/60 hover:text-white",
                  ].join(" ")}
                >
                  {link.label}
                  {isActive ? (
                    <span className="absolute inset-x-2 bottom-1 h-px bg-gradient-to-r from-lime-400 via-cyan-300 to-violet-400 xl:inset-x-3" />
                  ) : null}
                </a>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hidden h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/20 hover:text-white sm:inline-flex"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hidden h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/20 hover:text-white sm:inline-flex"
            >
              <Github className="h-4 w-4" />
            </a>

            <a
              href={profile.links.resume}
              target="_blank"
              rel="noreferrer"
              aria-label="Download resume"
              className="hidden h-9 items-center gap-2 rounded-lg bg-lime-400 px-2.5 text-sm font-medium text-ink-950 transition-colors hover:bg-lime-300 md:inline-flex xl:px-3"
            >
              <Download className="h-4 w-4" />
              <span className="hidden xl:inline">Resume</span>
            </a>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={[
          "lg:hidden",
          "transition-[transform,opacity] duration-300",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        ].join(" ")}
      >
        <div className="border-t border-white/10 bg-ink-950/95 backdrop-blur-xl">
          <Container>
            <nav className="flex flex-col gap-1 py-4" aria-label="Mobile">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? "page" : undefined}
                  className={[
                    "rounded-lg px-3 py-3 text-base font-medium",
                    active === link.id
                      ? "bg-white/8 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={profile.links.resume}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center justify-center gap-2 rounded-lg bg-lime-400 text-sm font-medium text-ink-950"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-sm font-medium text-white"
                >
                  Contact
                </a>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 text-sm text-white"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 text-sm text-white"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>

              <div className="mt-3 flex items-center justify-center pb-4">
                <Badge tone="lime" size="sm">
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-lime-400" />
                  {profile.status}
                </Badge>
              </div>
            </nav>
          </Container>
        </div>
      </div>
    </header>
  );
}
