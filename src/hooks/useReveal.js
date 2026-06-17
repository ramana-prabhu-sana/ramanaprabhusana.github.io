// src/hooks/useReveal.js
import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    els.forEach((el) => el.classList.add("reveal-init"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      // Pre-trigger: threshold 0 + a positive bottom rootMargin fires the
      // reveal while the section is still ~30% of a viewport BELOW the fold,
      // giving the fade a head start. Combined with the shorter transition in
      // index.css, content is fully painted by the time it scrolls into view,
      // so fast scrolling no longer catches sections mid-fade (blank/washed).
      { threshold: 0, rootMargin: "0px 0px 30% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
