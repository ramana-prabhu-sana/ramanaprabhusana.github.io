import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote } from "lucide-react";
import Container from "./Container";
import { testimonials } from "../data/testimonials";

// Pulled the highest-signal short clause from each LinkedIn rec so the
// rotator stays on one or two lines even on small screens. Source quotes
// (and full text) live below in the Testimonials section.
const PULL_QUOTES = [
  {
    id: "jeffrey-composto",
    short: "Sana is an expert forecaster... his expertise helped our team come up with more efficient solutions.",
  },
  {
    id: "kara-adlington",
    short: "His strength is data and analytics, with increasing aptitude for the strategic implications.",
  },
  {
    id: "prashant-vyas",
    short: "There is no better colleague than Sana. His expertise as a forecaster is considerable.",
  },
  {
    id: "sagar-vadali",
    short: "The clarity he shows in thinking process and root-cause analysis makes him a great solution provider.",
  },
];

const ROTATE_MS = 6000;

export default function TestimonialMarquee() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % PULL_QUOTES.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, [paused]);

  const current = PULL_QUOTES[idx];
  const meta = testimonials.find((t) => t.id === current.id);
  if (!meta) return null;

  return (
    <section
      aria-label="Pull quotes from LinkedIn recommendations"
      className="relative py-2"
    >
      <Container>
        <div
          className="relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-r from-ink-900/80 via-ink-800/80 to-ink-900/80 px-5 py-4 backdrop-blur"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute -left-12 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-lime-400/8 blur-2xl" />
          <div className="pointer-events-none absolute -right-12 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-violet-500/8 blur-2xl" />

          <div className="relative flex items-start gap-3 sm:items-center">
            <Quote
              className="mt-0.5 h-5 w-5 shrink-0 text-white/30 sm:mt-0"
              aria-hidden="true"
            />

            <div className="relative min-h-[44px] flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3"
                >
                  <div className="text-[13px] leading-relaxed text-white/85 sm:text-sm">
                    "{current.short}"
                  </div>
                  <div className="shrink-0 text-[11px] text-white/55 sm:text-xs">
                    <span className="font-semibold text-white/80">{meta.name}</span>
                    <span className="text-white/35"> · {meta.title}, {meta.company}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress dots */}
            <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
              {PULL_QUOTES.map((q, i) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Show quote ${i + 1}`}
                  aria-current={i === idx ? "true" : undefined}
                  className={[
                    "h-1.5 rounded-full transition-all",
                    i === idx ? "w-6 bg-lime-300" : "w-1.5 bg-white/20 hover:bg-white/35",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          <div className="relative mt-2 text-right">
            <a
              href="#recommendations"
              className="text-[10px] font-mono uppercase tracking-wider text-white/40 hover:text-white/70"
            >
              See all recommendations &rarr;
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
