import React from "react"
import { useScrollSpy } from "../hooks/useScrollSpy"

export default function NavBar() {
  // Update these ids to match your Home page section ids
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ]

  const activeId = useScrollSpy(sections.map((s) => s.id), {
    rootMargin: "0px 0px -60% 0px",
    threshold: 0.1,
    defaultValue: "home",
  })

  const onClick = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    // fallback. still update hash
    window.location.hash = `#${id}`
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.75)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <nav
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <a
          href="#home"
          onClick={onClick("home")}
          style={{
            fontWeight: 700,
            letterSpacing: 0.2,
            textDecoration: "none",
            color: "#111",
          }}
        >
          Ramana Prabhu Sana
        </a>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {sections.map((s) => {
            const isActive = activeId === s.id
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={onClick(s.id)}
                style={{
                  textDecoration: "none",
                  padding: "8px 10px",
                  borderRadius: 10,
                  fontSize: 14,
                  color: isActive ? "#111" : "rgba(0,0,0,0.65)",
                  background: isActive ? "rgba(0,0,0,0.06)" : "transparent",
                  border: isActive
                    ? "1px solid rgba(0,0,0,0.12)"
                    : "1px solid transparent",
                  transition: "all 150ms ease",
                }}
              >
                {s.label}
              </a>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
