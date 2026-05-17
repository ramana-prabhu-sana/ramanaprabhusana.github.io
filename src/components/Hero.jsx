import { Suspense, lazy, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Download, Eye, Mail } from "lucide-react";
import Container from "./Container";
import Button from "./Button";
import Badge from "./Badge";
import CommandPanel from "./CommandPanel";
import { profile } from "../data/profile";

const ResumePreviewModal = lazy(() => import("./ResumePreviewModal"));

export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const _headlineParts = profile.hero.headline.split(". ");
  const headlineTop = _headlineParts[0] + ".";
  const headlineBottom = _headlineParts.slice(1).join(". ");

  return (
    <section
      id="home"
      className="relative scroll-mt-24 overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/65"
            >
              <Badge tone="lime" size="sm">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400" />
                {profile.status}
              </Badge>
              <span className="hidden sm:inline text-white/30">·</span>
              <span className="text-white/65">Purdue MSBAIM · {profile.location}</span>
            </motion.div>

            {profile.availability ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.02 }}
                className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] normal-case tracking-normal text-white/55"
              >
                <span>{profile.availability}</span>
                <span className="text-white/25">·</span>
                <span className="text-white/55">
                  7 yrs across Novartis, ZS, Genpact
                </span>
              </motion.div>
            ) : null}

            {profile.targeting?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.03 }}
                className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.2em] text-white/65"
              >
                <span className="font-semibold text-lime-300">Targeting roles</span>
                <span className="text-white/30">·</span>
                <span className="text-white/75">
                  {profile.targeting.join(" · ")}
                </span>
              </motion.div>
            ) : null}

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl"
            >
              <span className="block">{headlineTop}</span>
              <span className="block bg-gradient-to-r from-lime-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                {headlineBottom}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
            >
              {profile.hero.subheadline}
            </motion.p>

            {/* CTAs - lifted above field pills so Download Resume lands above the fold */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
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
                Download
              </Button>
              <Button
                as="a"
                href="#industry-highlights"
                variant="outline"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
              >
                See Industry Work
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
                href="#contact"
                variant="ghost"
                size="lg"
                icon={Mail}
              >
                Contact Me
              </Button>
            </motion.div>

            {/* Field tags */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {profile.fields.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                >
                  {f}
                </span>
              ))}
            </motion.div>

            {/* Credibility cards removed - right ProfileSnapshot panel already
                surfaces years, toolkit, education, and domain coverage. */}
          </div>

          {/* Right: command panel */}
          <div className="lg:pl-2">
            <CommandPanel />
          </div>
        </div>
      </Container>

      {/* Resume preview - lazy-loaded only when opened (conditional render
          keeps the PDF + iframe component out of the initial bundle). */}
      {resumeOpen ? (
        <Suspense fallback={null}>
          <ResumePreviewModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
        </Suspense>
      ) : null}
    </section>
  );
}
