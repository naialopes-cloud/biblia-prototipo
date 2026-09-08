import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Protótipo Bibl.ia — servidor exposto na rede local para teste em celular real.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    // Libera o domínio do túnel temporário usado para abrir no celular.
    allowedHosts: ['.trycloudflare.com'],
  },
})
