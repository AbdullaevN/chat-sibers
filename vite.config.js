import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
           if (id.includes('firebase')) {
            return 'firebase';
          }
        }
      }
      // external: ['firebase/auth']
    }
  },
  optimizeDeps: {
    include: ["firebase/app", "firebase/auth", "firebase/firestore"],
  },
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcss(),react()
  ], 
})