import { motion } from "motion/react";
import Container from "./Container";
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import { framework } from "../data/framework";

export default function DecisionFramework() {
  return (
    <section id="framework" className="relative scroll-mt-24 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Operating principles"
          title="How I turn data into decisions"
          subtitle="A consulting-style framework I run on every analytics engagement - from a fuzzy brief to an executable recommendation."
          accent="cyan"
        />

        <div className="relative mt-12">
          {/* Vertical spine on lg+ */}
          <div className="pointer-events-none absolute left-7 top-2 bottom-2 hidden w-px bg-gradient-to-b from-cyan-400/40 via-white/10 to-violet-400/40 lg:block" />

          <div className="space-y-5">
            {framework.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative grid grid-cols-[auto_1fr] gap-5 lg:gap-6"
              >
                {/* Step number marker */}
                <div className="relative z-10">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-ink-900/90 font-mono text-base font-semibold text-cyan-300 shadow-glow-cyan">
                    {step.step}
                  </div>
                </div>

                <Card accent={idx % 2 === 0 ? "cyan" : "violet"} className="flex-1">
                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <div className="mt-4 grid gap-5 md:grid-cols-2">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                        What I do
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/75">
                        {step.what}
                      </p>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                        Why it matters
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/75">
                        {step.why}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
