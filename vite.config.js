import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
      mangle: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/')) return 'vendor-react';
          if (id.includes('firebase')) return 'vendor-firebase';
          if (id.includes('framer-motion')) return 'vendor-motion';
          if (id.includes('lucide-react')) return 'vendor-lucide';
          if (
            id.includes('react-markdown') || id.includes('remark') ||
            id.includes('rehype') || id.includes('unified') ||
            id.includes('micromark') || id.includes('mdast') || id.includes('hast')
          ) return 'vendor-markdown';
        },
      },
    },
  },
})
