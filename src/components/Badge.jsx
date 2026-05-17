const tones = {
  default: "border-white/15 bg-white/5 text-white/80",
  lime: "border-lime-400/30 bg-lime-400/10 text-lime-200",
  cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  violet: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  rose: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  amber: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  sky: "border-sky-400/30 bg-sky-400/10 text-sky-200",
  gold: "border-gold/30 bg-gold/10 text-amber-100",
  ghost: "border-white/10 bg-transparent text-white/60",
};

const sizes = {
  xs: "px-2 py-0.5 text-[10px] tracking-wide",
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
};

export default function Badge({
  children,
  tone = "default",
  size = "sm",
  icon: Icon = null,
  className = "",
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border font-medium uppercase tracking-wide",
        tones[tone] || tones.default,
        sizes[size] || sizes.sm,
        className,
      ].join(" ")}
    >
      {Icon ? <Icon className="h-3 w-3" aria-hidden="true" /> : null}
      <span className="normal-case tracking-normal">{children}</span>
    </span>
  );
}
