import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { cloudflare } from "@cloudflare/vite-plugin";

/* Make the app stylesheet non-render-blocking. The inline splash (in index.html)
   paints immediately; the full CSS loads asynchronously and is ready before
   React mounts, so there is no flash of unstyled content. Big FCP win on slow
   connections. Build-only — dev injects CSS via JS. */
const asyncCss = () => ({
  name: 'async-css',
  enforce: 'post',
  apply: 'build',
  transformIndexHtml(html) {
    return html.replace(
      /<link rel="stylesheet"([^>]*?)href="([^"]+\.css)"([^>]*?)\/?>/g,
      (_m, pre, href, post) =>
        `<link rel="stylesheet" media="print" onload="this.media='all'"${pre}href="${href}"${post}>` +
        `<noscript><link rel="stylesheet"${pre}href="${href}"${post}></noscript>`
    );
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), asyncCss(), cloudflare()],
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
        },
      },
    },
  },
})