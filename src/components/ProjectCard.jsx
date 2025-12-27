import React from "react";
import Card from "./Card";
import Badge from "./Badge";

export default function ProjectCard({ project }) {
  const p = project || {};
  const title = p.title || "Untitled project";
  const summary = p.summary || "";
  const period = p.period || "";
  const tags = Array.isArray(p.tags) ? p.tags : [];
  const bullets = Array.isArray(p.bullets) ? p.bullets : [];
  const links = Array.isArray(p.links) ? p.links : [];

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold leading-tight">{title}</h3>
            {period ? <div className="mt-1 text-sm opacity-70">{period}</div> : null}
          </div>
        </div>

        {summary ? <p className="text-sm opacity-85">{summary}</p> : null}

        {tags.length ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        ) : null}

        {bullets.length ? (
          <ul className="mt-1 list-disc pl-5 text-sm opacity-85">
            {bullets.slice(0, 4).map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        ) : null}

        {links.length ? (
          <div className="mt-2 flex flex-wrap gap-3 text-sm">
            {links.map((l) => (
              <a
                key={l.href || l.label}
                href={l.href || "#"}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 opacity-90 hover:opacity-100"
              >
                {l.label || "Link"}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
