import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Generate source maps for better debugging
    sourcemap: false,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'syntax-highlighter': ['react-syntax-highlighter'],
          'router': ['react-router-dom'],
        },
      },
    },
  },
})
