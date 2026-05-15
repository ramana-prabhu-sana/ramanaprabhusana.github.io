import { motion } from "motion/react";
import { Calendar, GraduationCap, MapPin } from "lucide-react";
import Container from "./Container";
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import Badge from "./Badge";
import Avatar from "./Avatar";
import { education } from "../data/education";

export default function Education() {
  return (
    <section id="education" className="relative scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Education"
          title="Graduate analytics training at Purdue"
          subtitle="MS Business Analytics and Information Management with a Consulting and Data Science focus."
          accent="gold"
        />

        <div className="mt-10 grid items-start gap-5 lg:grid-cols-2">
          {education.map((ed, idx) => (
            <motion.div
              key={ed.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <Card accent={idx === 0 ? "gold" : "cyan"} className="h-full">
                <div className="flex items-start gap-4">
                  <Avatar
                    src={ed.logo}
                    alt={ed.school}
                    fallback={ed.school}
                    size="lg"
                    className="rounded-2xl bg-white/90 p-2"
                    imgClassName="object-contain"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-amber-200">
                      <GraduationCap className="h-3 w-3" />
                      {idx === 0 ? "Graduate" : "Undergraduate"}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold leading-snug text-white">
                      {ed.school}
                    </h3>
                    <div className="mt-1 text-sm text-white/75">{ed.degree}</div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/55">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {ed.dates}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {ed.location}
                      </span>
                    </div>

                    {ed.focus ? (
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 text-xs text-amber-100">
                        <span className="text-[10px] uppercase tracking-wide opacity-70">
                          Focus
                        </span>
                        <span className="font-medium">{ed.focus}</span>
                      </div>
                    ) : null}

                    {ed.coursework?.length ? (
                      <div className="mt-5">
                        <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                          Relevant coursework
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {ed.coursework.map((c) => (
                            <Badge key={c} tone="ghost" size="xs">
                              {c}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
