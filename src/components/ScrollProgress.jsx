import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin gradient bar at the very top of the page that fills as the user scrolls.
 * Pure progress indicator - no JS state, no rerenders, uses motion's scroll
 * transform directly. ~10 lines of work, real UX signal that the page has more
 * below the fold and tracks how far you've scanned.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-lime-400 via-cyan-300 to-violet-400"
    />
  );
}
