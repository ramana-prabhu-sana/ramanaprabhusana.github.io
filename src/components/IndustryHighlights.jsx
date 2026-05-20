import { motion } from "motion/react";
import { ChevronRight, ShieldCheck, Target, Workflow, TrendingUp } from "lucide-react";
import Container from "./Container";
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import Badge from "./Badge";
import { industryHighlights } from "../data/industryHighlights";

const accentText = {
  lime: "text-lime-300",
  cyan: "text-cyan-300",
  violet: "text-violet-300",
  rose: "text-rose-300",
  amber: "text-amber-200",
  sky: "text-sky-300",
};

const accentDot = {
  lime: "bg-lime-400/70",
  cyan: "bg-cyan-400/70",
  violet: "bg-violet-400/70",
  rose: "bg-rose-400/70",
  amber: "bg-amber-300/70",
  sky: "bg-sky-400/70",
};

const accentChipBorder = {
  lime: "border-lime-400/30 bg-lime-400/[0.06] text-lime-200",
  cyan: "border-cyan-400/30 bg-cyan-400/[0.06] text-cyan-200",
  violet: "border-violet-400/30 bg-violet-400/[0.06] text-violet-200",
  rose: "border-rose-400/30 bg-rose-400/[0.06] text-rose-200",
  amber: "border-amber-300/30 bg-amber-300/[0.06] text-amber-200",
  sky: "border-sky-400/30 bg-sky-400/[0.06] text-sky-200",
};

/**
 * Compact methodology flow strip - chip > chevron > chip > ... visually
 * shows the upstream-to-downstream pipeline used in the engagement.
 * Wraps gracefully on narrow viewports.
 */
function ProcessFlow({ steps, accent }) {
  if (!steps?.length) return null;
  const chipCls = accentChipBorder[accent] || accentChipBorder.lime;
  return (
    <div className="mt-4">
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white/45">
        <Workflow className="h-3 w-3" />
        Methodology flow
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {steps.map((step, i) => (
          <span key={i} className="inline-flex items-center gap-1.5">
            <span
              className={`inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-medium ${chipCls}`}
            >
              {step}
            </span>
            {i < steps.length - 1 ? (
              <ChevronRight className="h-3 w-3 text-white/30" aria-hidden="true" />
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function IndustryHighlights() {
  return (
    <section
      id="industry"
      data-reveal
      className="relative scroll-mt-24 py-16 sm:py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="Industry highlights"
          title="Real-world commercial decisions, redacted for the public web"
          subtitle="Selected industry engagements from Novartis and ZS Associates - molecule names, customers, and exact internal figures withheld so the methodology and decision scope can be shown publicly."
          accent="lime"
          className="lg:max-w-5xl"
        />

        {/* Trust strip - tells the recruiter what they're looking at in one line */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/70">
          <ShieldCheck className="h-3.5 w-3.5 text-lime-300" />
          NDA-safe writeups · client and molecule identifiers withheld · methodology and impact disclosed
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 grid gap-5 md:grid-cols-2"
        >
          {industryHighlights.map((h, idx) => (
            <motion.article
              key={h.id}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <Card accent={h.accent} glow className="flex h-full flex-col">
                {/* Top: tier + focus + period */}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="lime" size="xs">
                    Industry
                  </Badge>
                  <Badge tone="ghost" size="xs">
                    {h.focus}
                  </Badge>
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-white/45">
                    {h.period}
                  </span>
                </div>

                {/* Title + tagline */}
                <h3 className="mt-4 text-lg font-semibold leading-snug text-white">
                  {h.title}
                </h3>
                <p className={`mt-1 text-[11px] font-mono uppercase tracking-wider ${accentText[h.accent] || accentText.lime}`}>
                  {h.tagline}
                </p>

                {/* Company / role */}
                <div className="mt-3 text-xs text-white/55">
                  {h.company} · {h.role}
                </div>

                {/* Challenge */}
                <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white/45">
                    <Target className="h-3 w-3" />
                    The decision to support
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-white/80">
                    {h.challenge}
                  </div>
                </div>

                {/* Process flow - visual pipeline preview */}
                <ProcessFlow steps={h.flow} accent={h.accent} />

                {/* Approach */}
                <div className="mt-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white/45">
                    <Workflow className="h-3 w-3" />
                    How it was built
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {h.approach.map((step, i) => (
                      <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-white/80">
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accentDot[h.accent] || accentDot.lime}`}
                        />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Delivered + impact */}
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/45">
                      Delivered
                    </div>
                    <div className="mt-1 text-[13px] leading-relaxed text-white/80">
                      {h.delivered}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white/45">
                      <TrendingUp className="h-3 w-3" />
                      Business impact
                    </div>
                    <div className="mt-1 text-[13px] leading-relaxed text-white/80">
                      {h.impact}
                    </div>
                  </div>
                </div>

              </Card>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-6 text-center text-xs text-white/45">
          Want to discuss any of these in depth?{" "}
          <a href="#contact" className="text-lime-300 hover:text-lime-200">
            Get in touch
          </a>{" "}
          or{" "}
          <a
            href="https://calendly.com/ramana_prabhu_sana/30min"
            target="_blank"
            rel="noreferrer"
            className="text-lime-300 hover:text-lime-200"
          >
            schedule a call
          </a>
          .
        </div>
      </Container>
    </section>
  );
}
