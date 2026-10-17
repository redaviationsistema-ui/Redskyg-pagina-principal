
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const phpTarget = env.SKY_PHP_DEV_TARGET || 'https://redskyg.com';
  return {
  plugins: [vue()],

  server: {
    proxy: {
      // Servicio existente: conservar
      '/api/aircraft-seller': {
        target: 'http://127.0.0.1:4173',
        changeOrigin: true,
      },

      // Reutiliza el receptor PHP existente de cPanel en desarrollo.
      '^/aircraft-inquiry\\.php$': {
        target: phpTarget,
        changeOrigin: true,
        secure: true,
      },
    },
  },

  base: '/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
})
