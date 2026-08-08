import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // Фотографии лежат вне src, в import-image/ — разрешаем Vite их отдавать в dev-режиме
  server: {
    fs: {
      allow: ['.'],
    },
  },
})
