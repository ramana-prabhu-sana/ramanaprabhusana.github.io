import React from "react";
import { cn } from "../utils/cn.js";

export default function Card({ className, children }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      {children}
    </div>
  );
}
