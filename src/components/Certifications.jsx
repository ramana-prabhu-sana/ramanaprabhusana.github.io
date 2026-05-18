import { motion } from "motion/react";
import { Award, ExternalLink } from "lucide-react";
import Container from "./Container";
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import Badge from "./Badge";
import { certifications } from "../data/certifications";

const accents = ["lime", "cyan", "violet", "amber", "rose", "sky"];

export default function Certifications() {
  return (
    <section id="certifications" className="relative scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials across data, BI, and cloud"
          subtitle="AWS, Azure AI, INFORMS, DataCamp, Coursera - verifiable badges that cover the foundations."
          accent="violet"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, idx) => {
            const accent = accents[idx % accents.length];
            const inner = (
              <Card accent={accent} className="h-full">
                <div className="flex items-start gap-3">
                  {c.badge && c.badgeStyle === "logo" ? (
                    // Issuer logo (SVG): smaller, darker bg, padded - reads as
                    // a brand mark rather than a credential image.
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-white/10 bg-ink-900 p-3">
                      <img
                        src={c.badge}
                        alt={`${c.issuer} logo`}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : c.badge ? (
                    // Credential badge image (AWS, Azure, etc.): full bleed
                    // on white plate to match the issuer's badge presentation.
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-white/95 p-1 shadow-sm">
                      <img
                        src={c.badge}
                        alt={`${c.name} badge`}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/75">
                      <Award className="h-5 w-5" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold leading-tight text-white">
                      {c.name}
                    </h3>
                    <div className="mt-1 text-xs text-white/55">{c.issuer}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <Badge tone={accent} size="xs">
                    {c.skill}
                  </Badge>
                  {c.credentialUrl ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-lime-300">
                      View credential
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-wide text-white/55">
                      Credential on file
                    </span>
                  )}
                </div>
              </Card>
            );

            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (idx % 6) * 0.03 }}
              >
                {c.credentialUrl ? (
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
