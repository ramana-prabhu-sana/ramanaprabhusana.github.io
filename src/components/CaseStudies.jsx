import { Suspense, lazy, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Github } from "lucide-react";
import Container from "./Container";
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import Badge from "./Badge";
import { caseStudies, caseStudyTags } from "../data/caseStudies";

const CaseStudyModal = lazy(() => import("./CaseStudyModal"));

const accentGradient = {
  lime: "from-lime-400/30 via-emerald-500/15 to-cyan-500/10",
  cyan: "from-cyan-400/30 via-sky-500/15 to-violet-500/10",
  violet: "from-violet-400/30 via-fuchsia-500/15 to-rose-500/10",
  rose: "from-rose-400/30 via-pink-500/15 to-amber-500/10",
  amber: "from-amber-300/30 via-orange-500/15 to-rose-500/10",
  sky: "from-sky-400/30 via-blue-500/15 to-violet-500/10",
};

function MetricThumb({ accent, metric, image, alt }) {
  const grad = accentGradient[accent] || accentGradient.lime;

  // Image variant: real project screenshot with the metric overlaid bottom-left
  // so the number is still scannable at-a-glance.
  if (image) {
    return (
      <div className="relative h-36 w-full overflow-hidden rounded-xl border border-white/10 bg-ink-900">
        <img
          src={image}
          alt={alt || "Case study preview"}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/30 to-transparent" />
        {metric ? (
          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-0.5 px-4 pb-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/70">
              {metric.label}
            </div>
            <div className="text-base font-semibold leading-tight text-white">
              {metric.value}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  if (!metric) {
    return (
      <div
        className={[
          "relative h-36 w-full overflow-hidden rounded-xl border border-white/8",
          "bg-gradient-to-br",
          grad,
        ].join(" ")}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-grid-soft opacity-40" />
      </div>
    );
  }
  return (
    <div
      className={[
        "relative h-36 w-full overflow-hidden rounded-xl border border-white/8",
        "bg-gradient-to-br",
        grad,
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-grid-soft opacity-30" />
      <div className="relative flex h-full flex-col justify-center gap-1 px-5">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/65">
          {metric.label}
        </div>
        <div className="text-xl font-semibold leading-tight text-white">
          {metric.value}
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [openId, setOpenId] = useState(null);

  const filtered = useMemo(() => {
    if (!activeFilters.length) return caseStudies;
    return caseStudies.filter((c) =>
      activeFilters.every((f) => c.tags.includes(f))
    );
  }, [activeFilters]);

  const toggleFilter = (tag) => {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const open = caseStudies.find((c) => c.id === openId);

  return (
    <section
      id="projects"
      className="relative scroll-mt-24 py-16 sm:py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="Featured projects"
          title="Selected projects"
          subtitle="Six projects with public artifacts you can verify. Industry impact lives in the experience timeline and recommendations below."
          accent="lime"
        />

        {/* Filter bar */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveFilters([])}
            className={[
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              activeFilters.length === 0
                ? "border-lime-400/50 bg-lime-400/15 text-lime-200"
                : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white",
            ].join(" ")}
          >
            All
            <span className="ml-1 text-[10px] text-white/50">
              ({caseStudies.length})
            </span>
          </button>
          {caseStudyTags.map((t) => {
            const isActive = activeFilters.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleFilter(t)}
                className={[
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-200"
                    : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white",
                ].join(" ")}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        <motion.div
          layout
          className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((c) => (
              <motion.div
                key={c.id}
                layout
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <Card accent={c.accent} className="flex h-full flex-col">
                  <MetricThumb accent={c.accent} metric={c.metric} image={c.image} alt={c.title} />

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {c.tierLabel ? (
                      // Tier chip first so recruiters immediately see whether
                      // this case study is Industry / Practicum / Academic.
                      <Badge
                        tone={
                          c.tier === "Industry"
                            ? "lime"
                            : c.tier === "Practicum"
                            ? "amber"
                            : "cyan"
                        }
                        size="xs"
                      >
                        {c.tierLabel}
                      </Badge>
                    ) : null}
                    {c.badge ? (
                      <Badge tone="amber" size="xs">
                        {c.badge}
                      </Badge>
                    ) : null}
                    {c.tags
                      .filter((t) => !["Industry", "Practicum", "Academic"].includes(t))
                      .slice(0, 3)
                      .map((t) => (
                        <Badge key={t} tone="ghost" size="xs">
                          {t}
                        </Badge>
                      ))}
                  </div>

                  <h3 className="mt-3 text-lg font-semibold leading-snug text-white">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    {c.valueProp}
                  </p>

                  <div className="mt-2 text-xs text-white/45">
                    {c.context}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <button
                      type="button"
                      onClick={() => setOpenId(c.id)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-lime-300 hover:text-lime-200"
                    >
                      Read case study
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    {c.repoUrl ? (
                      <a
                        href={c.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-medium text-white/80 transition-colors hover:border-white/25 hover:text-white"
                        aria-label="Open repository"
                      >
                        <Github className="h-3 w-3" />
                        Repo
                      </a>
                    ) : null}
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-sm text-white/60">
            No case studies match all those filters. Try removing one.
          </div>
        ) : null}
      </Container>

      {/* Modal - lazy-loaded only when a card is opened (conditional render
          prevents React from fetching the chunk on initial page load). */}
      {open ? (
        <Suspense fallback={null}>
          <CaseStudyModal open={open} onClose={() => setOpenId(null)} />
        </Suspense>
      ) : null}
    </section>
  );
}
