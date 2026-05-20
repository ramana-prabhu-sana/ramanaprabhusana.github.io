import { motion } from "motion/react";
import { Quote, ExternalLink } from "lucide-react";
import Container from "./Container";
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import { testimonials } from "../data/testimonials";
import { profile } from "../data/profile";

// Build initials from a name like "Jeffrey Composto" -> "JC"
function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() || "")
    .join("");
}

const avatarTint = {
  lime: "bg-lime-400/15 text-lime-200 ring-lime-300/40",
  cyan: "bg-cyan-400/15 text-cyan-200 ring-cyan-300/40",
  violet: "bg-violet-400/15 text-violet-200 ring-violet-300/40",
  rose: "bg-rose-400/15 text-rose-200 ring-rose-300/40",
};

export default function Testimonials() {
  return (
    <section
      id="recommendations"
      data-reveal
      className="relative scroll-mt-24 py-16 sm:py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="What colleagues say"
          title="Trusted by the people he's built models for"
          subtitle="Excerpts from LinkedIn recommendations - senior managers and colleagues across pharma commercial analytics."
          accent="gold"
          className="lg:max-w-5xl"
        />

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 grid gap-5 md:grid-cols-2"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <Card accent={t.accent} className="flex h-full flex-col">
                <Quote
                  className="h-6 w-6 shrink-0 text-white/30"
                  aria-hidden="true"
                />
                <blockquote className="mt-3 text-sm leading-relaxed text-white/85 sm:text-[15px]">
                  {t.quote}
                </blockquote>

                <div className="mt-5 flex items-center gap-3 border-t border-white/8 pt-4">
                  <div
                    className={[
                      "grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-semibold ring-1",
                      avatarTint[t.accent] || avatarTint.lime,
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {initials(t.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold leading-tight text-white">
                      {t.name}
                    </div>
                    <div className="mt-0.5 truncate text-[11px] text-white/65">
                      {t.title} · {t.company}
                    </div>
                    <div className="mt-0.5 text-[10px] font-mono uppercase tracking-wide text-white/40">
                      {t.relationship}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-6 flex justify-center">
          <a
            href={`${profile.links.linkedin}details/recommendations/`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs text-white/55 hover:text-white"
          >
            See all recommendations
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </Container>
    </section>
  );
}
