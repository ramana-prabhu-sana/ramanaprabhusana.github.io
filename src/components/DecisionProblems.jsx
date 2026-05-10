import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { Quote } from "lucide-react";
import Container from "./Container";
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import Badge from "./Badge";
import { decisionProblems } from "../data/decisionProblems";

const accentText = {
  lime: "text-lime-300",
  cyan: "text-cyan-300",
  violet: "text-violet-300",
  rose: "text-rose-300",
  amber: "text-amber-200",
  sky: "text-sky-300",
};

const accentBg = {
  lime: "border-lime-400/30 bg-lime-400/10",
  cyan: "border-cyan-400/30 bg-cyan-400/10",
  violet: "border-violet-400/30 bg-violet-400/10",
  rose: "border-rose-400/30 bg-rose-400/10",
  amber: "border-amber-300/30 bg-amber-300/10",
  sky: "border-sky-400/30 bg-sky-400/10",
};

export default function DecisionProblems() {
  return (
    <section id="problems" className="relative scroll-mt-24 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Problems I solve"
          title="Decision problems I can help solve"
          subtitle="Ten of the business questions analytics teams keep coming back to - with the toolkit and approach I bring to each."
          accent="amber"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {decisionProblems.map((p, idx) => {
            const Icon = Icons[p.icon] || Icons.HelpCircle;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: (idx % 3) * 0.04 }}
              >
                <Card accent={p.accent} className="h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={[
                        "grid h-10 w-10 shrink-0 place-items-center rounded-xl border",
                        accentBg[p.accent] || accentBg.lime,
                        accentText[p.accent] || accentText.lime,
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <Quote
                      className="h-6 w-6 -scale-x-100 text-white/15"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold leading-snug text-white">
                    {p.question}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {p.help}
                  </p>

                  <div className="mt-5 border-t border-white/8 pt-4">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                      Tools & methods
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.tools.map((t) => (
                        <Badge key={t} tone="ghost" size="xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
