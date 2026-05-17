export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  accent = "lime",
  className = "",
}) {
  const accentColor = {
    lime: "text-lime-300",
    cyan: "text-cyan-300",
    violet: "text-violet-300",
    rose: "text-rose-300",
    amber: "text-amber-200",
    sky: "text-sky-300",
    gold: "text-gold-light",
  }[accent] || "text-lime-300";

  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow ? (
        <div
          className={`text-xs font-semibold uppercase tracking-[0.18em] ${accentColor}`}
        >
          {eyebrow}
        </div>
      ) : null}
      {title ? (
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
      ) : null}
      {subtitle ? (
        <p className="mt-3 text-base leading-relaxed text-white/80 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
