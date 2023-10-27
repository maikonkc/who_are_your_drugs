import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/who_is_your_drugs",
  build: {
    target: 'esnext' //browsers can handle the latest ES features
  }
})