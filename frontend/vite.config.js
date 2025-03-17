import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Define backend API URL based on environment
const API_BASE_URL = process.env.NODE_ENV === "production"
  ? "https://socialty-api.vercel.app"  // ⬅️ Replace with actual backend URL
  : "http://localhost:5000";

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/",  // ⬅️ Ensure correct base path
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
