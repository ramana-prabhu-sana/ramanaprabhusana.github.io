import React from "react";

const variants = {
  primary:
    "bg-lime-400 text-ink-950 hover:bg-lime-300 focus-visible:bg-lime-300 shadow-glow",
  secondary:
    "bg-white/8 text-white border border-white/15 hover:bg-white/15 hover:border-white/25",
  ghost:
    "bg-transparent text-white/80 hover:text-white hover:bg-white/5",
  outline:
    "bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export default function Button({
  as: Tag = "button",
  variant = "secondary",
  size = "md",
  icon: Icon = null,
  iconPosition = "left",
  className = "",
  children,
  ...rest
}) {
  return (
    <Tag
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium",
        "transition-all duration-150 will-change-transform",
        "focus-visible:outline-none",
        variants[variant] || variants.secondary,
        sizes[size] || sizes.md,
        className,
      ].join(" ")}
      {...rest}
    >
      {Icon && iconPosition === "left" ? (
        <Icon className="h-4 w-4" aria-hidden="true" />
      ) : null}
      <span>{children}</span>
      {Icon && iconPosition === "right" ? (
        <Icon className="h-4 w-4" aria-hidden="true" />
      ) : null}
    </Tag>
  );
}
