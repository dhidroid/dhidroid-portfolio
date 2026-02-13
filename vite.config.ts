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
      localsConvention: 'camelCaseOnly',
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
    format: 'es'
  },
  build: {
    target: 'esnext',
    // Increase warning limit and split large third-party libs (AI/WASM) into their own chunk
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      external: ['@xenova/transformers'],
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('@xenova') || id.includes('onnxruntime') || id.includes('onnx')) {
              return 'vendor-ai';
            }
            if (id.includes('react')) {
              return 'vendor-react';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
