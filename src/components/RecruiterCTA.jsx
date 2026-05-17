import { Suspense, lazy, useState } from "react";
import { motion } from "motion/react";
import { Calendar, Download, Eye, Github, Linkedin, Mail } from "lucide-react";
import Container from "./Container";
import Button from "./Button";
import LighthouseBadges from "./LighthouseBadges";
import { profile } from "../data/profile";

const ResumePreviewModal = lazy(() => import("./ResumePreviewModal"));

export default function RecruiterCTA() {
  const [resumeOpen, setResumeOpen] = useState(false);
  return (
    <section className="relative scroll-mt-24 py-16 sm:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
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
                Ready when you are.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                Seven years of forecasts, dashboards, and decision models leaders actually used.
                Now at Purdue MSBAIM with a Consulting and Data Science focus, graduating
                December 2026. Email is the fastest path - I reply same-day.
              </p>

              {profile.availability ? (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/[0.08] px-3 py-1.5 text-[12px] text-lime-100">
                  <Calendar className="h-3.5 w-3.5 text-lime-300" />
                  {profile.availability}
                </div>
              ) : null}

              {/* Quick stats - what a recruiter wants to grab in 3 seconds. */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {[
                  "7 yrs pharma commercial analytics",
                  "7 roles",
                  "6 featured projects",
                  "Cross-domain ML portfolio",
                ].map((stat) => (
                  <span
                    key={stat}
                    className="inline-flex items-center whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 font-mono text-[11px] text-white/80"
                  >
                    {stat}
                  </span>
                ))}
              </div>

              {profile.domainBreakdown?.length ? (
                <div className="mt-2.5 text-[11px] text-white/55">
                  ML portfolio spans{" "}
                  <span className="font-medium text-white/85">
                    {profile.domainBreakdown.join(" · ")}
                  </span>
                </div>
              ) : null}

              <LighthouseBadges className="mt-6 border-t border-white/8 pt-5" />
            </div>

            <div className="flex flex-col gap-3">
              <Button
                type="button"
                onClick={() => setResumeOpen(true)}
                variant="primary"
                size="lg"
                icon={Eye}
              >
                Preview Resume
              </Button>
              <Button
                as="a"
                href={profile.links.resume}
                download
                variant="outline"
                size="lg"
                icon={Download}
              >
                Download Resume
              </Button>
              <Button
                as="a"
                href={profile.links.calendly}
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="lg"
                icon={Calendar}
              >
                Schedule a call
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

      {resumeOpen ? (
        <Suspense fallback={null}>
          <ResumePreviewModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
        </Suspense>
      ) : null}
    </section>
  );
}
