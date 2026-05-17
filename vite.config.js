import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    // Suppress the >500KB warning since heavy deps now ship as separate chunks.
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Manual chunk split so the browser can cache + parse vendor code
        // independently of the app shell. Recruiters hitting a refresh after
        // touching anything other than React/motion/icons get instant loads.
        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["motion"],
          icons: ["lucide-react"],
        },
      },
    },
  },
  preview: {
    // Allow the cloudflared quick-tunnel hostname for the share-and-review flow.
    // Production deploy serves from ramanaprabhusana.com which Vite never sees.
    allowedHosts: [".trycloudflare.com", "ramanaprabhusana.com"],
    host: true,
    port: 4173,
  },
  server: {
    host: true,
  },
});
