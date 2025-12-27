import React, { useEffect } from "react";
import Card from "./Card.jsx";
import Button from "./Button.jsx";
import { X } from "lucide-react";

export default function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-20"
      onMouseDown={onClose}
    >
      <div className="w-full max-w-2xl" onMouseDown={(e) => e.stopPropagation()}>
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <div className="text-sm font-semibold">{title}</div>
            <Button variant="ghost" onClick={onClose} aria-label="Close" className="px-3">
              <X size={16} />
            </Button>
          </div>
          <div className="p-5">{children}</div>
        </Card>
      </div>
    </div>
  );
}
