import React from "react";
import Container from "./Container.jsx";
import { cn } from "../utils/cn.js";

export default function Section({ id, title, subtitle, children, className }) {
  return (
    <section id={id} className={cn("py-14 sm:py-20", className)}>
      <Container>
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          {subtitle ? (
            <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-300 sm:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
