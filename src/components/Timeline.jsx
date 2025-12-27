import React from "react";
import Card from "./Card.jsx";
import Badge from "./Badge.jsx";

export default function Timeline({ items }) {
  return (
    <div className="space-y-6">
      {items.map((x) => (
        <Card key={`${x.company}-${x.title}-${x.start}`} className="p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-base font-semibold">
                {x.title} <span className="text-zinc-500 dark:text-zinc-400">at</span> {x.company}
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-300">
                {x.location ? `${x.location} · ` : ""}
                {x.start} to {x.end}
              </div>
              {x.summary ? <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">{x.summary}</div> : null}
            </div>

            <div className="flex flex-wrap gap-2">
              {x.tools.slice(0, 10).map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>

          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
            {x.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
