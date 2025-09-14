import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',  // Add this for proper static asset paths
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['@reduxjs/toolkit', 'react-redux']
        }
      }
    }
  },
  plugins: [react()],
  server: {
    port: 4030,
    host: '0.0.0.0',
    strictPort: true,
    open: true
  },
  preview: {
    port: 4031,
    strictPort: true
  }
});