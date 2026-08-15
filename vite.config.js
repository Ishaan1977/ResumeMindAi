import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // In dev, forwards /api calls to your local serverless function runner (e.g. `vercel dev`)
      "/api": "http://localhost:3000",
    },
  },
});
