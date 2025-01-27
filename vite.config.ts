import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig({
  server: { 
    https: true, // Habilita HTTPS
    host: '0.0.0.0', // Permite acceder desde tu red local
    port: 5173, // Puerto donde corre Vite
    },
  plugins: [react(), mkcert()],
})
