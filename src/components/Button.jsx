import React from "react";
import { cn } from "../utils/cn.js";

export default function Button({ className, variant = "primary", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950";
  const styles =
    variant === "primary"
      ? "bg-zinc-950 text-white hover:bg-zinc-900 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
      : variant === "secondary"
      ? "border border-zinc-200 bg-white text-zinc-950 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800";

  return <button className={cn(base, styles, className)} {...props} />;
}
