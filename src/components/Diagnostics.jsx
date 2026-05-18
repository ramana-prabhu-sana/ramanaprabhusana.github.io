import { useEffect, useState } from "react";

/**
 * TEMPORARY on-device diagnostic. Prints the real computed styles for a
 * below-the-fold section + its ancestor chain on the actual device, so an
 * iOS rendering bug we cannot reproduce off-device can be pinpointed from
 * one screenshot. Remove after diagnosis. Inline styles only + fixed +
 * max z-index so it renders regardless of whatever is dimming content.
 */
export default function Diagnostics() {
  const [lines, setLines] = useState(["(measuring...)"]);

  function measure() {
    const out = [];
    const ua = navigator.userAgent;
    out.push("UA: " + ua.slice(0, 90));
    out.push(
      "viewport: " +
        window.innerWidth +
        "x" +
        window.innerHeight +
        " dpr=" +
        window.devicePixelRatio +
        " vv=" +
        (window.visualViewport ? window.visualViewport.scale.toFixed(2) : "n/a")
    );
    const js =
      [...document.scripts]
        .map((s) => s.src)
        .find((s) => /assets\/index-/.test(s)) || "?";
    out.push("bundle: " + js.split("/").pop());
    const mq = (q) => (window.matchMedia(q).matches ? "Y" : "n");
    out.push(
      "inverted=" +
        mq("(inverted-colors: inverted)") +
        " forced=" +
        mq("(forced-colors: active)") +
        " contrast=" +
        mq("(prefers-contrast: more)") +
        " rmotion=" +
        mq("(prefers-reduced-motion: reduce)") +
        " transparency=" +
        mq("(prefers-reduced-transparency: reduce)")
    );

    const el = document.getElementById("strengths");
    if (!el) {
      out.push("#strengths NOT FOUND");
      setLines(out);
      return;
    }
    const r = el.getBoundingClientRect();
    out.push(
      "#strengths rect top=" +
        Math.round(r.top) +
        " h=" +
        Math.round(r.height) +
        " w=" +
        Math.round(r.width)
    );
    const props = [
      "opacity",
      "filter",
      "color",
      "backgroundColor",
      "visibility",
      "mixBlendMode",
      "transform",
      "webkitTextFillColor",
    ];
    const cs = getComputedStyle(el);
    out.push("#strengths: " + props.map((p) => p + "=" + cs[p]).join(" | "));

    // Ancestor chain: flag anything not at default that could dim a subtree.
    let node = el.parentElement;
    let depth = 0;
    while (node && depth < 14) {
      const s = getComputedStyle(node);
      const flags = [];
      if (s.opacity !== "1") flags.push("opacity=" + s.opacity);
      if (s.filter && s.filter !== "none") flags.push("filter=" + s.filter);
      if (s.mixBlendMode && s.mixBlendMode !== "normal")
        flags.push("blend=" + s.mixBlendMode);
      if (s.transform && s.transform !== "none")
        flags.push("xform=" + s.transform.slice(0, 24));
      if (s.webkitTextFillColor && s.webkitTextFillColor !== s.color)
        flags.push("textfill=" + s.webkitTextFillColor);
      const tag =
        node.tagName.toLowerCase() +
        (node.id ? "#" + node.id : "") +
        (node.className && typeof node.className === "string"
          ? "." + node.className.trim().split(/\s+/).slice(0, 2).join(".")
          : "");
      if (flags.length) out.push("^" + depth + " " + tag + " :: " + flags.join(" "));
      node = node.parentElement;
      depth++;
    }

    // Any full-viewport fixed/absolute element sitting on top (stuck scrim?).
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    [...document.body.querySelectorAll("*")].forEach((n) => {
      const s = getComputedStyle(n);
      if (s.position !== "fixed" && s.position !== "absolute") return;
      const b = n.getBoundingClientRect();
      if (b.width >= vw * 0.9 && b.height >= vh * 0.9) {
        const z = s.zIndex;
        const bg = s.backgroundColor;
        const op = s.opacity;
        if (
          (bg && bg !== "rgba(0, 0, 0, 0)" && op !== "0") ||
          (s.backdropFilter && s.backdropFilter !== "none")
        ) {
          const tag =
            n.tagName.toLowerCase() +
            (n.className && typeof n.className === "string"
              ? "." + n.className.trim().split(/\s+/).slice(0, 2).join(".")
              : "");
          out.push(
            "FULLSCREEN " + tag + " z=" + z + " bg=" + bg + " op=" + op
          );
        }
      }
    });

    setLines(out);
  }

  useEffect(() => {
    const t = setTimeout(measure, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      onClick={measure}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2147483647,
        background: "#00e08a",
        color: "#000",
        font: "10px/1.35 ui-monospace, Menlo, monospace",
        padding: "8px 10px",
        maxHeight: "62vh",
        overflow: "auto",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        opacity: 1,
        pointerEvents: "auto",
        borderBottom: "2px solid #000",
      }}
    >
      <b>DIAGNOSTIC (tap to re-measure) - screenshot this</b>
      {"\n" + lines.join("\n")}
    </div>
  );
}
