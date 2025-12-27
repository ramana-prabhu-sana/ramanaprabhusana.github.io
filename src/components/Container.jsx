import React from "react";
import { cn } from "../utils/cn.js";

export default function Container({ className, children }) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
