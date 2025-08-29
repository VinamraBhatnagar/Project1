import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add define property to make process.env.API_KEY available in client-side code,
  // following Gemini API guidelines.
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
})
