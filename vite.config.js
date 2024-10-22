import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server:{
      proxy:{
        '/api':'https://e-backend-loqx.vercel.app/'
      },
    },
  plugins: [react()],
});
