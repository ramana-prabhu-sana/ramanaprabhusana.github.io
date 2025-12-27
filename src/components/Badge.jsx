import React from "react";
import { cn } from "../utils/cn.js";

export default function Badge({ className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-700 dark:border-zinc-800 dark:text-zinc-200",
        className
      )}
    >
      {children}
    </span>
  );
}
