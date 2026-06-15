import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import vitePrerender from 'vite-plugin-prerender'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const { PuppeteerRenderer } = vitePrerender

/* All static routes to pre-render for Google indexing.
   Blog detail pages (/blog/:slug) are excluded — they load from Firebase
   and can't be enumerated at build time. */
const PRERENDER_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/book-consultation',
  '/careers',
  '/case-studies',
  '/blogs',
  '/resources/webaurix-faqs',
  '/services/web-development',
  '/services/app-development',
  '/services/ui-ux-design',
  '/services/custom-software-development',
  '/services/digital-marketing',
  '/services/ecommerce-development',
  '/services/cms-development',
  '/services/progressive-web-apps',
  '/services/cross-platform-app-development',
  '/services/enterprise-app-development',
  '/services/ar-vr-game-apps',
  '/services/branding',
  '/services/wireframing-prototyping',
  '/services/product-research',
  '/services/saas-solutions',
  '/services/api-integration',
  '/services/legacy-system-modernization',
  '/services/seo-optimization',
  '/services/ppc-advertising',
  '/services/social-media-marketing',
  '/services/email-content-marketing',
  '/services/ai/gen-ai',
  '/services/ai/web',
  '/services/ai/chatbot',
  '/services/ai-data-consulting',
  '/consultancy/it-strategy',
  '/consultancy/digital-transformation',
  '/consultancy/cybersecurity',
  '/consultancy/cloud',
  '/consultancy/startup-it',
]

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
  plugins: [
    react(),
    tailwindcss(),
    asyncCss(),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: PRERENDER_ROUTES,
      renderer: new PuppeteerRenderer({
        headless: true,
        renderAfterTime: 3000,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      }),
    }),
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
        },
      },
    },
  },
})
