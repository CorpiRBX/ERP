import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginHistory from 'vite-plugin-history';

export default defineConfig({
  plugins: [
    react(),
    VitePluginHistory(),
  ],
  build: {
    outDir: 'dist',
  },
  server: {
    open: true, // opcional, abre el navegador automáticamente
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
