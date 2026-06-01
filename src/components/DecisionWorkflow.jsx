import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Boxes,
  Circle,
  Database,
  GitBranch,
  HelpCircle,
  LayoutDashboard,
  Send,
  Sliders,
} from "lucide-react";
import Container from "./Container";

const ICONS = { Boxes, Circle, Database, GitBranch, HelpCircle, LayoutDashboard, Send, Sliders };
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import Badge from "./Badge";
import { workflow } from "../data/workflow";

export default function DecisionWorkflow() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  // Keyboard nav: ←/→ between steps when focus is inside the stepper
  useEffect(() => {
    const onKey = (e) => {
      if (!stepRefs.current.includes(document.activeElement)) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = Math.min(active + 1, workflow.length - 1);
        setActive(next);
        stepRefs.current[next]?.focus();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = Math.max(active - 1, 0);
        setActive(prev);
        stepRefs.current[prev]?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const current = workflow[active];
  const CurrentIcon = ICONS[current.icon] || Circle;

  return (
    <section id="approach" data-reveal className="relative scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Commercial analytics decision workflow"
          title="From data to business decision"
          subtitle="Fuzzy business question to sharp recommendation."
          accent="violet"
        />

        {/* Stepper - wraps to multi-row grid on small screens (no horizontal
            scroll), expands to the canonical single-row stepper on lg+. */}
        <div
          className="mt-10"
          role="tablist"
          aria-label="Decision analytics workflow steps"
        >
          <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7 lg:gap-2">
            {/* Connecting line behind icons (lg+) */}
            <div className="pointer-events-none absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-white/5 via-white/15 to-white/5 lg:block" />

            {workflow.map((step, idx) => {
              const StepIcon = ICONS[step.icon] || Circle;
              const isActive = idx === active;
              const isPast = idx < active;
              return (
                <button
                  key={step.id}
                  ref={(el) => (stepRefs.current[idx] = el)}
                  onClick={() => setActive(idx)}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="workflow-detail"
                  className={[
                    "group relative flex flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center transition-colors",
                    "focus-visible:bg-white/5",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "grid h-12 w-12 place-items-center rounded-2xl border transition-colors",
                      isActive
                        ? "border-white bg-white/[0.10] text-white ring-2 ring-white/30"
                        : isPast
                        ? "border-lime-400/40 bg-lime-400/10 text-lime-300"
                        : "border-white/10 bg-white/5 text-white/60 group-hover:border-white/20 group-hover:text-white",
                    ].join(" ")}
                  >
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <div
                    className={[
                      "text-[10px] font-mono uppercase tracking-widest",
                      isActive ? "text-white/80" : "text-white/55",
                    ].join(" ")}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div
                    className={[
                      "text-xs font-medium leading-tight transition-colors lg:text-sm",
                      isActive ? "text-white" : "text-white/55",
                    ].join(" ")}
                  >
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <Card
          accent="violet"
          className="mt-6 min-h-[220px]"
          padded={false}
          id="workflow-detail"
          role="tabpanel"
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr]"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-lime-400/50 bg-lime-400/15 text-lime-200 shadow-[0_0_18px_rgba(163,230,53,0.35)]">
                  <CurrentIcon className="h-7 w-7" />
                </div>
                <div className="md:hidden">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/45">
                    Step {String(active + 1).padStart(2, "0")} / {workflow.length}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {current.title}
                  </h3>
                </div>
              </div>

              <div>
                <div className="hidden md:block">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/45">
                    Step {String(active + 1).padStart(2, "0")} / {workflow.length}
                  </div>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                    {current.title}
                  </h3>
                </div>

                <p className="mt-3 text-base leading-relaxed text-white/75">
                  {current.explanation}
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                      Tools used
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {current.tools.map((t) => (
                        <Badge key={t} tone="violet" size="xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                      Business value
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      {current.value}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>
      </Container>
    </section>
  );
}
