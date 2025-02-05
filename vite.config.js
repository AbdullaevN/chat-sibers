import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  build: {
    rollupOptions: {
      external: ['firebase/firestore'],  // Добавьте сюда, если хотите исключить из сборки
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcss(),
  ],
})