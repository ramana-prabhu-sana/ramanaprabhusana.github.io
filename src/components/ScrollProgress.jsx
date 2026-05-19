import { useEffect, useRef } from "react";

/**
 * Thin gradient bar at the top that fills as the user scrolls. Plain DOM +
 * a passive scroll listener writing a `scaleX` transform on a ref - no
 * Framer Motion (its runtime is aliased out for iOS WebKit paint reasons).
 */
export default function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      ref={ref}
      style={{ transform: "scaleX(0)", transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-lime-400 via-cyan-300 to-violet-400"
    />
  );
}
