import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
    global: {}
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process/browser'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
})
