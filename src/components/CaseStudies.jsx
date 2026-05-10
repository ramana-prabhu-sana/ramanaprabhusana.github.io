import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ExternalLink, Github, Lock, X } from "lucide-react";
import Container from "./Container";
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import Badge from "./Badge";
import { caseStudies, caseStudyTags } from "../data/caseStudies";

const accentGradient = {
  lime: "from-lime-400/30 via-emerald-500/15 to-cyan-500/10",
  cyan: "from-cyan-400/30 via-sky-500/15 to-violet-500/10",
  violet: "from-violet-400/30 via-fuchsia-500/15 to-rose-500/10",
  rose: "from-rose-400/30 via-pink-500/15 to-amber-500/10",
  amber: "from-amber-300/30 via-orange-500/15 to-rose-500/10",
  sky: "from-sky-400/30 via-blue-500/15 to-violet-500/10",
};

function MockupThumb({ accent }) {
  const grad = accentGradient[accent] || accentGradient.lime;
  return (
    <div
      className={[
        "relative h-32 w-full overflow-hidden rounded-xl border border-white/8",
        "bg-gradient-to-br",
        grad,
      ].join(" ")}
      aria-hidden="true"
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-soft opacity-50" />
      {/* Mock chart */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 L25,52 L50,55 L75,42 L100,38 L125,28 L150,30 L175,18 L200,12"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
        />
        <path
          d="M0,60 L25,52 L50,55 L75,42 L100,38 L125,28 L150,30 L175,18 L200,12 L200,80 L0,80 Z"
          fill="rgba(255,255,255,0.08)"
        />
      </svg>
      {/* KPI cards */}
      <div className="absolute left-3 top-3 flex gap-1.5">
        <div className="h-6 w-12 rounded bg-white/15" />
        <div className="h-6 w-12 rounded bg-white/10" />
        <div className="h-6 w-12 rounded bg-white/10" />
      </div>
      <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] font-mono text-white/60">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime-400" />
        live
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

  // Lock body scroll when modal open
  useEffect(() => {
    if (!openId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [openId]);

  return (
    <section
      id="case-studies"
      className="relative scroll-mt-24 py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          eyebrow="Featured case studies"
          title="Decisions I have helped move forward"
          subtitle="Nine studies across forecasting, healthcare, BI, automation, multi-agent AI, sports analytics, and retail/pricing. Filter by tag to scan what's relevant."
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
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <Card accent={c.accent} className="flex h-full flex-col">
                  <MockupThumb accent={c.accent} />

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {c.badge ? (
                      <Badge tone="amber" size="xs">
                        {c.badge}
                      </Badge>
                    ) : null}
                    {c.tags.slice(0, 3).map((t) => (
                      <Badge key={t} tone="ghost" size="xs">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="mt-3 text-lg font-semibold leading-snug text-white">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
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
                        className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white"
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

      {/* Modal */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-end justify-center bg-ink-950/85 px-2 py-2 backdrop-blur-md sm:items-center sm:px-6 sm:py-10"
            onClick={() => setOpenId(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="surface-strong relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl"
            >
              <button
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Close"
                className="sticky top-3 z-10 ml-auto mr-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-ink-900/90 text-white/80 backdrop-blur hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="px-6 pb-8 sm:px-8">
                <MockupThumb accent={open.accent} />

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {open.badge ? (
                    <Badge tone="amber" size="sm">
                      {open.badge}
                    </Badge>
                  ) : null}
                  {open.tags.map((t) => (
                    <Badge key={t} tone="ghost" size="xs">
                      {t}
                    </Badge>
                  ))}
                </div>

                <h3
                  id="case-study-title"
                  className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                >
                  {open.title}
                </h3>
                <p className="mt-2 text-base text-white/75">{open.valueProp}</p>
                <div className="mt-3 text-sm text-white/55">{open.context}</div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <DetailBlock label="Business problem" body={open.problem} />
                  <DetailBlock label="My role" body={open.role} />
                  <DetailBlock label="Approach" body={open.approach} />
                  <DetailBlock label="Output" body={open.output} />
                  <DetailBlock label="Impact" body={open.impact} />
                  <DetailBlock
                    label="Skills demonstrated"
                    body={open.skills.join(" · ")}
                  />
                </div>

                <div className="mt-6">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                    Tools
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {open.tools.map((t) => (
                      <Badge key={t} tone={open.accent} size="xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {open.repoUrl ? (
                    <a
                      href={open.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/10"
                    >
                      <Github className="h-4 w-4" />
                      View repository
                      <ExternalLink className="h-3 w-3 text-white/50" />
                    </a>
                  ) : null}
                  {open.competitionUrl ? (
                    <a
                      href={open.competitionUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-sm font-medium text-cyan-200 transition-colors hover:border-cyan-400/50 hover:bg-cyan-400/15"
                    >
                      View on Kaggle
                      <ExternalLink className="h-3 w-3 text-cyan-300/70" />
                    </a>
                  ) : null}
                  {open.confidentiality ? (
                    <div className="inline-flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
                      <Lock className="mt-0.5 h-3.5 w-3.5 text-white/50" />
                      <span>{open.confidentiality}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function DetailBlock({ label, body }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
        {label}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-white/75">{body}</p>
    </div>
  );
}
