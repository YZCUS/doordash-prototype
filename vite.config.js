import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure this covers your files
  ],
  theme: {
    extend: {},
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // This sets up the '@' alias to point to your 'src' directory
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
