/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // Extend opacity so /8 and /12 shorthand work as intended. Without
      // these, classes like border-white/8 silently fall through to the
      // Tailwind preflight default (rgb(229,231,235) at full opacity)
      // instead of the intended 8% white. 27 callsites used /8.
      opacity: {
        8: "0.08",
        12: "0.12",
      },
      colors: {
        // Brand: Purdue gold used as a subtle accent only
        gold: {
          DEFAULT: "#CFB991",
          light: "#E0C892",
          dark: "#9C8442",
        },
        // Decision Analytics command-center surface
        ink: {
          950: "#070710",
          900: "#0a0a0f",
          800: "#0f1117",
          700: "#151722",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      maxWidth: {
        "8xl": "88rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px rgba(132,204,22,0.18)",
        "glow-violet":
          "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px rgba(167,139,250,0.22)",
        "glow-cyan":
          "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px rgba(34,211,238,0.22)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-32": "32px 32px",
        "grid-48": "48px 48px",
      },
      animation: {
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "data-pulse": "dataPulse 3.2s ease-in-out infinite",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        dataPulse: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "20%": { opacity: 1 },
          "100%": { transform: "translateX(100%)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
