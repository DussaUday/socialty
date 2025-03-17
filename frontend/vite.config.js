import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_BASE_URL = "https://socialty.vercel.app";

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
    proxy: process.env.NODE_ENV !== "production"
      ? {
          "/api": {
            target: API_BASE_URL,
            changeOrigin: true,
            secure: false,
          },
        }
      : undefined,
  },
});
