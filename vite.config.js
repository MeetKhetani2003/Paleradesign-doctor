import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // ensures relative paths so built dist can be hosted anywhere or opened directly
  server: {
    port: 3000,
    open: true
  }
});

