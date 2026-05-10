import { motion } from "motion/react";
import { ArrowRight, Download, Mail } from "lucide-react";
import Container from "./Container";
import Button from "./Button";
import Badge from "./Badge";
import Card from "./Card";
import CommandPanel from "./CommandPanel";
import { profile } from "../data/profile";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-24 overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/55"
            >
              <Badge tone="lime" size="sm">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400" />
                {profile.status}
              </Badge>
              <span className="hidden sm:inline text-white/30">·</span>
              <span className="text-white/55">Purdue MSBAIM · {profile.location}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              <span className="block">{profile.hero.headline.split(" and ")[0]} and</span>
              <span className="block bg-gradient-to-r from-lime-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                {profile.hero.headline.split(" and ")[1]}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
            >
              {profile.hero.subheadline}
            </motion.p>

            {/* Field tags */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {profile.fields.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
                >
                  {f}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
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
                href="#case-studies"
                variant="outline"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
              >
                View Case Studies
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

            {/* Credibility cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-10 grid gap-3 sm:grid-cols-2"
            >
              {profile.hero.credibility.map((c) => (
                <Card key={c.label} hover={false} padded={false} className="px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                    {c.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    {c.value}
                  </div>
                  <div className="mt-1 text-xs text-white/55">{c.sub}</div>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Right: command panel */}
          <div className="lg:pl-2">
            <CommandPanel />
          </div>
        </div>
      </Container>
    </section>
  );
}
