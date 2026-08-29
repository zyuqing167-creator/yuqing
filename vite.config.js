import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' ? '/yuqing/' : '/',
  plugins: [react()],
  build: {
    target: ['es2017', 'safari12'],
    cssTarget: 'safari12',
  },
})
