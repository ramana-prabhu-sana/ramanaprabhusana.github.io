import { motion } from "motion/react";
import { LineChart } from "lucide-react";
import Avatar from "./Avatar";
import ProfileSnapshot from "./ProfileSnapshot";
import { profile } from "../data/profile";

export default function CommandPanel() {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative"
    >
      <div className="surface-strong glow-edge overflow-hidden rounded-3xl">
        {/* Header bar - larger photo + name + meta */}
        <div className="flex items-center gap-4 border-b border-white/8 px-5 py-5">
          <Avatar
            src={profile.photo}
            alt={profile.name}
            fallback={profile.name}
            size="lg"
            className="rounded-2xl"
            imgClassName="object-cover object-[center_15%]"
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-base font-semibold text-white">
              {profile.name}
            </div>
            <div className="truncate text-xs text-white/60">
              Purdue MSBAIM · 7 yrs industry analytics
            </div>
            <div className="truncate text-[11px] text-white/45">
              {profile.location}
            </div>
          </div>
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

        </div>
      </div>
    </motion.div>
  );
}
