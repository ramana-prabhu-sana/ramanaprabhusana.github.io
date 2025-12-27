import { useEffect, useMemo, useState } from "react"

/**
 * Scroll spy hook
 * @param {string[]} sectionIds - Array of section element ids (without #), ex: ["about","projects","resume","contact"]
 * @param {Object} options
 * @param {string} options.rootMargin - IntersectionObserver rootMargin
 * @param {number|number[]} options.threshold - IntersectionObserver threshold
 * @param {string|null} options.defaultValue - initial active section id
 */
export function useScrollSpy(
  sectionIds = [],
  {
    rootMargin = "0px 0px -60% 0px",
    threshold = 0.1,
    defaultValue = null,
  } = {}
) {
  const ids = useMemo(
    () => (Array.isArray(sectionIds) ? sectionIds.filter(Boolean) : []),
    [sectionIds]
  )

  const [activeId, setActiveId] = useState(defaultValue || ids[0] || null)

  useEffect(() => {
    if (!ids.length) return

    // Helper to pick the top-most visible section when multiple intersect
    const pickBest = (visibleIds) => {
      if (!visibleIds.length) return
      let best = visibleIds[0]
      let bestTop = Number.POSITIVE_INFINITY

      for (const id of visibleIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        const absTop = Math.abs(top)
        if (absTop < bestTop) {
          bestTop = absTop
          best = id
        }
      }
      setActiveId(best)
    }

    // If IntersectionObserver exists, use it
    if ("IntersectionObserver" in window) {
      const visible = new Set()

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const id = entry.target?.id
            if (!id) continue

            if (entry.isIntersecting) visible.add(id)
            else visible.delete(id)
          }
          pickBest(Array.from(visible))
        },
        { rootMargin, threshold }
      )

      const elements = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean)

      elements.forEach((el) => observer.observe(el))

      return () => observer.disconnect()
    }

    // Fallback for older browsers
    const onScroll = () => {
      let best = ids[0]
      let bestDist = Number.POSITIVE_INFINITY

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        const dist = Math.abs(top)
        if (dist < bestDist) {
          bestDist = dist
          best = id
        }
      }
      setActiveId(best)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [ids, rootMargin, threshold])

  return activeId
}

// Also provide default export, so both import styles work
export default useScrollSpy
