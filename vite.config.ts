import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@Screens': path.resolve(__dirname, 'src/pages/index.ts'),
      '@Components': path.resolve(__dirname, 'src/components/index.ts')
    }
  }
})
