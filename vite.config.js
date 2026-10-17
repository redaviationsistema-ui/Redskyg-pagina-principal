
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const phpTarget = env.SKY_PHP_DEV_TARGET || 'http://127.0.0.1:8085';
  if (!['127.0.0.1', 'localhost', '[::1]'].includes(new URL(phpTarget).hostname)) throw new Error('SKY_PHP_DEV_TARGET must point to a local PHP test server.');
  return {
  plugins: [vue()],

  server: {
    proxy: {
      // Servicio existente: conservar
      '/api/aircraft-seller': {
        target: 'http://127.0.0.1:4173',
        changeOrigin: true,
      },

      // PHP local de pruebas; Vite no ejecuta PHP.
      '^/aircraft-inquiry\\.php$': {
        target: phpTarget,
        changeOrigin: false,
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
