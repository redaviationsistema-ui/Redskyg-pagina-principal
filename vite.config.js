
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],

  server: {
    proxy: {
      // Servicio existente: conservar
      '/api/aircraft-seller': {
        target: 'http://127.0.0.1:4173',
        changeOrigin: true,
      },

      // PHP de compra y venta de aeronaves
      '^/aircraft-inquiry\\.php$': {
        target: 'https://redskyg.com',
        changeOrigin: true,
        secure: true,

        // Solo para desarrollo local autorizado
        configure(proxy) {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader(
              'Origin',
              'https://redskyg.com'
            )
          })
        },
      },
    },
  },

  base: '/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
