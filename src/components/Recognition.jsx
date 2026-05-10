import { motion } from "motion/react";
import { ExternalLink, Sparkles } from "lucide-react";
import Container from "./Container";
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import Badge from "./Badge";
import { recognition } from "../data/recognition";

const accents = ["lime", "cyan", "violet", "rose", "amber", "sky"];

export default function Recognition() {
  if (!recognition.length) return null;

  return (
    <section id="recognition" className="relative scroll-mt-24 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Proof of work"
          title="Selected projects and applied analytics"
          subtitle="Substantiated coursework, practicums, and program work - items with linkable artifacts only."
          accent="amber"
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recognition.map((r, idx) => {
            const accent = accents[idx % accents.length];
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: (idx % 6) * 0.03 }}
              >
                <Card accent={accent} className="h-full">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/75">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-base font-semibold leading-snug text-white">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {r.context}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    <Badge tone={accent} size="xs">
                      {r.skill}
                    </Badge>
                    {r.date ? (
                      <Badge tone="ghost" size="xs">
                        {r.date}
                      </Badge>
                    ) : null}
                  </div>

                  {r.link ? (
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-lime-300 hover:text-lime-200"
                    >
                      Open project
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : null}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
