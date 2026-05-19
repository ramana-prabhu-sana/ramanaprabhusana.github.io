/**
 * Plain-DOM replacement for "motion/react" (Framer Motion), wired in via a
 * Vite alias (see vite.config.js).
 *
 * Why: on iOS 18 WebKit, content rendered through Framer Motion's runtime
 * computes correct styles but the browser defers/never paints it - the
 * page renders black/washed-out on scroll on iPhone while desktop Chrome
 * is fine (confirmed with an on-device diagnostic: computed opacity was 1,
 * yet pixels were not painted). Every entrance animation in this app is
 * already disabled (initial={false} + reduced motion), so the Framer
 * runtime is pure liability. This shim renders plain elements and drops
 * animation-only props, so the markup paints natively and identically on
 * laptop and phone. No JSX changes needed in feature components.
 */
import React from "react";

const ANIM_PROPS = new Set([
  "initial",
  "animate",
  "exit",
  "transition",
  "variants",
  "whileHover",
  "whileTap",
  "whileFocus",
  "whileInView",
  "whileDrag",
  "viewport",
  "onViewportEnter",
  "onViewportLeave",
  "layout",
  "layoutId",
  "layoutScroll",
  "layoutDependency",
  "layoutRoot",
  "drag",
  "dragConstraints",
  "dragElastic",
  "dragMomentum",
  "dragControls",
  "dragListener",
  "dragSnapToOrigin",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "custom",
  "inherit",
  "transformTemplate",
]);

const cache = new Map();

function plain(tag) {
  if (cache.has(tag)) return cache.get(tag);
  const Comp = React.forwardRef(function MotionPlain(props, ref) {
    const clean = {};
    for (const key in props) {
      if (key === "children") continue;
      if (ANIM_PROPS.has(key)) continue;
      clean[key] = props[key];
    }
    clean.ref = ref;
    return React.createElement(tag, clean, props.children);
  });
  Comp.displayName = `motion.${tag}`;
  cache.set(tag, Comp);
  return Comp;
}

export const motion = new Proxy(
  {},
  {
    get: (_target, tag) => plain(typeof tag === "string" ? tag : "div"),
  }
);

export function AnimatePresence({ children }) {
  return React.createElement(React.Fragment, null, children);
}

export function MotionConfig({ children }) {
  return React.createElement(React.Fragment, null, children);
}

/* Harmless stubs - only ScrollProgress used these, and it has been
   rewritten to plain DOM so it no longer imports them. Kept so any stray
   import cannot crash the build. */
export function useScroll() {
  return {
    scrollX: 0,
    scrollY: 0,
    scrollXProgress: 0,
    scrollYProgress: 0,
  };
}

export function useSpring(value) {
  return value;
}

export function useTransform() {
  return 0;
}

export function useMotionValue(initial) {
  return { get: () => initial, set: () => {}, on: () => () => {} };
}

export default { motion, AnimatePresence, MotionConfig };
