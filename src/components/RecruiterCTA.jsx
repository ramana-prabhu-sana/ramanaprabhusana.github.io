import { motion } from "motion/react";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import Container from "./Container";
import Button from "./Button";
import { profile } from "../data/profile";

export default function RecruiterCTA() {
  return (
    <section className="relative scroll-mt-24 py-20 sm:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 p-8 sm:p-12 lg:p-16"
        >
          {/* Decorative glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-lime-400/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-grid-soft opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_75%)]"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300">
                For recruiters and hiring leaders
              </div>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                Looking for analytics talent who understands both business and data?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                I bring hands-on industry analytics experience, strong forecasting and automation skills, and growing data science depth from Purdue MSBAIM. I am especially interested in business analytics, healthcare analytics, commercial analytics, forecasting, consulting, decision science, and data-driven strategy roles.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                as="a"
                href={profile.links.resume}
                target="_blank"
                rel="noreferrer"
                variant="primary"
                size="lg"
                icon={Download}
              >
                Download Resume
              </Button>
              <Button
                as="a"
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="lg"
                icon={Linkedin}
              >
                Connect on LinkedIn
              </Button>
              <Button
                as="a"
                href={profile.links.email}
                variant="outline"
                size="lg"
                icon={Mail}
              >
                Email Me
              </Button>
              <Button
                as="a"
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                size="lg"
                icon={Github}
              >
                View GitHub
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
