import React from "react";

const accentBorder = {
  lime: "before:bg-gradient-to-br before:from-lime-400/40 before:via-emerald-300/10 before:to-transparent",
  cyan: "before:bg-gradient-to-br before:from-cyan-400/40 before:via-sky-400/10 before:to-transparent",
  violet:
    "before:bg-gradient-to-br before:from-violet-400/40 before:via-fuchsia-400/10 before:to-transparent",
  rose: "before:bg-gradient-to-br before:from-rose-400/40 before:via-pink-400/10 before:to-transparent",
  amber:
    "before:bg-gradient-to-br before:from-amber-300/40 before:via-orange-300/10 before:to-transparent",
  sky: "before:bg-gradient-to-br before:from-sky-400/40 before:via-blue-400/10 before:to-transparent",
  gold: "before:bg-gradient-to-br before:from-gold/40 before:via-amber-300/10 before:to-transparent",
  none: "before:bg-white/5",
};

/**
 * Glass card with optional gradient-border accent.
 * Using a `::before` pseudo for the gradient border keeps the inner
 * background opaque so text stays crisp.
 */
export default function Card({
  children,
  as: Tag = "div",
  className = "",
  accent = "none",
  hover = true,
  padded = true,
  ...rest
}) {
  return (
    <Tag
      className={[
        "relative isolate rounded-2xl",
        "before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:p-px before:content-['']",
        accentBorder[accent] || accentBorder.none,
        // inner surface
        "bg-ink-900/70 border border-white/10 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]",
        hover
          ? "transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-ink-900/85"
          : "",
        padded ? "p-5 sm:p-6" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}
