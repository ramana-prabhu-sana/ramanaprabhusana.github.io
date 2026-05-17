import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, FileText, Github, Lock, X } from "lucide-react";
import Badge from "./Badge";

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

  // Image variant: project screenshot, taller in the modal for a hero look.
  if (image) {
    return (
      <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/10 bg-ink-900 sm:h-64">
        <img
          src={image}
          alt={alt || "Case study preview"}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/20 to-transparent" />
        {metric ? (
          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-0.5 px-5 pb-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/70">
              {metric.label}
            </div>
            <div className="text-lg font-semibold leading-tight text-white">
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
          "relative h-24 w-full overflow-hidden rounded-xl border border-white/8",
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
        "relative h-24 w-full overflow-hidden rounded-xl border border-white/8",
        "bg-gradient-to-br",
        grad,
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-grid-soft opacity-30" />
      <div className="relative flex h-full flex-col justify-center gap-1 px-4">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/65">
          {metric.label}
        </div>
        <div className="text-lg font-semibold leading-tight text-white">
          {metric.value}
        </div>
      </div>
    </div>
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

export default function CaseStudyModal({ open, onClose }) {
  // Lock body scroll when modal open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink-950/85 px-2 py-2 backdrop-blur-md sm:items-center sm:px-6 sm:py-10"
          onClick={onClose}
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
              onClick={onClose}
              aria-label="Close"
              className="sticky top-3 z-10 ml-auto mr-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-ink-900/90 text-white/80 backdrop-blur hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="px-6 pb-8 sm:px-8">
              <MetricThumb accent={open.accent} metric={open.metric} image={open.image} alt={open.title} />

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {open.tierLabel ? (
                  <Badge
                    tone={
                      open.tier === "Industry"
                        ? "lime"
                        : open.tier === "Practicum"
                        ? "amber"
                        : "cyan"
                    }
                    size="sm"
                  >
                    {open.tierLabel}
                  </Badge>
                ) : null}
                {open.badge ? (
                  <Badge tone="amber" size="sm">
                    {open.badge}
                  </Badge>
                ) : null}
                {open.tags
                  .filter((t) => !["Industry", "Practicum", "Academic"].includes(t))
                  .map((t) => (
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
              <div className="mt-3 text-sm text-white/65">{open.context}</div>

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
                {open.posterUrl ? (
                  <a
                    href={open.posterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-400/10 px-3 py-2 text-sm font-medium text-violet-200 transition-colors hover:border-violet-400/50 hover:bg-violet-400/15"
                  >
                    <FileText className="h-4 w-4" />
                    View AI Showcase poster
                    <ExternalLink className="h-3 w-3 text-violet-300/70" />
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
  );
}
