/**
 * Static dark background with a subtle grid. Sits behind the entire app.
 *
 * Previously this layered three large `blur-3xl` radial-glow divs inside a
 * position:fixed container. On iOS WebKit, a fixed full-screen element with
 * heavily blurred child layers mis-composites during scroll and washes out
 * (or blacks out) the scrolling content above it. Stripped to a solid
 * fill + a cheap non-blurred CSS grid - no blur, no mask, no gradients,
 * nothing for WebKit to mis-composite. Pure CSS, no JS/motion.
 */
export default function AnimatedGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-ink-950"
    >
      <div className="absolute inset-0 bg-grid-soft opacity-40" />
    </div>
  );
}
