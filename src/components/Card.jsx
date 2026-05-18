import React from "react";

/**
 * Flat content card.
 *
 * Previously this used `isolate` (a stacking context per card), a `::before`
 * gradient-border pseudo on its own `-z-10` layer, and `backdrop-blur-md`.
 * Across ~40 cards on a ~15,000px single page that produced far more
 * GPU-composited layers than iOS WebKit will paint, so below-the-fold
 * content rendered washed-out on iPhone (computed styles were correct - a
 * rasterization-budget failure, confirmed via an on-device diagnostic).
 * Stripped to a single opaque bordered panel: no stacking context, no
 * pseudo layer, no backdrop-filter, no transform on hover. Visually
 * near-identical (clean hairline border); the faint gradient-accent edge
 * is dropped in exchange for actually rendering on iOS.
 *
 * `accent` is accepted for API compatibility but no longer renders a
 * gradient edge (kept so callers don't need to change).
 */
export default function Card({
  children,
  as: Tag = "div",
  className = "",
  accent, // eslint-disable-line no-unused-vars
  hover = true,
  padded = true,
  ...rest
}) {
  return (
    <Tag
      className={[
        "relative rounded-2xl border border-white/10 bg-ink-900/80",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]",
        hover ? "transition-colors duration-200 hover:border-white/20" : "",
        padded ? "p-5 sm:p-6" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}
