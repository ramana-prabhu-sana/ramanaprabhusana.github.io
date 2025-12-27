import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-zinc-900 dark:bg-white"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
