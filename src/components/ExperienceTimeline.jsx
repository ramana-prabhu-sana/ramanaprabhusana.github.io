import { motion } from "motion/react";
import { Calendar, MapPin } from "lucide-react";
import Container from "./Container";
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import Badge from "./Badge";
import Avatar from "./Avatar";
import { experience } from "../data/experience";

export default function ExperienceTimeline() {
  return (
    <section id="experience" data-reveal className="relative scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Experience timeline"
          title="Seven years across pharma commercial analytics and consulting"
          subtitle="Launch, brand, pipeline, and forecast work across Novartis, Genpact, and ZS Associates."
          accent="rose"
          className="lg:max-w-5xl"
        />

        <div className="relative mt-12">
          {/* Vertical spine */}
          <div className="pointer-events-none absolute left-[35px] top-2 bottom-2 w-px bg-gradient-to-b from-rose-400/40 via-white/10 to-violet-400/40 sm:left-[44px]" />

          <div className="space-y-6">
            {experience.map((role, idx) => (
              <motion.article
                key={role.id}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className="relative grid grid-cols-[auto_1fr] gap-4 sm:gap-6"
              >
                {/* Logo */}
                <div className="relative z-10 pt-1">
                  <Avatar
                    src={role.logo}
                    alt={role.company}
                    fallback={role.company}
                    size="lg"
                    className={role.logoBleed
                      ? "rounded-2xl ring-1 ring-white/25 shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
                      : "rounded-2xl bg-white/95 p-1.5 shadow-sm"}
                    imgClassName={role.logoBleed ? "object-cover" : "object-contain"}
                  />
                </div>

                <Card accent={idx === 0 ? "lime" : idx % 2 === 0 ? "cyan" : "violet"}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold leading-tight text-white">
                        {role.role}
                      </h3>
                      <div className="mt-1 text-sm text-white/85">
                        {role.company}
                      </div>
                      {role.location ? (
                        <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-white/55">
                          <MapPin className="h-3 w-3" aria-hidden="true" />
                          {role.location}
                        </div>
                      ) : null}
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-mono uppercase tracking-wide text-white/65">
                        <Calendar className="h-3 w-3" />
                        {role.dates}
                      </div>
                    </div>
                  </div>

                  {role.focus ? (
                    <div className="mt-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-xs text-white/65">
                      <span className="font-semibold text-white/80">Focus · </span>
                      {role.focus}
                    </div>
                  ) : null}

                  {role.bullets?.length ? (
                    <ul className="mt-4 space-y-2.5 text-sm text-white/85">
                      {role.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-400/70" />
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {role.tags?.length ? (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {role.tags.map((t) => (
                        <Badge key={t} tone="ghost" size="xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
