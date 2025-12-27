import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const scrollHeight = h.scrollHeight - h.clientHeight;
      const p = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setPct(Math.max(0, Math.min(100, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent">
      <div className="h-1 bg-indigo-500" style={{ width: `${pct}%` }} />
    </div>
  );
}
