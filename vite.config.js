import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap': ['gsap'],
          'lenis': ['lenis'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    assetsInlineLimit: 4096,
    // Optimize images during build
    assetsDir: 'assets',
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  },
})
 