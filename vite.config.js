import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // For username.github.io sites, base should be "/"
  base: "/",
});
