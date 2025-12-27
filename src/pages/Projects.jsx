import React, { useMemo, useState } from "react";
import Container from "../components/Container.jsx";
import Card from "../components/Card.jsx";
import Badge from "../components/Badge.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { profile } from "../data/profile.js";

export default function Projects() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("All");

  const allTags = useMemo(() => {
    const set = new Set();
    profile.projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return profile.projects.filter((p) => {
      const matchesTag = tag === "All" ? true : p.tags.includes(tag);
      const blob = (p.title + " " + p.summary + " " + p.tags.join(" ")).toLowerCase();
      const matchesQuery = s ? blob.includes(s) : true;
      return matchesTag && matchesQuery;
    });
  }, [q, tag]);

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-300">
            Search and filter projects. Open a case study for deeper detail.
          </p>
        </div>

        <Card className="p-5">
          <div className="grid gap-4 md:grid-cols-12 md:items-center">
            <div className="md:col-span-6">
              <label className="text-xs text-zinc-500 dark:text-zinc-400">Search</label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-900"
                placeholder="Search by title, tag, keywords..."
              />
            </div>

            <div className="md:col-span-6">
              <label className="text-xs text-zinc-500 dark:text-zinc-400">Filter</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {allTags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTag(t)}
                    className={[
                      "rounded-full px-3 py-1 text-xs transition",
                      t === tag
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                        : "border border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    ].join(" ")}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
            Showing <Badge>{filtered.length}</Badge> projects
          </div>
        </Card>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Container>
    </div>
  );
}
