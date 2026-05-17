import { useEffect, useState } from "react";

/**
 * Drives the navbar active state by observing which section is currently
 * most visible on screen. Falls back to the first id when nothing matches.
 */
export function useActiveSection(ids = [], options = {}) {
  const [active, setActive] = useState(ids[0] || "");

  useEffect(() => {
    if (!ids.length || typeof window === "undefined") return;

    const targets = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: options.rootMargin || "-30% 0px -55% 0px",
        threshold: options.threshold || [0, 0.25, 0.5, 0.75, 1],
      }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|")]);

  return active;
}
