import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react'
          if (id.includes('react-router')) return 'vendor-router'
          if (id.includes('gsap')) return 'vendor-gsap'
          if (id.includes('zustand')) return 'vendor-zustand'
          if (id.includes('lenis')) return 'vendor-lenis'
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
