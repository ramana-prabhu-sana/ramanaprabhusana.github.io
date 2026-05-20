import { motion } from "motion/react";
import { GitMerge, GraduationCap, Layers, Rocket, Sparkles } from "lucide-react";
import Container from "./Container";

const ICONS = { GitMerge, GraduationCap, Layers, Rocket, Sparkles };
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import { differentiators } from "../data/differentiators";

const accents = ["lime", "cyan", "violet", "amber"];

export default function ProfileDifferentiator() {
  return (
    <section id="strengths" data-reveal className="relative scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Why this profile stands out"
          title="A rare combination of industry depth and graduate analytics training"
          subtitle="Industry analytics experience, forecasting depth, technical execution, and business-facing communication - wired into the same operator."
          accent="lime"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {differentiators.map((d, idx) => {
            const Icon = ICONS[d.icon] || Sparkles;
            return (
              <motion.div
                key={d.id}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <Card accent={accents[idx % accents.length]} className="h-full">
                  <div className="flex items-start gap-4">
                    <div
                      className={[
                        "grid h-12 w-12 shrink-0 place-items-center rounded-xl border",
                        accents[idx % accents.length] === "lime"
                          ? "border-lime-400/30 bg-lime-400/10 text-lime-300"
                          : accents[idx % accents.length] === "cyan"
                          ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                          : accents[idx % accents.length] === "violet"
                          ? "border-violet-400/30 bg-violet-400/10 text-violet-300"
                          : "border-amber-300/30 bg-amber-300/10 text-amber-200",
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold tracking-tight text-white">
                        {d.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/80">
                        {d.body}
                      </p>
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
