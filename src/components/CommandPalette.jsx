import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card.jsx";
import { Search, CornerDownLeft } from "lucide-react";
import { profile } from "../data/profile.js";

function isMac() {
  return typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform);
}

export default function CommandPalette() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef(null);

  const actions = useMemo(() => {
    const jump = (id) => {
      nav("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    };

    const sectionActions = [
      { label: "Go to About", keywords: "about", run: () => jump("about") },
      { label: "Go to What I do", keywords: "what i do", run: () => jump("what-i-do") },
      { label: "Go to Experience", keywords: "experience work", run: () => jump("experience") },
      { label: "Go to Projects", keywords: "projects", run: () => jump("projects") },
      { label: "Go to Skills", keywords: "skills", run: () => jump("skills") },
      { label: "Go to Certifications", keywords: "certifications", run: () => jump("certifications") },
      { label: "Go to Leadership", keywords: "leadership", run: () => jump("leadership") },
      { label: "Go to Contact", keywords: "contact email", run: () => jump("contact") },
      { label: "Open Projects page", keywords: "projects page", run: () => nav("/projects") },
      { label: "Open Resume", keywords: "resume cv", run: () => nav("/resume") },
      {
        label: "Copy Email",
        keywords: "copy email",
        run: async () => {
          await navigator.clipboard.writeText(profile.basics.email);
        }
      }
    ];

    const projectActions = profile.projects.map((p) => ({
      label: `Open Case Study: ${p.title}`,
      keywords: `${p.title} ${p.tags.join(" ")} project`,
      run: () => nav(`/case-studies/${p.slug}`)
    }));

    return [...sectionActions, ...projectActions];
  }, [nav]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return actions.slice(0, 10);
    return actions.filter((a) => (a.label + " " + a.keywords).toLowerCase().includes(s)).slice(0, 10);
  }, [actions, q]);

  useEffect(() => {
    const onKey = (e) => {
      const key = e.key.toLowerCase();
      const cmdOrCtrl = isMac() ? e.metaKey : e.ctrlKey;
      if (cmdOrCtrl && key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (key === "escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-command-palette", handler);
    return () => window.removeEventListener("open-command-palette", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  function closeAndRun(run) {
    setOpen(false);
    setTimeout(run, 0);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-20"
      onMouseDown={() => setOpen(false)}
    >
      <div className="w-full max-w-2xl" onMouseDown={(e) => e.stopPropagation()}>
        <Card className="overflow-hidden">
          <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <Search size={16} className="text-zinc-500" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search sections, projects, actions..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
            />
            <div className="flex items-center gap-1 text-xs text-zinc-500">
              <span>{isMac() ? "Cmd" : "Ctrl"}</span>
              <span>+</span>
              <span>K</span>
            </div>
          </div>

          <div className="max-h-[360px] overflow-auto p-2">
            {filtered.length ? (
              filtered.map((a) => (
                <button
                  key={a.label}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => closeAndRun(a.run)}
                >
                  <span>{a.label}</span>
                  <CornerDownLeft size={16} className="text-zinc-500" />
                </button>
              ))
            ) : (
              <div className="px-3 py-8 text-sm text-zinc-500">No results.</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
