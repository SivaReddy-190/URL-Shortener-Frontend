import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      // Proxy short link redirects directly to backend (302 Found)
      '^/(?!login|register|dashboard|analytics|api|@|src|node_modules|favicon\\.svg)[a-zA-Z0-9_-]{3,14}$': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
