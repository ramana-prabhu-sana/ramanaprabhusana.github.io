import { motion } from "motion/react";
import * as Icons from "lucide-react";
import Container from "./Container";
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import Badge from "./Badge";
import { valueAreas } from "../data/valueAreas";

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

export default function ValueSnapshot() {
  return (
    <section id="value" className="relative scroll-mt-24 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Employer value snapshot"
          title="What I bring"
          subtitle="Six capability areas I can plug into on day one - across forecasting, BI, automation, healthcare, data science, and consulting."
          accent="cyan"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {valueAreas.map((v, idx) => {
            const Icon = Icons[v.icon] || Icons.Sparkles;
            return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                <Card accent={v.accent} className="h-full">
                  <div
                    className={[
                      "grid h-11 w-11 place-items-center rounded-xl border",
                      accentBg[v.accent] || accentBg.lime,
                      accentText[v.accent] || accentText.lime,
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {v.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {v.chips.map((chip) => (
                      <Badge key={chip} tone={v.accent} size="xs">
                        {chip}
                      </Badge>
                    ))}
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
