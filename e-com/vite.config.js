import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://e-backend-ng9cf9hb5-harshit-singh-aryas-projects.vercel.app/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
