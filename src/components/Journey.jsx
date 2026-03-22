import React, { useMemo, useState } from "react";
import { Calendar, MapPin, ChevronDown, ChevronUp, GraduationCap, Briefcase } from "lucide-react";
import { journey } from "../data/journey";

function formatYM(ym) {
  if (!ym) return "Present";
  const [y, m] = ym.split("-").map((v) => Number(v));
  const date = new Date(y, (m || 1) - 1, 1);
  return date.toLocaleString(undefined, { month: "short", year: "numeric" });
}

function sortKey(item) {
  const s = item.start || "0000-00";
  const e = item.end || "9999-99";
  return `${s}::${e}`;
}

function resolvePublicPath(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;

  const base = import.meta.env.BASE_URL || "/";
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${clean}`;
}

function initials(text) {
  if (!text) return "•";
  const parts = text.split(" ").filter(Boolean);
  const a = parts[0]?.[0] || "";
  const b = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (a + b).toUpperCase();
}

function Logo({ src, alt }) {
  const [failed, setFailed] = useState(false);
  const resolved = resolvePublicPath(src);

  // 50% bigger: h-14 w-14 -> h-20 w-20
  return (
    <div className="h-20 w-20 shrink-0 rounded-3xl border border-zinc-200 bg-white/70 p-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40">
      {!src || failed ? (
        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-zinc-100 text-base font-bold text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
          {initials(alt)}
        </div>
      ) : (
        <img
          src={resolved}
          alt={alt}
          className="h-full w-full object-contain"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function TimelineCard({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white/60 p-5 backdrop-blur shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
      <div className="flex items-start gap-4">
        <Logo src={item.logo} alt={item.org} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-base font-semibold leading-snug">{item.org}</div>
              <div className="mt-1 text-sm font-medium text-lime-600 dark:text-lime-400">
                {item.title}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-600 dark:text-zinc-300">
                {item.location ? (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </span>
                ) : null}

                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatYM(item.start)} to {formatYM(item.end)}
                  </span>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onToggle}
              className="rounded-xl border border-zinc-200 bg-white/70 p-2 transition-colors hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:bg-zinc-900"
              aria-label="Toggle details"
            >
              {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {item.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-700 dark:border-zinc-800 dark:text-zinc-200"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          {isOpen && item.bullets?.length ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
              {item.bullets.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function TimelineRow({ item, side, isOpen, onToggle }) {
  const isLeft = side === "left";

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
      <div className="hidden lg:block lg:col-span-5">
        {isLeft ? <TimelineCard item={item} isOpen={isOpen} onToggle={onToggle} /> : null}
      </div>

      {/* Center line + dot (50% bigger) */}
      <div className="relative hidden lg:flex lg:col-span-2 justify-center">
        <div className="relative w-full flex justify-center">
          <div className="absolute left-1/2 -translate-x-1/2 -top-12 bottom-[-48px] w-[2px] bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-6 h-8 w-8 rounded-full bg-lime-600 dark:bg-lime-400 shadow-[0_0_0_16px_rgba(132,204,22,0.14)]" />
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-5">
        {!isLeft ? <TimelineCard item={item} isOpen={isOpen} onToggle={onToggle} /> : null}
      </div>

      {/* Mobile dot (50% bigger) */}
      <div className="lg:hidden">
        <div className="flex items-start gap-3">
          <div className="mt-2 flex flex-col items-center">
            <div className="h-7 w-7 rounded-full bg-lime-600 dark:bg-lime-400 shadow-[0_0_0_14px_rgba(132,204,22,0.12)]" />
            <div className="mt-2 h-full w-[2px] bg-lime-500/40" />
          </div>
          <div className="w-full">
            <TimelineCard item={item} isOpen={isOpen} onToggle={onToggle} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineSection({ label, icon, items }) {
  const [openIds, setOpenIds] = useState(() => new Set());

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="relative">
      <div className="mb-6">
        <div className="text-xs font-semibold tracking-widest text-lime-600 dark:text-lime-400">
          {label}
        </div>
        <div className="mt-2 inline-flex items-center gap-2 text-xl font-semibold">
          {icon}
          <span>{label === "EDUCATION" ? "Education Journey" : "Experience Journey"}</span>
        </div>
      </div>

      <div className="space-y-10">
        {items.map((item, idx) => {
          const side = idx % 2 === 0 ? "right" : "left";
          const isOpen = openIds.has(item.id);
          return (
            <TimelineRow
              key={item.id}
              item={item}
              side={side}
              isOpen={isOpen}
              onToggle={() => toggle(item.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Journey() {
  const educationItems = useMemo(() => {
    return journey.milestones
      .filter((m) => m.type === "education")
      .slice()
      .sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
  }, []);

  const experienceItems = useMemo(() => {
    return journey.milestones
      .filter((m) => m.type === "experience")
      .slice()
      .sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
  }, []);

  return (
    <div className="space-y-14">
      <TimelineSection
        label="EDUCATION"
        icon={<GraduationCap className="h-5 w-5 text-lime-600 dark:text-lime-400" />}
        items={educationItems}
      />

      <TimelineSection
        label="PROFESSIONAL EXPERIENCE"
        icon={<Briefcase className="h-5 w-5 text-lime-600 dark:text-lime-400" />}
        items={experienceItems}
      />
    </div>
  );
}
