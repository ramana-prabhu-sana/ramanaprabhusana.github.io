/**
 * Subtle animated grid + radial-glow background. Sits behind the entire app.
 * Pure CSS - no JS or motion lib for this layer (best performance).
 */
export default function AnimatedGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950"
    >
      {/* Base grid */}
      <div className="absolute inset-0 bg-grid-soft opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_30%,transparent_75%)]" />

      {/* Top glow */}
      <div className="absolute -top-40 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-500/15 via-violet-500/15 to-transparent blur-3xl" />

      {/* Mid-right glow */}
      <div className="absolute right-[-120px] top-[35%] h-[420px] w-[420px] rounded-full bg-lime-400/10 blur-3xl" />

      {/* Bottom-left glow */}
      <div className="absolute bottom-[-160px] left-[-120px] h-[480px] w-[480px] rounded-full bg-violet-500/10 blur-3xl" />

      {/* Soft top vignette */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-950 to-transparent" />
    </div>
  );
}
