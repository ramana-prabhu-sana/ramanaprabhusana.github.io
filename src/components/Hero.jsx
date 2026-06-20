import { motion } from "motion/react";
import { ArrowDown, ArrowRight, Calendar, Download, Eye, Mail, Sparkles } from "lucide-react";
import Container from "./Container";
import Button from "./Button";
import Badge from "./Badge";
import CommandPanel from "./CommandPanel";
import { profile } from "../data/profile";

export default function Hero() {
  const _headlineParts = profile.hero.headline.split(". ");
  const headlineTop = _headlineParts[0] + ".";
  const headlineBottom = _headlineParts.slice(1).join(". ");

  return (
    <section
      id="home"
      className="bg-ambient relative scroll-mt-24 overflow-hidden pt-20 pb-20 sm:pt-24 lg:pt-28"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* min-w-0 on grid children prevents min-content (long button labels,
              command-panel chips) from blowing the track wider than the
              viewport, which on mobile was getting clipped by overflow-hidden
              on the section and visually cutting off the right side of the
              command panel + headline. */}
          {/* Left: copy */}
          <div className="min-w-0">
            <motion.div
              initial={false}
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
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.02 }}
                className="mt-2 text-[11px] normal-case tracking-normal text-white/55"
              >
                {profile.availability}
              </motion.div>
            ) : null}

            <motion.h1
              initial={false}
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
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
            >
              {profile.hero.subheadline}
            </motion.p>

            {/* Discoverability hook for the interactive forecast demo. Sits
                under the subhead so a recruiter scanning the hero learns the
                site is interactive before they decide whether to scroll. */}
            {/* Quiet neutral chip (no lime glow / pulse) so the primary
                Preview Resume button is the single lime focal point. A small
                static lime dot keeps a subtle "live" hint without competing. */}
            <motion.a
              href="#forecast-demo"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="group mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-white/70 transition-colors hover:border-white/30 hover:bg-white/[0.07] hover:text-white/90"
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-lime-400/80" aria-hidden="true" />
              <Sparkles className="h-4 w-4 text-white/55" aria-hidden="true" />
              Try the live launch model
              <ArrowDown className="h-3.5 w-3.5 text-white/50 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </motion.a>

            {/* CTAs - one clear primary (Preview Resume) paired with its
                natural secondary (Download): a recruiter on a first visit
                wants to evaluate the resume, not commit to a call. Engagement
                actions live in the quiet row below. */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Button
                as="a"
                href={profile.links.resume}
                target="_blank"
                rel="noreferrer"
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
            </motion.div>

            {/* Utility actions - quiet tertiary row, deliberately low-contrast
                so they never compete with the primary CTA. */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-1 text-white/55"
            >
              <Button
                as="a"
                href={profile.links.calendly}
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                size="sm"
                icon={Calendar}
              >
                Schedule a call
              </Button>
              <span aria-hidden="true" className="px-1 text-white/20">·</span>
              <Button
                as="a"
                href="#industry"
                variant="ghost"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
              >
                See industry work
              </Button>
              <span aria-hidden="true" className="px-1 text-white/20">·</span>
              <Button
                as="a"
                href="#contact"
                variant="ghost"
                size="sm"
                icon={Mail}
              >
                Contact
              </Button>
            </motion.div>

            {/* Field tags removed - subhead already names the work, right
                ProfileSnapshot panel covers domain breadth. */}
          </div>

          {/* Right: command panel */}
          <div className="min-w-0 lg:pl-2">
            <CommandPanel />
          </div>
        </div>
      </Container>
    </section>
  );
}
