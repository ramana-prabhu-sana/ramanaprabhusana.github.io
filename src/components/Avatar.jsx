import { useState } from "react";
import { asset, initials as makeInitials } from "../lib/asset";

export default function Avatar({
  src,
  alt,
  fallback = "RPS",
  className = "",
  imgClassName = "object-cover",
  size = "md",
}) {
  const [failed, setFailed] = useState(false);
  const resolved = src ? asset(src) : "";
  const initials = makeInitials(fallback || alt) || "RPS";

  const sizeClass =
    {
      xs: "h-8 w-8 text-xs",
      sm: "h-10 w-10 text-sm",
      md: "h-12 w-12 text-base",
      lg: "h-16 w-16 text-lg",
      xl: "h-24 w-24 text-2xl",
    }[size] || size;

  const showImage = resolved && !failed;

  return (
    <div
      className={[
        "relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur",
        sizeClass,
        className,
      ].join(" ")}
    >
      {showImage ? (
        <img
          src={resolved}
          alt={alt || fallback}
          loading="lazy"
          decoding="async"
          className={`h-full w-full ${imgClassName}`}
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center font-semibold text-white/80"
          aria-label={alt || fallback}
        >
          {initials}
        </div>
      )}
    </div>
  );
}
