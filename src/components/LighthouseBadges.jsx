import { motion } from "motion/react";
import { Gauge } from "lucide-react";

// Scores measured against the live ramanaprabhusana.com build via the
// Lighthouse CLI (Chrome headless, mobile profile). Re-audit after
// material changes - numbers here are claims, not aspirations.
const SCORES = [
  { label: "Performance", value: 99, accent: "lime" },
  { label: "Accessibility", value: 100, accent: "cyan" },
  { label: "Best practices", value: 100, accent: "violet" },
  { label: "SEO", value: 100, accent: "amber" },
];

const accentRing = {
  lime: "ring-lime-400/50",
  cyan: "ring-cyan-400/50",
  violet: "ring-violet-400/50",
  amber: "ring-amber-300/50",
};

const accentText = {
  lime: "text-lime-300",
  cyan: "text-cyan-300",
  violet: "text-violet-300",
  amber: "text-amber-200",
};

export default function LighthouseBadges({ className = "" }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">
        <Gauge className="h-3 w-3" />
        Lighthouse
      </div>
      {SCORES.map((s, idx) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1"
        >
          <span
            className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] ring-1 ${accentRing[s.accent] || accentRing.lime}`}
          >
            <span className={`text-[11px] font-semibold ${accentText[s.accent] || accentText.lime}`}>
              {s.value}
            </span>
          </span>
          <span className="text-[11px] text-white/70">{s.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
