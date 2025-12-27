import React, { useEffect, useState } from "react";
import Button from "./Button.jsx";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="gap-2"
      >
        <ArrowUp size={16} />
        Top
      </Button>
    </div>
  );
}
