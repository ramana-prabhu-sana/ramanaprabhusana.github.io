import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Brain,
  ChevronRight,
  Cloud,
  Compass,
  LineChart,
  Sparkles,
  Workflow,
} from "lucide-react";
import Container from "./Container";

const ICONS = { Activity, BarChart3, Brain, Cloud, Compass, LineChart, Sparkles, Workflow };
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import Badge from "./Badge";
import { skills } from "../data/skills";
import { caseStudies } from "../data/caseStudies";
import { experience } from "../data/experience";

const accentText = {
  lime: "text-lime-300",
  cyan: "text-cyan-300",
  violet: "text-violet-300",
  rose: "text-rose-300",
  amber: "text-amber-200",
  sky: "text-sky-300",
};

const accentBg = {
  lime: "border-lime-400/40 bg-lime-400/15",
  cyan: "border-cyan-400/40 bg-cyan-400/15",
  violet: "border-violet-400/40 bg-violet-400/15",
  rose: "border-rose-400/40 bg-rose-400/15",
  amber: "border-amber-300/40 bg-amber-300/15",
  sky: "border-sky-400/40 bg-sky-400/15",
};

export default function SkillsIntelligenceMap() {
  const [activeId, setActiveId] = useState(skills[0].id);

  const active = useMemo(
    () => skills.find((s) => s.id === activeId) || skills[0],
    [activeId]
  );

  const ActiveIcon = ICONS[active.icon] || Sparkles;

  const relatedCases = active.relatedCases
    .map((id) => caseStudies.find((c) => c.id === id))
    .filter(Boolean);

  const relatedRoles = active.relatedExperience
    .map((id) => experience.find((e) => e.id === id))
    .filter(Boolean);

  return (
    <section id="skills" className="relative scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Skills intelligence map"
          title="Pick a domain - see what it connects to"
          subtitle="Each capability area links to the case studies, experience, and business value it actually shows up in."
          accent="cyan"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
          {/* Domain list */}
          <div className="grid gap-2">
            {skills.map((s) => {
              const Icon = ICONS[s.icon] || Sparkles;
              const isActive = s.id === activeId;
              const related = s.relatedCases.length;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveId(s.id)}
                  className={[
                    "group relative flex items-center gap-3 rounded-2xl border p-3 text-left transition-all",
                    isActive
                      ? "border-white/20 bg-white/8 shadow-glow"
                      : "border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/5",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  <div
                    className={[
                      "grid h-10 w-10 shrink-0 place-items-center rounded-xl border",
                      accentBg[s.accent] || accentBg.lime,
                      accentText[s.accent] || accentText.lime,
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className={[
                        "text-sm font-semibold leading-tight",
                        isActive ? "text-white" : "text-white/80",
                      ].join(" ")}
                    >
                      {s.title}
                    </div>
                    <div className="mt-0.5 text-[11px] text-white/45">
                      {related} related case{related === 1 ? "" : "s"}
                    </div>
                  </div>
                  <ChevronRight
                    className={[
                      "h-4 w-4 transition-transform",
                      isActive ? "text-white" : "text-white/30",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <Card accent={active.accent} className="min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={[
                      "grid h-14 w-14 shrink-0 place-items-center rounded-2xl border",
                      accentBg[active.accent] || accentBg.lime,
                      accentText[active.accent] || accentText.lime,
                    ].join(" ")}
                  >
                    <ActiveIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                      {active.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/80">
                      {active.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                      Tools & topics
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {active.items.map((i) => (
                        <Badge key={i} tone={active.accent} size="xs">
                          {i}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                      Business value
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      {active.businessValue}
                    </p>
                  </div>
                </div>

                {/* Related case studies */}
                <div className="mt-6 border-t border-white/8 pt-5">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                    Related case studies
                  </div>
                  {relatedCases.length ? (
                    <div className="mt-3 grid gap-2">
                      {relatedCases.map((c) => (
                        <a
                          key={c.id}
                          href="#case-studies"
                          className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 transition-colors hover:border-white/20 hover:bg-white/8"
                        >
                          <span className="text-sm text-white/85">{c.title}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-white/45" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-white/45">
                      No directly linked case studies - featured across multiple workflows.
                    </p>
                  )}
                </div>

                {/* Related experience */}
                {relatedRoles.length ? (
                  <div className="mt-6 border-t border-white/8 pt-5">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                      Where I have applied this
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {relatedRoles.map((r) => (
                        <Badge key={r.id} tone="ghost" size="xs">
                          {r.company} · {r.role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </Container>
    </section>
  );
}
