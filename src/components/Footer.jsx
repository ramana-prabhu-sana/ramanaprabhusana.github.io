import { Github, Linkedin, Mail } from "lucide-react";
import Container from "./Container";
import { profile } from "../data/profile";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/8 py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-lime-300">
              RPS
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                {profile.name}
              </div>
              <div className="text-xs text-white/50">
                Decision Analytics · Business Analytics · Purdue MSBAIM
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-white/55 transition-colors hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-white/55 transition-colors hover:text-white"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.links.email}
              aria-label="Email"
              className="text-white/55 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          <div className="text-xs text-white/40">
            © {year} {profile.name}
          </div>
        </div>
      </Container>
    </footer>
  );
}
