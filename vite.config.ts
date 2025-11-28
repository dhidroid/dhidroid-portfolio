import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr: {
      overlay: true
    }
  },
  css: {
    modules: {
      // Enable CSS modules for files ending with .module.css
      localsConvention: 'camelCaseOnly', // or 'camelCase', 'dashes', etc.
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  },
  resolve: {
    alias: {
      '@Screens': path.resolve(__dirname, 'src/pages/index.ts'),
      '@Components': path.resolve(__dirname, 'src/components/index.ts')
    }
  },
  worker: {
    format: 'es',
  },
  build: {
    target: 'esnext'
  }
})
