import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv'

// Load environment variables from .env
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), replace({
    preventAssignment: true,
    'process.env.BACKEND_SERVER': JSON.stringify(process.env.BACKEND_SERVER),
    'process.env.BACKEND_PORT': JSON.stringify(process.env.BACKEND_PORT),
  })],
  server: {
    host: '0.0.0.0', // Allow connections from all hosts
    port: 8088
  },
  build: {
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    }
  }
})
