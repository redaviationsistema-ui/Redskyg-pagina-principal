// web principal 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"


export default defineConfig({
  plugins: [vue()],
  base: '/', // subdominio
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
