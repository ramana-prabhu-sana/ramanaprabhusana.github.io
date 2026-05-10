import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
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
