import React, { useEffect, useState } from "react";
import Button from "./Button.jsx";
import { Moon, Sun } from "lucide-react";

function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const t = saved || (prefersDark ? "dark" : "light");
    setTheme(t);
    applyTheme(t);
  }, []);

  return (
    <Button
      variant="ghost"
      aria-label="Toggle theme"
      onClick={() => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        applyTheme(next);
      }}
      className="px-3"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
}
