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
            <motion.a
              href="#forecast-demo"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="group mt-5 inline-flex items-center gap-2 rounded-full border border-lime-400/60 bg-lime-400/[0.14] px-4 py-2 text-[13px] font-medium text-lime-100 shadow-[0_0_24px_-8px_rgba(163,230,53,0.55)] transition-colors hover:border-lime-400/80 hover:bg-lime-400/[0.22]"
            >
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-300" />
              </span>
              <Sparkles className="h-4 w-4 text-lime-300" aria-hidden="true" />
              Try the live launch model
              <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </motion.a>

            {/* CTAs - lifted above field pills so Download Resume lands above the fold */}
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
              <Button
                as="a"
                href="#industry"
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
