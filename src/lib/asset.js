// Single canonical asset() helper.
// Resolves a public-folder path against Vite's BASE_URL so the same path
// works on the custom domain (base "/") and any nested subpath deploy.
export function asset(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const cleaned = String(path).replace(/^\/+/, "");
  const base = import.meta.env.BASE_URL || "/";
  const sep = base.endsWith("/") ? "" : "/";
  return `${base}${sep}${cleaned}`;
}

export function initials(text, max = 2) {
  if (!text) return "";
  const parts = String(text).split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).slice(0, max).toUpperCase();
}
