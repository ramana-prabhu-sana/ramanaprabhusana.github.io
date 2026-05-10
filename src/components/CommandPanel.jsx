import { motion } from "motion/react";
import {
  Activity,
  Cpu,
  Database,
  GitBranch,
  HelpCircle,
  LayoutDashboard,
  LineChart,
  Send,
  Sliders,
} from "lucide-react";
import Avatar from "./Avatar";
import ProfileSnapshot from "./ProfileSnapshot";
import { profile } from "../data/profile";

const workflowDots = [
  { icon: HelpCircle, label: "Question" },
  { icon: Database, label: "Data" },
  { icon: Sliders, label: "Assume" },
  { icon: Cpu, label: "Model" },
  { icon: GitBranch, label: "Scenarios" },
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Send, label: "Decide" },
];

export default function CommandPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative"
    >
      {/* Outer glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-lime-400/10 via-cyan-400/10 to-violet-500/10 blur-2xl"
      />

      <div className="surface-strong glow-edge overflow-hidden rounded-3xl">
        {/* Header bar - photo + name + status */}
        <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4">
          <div className="relative inline-block">
            <Avatar
              src={profile.photo}
              alt={profile.name}
              fallback={profile.name}
              size="md"
              className="rounded-xl"
            />
            <div className="pointer-events-none absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-ink-900 bg-lime-400 text-ink-950">
              <Activity className="h-2.5 w-2.5" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-white">
              {profile.name}
            </div>
            <div className="truncate text-[11px] text-white/55">
              Purdue MSBAIM · 7 yrs analytics · {profile.location}
            </div>
          </div>
          <span className="hidden items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-white/55 sm:inline-flex">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.7)]" />
            Live
          </span>
        </div>

        <div className="grid gap-4 p-5">
          {/* Profile snapshot - Education + Now + Domain coverage hybrid */}
          <ProfileSnapshot />

          {/* Tool stack chips */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/50">
              <span>Tool stack</span>
              <LineChart className="h-3 w-3" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {profile.hero.toolStack.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-white/75"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Workflow mini-map with data pulse */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
            <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/50">
              <span>Decision workflow</span>
              <span className="font-mono text-[10px] text-white/40">7 steps</span>
            </div>
            <div className="relative">
              {/* Pulse line */}
              <div className="data-pulse-line absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 overflow-hidden bg-gradient-to-r from-white/5 via-white/15 to-white/5" />
              <div className="relative grid grid-cols-7 gap-1">
                {workflowDots.map(({ icon: Icon, label }, idx) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <div
                      className={[
                        "grid h-7 w-7 place-items-center rounded-full border",
                        idx % 2 === 0
                          ? "border-lime-400/40 bg-lime-400/10 text-lime-300"
                          : "border-cyan-400/40 bg-cyan-400/10 text-cyan-300",
                      ].join(" ")}
                    >
                      <Icon className="h-3 w-3" />
                    </div>
                    <span className="hidden text-[9px] uppercase tracking-wide text-white/45 sm:inline">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
