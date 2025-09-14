import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  plugins: [react()],
  server: {
    port: 4028,
    host: "0.0.0.0",
    strictPort: true
  },
  preview: {
    port: 4028,
    strictPort: true
  }
});