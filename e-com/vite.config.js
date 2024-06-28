import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://e-backend-epvh9qah9-harshit-singh-aryas-projects.vercel.app',
        secure: false
      },
    },
  },
  plugins: [react()],
});
