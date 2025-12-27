import React from "react";
import Container from "./Container.jsx";
import { profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-10 dark:border-zinc-800">
      <Container className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="text-sm font-semibold">{profile.basics.name}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Built with React, Vite, Tailwind.
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          {profile.basics.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-700 hover:underline dark:text-zinc-200"
            >
              {l.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
